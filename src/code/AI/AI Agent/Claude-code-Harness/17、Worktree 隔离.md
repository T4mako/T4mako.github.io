# Worktree 隔离

## 整体交互流程

```
Lead 调用 worktree_create(name="task-3", task_id=3)
       ↓
WorktreeManager.create()
       ├─ 校验名称（1-40 字符，字母数字._-）
       ├─ git worktree add -b wt/task-3 .worktrees/task-3 HEAD
       ├─ 写入 .worktrees/index.json 索引条目
       └─ TaskManager.bind_worktree(3, "task-3") → 任务记录 worktree="task-3", worktree_state="active"
       │
       ├─ worktree_run("task-3", "npm test")     ← 在隔离目录执行命令
       ├─ worktree_run("task-3", "uv run main.py")
       │
       └─ worktree_closeout("task-3", action="keep", reason="功能完成")
              ↓
         更新索引 status="kept"，记录 closeout，任务同步更新 worktree_state
```

**Worktree 与 Task 的双向绑定：**

```
TaskRecord                          .worktrees/index.json
  ├─ worktree: "task-3"              ├─ worktrees:
  ├─ worktree_state: "active"        │    ├─ name: "task-3"
  ├─ last_worktree: "task-3"        │    ├─ path: ".worktrees/task-3"
  └─ closeout: {...}                 │    ├─ branch: "wt/task-3"
                                     │    ├─ task_id: 3
                                     │    └─ status: "active"
```

**生命周期事件流：**

```
worktree.create.before
       ↓
git worktree add ...
       ↓
worktree.create.after
       ↓
worktree.enter (进入工作目录)
       ↓
worktree.run.before → shell command → worktree.run.after (可多次)
       ↓
worktree.closeout.keep / worktree.closeout.remove
       ↓
worktree.remove.after (含 git worktree remove)
```

## 实现思路

Worktree 隔离的本质是：**每个任务获得一个独立的 git worktree 目录，代码变更互不干扰。**

`git worktree` 是 Git 内置功能，允许从同一个仓库创建多个独立的工作树，每个工作树有自己的分支和工作目录。

| 文件 | 职责 |
|------|------|
| `src/worktrees/manager.py` | Worktree 生命周期管理（创建/进入/执行/关闭）+ 索引维护 |
| `src/worktrees/event_bus.py` | 追加式事件日志，记录 worktree 生命周期事件 |
| `src/worktrees/__init__.py` | 模块导出 |
| `src/tasks/manager.py` | TaskRecord 增加 worktree 字段 + `bind_worktree`/`record_closeout` |
| `src/tools/registry.py` | 9 个 worktree 工具的元信息和 handler |
| `src/agents/teammate_manager.py` | Teammate 排除 worktree 工具（由 Lead 统一管理） |

存储路径：

```
.worktrees/
  index.json              ← 所有 worktree 的索引（名称、路径、分支、任务绑定、状态）
  events.jsonl            ← 生命周期事件日志（每行一个 JSON）
  task-3/                 ← 实际的 worktree 目录（git 管理）
    .git                  ← 指向主仓库的指针
    ... 项目文件 ...
  task-7/
    ...
```

核心理念：**"按目录隔离，按任务 ID 协调。"** — 每个 worktree 是一个独立目录，通过 `task_id` 与 Task 系统关联。

## 核心问题

### Q1: 什么是 Worktree？为什么需要？

`git worktree` 是 Git 内置功能，允许从同一个仓库创建多个独立的工作树。每个 worktree 有自己的分支和工作目录，但共享同一个 `.git` 对象库。

```bash
# 手动等价的命令
git worktree add -b wt/task-3 .worktrees/task-3 HEAD
# 现在 .worktrees/task-3/ 是一个独立的工作目录，基于 HEAD 创建了 wt/task-3 分支
```

为什么需要？

两个任务同时改同一个文件：

```
Alice: 在 task-3 中修改 src/auth.py（写到 .worktrees/task-3/src/auth.py）
Bob:   在 task-7 中修改 src/auth.py（写到 .worktrees/task-7/src/auth.py）
```

两个修改在各自的目录中互不干扰。没有 worktree 的话，两个任务都改同一个 `src/auth.py`，后写的覆盖先写的。

也就是说，任务系统已经回答了"谁做什么"，却还没有回答：**每个任务应该在哪个独立工作空间里执行。**

这就是 worktree 要解决的问题。

| 场景 | 无 worktree | 有 worktree |
|------|------------|------------|
| 两个任务同时改同一文件 | 互相覆盖 | 各自目录独立修改 |
| 一个任务还没做完，另一个已完成 | 目录已被污染，难以回看 | 每个 worktree 独立，可随时查看 |
| 单独回看某个任务的改动范围 | `git diff` 混在一起 | `cd .worktrees/task-3 && git diff` 清晰 |
| 任务回滚 | 影响其他任务 | `git worktree remove` 即可丢弃 |

### Q2: 谁分配 Worktree？Teammate 如何知道要在哪做、目录在哪、对应哪个任务？

**Worktree 由 Lead 统一分配。**

Teammate **不能** 自行创建或管理 worktree。所有 worktree 工具（`worktree_create`、`worktree_run`、`worktree_closeout` 等）都被排除在 Teammate 的工具集之外：

```python
TEAMMATE_EXCLUDED_TOOLS = {
    # ... 其他排除的工具
    "worktree_create", "worktree_list", "worktree_enter", "worktree_status",
    "worktree_run", "worktree_closeout", "worktree_keep", "worktree_remove",
    "worktree_events",
}
```

分配流程：

```
Lead 看到 Teammate 认领了任务 3
       ↓
Lead 调用 worktree_create(name="task-3", task_id=3)
       ↓
WorktreeManager.create()
       ├─ 创建 git worktree → .worktrees/task-3/
       ├─ 写入 index.json
       └─ TaskManager.bind_worktree(3, "task-3")
              ↓
         任务 3 的记录更新:
           worktree = "task-3"
           worktree_state = "active"
           last_worktree = "task-3"
```

Teammate 不需要知道 worktree 的具体路径。Lead 在分配任务时（通过 `send_message` 发送指令），会在消息中告知 Teammate 使用哪个 worktree 名称。Teammate 的实际文件操作通过 Lead 代理（Lead 使用 `worktree_run("task-3", command)` 在隔离目录中执行命令）。

**双向绑定关系：**

| 方向 | 存储位置 | 字段 |
|------|----------|------|
| Task → Worktree | `.tasks/task_3.json` | `worktree: "task-3"`, `worktree_state: "active"` |
| Worktree → Task | `.worktrees/index.json` | `task_id: 3` |

### Q3: 实现 Worktree 要记录哪些东西？

Worktree 系统维护两类记录：

**1. Worktree 索引（`.worktrees/index.json`）**

```json
{
  "worktrees": [
    {
      "name": "task-3",
      "path": ".worktrees/task-3",
      "branch": "wt/task-3",
      "task_id": 3,
      "status": "active",
      "created_at": 1714567890.123,
      "last_entered_at": 1714567900.456,
      "last_command_at": 1714568000.789,
      "last_command_preview": "uv run pytest tests/test_auth.py",
      "kept_at": null,
      "removed_at": null,
      "closeout": null
    }
  ]
}
```

| 字段 | 说明 |
|------|------|
| `name` | worktree 名称（1-40 字符，字母数字._-） |
| `path` | 实际目录路径 |
| `branch` | Git 分支名（`wt/{name}`） |
| `task_id` | 绑定的任务 ID（可选） |
| `status` | 当前状态：`active`/`kept`/`removed` |
| `created_at` | 创建时间 |
| `last_entered_at` | 最后进入时间 |
| `last_command_at` | 最后执行命令时间 |
| `last_command_preview` | 最后执行的命令（前 120 字符） |
| `kept_at` / `removed_at` | 关闭时间 |
| `closeout` | 关闭记录（`{action, reason, at}`） |

**2. 任务记录中的 worktree 字段（`.tasks/task_N.json`）**

`TaskRecord` 新增了四个 worktree 相关字段：

| 字段 | 说明 |
|------|------|
| `worktree` | 当前绑定的 worktree 名称 |
| `worktree_state` | 绑定状态：`unbound`/`active`/`kept`/`removed` |
| `last_worktree` | 最后使用过的 worktree 名称（即使已移除也保留） |
| `closeout` | 关闭记录（`{action, reason, at}`） |

**3. 事件日志（`.worktrees/events.jsonl`）**

```json
{"event": "worktree.create.before", "task_id": 3, "worktree": "task-3", "ts": 1714567890.123}
{"event": "worktree.create.after", "task_id": 3, "worktree": "task-3", "ts": 1714567891.456}
{"event": "worktree.enter", "task_id": 3, "worktree": "task-3", "ts": 1714567900.789}
{"event": "worktree.run.before", "task_id": 3, "worktree": "task-3", "command": "uv run pytest", "ts": 1714568000.123}
{"event": "worktree.run.after", "task_id": 3, "worktree": "task-3", "ts": 1714568005.456}
{"event": "worktree.closeout.keep", "task_id": 3, "worktree": "task-3", "reason": "功能完成", "ts": 1714569000.789}
```

事件类型包括：`worktree.create.before/after/failed`、`worktree.enter`、`worktree.run.before/after/timeout`、`worktree.remove.before/after/failed`、`worktree.keep`、`worktree.closeout.keep/remove`、`task.completed`。

### Q4: worktree_state 有哪些？

Worktree 有两个层面的状态，分别记录在不同的地方：

**索引中的 `status`（`.worktrees/index.json`）：**

| 状态 | 含义 | 转换 |
|------|------|------|
| `active` | 正在使用中，可执行命令 | 初始状态，由 `keep()`/`remove()` 转换 |
| `kept` | 已保留，目录和分支仍存在 | `active → kept`（通过 `keep()` 或 `closeout(action="keep")`） |
| `removed` | 已移除，`git worktree remove` 已执行 | `active → removed`（通过 `remove()` 或 `closeout(action="remove")`） |

**任务记录中的 `worktree_state`（`.tasks/task_N.json`）：**

| 状态 | 含义 | 转换 |
|------|------|------|
| `unbound` | 未绑定 worktree | 初始状态，由 `bind_worktree()` 转换 |
| `active` | 已绑定，worktree 正在使用中 | `unbound → active`（通过 `bind_worktree()`） |
| `kept` | 已保留，worktree 目录仍存在 | `active → kept`（通过 `record_closeout(action="kept")`） |
| `removed` | 已移除，worktree 已删除 | `active → removed`（通过 `record_closeout(action="removed")`） |

状态流转：

```
unbound ──bind_worktree()──→ active ──keep()──→ kept
                                        ──remove()──→ removed
```

`last_worktree` 字段始终记录**最后使用过的 worktree 名称**，即使该 worktree 已被移除。这样即使任务被重新绑定到新的 worktree，也能追溯之前在哪里执行过。

### Q5: 任务完成后，怎么决定要保留还是删除？

通过 `worktree_closeout(name, action, reason, force, complete_task)` 高层接口统一处理。`action` 只有两个值：`keep` 或 `remove`。

**保留（`action="keep"`）：**

```python
worktree_closeout("task-3", action="keep", reason="功能完成，等待审查")
```

- worktree 索引 `status` → `kept`，记录 `kept_at` 时间
- 任务 `worktree_state` → `kept`，记录 `closeout`
- **保留 worktree 绑定**（`keep_binding=True`），`worktree` 字段不变
- 目录和分支仍然存在，可随时继续工作

**删除（`action="remove"`）：**

```python
worktree_closeout("task-3", action="remove", reason="任务已合并", complete_task=True)
```

- 执行 `git worktree remove`（可加 `--force` 强制移除有未提交更改的目录）
- worktree 索引 `status` → `removed`，记录 `removed_at`
- 任务 `worktree_state` → `removed`，`worktree` 字段清空（`keep_binding=False`）
- 记录 `closeout`，`last_worktree` 保留原名称
- 如果 `complete_task=True`，同时将任务标记为 `status="completed"`

**决策依据：**

| 场景 | 操作 | 原因 |
|------|------|------|
| 功能完成，等待 Code Review | `keep` | 审查者需要查看实际改动 |
| 功能已合并到主分支 | `remove` | 改动已合并，隔离目录不再需要 |
| 任务被放弃 | `remove` | 无需保留废弃的改动 |
| 需要后续迭代 | `keep` | 在同一个 worktree 中继续开发 |
| 有未提交更改但必须清理 | `remove + force` | 强制丢弃未提交的更改 |

**`closeout` 记录：**

无论是保留还是删除，都会在 worktree 索引和任务记录中写入 `closeout`：

```json
{
  "action": "keep",
  "reason": "功能完成，等待审查",
  "at": 1714569000.789
}
```

这样即使时间推移，也能追溯每个 worktree 最终是如何处理的。
