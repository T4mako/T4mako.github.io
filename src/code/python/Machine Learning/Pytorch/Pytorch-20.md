## 4、动态计算图

### 4.1、动态计算图简介

**计算图由节点和边组成**

- 节点：张量或者Function
- 边：张量和 Function 之间的依赖关系

计算图是动态图，动态图有两层含义：

- 计算图的正向传播是立即执行的。无需等待完整的计算图创建完毕，每条语句都会在计算图中动态添加节点和边，并立即执行正向传播得到计算结果
- 计算图在反向传播后立即销毁。下次调用需要重新构建计算图。如果在程序中使用了 backward 方法执行了反向传播，或者利用 torch.autograd.grad 方法计算了梯度，那么创建的计算图会被立即销毁，释放存储空间，下次调用需要重新创建

**计算图的正向传播立即执行**

```py
import torch 
w = torch.tensor([[3.0,1.0]],requires_grad=True)
b = torch.tensor([[3.0]],requires_grad=True)
X = torch.randn(10,2)
Y = torch.randn(10,1)
Y_hat = X@w.t() + b  # Y_hat定义后其正向传播被立即执行，与其后面的loss创建语句无关
loss = torch.mean(torch.pow(Y_hat-Y,2)) # 计算张量的平均值

print(loss.data)
print(Y_hat.data)
```

**计算图在反向传播后立即销毁**

```py
import torch 
w = torch.tensor([[3.0,1.0]],requires_grad=True)
b = torch.tensor([[3.0]],requires_grad=True)
X = torch.randn(10,2)
Y = torch.randn(10,1)
Y_hat = X@w.t() + b  # Y_hat定义后其正向传播被立即执行，与其后面的loss创建语句无关
loss = torch.mean(torch.pow(Y_hat-Y,2))

#计算图在反向传播后立即销毁，如果需要保留计算图, 需要设置retain_graph = True
loss.backward()  #loss.backward(retain_graph = True) 

#loss.backward() #如果再次执行反向传播将报错
```

### 4.2、计算图中的 Function

计算图中的另外一种节点是 Function, 实际上就是 Pytorch 中各种对张量操作的函数。

这些 Function 和我们 Python 中的函数有一个较大的区别，那就是它同时包括正向计算逻辑和反向传播的逻辑。

我们可以通过继承 torch.autograd.Function 来创建这种支持反向传播的 Function

```py
class MyReLU(torch.autograd.Function):
   
    #正向传播逻辑，可以用ctx存储一些值，供反向传播使用。
    @staticmethod
    def forward(ctx, input):
        ctx.save_for_backward(input)
        return input.clamp(min=0)

    #反向传播逻辑
    @staticmethod
    def backward(ctx, grad_output):
        input, = ctx.saved_tensors
        grad_input = grad_output.clone()
        grad_input[input < 0] = 0
        return grad_input
    
```

```py
import torch 
w = torch.tensor([[3.0,1.0]],requires_grad=True)
b = torch.tensor([[3.0]],requires_grad=True)
X = torch.tensor([[-1.0,-1.0],[1.0,1.0]])
Y = torch.tensor([[2.0,3.0]])

relu = MyReLU.apply # relu现在也可以具有正向传播和反向传播功能
Y_hat = relu(X@w.t() + b)
loss = torch.mean(torch.pow(Y_hat-Y,2))

loss.backward()

print(w.grad) # tensor([[4.5000, 4.5000]])
print(b.grad) # tensor([[4.5000]])

# Y_hat的梯度函数即是我们自己所定义的 MyReLU.backward
print(Y_hat.grad_fn)
```

### 4.3、计算图与反向传播

简单地理解一下反向传播的原理和过程

```py
import torch 

x = torch.tensor(3.0,requires_grad=True)
y1 = x + 1
y2 = 2*x
loss = (y1-y2)**2

loss.backward()
```

loss.backward() 语句调用后，依次发生以下计算过程。

1. loss 自己的 grad 梯度赋值为 1，即对自身的梯度为 1

2. loss 根据其自身梯度以及关联的 backward 方法，计算出其对应的自变量即 y1 和 y2 的梯度，将该值赋值到 y1.grad 和 y2.grad

3. y2 和 y1 根据其自身梯度以及关联的 backward 方法, 分别计算出其对应的自变量 x 的梯度，x.grad 将其收到的多个梯度值累加

   （注意，1,2,3步骤的求梯度顺序和对多个梯度值的累加规则恰好是求导链式法则的程序表述）

正因为求导链式法则衍生的梯度累加规则，张量的 grad 梯度不会自动清零，在需要的时候需要手动置零

### 4.4、叶子节点和非叶子节点

执行下面代码，我们会发现 loss.grad 并不是我们期望的 1，而是 None

类似地 y1.grad 以及 y2.grad 也是 None

这是由于它们不是叶子节点张量。

在反向传播过程中，只有 is_leaf=True 的叶子节点，需要求导的张量的导数结果才会被最后保留下来。

那么什么是叶子节点张量呢？叶子节点张量需要满足两个条件。

1. 叶子节点张量是由用户直接创建的张量，而非由某个 Function 通过计算得到的张量。
2. 叶子节点张量的 requires_grad 属性必须为 True.

Pytorch 设计这样的规则主要是为了节约内存或者显存空间，因为几乎所有的时候，用户只会关心他自己直接创建的张量的梯度。

所有依赖于叶子节点张量的张量, 其 requires_grad 属性必定是 True 的，但其梯度值只在计算过程中被用到，不会最终存储到 grad 属性中。

如果需要保留中间计算结果的梯度到 grad 属性中，可以使用 retain_grad 方法。 如果仅仅是为了调试代码查看梯度值，可以利用 register_hook 打印日志。

```py
import torch 

x = torch.tensor(3.0,requires_grad=True)
y1 = x + 1
y2 = 2*x
loss = (y1-y2)**2

loss.backward()
print("loss.grad:", loss.grad) # loss.grad: None
print("y1.grad:", y1.grad) # y1.grad: None
print("y2.grad:", y2.grad) # y2.grad: None
print(x.grad) # tensor(4.)

print(x.is_leaf) # True
print(y1.is_leaf) # False
print(y2.is_leaf) # False
print(loss.is_leaf) # False
```

利用 retain_grad 可以保留非叶子节点的梯度值，利用 register_hook 可以查看非叶子节点的梯度值

```py
import torch 

# 正向传播
x = torch.tensor(3.0,requires_grad=True)
y1 = x + 1
y2 = 2*x
loss = (y1-y2)**2

# 非叶子节点梯度显示控制
y1.register_hook(lambda grad: print('y1 grad: ', grad))
y2.register_hook(lambda grad: print('y2 grad: ', grad))
loss.retain_grad()

# 反向传播
loss.backward()
print("loss.grad:", loss.grad)
print("x.grad:", x.grad)

'''
y2 grad:  tensor(4.)
y1 grad:  tensor(-4.)
loss.grad: tensor(1.)
x.grad: tensor(4.)
'''
```

### 4.5、计算图在 TensorBoard 中的可视化

```py
from torch import nn 
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.w = nn.Parameter(torch.randn(2,1))
        self.b = nn.Parameter(torch.zeros(1,1))

    def forward(self, x):
        y = x@self.w + self.b
        return y

net = Net()
```

```python
from torch.utils.tensorboard import SummaryWriter
writer = SummaryWriter('./data/tensorboard')
writer.add_graph(net,input_to_model = torch.rand(10,2))
writer.close()
```

```python
%load_ext tensorboard
#%tensorboard --logdir ./data/tensorboard
```

```py
from tensorboard import notebook
notebook.list() 
```

```py
# 在tensorboard中查看模型
notebook.start("--logdir ./data/tensorboard")
```

## 5、Pytorch 层次结构

Pytorch 中 5 个不同的层次结构：

- 硬件层：Pytorch 支持 CPU、GPU 加入计算资源池
- 内核层：C++ 实现的内核
- 低阶 API：Python 实现的操作符，提供了封装 C++ 内核的低级 API 指令，主要包括各种张量操作算子、自动微分、变量管理
- 中阶 API：Python 实现的模型组件，对低级API进行了函数封装，主要包括各种模型层，损失函数，优化器，数据管道等等
- 高阶 API：Python 实现的模型接口。Pytorch 没有官方的高阶API。为了便于训练模型，作者仿照 keras 中的模型接口，封装了 pytorch 的高阶模型接口 torchkeras.KerasModel。此外，有一个非常流行的非官方 Pytorch 的高阶 API 库，叫做 pytorch_lightning，作者通过引用和借鉴它的一些能力，设计了一个和 torchkeras.KerasModel 功能类似的高阶模型接口 torchkeras.LightModel，功能更加强大。

### 5.1、低阶 API

低阶 API 主要包括 **张量操作**，**计算图** 和 **自动微分**

张量结构操作主要包括：张量创建，索引切片，维度变换，合并分割。

#### 创建张量

张量创建的许多方法和 numpy 中创建 array 的方法很像

```py
import numpy as np
import torch 

a = torch.tensor([1,2,3],dtype = torch.float) # tensor([1., 2., 3.])
b = torch.arange(1,10,step = 2) # tensor([1, 3, 5, 7, 9])
c = torch.linspace(0.0,2*3.14,10) # tensor([0.0000, 0.6978, 1.3956, 2.0933, 2.7911, 3.4889, 4.1867, 4.8844, 5.5822,6.2800])
'''
tensor([[0., 0., 0.],
        [0., 0., 0.],
        [0., 0., 0.]])
'''
d = torch.zeros((3,3))
'''
tensor([[1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]], dtype=torch.int32)
'''
a = torch.ones((3,3),dtype = torch.int)
'''
tensor([[0., 0., 0.],
        [0., 0., 0.],
        [0., 0., 0.]])
'''
b = torch.zeros_like(a,dtype = torch.float)
'''
tensor([[5., 5., 5.],
        [5., 5., 5.],
        [5., 5., 5.]])
'''
torch.fill_(b,5)

# 均匀随机分布
torch.manual_seed(0)
minval,maxval = 0,10
a = minval + (maxval-minval)*torch.rand([5]) # tensor([4.9626, 7.6822, 0.8848, 1.3203, 3.0742])

# 正态分布随机
'''
tensor([[ 0.5507,  0.2704,  0.6472],
        [ 0.2490, -0.3354,  0.4564],
        [-0.6255,  0.4539, -1.3740]])
'''
b = torch.normal(mean = torch.zeros(3,3), std = torch.ones(3,3))

# 正态分布随机
'''
tensor([[16.2371, -1.6612,  3.9163],
        [ 7.4999,  1.5616,  4.0768],
        [ 5.2128, -8.9407,  6.4601]])
'''
mean,std = 2,5
c = std * torch.randn((3,3)) + mean

# 整数随机排列
d = torch.randperm(20) # tensor([ 3, 17,  9, 19,  1, 18,  4, 13, 15, 12,  0, 16,  7, 11,  2,  5,  8, 10, 6, 14])

# 特殊矩阵
I = torch.eye(3,3) #单位矩阵
print(I)
t = torch.diag(torch.tensor([1,2,3])) #对角矩阵
```

#### 索引切片

张量的索引切片方式和 numpy 几乎是一样的。切片时支持缺省参数和省略号

可以通过索引和切片对部分元素进行修改。

此外，对于不规则的切片提取,可以使用 `torch.index_select`, `torch.masked_select`, `torch.take`

如果要通过修改张量的某些元素得到新的张量，可以使用 `torch.where`，`torch.masked_fill`，`torch.index_fill`

```py
# 均匀随机分布
torch.manual_seed(0)
minval,maxval = 0,10
t = torch.floor(minval + (maxval-minval)*torch.rand([5,5])).int()
'''
tensor([[4, 7, 0, 1, 3],
        [6, 4, 8, 4, 6],
        [3, 4, 0, 1, 2],
        [5, 6, 8, 1, 2],
        [6, 9, 3, 8, 4]], dtype=torch.int32)
'''
# 第 0 行
print(t[0]) # tensor([4, 7, 0, 1, 3], dtype=torch.int32)
# 第 1 行第 3 列
print(t[1,3]) # tensor(4, dtype=torch.int32)
print(t[1][3]) # tensor(4, dtype=torch.int32)
# 第 1 行至第 3 行
print(t[1:4,:])
# 第 1 行至最后一行，第0列到最后一列每隔两列取一列
print(t[1:4,:4:2])
#可以使用索引和切片修改部分元素
x = torch.Tensor([[1,2],[3,4]])
x.data[1,:] = torch.tensor([0.0,0.0]) # tensor([[1., 2.],[0., 0.]])
# 省略号可以表示多个冒号
print(a[...,1])
```

以上切片方式相对规则，对于不规则的切片提取,可以使用 torch.index_select, torch.take, torch.gather, torch.masked_select.

考虑班级成绩册的例子，有 4 个班级，每个班级 5 个学生，每个学生 7 门科目成绩。可以用一个 4×5×7 的张量来表示。

```py
minval=0
maxval=100
scores = torch.floor(minval + (maxval-minval)*torch.rand([4,5,7])).int()

# 抽取每个班级第 0 个学生，第2个学生，第 4 个学生的全部成绩
torch.index_select(scores,dim = 1,index = torch.tensor([0,2,4]))

#抽取每个班级第 0 个学生，第 2 个学生，第 4 个学生的第 1 门课程，第 3 门课程，第 6 门课程成绩
q = torch.index_select(torch.index_select(scores,dim = 1,index = torch.tensor([0,2,4]))
                   ,dim=2,index = torch.tensor([1,3,6]))

# 抽取第 0 个班级第 0 个学生的第 0 门课程，第 2 个班级的第 3 个学生的第 1 门课程，第 3 个班级的第 4 个学生第 6 门课程成绩
# take 将输入看成一维数组，输出和 index 同形状
s = torch.take(scores,torch.tensor([0*5*7+0,2*5*7+3*7+1,3*5*7+4*7+6]))

# 抽取分数大于等于 80 分的分数（布尔索引）
# 结果是 1 维张量
g = torch.masked_select(scores,scores>=80)


```

以上这些方法仅能提取张量的部分元素值，但不能更改张量的部分元素值得到新的张量。

如果要通过修改张量的部分元素值得到新的张量，可以使用 torch.where,torch.index_fill 和 torch.masked_fill

- torch.where 可以理解为 if 的张量版本
- torch.index_fill 的选取元素逻辑和 torch.index_select 相同
- torch.masked_fill 的选取元素逻辑和 torch.masked_select 相同。

```py
# 如果分数大于60分，赋值成1，否则赋值成0
ifpass = torch.where(scores>60,torch.tensor(1),torch.tensor(0))

# 将每个班级第 0 个学生，第 2 个学生，第 4 个学生的全部成绩赋值成满分
torch.index_fill(scores,dim = 1,index = torch.tensor([0,2,4]),value = 100)
# 等价于 scores.index_fill(dim = 1,index = torch.tensor([0,2,4]),value = 100)

# 将分数小于 60 分的分数赋值成 60 分
b = torch.masked_fill(scores,scores<60,60)
# 等价于 b = scores.masked_fill(scores<60,60)
```

#### 维度变换

维度变换相关函数主要有 torch.reshape(或者调用张量的 view 方法), torch.squeeze, torch.unsqueeze, torch.transpose

- torch.reshape 可以改变张量的形状
- torch.reshape 可以改变张量的形状
- torch.unsqueeze 可以增加维度
- torch.transpose/torch.permute 可以交换维度。

```py
# 张量的 view 方法有时候会调用失败，可以使用reshape方法。

torch.manual_seed(0)
minval,maxval = 0,255
a = (minval + (maxval-minval)*torch.rand([1,3,3,2])).int()

# 原 tensor 改成 （3,6）形状的张量
b = a.view([3,6]) # torch.reshape(a,[3,6])
# 改回成 [1,3,3,2] 形状的张量
c = torch.reshape(b,[1,3,3,2]) # b.view([1,3,3,2]) 
```

如果张量在某个维度上只有一个元素，利用 torch.squeeze 可以消除这个维度

torch.unsqueeze 的作用和 torch.squeeze 的作用相反

```py
a = torch.tensor([[1.0,2.0]])
s = torch.squeeze(a)
print(a) # tensor([[1., 2.]])
print(s) # tensor([1., 2.])
print(a.shape) # torch.Size([1, 2])
print(s.shape) # torch.Size([2])

#在第 0 维插入长度为1的一个维度
d = torch.unsqueeze(s,axis=0)  
print(s) # tensor([1., 2.])
print(d) # tensor([[1., 2.]])
print(s.shape) # torch.Size([2])
print(d.shape) # torch.Size([1, 2])

```

torch.transpose 可以交换张量的维度，torch.transpose 常用于图片存储格式的变换上。permute 可以对维度顺序做重新编排

如果是二维的矩阵，通常会调用矩阵的转置方法 matrix.t()，等价于 torch.transpose(matrix,0,1)。

```py
minval=0
maxval=255
# Batch,Height,Width,Channel
data = torch.floor(minval + (maxval-minval)*torch.rand([100,256,256,4])).int()
print(data.shape) # torch.Size([100, 256, 256, 4])

# 转换成 Pytorch 默认的图片格式 Batch,Channel,Height,Width 
# 需要交换两次
data_t = torch.transpose(torch.transpose(data,1,2),1,3)
print(data_t.shape) # torch.Size([100, 4, 256, 256])
data_p = torch.permute(data,[0,3,1,2]) #对维度的顺序做重新编排
data_p.shape # torch.Size([100, 4, 256, 256])

matrix = torch.tensor([[1,2,3],[4,5,6]])
print(matrix) # tensor([[1, 2, 3],[4, 5, 6]])
print(matrix.t()) #等价于torch.transpose(matrix,0,1) # tensor([[1, 4],[2, 5],[3, 6]])
```

#### 合并分割

以用 torch.cat 方法和 torch.stack 方法将多个张量合并，可以用 torch.split 方法把一个张量分割成多个张量。

torch.cat 和 torch.stack 有略微的区别，torch.cat 是连接，不会增加维度，而 torch.stack 是堆叠，会增加维度。

```py
a = torch.tensor([[1.0,2.0],[3.0,4.0]])
b = torch.tensor([[5.0,6.0],[7.0,8.0]])
c = torch.tensor([[9.0,10.0],[11.0,12.0]])

abc_cat = torch.cat([a,b,c],dim = 0)
print(abc_cat.shape) # torch.Size([6, 2])
'''
tensor([[ 1.,  2.],
        [ 3.,  4.],
        [ 5.,  6.],
        [ 7.,  8.],
        [ 9., 10.],
        [11., 12.]])
'''
print(abc_cat)

abc_stack = torch.stack([a,b,c],axis = 0) # torch 中 dim 和 axis 参数名可以混用
print(abc_stack.shape) # torch.Size([3, 2, 2])
'''
tensor([[[ 1.,  2.],
         [ 3.,  4.]],
        [[ 5.,  6.],
         [ 7.,  8.]],
        [[ 9., 10.],
         [11., 12.]]])
'''
print(abc_stack)

'''
tensor([[ 1.,  2.,  5.,  6.,  9., 10.],
        [ 3.,  4.,  7.,  8., 11., 12.]])
'''
torch.cat([a,b,c],axis = 1)

'''
tensor([[[ 1.,  2.],
         [ 5.,  6.],
         [ 9., 10.]],
         
        [[ 3.,  4.],
         [ 7.,  8.],
         [11., 12.]]])
'''
torch.stack([a,b,c],axis = 1)
```

torch.split 是 torch.cat 的逆运算，可以指定分割份数平均分割，也可以通过指定每份的记录数量进行分割

```py
'''
tensor([[ 1.,  2.],
        [ 3.,  4.],
        [ 5.,  6.],
        [ 7.,  8.],
        [ 9., 10.],
        [11., 12.]])
'''
print(abc_cat)
a,b,c = torch.split(abc_cat,split_size_or_sections = 2,dim = 0) #每份2个进行分割
print(a) # tensor([[1., 2.],[3., 4.]])
print(b) # tensor([[5., 6.],[7., 8.]])
print(c) # tensor([[ 9., 10.],[11., 12.]])


p,q,r = torch.split(abc_cat,split_size_or_sections =[4,1,1],dim = 0) #每份分别为[4,1,1]
print(p) # tensor([[1., 2.],[3., 4.],[5., 6.],[7., 8.]])
print(q) # tensor([[ 9., 10.]]) 
print(r) # tensor([[11., 12.]])
```

#### 数学运算

张量数学运算主要有：标量运算，向量运算，矩阵运算，以及使用非常强大而灵活的爱因斯坦求和函数 torch.einsum 进行任意维的张量运算

##### 标量运算

张量的数学运算符可以分为标量运算符、向量运算符、以及矩阵运算符。

加减乘除乘方，以及三角函数，指数，对数等常见函数，逻辑比较运算符等都是标量运算符。

标量运算符的特点是对张量实施 **逐元素** 运算。

有些标量运算符对常用的数学运算符进行了重载。并且支持类似 numpy 的广播特性。

```py
import torch 
import numpy as np 

a = torch.tensor(1.0)
b = torch.tensor(2.0)
a + b # tensor(3.)

a = torch.tensor([[1.0,2],[-3,4.0]])
b = torch.tensor([[5.0,6],[7.0,8.0]])
a+b  # 运算符重载 tensor([[ 6.,  8.],[ 4., 12.]])
a-b 
a*b 
a/b
a**2
a**(0.5)
a%3 #求模 # tensor([[1., 2.],[-0., 1.]])
torch.div(a, b, rounding_mode='floor')  # 地板除法 tensor([[ 0.,  0.],[-1.,  0.]])
a >= 2 # torch.ge(a,2)  #ge: greater_equal 缩写 tensor([[False,  True],[False,  True]])
(a>=2)&(a<=3) # tensor([[False,  True],[False, False]])
(a>=2)|(a<=3) # tensor([[True, True],[True, True]])
a==5 #　torch.eq(a,5)　tensor([[False, False],[False, False]])
torch.sqrt(a) # tensor([[1.0000, 1.4142],[nan, 2.0000]])


a = torch.tensor([1.0,8.0])
b = torch.tensor([5.0,6.0])
c = torch.tensor([6.0,7.0])
torch.max(a,b) # tensor([5., 8.])
torch.min(a,b) # tensor([1., 6.])

x = torch.tensor([2.6,-2.7])
print(torch.round(x)) #保留整数部分，四舍五入
print(torch.floor(x)) #保留整数部分，向下归整
print(torch.ceil(x))  #保留整数部分，向上归整
print(torch.trunc(x)) #保留整数部分，向0归整

x = torch.tensor([2.6,-2.7])
print(torch.fmod(x,2)) # 作除法取余数  tensor([ 0.6000, -0.7000])
print(torch.remainder(x,2)) # 作除法取剩余的部分，结果恒正  tensor([0.6000, 1.3000])

# 幅值裁剪
x = torch.tensor([0.9,-0.8,100.0,-20.0,0.7])
y = torch.clamp(x,min=-1,max = 1)
z = torch.clamp(x,max = 1)
print(y) # tensor([ 0.9000, -0.8000,  1.0000, -1.0000,  0.7000])
print(z) # tensor([  0.9000,  -0.8000,   1.0000, -20.0000,   0.7000])

relu = lambda x:x.clamp(min=0.0)
relu(torch.tensor(5.0)) # tensor(5.)
```

##### 向量运算

原则上操作的张量至少是一维张量

向量运算符只在一个特定轴上运算，将一个向量映射到一个标量或者另外一个向量。

```py
# 统计值
a = torch.arange(1,10).float().view(3,3) # tensor([[1., 2., 3.],[4., 5., 6.],[7., 8., 9.]])
print(torch.sum(a)) # tensor(45.)
print(torch.mean(a)) # 平均数 tensor(5.)
print(torch.max(a))
print(torch.min(a))
print(torch.prod(a)) #累乘 tensor(362880.)
print(torch.std(a))  #标准差 tensor(2.7386)
print(torch.var(a))  #方差 tensor(7.5000)
print(torch.median(a)) #中位数 tensor(5.)

# 指定维度计算统计值
b = torch.arange(1,13).float().view(3,4)
print(torch.max(b,dim = 0)) # torch.return_types.max(values=tensor([ 9., 10., 11., 12.]),indices=tensor([2, 2, 2, 2]))
print(torch.max(b,dim = 1)) # torch.return_types.max(values=tensor([ 4.,  8., 12.]),indices=tensor([3, 3, 3]))

# cum 扫描 
a = torch.arange(1,10) # tensor([1, 2, 3, 4, 5, 6, 7, 8, 9])
print(torch.cumsum(a,0)) # tensor([ 1, 3,  6, 10, 15, 21, 28, 36, 45])
print(torch.cumprod(a,0)) # tensor([ 1,  2,  6, 24, 120, 720, 5040,  40320, 362880])
print(torch.cummax(a,0).values) # tensor([1, 2, 3, 4, 5, 6, 7, 8, 9])
print(torch.cummax(a,0).indices) # tensor([0, 1, 2, 3, 4, 5, 6, 7, 8])
print(torch.cummin(a,0)) # torch.return_types.cummin(values=tensor([1, 1, 1, 1, 1, 1, 1, 1, 1]),indices=tensor([0, 0, 0, 0, 0, 0, 0, 0, 0]))

# torch.sort 和 torch.topk 可以对张量排序
a = torch.tensor([[9,7,8],[1,3,2],[5,6,4]]).float()
print(torch.topk(a,2,dim = 0),"\n") # torch.return_types.topk(values=tensor([[9., 7., 8.],[5., 6., 4.]]),indices=tensor([[0, 0, 0],[2, 2, 2]])) 
print(torch.topk(a,2,dim = 1),"\n") # torch.return_types.topk(values=tensor([[9., 8.],[3., 2.],[6., 5.]]),indices=tensor([[0, 2],[1, 2],[1, 0]])) 
print(torch.sort(a,dim = 1),"\n") # torch.return_types.sort(values=tensor([[7., 8., 9.],[1., 2., 3.],[4., 5., 6.]]),indices=tensor([[1, 2, 0],[0, 2, 1],[2, 0, 1]])) 

# 利用 torch.topk 可以在 Pytorch 中实现 KNN 算法
```

##### 矩阵运算

矩阵必须是 **二维** 的

矩阵运算包括：矩阵乘法，矩阵逆，矩阵求迹，矩阵范数，矩阵行列式，矩阵求特征值，矩阵分解等运算。

```py
# 矩阵乘法
a = torch.tensor([[1,2],[3,4]])
b = torch.tensor([[2,0],[0,2]])
print(a@b)  #等价于 torch.matmul(a,b) 或 torch.mm(a,b) tensor([[2, 4],[6, 8]])

# 高维张量的矩阵乘法在后面的维度上进行
a = torch.randn(5,5,6)
b = torch.randn(5,6,4)
(a@b).shape # torch.Size([5, 5, 4])

# 矩阵转置
a = torch.tensor([[1.0,2],[3,4]])
print(a.t()) # tensor([[1., 3.],[2., 4.]])

# 矩阵逆（逆矩阵），必须为浮点类型
a = torch.tensor([[1.0,2],[3,4]])
print(torch.inverse(a)) # tensor([[-2.0000,  1.0000],[ 1.5000, -0.5000]])

# 矩阵求 trace 秩
a = torch.tensor([[1.0,2],[3,4]])
print(torch.trace(a)) # tensor(5.)

# 矩阵求范数
a = torch.tensor([[1.0,2],[3,4]])
print(torch.norm(a)) # tensor(5.4772)

# 矩阵行列式
a = torch.tensor([[1.0,2],[3,4]])
print(torch.det(a)) # tensor(-2.)

# 矩阵特征值和特征向量
a = torch.tensor([[1.0,2],[-5,4]],dtype = torch.float)
print(torch.linalg.eig(a)) 
'''
两个特征值分别是 -2.5+2.7839j, 2.5-2.7839j 
torch.return_types.linalg_eig(
eigenvalues=tensor([2.5000+2.7839j, 2.5000-2.7839j]),
eigenvectors=tensor([[0.2535-0.4706j, 0.2535+0.4706j],
        [0.8452+0.0000j, 0.8452-0.0000j]]))
'''

# 矩阵 svd 分解
# svd 分解可以将任意一个矩阵分解为一个正交矩阵 u,一个对角阵 s 和一个正交矩阵 v.t() 的乘积
# svd 常用于矩阵压缩和降维
a=torch.tensor([[1.0,2.0],[3.0,4.0],[5.0,6.0]])
u,s,v = torch.linalg.svd(a)
print(u,"\n")
print(s,"\n")
print(v,"\n")

import torch.nn.functional as F 
print(u@F.pad(torch.diag(s),(0,0,0,1))@v.t())
#利用 svd 分解可以在Pytorch中实现主成分分析降维
'''
tensor([[-0.2298,  0.8835,  0.4082],
        [-0.5247,  0.2408, -0.8165],
        [-0.8196, -0.4019,  0.4082]]) 

tensor([9.5255, 0.5143]) 

tensor([[-0.6196, -0.7849],
        [-0.7849,  0.6196]]) 

tensor([[1.0000, 2.0000],
        [3.0000, 4.0000],
        [5.0000, 6.0000]])
'''
```

##### 任意维张量运算

torch.einsum：爱因斯坦求和函数。torch.einsum 支持求导和反向传播，并且计算效率非常高

einsum 提供了一套既简洁又优雅的规则，可实现包括但不限于：内积，外积，矩阵乘法，转置和张量收缩（tensor contraction）等张量操作，熟练掌握 einsum 可以很方便的实现复杂的张量操作，而且不容易出错。

- **einsum 规则原理**

  einsum 函数的思想起源于爱因斯坦，求和导致维度收缩，因此求和符号操作的指标总是只出现在公式的一边，例如在我们熟悉的矩阵乘法中
  $$
  C_{ij} = \sum_{k}{A_{ik}B_{kj}}
  $$
  

  k 这个下标被求和了，求和导致了这个维度的消失，所以它只出现在右边而不出现在左边

  这种只出现在张量公式的一边的下标被称之为哑指标，反之为自由指标

  这种只出现在一边的哑指标一定是被求和求掉的，干脆把对应的∑∑求和符号省略

  这就是爱因斯坦求和约定：

  **只出现在公式一边的指标叫做哑指标，针对哑指标的 ∑ 求和符号可以省略**
  $$
  C_{ij} = {A_{ik}B_{kj}}
  $$
  这个公式表达的含义如下:

  - C 这个张量的第 i 行第j列由 𝐴 这个张量的第i行第 k 列和 𝐵 这个张量的第 k 行第j列相乘，这样得到的是一个三维张量 𝐷, 其元素为 𝐷~𝑖𝑘𝑗~，然后对 𝐷 在维度 k 上求和得到

  - 公式展现形式中除了省去了求和符号，还省去了乘法符号

  - 借鉴爱因斯坦求和约定表达张量运算的清爽整洁，numpy、tensorflow 和 torch 等库中都引入了 einsum 这个函数

  - 上述矩阵乘法可以被einsum这个函数表述成

    ```py
    C = torch.einsum("ik,kj->ij",A,B)
    ```

    这个函数的规则原理非常简洁

    1. 用元素计算公式来表达张量运算
    2. 只出现在元素计算公式箭头左边的指标叫做哑指标
    3. 省略元素计算公式中对哑指标的求和符号

    ```py
    import torch 
    
    A = torch.tensor([[1,2],[3,4.0]])
    B = torch.tensor([[5,6],[7,8.0]])
    
    C1 = A@B
    print(C1) # tensor([[19., 22.],[43., 50.]])
    
    C2 = torch.einsum("ik,kj->ij",[A,B])
    print(C2) # tensor([[19., 22.],[43., 50.]])
    ```

- **einsum 基础范例**

  einsum 这个函数的精髓实际上是第一条:

  - 用元素计算公式来表达张量运算
  - 绝大部分张量运算都可以用元素计算公式很方便地来表达，这也是它为什么会那么神通广大

  ```py
  # 例1，张量转置
  A = torch.randn(3,4,5)
  
  # B = torch.permute(A,[0,2,1])
  B = torch.einsum("ijk->ikj",A) 
  
  print("before:",A.shape) # before: torch.Size([3, 4, 5])
  print("after:",B.shape) # after: torch.Size([3, 5, 4])
  
  # 例2，取对角元
  A = torch.randn(5,5)
  # B = torch.diagonal(A)
  B = torch.einsum("ii->i",A)
  print("before:",A.shape) # before: torch.Size([5, 5])
  print("after:",B.shape) # after: torch.Size([5])
  
  # 例3，求和降维
  A = torch.randn(4,5)
  # B = torch.sum(A,1)
  B = torch.einsum("ij->i",A)
  print("before:",A.shape) # before: torch.Size([4, 5])
  print("after:",B.shape) # after: torch.Size([4])
  
  # 例4，哈达玛积
  A = torch.randn(5,5)
  B = torch.randn(5,5)
  # C=A*B
  C = torch.einsum("ij,ij->ij",A,B)
  print("before:",A.shape, B.shape) # before: torch.Size([5, 5]) torch.Size([5, 5])
  print("after:",C.shape) # after: torch.Size([5, 5])
  
  # 例5，向量内积
  A = torch.randn(10)
  B = torch.randn(10)
  # C=torch.dot(A,B)
  C = torch.einsum("i,i->",A,B)
  print("before:",A.shape, B.shape) # before: torch.Size([10]) torch.Size([10])
  print("after:",C.shape) # after: torch.Size([])
  
  # 例6，向量外积(类似笛卡尔积)
  A = torch.randn(10)
  B = torch.randn(5)
  # C = torch.outer(A,B)
  C = torch.einsum("i,j->ij",A,B)
  print("before:",A.shape, B.shape) # before: torch.Size([10]) torch.Size([5])
  print("after:",C.shape) # after: torch.Size([10, 5])
  
  # 例7，矩阵乘法
  A = torch.randn(5,4)
  B = torch.randn(4,6)
  # C = torch.matmul(A,B)
  C = torch.einsum("ik,kj->ij",A,B)
  print("before:",A.shape, B.shape) # before: torch.Size([5, 4]) torch.Size([4, 6])
  print("after:",C.shape) # after: torch.Size([5, 6])
  
  
  #例8，张量缩并
  A = torch.randn(3,4,5)
  B = torch.randn(4,3,6)
  # C = torch.tensordot(A,B,dims=[(0,1),(1,0)])
  C = torch.einsum("ijk,jih->kh",A,B)
  print("before:",A.shape, B.shape) # before: torch.Size([3, 4, 5]) torch.Size([4, 3, 6])
  print("after:",C.shape) # after: torch.Size([5, 6])
  ```

- **einsum 高级范例**

  einsum 可用于超过两个张量的计算

  例如：双线性变换。这是向量内积的一种扩展，一种常用的注意力机制实现方式

  不考虑 batch 维度时，双线性变换的公式：$A=qWk^T$

  考虑 batch 维度时，无法用矩阵乘法表示，可以用元素计算公式表达：$A_{ij}=\sum_{k}\sum_{l}{Q_{ik}W_{jkl}K_{il}}=Q_{ik}W_{jkl}K_{il}$

  ```py
  # 例9，bilinear 注意力机制
  
  #====不考虑 batch 维度====
  q = torch.randn(10) # query_features
  k = torch.randn(10) # key_features
  W = torch.randn(5,10,10) # out_features,query_features,key_features
  b = torch.randn(5) # out_features
  
  # a = q@W@k.t()+b  
  a = torch.bilinear(q,k,W,b)
  print("a.shape:",a.shape) # a.shape: torch.Size([5])
  
  
  #=====考虑 batch 维度====
  Q = torch.randn(8,10)    #batch_size,query_features
  K = torch.randn(8,10)    #batch_size,key_features
  W = torch.randn(5,10,10) #out_features,query_features,key_features
  b = torch.randn(5)       #out_features
  
  #A = torch.bilinear(Q,K,W,b)
  A = torch.einsum('bq,oqk,bk->bo',Q,W,K) + b
  print("A.shape:",A.shape) # A.shape: torch.Size([8, 5])
  ```

  也可以用 einsum 来实现更常见的 scaled-dot-product 形式的 Attention

  不考虑 batch 维度时，scaled-dot-product 形式的 Attention 用矩阵乘法公式表示：$a=softmax(\frac{ak^{T}}{d_k} )$

  考虑 batch 维度时，无法用矩阵乘法表示，可以用元素计算公式表达 $A_{ij}=softmax(\frac{Q_{in}K_{ijn}}{d_k})$

  ```py
  # 例10，scaled-dot-product 注意力机制
  
  #====不考虑 batch 维度====
  q = torch.randn(10)  # query_features
  k = torch.randn(6,10) # key_size, key_features
  
  d_k = k.shape[-1]
  a = torch.softmax(q@k.t()/d_k,-1) 
  
  print("a.shape=",a.shape )
  
  #====考虑 batch 维度====
  Q = torch.randn(8,10)  #batch_size,query_features
  K = torch.randn(8,6,10) #batch_size,key_size,key_features
  
  d_k = K.shape[-1]
  A = torch.softmax(torch.einsum("in,ijn->ij",Q,K)/d_k,-1) 
  
  print("A.shape=",A.shape )
  
  #性能测试
  
  #=====考虑 batch 维度====
  Q = torch.randn(80,100)    #batch_size,query_features
  K = torch.randn(80,100)    #batch_size,key_features
  W = torch.randn(50,100,100) #out_features,query_features,key_features
  b = torch.randn(50)       #out_features
  
  %%timeit 
  A = torch.bilinear(Q,K,W,b)
  # 1.83 ms ± 78.1 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
  
  %%timeit 
  A = torch.einsum('bq,oqk,bk->bo',Q,W,K) + b
  # 636 µs ± 27.5 µs per loop (mean ± std. dev. of 7 runs, 1,000 loops each)、
  ```

##### 广播机制

Pytorch 的广播规则和 numpy 是一样的:

1. 张量的维度不同，将维度较小的张量进行扩展，直到两个张量的维度都一样
2. 两个张量在某个维度上的长度是相同的，或者其中一个张量在该维度上的长度为1，那么我们就说这两个张量在该维度上是相容的
3. 两个张量在所有维度上都是相容的，它们就能使用广播
4. 广播之后，每个维度的长度将取两个张量在该维度长度的较大值
5. 在任何一个维度上，如果一个张量的长度为1，另一个张量长度大于1，那么在该维度上，就好像是对第一个张量进行了 **复制**

torch.broadcast_tensors 可以将多个张量根据广播规则转换成相同的维度

维度扩展允许的操作有两种：

1. 增加一个维度
2. 对长度为 1 的维度进行复制扩展

```py
a = torch.tensor([1,2,3])
b = torch.tensor([[0,0,0],[1,1,1],[2,2,2]])
print(b + a)  # tensor([[1, 2, 3],[2, 3, 4],[3, 4, 5]])
torch.cat([a[None,:]]*3,dim=0) + b  # tensor([[1, 2, 3],[2, 3, 4],[3, 4, 5]])
a_broad,b_broad = torch.broadcast_tensors(a,b)
print(a_broad,"\n") # tensor([[1, 2, 3],[1, 2, 3],[1, 2, 3]]) 
print(b_broad,"\n") # tensor([[0, 0, 0],[1, 1, 1],[2, 2, 2]]) 
print(a_broad + b_broad) # tensor([[1, 2, 3],[2, 3, 4],[3, 4, 5]])
```

#### nn.functional 和 nn.Module

##### 简介

前面我们介绍了 Pytorch 的张量的结构操作和数学运算中的一些常用 API

利用这些张量的 API 我们可以构建出神经网络相关的组件(如激活函数，模型层，损失函数)

Pytorch 和神经网络相关的功能组件大多都封装在 **torch.nn** 模块下

这些功能组件的绝大部分既有函数形式实现，也有类形式实现。

其中nn.functional（一般引入后改名为 **F**）有各种功能组件的函数实现

- 激活函数
  - F.relu
  - F.sigmoid
  - F.tanh
  - F.softmax
- 模型层
  - F.linear
  - F.conv2d
  - F.max_pool2d
  - F.dropout2d
  - F.embedding
- 损失函数
  - F.binary_cross_entropy
  - F.mse_loss
  - F.cross_entropy

为了便于对参数进行管理，一般通过继承 nn.Module 转换成为类的实现形式，并直接封装在 nn 模块下。例如：

- 激活函数
  - nn.ReLU
  - nn.Sigmoid
  - nn.Tanh
  - nn.Softmax
- 模型层
  - nn.Linear
  - nn.Conv2d
  - nn.MaxPool2d
  - nn.Dropout2d
  - nn.Embedding
- 损失函数
  - nn.BCELoss
  - nn.MSELoss
  - nn.CrossEntropyLoss

实际上 nn.Module 除了可以管理其引用的各种参数，还可以管理其引用的子模块，功能十分强大

```py
import torch 
import torch.nn.functional as F 
torch.relu(torch.tensor(-1.0))  # tensor(0.)
F.relu(torch.tensor(-1.0)) # tensor(0.)
```

##### 使用 nn.Module 来管理参数(配合 nn.Parameter 使用)

在 Pytorch 中，模型的参数是需要被优化器训练的，因此，通常要设置参数为 requires_grad = True 的张量。

同时，在一个模型中，往往有许多的参数，要手动管理这些参数并不是一件容易的事情。

Pytorch 一般将参数用 nn.Parameter 来表示，并且用 nn.Module 来管理其结构下的所有参数。

```py
import torch 
from torch import nn 
import torch.nn.functional  as F

torch.randn(2,2,requires_grad = True) # tensor([[0.1829, 0.0693],[0.0767, 1.2441]], requires_grad=True)

# nn.Parameter 具有 requires_grad = True 属性
w = nn.Parameter(torch.randn(2,2))
print(w) # Parameter containing:tensor([[-0.8092, -0.8830],[ 1.6357, -0.1740]], requires_grad=True)
print(w.requires_grad) # True

# nn.ParameterList 可以将多个 nn.Parameter 组成一个列表
params_list = nn.ParameterList([nn.Parameter(torch.rand(8,i)) for i in range(1,3)])
'''
ParameterList(
    (0): Parameter containing: [torch.float32 of size 8x1]
    (1): Parameter containing: [torch.float32 of size 8x2]
)
'''
print(params_list) 
print(params_list[0].requires_grad) # True

# nn.ParameterDict 可以将多个 nn.Parameter 组成一个字典
params_dict = nn.ParameterDict({"a":nn.Parameter(torch.rand(2,2)),
                               "b":nn.Parameter(torch.zeros(2))})
'''
ParameterDict(
    (a): Parameter containing: [torch.FloatTensor of size 2x2]
    (b): Parameter containing: [torch.FloatTensor of size 2]
)
'''
print(params_dict)
print(params_dict["a"].requires_grad) # True

# 可以用 Module 将它们管理起来
# module.parameters() 返回一个生成器，包括其结构下的所有 parameters
module = nn.Module()
module.w = nn.Parameter(torch.randn(2,2))
module.params_list = nn.ParameterList([nn.Parameter(torch.rand(8,i)) for i in range(1,3)])
module.params_dict = nn.ParameterDict({"a":nn.Parameter(torch.rand(2,2)),
                               "b":nn.Parameter(torch.zeros(2))})

num_param = 0
for param in module.named_parameters():
    print(param,"\n")
    num_param = num_param + 1
print("number of Parameters =",num_param)
'''
('w', Parameter containing:
tensor([[-1.2390,  0.3316],
        [-0.4232, -0.0090]], requires_grad=True)) 

('params_list.0', Parameter containing:
tensor([[0.8785],
        [0.6456],
        [0.4697],
        [0.8962],
        [0.1122],
        [0.4837],
        [0.8089],
        [0.0515]], requires_grad=True)) 

('params_list.1', Parameter containing:
tensor([[0.7440, 0.5626],
        [0.2430, 0.0113],
        [0.5884, 0.0815],
        [0.7125, 0.4120],
        [0.7275, 0.1608],
        [0.4658, 0.0085],
        [0.8578, 0.7290],
        [0.0327, 0.2239]], requires_grad=True)) 

('params_dict.a', Parameter containing:
tensor([[0.6698, 0.5646],
        [0.2482, 0.8258]], requires_grad=True)) 

('params_dict.b', Parameter containing:
tensor([0., 0.], requires_grad=True)) 

number of Parameters = 5
'''


# 实践当中，一般通过继承 nn.Module 来构建模块类，并将所有含有需要学习的参数的部分放在 **构造函数** 中。
# 以下范例为 Pytorch 中 nn.Linear 的源码的简化版本
# 可以看到它将需要学习的参数放在了 __init__ 构造函数中，并在 forward 中调用 F.linear 函数来实现计算逻辑。

class Linear(nn.Module):
    __constants__ = ['in_features', 'out_features']

    def __init__(self, in_features, out_features, bias=True):
        super(Linear, self).__init__()
        self.in_features = in_features
        self.out_features = out_features
        self.weight = nn.Parameter(torch.Tensor(out_features, in_features))
        if bias:
            self.bias = nn.Parameter(torch.Tensor(out_features))
        else:
            self.register_parameter('bias', None)

    def forward(self, input):
        return F.linear(input, self.weight, self.bias)
   
```

##### 使用 nn.Module 来管理子模块

一般情况下，我们都很少直接使用 nn.Parameter 来定义参数构建模型，而是通过一些拼装一些常用的模型层来构造模型

这些模型层也是继承自 nn.Module 的对象，本身也包括参数，属于我们要定义的模块的子模块

nn.Module 提供了一些方法可以管理这些子模块

- children() 方法: 返回生成器，包括模块下的所有子模块。
- named_children() 方法：返回一个生成器，包括模块下的所有子模块，以及它们的名字。
- modules() 方法：返回一个生成器，包括模块下的所有各个层级的模块，包括模块本身。
- named_modules() 方法：返回一个生成器，包括模块下的所有各个层级的模块以及它们的名字，包括模块本身。

其中 chidren() 方法和 named_children() 方法较多使用。

modules() 方法和 named_modules() 方法较少使用，其功能可以通过多个 named_children() 的嵌套使用实现。

```py
class Net(nn.Module):
    
    def __init__(self):
        super(Net, self).__init__()
        
        self.embedding = nn.Embedding(num_embeddings = 10000,embedding_dim = 3,padding_idx = 1)
        self.conv = nn.Sequential()
        self.conv.add_module("conv_1",nn.Conv1d(in_channels = 3,out_channels = 16,kernel_size = 5))
        self.conv.add_module("pool_1",nn.MaxPool1d(kernel_size = 2))
        self.conv.add_module("relu_1",nn.ReLU())
        self.conv.add_module("conv_2",nn.Conv1d(in_channels = 16,out_channels = 128,kernel_size = 2))
        self.conv.add_module("pool_2",nn.MaxPool1d(kernel_size = 2))
        self.conv.add_module("relu_2",nn.ReLU())
        
        self.dense = nn.Sequential()
        self.dense.add_module("flatten",nn.Flatten())
        self.dense.add_module("linear",nn.Linear(6144,1))
        
    def forward(self,x):
        x = self.embedding(x).transpose(1,2)
        x = self.conv(x)
        y = self.dense(x)
        return y
    
net = Net()

i = 0
for child in net.children():
    i+=1
    print(child,"\n")
print("child number",i)
'''
Embedding(10000, 3, padding_idx=1) 

Sequential(
  (conv_1): Conv1d(3, 16, kernel_size=(5,), stride=(1,))
  (pool_1): MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
  (relu_1): ReLU()
  (conv_2): Conv1d(16, 128, kernel_size=(2,), stride=(1,))
  (pool_2): MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
  (relu_2): ReLU()
) 

Sequential(
  (flatten): Flatten(start_dim=1, end_dim=-1)
  (linear): Linear(in_features=6144, out_features=1, bias=True)
) 

child number 3
'''

i = 0
for name,child in net.named_children():
    i+=1
    print(name,":",child,"\n")
print("child number",i)
'''
embedding : Embedding(10000, 3, padding_idx=1) 

conv : Sequential(
  (conv_1): Conv1d(3, 16, kernel_size=(5,), stride=(1,))
  (pool_1): MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
  (relu_1): ReLU()
  (conv_2): Conv1d(16, 128, kernel_size=(2,), stride=(1,))
  (pool_2): MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
  (relu_2): ReLU()
) 

dense : Sequential(
  (flatten): Flatten(start_dim=1, end_dim=-1)
  (linear): Linear(in_features=6144, out_features=1, bias=True)
) 

child number 3
'''

i = 0
for module in net.modules():
    i+=1
    print(module)
print("module number:",i)
'''
Net(
  (embedding): Embedding(10000, 3, padding_idx=1)
  (conv): Sequential(
    (conv_1): Conv1d(3, 16, kernel_size=(5,), stride=(1,))
    (pool_1): MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
    (relu_1): ReLU()
    (conv_2): Conv1d(16, 128, kernel_size=(2,), stride=(1,))
    (pool_2): MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
    (relu_2): ReLU()
  )
  (dense): Sequential(
    (flatten): Flatten(start_dim=1, end_dim=-1)
    (linear): Linear(in_features=6144, out_features=1, bias=True)
  )
)
Embedding(10000, 3, padding_idx=1)
Sequential(
  (conv_1): Conv1d(3, 16, kernel_size=(5,), stride=(1,))
  (pool_1): MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
  (relu_1): ReLU()
  (conv_2): Conv1d(16, 128, kernel_size=(2,), stride=(1,))
  (pool_2): MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
  (relu_2): ReLU()
)
Conv1d(3, 16, kernel_size=(5,), stride=(1,))
MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
ReLU()
Conv1d(16, 128, kernel_size=(2,), stride=(1,))
MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
ReLU()
Sequential(
  (flatten): Flatten(start_dim=1, end_dim=-1)
  (linear): Linear(in_features=6144, out_features=1, bias=True)
)
Flatten(start_dim=1, end_dim=-1)
Linear(in_features=6144, out_features=1, bias=True)
module number: 12
'''
```

下面我们通过 named_children 方法找到 embedding 层，并将其参数设置为不可训练(相当于冻结 embedding 层)。

```py
children_dict = {name:module for name,module in net.named_children()}

'''
{'embedding': Embedding(10000, 3, padding_idx=1), 'conv': Sequential(
  (conv_1): Conv1d(3, 16, kernel_size=(5,), stride=(1,))
  (pool_1): MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
  (relu_1): ReLU()
  (conv_2): Conv1d(16, 128, kernel_size=(2,), stride=(1,))
  (pool_2): MaxPool1d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
  (relu_2): ReLU()
), 'dense': Sequential(
  (flatten): Flatten(start_dim=1, end_dim=-1)
  (linear): Linear(in_features=6144, out_features=1, bias=True)
)}
Embedding(10000, 3, padding_idx=1)
'''
print(children_dict)
embedding = children_dict["embedding"]
embedding.requires_grad_(False) #冻结其参数

#可以看到其第一层的参数已经不可以被训练了。
for param in embedding.parameters():
    print(param.requires_grad) # False
    print(param.numel()) # 30000
    
from torchkeras import summary
summary(net,input_shape = (200,),input_dtype = torch.LongTensor);
# 不可训练参数数量增加
'''
--------------------------------------------------------------------------
Layer (type)                            Output Shape              Param #
==========================================================================
Embedding-1                             [-1, 200, 3]               30,000
Conv1d-2                               [-1, 16, 196]                  256
MaxPool1d-3                             [-1, 16, 98]                    0
ReLU-4                                  [-1, 16, 98]                    0
Conv1d-5                               [-1, 128, 97]                4,224
MaxPool1d-6                            [-1, 128, 48]                    0
ReLU-7                                 [-1, 128, 48]                    0
Flatten-8                                 [-1, 6144]                    0
Linear-9                                     [-1, 1]                6,145
==========================================================================
Total params: 40,625
Trainable params: 10,625
Non-trainable params: 30,000
--------------------------------------------------------------------------
Input size (MB): 0.000763
Forward/backward pass size (MB): 0.287788
Params size (MB): 0.154972
Estimated Total Size (MB): 0.443523
'''
```

### 5.2、中阶 API

#### Dataset 和 DateLoader

Pytorch 通常使用 Dataset 和 DataLoader 这两个工具类来构建数据管道

- Dataset 定义了数据集的内容，它相当于一个类似列表的数据结构，具有确定的长度，能够用索引获取数据集中的元素。

- DataLoader 定义了按 batch 加载数据集的方法，它是一个实现了`__iter__`方法的可迭代对象，每次迭代输出一个 batch 的数据

  DataLoader 能够控制 batch 的大小，batch 中元素的采样方法，以及将 batch 结果整理成模型所需输入形式的方法，并且能够使用多进程读取数据。

在绝大部分情况下，用户只需实现 Dataset 的 `__len__` 方法和 `__getitem__` 方法，就可以轻松构建自己的数据集，并用默认数据管道进行加载
