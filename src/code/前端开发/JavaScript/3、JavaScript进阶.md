---
title: JavaScript 进阶
icon: javascript
order: -1
---
## 1、作用域

作用域（scope）规定了变量能够被访问的 **范围** ，离开了这个范围的变量便不能被访问

### 1.1、局部作用域

#### ① 函数作用域

**函数内部**声明的变量只能在函数内部访问，外部无法直接访问。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230416101925.png)

#### ② 块作用域

js中使用 **`{}`** 包裹的代码称为代码块，代码块内部声明的变量外部**有可能**无法被访问
**let，const** 产生块作用域
**var** 不产生块作用域

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230416102105.png)

### 1.2、全局作用域

**script** 标签和 **.js** 文件 的 **最外层** 就是全局作用域，在此声明的变量在函数内部也可以被访问

注意：
1、为window对象添加的属性也是全局的（不推荐）
2、函数中未使用任何关键字声明的变量为全局变量（不推荐）
3、尽可能少的声明全局变量，防止全局变量被污染

### 1.3、作用域链

作用域链的本质是底层的**变量查找机制**
	在函数被执行时，会**优先查找当前**函数作用域中查找变量
	如果当前作用域找不到，就**逐级查找父级**作用域

### 1.4、js垃圾回收机制

js环境中分配的内存，一般有如下**生命周期**：
1、**内存分配**：当声明变量，函数，对象时，系统会自动为他们分配内存
2、**内存使用**：读写内存，使用变量、函数
3、**内存回收**：使用完毕，**垃圾回收器**自动收回不在使用的内存

说明：
全局变量一般不会回收，在页面关闭回收
局部变量值不用了，会被自动回收

内存泄漏：程序中分配的内存由于某种原因**未释放**或**无法释放**叫内存泄漏

**gc算法说明：**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230416104331.png)

gc算法有：

#### ① 引用计数法

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230416104857.png)

引用计数法存在 **嵌套引用** 的问题 （两个对象**相互引用**，尽管它们不再使用，垃圾回收器不会进行回收，导致内存泄漏）。

#### ② 标记清除法

目前浏览器都是用标记清除发：**从根部扫描对象**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230416105150.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230416105230.png)

### 1.5、闭包

#### 1.5.1、闭包概念

概念：一个函数对周围状态的引用捆绑在一起，内层函数中访问到其外层函数的作用域
**闭包 = 内层函数 + 外层函数的变量**

举例（简单写法）：

```js
function outer(){
    let a = 10
    function fn(){
        console.log(a)
    }
    fn()
}
outer()
```

闭包的作用：**封闭数据**，提供操作，外部也可以访问函数内部的变量（减少定义全局变量，更加安全）

#### 1.5.2、闭包写法

**常用写法：**外部使用函数内部变量

写法一：

```js
//常见的闭包的形式   外部可以访问使用 函数内部的变量
function outer() {
    let a = 100
    function fn() {
        console.log(a)
    }
    return fn //返回fn()这个函数
}

// outer()   ===  fn   ===  function fn() {}
// const fun = function fn() { }
cosnt fun = outer()
fun() //调用fn
```

写法二（更简约）：

```js
// 常见的写法2
function outer() {
	let a = 100
	return function () {	// 直接返回函数
		console.log(a)
	}
}

const fun = outer()
fun() // 调用函数
```

举例：统计函数使用次数

```js
function count() {
    let i = 0
    function fn() {
        i++
        console.log(`函数被调用了${i}次`)
    }
    return fn
}
const fun = count()
//这样就实现了数据的私有，无法直接修改count
//但是有内存泄漏问题（i不被回收）
```

### 1.6、变量提升

使用 **var** 定义变量会变量提升：
	1、把所有var声明的变量提升到作用域最前面
	2、只提升声明，不提升赋值

```js
// 访问变量 str
console.log(str + 'world!'); //undefinedworld
// 声明变量 str
var str = 'hello ';
```

变量在声明之前即被访问，变量的值为 `undefined`
`let` 声明的变量不存在变量提升，推荐使用 `let`
推荐**先声明再访问**变量

## 2、函数

### 2.1、函数提升

函数提升与变量提升比较类似，是指函数在声明之前即可被调用（提升函数声明）。

```js
// 调用函数
foo()
// 声明函数
function foo() {
    console.log('声明之前即被调用...')
}

// 不存在提升现象
bar()  // 错误
var bar = function () { //只提升变量声明
    console.log('函数表达式不存在提升现象...')
}
```

总结：

1. 函数提升能够使函数的**声明调用更灵活**
2. **函数表达式**不存在提升的现象
3. 函数提升出现在**相同作用域中**

### 2.2、函数参数

#### 2.2.1、动态参数

**arguments** 是函数内部**内置**的**伪数组**变量，它包含了调用函数时传入的所有实参。可以通过 for 循环接收

```js
function sum() {
    let s = 0
    for(let i = 0; i < arguments.length; i++) {
        s += arguments[i]
    }
    console.log(s)
}
// 调用求和函数
sum(5,10)
sum(1,2,4,7,9,12) // 两个参数
```

#### 2.2.2、剩余参数

剩余参数允许我们将一个不定数量的参数表示为一个数组

参数声明为 **...arr**
借助 ... 获取的剩余参数时 **真数组**（可以使用pop等方法）

```js
function config(baseURL, ...other) {
    console.log(baseURL) // 得到 'http://baidu.com'
    console.log(other)  // other  得到 ['get', 'post']
}
// 调用函数
config('http://baidu.com', 'get', 'post');
```

#### 2.2.3、展开运算符

展开运算符：`...` ，将一个**数组**进行**展开**

```js
const arr = [1,2,5,6,8]
console.log(...arr) // 1,2,5,6,8
```

说明：该方式不会修改原数组

典型运用场景：求数组**最大值**，**合并数组**等

```js
const arr = [1,8,9,6,3,5]
const arr2 = [5,9,6,3,2]
console.log(Math.max(...arr))
const arr3 = [...arr,...arr2]
```

### 2.3、箭头函数

目的：箭头函数目的是更简短的函数写法，并且不绑定this，箭头函数的语法比函数更简简洁
适用场景：箭头函数更适应于那些本来需要匿名函数的地方

#### 2.3.1、基本语法

**const fn = () => {}**

1、只有一个形参的时候可以省略小括号
2、只有一行代码的时候可以省略大括号
3、只有一行代码的时候可以省略return
4、返回对象需要加（），否则对象的 {} 易与函数的 {} 冲突

```js
// const fn = function(){
//     console.log(123);
// }

const fn = () => {
    console.log(123)
}
fn()

const fn2 = x => {
    console.log(x)
}
fn2(111)

const fn3 = x => console.log(x);
fn3(111)

const fn4 = x => x + x
fn4(2)

const fn5 = (uname) => ({uname:uname})
fn('AA')
```

#### 2.3.2、箭头函数参数

箭头函数没有arguments动态参数，但是**有剩余参数**...args

```js
const getSum = (...args) =>{
    let sum = 0
    for (let i = 0;i < args.length;i++) {
        sum += i
    }
    return sum
}
console.log(getSum(1,2,3,4,5)); 
```

#### 2.3.3、箭头函数this

以前的this指向：谁调用这个函数，this就指向谁

**箭头函数不会创建自己的this**，它只会从自己的作用域链的**上一层沿用this**

```js
console.log(this); //window
function fn(){
    console.log(this);//window
}
fn() // 相当于windows.fn()
const fn => {
    console.log(this) //window
}
fn()

// 对象方法箭头函数 this
const obj = {
    uname: 'AA',
    say: () => console.log(this) //window
}
obj.say()

const obj2 = {
    uname: 'BB',
    say: function() {
        const count = () => console.log(this); //obj2
        count()
    }
}
obj2.say()
```

## 3、解构赋值

### 3.1、数组解构

数组结构是将数组的单元值快速批量赋值给一系列变量的简洁语法

基本语法：
1、运算符= 左侧的 [] 用于批量声明变量，右侧数组的单元值将被赋值给左侧的变量
2、变量的顺序对应数组单元值的位置一次进行赋值操作

(const) **[参数1, 参数2...] = [参数1, 参数2...]**

```js
const ar = [100,60,80]
//数组结构 赋值
const [max,min,avg] = arr
// const max = arr[0]
// const min = arr[1]
// const avg = arr[2]

let a = 1
let b = 2; //必须加分号
[b,a] = [a,b]

//一些情况
const [a,b,c,d] = [1,2,3] //1,2,3,undefined
const [a,b,c] = [1,2,3,4] //1,2,3
const [a,b,...c] = [1,2,3,4,5] //1,2,真数组
```

防止undefined传递（默认参数）：

```js
const [a = 0,b = 0] = [5] //5,0
```

按需导入赋值

```js
const[a,b, ,d] = [1,2,3,4] //a,b,d 为 1,2,4
```

多维数组的结构

```js
const [a,b,[c,d]] = [1,2,[3,4]] //1,2,3,4
```

展开运算符：**...**

### 3.2、对象解构

对象解构是将对象属性和方法快速批量赋值给一系列变量的简洁语法

基本语法：

=左侧的{} 用于批量声明变量，右侧对象的属性值将被赋值给左侧的变量
对象属性的值将被赋值给属性名**相同的**变量
注意解构的变量名不要和外面的变量名冲突否则报错
对象中找不到与变量名一致的属性时变量值为undefined

```js
const {uname, age} = {uname: 'AA', age: 18}
```

对象解构的变量名可以**重新改名**

```js
const {uname:username, age} = {uname: 'AA', age: 18}
console.log(username)
console.log(age)
```

```js
const pig = [{
    uname: 'BB',
    age: 10
}]
const [{uname,age}] = pig
```

多级对象解构：

```js
const pig = [{
    uname: 'BB',
    age: 10,
    family: {
        mother: 'CC',
        father: 'DD'
    }
}]
const [{uname,age,family:{mother,father}}] = pig
```

直接通过函数参数获取对象属性：

```js
function render({data}){
    console.log(data)
}
render(msg) //meg为对象
```

## 4、数组方法

### 4.1、forEach()

**forEach()** 方法用于调用数组的每个元素，并将元素传递给回调函数
主要适用场景：遍历数组每个元素
forEach() 方法没有返回值

语法：

```js
被遍历的数组.forEach(functon(当前数组元素，当前元素索引号)){
    //函数体
}
```

```js
const arr = ['A','B','C']
array.forEach(function(item,index){
    console.log(item);
    console.log(index);
});
```

### 4.2、filter()

**filter()** 方法创建一个新的数组，新数组中的元素时通过**检查指定数组**中符合条件的所有元素
主要使用场景：**筛选数组符合条件的元素**，并返回筛选后元素的新数组

语法：

```js
const arr = [10,20,30]
/*const newArr = arr.filter(function (item,index){
    console.log(item);
    console.log(index);
    return item >= 20
})*/

cosnt newArr = arr.filter(item => item >= 20)
console.log(newArr);
```

### 4.3、map()

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

### 4.4、join()

join() 方法用于把数组中的所有元素 **转换为一个字符串**

语法：
**console.log(arr.join('分隔符'));** 

参数：
数组元素通过**参数**里面指定的**分隔符**进行分隔，**空字符串**('')，则所有元素之间都**没有任何字符**，不带参数，**默认**为**逗号分割**

```js
console.log(arr.join('')); //将数组中的元素全部加成一个字符串，没有分隔符
```

遍历数组元素时，可以通过 map 添加 tr，td 标签，通过 join 将新数组索引对应字符串传给 innerHtml ，完成表格渲染

### 4.5、reduce()

**reduce** 返回**累积处理的结果**，经常用于**求和等**

基础语法：

```js
arr.reduce(function(){},初始值)
arr.reduce(function(上一次值，当前值){},初始值)
```

参数：如果有初始值，把初始值累加到里面

> 注意：计算**对象数组的累加**时，需要添加**初始值0**

```js
// 1.没有初始值
const arr = [1,5,8]
const count = arr.reduce(function(prev,current){
    return prev + current
})
console.log(count); //14

// 2.有初始值
const count2 =  arr.reduce(function(prev,current){
    return prev + current
},10)
console.log(count2); //24

// 3.箭头函数写法
const count3 = arr.reduce((prev,current) => prev + current,10)
console.log(count3);
```

```js
const total = arr.reduce((prev,current) =>{
    return prev + current.salary //第一个prev不需要加属性，上一次返回值为数字类型
},0) //初始值不能省略
```

reduce执行过程：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230417141543.png)

### 4.6、其他方法

[其它常用方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

1.实例方法  `find`  查找元素， 返回符合测试条件的第一个数组元素（对象），如果没有符合条件的则返回 undefined(重点)

```js
arr.find(function(item){
    return item.name === 'AAA'
})
```

2.实例方法`every` 检测数组所有元素是否都符合指定条件，如果**所有元素**都通过检测返回 true，否则返回 false(重点)

3.实例方法`some` 检测数组中的元素是否满足指定条件   **如果数组中有**元素满足条件返回 true，否则返回 false

4.实例方法 `concat`  合并两个数组，返回生成新数组

5.实例方法 `sort` 对原数组单元值排序

6.实例方法 `splice` 删除或替换原数组单元

7.实例方法 `reverse` 反转数组

8.实例方法 `findIndex`  查找元素的索引值在

### 4.7、伪数组转换为真数组

静态方法：**Array.from()**

```js
const lis = document.querySelectorAll('ul li') //伪数组
//lis.pop() 伪数组，报错
const liss = Array.from(lis)
```

## 5、深入对象

### 5.1、创建对象三种方式

① 利用对象字面量创建对象

```js
const obj = {
	name: 'AA'
}
```

② 利用new Object() 创建对象

```js
const o = new Object({name: 'AA'})
```

③ 利用构造函数创建对象

```js
function Pig(name,age){
    this.name = name;
    this.age = age;
}
const pig1 = new Pig('AA',18)
```

### 5.2、构造函数

**构造函数**用于初始化对象

使用场景：通过**构造函数快速创建多个类似对象**

构造函数的约定：
	函数名以**大写字母**开头
	只能通过 new 操作符来执行

> 注：构造函数里没有return，默认返回值为创建的对象

```js
function Pig(name,age){
    this.name = name;
    this.age = age;
    this.sleep = function(){} //有内存浪费问题
}
const a = new Pig('AA',18)

//添加属性、方法：
a.sex = 'man';
console.log(a.sex);
a.sleep = function(){
    console.log(12);
}
a.sleep();
```

实例化过程：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230417131430.png)

### 5.3、实例成员，静态成员

实例成员：通过构造器创建的对象称为**实例对象**，实例对象**中的属性和方法**称为实例成员（**实例属性和实例方法**）

```js
function Pig(name,age){
    this.name = name;
    this.age = age;
}
const a = new Pig('A',18)
a.name = 'B' //实例属性
a.sayHi() => {
    console.log('hi') //实例方法
}
```

静态成员：**构造函数上**的**属性和方法**称为静态成员（**静态属性和静态方法**）

```js
Math.PI    //静态属性
Date.now() //静态方法

function Pig(name,age){
    this.name = name;
    this.age = age;
}
Pig.eyes = 2 //静态属性
```

## 6、基本包装类型

### 6.1、概念

js底层完成，把简单数据类型包装为了引用数据类型

```js
//const str = 'AA' 相当于
const str = new String('AA')
```

**内置构造函数**：
	引用类型：Object，Array，RegExp(正则)，Date等
	包装类型：String，Number，Boolean等

### 6.2、Object

三个常用**静态方法**：

#### 6.2.1、Object.keys

**Object.keys(obj)**：获取对象中所有属性（**键**），返回一个数组

```js
const o = {name: 'AA',age: 81}
let arr = Object.keys(o)
```

#### 6.2.2、Object.values()

**Object.values(obj)**：获取对象中所有属性（**值**），返回一个数组

```js
const o = {name: 'AA',age: 81}
let arr = Object.values(o)
```

#### 6.2.3、Object.assign()

**Object.assign(obj2,obj1)**：对象拷贝,obj1拷贝给obj2

该方法可以**添加属性**

```js
const o = {name: 'AA',age: 81}
const o2 = {}
Object.assign(o2,o);
Object.assign(o,{gender:'女'});
console.log(o) //{name: 'AA',age: 81,gender:'女'}
```

### 6.3、Array

数组常见的**实例方法：**

| 方法      | 作用     | 说明                                       |
| --------- | -------- | ------------------------------------------ |
| forEach() | 遍历数组 | 不返回数组，用于查找遍历数组元素           |
| filter()  | 过滤数组 | **返回新数组**，返回筛选满足条件的数组元素 |
| map()     | 迭代数组 | **返回新数组**，返回处理后的数组元素       |
| reduice() | 累积器   | 返回累积处理的结果，经常用于求和           |

详见第四章

### 6.4、String

[String常用方法：](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

1.实例属性 **`length`** 用来获取字符串的度长(重点)

2.实例方法 **`split('分隔符')`** 用来将字符串拆分成数组(重点)

```js
const str = '2022-1-1'
const arr = str.split('-')
```

3.实例方法 **`substring`**（需要截取的第一个字符的索引[,结束的索引号]） 用于字符串截取(重点)

```js
const str = 'ABCDE'
const sub = str.substring(1,3) //BC
```

4.实例方法 **`startsWith`**(检测字符串[, 检测位置索引号])` 检测是否以某字符开头(重点)

```js
const str1 = 'Saturday night plans';
console.log(str1.startsWith('Sat'));// true
console.log(str1.startsWith('Sat', 3));// false
```

5.实例方法 **`includes`**(搜索的字符串[, 检测位置索引号]) 判断一个字符串是否包含在另一个字符串中(区分大小写)，根据情况返回 true 或 false(重点)

6.实例方法 `toUpperCase` 用于将字母转换成大写

7.实例方法 `toLowerCase` 用于将就转换成小写

8.实例方法 `indexOf`  检测是否包含某字符

9.实例方法 `endsWith` 检测是否以某字符结尾

10.实例方法 `replace` 用于替换字符串，支持正则匹配

11.实例方法 `match` 用于查找字符串，支持正则匹配

### 6.5、Number

常用方法：

**toFixed()**：设置保留两位小数位的长度，**四舍五入**

```js
const price = 21.345
console.log(price.toFixed(2)) //21.35
const num = 10
console.log(num.toFixed(2)) //10.00
```

## 7、原型

### 7.1、prototype 属性（原型对象）

**原型**可以解决**构造函数浪费内存的问题**
即**利用原型对象实现方法共享**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230417154705.png)

- 构造函数通过原型分配的函数是所有对象所 **共享的**
- JS规定，每一个**构造函数**都有一个**prototype属性**，指向另一个对象，所以称prototype为**原型对象**
- 这个对象可以挂载函数，对象实例化不会多次创建原型上函数，节约内存
- **可以把不变的方法，定义在prototype对象上，这样所有对象的实例就可以共享这些方法**
- **构造函数和原型对象中this都指向实例化对象**

将 **公共的属性** 写到 **构造函数** 里
将 **公共的方法** 写到 **原型对象** 上

```js
// function Con(uname,age){
//     this.name = uname
//     this.age = age
//     this.sing = function(){
//         console.log('A');
//     }
// }
// const q = new Con('AAA',10)
// const w = new Con('BBB',20)
// console.log(q.sing === w.sing); // false

function Star(uname,age){
    this.uname = uname
    this.age = age
}
Star.prototype.sing = function(){
    console.log('sing');
}
const a = new Star('AA',18)
const b = new Star('BB',20)
a.sing() //调用
console.log(a.sing() === b.sing()); //true
```

案例：自己定义 数组的扩展方法：求和 和 最大值

> **注意**：不要使用箭头函数，箭头函数没有this（this指向父层）

```js
//最大值
Array.prototype.max = function(){
    return Math.max(...this)
}
const max = [1,2,4,6,9,2,5].max()
console.log(max);

//求和
Array.prototype.sum = function(){
    return this.reduce(function(prev,current){return prev + current},0)
}
console.log([1,2,3,4,5].sum());
```

### 7.2、constructor 属性

每个**原型对象（prototype）**都有个**constructor**属性
作用：该属性**指向**该**原型对象的构造函数**，简单理解就是指向最初的构造器

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230417163858.png)

```js
function Star(uname,age){
    this.uname = uname
    this.age = age
}
console.log(Star.prototype.constructor === Star) //true
```

使用场景：
如果有多个对象的方法，可以给**原型对象采取对象形式赋值**
但是直接赋值会**覆盖**构造函数原型对象原来的内容，原型对象的constructor就不再指向当前构造函数了
此时可以**在修改后的原型对象中，添加一个constructor指向原来的构造函数**

```js
function Star(name){
    this.name = name
}
Star.prototype = {
    // 避免被覆盖，手动指向Star构造函数
    constroctor: Star,
    sing: function(){console.log('sing');},
    dance: function(){console.log('dance');}
}
console.log(Star.prototype.constroctor);
```

### 7.3、\__proto__  对象原型

**对象原型 指向 原型对象**

**原型对象**是如何访问**原型对象**（prototype）的属性和方法的：

**对象**都会有一个**属性  \__proto__**  **指向** 构造函数的 **prototype** 原型对象

注意：

- \_\_proto\__ 是JS非标准属性 （ **\__proto__是只读的**，在浏览器中显式为[[Prototype]]）
- [[prototype]]和 \__proto__ 意义相同
- 用来表明当前实例对象指向哪个原型对象prototype
- **\__proto__** 对象原型里面也有一个 **constructor**属性，**指向创建该实例对象的构造函数**

```js
function Star(name){
    this.name = name
}
const obj = new Star()
console.log(obj.__proto__ === Star.prototype); //true
console.log(obj.__proto__.constructor === Star); //true
```

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230417224553.png)

### 7.4、原型继承

JS中大多是借助原型对象实现继承的特性

JS原型继承：

```js
function Person() {
    this.eyes = 2
    this.head = 1
}

function Woman() {
}
function Man(){
}

//Woman通过原型来继承Person
Woman.prototype = new Person()
//指回原来的构造函数
Woman.prototype.constructor = Woman
//Woman添加baby方法
Woman.prototype.baby = function(){
    console.log('baby');
}
const red = new Woman()
console.log(red);

Man.prototype = new Person()
Man.prototype.constructor = Man
const blue = new Man()
console.log(blue);
```

### 7.5、原型链

**对象 都有 \__proto__ ， 原型对象也有 **

基于原型对象的继承使得不同构造函数的原型对象关联在一起，并且这种关联的关系是一种链状的结构，我们将原型对象的链状结构关系称为**原型链**

对象原型（ \__proto__ ）指向原型对象，原型对象里有属性\_\_proto__，再指向父级原型对象以此类推，最后一个对象原型执行null

![1676793388695](https://raw.githubusercontent.com/T4mako/ImageBed/main/1676793388695.png)

① 当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。
② 如果没有就查找它的原型（也就是 __proto__**指向的** prototype **原型对象**）
③ 如果还没有就查找**原型对象的原型**（Object的原型对象）
④ 依此类推一直找到 Object 为止（null）
⑤ __proto__对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线
⑥ 可以使用 instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

```js
console.log(Object.prototype) //Object 最大的对象
function Person(){
}

const a = new Person()
console.log(a instanceof Person); //true
console.log(a instanceof Object); //true
console.log(Person.prototype.__proto__ === Object.prototype); //true
```

## 8、深浅拷贝

### 8.1、浅拷贝

浅拷贝：拷贝的是**地址**

常见方法：

1. 拷贝对象：**Object.assgin()**  或
   展开运算符 **{...obj}** 拷贝对象
2. 拷贝数组：**Array.prototype.concat()** 或
   展开运算符  **[...arr]**

```js
const obj = {
    uname: 'AA'
}
cosnt o = {...obj}
```

浅拷贝存在的问题：

```js
const obj = {
    name: 'A',
    age: 18,
    family: {
        baby: 'AA',
    }
}
const o = {...obj}
o.family.baby = 'BB'
console.log(obj.family.baby); //BB
console.log(o.family.baby); //BB
```

### 8.2、深拷贝

深拷贝：拷贝的是**对象**，不是地址

浅拷贝和深拷贝只针对引用类型

深拷贝的**三种方式**：

1. 通过递归实现深拷贝
2. lodash/cloneDeep
3. 通过JSON.stringify()实现

#### 8.2.1、递归实现深拷贝

```js
const obj = {
    uname: 'pink',
    age: 18
}
const o = {}
// 拷贝函数
function deepCopy(newObj, oldObj){
    for(let k in oldObj){
        // k 是属性名，oldObj[k] 是属性值
        // newobj[k] === o.uname 
        if(oldObj[k] instanceof Array){
            newObj[k] = []
            deepCopy(newObj[k],oldObj[k])
        } else if(oldObj[k] instanceof Object){
            newObj = {}
            deepCopy(newObj[k],oldObj[k])
        } else{
            newObj[k] = oldObj[k]
        }
    }
}
deepCopy(o,obj)
```

#### 8.2.2、lodash/cloneDeep

[lodash/cloneDeep](https://www.lodashjs.com/) 方式：

```html
<!-- 先引用 -->
<script src="./lodash.min.js"></script>
<script>
    const obj = {
        uname: 'AA',
        age: 18,
        hobby: ['Q', 'W'],
        family: {
            baby: 'aa'
        }
    }
    const o = _.cloneDeep(obj)
    console.log(o)
    o.family.baby = 'bb'
    console.log(obj)
</script>
```

#### 8.2.3、JSON.stringify()

把 obj **先转化成字符串再转换成对象**

```js
const obj = {
    uname: 'AA',
    age: 18,
    hobby: ['Q', 'W'],
    family: {
        baby: 'aa'
    }
}
// 把对象转换为 JSON 字符串
// console.log(JSON.stringify(obj))
const o = JSON.parse(JSON.stringify(obj))
console.log(o)
o.family.baby = '123'
console.log(obj)
```

## 9、异常处理

### 9.1、throw抛异常

**throw** 抛出异常信息，程序也会终止执行
throw 后面跟的是错误信息
**Error 对象** 配合throw 使用，能够设置更详细的错误信息

```js
function fn(x,y){
    if(!x || !y){
        throw '参数传递错误'
    }
    return x + y
}
console.log(fn());
```

### 9.2、try-catch 捕获错误信息

可以通过 try-catch-finally 捕获错误信息

```js
function fn(x,y){
    try{
        // 可能发送错误的代码
        const p = document.querySelector('.p')
        } catch(err){
            // 拦截错误，提示浏览器提供的错误信息，不中断程序的执行
            console.log(err.message);
            // 需要加return 中断程序执行
            return
        } finally {
            //一定会执行的代码
        }
}
fn()
```

### 9.3、debugger

debugger：在代码中手动打端点

```js
const o = {}
debugger
```

## 10、改变this指向

### 10.1、this指向

**普通函数 **的调用方式决定了 `this` 的值，即【谁调用 `this` 的值指向谁】
普通函数没有明确调用者时 `this` 值为 `window`，**严格模式**下没有调用者时 `this` 的值为 `undefined`。

箭头函数中 this 与普通函数完全不同，也不受调用方式的影响，**箭头函数中不存在this**
箭头函数中的 this 引用的就是最近作用域中的 this（向外层作用域中一层一层查找this，直到this有定义）

### 10.2、改变this指向

#### 10.2.1、call() （了解）

使用 `call` 方法调用函数，同时指定函数中 `this` 的值

```js
const obj = {name: 'AA'}
function fun(x,y){
    console.log(this);
}
//调用函数，改变this指向
fun.call(obj,1,2)
```

#### 10.2.2、apply()

使用 **apply()** 方法调用函数，同时指定被调用函数中this的值

语法：

```js
fun.apply(thisArg,[argsArray])
```

**thisArg**：在fun函数中指定 this 的值
**argsArray**：传递的值，必须包含在**数组**里
返回值就是函数的返回值

```js
const obj = {
    age: 18
}
function fn(x,y){
    console.log(this);
}
fn.apply(obj,[1,2])
```

使用场景：求数组最大值

```js
const arr = [1,2,23,5,20]
const max = Math.max.apply(Math,arr)
const min = Math.min(...arr)
console.log(max);
console.log(min);
```

#### 10.2.3、bind()

**bind()** 方法**不会调用函数**，但是能改变函数内部的 this 指向

语法：

```js
fun.bind(thisArg,arg1,arg2...)
```

**thisArg**：在fun函数中指定 this 的值
**arg1,arg2**：传递的其他参数

返回由指定的 this 值和初始化参数改造的 **原函数拷贝（新函数）**

在只想改变 this 执行，并不想调用这个函数的时候，可以使用bind，比如改变定时器内部的this指向

```js
// 点击按钮禁用，2秒后开启
const btn = document.querySelector('button')
btn.addEventListener('click',function(){
    this.disabled = true
    window.setTimeout(function() {
        // btn.disabled = false
        // 在这个普通函数内，用this由原来的this改为btn
    }.bind(btn),2000)
})
```

## 11、防抖与节流

### 11.1、防抖（debounce）

防抖：单位时间内，频繁触发事件，**只执行最后一次**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230419141850.png)

使用场景：
搜索框**搜索输入**，只需要最后一次输入完，再发送请求
手机号、验证邮箱**输入检测**

实现方式：
1、**lodash** 提供的防抖 [`_.debounce(func, [wait=0], [options=])`](https://www.lodashjs.com/docs/lodash.debounce#_debouncefunc-wait0-options)
2、**手写**一个防抖函数来处理

#### 11.1.1、lodash实现

案例：鼠标在盒子上移动，鼠标停止500ms之后，里面的数字才会变化+1

```html
<script src="./lodash.min.js"></script>
<script>
    const box = document.querySelector('.box')
    let i = 1
    // 鼠标移动函数
    function mouseMove() {
        box.innerHTML = ++i
        // 如果里面存在大量操作 dom 的情况，可能会卡顿
    }
    // lodash 防抖的写法
    // _.debounce(fun,时间)  500毫秒后采取+1
    box.addEventListener('mousemove', _.debounce(mouseMove, 500))
</script>
```

#### 11.1.2、手写防抖函数

防抖的核心是利用定时器（**setTimeout**）来实现

① 声明一个定时器变量
② 当鼠标每次滑动都先判断是否有定时器了，如果有就先清除以前的定时器
③ 如果没有定时器则开启定时器，存到变量里面
④ 定时器里面写函数调用

```js
const box = document.querySelector('.box')
let i = 1  // 让这个变量++
// 鼠标移动函数
function mouseMove() {
    box.innerHTML = ++i
}

function debounce(fn,t){
    let timer
    return function(){
        if(timer) clearTimeout(timer)
        timer = setTimeout(function() {
            fn()
        },t)
    }
}
box.addEventListener('mousemove',debounce(mouseMove,500))
```

### 11.2、节流（throttle）

节流：在单位时间内，频繁触发事件，**只执行一次**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230419160426.png)

使用场景：鼠标移动 mousemove、页面尺寸缩放 resize，滚动条 scroll 等

实现方式：
1、**lodash** 提供的节流函数来处理 [`_.throttle(func, [wait=0], [options=])`](https://www.lodashjs.com/docs/lodash.throttle#_throttlefunc-wait0-options)
2、**手写** 一个节流函数来处理

案例：鼠标在盒子上移动，不管移动多少次，每隔500ms才+1

#### 11.2.1、lodash实现

```js
const box = document.querySelector('.box')
let i = 1
function mouseMove(){
    box.innerHTML = ++i
}
// 语法：_.throttle(fun,时间)
box.addEventListener('mousemove',_.throttle(mouseMove,500))
```

#### 11.2.2、手写节流函数

节流的核心是利用定时器（**setTimeout**）来实现

①：声明一个**定时器变量**
②：当鼠标每次滑动都先判断**是否有定时器**了，如果有定时器则不开启新定时器
③：如果没有定时器则开启定时器，并存到变量里
		定时器里**调用**执行的函数
		在定时器里面把定时器**清空**

```js
const box = document.querySelector('.box')
let i = 1
function mouseMove(){
    box.innerHTML = ++i
}
//    // 语法：_.throttle(fun,时间)
//    box.addEventListener('mousemove',_.throttle(mouseMove,500))
function throttle(fn,t){
    let timer = null
    return function(){
        if(!timer){
            timer = setTimeout(function(){
                fn()
                // 清空定时器
                // 在 setTimeout 中无法删除定时器，因为定时器还在运作，所以使用timer = null 而不是 clearTimeout(timer)
                timer = null
            },t)
        }
    }
}
box.addEventListener('mousemove',throttle(mouseMove,500))
```

### 11.3、总结

| 性能优化 | 说明                                         |
| -------- | -------------------------------------------- |
| 防抖     | 单位时间内，频繁触发事件，**只执行最后一次** |
| 节流     | 单位时间内，频繁触发事件，**只执行一次**     |

