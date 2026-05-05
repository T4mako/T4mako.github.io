# Tool 工具调用系统

## 整体交互流程

```
用户输入 → 追加到消息历史 → 发送请求(携带 tools 元信息) → 模型决定
    ├─ 无需工具 → 直接返回文本 → 输出给用户
    └─ 需要工具 → 返回 tool_calls → 本地执行工具 → 结果追加为 role=tool 消息 → 继续循环
```

核心是一个 `while True` 循环，坐在一轮内可能经历多次"模型推理 → 工具执行"的往返，直到模型不再调用工具才结束本轮。

## 实现思路

整个工具系统由三个文件组成：

| 文件 | 职责 |
|------|------|
| `src/tools/registry.py` | 工具元信息(`_tools`) + 执行函数 + 名称映射(`handlers`) |
| `src/tools/message.py` | 消息规范化(丢弃孤儿调用、合并连续 tool 消息) |
| `src/tools/sandbox.py` | 安全基础设施(路径校验、危险命令检查) |

`loop.py` 中的 `turn()` 函数是调度中心：发请求 → 检查 `tool_calls` → 查 `handlers` 执行 → 结果写回消息历史 → 循环。

## 核心问题

### Q1: 模型怎么知道有哪些工具？

工具以 **OpenAI Function Calling 格式** 的 JSON 描述，通过 API 请求的 `tools` 参数发送给模型。模型在推理时读取这些元信息，决定是否需要调用、调用哪个、参数是什么。

```python
# registry.py 中定义
_tools = [
    {
        "type": "function",
        "function": {
            "name": "bash",
            "description": "Run a shell command in the workspace.",
            "parameters": {
                "type": "object",
                "properties": {"command": {"type": "string"}},
                "required": ["command"],
            },
        },
    },
    # ... 更多工具
]
```

`loop.py` 在创建请求时直接传入：

```python
response = client.chat.completions.create(
    model=MODEL,
    messages=normalize_messages(state.messages),
    tools=_tools,          # ← 工具元信息在这里传入
    temperature=0.7,
)
```

**模型看到的只有元信息（名称、描述、参数 schema），看不到执行代码。** 它根据描述判断用途，根据参数 schema 构造调用参数。

### Q2: 怎么定义工具？有哪些参数与注意事项？

每个工具两部分：**元信息**（给模型看）+ **执行函数**（本地运行）。

元信息结构（遵循 OpenAI Tool schema）：

| 字段 | 必需 | 说明 |
|------|------|------|
| `type` | 是 | 固定 `"function"` |
| `function.name` | 是 | 工具名称，模型用它引用工具 |
| `function.description` | 是 | 工具用途描述，**直接影响模型是否正确调用** |
| `function.parameters` | 是 | JSON Schema 格式的参数定义 |

执行函数通过 `handlers` 字典映射：

```python
handlers: dict[str, callable] = {
    "bash": _bash,
    "read_file": _read_file,
    "write_file": _write_file,
    "edit_file": _edit_file,
}
```

**注意事项：**

- `name` 必须与 `handlers` 的 key 一致，否则模型调用时会命中 `Unknown tool` 分支
- `description` 要清晰具体，模型完全依赖它判断何时使用该工具
- `parameters` 用 JSON Schema，`required` 字段告诉模型哪些参数必填
- 工具输出截断到 50000 字符，防止超长结果撑爆上下文窗口

### Q3: 模型是怎么调用工具的？

模型不需要工具时，正常返回 `content` 文本。需要工具时，返回的 `tool_calls` 列表非空，`content` 可能为 `null`：

```python
if response.choices[0].message.tool_calls:
    # 模型请求调用工具
    for tc in response.choices[0].message.tool_calls:
        raw = tc.function.arguments    # JSON 字符串，如 '{"command": "ls"}'
        args = json.loads(raw)
        fn = handlers.get(tc.function.name)
        output = fn(**args)            # 本地执行
```

调用流程：

1. 解析 `tc.function.arguments`（JSON 字符串 → dict）
2. 通过 `handlers.get(name)` 查找执行函数
3. 解包参数调用 `fn(**args)`
4. 执行结果以 `role: "tool"` 消息写回消息历史

模型可能一次请求调用多个工具（`tool_calls` 是一个列表），逐个执行即可。

### Q4: 工具执行结果如何传递给模型？

工具结果作为一条 `role: "tool"` 的消息追加到消息历史，然后 `while True` 循环再次发请求，模型在下一轮推理中就能看到结果：

```python
state.messages.append({
    "role": "tool",
    "tool_call_id": tc.id,    # 关联回模型的调用请求
    "content": output,        # 工具执行结果
})
# 循环继续 → 再次 client.chat.completions.create(...)
```

`tool_call_id` 将结果与模型的调用请求一一绑定。如果模型一次调了 3 个工具，就会收到 3 条 `role: tool` 的消息。

**消息规范化**（`message.py`）在发送前做两件事：

1. **丢弃孤儿调用** — 如果上一次中断导致 assistant 消息有 `tool_calls` 但部分没有对应的 tool 响应，整条 assistant 消息被丢弃，防止 API 报错
2. **合并连续 tool 消息** — 多条连续的 `role: tool` 消息合并为一条批量条目，让 API 看到一个逻辑回合

### Q5: 最简单的 Sandbox 是怎么实现的？它解决了什么问题？

**解决的问题：** 模型生成的工具参数（文件路径、shell 命令）是不可信的，直接执行可能导致：

- 读取/写入工作区外的文件（如 `../../etc/passwd`）
- 执行破坏性命令（`rm -rf /`、`sudo`、`shutdown`）

**实现方式：** `sandbox.py` 提供了两道防线，都极简但覆盖常见场景。

**防线一 — 路径校验（`safe_path`）：** 文件类工具（read/write/edit）在访问前将路径 resolve 并检查是否仍在 `WORKDIR` 内。

```python
WORKDIR = Path.cwd()

def safe_path(p: str) -> Path:
    path = (WORKDIR / p).resolve()
    if not path.is_relative_to(WORKDIR):
        raise ValueError(f"Path escapes workspace: {p}")
    return path
```

`resolve()` 展开所有 `..` 和符号链接，然后 `is_relative_to()` 确保结果在工作区内。

**防线二 — 危险命令检查（`check_command`）：** bash 工具执行前做关键词匹配，命中黑名单则拒绝。

```python
_DANGEROUS = ["rm -rf /", "sudo", "shutdown", "reboot", "> /dev/"]

def check_command(command: str) -> None:
    if any(d in command for d in _DANGEROUS):
        raise ValueError("Dangerous command blocked")
```

**局限性：** 这是最基础的沙箱，不是真正的隔离环境。它不能防御绕过（如 `rm -rf ~/`、`shred`、`mkfs`），也没有容器/命名空间级别的隔离。它的价值在于以极低成本拦截了大部分无意破坏，为后续更完善的权限系统（如下一提交的 Permission 模块）打下基础。
