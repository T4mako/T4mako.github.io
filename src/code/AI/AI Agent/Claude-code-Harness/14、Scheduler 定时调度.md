# Scheduler 定时调度

## 整体交互流程

```
模型调用 cron_create(cron="*/5 * * * *", prompt="检查部署状态")
       ↓
CronScheduler.create() → 生成 task_id → 加入内存列表 → 可选持久化到磁盘
       │
       └─ 后台守护线程（每秒检查一次）
              │
              ├─ 当前分钟 ≠ 上次检查分钟？
              │   ├─ 是 → 遍历所有任务 → cron_matches(now) 匹配？
              │   │         ├─ 是 → 通知入队 Queue → 记录 last_fired
              │   │         └─ 否 → 跳过
              │   └─ 否 → 跳过（避免同一分钟重复触发）
              │
              └─ agent_loop 顶部: SCHEDULER.drain_notifications()
                     ↓
                  将通知作为 user 消息注入对话 → 模型在下一轮看到并响应
```

## 实现思路

定时调度系统位于 `src/tasks/scheduler.py`，核心是一个 `CronScheduler` 类，通过**后台守护线程 + 通知队列**实现。

| 组件 | 职责 |
|------|------|
| `cron_matches()` | 5 字段 cron 表达式解析与匹配 |
| `CronScheduler` | 任务创建/删除/列表 + 后台检查循环 + 通知队列 |
| `CronLock` | 基于 PID 文件的锁，防止多会话重复触发 |
| `SCHEDULER` | 全局单例 |

架构要点：

- **守护线程**每秒检查一次，但通过 `_last_check_minute` 确保每分钟只触发一次
- **通知队列**（`queue.Queue`）解耦调度器和主循环，调度器只负责入队，主循环负责 drain
- **持久化模式**：`durable=true` 时任务写入 `.claude/scheduled_tasks.json`，重启后自动加载
- **PID 锁**：防止多个 agent 会话同时触发同一个 cron 任务

## 核心问题

### Q1: 如何设置定时任务？

模型通过 `cron_create` 工具创建定时任务：

```
cron_create(
    cron="*/5 * * * *",          # 5 字段 cron 表达式
    prompt="检查部署状态",         # 触发时注入的 prompt
    recurring=true,               # 重复触发（默认），7 天后自动过期
    durable=false                 # 仅当前会话（默认），true 则持久化到磁盘
)
```

**Cron 表达式格式（5 字段）：**

```
+-------+-------+-------+-------+-------+
| 分    | 时    | 日    | 月    | 周    |
| 0-59  | 0-23  | 1-31  | 1-12  | 0-6   |
+-------+-------+-------+-------+-------+
```

**支持的语法：**

| 语法 | 含义 | 示例 |
|------|------|------|
| `*` | 任意值 | `* * * * *`（每分钟） |
| `*/N` | 每隔 N | `*/5 * * * *`（每 5 分钟） |
| `N` | 精确值 | `30 14 * * *`（每天 14:30） |
| `N-M` | 范围 | `0 9-17 * * *`（9-17 点整点） |
| `N,M` | 列表 | `0 9 * * 1,5`（周一和周五 9:00） |
| `N-M/S` | 范围+步进 | `0-30/10 * * * *`（0, 10, 20, 30 分） |

**两种持久化模式：**

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| `session-only`（默认） | 任务存在内存中，agent 退出即丢失 | 临时性检查 |
| `durable` | 任务写入 `.claude/scheduled_tasks.json`，重启后自动恢复 | 长期监控 |

**两种触发模式：**

| 模式 | 说明 |
|------|------|
| `recurring`（默认） | 重复触发，7 天后自动过期（防止无限运行） |
| `one-shot` | 触发一次后自动删除 | 一次性提醒 |

**管理定时任务：**

```
cron_list()              # 列出所有定时任务
cron_delete(task_id)     # 删除指定任务
```

`cron_list` 返回格式：

```
abc12345  */5 * * * *  [重复/会话] (0.5h): 检查部署状态
def67890  0 9 * * *  [重复/持久] (2.3h): 每天早上站会提醒
```

### Q2: 模型是怎么知道在特定时间执行任务的？

模型**不需要主动感知时间**。调度器通过后台守护线程自动监控，到期后将 prompt 注入对话：

```
CronScheduler.start() 启动时
       ↓
创建 daemon 线程 → _check_loop()
       ↓
while not stopped:
    now = datetime.now()
    如果当前分钟 ≠ _last_check_minute:
        _last_check_minute = 当前分钟
        _check_tasks(now)
    等待 1 秒
```

**`_check_tasks(now)` 的检查流程：**

```
遍历所有任务:
    1. 重复任务超过 7 天？ → 标记过期，移除
    2. 应用抖动偏移（:00/:30 的任务偏移 1-4 分钟）
    3. cron_matches(task.cron, check_time)？
       ├─ 匹配 → 构造通知 "[定时任务 {id}]: {prompt}" → 入队 Queue
       │         记录 last_fired = time.time()
       │         如果是 one-shot → 标记移除
       └─ 不匹配 → 跳过
```

**通知注入到主循环：**

```python
# agent_loop() 顶部
while True:
    notifications = SCHEDULER.drain_notifications()
    for note in notifications:
        print(f"[Cron 通知] {note[:120]}")
        state.messages.append({"role": "user", "content": note})
```

`drain_notifications()` 从 `Queue` 中非阻塞取出所有待处理通知（`get_nowait()`），主循环将它们作为 `role=user` 消息追加到对话历史。模型在下一轮 API 调用时看到这些消息，就像用户发来了一条新消息一样。

**启动时的错过检测：**

```python
# agent 启动时
missed = SCHEDULER.detect_missed_tasks()
# 检查每个持久化任务的 last_fired 到当前时间的窗口
# 如果窗口内存在 cron 匹配点 → 标记为遗漏
```

这确保 agent 重启后不会丢失在关闭期间应该触发的任务。

### Q3: 执行的结果在哪？

定时任务的"执行"与后台任务不同——**Cron 不直接执行命令，而是注入 prompt**。

```
后台任务（background_run）:  启动 shell 进程 → 输出写入文件 → 读取文件
定时任务（cron_create）:     时间匹配 → 将 prompt 注入对话 → 模型看到后自行决定做什么
```

**通知注入流程：**

```
cron 匹配 → Queue.put("[定时任务 abc12345]: 检查部署状态")
       ↓
agent_loop drain → state.messages.append({"role": "user", "content": "[定时任务 abc12345]: 检查部署状态"})
       ↓
模型在下一轮看到这条消息 → 自行决定调用 bash/background_run 等工具来执行
       ↓
模型执行的结果 → 在对话历史中（作为工具调用结果）
```

所以定时任务的"结果"就是**模型在收到通知后产生的对话和工具调用**，它们记录在：
- 当前会话的 `state.messages` 中
- 日志文件（`save_log` 保存的会话记录）

**如果模型需要执行具体命令并获取结果**，它会在收到 cron 通知后调用 `background_run` 或 `bash`：

```
Cron 通知: "[定时任务 abc12345]: 检查部署状态"
       ↓
模型响应: background_run(command="curl -s https://api.example.com/deploy/status")
       ↓
后台任务输出: {"status": "completed", "output": "Deploy OK"}
```

### Q4: 如何避免定时任务与其他任务对一个文件进行操作？

多层隔离机制：

**1. PID 文件锁（`CronLock`）**

防止多个 agent 会话同时触发同一个 cron 任务：

```python
class CronLock:
    def acquire(self) -> bool:
        if 锁文件存在:
            stored_pid = 读取 PID
            os.kill(stored_pid, 0)  # 检测进程是否存活
            ├─ 进程存活 → 锁被占用，返回 False
            └─ 进程已死 → 过期锁，可接管
        写入当前 PID → 返回 True
```

锁文件路径：`.claude/cron.lock`

**2. 每分钟去重（`_last_check_minute`）**

守护线程每秒检查一次，但通过 `_last_check_minute` 确保同一分钟内只触发一次：

```python
current_minute = now.hour * 60 + now.minute
if current_minute != self._last_check_minute:
    self._last_check_minute = current_minute
    self._check_tasks(now)
```

**3. 抖动偏移（Jitter）**

`:00` 和 `:30` 的 cron 任务自动偏移 1-4 分钟，避免多个任务在同一秒触发造成拥堵：

```python
def _compute_jitter(cron_expr):
    minute_val = int(cron_expr.split()[0])
    if minute_val in [0, 30]:
        return (hash(cron_expr) % 4) + 1  # 1-4 分钟偏移
    return 0
```

**4. 通知队列解耦**

调度器和主循环通过 `Queue` 解耦：调度器只负责入队，不直接修改对话历史。主循环在安全点（`agent_loop` 顶部）统一 drain，避免并发写入。

**5. 持久化任务独立存储**

定时任务持久化到 `.claude/scheduled_tasks.json`，与项目的 `.tasks/` 目录分离，避免与 Task 任务系统的文件冲突。

**6. 模型层面的文件隔离**

当 cron 通知触发后，模型如果需要操作文件，它会走正常的工具调用流程（受权限系统、sandbox 路径校验等保护）。如果模型需要长时间操作，可以使用 `background_run` 在后台执行，不阻塞主循环。

**补充：Worktree 隔离（与 Task 系统结合）**

对于需要修改文件的任务，Task 系统支持 worktree 绑定（`bind_worktree`），将任务绑定到一个独立的 git worktree 目录中执行。定时任务触发后，如果模型创建了一个新 Task 并绑定了 worktree，文件操作会在隔离目录中进行，不影响主工作区。

### Q5: 定时任务的结果给模型的时机是什么时候？

定时任务的通知通过**队列 + 主循环顶部 drain** 传递给模型，具体时机如下：

```
agent_loop() while True:
    │
    ├─ ① SCHEDULER.drain_notifications()     ← 先取通知
    │   将通知作为 role=user 消息追加到 state.messages
    │
    ├─ ② input()                             ← 等待用户输入
    │
    └─ ③ turn(state, query)                  ← 调用 API，模型看到所有消息

```

**关键时序：**

1. **通知入队**：守护线程在 `_check_tasks()` 中匹配成功时，将通知字符串 `put` 到 `queue.Queue`
2. **通知出队**：主循环在**下一次迭代顶部**调用 `drain_notifications()`，非阻塞取出所有待处理通知
3. **模型可见**：通知作为 `role=user` 消息追加到 `state.messages`，模型在下一轮 API 调用（`turn()`）中看到这些消息

**这意味着：**

| 情况 | 延迟 |
|------|------|
| 主循环正在等待用户输入（`input()`） | 通知在队列中等待，直到用户输入处理完后下一次迭代顶部 drain |
| 主循环正在调用 API（`turn()`） | 同上，当前调用不会被中断 |
| 主循环空闲（已进入下一次迭代） | 立即 drain，最快在当前分钟内的下一次循环顶部取出 |

**最大延迟估算：** 如果模型正在执行一个长时间的工具调用（如 `block=true` 的 `background_output` 阻塞 30 秒），主循环被占用，通知会在队列中等待直到主循环回到顶部。

### Q6: 如果模型宕机了怎么解决？

定时任务在 agent 进程崩溃或关闭时的防护分为**三层**：

**第一层：持久化存储（`durable=true`）**

```
创建任务时 durable=true
      ↓
任务写入 .claude/scheduled_tasks.json
      ↓
agent 崩溃重启 → SCHEDULER.start() → _load_durable() 从磁盘恢复任务列表
      ↓
守护线程继续检查 → 任务不会丢失
```

**对比：** `durable=false`（默认，session-only）的任务仅存在内存中，进程退出即丢失。

**第二层：错过检测（`detect_missed_tasks`）**

agent 重启时会检查在关闭期间**应该触发但未触发**的任务：

```python
# agent 启动时
missed = SCHEDULER.detect_missed_tasks()
```

检测逻辑：
1. 遍历每个有 `last_fired` 记录的持久化任务
2. 从 `last_fired + 1分钟` 开始，逐分钟检查到当前时间（最多回查 24 小时）
3. 如果某分钟 `cron_matches` 匹配 → 标记为遗漏任务
4. 遗漏任务列表打印到控制台，供 agent 决定是否需要补执行

**关键参数：**

| 参数 | 值 | 说明 |
|------|-----|------|
| 回查窗口 | 24 小时 | 超过 24 小时的遗漏不再检测 |
| 检测粒度 | 1 分钟 | 逐分钟遍历 |
| 触发条件 | 任务必须有 `last_fired` 记录 | 新创建的任务无上次触发时间，不参与检测 |

**第三层：PID 锁防重复（`CronLock`）**

防止用户同时打开两个 agent 会话时，同一个 cron 任务被重复触发：

```
会话 A 启动 → CronLock.acquire() → 写入 PID_A → 返回 True（获取锁成功）
会话 B 启动 → CronLock.acquire() → 读取 PID_A → os.kill(PID_A, 0) → 进程存活 → 返回 False（锁被占用）
```

**进程崩溃后的锁恢复：**

```
进程 A 崩溃（PID_A 死亡）
      ↓
会话 B 启动 → CronLock.acquire() → 读取 PID_A → os.kill(PID_A, 0) → ProcessLookupError → 过期锁，可接管
```

**三种场景总结：**

| 场景 | durable=false | durable=true |
|------|---------------|--------------|
| 进程正常退出 | 任务丢失 | 任务保存到磁盘 |
| 进程崩溃 | 任务丢失 | 任务保存到磁盘 + 重启后错过检测 |
| 多会话同时运行 | 可能重复触发 | PID 锁防止重复 |

**局限性与建议：**

- 错过检测只打印到控制台，**不会自动补执行**。模型需要在启动后自行决定是否响应这些遗漏
- 如果 agent 关闭超过 24 小时，期间的遗漏任务不再被检测
- 对于关键任务，建议始终使用 `durable=true`
