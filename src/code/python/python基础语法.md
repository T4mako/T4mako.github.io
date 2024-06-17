---
title: Python 基础语法
icon: python
---

<!-- more -->

## 1、数据类型、变量

### 基本概念

- Number（数字）
  - int
  - float
  - complex（复数）
  - bool

- String（字符串）
- List（有序可变序列）
- Tuple（有序不可变序列）
- Set（无序不重复集合）
- Dictionary（无序 k-v 集合）

`type()` 方法查看字面量、变量类型信息

在 python 中，变量没有类型，变量存储的值有类型

### 类型转换

- int(x) 将 x 转换为整数
- float(x) 将 x 转换为浮点数
- str(x) 将 x 转换为字符串
- list(x) 将 x 转换为列表
- tuple(x) 将 x 转换为元组
- set(x) 将 x 转换为集合

### 变量

局部变量：方法中的变量  
全局变量：外面定义的变量

在方法中获取全局变量，使用 global 关键字

```python
num = 100
def func1():
	print(num)

def func2():
    global num # 获取全局变量 num
    num = 200 # 修改全局变量的值
    print(num)

def func3():
    num = 300 # 新的局部变量
    print(num)
```

### Number（数字）

 int、float、bool、complex（复数）

- 整型(Int) 
- 长整型(long integers) - 最后是一个大写或小写的 L
- 浮点型
- 复数(complex numbers) - 可以用 a + bj ,或者complex(a,b) 表示， a 和 b 都是浮点型

我们可以使用十六进制和八进制来代表整数：

```python
>>> number = 0xA0F # 十六进制
>>> number
2575

>>> number=0o37 # 八进制
>>> number
31
```

bool 是 int 的子类，True 和 False 可以和数字相加

```python
True==1 #True
False==0 #True
```

### 容器

容器通用操作:  

- `max()`
- `min()`
- `len()`
- `sorted(x,[reverse=True])` 返回 list 对象

#### String（字符串）

字符串时 **不可修改** 的

字符串三种定义方式：

单引号定义法：`name = 't'`  
双引号定义法：`name = "t"`  
三引号定义法：`name = """t""" or name = '''t'''`

字符串中包含引号：

```python
name1 = '"aaa"'
name2 = "'bbb'"
name3 = "\"ccc\""
```

字符串拼接：

```python
name1 = 'a'
print('11' + name1)
```

:::info

字符串只能与字符串拼接，不能与其他数据类型拼接

:::

字符串格式化：

- %s：将内容转换为字符串占位
- %d：将内容转换为整数占位
- %f：将内容转换为浮点数占位
  - %m.nf：  
    m：数据宽度，右补空格  
    n：数据精度，**四舍五入**

```python
a = 123
b = 123.5
print("haha%shaha%s" % (a,b))
# 格式化表达式
print("a+b:%d" % (a+b))
```

快速格式化（模板字符串）：  
使用 f （format）作为标记

```python
name = "aa"
i = 123
print(f"haha{name}wowo{i}gaga")
```

方法

```python
my_str = "abcdefghabc"

# 查找字符串的起始下标
my_str.index("cde")

# 替换所有 str1 为 str2 并返回新字符串
new_str = my_str.replace("a","bc")

# 字符串分割，返回 list
my_str.split("b")

# 去除首位空格
my_str.strip()

# 取出首尾内容
my_str.strip("abc") # 包含 a、b、c 都去除

# 字符串出现次数
my_str.count("abc")

# 长度
len(my_str)
```

#### List（列表）

list 可以存储不同类型数据

定义

```py
# 字面量
[e1,e2,e3...]

# 定义变量
list_name = [e1,e2...]

# 定义空列表
list_name = []
list_name = list()
```

常用方法：

```python
a = [1,2,3,4,5]

# 元素数量
len(a)

# 判断元素是否在列表中
1 in a #True

# 最大值
max(a)

# 最小值
min(a)

# 添加元素到最后位置
a.append(1)

# 将 5 插入下标为 1 的位置
a.insert(1,5)

# 元素出现次数
a.count(1) 

# 列表扩展（多个元素）
a.extend([1,2,3]) 

# 值的索引
a.index(1) 

# 删除元素（下标）
del a[0]

# 删除元素（元素）
a.remove(obj)

# 取出元素并删除
num = a.pop(-2)

# 清空列表
a.clear()

# 反转
a.reverse()

#list.sort(cmp=None, key=None, reverse=False)
#cmp -- 可选参数, 如果指定了该参数会使用该参数的方法进行排序。
#key -- 主要是用来进行比较的元素，只有一个参数，具体的函数的参数就是取自于可迭代对象中，指定可迭代对象中的一个元素来进行排序。
#reverse -- 排序规则，reverse = True 降序， reverse = False 升序（默认）。
a.sort(reverse = True) #降序排列
```

遍历

```py
i = 0
while i < len(my_list):
    print(my_list[i])
    i += 1

for ele in my_list:
    print(ele)
```

#### Tuple（元组）

元组与 list 相同，但 **不可修改**

定义

```py
# 字面量
(e1,e2...)

# 变量
name = (e1,e2...)

# 定义空元组
name = ()
name = tuple()

# 定义单个元素的元组（添加 , ）
name = (1,)
```

方法

```python
# 返回元素索引
tuple_name.index(e)

# 统计元素出现次数
tuple_name.count(e)

# 长度
len(tuple_name)
```

string、list 和 tuple 都属于 sequence（序列）。
元祖不可以进行的操作：append，insert，pop，del，remove......

#### 切片操作

语法：`序列[起始下标:结束下标:步长]`  
起始和结束不写表示从头到尾，步长为 1 

```python
my_str = "abcdefg"
res1 = my_str[1:5]
res2 = my_str[::2]
res3 = my_str[::-1]
```

#### Set（集合）

set 无重复，无序

定义

```py
# 字面量
{e1,e2...}
# 遍历那个
s = {e1,e2...}
# 空集合
s = set()
```

set 不支持下标索引

方法

```python
# 添加
my_set.add("abc")

# 移除
my_set.remove("abc")

# 随机删除并取出
s = my_set.pop()

# 清空集合
my_set.clear()

# 差集（s1 有 s2 没有）
s1.difference(s2)

# 消除差集（s1 删除 s2 中相同的）
s1.difference_update(s2)

# 合并集合
s3 = s1.union(s2)

# 元素数量 len()
len(s1)

# 遍历集合
for e in s1:
    print(e)
```

#### Dictionary（字典）

字典存储 k-v，key 不可重复，类型不可以是字典

定义

```py
# 字面量
{k1:v1,k2:v2,...}

# 变量
d1 = {k1:v1,k2:v2,...}

# 空字典
d1 = {}
d1 = dict()

# 根据 k 获取 v
v1 = d1[k1]
```

方法

```python
# 新增、修改
d1[k] = v

# 删除元素
d1.pop(k)

# 清空元素
d1.clear()

# 获取所有 k
ks = d1.keys()

# 遍历
for k in d1:
    print(f"k of d1:{k},v fo d1:{di[k]}")

# 元素数量
len(d1)
```

| 序号 | 函数及描述                                                   |
| :--- | :----------------------------------------------------------- |
| 1    | dict.clear() 删除字典内所有元素                              |
| 2    | dict.copy() 返回一个字典的浅复制                             |
| 3    | dict.fromkeys(seq[, val\]) 创建一个新字典，以序列 seq 中元素做字典的键，val 为字典所有键对应的初始值 |
| 4    | dict.get(key, default=None)返回指定键的值，如果值不在字典中返回default值 |
| 5    | dict.has_key(key) 如果键在字典dict里返回true，否则返回false  |
| 6    | dict.items() 以**列表返回可遍历的(键, 值) 元组数组**  转换成list还需强转 |
| 7    | dict.keys() 以列表返回一个字典所有的键                       |
| 8    | dict.setdefault(key, default=None) 和get()类似, 但如果键不存在于字典中，将会添加键并将值设为default |
| 9    | dict.update(dict2)把字典dict2的键/值对更新到dict里           |
| 10   | dict.values()以列表返回字典中的所有值                        |
| 11   | pop(key[,default\])删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。 否则，返回default值。 |
| 12   | popitem()返回并删除字典中的最后一对键和值。                  |

## 2、注释，输出输出

```python
# 这是一个注释
'''
这是多行注释，用三个单引号
这是多行注释，用三个单引号 
这是多行注释，用三个单引号
'''
"""
这是多行注释，用三个双引号
这是多行注释，用三个双引号 
这是多行注释，用三个双引号
"""

a = 10
b = "aaa"
print("A:",b,"10",a)

# 不换行
print("fff",end='')
```

输入

```python
a = input("请输入")
```

## 3、运算符

**python 无自增自减**

算数运算符：+、-、*、/、//、%，**

赋值运算符：=、+=、-= ....

比较运算符：>、<、>=、<=、==、!=

逻辑运算符：

| and     | x and y    | 布尔"与" - 如果 x 为 False，x and y 返回 x 的值，否则返回 y 的计算值。 | (a and b) 返回 20。         |
| ------- | ---------- | ------------------------------------------------------------ | --------------------------- |
| **or**  | **x or y** | **布尔"或" - 如果 x 是 True，它返回 x 的值，否则它返回 y 的计算值。** | **(a or b) 返回 10。**      |
| **not** | **not x**  | **布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。** | **not(a and b) 返回 False** |

Python成员运算符：

除了以上的一些运算符之外，Python还支持成员运算符，测试实例中包含了一系列的成员，包括字符串，列表或元组。

| 运算符 | 描述                                                    | 实例                                              |
| :----- | :------------------------------------------------------ | :------------------------------------------------ |
| in     | 如果在指定的序列中找到值返回 True，否则返回 False。     | x 在 y 序列中 , 如果 x 在 y 序列中返回 True。     |
| not in | 如果在指定的序列中没有找到值返回 True，否则返回 False。 | x 不在 y 序列中 , 如果 x 不在 y 序列中返回 True。 |

```python
a = 10
b = 20
list = [1, 2, 3, 4, 5 ]
 
if ( a in list ):
   print ("1 - 变量 a 在给定的列表中 list 中")
else:
   print ("1 - 变量 a 不在给定的列表中 list 中")
 
if ( b not in list ):
   print ("2 - 变量 b 不在给定的列表中 list 中")
else:
   print ("2 - 变量 b 在给定的列表中 list 中")
 
## 修改变量 a 的值
a = 2
if ( a in list ):
   print ("3 - 变量 a 在给定的列表中 list 中")
else:
   print ("3 - 变量 a 不在给定的列表中 list 中")
```

Python身份运算符：

身份运算符用于比较两个对象的存储单元
 **id()** 函数用于获取对象内存地址。

| 运算符 | 描述                                        | 实例                                                         |
| :----- | :------------------------------------------ | :----------------------------------------------------------- |
| is     | is 是判断两个标识符是不是引用自一个对象     | **x is y**, 类似 **id(x) == id(y)** , 如果引用的是同一个对象则返回 True，否则返回 False |
| is not | is not 是判断两个标识符是不是引用自不同对象 | **x is not y** ， 类似 **id(x) != id(y)**。如果引用的不是同一个对象则返回结果 True，否则返回 False。 |

## 4、分支循环

### 1、IF

```python
if 判断条件：
    执行语句……
else：
    执行语句……
    
if 判断条件1:
    执行语句1……
elif 判断条件2:
    执行语句2……
elif 判断条件3:
    执行语句3……
else:
    执行语句4……
```

### 2、While

```python
while 判断条件(condition)：
    执行语句(statements)……
    
count = 0
while (count < 9):
   print 'The count is:', count
   count = count + 1
 
print "Good bye!"
```

### 3、For

#### range 语句

range：获取一个数据序列

- range(num)

  获取从 [0,num) 的整数序列

- range(num1,num2)

  获取 [num1,num2) 的整数序列

- range(num1,num2,setp)

```python
for iterating_var in sequence:
   statements(s)

for i in range(10):
    print(i)
for i in "abcdefg":
    print(i)
a = [1,2,5,8,89398,"qqq"]
for i in range(len(a)):
    print(a[i])
```

### 4、break，continue

```python
a = [1,2,5,8,89398,"qqq"]
for i in range(len(a)):
    if(i == 8):
        break;
    if(i == 5):
        continue
    else:
        print(a[i])
```

### 5、pass

**pass** 不做任何事情，一般用做占位语句。

```python
## 输出 Python 的每个字母
for letter in 'Python':
   if letter == 'h':
      pass
      print '这是 pass 块'
   print '当前字母 :', letter
print "Good bye!"
```

## 5、函数

#### 函数定义：  

若无返回值，默认返回 None（相当于 null，判断为 False）

```python
def 函数名(参数列表):
    """
    函数说明
    :param x: 新参 x 的说明
    :return: 返回值的说明
    """
    函数体
    return 返回值
```

#### 函数参数

- 位置参数

  调用函数时，根据函数定义的参数位置进行参数传递

- 关键字参数

  调用函数时，可以通过 `键 = 值` 的形式传递参数  
  如果有位置参数，位置参数要在关键字参数前面

  ```py
  def func(name,age):
  	return 0
  
  func(age=10,name="abc")
  ```

- 缺省参数（默认参数）

  为参数提供默认值，位置参数必须在默认参数前

  ```py
  def func(name.gender="男"):
      return 0
  ```

- 不定长参数

  位置传递（元组存储）

  ```py
  def func(*args):
  	return 0
  
  func(1,2,"abc")
  ```

  关键字传递（字典存储）

  ```py
  def func(**kwargs):
      return 0
  
  func(name="abc",age=11)
  ```

#### 函数的多返回值  

函数可以有多个返回值：

```py
def func():
	return 1,"abc",3

x,y,z = func()
```

#### 函数作为参数传递

```py
def compute(x,y):
	return x + y

def func(compute):
    res = compute(1,2)
    return res
```

#### lambda 定义匿名函数

`lambda 传入参数 : 函数体（一行）`

```py
def func(compute):
    res = compute(1,2)
    print(res)

func(lambda x,y : x + y)
```



## 6、输入输出

```python
#print
print("123")
print('''4654
45665
46545879''')

a = inpute("plz input a number:")
a = input("plz inpute a number:")
print("haha:",eval(a)*5.5)
b = eval(input("in"))
print(b+b)

c = 15 / 100
print(format(c,".2%")) #15.00% 两位小数，百分数形式

a = "aaa"
b = "bbb"
print("{0}A{1}B".format(a,b))

#加了星号 * 的参数会以元组(tuple)的形式导入，存放所有未命名的变量参数。
def printinfo( arg1, *vartuple ):
   "打印任何传入的参数"
   print ("输出: ")
   print (arg1)
   print (vartuple)
 
## 调用printinfo 函数
printinfo( 70, 60, 50 )

#加了两个星号 ** 的参数会以字典的形式导入。
def printinfo( arg1, **vardict ):
   "打印任何传入的参数"
   print ("输出: ")
   print (arg1)
   print (vardict)
## 调用printinfo 函数
printinfo(1, a=2,b=3)
```

## 7、文件

### open() 

- `open(name,code,encoding)` 打开、创建一个新文件
  - name：目标文件路径
  - code：
    - 只读 r
    - 写入 w，文件不存在则创建，文件存在则清空
    - 追加 a，文件不存在则创建，文件存在则追加
  - encoding：编码格式（非第三个位置，不能使用位置参数），推荐 UTF-8

```py
f = open("D:/a.txt","r",encoding="UTF-8")
```

###   read()、readlines()、readline()、for

- read(字节数)，不给参数代表全部内容

  ```py
  print(f.read())
  ```

- readlines()，读取所有内容，返回一个列表

  ```py
  print(f.readlines())
  ```

- readline()，每次读取一行内容

  ```py
  print(f.readline())
  ```

- 使用 for 循环读取文件

  ```py
  for line in f：
  	print(f)
  ```

###  close()、with open()

close() 文件关闭

with open() as f 自动文件关闭

```py
f.close()

with open("D:/a.txt","r",encoding="UTF-8") as f:
    print(f.readlines())
```

### write()、flush()

write()：将内容写入到内存中

flush()：将内存中的内容写入到文件中

```py
f = open("D:/a.txt","w",encoding="UTF-8")
f.write("abc")
f.flush()
f.close() # close 内置 flush 功能
```

## 8、异常、模块、包

### 捕获异常

基本语法，捕获所有异常：

```py
try:
	代码
except:
    代码
    
try:
	代码
except Exception as e:
    代码
```

捕获指定异常

```py
try:
    代码
except xxxError as e:
    代码
```

捕获多个异常

```py
try:
    代码
except (xxxError,xxxError) as e:
    代码
```

else 与 finally

```py
try:
    代码
except (xxxError,xxxError) as e:
    代码
else:
    没有异常代码
finally:
    都会执行代码
```

### 模块

模块（module）就是一个 .py 文件，内部可以定义类、变量、函数...

导入的语法：  
`[from 模块名] import [模块 | 类 | 变量 | 函数 | *] [as 别名]`

```py
import time # 导入 time 模块
from time import sleep # 导入 time 模块的 sleep 功能
from time import * # 导入 time 模块的所有功能柜
import time as t
```

自定义模块

```py
# my.py
def func():
	return 0

# other.py
import my
my.func()
```

### 内置变量  \_\_main\_\_、\_\_all\_\_

python 文件中有内置变量 \_\_main\_\_，当运行文件时，改变量的值自动设为 \_\_main\_\_

```py
if __main__ == "__main__"
```

如果一个 python 文件中有 \_\_all\_\_ 变量，当使用  `from xxx import *` 导入模块时，只能导入这个列表中的元素

```py
__all__ = ['func1']

def func1():
    return 0

def func2():
    return 1
```

### python 包

包是一个文件夹，它包含 \_\_init\_\_.py 文件，该文件夹可用于包含多个模块文件。从逻辑上看，包的本质仍然是模块

\_\_init\_\_.py 文件表示一个文件夹是 python 的包而非普通文件夹

## 9、面向对象

### 定义类

定义成员方法时，必须添加 self 关键字，它表示类对象自身，用于访问成员变量，调用时可以忽略

```py
class 类名:
    # 属性
    name = None
    # 方法
    def func(self):
        print(f"{self.name}")
```

### 对象的创建

```py
对象名 = 类名()
```

### 构造方法

python 类使用 `__init__()` 方法作为构造方法，创建对象时会自动创建。

通过构造方法可以省略 **属性的定义**

```py
class Stu:
    name = None
    # 构造方法
    def __init__(self,name,age):
        self.name = name
        self.age = age
```

### 魔数方法（类内置方法）

- `__init__(self)`：构造方法

- `__str__(self)`：将对象转换为字符串，类似 toString

  ```py
  def __str__(self):
      return f"name:{self.name}"
  ```

- `__lt__(self,other)`：比较对象，other 为另一个对象，用于 >、< 符号的比较

  ```py
  def __lt__(self,other):
      return self.age < other.age
  ```

- `__le__(self,other)`：用于 >=、<= 符号的比较

  ```py
  def __le__(self,other):
      return self.age <= other.age
  ```

- `__eq__(self,other)`：用于 == 符号的比较

  ```py
  def __eq__(self,other):
      return self.age == other.age
  ```

### 封装

私有成员变量和私有方法的定义：命名以两个下划线 **`__` 开头**

```py
def __name
def __func(self):
	print(1)
```

### 继承

#### 单继承

`class 子类名(父类名)`

```py
class father:
    name = None

class son(father):
    sname = None
```

#### 多继承

`class 子类名(父类名,父类名...)`

当子类没有什么补充的功能，可以在类体中编写 `pass`（可以用于编写抽象类）

```py
class son(fa1,fa2):
    pass
```

当输出同名的属性与方法时，按照 **谁先继承** 谁优先级最高

### 复写

子类可以复写父类的属性和方法

```py
class fa:
    name = None
    def func(self):
        print(0)

class son(fa):
    name = 123
    def func(self):
        print(1)
```

如果要调用父类的变量与方法：

- 父类名.成员变量
- 父类名.成员方法(self)
- super().成员变量
- super().成员方法()

```py
class son:
    name = "son"
    def func(self):
        Father.name
        Father.func(self) # 需要 self
        super.name
        super.func() # 不需要 self
```

### 类型注解

#### 类型注解

为变量声明类型，注意：

- 元组声明类型需要将所有类型列出
- 字典设置类型要两个

```py
m_list: list = [1,2,3]
m_tuple: tuple = (1,2,3)
m_list: list[int] = [1,2,3]
m_tuple: tuple[int,str,bool] = (True,10,"abc")
m_set: set[str] = {"a","b"}
m_dict:dict[str,int] = {"a":10}

stu: Student = Student()
```

#### 注释类型注解

在注释中进行类型注解，语法：`#type:类型`

```py
v1 = random.randint(1,10) # type: int
v2 = json.loads(data) # type: dict[str,int]
v3 = func() # type: Student
```

#### 函数与方法的类型注解

```py
def 函数方法名(形参名: 类型,形参名: 类型...) -> 返回值类型:
    pass
```

#### Union 类型

Union 用于表示联合类型

Union 的导入：`from typing import Union`

```py
my_list: list[Union[str,int]] = [1,2,"abc"]
my_dict: dict[str,Union[str,int]] = {"name":"abc","age":20}
def func(data: Union[int,str]) -> Union[int,str]:
    pass
```

### 多态



## 10、闭包

全局变量在代码命名空间上不够干净并有被修改的风险

使用函数的嵌套完成闭包的需求

### 简单闭包：

```py
def outer(o):
    def inner(i):
        print(f"{o},{i}")
    return inner

fn1 = outer("a")
fn1("b") # a,b
```

### nonlocal

使用 nonlocal 关键字修饰外部函数的变量可以使得内部函数修改该变量

```py
def outer(o):
    def inner(i):
        nonlocal o
        o += i
        print(f"{o},{i}")
    return inner

fn1 = outer("a")
fn1("b") # ab,b
```

闭包的优点：

- 无需定义全局变量
- 闭包使用的变量难以被错误的修改

缺点：

- 内部函数持续引用外部函数值，会导致一部分内存空间不被释放



## 11、装饰器

在一个方法前后调用其他方法

装饰器的一般写法

```py
def task():
    print("working")

def outer(func):
    def inner():
        print("pre")
        func()
        print("after")
    return inner
    
fn = outer(task)
fn()
```

快捷写法（语法糖）：

```py
@outer
def task():
    print("working")

def outer(func):
    def inner():
        print("pre")
        func()
        print("after")
    return inner

task()
```

## 12、设计模式

### 单例模式

实现

```py
# single.py
class single:
    pass

singleObj = single()

# test.py
from single.py import singleObj
s1 = singleObj
s2 = singleObj
print(id(s1))
print(id(s2))
```

### 工厂模式

```py
class Person:
    pass
class Student(Person):
    pass
class Teacher(Person):
    pass

class Factory:
    def get_p(self,p_type):
        if(p_type == 's'):
            return Student()
        elif(p_type == 't'):
            return Teacher()
        
f = Factory
s = f.get_p('s')
t = f.get_p('t')
```

## 13、多线程

python 多线程可以通过 threading 模块实现

使用：

`thread_obj = threading.Thread(group,target,name,args,kwargs)`

- group：暂时无用，预留参数
- target：执行任务名
- args：元组方式给执行任务传参
- kwargs：字典方式给执行任务传参
- nane：线程名

```py
import time,threading
def sing():
    while True:
        print("aaa")
        time.sleep(1)
        
def dance():
    while True:
        print("bbb")
        time.sleep(1)
        
if __name__ == '__main__':
    # 唱歌线程
    sing_thread = threading.Thread(target=sing)
    # 跳舞线程
    dance_thread = threading.Thread(target=dance)
    sing_thread.start()
    dance_thread.start()
```

## 14、网络编程

通过 socket 模块进行开发

### 服务端开发

```py
import socket
# 创建 socket 对象
socket_server = socket.socket()
# 绑定 ip 地址和端口
socket_server.bind("localhost",8888)
# 监听端口
socket_server.listen(1) # 参数表示接受的连接数量
# 等待客户端连接
result: tuple = socket_server.accept() # 返回二元元组，阻塞方法
conn = result[0] # 客户端和服务端的连接对象
address = result[1] # 客户端的地址信息
# conn,address = socket_server.accept()
# 接收客户端信息
conn.recv(1024).decode("UTF-8") # recv 接受缓冲区大小一般为 1024B，将字节数组转换为 UTF-8 字符串
# 回复消息
conn.sent("aaa".encode("UTF-8"))
# 关闭连接
conn.close()
socket_server.close()
```

### 客户端开发

```py
import socket
# 创建 socket 对象
socket_client = socket.socket()
# 连接到服务器
socket_client.connect(("localhost"),8888)
# 发送消息
socket_client.sent("hello".encode('UTF-8'))
# 接收返回消息
recv_data = socket_client.recv(1024)
print(recv_data.decode('UTF-8'))
# 关闭连接
socket_client.close()
```

## 15、正则表达式

使用 re 模块，并基于 re 模块中三个基础方法来做正则匹配

- match(匹配规则,被匹配字符串)
- search(匹配规则,被匹配字符串)
- findall(匹配规则,被匹配字符串)



## 常用模块

### json

```py
import json
data = [{"name":"abc","age":18},{"name":"aaa","age":20}]

# 将 python 数据转 json
data = josn.dumps(data,ensure_ascii=False)

# 将 json 转 python 数据
data = json.loads(data)
```

### pyecharts

### pymysql

Python 操作 MySQL

```py
from pymsql import Connection

# 构建连接
Connection(
	host="localhost",
    port=3306,
    user="root"
    password="123456"
    autocommit=True # 自动提交
)

# 获取游标对象
cursor = conn.cursor()
# 选择数据库
cursor.select_db("test")
# 执行 sql
cursor.execute("create table test2(id int)")
# 关闭连接
conn.close()
```

### PySpark

Apache Spark 用于大数据处理，它是一款分布式计算框架，用于调度成百上千服务器集群，计算海量数据

Spark 对 python 的支持：PySpark

PySpark 的作用：

- 作为 python 库进行数据处理
- 提交至 Spark 集群进行分布式集群计算
