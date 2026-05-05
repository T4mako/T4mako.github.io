# Error 错误恢复

## 整体交互流程

```
turn() 中的 API 调用
       ↓
call_with_recovery()  — 外层最多 MAX_RECOVERY_ATTEMPTS+1 次循环
       │
       ├─ 调用成功，finish_reason 正常（stop/tool_calls）
       │   → 返回 (response, "ok")
       │
       ├─ 调用成功，finish_reason == "length"（输出截断）
       │   → 返回 (response, "continue") → turn() 追加已输出内容 + 续写提示 → continue 循环
       │
       ├─ BadRequestError + context_length_exceeded（上下文过长）
       │   → compact_fn() 压缩消息 → continue 循环重试
       │
       └─ APITimeoutError / APIConnectionError / RateLimitError / 5xx（临时错误）
           → 指数退避等待 → continue 循环重试
```

## 实现思路

错误模块位于 `src/utils/error_recovery.py`，核心是一个 `call_with_recovery()` 包装器，将裸 API 调用包裹在重试循环中。

| 组件 | 职责 |
|------|------|
| `call_with_recovery()` | 带恢复的 API 调用入口，三种策略的分发中心 |
| `RecoveryState` | 跟踪当前轮次的恢复计数器（输出续写次数） |
| `is_prompt_too_long()` | 判断是否为上下文过长错误（兼容不同 provider 格式） |
| `is_transient()` | 判断是否为可重试的临时错误 |
| `backoff_delay()` | 指数退避 + 随机抖动 |
| `APIRetryError` | 所有重试耗尽后抛出的统一异常 |

`loop.py` 中将原来的裸 `client.chat.completions.create()` 替换为 `call_with_recovery()`，并将 `compact_history` 作为 `compact_fn` 传入。

## 核心问题

### Q1: 为什么需要错误恢复？

没有错误恢复时，agent 的 API 调用是"一次成功或崩溃"的模式：

```python
# 没有恢复 — 任何异常直接终止
response = client.chat.completions.create(
    model=MODEL, messages=messages, tools=_tools
)
```

实际问题：

- **输出被截断**（`finish_reason="length"`）— 模型的话没说完就被截断，agent 丢失了后续内容
- **上下文太长**（`prompt_too_long`）— 对话历史累积过多，超过模型上下文窗口
- **网络抖动**（超时/限流/5xx）— 临时性错误，稍等重试即可成功

这些都不是"致命错误"，但如果不处理，agent 会直接终止或返回不完整结果。

**错误恢复的目标：** 遇到可恢复异常时，自动采取对应策略（续写/压缩/重试），让 agent **自愈而非崩溃**。

### Q2: 有哪些常见 Error？

按可恢复性分类：

| 类别 | 具体异常 | 可恢复 | 恢复方式 |
|------|---------|--------|----------|
| 输出截断 | `finish_reason == "length"` | 是 | 注入续写提示，让模型继续 |
| 上下文过长 | `BadRequestError` + `context_length_exceeded` | 是 | 压缩对话历史后再试 |
| 临时网络错误 | `APITimeoutError`（超时） | 是 | 指数退避重试 |
| 临时网络错误 | `APIConnectionError`（连接失败） | 是 | 指数退避重试 |
| 临时网络错误 | `RateLimitError`（限流） | 是 | 指数退避重试 |
| 临时网络错误 | `APIStatusError` (status >= 500) | 是 | 指数退避重试 |
| 不可恢复 | `BadRequestError`（非上下文过长） | 否 | 直接抛出 |
| 不可恢复 | 其他 `Exception` | 否 | 直接抛出 |

**上下文过长错误的多样性：** 不同 provider 返回的错误格式不同，`is_prompt_too_long()` 需要兼容多种判断：

```python
def is_prompt_too_long(exc: Exception) -> bool:
    body = str(exc).lower()
    if isinstance(exc, BadRequestError) and "context_length" in body:
        return True
    if "prompt_too_long" in body:
        return True
    if "context_length_exceeded" in body:
        return True
    if "maximum context length" in body:
        return True
    return False
```

### Q3: 不同 Error 怎么恢复？

三种恢复策略，按优先级首次匹配即生效：

---

**策略 1：输出截断 → 注入续写提示，让模型继续**

```
call_with_recovery() 检测到 finish_reason == "length"
       ↓
output_recovery_count += 1
       ↓
≤ MAX_RECOVERY_ATTEMPTS (3次)？
       ├─ 是 → 返回 (response, "continue")
       │         ↓
       │         turn() 收到 action=="continue"：
       │         1. 将已输出的内容追加为 assistant 消息
       │         2. 追加 CONTINUATION_MESSAGE 为 user 消息
       │         3. continue → 回到循环顶部，重新调用 API
       │
       └─ 否 → 打印 "续写次数耗尽" → 返回 (response, "ok") 强制结束
```

续写提示内容：

```python
CONTINUATION_MESSAGE = (
    "输出被截断了。请直接从上次中断的地方继续，不要重复已有内容，"
    "如果需要可以从中断的句子中间继续。"
)
```

关键设计：
- `RecoveryState.output_recovery_count` 跟踪当前轮次已续写次数，防止无限续写
- 正常响应（非 length）时调用 `reset_output_counter()` 重置计数器
- 续写时把已输出内容作为 assistant 消息追加，模型能看到自己写到了哪里

---

**策略 2：上下文太长 → 压缩后再试一次**

```
call_with_recovery() 捕获 BadRequestError
       ↓
is_prompt_too_long(e) 为 True？
       ├─ 是 → 调用 compact_fn()（即 compact_history）
       │         ↓
       │         1. 将完整对话写入磁盘（transcript）
       │         2. 调用模型生成摘要
       │         3. 用单条 user 消息替换 state_messages
       │         ↓
       │         continue → 回到循环顶部，用压缩后的消息重试
       │
       └─ 否 → 直接抛出（非上下文过长的 BadRequest 不重试）
```

关键设计：
- `compact_fn` 由 `loop.py` 传入（`lambda: compact_history(client, MODEL, state.messages, COMPACT_STATE)`）
- 压缩后 `state_messages` 被就地替换，下次循环的 `normalize_messages()` 会使用新内容
- 每次 compact 后都 `continue` 重试，不消耗外层 `MAX_RECOVERY_ATTEMPTS` 计数

---

**策略 3：超时/限流/服务抖动 → 等一会再试一次**

```
call_with_recovery() 捕获 APITimeoutError / APIConnectionError / RateLimitError / 5xx
       ↓
is_transient(e) 为 True 且 attempt < MAX_RECOVERY_ATTEMPTS？
       ├─ 是 → delay = backoff_delay(attempt)
       │         ↓
       │         time.sleep(delay)
       │         ↓
       │         continue → 回到循环顶部重试
       │
       └─ 否 → 抛出 APIRetryError("API 调用失败，已重试 N 次")
```

退避计算：

```python
def backoff_delay(attempt: int) -> float:
    """指数退避 + 随机抖动: base * 2^attempt + jitter"""
    delay = min(BACKOFF_BASE_DELAY * (2 ** attempt), BACKOFF_MAX_DELAY)
    return delay + random.uniform(0, 1)
```

| 重试次数 | 基础延迟 | 加上抖动后 |
|---------|---------|-----------|
| 第 1 次 | 1.0s | ~1.0-2.0s |
| 第 2 次 | 2.0s | ~2.0-3.0s |
| 第 3 次 | 4.0s | ~4.0-5.0s |
| 上限 | 30.0s | ~30.0-31.0s |

关键设计：
- 随机抖动（`random.uniform(0, 1)`）避免多个实例同时重试造成"惊群效应"
- `BACKOFF_MAX_DELAY` 上限防止退避时间过长
- 最多重试 `MAX_RECOVERY_ATTEMPTS` (3) 次，耗尽后抛出 `APIRetryError`

---

**恢复优先级总结：**

```
API 调用 → 成功？
    ├─ finish == "length"      → 策略 1: 续写（最高优先级，首次匹配）
    ├─ finish == "stop/calls"  → 正常返回
    └─ 异常？
        ├─ prompt_too_long     → 策略 2: 压缩 + 重试
        ├─ 临时网络错误         → 策略 3: 退避重试
        └─ 其他错误             → 直接抛出（不重试）
```

**参数一览：**

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `MAX_RECOVERY_ATTEMPTS` | 3 | 最大恢复尝试次数 |
| `BACKOFF_BASE_DELAY` | 1.0s | 第一次重试等待的基础秒数 |
| `BACKOFF_MAX_DELAY` | 30.0s | 单次重试等待的上限秒数 |
