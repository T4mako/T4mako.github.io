## 1、Matplotlib Pyplot

Matplotlib 是 Python 的绘图库

Pyplot 是 Matplotlib 的子库，提供了和 MATLAB 类似的绘图 API

Pyplot 包含一系列绘图函数的相关函数，每个函数会对当前的图像进行一些修改。使用的时候，我们可以使用 import 导入 pyplot 库，并设置一个别名 **plt**：

```py
import matplotlib.pyplot as plt
```

常用的 pyplot 函数：

- `plot()`：用于绘制线图和散点图
- `scatter()`：用于绘制散点图
- `bar()`：用于绘制垂直条形图和水平条形图
- `hist()`：用于绘制直方图
- `pie()`：用于绘制饼图
- `imshow()`：用于绘制图像
- `subplots()`：用于创建子图

以下实例，我们通过两个坐标 **(0,0)** 到 **(6,100)** 来绘制一条线

```py
import matplotlib.pyplot as plt
import numpy as np

xpoints = np.array([0, 6])
ypoints = np.array([0, 100])

plt.plot(xpoints, ypoints)
plt.show()
```

## 2、绘图标记

要给坐标自定义一些不一样的标记，可以使用 **plot()** 方法的 **marker** 参数来定义

```py
ypoints = np.array([1,3,4,5,8,9,6,1,3,4,5,2,4])
plt.plot(ypoints, marker = 'o')
plt.show()
```

fmt 参数定义了基本格式，如标记、线条样式和颜色。

```py
fmt = '[marker][line][color]'
```

如 **o:r**，**o** 表示实心圆标记，**:** 表示虚线，**r** 表示颜色为红色。

```py
ypoints = np.array([6, 2, 13, 10])
plt.plot(ypoints, 'o:r')
plt.show()
```

我们可以自定义标记的大小与颜色，使用的参数分别是：

- markersize，简写为 **ms**：定义标记的大小。
- markerfacecolor，简写为 **mfc**：定义标记内部的颜色。
- markeredgecolor，简写为 **mec**：定义标记边框的颜色。

```py
ypoints = np.array([6, 2, 13, 10])
plt.plot(ypoints, marker = 'o', ms = 20)
plt.show()
```

## 3、绘图线

自定义线的样式，包括线的类型、颜色和大小等

### 线的类型

线的类型可以使用 **linestyle** 参数来定义，简写为 **ls**。

| 类型           | 简写      | 说明   |
| :------------- | :-------- | :----- |
| 'solid' (默认) | '-'       | 实线   |
| 'dotted'       | ':'       | 点虚线 |
| 'dashed'       | '--'      | 破折线 |
| 'dashdot'      | '-.'      | 点划线 |
| 'None'         | '' 或 ' ' | 不画线 |

```py
ypoints = np.array([6, 2, 13, 10])
plt.plot(ypoints, linestyle = 'dotted')
plt.show()
```

### 线的颜色

使用 **color** 参数来定义，简写为 **c**

| 颜色标记 | 描述 |
| :------- | :--- |
| 'r'      | 红色 |
| 'g'      | 绿色 |
| 'b'      | 蓝色 |
| 'c'      | 青色 |
| 'm'      | 品红 |
| 'y'      | 黄色 |
| 'k'      | 黑色 |
| 'w'      | 白色 |

```py
ypoints = np.array([6, 2, 13, 10])
plt.plot(ypoints, color = 'r')
plt.show()
plt.plot(ypoints, c = '#8FBC8F')
plt.show()
```

### 线的宽度

线的宽度可以使用 **linewidth** 参数来定义，简写为 **lw**，值可以是浮点数，如：**1**、**2.0**、**5.67** 等。

```py
ypoints = np.array([6, 2, 13, 10])
plt.plot(ypoints, linewidth = '12.5')
plt.show()
```

### 多条线

plot() 方法中可以包含多对 x,y 值来绘制多条线。

```py
y1 = np.array([3, 7, 5, 9])
y2 = np.array([6, 2, 13, 10])

plt.plot(y1)
plt.plot(y2)

plt.show()

# 自己设置 x 坐标等值
x1 = np.array([0, 1, 2, 3])
y1 = np.array([3, 7, 5, 9])
x2 = np.array([0, 1, 2, 3])
y2 = np.array([6, 2, 13, 10])

plt.plot(x1, y1, x2, y2)
plt.show()
```

## 4、轴标签和标题

### 轴标签

使用 **xlabel()** 和 **ylabel()** 方法来设置 x 轴和 y 轴的标签

```py
import numpy as np
import matplotlib.pyplot as plt

x = np.array([1, 2, 3, 4])
y = np.array([1, 4, 9, 16])
plt.plot(x, y)

plt.xlabel("x - label")
plt.ylabel("y - label")

plt.show()
```

### 标题

使用 **title()** 方法来设置标题。

```py
x = np.array([1, 2, 3, 4])
y = np.array([1, 4, 9, 16])
plt.plot(x, y)

plt.title("RUNOOB TEST TITLE")
plt.xlabel("x - label")
plt.ylabel("y - label")

plt.show()
```

### 标题与标签的定位

**title()** 方法提供了 **loc** 参数来设置标题显示的位置，可以设置为: **'left', 'right', 和 'center'， 默认值为 'center'**。

**xlabel()** 方法提供了 **loc** 参数来设置 x 轴显示的位置，可以设置为: **'left', 'right', 和 'center'， 默认值为 'center'**。

**ylabel()** 方法提供了 **loc** 参数来设置 y 轴显示的位置，可以设置为: **'bottom', 'top', 和 'center'， 默认值为 'center'**。

```py
# fname 为 你下载的字体库路径，注意 SourceHanSansSC-Bold.otf 字体的路径，size 参数设置字体大小
zhfont1 = matplotlib.font_manager.FontProperties(fname="SourceHanSansSC-Bold.otf", size=18)
font1 = {'color':'blue','size':20}
font2 = {'color':'darkred','size':15}
x = np.arange(1,11)
y =  2  * x +  5

# fontdict 可以使用 css 来设置字体样式
plt.title("菜鸟教程 - 测试", fontproperties=zhfont1, fontdict = font1, loc="left")
 
# fontproperties 设置中文显示，fontsize 设置字体大小
plt.xlabel("x 轴", fontproperties=zhfont1, loc="left")
plt.ylabel("y 轴", fontproperties=zhfont1, loc="top")
plt.plot(x,y)
plt.show()
```

## 5、网格线

使用 pyplot 中的 **grid()** 方法来设置图表中的网格线

grid() 方法语法格式如下：

```py
matplotlib.pyplot.grid(b=None, which='major', axis='both', )
```

**参数说明：**

- **b**：可选，默认为 None，可以设置布尔值，true 为显示网格线，false 为不显示，如果设置 **kwargs 参数，则值为 true。
- **which**：可选，可选值有 'major'、'minor' 和 'both'，默认为 'major'，表示应用更改的网格线。
- **axis**：可选，设置显示哪个方向的网格线，可以是取 'both'（默认），'x' 或 'y'，分别表示两个方向，x 轴方向或 y 轴方向。
- ***\*kwargs**：可选，设置网格样式，可以是 color='r', linestyle='-' 和 linewidth=2，分别表示网格线的颜色，样式和宽度。

```py
x = np.array([1, 2, 3, 4])
y = np.array([1, 4, 9, 16])
plt.title("RUNOOB grid() Test")
plt.xlabel("x - label")
plt.ylabel("y - label")
plt.plot(x, y)
plt.grid()
# plt.grid(axis='x') # 设置 y 就在轴方向显示网格线
# plt.grid(color = 'r', linestyle = '--', linewidth = 0.5)
plt.show()
```

## 6、绘制多图

使用 pyplot 中的 **subplot()** 和 **subplots()** 方法来绘制多个子图

**subplot()** 方法在绘图时需要指定位置，**subplots()** 方法可以一次生成多个，在调用时只需要调用生成对象的 ax 即可

### subplot

```py
subplot(nrows, ncols, index, **kwargs)
subplot(pos, **kwargs)
subplot(**kwargs)
subplot(ax)
```

以上函数将整个绘图区域分成 nrows 行和 ncols 列，然后从左到右，从上到下的顺序对每个子区域进行编号 **1...N** ，左上的子区域的编号为 1、右下的区域编号为 N，编号可以通过参数 **index** 来设置。

设置 numRows ＝ 1，numCols ＝ 2，就是将图表绘制成 1x2 的图片区域, 对应的坐标为：(1, 1), (1, 2)

plotNum ＝ 1, 表示的坐标为(1, 1), 即第一行第一列的子图。
plotNum ＝ 2, 表示的坐标为(1, 2), 即第一行第二列的子图。

```py
#plot 1:
xpoints = np.array([0, 6])
ypoints = np.array([0, 100])

plt.subplot(1, 2, 1)
plt.plot(xpoints,ypoints)
plt.title("plot 1")

#plot 2:
x = np.array([1, 2, 3, 4])
y = np.array([1, 4, 9, 16])

plt.subplot(1, 2, 2)
plt.plot(x,y)
plt.title("plot 2")

plt.suptitle("RUNOOB subplot Test")
plt.show()
```

设置 numRows ＝ 2，numCols ＝ 2，就是将图表绘制成 2x2 的图片区域, 对应的坐标为：(1, 1), (1, 2),(2, 1), (2, 2)

```py
#plot 1:
x = np.array([0, 6])
y = np.array([0, 100])

plt.subplot(2, 2, 1)
plt.plot(x,y)
plt.title("plot 1")

#plot 2:
x = np.array([1, 2, 3, 4])
y = np.array([1, 4, 9, 16])

plt.subplot(2, 2, 2)
plt.plot(x,y)
plt.title("plot 2")

#plot 3:
x = np.array([1, 2, 3, 4])
y = np.array([3, 5, 7, 9])

plt.subplot(2, 2, 3)
plt.plot(x,y)
plt.title("plot 3")

#plot 4:
x = np.array([1, 2, 3, 4])
y = np.array([4, 5, 6, 7])

plt.subplot(2, 2, 4)
plt.plot(x,y)
plt.title("plot 4")

plt.suptitle("RUNOOB subplot Test")
plt.show()
```

### subplots()

subplots() 方法语法格式如下：

```py
matplotlib.pyplot.subplots(nrows=1, ncols=1, *, sharex=False, sharey=False, squeeze=True, subplot_kw=None, gridspec_kw=None, **fig_kw)
```

**参数说明：**

- **nrows**：默认为 1，设置图表的行数。
- **ncols**：默认为 1，设置图表的列数。
- **sharex、sharey**：设置 x、y 轴是否共享属性，默认为 false，可设置为 'none'、'all'、'row' 或 'col'。
  -  False 或 none 每个子图的 x 轴或 y 轴都是独立的
  - True 或 'all'：所有子图共享 x 轴或 y 轴，'row' 设置每个子图行共享一个 x 轴或 y 轴，'col'：设置每个子图列共享一个 x 轴或 y 轴。
- **squeeze**：布尔值，默认为 True，表示额外的维度从返回的 Axes(轴)对象中挤出，对于 N\*1 或 1\*N 个子图，返回一个 1 维数组，对于 N*M，N>1 和 M>1 返回一个 2 维数组。如果设置为 False，则不进行挤压操作，返回一个元素为 Axes 实例的2维数组，即使它最终是1x1。
- **subplot_kw**：可选，字典类型。把字典的关键字传递给 add_subplot() 来创建每个子图。
- **gridspec_kw**：可选，字典类型。把字典的关键字传递给 GridSpec 构造函数创建子图放在网格里(grid)。
- **\*\*fig_kw**：把详细的关键字参数传给 figure() 函数。

```py
# 创建一些测试数据 -- 图1
x = np.linspace(0, 2*np.pi, 400)
y = np.sin(x**2)

# 创建一个画像和子图 -- 图2
fig, ax = plt.subplots()
ax.plot(x, y)
ax.set_title('Simple plot')

# 创建两个子图 -- 图3
f, (ax1, ax2) = plt.subplots(1, 2, sharey=True)
ax1.plot(x, y)
ax1.set_title('Sharing Y axis')
ax2.scatter(x, y)

# 创建四个子图 -- 图4
fig, axs = plt.subplots(2, 2, subplot_kw=dict(projection="polar"))
axs[0, 0].plot(x, y)
axs[1, 1].scatter(x, y)

# 共享 x 轴
plt.subplots(2, 2, sharex='col')

# 共享 y 轴
plt.subplots(2, 2, sharey='row')

# 共享 x 轴和 y 轴
plt.subplots(2, 2, sharex='all', sharey='all')

# 这个也是共享 x 轴和 y 轴
plt.subplots(2, 2, sharex=True, sharey=True)

# 创建标识为 10 的图，已经存在的则删除
fig, ax = plt.subplots(num=10, clear=True)

plt.show()
```

## 7、颜色条 Colormap

Matplotlib 模块提供了很多可用的颜色条。

颜色条就像一个颜色列表，其中每种颜色都有一个范围从 0 到 100 的值。

设置颜色条需要使用 cmap 参数，默认值为 'viridis'，之后颜色值设置为 0 到 100 的数组

```py
import matplotlib.pyplot as plt
import numpy as np

x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
colors = np.array([0, 10, 20, 30, 40, 45, 50, 55, 60, 70, 80, 90, 100])

plt.scatter(x, y, c=colors, cmap='viridis')

plt.show()
```

不同的颜色条：https://www.runoob.com/matplotlib/matplotlib-scatter.html

## 8、不同类型图

### 折线图

**plot()** 用于画图它可以绘制点和线，语法格式如下：

```py
# 画单条线
plot([x], y, [fmt], *, data=None, **kwargs)
# 画多条线
plot([x], y, [fmt], [x2], y2, [fmt2], ..., **kwargs)
```

- **x, y：**点或线的节点，x 为 x 轴数据，y 为 y 轴数据，数据可以列表或数组。如果我们不指定 x 轴上的点，则 x 会根据 y 的值来设置为 **0, 1, 2, 3..N-1**
- **fmt：**可选，定义基本格式（如颜色、标记和线条样式）。
- **kwargs：**可选，用在二维平面图上，设置指定属性，如标签，线的宽度等。

```py
>>> plot(x, y)        # 创建 y 中数据与 x 中对应值的二维线图，使用默认样式
>>> plot(x, y, 'bo')  # 创建 y 中数据与 x 中对应值的二维线图，使用蓝色实心圈绘制
>>> plot(y)           # x 的值为 0..N-1
>>> plot(y, 'r+')     # 使用红色 + 号
```

- **颜色字符：**'b' 蓝色，'m' 洋红色，'g' 绿色，'y' 黄色，'r' 红色，'k' 黑色，'w' 白色，'c' 青绿色，'#008000' RGB 颜色符串。多条曲线不指定颜色时，会自动选择不同颜色。
- **线型参数：**'‐' 实线，'‐‐' 破折线，'‐.' 点划线，':' 虚线。
- **标记字符：**'.' 点标记，',' 像素标记(极小点)，'o' 实心圈标记，'v' 倒三角标记，'^' 上三角标记，'>' 右三角标记，'<' 左三角标记...等等。

如果我们要绘制坐标 (1, 3) 到 (8, 10) 的线，我们就需要传递两个数组 [1, 8] 和 [3, 10] 给 **plot** 函数：

```py
xpoints = np.array([1, 8])
ypoints = np.array([3, 10])
plt.plot(xpoints, ypoints)
plt.show()
```

如果只想绘制两个坐标点，而不是一条线，可以使用 **o** 参数，表示一个实心圈的标记：

```py
xpoints = np.array([1, 8])
ypoints = np.array([3, 10])
plt.plot(xpoints, ypoints, 'o')
plt.show()
```

绘制一条不规则线

```py
xpoints = np.array([1, 2, 6, 8])
ypoints = np.array([3, 8, 1, 10])
plt.plot(xpoints, ypoints)
plt.show()
```

绘制一个正弦和余弦图

```py
x = np.arange(0,4*np.pi,0.1)   # start,stop,step
y = np.sin(x)
z = np.cos(x)
plt.plot(x,y,x,z)
plt.show()
```

### 散点图

使用 pyplot 中的 **scatter()** 方法来绘制散点图

scatter() 方法语法格式如下：

```py
matplotlib.pyplot.scatter(x, y, s=None, c=None, marker=None, cmap=None, norm=None, vmin=None, vmax=None, alpha=None, linewidths=None, *, edgecolors=None, plotnonfinite=False, data=None, **kwargs)
```

**参数说明：**

- **x，y**：长度相同的数组，也就是我们即将绘制散点图的数据点，输入数据。
- **s**：点的大小，默认 20，也可以是个数组，数组每个参数为对应点的大小。
- **c**：点的颜色，默认蓝色 'b'，也可以是个 RGB 或 RGBA 二维行数组。
- **marker**：点的样式，默认小圆圈 'o'。
- **cmap**：Colormap，默认 None，标量或者是一个 colormap 的名字，只有 c 是一个浮点数数组的时才使用。如果没有申明就是 image.cmap。
- **norm**：Normalize，默认 None，数据亮度在 0-1 之间，只有 c 是一个浮点数的数组的时才使用。
- **vmin，vmax：**：亮度设置，在 norm 参数存在时会忽略。
- **alpha：**：透明度设置，0-1 之间，默认 None，即不透明。
- **linewidths：**：标记点的长度。
- **edgecolors：**：颜色或颜色序列，默认为 'face'，可选值有 'face', 'none', None。
- **plotnonfinite：**：布尔值，设置是否使用非限定的 c ( inf, -inf 或 nan) 绘制点。
- **\*\*kwargs：**：其他参数。

```py
import matplotlib.pyplot as plt
import numpy as np

x = np.array([1, 2, 3, 4, 5, 6, 7, 8])
y = np.array([1, 4, 9, 16, 7, 11, 23, 18])

plt.scatter(x, y)
plt.show()

# 设置图标大小
x = np.array([1, 2, 3, 4, 5, 6, 7, 8])
y = np.array([1, 4, 9, 16, 7, 11, 23, 18])
sizes = np.array([20,50,100,200,500,1000,60,90])
plt.scatter(x, y, s=sizes)
plt.show()

# 自定义点的颜色
x = np.array([1, 2, 3, 4, 5, 6, 7, 8])
y = np.array([1, 4, 9, 16, 7, 11, 23, 18])
colors = np.array(["red","green","black","orange","purple","beige","cyan","magenta"])
plt.scatter(x, y, c=colors)
plt.show()

# 设置两组散点图
x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
plt.scatter(x, y, color = 'hotpink')

x = np.array([2,2,8,1,15,8,12,9,7,3,11,4,7,14,12])
y = np.array([100,105,84,105,90,99,90,95,94,100,79,112,91,80,85])
plt.scatter(x, y, color = '#88c999')
plt.show()
```

### 柱形图

使用 pyplot 中的 **bar()** 方法来绘制柱形图

bar() 方法语法格式如下：

```python
matplotlib.pyplot.bar(x, height, width=0.8, bottom=None, *, align='center', data=None, **kwargs)
```

**参数说明：**

- **x**：浮点型数组，柱形图的 x 轴数据。
- **height**：浮点型数组，柱形图的高度。
- **width**：浮点型数组，柱形图的宽度。
- **bottom**：浮点型数组，底座的 y 坐标，默认 0。
- **align**：柱形图与 x 坐标的对齐方式，'center' 以 x 位置为中心，这是默认值。 'edge'：将柱形图的左边缘与 x 位置对齐。要对齐右边缘的条形，可以传递负数的宽度值及 align='edge'。
- **\*\*kwargs：**：其他参数。

以下实例我们简单实用 **bar()** 来创建一个柱形图:

```py
x = np.array(["Runoob-1", "Runoob-2", "Runoob-3", "C-RUNOOB"])
y = np.array([12, 22, 6, 18])

plt.bar(x,y)
plt.show()
```

垂直方向的柱形图可以使用 **barh()** 方法来设置

```py
x = np.array(["Runoob-1", "Runoob-2", "Runoob-3", "C-RUNOOB"])
y = np.array([12, 22, 6, 18])

plt.barh(x,y)
plt.show()

# 设置柱形图颜色
x = np.array(["Runoob-1", "Runoob-2", "Runoob-3", "C-RUNOOB"])
y = np.array([12, 22, 6, 18])
plt.bar(x, y, color = "#4CAF50")
plt.show()

# 自定义各个柱形的颜色
x = np.array(["Runoob-1", "Runoob-2", "Runoob-3", "C-RUNOOB"])
y = np.array([12, 22, 6, 18])
plt.bar(x, y,  color = ["#4CAF50","red","hotpink","#556B2F"])
plt.show()

# 设置柱形图宽度，bar() 方法使用 width 设置，barh() 方法使用 height 设置 height
x = np.array(["Runoob-1", "Runoob-2", "Runoob-3", "C-RUNOOB"])
y = np.array([12, 22, 6, 18])
plt.bar(x, y, width = 0.1)
plt.show()
```

### 饼图

使用 pyplot 中的 **pie()** 方法来绘制饼图。

pie() 方法语法格式如下：

```py
matplotlib.pyplot.pie(x, explode=None, labels=None, colors=None, autopct=None, pctdistance=0.6, shadow=False, labeldistance=1.1, startangle=0, radius=1, counterclock=True, wedgeprops=None, textprops=None, center=0, 0, frame=False, rotatelabels=False, *, normalize=None, data=None)[source]
```

**参数说明：**

- **x**：浮点型数组或列表，用于绘制饼图的数据，表示每个扇形的面积。
- **explode**：数组，表示各个扇形之间的间隔，默认值为0。
- **labels**：列表，各个扇形的标签，默认值为 None。
- **colors**：数组，表示各个扇形的颜色，默认值为 None。
- **autopct**：设置饼图内各个扇形百分比显示格式，**%d%%** 整数百分比，**%0.1f** 一位小数， **%0.1f%%** 一位小数百分比， **%0.2f%%** 两位小数百分比。
- **labeldistance**：标签标记的绘制位置，相对于半径的比例，默认值为 1.1，如 **<1**则绘制在饼图内侧。
- **pctdistance：**：类似于 labeldistance，指定 autopct 的位置刻度，默认值为 0.6。
- **shadow：**：布尔值 True 或 False，设置饼图的阴影，默认为 False，不设置阴影。
- **radius：**：设置饼图的半径，默认为 1。
- **startangle：**：用于指定饼图的起始角度，默认为从 x 轴正方向逆时针画起，如设定 =90 则从 y 轴正方向画起。
- **counterclock**：布尔值，用于指定是否逆时针绘制扇形，默认为 True，即逆时针绘制，False 为顺时针。
- **wedgeprops**：字典类型，默认值 None。用于指定扇形的属性，比如边框线颜色、边框线宽度等。例如：wedgeprops={'linewidth':5} 设置 wedge 线宽为5。
- **textprops**：字典类型，用于指定文本标签的属性，比如字体大小、字体颜色等，默认值为 None。
- **center**：浮点类型的列表，用于指定饼图的中心位置，默认值：(0,0)。
- **frame**：布尔类型，用于指定是否绘制饼图的边框，默认值：False。如果是 True，绘制带有表的轴框架。
- **rotatelabels**：布尔类型，用于指定是否旋转文本标签，默认为 False。如果为 True，旋转每个 label 到指定的角度。
- **data**：用于指定数据。如果设置了 data 参数，则可以直接使用数据框中的列作为 x、labels 等参数的值，无需再次传递。

pie() 函数还可以返回三个参数：

- `wedges`：一个包含扇形对象的列表。
- `texts`：一个包含文本标签对象的列表。
- `autotexts`：一个包含自动生成的文本标签对象的列表。

```py
y = np.array([35, 25, 25, 15])
plt.pie(y)
plt.show()

# 设置饼图各个扇形的标签与颜色
y = np.array([35, 25, 25, 15])

plt.pie(y,
        labels=['A','B','C','D'], # 设置饼图标签
        colors=["#d5695d", "#5d8ca8", "#65a479", "#a564c9"], # 设置饼图颜色
       )
plt.title("RUNOOB Pie Test") # 设置标题
plt.show()
```

突出显示第二个扇形，并格式化输出百分比

```py
import matplotlib.pyplot as plt

# 数据
sizes = [15, 30, 45, 10]
# 饼图的标签
labels = ['A', 'B', 'C', 'D']
# 饼图的颜色
colors = ['yellowgreen', 'gold', 'lightskyblue', 'lightcoral']
# 突出显示第二个扇形
explode = (0, 0.1, 0, 0)
# 绘制饼图
plt.pie(sizes, explode=explode, labels=labels, colors=colors,
        autopct='%1.1f%%', shadow=True, startangle=90)
# 标题
plt.title("RUNOOB Pie Test")
# 显示图形
plt.show()
```

### 直方图

使用 pyplot 中的 hist() 方法来绘制直方图。

hist() 方法语法格式如下：

```py
matplotlib.pyplot.hist(x, bins=None, range=None, density=False, weights=None, cumulative=False, bottom=None, histtype='bar', align='mid', orientation='vertical', rwidth=None, log=False, color=None, label=None, stacked=False, **kwargs)
```

**参数说明：**

- `x`：表示要绘制直方图的数据，可以是一个一维数组或列表。
- `bins`：可选参数，表示直方图的箱数。默认为10。（成 10 个等宽的区间）
- `range`：可选参数，表示直方图的值域范围，可以是一个二元组或列表。默认为None，即使用数据中的最小值和最大值。
- `density`：可选参数，表示是否将直方图归一化。默认为False，即直方图的高度为每个箱子内的样本数，而不是频率或概率密度。
- `weights`：可选参数，表示每个数据点的权重。默认为None。
- `cumulative`：可选参数，表示是否绘制累积分布图。默认为False。
- `bottom`：可选参数，表示直方图的起始高度。默认为None。
- `histtype`：可选参数，表示直方图的类型，可以是'bar'、'barstacked'、'step'、'stepfilled'等。默认为'bar'。
- `align`：可选参数，表示直方图箱子的对齐方式，可以是'left'、'mid'、'right'。默认为'mid'。
- `orientation`：可选参数，表示直方图的方向，可以是'vertical'、'horizontal'。默认为'vertical'。
- `rwidth`：可选参数，表示每个箱子的宽度。默认为None。
- `log`：可选参数，表示是否在y轴上使用对数刻度。默认为False。
- `color`：可选参数，表示直方图的颜色。
- `label`：可选参数，表示直方图的标签。
- `stacked`：可选参数，表示是否堆叠不同的直方图。默认为False。
- `**kwargs`：可选参数，表示其他绘图参数。

```py
import matplotlib.pyplot as plt
import numpy as np

# 生成一组随机数据
data = np.random.randn(1000)

# 绘制直方图
plt.hist(data, bins=30, color='skyblue', alpha=0.8)

# 设置图表属性
plt.title('RUNOOB hist() Test')
plt.xlabel('Value')
plt.ylabel('Frequency')

# 显示图表
plt.show()
```

使用 **hist()** 函数绘制多个数据组的直方图，并进行比较

```py 
import matplotlib.pyplot as plt
import numpy as np

# 生成三组随机数据
data1 = np.random.normal(0, 1, 1000)
data2 = np.random.normal(2, 1, 1000)
data3 = np.random.normal(-2, 1, 1000)

# 绘制直方图
plt.hist(data1, bins=30, alpha=0.5, label='Data 1')
plt.hist(data2, bins=30, alpha=0.5, label='Data 2')
plt.hist(data3, bins=30, alpha=0.5, label='Data 3')

# 设置图表属性
plt.title('RUNOOB hist() TEST')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.legend()

# 显示图表
plt.show()
```

结合 Pandas

```py
# 使用 NumPy 生成随机数
random_data = np.random.normal(170, 10, 250)
 
# 将数据转换为 Pandas DataFrame
dataframe = pd.DataFrame(random_data)
 
# 使用 Pandas hist() 方法绘制直方图
dataframe.hist()


# 设置图表属性
plt.title('RUNOOB hist() Test')
plt.xlabel('X-Value')
plt.ylabel('Y-Value')

# 显示图表
plt.show()
```

使用 Pandas 中的 Series 对象绘制直方图。只需将数据框中的列替换为 Series 对象即可

```py
# 生成随机数据
data = pd.Series(np.random.normal(size=100))

# 绘制直方图
# bins 参数指定了直方图中的柱子数量
plt.hist(data, bins=10)

# 设置图形标题和坐标轴标签
plt.title('RUNOOB hist() Tes')
plt.xlabel('X-Values')
plt.ylabel('Y-Values')

# 显示图形
plt.show()
```

## 9、图像方法

### imshow() 

imshow() 函数用于显示图像。

imshow() 函数常用于绘制二维的灰度图像或彩色图像。

imshow() 函数可用于绘制矩阵、热力图、地图等。

imshow() 方法语法格式如下：

```py
imshow(X, cmap=None, norm=None, aspect=None, interpolation=None, alpha=None, vmin=None, vmax=None, origin=None, extent=None, shape=None, filternorm=1, filterrad=4.0, imlim=None, resample=None, url=None, *, data=None, **kwargs)
```

**参数说明：**

- `X`：输入数据。可以是二维数组、三维数组、PIL图像对象、matplotlib路径对象等。
- `cmap`：颜色映射。用于控制图像中不同数值所对应的颜色。可以选择内置的颜色映射，如`gray`、`hot`、`jet`等，也可以自定义颜色映射。
- `norm`：用于控制数值的归一化方式。可以选择`Normalize`、`LogNorm`等归一化方法。
- `aspect`：控制图像纵横比（aspect ratio）。可以设置为`auto`或一个数字。
- `interpolation`：插值方法。用于控制图像的平滑程度和细节程度。可以选择`nearest`、`bilinear`、`bicubic`等插值方法。
- `alpha`：图像透明度。取值范围为0~1。
- `origin`：坐标轴原点的位置。可以设置为`upper`或`lower`。
- `extent`：控制显示的数据范围。可以设置为`[xmin, xmax, ymin, ymax]`。
- `vmin`、`vmax`：控制颜色映射的值域范围。
- `filternorm 和 filterrad`：用于图像滤波的对象。可以设置为`None`、`antigrain`、`freetype`等。
- `imlim`： 用于指定图像显示范围。
- `resample`：用于指定图像重采样方式。
- `url`：用于指定图像链接。

显示灰度图像

```py
import matplotlib.pyplot as plt
import numpy as np

# 生成一个二维随机数组
img = np.random.rand(10, 10)

# 绘制灰度图像
plt.imshow(img, cmap='gray')

# 显示图像
plt.show()
```

显示彩色图像

```py
# 生成一个随机的彩色图像
img = np.random.rand(10, 10, 3)

# 绘制彩色图像
plt.imshow(img)

# 显示图像
plt.show()
```

显示热力图

```py
# 生成一个二维随机数组
data = np.random.rand(10, 10)

# 绘制热力图
plt.imshow(data, cmap='hot')

# 显示图像
plt.colorbar()
plt.show()
```

显示地图

```py
# 加载地图图像, 下载地址：https://static.jyshare.com/images/demo/map.jpeg
img = Image.open('map.jpg')

# 转换为数组
data = np.array(img)

# 绘制地图
plt.imshow(data)

# 隐藏坐标轴
plt.axis('off')

# 显示图像
plt.show()
```

显示矩阵

```py
# 生成一个随机矩阵
data = np.random.rand(10, 10)

# 绘制矩阵
plt.imshow(data)

# 显示图像
plt.show()
```

### imsave() 

用于将图像数据保存到磁盘上的函数

imsave() 方法保存图片支持多种图像格式，例如 PNG、JPEG、BMP 等。

imsave() 方法的语法如下：

```py
matplotlib.pyplot.imsave(fname, arr, **kwargs)
```

**参数说明：**

- `fname`：保存图像的文件名，可以是相对路径或绝对路径。
- `arr`：表示图像的NumPy数组。
- `kwargs`：可选参数，用于指定保存的图像格式以及图像质量等参数。

```py
import matplotlib.pyplot as plt
import numpy as np

# 创建一个二维的图像数据
img_data = np.random.random((100, 100))

# 显示图像
plt.imshow(img_data)

# 保存图像到磁盘上
plt.imsave('runoob-test.png', img_data)
```

### imread() 

用于从图像文件中读取图像数据。

imread() 方法返回一个 numpy.ndarray 对象，其形状是 **(nrows, ncols, nchannels)**，表示读取的图像的行数、列数和通道数：

- 如果图像是灰度图像，则 nchannels 为 1。
- 如果是彩色图像，则 nchannels 为 3 或 4，分别表示红、绿、蓝三个颜色通道和一个 alpha 通道。

imread() 方法的语法如下：

```
matplotlib.pyplot.imread(fname, format=None)
```

**参数说明：**

- `fname`：指定了要读取的图像文件的文件名或文件路径，可以是相对路径或绝对路径。
- `format `：参数指定了图像文件的格式，如果不指定，则默认根据文件后缀名来自动识别格式。

```py
import matplotlib.pyplot as plt

# 读取图像文件，下载地址：https://static.jyshare.com/images/demo/map.jpeg
img = plt.imread('map.jpeg')

# 显示图像
plt.imshow(img)
plt.show()
```

## 10、使用 pandas 绘制图像

Pandas 提供了多种直接从 DataFrame 或 Series 中绘制图形的方法，利用 Matplotlib 作为底层绘图库。以下是一些常用的 Pandas 图表绘制方法：

plot 方法函数签名：

```py
DataFrame.plot(x=None, y=None, kind='line', ax=None, subplots=False, 
                sharex=None, sharey=False, layout=None,figsize=None, 
                use_index=True, title=None, grid=None, legend=True, 
                style=None, logx=False, logy=False, loglog=False, 
                xticks=None, yticks=None, xlim=None, ylim=None, rot=None,
                xerr=None,secondary_y=False, sort_columns=False, **kwds)
```

参数：

- x : label or position, default None
- y : label or position, default None
- kind : str
  ‘line’ : line plot (default)#折线图
  ‘bar’ : vertical bar plot#条形图
  ‘barh’ : horizontal bar plot#横向条形图
  ‘hist’ : histogram#柱状图
  ‘box’ : boxplot#箱线图
  ‘kde’ : Kernel Density Estimation plot#Kernel 的密度估计图，主要对柱状图添加Kernel 概率密度线
  ‘density’ : same as ‘kde’
  ‘area’ : area plot#不了解此图
  ‘pie’ : pie plot#饼图
  ‘scatter’ : scatter plot#散点图  需要传入columns方向的索引
  ‘hexbin’ : hexbin plot#不了解此图
- ax : 子图(axes, 也可以理解成坐标轴) 要在其上进行绘制的matplotlib subplot对象。如果没有设置，则使用当前matplotlib subplot其中，变量和函数通过改变figure和axes中的元素（例如：title,label,点和线等等）一起描述figure和axes，也就是在画布上绘图。
- subplots : boolean, default False#判断图片中是否有子图
  Make separate subplots for each column
- sharex : boolean, default True if ax is None else False#如果有子图，子图共x轴刻度，标签
  In case subplots=True, share x axis and set some x axis labels to invisible; defaults to True if ax is None otherwise False if an ax is passed in; Be aware, that passing in both an ax and sharex=True will alter all x axis labels for all axis in a figure!
- sharey : boolean, default False#如果有子图，子图共y轴刻度，标签
  In case subplots=True, share y axis and set some y axis labels to invisible
- layout : tuple (optional)#子图的行列布局
  (rows, columns) for the layout of subplots
- figsize : a tuple (width, height) in inches#图片尺寸大小
- use_index : boolean, default True#默认用索引做x轴
  Use index as ticks for x axis
- title : 图片的标题用字符串
- grid : boolean, default None (matlab style default)#图片是否有网格
  Axis grid lines
- legend : False/True/’reverse’#子图的图例，添加一个subplot图例(默认为True)
  Place legend on axis subplots
- style : list or dict#对每列折线图设置线的类型
  matplotlib line style per column
- logx : boolean, default False#设置x轴刻度是否取对数
  Use log scaling on x axis
- logy : boolean, default False
  Use log scaling on y axis
- loglog : boolean, default False#同时设置x，y轴刻度是否取对数
  Use log scaling on both x and y axes
- xticks : sequence#设置x轴刻度值，序列形式（比如列表）
  Values to use for the xticks
- yticks : sequence#设置y轴刻度，序列形式（比如列表）
  Values to use for the yticks
- xlim : 2-tuple/list#设置坐标轴的范围，列表或元组形式
- ylim : 2-tuple/list
- rot : int, default None#设置轴标签（轴刻度）的显示旋转度数
  Rotation for ticks (xticks for vertical, yticks for horizontal plots)
- fontsize : int, default None#设置轴刻度的字体大小
  Font size for xticks and yticks
- colormap : str or matplotlib colormap object, default None#设置图的区域颜色
  Colormap to select colors from. If string, load colormap with that name from matplotlib.
- colorbar : boolean, optional  #图片柱子
  If True, plot colorbar (only relevant for ‘scatter’ and ‘hexbin’ plots)
- position : float   
  Specify relative alignments for bar plot layout. From 0 (left/bottom-end) to 1 (right/top-end). Default is 0.5 (center)
- layout : tuple (optional)  #布局
  (rows, columns) for the layout of the plot
- table : boolean, Series or DataFrame, default False  #如果为正，则选择DataFrame类型的数据并且转换匹配matplotlib的布局。
  If True, draw a table using the data in the DataFrame and the data will be transposed to meet matplotlib’s default layout. If a Series or DataFrame is passed, use passed data to draw a table.
- yerr : DataFrame, Series, array-like, dict and str
  See Plotting with Error Bars for detail.
- xerr : same types as yerr.
- stacked : boolean, default False in line and
  bar plots, and True in area plot. If True, create stacked plot.
- sort_columns : boolean, default False  # 以字母表顺序绘制各列，默认使用前列顺序
- secondary_y : boolean or sequence, default False  ##设置第二个y轴（右y轴）
  Whether to plot on the secondary y-axis If a list/tuple, which columns to plot on secondary y-axis
- mark_right : boolean, default True
  When using a secondary_y axis, automatically mark the column labels with “(right)” in the legend
- kwds : keywords
  Options to pass to matplotlib plotting method



### 1. **Line Plot（折线图）**

- **方法**: `plot()`

- 示例

  ```
  python
  复制代码
  df.plot(x='Date', y='Value', kind='line')
  ```

- **用途**: 用于展示数据的变化趋势。

### 2. **Bar Plot（柱状图）**

- **方法**: `plot(kind='bar')` 或 `plot(kind='barh')`（水平柱状图）

- 示例

  ```
  python
  复制代码
  df.plot(kind='bar', x='Category', y='Value')
  ```

- **用途**: 用于比较不同类别的数据。

### 3. **Histogram（直方图）**

- **方法**: `plot(kind='hist')`

- 示例

  ```
  python
  复制代码
  df['Value'].plot(kind='hist', bins=20)
  ```

- **用途**: 用于展示数据分布的频率。

### 4. **Box Plot（箱线图）**

- **方法**: `plot(kind='box')`

- 示例

  ```
  python
  复制代码
  df.plot(kind='box')
  ```

- **用途**: 用于展示数据的分散程度、异常值等信息。

### 5. **Area Plot（面积图）**

- **方法**: `plot(kind='area')`

- 示例

  ```
  python
  复制代码
  df.plot(kind='area', x='Date', y='Value')
  ```

- **用途**: 类似于折线图，但用于强调累计的数值。

### 6. **Scatter Plot（散点图）**

- **方法**: `plot(kind='scatter')`

- 示例

  ```
  python
  复制代码
  df.plot(kind='scatter', x='Variable1', y='Variable2')
  ```

- **用途**: 用于展示两变量之间的关系。

### 7. **Pie Chart（饼图）**

- **方法**: `plot(kind='pie')`

- 示例

  ```
  python
  复制代码
  df['Value'].plot(kind='pie')
  ```

- **用途**: 用于展示数据的组成部分占整体的比例。

### 8. **Hexbin Plot（六边形图）**

- **方法**: `plot(kind='hexbin')`

- 示例

  ```
  python
  复制代码
  df.plot(kind='hexbin', x='X', y='Y', gridsize=30)
  ```

- **用途**: 用于展示两变量之间的关系，特别是在大数据集上有用。

### 9. **KDE Plot（核密度估计图）**

- **方法**: `plot(kind='kde')`

- 示例

  ```
  python
  复制代码
  df['Value'].plot(kind='kde')
  ```

- **用途**: 用于估计数据的概率密度函数。

### 10. **Subplots（子图）**

```
markdown复制代码- **方法**: `df.plot(subplots=True)`
- **示例**:
  ```python
  df.plot(subplots=True, layout=(2, 2), figsize=(10, 10))
  ```
- **用途**: 将多个列的图表绘制在同一个图中，形成子图布局。
```

### 11. **Dual Y-Axis Plot（双Y轴图）**

```
css复制代码- **方法**: `df.plot(secondary_y=['column_name'])`
- **示例**:
  ```python
  df.plot(x='X', y='Y1')
  df.plot(x='X', y='Y2', secondary_y=True)
  ```
- **用途**: 在同一个图表中展示两个不同量级的变量。
```

### 12. **Parallel Coordinates（平行坐标图）**

```
markdown复制代码- **方法**: `pd.plotting.parallel_coordinates`
- **示例**:
  ```python
  pd.plotting.parallel_coordinates(df, class_column='Class')
  ```
- **用途**: 用于在多维数据集上观察各变量的相关性。
```

这些方法为数据可视化提供了多种选择，具体使用哪种图形取决于你希望从数据中展示和获取的信息。
