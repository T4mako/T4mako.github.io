# MCP 与插件

## 整体交互流程

```
agent 启动
       ↓
PluginLoader.scan() → 扫描 .claude-plugin/plugin.json → 提取 mcpServers 配置
       ↓
对每个服务器: MCPClient.connect()
       ├─ subprocess.Popen 启动子进程
       ├─ JSON-RPC initialize 握手
       ├─ notifications/initialized 通知
       └─ tools/list 获取工具列表
       │
       ↓
MCPToolRouter.register_client() 注册所有客户端
       ↓
build_tool_pool() 组装工具池: 原生工具 + MCP 工具（mcp__ 前缀）
       │
       ├─ 每轮 turn() 调用时，工具池作为 tools 参数传给 LLM
       │
       └─ LLM 返回 mcp__{server}__{tool} 调用
              ↓
         handle_mcp_or_native() 路由
              ├─ mcp__ 前缀 → MCPToolRouter.call() → MCPClient.call_tool() → JSON-RPC tools/call
              └─ 其他 → handlers[tool_name]() 原生工具
```

**插件加载流程：**

```
.claude-plugin/
  plugin.json   ← {"name": "my-plugin", "mcpServers": {"search": {"command": "npx", "args": [...]}}}
       ↓
PluginLoader.scan()
       ↓
提取 mcpServers → 服务器名加前缀: "my-plugin__search"
       ↓
MCPClient("my-plugin__search", "npx", [...]) → connect() → list_tools()
       ↓
MCP 工具转换为: "mcp__my-plugin__search__search_web"
```

## 实现思路

MCP（Model Context Protocol）的本质是：**通过 stdio + JSON-RPC 2.0 协议，将外部进程暴露的工具统一纳入 agent 的工具管道。**

agent 不需要知道工具是原生代码还是外部进程——所有工具共享同一个 function-calling 格式、同一个权限管道、同一个执行框架。

| 文件 | 职责 |
|------|------|
| `src/mcp/client.py` | MCP 客户端，stdio 子进程管理 + JSON-RPC 2.0 通信 |
| `src/mcp/router.py` | 工具路由器，管理多个客户端 + `mcp__` 前缀解析与分发 |
| `src/mcp/loader.py` | 插件加载器，扫描 `.claude-plugin/plugin.json` 发现服务器配置 |
| `src/mcp/__init__.py` | 模块导出 |
| `src/tools/registry.py` | `mcp_connect`/`mcp_disconnect`/`mcp_list_servers` 工具 + `handle_mcp_or_native`/`build_tool_pool` |
| `src/loop.py` | 启动时加载插件 + MCP 初始化 + `/mcp`/`/tools` 命令 |
| `src/permission/manager.py` | MCP 工具（`mcp__` 前缀）纳入权限管道 |
| `src/context/system_prompt.py` | 系统提示词增加 MCP 工具说明 |

通信协议：JSON-RPC 2.0 over stdio，每行一个 JSON 对象。

```json
{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "mini-claude-code", "version": "1.0"}}}
{"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}}
{"jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": {"name": "echo", "arguments": {"message": "hello"}}}
```

## 核心问题

### Q1: 什么是 MCP？其调用格式是什么？

MCP（Model Context Protocol）是由 Anthropic 提出的开放协议，允许外部程序通过标准接口向 AI 模型暴露工具、资源等能力。

在本项目中，MCP 通过 **stdio 传输 + JSON-RPC 2.0 协议** 实现。客户端启动一个子进程，通过 stdin/stdout 交换 JSON 消息。

**调用格式：**

```
客户端 → 服务器（请求，带 id）:
  {"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "echo", "arguments": {"message": "hello"}}}

服务器 → 客户端（响应，对应 id）:
  {"jsonrpc": "2.0", "id": 1, "result": {"content": [{"type": "text", "text": "Echo: hello"}]}}

客户端 → 服务器（通知，无 id）:
  {"jsonrpc": "2.0", "method": "notifications/initialized"}
```

**生命周期调用序列：**

| 步骤 | 方法 | 方向 | 说明 |
|------|------|------|------|
| 1 | `initialize` | 客户端→服务器 | 握手，声明协议版本和客户端信息 |
| 2 | 返回 `protocolVersion` + `serverInfo` | 服务器→客户端 | 确认握手 |
| 3 | `notifications/initialized` | 客户端→服务器 | 通知握手完成（无需响应） |
| 4 | `tools/list` | 客户端→服务器 | 获取可用工具列表 |
| 5 | `tools/call` | 客户端→服务器 | 执行具体工具（可多次调用） |
| 6 | `shutdown` + `terminate` | 客户端→服务器 | 断开连接 |

**MCP 工具在 agent 中的命名格式：**

```
mcp__{server_name}__{tool_name}
```

例如：`mcp__my-plugin__search__search_web`（插件 `my-plugin` 的服务器 `search` 中的工具 `search_web`）。

这个前缀格式由 `MCPClient.get_agent_tools()` 生成，同时保留原始元信息（`_mcp_server`、`_mcp_tool`）供路由器使用。

### Q2: Plugin 和 MCP 分别解决什么问题？

**Plugin（插件）解决的是"发现"问题：**

```
用户把 .claude-plugin/plugin.json 放到项目目录
       ↓
agent 启动时自动扫描 → 发现并加载 → 无需手动配置
```

插件清单格式：

```json
{
  "name": "my-plugin",
  "mcpServers": {
    "search": {
      "command": "npx",
      "args": ["-y", "@search/mcp-server"],
      "env": {"API_KEY": "..."}
    }
  }
}
```

`PluginLoader` 扫描 `.claude-plugin/plugin.json`，提取 `mcpServers` 配置，并对服务器名添加插件名前缀（`my-plugin__search`）避免冲突。

**MCP 解决的是"扩展"问题：**

```
agent 原生工具有限（bash/read/write/edit 等）
       ↓
通过 MCP 协议，任何外部进程都可以暴露为 agent 可调用的工具
       ↓
搜索、数据库、API 调用、文件处理 ... 都可以作为 MCP 服务器接入
```

两者关系：

| 维度 | Plugin（插件） | MCP（协议） |
|------|---------------|------------|
| **解决的问题** | 如何发现和加载外部服务器配置 | 如何与外部进程通信并调用工具 |
| **作用阶段** | 启动时（扫描磁盘 → 提取配置） | 运行时（stdio 通信 → 工具调用） |
| **用户可见** | `.claude-plugin/plugin.json` 文件 | 透明的，MCP 工具和原生工具在 LLM 看来没有区别 |
| **类比** | 浏览器扩展市场（发现/安装） | WebAssembly（运行外部代码的协议） |

简单说：**Plugin 是 MCP 服务器的"安装包"，MCP 是服务器与 agent 之间的"通信协议"。**

### Q3: 用户如何添加 MCP？

两种方式：**插件文件（推荐）** 和 **运行时连接**。

**方式一：插件文件（持久化，自动加载）**

在项目根目录创建 `.claude-plugin/plugin.json`：

```json
{
  "name": "my-tools",
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/data"],
      "env": {}
    },
    "database": {
      "command": "python",
      "args": ["db_mcp_server.py"],
      "env": {"DB_URL": "postgresql://localhost/mydb"}
    }
  }
}
```

agent 启动时自动扫描并连接：

```python
# loop.py 启动流程
_plugin_loader = PluginLoader()
found_plugins = _plugin_loader.scan()  # 扫描 .claude-plugin/plugin.json
for server_name, config in _plugin_loader.get_mcp_servers().items():
    mc = MCPClient(server_name, config["command"], config["args"], config.get("env"))
    if mc.connect():
        mc.list_tools()
        _mcp_router.register_client(mc)
```

**方式二：运行时连接（临时，会话级别）**

LLM 可以通过 `mcp_connect` 工具在运行时动态连接：

```
mcp_connect(
    server_name="echo",
    command="python",
    args=["tests/echo_mcp_server.py"]
)
→ "已连接到 MCP 服务器 'echo'，发现 2 个工具。"
```

断开连接：

```
mcp_disconnect(server_name="echo")
→ "已断开 MCP 服务器 'echo'。"
```

查看已连接的服务器：

```
mcp_list_servers()
→ "- echo [已连接]: 2 个工具 (python tests/echo_mcp_server.py)"
```

**对比：**

| 方式 | 持久化 | 加载时机 | 适用场景 |
|------|--------|----------|----------|
| 插件文件 | 是，写入磁盘 | agent 启动时自动 | 常用工具，每次都需要 |
| `mcp_connect` | 否，仅当前会话 | LLM 在推理中决定 | 临时调试，按需连接 |

### Q4: 模型怎么知道有哪些 MCP？怎么调用 MCP？

**模型通过 `build_tool_pool()` 看到所有工具。**

每轮 `turn()` 调用时，`build_tool_pool()` 动态组装完整工具池：

```python
def build_tool_pool():
    all_tools = list(_tools)  # 原生工具
    router = get_mcp_router()
    mcp_tools = router.get_all_tools()  # 所有已连接 MCP 服务器的工具
    native_names = {t["function"]["name"] for t in all_tools}
    for tool in mcp_tools:
        if tool["function"]["name"] not in native_names:  # 原生工具优先
            all_tools.append(tool)
    return all_tools
```

MCP 工具被转换为标准的 OpenAI function-calling 格式，模型看到的和原生工具完全一样：

```json
{
  "type": "function",
  "function": {
    "name": "mcp__echo__search_web",
    "description": "Search the web for information",
    "parameters": {
      "type": "object",
      "properties": {
        "query": {"type": "string"}
      },
      "required": ["query"]
    }
  }
}
```

**调用路由：**

```
LLM 返回 tool_calls: mcp__echo__search_web({query: "..."})
       ↓
handle_mcp_or_native("mcp__echo__search_web", {query: "..."})
       ↓
MCPToolRouter.is_mcp_tool("mcp__echo__search_web") → True
       ↓
解析: "mcp__" + "echo" + "__" + "search_web"
       ↓
MCPClient("echo").call_tool("search_web", {query: "..."})
       ↓
JSON-RPC: {"method": "tools/call", "params": {"name": "search_web", "arguments": {query: "..."}}}
       ↓
子进程执行 → 返回结果文本 → 写入 state.messages
```

**权限控制：**

MCP 工具走和原生工具完全相同的权限管道。在 `permission/manager.py` 中：

```python
# plan 模式：MCP 工具被视为写操作，默认阻止
if self.mode == "plan":
    if tool_name in WRITE_TOOLS or tool_name.startswith("mcp__"):
        return {"behavior": "deny", ...}
```

系统提示词中也说明了 MCP 工具的权限：

```
MCP tools are prefixed with mcp__{server}__{tool} and are routed to
external MCP servers. They share the same permission pipeline as native tools.
```

### Q5: MCP 与 Tool 的区别是什么？

| 维度 | 原生 Tool | MCP 工具 |
|------|----------|----------|
| **实现位置** | agent 进程内（Python 函数） | 外部子进程（任意语言） |
| **通信方式** | 函数调用 | stdio + JSON-RPC 2.0 |
| **工具名** | 直接命名（`bash`、`read_file`） | 带前缀（`mcp__{server}__{tool}`） |
| **注册方式** | 硬编码在 `registry.py` 的 `_tools` 列表 | 运行时通过 `tools/list` 动态发现 |
| **持久化** | 代码的一部分，随版本更新 | 插件文件配置，用户可自定义 |
| **权限管道** | 共享（`READ_ONLY_TOOLS`/`WRITE_TOOLS` 分类） | 共享（`mcp__` 前缀统一处理，plan 模式默认阻止） |
| **执行框架** | 共享（`handle_mcp_or_native` 统一路由） | 共享 |
| **对 LLM 的可见性** | 无区别，都是 function-calling 格式 | 无区别 |

**本质区别：执行边界。**

```
原生 Tool:  LLM → function-calling → Python 函数 → 返回结果
MCP 工具:   LLM → function-calling → JSON-RPC → 子进程 → JSON-RPC → 返回结果
```

但对 LLM 和权限系统来说，两者**完全透明**。`handle_mcp_or_native()` 是唯一的分发点：

```python
def handle_mcp_or_native(tool_name, tool_input):
    router = get_mcp_router()
    if router.is_mcp_tool(tool_name):      # mcp__ 前缀 → 外部子进程
        return router.call(tool_name, tool_input)
    fn = handlers.get(tool_name)           # 原生工具 → Python 函数
    return fn(**tool_input) if fn else f"Unknown tool: {tool_name}"
```

**原生工具优先：** `build_tool_pool()` 中，如果 MCP 工具的名称与原生工具冲突，MCP 工具被跳过。这确保本地核心行为（如 `bash`、`read_file`）始终可预测，不会被外部进程覆盖。

**MCP 工具不能被 Teammate 使用。** 所有 MCP 管理工具（`mcp_connect`、`mcp_disconnect`）被排除在 Teammate 工具集之外，防止权限扩散。
