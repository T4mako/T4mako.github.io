# Attention

参考文章：https://wdndev.github.io/llm_interview_note/#/02.%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B%E6%9E%B6%E6%9E%84/1.attention/1.attention?id=_1attention

# Self-Attention

假设输入向量 X ，`X.shape = (batch, seq_len, hidden_dim)`

- $Q = X \cdot W_q^T + b$
- $K = X \cdot W_k^T + b$
- $V = X \cdot W_v^T + b$

$Attention(Q,K,V) = softmax(\frac{QK^T}{\sqrt{d_k}})V$

```python
class SelfAttention(nn.Module):
  def __init__(self, hidden_size):
    super().__init__()
    self.hidden_size = hidden_size
    self.w_q = nn.Linear(hidden_size, hidden_size)
    self.w_k = nn.Linear(hidden_size, hidden_size)
    self.w_v = nn.Linear(hidden_size, hidden_size)

  def forward(self, X):
    # X shape is: (batch, seq_len, hidden_dim)
    Q = self.w_q(X) # (batch, seq_len, hidden_dim)
    K = self.w_k(X) # (batch, seq_len, hidden_dim)
    V = self.w_v(X) # (batch, seq_len, hidden_dim)

    # Attn
    # Q @ K.T
    # 其中 K 需要改成 shape 为： (batch, hidden_dim, seq_len)
    attention_value = torch.matmul(Q, K.transpose(-1, -2)) # (batch, seq_len, seq_len)
    attention_weight = torch.softmax(
      attention_value / math.sqrt(self.hidden_size),
      dim=-1
    ) 
    output = torch.matmul(attention_weight, V) # (batch, seq_len, hidden_dim)
    return output

X = torch.rand(3, 2, 4)
net = SelfAttention(4)
net(X)
```

- Q，K，V 代表什么？
    - **计算查询（Query）**：查询是当前时间步的输入，用于和序列中 **其他位置** 的信息进行比较
    - **计算键（Key）**：键表示序列中其他位置的信息
    - **计算值（Value）**：值是 Key 对应位置的表示
    - **注意力分数/权重**：权重 $softmax(\frac{QK^T}{\sqrt{d_k}}) \in (0,1)$ 表示了在当前时间步，模型应该关注序列中其他位置的重要程度
- Attention 和 传统 Seq2Seq 的区别是什么？
    - 传统的 Seq2Seq 模型只使用 **编码器** 来捕捉输入序列的信息，而解码器只从编码器的 **最后状态** 中获取信息，并将其用于生成输出序列
    - Attention 机制则允许解码器在生成每个输出时，根据输入序列的不同部分给予不同的注意力，从而使得模型更好地关注到输入序列中的重要信息
- 除以 $\sqrt{d_k}$ 的作用是什么？
    - **使 $QK^T$ 方差归一化**
    - 稳定梯度，避免 Softmax 输入值过大导致梯度消失
    - **数值稳定性**，防止点积结果爆炸
    - **保留区分度**，缩放后的点积范围适中，Softmax输出更平滑，保留更多信息

# **Multi-head attention**

```python
class MultiHeadAttention(nn.Module):
  def __init__(self, hidden_size, num_heads):
    super().__init__() 
    self.hidden_size = hidden_size
    self.num_heads = num_heads
    self.head_dim = hidden_size // num_heads
    self.w_q = nn.Linear(hidden_size, hidden_size)
    self.w_k = nn.Linear(hidden_size, hidden_size)
    self.w_v = nn.Linear(hidden_size, hidden_size)
    self.w_o = nn.Linear(hidden_size, hidden_size)

  def forward(self, X):
    # X shape is: (batch, seq_len, hidden_dim)
    Q = self.w_q(X) # (batch, seq_len, hidden_dim)
    K = self.w_k(X) # (batch, seq_len, hidden_dim)
    V = self.w_v(X) # (batch, seq_len, hidden_dim)

    # Split Q, K, V into num_heads
    Q = Q.view(
      Q.shape[0], Q.shape[1], self.num_heads, self.head_dim
    ) # (batch, seq_len, num_heads, head_dim)
    K = K.view(
      K.shape[0], K.shape[1], self.num_heads, self.head_dim
    ) # (batch, seq_len, num_heads, head_dim)
    V = V.view(
      V.shape[0], V.shape[1], self.num_heads, self.head_dim
    ) # (batch, seq_len, num_heads, head_dim)

    # Attn
    # Q @ K.T
    # 其中 K 需要改成 shape 为： (batch, num_heads, hidden_dim, seq_len)
    attention_value = torch.matmul(Q, K.transpose(-1, -2)) # (batch, num_heads, seq_len, seq_len)
    attention_weight = torch.softmax(
      attention_value / math.sqrt(self.head_dim),
      dim=-1
    ) 
    output = torch.matmul(attention_weight, V) # (batch, num_heads, seq_len, head_dim)
    # 合并 num_heads
    output = output.view(
      output.shape[0], output.shape[1], self.hidden_size
    ) # (batch, seq_len, hidden_dim)
    output = self.w_o(output) # (batch, seq_len, hidden_dim)
    return output

```