# BPE

常见的英文分词分为：

- 词级分词
    - 将文本按词语进行切
    - 容易出现 OOV（Out Of Vocabulary，未登录词）问题
- 字符级分词
    - 以单个字符为最小单位进行分词的方法
    - 不存在 OOV（Out-of-Vocabulary）问题
    - 单个字符本身语义信息极弱，模型必须依赖更长的上下文来推断词义和结构，这显著增加了建模难度和训练成本
- 子词级分词
    - 介于词级分词与字符级分词之间
    - 将词语切分为更小的单元——子词（subword），例如词根、前缀、后缀或常见词片段
    - 显著缓解OOV问题，更好地保留一定的语义结构

常见的子词分词算法包括 **BPE**（Byte Pair Encoding）、WordPiece 和 Unigram Language Model

BPE 是最早被广泛应用的子词分词方法。

其基本思想是，在训练阶段，首先将语料中的词汇拆分为 **单个字符**，构建初始词表；然后迭代地统计语料中出现 **频率最高** 的 **相邻字符对**，将其合并为新的子词单元，并加入词表。这个过程持续进行，直到词表大小达到预设上限。

子词级分词已经成为现代英文 NLP 模型中的主流方法，如 BERT、GPT等模型均采用了基于子词的分词机制。

一个优秀教程：[https://hf-mirror.com/learn/llm-course/chapter6/5?fw=pt](https://hf-mirror.com/learn/llm-course/chapter6/5?fw=pt)

补充：

在实际的大模型（LLM）预训练中，BPE 的循环次数（即 **Merge Operations** 的数量）并不是由算法自动停止的，而是由开发者**预设的一个超参数**

通常情况下，判断依据主要平衡两个指标：**词表大小（Vocabulary Size）** 和 **序列压缩率（Compression Ratio）**