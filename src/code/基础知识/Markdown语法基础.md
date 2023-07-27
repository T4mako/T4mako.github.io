---
title: Markdown 语法基础
icon: markdown
category: 基础知识
tag:
  - 基础语法
  - Markdown
---

# Markdown 语法基础
[Markdown官方教程](https://markdown.com.cn/)  
编辑器推荐：[Typora](https://www.typora.io/)
## 概述
Markdown 是一种可以使用普通文本编辑器编写的 **标记语言**，通过简单的标记语法，它可以使普通文本内容具有一定的格式。
Markdown 的目标是实现「易读易写」


## 行内 HTML
不在 Markdown 涵盖范围之外的标签，都可以直接在文件里面用 HTML 撰写。不需要额外标注这是 HTML 或是 Markdown；只要直接加标签就可以了。

举例来说，在 Markdown 文件里加上一段 HTML 表格:
```md
<table>
    <tr>
        <td>Foo</td>
    </tr>
    <tr>
        <td>Foo</td>
    </tr>
</table>
```

## 换行
想要插入 `<br />` 标签或者换行的话，在行尾加上两个以上的空格 () 然后按 Enter

## 标题
在行首插入 1 到 6 个 `#` ，对应到标题 1 到 6 阶
```md
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
```

## 块引言
Markdown 使用 email 形式的块引言
在每行的最前面加上`>`  
或只在整个段落的第一行最前面加上`>`  
块引言可以有阶层 (例如: 引言内的引言)  
引言的块内也可以使用其他的 Markdown 语法，包括标题、列表、代码块等  

演示：
```md
> ## This is a header.
>
> 1. This is the first list item.
> 1. This is the second list item.
>
> Here's some example code:
>
>     return shell_exec("echo $input | $markdown_script");
```
效果：
> ## This is a header.
>
> 1. This is the first list item.
> 1. This is the second list item.
>
> Here's some example code:
>
>     return shell_exec("echo $input | $markdown_script");

## 列表
无序列表使用减号作为列表标记(也可使用星号、加号):
```md
- Red
- Green
- Blue
```
- Red
- Green
- Blue

有序列表则使用数字接着一个英文句点:  
```md
1.  Bird
2.  McHale
3.  Parish
```
1.  Bird
2.  McHale
3.  Parish


## 代码块
和代码相关的写作或是标签语言原始码通常会有已经排版好的代码块，通常这些块我们并不希望它以一般段落文件的方式去排版，而是照原来的样子显示，Markdown 会用 `<pre>` 和 `<code>` 标签来把代码块包起来。    
如果你想要在代码块里输入用 Markdown 表示的代码库，你可以进行嵌套。(使用多个)
`````
````md
```js
const a = 1;
```
````
`````
````md
```js
const a = 1;
```
````
## 代码段
如果要标记一小段行内代码，你可以用反引号把它包起来 (`)  
```md
`const a = 10`
```
`const a = 10`
## 分隔线
你可以在一行中用三个或以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号中间插入空白。下面每种写法都可以建立分隔线:
```md
---
```
---
## 链接
Markdown支持行内和参考两种方式，在此仅展示行内方式  


在方块括号后面马上接着括号并插入网址链接即可，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来即可  
```md
This is [an example](http://example.com/ "Title") inline link.   
[This link](http://example.net/) has no title attribute.
```
相对路径链接到同样主机的资源:
```md
See my [About](/about/) page.
```
## 强调与删除
使用星号 (*) 和底线 (_) 作为标记强调字词的符号  
被单个 * 或 _ 包围的字词会被转成用 `<em>` 标签包围  
用两个 * 或 _ 包起来的话，则会被转成 `<strong>`
```md
*em*
**strong**
```
*em*  
**strong**
删除:`~~delete~~`  ~~delete~~

## 图片
Markdown 使用一种和链接很相似的语法来标记图片，同样也允许两种样式: 行内 和 参考。再次仅展示行内方式。

行内图片的语法:
```md
![Alt text](/path/to/img.jpg)

![Alt text](/path/to/img.jpg "Optional title")
```
Markdown 还没有办法指定图片的宽高，如果你需要的话，你可以使用普通的 `<img>` 标签。

## 自动链接
```md
http://example.com/
<http://example.com/>

```
http://example.com/  
<http://example.com/>

## 转义字符
使用 `\` 用于对字符转义
```
Markdown 支持在下面这些符号前面加上反斜线来帮助插入普通的符号:
\ 反斜线
` 反引号
* 星号
_ 底线
{} 大括号
[] 方括号
() 括号
# 井字号
+ 加号
- 减号
. 英文句点
! 惊叹号
```
## 表格
要添加表，请使用三个或多个连字符（---）创建每列的标题，并使用管道（|）分隔每列。您可以选择在表的任一端添加管道。  
```md
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

对齐方式:  
居中使用`:-:`  ，右对齐使用`-:	`  ，左对齐使用`:-`    
```md
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

## Emoji
`:emoji名称:`  
`:smile:` 😄  
[Emoji列表](https://gist.github.com/rxaviers/7360908)  
[Emoji列表分类版](https://theme-hope.vuejs.press/zh/cookbook/markdown/emoji/)