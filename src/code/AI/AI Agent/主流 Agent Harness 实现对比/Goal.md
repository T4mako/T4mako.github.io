---
title: 主流 Agent Harness 的 Goal 实现对比
date: 2026-06-28
category:
  - AI Agent
tag:
  - Goal
  - Agent Harness
  - Codex
  - Claude Code
---

参考：https://zhuanlan.zhihu.com/p/2050710316212806091?theme=dark

## 概述

Goal 的核心原理是当一个模型停下来的时候，自动触发一轮请求吗，让基于用户的 Goal Prompt 来分析目前是否已经完成 goal 目标，没有就继续

本质上是在当前 context 上又触发了一轮对话，如果这轮对话模型判断错误、偷懒、或者是过早的认为没有可改进的时候，goal 也是救不了的

## Claude Code

goal 是通过它的 Hook 系统实现的，在模型停止（Stop）时加了一个 hook（在模型对话前后可以做一些操作）

Goal 命令的状态数据结构：

```ts
interface ActiveGoal {
  condition: string       // 用户输入的自然语言条件，最大 4000 字符
  iterations: number      // Stop hook 检查次数（每次未成功时自增）
  setAt: number           // goal 设置时的 epoch ms
  tokensAtStart: number   // goal 设置时的累计 output tokens
  lastReason?: string     // 上次检查失败时的 stop reason（仅显示用）
}
```

状态机有 4 种状态：`未设置` → `active` → `achieved`（条件成立，自动清除）或 `failed`（possible=false，清除）


## Codex

Codex 的实现也是类似的，Goal 内部状态设计为：

```rust
pub struct ThreadGoal {
    pub thread_id: ThreadId,
    pub objective: String,           // 最大 4000 字符
    pub status: ThreadGoalStatus,
    pub token_budget: Option<i64>,   // 正整数，可选
    pub tokens_used: i64,            // 非缓存输入 + 输出
    pub time_used_seconds: i64,      // 挂钟时间（追踪不 hardstop）
    pub created_at: i64,
    pub updated_at: i64,
}
```

状态机的状态有：`Active、Paused`（用户主动暂停）、`Blocked、BudgetLimited` 、`UsageLimited` 、`Complete`。在 Claude 的基础上考虑了token 用量限制因素。

## Kimi Code

Kimi Code 的 GoalMode 是作为一个标准实体进行持久化，数据结构为：

```ts
interface GoalState {
  goalId: string;
  objective: string;
  status: GoalStatus;          // 'active' | 'paused' | 'blocked' | 'complete'
  turnsUsed: number;
  tokensUsed: number;
  wallClockMs: number;         // 累计活跃时间（ms）
  wallClockResumedAt?: number; // 当前 active 区间起点
  budgetLimits: GoalBudgetLimits;  // { tokenBudget?, turnBudget?, wallClockBudgetMs? }
  terminalReason?: string;
}
```

Goal Loop 是一个不同于 Main Loop 的独立实现

Kimi Code 还支持队列形式的多个 goal 顺序执行，使用方式为 `/goal next <prompt>`

## OpenClaw 与 Hermes

OpenClaw 和 Hermes 也都支持 goal 指令，OpenClaw 的实现上大同小异这里不展开

Hermes 的结束判定是使用一个独立 Agent 进行

Hermes 有个可以追加 `/subgoal` 的指令，可以在执行过程中来增加新的目标条件

Pi、OpenCode、openai-agents-js 则没有 goal 指令