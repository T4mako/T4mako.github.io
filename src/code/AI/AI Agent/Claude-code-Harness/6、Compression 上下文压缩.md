# Compression 上下文压缩

## 整体交互流程

```
工具执行完成 → persist_large_output() (第一层：大输出写盘)
       ↓
进入下一轮 turn → pre_api_compress() (第二层：旧工具结果压缩)
       ↓
   估算上下文大小 > CONTEXT_LIMIT？
       ├─ 否 → 正常调用 API
       └─ 是 → compact_history() (第三层：模型摘要压缩)
                     ↓
                写transcript → 调用模型摘要 → 用单条 user 消息替换全部历史
```

三层压缩按**从轻到重**的顺序依次触发：先处理单条大输出，再压缩历史工具结果，最后才动用模型做完整摘要。

此外，agent 自身可以调用 `compact` 工具**手动触发**第三层压缩（无需等到上下文超限）。

## 实现思路

压缩模块位于 `src/compression/`，核心文件：

| 文件 | 职责 |
|------|------|
| `src/compression/context.py` | 三层压缩策略的全部实现 + 压缩状态管理 |
| `src/utils/compress_prompt.py` | 摘要压缩的 system prompt |
| `src/tools/registry.py` | `compact` 工具元信息 + 占位符 handler |

`loop.py` 中的 `turn()` 函数是压缩的**触发点**：

1. **每轮 API 调用前**自动执行 `pre_api_compress()`（包含第一层和第二层）
2. **工具执行后**对结果调用 `persist_large_output()`（第一层）
3. **工具执行后**如果是 `read_file`，记录文件路径到 `CompactState`（压缩后恢复用）
4. **工具执行后**如果是 `compact`，执行 `compact_history()`（第三层手动触发）

压缩状态通过全局单例 `COMPACT_STATE = CompactState()` 维护，记录是否已压缩、上次摘要内容、最近读取的文件列表。

## 核心问题

### Q1: 上下文压缩有哪些方式？

三种方式，对应三个层次，**成本递增，压缩力度递增**：

| 层级 | 函数 | 方式 | 成本 | 压缩力度 |
|------|------|------|------|----------|
| 第一层 | `persist_large_output()` | 大输出写盘，上下文只保留预览 | 零模型调用 | 单条输出从 30k+ 缩到 ~2k |
| 第二层 | `micro_compact()` | 旧工具结果替换为一行占位符 | 零模型调用 | 每条旧结果缩为一行 |
| 第三层 | `compact_history()` | 调用模型生成结构化摘要，替换整个对话历史 | 一次 API 调用 | 数百条消息缩为一条 |

**第一层：持久化大输出 (`persist_large_output`)**

当单条工具输出超过 `PERSIST_THRESHOLD` (30,000 字符) 时，将完整内容写入磁盘文件 (`{tool_use_id}.txt`)，在上下文中只保留 `<persisted-output>` 标签包裹的 2,000 字符预览 + 文件路径。小输出原样返回，不做处理。

关键设计：
- 以 `tool_use_id` 为文件名，确保每条输出有唯一存储位置
- 幂等：文件已存在则不覆盖
- 预览包含 `<persisted-output>` XML 标签，让模型知道这是被截断的内容

**第二层：微压缩 (`micro_compact`)**

遍历消息历史，找出所有 `role=tool` 的消息。保留最近 `KEEP_RECENT_TOOL_RESULTS` (10 条) 完整不动，将其余每条的内容替换为：

```
[Earlier tool result compacted. Re-run the tool if you need full detail.]
```

关键设计：
- 零成本（纯字符串操作，不调用模型）
- 只压缩 `content > 120` 字符的工具结果，短结果跳过
- 占位符明确提示模型"如果需要可以重新运行工具"

**第三层：完整历史压缩 (`compact_history`)**

调用同一个模型对当前对话生成结构化摘要，然后用一条包含摘要的 user 消息**替换整个消息历史**。

摘要 prompt (`COMPRESS_SYSTEM`) 要求模型保留：
1. 当前目标和剩余工作
2. 关键发现、决策、错误修复
3. 读写过的文件（路径 + 简要用途）
4. 用户约束、偏好、显式指令
5. 配置值（模型名、API 格式、环境变量）

同时附加规则防止幻觉：不编造文件路径、不虚构函数名、不捏造项目结构。

压缩前：
- 完整对话以 JSONL 格式写入 `.transcripts/` 目录（用于审计或恢复）
- 摘要后追加 `focus` 参数（调用方指定的重点）和 `recent_files`（最近读取的文件列表，方便压缩后重新打开）

### Q2: 不同的压缩策略在什么时候运行？具体是怎么做的？

**第一层：工具执行后立即运行**

触发时机：每次工具执行完毕后，在将结果写入消息历史之前。

```
loop.py turn() → 执行工具 → output = persist_large_output(tc.id, output) → 写入消息历史
```

具体做法：
1. 检查输出长度，`<= 30,000` 字符直接返回原内容
2. 超过阈值：创建 `TOOL_RESULTS_DIR` 目录，以 `{tool_use_id}.txt` 写入磁盘
3. 截取前 2,000 字符作为预览
4. 返回 `<persisted-output>` 包装的简短占位符（含文件相对路径 + 预览）

同理，hook 阻止或权限拒绝的短输出也经过 `persist_large_output()`，确保统一处理。

**第二层 + 第三层（自动）：每轮 API 调用前运行**

触发时机：`turn()` 函数的 `while True` 循环顶部，每次发 API 请求之前。

```
loop.py turn() → while True: → pre_api_compress() → API 调用
```

`pre_api_compress()` 内部流程：
1. 先执行 `micro_compact()` — 压缩旧工具结果（第二层）
2. 再用 `estimate_context_size()` 估算上下文大小
3. 如果超过 `CONTEXT_LIMIT` (100,000 字符) → 触发 `compact_history()`（第三层）
4. 返回压缩后的消息列表

具体做法：
- `micro_compact`: 收集所有 tool 消息索引 → 保留最后 10 个 → 其余替换为一行占位符
- `compact_history`: 写 transcript 到磁盘 → 调用 `summarize_history()` 生成摘要 → 构造单条 user 消息 → 更新 `CompactState`

**第三层（手动）：agent 调用 compact 工具时运行**

触发时机：模型在推理中主动调用 `compact` 工具。

```
模型返回 tool_calls → 工具执行循环 → 检测到 tool_name=="compact" → manual_compact=True
→ 工具循环结束后 → compact_history(client, MODEL, state.messages, COMPACT_STATE, focus=...)
```

具体做法：
1. `registry.py` 中 `compact` 工具的 handler 返回占位符 `"Compacting conversation..."`
2. 工具循环结束后，`turn()` 检查 `manual_compact` 标志
3. 为 True 则调用 `compact_history()`，传入模型指定的 `focus` 参数
4. `compact_history()` 执行完整摘要流程（同自动触发）

**辅助：文件访问记录**

触发时机：每次 `read_file` 工具执行后。

```
loop.py → 工具执行 → if tool_name=="read_file": track_recent_file(COMPACT_STATE, path)
```

具体做法：
- 将路径追加到 `CompactState.recent_files` 列表（最多 5 个，LRU 式去重）
- 压缩时这些路径被附加到摘要末尾，让 agent 压缩后知道重新打开哪些文件
