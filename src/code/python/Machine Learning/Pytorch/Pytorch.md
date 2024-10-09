## 1、安装 Pytoch

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

## 2、简单回归问题

- 梯度下降 Gradient Descent
- 线性回归
- 逻辑回归

### 手写数字识别案例

```py
import torch
from torch import nn
from torch.nn import functional as F
from torch import optim

import torchvision
from matplotlib import pyplot as plt

from utils import plot_image,plot_curve,one_hot


batch_size = 512

# step1. 加载数据
train_loader = torch.utils.data.DataLoader(
    torchvision.datasets.MNIST('mnist_data', train=True, download=True,
                               transform=torchvision.transforms.Compose([
                                   torchvision.transforms.ToTensor(),
                                   torchvision.transforms.Normalize(
                                       (0.1307,), (0.3081,))
                               ])),
    batch_size=batch_size, shuffle=True)

test_loader = torch.utils.data.DataLoader(
    torchvision.datasets.MNIST('mnist_data/', train=False, download=True,
                               transform=torchvision.transforms.Compose([
                                   torchvision.transforms.ToTensor(),
                                   torchvision.transforms.Normalize(
                                       (0.1307,), (0.3081,))
                               ])),
    batch_size=batch_size, shuffle=False)

x, y = next(iter(train_loader))
print(x.shape, y.shape, x.min(), x.max())
plot_image(x, y, 'image sample')

class Net(nn.Module):

    def __init__(self):
        super(Net, self).__init__()

        # xw+b
        self.fc1 = nn.Linear(28*28, 256)
        self.fc2 = nn.Linear(256, 64)
        self.fc3 = nn.Linear(64, 10)

    def forward(self, x):
        # x: [b, 1, 28, 28]
        # h1 = relu(xw1+b1)
        x = F.relu(self.fc1(x))
        # h2 = relu(h1w2+b2)
        x = F.relu(self.fc2(x))
        # h3 = h2w3+b3
        x = self.fc3(x)

        return x



net = Net()
# [w1, b1, w2, b2, w3, b3]
optimizer = optim.SGD(net.parameters(), lr=0.01, momentum=0.9)


train_loss = []

for epoch in range(3):

    for batch_idx, (x, y) in enumerate(train_loader):

        # x: [b, 1, 28, 28], y: [512]
        # [b, 1, 28, 28] => [b, 784]
        x = x.view(x.size(0), 28*28)
        # => [b, 10]
        out = net(x)
        # [b, 10]
        y_onehot = one_hot(y)
        # loss = mse(out, y_onehot)
        loss = F.mse_loss(out, y_onehot)

        optimizer.zero_grad()
        loss.backward()
        # w' = w - lr*grad
        optimizer.step()

        train_loss.append(loss.item())

        if batch_idx % 10==0:
            print(epoch, batch_idx, loss.item())

plot_curve(train_loss)

total_correct = 0
for x,y in test_loader:
    x  = x.view(x.size(0), 28*28)
    out = net(x)
    # out: [b, 10] => pred: [b]
    pred = out.argmax(dim=1)
    correct = pred.eq(y).sum().float().item()
    total_correct += correct

total_num = len(test_loader.dataset)
acc = total_correct / total_num
print('test acc:', acc)

x, y = next(iter(test_loader))
out = net(x.view(x.size(0), 28*28))
pred = out.argmax(dim=1)
plot_image(x, pred, 'test')
```

## 3、张量

### 数据类型

在 python 中有数据类型 int、float......，在 PyTorch 中对应 IntTensor，FloatTensor，同时该数据类型有维度，如 int 标量 3 的维度是 0，矩阵的维度是 2 

注：PyTorch 没有对应 python 中 string 类型的数据类型，解决方案有：one-hot  [0,1,0...]、Embedding（Word2vec，glove）

数据类型

| 数据类型      | dtype                             | CPU Tensor         | GPU Tensor              |
| ------------- | --------------------------------- | ------------------ | ----------------------- |
| 32bit float   | `torch.float` or `torch.float32`  | torch.FloatTensor  | torch.cuda.FloatTensor  |
| 64bit float   | `torch.double` or `torch.float64` | torch.DoubleTensor | torch.cuda.DoubleTensor |
| 8bit integer  | `torch.uint8`                     | torch.ByteTensor   | torch.cuda.ByteTensor   |
| 32bit integer | `torch.int32` or `torch.int`      | torch.IntTensor    | torch.cuda.IntTensor    |
| 64bit integer | `torch.int64` or `torch.long`     | torch.LongTensor   | torch.cuda.LongTensor   |

- Dimension（维度）为 0 的一般称为 `标量`
- Dimension（维度）为 1 的一般称为 `张量`（数学中成为向量）

### 常用方法

| 方法                                                         | 含义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `a.type()`                                                   | 获取 tensor 的类型                                           |
| `isinstance(a,torch.FloatTensor)`                            | 合法化检验，判断 tensor 是否是某个类型的 tensor，cpu tensor 和 cuda tensor 返回结果不同 |
| `torch.from_numpy(a)`                                        | 使用 numpy 创建 tensor                                       |
| `torch.tensor(value)`                                        | 创建 tensor，参数中接收的是数据的内容                        |
| `torch.FloatTensor(nums/shape/value)`  <br />`torch.IntTensor(nums/shape/value)`  <br />`torch.Tensor(nums/shape/value)`... | 参数接收个数， shape 或 value 创建 tensor  <br />`torch.FloatTensor(2),torch.FloatTensor(2,3),torch.FloatTensor([2.,8.3])` |
| `torch.empty(shape)`                                         | 创建未初始化 tensor                                          |
| `torch.set_default_tensor_type(torch.DoubleTensor)`          | 设置 pytorch 默认 tensor 类型，使用 torch.Tensor() 方法默认创建默认类型 tensor |
| `a = a.cuda()`                                               | 返回一个 gpu 上的引用                                        |
| `a.dim()`                                                    | 返回 tensor 的维度（size 的长度）                            |
| `a.shape`                                                    | 返回 tensor 的 size（不同维度长度的数组）                    |
| `torch.rand(shape)`                                          | 参数接收 size 数组，产生 [0,1] 均匀分布随机值的 tensor       |
| `torch.rand_like(a)`                                         | 创建与 tensor a shape 相同的随机 tensor                      |
| `torch.randint(min,max,shape)`                               | 创建值左闭右开的随机 tensor                                  |
| `torch.randn(shape)`                                         | 参数接收 size 数组，产生 [0,1] 正态分布随机值的 tensor       |
| `torch.randperm(num)`                                        | 生成 0 - num 左闭右开的位置随机的 tensor                     |
| `torch.ones(shape)`                                          | 生成全是 1 的 tensor                                         |
| `torch.zeros(shape)`                                         | 生成全是 0 的 tensor                                         |
| `torch.eye(shape)`                                           | 对角是 1 的 tensor                                           |
| `torch.full(shape,value)`                                    | 生成值都一样的 tensor                                        |
| `torch.arange(min,max,step)`                                 | 生成值为等差数列的 tensor                                    |
| `torch.linspace(min,max,steps=nums)`                         | 生成 nums 个等差值的 tensor                                  |
| `a.size(i)`                                                  | 返回 size 数组索引为 i 的值                                  |
| `a.shape[i]`                                                 | 返回 size 数组索引为 i 的值，也可以直接使用 `a.shape` 获取 size 对象，可以直接使用 `list(a.shape)` 将 size 转换为 list |
| `a.numel()`                                                  | 返回 tensor 占用的内存                                       |

1. 创建 dim 0 的 tensor：

   ```py
   torch.tensor(1.)
   torch.tensor(2.2)
   torch.full([],7.) # dim 为 0
   ```

2. 创建 dim 1 的 tensor

   ```py
   torch.tensor([1.1])
   torch.tensor([2.2,3.3])
   torch.FloatTensor(1)
   torch.FloatTensor(2)
   # 使用 numpy 创建
   data = np.ones(2)
   torch.from_numpy(data)
   ```

3. 创建 dim 2 的 tensor

   ```py
   a = torch.randn(2,3)
   a.shape
   ```

4. 创建 dim 3 的 tensor

   ```py
   a = torch.rand(1,2,3)
   a.shape
   a[0]
   list(a.shape)
   ```


### tensor 索引及切片

索引

- 无论什么方法通过索引取出维度必然下降

```py
a = torch.rand(4,3,28,28)
a[0].shape # torch.Size([3,28,28])
a[0,0].shape # torch.Size([28,28])
a[0,0,2,4] # tensor(0.8082)
```

切片

```py
a = torch.rand(4,3,28,28)
a[:2].shape # torch.Size([2,3,28,28])
a[:2,:1,:,:].shape # torch.Size([2,1,28,28])
a[:2,1:,:,:].shape # torch.Size([2,2,28,28])
a[:2,-1:,:,:].shape # torch.Size([2,1,28,28])
a[:,:,0:28:2,0:28:2].shape # torch.Size([4,3,14,14])
```

a.index_select(num,tensor) 函数

- 第一个参数 num 表示对那个维度进行操作
- 第二个参数 
  - torch.tensor[x,y]，左右都为闭区间，表示该维度上的范围
  - torch.arange(x)，该维度从 0 - x 左闭右开的范围

```py
a = torch.rand(4,3,28,28)
a.index_select(0,torch.tensor([0,2])).shape # torch.Size([2,3,28,28])
a.index_select(1,torch.tensor([1,2])).shape # torch.Size([4,2,28,28])
```

...

- ... 代表若干个 :

```py
a = torch.rand(4,3,28,28)
a[...].shape # torch.Size([4,3,28,28])
a[0,...].shape # torch.Size([3,28,28])
a[:,1,...].shape # torch.Size([4,28,28])
a[...,:2].shape # torch.Size([4,3,28,2])
```

masked_select()

- 通过掩码索引  

```py
x = torch.randn(3,4)
mask = x.ge(0.5) # 元素值大于 0.5 的
torch.masked_select(x,mask) # size 为 [x] 一维 
```

take()

- 先将元素打平成一维

```py
torch.tensor([4,3,5],[6,7,8])
torch.take(src,torch.tensor[0,2,5]) # tensor([4,5,8])
```

### 维度变换

#### view reshape

- 使用 a.view(shape) 方法对 tensor 进行变换
- 变换后新的 tensor 会丢失原来的维度信息

```py
a = torch.rand(4,1,28,28)
a.view(4,28*28) # 维度变换为二维 4 1*28*28 , shape 为 4,784
a.view(4*1,28,28).shape # 4,28,28
b = a.view(4,784)
b.view(4,28,28,1) # Logic Bug
```

#### unsqueeze

- 使用 a.unsqueeze(index) 方法添加维度
- 通过索引添加，正数在前负数在后

```py
a = torch.rand(4,1,28,28)
a.unsqueeze(0).shape # [1,4,1,28,28]
a.unsqueeze(-1).shape # [4,1,28,28,1]
```

#### squeeze

- 使用 a.squeeze(index) 方法减少维度，只能减少维度值是 1 的维度
- 不添加 index 参数，挤压所有维度值是 1 的维度

```py
b.shape # torch.Size([1,32,1,1])
b.squeeze().shape # torch.Size([32])
b.squzzez(0).shape # torch.Size([32,1,1])
b.squzzez(-1).shape # torch.Size([1,32,1])
b.squzzez(1).shape # torch.Size([1,32,1,1])
```

#### expand

- a.expand(shape) 方法可以将维度值扩展
- 只能扩展值为 1 的维度到 n
- -1 代表原来的维度不变

```py
a = torch.rand(4,32,14,14)
b.shape # torch.Size([1,32,1,1])
b.expand(4,32,14,14).shape # torch.Size([4，32，14，14])
b.expand(-1,32,-1,-1).shape # torch.size([1， 32，1， 1])
b.expand(-1,32,-1,-4).shape # torch.Size([1, 32，1，-4]) -4 是无意义的

```

#### repeat

- a.repeat(shape) 可以将维度值进行拷贝
- 该方法内存占用多，推荐使用 expand

```py
b.shape # torch.Size([1, 32，1, 1])
b.repeat(4,32,1,1).shape # torch.Size([4，1024，1, 1])
b.repeat(4,1,1,1).shape # torch.Size([4，32，1，1])
b.repeat(4,1,32,32).shape # torch.size([4，32， 32，32])
```

#### t

- 矩阵转置，t 方法只能用于维度为 2 的 tensor

```py
a = torch.randn(3,4)
a.t()
```

#### transpose

- a.transpose(a,b) 方法用于两个维度交换
- 交换后的 tensor 进行 view 变换前使用 contiguous 方法，将数据变为连续，变换回来需再交换

```py
a.shape # [4,3,32,32]
a1 = a.transpose(1,3) # [4,32,32,3]
a2 = a.transpose(1,3).contiguous().view(4,3*32*32).view(4,32,32,3).transpose(1,3)
```

#### permute

- permute 方法通过索引交换维度

```py
a = torch.rand(4,3,28,32)
a.permute(0,2,3,1).shape # [4,28,32,3]
```

#### Broadcast 自动扩张机制

Broadcast 可以对需要扩张的 tensor 自动扩张成 size 与另一个 tensor 相同的机制

Broadcast 适用范围：须变换 tensor 与目标 tensor 对应维度值相同或是 1

### 合并与分割

- `torch.cat([tensor],dim)`

  - 用于 tensor 在相同维度的合并，参数：

    - tensor 列表
    - dim 要变换的维度索引

  - ```py
    a = torch.rand(4,32,8)
    b = torch.rand(5,32,8)
    torch.cat([a,b],dim=0).shape # torch.Size([9,32,8])
    ```

- `torch.stack([tensor],dim)`

  - 用于 tensor 的聚集，并在 dim 索引上产生新的维度，数量为 tensor 列表的数量，参数：

    - tensor 列表
    - dim 要变换的维度索引

  - ```py
    a = torch.rand(32,8)
    b = torch.rand(32,8)
    torch.cat([a,b],dim=0).shape # torch.Size([2,32,8])
    ```

- `torch.split(list/len,dim)`

  - 用于对 tensor 某个维度进行拆分，拆分方式可以指定一个 list 或指定长度，参数：

    - list / len：指定拆分方式
    - dim：维度索引

  - ```py
    b=torch.rand(32,8)
    a.shape # torch.size([32，8])
    c=torch.stack([a,b],dim=0)
    c.shape # torch.size([2，32，8])
    aa, bb = c.split([1,1],dim=0)
    aa.shape , bb.shape # torch.size([1 32，8])， torch.size([1， 32，8])
    aa, bb = c.split(1,dim=0)
    aa.shape,bb.shape # torch.size([1，32，8])， torch.size([1，32，8])
    aa, bb = c.split(2,dim=0) # error
    ```

- `torch.chunk(num,dim)`

  - 用于对 tensor 某个维度进行拆分，拆分成 num 个 tensor，参数：

    - num：拆分的数量
    - dim：维度索引

  - ```py
    b=torch.rand(32,8)
    a.shape # torch.size([32，8])
    c=torch.stack([a,b],dim=o)
    c.shape # torch.size([2，32，8])
    aa,bb = c.chunk(2,dim=0)
    aa shape,bb.shape # torch.size([1，32，8]), torch.size([1，32，8])
    ```


### 数学运算

- 加减乘除
  - tensor 可以使用 +、-、*、/ 或 add、sub、mul、div 方法进行运算，运算时会有 broadcast 机制
- 矩阵相乘
  - torch.mm(a,b)，该方法只适用于 2d 的 tensor
  - torch.matmul，该方法适用于所有维度的 tensor
    - 多维矩阵乘法规则：后两维矩阵相乘，前面的保持不变或进行 broadcast
  - @，与 matmul 方法相同
- 幂运算、对数运算
  - a.pow(num) / a**num
  - a.sqrt()：平方根
  - a.rsqrt()：平方根的倒数
  - torch.exp(a)：tensor 中每一个数做为 e 为底的次方
  - torch.log(a)：tensor 中每一个数取 e 的对数
- 其他
  - a.floor()
  - a.ceil()
  - a.trunc()：取整数
  - a.frac()：取小数
  - a.max() 
  - a.min()
  - a.clamp(num)：最小值限定
  - a.clamp(num1,num2)：区间限定
  - sum，mean（均值），prod（累乘），argmax（最大值索引），argmin（最小值索引）

### 属性统计

- a.norm(num,dim)：

  参数 num 代表做几范数

  dim 表示对对应维度索引操作

  - a.norm(1)：求合  $\sum|x|$

  - a.norm(2)：平方和开根 $\sqrt{\sum|x|^2 } $

  - a.norm(2,dim=1)：指定维度

  对某个维度取范数，对应维度就会消掉

  ![image-20240704134612532](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240704134612532.png)

- min，max，sum，mean（均值），prod（累乘），argmax（最大值索引），argmin（最小值索引）

  min，max 带 `dim` 参数返回该 dim 索引的最大值和索引两个tensor

  min，max 带 `keepdim = True` 参数返回的最大值 tensor 与原维度相同

  注意：argmax，argmin 不带参数调用会将维度打平，传入参数 `dim=x`，计算对应维度最值索引 

- a.topk(num,dim,largest)

  - num：几个最大值

  - dim：维度索引

  - largest：默认为 True，False 为最小的几个

    ```py
    a.topk(3,dim=1)
    a.topk(5,dim=1,largest=False)
    ```

- a.kthvalue(num,dim)

  - 返回 dim 索引维度上第 num 小的 tensor 及其索引

- compare

  - \>,<,>=,<=,!=,==
  - torch.eq(a,b) 判断对应值是否相等
  - torch.equal(a,b) 判断完全是否一样

### 高阶操作

- torch.where(condition,x,y)

  根据条件返回 x，y 两个 tensor 的合并，condition 为 True 选 x，反之选 y

  ```py
  cond # [[0.6,0.7],[0.8,0.4]]
  a #[[0,0],[0,0]]
  b #[[1,1],[1,1]]
  torch.where(cond>0.5,a,b) #[[0,0][0,1]]
  ```

- torch.gather(input,dim,index,out=None)

  ```py
  prob=torch.randn(4,10)
  idx=prob.topk(dim=1， k=3)
  '''
      (tensor([[2.4437，1.5195，1.3598],
      [1.6027, 1.4003,0.7402],
      [2.8965，0.3600，0.1961],
      [2.2636，0.9490，0.3886]]),
      tensor([[7，4，9],
      [7，4, 9],
      [8，1, 3],
      [8，6，o]]))
  '''
  idx=idx[1]
  label=torch.arange(10)+100 # tensor([100， 101, 102， 103，104， 105， 106，107，108，109])
  torch.gather(label.expand(4,10), dim=1, index=idx.long())
  '''
  tensor([[107，104，109],
  [107，104，109],
  [108, 101, 103],
  [108, 106,100]])
  '''
  ```

## 4、梯度、激活函数、链式法则、反向传播

### 梯度

- 导数 ， 函数变化率

- 偏微分，函数对不同变量的导数

- 梯度：函数对不同导数构成的向量
  $$
  \bigtriangledown f = (\frac{\partial f}{x_1};\frac{\partial f}{x_2};...;\frac{\partial f}{x_n,} )
  $$
  

如何通过梯度寻找到极小值解（：a 为 learning rate 学习率）：
$$
\theta_{t+1} = \theta_t - \alpha_t\bigtriangledown f(\theta_t)
$$


### 激活函数

- Sigmoid / Logistics  
  将数进一步压缩到 [0,1]
  $$
  f(x) = \sigma(x) = \frac{1}{1 + e^{-x}} \\
  \sigma^{'} = \sigma(1-\sigma)
  $$
  在 pytorch 中使用 sigmod

  ```py
  from torch.nn import functional as F
  a = torch.linspace(-100,100,10)
  torch.sigmod(a)
  F.sigmod(a) # 与上面相同，已过时
  ```

- Tanh

  该函数在 RNN 中用的多  
  将数进一步压缩到 [-1,1]
  $$
  f(x) =\begin{equation}
  \tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}
  \end{equation} = 2 sigmoid(2x)-1
  $$

- ReLU
  $$
  \begin{equation}
  \text{ReLU}(x) = \max(0, x)
  \end{equation}
  $$
  
  
  在 pytorch 中使用 ReLU
  
  ```py
  from torch.nn import functional as F
  a = torch.linspace(-1,1,10)
  torch.relu(a)
  F.relu(a)
  ```
  

### Loss 及其梯度

Loss 有

- Mean Squared Error（MSE）均方误差
  $$
  loss = \begin{equation}
  \text{MSE} =  \sum(y_i - \hat{y}_i)^2
  \end{equation}
  $$

- Cross Entropy Loss  

  - 可用于二分类
  - 多分类
  - +softmax
  - Leave it to Logistic Regression Part

#### MSE

- $loss = \sum[y-(xw+b)]^2 = \sum[y-f_\theta(x)]^2$
- $L2-norm = ||y-(xw+b)||_2 = \sqrt{\sum{(y_{1ij}-y_{2ij})^2}}$
- $loss = norm(y-(wx+b))^2$

loss 对 theta 求导：
$$
\begin{equation}
\frac{\partial \text{loss}}{\partial \theta} =  2\sum [y - f_\theta(x)] \left( \frac{\partial f_\theta(x)}{\partial \theta} \right)
\end{equation}
$$


使用 pytorch 自动求导与 mse 的使用

- F.mse_loss(prod,label)
- torch.autograd.grad(prod,[w1,w2...]) 返回 list[w1 grad,w2 grad....]

```py
# 简单线性模型 prod = xw + b = 1 * 2 + 0
x = torch.ones(1)
w = torch.full([1],2.) # dim = 1, val = 2, b = 0
# 此时没有设置那个变量需要 grad 信息，需重新设置
mse = F.mse_loss(torch.ones(1),x*w) # 第一个参数 prod 的值，第二个参数 label 的值（此处相反）
w.requires_grad_() # 设置 w 有梯度信息（它作为变量）
mse = F.mse_loss(torch.ones(1),x*w) # 重新设置图信息
torch.autograd.grad(mse,[w]) 
```

- loss.back() 执行完后 w1，w2.. 附带 grad 属性，并清除梯度信息

```py
x = torch.ones(1)
w = torch.full([4],2)
mse = F.mse_loss(torch.ones(1),x*w)
w.requires_grad_()
mse = F.mse_loss(torch.ones(1),x*w)
mse.backward()
w.grad # tensor[2.]
```

#### softmax

softmax 是一个激活函数，用于将不同的输入数压缩称总和为 1 的概率数

![image-20240706152006704](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240706152006704.png)

softmax 的梯度/导数结论：

![image-20240706155454356](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240706155454356.png)

softmax 在 pytorch 中的使用

```py
a = torch.rand(3)
a.requires_grad_()
p = F.softmax(a,dim=0) # 自动建图
torch.autograd.grad(p[1],[a],retain_graph=True)
torch.autograd.grad(p[2],[a])
```

### 感知机的梯度推导

#### 单层单输出感知机模型

- $y = XW + b$
- $y = \sum x_i * w_i + b$

![image-20240706170053299](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240706170053299.png)

- $x_j^i$ 表示神经网络第 i 层第 j 个结点（神经网络第 0 层为输入层），经过激活函数的 O 同理
- $w_{ij}^l$ l 表示第 l 层，i 对应上一层的 $x_i^{l-1}$ 结点，j 对应下一层的 $x_j^{l}$ 结点 
- t 表示 target，E 表示做 loss $(O - t)^2$

![image-20240706170840460](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240706170840460.png)

loss 对  w~j0~ 求导
$$
\frac{\partial E}{\partial w_{j0}} = (O_0 - t)O_0(1-O_0)x^0_j
$$
![image-20240706172743360](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240706172743360.png)

在 pytorch 中计算

```py
x=torch.randn(1,10)
w=torch.randn(1,10,requires_grad=True)
o=torch.sigmoid(x@w.t())
o.shape
loss=F.mse_loss(torch.ones(1,1),o)
loss.shape
loss.backward()
w.grad
```

#### 单层多输出感知机模型

![image-20240706173822410](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240706173822410.png)

loss 对 w~jk~ 求导
$$
\frac{\partial E}{\partial w_{jk}} = (O_k - t_k)O_k(1-O_k)x^0_j
$$


![image-20240706174221996](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240706174221996.png)

在 pytorch 中计算

```py
x=torch.randn(1,10)
w=torch.randn(2,10,requires_grad=True)
o=torch.sigmoid(x@w.t())
o.shape # torch.size([1,2])
loss=F.mse_loss(torch.ones(1,1),o) # 写成 (1,1) 有 boardcast 机制
loss #tensor(0.2443，grad_fn=<MeanBackward1>)
loss.backward()
w.grad
```

### 链式法则

链式法则运用于多层感知机模型，输入层经过隐藏层、输出层、计算 loss

![image-20240707143212125](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240707143212125.png)

在 Pytoch 中链式法则的应用案例：
$$
x\stackrel{w_1,b_1}{\longrightarrow}y_1\stackrel{w_2,b_2}{\longrightarrow}y_2
$$


```py
x=torch.tensor(1.)
w1=torch.tensor(2.,requires_grad=True)
b1=torch .tensor(1.)
w2=torch.tensor(2.,requires_grad=True)
b2=torch.tensor(1.)

y1=x*w1+b1
y2=y1*w2+b2

dy2_dy1=autograd.grad(y2,[y1],retain_graph=True)[0] # y2 对 y1 求导
dy1_dw1=autograd.grad(y1,[w1],retain_graph=True)[0] # y1 对 w1 求导
dy2_dw1=autograd.grad(y2,[w1],retain_graph=True)[0] # y2 对 w1 求导（跳阶）

dy2_dy1*dy1_dw1 # 手动计算链式法则 tensor(2.)

dy2_dw1 # pytorch 自动链式法则 tensor(2.)
```

### MLP 反向传播

多层多输出感知机 loss 对 w~ij~ 求导

![image-20240707144509431](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240707144509431.png)

### 2D 函数优化实例

```py
import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
def himmelblau(x):
	return (x[0] ** 2 + x[1] - 11)** 2 + (x[0] + x[1] ** 2 - 7) ** 2


x= np.arange(-6,6,0.1)
y = np.arange(-6,6,0.1)
print('x,y range:"', x.shape, y.shape)
X,Y = np.meshgrid(x,y)
print( 'X,Y maps:',X.shape, Y.shape)
Z = himmelblau([X,Y])

fig = plt.figure('himmelblau' )
ax = fig.gca(projection='3d')
ax.plot_surface(X,Y,Z)
ax.view_init(60,-30)
ax.set_xlabel('x')
ax.set_ylabel('y')
plt.show()

# [1., 0.]，[-4，0.]，[4, 0.]

x = torch.tensor([0., 0.], requires_grad=True)
optimizer = torch.optim.Adam([x],lr=1e-3) # 优化器，完成 x1 = x - 0.001△x，y1 = y - 0.001△y
for step in range(20000):
    pred = himmelblau(x)
    optimizer.zero_grad()
    pred.backward() # 生成 x，y 的梯度信息
    optimizer.step() # 更新 x，y
    if step % 2000 == 0:
        print ('step {}: x = {}, f(x) = {}'
               .format(step,x.tolist(),pred.item()))
```

### Logistic Regression

多分类问题实战

```py
w1,b1 = torch.randn(200, 784,requires_grad=True)，
torch.zeros(200,requires_grad=True )
w2,b2 = torch.randn(200,200,requires_grad=True)
torch.zeros(200,requires_grad=True )
w3,b3 = torch.randn(10,200,requires_grad=True),
torch.zeros(10,requires_grad=True)
def forward(x):
	x = x@w1.t() + b1
	x = F.relu(x)
	x = x@w2.t() + b2
	x = F.relu(x)
	x = x@w3.t() + b3
	x = F.relu(x)
	return x


optimizer = optim.SGD([w1, b1,w2, b2, w3, b3], lr=learning_rate)
criteon = nn.CrossEntropyLoss()
for epoch in range(epochs):
	for batch_idx, (data, target) in enumerate(train_loader):
		data = data.view(-1,28*28)
        
		logits = forward(data)
		loss = criteon(logits, target )
        
		optimizer.zero_grad()
		loss.backward()
		# print(w1 .grad.norm(), w2.grad.norm())
		optimizer.step()
```

## 5、GPU 加速

to(device) 将放到 GPU 中计算 

![image-20240708142344365](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240708142344365.png)

## 6、Visdom 可视化

安装：`pip install visdom`

run server：在 cmd 中 `python -m visdom.server`

使用：建议看其他文档

```py
from visdom import Visdom
viz = Visdom()
viz.line([0.],[0.],win='train_loss',opts=dict(title='train loss'))
viz.line([loss.item()],[global_step],win='train_loss',update='append')
```

## 7、过拟合、欠拟合、小技巧

 overfitting（过拟合） 现象

![image-20240708153205734](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240708153205734.png)

### 检测 overfitting

#### train-val-test 划分

如何检测出现过拟合：将数据划分为训练集和测试集（验证集）

```py
# 数据划分
train_db,val_db = torch.utils.data.random_split(train_db,[50000,10000])
print('db1:',len(train_db),'db12:',len(val_db))
train_loader = torch.utils.data.DataLoader(
	train_db,batch_size=batch_size,shuffle=True
)
val_loader = torch.utils.data.DataLoader(
	val_db,batch_size=batch_size,shuffle=True
)
```

#### k 折交叉验证

将 train 数据集划分为 k 份，每次取一份做 validation，其他 n-1 份做 training，执行 n 次

### 防止、减轻 overfitting

regularization 正规化

在原来的 loss 上加一个一范数或二范数

![image-20240708162426917](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240708162426917.png)

![image-20240708163426406](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240708163426406.png)

 ![image-20240708163526410](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240708163526410.png)

### 动量、学习率衰减

动量（momentum）即惯性，之前梯度更新的公式为 $w^{k+1}=w^k-\alpha \bigtriangledown f(w^k) $，添加动量后，梯度更新的方向增加融合上一次更新的方向，即
$$
z^{k+1}=\beta z^k +\bigtriangledown f(w^k) \\
w^{k+1} = w^k - \alpha z^{k+1}
$$


pytorch 中动量的使用：添加 momentum，weight_decay 参数

```py
optimizer = torch.optim.SGD(model.parameters(), args.lr,momentum=args.momentum,weight_decay=args.weight_decay)

scheduler = ReduceLROnPlateau(optimizer, 'min')

for epoch in xrange(args.start_epoch, args.epochs):
	train(train_loader, model, criterion, optimizer, epoch)
	result_avg, loss_val = validate(val_loader, model, criterion, epoch)
	scheduler.step(loss_val)
```

在设置学习率时，可以先设置大学习率，当 loss 变化不大时，调小学习率

### Early Stopping、Dropout

- Early Stopping：当测试集准确度在最大值时，选择此时模型，测试集准确度下降时会有过拟合

- Dropout：Dropout 可以减少过拟合，在前向传播时，部分有概率设置为 0，降低连接数量

  dropout 在 pytorch 中的使用

  ```py
  net_dropped = torch.nn.Sequential(
  	torch.nn.Linear(784，200),
  	torch.nn.Dropout(0.5), # drop 50% of the neuron
  	torch.nn.ReLU(),
  	torch.nn.Linear(200，200),
  	torch.nn.Dropout(0.5), # drop 50% of the neuron
  	torch.nn.ReLU(),
  	torch.nn.Linear(200，10),
  )
  ```

  - torch.nn.Dropout(p=droup_prob)
  - Tensorflow：tf.nn.dropout(keep_prob) 

  在 test 时必须把连接全部用上

  ![image-20240709142824096](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240709142824096.png)

### 数据增强

图片数量有限，为增加数据量，可以对原始数据做 flip，rotate，scale，resize，copy part，noise。nn 提供了对应的方法

## 8、卷积神经网络

https://www.bilibili.com/video/BV1R5411w715/?spm_id_from=333.337.search-card.all.click&vd_source=93736dd4ac5c01d75d784e06d15a93ac

### 使用 pytorch 实现简单二维卷积神经网络

```py
layer=nn.Conv2d(1,3,kernel_size=3,stride=1,padding=0) # stride 为步长
x=torch.rand(1,1,28,28)
out=layer.forward(x) # torch.size([1,3,26,26])

layer=nn.Conv2d(1,3,kernel_size=3,stride=1,padding=1)
out=layer.forward(x) # torch.size([1,3,28,28])

layer=nn.Conv2d(1,3,kernel_size=3,stride=2,padding=1)
out=layer.forward(x) # torch.Size([1,3,14,14])
out=layer(x)  # __call__ # torch.size([1,3,14,14])

layer.weight.shape # torch.Size([3,1,3,3])
layer.bias.shape # torch.Size([3])
```

![image-20240709161746603](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240709161746603.png)

### 池化层

```py
x=out # torch.Size([1，16，14，14])
layer=nn.MaxPoo12d(2,stride=2)
out=layer(x) # torch.Size([1，16，7，7])
out=F.avg_poo12d(x,2,stride=2) # torch.Size([1，16，7，7])
```

### ReLU

```py
x.shape # torch.size([1，16，7，7])
layer=nn.ReLU(inplace=True)
out=layer(x)
out.shape # torch.Size([1，16，7，7])
out=F.relu(x)
out.shape # torch.Size([1，16，7，7])
```

### Batch Norm

因为 sigmod 函数在输入 -4 到 4 以外的数接近于 0，因此需要将输入的数据缩放在接近于 0 以便快速梯度下降

https://www.bilibili.com/video/BV1L2421N7jQ/

![image-20240709170855124](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240709170855124.png)

### 经典卷积神经网络

LeNet-5：手写数组识别、VGG、GoogleNet，ResNet（重要）

### 卷积神经网络实战

## 9、nn.Module  模块

- nn 模块提供了大量神经网络现成的模块（Linear，ReLU，Sigmoid，Conv2d，ConvTransposed2d，Dropout，etc.），它通常也做为父类

- Container

  ![image-20240710141949725](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240710141949725.png)

- parameters 返回 net 的所有参数

  ![image-20240710142300668](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240710142300668.png)

- modules

  可以查看 net 下包含自己的所有 module，孩子 module

  ![image-20240710142636431](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240710142636431.png)

  ![image-20240710142653405](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240710142653405.png)

- to(device)

  将网络结构搬到 GPU 上

  ```py
  device = torch.device('cuda')
  net = Net()
  net.to(device)
  ```

- save and load

  用于保存训练时的中间状态

  ![image-20240710142913658](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240710142913658.png)

- train / test

  完成所有 module train 状态 test 状态的切换

  ![image-20240710143222976](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240710143222976.png)

- implement own layer

  自己实现 tensor 的打平类

  ![image-20240710143521116](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240710143521116.png)

- own linear layer

  自定义 linear 类

  ![image-20240710143819537](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\人工智能\Pytorch\assets\image-20240710143819537.png)

  



