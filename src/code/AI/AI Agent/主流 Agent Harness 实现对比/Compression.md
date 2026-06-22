---
title: 主流 Agent Harness 的 Context Compression 实现对比
date: 2026-06-22
category:
  - AI Agent
tag:
  - Context Compression
  - Agent Harness
  - Codex
  - Claude Code
---

目前的 Context 压缩仍然处在一个比较早期的状态，原因：
- SubAgent 返回执行概要或结果文档给主 session，类似于 context 压缩
- 前沿模型可以读取自己在 home 目录下的历史 session 翻找信息

## Claude Code

[Compression 上下文压缩](../Claude-code-Harness/6、Compression%20上下文压缩.md)

Claude code 的 4 中压缩方式：
- microCompact：在一定时间后清理 tool 调用的结果
- autoCompact：通过可手动设置阈值的规则进行触发判定
- reactiveCompact：上下文超过模型窗口限制，此时尝试对于更短的历史进行压缩+后面未压缩的部分
- precomputedCompact：超过阈值时，在后台提前进行压缩，然后进行context替换（默认关闭）

整个 Summary 过程的 Prompt 是分为两个步骤，要求先写 `<analysis>`，然后再写`<summary>`

## Codex 和 OpenAI Agents SDK

Codex 的压缩分为 3 种实现，分别是：
- 本地 inline，本地实现，用于适配非 OpenAI 模型
- 远程 v1 版本，调用服务端独立的 Context 压缩 endpoint 进行压缩
- 远程 v2 版本，采用在 session 末尾增加一个压缩请求来触发

## OpenCode

OpenCode 的实现比较简单，保留最近两轮原文，然后压缩前面的部分

OpenCode 还实现了多次 Context 压缩时的 Summary 增量更新逻辑，Claude Code 没有这个设计

## Pi

Pi 的实现方式跟 Open Code 基本类似，在切分位置和超大轮次的切分上额外做了一些设计

Pi 也实现了多轮 Context 压缩时候的 Summary 增量更新

此外，当树形对话切换分支的时候，还会对于丢弃的分支生成一份分支摘要，类似于 Claude Code 的 Summarize from here

## Kimi Code 与 Hermes Agent

Kimi Code 的实现方式也比较简单：
- Full Compaction：标准的 Context 压缩方式
- Micro Compaction： Tool Result 压缩功能

Hermes Agent 的实现方式也比较传统，首先进行 tool result 清理，然后生成摘要，再进行最后的拼装