# SubAgent 子代理系统

## 整体交互流程

```
主 Agent 调用 task 工具 → 传入 prompt(指令) + description(描述)
    ↓
子代理以全新上下文启动 (独立消息历史, 独立系统提示词)
    ↓
子代理内部循环: 推理 → 调工具 → 收结果 → 继续推理 (最多30轮)
    ↓
子代理不再调工具, 返回最终总结文本
    ↓
主 Agent 收到返回结果, 继续自己的工作
```

## 实现思路

子代理的本质是：**一个独立的推理循环，拥有自己的消息历史，但共享文件系统**。

`src/agents/subagent.py` 中的 `run_subagent()` 函数实现了一个简化的 `turn()` 循环——它不依赖主 Agent 的 `LoopState`，而是从零开始构建消息列表，独立运行。

主 Agent 通过 `task` 工具触发子代理。对主 Agent 而言，`task` 是一个同步阻塞调用：调用时等待，子代理完成后返回结果字符串。

权限控制：子代理 **不能** 调用 `task`（不能再派生子代理）和 `todo`（不需要独立计划），通过 `_EXCLUDED` 集合过滤：

```python
_EXCLUDED = {"task", "todo"}
SUBAGENT_TOOLS = [
    t for t in PARENT_TOOLS if t["function"]["name"] not in _EXCLUDED
]
```

## 核心问题

### Q1: 为什么需要 SubAgent？

随着 Agent 工作深入，它会读取大量文件、调用众多工具，上下文（消息历史）不断增长。问题随之而来：

- **上下文窗口膨胀**：早期信息被稀释，模型注意力分散
- **Token 成本上升**：每轮请求都携带完整历史，越长越贵越慢
- **信息污染**：无关的中间过程干扰模型对当前任务的判断

SubAgent 的解法是 **上下文隔离**：父智能体将子任务委派给一个从零开始的子智能体，子智能体只携带任务指令工作，完成后只返回结果摘要。父智能体不需要知道子智能体的全部过程，只需要最终结论。

类比人类协作：你不需要亲自翻遍 100 个文件找某个函数的调用点，你告诉同事"帮我查一下 X 在哪里被调用"，同事查完告诉你结果即可。

### Q2: 模型如何创建 SubAgent？怎么让 SubAgent 干活的？

主 Agent 通过调用 `task` 工具创建子代理：

```python
# 工具元信息
{
    "name": "task",
    "description": "Spawn a subagent with fresh context. It shares the filesystem but not conversation history.",
    "parameters": {
        "prompt": "子代理的完整指令",
        "description": "简短标签(可选)"
    }
}
```

模型在推理中决定委派任务时，会像调用其他工具一样调用 `task`，传入详细的 `prompt` 描述子代理该做什么。

执行链路：

```
模型返回 tool_calls(task)
    → loop.py 分发到 handlers["task"]
        → _task() 调用 run_subagent(prompt, description)
            → subagent.py 启动独立循环
```

`run_subagent()` 内部是一个独立的推理循环（最多 30 轮）：

```python
messages = [
    {"role": "system", "content": SUBAGENT_SYSTEM},  # 独立系统提示词
    {"role": "user", "content": prompt},              # 父 Agent 传入的指令
]

for _ in range(30):
    response = client.chat.completions.create(
        messages=normalize_messages(messages),
        tools=SUBAGENT_TOOLS,
    )
    # 无工具调用 → 返回最终结果
    # 有工具调用 → 执行、追加结果、继续循环
```

### Q3: SubAgent 和主 Agent 的区别有哪些？

| 维度 | 主 Agent | 子代理 |
|------|----------|--------|
| **消息历史** | 完整的用户对话 + 所有工具调用记录 | 只有系统提示词 + 任务 prompt |
| **可用工具** | 全部工具 | 排除 `task` 和 `todo` |
| **生命周期** | 持续运行，服务整个会话 | 单次任务，完成后销毁 |
| **系统提示词** | 编码代理身份 + 任务引导 | 子代理身份 + "完成后总结" |
| **轮次限制** | 无硬性上限 | 最多 30 轮 |
| **任务计划** | 有 `todo` 工具维护计划 | 无独立计划，专注单次任务 |
| **派生能力** | 可创建子代理 | 不能再派生子代理（防嵌套过深） |

共享部分：**文件系统**（同一个 `WORKDIR`）、**工具执行函数**（同一个 `handlers` 字典）。子代理读写的文件，主代理立即可见。

### Q4: SubAgent 干完活怎么通知主 Agent？会被删除吗？

**通知方式：** `run_subagent()` 是一个 **同步阻塞** 调用。子代理运行完成后，将最终文本作为函数返回值直接返回给 `_task()`，再由 `_task()` 返回给 `loop.py` 的工具执行框架，最终作为 `role: tool` 消息写入主 Agent 的消息历史。

```
run_subagent() 返回 "xxx函数在 a.py:10, b.py:25 被调用"
    → _task() 返回该字符串
        → loop.py 写入 {role: "tool", content: "xxx函数在..."}
            → 主 Agent 下一轮推理看到结果
```

**生命周期：** 子代理是函数级别的临时对象，没有持久化状态。`run_subagent()` 返回后，其内部 `messages` 列表随函数栈帧销毁，不再存在。没有"删除"操作，就是普通的函数返回后局部变量回收。

如果子代理达到 30 轮上限仍未完成，返回 `"(subagent reached turn limit)"` 作为结果，主 Agent 可以据此判断任务未完成并决定下一步行动。
