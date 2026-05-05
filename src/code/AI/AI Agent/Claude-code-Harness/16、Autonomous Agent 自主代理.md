# Autonomous Agent 自主代理

## 整体交互流程

```
Teammate 完成当前工作（LLM 无工具调用 或 调用 idle 工具）
       ↓
进入 IDLE 阶段 → 状态设为 idle，开始轮询
       │
       └─ 每 IDLE_POLL_INTERVAL(5s) 轮询一次，最多 IDLE_TIMEOUT(60s)
              │
              ├─ ① 检查 inbox 是否有新消息？
              │   ├─ 有 → 重注入身份信息 → 恢复 WORK 阶段
              │   └─ 无 → 继续
              │
              ├─ ② 扫描任务板 scan_unclaimed_tasks(role)？
              │   ├─ 有 → claim_task(task_id, owner, source="auto") → 注入任务上下文 → 恢复 WORK 阶段
              │   └─ 无 → 继续
              │
              └─ ③ 超时（60s 内无新消息、无可认领任务）
                     ↓
                  关闭，状态设为 shutdown
```

**任务认领流程：**

```
scan_unclaimed_tasks(role="coder")
       ↓
遍历 .tasks/task_*.json → is_claimable_task(task, role) 过滤
       │
       ├─ status == "pending"？
       ├─ 无 owner？
       ├─ 无 blockedBy？
       └─ claim_role / required_role 匹配？
       │
       ↓ 找到第一个匹配任务
claim_task(task_id, owner, role, source="auto")
       ↓
_claim_lock 加锁 → 再次检查 is_claimable_task → 更新 owner/status → 写回文件 → 记录事件
       ↓
任务注入 <auto-claimed> 标签到 LLM 上下文 → Teammate 恢复工作
```

## 实现思路

自主代理的本质是：**让空闲 Teammate 从"被动等待分配"变为"主动扫描认领"。**

之前 Teammate 完成工作后直接关闭（`shutdown`），需要 Lead 手动 `spawn` 重新激活。现在改为两阶段循环：WORK → IDLE → WORK → IDLE ... 直到超时才真正关闭。

| 文件 | 职责 |
|------|------|
| `src/agents/teammate_manager.py` | 两阶段工作循环（WORK + IDLE）、空闲轮询、自动认领、身份重注入 |
| `src/tools/registry.py` | `claim_task`/`scan_unclaimed_tasks`/`is_claimable_task` 函数 + `idle`/`claim_task` 工具 |
| `src/agents/__init__.py` | 导出 `ensure_identity_context`/`make_identity_block`/`scan_unclaimed_tasks`/`claim_task` |

存储路径：

```
.tasks/
  task_1.json              ← 任务文件（含 owner/claim_role/claimed_at 字段）
  claim_events.jsonl       ← 认领事件日志（每行一个 JSON 事件）
```

`claim_task` 的原子性通过 `_claim_lock`（`threading.Lock`）保证：读取→校验→写入在一个锁内完成，防止两个 Teammate 同时认领同一个任务。

## 核心问题

### Q1: 什么是自主代理？为什么需要？

很多事情仍然要靠 Lead 手动分配。

例如任务板上已经有 10 条可做任务，如果还要 Lead 一个个点名：

```
Alice 做 1
Bob 做 2
Charlie 做 3
```

那团队规模一大，Lead 就会变成瓶颈。

所以这一章要解决的核心问题是：**让空闲队友自己扫描任务板，找到可做的任务并认领。**

自主代理（Autonomous Agent）指 Teammate 在空闲时**不等待 Lead 分配**，而是：

1. **主动轮询 inbox** — 有新消息就恢复工作
2. **主动扫描任务板** — 找到可认领的任务就自动认领
3. **超时自动关闭** — 长时间无工作才真正退出

实现上，Teammate 的工作循环从原来的"单次 WORK"改为"WORK → IDLE → WORK → IDLE ... "的两阶段循环：

| 阶段 | 行为 | 退出条件 |
|------|------|----------|
| **WORK** | 标准 agent loop，最多 `MAX_WORK_TURNS=50` 轮 | LLM 无工具调用、调用 `idle` 工具、或 `shutdown_response` 批准关闭 |
| **IDLE** | 每 `IDLE_POLL_INTERVAL=5s` 轮询 inbox 和任务板，最多 `IDLE_TIMEOUT=60s` | 收到新消息、找到可认领任务、或超时关闭 |

### Q2: Teammate 怎么认领任务？

认领分为**手动认领**和**自动认领**两种方式，底层都调用 `claim_task(task_id, owner, role, source)`。

**手动认领：** Teammate 在 WORK 阶段通过 `claim_task` 工具主动认领指定任务：

```
Teammate 调用 claim_task(task_id=3)
       ↓
_exec_tool 路由 → _registry_claim_task(task_id, sender, role, source="manual")
       ↓
加锁 → 校验可认领 → 更新 task_3.json → 记录事件 → 返回结果
```

**自动认领：** Teammate 在 IDLE 阶段轮询时，调用 `scan_unclaimed_tasks(role)` 扫描任务板：

```python
# IDLE 阶段每 5 秒轮询一次
unclaimed = scan_unclaimed_tasks(role=role)
if unclaimed:
    task = unclaimed[0]  # 取第一个匹配任务
    claim_result = _registry_claim_task(
        task["id"], name, role=role, source="auto",
    )
    # 将任务注入 LLM 上下文
    messages.append({"role": "user", "content": f"<auto-claimed>Task #{task['id']}: {task['subject']}..."})
    resume = True  # 恢复 WORK 阶段
```

**可认领条件（`is_claimable_task`）：**

```python
def is_claimable_task(task: dict, role: str | None = None) -> bool:
    required_role = task.get("claim_role") or task.get("required_role") or ""
    if required_role and (not role or role != required_role):
        return False
    return (
        task.get("status") == "pending"
        and not task.get("owner")
        and not task.get("blockedBy")
    )
```

四个条件必须同时满足：

| 条件 | 说明 |
|------|------|
| `status == "pending"` | 任务未被执行 |
| `owner` 为空 | 无人认领 |
| `blockedBy` 为空 | 无前置依赖阻塞 |
| `claim_role` / `required_role` 匹配 | 角色匹配（为空表示不限角色） |

认领后任务文件更新：

```json
{
  "id": 3,
  "subject": "实现登录接口",
  "status": "in_progress",
  "owner": "alice",
  "claimed_at": 1714567890.123,
  "claim_source": "auto"
}
```

同时追加认领事件到 `.tasks/claim_events.jsonl`：

```json
{"event": "task.claimed", "task_id": 3, "owner": "alice", "role": "coder", "source": "auto", "ts": 1714567890.123}
```

### Q3: 如何保持认领任务的原子性？

任务认领的原子性通过 **`_claim_lock`（`threading.Lock`）** 保证。

关键在 `claim_task()` 函数中，**读取→校验→写入** 三个步骤在一个锁内完成：

```python
_claim_lock = threading.Lock()

def claim_task(task_id, owner, role=None, source="manual"):
    with _claim_lock:                    # ① 加锁
        path = tasks_dir / f"task_{task_id}.json"
        task = json.loads(path.read_text())  # ② 读取
        if not is_claimable_task(task, role):  # ③ 校验（双重检查）
            return f"Error: Task {task_id} is not claimable"
        task["owner"] = owner            # ④ 更新
        task["status"] = "in_progress"
        task["claimed_at"] = time.time()
        task["claim_source"] = source
        path.write_text(json.dumps(task))  # ⑤ 写回
    # ⑥ 解锁

    _append_claim_event(...)  # 事件日志在锁外追加
```

为什么需要双重检查？

- `scan_unclaimed_tasks()` 在锁**外**先检查一次（快速过滤，避免不必要的加锁）
- `claim_task()` 在锁**内**再检查一次（防止两个线程同时通过第一次检查）

时序示例（两个 Teammate 同时扫描到同一个任务）：

```
Alice 线程                         _claim_lock                        Bob 线程
  │--- scan: task_3 可认领 -------->│                                  │--- scan: task_3 可认领 -->|
  │                                 │                                  │
  │--- claim_task(3) ------------->│                                  │
  │                                 │── 加锁成功 ──>│
  │                                 │── 校验通过 ──>│
  │                                 │── 写入 owner=alice ──>│
  │<-- 加锁释放 ───────────────────│                                  │
  │                                 │                                  │--- claim_task(3) ------->│
  │                                 │                                  │── 加锁成功 ──>│
  │                                 │                                  │── 校验失败（owner=alice）──>│
  │                                 │                                  │<-- "Error: not claimable" ──│
```

事件日志（`claim_events.jsonl`）在锁**外**追加写入。JSONL 追加写入本身是原子的（单行写入），即使并发也不会损坏。

### Q4: 长时间没有任务会怎么样？

Teammate 在 IDLE 阶段有超时机制。如果 `IDLE_TIMEOUT=60` 秒内既没有新消息也没有可认领任务，Teammate 会**自动关闭**，状态设为 `shutdown`。

```python
IDLE_POLL_INTERVAL = 5   # 每 5 秒轮询一次
IDLE_TIMEOUT = 60        # 空闲超时 60 秒

polls = IDLE_TIMEOUT // max(IDLE_POLL_INTERVAL, 1)  # 最多轮询 12 次

for _ in range(polls):
    time.sleep(IDLE_POLL_INTERVAL)

    # 检查 inbox
    inbox_msgs = self.bus.read_inbox(name)
    if inbox_msgs:
        resume = True
        break

    # 扫描任务板
    unclaimed = scan_unclaimed_tasks(role=role)
    if unclaimed:
        # 认领并恢复工作
        resume = True
        break

if not resume:
    # 超时，关闭
    self._set_status(name, STATUS_SHUTDOWN)
    return
```

超时后 Teammate 的线程退出，状态持久化为 `shutdown`。如果需要重新工作，Lead 可以调用 `spawn` 重新激活（复用已有记录）。

**为什么设置超时而不是无限等待？**

| 设计选择 | 原因 |
|----------|------|
| 有限超时（60s） | 避免空耗 LLM 资源和线程槽位 |
| 超时后关闭 | 释放系统资源，需要时 Lead 可重新 spawn |
| 不设为无限等待 | 无限等待 = 僵尸进程，浪费资源且难以管理 |

**身份重注入（`ensure_identity_context`）：**

Teammate 在 IDLE 阶段收到新消息恢复工作时，对话上下文可能已经被压缩（之前的 WORK 阶段积累了大量消息）。为了防止 Agent 忘记自己的身份，恢复时会重注入身份信息：

```python
def make_identity_block(name, role, team_name):
    return {
        "role": "user",
        "content": f"<identity>You are '{name}', role: {role}, team: {team_name}. Continue your work.</identity>",
    }

def ensure_identity_context(messages, name, role, team_name):
    if messages and "<identity>" in str(messages[0].get("content", "")):
        return
    messages.insert(0, make_identity_block(name, role, team_name))
    messages.insert(1, {"role": "assistant", "content": f"I am {name}. Continuing."})
```

这在 IDLE 阶段收到新消息或自动认领任务时调用，确保压缩后的上下文仍能正确识别 Teammate 的身份。
