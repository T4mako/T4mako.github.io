---
title: vllm 模型部署压测
date: 2026-06-27
category:
  - AI Infra
  - AI Agent
tag:
  - LLM
  - vLLM
---

## 核心思路

问题：业务主要为短输出的任务下，模型峰值 QPS 多少？如何优化？如何避免 KV Cache 浪费？

测试方式：分别设置 `[2,4,8,16,32,64,128,256]` 个 Worker（并发请求），输出在 50 token 左右，不使用思考模式，请求持续 30s，计算 QPS、TTFT 首字延迟、总时延

默认参数下测试，`--max-num-seqs 16`：

```log
并发 2 × 30s（短输出：max_tokens=50）
  成功 96 失败 0 | 实际 QPS 3.2 | 平均输出 12 chunks
  TTFT       P50/P99：156 / 199 ms
  总时延     P50/P99：741 / 1247 ms

并发 4 × 30s（短输出：max_tokens=50）
  成功 172 失败 0 | 实际 QPS 5.6 | 平均输出 11 chunks
  TTFT       P50/P99：162 / 230 ms
  总时延     P50/P99：796 / 1377 ms

并发 8 × 30s（短输出：max_tokens=50）
  成功 274 失败 0 | 实际 QPS 8.9 | 平均输出 13 chunks
  TTFT       P50/P99：201 / 235 ms
  总时延     P50/P99：1016 / 1591 ms

并发 16 × 30s（短输出：max_tokens=50）
  成功 466 失败 0 | 实际 QPS 15.1 | 平均输出 12 chunks
  TTFT       P50/P99：221 / 262 ms
  总时延     P50/P99：1194 / 1913 ms

并发 32 × 30s（短输出：max_tokens=50）
  成功 504 失败 0 | 实际 QPS 15.9 | 平均输出 12 chunks
  TTFT       P50/P99：1148 / 1511 ms
  总时延     P50/P99：2076 / 3081 ms

并发 64 × 30s（短输出：max_tokens=50）
  成功 536 失败 0 | 实际 QPS 15.8 | 平均输出 12 chunks
  TTFT       P50/P99：3160 / 3699 ms
  总时延     P50/P99：4045 / 5079 ms

并发 128 × 30s（短输出：max_tokens=50）
  成功 612 失败 0 | 实际 QPS 16.2 | 平均输出 12 chunks
  TTFT       P50/P99：6867 / 7718 ms
  总时延     P50/P99：7595 / 8927 ms

发 2 × 30s（短输出：max_tokens=50）
  成功 96 失败 0 | 实际 QPS 3.2 | 平均输出 12 chunks
  TTFT       P50/P99：156 / 199 ms
  总时延     P50/P99：741 / 1247 ms

并发 4 × 30s（短输出：max_tokens=50）
  成功 172 失败 0 | 实际 QPS 5.6 | 平均输出 11 chunks
  TTFT       P50/P99：162 / 230 ms
  总时延     P50/P99：796 / 1377 ms

并发 8 × 30s（短输出：max_tokens=50）
  成功 274 失败 0 | 实际 QPS 8.9 | 平均输出 13 chunks
  TTFT       P50/P99：201 / 235 ms
  总时延     P50/P99：1016 / 1591 ms

并发 16 × 30s（短输出：max_tokens=50）
  成功 466 失败 0 | 实际 QPS 15.1 | 平均输出 12 chunks
  TTFT       P50/P99：221 / 262 ms
  总时延     P50/P99：1194 / 1913 ms

并发 32 × 30s（短输出：max_tokens=50）
  成功 504 失败 0 | 实际 QPS 15.9 | 平均输出 12 chunks
  TTFT       P50/P99：1148 / 1511 ms
  总时延     P50/P99：2076 / 3081 ms

并发 64 × 30s（短输出：max_tokens=50）
  成功 536 失败 0 | 实际 QPS 15.8 | 平均输出 12 chunks
  TTFT       P50/P99：3160 / 3699 ms
  总时延     P50/P99：4045 / 5079 ms

并发 128 × 30s（短输出：max_tokens=50）
  成功 612 失败 0 | 实际 QPS 16.2 | 平均输出 12 chunks
  TTFT       P50/P99：6867 / 7718 ms
  总时延     P50/P99：7595 / 8927 ms
```

QPS 峰值 16，此时的 vllm 日志：

```log
Running: 16 reqs, Waiting: 13 reqs, GPU KV cache usage: 27.5%, Prefix cache hit rate: 0.0%, MM cache hit rate: 92.0%
```

KV Cache 没有用满，最大请求 16

调整参数：`--max-num-seqs 64`

输出日志：

```log
并发 2 × 30s（短输出：max_tokens=50）
  成功 55 失败 0 | 实际 QPS 1.8 | 平均输出 14 chunks
  TTFT       P50/P99：156 / 2124 ms
  总时延     P50/P99：825 / 11285 ms

并发 4 × 30s（短输出：max_tokens=50）
  成功 161 失败 0 | 实际 QPS 5.2 | 平均输出 13 chunks
  TTFT       P50/P99：162 / 230 ms
  总时延     P50/P99：837 / 1341 ms

并发 8 × 30s（短输出：max_tokens=50）
  成功 286 失败 0 | 实际 QPS 9.2 | 平均输出 12 chunks
  TTFT       P50/P99：201 / 234 ms
  总时延     P50/P99：1014 / 1594 ms

并发 16 × 30s（短输出：max_tokens=50）
  成功 461 失败 0 | 实际 QPS 14.7 | 平均输出 12 chunks
  TTFT       P50/P99：219 / 370 ms
  总时延     P50/P99：1222 / 2003 ms

并发 32 × 30s（短输出：max_tokens=50）
  成功 803 失败 0 | 实际 QPS 25.7 | 平均输出 12 chunks
  TTFT       P50/P99：266 / 323 ms
  总时延     P50/P99：1417 / 2298 ms

并发 64 × 30s（短输出：max_tokens=50）
  成功 958 失败 0 | 实际 QPS 29.8 | 平均输出 12 chunks
  TTFT       P50/P99：547 / 952 ms
  总时延     P50/P99：2336 / 3764 ms

并发 128 × 30s（短输出：max_tokens=50）
  成功 1041 失败 0 | 实际 QPS 30.3 | 平均输出 12 chunks
  TTFT       P50/P99：2687 / 3304 ms
  总时延     P50/P99：4199 / 6016 ms

并发 256 × 30s（短输出：max_tokens=50）
  成功 1125 失败 0 | 实际 QPS 29.5 | 平均输出 12 chunks
  TTFT       P50/P99：6965 / 7633 ms
  总时延     P50/P99：8308 / 10286 ms
```

峰值 QPS 在 30 左右，但首字延迟暴涨，此时的 vllm 日志：

```log
 Avg prompt throughput: 475.5 tokens/s, Avg generation throughput: 1023.8 tokens/s, Running: 50 reqs, Waiting: 197 reqs, GPU KV cache usage: 91.2%, Prefix cache hit rate: 0.0%
```

KV Cache 几乎打满，提升 QPS 的情况下，用户体验还算可以（32/64 并行度）




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

模型使用：Qwen3.6-27B

```bash
export CUDA_VISIBLE_DEVICES=2,3

nohup ./.venv/bin/python -m vllm.entrypoints.cli.main serve \
  /data1/modelscope_models/Qwen/Qwen3___6-27B \
  --served-model-name Qwen3.6-27B \
  --host 0.0.0.0 \
  --port 8000 \
  --api-key "$VLLM_API_KEY" \
  --tensor-parallel-size 2 \
  --dtype float16 \
  --max-model-len 262144 \
  --max-num-seqs 32 \
  --gpu-memory-utilization 0.92 \
  --speculative-config '{"method":"mtp","num_speculative_tokens":4}' \
  --enable-prefix-caching \
  --enable-chunked-prefill \
  --max-num-batched-tokens 32768 \
  --enable-auto-tool-choice \
  --tool-call-parser qwen3_coder \
  --reasoning-parser qwen3 \
  --override-generation-config '{"temperature":0.6,"top_p":0.95,"top_k":20,"min_p":0.0,"presence_penalty":0.0,"repetition_penalty":1.0}' \
  --default-chat-template-kwargs '{"enable_thinking": false}' \
  > ./logs/vllm.log 2>&1 &
```


