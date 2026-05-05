# Memory 记忆系统

## 整体交互流程

```
模型需要存储记忆 → 调用 save_memory(name, body, type, description)
       ↓
MemoryManager.save() → 写入 {name}.md 文件（含 frontmatter） → 重建 MEMORY.md 索引

模型需要查找记忆 → 调用 search_memory(keyword) / list_memories()
       ↓
MemoryManager._scan_files() → 遍历 memory_dir/*.md → 解析 frontmatter → 返回 MemoryEntry 列表

agent 启动 / 构建系统提示词时
       ↓
MemoryManager.get_memory_context_prompt() → 读取所有记忆 → 拼接为 Markdown 文本 → 注入系统提示词
```

## 实现思路

记忆系统以**文件即记忆**为核心设计：每条记忆是一个独立的 `.md` 文件，`MEMORY.md` 作为索引文件。

| 文件 | 职责 |
|------|------|
| `src/memory/manager.py` | 记忆存储、读取、搜索、删除 + 上下文注入 |
| `src/memory/__init__.py` | 模块导出 |
| `src/tools/registry.py` | `save_memory` / `search_memory` / `list_memories` / `delete_memory` 四个工具 |

存储路径为 `~/.claude/projects/{project_name}-{hash}/memory/`，与 Claude Code 兼容：

```
memory/
  MEMORY.md            ← 索引（每行一条，启动时加载）
  user_role.md         ← 用户角色
  feedback_no_mock.md  ← 用户反馈
  project_freeze.md    ← 项目约定
  ref_grafana.md       ← 外部资源
```

模型通过四个工具（`save_memory`、`search_memory`、`list_memories`、`delete_memory`）操作记忆。每次 `save` 或 `delete` 后自动重建 `MEMORY.md` 索引。

## 核心问题

### Q1: Memory 存什么？

记忆分为四种类型，每种对应不同的持久化内容：

| 类型 | 存什么 | 示例 |
|------|--------|------|
| `user` | 用户角色、偏好、知识背景 | "用户是后端工程师，熟悉 Python 和 Go" |
| `feedback` | 用户明确纠正或确认的地方 | "以后遇到这种情况要先做 X"、"不要这样改" |
| `project` | **不容易从代码直接看出来**的项目约定或背景 | "本周三前需要完成移动端发布分支"、"认证中间件重写是因为合规要求" |
| `reference` | 外部资源指针 | "Bug 在 Linear 项目 INGEST 中追踪"、"Grafana 面板在 grafana.internal/d/api-latency" |

**核心原则：只存"跨会话仍有价值"且"无法从当前代码状态推导出来"的信息。**

### Q2: Memory 什么一定不能存？

以下信息**不应**写入记忆：

| 不应存的内容 | 原因 |
|-------------|------|
| 文件结构、函数签名、目录布局 | 可以直接读取代码获得 |
| 当前任务进度 | 属于 Plan / Task 系统的职责 |
| 临时分支名、当前 PR 号 | 很快过时，记忆会 stale |
| 修 bug 的具体代码细节 | git 提交记录已有 |
| 密钥、密码、凭证 | 安全风险 |
| 对话中的临时上下文 | 会话结束后无价值 |

**判断标准：** 如果这条信息可以从代码、git 历史、或当前任务状态中重新获得，就不应该存到记忆里。

### Q3: 模型如何存储 Memory？

模型通过四个工具与记忆系统交互，不需要直接操作文件：

**保存记忆 — `save_memory`**

```
模型调用 save_memory(name="user_role", body="后端工程师, Python + Go", type="user", description="用户角色")
       ↓
registry.py → _save_memory() → MemoryManager.save()
       ↓
1. 根据 name 生成安全文件名（特殊字符替换为 _）
2. 写入 {name}.md，格式：frontmatter + body
3. _rebuild_index() 扫描所有 .md 文件 → 重写 MEMORY.md
```

生成的文件内容：

```markdown
---
name: user_role
description: 用户角色
type: user
---

后端工程师, Python + Go
```

**搜索记忆 — `search_memory`**

```
模型调用 search_memory(keyword="mock")
       ↓
MemoryManager.search() → _scan_files() → 遍历 name + description + body 匹配关键词
       ↓
返回匹配条目列表（格式："[type] name: body 前 300 字符"）
```

**列出所有记忆 — `list_memories`**

```
模型调用 list_memories()
       ↓
MemoryManager.load_all() → _scan_files() → 返回所有条目的 name + type + description
```

**删除记忆 — `delete_memory`**

```
模型调用 delete_memory(name="old_memory")
       ↓
MemoryManager.delete() → 删除文件 → _rebuild_index()
```

**同名覆盖：** 如果 `save_memory` 的 `name` 与已有记忆相同，直接覆盖旧文件（先写新内容，再重建索引）。

### Q4: Memory 文件中包含什么？

每条记忆文件是一个**带 frontmatter 的 Markdown 文件**：

```markdown
---
name: feedback_no_mock
description: 集成测试必须用真实数据库，不用 mock
type: feedback
---

用户要求集成测试不使用 mock 数据库。原因：之前出现过 mock 和生产数据不一致导致迁移失败的问题。应用方式：所有数据库相关测试使用 testcontainers 或真实测试库。
```

**frontmatter 字段：**

| 字段 | 必需 | 说明 |
|------|------|------|
| `name` | 是 | 记忆的唯一标识，也用作文件名 |
| `description` | 是 | 一行摘要，显示在 MEMORY.md 索引中 |
| `type` | 是 | 记忆类型（`user` / `feedback` / `project` / `reference`） |

**MEMORY.md 索引文件：**

```markdown
- [user_role](user_role.md) — 用户角色信息
- [feedback_no_mock](feedback_no_mock.md) — 集成测试必须用真实数据库
- [project_freeze](project_freeze.md) — 3月5日后冻结非关键合并
- [ref_grafana](ref_grafana.md) — API 延迟监控面板
```

每条一行，不超过 150 字符。agent 启动时先读取索引，根据 description 判断是否需要读取具体文件内容，避免无差别加载所有记忆。

**注入系统提示词时：** `get_memory_context_prompt(max_chars=4000)` 按顺序拼接记忆正文，超过 `max_chars` 字符时截断，输出格式：

```markdown
## Memory (persisted across sessions)

## user_role [user]
后端工程师, Python + Go

## feedback_no_mock [feedback]
用户要求集成测试不使用 mock 数据库...
```

### Q5: 记忆具体是怎么搜索的？

记忆搜索有**两条路径**：启动时的索引加载（被动）和模型主动调用 `search_memory`（主动）。

**路径一：启动时 — 索引快速浏览**

```
agent 启动
      ↓
MemoryManager.get_memory_context_prompt(max_chars=4000)
      ↓
load_all() → _scan_files() → 遍历 memory_dir/*.md（排除 MEMORY.md）
      ↓
对每个 .md 文件：
    1. 读取文件全文
    2. 用正则解析 frontmatter（name / description / type）
    3. 提取 body 正文
      ↓
按文件排序顺序拼接，超过 max_chars(4000) 字符时截断
      ↓
注入系统提示词，格式：
    "## Memory (persisted across sessions)\n\n## name [type]\nbody\n"
```

**关键细节：**
- 扫描范围：`memory_dir` 下所有 `.md` 文件，排除 `MEMORY.md` 索引文件本身
- frontmatter 解析：正则 `^---\s*\n(.*?)\n---\s*\n(.*)` 匹配 YAML-like 头，再逐行 `key: value` 解析
- 排序：按文件名 `sorted()` 字母序
- 截断：超过 `max_chars` 时直接停止拼接，后续记忆不注入

**MEMORY.md 的作用：** 索引文件在启动时**也**会被加载到上下文（系统提示词说明中引用），超过 200 行会被截断。它让 agent 在不打开具体文件的情况下，通过 description 快速判断哪些记忆值得读取。

**路径二：模型主动搜索 — `search_memory(keyword)`**

```
模型调用 search_memory(keyword="mock")
      ↓
MemoryManager.search(keyword)
      ↓
1. _scan_files() → 扫描所有 .md 文件，解析为 MemoryEntry
2. keyword_lower = "mock"（转为小写）
3. 逐条匹配（子字符串包含，不区分大小写）：
    keyword in entry.name.lower()          ← 匹配名称
    OR keyword in entry.description.lower() ← 匹配描述
    OR keyword in entry.body.lower()        ← 匹配正文
4. 返回所有匹配的 MemoryEntry 列表
```

**搜索特点：**

| 特性 | 实现方式 |
|------|----------|
| 匹配算法 | 简单的**子字符串包含**（`in` 操作符），非模糊匹配/正则/分词 |
| 大小写 | 不敏感（搜索前统一转小写） |
| 搜索范围 | name + description + body 三个字段 |
| 多关键词 | 不支持，每次只能搜一个关键词（模型可以多次调用） |
| 排序 | 按文件名排序，不按相关性 |
| 文件遍历 | 每次调用 `search()` 都重新扫描磁盘（`_scan_files()`），无内存缓存 |

**两条路径的对比：**

| | 启动索引（被动） | 主动搜索 |
|---|------------------|----------|
| 触发方式 | agent 启动自动注入 | 模型调用 `search_memory` 工具 |
| 覆盖范围 | 所有记忆（受 max_chars 限制） | 匹配关键词的记忆 |
| 用途 | 让模型知道"有哪些记忆" | 模型根据当前任务精准查找 |
| 性能 | 每次启动扫描一次 | 每次调用扫描一次（无缓存） |

**实际使用场景：**

```
场景：用户说 "别忘了我们之前说的那个数据库约定"
      ↓
模型不确定具体 name → 先调用 search_memory("数据库")
      ↓
返回：[feedback_no_mock.md — "集成测试必须用真实数据库"]
      ↓
模型定位到具体记忆，在回复中引用
```
