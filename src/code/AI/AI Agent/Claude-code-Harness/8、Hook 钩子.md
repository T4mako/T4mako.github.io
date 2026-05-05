# Hook 钩子系统

## 整体交互流程

```
主循环到达某个时机（SessionStart / PreToolUse / PostToolUse）
       ↓
HOOKS.run(event, ...)  — 遍历 .hooks.json 中该事件的所有 hook
       ↓
对每个匹配的 hook：
    ├─ 注入环境变量（HOOK_EVENT, HOOK_TOOL_NAME, HOOK_TOOL_INPUT, HOOK_TOOL_OUTPUT）
    ├─ 执行 shell 命令
    ├─ 根据退出码处理结果：
    │   ├─ 0 → 解析执行结果中的 JSON（updatedInput / additionalContext / permissionDecision）
    │   ├─ 1 → 阻止执行（stderr = 阻止原因）
    │   └─ 2 → 注入消息到对话（stderr = 消息文本）
    └─ 聚合所有 hook 的结果 → 返回 HookResult
       ↓
主循环根据 HookResult 决定后续行为（跳过工具执行 / 替换参数 / 注入消息）
```

## 实现思路

Hook 系统的核心思想是：**主循环只负责暴露"时机"，真正的附加行为交给外部命令**。

| 文件 | 职责 |
|------|------|
| `src/hook/manager.py` | Hook 配置加载 + 外部命令执行 + 结果聚合 |
| `src/hook/__init__.py` | 模块导出 |
| `.hooks.json` | 用户自定义的 hook 配置文件（JSON 格式） |

主循环（`loop.py`）在三个固定时机调用 `HOOKS.run()`：

1. **SessionStart** — `agent_loop()` 启动时，hook 注入的消息以 `role=system` 追加到消息历史
2. **PreToolUse** — 工具执行前（权限检查之前），hook 可阻止执行、替换参数、注入上下文
3. **PostToolUse** — 工具执行后，hook 可注入审计日志、附加消息

hook 命令通过**退出码**告知主系统意图，通过**环境变量**获取上下文，通过 **stdout JSON** 返回结构化数据。

## 核心问题

### Q1: 什么是 Hook？为什么需要 Hook？

**Hook（钩子）是在主循环的固定时机，将当前上下文交给外部命令处理，处理完后将结果返回给主系统的机制。**

没有 hook 之前的困境：

```python
# loop.py 中的 turn() 函数
def turn(state, user_text):
    # ... 发请求
    # ... 处理工具调用
    # ... 权限检查
    # ... 执行工具
    # ... 处理结果
    # ... 打印日志        ← 需求1: 加到这里
    # ... 记录审计信息     ← 需求2: 加到这里
    # ... 安全检查        ← 需求3: 加到这里
    # ... 通知 Slack      ← 需求4: 加到这里
    # ... 指标上报        ← 需求5: 加到这里
```

每增加一个需求，你都去修改主循环。主循环越来越重，最后谁都不敢动。

**引入 hook 之后：**

```python
# 主循环只暴露"时机"
pre = HOOKS.run("PreToolUse", tool_name, tool_input=args)
# ... 执行工具
post = HOOKS.run("PostToolUse", tool_name, tool_input=args, tool_output=output)
```

新增需求？写一个 shell 脚本，在 `.hooks.json` 里注册就行，**不需要修改主循环代码**。

### Q2: 用户怎么定义 Hook？

用户在项目根目录下创建 `.hooks.json` 文件，按事件名分组配置 hook：

```json
{
  "hooks": {
    "SessionStart": [
      { "command": "echo 'Welcome to the workspace!'" }
    ],
    "PreToolUse": [
      { "matcher": "*", "command": "./scripts/log_all.sh" },
      { "matcher": "bash", "command": "./scripts/check_dangerous_cmds.sh" }
    ],
    "PostToolUse": [
      { "matcher": "*", "command": "./scripts/audit_log.sh" }
    ]
  }
}
```

每个 hook 配置包含两个字段：

| 字段 | 必需 | 说明 |
|------|------|------|
| `command` | 是 | 要执行的 shell 命令 |
| `matcher` | 否 | 工具匹配规则，`"*"` 匹配所有工具，否则精确匹配工具名（默认 `*`） |

**支持的三个事件：**

| 事件名 | 触发时机 | 可用环境变量 |
|--------|----------|-------------|
| `SessionStart` | 会话启动时 | `HOOK_EVENT` |
| `PreToolUse` | 工具执行前（权限检查之前） | `HOOK_EVENT`, `HOOK_TOOL_NAME`, `HOOK_TOOL_INPUT` |
| `PostToolUse` | 工具执行后 | 以上全部 + `HOOK_TOOL_OUTPUT` |

**hook 命令通过退出码告知意图：**

| 退出码 | 含义 | 数据传递方式 |
|--------|------|-------------|
| `0` | 正常继续，可选返回结构化 JSON | `stdout` 中的 JSON（`updatedInput` / `additionalContext` / `permissionDecision`） |
| `1` | 阻止当前工具执行 | `stderr` = 阻止原因 |
| `2` | 向对话注入一条消息 | `stderr` = 消息文本 |

**一个具体的 PreToolUse hook 示例**（阻止危险 bash 命令）：

```bash
#!/bin/bash
# check_dangerous.sh
if echo "$HOOK_TOOL_INPUT" | grep -q "rm -rf /"; then
  echo "检测到危险命令: rm -rf /" >&2
  exit 1
fi
exit 0
```

### Q3: 模型知道这些 Hook 吗？Hook 的具体内容是如何被执行的？

**模型完全不知道 hook 的存在。** hook 运行在本地，是 agent 框架层面的拦截机制，不对模型暴露。

模型只知道有哪些工具（通过 `tools` 参数），它正常返回工具调用 → 主循环拦截 → 执行 hook → 决定是否放行。

**hook 的具体执行流程：**

```
1. HookManager 初始化时读取 .hooks.json → 按事件名分组存入内存
       ↓
2. 主循环到达时机 → HOOKS.run(event, tool_name, tool_input, tool_output)
       ↓
3. 遍历该事件的所有 hook 配置 → _matches() 过滤（根据 matcher）
       ↓
4. 对每个匹配的 hook：
   a. 构建环境变量（继承系统环境变量 + 注入 HOOK_EVENT/HOOK_TOOL_NAME/HOOK_TOOL_INPUT/HOOK_TOOL_OUTPUT）
   b. 用 subprocess.run() 执行 shell 命令（超时 30 秒，工作目录 = WORKDIR）
   c. 根据退出码分类处理：
      - 0: _parse_structured_output(stdout) 解析 JSON
      - 1: result.blocked = True, result.block_reason = stderr
      - 2: result.messages.append(stderr)
       ↓
5. 返回聚合的 HookResult
```

**环境变量传递上下文：**

```python
env["HOOK_EVENT"] = event                           # 事件名
env["HOOK_TOOL_NAME"] = tool_name                   # 当前工具名
env["HOOK_TOOL_INPUT"] = json.dumps(tool_input)[:10000]   # 工具参数（截断 10k）
env["HOOK_TOOL_OUTPUT"] = tool_output[:10000]       # 工具输出（仅 PostToolUse）
```

**退出码 0 的结构化输出解析：**

hook 命令在 stdout 中打印 JSON，`_parse_structured_output()` 解析：

```json
{
  "updatedInput": {"command": "ls -la"},
  "additionalContext": ["此命令已在沙箱中运行"],
  "permissionDecision": "allow"
}
```

| JSON 字段 | 作用 |
|-----------|------|
| `updatedInput` | 替换原始工具输入参数 |
| `additionalContext` | 附加上下文信息，注入为 `[Hook note] ...` 消息 |
| `permissionDecision` | 覆盖权限决策（`"allow"` / `"deny"` / `"ask"`） |

**主循环如何响应 hook 结果（以 PreToolUse 为例）：**

```
pre = HOOKS.run("PreToolUse", tool_name, tool_input=args)

如果 pre.updated_input 有值 → 替换 args
如果 pre.blocked 为 True   → 跳过权限检查和工具执行，直接写入 "Blocked by hook: ..." 到消息历史
如果 pre.messages / pre.additional_context 有内容 → 收集起来，延迟到工具执行后追加
```

### Q4: 哪些功能可以作为 Hook？

**任何需要在固定时机执行的附加行为**都可以做成 hook，典型场景：

| 场景 | 事件 | 退出码 | 示例 |
|------|------|--------|------|
| 会话开始时打印欢迎信息 | `SessionStart` | `0` | `echo "Welcome! Today is $(date)"` |
| 会话开始时注入项目上下文 | `SessionStart` | `0` | 输出 JSON: `{"additionalContext": ["当前项目是 XX 系统"]}` |
| 工具执行前做安全检查 | `PreToolUse` | `1` | 检测危险命令 → `exit 1` 阻止 |
| 工具执行前修改参数 | `PreToolUse` | `0` | 输出 JSON: `{"updatedInput": {"path": "/safe/path"}}` |
| 工具执行前做额外权限校验 | `PreToolUse` | `0` | 输出 JSON: `{"permissionDecision": "deny"}` |
| 工具执行后补审计日志 | `PostToolUse` | `0` | 将工具名、参数、结果写入审计文件 |
| 工具执行后通知外部系统 | `PostToolUse` | `0` | 发送 Slack 消息 / 上报指标 |
| 工具执行后注入提醒 | `PostToolUse` | `2` | `echo "注意: 此文件包含敏感信息" >&2` |

**设计原则：**

> 主循环只负责暴露"时机"，真正的附加行为交给 hook。

新增需求时：
- **不改主循环** — 写一个脚本，注册到 `.hooks.json`
- **不改模型** — 模型不知道 hook，正常推理
- **不耦合代码** — hook 是独立的外部命令，可以用任何语言写
