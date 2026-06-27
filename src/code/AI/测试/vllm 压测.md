##  测试指标

### 性能指标

| 指标 | 全称 | 含义 |
|------|------|------|
| **QPS** | Queries Per Second | 每秒完成的请求数，衡量整体吞吐能力 |
| **TTFT P99** | Time To First Token | 从请求发出到收到第一个 token 的时间（P99），反映用户等待感，主要受 Prefill 影响 |
| **E2E P99** | End-to-End Latency | 从请求发出到最后一个 token 的总耗时（P99），= TTFT + Decode 时间 |
| **TPOT** | Time Per Output Token | 每个输出 token 的平均生成时间，等价于"字往外蹦的速度" |
| **Prompt Throughput** | — | 每秒处理的 prompt token 数，反映 Prefill 能力 |
| **Generation Throughput** | — | 每秒生成的 output token 数，反映 Decode 能力 |

---

### vLLM 日志字段


| 字段 | 含义 | 关注点 |
|------|------|--------|
| Avg prompt throughput | Prefill 每秒处理的 prompt token 数 | 越高越好 |
| Avg generation throughput | Decode 每秒生成的 token 数 | 并发越高，单请求越慢 |
| Running reqs | 正在执行的请求数 | 当前并发数 |
| Waiting reqs | 等待调度的请求数 | > 0 说明 GPU 满载，请求在排队 |
| GPU KV cache usage | KV 缓存显存占用比例 | 接近 100% 时新请求会排队/拒绝 |
| Prefix cache hit rate | 前缀缓存命中率 | 共享 system prompt 时应较高，命中可跳过重复 Prefill |
| MM cache hit rate | 多模态缓存命中率 | 仅多模态场景有意义 |



> Speculative Decoding 日志
> 投机解码：小模型快速生成候选 token → 大模型一次性验证 → 通过则采纳，省去逐 token 解码。

| 字段 | 含义 | 关注点 |
|------|------|--------|
| Mean acceptance length | 每轮平均被接受的 token 数 | 越接近草稿长度越好 |
| Accepted throughput | 最终有效的 token 吞吐 | 与无投机时对比，判断是否真正加速 |
| Drafted throughput | 草稿模型的原始生成速率 | 接受率低时就是浪费算力 |
| Per-position acceptance rate | 每个位置的接受概率 | 越靠后越低是正常的（误差累积） |
| Avg Draft acceptance rate | 总体接受率 | 80%+ 较好；< 50% 说明投机收益有限 |

## vllm 部署脚本

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

# ── 配置 ──
MODEL_DIR="${1:-/data1/modelscope_models/Qwen/Qwen3___6-27B}"
MODEL_NAME="Qwen3.6-27B"
HOST="${HOST:-0.0.0.0}"
PORT="${PORT:-8000}"
VLLM_API_KEY="${VLLM_API_KEY:?请设置 VLLM_API_KEY 环境变量}"
CUDA_VISIBLE_DEVICES="${CUDA_VISIBLE_DEVICES:-2,3}"
LOG_DIR="${LOG_DIR:-./logs}"
PID_FILE="${LOG_DIR}/vllm_${MODEL_NAME}.pid"

export CUDA_VISIBLE_DEVICES
mkdir -p "$LOG_DIR"

# ── 防重复启动 ──
if [[ -f "$PID_FILE" ]]; then
  pid="$(<"$PID_FILE")"
  if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
    echo "Error: 已在运行 (PID $pid)"; exit 1
  fi
  rm -f "$PID_FILE"
fi

# ── 启动 vLLM ──
nohup ./.venv/bin/python -m vllm.entrypoints.cli.main serve "$MODEL_DIR" \
  --host "$HOST" \
  --port "$PORT" \
  --served-model-name "$MODEL_NAME" \
  --api-key "$VLLM_API_KEY" \
  --speculative-config '{"method":"mtp","num_speculative_tokens":4}' \
  --tensor-parallel-size 2 \
  --dtype float16 \
  --max-model-len 262144 \
  --max-num-seqs 24 \
  --gpu-memory-utilization 0.92 \
  --enable-prefix-caching \
  --enable-chunked-prefill \
  --max-num-batched-tokens 32768 \
  --enable-auto-tool-choice \
  --tool-call-parser qwen3_coder \
  --reasoning-parser qwen3 \
  --override-generation-config '{"temperature":0.6,"top_p":0.95,"top_k":20,"min_p":0.0,"presence_penalty":0.0,"repetition_penalty":1.0}' \
  --default-chat-template-kwargs '{"enable_thinking": false}' \
  > "${LOG_DIR}/vllm_${MODEL_NAME}.log" 2>&1 &

echo "$!" > "$PID_FILE"
echo "[$(date '+%F %T')] vLLM started, PID=$!, log=${LOG_DIR}/vllm_${MODEL_NAME}.log"
```
