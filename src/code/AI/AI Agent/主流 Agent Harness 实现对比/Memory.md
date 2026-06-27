---
title: 主流 Agent Harness 的 Memory 实现对比
date: 2026-06-22
category:
  - AI Agent
tag:
  - Memory
  - Agent Harness
  - Codex
  - Claude Code
---

参考：https://zhuanlan.zhihu.com/p/2045516328530863788?theme=dark

## 从 RAG 到 LLM Wiki

传统 RAG 的局限性：

- LLM 每次都要从头开始重新发现知识，没有积累（如果你提出一个需要综合五个文档的复杂问题，LLM 每次都必须找到并拼凑相关的片段，没有任何知识积累）

LLM Wiki 并非仅仅在查询时从原始文档中检索信息， **而是逐步构建并维护一个持久化的维基**（一个结构化的、相互链接的 Markdown 文件集合）

### 架构

- **原始资源**：文章、论文、图像和数据文件。这些资源是不可更改的——LLM 系统会读取它们，但绝不会对其进行修改
- **维基**：由 LLM 生成的 Markdown 文件目录。内容包括摘要、实体页面、概念页面、对比、概述和综合。LLM 完全掌控这一层。它创建页面，在新资源到来时更新页面，维护交叉引用，并确保所有内容的一致性。您阅读它，LLM 编写它。
- **视图**：（例如 Claude Code 的 CLAUDE.md 或 Codex 的 AGENTS.md）告诉 LLM wiki 的结构、约定俗成的规则以及在导入资源、回答问题或维护 wiki 时应遵循的工作流程。这是关键的配置文件——它使 LLM 成为一个规范的 wiki 维护者，而不是一个普通的聊天机器人。随着时间的推移，您和 LLM 会共同完善这个模式文件，并不断探索适合您领域的有效方法。

### 实现

- **导入**：将新数据源添加到原始集合中，并指示 LLM 进行处理。LLM 读取源，与您讨论关键要点，在 wiki 中编写摘要页面，更新索引，更新 wiki 中相关的实体和概念页面，并将条目添加到日志中。
- **查询**：在维基中提出问题。LLM 会搜索相关页面，读取它们，并综合整理出包含引用的答案。答案可以根据问题的不同而呈现不同的形式——Markdown 页面、对比表格、幻灯片（Marp）、图表（matplotlib）或画布。重要的一点是： **优秀的答案可以作为新页面归档到维基中。** 
- **定期检查**：LLM 定期对 wiki 进行健康检查。检查内容包括：页面之间的矛盾、已被新资料取代的过时说法、没有外部链接的孤立页面、提及但缺少独立页面的重要概念、缺失的交叉引用以及可以通过网络搜索填补的数据空白。

### 索引与日志

- **index.md**：面向内容的索引。它是一个维基百科所有内容的目录——每个页面都包含一个链接、一行摘要，以及可选的元数据，例如日期或来源数量。索引按类别（实体、概念、来源等）组织。LLM 会在每次数据摄取时更新它。当响应查询时，LLM 首先读取索引以查找相关页面，然后深入查看这些页面。这种方法在中等规模（约 100 个来源，数百个页面）下运行良好，并且避免了使用基于嵌入的 RAG 架构。
- **log.md**：按时间顺序排列的日志。它记录了所有事件及其发生的时间，包括内容导入、查询和代码检查等。一个实用技巧：如果每个条目都以一致的前缀开头（例如 `## [2026-04-02] ingest | Article Title` ），则可以使用简单的 Unix 工具解析该日志—— `grep "^## \[" log.md | tail -5` 即可获取最近的 5 个条目。该日志提供了 wiki 的发展历程，并有助于 LLM 了解最近的工作内容。

### CLI Tools

某些时候，可能需要构建一些小型工具来帮助 LLM 更高效地操作 wiki。最显而易见的就是 wiki 页面搜索引擎

## Memory 的读与写

Memory 设计的重点：
- 写：写什么？怎么写？
- 读：读什么？怎么读？、
  
某种意义上来说，Memory 的设计重点在于 **不记什么** 和 **不信什么（记忆）。**

存储结构：现在通用 Agent Harness 的 Memory 大多是基于文本文件的，类似 **书籍** 的形式，实际就是 LLM Wiki 的简化实现

> 主流 Agent 没有实现传统的 RAG 形式的向量存储和召回方式，向量召回方式并不适合所有场景，原因 ：
> - 通用 Agent Harness 一般并没有这种大量同类内容记忆和召回的场景
> - 单个项目 workspace 中需要记忆的内容量往往也没有特别大

读写形式：
- 使用 Tool 与 Prompt 的形式引导 LLM 进行 Memory 记录与召回
  - 优势：轻量
  - 劣势：难以做复杂 Memory 整合，占用 Tool Call 轮次，拉长响应时间
- 异步离线 Memory 梳理整合
  - 优势：整合较好
  - 劣势：即时性差，不便于快速更新记忆，成本高

## Claude Code

[Claude Code Memory 记忆系统](../Claude-code-Harness/9、Memory%20记忆系统.md)

### 存储结构

在 `%HOME` 目录下组织一个 `MEMORY.md` 索引文件 + 多个 item 记忆 md 文件

### 存储格式
```markdown
---
name: {{memory name}}
description: {{one-line description — used to decide relevance in future conversations, so be specific}}
type: {{user, feedback, project, reference}}
---

{{memory content — for feedback/project types, structure as: rule/fact, then **Why:** and **How to apply:** lines}}
```

### 存储/更新提示词
Memory 的提示词包含：
- Memory 的类型（`<scope>`/`feedback`/`project`/`reference`）
- 什么内容不应该进入 Memory
- Memory 存储格式与步骤
- 

### 写入时机
- 主 session 内模型主动更新（调用工具）
- 在对话 round 结束后产生一个 fork session 自动提取
- Memory、Plan 和 Task 的边界，什么时候是 Plan 与 Task 而非 Memory

### Memory 的召回

索引文件 MEMORY.md 被注入 Context，LLM 进行主动召回

召回提示词包含：
- 何时访问记忆
- 依据记忆前的检查
- 时间超过1天的记忆会附“这是某时刻的观察、不是实时状态，请对照当前代码核实”的提醒

## Codex 与 OpenAI Agetns SDK

- Codex 的 Memory 同样使用 **单层索引文件**
- 与 Claude code 不同的是 Codex 不依赖 Tool，而更多强调 **事后挖掘/重复模式发现**
- 
Codex 在开启新会话时就对 **历史会话进行 memory 提取**，并分为 2 个阶段
- 阶段 1：使用 mini 模型进行并行提取
- 阶段 2：进行合并，生成最终 memory

codex 开源地址：https://github.com/openai/codex


### Memory 生成 Phase 1


Phase 1 会用 mini 模型并行分析单次历史对话（rollout），主要做：

- 提取可长期复用的信息，如用户偏好、有效工作流程、环境约定和避坑经验。
- 生成该次对话的摘要和原始 memory，供 Phase 2 合并。
- 过滤低价值信息：无持久价值时直接返回空结果，同时脱敏密钥、不篡改原始记录、不凭空推断。


简单说：Phase 1 是对每段历史对话进行独立的“记忆候选提取与初筛”。

### Memory 生成 Phase 2

Phase 2 负责把 Phase 1 提取的零散记忆进行整合、去重和更新，形成结构化的长期记忆库。

它主要做：
- 将高价值信息整理到 MEMORY.md
- 生成始终加载的精简索引 memory_summary.md
- 必要时沉淀可复用的 `skills`
- 根据文件变更增量加入新记忆、清除失效记忆
- 处理信息冲突，并保留证据来源

### Memory 的召回
Codex 的召回方式跟 Claude Code 类似

## OpenCode、Pi、Kimi Code

OpenCode 有一些第三方的 Memory 插件，有一些不同范式的 memory 方案。常用的是 opencode-supermemory 和 opencode-mem，它们都是更偏向于 Claude Code 的方案。

值得一提的是 opencode-mem 中实现了向量召回。

## OpenClaw

OpenClaw 目前在底层配置上支持不同 memory 存储方案，以及 LLM provider 也支持多种方式。

OpenClaw 目前有 2 套 Memory 的方案，第一套虽然类似前面的方式，但内部实现仍然是 RAG 的方式，另一套是 LLM wiki 的思路，后者默认不开启。 