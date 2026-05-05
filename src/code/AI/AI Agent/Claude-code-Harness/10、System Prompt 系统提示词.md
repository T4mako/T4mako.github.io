# System Prompt 系统提示词

## 整体交互流程

```
agent 启动 / 每轮 API 调用前
       ↓
SystemPromptBuilder.build()  — 按顺序调用 6 个 section 构建函数
       ├─ _build_core()              → 核心身份与指令
       ├─ _build_tool_listing()      → 工具清单
       ├─ _build_skill_listing()     → 技能元信息
       ├─ _build_memory_section()    → 记忆内容
       ├─ _build_claude_md()         → CLAUDE.md 指令链
       ├─ DYNAMIC_BOUNDARY           → 分隔标记
       └─ _build_dynamic_context()   → 动态环境信息
       ↓
完整系统提示词 → 作为 role=system 消息发送给模型
```

## 实现思路

系统提示词**不是一段固定文本**，而是一条**由多个来源共同组装的流水线**。

| 文件 | 职责 |
|------|------|
| `src/context/system_prompt.py` | `SystemPromptBuilder` 类 — 6 个 section 的构建 + 拼装 |
| `src/context/messages.py` | 消息规范化（合并 system 消息、丢弃孤儿工具调用） |
| `src/utils/system_prompt.py` | 简化版（旧版，单字符串 + skills 描述） |

`SystemPromptBuilder` 接收 `workdir`、`tools`、`skills_dir`、`memory_manager` 作为依赖，每个 section 有且仅有一个数据来源。空 section 自动跳过（不输出空块）。

`DYNAMIC_BOUNDARY` 标记将静态内容（section 1-5，可跨轮缓存）与动态内容（section 6，每轮变化）分隔开。

## 核心问题

### Q1: 什么是系统提示词？

系统提示词是 agent 收到的**第一条 `role=system` 消息**，它定义了 agent 的身份、能力边界、可用工具、项目约束和环境信息。

它不是写死的字符串，而是**每次会话启动时，从多个动态来源实时拼装出来的一段文本**。同一个 agent 在不同项目中运行，系统提示词是不同的（因为工具、记忆、CLAUDE.md 都不同）。

### Q2: 系统提示词包含什么？

系统提示词由 6 个 section 组成：

| Section | 构建函数 | 内容 | 数据来源 |
|---------|----------|------|----------|
| 1. 核心指令 | `_build_core()` | agent 身份、基本行为准则、工作目录 | 硬编码模板 + `workdir` |
| 2. 工具清单 | `_build_tool_listing()` | 所有可用工具的 name、参数、描述 | `tools` 列表（OpenAI function-calling 格式） |
| 3. 技能元信息 | `_build_skill_listing()` | 所有可用技能的名称和描述 | `skills/` 目录下各技能的 `SKILL.md` frontmatter |
| 4. 记忆内容 | `_build_memory_section()` | 持久化的跨会话记忆 | `MemoryManager.get_memory_context_prompt()` |
| 5. CLAUDE.md 指令链 | `_build_claude_md()` | 用户/项目自定义指令 | 三级 CLAUDE.md 文件（全局 → 项目 → 子目录） |
| 6. 动态上下文 | `_build_dynamic_context()` | 当前日期、工作目录、平台 | `datetime` / `os` / `platform` |

**各 section 详细说明：**

**Section 1 — 核心指令**

```
You are a coding agent operating in /path/to/project.
Use the provided tools to explore, read, write, and edit files.
Always verify before assuming. Prefer reading files over guessing.
Use Windows-compatible commands (dir, type, findstr, etc).
Use task_create/task_update/task_list for multi-step work.
Keep exactly one task in_progress at a time.
Tasks persist across sessions on disk. Prefer tools over prose.
MCP tools are prefixed with mcp__{server}__{tool} and are routed to external MCP servers.
```

定义 agent 的基本身份和行为约束，不随项目变化（除了工作目录）。

**Section 2 — 工具清单**

遍历 `tools` 列表，将每个工具的 name、参数、描述格式化为一行：

```
# Available tools
- bash(command): Run a shell command in the workspace.
- read_file(path, offset, limit): Read a file from the local filesystem.
- save_memory(name, body, type, description): Save a persistent memory to disk.
```

**Section 3 — 技能元信息**

扫描 `skills/` 目录，读取每个子目录下的 `SKILL.md` 文件的 frontmatter：

```
# Available skills
- update-config: Configure Claude Code settings
- web-access: 联网搜索与网页抓取
- claude-api: Build and debug Claude API apps
```

**Section 4 — 记忆内容**

调用 `MemoryManager.get_memory_context_prompt(max_chars=4000)`，注入持久化记忆（最多 4000 字符）：

```
## Memory (persisted across sessions)

## user_role [user]
后端工程师, Python + Go

## feedback_no_mock [feedback]
集成测试必须用真实数据库
```

**Section 5 — CLAUDE.md 指令链**

按优先级加载三个位置的 CLAUDE.md（全部包含，不覆盖）：

```
# CLAUDE.md instructions

## From user global (~/.claude/CLAUDE.md)
所有 Python 操作使用 uv

## From project root (CLAUDE.md)
用户正在从零开始写一个 agent 项目

## From subdir (src/CLAUDE.md)
此目录下的代码不需要写测试
```

| 位置 | 优先级 | 说明 |
|------|--------|------|
| `~/.claude/CLAUDE.md` | 最高（用户全局） | 对所有项目生效的用户偏好 |
| `<workdir>/CLAUDE.md` | 中（项目根目录） | 当前项目的约定 |
| `<cwd>/CLAUDE.md` | 低（子目录） | 当前子目录的局部约定（仅在与 workdir 不同时加载） |

**Section 6 — 动态上下文**

```
=== DYNAMIC_BOUNDARY ===

# Dynamic context
Current date: 2026-05-04
Working directory: /path/to/project
Platform: Windows
```

`DYNAMIC_BOUNDARY` 标记之前的内容（section 1-5）是"稳定的"，理论上可以跨轮缓存。标记之后的内容每轮可能变化。

### Q3: 如何流程化构建系统提示词？

`SystemPromptBuilder.build()` 方法的执行流程：

```python
def build(self) -> str:
    sections = []

    # 1-5: 静态 section（按顺序调用，空 section 跳过）
    for section_fn in (
        self._build_core,          # 核心指令
        self._build_tool_listing,  # 工具清单
        self._build_skill_listing, # 技能元信息
        self._build_memory_section,# 记忆内容
        self._build_claude_md,     # CLAUDE.md 指令链
    ):
        text = section_fn()
        if text:
            sections.append(text)

    # 分隔标记
    sections.append(DYNAMIC_BOUNDARY)

    # 6: 动态 section
    dynamic = self._build_dynamic_context()
    if dynamic:
        sections.append(dynamic)

    # 用空行拼接所有 section
    return "\n\n".join(sections)
```

**关键设计：**

- **每个 section 独立** — 一个 section 的数据来源不依赖其他 section，方便单独修改或扩展
- **空 section 自动跳过** — 没有记忆时 section 4 不输出，没有 skills 目录时 section 3 不输出
- **DYNAMIC_BOUNDARY 分隔** — 静态前缀可跨轮缓存（利用 API 的 prompt cache 功能），只有动态部分每轮重建
- **CLAUDE.md 链式加载** — 三个位置的文件全部包含，不互相覆盖，子目录指令优先级最低（后出现，可被前面的覆盖）

**使用方式（在 `loop.py` 中）：**

```python
# 初始化
PROMPT_BUILDER = SystemPromptBuilder(
    workdir=WORKDIR,
    tools=_tools,
    memory_manager=MEMORY,
)

# 构建系统提示词
system_prompt = PROMPT_BUILDER.build()

# 消息历史
state = LoopState(
    messages=[{"role": "system", "content": system_prompt}],
)
```

**消息规范化（`normalize_messages`）：**

系统提示词构建完成后，在发送给 API 之前，`normalize_messages()` 会做两件事：

1. **合并连续 system 消息** — OpenAI API 只允许一条 leading system message，多个 system 消息会被合并为一条
2. **丢弃孤儿工具调用** — 如果最后一条 assistant 消息有未回复的 `tool_calls`，将其丢弃（避免 API 报错）

```python
def normalize_messages(messages: list[dict]) -> list[dict]:
    out = []
    sys_parts = []
    for m in messages:
        if m["role"] == "system":
            sys_parts.append(m["content"])  # 收集
        else:
            if sys_parts:
                out.append({"role": "system", "content": "\n\n".join(sys_parts)})  # 合并输出
                sys_parts = []
            out.append(dict(m))
    # 处理尾部 system 消息
    if sys_parts:
        out.insert(0, {"role": "system", "content": "\n\n".join(sys_parts)})
    # 丢弃孤儿工具调用
    if out and _has_orphaned_calls(out):
        out.pop()
    return out
```

**动态注入（`inject_system_reminder`）：**

对于每轮需要动态注入的轻量上下文（git 状态、选中的代码行、技能描述等），使用 `inject_system_reminder()` 以 `<system-reminder>` 标签包裹为 user 消息追加：

```python
def inject_system_reminder(messages: list[dict], extra: str) -> None:
    if not extra:
        return
    messages.append({
        "role": "user",
        "content": f"<system-reminder>\n{extra}\n</system-reminder>",
    })
```

这种方式比重建整个系统提示词轻量，适合每轮动态变化的上下文。
