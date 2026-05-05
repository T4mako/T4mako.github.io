# Skills 技能系统

> 对应提交: `14a32fd` - 添加 skill 调用并解耦系统提示词

## 整体交互流程

```
启动时: SkillRegistry 扫描 skills/ 目录 → 解析所有 SKILL.md → 加载元信息到内存
    ↓
系统提示词构造: describe_available() → 技能列表 (名称+描述) 写入 SYSTEM prompt
    ↓
模型推理: 看到可用技能列表, 根据任务需求决定是否加载
    ↓
模型调用 load_skill(name) → SkillRegistry.load_full_text() → 返回完整技能正文
    ↓
模型在下一轮推理中使用技能指令工作
```

## 实现思路

Skill 是一个 **按需加载的指令片段**。启动时只加载元信息（名称 + 描述）放入系统提示词，模型根据描述判断是否需要，调用 `load_skill` 工具加载完整正文。

核心文件 `src/tools/skills.py` 实现了 `SkillRegistry` 类：

- `_load_all()` — 启动时扫描 `skills/` 目录，解析每个 `SKILL.md` 的 frontmatter 和正文
- `describe_available()` — 构造精简列表，写入系统提示词
- `load_full_text()` — 按名称返回完整技能正文

同时，这个提交将系统提示词从 `loop.py` 中拆出到 `src/utils/system_prompt.py` 和 `src/utils/subagent_prompt.py`，主 Agent 和子代理各自构造提示词时都附带技能列表。

## 核心问题

### Q1: 为什么需要 Skills？

随着 Agent 能力增强，它需要处理越来越多专业场景：编写 Word 文档、操作 PDF、设计前端界面、连接数据库……如果把这些指令全部写入系统提示词，会导致：

- **上下文膨胀**：每轮请求都携带所有技能指令，浪费 token
- **注意力稀释**：大量无关指令干扰模型对当前任务的判断
- **维护困难**：系统提示词越来越长，难以修改和调试

Skills 的解法是 **渐进式加载**：

- 系统提示词中只放 **技能列表**（名称 + 一行描述），轻量
- 模型根据任务需求 **按需加载** 完整指令
- 加载后的技能正文作为工具结果进入消息历史，只占用当前会话的上下文

类比：不是把整本工具手册塞给员工，而是给一个目录，需要时再翻具体章节。

### Q2: Skill 要怎么编写？格式是什么？

每个 Skill 是一个 `SKILL.md` 文件，放在 `skills/<skill-name>/` 目录下：

```markdown
---
name: example
description: Example skill demonstrating the skill system
---

# Example Skill

This is an example skill. Skills provide specialized instructions
that the agent loads on demand via the `load_skill` tool.

## Usage

Call `load_skill` with the skill name to load its content into context.

## Behavior

- Skills are loaded from `SKILL.md` files in subdirectories
- Each skill has a name, description, and body defined in frontmatter
- The agent can reference skills when handling specialized tasks
```

文件格式：

| 部分 | 必需 | 说明 |
|------|------|------|
| Frontmatter (`---` 之间) | 是 | `name` 和 `description` 两个字段 |
| 正文 | 是 | 技能的具体指令，模型加载后阅读的内容 |

编写原则：

- **每个 Skill 只做一件事** — 不要把所有功能打包成一个超级 Skill
- **Description 是触发器** — 写"什么时候用"（如"当用户要求操作 Word 文档时"），不写"做什么"。模型完全依赖 description 决定是否加载
- **正文简短** — 模型加载后占用上下文窗口，过长会抵消 Skills 缓解上下文爆炸的意图
- **Resources 是附件** — 详细参考、示例代码等放在正文中靠后位置，模型在确实需要时再读取

### Q3: Skills 怎么加载？模型怎么调用 Skills？

**启动时加载（元信息）：** `SkillRegistry.__init__()` 扫描 `skills/` 目录下所有 `SKILL.md` 文件，解析 frontmatter 提取 `name` 和 `description`，存入 `self.documents` 字典。正文也一并解析但不放入提示词。

```python
def _load_all(self):
    for path in sorted(self.skills_dir.rglob("SKILL.md")):
        meta, body = self._parse_frontmatter(path.read_text())
        name = meta.get("name", path.parent.name)
        description = meta.get("description", "No description")
        self.documents[name] = SkillDocument(manifest=..., body=body)
```

**系统提示词中展示可用技能：** `describe_available()` 构造精简列表，嵌入系统提示词：

```python
SYSTEM = (
    f"You are a coding agent at {os.getcwd()}..."
    "\n\nSkills available:\n"
    f"{SKILL_REGISTRY.describe_available()}"
)
# 效果:
# Skills available:
# - example: Example skill demonstrating the skill system
# - web-access: 所有联网操作必须通过此 skill 处理
```

**模型调用：** 模型在系统提示词中看到技能列表，根据当前任务需求决定调用 `load_skill` 工具：

```python
# 工具定义
{
    "name": "load_skill",
    "description": "Load the full body of a named skill into the current context.",
    "parameters": {"name": {"type": "string"}}
}

# 执行映射
"load_skill": lambda name: SKILL_REGISTRY.load_full_text(name)
```

### Q4: Skill 的结果怎么返给模型？

`load_skill` 是一个普通工具调用，结果以 `role: tool` 消息写回消息历史：

```python
def load_full_text(self, name: str) -> str:
    document = self.documents.get(name)
    return (
        f'<skill name="{document.manifest.name}">\n'
        f'{document.body}\n'
        f'</skill>'
    )
```

返回格式用 XML 标签包裹，帮助模型识别技能内容的边界。例如：

```xml
<skill name="example">
# Example Skill

This is an example skill. Skills provide specialized instructions...

## Usage
Call `load_skill` with the skill name...
</skill>
```

这个字符串作为 `load_skill` 工具的执行结果，由 `loop.py` 的工具执行框架写入 `{role: "tool", content: "..."}` 消息。模型在下一轮推理中读到完整技能指令后，按照其中的指导执行任务。

如果技能名称不存在，返回错误信息并列出可用技能：

```
Error: Unknown skill 'foo'. Available skills: example, web-access
```

**设计要点：** 技能正文一旦加载就在消息历史中持久存在，后续轮次都能引用。这避免了模型反复加载同一个技能，但也意味着 Skill 正文应该简短——避免不必要的上下文占用。
