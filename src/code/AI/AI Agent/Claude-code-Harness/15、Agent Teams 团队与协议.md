# Agent Teams 团队与协议

## 整体交互流程

```
Lead 调用 spawn_teammate(name, role, prompt)
       ↓
TeammateManager.spawn() → 创建 TeammateRecord (状态 WORKING) → 写入 config.json 持久化
       ↓
启动独立 daemon 线程 → _teammate_loop() 主循环
       │
       ├─ ① read_inbox() 读取并清空收件箱
       ├─ ② 消息注入 LLM 上下文（协议消息以结构化格式注入）
       ├─ ③ 调用 LLM (含工具：send_message/shutdown_response/plan_approval 等)
       ├─ ④ 执行工具调用
       ├─ ⑤ 重复 ①-④ 直到 LLM 无工具调用 或 达到 MAX_WORK_TURNS(50)
       └─ ⑥ 设置状态 idle（正常完成）/ shutdown（协议关闭）
       │
       └─ 最终结果通过 task_result 消息发送到 lead 的 inbox
```

**团队协议流程：**

```
关闭协议 (Lead → Teammate):
  create_shutdown_request() → 生成 request_id → RequestStore 写 pending 记录
       ↓
  MessageBus 发送 shutdown_request 到 teammate inbox
       ↓
  Teammate 收到 → 调用 shutdown_response(approve=true/false)
       ↓
  RequestStore 更新状态 → 通知 lead → approve=true 则线程退出

计划审批协议 (Teammate → Lead):
  Teammate 调用 plan_approval(plan) → 生成 request_id → RequestStore 写 pending 记录
       ↓
  MessageBus 发送 plan_approval 到 lead inbox
       ↓
  Lead 收到 → 调用 plan_approval(request_id, approve, feedback)
       ↓
  RequestStore 更新状态 → plan_approval_response 发送到 teammate inbox
```

## 实现思路

团队系统的本质是：**一批有身份、能长期存在、能反复协作的命名 Agent，通过文件 inbox 异步通信。**

与一次性 SubAgent（创建→执行→返回→消失）不同，Teammate 的生命周期是：`spawn → work → idle → work → ... → shutdown`。

| 文件 | 职责 |
|------|------|
| `src/agents/message_bus.py` | 基于 JSONL 文件的异步消息总线，线程安全 |
| `src/agents/teammate_manager.py` | 命名 Agent 管理器，生命周期 + 工作循环 + 配置持久化 |
| `src/agents/protocols.py` | 结构化团队协议（关闭协议 + 计划审批协议），含 RequestStore |
| `src/agents/__init__.py` | 模块导出 |
| `src/tools/registry.py` | 9 个团队相关工具的元信息和 handler |
| `src/loop.py` | agent_loop 顶部 drain lead 的 inbox 消息 |

存储路径为 `{WORKDIR}/.team/`：

```
.team/
  config.json              ← 队伍成员配置（名称、角色、状态）
  inbox/
    alice.jsonl            ← alice 的收件箱（每行一个 JSON 消息）
    bob.jsonl
    lead.jsonl             ← 主 agent 的收件箱
  requests/
    abc123.json            ← 协议请求记录（含 request_id、状态、时间戳）
    def456.json
```

`loop.py` 中的集成：每轮 `agent_loop()` 顶部，通过 `_init_teams()` 获取 MessageBus 单例，调用 `bus.read_inbox("lead")` 读取 lead 的收件箱，将消息作为 `<inbox>...</inbox>` 格式的 user 消息注入对话历史。

## 核心问题

### Q1: 为什么需要 Agent 团队？SubAgent 的问题是什么？

SubAgent 的生命周期是：**创建 -> 执行 -> 返回摘要 -> 消失**。这很适合一次性的小委派，比如"帮我搜索这个符号的定义"或"总结这个文件"。

可如果你想做这些事，就不够用了：

- **让一个测试 Agent 长期待命**，随时接收新任务
- **让两个 Agent 长期分工**，一个负责编码一个负责审查
- **让某个 Agent 未来收到新任务后继续工作**，保持上下文

也就是说，系统现在缺的不是"再开一个模型调用"，而是：**一批有身份、能长期存在、能反复协作的队友**。

对比：

| 维度 | SubAgent | Teammate |
|------|----------|----------|
| **生命周期** | 创建→执行→返回→消失（一次性） | spawn→work→idle→work→...→shutdown（长期） |
| **身份** | 无名称，函数调用级别的临时对象 | 有唯一名称（如 "alice"），持久化到 config.json |
| **通信** | 同步阻塞，返回值即结果 | 异步，通过 MessageBus JSONL inbox 通信 |
| **上下文** | 函数返回后完全丢失 | 工作循环内累积，可跨轮次保持 |
| **工具权限** | 排除 `task`/`todo` | 排除管理级工具（spawn_teammate/sub_agent/cron_* 等） |
| **协作** | 无法与其他 Agent 协作 | 可通过 inbox 与团队成员互相通信 |

### Q2: 一个 Teammate 包含什么东西？

一个 Teammate 由 `TeammateRecord` 结构化表示：

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | `str` | 唯一标识名称（如 "alice"、"bob"） |
| `role` | `str` | 角色描述（如 "coder"、"reviewer"、"tester"） |
| `status` | `str` | 当前状态：`idle`（空闲）、`working`（工作中）、`shutdown`（已关闭） |
| `system_prompt` | `str` | 可选的系统提示词 |

运行时，每个 Teammate 还拥有：

- **独立线程** — `threading.Thread(daemon=True)` 运行 `_teammate_loop` 主循环
- **独立 inbox** — `.team/inbox/{name}.jsonl`，通过 MessageBus 收发消息
- **独立的 LLM 对话上下文** — 每轮循环将 inbox 消息注入 messages 列表，累积调用模型
- **受限的工具集** — 从全局 `_tools` 中排除 `TEAMMATE_EXCLUDED_TOOLS` 中的工具

```python
TEAMMATE_EXCLUDED_TOOLS = {
    "sub_agent", "spawn_teammate", "list_teammates", "broadcast",
    "task_create", "task_update", "task_list", "task_get",
    "background_run", "background_output", "background_stop", "background_list",
    "cron_create", "cron_delete", "cron_list",
    "save_memory", "search_memory", "list_memories", "delete_memory",
    "compact", "load_skill",
}
```

配置持久化到 `.team/config.json`：

```json
{
  "members": [
    {"name": "alice", "role": "coder", "status": "idle"},
    {"name": "bob", "role": "reviewer", "status": "working"}
  ]
}
```

### Q3: Teammate 之间怎么通信？

通过 **MessageBus**，基于 JSONL 文件的异步消息总线。

每个 Agent 拥有一个独立的 inbox 文件（`.team/inbox/{name}.jsonl`）。消息以追加模式写入，读取时一次性 drain（读取后清空文件）。

消息格式（每行一个 JSON）：

```json
{
  "type": "message",
  "from": "alice",
  "to": "bob",
  "content": "任务已完成",
  "timestamp": 1714567890.123
}
```

合法的消息类型（`VALID_MSG_TYPES`）：

| 类型 | 说明 |
|------|------|
| `message` | 普通消息 |
| `broadcast` | 广播消息 |
| `shutdown_request` | 关机请求（携带 request_id） |
| `shutdown_response` | 关机响应（携带 request_id, approve） |
| `plan_approval` | 计划审批请求（携带 request_id, plan） |
| `plan_approval_response` | 计划审批响应（携带 request_id, approve, feedback） |
| `task_assignment` | 任务分配 |
| `task_result` | 任务结果 |
| `status_update` | 状态更新 |

通信方式有三种：

- **`send(sender, to, content, msg_type, extra)`** — 点对点发送，`extra` 可附加额外字段
- **`broadcast(sender, content, recipients)`** — 广播给所有收件人（排除发送者自身）
- **`peek_inbox(name)` / `read_inbox(name)`** — 查看收件箱（peek 不清空，read 会 drain）

LLM 侧暴露的工具：`send_message`（发消息）、`read_inbox`（读消息）、`broadcast`（广播）。

线程安全：所有文件操作通过 `threading.Lock` 保护，支持并发读写。

### Q4: Teammate 之间是异步的吗？

**是的，完全异步。**

每个 Teammate 运行在独立线程中，拥有自己的工作循环。通信通过文件 inbox 进行，不存在同步等待。发送方写入消息后立刻返回，不等待接收方处理。

Teammate 的工作循环每轮会 `read_inbox()` 读取并清空收件箱，将消息注入 LLM 上下文后调用模型。如果 LLM 调用了工具（如 `send_message` 回复），执行后继续下一轮循环读取新消息。

```
Alice 线程                         MessageBus                         Bob 线程
  │--- send("bob", "任务A") ------->│                                  │
  │ (立刻返回)                      │-- 写入 bob.jsonl (追加) -------->│
  │ ... 继续自己的工作               │                                  │
  │                                 │  （Bob 在自己的循环节奏中读取）   │
  │                                 │<-- read_inbox() (drain) --------│
```

这意味着：

- 发送方不需要等待回复
- 多个 Teammate 可以同时工作（各自独立线程）
- 消息可能在 inbox 中积压（直到对方下一轮读取）
- 没有死锁风险（文件锁粒度细，只保护单次读写）

### Q5: Teammate 之间是否有依赖关系？

**结构上没有强制依赖，但角色上存在隐含的层级。**

- **Lead**（主 Agent）是团队的管理者，负责 spawn teammate、分配任务、审批计划、请求关闭
- **Teammate** 是被管理者，接收 Lead 的消息和指令，执行具体工作

Teammate 之间可以互相通信（通过 `send_message` 指定对方的 name），但不存在 teammate A 必须依赖 teammate B 这种硬编码关系。依赖完全由任务逻辑和对话上下文决定。

工具权限上，Teammate 被排除了管理级工具（`spawn_teammate`、`sub_agent`、`cron_*`、`task_*` 等），防止权限过大或产生嵌套管理。

### Q6: Teammate 是长期存在的吗？怎么做的？

**是的，Teammate 设计为长期存在、可反复使用。**

与 SubAgent 的"创建→执行→消失"不同，Teammate 的生命周期是：

```
spawn -> work -> idle -> work -> ... -> shutdown
```

具体实现：

- **独立线程** — 每个 Teammate 启动一个 `daemon=True` 的 `threading.Thread`，运行 `_teammate_loop` 主循环
- **工作循环** — 每轮读取 inbox → 注入上下文 → 调用 LLM → 执行工具调用 → 继续循环，最多 `MAX_WORK_TURNS=50` 轮
- **状态持久化** — 成员信息（名称、角色、状态）保存到 `.team/config.json`，`TeammateManager` 初始化时通过 `_load_config()` 自动加载
- **可重新激活** — 如果同名 Teammate 状态为 `idle` 或 `shutdown`，可以调用 `spawn` 重新激活（复用已有记录，更新 role 和状态）。如果正在工作则拒绝启动。
- **优雅关闭** — 通过关闭协议（shutdown protocol），Lead 发送请求后 Teammate 自行决定是否批准

配置加载和保存：

```python
def _load_config(self):
    if self.config_path.exists():
        data = json.loads(self.config_path.read_text())
        self._members = [TeammateRecord.from_dict(m) for m in data["members"]]

def _save_config(self):
    data = {"members": [m.to_dict() for m in self._members]}
    self.config_path.write_text(json.dumps(data, indent=2))
```

### Q7: 为什么需要团队协议？

Teammate 之间的自由文本聊天足以覆盖大部分协作场景。但如果所有事情都只靠自由文本，会有两个明显问题：

1. **某些动作必须明确批准或拒绝**，不能只靠一句模糊回复
2. **一旦多个请求同时存在**，系统很难知道"这条回复对应哪一件事"

最典型的两个场景就是：

- **队友要不要优雅关机**
- **某个高风险计划要不要先审批**

这两件事看起来不同，但结构完全一样：

> 一方发请求 → 另一方明确回复 → 双方都能用同一个 `request_id` 对上号

所以这一章要加的，**不是更多自由聊天，而是一层结构化协议。**

协议的核心设计：

- **`request_id`** — 每个请求生成唯一 ID（`uuid.uuid4()` 前 8 位），用于关联请求和响应
- **`RequestStore`** — 持久化请求记录到 `.team/requests/{request_id}.json`，支持 create/get/update/list，线程安全
- **状态机** — `pending → approved | rejected`，通过文件锁保护并发操作

```python
class RequestStore:
    def create(self, record)    # 创建请求记录
    def get(self, request_id)   # 获取请求记录
    def update(self, id, **kw)  # 更新请求字段
    def list_all(status=None)   # 列出所有请求（可选按状态过滤）
    def generate_id()           # 生成 8 位唯一 ID
```

### Q8: 团队协议有哪些？

目前实现了两种协议：

#### 关闭协议（Shutdown Protocol）

Lead 请求 Teammate 优雅关闭，Teammate 自行决定是否批准。

| 步骤 | 发起方 | 动作 |
|------|--------|------|
| 1 | Lead | `create_shutdown_request()` — 生成 request_id，创建 pending 记录，通过 inbox 发送 `shutdown_request` |
| 2 | Teammate | 收到消息后，调用 `shutdown_response` 工具回复（`approve=true/false` + `reason`） |
| 3 | 系统 | 更新请求状态为 `approved/rejected`，通过 inbox 通知 Lead |

Teammate 如果批准关闭（`approve=true`），其工作循环会设置 `should_exit=True`，在下一轮循环时跳过 LLM 调用，直接退出线程，状态设为 `shutdown`。

```
Lead                                Teammate
  +---------------------+            +---------------------+
  | shutdown_request     |            |                     |
  | {request_id: abc}    | ---------> | 收到请求             |
  +---------------------+            | 决定: 批准?          |
                                     +---------------------+
                                             |
  +---------------------+            +-------v-------------+
  | 更新状态             | <--------- | shutdown_response   |
  | approved/rejected    |            | {request_id: abc,   |
  +---------------------+            |  approve: true}     |
```

#### 计划审批协议（Plan Approval Protocol）

Teammate 在执行重大操作前，向 Lead 提交计划等待审批。

| 步骤 | 发起方 | 动作 |
|------|--------|------|
| 1 | Teammate | 调用 `plan_approval` 工具提交计划 — 生成 request_id，创建 pending 记录，通过 inbox 发送 `plan_approval` 给 Lead |
| 2 | Lead | 收到 `plan_approval` 消息到 inbox，调用 `plan_approval` 工具审批（`approve=true/false` + `feedback`） |
| 3 | 系统 | 更新请求状态，将 `plan_approval_response` 发送到 Teammate 的 inbox |

```
Teammate                            Lead
  +---------------------+          +---------------------+
  | plan_approval        |          |                     |
  | {plan: "..."}        | -------> | 审查计划             |
  +---------------------+          | 批准/拒绝?           |
                                   +---------------------+
                                           |
  +---------------------+          +-------v-------------+
  | 等待响应             | <------- | plan_approval_response|
  | 收到结果后继续工作   |          | {approve: true}     |
  +---------------------+          +---------------------+
```

#### 查询工具

两种协议共享的查询能力：

| 工具 | 函数 | 说明 |
|------|------|------|
| `request_status` | `check_request_status()` | 按 request_id 查询单个请求的当前状态 |
| `list_requests` | `list_requests()` | 列出所有请求（可选按状态过滤） |

`list_requests` 返回格式：

```
  [待处理] abc123 (关闭) from=lead to=alice
  [已批准] def456 (计划审批) from=bob to=lead: 实现用户认证模块
```

#### 多协议并发

多个协议请求可以同时存在，通过 `request_id` 区分。`RequestStore` 通过文件锁保证并发安全，`MessageBus` 通过 JSONL 追加写入保证消息不丢失。测试中验证了同时发起关闭请求 + 多个计划审批请求的正确性。

### Q9: 协议是怎么定义的？

一个协议不是单一的文件或函数，而是**五层协作**的结果。以关闭协议为例，从消息类型到 LLM 可调用的工具，逐层串联：

**第一层：消息类型定义（`message_bus.py`）**

`VALID_MSG_TYPES` 声明了合法的消息类型，MessageBus 的 `send()` 会校验：

```python
VALID_MSG_TYPES = {
    "message",
    "shutdown_request",     # ← 关闭请求
    "shutdown_response",    # ← 关闭响应
    "plan_approval",        # ← 计划审批请求
    "plan_approval_response",  # ← 计划审批响应
    # ... 其他类型
}
```

这决定了 inbox 中消息的 `type` 字段可以是什么值。

**第二层：协议处理函数（`protocols.py`）**

每个协议有一对函数：创建请求 + 处理响应。负责 `request_id` 生成、RequestStore 读写、以及通过 MessageBus 发送消息。

```python
# 关闭协议
create_shutdown_request(request_store, bus, teammate)  # Lead 端 — 创建请求
handle_shutdown_response(request_store, bus, sender, request_id, approve, reason)  # Teammate 端 — 处理响应

# 计划审批协议
create_plan_approval(request_store, bus, sender, plan)       # Teammate 端 — 提交计划
handle_plan_review(request_store, bus, request_id, approve, feedback)  # Lead 端 — 审批
```

**第三层：工具暴露（`registry.py` + `teammate_manager.py`）**

协议函数需要通过工具调用才能被 LLM 使用。两边的暴露方式不同：

| 侧 | 工具 | 定义位置 | 说明 |
|----|------|---------|------|
| **Lead 侧** | `shutdown_request` | `registry.py` — `_tools` 元信息 + `handlers` 映射 | LLM 通过 Function Calling 调用 |
| **Lead 侧** | `plan_approval` | `registry.py` — `_tools` 元信息 + `handlers` 映射 | LLM 审批 teammate 提交的计划 |
| **Teammate 侧** | `shutdown_response` | `teammate_manager.py` — `_exec_tool()` 硬编码处理 | 不在 `_tools` 列表，由 `_exec_tool` 直接路由 |
| **Teammate 侧** | `plan_approval` | `teammate_manager.py` — `_exec_tool()` 硬编码处理 | 同上 |

Teammate 侧的协议工具不走 `registry.py` 的 `handlers` 字典，而是在 `_exec_tool` 中优先匹配：

```python
def _exec_tool(self, sender: str, tool_name: str, args: dict) -> str:
    # 通信工具
    if tool_name == "send_message": ...
    if tool_name == "read_inbox": ...

    # 协议工具（优先于 handlers 字典）
    if tool_name == "shutdown_response":
        return _proto_shutdown_response(self.request_store, self.bus,
                                        sender, args["request_id"],
                                        args["approve"], args.get("reason", ""))
    if tool_name == "plan_approval":
        return _proto_plan_approval(self.request_store, self.bus,
                                    sender, args["plan"])

    # 其他工具走 handlers
    fn = handlers.get(tool_name)
```

**第四层：系统提示词（`teammate_manager.py`）**

Teammate 的系统提示词告知 LLM 如何使用协议工具：

```python
system_prompt = (
    f"你是 '{name}'，角色: {role}...\n"
    f"在执行重大操作前，使用 plan_approval 提交计划等待 Lead 审批。\n"
    f"收到 shutdown_request 时，使用 shutdown_response 回复"
    f"（approve=true 表示同意关闭）。\n"
    f"完成任务后，输出最终总结即可结束。"
)
```

**第五层：消息注入（`teammate_manager.py` — `_teammate_loop`）**

Teammate 工作循环读取 inbox 时，协议消息以**结构化格式**注入 LLM 上下文，而不是原始 JSON：

```python
if msg_type == "shutdown_request":
    messages.append({
        "role": "user",
        "content": (
            f"[系统] 收到关闭请求 (request_id={request_id})\n"
            f"请使用 shutdown_response 工具回复，approve=true 表示同意关闭，"
            f"approve=false 表示拒绝并继续工作。"
        ),
    })
elif msg_type == "plan_approval_response":
    messages.append({
        "role": "user",
        "content": (
            f"[系统] 计划审批结果 (request_id={request_id}): {status_text}\n"
            f"反馈: {feedback}"
        ),
    })
```

**新增协议的步骤：**

如果要新增一个协议（比如"资源申请协议"），需要在这五层都添加对应代码：

```
1. VALID_MSG_TYPES 增加消息类型
2. protocols.py 增加 create_xxx / handle_xxx 函数
3. registry.py 增加 Lead 侧工具元信息和 handler
   teammate_manager.py 的 _exec_tool 增加 Teammate 侧路由
4. teammate_manager.py 的系统提示词增加使用说明
5. teammate_manager.py 的 _teammate_loop 增加消息注入逻辑
```
