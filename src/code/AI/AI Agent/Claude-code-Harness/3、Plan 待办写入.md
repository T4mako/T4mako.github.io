# Plan 待办写入系统

## 整体交互流程

```
模型调用 todo 工具 → 传入完整的计划列表 → 验证/清洗 → 更新状态 → 渲染回传
    │
    └─ 若本轮未调用 todo → rounds_since_update +1
         └─ 达到阈值(3轮) → 注入 <reminder> 提醒模型刷新计划
```

Plan 系统不是一个独立运行的模块，它嵌入在工具调用循环中：模型主动调用 `todo` 工具来维护计划，系统被动计数并在超时后注入提醒。

## 实现思路

核心是一个 `TodoManager` 单例（`src/tools/todo.py`），内部维护 `PlanningState`（计划列表 + 距离上次更新的轮次计数）。

模型通过 `todo` 工具传入 **完整** 的计划列表（增量更新，不是追加单条），`TodoManager` 负责验证、清洗、渲染成可读格式返回给模型。

`loop.py` 在每轮工具执行后检查：如果模型没调 `todo`，就 `note_round_without_update()` 计数；达到阈值就注入一条 `role: user` 的提醒消息，促使模型关注计划。

## 核心问题

### Q1: 为什么需要 Plan？

大模型在多步任务中有一个常见缺陷：**注意力衰减**。当任务涉及多个步骤时，模型容易聚焦于当前正在做的事情，逐渐遗忘前面未完成的目标或后续待办。

Plan 系统提供了一个结构化的"待办清单"，让模型：

- 在开始时列出所有步骤，建立全局视野
- 每完成一步更新状态，保持进度可见
- 通过 `reminder` 机制防止模型长时间忽略计划

system prompt 中的引导语：

```python
"Use the todo tool for multi-step work. "
"Keep exactly one step in_progress when a task has multiple steps. "
"Refresh the plan as work advances."
```

### Q2: Plan 有哪些状态？

每个计划项（`PlanItem`）有三种状态：

| 状态 | 标记 | 说明 |
|------|------|------|
| `pending` | `[ ]` | 待执行，尚未开始 |
| `in_progress` | `[>]` | 进行中，**整个计划最多一个** |
| `completed` | `[x]` | 已完成 |

约束规则（`TodoManager.update()` 中强制执行）：

- `in_progress` 最多 1 个，否则抛异常 `Only one plan item can be in_progress`
- 计划项最多 12 条（`Keep the session plan short`）
- `content` 必填且不能为空

渲染效果示例：

```
[x] 阅读需求文档
[>] 实现登录功能 (Writing login handler)
[ ] 编写测试用例
[ ] 部署到测试环境

(1/4 completed)
```

### Q3: 模型如何修改 Plan 的状态？

通过 `todo` 工具，传入 **完整** 的计划列表（不是单条操作，是全量替换）：

```python
# 工具元信息定义
{
    "name": "todo",
    "description": "Rewrite the current session plan for multi-step work.",
    "parameters": {
        "items": [
            {"content": "实现登录功能", "status": "in_progress"},
            {"content": "编写测试", "status": "pending"},
        ]
    }
}
```

执行映射：

```python
handlers = {
    "todo": lambda items: TODO.update(items),
}
```

`update()` 方法流程：

1. 检查数量上限（≤ 12 条）
2. 逐条清洗：strip 空白、验证 status 合法性、检查 `in_progress` 唯一性
3. 全量替换 `self.state.items`
4. 重置 `rounds_since_update = 0`
5. 渲染并返回格式化字符串

**关键点：模型每次调用都要传入完整列表，包括已完成和待办的项。** 这迫使模型在更新时回顾整个计划，而不是只关注当前步骤。

### Q4: Plan 长时间没更新怎么解决？

`PlanningState` 维护一个 `rounds_since_update` 计数器：

- 模型调用 `todo` → 计数器重置为 0
- 模型本轮没调 `todo` → `note_round_without_update()` 计数 +1

达到阈值（`PLAN_REMINDER_INTERVAL = 3`）后，`reminder()` 返回一条提醒文本：

```python
def reminder(self) -> str | None:
    if not self.state.items:
        return None
    if self.state.rounds_since_update < PLAN_REMINDER_INTERVAL:
        return None
    return "<reminder>Refresh your current plan before continuing.</reminder>"
```

`loop.py` 在每轮工具执行后检查并注入：

```python
if not used_todo:
    TODO.note_round_without_update()
    reminder = TODO.reminder()
    if reminder:
        state.messages.append({
            "role": "user",
            "content": reminder,
        })
```

注入为 `role: user` 消息，模型在下一轮推理时会看到这条提醒，从而被促使去刷新计划。

**设计要点：** 只有当计划存在（`self.state.items` 非空）时才触发提醒。如果模型还没创建计划，不强制它创建——避免简单任务也被迫写计划。
