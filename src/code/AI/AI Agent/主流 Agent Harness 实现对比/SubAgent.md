---
title: 主流 Agent Harness 的 SubAgent 实现对比
date: 2026-06-22
category:
  - AI Agent
tag:
  - SubAgent
  - Agent Harness
  - Multi-Agent
  - Claude Code
  - Codex
  - OpenAI Agents SDK
---

## 概述

参考：https://zhuanlan.zhihu.com/p/2047827612827964153?theme=dark

SubAgent 的目标可以概括为两个：
- 应对长上下文任务：通过将一个复杂任务拆为几个任务，每个任务有独立的上下文会话，抑制主 agent 的上下文，同时可以让任务加速
- 获得旁观者视角（群体生活，众人拾柴火焰高）

目前主要的实现方式是** Agent As Tool**，偶尔有 Multi Agent 的方式

## Claude Code

Claude Code 对于 SubAgent 功能有 4 个互斥的版本

Claude Code 不允许 SubAgent 再创建 SubAgent

SubAgent 和 Shell 一样都可以在前台或后台执行，后台执行时，完成后会给主 Session 发消息，不用主 Session 轮询

### 非 Fork 模式

目前 Claude code 的默认模式，创建的 SubAgent 不继承主 session 的 context，从零开始

提示词主要包括：
- AgentTool 使用指南（注入主 Agent）
- AgentTool 的工具使用（注入主 Agent）
- 通用 SubAgent 的 System Prompt（注入子 Agent）

SubAgent Context 中还会追加 **运行时环境信息** （工作目录、平台、shell、OS 版本、模型名、知识截止日期）。默认模式下子 agent 的 thinking 被强制设为 { type: 'disabled' }

用户在 CLI 中可以把一个前台的 agent 执行切换到后台执行。AgentTool 没有超时设置

### Fork 模式

该模式默认关闭，开启方式：环境变量  `CLAUDE_CODE_FORK_SUBAGENT=1`

> 该功能在2.1.122版本（2026.4.28 日发布）出现

该模式下，创建 SubAgent 时可以选择 fork 当前上下文，而不是重新进行一个详细任务 context 描述给 SubAgent

在prompt上，AgentTool 的 description 增加了 `or omit it to fork yourself — a fork inherits your full conversation context` ，另外 `When not to use` 被替换为 `When to fork`

同时 Fork Agent 启动时也会收到一个额外的 Prompt

### Coordinator 模式

该模式默认关闭，开启方式：环境变量 `CLAUDE_CODE_COORDINATOR_MODE=1`

> 该功能在2.1.156版本（2026.5.28 日发布）出现

该模式下，主 Agent 更加特化为一个 **指挥者** 的职责，自己不能 Edit、不能 Bash，只能派 SubAgent、停 SubAgent、发消息

该模式下，主 Agent 的 Tools 只有：
- AGENT_TOOL_NAME：启动一个新 worker
- SEND_MESSAGE_TOOL_NAME：续跑一个已有 worker（向它的 `to` agent ID 发一条后续消息）
- TASK_STOP_TOOL_NAME：停止一个正在运行的 worker
- subscribe_pr_activity / unsubscribe_pr_activity（若可用）：订阅 GitHub PR 事件（review 评论、CI 结果）。事件会以用户消息形式到达。合并冲突的状态变化 **不会** 到达——GitHub 不会为 `mergeable_state` 变化发 webhook，所以若要跟踪冲突状态，请轮询 `gh pr view N --json mergeable` 。这些调用要你自己来——不要把订阅管理派给 worker

这个范式非常激进，但这种方式用户不用关注 Agent 或 Agent team 内的细节，有一层 agent 来做用户交互界面的翻译，这种方式也许是未来的主流

### Teammate / Agent Swarms 模式

接近 Multi Agent 的范式。最早出现在 2026.1.22，后续逐步完善直到 2026.2.13。但该功能目前都还没有转正

该功能默认不开启，开启方式：环境变量 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 或 `CLI flag --agent-teams`

该模式下，更接近于对等 Agent 的方式，每个 Agent 不是主 Agent 的 Tool，可以异步独立长时间执行，相互之间使用 **信箱** 进行消息通讯。该设计下主 Agent 成为 Team leader。每个 Agent 的停止是由 team leader 主动发消息要求停止才停止。

##  Codex
Codex 有两种不同的 SubAgent/MultiAgent 模式，分别对应于 Claude 的非 Fork 模式和 Teammate 模式。

### Collab 模式

该模式是默认设置，它很类似于 AgentTool，但它启动的 SubAgent 始终是异步的，类似于启动了一个异步 Task，通过 wait 等方式进行阻塞等待。有五个工具：`spawn_agent` ， `wait_agent` ， `send_input` ， `close_agent` ， `resume_agent`。命名空间叫做 `multi_agent_v1`

在 SubAgent 执行中，Codex 可以通过send_input 来追加发送信息给 SubAgent

### MultiAgentV2

默认关闭，而且与之前的 Collab 互斥。这种方式更接近 Claude Code 的 Teammate 方式，采用信箱进行消息通讯

### Agent Jobs 批量模式

一种批量任务的特化模式，可以使用一个 CSV 表格数据来批量创建一组 Agent，使用 Collab 模式，并等待所有任务完成

## OpenAI Agents SDK

OpenAI Agents SDK 采用了和 Codex 不同的设计，OpenAI Agents SDK 在这方面的 Prompt 都写得很简单，像是为开发者自己调教

### Agent As Tool

这是类似 Claude Code 非 Fork 模式的功能。而且支持多层递归地创建。并做了内部权限请求的层层穿透回来。

### Handoff

把当前 Agent 的 role/system prompt 替换为另一个，在原有的 context 上继续执行的方式。触发方式是伪装成一个Tool调用触发。这其实是执行那种由SubAgent节点组成的workflow的方式。不过很遗憾的是目前的实现方式无法复用 KV Cache

## Open Code

支持 Agent As Tool，即 Claude Code 非 Fork 模式

## Kimi Code

支持 Agent As Tool，并且支持前台和后台两种运行方式

Kimi Code 的 SubAgent 有超时设置，默认 30min

### AgentSwarm

类似于 Codex 的 Agent Jobs 批量模式，或者是 Claude Code 动态 Workflow 的一个单 Step 退化版

## OpenClaw

OpenClaw 支持 Agent As Tool，并且允许调用外部 CLI Agent 作为 SubAgent。可以选择是否 fork context，是否吃持久性运行 session。支持**多层嵌套** 创建 SubAgent。

主 Agent System Prompt 中有个设置可以设定尽量委托而非自己动手

## Hermes Agent

### delegate_task

Agent As Tool 的功能，允许嵌套创建 SubAgent（默认只有一层），并且有设计专门的 orchestrator——（协调者） 角色来进一步拆分任务。

### Kanban

Kanban 是一种外部进程的 Agent 调用功能，生命周期不绑定主 Agent，返回结果通过消息途径发送给订阅者

### Mixture-of-Agents

一种同时调用多个不同模型生成回答再综合答案的方式