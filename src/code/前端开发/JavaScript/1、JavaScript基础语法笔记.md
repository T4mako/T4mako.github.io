---
title: JavaScript 基础
icon: javascript
order: -3
---
js是一种运行在客户端（浏览器）的编程语言，实现人机交互效果

js的作用：网页特效、表单验证、数据交互、服务端编程（node.js）

js的组成：ECMAScript（js基础语言） + Web ApIs（DOM+BOM）

## 1、JS 引入方式

JavaScript 程序不能独立运行，它需要被嵌入 HTML 中，然后浏览器才能执行 JavaScript 代码。通过 `script` 标签将 JavaScript 代码引入到 HTML 中，有两种方式：

### 1.1、内部方式

通过 `script` 标签包裹 JavaScript 代码

内部方式通常写在底部（HTML的顺序加载）

```html
<body>
  <!-- 内联形式：通过 script 标签包裹 JavaScript 代码 -->
  <script>
    alert('hello')
  </script>
</body>
```

### 1.2、外部形式

一般将 JavaScript 代码写在独立的以 .js 结尾的文件中，然后通过 `script` 标签的 `src` 属性引入

```js
// demo.js
document.write('hello')
```

```html
<body>
  <!-- 外部形式：通过 script 的 src 属性引入独立的 .js 文件 -->
  <script src="demo.js"></script>
</body>
```

如果 script 标签 **使用 src 属性引入了某 .js 文件**，那么 标签 **内部的代码会被忽略**

```html
<body>
  <!-- 外部形式：通过 script 的 src 属性引入独立的 .js 文件 -->
  <script src="demo.js">
    // 此处的代码会被忽略
  	alert(666);  
  </script>
</body>
```

### 1.3、js的注释

单行注释：// 	`ctrl + /`
多行注释：/**/	`ctrl + alt + a`

### 1.4、结束符

在 JavaScript 中 `;` 代表一段代码的结束，多数情况下可以省略 `;` 使用**回车（enter）替代 ;**。（注：css必须写 `;` ）

实际开发中有许多人主张书写 JavaScript 代码时省略结束符 `;`

## 2、JS 输入、输出

### 2.1、输出

**`alert()`** ：页面弹出警告对话框
**``document.wirte()``**：向body输出内容或标签
**``console.log()`**：控制台输出语法，调试用 （简写：log）
**`console.dir(对象)`**：打印对象全部属性

```html
<script>
    alert(15)
    document.write(1)
    document.write('你好')
    document.write('<h1>title</h1>')
</script>
```

### 2.2、输入

向 `prompt()` 输入任意内容会以弹窗形式出现在浏览器中，一般提示用户输入一些内容。

```html
<script>
    prompt('input a number:')
</script>
```

## 3、JS 变量、常量

### 3.1、变量

#### 3.1.1、声明变量

语法： **let 变量名**

声明(定义)变量有两部分构成：声明关键字、变量名（标识）
let 即关键字，所谓关键字是系统提供的专门用来声明（定义）变量的词语

```html
<script> 
    let age
</script>
```

`let` 和 `var` 都是 JavaScript 中的声明变量的关键字，推荐使用 `let` 声明变量

#### 3.1.2、变量赋值

声明（定义）变量相当于创造了一个空的“容器”，通过赋值向这个容器中添加数据。

```html
<script>
    // 声明
    let age
    // 赋值
    age = 18
    
    let num = 10
    num = 12
    let a = 1, b = 2
</script>
```

> 注意：字符串需要加引号

#### 3.1.3、关键字

以下是使用 `let` 时的注意事项：

1. 允许声明和赋值同时进行
2. **不允许重复声明**
3. 允许同时声明多个变量并赋值
4. JavaScript 中内置的一些关键字不能被当做变量名

以下是使用 `var` 时的注意事项：

1. 允许声明和赋值同时进行
2. **允许重复声明**
3. 允许同时声明多个变量并赋值
4. 可以先使用 再声明

#### 3.1.4、变量命名规则

关于变量的名称（标识符）有一系列的规则需要遵守：

1. 只能是**字母、数字、_  、$**，且不能能数字开头
2. 字母**区分大小写**，如 Age 和 age 是不同的变量
3. JavaScript 内部已占用于单词**（关键字或保留字）不允许使用**
4. 尽量保证变量具有一定的语义，见字知义
5. 命名使用**小驼峰**，如userName

### 3.2、常量

使用 **const** 声明的变量称为“常量”
命名规范：和变量一致
声明变量建议：**const优先**，**数组和对象**尽量使用const

```js
const PI = 3.14
```

注意： **常量**不允许重新赋值,**声明的时候必须赋值（初始化）**

> 注意：const声明的对象，可以改变它的属性方法 

### 3.3、数组

数组的定义：

```js
let arr = [data1,data2,data3...]
let arr = [10,20,30,50,'aaa']
```

数组的取值：

```js
let arr = [10,20,30,50,'aaa']
alert(arr[0])
```

数组的长度：

```js
console.log(arr.length)
```

## 4、JS 数据类型

JS 数据类型整体分为两类：
	基本数据类型（number，string，boolean，undefined，null）
	引用数据类型（object对象）

### 4.1、number 数值类型

JavaScript 中的数值类型与数学中的数字是一样的，分为正数、负数、小数等

```js
let score = 100 // 正整数
let price = 12.345 // 小数
let temperature = -40 // 负数
```

算数运算符：+ - * / %	（加减乘除 取余）

**NaN （not a number）** 代表一个计算错误，它是一个不正确的或者一个未定义的数学操作
NaN 是**粘性**的。任何对NaN的操作都会返回NaN

```js
console.log('你好' - 2); // NaN
console.log(NaN - 2); // NaN
console.log(NaN === NaN); // false
```

### 4.2、字符串类型

通过单引号（ `''`） 、双引号（ `""`）或反引号包裹的数据都叫字符串，**单引号**和**双引号没有本质上的区别**，推荐**使用单引号**。

注意事项：
	1、无论单引号或是双引号必须成对使用
	2、单引号/双引号可以互相嵌套，但是不以自已嵌套自已（引号找与之匹配的最近的）
	3/必要时可以使用**转义符 `\`**，输出单引号或双引号

字符串拼接：+ 可以实现字符串拼接

```js
let str = 'AA'
let str2 = 'BB'
alert(str + str2)
let age = 18
alert(str + str2)
alert(str + age)
```

### 4.3、模板字符串

拼接字符串和变量比较麻烦，因此引入**模板字符串**

语法：**\`\`** （反引号）
内容拼接变量时，用 **${}** 包住变量

```js
let age = 18
document.write(`今年${age}岁了`)
```

### 4.4、boolean 类型

boolean类型的两种取值：**true、false**

```js
let bool = true
console.log(bool);
```

显示装换 Boolen()： 
**`''、0、undefined、null、false、NaN `**转换为布尔值后都是 **false**，其余则为 True

### 4.5、undefined 未定义类型

未定义类型只有一个值：undefined

只声明变量，**不赋值的情况下，变量默认值为undefined**，一般很少（直接）为某个变量赋值为undefined

```html
<script> 
    // 只声明了变量，并末赋值
    let tmp;
    document.write(tmp) // 结果为 undefined
</script>
```

### 4.6、null 空类型

```js
let obj = null
```

undefined 	表示没有赋值
null 	表示赋值了，但是内容为空（null：尚未创建的对象）

### 4.7、检测数据类型

通过关键字 typeof 检测数据类型

用法：
	**1、作为运算符：typeof data**
	**2、函数形式：type(data)**

```js
let obj = null
console.log(typeof obj) //object
```

### 4.8、类型转换

#### 4.8.1、隐式转换

某些运算符被执行时，系统内部自动将数据类型进行转换，这种转换称为隐式转换

`console.log(+'123') //转换为数字型`

```js
let num = 13 // 数值
let num2 = '2' // 字符串

//将数值 num 转换成了字符串，相当于 '13'
console.log(num + num2) //132

// 原因是将字符串 num2 转换成了数值，相当于 2
console.log(num - num2) //11

console.log(+'123') //转换为数字型

console.log('1' * 5); //5
```

#### 4.8.2、显示转换

为了避免因隐式转换带来的问题，通常根逻辑需要对数据进行显示转换。

通过 `Number` 显示转换成数值类型，当转换失败时结果为 `NaN`
NaN 也是number 类型的数据，代表非数字

语法：**Number(data)**
			**praseInt(data)**	只保留整数
			**parseFloat(data)**	可以保留小数

```js
let str = '123'
console.log(Number(str)) //123

console.log(parseInt('12.5px3')); //12
console.log(parseFloat('15.25px50.5')) //51.25
console.log(parseFloat('aaa15.25px50.5')) //NaN
```

## 5、JS 运算符

### 5.1、算数运算符

| 运算符 | 作用 |
| ------ | ---- |
| +      | 求和 |
| -      | 求差 |
| *      | 求积 |
| /      | 求商 |
| %      | 取余 |

注意：在计算失败时，显示的结果是 NaN （not a number）

### 5.2、赋值运算符

| 运算符 | 作用     |
| ------ | -------- |
| +=     | 加法赋值 |
| -+     | 减法赋值 |
| *=     | 乘法赋值 |
| /=     | 除法赋值 |
| %=     | 取余赋值 |

### 5.3、自增/自减运算符

| 符号 | 作用 | 说明                       |
| ---- | ---- | -------------------------- |
| ++   | 自增 | 变量自身的值加1，例如: x++ |
| --   | 自减 | 变量自身的值减1，例如: x-- |

### 5.4、比较运算符

根据比较结果返回一个布尔值（true / false）

| 运算符  | 作用                                     |
| ------- | ---------------------------------------- |
| >       | 左边是否大于右边                         |
| <       | 左边是否小于右边                         |
| >=      | 左边是否大于或等于右边                   |
| <=      | 左边是否小于或等于右边                   |
| **===** | 左右两边是否 **类型和值** 都相等（重点） |
| ==      | 左右两边 **值** 是否相等                 |
| !=      | 左右值**不相等**                         |
| !==     | 左右两边是否**不全等**（值和数据）       |

```js
// 比较运算符有隐式转换 把 '2' 转换为 2 
// == 值判断值
// 以后判断相等用===
console.log(2 == '2') //true
console.log(2 !== '2') //true
console.log(2 === '2') //false

//ascii比较
console.log('aa' < 'aac') //true
//涉及到NaN都是false
console.log(NaN === NaN) //false
```

> 注意：尽量不要比较小数，小数有精度问题
> 不同类型之间比较会发生隐式转换，转换成number类型再比较
> 因此开发中，使用 **===** 和 **!\==** 更多

### 5.5、逻辑运算符

| 符号 | 名称   | 日常读法 | 特点                       | 口诀           |
| ---- | ------ | -------- | -------------------------- | -------------- |
| &&   | 逻辑与 | 并且     | 符号两边有一个假的结果为假 | 一假则假       |
| \|\| | 逻辑或 | 或者     | 符号两边有一个真的结果为真 | 一真则真       |
| !    | 逻辑非 | 取反     | true变false  false变true   | 真变假，假变真 |

**|| 与 && 有短路现象**

**逻辑运算符优先级： ！> && >  ||**

### 5.6、展开运算符

展开运算符：**`...`** ，将一个**数组 / 对象**进行**展开**

```js
const arr = [1,2,5,6,8]
console.log(...arr) // 1,2,5,6,8

const obj = {
    name: 'A',
    age: 18
}
const o = {...obj} //浅拷贝
console.log(o);
```

说明：该方式不会修改原数组

典型运用场景：求数组**最大值**，**合并数组**等

```js
const arr = [1,8,9,6,3,5]
const arr2 = [5,9,6,3,2]
console.log(Math.max(...arr))
const arr3 = [...arr,...arr2]
```

## 6、JS 流程控制

### 6.1、if

语法：

```js
if(条件表达式) {
  // 满足条件要执行的语句
} [else [if] {

}]
```

小括号内的结果若**不是布尔类型**时，会发生**类型转换**为布尔值，类似Boolean()

如果大括号只有一个语句，大括号可以省略（不建议）

> **所有数字，除了0都是 true**
> **所有字符串，除了空字符串都是 true**

```js
// 1. 用户输入
let score = +prompt('请输入成绩：') //转number
// 2. 判断输出
if (score >= 90) {
    alert('A')
} else if (score >= 70) {
    alert('B')
} else if (score >= 60) {
    alert('C')
} else {
    alert('D')
```

### 6.2、三元运算符

语法：**条件 ? 表达式1 : 表达式2** 

如果条件为真，则执行表达式1
如果条件为假，则执行表达式2

```js
let num = +prompt('请您输入一个数字:')
num = num >= 10 ? num : 0 + num
alert(num)
```

### 6.3、switch

switch中的值与case中的值进行 **全等** 运算

1. switch case语句一般用于等值判断, if适合于区间判断
2. switch case一般需要配合break关键字使用 没有break会造成case穿透（继续执行）
3. if 多分支语句开发要比switch更重要，使用也更多

```js
switch (2) {
    case 1:
        console.log('您选择的是1')
        break  // 退出switch
    case 2:
        console.log('您选择的是2')
        break  // 退出switch
    case 3:
        console.log('您选择的是3')
        break  // 退出switch
    default:
        console.log('没有符合条件的')
}
```

### 6.4、while

循环三要素：
1、初始值 （经常用变量）
2、终止条件
3、变量的变化量

while(true) 来构造“无限”循环，需要使用break退出循环。（常用）

语法：

```js
while (条件表达式) {
   // 循环体    
}
```

```js
while (i <= 3) {
  document.write('AA')
  i++
}
```

### 6.5、for

for(;;) 也可以来构造“无限”循环，同样需要使用break退出循环

```js
for(let i = 1; i <= 6; i++) {
    document.write(`<h${i}>循环控制，即重复执行<h${i}>`)
}
```

当如果明确了循环的次数的时候推荐使用`for`循环,当不明确循环的次数的时候推荐使用`while`循环
`for` 的语法结构更简洁，故 `for` 循环的使用频次会更多。

练习：九九乘法表

css：

```css
span {
    display: inline-block;
    width: 100px;
    padding: 5px 10px;
    border: 1px solid pink;
    margin: 2px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(255, 192, 203, .4);
    background-color: rgba(255, 192, 203, .1);
    text-align: center;
    color: hotpink;
}
```

js：

```js
 // 外层打印几行
for (let i = 1; i <= 9; i++) {
    // 里层打印几个星星
    for (let j = 1; j <= i; j++) {
        // 只需要吧 ★ 换成  1 x 1 = 1   
        document.write(`
		<div> ${j} x ${i} = ${j * i} </div>
     `)
    }
    document.write('<br>')
}
```

### 6.6、终止循环

**break**   中止整个循环，一般用于结果已经得到, 后续的循环不需要的时候可以使用

**continue**  中止本次循环，一般用于排除或者跳过某一个选项的时候

## 7、浏览器断点调试

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230405215004.png)

鼠标依附到变量可以看到值

或者主动查看值：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230405215228.png)

## 8、数组

### 8.1、数组定义

1、字面量声明数组（推荐）：

使用 [] 来定义一个空数组，定义一个空数组，然后赋值给变量：

```html
<script>
  let classes = ['小明', '小刚', '小红', '小丽', '小米']
</script>
```

2、使用new Array构造函数声明

```html
<script>
    let arr = new Array(1,2,3,4)
</script>
```

### 8.2、访问数组

索引值实际是按着数据单元在数组中的位置依次排列的，注意是从` 0` 开始的

数组[下标]

```html
<script>
  let classes = ['小明', '小刚', '小红', '小丽', '小米']  
  // 访问数组，语法格式为：变量名[索引值]
  document.write(classes[0]) // 结果为：小明
</script>
```

### 8.3、数据单元值类型

数组做为数据的集合，它的单元值可以是任意数据类型

```html
<script>
  let mixin = [true, 1, false, 'hello']
</script>
```

### 8.4、数组长度属性

数组在 JavaScript 中并不是新的数据类型，它属于对象类型。

**arr.length**

```html
<script>
  // 定义一个数组
  let arr = ['html', 'css', 'javascript']
  // 数组对应着一个 length 属性，它的含义是获取数组的长度
  console.log(arr.length) // 3
</script>
```

### 8.5、数组函数

| 函数        | 作用                                           |
| ----------- | ---------------------------------------------- |
| push()      | 动态向数组的**尾部**添加一个单元               |
| unshift()   | 动态向数组**头部**添加一个单元                 |
| pop()       | **删除最后**一个单元                           |
| shift()     | **删除第一个**单元                             |
| splice(a,b) | 动态**删除任意**单元，a：起始位置，b：删除几个 |

使用以上4个方法时，都是直接在原数组上进行操作，即成功调任何一个方法，原数组都跟着发生相应的改变。并且在添加或删除单元时 `length` 并不会发生错乱。

```html
<script>
  // 定义一个数组
  let arr = ['html', 'css', 'javascript']

  // 1. push 动态向数组的尾部添加一个单元
  arr.push('Nodejs')
  console.log(arr)
  arr.push('Vue','EUI')

  // 2. unshit 动态向数组头部添加一个单元
  arr.unshift('VS Code')
  console.log(arr)

  // 3. splice 动态删除任意单元
  arr.splice(2, 1) // 从索引值为2的位置开始删除1个单元
  console.log(arr)

  // 4. pop 删除最后一个单元
  arr.pop()
  console.log(arr)

  // 5. shift 删除第一个单元
  arr.shift()
  console.log(arr)
</script>
```

## 9、函数

### 9.1、函数声明和调用

**声明（定义）：**
一个完整函数包括关键字、函数名、形式参数、函数体、返回值5个部分

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/function.jpg)

**调用：**
声明（定义）的函数必须调用才会真正被执行，使用 `()` 调用函数。

```html
<script>
    // 声明（定义）了最简单的函数，既没有形式参数，也没有返回值
    function sayHi() {
        console.log('嗨~')
    }
    // 函数调用，这些函数体内的代码逻辑会被执行
    // 函数名()
    sayHi()
</script>
```

> 注：函数名的命名规则与变量是一致的，并且尽量保证函数名的语义。

### 9.2、函数的参数

通过向函数传递参数，可以让函数更加灵活多变，参数可以理解成是一个变量。

1. 声明（定义）函数时的形参没有数量限制，当有多个形参时使用 **`,`** 分隔
2. 调用函数传递的实参要与形参的顺序一致

```html
<script>
    function sayHi(name) {
        // 参数 name 可以被理解成是一个变量
        console.log(name)
    }

    sayHi('小红') // 结果为 小红
</script>
```

### 9.3、形参与实参

形参：**声明函数**时写的参数为形参
实参：**调用函数**时写的参数为实参

形参可以理解为是在这个函数内声明的变量（比如 num1 = 10）实参可以理解为是给这个变量赋值

**给参数的默认值：**

```html
<style>
    /*传参不执行赋值*/
    function getSum(x = 0,y = 0){
        document.write(x + y)
    }
    getSum(1,2) /*3*/
    getSum() /*0*/
</style>
```

举例：

```html
<script>
    function getArrSum(arr = []){
        let sum = 0
        for(let i = 0;i < arr.length;i++){
            sum += arr[i]
        }
        console.log(sum);
    }
    getArrSum([,2,3,4,5])
</script>
```

定义两个相同的函数，后面的会覆盖前面的

在Js中，**实参**的**个数**和**形参**的**个数**可能**不一致**
	如果 形参 过多，自动填上undefined
	如果实参过多，多余的会被忽略（函数内部有一个arguments，里面装着所有实参）

### 9.4、返回值

函数的本质是封装，函数体内的逻辑执行完毕后，要想获得函数内部逻辑的执行结果，需要通过 **`return`** 这个关键字，将内部执行结果传递到函数外部

1. 在函数体中使用 **return** 关键字能将内部的执行结果交给函数外部使用
2. 函数内部只能出现1 次 return，并且 **return 下一行代码不会再被执行**，所以return 后面的数据不要换行写
3. **return会立即结束当前函数**
4. 函数可以**没有return**，这种情况**默认返回值为 undefined**

```html
<script>
    // 定义求和函数
    function count(a, b) {
        let s = a + b
        return s
    }
    
    let total = count(5, 12)
</script>
```

### 9.5、作用域

作用域的使用提高了程序逻辑的**局部性**，增强了程序的可靠性，减少了名字冲突。

#### 9.5.1、全局作用域

作用于所有代码执行的环境(整个 script 标签内部)或者一个独立的 js 文件
处于全局作用域内的变量，称为全局变量

#### 9.5.2、局部作用域

作用于函数内的代码环境，就是局部作用域。 因为跟函数有关系，所以也称为函数作用域。
处于局部作用域内的变量称为局部变量

> 如果函数内部，变量没有声明，直接赋值，也当全局变量看，但是**强烈不推荐**
> 但是有一种情况，函数内部的形参可以看做是局部变量。

#### 9.5.3、找值方式

从当前函数逐层往外层函数查找（先局部，再全局 就近原则 ）

```js
let num = 10
function fn(){
    function fun(){
        console.log(num); //输出10
    }
    fun()
}
fn()
```



### 9.6、匿名函数

函数可以分为**具名函数**和**匿名函数**

**匿名函数：没有名字的函数,无法直接使用。**

#### 9.6.1、函数表达式

```js
// 声明
let fn = function() { 
   console.log('函数表达式')
}
// 调用
fn()
```

函数表达式 和 具名函数（functioin fn() {}）:
	1、具名函数的调用可以写到任何位置
	2、函数表达式，必须先声明函数表达式，后调用

#### 9.6.2、立即执行函数

好处：避免全局变量之间的污染

```js
(function(){ 函数体  })();
(function(){ 函数体 }());

(function(x,y) { /*形参*/
    console.log(1,2)
})(1,2); /*实参*/
```

无需调用，立即执行，其实本质已经调用了
多个立即执行函数之间用分号隔开

## 10、对象

对象是 JavaScript 数据类型的一种，之前已经学习了数值类型、字符串类型、布尔类型、undefined。
**对象数据类型**可以被理解成是一种数据集合。它由**属性和方法两部分**构成。

### 10.1、对象声明

语法：

1. 属性包括属性名和值，它们之间使用 `:` 分隔
2. 多个属性之间使用 `,` 分隔
3. 属性就是依附在对象上的变量
4. **属性名**可以使用 **`""` 或 `''`**，一般情况下省略，除非名称遇到**特殊符号如空格、中横线等**

```js
let obj = {
    属性名: 属性值,
    方法名: 函数
}
```

```html
<script>
    // 声明对象类型变量，使用一对花括号
    // user 便是一个对象了，目前它是一个空对象
    let user = {}
</script>
```

```js
let person = {
    name: '小明', // 描述人的姓名
    age: 18, // 描述人的年龄
    stature: 185, // 描述人的身高
    gender: '男', // 描述人的性别
};
```

### 10.2、属性增删改查

访问属性：**对象名.属性名** 或 **对象名['属性名']**
修改属性：**对象名.属性名 = 值** 或  **对象名['属性名'] = 值**
增加属性：**对象名.新属性 = 新值**
删除属性（了解）：delete 对象名.属性

注：使用**中括号写法**要带**引号`''`**

```html
<script>
    // 声明一个空的对象（没有任何属性）
    let user = {}
    // 动态追加属性
    user.name = '小明'
    user['age'] = 18
</script>
```

### 10.3、方法和调用

语法

1. 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
2. 多个方法之间使用 `,` 分隔
3. 方法是依附在对象中的函数
4. 方法名可以使用 **`""` 或 `''`**，一般情况下省略，除非名称遇到**特殊符号如空格、中横线等**

方法调用：**对象名.方法名**

```js
let person = {
    name: '小红',
    age: 18,
    // 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
    singing: function () {
        console.log('AA')
    },
    run: function () {
        console.log('BB')
    }
}

// 调用对象中 singing 方法
person.singing()
// 调用对象中的 run 方法
person.run()
```

也可以动态为对象添加方法，动态添加与直接定义是一样的，只是语法上更灵活。

```js
let user = {}
// 动态追加属性
user.name = '小明'
user.['age'] = 18

// 动态添加方法
user.move = function () {
    console.log('移动一点距离...')
}
```

> **注：无论是属性或是方法，同一个对象中出现名称一样的，后面的会覆盖前面的。**

### 10.4、遍历对象属性

使用 **for in** 语句

> for in 语句可以遍历数组，但不推荐
> for (let m in arr) {
> 	console.log(k) //数组的下标 但是为**字符串**类型
> 	console.log(arr[k]) //arr[k]
>  }

```js
for(let k in obj){
    console.log(k) //属性名 'uname'
    //console.log(obj.k)  等于console.log(obj.'uname') undefined
    console.log(obj[k])
}
```

案例：

```js
let students = [
    {name: 'A',age: '18',gender: 'man',hometown: 'CN'},
    {name: 'B',age: '20',gender: 'woman',hometown: 'CN'},
    {name: 'C',age: '19',gender: 'woman',hometown: 'CN'},
    {name: 'D',age: '22',gender: 'man',hometown: 'CN'},
]
for (let i = 0; i < students.length; i++){
    console.log(students[i].name);
}
```

### 10.5、内置对象/方法

内置对象：js内部提供的对象

#### 10.5.1、Math

[MDN：Math对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)

常用方法：

| 方法     | 含义                    |
| -------- | ----------------------- |
| random() | 生成 **[0,1)** 的随机数 |
| round()  | 四舍五入                |
| ceil()   | 向上取整                |
| floor()  | 向下取整                |
| max()    | 最大                    |
| min()    | 最小                    |
| pow()    | 幂运算                  |
| abs()    | 绝对值                  |

**生成 M~N 的随机整数**

```js
Math.floor(Math.random() * (N - M + 1)) + N
```

**数组随机下标：**

```js
let ramdom = Math.floor(Math.random() * arr.length)
```

注：

```js
x = Math.round(20.5);    //21
x = Math.round(-20.5);   //-20
```

#### 10.5.1、null

null 也是 JavaScript 中数据类型的一种，通常只用它来表示不存在的对象。使用 typeof 检测类型它的类型时，结果为 `object`。

#### 10.5.2、trim()

trim用于去除字符串两侧的空格

```js
const str = '   AA   '
str.trim()
```

