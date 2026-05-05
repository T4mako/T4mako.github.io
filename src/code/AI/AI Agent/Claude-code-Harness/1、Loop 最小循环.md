# Loop 最小循环

## 整体交互流程

```
用户输入 → 追加为 role=user 消息 → 发送请求(携带消息历史 + tools) → 模型推理
    ↓
模型返回文本响应 → 追加为 role=assistant 消息 → turn_count +1 → 返回给用户
    ↓
保存日志 → 等待下一轮输入
```

Loop 系统是整个架构的最底层：一个 `while True` 外循环等待用户输入，每轮调用 `turn()` 完成一次"发请求 → 收响应 → 记录历史"的交互。后续所有模块（Tool、Plan、SubAgent 等）都是在这个最小循环之上叠加的。

## 实现思路

整个最小循环由两个函数组成，都定义在 `loop.py` 中：

| 函数 | 职责 |
|------|------|
| `agent_loop(state)` | 外循环：读取用户输入、处理退出、调用 `turn()`、保存日志 |
| `turn(state, user_text)` | 单轮：将用户文本追加为消息 → 发 API 请求 → 记录响应 → 返回文本 |

状态管理由 `LoopState` 数据类承载，只有两个字段：

```python
@dataclass
class LoopState:
    messages: list = field(default_factory=list)  # 完整的消息历史记录
    turn_count: int = 0                            # 已完成的轮次
```

`messages` 数组在每轮请求时完整传给 API，这就是多轮对话能保持上下文的原因 —— 模型每次都能看到从第一轮开始的所有消息。

## 核心问题

### Q1: 为什么叫 Loop？它的基本结构是什么？

和大模型交互的本质是一个循环过程，循环的最小单位是 **turn**（一轮对话）。

```python
# agent_loop — 外循环，持续等待用户输入
def agent_loop(state: LoopState) -> None:
    while True:
        query = input("\033[36m>> \033[0m")
        # ... 处理退出/空输入
        response = turn(state, query)
        print(response)
        save_log(...)
```

外循环负责：获取输入 → 过滤退出/空输入 → 调用 `turn()` → 输出结果 → 保存日志。

```python
# turn — 单轮交互
def turn(state: LoopState, user_text: str) -> str | None:
    state.messages.append({"role": "user", "content": user_text})

    while True:
        response = client.chat.completions.create(
            model=MODEL,
            messages=normalize_messages(state.messages),
            tools=_tools,
            temperature=0.7,
        )

        msg = {
            "role": "assistant",
            "content": response.choices[0].message.content,
        }
        state.messages.append(msg)
        state.turn_count += 1
        return response.choices[0].message.content
```

`turn()` 内部也有一个 `while True` 内循环，最小实现中它只执行一次就返回（因为不做工具调用）。后续 Tool 系统展开后，这个内循环会在"模型调用工具 → 执行工具 → 再请求"之间往返多次。

### Q2: 多轮对话是如何保持上下文的？

答案很简单：**程序维护一个 `messages` 数组，每轮完整发送给 API**。

消息历史的累积过程：

```
第 1 轮: [system, user]            → API → [system, user, assistant]
第 2 轮: [system, user, assistant] → API → [system, user, assistant, user, assistant]
第 3 轮: [system, user, assistant, user, assistant] + 新user → API → ...
```

模型每次推理时看到的不是"摘要"或"上一轮回复"，而是从 system 消息开始的完整对话历史。这就是为什么模型能"记住"第一轮说了什么 —— 不是记忆，是每次都在输入里。

代价是消息历史随轮次线性增长，最终会接近上下文窗口上限。后续的 Compression（上下文压缩）模块就是为解决这个问题。