# 后台任务（加强 Task）

## 整体交互流程

```
模型调用 background_run(command)
       ↓
BackgroundTaskManager.start() → 创建子进程 → 输出写入临时文件 → 返回 task_id
       ↓
模型继续做其他事（不被阻塞）
       ↓
模型调用 background_output(task_id, block=false)  → 非阻塞读取当前输出
   或 background_output(task_id, block=true, timeout=30) → 阻塞等待完成
       │
       ├─ 已完成 → 返回完整输出 + exit_code
       └─ 仍在运行 → 返回部分输出（或等待超时后返回部分输出）
```

## 实现思路

后台任务模块包含两个子系统：**后台任务管理**（`BackgroundTaskManager`）和**定时调度**（`CronScheduler`）。

| 文件 | 职责 |
|------|------|
| `src/tasks/background.py` | 后台 shell 进程管理（启动/查询/输出/停止） |
| `src/tasks/scheduler.py` | Cron 定时调度（表达式解析/持久化/通知队列） |
| `src/tools/registry.py` | 7 个工具（4 个 background + 3 个 cron）的元信息和 handler |

后台任务的核心设计：**子进程 + 临时文件 + 监控线程**。命令通过 `subprocess.Popen` 启动，stdout 写入临时文件，监控线程（daemon thread）等待进程结束并自动更新状态。

定时调度的核心设计：**守护线程 + 通知队列**。后台线程每秒检查一次 cron 匹配，到期后将 prompt 入队，由主循环在 `agent_loop` 顶部 drain 并注入为 user 消息。

## 核心问题

### Q1: 为什么需要后台任务？

没有后台任务时，agent 执行 shell 命令是**同步阻塞**的：

```python
# 没有后台任务 — 命令执行期间 agent 完全停滞
output = subprocess.run("npm run build", shell=True, capture_output=True, text=True)
# 如果构建需要 5 分钟，agent 就干等 5 分钟
```

问题场景：

- **长时间构建**（`npm run build`、`cargo build --release`）— 等几分钟才能继续
- **持续监控**（`ping`、`tail -f`、`watch`）— 一直运行不会返回
- **并行操作**（同时跑多个测试、部署多个服务）— 串行执行浪费时间
- **定时检查**（"每 5 分钟检查一下部署状态"）— 需要 agent 反复手动检查

后台任务解决这些问题：**启动命令后立即返回**，agent 可以去做别的事，需要时再查询结果。

### Q2: 模型怎么知道这个需要后台运行？

模型通过**工具描述**区分前台和后台执行：

| 工具 | 描述 | 特点 |
|------|------|------|
| `bash` | "Run a shell command" | 同步执行，等待返回 |
| `background_run` | "Run a shell command **in the background**. Returns **immediately** with a task ID" | 异步执行，立即返回 |

模型根据命令的预期执行时间和是否需要并行来决定使用哪个工具：

```
短命令（ls、cat、grep） → bash（同步）
长命令（build、test suite、deploy） → background_run（异步）
需要定时执行 → cron_create（调度）
```

此外，`background_run` 支持 `timeout` 参数，模型可以为后台任务设置超时：

```
background_run(command="npm run build", timeout=300)  # 5 分钟超时
```

超时到达后，监控线程自动 `kill` 进程并将状态设为 `stopped`。

### Q3: 后台任务结果怎么返回给模型？

后台任务的输出通过**临时文件**传递，模型通过 `background_output` 工具读取：

```
background_run(command) → subprocess.Popen(stdout=临时文件)
       ↓
临时文件路径: /tmp/mini_claude_bg_tasks/bg_task_{task_id}.txt
       ↓
进程运行中 → stdout 持续写入文件（实时追加）
       ↓
background_output(task_id) → 读取文件内容 → 返回给模型
```

**两种读取模式：**

**非阻塞读取（默认）：**

```
background_output(task_id=1, block=false)
       ↓
直接读取当前文件内容 → 返回（不管进程是否结束）
       ↓
返回: {
    "task_id": 1,
    "status": "running",        ← 可能仍在运行
    "output": "已输出的部分...", ← 当前已写入的内容
    "elapsed_seconds": 15.3
}
```

**阻塞读取：**

```
background_output(task_id=1, block=true, timeout=30)
       ↓
proc.wait(timeout=30)
       │
       ├─ 进程在 30s 内结束 → 读取完整输出 → 返回
       │   {
       │       "status": "completed",
       │       "exit_code": 0,
       │       "output": "完整输出...",
       │   }
       │
       └─ 30s 后仍未结束 → 返回超时错误 + 部分输出
           {
               "error": "等待超时（30s），任务仍在运行",
               "partial_output": "已输出的前 10000 字符..."
           }
```

**状态监控线程：** 每个后台任务启动时创建一个 daemon 监控线程，调用 `proc.wait()` 等待进程结束，结束后自动：
1. 关闭 stdout 文件句柄（确保缓冲区刷新到磁盘）
2. 更新 `task.status`（`completed` / `failed` / `stopped`）
3. 记录 `task.exit_code` 和 `task.ended_at`

### Q4: 后台任务如果一直阻塞怎么办？

三层防护：

**1. 任务级超时（`timeout` 参数）**

```
background_run(command="npm run build", timeout=300)
       ↓
监控线程: proc.wait(timeout=300)
       ↓
超时 → proc.kill() → 状态设为 "stopped"
```

**2. 读取超时（`background_output` 的 `timeout` 参数）**

```
background_output(task_id=1, block=true, timeout=30)
       ↓
proc.wait(timeout=30)
       ↓
超时 → 返回错误 + partial_output（前 10000 字符）→ 不无限等待
```

**3. 手动停止（`background_stop` 工具）**

```
background_stop(task_id=1)
       ↓
proc.kill() → proc.wait(timeout=5) → 状态设为 "stopped"
```

**输出截断：** 读取输出时限制 50,000 字符，超出部分截断并附加说明：

```python
if len(text) > limit:
    return text[:limit] + f"\n... (截断，共 {len(text)} 字符)"
```

### Q5: 模型如果一定要后台任务的结果是否会阻塞？

**会阻塞，但有上限。** 模型调用 `background_output(task_id, block=true, timeout=30)` 时，当前工具调用会阻塞最多 `timeout` 秒：

```
模型: background_output(task_id=1, block=true, timeout=30)
       ↓
主循环: 等待 proc.wait(timeout=30)
       │
       ├─ 任务完成（≤30s）→ 返回完整结果 → 主循环继续
       └─ 超时（>30s）    → 返回错误 + 部分输出 → 主循环继续
                              模型看到超时信息后可以选择：
                              - 增加 timeout 再次查询
                              - 用部分输出继续工作
                              - 停止任务（background_stop）
```

**模型不会永久卡死**，因为：
- `block=true` 时最多等待 `timeout` 秒（默认 30s）
- 超时后返回 `partial_output`，模型仍有部分可用信息
- 模型可以选择非阻塞模式（`block=false`）随时查看进度

**定时任务的非阻塞注入：**

Cron 定时任务的通知通过**队列**传递，不会阻塞主循环：

```python
# agent_loop 顶部
notifications = SCHEDULER.drain_notifications()  # 非阻塞 drain
for note in notifications:
    state.messages.append({"role": "user", "content": note})
```

`drain_notifications()` 从 `Queue` 中 `get_nowait()` 取出所有待处理通知，队列中没有则立即返回空列表。这意味着：
- 定时任务触发时，通知入队
- 主循环在下一次迭代顶部取出通知
- **不会等待**，即使队列中有大量通知也只是批量取出
- 模型在下一轮 API 调用中看到这些通知作为 user 消息

**推荐的后台任务交互模式：**

```
1. background_run(command, timeout=300)     # 启动，拿到 task_id
2. 做其他工作...                             # 不等待
3. background_output(task_id, block=false)   # 检查进度（非阻塞）
4. 如果还在运行 → 继续做其他事 → 回到步骤 3
5. 如果已完成 → 处理结果
6. 如果等了太久 → background_stop(task_id)   # 终止
```

**定时调度补充：**

| 特性 | 说明 |
|------|------|
| Cron 表达式 | 标准 5 字段（分 时 日 月 周） |
| 重复任务 | 7 天自动过期，防止无限运行 |
| 单次任务 | 触发一次后自动删除 |
| 持久化 | `durable=true` 写入 `.claude/scheduled_tasks.json` |
| 抖动 | `:00` / `:30` 的任务自动偏移 1-4 分钟，避免整点拥堵 |
| 错过检测 | 启动时检查 `last_fired` 到当前时间的窗口，发现遗漏任务 |
| PID 锁 | 防止多个会话同时触发同一个 cron 任务 |
