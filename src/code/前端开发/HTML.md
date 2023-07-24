---
title: HTML 基础
icon: html
---
## 1、前导概念

**WEB标准：**
1.结构（HTML）
2.表现 （CSS3）
3.行为（JavaScript）

**HTML语法规范：**

```html
<html> 
	<head></head>
	<body></body>
</html>
<br />
```

**HTML基本结构标签：**

```html
<html></html> 	根标签
<head></head>	头部标签
<title></title>	标题标签，显示于标题栏
<body></body>	主体
```



**VSCode的基础用法：**

输入感叹号！回车创建基本骨架
必装插件：中文包，open in browser，AUTO Rename Tag，CSS peek

**感叹号输入默认代码解析：**

```html
<!DOCTYPE html>  	//文档申明标签
<html lang="en">	//代表英文网页（zh-CN 中文网页 主要用作翻译）
<head>
    <meta charset="UTF-8"> //定义字符集，一定要写
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>  
</body>
</html>
```

**HTML标签名大小写不敏感
标签拥有自己的属性（分为基本属性和时间属性）
标签分为单标签和双标签**

标签属性卸载开始标签内部
属性之间以**空格隔开**
**标签名与属性名**之间必须以**空格隔开**
属性之间没有顺序之分

# 1、h1 标题标签

```html
<h1></h1>
<h6></h6>

<h2 align = "left"></h2>
<h2 align = "right"></h2>
<h2 align = "center"></h2>
```

标题标签**加大加粗，独占一行**
属性：align 对齐属性（默认left 左对齐）

## 2、p 段落标签

```html
<p></p>	
```

paragraph段落标签
（1）根据浏览器窗口自动换行
（2）段落与段落有空隙

## 3、hr br 换行、水平线标签

```html
<br />
```

（1）break，打断，强制换行
（2）是单标签

```html
<hr>
```

水平线标签

## 4、文本格式化标签

```html
（1）加粗标签 <strong></strong> <b></b>
（2）倾斜标签 <em></em> <i></i>
（3）删除线  <del></del> <s></s>
（4）下划线 <ins></ins> <u></u>
```

如果要突出重要性，使用左边一排标签，语义更加强烈（标签语义化）

## 5、div、span 语义化标签

**（1）一个div独占一行 大盒子**
**（2）一行可放多个span 小盒子**

手机端使用较多：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230401113629.png)

# 6、img图象标签

```html
<img src="图象URL"  alt="替换文字" />
```

属性：
src	路径 **必须**的属性
alt	 用于图象不显示的**文字替换**
title=“aaa”	 提示文本
width=“500” 	宽度500px
height=“500” 	高度500px	
border="15" 	边框15px

> 注：宽度高度只修改一个是等比缩放，绝对路径与相对路径(**./** 与 **../**)

## 7、音、视频标签

### 音频标签

属性：
src	路径
controls	显示播放控件
autoplay	自动播放（部分浏览器不支持）
loop	循环播放

```html
<audio src="./XXX.mp3"></audio>
<audio src="./XXX.mp3" controls autoplay loop></audio>
```

### 视频标签

属性：
src	路径
controls	显示播放的控件
autoplay	自动播放（谷歌浏览器中需要配合muted实现静音播放）
loop	循环播放

```html
<video src="./XXX.mp4" controls></video>
<video src="./XXX.mp4" autoplay muted loop></video>
```

## 8、a 超链接标签



```html
<a href="跳转目标" target="目标窗口的弹出方式">文本或图像</a>
<a href="https://www.bilibili.com">bilibili</a> <!--外部链接-->
<a herf="./hello.html">hello</a> <!--内部连接-->
<a herf="#">空连接</a> <!--空连接-->	
<a herf="aaa.exe/zip">下载链接</a> <!--下载链接，文件为.exe或.zip等-->
<a herf="#id">锚点链接</a> <!--锚点链接,herf后跟#id值-->

<a href="" target="_self"></a>
<a href="" target="_blank"></a>
```

（1）herf为必须的属性，目标url地址
（2）target中
	**\_self**		为默认值当前页面打开
	**\_blank	 **为在新窗口中打开

## 9、注释

```html
<!--注释-->
```

快捷键 ctrl+/快速创建

## 10、字符实体

```html
&nbsp;	空格
&lt;	小于号 
&gt; 	大于号
```

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230401114019.png)

## 11、table 表格标签

**table > tr > td**

### 1、结构，单元格标签

**表格样式使用css样式**

```html
<table  border="1" width="600" height="400">
    <caption>标题</caption>
    <tr> <!--行-->
        <th>表头</th> <!--table head 居中加粗-->
        <th>表头</th>
    </tr>
    <tr> <!--行-->
        <td>1</td> <!--行内格-->
        <td>2</td>
    </tr>
</table>
```

table 标签是表格标签
	border 设置表格边框
	width 设置表格宽度
	height 设置表格高度
	aline 设置表格相对于页面的对齐方式
	cellspacing 设置单元格间距
	border-collapse collapse **合并边框**

tr 是行标签
th 是**表头**标签（thead）
tbody、tfoot （了解）
td 是**单元格**标签
	align 设置单元格文本对齐方式

**caption** 表格大标题，默认在表格整体顶部居中显示
captioin标签书写在table标签内部

**th表头单元格 td单元格**
thead 表头部标签 tbody表格主题区域
table标签不可省

```html
<table>
    <thead>
        <tr><th></th></tr>
    </thead>
    <tbody>
        <tr><td></td></tr>
    </tbody>
</table>
```

通过css样式修改表格样式

![image-20220612181816313](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220612181816313.png)

### 2、合并单元格

跨行合并：rowspan=-“合并单元格的个数”

跨列合并：colspan=“合并单元格的个数”

**目标单元格：**

跨行：最上侧单元格为目标单元格
跨列：最左边单元格为目标单元格
合并单元格三部曲：
（1）确定跨行还是跨列（2）找目标单元格写上合并方式（3）删除多余单元格

不能**跨结构标签**合并（不能跨thead、tbody、tfoot）

```html
<table>
    <tr> 
        <td colspan="2">1</td> 
        <!--<td>2</td> 删除-->
    </tr>
    <tr> 
        <td>3</td> 
        <td>4</td>
    </tr>
</table>
```

## 12、列表

### 1、无序列表

```html
<ul type="none">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

（1）无序列表各列表项之间没有顺序级别之分，是并列的
（2）**ul中只能有li标签**，不能有其他标签或文字。
（3）**type属性**可以修改列表项前面的符号

### 2、有序列表

```html
<ol>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ol>
```

（1）**ol中只能放li**，其他标签或文字是不被允许的
（2）li相当于一个容器，可以容纳所有元素
（3）**type属性**可以修改列表项前面的符号

### 3、自定义列表

```html
<dl>
    <dt>大哥</dt>
    <dd>小弟</dd>
    <dd>小弟</dd>
</dl>
```

（1）**dl中只能有dt和dd**
（2）dt和dd个数没有限制，通常是1对多

## 13、form 表单标签

### 1、表单域

```html
<form action="url地址" method="提交方式（get/post）" name="名称">
    表单域，将表单内的元素提交给服务器
</form>
```

表单域的属性

![image-20220614152819557](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220614152819557.png)

[autocomplete](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/autocomplete)属性：可用于以文本或数字作为输入的 `input` 、`textarea`、`select` 、`form` 元素，指定**浏览器**是否有权限在填写表单字段值时**提供自动帮助**，常用值：**off**

表单提交时，数据没有发送给服务器的三种情况：
1、表单项没有name属性值
2、单选，复选(下拉列表中的option标签)都需要添加value属性，以便发送给服务器
3、表单项不在提交的form标签中

get请求的的特点：
1、浏览器地址栏中的地址是：action属性[+?+请求参数]
	请求参数的格式是：name=value&name=value
2、不安全
3、有数据长度的限制

post请求的特点：
1、浏览器地址中只有action属性
2、相对于get安全
3、理论上没有数据长度限制

### 2、input表单元素

```html
<input />
```

（1）input是单标签，用于收集用户信息
（2）input标签中包含**type属性**用于确定input的形式

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230401110532.png)

```html
<form>
    用户名：<input type="text" name="username" value="请输入用户名" maxlength="6"> <br />
    密码：<input type="password" name="pwd"> <br />
    单选按钮：男 <input type="radio" name="sex" value="男" checked="checked"> 女<input type="radio" name="sex" value="女"> <br />
    多选按钮：A <input type="checkbox" name="D" value="A"> B <input type="checkbox" name="D"> C <input type="checkbox" name="D" checked="checked"> <br/>
    <input type="submit" value="提交"> <!--提交数据-->
    <input type="reset" value="重新填写"> <!--重置表单-->
    <input type="button" value="我是按钮"> <!--普通按钮，搭配js使用-->
    上传文件：<input type="file" nultiple> <!--文件域-->
</form>
```

**input的其他属性：**
（1）**placeholder**属性，占位符，提示用户输入内容的文本
（2）name是表单元素名字，**单选按钮的name要相同**
（3）value中的数据会传给后台
（4）**checked**属性用于单选按钮和复选按钮，当页面打开时就可以默认选中这个按钮
（5）maxlength 正整数，规定字符中的字符的最大长度
（6）type="file" **nultiple**：上传多个文件

### 3、label标签

```html
<label for="sex">男</label>
<input type="radio" name="sex" id="sex" /> <!--方法一-->

<label><input type="radio" name="man"></label> <!--方法二-->
```

lebel标签用于绑定一个表单元素，当**点击**label标签内**文本**时，**单选框会被选中**

**label标签中的for属性应当与相关元素id属性**

### 4、select下拉表单

```html
<select>
    <option selected="selected">江苏</option>
    <option>北京</option>
    <option>上海</option>
    <option>广东</option>
</select>
```

（1）select中至少包含一对option
（2）在option中定义selected="**selected**"时，为默认选中项

### 5、textarea文本域元素

```html
<form>
    评论：
	<textarea cols="50" rows="5">默认字符</textarea>
</form>
```

起始标签和结束标签中的内容是默认值
rows 属性设置可以显示几行的高度 
cols 属性设置每行可以显示几个字符宽度

## 14、iframe框架标签

iframe标签可以在页面上开辟一个小区域显示一个单独的页面
iframe和a标签组合使用的步骤：
	1、在iframe标签中使用name属性定义一个名称
	2、在a标签的target属性上设置iframe的name属性值

```html
<iframe src = "a.html" width="500" height="500" name="abc"></iframe>
<ul>
    <li><a href="0.html">AAA</a></li>
    <li><a href="1.html">BBB</a></li>
</ul>
```
