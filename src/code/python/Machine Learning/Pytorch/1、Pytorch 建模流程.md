# 1、Pytorch 建模流程

## Pytorch 下载

创建新环境并下载 Pytorch

- 打开 Anaconda Prompt

- 使用指令 `conda create -n evn_name python=3.6 ` 创建环境

- 使用指令 `conda activate evn_name` 切换环境

- 通过 `pip list` 查看环境的所有包

- 查看 Pytoch 安装指令 https://pytorch.org/

  ```bash
  conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia
  ```

在新环境下下载 Jupyter

## Torchvision 模块

[torchvision](https://pytorch.org/vision/stable/index.html) 模块

- datasets 模块封装了常用的数据集
- models 模块封装了经典网络的模块
- transforms 模块封装了图像的预处理操作

## Pytorch 建模流程

1. 准备数据

2. 定义模型

3. 训练模型

4. 评估模型

5. 使用模型

6. 保存模型

### 1.1、结构化数据建模流程

- 准备数据、数据预处理

  结构化数据一般会使用 Pandas 中的 **DataFrame** 进行预处理

  - 使用 pandas 的函数对字符串的列做 **独热编码**
  - 对数值较大的列做 **标准化**

- 定义模型

  定义模型时：

  - **列数** 为输入的 **特征** 个数 x
  - 将输入 **特征数 a** 转换为 **b 个隐层的特征** 通常 **乘以一个矩阵 w~1~** 并添加一个 **大小为 b*1 偏置 b~1~** ，再加入一层激活函数

  对于 **回归任务**，输出为一个值，同样 **w~n~，b~n~ 的大小为 c*1，1\*1**

  对于 **w** 和 **b** 都是需要梯度的（**requires_grad = True**）

- 训练模型

- 评估模型

  首先评估一下模型在训练集和验证集上的效果

- 使用模型

- 保存模型

### 1.2、图片数据建模流程

Pytorch 中构建图片数据管道通常有两种方法

- 使用 torchvision 中的 datasets.ImageFolder 来读取图片然后用 DataLoader 来并行加载
- 通过继承 torch.utils.data.Dataset 实现用户自定义读取逻辑然后用 DataLoader 来并行加载
  - 该方法是读取用户自定义数据集的通用方法，既可以读取图片数据集，也可以读取文本数据集

### 1.3、文本数据建模流程

文本数据预处理较为繁琐，包括文本切词，构建词典，编码转换，序列填充，构建数据管道等等。

### 1.4、时间序列数据模型构建

通过继承 torch.utils.data.Dataset 实现自定义时间序列数据集。

torch.utils.data.Dataset 是一个抽象类，用户想要加载自定义的数据只需要继承这个类，并且覆写其中的两个方法即可：

- `__len__`: 实现 len(dataset) 返回整个数据集的大小。
- `__getitem__`: 用来获取一些索引的数据，使 `dataset[i]` 返回数据集中第i个样本。

不覆写这两个方法会直接返回错误。