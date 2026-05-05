# nano-claude-code

> 一个模块化的 Claude Code 学习实现 — 从零构建理解 AI 代理的核心机制。

本项目基于 [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code)（[learn.shareai.run](https://learn.shareai.run/)）的学习路径搭建，将原仓库代码按功能模块拆分重构，作为理解和实践 AI 代理（Agent）系统的学习版本。

项目使用 OpenAI 兼容 API。

## 目录结构

```
src/
├── loop.py                  # 核心循环：对话轮次、工具调用、Agent 主循环
├── agents/                  # 代理系统
│   ├── protocols.py         #   代理协议定义
│   ├── message_bus.py       #   消息总线
│   ├── subagent.py          #   子代理编排
│   └── teammate_manager.py  #   团队成员管理
├── compression/             # 上下文压缩
│   └── context.py           #   历史压缩、输出持久化、手动压缩
├── context/                 # 上下文构建
│   ├── system_prompt.py     #   系统提示词组装
│   └── messages.py          #   消息归一化
├── hook/                    # 钩子系统
│   └── manager.py           #   PreToolUse / PostToolUse / SessionStart
├── memory/                  # 记忆系统
│   └── manager.py           #   持久化记忆的加载与管理
├── mcp/                     # MCP 协议支持
│   ├── client.py            #   MCP 客户端
│   ├── router.py            #   MCP 路由分发
│   └── loader.py            #   插件加载器
├── permission/              # 权限系统
│   ├── manager.py           #   权限管理器
│   ├── rules.py             #   规则定义
│   └── validator.py         #   校验逻辑
├── tasks/                   # 任务系统
│   ├── manager.py           #   任务创建/更新/列表
│   ├── background.py        #   后台任务执行
│   └── scheduler.py         #   定时调度 (Cron)
├── tools/                   # 工具层
│   ├── registry.py          #   工具注册与分发
│   ├── sandbox.py           #   沙箱执行
│   └── skills.py            #   技能系统
├── utils/                   # 工具函数
│   ├── compress_prompt.py   #   提示词压缩
│   ├── error_recovery.py    #   API 错误恢复
│   ├── logging.py           #   日志记录
│   ├── subagent_prompt.py   #   子代理提示词
│   └── system_prompt.py     #   系统提示词工具
└── worktrees/               # Worktree 隔离
    ├── manager.py           #   工作树管理
    └── event_bus.py         #   事件总线
```

## 配套文档

`docs/` 目录下按模块逐步讲解每个系统的实现原理：

| # | 文档 | 内容 |
|---|------|------|
| 1 | [Loop 最小循环](docs/1、Loop%20最小循环.md) | 最基础的对话轮次与 API 调用 |
| 2 | [Tool 工具调用](docs/2、Tool%20工具调用.md) | 工具注册、执行、结果回传 |
| 3 | [Plan 待办写入](docs/3、Plan%20待办写入.md) | 任务规划和待办事项管理 |
| 4 | [SubAgent 子代理](docs/4、SubAgent%20子代理.md) | 子代理的spawn与通信 |
| 5 | [Skills 技能](docs/5、Skills%20技能.md) | 技能加载与触发 |
| 6 | [Compression 上下文压缩](docs/6、Compression%20上下文压缩.md) | 对话历史压缩策略 |
| 7 | [Permission 权限系统](docs/7、Permission%20权限系统.md) | 工具权限控制 |
| 8 | [Hook 钩子](docs/8、Hook%20钩子.md) | 事件钩子机制 |
| 9 | [Memory 记忆系统](docs/9、Memory%20记忆系统.md) | 跨会话持久化记忆 |
| 10 | [System Prompt 系统提示词](docs/10、System%20Prompt%20系统提示词.md) | 系统提示词构建 |
| 11 | [Error 错误恢复](docs/11、Error%20错误恢复.md) | API 调用失败恢复 |
| 12 | [Task 任务系统](docs/12、Task%20任务系统.md) | 任务创建与跟踪 |
| 13 | [后台任务](docs/13、后台任务（加强%20Task）.md) | 后台任务执行 |
| 14 | [Scheduler 定时调度](docs/14、Scheduler%20定时调度.md) | Cron 定时任务 |
| 15 | [Agent Teams 团队与协议](docs/15、Agent%20Teams%20团队与协议.md) | 多代理协作 |
| 16 | [Autonomous Agent 自主代理](docs/16、Autonomous%20Agent%20自主代理.md) | 自主决策代理 |
| 17 | [Worktree 隔离](docs/17、Worktree%20隔离.md) | 工作树隔离机制 |
| 18 | [MCP 与插件](docs/18、MCP%20与插件.md) | MCP 协议与插件系统 |

## 快速开始

### 前提条件

- Python 3.10+
- 一个支持 OpenAI 兼容 API 的模型服务（如 MiniMax、Qwen 等）

### 安装

```bash
# 克隆仓库
git clone https://github.com/<your-username>/nano-claude-code.git
cd nano-claude-code

# 使用 uv 创建虚拟环境并安装依赖
uv init --no-readme
uv add openai python-dotenv
uv run python src/loop.py
```

### 配置

在项目根目录创建 `.env` 文件：

```env
BASE_URL=https://your-api-provider.com/v1
API_KEY=your-api-key
MODEL_ID=your-model-name
```

### 运行

```bash
uv run python src/loop.py
```

启动后会提示选择权限模式（`default` / `allow` / `deny` / `ask`），然后即可进入交互式对话。

### 运行时命令

| 命令 | 说明 |
|------|------|
| `/mode <mode>` | 切换权限模式 |
| `/rules` | 查看当前权限规则 |
| `/tools` | 列出所有可用工具 |
| `/mcp` | 查看 MCP 服务器状态 |
| `exit` / `q` | 退出 |

## 核心特性

- **工具调用（Tool Use）** — 内置工具注册表，支持 MCP 协议扩展外部工具
- **权限控制** — 四级权限模式（allow / default / deny / ask），可配置规则
- **上下文压缩** — 自动压缩过长对话历史，保持上下文窗口有效利用
- **钩子系统** — PreToolUse / PostToolUse / SessionStart 事件钩子
- **持久化记忆** — 跨会话记忆加载与注入
- **子代理编排** — 支持 spawn 子代理处理独立子任务
- **任务管理** — 任务创建、后台执行、定时调度（Cron）
- **Worktree 隔离** — 基于 git worktree 的隔离工作环境
- **错误恢复** — API 调用失败自动重试与上下文压缩恢复

## 思考与体会

构建这个项目的过程中，有几个深刻的感受：

**工具（Tool）是 Agent 的核心。** Agent 的迭代速度很快，但本质上离不开工具的实现。一个 Agent 能做什么，几乎完全取决于它被赋予了哪些工具。工具的接口设计、参数规范、返回值格式，直接决定了 Agent 的能力边界。

**架构设计并没有太多新东西。** 模块拆分、面向对象、操作系统概念、并行处理 — 这些传统软件工程的细节依然是基石。新的 AI Agent 架构，很大程度上是在原有工程实践之上"堆料"，把 LLM 作为一个强有力的组件嵌入到成熟的工程范式中去。

**安全是重中之重。** Agent 拥有工具调用能力后，权限控制、沙箱隔离、输入校验就不再是可选的，而是必须从第一天就开始设计的安全基础设施。一个没有安全边界的代理，能力越强风险越大。

## 许可证

MIT
