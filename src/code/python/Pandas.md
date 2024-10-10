# Pandas

## 一、简介

Pandas 是开源的数据分析和数据处理库，基于 Python

Pandas 适用于处理结构化数据

Pandas 主要引入了两种新的数据结构：

-  **Series**（一维）

  类似于一维数组，由一组数据以及与之相关的数据标签（索引）构成

  Series 可以看作是 DataFrame 中的一列，也可以是单独存在的一维数据结构

- **DataFrame** （二维）

  类似于一个二维表格，它是 Pandas 中最重要的数据结构。

  DataFrame 既有行索引也有列索引

  DataFrame 可视为由多个 Series 组成的数据结构

Pandas 提供了丰富的功能，包括：

- 数据清洗：处理缺失数据、重复数据等。
- 数据转换：改变数据的形状、结构或格式。
- 数据分析：进行统计分析、聚合、分组等。
- 数据可视化：通过整合 Matplotlib 和 Seaborn 等库，可以进行数据可视化。

## 二、Series

Series 特点：

- **一维数组**
- **索引：** 每个 `Series` 都有一个索引，它可以是整数、字符串、日期等类型。如果不指定索引，Pandas 将默认创建一个从 0 开始的整数索引
- **数据类型：** `Series` 可以容纳不同数据类型的元素
- **大小不变性：**Series 的大小在创建后是不变的，但可以通过某些操作（如 append 或 delete）来改变。
- **操作：**Series 支持各种操作，如数学运算、统计分析、字符串处理等。
- **缺失数据：**Series 可以包含缺失数据，Pandas 使用 NaN（Not a Number）来表示缺失或无值。

### Series 创建

使用 `pd.Series()` 构造函数创建一个 Series 对象，传递一个数据数组（可以是列表、NumPy 数组等）和一个可选的索引数组

```py
pandas.Series(data=None, index=None, dtype=None, name=None, copy=False, fastpath=False)
```

- `data`：Series 数据部分，可以是列表、数组、字典、标量值等。如果不提供此参数，则创建一个空的 Series。
- `index`：Series 索引部分，可以是列表、数组、索引对象等。如果不提供此参数，则创建一个默认的整数索引。
- `dtype`：指定 Series 的数据类型。可以是 NumPy 的数据类型，例如 `np.int64`、`np.float64` 等。如果不提供此参数，则根据数据自动推断数据类型。
- `name`：Series 的名称，用于标识 Series 对象。如果提供了此参数，则创建的 Series 对象将具有指定的名称。
- `copy`：是否复制数据。默认为 False，表示不复制数据。如果设置为 True，则复制输入的数据。
- `fastpath`：是否启用快速路径。默认为 False。启用快速路径可能会在某些情况下提高性能。

```py
import pandas as pd

# 创建 Series1 
a = [1, 2, 3]
myvar = pd.Series(a)
'''
0    1
1    2
2    3
dtype: int64
'''
print(myvar)
print(myvar[1]) # 2



# 指定索引
a = ["Google", "Runoob", "Wiki"]
myvar = pd.Series(a, index = ["x", "y", "z"])
'''
x    Google
y    Runoob
z      Wiki
dtype: object
'''
print(myvar)
print(myvar["y"]) # Runoob

# 使用 key/value 对象，类似字典来创建 Series
sites = {1: "Google", 2: "Runoob", 3: "Wiki"}
myvar = pd.Series(sites)
'''
1    Google
2    Runoob
3      Wiki
dtype: object
'''
print(myvar)

# 如果我们只需要字典中的一部分数据，只需要指定需要数据的索引即可，如下实例
sites = {1: "Google", 2: "Runoob", 3: "Wiki"}
myvar = pd.Series(sites, index = [1, 2])
'''
1    Google
2    Runoob
dtype: object
'''
print(myvar)

# 使用列表、字典或数组创建一个默认索引的 Series
# 使用列表创建 Series
s = pd.Series([1, 2, 3, 4])
# 使用 NumPy 数组创建 Series
s = pd.Series(np.array([1, 2, 3, 4]))
# 使用字典创建 Series
s = pd.Series({'a': 1, 'b': 2, 'c': 3, 'd': 4})


```

### Series 数据增删改查

```py
# 指定索引创建 Series
s = pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])

# 获取值
print(s[2])  # 获取索引为 2 的值
print(s['c'])  # 返回索引标签 'a' 对应的元素

# 获取多个值
subset = s[1:4]  # 获取索引为1到3的值

# 索引和值的对应关系
for index, value in s.items():
    print(f"Index: {index}, Value: {value}")


# 使用切片语法来访问 Series 的一部分
print(s['a':'c'])  # 返回索引标签 'a' 到 'c' 之间的元素
print(s[:3])  # 返回前三个元素

# 为特定的索引标签赋值
s['a'] = 10  # 将索引标签 'a' 对应的元素修改为 10

# 通过赋值给新的索引标签来添加元素
s['e'] = 5  # 在 Series 中添加一个新的元素，索引标签为 'e'

# 使用 del 删除指定索引标签的元素。
del s['a']  # 删除索引标签 'a' 对应的元素

# 使用 drop 方法删除一个或多个索引标签，并返回一个新的 Series。
s_dropped = s.drop(['b'])  # 返回一个删除了索引标签 'b' 的新 Series
```

### Series 基本运算

```py
# 算术运算
result = series * 2  # 所有元素乘以2
# 过滤
filtered_series = series[series > 2]  # 选择大于2的元素
# 数学函数
import numpy as np
result = np.sqrt(series)  # 对每个元素取平方根

# 其他属性和方法
print(s.dtype)   # 数据类型
print(s.shape)   # 形状
print(s.size)    # 元素个数
print(s.head())  # 前几个元素，默认是前 5 个
print(s.tail())  # 后几个元素，默认是后 5 个
print(s.sum())   # 求和
print(s.mean())  # 平均值
print(s.std())   # 标准差
print(s.min())   # 最小值
print(s.max())   # 最大值
```

### Series 属性与方法

```py
# 获取索引
index = s.index # ['b', 'c', 'd', 'e']

# 获取值数组
values = s.values

# 获取描述统计信息
stats = s.describe()

# 获取最大值和最小值的索引
max_index = s.idxmax()
min_index = s.idxmin()

# 使用布尔表达式：根据条件过滤 Series
print(s > 2)  # 返回一个布尔 Series，其中的元素值大于 2

# 查看数据类型：使用 dtype 属性查看 Series 的数据类型
print(s.dtype)  # 输出 Series 的数据类型

# 转换数据类型：使用 astype 方法将 Series 转换为另一种数据类型
s = s.astype('float64')  # 将 Series 中的所有元素转换为 float64 类型
```

## 三、DataFrame

DataFrame 是一个表格型的数据结构，它含有一组有序的列，每列可以是不同的值类型（数值、字符串、布尔型值）。

DataFrame 既有行索引也有列索引，它可以被看做由 Series 组成的字典（共同用一个索引）。

DataFrame 特点：

- **二维结构**
- **列的数据类型可以不同**
- **拥有行和列索引**
- **动态添加删除列**
- **算术运算、数据对齐自动对齐索引**
- **包含缺失数据 NaN**
- **支持数据切片、索引、子集分割等操作**
- **时间序列支持**
- **丰富的数据访问功能**：通过 `.loc`、`.iloc` 和 `.query()` 方法，可以灵活地访问和筛选数据。
- **灵活的数据处理功能**：包括数据合并、重塑、透视、分组和聚合等。
- **数据可视化**：虽然 `DataFrame` 本身不是可视化工具，但它可以与 Matplotlib 或 Seaborn 等可视化库结合使用，进行数据可视化。
- **高效的数据输入输出**：可以方便地读取和写入数据，支持多种格式，如 CSV、Excel、SQL 数据库和 HDF5 格式。
- **描述性统计**：提供了一系列方法来计算描述性统计数据，如 `.describe()`、`.mean()`、`.sum()` 等。
- **灵活的数据对齐和集成**：可以轻松地与其他 `DataFrame` 或 `Series` 对象进行合并、连接或更新操作。
- **转换功能**：可以对数据集中的值进行转换，例如使用 `.apply()` 方法应用自定义函数。
- **滚动窗口和时间序列分析**：支持对数据集进行滚动窗口统计和时间序列分析。

### DateFrom 创建

DataFrame 构造方法：

```py
pandas.DataFrame(data=None, index=None, columns=None, dtype=None, copy=False)
```

参数说明：

- `data`：DataFrame 数据部分，如果不提供此参数，则创建一个空的 DataFrame。
- `index`：DataFrame 的行索引，如果不提供此参数，则创建一个默认的整数索引。
- `columns`：DataFrame 的列索引，如果不提供此参数，则创建一个默认的整数索引。
- `dtype`：指定 DataFrame 的数据类型，可以是 NumPy 的数据类型，如果不提供此参数，则根据数据自动推断数据类型。
- `copy`：是否复制数据。默认为 False。

创建说明：

- **从字典创建：**字典的键成为列名，值成为列数据
- **从列表创建：**外层列表代表行，内层列表代表列
- **从 NumPy 数组创建：**提供一个二维 NumPy 数组
- **从 Series 创建 DataFrame：**通过 **pd.Series()** 创建

```py
import pandas as pd
import numpy as np

data = [['Google', 10], ['Runoob', 12], ['Wiki', 13]]
# 创建 DataFrame
df = pd.DataFrame(data, columns=['Site', 'Age'])
# 使用 astype 方法设置每列的数据类型
df['Site'] = df['Site'].astype(str)
df['Age'] = df['Age'].astype(float)
'''
     Site   Age
0  Google  10.0
1  Runoob  12.0
2    Wiki  13.0
'''
print(df)

# 使用字典来创建
import pandas as pd
data = {'Site':['Google', 'Runoob', 'Wiki'], 'Age':[10, 12, 13]}
df = pd.DataFrame(data)

# 通过 NumPy 数组创建 DataFrame
df = pd.DataFrame(np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))

# 从 Series 创建 DataFrame
s1 = pd.Series(['Alice', 'Bob', 'Charlie'])
s2 = pd.Series([25, 30, 35])
s3 = pd.Series(['New York', 'Los Angeles', 'Chicago'])
df = pd.DataFrame({'Name': s1, 'Age': s2, 'City': s3})
```

以下实例使用 ndarrays 创建，ndarray 的长度必须相同， 如果传递了 index，则索引的长度应等于数组的长度。如果没有传递索引，则默认情况下，索引将是 range(n)，其中 n 是数组长度。

```py
# 创建一个包含网站和年龄的二维 ndarray
ndarray_data = np.array([
    ['Google', 10],
    ['Runoob', 12],
    ['Wiki', 13]
])
# 使用DataFrame构造函数创建数据帧
df = pd.DataFrame(ndarray_data, columns=['Site', 'Age'])
# 打印数据帧
print(df)
```

Pandas 可以使用 **loc** 属性返回指定行的数据

```py
data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}

# 数据载入到 DataFrame 对象
df = pd.DataFrame(data)

# 返回第一行,返回结果其实就是一个 Pandas Series 数据
'''
calories    420
duration     50
Name: 0, dtype: int64
'''
print(df.loc[0])
# 返回第二行
print(df.loc[1])

# 使用 [[ ... ]] 格式，返回多行数据
# 返回第一行和第二行，返回结果其实就是一个 Pandas DataFrame 数据
print(df.loc[[0, 1]])
```

指定索引值

```py
data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}
df = pd.DataFrame(data, index = ["day1", "day2", "day3"])
```

使用 **loc** 属性返回指定索引对应到某一行

```py
data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}
df = pd.DataFrame(data, index = ["day1", "day2", "day3"])
# 指定索引
print(df.loc["day2"])
```

### DataFrame 的属性和方法

```python
# DataFrame 的属性和方法

print(df.shape)     # 形状，两个数的数组，[行数，列数]
print(df.columns)   # 列名
print(df.index)     # 索引
print(df.head())    # 前几行数据，默认是前 5 行
print(df.tail())    # 后几行数据，默认是后 5 行
print(df.info())    # 数据信息
print(df.describe())# 描述统计信息
print(df.mean())    # 求平均值
print(df.sum())     # 求和
```

### DataFrame 增删改查

**访问列**：使用列名作为属性或通过 **.loc[]**、**.iloc[]** 访问，也可以使用标签或位置索引

```py
# 通过列名访问
print(df['Column1'])

# 通过属性访问
print(df.Name)     
   
# 通过 .loc[] 访问
print(df.loc[:, 'Column1'])

# 通过 .iloc[] 访问
print(df.iloc[:, 0])  # 带索引的

# 访问单个元素
print(df['Name'][0])
```

**访问行：**使用行的标签和 **.loc[]** 访问。

```py
# 第一行，列名为 Col1 的值
print(df.loc[0, 'col']) 
```

**修改列数据：**直接对列进行赋值

```py
df['Column1'] = [10, 11, 12]
```

**添加新列：**给新列赋值。

```py
df['NewColumn'] = [100, 200, 300]
```

**添加新行：**使用 loc、append 或 concat 方法。

```py
# 使用 loc 为特定索引添加新行
df.loc[3] = [13, 14, 15, 16]

# 使用 append 添加新行到末尾
new_row = {'Column1': 13, 'Column2': 14, 'NewColumn': 16}
df = df.append(new_row, ignore_index=True)
```

> **append()** 方法在 pandas 版本 1.4.0 中已经被标记为弃用,推荐使用 **concat()**

```py
# 使用concat添加新行
new_row = pd.DataFrame([[4, 7]], columns=['A', 'B'])  # 创建一个只包含新行的DataFrame
df = pd.concat([df, new_row], ignore_index=True)  # 将新行添加到原始DataFrame

```

**删除列：**使用 drop 方法。

```py
df_dropped = df.drop('Column1', axis=1)
```

**删除行：**同样使用 drop 方法。

```py
df_dropped = df.drop(0)  # 删除索引为 0 的行
```

### DataFrame 的统计分析

**描述性统计：**使用 **.describe()** 查看数值列的统计摘要。

```py
df.describe()
```

**计算统计数据：**使用聚合函数如 **.sum()、.mean()、.max()** 等。

```py
df['Column1'].sum()
df.mean()
```

### DataFrame 的索引操作

**重置索引：**使用 **.reset_index()**。

```py
df_reset = df.reset_index(drop=True)
```

**设置索引：**使用 **.set_index()**。

```py
df_set = df.set_index('Column1')
```

### DataFrame 的布尔索引

使用布尔表达式：根据条件过滤 DataFrame。

```py
df['Column1'] > 2 # 布尔数组
df[df['Column1'] > 2]
```

### DataFrame 的数据类型

查看数据类型：使用 **dtypes** 属性。

```py
df.dtypes
```

**转换数据类型：**使用 **astype** 方法。

```py
df['Column1'] = df['Column1'].astype('float64')
```

### DataFrame 的合并与分割

**合并：**使用 **concat** 或 **merge** 方法。

```py
# 纵向合并
pd.concat([df1, df2], ignore_index=True)

# 横向合并
pd.merge(df1, df2, on='Column1')
```

**分割：**使用 **pivot、melt** 或自定义函数。

```py
# 长格式转宽格式
df_pivot = df.pivot(index='Column1', columns='Column2', values='Column3')

# 宽格式转长格式
df_melt = df.melt(id_vars='Column1', value_vars=['Column2', 'Column3'])
```

### DataFrame 索引和切片

DataFrame 支持对行和列进行索引和切片操作。

```py
# 索引和切片
print(df[['Name', 'Age']]) # 提取多列
print(df[1:3])        # 切片行
print(df.loc[:, 'Name'])   # 提取单列
print(df.loc[1:2, ['Name', 'Age']]) # 标签索引提取指定行列
print(df.iloc[:, 1:])     # 位置索引提取指定列
```

## 四、Pandas CSV

### 读取与保存

Pandas 可以很方便的处理 CSV 文件，使用 **read_csv(file/url)** 方法读取文件或 url

```py
import pandas as pd

df = pd.read_csv('nba.csv')

print(df.to_string())
```

> **to_string()** 用于返回 DataFrame 类型的数据，如果不使用该函数，则输出结果为数据的前面 5 行和末尾 5 行，中间部分以 **...** 代替。

也可以使用 **to_csv()** 方法将 DataFrame 存储为 csv 文件:

```py
# 三个字段 name, site, age
name = ["Google", "Runoob", "Taobao", "Wiki"]
st = ["www.google.com", "www.runoob.com", "www.taobao.com", "www.wikipedia.org"]
ag = [90, 40, 80, 98]
   
# 字典
dict = {'name': name, 'site': st, 'age': ag} 
     
df = pd.DataFrame(dict)
  
# 保存 dataframe
df.to_csv('site.csv')
```

### 数据处理

**head( n )** 方法用于读取前面的 n 行，如果不填参数 n ，默认返回 5 行。

```py
df = pd.read_csv('nba.csv')
print(df.head())
print(df.head(10))
```

**tail( n )** 方法用于读取尾部的 n 行，如果不填参数 n ，默认返回 5 行，空行各个字段的值返回 NaN

```py
df = pd.read_csv('nba.csv')
print(df.tail())
```

**info()** 方法返回表格的一些基本信息

```py
df = pd.read_csv('nba.csv')
print(df.info())
```

## 五、Pandas Json

### 读取与保存

使用 **read_json(file/url)** 方法读取文件或 url

```py
import pandas as pd
df = pd.read_json('sites.json')
print(df.to_string())
```

> **to_string()** 用于返回 DataFrame 类型的数据，我们也可以直接处理 JSON 字符串

直接处理 json 数据

```py
data =[
    {
      "id": "A001",
      "name": "菜鸟教程",
      "url": "www.runoob.com",
      "likes": 61
    },
    {
      "id": "A002",
      "name": "Google",
      "url": "www.google.com",
      "likes": 124
    },
    {
      "id": "A003",
      "name": "淘宝",
      "url": "www.taobao.com",
      "likes": 45
    }
]
df = pd.DataFrame(data)

print(df)
```

可以使用  Python JSON 模块进行数据预处理

## 六、数据清洗

### Pandas 清洗空值

如果我们要删除包含空字段的行，可以使用 **dropna()** 方法，语法格式如下：

```py
DataFrame.dropna(axis=0, how='any', thresh=None, subset=None, inplace=False)
```

**注意：**默认情况下，dropna() 方法返回一个新的 DataFrame，不会修改源数据。

**参数说明：**

- axis：默认为 **0**，表示逢空值剔除整行，如果设置参数 **axis＝1** 表示逢空值去掉整列。
- how：默认为 **'any'** 如果一行（或一列）里任何一个数据有出现 NA 就去掉整行，如果设置 **how='all'** 一行（或列）都是 NA 才去掉这整行。
- thresh：设置需要多少非空值的数据才可以保留下来的。
- subset：设置想要检查的列。如果是多个列，可以使用列名的 list 作为参数。
- inplace：如果设置 True，将计算得到的值直接覆盖之前的值并返回 None，修改的是源数据。

我们可以通过 **isnull()** 判断各个单元格是否为空。

```py
df = pd.read_csv('property-data.csv')

print (df['NUM_BEDROOMS'])
print (df['NUM_BEDROOMS'].isnull())
```

指定空数据的值:

```py
missing_values = ["n/a", "na", "--"]
df = pd.read_csv('property-data.csv', na_values = missing_values)

print (df['NUM_BEDROOMS'])
print (df['NUM_BEDROOMS'].isnull())
```

删除包含空数据的行

```py
df = pd.read_csv('property-data.csv')
new_df = df.dropna()
print(new_df.to_string())
```

删除指定列有空值的行

```py
df = pd.read_csv('property-data.csv')
df.dropna(subset=['ST_NUM'], inplace = True)
print(df.to_string())
```

使用 **fillna()** 方法替换空字段

```py
df = pd.read_csv('property-data.csv')
df.fillna(12345, inplace = True) # 用 12345 替换空字段
print(df.to_string())
```

指定某一个列来替换数据

```py
df = pd.read_csv('property-data.csv')
df['PID'].fillna(12345, inplace = True)
print(df.to_string())
```

替换空单元格的常用方法是计算列的 **均值**、**中位数**值 或 **众数**

Pandas使用 **mean()**、**median()** 和 **mode()** 方法计算列的均值、中位数值和众数。

```py
df = pd.read_csv('property-data.csv')
x = df["ST_NUM"].mean() # x = df["ST_NUM"].median()，x = df["ST_NUM"].mode()
df["ST_NUM"].fillna(x, inplace = True)
print(df.to_string())
```

### Pandas 清洗格式错误数据

可以通过包含空单元格的行，或者将列中的所有单元格转换为相同格式的数据

以下实例会格式化日期：

```py
# 第三个日期格式错误
data = {
  "Date": ['2020/12/01', '2020/12/02' , '20201226'],
  "duration": [50, 40, 45]
}

df = pd.DataFrame(data, index = ["day1", "day2", "day3"])
df['Date'] = pd.to_datetime(df['Date'], format='mixed')
'''
       Date  duration
day1 2020-12-01        50
day2 2020-12-02        40
day3 2020-12-26        45
'''
print(df.to_string())
```

### Pandas 清洗错误数据

对错误的数据进行 **替换** 或 **移除**

手动替换

```py
person = {
  "name": ['Google', 'Runoob' , 'Taobao'],
  "age": [50, 40, 12345]    # 12345 年龄数据是错误的
}
df = pd.DataFrame(person)
df.loc[2, 'age'] = 30 # 修改数据
print(df.to_string())
```

设置条件语句

```py
# 将 age 大于 120 的设置为 120
person = {
  "name": ['Google', 'Runoob' , 'Taobao'],
  "age": [50, 200, 12345]    
}
df = pd.DataFrame(person)

for x in df.index:
  if df.loc[x, "age"] > 120:
    df.loc[x, "age"] = 120
print(df.to_string())
```

将错误数据的行删除

```py
# 将 age 大于 120 的删除
person = {
  "name": ['Google', 'Runoob' , 'Taobao'],
  "age": [50, 40, 12345]    # 12345 年龄数据是错误的
}
df = pd.DataFrame(person)
for x in df.index:
  if df.loc[x, "age"] > 120:
    df.drop(x, inplace = True)
print(df.to_string())
```

### Pandas 清洗重复数据

要清洗重复数据，可以使用 **duplicated()** 和 **drop_duplicates()** 方法

如果对应的数据是重复的，**duplicated()** 会返回 True，否则返回 False。

```py
person = {
  "name": ['Google', 'Runoob', 'Runoob', 'Taobao'],
  "age": [50, 40, 40, 23]  
}
df = pd.DataFrame(person)
'''
0    False
1    False
2     True
3    False
dtype: bool
'''
print(df.duplicated())
```

删除重复数据，可以直接使用 **drop_duplicates()** 方法。

```py
DataFrame.drop_duplicates(subset=None, keep='first', inplace=False)
```

- subset : 用来指定特定的列，默认所有列
- keep : 默认 first，删除重复项并保留第一次出现的项，可选值为 {‘first’, ‘last’, False},
- inplace :默认 False ，返回新的 DataFrame，否则修改原来的数据

```py
persons = {
  "name": ['Google', 'Runoob', 'Runoob', 'Taobao'],
  "age": [50, 40, 40, 23]  
}
df = pd.DataFrame(persons)
df.drop_duplicates(inplace = True)
'''
     name  age
0  Google   50
1  Runoob   40
3  Taobao   23
'''
print(df)
```

## 七、常用函数

### 数据结构

- 重命名列：

  ```py
  Dataframe.rename(mapper=None, index=None, columns=None, axis=None, copy=True, inplace=False, level=None, errors='raise')
  ```

  ```py
  df = df.rename(
          columns={
              "id": "student_id",
              "first": "first_name",
              "last": "last_name",
              "age": "age_in_years",
          }
      )
  ```

- 改变数据类型

  ```py
  DataFrame.astype(dtype, copy=True, errors='raise')
  ```

  - dtype： 它是一种数据类型，或列名->数据类型的字典。
  - copy： 默认情况下，astype 总是返回新分配的对象。如果 copy 设置为 False，则只有在旧对象无法强制转换为所需类型的情况下才会创建新对象。
  - errors： 控制对提供的数据类型的无效数据引发异常。默认设置为 raise，表示会引发异常。

  ```py
  students = students.astype({'grade': int})
  ```

- 数据透视（行变列）

  pivot 函数： 在 pandas 中 pivot 函数被用来基于列的值重塑数据并且在外部得到一个新的 DataFrame。pivot 采用我们将使用的以下参数：

  - index： 确定新 DataFrame 中的行。
  - columns： 确定新 DataFrame 中的列。
  - values： 指定重塑表格时要使用的值。

  ```python
  new_df = df.pivot(index='month', columns='city', values='temperature')
  ```

- 数据融合（列变行）

  melt 函数: pandas 的 `melt` 函数用于转换或重塑数据。它将 DataFrame 从宽格式(列表示多个变量)更改为长格式(每行表示一个唯一变量)

  melt 函数参数定义：

  - id_vars：指定应该保持不变的列。
  - value_vars：指定要“melt”或将其整形成行的列。
  - var_name：这是将存储来自 value_vars 的标头名称的新列的名称。
  - value_name：这是将存储 value_vars 中的值的新列的名称。

  ```py
  new_df = df.pivot(index='month', columns='city', values='temperature')
  ```

### 读取数据

| 函数                                  | 说明                       |
| :------------------------------------ | :------------------------- |
| pd.read_csv(filename)                 | 读取 CSV 文件；            |
| pd.read_excel(filename)               | 读取 Excel 文件；          |
| pd.read_sql(query, connection_object) | 从 SQL 数据库读取数据；    |
| pd.read_json(json_string)             | 从 JSON 字符串中读取数据； |
| pd.read_html(url)                     | 从 HTML 页面中读取数据。   |

```py
import pandas as pd

# 从 CSV 文件中读取数据
df = pd.read_csv('data.csv')

# 从 Excel 文件中读取数据
df = pd.read_excel('data.xlsx')

# 从 SQL 数据库中读取数据
import sqlite3
conn = sqlite3.connect('database.db')
df = pd.read_sql('SELECT * FROM table_name', conn)

# 从 JSON 字符串中读取数据
json_string = '{"name": "John", "age": 30, "city": "New York"}'
df = pd.read_json(json_string)

# 从 HTML 页面中读取数据
url = 'https://www.runoob.com'
dfs = pd.read_html(url)
df = dfs[0] # 选择第一个数据框
```

### 查看数据

| 函数          | 说明                                                       |
| :------------ | :--------------------------------------------------------- |
| df.head(n)    | 显示前 n 行数据；                                          |
| df.tail(n)    | 显示后 n 行数据；                                          |
| df.info()     | 显示数据的信息，包括列名、数据类型、缺失值等；             |
| df.describe() | 显示数据的基本统计信息，包括均值、方差、最大值、最小值等； |
| df.shape      | 显示数据的行数和列数。                                     |

```py
# 显示前五行数据
df.head()

# 显示后五行数据
df.tail()

# 显示数据信息
df.info()

# 显示基本统计信息
df.describe()

# 显示数据的行数和列数
df.shape
```

### 数据清洗

| 函数                             | 说明                     |
| :------------------------------- | :----------------------- |
| df.dropna()                      | 删除包含缺失值的行或列； |
| df.fillna(value)                 | 将缺失值替换为指定的值； |
| df.replace(old_value, new_value) | 将指定值替换为新值；     |
| df.duplicated()                  | 检查是否有重复的数据；   |
| df.drop_duplicates()             | 删除重复的数据。         |

```py
# 删除包含缺失值的行或列
df.dropna()

# 将缺失值替换为指定的值
df.fillna(0)

# 将指定值替换为新值
df.replace('old_value', 'new_value')

# 检查是否有重复的数据
df.duplicated()

# 删除重复的数据
df.drop_duplicates()
```

### 数据选择和切片

| 函数                                          | 说明                         |
| :-------------------------------------------- | :--------------------------- |
| df[column_name]                               | 选择指定的列；               |
| df.loc[row_index, column_name]                | 通过标签选择数据；           |
| df.iloc[row_index, column_index]              | 通过位置选择数据；           |
| df.ix[row_index, column_name]                 | 通过标签或位置选择数据；     |
| df.filter(items=[column_name1, column_name2]) | 选择指定的列；               |
| df.filter(regex='regex')                      | 选择列名匹配正则表达式的列； |
| df.sample(n)                                  | 随机选择 n 行数据。          |

```py
# 选择指定的列
df['column_name']

# 通过标签选择数据
df.loc[row_index, column_name]

# 通过位置选择数据
df.iloc[row_index, column_index]

# 通过标签或位置选择数据
df.ix[row_index, column_name]

# 选择指定的列
df.filter(items=['column_name1', 'column_name2'])

# 选择列名匹配正则表达式的列
df.filter(regex='regex')

# 随机选择 n 行数据
df.sample(n=5)
```

### 数据排序

| 函数                                                         | 说明                 |
| :----------------------------------------------------------- | :------------------- |
| df.sort_values(column_name)                                  | 按照指定列的值排序； |
| df.sort_values([column_name1, column_name2], ascending=[True, False]) | 按照多个列的值排序； |
| df.sort_index()                                              | 按照索引排序。       |

```py
# 按照指定列的值排序
df.sort_values('column_name')

# 按照多个列的值排序
df.sort_values(['column_name1', 'column_name2'], ascending=[True, False])

# 按照索引排序
df.sort_index()
```

### 数据分组和聚合

| 函数                                            | 说明                         |
| :---------------------------------------------- | :--------------------------- |
| df.groupby(column_name)                         | 按照指定列进行分组；         |
| df.aggregate(function_name)                     | 对分组后的数据进行聚合操作； |
| df.pivot_table(values, index, columns, aggfunc) | 生成透视表。                 |

```py
# 按照指定列进行分组
df.groupby('column_name')

# 对分组后的数据进行聚合操作
df.aggregate('function_name')

# 生成透视表
df.pivot_table(values='value', index='index_column', columns='column_name', aggfunc='function_name')
```

### 数据合并

| 函数                               | 说明                             |
| :--------------------------------- | :------------------------------- |
| pd.concat([df1, df2])              | 将多个数据框按照行或列进行合并； |
| pd.merge(df1, df2, on=column_name) | 按照指定列将两个数据框进行合并。 |

```py
# 将多个数据框按照行或列进行合并
df = pd.concat([df1, df2])

# 按照指定列将两个数据框进行合并
df = pd.merge(df1, df2, on='column_name')
```

### 数据选择和过滤

| 函数                                 | 说明                                   |
| :----------------------------------- | :------------------------------------- |
| df.loc[row_indexer, column_indexer]  | 按标签选择行和列。                     |
| df.iloc[row_indexer, column_indexer] | 按位置选择行和列。                     |
| df[df['column_name'] > value]        | 选择列中满足条件的行。                 |
| df.query('column_name > value')      | 使用字符串表达式选择列中满足条件的行。 |

### 数据统计和描述

| 函数          | 说明                                                 |
| :------------ | :--------------------------------------------------- |
| df.describe() | 计算基本统计信息，如均值、标准差、最小值、最大值等。 |
| df.mean()     | 计算每列的平均值。                                   |
| df.median()   | 计算每列的中位数。                                   |
| df.mode()     | 计算每列的众数。                                     |
| df.count()    | 计算每列非缺失值的数量。                             |

## 八、相关性分析

据相关性是一项重要的分析任务，它帮助我们理解数据中各个变量之间的关系

Pandas 使用 **corr()** 方法计算数据集中每列之间的关系

```py
df.corr(method='pearson', min_periods=1)
```

- **method** (可选): 字符串类型，用于指定计算相关系数的方法。默认是 'pearson'，还可以选择 'kendall'（Kendall Tau 相关系数）或 'spearman'（Spearman 秩相关系数）。
- **min_periods** (可选): 表示计算相关系数时所需的最小观测值数量。默认值是 1，即只要有至少一个非空值，就会进行计算。如果指定了 `min_periods`，并且在某些列中的非空值数量小于该值，则相应列的相关系数将被设为 NaN。

**df.corr()** 方法返回一个相关系数矩阵，矩阵的行和列对应数据框的列名，矩阵的元素是对应 **列之间的相关系数**。

常见的相关性系数包括 Pearson 相关系数和 Spearman 秩相关系数：

- **Pearson 相关系数:** 即皮尔逊相关系数，用于衡量了两个变量之间的线性关系强度和方向。它的取值范围在 -1 到 1 之间，其中 -1 表示完全负相关，1 表示完全正相关，0 表示无线性相关。可以使用 **corr()** 方法计算数据框中各列之间的 Pearson 相关系数。
- **Spearman 相关系数：**即斯皮尔曼相关系数，是一种秩相关系数。用于衡量两个变量之间的单调关系，即不一定是线性关系。它通过比较变量的秩次来计算相关性。可以使用 **corr(method='spearman')** 方法计算数据框中各列之间的 Spearman 相关系数。

## 九、其他函数

### 一般函数

#### [pandas.get_dummies](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.get_dummies.html#pandas-get-dummies)

独热编码，将值用 0,1 表示
