---
title: Python 常用 API 速查
---

<!-- more -->

# Python 常用 API 速查

> 按数据类型分类整理，适合快速查找。示例变量：字符串 `s`，列表 `lst`，元组 `t`，集合 `st`，字典 `d`，文件对象 `f`，Numpy 数组 `arr`，Pandas 表格 `df`。

## 数据类型区别

| 类型 | 是否可变 | 是否有序 | 是否可重复 | 典型用途 |
| :--- | :--- | :--- | :--- | :--- |
| `int` | 不可变 | 不适用 | 不适用 | 整数计算，如年龄、数量、下标 |
| `float` | 不可变 | 不适用 | 不适用 | 小数计算，如价格、比例、分数 |
| `bool` | 不可变 | 不适用 | 不适用 | 条件判断，只有 `True` 和 `False` |
| `complex` | 不可变 | 不适用 | 不适用 | 复数计算，较少用于日常业务 |
| `str` | 不可变 | 有序 | 可重复字符 | 文本、路径、编码、格式化输出 |
| `list` | 可变 | 有序 | 可重复元素 | 存一组需要增删改的数据 |
| `tuple` | 不可变 | 有序 | 可重复元素 | 存固定结构数据，如坐标、函数多返回值 |
| `set` | 可变 | 无序 | 不可重复 | 去重、交集、并集、差集 |
| `dict` | 可变 | 按插入顺序 | key 不重复，value 可重复 | key-value 映射，如配置、对象信息 |
| `NoneType` | 不可变 | 不适用 | 不适用 | 表示空值、无返回值、占位 |
| `bytes` | 不可变 | 有序 | 可重复字节 | 二进制数据、网络传输、文件字节流 |
| `range` | 不可变 | 有序 | 不重复或按步长重复性很低 | 循环次数、整数序列 |
| `function` | 可变属性 | 不适用 | 不适用 | 封装可复用逻辑 |
| `class` | 可变属性 | 不适用 | 不适用 | 定义对象模板 |
| `object` | 通常可变 | 由类决定 | 由类决定 | 保存一组属性和方法 |
| `file` | 状态可变 | 按文件内容顺序 | 由文件内容决定 | 读写文件 |
| `generator` | 状态可变 | 有序生成 | 由生成逻辑决定 | 惰性生成数据，节省内存 |
| `iterator` | 状态可变 | 有序遍历 | 由源数据决定 | 逐个取值 |
| `ndarray` | 可变 | 有序 | 可重复元素 | 高性能数值数组计算 |
| `Series` | 可变 | 有索引顺序 | 可重复值 | Pandas 一维列数据 |
| `DataFrame` | 可变 | 行列有序 | 可重复值 | Pandas 二维表格数据 |

> 简单记忆：`str/tuple` 不能改，`list/dict/set` 能改；`list/tuple/str` 有顺序，`set` 无顺序；`dict` 查找靠 key，`set` 主要用来去重和集合运算。

## 对象创建

| 类型 | 创建方式 | 简单说明 |
| :--- | :--- | :--- |
| `int` | `n = 10` | 创建整数 |
| `int` | `n = int("10")` | 字符串转整数 |
| `float` | `x = 3.14` | 创建浮点数 |
| `float` | `x = float("3.14")` | 字符串转浮点数 |
| `bool` | `flag = True` | 创建布尔值 |
| `bool` | `flag = bool(x)` | 根据对象真假转布尔值 |
| `complex` | `z = 1 + 2j` | 创建复数 |
| `complex` | `z = complex(1, 2)` | 创建复数 `1+2j` |
| `str` | `s = "hello"` | 创建字符串 |
| `str` | `s = str(123)` | 其他类型转字符串 |
| `list` | `lst = [1, 2, 3]` | 创建列表 |
| `list` | `lst = list(range(3))` | 可迭代对象转列表 |
| `tuple` | `t = (1, 2, 3)` | 创建元组 |
| `tuple` | `t = (1,)` | 创建单元素元组 |
| `tuple` | `t = tuple([1, 2])` | 列表转元组 |
| `set` | `st = {1, 2, 3}` | 创建集合 |
| `set` | `st = set([1, 1, 2])` | 列表转集合并去重 |
| `dict` | `d = {"name": "Tom", "age": 18}` | 创建字典 |
| `dict` | `d = dict(name="Tom", age=18)` | 用关键字参数创建字典 |
| `dict` | `d = dict([("a", 1), ("b", 2)])` | 用键值对列表创建字典 |
| `NoneType` | `x = None` | 创建空值对象 |
| `bytes` | `b = b"hello"` | 创建字节对象 |
| `bytes` | `b = "hello".encode("utf-8")` | 字符串编码为字节 |
| `range` | `r = range(10)` | 创建整数范围对象 |
| `function` | `def f(): pass` | 创建函数对象 |
| `lambda` | `f = lambda x: x + 1` | 创建匿名函数对象 |
| `class` | `class Student: pass` | 创建类对象 |
| `object` | `stu = Student()` | 通过类创建实例对象 |
| `file` | `f = open("a.txt", "r", encoding="utf-8")` | 创建文件对象 |
| `generator` | `g = (x for x in range(3))` | 创建生成器对象 |
| `iterator` | `it = iter([1, 2, 3])` | 创建迭代器对象 |
| `datetime` | `dt = datetime.now()` | 创建当前日期时间对象 |
| `date` | `d = date.today()` | 创建当前日期对象 |
| `ndarray` | `arr = np.array([1, 2, 3])` | 创建 Numpy 数组 |
| `Series` | `s = pd.Series([1, 2, 3])` | 创建 Pandas 一维数据 |
| `DataFrame` | `df = pd.DataFrame({"name": ["Tom"], "age": [18]})` | 创建 Pandas 表格数据 |

## 通用内置函数

| API | 简单说明 |
| :--- | :--- |
| `type(x)` | 查看对象类型 |
| `id(x)` | 查看对象内存标识 |
| `len(x)` | 获取长度 |
| `print(x)` | 输出内容 |
| `input(msg)` | 接收键盘输入，返回字符串 |
| `str(x)` | 转为字符串 |
| `int(x)` | 转为整数 |
| `float(x)` | 转为浮点数 |
| `bool(x)` | 转为布尔值 |
| `list(x)` | 转为列表 |
| `tuple(x)` | 转为元组 |
| `set(x)` | 转为集合 |
| `dict(x)` | 转为字典 |
| `range(n)` | 生成 `0` 到 `n-1` 的整数序列 |
| `range(start, stop, step)` | 按步长生成整数序列 |
| `x in range(...)` | 判断数字是否在范围内 |
| `enumerate(x)` | 遍历时同时获取下标和值 |
| `zip(a, b)` | 将多个可迭代对象按位置打包 |
| `sorted(x)` | 返回排序后的新列表 |
| `reversed(x)` | 返回反向迭代器 |
| `sum(x)` | 求和 |
| `max(x)` | 求最大值 |
| `min(x)` | 求最小值 |
| `abs(x)` | 求绝对值 |
| `round(x, n)` | 四舍五入保留 `n` 位小数 |
| `all(x)` | 所有元素为真才返回 `True` |
| `any(x)` | 任意元素为真就返回 `True` |
| `isinstance(x, type)` | 判断对象是否属于某类型 |
| `eval(s)` | 执行字符串表达式，不建议处理不可信输入 |
| `help(x)` | 查看帮助信息 |
| `dir(x)` | 查看对象可用属性和方法 |

## 数字 Number

| API | 简单说明 |
| :--- | :--- |
| `int("10")` | 字符串转整数 |
| `float("3.14")` | 字符串转浮点数 |
| `complex(a, b)` | 创建复数 `a+bj` |
| `bin(n)` | 整数转二进制字符串 |
| `oct(n)` | 整数转八进制字符串 |
| `hex(n)` | 整数转十六进制字符串 |
| `pow(a, b)` | 计算 `a` 的 `b` 次方 |
| `divmod(a, b)` | 同时返回商和余数 |
| `n.bit_length()` | 返回整数二进制位数 |

## 字符串 str

| API | 简单说明 |
| :--- | :--- |
| `s[index]` | 按下标取字符 |
| `s[start:end:step]` | 字符串切片 |
| `s.find(sub)` | 查找子串位置，找不到返回 `-1` |
| `s.index(sub)` | 查找子串位置，找不到报错 |
| `s.count(sub)` | 统计子串出现次数 |
| `s.replace(old, new)` | 替换字符串，返回新字符串 |
| `s.split(sep)` | 按分隔符拆分为列表 |
| `sep.join(lst)` | 用分隔符拼接字符串列表 |
| `s.strip()` | 去除首尾空白字符 |
| `s.lstrip()` | 去除左侧空白字符 |
| `s.rstrip()` | 去除右侧空白字符 |
| `s.upper()` | 转大写 |
| `s.lower()` | 转小写 |
| `s.title()` | 每个单词首字母大写 |
| `s.capitalize()` | 首字母大写 |
| `s.startswith(prefix)` | 判断是否以指定内容开头 |
| `s.endswith(suffix)` | 判断是否以指定内容结尾 |
| `sub in s` | 判断是否包含子串 |
| `sub not in s` | 判断是否不包含子串 |
| `s.isdigit()` | 判断是否全是数字字符 |
| `s.isalpha()` | 判断是否全是字母 |
| `s.isalnum()` | 判断是否全是字母或数字 |
| `s.isspace()` | 判断是否全是空白字符 |
| `s.format(x)` | 格式化字符串 |
| `f"{x}"` | f-string 格式化，最常用 |
| `s.encode("utf-8")` | 字符串转字节 |
| `b.decode("utf-8")` | 字节转字符串 |
| `part in b` | 判断 bytes 是否包含指定字节片段 |
| `part not in b` | 判断 bytes 是否不包含指定字节片段 |

## 列表 list

| API | 简单说明 |
| :--- | :--- |
| `lst[index]` | 按下标取元素 |
| `lst[start:end:step]` | 列表切片 |
| `x in lst` | 判断列表是否包含元素 |
| `x not in lst` | 判断列表是否不包含元素 |
| `lst.append(x)` | 在末尾添加一个元素 |
| `lst.extend(iterable)` | 在末尾追加多个元素 |
| `lst.insert(i, x)` | 在指定下标插入元素 |
| `lst.remove(x)` | 删除第一个匹配的元素 |
| `lst.pop()` | 删除并返回最后一个元素 |
| `lst.pop(i)` | 删除并返回指定下标元素 |
| `lst.clear()` | 清空列表 |
| `lst.index(x)` | 查找元素下标，找不到报错 |
| `lst.count(x)` | 统计元素出现次数 |
| `lst.sort()` | 原地升序排序 |
| `lst.sort(reverse=True)` | 原地降序排序 |
| `lst.sort(key=func)` | 按指定规则排序 |
| `sorted(lst)` | 返回排序后的新列表 |
| `lst.reverse()` | 原地反转列表 |
| `list(reversed(lst))` | 返回反转后的新列表 |
| `x in lst` | 判断元素是否存在 |
| `del lst[i]` | 按下标删除元素 |
| `[expr for x in lst]` | 列表推导式 |
| `[expr for x in lst if cond]` | 带条件过滤的列表推导式 |

## 元组 tuple

| API | 简单说明 |
| :--- | :--- |
| `t[index]` | 按下标取元素 |
| `t[start:end:step]` | 元组切片 |
| `x in t` | 判断元组是否包含元素 |
| `x not in t` | 判断元组是否不包含元素 |
| `t.count(x)` | 统计元素出现次数 |
| `t.index(x)` | 查找元素下标，找不到报错 |
| `tuple(lst)` | 列表转元组 |
| `(x,)` | 创建单元素元组，逗号不能省 |
| `a, b = t` | 元组解包 |

## 集合 set

| API | 简单说明 |
| :--- | :--- |
| `set(iterable)` | 创建集合并去重 |
| `x in st` | 判断集合是否包含元素 |
| `x not in st` | 判断集合是否不包含元素 |
| `st.add(x)` | 添加元素 |
| `st.update(iterable)` | 批量添加元素 |
| `st.remove(x)` | 删除元素，不存在则报错 |
| `st.discard(x)` | 删除元素，不存在不报错 |
| `st.pop()` | 随机删除并返回一个元素 |
| `st.clear()` | 清空集合 |
| `a \| b` | 求并集 |
| `a.union(b)` | 求并集 |
| `a & b` | 求交集 |
| `a.intersection(b)` | 求交集 |
| `a - b` | 求差集 |
| `a.difference(b)` | 求差集 |
| `a ^ b` | 求对称差集 |
| `a.issubset(b)` | 判断 `a` 是否为 `b` 的子集 |
| `a.issuperset(b)` | 判断 `a` 是否包含 `b` |
| `{expr for x in st}` | 集合推导式 |

## 字典 dict

| API | 简单说明 |
| :--- | :--- |
| `d[key]` | 根据 key 取值，不存在则报错 |
| `d.get(key)` | 根据 key 取值，不存在返回 `None` |
| `d.get(key, default)` | key 不存在时返回默认值 |
| `d[key] = value` | 新增或修改键值对 |
| `d.pop(key)` | 删除并返回指定 key 的值 |
| `d.pop(key, default)` | key 不存在时返回默认值 |
| `d.popitem()` | 删除并返回最后一组键值对 |
| `del d[key]` | 删除指定 key |
| `d.clear()` | 清空字典 |
| `d.keys()` | 获取所有 key |
| `d.values()` | 获取所有 value |
| `d.items()` | 获取所有 key-value |
| `d.update(other)` | 合并或更新字典 |
| `d.setdefault(key, default)` | key 不存在时设置默认值 |
| `key in d` | 判断字典是否包含 key |
| `key not in d` | 判断字典是否不包含 key |
| `dict.fromkeys(keys, value)` | 用一组 key 创建字典 |
| `{k: v for x in lst}` | 字典推导式 |

## 序列与迭代

| API | 简单说明 |
| :--- | :--- |
| `for x in iterable` | 遍历可迭代对象 |
| `iter(x)` | 获取迭代器 |
| `next(it)` | 获取迭代器下一个元素 |
| `enumerate(lst, start=0)` | 带下标遍历 |
| `zip(a, b)` | 多个序列并行遍历 |
| `map(func, iterable)` | 对每个元素应用函数 |
| `filter(func, iterable)` | 按条件过滤元素 |
| `lambda x: expr` | 定义简单匿名函数 |
| `(expr for x in lst)` | 生成器表达式，节省内存 |

## 文件 file

| API | 简单说明 |
| :--- | :--- |
| `open(path, "r", encoding="utf-8")` | 以只读方式打开文本文件 |
| `open(path, "w", encoding="utf-8")` | 写入文件，存在则清空 |
| `open(path, "a", encoding="utf-8")` | 追加写入文件 |
| `with open(...) as f:` | 自动关闭文件，推荐写法 |
| `text in f.read()` | 判断文件内容是否包含指定文本 |
| `f.read()` | 读取全部内容 |
| `f.read(n)` | 读取指定字符数 |
| `f.readline()` | 读取一行 |
| `f.readlines()` | 读取所有行，返回列表 |
| `for line in f` | 逐行读取文件 |
| `f.write(s)` | 写入字符串 |
| `f.writelines(lines)` | 写入字符串列表 |
| `f.flush()` | 将缓冲区内容写入磁盘 |
| `f.close()` | 关闭文件 |

## 异常 exception

| API | 简单说明 |
| :--- | :--- |
| `try ... except ...` | 捕获异常 |
| `except Exception as e` | 捕获异常并保存异常对象 |
| `else` | 没有异常时执行 |
| `finally` | 无论是否异常都会执行 |
| `raise Error("msg")` | 主动抛出异常 |
| `assert cond` | 断言条件必须为真 |

## 函数 function

| API | 简单说明 |
| :--- | :--- |
| `def func():` | 定义函数 |
| `return value` | 返回结果 |
| `*args` | 接收多个位置参数，保存为元组 |
| `**kwargs` | 接收多个关键字参数，保存为字典 |
| `global x` | 在函数内声明使用全局变量 |
| `nonlocal x` | 在内层函数修改外层函数变量 |
| `@decorator` | 使用装饰器增强函数 |
| `func.__name__` | 获取函数名 |
| `func.__doc__` | 获取函数文档字符串 |

## 类 object

| API | 简单说明 |
| :--- | :--- |
| `class A:` | 定义类 |
| `A()` | 创建对象 |
| `__init__(self)` | 构造方法，创建对象时自动执行 |
| `__str__(self)` | 定义对象转字符串的显示内容 |
| `__repr__(self)` | 定义对象调试显示内容 |
| `__eq__(self, other)` | 定义 `==` 比较规则 |
| `__lt__(self, other)` | 定义 `<` 比较规则 |
| `super()` | 调用父类方法 |
| `@property` | 把方法当属性使用 |
| `hasattr(obj, name)` | 判断对象是否有某属性 |
| `getattr(obj, name)` | 获取对象属性 |
| `setattr(obj, name, value)` | 设置对象属性 |
| `delattr(obj, name)` | 删除对象属性 |

## 正则 re

| API | 简单说明 |
| :--- | :--- |
| `re.match(pattern, s)` | 从开头匹配 |
| `re.search(pattern, s)` | 查找第一个匹配 |
| `re.findall(pattern, s)` | 查找所有匹配，返回列表 |
| `re.finditer(pattern, s)` | 查找所有匹配，返回迭代器 |
| `re.sub(pattern, repl, s)` | 替换匹配内容 |
| `re.split(pattern, s)` | 按正则拆分字符串 |
| `re.compile(pattern)` | 预编译正则表达式 |
| `m.group()` | 获取匹配到的内容 |
| `m.start()` | 获取匹配起始位置 |
| `m.end()` | 获取匹配结束位置 |

## JSON

| API | 简单说明 |
| :--- | :--- |
| `json.dumps(obj)` | Python 对象转 JSON 字符串 |
| `json.dumps(obj, ensure_ascii=False)` | 转 JSON 时保留中文 |
| `json.loads(s)` | JSON 字符串转 Python 对象 |
| `json.dump(obj, f)` | Python 对象写入 JSON 文件 |
| `json.load(f)` | 从 JSON 文件读取 Python 对象 |

## 日期时间 datetime

| API | 简单说明 |
| :--- | :--- |
| `datetime.now()` | 获取当前日期时间 |
| `date.today()` | 获取当前日期 |
| `datetime.strptime(s, fmt)` | 字符串转日期时间 |
| `dt.strftime(fmt)` | 日期时间转字符串 |
| `timedelta(days=1)` | 表示时间间隔 |
| `dt + timedelta(...)` | 日期时间加减 |
| `dt.year` | 获取年份 |
| `dt.month` | 获取月份 |
| `dt.day` | 获取日期 |
| `dt.timestamp()` | 转时间戳 |

## collections 常用容器

| API | 简单说明 |
| :--- | :--- |
| `Counter(iterable)` | 统计元素出现次数 |
| `counter.most_common(n)` | 获取出现次数最多的前 `n` 个 |
| `defaultdict(type)` | 带默认值的字典 |
| `deque()` | 双端队列 |
| `dq.append(x)` | 右侧添加元素 |
| `dq.appendleft(x)` | 左侧添加元素 |
| `dq.pop()` | 右侧弹出元素 |
| `dq.popleft()` | 左侧弹出元素 |
| `namedtuple(name, fields)` | 创建轻量级具名元组 |

## Numpy ndarray

| API | 简单说明 |
| :--- | :--- |
| `np.array(lst)` | 列表转 Numpy 数组 |
| `np.zeros(shape)` | 创建全 0 数组 |
| `np.ones(shape)` | 创建全 1 数组 |
| `np.arange(start, stop, step)` | 创建等步长数组 |
| `np.linspace(start, stop, n)` | 创建等间隔数组 |
| `np.random.rand(m, n)` | 创建 `0~1` 随机数组 |
| `arr.shape` | 查看数组形状 |
| `arr.dtype` | 查看数组类型 |
| `arr.astype(type)` | 转换数组类型 |
| `arr.reshape(shape)` | 改变数组形状 |
| `arr.T` | 数组转置 |
| `arr.sum(axis=0)` | 按维度求和 |
| `arr.mean(axis=0)` | 按维度求平均 |
| `arr.max(axis=0)` | 按维度求最大值 |
| `arr.min(axis=0)` | 按维度求最小值 |
| `arr.argmax()` | 最大值下标 |
| `arr.argmin()` | 最小值下标 |
| `np.dot(a, b)` | 向量点乘或矩阵乘法 |
| `a @ b` | 矩阵乘法 |
| `np.sqrt(arr)` | 开平方 |
| `np.log(arr)` | 求自然对数 |
| `np.power(arr, n)` | 求幂 |
| `arr[arr > 0]` | 布尔索引筛选 |
| `x in arr` | 判断数组是否包含元素 |
| `np.isin(arr, values)` | 判断数组元素是否在指定值集合中 |
| `np.concatenate([a, b])` | 拼接数组 |

## Pandas Series

| API | 简单说明 |
| :--- | :--- |
| `pd.Series(data)` | 创建一维数据 |
| `s.index` | 获取索引 |
| `s.values` | 获取值数组 |
| `s.dtype` | 查看数据类型 |
| `s.shape` | 查看形状 |
| `s.head(n)` | 查看前 `n` 条 |
| `s.tail(n)` | 查看后 `n` 条 |
| `s.describe()` | 查看描述统计 |
| `s.sum()` | 求和 |
| `s.mean()` | 求平均值 |
| `s.max()` | 求最大值 |
| `s.min()` | 求最小值 |
| `s.idxmax()` | 最大值对应索引 |
| `s.idxmin()` | 最小值对应索引 |
| `s.astype(type)` | 转换数据类型 |
| `s.isnull()` | 判断是否为空值 |
| `s.fillna(value)` | 填充空值 |
| `s.dropna()` | 删除空值 |
| `s.value_counts()` | 统计不同值出现次数 |
| `value in s.values` | 判断 Series 是否包含某个值 |
| `index in s.index` | 判断 Series 是否包含某个索引 |
| `s.apply(func)` | 对每个元素应用函数 |

## Pandas DataFrame

| API | 简单说明 |
| :--- | :--- |
| `pd.DataFrame(data)` | 创建二维表格数据 |
| `pd.read_csv(path)` | 读取 CSV 文件 |
| `pd.read_excel(path)` | 读取 Excel 文件 |
| `pd.read_json(path)` | 读取 JSON 数据 |
| `df.to_csv(path, index=False)` | 保存为 CSV 文件 |
| `df.shape` | 查看行数和列数 |
| `df.columns` | 查看列名 |
| `df.index` | 查看索引 |
| `df.dtypes` | 查看每列类型 |
| `df.head(n)` | 查看前 `n` 行 |
| `df.tail(n)` | 查看后 `n` 行 |
| `df.info()` | 查看字段、类型、缺失值信息 |
| `df.describe()` | 查看数值列描述统计 |
| `df["col"]` | 选择单列 |
| `df[["a", "b"]]` | 选择多列 |
| `"col" in df.columns` | 判断 DataFrame 是否包含某列 |
| `value in df["col"].values` | 判断某列是否包含指定值 |
| `df.loc[row, col]` | 按标签选择行列 |
| `df.iloc[row, col]` | 按位置选择行列 |
| `df[df["age"] > 18]` | 按条件筛选行 |
| `df.query("age > 18")` | 用表达式筛选行 |
| `df.sort_values("col")` | 按列值排序 |
| `df.sort_index()` | 按索引排序 |
| `df.rename(columns={"old": "new"})` | 重命名列 |
| `df.drop(columns=["col"])` | 删除列 |
| `df.drop(index=[0])` | 删除行 |
| `df.dropna()` | 删除缺失值 |
| `df.fillna(value)` | 填充缺失值 |
| `df.replace(old, new)` | 替换值 |
| `df.duplicated()` | 判断重复行 |
| `df.drop_duplicates()` | 删除重复行 |
| `df.groupby("col")` | 按列分组 |
| `df.groupby("col").sum()` | 分组后求和 |
| `df.groupby("col").agg(func)` | 分组后聚合 |
| `pd.concat([df1, df2])` | 拼接多个表 |
| `pd.merge(df1, df2, on="id")` | 按字段合并表 |
| `df.pivot(index, columns, values)` | 长表转宽表 |
| `df.melt(id_vars, value_vars)` | 宽表转长表 |
| `df.apply(func)` | 按行或列应用函数 |
| `df.sample(n)` | 随机抽样 `n` 行 |
| `df.corr()` | 计算列相关系数 |
