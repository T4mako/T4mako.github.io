# Normalization

Normalization（norm / 归一化 / 标准化），其核心作用是把不同来源、不同尺度、分布杂乱的数据，强行拉回到同一个标准的参考系下

理解这一点的关键在于理解 **数据维度的物理意义** 以及 **不同领域数据的统计特性**

假设我们有一个特征张量，形状为  $(N, C, H, W)$，其中 $N$ 是 Batch Size，$C$ 是通道数，$H, W$ 是空间维度

- Batch Normalization (BN)
    - 在  $(N, H, W)$  维度上计算均值和方差。即：对于每一个通道 **$C$**，计算该通道在整个 Batch 中所有像素的统计量
    - 把所有图片的同一个通道（比如红色通道，或第 5 个卷积核的特征图）拿出来一起归一化
- Layer Normalization (LN)
    - 在 $(C, H, W)$ 维度上计算均值和方差。即：对于每一个样本 **$N$**，计算它自身所有通道和像素的统计量
    - 只看单张图片（或单个句子），不看别人
- Instance Normalization (IN)
    - 在 $(H, W)$ 维度上计算。即：对于每一个样本的每一个通道独立计算
    - 常用于风格迁移（Style Transfer）和生成模型（GANs）。因为风格通常体现在单个样本的对比度统计上，不应该被Batch平均掉
- Group Normalization (GN)
    - 介于 LN 和 IN 之间。将通道 $C$ 分成 $G$ 组，在组内进行计算
    - 解决 Batch Size 过小时 BN 失效的问题

## Batch Norm 与 Layer Norm 的区别

| **特性** | **Batch Normalization (BN)** | **Layer Normalization (LN)** |
| --- | --- | --- |
| **计算依赖** | **依赖 Batch 中的其他样本** | **独立**，只依赖当前样本自身 |
| **训练 vs 推理** | **不一致**。训练时用当前Batch的均值/方差；推理时用移动平均（Running Mean/Var）记录的全局统计量。 | **一致**。训练和推理都使用当前样本的实时统计量。 |
| **受Batch Size影响** | **大**。Batch 太小会导致统计估算不准，模型无法收敛；Batch 太大会导致显存溢出。 | **无**。Batch Size为 1 也能正常工作。 |
| **适用数据** | 固定长度、特征分布稳定的数据（如图像）。 | 变长序列、RNN/Transformer（如文本）。 |