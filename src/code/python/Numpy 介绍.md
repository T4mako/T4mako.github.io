## 1、Numpy

numpy 底层使用 C 语言大大提升数据运算速度，numpy 中的数据均以数组形式展现，一维、二维、多维......，通常成为 numpy 数组

### 库的导入

```py
import numpy as np
```

### 类型

numpy 中数组默认数据类型是 64 位浮点数，创建数组时可以使用 dtype 指定创建数据的类型

- np.int8/16/32/64 整形
- np.uint8/16/32/64 五符号整形
- np.float32/64 浮点数
- bool 布尔值
- str 字符串

```py
a = np.zeros((4,2),dtype = np.int32)
```

也可以使用 astype 转换类型

```py
a = np.zeros((4,2))
b = a.astype(int)

'''
array([[0, 0],
       [0, 0],
       [0, 0],
       [0, 0]])
'''
```

### np 数组创建

- array 创建数组

  ```py
  np.array([1,2,3,4,5])
  ```

- zeros 创建全 0 数组

  ```py
  np.zeros((3,2)) # 三行二列
  
  """
  array([[0., 0.],
         [0., 0.],
         [0., 0.]])
  """
  ```

- shape 获取数组的维度

  ```py
  a = np.zeros((3,2)) # 三行二列
  a. shape # (3,2)
  ```

- ones 创建全是 1 的数组

  ```py
  np.ones((2,4))
  
  '''
  array([[1., 1., 1., 1.],
         [1., 1., 1., 1.]])
  '''
  ```

- arange 创建递增或递减数列

  ```py
  np.arange(3,7)
  
  '''
  array([3, 4, 5, 6])
  '''
  ```

- linspace 创建等间距分布数  
  前两个参数为区间范围，后一个数字为数据个数

  ```py
  np.linspace(0,1,5)
  
  '''
  array([0.  , 0.25, 0.5 , 0.75, 1.  ])
  '''
  ```

- random.rand 生成随机数组

  ```py
  np.random.rand(2,4)
  
  '''
  array([[0.11797782, 0.58521552, 0.23461751, 0.47500297],
         [0.46322519, 0.93763438, 0.02994155, 0.40305636]])
  '''
  ```
  
### 不同尺寸的运算

两个不同尺寸的数组会扩展成相同尺寸再运算

```py
a = np.ones((1,3))
b = np.ones((3,1))
a + b

'''
array([[2., 2., 2.],
       [2., 2., 2.],
       [2., 2., 2.]])
'''
```

### np 方法

两个 **相同尺寸** 的数组可以直接进行 **四则运算**

也可以用 numpy 数组与一个数做运算

```py
a = np.array([1,2,3])
b = np.array([4,5,6])
a + b # array([5, 7, 9]
a - b # array([-3, -3, -3])
a * b # array([ 4, 10, 18])
a / b # array([0.25, 0.4 , 0.5 ])
a * 5 # array([ 5, 10, 15])
```

dot 向量点乘运算

```py
a = np.array([1,2,3])
b = np.array([4,5,6])
np.dot(a,b) # 32
```

@ 矩阵乘法，等同于 np.matmul() 函数

```py
a = np.array([[1,2],[3,4]])
b = np.array([[2,0],[0,2]])
a @ b 
'''
array([[2, 4],
       [6, 8]])
'''
```

sqrt 求平方根

```py
a = np.array([1,2,3])
np.sqrt(a) # array([1.        , 1.41421356, 1.73205081])
```

三角函数

```py
a = np.array([1,2,3])
np.sin(a) # array([0.84147098, 0.90929743, 0.14112001])
np.cos(a) # array([ 0.54030231, -0.41614684, -0.9899925 ])
```

对数、指数运算

```py
a = np.array([1,2,3])
np.log(a) # array([0.        , 0.69314718, 1.09861229])
np.power(a,2) # array([1, 4, 9], dtype=int32)
```

### np 数组方法

以下方法若为多维度数组，可指定参数：

- axis 参数，代表维度

  - axis = 0：对各列进行操作

  - axis = 1：对各类进行操作

    ```py
    a = np.array([[1,2,3],[4,5,6]])
    a.sum(axis = 0) # array([5, 7, 9])
    a.sum(axis = 1) # array([ 6, 15])
    ```

- min，max 最值

  ```py
  a = np.array([1,2,3])
  a.min()
  a.max()
  ```

- argmin，argmax 最值元素索引

  ```py
  a = np.array([1,2,3])
  a.argmin() # 0
  a.argmax() # 2
  ```

- sum 求和

  ```py
  a = np.array([1,2,3])
  a.sum()
  ```

- mean 平均值，median 中位数

  ```py
  a = np.array([1,2,3])
  a.mean()
  a.median()
  ```

- var 方差

  ```py
  a = np.array([1,2,3])
  a.var() # 0.6666666666666666
  ```

- std 标准差

  ```py
  a = np.array([1,2,3])
  a.std() # 0.816496580927726
  ```

### 获取、筛选元素

根据位置获取

```py
a = np.array([[1,2,3],[4,5,6]])
a[0,1] # 2
```

根据基本运算逻辑获取

```py
a[a < 3] # array([1, 2])
a[(a > 3) & (a % 2 == 0)] # array([4, 6]) 与-& 或-|
```

根据切片获取

```py
a[0,0:2] # 第一行，一到二列的所有数据
a[0] # 第一行所有数据
a[:,0] # 第一列所有数据
a = np.arange(10)
a[::2] # 步长为 2 array([0, 2, 4, 6, 8])
```



