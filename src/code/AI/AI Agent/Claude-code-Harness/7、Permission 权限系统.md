# Permission 权限系统

> 对应提交: `d689aab` - 添加 Permission 命令验证以及 default / plan / auto 三种模式的权限规则引擎

## 整体交互流程

```
模型请求调用工具
    ↓
Step 0: Bash 安全校验 (仅 bash 工具) → 严重风险直接拒绝, 非严重转为询问
    ↓
Step 1: 拒绝规则 (deny_rules, 不可绕过) → 命中即拒绝
    ↓
Step 2: 模式决策 (plan 阻写放读, auto 自动批准)
    ↓
Step 3: 允许规则 (用户通过 always 动态添加) → 命中即放行
    ↓
Step 4: 询问用户 (y/n/always) → 用户决定
    ↓
执行工具 / 返回拒绝信息 → 结果写回消息历史
```

## 实现思路

权限系统取代了 `sandbox.py` 中简单的 `check_command()` 黑名单，提供了一个**可配置、分模式、带用户交互**的权限决策管道。

模块划分：

| 文件 | 职责 |
|------|------|
| `permission/manager.py` | 决策管道编排 + 用户交互 + 连续拒绝计数 |
| `permission/validator.py` | Bash 命令正则校验 (5 种模式, 分严重/非严重) |
| `permission/rules.py` | 规则匹配引擎 (fnmatch 通配) + 默认规则集 |

`loop.py` 在工具执行前调用 `PERMS.check(tool_name, args)`，根据返回的 `behavior` (allow/deny/ask) 决定后续动作。

## 核心问题

### Q1: 为什么需要 Permission？

上一版的 `sandbox.py` 只有两道静态防线：路径 `resolve` 校验和关键词黑名单 (`_DANGEROUS = ["rm -rf /", "sudo", ...]`)。问题在于：

- **黑名单可绕过**：`rm -rf ~/`、`shred`、`mkfs` 不在黑名单中但同样危险
- **无分级处理**：所有危险命令一视同仁地拒绝，没有"询问用户"的中间态
- **不可配置**：用户无法根据场景调整策略（如只读模式、自动批准模式）
- **无规则系统**：无法表达"允许读 `src/` 下文件但拒绝读 `*.env`"这样的细粒度策略

Permission 系统解决了这些问题：用正则校验替代字符串匹配，用管道式决策替代单一拒绝，用三种模式适配不同使用场景，用 `always` 机制让用户动态积累信任规则。

### Q2: 权限检查管道的执行流程？

`PermissionManager.check()` 是一个 **5 步管道**，每步都可能提前返回决策：

```
Step 0: Bash 安全校验 (validator.py)
  ├─ 命令安全 → 继续下一步
  ├─ 严重风险 (sudo/rm_rf) → deny
  └─ 非严重风险 (shell_metachar/cmd_substitution/ifs) → ask

Step 1: 拒绝规则 (rules.py, behavior=deny)
  └─ 命中 → deny (不可绕过, 任何模式都生效)

Step 2: 模式决策
  ├─ plan 模式 → 写操作 deny, 读操作 allow
  ├─ auto 模式 → allow (危险命令已在 Step 0 处理)
  └─ default 模式 → 继续下一步

Step 3: 允许规则 (rules.py, behavior=allow)
  └─ 命中 → allow (用户通过 always 添加的规则)

Step 4: 兜底 → ask (弹出用户确认)
```

**关键设计：** deny 规则优先级最高（Step 1），即使在 auto 模式下也能拦截。这防止了用户在追求便利时意外解除安全防护。

### Q3: 三种模式（default/plan/auto）的区别？

| 维度 | default | plan | auto |
|------|---------|------|------|
| 定位 | 平衡模式，逐次确认 | 只读探索，禁止写入 | 全自动执行 |
| 读操作 | 默认允许（默认规则） | 自动允许 | 自动允许 |
| 写操作 | 询问用户 | **直接拒绝** | 自动允许 |
| bash 命令 | 安全命令直接执行，危险命令询问 | 同 default（bash 属于写操作被拒绝） | Step 0/1 拦截后其余放行 |
| deny 规则 | 生效 | 生效 | 生效 |
| 适用场景 | 日常开发 | 代码探索、理解项目结构 | 信任的自动化任务 |

模式切换方式：

```
启动时: Mode [default]: auto
运行时: /mode plan
查看规则: /rules
```

### Q4: 用户如何通过 /mode 和 /rules 命令控制权限？

`/mode` 和 `/rules` 是 `loop.py` 中解析的斜杠命令，不进入模型推理：

**`/mode <模式名>`** — 运行时切换权限模式：

```python
if query.startswith("/mode"):
    parts = query.split()
    if len(parts) == 2 and parts[1] in MODES:
        PERMS.mode = parts[1]
```

**`/rules`** — 列出当前所有规则（含用户通过 `always` 动态添加的）：

```python
if query.strip() == "/rules":
    for i, rule in enumerate(PERMS.rules):
        print(f"  {i}: {rule}")
```

**`always` 机制** — 用户在审批时输入 `always`，该工具被永久加入允许规则：

```python
# ask_user() 中
if answer == "always":
    self.rules.append({"tool": tool_name, "path": "*", "behavior": "allow"})
```

**连续拒绝熔断** — 用户连续拒绝 3 次后，系统提示考虑切换模式：

```
[3 consecutive denials — consider switching to /mode plan]
```

这减少了反复审批的摩擦，引导用户选择更合适的模式。
