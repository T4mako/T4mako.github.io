---
title: Python 基础语法
icon: python
---
## 1、数据类型

Python3 中有六个标准的数据类型：

- Number（数字）
- String（字符串）
- List（列表）
- Tuple（元组）
- Set（集合）
- Dictionary（字典）

Python3 的六个标准数据类型中：

- **不可变数据（3 个）：**Number（数字）、String（字符串）、Tuple（元组）（不可修改索引对应的值）
- **可变数据（3 个）：**List（列表）、Dictionary（字典）、Set（集合）

### Number（数字）

 **int、float、bool、complex（复数）**。

- **整型(Int)** - 通常被称为是整型或整数，是正或负整数，不带小数点。
- **长整型(long integers)** - 无限大小的整数，整数最后是一个大写或小写的L。
- **浮点型(floating point real values)** - 浮点型由整数部分与小数部分组成，浮点型也可以使用科学计数法表示（2.5e2 = 2.5 x 102 = 250）
- **复数(complex numbers)** - 复数由实数部分和虚数部分构成，可以用a + bj,或者complex(a,b)表示， 复数的实部a和虚部b都是浮点型。



我们可以使用十六进制和八进制来代表整数：

```python
>>> number = 0xA0F # 十六进制
>>> number
2575

>>> number=0o37 # 八进制
>>> number
31
```

**bool 是 int 的子类，True 和 False 可以和数字相加**

```python
True==1 #True
False==0 #True
```

### String（字符串）

```python
str = 'Runoob'

print (str)          # 输出字符串
print (str[0:-1])    # 输出第一个到倒数第二个的所有字符
print (str[0])       # 输出字符串第一个字符
print (str[2:5])     # 输出从第三个开始到第五个的字符
print (str[2:])      # 输出从第三个开始的后的所有字符
print (str * 2)      # 输出字符串两次，也可以写成 print (2 * str)
print (str + "TEST") # 连接字符串
```

### List（列表）

列表是写在方括号 **[]** 之间、用逗号分隔开的元素列表。
列表可以完成大多数集合类的数据结构实现。列表中元素的类型可以不相同，它支持数字，字符串甚至可以包含列表（所谓嵌套）。

```python
a = [ 'abcd', 786 , 2.23, 'runoob', 70.2 ]
tinylist = [123, 'runoob']

print (a)            # 输出完整列表
print (a[0])         # 输出列表第一个元素
print (a[1:3])       # 从第二个开始输出到第三个元素
print (a[2:])        # 输出从第三个元素开始的所有元素
print (tinylist * 2)    # 输出两次列表
print (a + tinylist) # 连接列表
a += tinylist
```

常用方法：

```python
a = [1,2,3,4,5]
len(a)
del a[0] #删除a
1 in a #True
max(a)
min(a)
a.append(1)
a.count(1) #统计某个元素在列表中出现的次数
a.extend([1,2,3]) #在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表）
a.index(1) #从列表中找出某个值第一个匹配项的索引位置
a.remove(obj) #移除列表中某个值的第一个匹配项
a.pop(-2) #弹出倒数第二个元素
a.reverse() #反转
#list.sort(cmp=None, key=None, reverse=False)
#cmp -- 可选参数, 如果指定了该参数会使用该参数的方法进行排序。
#key -- 主要是用来进行比较的元素，只有一个参数，具体的函数的参数就是取自于可迭代对象中，指定可迭代对象中的一个元素来进行排序。
#reverse -- 排序规则，reverse = True 降序， reverse = False 升序（默认）。
a.sort(reverse = True) #降序排列
```



### Tuple（元组）

元组（tuple）与列表类似，不同之处在于元组的**元素不能修改**。元组写在小括号 **()** 里，元素之间用逗号隔开。
元组中的元素类型也可以不相同：

```python
tuple = ( 'abcd', 786 , 2.23, 'runoob', 70.2  )
tinytuple = (123, 'runoob')

print (tuple)             # 输出完整元组
print (tuple[0])          # 输出元组的第一个元素
print (tuple[1:3])        # 输出从第二个元素开始到第三个元素
print (tuple[2:])         # 输出从第三个元素开始的所有元素
print (tinytuple * 2)     # 输出两次元组
print (tuple + tinytuple) # 连接元组

tup1 = ()    # 空元组
tup2 = (20,) # 一个元素，需要在元素后添加逗号
```

string、list 和 tuple 都属于 sequence（序列）。
元祖不可以进行的操作：append，insert，pop，del，remove......

### Set（集合）

集合（set）是由一个或数个形态各异的大小整体组成的，构成集合的事物或对象称作元素或是成员。
基本功能是进行成员关系测试和删除重复元素。
可以使用大括号 **{ }** 或者 **set()** 函数创建集合，注意：创建一个空集合必须用 **set()** 而不是 **{ }**，因为 **{ }** 是用来创建一个空字典。

```python
sites = {'Google', 'Taobao', 'Runoob', 'Facebook', 'Zhihu', 'Baidu'} #去重
a = set('abracadabra')
b = set('alacazam')
print(a)
print(a - b)     # a 和 b 的差集
print(a | b)     # a 和 b 的并集
print(a & b)     # a 和 b 的交集
print(a ^ b)     # a 和 b 中不同时存在的元素
```

### Dictionary（字典）

列表是有序的对象集合，字典是无序的对象集合。两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过偏移存取。

字典是一种映射类型，字典用 **{ }** 标识，它是一个无序的 **键(key) : 值(value)** 的集合。
**键(key)必须使用不可变类型。**
在同一个字典中，**键(key)必须是唯一的。**

```python
dict = {}
dict['one'] = "1 - 菜鸟教程"
dict[2]     = "2 - 菜鸟工具"

tinydict = {'name': 'runoob','code':1, 'site': 'www.runoob.com'}

print (dict['one'])       # 输出键为 'one' 的值
print (dict[2])           # 输出键为 2 的值
print (tinydict)          # 输出完整的字典
print (tinydict.keys())   # 输出所有键
print (tinydict.values()) # 输出所有值
print (tinydict('name'))
tinydict('name') = 'aa'
del tinydict('name')
e = dict([('Runoob', 1), ('Google', 2), ('Taobao', 3)]) #构造函数 dict() 可以直接从键值对序列中构建字典
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

### Python数据类型转换

| 函数                                                         | 描述                                                |
| :----------------------------------------------------------- | :-------------------------------------------------- |
| int(x [,base])                                               | 将x转换为一个整数，base为该数为几进制               |
| float(x)                                                     | 将x转换到一个浮点数                                 |
| [complex(real [,imag\])](https://www.runoob.com/python3/python-func-complex.html) | 创建一个复数                                        |
| [str(x)](https://www.runoob.com/python3/python-func-str.html) | 将对象 x 转换为字符串                               |
| [repr(x)](https://www.runoob.com/python3/python-func-repr.html) | 将对象 x 转换为表达式字符串                         |
| [eval(str)](https://www.runoob.com/python3/python-func-eval.html) | 用来计算在字符串中的有效Python表达式,并返回一个对象 |
| [tuple(s)](https://www.runoob.com/python3/python3-func-tuple.html) | 将序列 s 转换为一个元组                             |
| [list(s)](https://www.runoob.com/python3/python3-att-list-list.html) | 将序列 s 转换为一个列表                             |
| [set(s)](https://www.runoob.com/python3/python-func-set.html) | 转换为可变集合                                      |
| [dict(d)](https://www.runoob.com/python3/python-func-dict.html) | 创建一个字典。d 必须是一个 (key, value)元组序列。   |
| [frozenset(s)](https://www.runoob.com/python3/python-func-frozenset.html) | 转换为不可变集合                                    |
| [chr(x)](https://www.runoob.com/python3/python-func-chr.html) | 将一个整数转换为一个字符                            |
| [ord(x)](https://www.runoob.com/python3/python-func-ord.html) | 将一个字符转换为它的整数值                          |
| [hex(x)](https://www.runoob.com/python3/python-func-hex.html) | 将一个整数转换为一个十六进制字符串                  |
| [oct(x)](https://www.runoob.com/python3/python-func-oct.html) | 将一个整数转换为一个八进制字符串                    |

## 2、注释

```python
## 这是一个注释
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
```

## 3、运算符

### 逻辑运算符

| and     | x and y    | 布尔"与" - 如果 x 为 False，x and y 返回 x 的值，否则返回 y 的计算值。 | (a and b) 返回 20。         |
| ------- | ---------- | ------------------------------------------------------------ | --------------------------- |
| **or**  | **x or y** | **布尔"或" - 如果 x 是 True，它返回 x 的值，否则它返回 y 的计算值。** | **(a or b) 返回 10。**      |
| **not** | **not x**  | **布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。** | **not(a and b) 返回 False** |

### Python成员运算符

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

### Python身份运算符

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

## 5、math模块，cmath 模块

Python 中数学运算常用的函数基本都在 math 模块、cmath 模块中。
Python math 模块提供了许多对浮点数的数学运算函数。
Python cmath 模块包含了一些用于复数运算的函数。
cmath 模块的函数跟 math 模块函数基本一致，区别是 cmath 模块运算的是复数，math 模块运算的是数学运算。
要使用 math 或 cmath 函数必须先导入：

```python
#要使用 math 或 cmath 函数必须先导入：
import math
```

### Python数学函数

| 函数               | 返回值 ( 描述 )                                              |
| :----------------- | :----------------------------------------------------------- |
| abs(x)             | 返回数字的绝对值，如abs(-10) 返回 10                         |
| ceil(x)            | 返回数字的上入整数，如math.ceil(4.1) 返回 5                  |
| cmp(x, y)          | 如果 x < y 返回 -1, 如果 x == y 返回 0, 如果 x > y 返回 1    |
| exp(x)             | 返回e的x次幂(ex),如math.exp(1) 返回2.718281828459045         |
| fabs(x)            | 返回数字的绝对值，如math.fabs(-10) 返回10.0                  |
| floor(x)           | 返回数字的下舍整数，如math.floor(4.9)返回 4                  |
| log(x)             | 如math.log(math.e)返回1.0,math.log(100,10)返回2.0            |
| log10(x)           | 返回以10为基数的x的对数，如math.log10(100)返回 2.0           |
| max(x1, x2,...)    | 返回给定参数的最大值，参数可以为序列。                       |
| min(x1, x2,...)    | 返回给定参数的最小值，参数可以为序列。                       |
| modf(x)            | 返回x的整数部分与小数部分，两部分的数值符号与x相同，整数部分以浮点型表示。 |
| pow(x, y)          | x**y 运算后的值。                                            |
| **round(x [,n\])** | 返回浮点数x的四舍五入值，如给出n值，则代表舍入到小数点后的位数。 |
| sqrt(x)            | 返回数字x的平方根                                            |

### Python随机数函数

随机数可以用于数学，游戏，安全等领域中，还经常被嵌入到算法中，用以提高算法效率，并提高程序的安全性。

Python包含以下常用随机数函数：

| 函数                               | 描述                                                         |
| :--------------------------------- | :----------------------------------------------------------- |
| choice(seq)                        | 从序列的元素中随机挑选一个元素，比如random.choice(range(10))，从0到9中随机挑选一个整数。 |
| randrange ([start,\] stop [,step]) | 从指定范围内，按指定基数递增的集合中获取一个随机数，基数默认值为 1 |
| random()                           | 随机生成下一个实数，它在[0,1)范围内。                        |
| seed([x])                          | 改变随机数生成器的种子seed。如果你不了解其原理，你不必特别去设定seed，Python会帮你选择seed。 |
| shuffle(lst)                       | 将序列的所有元素随机排序                                     |
| uniform(x, y)                      | 随机生成下一个实数，它在[x,y]范围内。                        |

```python
import random
random.choice(range(10)) #返回0-10的数
random.random() #返回0-1的数
random.uniform(50,100) #随机生成一个50-100的实数
```

## 6、Python 函数

```python
def 函数名（参数列表）:
    函数体
def functionname( parameters ):
   "函数_文档字符串"
   function_suite
   return [expression]

def max(a, b):
    if a > b:
        return a
    else:
        return b
a = 4
b = 5
print(max(a, b))

#可变参数
#加了星号 * 的参数会以元组(tuple)的形式导入，存放所有未命名的变量参数。
def printinfo( arg1, *vartuple ):
   "打印任何传入的参数"
   print ("输出: ")
   print (arg1)
   print (vartuple)
#加了两个星号 ** 的参数会以字典的形式导入。
def printinfo( arg1, **vardict ):
   "打印任何传入的参数"
   print ("输出: ")
   print (arg1)
   print (vardict)
#如果单独出现星号 *，则星号 * 后的参数必须用关键字传入：
def f(a,b,*,c):
...     return a+b+c
... 
>>> f(1,2,3)   # 报错
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: f() takes 2 positional arguments but 3 were given
>>> f(1,2,c=3) # 正常
6
```

## 7、输入输出

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

## 8、File方法

#### open() 方法

Python **open()** 方法用于打开一个文件，并返回文件对象。
在对文件进行处理过程都需要使用到这个函数，如果该文件无法被打开，会抛出 **OSError**。
**注意：**使用 **open()** 方法一定要保证关闭文件对象，即调用 **close()** 方法。
**open()** 函数常用形式是接收两个参数：文件名(file)和模式(mode)。


## 9、内置函数

eval() 函数用来执行一个字符串表达式，并返回表达式的值。

```python
eval("5.5")*2.2 #去掉字符串的引号
```
