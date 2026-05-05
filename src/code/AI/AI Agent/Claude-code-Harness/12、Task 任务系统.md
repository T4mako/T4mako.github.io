# Task 任务系统（Plan 加强）

## 整体交互流程

```
模型需要分解多步工作
       ↓
task_create(subject, description)  — 创建任务，分配自增 ID，写入 .tasks/task_N.json
       ↓
task_update(task_id, addBlockedBy=[1], addBlocks=[3])  — 建立依赖关系
       ↓
task_update(task_id, status="in_progress")  — 开始执行
       ↓
task_update(task_id, status="completed")  — 完成，自动清除其他任务的 blockedBy
       │
       └─ 每轮 turn() 检查：未使用 task 工具超过 6 轮 → 注入提醒消息
```

## 实现思路

Task 系统取代了原来的 Todo（`src/tools/todo.py` 已删除），核心升级：**从内存中的临时清单 → 磁盘上的持久化任务图**。

| 文件 | 职责 |
|------|------|
| `src/tasks/manager.py` | 任务 CRUD + 依赖图管理 + 提醒机制 |
| `src/tasks/__init__.py` | 模块导出 |
| `src/tools/registry.py` | 四个 task 工具（create/update/list/get）的元信息和 handler |

存储路径为 `{WORKDIR}/.tasks/`，每个任务是一个独立的 JSON 文件：

```
.tasks/
  task_1.json    ← {"id": 1, "subject": "实现登录", "status": "completed", "blockedBy": [], "blocks": [2]}
  task_2.json    ← {"id": 2, "subject": "编写测试", "status": "in_progress", "blockedBy": [], "blocks": []}
  task_3.json    ← {"id": 3, "subject": "部署", "status": "pending", "blockedBy": [2], "blocks": []}
```

`loop.py` 中的集成：每轮工具执行后检测是否调用了 task 工具，调用 `TASK_MANAGER.note_task_used()` 或 `TASK_MANAGER.note_turn_without_use()`，超过 6 轮未使用时注入提醒消息。

## 核心问题

### Q1: 为什么需要 Task 任务系统？Todo 的问题是什么？

Todo（`src/tools/todo.py`，已删除）是一个**会话中的临时清单**：

```python
# 旧 Todo 的核心 — 纯内存，无持久化
@dataclass
class PlanningState:
    items: list = field(default_factory=list)
    rounds_since_update: int = 0

class TodoManager:
    def __init__(self):
        self.state = PlanningState()  # 存在内存里，会话结束就没了
```

Todo 的两个根本问题：

**1. 不持久化 — 会话结束就丢失**

Todo 的数据存在 `PlanningState` 这个内存对象里。agent 重启后，之前的计划全部丢失，需要重新创建。

**2. 不擅长表达"谁先谁后、谁依赖谁"**

Todo 是一个扁平列表，每个 item 只有 `content` + `status` + `activeForm`：

```python
# Todo 只能表达"做了什么"，不能表达"谁依赖谁"
[
    {"content": "搭建数据库", "status": "pending"},
    {"content": "实现 API", "status": "pending"},    # ← 依赖上面的数据库？Todo 不知道
    {"content": "写前端", "status": "pending"},      # ← 依赖上面的 API？Todo 不知道
]
```

Task 系统解决这两个问题：

- **持久化到磁盘** — 每个任务是 `.tasks/task_N.json`，跨会话存活
- **依赖图** — 每个任务有 `blockedBy`（被谁阻塞）和 `blocks`（阻塞了谁），形成有向图

### Q2: Task 有哪些信息与功能？

每个任务（`TaskRecord`）是一个可被跟踪、被分配、被完成、被阻塞的小工作单元：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `int` | 自增唯一标识，创建时自动分配 |
| `subject` | `str` | 简短标题（必需） |
| `description` | `str` | 详细描述 |
| `status` | `str` | 状态：`pending` / `in_progress` / `completed` / `deleted` |
| `blocked_by` | `list[int]` | **该任务没完成时，哪些任务不能做**（被哪些任务阻塞） |
| `blocks` | `list[int]` | **该任务阻塞了哪些任务**（哪些任务在等它） |
| `owner` | `str` | 现在由谁来做（团队成员名） |
| `worktree` | `str` | 绑定的 worktree 隔离目录 |
| `worktree_state` | `str` | worktree 状态：`unbound` / `active` / `kept` / `removed` |

**状态流转：**

```
pending ──→ in_progress ──→ completed
  │                                            │
  └──────────────────→ deleted                  │
                                  完成时自动清除其他任务的 blockedBy
```

**功能操作：**

| 操作 | 函数 | 说明 |
|------|------|------|
| 创建 | `create(subject, description)` | 分配 ID，写入 JSON 文件 |
| 查询 | `get(task_id)` | 读取 JSON 文件，返回 `TaskRecord` |
| 更新 | `update(task_id, status/owner/subject/description/addBlockedBy/addBlocks)` | 更新任意字段 |
| 列出 | `list_all()` | 扫描所有 `.tasks/task_*.json`，返回 checklist 文本 |

**依赖管理：**

- `addBlockedBy=[1]` — 本任务被任务 1 阻塞，等任务 1 完成才能开工
- `addBlocks=[2, 3]` — 本任务阻塞任务 2 和 3。**双向更新**：同时把本任务 ID 加入任务 2 和 3 的 `blockedBy`
- `status="completed"` — 自动调用 `_clear_dependency()`，从所有其他任务的 `blockedBy` 中移除本任务 ID

### Q3: 模型怎么知道是否要启动 Task？

模型通过**系统提示词**获知 task 工具的存在和使用方式：

```
Use task_create/task_update/task_list for multi-step work.
Keep exactly one task in_progress at a time.
Tasks persist across sessions on disk. Prefer tools over prose.
```

此外，模型可以看到 `task_create` / `task_update` / `task_list` / `task_get` 四个工具的 Function Calling 元信息（name、description、parameters schema）。

**模型决策逻辑：**

```
用户请求涉及多步工作？
    ├─ 是 → task_create 创建多个任务 → task_update 建立依赖 → task_update 开始执行
    └─ 否 → 直接做，不需要 task
```

**提醒机制：** 如果模型超过 `TASK_REMINDER_INTERVAL` (6 轮) 没有使用 task 工具，`loop.py` 会注入提醒消息：

```python
<reminder>Check your task list before continuing.
Use task_list to review, task_update to mark progress.</reminder>
```

这促使模型在有未完成任务时回头查看任务列表，而不是遗忘。

### Q5: 模型如何管理与交互 Task？

模型通过四个工具与任务系统交互：

**创建任务 — `task_create`**

```
模型调用 task_create(subject="实现登录", description="用 JWT 做认证")
       ↓
TASK_MANAGER.create() → 分配 ID=1 → 写入 .tasks/task_1.json → 返回 JSON
```

**更新任务 — `task_update`**

```
模型调用 task_update(task_id=1, status="in_progress")
       ↓
TASK_MANAGER.update() → 读取 task_1.json → 更新 status → 写回

模型调用 task_update(task_id=1, addBlocks=[2])
       ↓
TASK_MANAGER.update() → 1.blocks 加入 2 → 2.blockedBy 加入 1（双向更新）

模型调用 task_update(task_id=1, status="completed")
       ↓
TASK_MANAGER.update() → 更新 status → _clear_dependency(1) 从所有任务的 blockedBy 中移除 1
```

**列出任务 — `task_list`**

```
模型调用 task_list()
       ↓
TASK_MANAGER.list_all() → 扫描 .tasks/task_*.json → 返回 checklist 文本：

[>] #1: 实现登录 (用 JWT 做认证)
[ ] #2: 编写测试 (blocked by: [1])
[ ] #3: 部署

(1 pending, 1 in progress, 0 completed)
```

**查询任务详情 — `task_get`**

```
模型调用 task_get(task_id=1)
       ↓
TASK_MANAGER.get() → 读取 task_1.json → 返回完整 JSON
```

### Q6: Task 比 Todo 的优势有哪些？

| 维度 | Todo（旧） | Task（新） |
|------|-----------|-----------|
| **持久化** | 内存，会话结束丢失 | 磁盘 JSON 文件，跨会话存活 |
| **依赖关系** | 无，扁平列表 | `blockedBy` / `blocks` 有向依赖图 |
| **自动解锁** | 无 | 完成任务时自动从其他任务 blockedBy 中清除 |
| **任务标识** | 列表索引（不稳定） | 自增 ID（稳定，可引用） |
| **负责人** | 无 | `owner` 字段，支持团队协作 |
| **工作隔离** | 无 | `worktree` 字段，支持隔离执行 |
| **粒度操作** | 每次重写整个列表 | 按 ID 更新单个字段 |
| **状态** | pending / in_progress / completed | + deleted（软删除） |

**具体对比：**

```python
# Todo: 每次调用要重写整个列表，没有 ID 引用
todo(items=[
    {"content": "搭建数据库", "status": "completed"},
    {"content": "实现 API", "status": "in_progress"},
    {"content": "写前端", "status": "pending"},
])

# Task: 按 ID 操作，有依赖关系
task_create("搭建数据库")           # → ID=1
task_create("实现 API")             # → ID=2
task_create("写前端")               # → ID=3
task_update(1, addBlocks=[2])      # 2 等 1 完成
task_update(2, addBlocks=[3])      # 3 等 2 完成
task_update(1, status="completed") # 自动解锁 2
```

**子代理权限控制：** subagent 被排除 task 工具（`task_create`、`task_update`、`task_list`、`task_get`），防止子代理修改全局任务图：

```python
# subagent.py
_EXCLUDED = {"sub_agent", "task_create", "task_update", "task_list", "task_get"}
```
