---
title: WebApIs
icon: javascript
order: -2
---
## 1、WebAPIs介绍

严格意义上讲，我们在 JavaScript 阶段学习的知识绝大部分属于 ECMAScript 的知识体系，ECMAScript 简称 ES 它提供了一套语言标准规范，如变量、数据类型、表达式、语句、函数等语法规则都是由 ECMAScript 规定的。浏览器将 ECMAScript 大部分的规范加以实现，并且在此基础上又扩展一些实用的功能，这些被扩展出来的内容我们称为 Web APIs。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/guide.png)

ECMAScript 运行在浏览器中然后再结合 Web APIs 才是真正的 JavaScript，Web APIs 的核心是 DOM 和 BOM。

## 2、DOM概念

**DOM（Document Object Model）**是将整个 HTML 文档的每一个标签元素视为一个对象，这个对象下包含了许多的属性和方法，通过操作这些属性或者调用这些方法实现对 HTML 的动态更新，为实现网页特效以及用户交互提供技术支撑。
简言之 DOM 是用来动态修改 HTML 的，其目的是开发网页特效及用户交互。

### 2.1、DOM树

将 HTML 文档以树状结构直观的表现出来，我们称之为文档树或 DOM 树，**文档树直观的体现了标签与标签之间的关系。**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/web-api.jpg)

### 2.2、DOM 对象

DOM对象：浏览器根据html标签生成的JS对象
	所有的标签属性都可以在这个对象上面找到
	修改这个对象的属性会自动映射到标签身上

DOM的核心思想：把网页内容当做对象来处理

### 2.3、DOM 节点

**每一个节点都是一个 DOM 对象**，主要分为元素节点、属性节点、文本节点等。

1. 【元素节点】其实就是 HTML 标签，如上图中 `head`、`div`、`body` 等都属于元素节点。
2. 【属性节点】是指 HTML 标签中的属性，如上图中 `a` 标签的 `href` 属性、`div` 标签的 `class` 属性。
3. 【文本节点】是指 HTML 标签的文字内容，如 `title` 标签中的文字。
4. 【根节点】特指 `html` 标签。
5. 其它...

### 2.4、document对象

**`document`**对象 DOM里提供的一个对象，它提供的**属性和方法**都是用来**访问和操作网页内容**的

网页所有内容都在document内容里

## 3、DOM 对象的获取

### 3.1、根据CSS选择器获取

#### 3.1.1、querySelector  

querySelector   选择匹配的**第一个**元素

语法：

```js
document.querySelector('css选择器')
```

参数：包含一个或多个有效的CSS选择器的**字符串**

返回值：一个HTMLElement**对象**



举例：

```js
const box1 = document.querySelector('div')
const box2 = document.querySelector('.box')
const box3 = document.querySelector('#nav')
```

#### 3.1.2、querySelectorAll

querySelectorAll  满足条件的元素集合 返回 **伪数组**

语法：

```js
document.querySelectorAll('css选择器')
```

参数：包含一个或多个有效的CSS选择器**字符串**

返回值：**NodeList 对象集合** 的 **伪数组**
伪数组：有长度和索引，没有pop()，push()等数组方法
要得到里面的每一个对象，需要for遍历



举例：

```js
const lis = document.querySelectorAll('ul li')
```



### 3.2、其他方法（了解）

getElementById
getElementsByTagName
getElementsByClassName

## 4、DOM 操作元素内容

### 4.1、innerText

`innerText` 将文本内容添加、更新到任意标签位置，**文本中包含的标签不会被解析。**

```js
const intro = document.querySelector('.intro')
intro.innerText = '嗨~ 我叫李雷！'
intro.innerText = '<h4>嗨~ 我叫李雷！</h4>' //标签不会被解析
```

### 4.2、innerHTML

`innerHTML` 将文本内容添加、更新到任意标签位置，**文本中包含的标签会被解析。**

```js
const intro = document.querySelector('.intro')
intro.innerHTML = '嗨~ 我叫韩梅梅！'
intro.innerHTML = '<h4>嗨~ 我叫韩梅梅！</h4>' //标签会被解析
```

如果文本内容中包含 `html` 标签时推荐使用 `innerHTML`，否则建议使用 `innerText` 属性。

## 5、DOM 操作元素属性

### 5.1、常用属性

通过属性名修改

```js
// 1. 获取 img 对应的 DOM 元素
const img = document.querySelector('.img')
// 2. 修改属性
img.src = './A.jpg'
img.width = '500px';
img.alt = '图片不见了...'
```

### 5.2、CSS样式

#### 5.2.1、通过style修改CSS

通过修改行内样式 **style** 属性，实现对样式的动态修改。
通过元素节点获得的 **style** 属性本身的数据类型也是对象，如 **box.style.color**、**box.style.width**
如要遇到 css 属性中包含字符 `-` 时，要将 `-` 去掉并将其后面的字母**改成大写**，如 `background-color` 要写成 `box.style.backgroundColor`

通过这种方式生成的是**行内样式**，优先级高

该方式缺点：修改多个样式比较复杂

```js
const box = document.querySelector('.box')
box.style.width = '300px' //注意是字符串
box.style.backgroundColor = 'hotpink'

document.body.style.backgroundColor = 'skyblue'
```

#### 5.2.2、通过类名操作CSS

如果修改的样式比较多，可以借助css类名的形式

缺点：多个类名操作麻烦

语法：

```js
元素.className = 'css类名'
```

注意：
1、又去class是关键字，所以使用className去代替
2、className是使用 **新值换旧值** ，如果添加一个类，之前的类会作废，如果要保留，需要添加之前的类名

```js
//获取元素
const div = document.querySelector('div')
//添加类名
div.className = 'box' //css类名为box，将.box中的属性给div
div.className = 'nav box' //保留之前的类名，新增box
```

#### 5.2.3、通过classList操作类控制CSS

为了解决className容易覆盖之前的类名，可以通过**classList**方式**追加**和**删除**类名

语法：

```js
// 追加一个类
元素.classList.add('类名')
// 删除一个类
元素.classList.remove('类名')
// 切换一个类
元素.classList.toggle('类名')
```

举例：

```js
//1、获取元素
const box = document.querySelector('.box')
//2.1、追加类（add()，类名不加点，并且是字符串）
box.classList.add('nav')
//2.2、删除类 remove()
box.classList.remove('box')
//2.3、切换类 toggle() 有就删，没有就加上
box.classList.toggle('active')
```

###  5.3、表单元素属性

表单很多情况，也需要修改属性

正常有取值的属性跟其他的标签属性没有任何区别

获取:DOM对象.属性名
设置:DOM对象.属性名= 新值

```js
//获取元素
const input = document.querySelector('input')
//设置值
input.value = '小米手机'
input.type = 'password'
```

表单属性中添加就有效果，移除就没有效果，一律使用**布尔值表示**
如果为true，代表添加了该属性，如果是false代表移除了该属性
比如：**disabled，checked，selected**

```html
<input type="checkbox">
<script>
    const ipt = document.querySelector('input')
    ipt.checked = true //只接收布尔值
</script>
```

### 5.4、自定义属性

标准属性：标签天生自带的属性

自定义属性：
在html5中推出来了专门的data-**自定义属性**
在**标签上**一律以**data-**开头
在**DOM对象**上一律以**dataset**对象方式获取

举例：

```html
<div data-id="1" data-spm="AAA">1</div>
<script>
    const one = document.querySelector('div')
    console.log(one.dataset.id)
    console.log(one.dataset.spm)
</script>
```

## 6、间歇函数

### 6.1、定时器的使用

**setInterval()** 是 JavaScript 中内置的函数，它的作用是间隔固定的时间自动重复执行另一个函数，也叫**定时器函数**。

语法：**setInterval(函数，间隔时间)**

> 注：函数为函数名时，**不要加小括号**

作用：每间隔一段时间调用这个函数
间隔时间单位为**毫秒**

```js
setInterval(function(){
    console.log('AA');
},1000)

function fn() {
    console.log('1sec')
}
// setInterval(函数名,间隔时间) 函数名不要加小括号
setInterval(fn  ,1000)
```

### 6.2、关闭定时器

定时器的返回值是一个唯一的id

通过该id可以开启或关闭定时器

语法：

```js
let 变量 = setInterval(函数,间隔时间)
clearInterval(变量)
```

举例：

```js
let n = setInterval(fn,1000)
clearInterval(n) //关闭定时器
n = setInterval(fn,1000) //再次开启
```



### 6.3、 延时函数 setTimeout

js内置的一个用来代码延迟执行的函数，叫 **setTimeout**

语法：

```js
setTimeout(回调函数,等待的毫秒数)
```

setTImeout 仅仅**执行一次**，可以理解为就是把一段代码延迟执行，平时省略window

```html
<script>
	setTimeout(function(){
        console.log('时间到了')
    }，2000)
</script>
```

返回值`timeoutID`是一个正整数，表示定时器的编号。这个值可以传递给 `clearTimeout()`来取消该定时器

## 7、事件

**事件**：是在编程时，系统内发生的**动作**或者发生的事情（比如单击按钮）

**事件监听**：结合 DOM 使用事件时，需要为 DOM 对象添加事件监听，等待事件发生（触发）时，便立即调用一个函数。

### 7.1、事件监听

#### 7.1.1、addEventListener

**addEventListener** 是 DOM 对象专门用来添加事件监听的方法，它的两个参数分别为【事件类型】和【事件回调】。

语法：

```js
元素对象.addEventListener('事件类型',要执行的函数)
```

如果要执行的函数有函数名，直接填写函**数名，不需要加括号**

案例：

```html
<button>click</button>
<script>
    const btn =  document.querySelector('button')
    btn.addEventListener('click',function(){
        alert('Hi')
    })
</script>
```

> 注：在事件中定义的const类型常量会随着事件的结束被垃圾回收，每次事件发生都是独立的

#### 7.1.2、事件监听三要素

​	**事件源**：那个dom元素被事件触发了，要**获取dom元素**
​	**事件类型**：用什么**方式触发**（click，mouseover）
​	**事件调用函数**：要**做什么事**

注意：
	1、**事件类型**要加**引号**
	2、函数是点击之后再去执行，每次点击都会执行一次

#### 7.1.3、事件监听版本

DOM L0：事件源.on事件 = function(){ }
DOM L2：事件源.addEventListener(事件,事件处理函数)

区别：
	on 方法会被覆盖（一个按钮绑定多个事件，只执行一个）
	**addEventListenrer **方式可绑定多次，拥有时间更多特性（推荐）

### 7.3、鼠标事件

| 事件类型         | 解释                   |
| ---------------- | ---------------------- |
| **'click'**      | 单击事件               |
| **'mouseenter'** | 鼠标经过（推荐）       |
| **'mouseleave'** | 鼠标离开（推荐）       |
| ‘mouseover’      | 鼠标经过（有冒泡效果） |
| ‘mouseout’       | 鼠标离开（有冒泡效果） |
| 'mousemove'      | 鼠标移动               |

```js
const btn =  document.querySelector('button')
//单击事件
btn.addEventListener('click',function(){
    alert('Hi')
})

const div = document.querySelector('div')
//鼠标经过
div.addEventListener('mouseenter',function(){
    console.log('Hi');
})

const div = document.querySelector('div')
//鼠标离开
div.addEventListener('mouseleave',function(){
    console.log('Hi');
})
```

### 7.4、焦点事件

**焦点事件**常用于输入框 **input**

| 事件类型    | 解释         |
| ----------- | ------------ |
| **'focus'** | 有焦点出发   |
| **'blur'**  | 失去焦点触发 |

```js
const ipt = document.querySelector('button')
ipt.addEventListener('focus',function(){
    console.log('焦点触发');
})
ipt.addEventListener('blur',function(){
    console.log('失去焦点');
})
```

案例：列表的显示隐藏：

```js
//获取按钮、菜单
const input = document.querySelector('[type=search]')
const ul = document.querySelector('.list')
input.addEventListener('focus',function(){
    //显示隐藏菜单
    ul.style.display = 'block'
    input.classList.add('search')
})
input.addEventListener('focus',function(){
    //隐藏菜单
    ul.style.display = 'none'
    input.classList.add('search')
})
```

### 7.5、键盘事件

| 事件类型      | 解释         |
| ------------- | ------------ |
| **'keydown'** | 键盘按下触发 |
| **'keyup'**   | 键盘抬起触发 |

```js
const input = document.querySelector('input')
input.addEventListener('keydown',function(){
    console.log('按下键盘')
})
input.addEventListener('keyup',function(){
    console.log('抬起键盘')
})
```

### 7.6、文本框输入事件

| 事件类型    | 解释           |
| ----------- | -------------- |
| **'input'** | 文本框输入触发 |

```js
//用户输入文本事件
const input = document.querySelector('input')
input.addEventListener('input',function(){
    console.log(input.value)
})
```

### 7.7、页面加载事件

#### 7.7.1、load

加载外部资源（如图片，外联css和js等）加载完毕时触发的事件

事件名：**'load'**

监听页面所有资源加载完毕：
	**给window添加load事件**

```js
//等待页面中所有资源加载完毕，就回去执行回调函数
window.addEventListener('load',function(){
    //执行的操作
})
```

#### 7.7.2、DOMContentLoaded

当初始的HTML文档被完全加载和解析完成后，**DOMContentLoaded** 事件被触发，而无需等待演示表，图像等完成加载

事件名：**'DOMContentLoaded'**

```js
document.addEventListener('DOMContentLoaded',function(){
    //执行的操作
})
```

### 7.8、页面滚动事件

#### 7.8.1、scroll

滚动条在滚动时持续触发的事件

事件名：**'scroll'**

监听整个页面滚动：（给 window 或 document 添加 scroll 事件）

```js
//页面滚动事件
window.addEventListener('scroll',function(){
    //执行的操作
})
```

监听某个元素的内部读懂直接给某个元素添加即可

#### 7.8.2、scrollLeft 和 scrollTop 属性

**document.documentElement.scrollTop/scrollLeft**

> 注：document.documentElement：返回**HTML**

**scrollLeft** 和 **scrollTop** 属性：
	获取被卷去的大小
	获取元素内容往左，往上滚出去看不到的距离
	这两个值是可 **读写** 的

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230411201122.png)

```js
window.addEventListener('scroll',function(){
    /*页面滚动了多少像素*/
    const n = document.documentElement.scrollTop //n为被卷去的像素，数字型，不带单位
    if(n >= 100){...}
    
    //可读写：
    document.documentElement.scrollTop = 0 //回到页面顶部
})
```

### 7.9、页面尺寸事件

#### 7.9.1、resize

会在窗口尺寸改变的时候触发事件：**'resize'**

```js
window.addEventListener('rexize',function(){
    console.log(1)
})
```

#### 7.9.2、屏幕宽度

检测屏幕宽度属性：**document.documentElement.clientWidth**

```js
window.addEventListener('rexize',function(){
	let w = document.documentElement.clientWidth
    console.log(w)
})
```

#### 7.9.3、元素宽高

获取元素的部分宽高（**不包含border，margin，滚动条等**）

元素宽高：**clientWidth** 和 **clientHeight**

```js
const div = document.querySelector('div')
console.log(div.clientHeight); 
console.log(div.clientWidth); 
```

#### 7.9.4、元素尺寸与位置

##### 获取宽高：

​	获取元素的自身宽高（**包含**元素自身设置的**宽高** + **padding** + **border** 、滚动条）：**offsetWidth** 和 **offsetHeight**
​	获取出来的是**数值**，方便计算

> 注意：获取的是**可视宽高**，如果盒子是隐藏的，获取的结果是0

##### 获取位置：

获取元素距离自己 **定位父级** 元素的 **左、上距离**
**offsetLeft** 和 **offsetTop**，注意是**只读属性**

```js
const div = doocument.querySelector('div')
//检测盒子位置，最近一级带有定位的祖先元素
console.log(div.offsetLeft); 
```

##### 尺寸与位置：

element.**getBoundingClientRect**()
方法返回元素大小及 **相对于视口** 的位置

```js
const div = document.querySelector('div')
console.log(div.getBoundingClientRect())
```

##### 总结

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230412140703.png)

### 7.10、事件对象 

**事件对象**是一个**对象**，这个对象里有**事件触发时的相关信息**

例如：鼠标点击事件中，事件对象存储了鼠标点在哪个位置等信息
使用场景：
	判断用户按下哪个按键，判断鼠标点击了哪个元素

#### 7.10.1、获取事件对象

在事件绑定的回调函数的**第一个参数**就是**事件对象**
一般命名为 `event`、`ev` 、`ev`

```js
const btn = document.querySelector('button')
input.addEventListener('click',function(e){
    console.log(e)
})
```

#### 7.10.2、常见的事件对象属性

| 事件对象属性    | 含义                                    |
| --------------- | --------------------------------------- |
| type            | 当前事件类型                            |
| clientX/clientY | 光标相对于浏览器可见窗口左上角位置      |
| offsetX/offetcY | 光标相对于DOM元素左上角位置             |
| key             | 用户按下键盘键的值（不提倡使用keyCode） |
| target          | 用户点击的对象                          |

举例：

```js
const input = document.querySelector('input')
input.addEventListener('keyup',function(e){
    if(e.key === 'Entry'){
        console.log('按下了回车键')
    }                   
})
```

### 7.11、环境对象

环境对象：指定是 **函数内部** 的变量 **this** ，它代表着当前函数运行时所处的环境

每个函数里都有 `this` 环境对象 普通函数里this指向的是window
**谁调用，`this` 就是谁** (粗略概念)

```js
const btn = document.querySelector('button')
btn.addEventListener('click',function(){
    this.style.color = 'red' //this指btn
})
```

### 7.12、回调函数

将函数A作为参数给函数B时，称函数A为回调函数

```js
function fn(){
    consloe.log('A')
}
//fn传递给了setInterval，fn是回调函数
setInterval(fn,1000)

box.addEventListener('click',function(){
    consloe.log('我是回调函数')
})
```

### 7.13、M端事件（了解）

M端：移动端

移动端有触屏事件 touch

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230413203541.png)

```js
const div = document.querySelector('div')
div.addEventListener('touchstart',function(){'触摸'})
div.addEventListener('touched',function(){'离开'})
div.addEventListener('touchmove',function(){'移动'})
```

### 7.14、Window.confirm()

**`Window.confirm()`** 方法显示一个具有一个可选消息和两个按钮 (确定和取消) 的模态对话框。

```js
//result 是一个布尔值，表示是选择确定还是取消 (true 表示 OK)。
result = window.confirm(message);
```

### 7.15、change事件

当用户更改 **input、select、textarea** 元素的值时，`change` 事件在这些元素上触发。和 `input` 事件不同的是，并不是每次元素的 `value` 改变时都会触发 `change` 事件。

```js
dom.addEventListener('change', 方法);
```

### 7.16、其他事件

**https://www.runoob.com/jsref/dom-obj-event.html**

## 8、事件流

**事件流** 指的是时间完整执行过程中的流动路径

捕获阶段是【从父到子】的传导过程，冒泡阶段是【从子向父】的传导过程。

实际工作都是使用**事件冒泡**为主

### 8.1、事件捕获

事件捕获：从DOM的根元素开始去执行对应的事件（从外到里）
事件捕获需要写对应代码才能看到效果

代码：

```js
DOM.addEventListener(事件类型,事件处理函数,是否使用捕获机制(true/false))
```

```html
<div class="outer">
    <div class="inner">
        <div class="child"></div>
    </div>
</div>

<script>
    // 获取嵌套的3个节点
    const outer = document.querySelector('.outer');
    const inner = document.querySelector('.inner');
    const child = document.querySelector('.child');

    // 外层的盒子添加事件
    outer.addEventListener('click', function () {
        console.log('outer...')
    },true)

    // 中间的盒子添加事件
    outer.addEventListener('click', function () {
        console.log('inner...')
    },true)

    // 内层的盒子添加事件
    outer.addEventListener('click', function () {
        console.log('child...')
    },true)
</script>
```

单击事件触发时，先执行祖先元素，再执行子元素

### 8.2、事件冒泡

当元素触发时，依此向上调用所有父级元素的同名事件

**冒泡不阻止，一定会触发**

```html
<script>
    // 获取嵌套的3个节点
    const outer = document.querySelector('.outer');
    const inner = document.querySelector('.inner');
    const child = document.querySelector('.child');

    // 外层的盒子添加事件
    outer.addEventListener('click', function () {
        console.log('outer...')
    })

    // 中间的盒子添加事件
    outer.addEventListener('click', function () {
        console.log('inner...')
    })

    // 内层的盒子添加事件
    outer.addEventListener('click', function () {
        console.log('child...')
    })
</script>
```

### 8.3、阻止冒泡

有冒泡模式的存在，容易导致事件影响到父级元素
把事件限制在当前元素内，需要**阻止冒泡**

语法：

```js
e.stopPropagation()
```

注意：此方法可以阻断事件流传播，不光在冒泡阶段有效，捕获阶段也有效

```js
outer.addEventListener('click', function () {
        console.log('outer...')
    })
outer.addEventListener('click', function (e) {
    //阻止流动传播
    console.log('inner...')
    e.stopPropagation()
})
```



### 8.4、阻止默认行为

某些情况下需要阻止默认行为的发生，比如阻止链接跳转，表单域跳转

语法：

```js
e.preventDefault()
```

举例：

```html
<form action="www.bilibili.com">
    <input type="submit" value="注册">
</form>
<script>
	const form = document.querySelector('form')
    form.addEventListener('submit',function(e){
        //阻止默认行为 (提交)
        e.preventDefault()
    })
</script>
```

### 8.5、解绑事件

on 事件解绑：直接使用null覆盖就可以实现解绑

语法：

```js
btn.onclick = function(){
	alter('AA')
}
btn.onclick = null //点击无效

btn2.onclick = function(){
	alter('AA')
    btn2.onclick = null //只可点击一次
}

```

addEventListener 方式，必须使用 **removeEventListener**：

```js
removeEventListener(事件类型,事件处理函数 [,获取捕获或者冒泡阶段])
```

**注意：匿名函数无法被解绑**

```js
function fn() {
	alert('点击')
}
btn.addEventListener('click',fn)
btn.removeEventListener('click',fn) //移除事件解绑
```

### 8.6、事件委托

**事件委托**是**利用事件流**的特征解决一些现实开发需求，主要用于提升程序效率。

事件委托优点：减少注册次数，提高程序性能
事件委托原理：事件委托是利用事件冒泡的特点（给**父元素注册事件**，触发子元素时，**冒泡到父元素**上）

实现：

```js
e.target.tagName //获取真正触发事件的元素
```

举例：

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <p>不需要变色<p>
</ul>
<script>
    //点击li，触发ul的事件
    const ul = document.querySelector('ul')
    ul.addEventListener('click',function(e){
        //alert('A')
        //e.target.style.target = 'red' //通过事件对象获取点击的对象，改变其css样式
        //只有点击li才有效果：
        if(e.target.tagName === 'LI'){
            e.target.style.color = 'red'
        }
    })
</script>
```

## 9、日期对象

### 9.1、日期对象实例化

使用new关键词时，就是实例化对象

```js
// 1. 实例化
// const date = new Date(); // 得到当前时间
const date = new Date('2020-05-01 08:30:00') // 指定时间
// date 变量即所谓的时间对象
console.log(date)
```

### 9.2、日期对象方法

| 方法                     | 含义                                     |
| ------------------------ | ---------------------------------------- |
| getFullYear()            | 获取四位年份                             |
| getMonth()               | 获取月份，取值为 0 ~ 11                  |
| getDate()                | 获取月份中的每一天，不同月份取值也不相同 |
| getDay()                 | 获取星期，取值为 0 ~ 6                   |
| getHours()               | 获取小时，取值为 0 ~ 23                  |
| getMinutes()             | 获取分钟，取值为 0 ~ 59                  |
| getSeconds()             | 获取秒，取值为 0 ~ 59                    |
| getTime()                | 获取时间戳                               |
| +new Date() / Date.now() | 获取时间戳                               |
| **toLocalString**()      | **直接获取时间**                         |
| **toLoacalDateString**() | 获取日期                                 |
| **toLocalTimeString**()  | 获取时间                                 |

```js
// 1. 实例化
const date = new Date()

// 2. 获取时间戳
// 方法一
console.log(date.getTime())
// 方法二
console.log(+new Date())
// 方法三
console.log(Date.now())

// 获取指定时间时间戳
console.log(+new Date('2022-5-1 18:00:00'))

// 直接获取时间
const date = new Date()
console.log(date.toLocaleString());
```

制作 **倒计时** 的思路：
获取当前时间戳、将来时间戳。两者相减转换为秒，计算时分秒，添加定时器

## 10、节点操作

DOM树里每一个内容都称为节点
节点类型：
	元素节点（body，div，html`根节点`）
	属性节点（所有的属性 比如href）
	文本节点 （所有的文本）
	其他

### 10.1、获取节点

根据节点关系，找到并返回的都是对象

#### 10.1.1、父节点查找

**parentNode** **属性**
返回**最近**一级的**父**节点 找不到返回 null

```js
const baby = document.querySelector()
console.log(baby.parentNode) //返回DOM对象
console.log(baby.parentNodeparentNode)
```

#### 10.1.2、子节点查找

children 子节点：包括所有子节点（文本节点（空格、换行）、注释节点等）

**children 属性**
	仅获取所有元素节点
	返回值是一个**伪数组**

#### 10.1.3、兄弟关系查找

1、下一个兄弟节点：**nextElementSibling** 属性
2、上一个兄弟节点：**previousElementSibling** 属性

### 10.2、创建、插入节点

创造出一个新的网页元素，添加到网页内，一般**先创建节点，然后插入节**点

语法：

**createElement** ：动态创建任意 DOM 节点
**document.createElement('标签名')**

**appendChild** ：在末尾（结束标签前）插入节点
**父元素.body.appendChild(要插入的元素)**

**insertBefore** ：插入到某个父元素前面
**父元素.insertBefore(要插入的元素，在哪个元素前面)**

案例：

```js
const ul = document.querySelector('ul')
const li = document.createElement('li')
ul.qppendChild(li)
ul.insertBefore(li,ul.children[0])
```



### 10.3、克隆节点

复制一个节点，把复制的节点放入到指定的元素内部

**cloneNode** 复制现有的 DOM 节点，传入参数 true 会复制所有子节点
**元素.cloneNode(布尔值)**

cloneNode会克隆出一个根原标签一样的元素，括号内传入布尔值
	若为**true**，则代表克隆时会包含后代节点一起克隆（深克隆）
	若为**false**，则代表克隆时不包含后代节点
	默认为false

举例：

```js
const ul = document.querySelector('ul')
ul.appendChild(ul.children[0].cloneNode(true))
```

### 10.4、删除节点

在 js 原生DOM操作中，要删除元素必须通过 **父元素删除**

语法：
**父元素.removeChild(要删除的元素)**

> 注：若不存在父子关系则删除不成功
> 删除节点和隐藏节点有区别

```js
cosnt ul = document.querySelector('ul')
ul.removedChild(ul.children[0])
```

## 11、swiper插件

[swiper官网](https://www.swiper.com.cn/)
[swiper-demo](https://www.swiper.com.cn/demo/index.html)（查看想要的滑动条）
[swiper使用方法](https://www.swiper.com.cn/usage/index.html)（基础配置）
[API文档](https://www.swiper.com.cn/api/index.html)（配置选项）

## 12、BOM对象

### 12.1、BOM概念

BOM (Browser Object Model ) ： **浏览器对象模型**，定义了一套操作**浏览器窗口的API**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230414155652.png)

- window对象是一个全局对象，也可以说是JavaScript中的顶级对象
- 像document、alert()、console.log()这些都是window的属性，基本BOM的属性和方法都是window的
- 所有通过**var定义在全局作用域**中的变量、函数都会变成**window对象的属性和方法**
- window对象下的**属性和方法调用**的时候可以**省略window**

### 12.2、JS执行机制

#### 12.2.1、单线程

js 语言的一大特点是 **单线程** ，也就是说，**同一个时间只能做一件事**

为了解决这个问题，利用了多核cup计算能力，HTML5剔除Web Worker 标准，允许JS脚本创建多个线程，于是JS出现了 **同步** 和 **异步**

同步：前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的
异步：在做一件事的同时，可以器处理其他事情

本质区别：**流水线上各个流程的执行顺序不同**

#### 12.2.2、同步与异步

**同步任务**：
	都主线程上执行，形成一个**执行栈**

**异步任务**：
	JS的异步是通过回调函数实现的
	一般而言，异步任务有一下三种类型：
	1、**普通事件**：如**click、resize**
	2、**资源加载**：如load，error等
	3、**定时器**，包括**setInterval、setTimeout**t等
异步任务相关添加到 **任务队列**（消息队列）中

#### 12.2.3、事件循环

1、先执行 **执行栈中的同步任务**
2、异步任务放在**任务队列**（交给浏览器）中
3、一旦执行栈中所有同步任务执行完毕，系统就会按次序**读取任务队列**中的异步任务，被读取的任务异步任务结束等待状态，**进入执行栈，开始执行**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230414163715.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230414163808.png)



```js
let timer = setTImeout(回调函数,等待的毫秒数) //返回id，第几个定时器
clearTimeout(timer) 
```

### 12.3、location对象

**location 对象**，它拆分并保存了 URL 地址的各个组成部分

常用属性和方法：

| 属性/方法 | 说明                                           |
| --------- | ---------------------------------------------- |
| **href**  | 获取完整的 URL 地址，赋值时用于地址的跳转      |
| search    | 获取地址中携带的参数，符号 ？后面部分          |
| hash      | 获取地址中的啥希值，符号 # 后面部分            |
| reload()  | 用来刷新当前页面，传入参数 true 时表示强制刷新 |

```js
location.href = 'https://www.bilibili.com/' //执行跳转网页
```

### 12.4、navigator对象

**navigator 对象**，该对象下记录了浏览器自身的相关信息

常用的属性和方法：
通过 **userAgent** 属性检测浏览器的版本及平台

```js
// 检测 userAgent（浏览器信息）
(function () {
  const userAgent = navigator.userAgent
  // 验证是否为Android或iPhone
  const android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
  const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/)
  // 如果是Android或iPhone，则跳转至移动站点
  if (android || iphone) {
    location.href = 'http://m.itcast.cn'
  }})();
```

### 12.5、histroy对象

**history 对象**，主要管理历史记录， 该对象与浏览器地址栏的操作相对应，如前进、后退等

history对象一般在实际开发中比较少用，但是会在一些OA 办公系统中见到。

常用方法：

| 属性/方法 | 作用                                   |
| --------- | -------------------------------------- |
| back()    | 可以后退功能                           |
| forward() | 前进功能                               |
| go(参数)  | 参数为1，前进1个页面，-1，后退一个页面 |

## 13、本地存储

### 13.1、本地存储介绍

1、数据存储在 **用户浏览器** 中，类似于小型数据库
2、设置、读取方便，页面刷新不丢失数据
3、容量较大，sessionStorage 和 localStorage 约5M左右

常见的使用场景：
<https://todomvc.com/examples/vanilla-es6/>    页面刷新数据不丢失

### 13.2、localStorage

作用：将数据永久**存储在本地**（用户电脑），除非手动删除，否则关闭页面也会存在

特性：
	可以**多窗口**（页面）**共享**（**同一浏览器**共享）
	以 **键值对** 的形式存储使用

语法：

| 方法                            | 作用     |
| ------------------------------- | -------- |
| localStorage.setItem(key,value) | 存储数据 |
| localStorage.getItem(key)       | 读取数据 |
| localStorage.remove(key)        | 删除数据 |

**本地存储只能存储字符串类型**

```js
localStorage.setItem('111',18) //转换为字符串
localStorage.getItem('111')
localStorage.removeItem('111')
```

### 13.3、sessionStorage（了解）

**生命周期**为**关闭浏览器**窗口
在同一个窗口（页面）下数据可以共享
以键值对的形式存储使用 
用法跟localStorage基本相同

sessionStorage的方法与localStorage相同

### 13.4、通过JSON存储对象

本地只能存储字符串，无法存储无法数据类型

解决：需要将复杂数据类型转换成 **JSON** 字符串，存储到本地

语法：
  **JSON.stringify(复杂数据类型)** 将对象转换为JSON字符串
  **JSON.prase(localStotage.getItem('key'))** JSON字符串转换为对象

```js
const obj = {
    uname: 'AA',
    age: 18,
    gender: '男'
}
localStorage.setItem('obj',JSON.stringify(obj))
JSON.prase(localStotage.getItem('obj'))
```

## 14、数组map，join方法

### 14.1、map

利用 **map()** 和 **join()** 数组方法实现字符串拼接

后使用场景：
map 可以遍历数组 **处理数据**，并且 **返回新的数组**

map 也称为 **映射**。map重点在于有返回值，forEach没有返回值

语法：
**arr.map(function(ele,index){具体操作})**

举例：

```js
const arr = ['red','blue','pink']
const newArr = arr.map(function(ele,index){
    // console.log(ele); 数组元素
    // console.log(index); 索引
    return ele + '颜色' //返回数组，arr数组每个元素加颜色两个字
})
console.log(newArr);
```

### 14.2、join

join() 方法用于把数组中的所有元素 **转换为一个字符串**

语法：
**console.log(arr.join('分隔符'));** 

参数：
数组元素通过**参数**里面指定的**分隔符**进行分隔，**空字符串**('')，则所有元素之间都**没有任何字符**，不带参数，**默认**为**逗号分割**

```js
console.log(arr.join('')); //将数组中的元素全部加成一个字符串，没有分隔符
```

遍历数组元素时，可以通过 map 添加 tr，td 标签，通过 join 将新数组索引对应字符串传给 innerHtml ，完成表格渲染

## 15、正则表达式的使用

### 15.1、定义规则

```js
const reg =  /表达式/
```

- 其中` /   / `是正则表达式字面量
- 正则表达式也是**`对象 `**

### 15.2、常用方法

#### 15.2.1、test()

- **`test()方法`**   用来查看正则表达式与指定的字符串是否匹配
- 如果正则表达式与指定的字符串匹配 ，返回`true`，否则`false`

```js
// 正则表达式的基本使用
const str = 'web前端开发'
// 1. 定义规则
const reg = /web/
// 2. 使用正则  test()
console.log(reg.test(str))  // true  如果符合规则匹配上则返回true，否则返回false
console.log(/哈哈/.test('AAA')) //false 

```

#### 15.2.2、exec()

- **`exec() 方法`** 在一个指定字符串中执行一个搜索匹配
- 如果匹配成功，返回一个数组，否则为null

```js
regObj.exec(被检测字符串)
```

#### 15.2.3、replace()

```js
字符串.replace(/正则表达式/,'替换的文本')
```



### 15.3、元字符

元字符分类：
**边界符**：表示位置，开头，结尾，必须用什么开头，什么结尾
**量词**：表示重复次数
**字符类**：如\d，表示0~9

| 语法格式    | 示例                                                         | 说明                                               |
| ----------- | ------------------------------------------------------------ | -------------------------------------------------- |
| [字符列表]  | [abc] 含义：目标字符串包含**abc中的任何一个**字符 <br />目标字符串：plain 是否匹配：是 <br />原因：plain中的“a”在列表“abc”中 | 目标字符串中任何一个字符出现在字符列表中就算匹配。 |
| [^字符列表] | [^abc] 含义：目标字符串包含**abc以外**的任何一个字符 <br />目标字符串：plain 是否匹配：是 <br />原因：plain中包含“p”、“l”、“i”、“n” | 匹配字符列表中未包含的任意字符。                   |
| [字符范围]  | [a-z] 含义：所有小写英文字符组成的字符列表 <br />正则表达式：[A-Z] <br />含义：所有大写英文字符组成的字符列表 | 匹配指定范围内的任意字符。                         |

| 代码  | 说明           |
| ----- | -------------- |
| *     | 出现零次或多次 |
| +     | 出现一次或多次 |
| ?     | 出现零次或一次 |
| `{n} `  | 出现n次        |
| `{n,}`  | 出现n次或多次  |
| `{n,m}` | 出现n到m次     |

| 代码 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| .    | 匹配除换行字符以外的任意字符。                               |
| ^    | 匹配字符串的**开始**，但在[]中使用表示取反                   |
| \w   | 匹配字母或数字或下划线等价于[a-zA-Z0-9_]                     |
| \W   | 匹配任何非单词字符。等价于[^A-Za-z0-9_]                      |
| \s   | 匹配任意的空白符，包括空格、制表符、换页符等等。等价于[\f\n\r\t\v]。 |
| \S   | 匹配任何非空白字符。等价于[^\f\n\r\t\v]。                    |
| \d   | 匹配数字。等价于[0-9]。                                      |
| \D   | 匹配一个非数字字符。等价于[^0-9]                             |
| \b   | 匹配单词的开始或结束                                         |
| $    | 匹配字符串的结束                                             |

### 15.4、修饰符

- i 是单词 ignore 的缩写，正则匹配时字母不区分大小写
- g 是单词 global 的缩写，匹配所有满足正则表达式的结果
