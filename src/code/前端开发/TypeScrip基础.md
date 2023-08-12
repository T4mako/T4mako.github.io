---
title: TypeScript基础
sticky: 9
date: 2023-08-12
category: 
  - TypeScript
---

(参考文章)[https://wangdoc.com/typescript/]

## 一、TypeScript 语言简介

### 1、概述

TypeScript（简称 TS）是微软公司开发的一种 **基于 JavaScript** （简称 JS）语言的编程语言。

它的目的并不是创造一种全新语言，而是 **增强 JavaScript** 的功能，使其更适合多人合作的企业级项目。

TypeScript 可以看成是 JavaScript 的 **超集**（superset），即它继承了后者的全部语法，所有 JavaScript 脚本都可以当作 TypeScript 脚本（但是可能会报错），此外它再增加了一些自己的语法。

### 2、类型的概念

**类型是人为添加的一种编程约束和用法提示**，目的是在软件开发过程中，为编译器和开发工具提供更多的验证和帮助，帮助提高代码质量，减少错误。

```typescript
function addOne(n:number) {
  return n + 1;
}
addOne('hello') // 报错
```

TypeScript 是在开发阶段报错，这样有利于提早发现错误，避免使用时报错。  
另一方面，函数定义里面加入类型，具有提示作用，可以告诉开发者这个函数怎么用。

### 3、动态类型与静态类型

**JavaScript** 的类型系统非常弱，而且没有使用限制，运算符可以接受各种类型的值。在语法上，JavaScript 属于 **动态类型语言**  
**TypeScript** 引入了一个更强大、更严格的类型系统，属于 **静态类型语言**

### 4、静态类型的优缺点

优点：

- 有利于代码的静态分析。
- 有利于发现错误。
- 更好的 IDE 支持，做到语法提示和自动补全。
- 提供了代码文档。
- 有助于代码重构。

缺点：

- 丧失了动态类型的代码灵活性。
- 增加了编程工作量。
- 更高的学习成本。
- 引入了独立的编译步骤。
- 兼容性问题。

## 二、基本用法

### 1、类型声明

TypeScript 代码最明显的特征，就是为 JavaScript 变量加上了类型声明。

类型声明的写法，一律为在标识符后面添加“**冒号 + 类型**”。函数参数和返回值，也是这样来声明类型。

```typescript
let foo:string; //声明了它的类型为string
function toString(num:number):string { //num的类型是number。参数列表的圆括号后面，声明了返回值的类型是string
  return String(num);
}
```

变量的值应该与声明的类型一致，如果不一致，TypeScript 就会报错。  

另外，TypeScript 规定，变量只有**赋值后才能使用**，否则就会报错。

```typescript
let x:number;
console.log(x) // 报错
```

### 2、类型推断

类型声明并不是必需的，如果没有，TypeScript 会自己 **推断类型**。

```typescript
let foo = 123; // TypeScript 推断它的类型为 number。
```

TypeScript 推断它的类型为`number`。

后面，如果变量`foo`更改为其他类型的值，跟推断的类型不一致，TypeScript 就会报错。

```typescript
let foo = 123;
foo = 'hello'; // 报错
```

TypeScript 也可以**推断**函数的**返回值**。

```typescript
function toString(num:number) {
  return String(num);	// TypeScript 推断返回的是字符串。
}
```

:::info

正是因为 TypeScript 的类型推断，所以函数返回值的类型通常是省略不写的。

这样设计还有一个好处，将以前的 JavaScript 项目改为 TypeScript 项目时，你可以逐步地为老代码添加类型，即使有些代码没有添加，也不会无法运行。

:::

### 3、TypeScript 的编译

**JavaScript** 的运行环境（**浏览器** 和 **Node.js**）不认识 **TypeScript** 代码。所以，TypeScript 项目要想运行，必须先转为 JavaScript 代码，这个代码转换的过程就叫做“**编译**”（compile）。

TypeScript 官方没有做运行环境，只提供编译器。编译时，会将类型声明和类型相关的代码全部删除，只留下能运行的 JavaScript 代码，并且不会改变 JavaScript 的运行结果。

因此，TypeScript 的类型检查只是编译时的类型检查，而不是运行时的类型检查。一旦代码编译为 JavaScript，运行时就不再检查类型了。

### 4、值与类型

TypeScript 代码只涉及类型，不涉及值。所有跟“值”相关的处理，都由 JavaScript 完成。

它们是可以分离的，TypeScript 的编译过程，实际上就是把“类型代码”全部拿掉，只保留“值代码”。

### 5、TypeScript Playground

最简单的 TypeScript 使用方法，就是使用官网的在线编译页面，叫做 [TypeScript Playground](http://www.typescriptlang.org/play/)。

把 TypeScript 代码贴进文本框，它就会在当前页面自动编译出 JavaScript 代码，还可以在浏览器执行编译产物。如果编译报错，它也会给出详细的报错信息。

这个页面还具有支持完整的 IDE 支持，可以自动语法提示。此外，它支持把代码片段和编译器设置保存成 URL，分享给他人。

### 6、tsc 编辑器

TypeScript 官方提供的编译器叫做 tsc，可以将 TypeScript 脚本编译成 JavaScript 脚本。本机想要编译 TypeScript 代码，必须安装 tsc。

根据约定，TypeScript 脚本文件使用`.ts`后缀名，JavaScript 脚本文件使用`.js`后缀名。tsc 的作用就是把`.ts`脚本转变成`.js`脚本。

#### 6.1、安装

tsc 是一个 npm 模块，使用下面的命令安装（必须先安装 npm）。

```shell
$ npm install -g typescript
```

上面命令是全局安装 tsc，也可以在项目中将 tsc 安装为一个依赖模块。

安装完成后，检查一下是否安装成功。

```shell
# 或者 tsc --version
$ tsc -v
Version 5.1.6
```

上面命令中，`-v`或`--version`参数可以输出当前安装的 tsc 版本。

#### 6.2、帮助信息

`-h`或`--help`参数输出帮助信息。

```shell
$ tsc -h
```

默认情况下，“--help”参数仅显示基本的可用选项。我们可以使用“--all”参数，查看完整的帮助信息。

```shell
$ tsc --all
```

#### 6.3、编译脚本

安装 tsc 之后，就可以编译 TypeScript 脚本了。

`tsc`命令后面，加上 TypeScript 脚本文件，就可以将其编译成 JavaScript 脚本。

```shell
$ tsc app.ts
```

上面命令会在当前目录下，生成一个`app.js`脚本文件，这个脚本就完全是编译后生成的 JavaScript 代码。

`tsc`命令也可以一次编译多个 TypeScript 脚本。

```shell
$ tsc file1.ts file2.ts file3.ts
```

上面命令会在当前目录生成三个 JavaScript 脚本文件`file1.js`、`file2.js`、`file3.js`。

tsc 有很多参数，可以调整编译行为。

**（1）--outFile**

如果想将多个 TypeScript 脚本编译成一个 JavaScript 文件，使用`--outFile`参数。

```shell
$ tsc file1.ts file2.ts --outFile app.js
```

上面命令将`file1.ts`和`file2.ts`两个脚本编译成一个 JavaScript 文件`app.js`。

**（2）--outDir**

编译结果默认都保存在当前目录，`--outDir`参数可以指定保存到其他目录。

```shell
$ tsc app.ts --outDir dist
```

上面命令会在`dist`子目录下生成`app.js`。

**（3）--target**

为了保证编译结果能在各种 JavaScript 引擎运行，tsc 默认会将 TypeScript 代码编译成很**低版本**的 JavaScript，即3.0版本（以`es3`表示）。这通常不是我们想要的结果。

这时可以使用`--target`参数，指定编译后的 JavaScript 版本。建议使用`es2015`，或者**更新版本**。

```shell
$ tsc --target es2015 app.ts
```

#### 6.4、编译错误的处理

编译过程中，如果没有报错，`tsc`命令不会有任何显示。所以，如果你没有看到任何提示，就表示编译成功了。

如果**编译报错**，`tsc`命令就会显示报错信息，但是这种情况下，**依然会编译生成 JavaScript 脚本**。

举例来说，下面是一个错误的 TypeScript 脚本`app.ts`。

```typescript
// app.ts
let foo:number = 123;
foo = 'abc'; // 报错
```

上面示例中，变量`foo`是数值类型，赋值为字符串，`tsc`命令编译这个脚本就会报错。

```txt
$ tsc app.ts

app.ts:2:1 - error TS2322: Type 'string' is not assignable to type 'number'.

2 foo = 'abc';
  ~~~

Found 1 error in app.ts:2
```

上面示例中，`tsc`命令输出报错信息，表示变量`foo`被错误地赋值为字符串。

这种情况下，编译产物`app.js`还是会照样生成，下面就是编译后的结果。

```javascript
// app.js
var foo = 123;
foo = 'abc';
```

可以看到，**尽管有错，tsc 依然原样将 TypeScript 编译成 JavaScript 脚本**。

如果希望一旦报错就停止编译，不生成编译产物，可以使用`--noEmitOnError`参数。

```shell
$ tsc --noEmitOnError app.ts
```

上面命令在报错后，就不会生成`app.js`。

tsc 还有一个`--noEmit`参数，只检查类型是否正确，不生成 JavaScript 文件。

```shell
$ tsc --noEmit app.ts
```

上面命令只检查是否有编译错误，不会生成`app.js`。

tsc 命令的更多参数，详见《tsc 编译器》一章。

#### 6.5、tsconfig.json

TypeScript 允许将`tsc`的编译参数，写在配置文件`tsconfig.json`。只要当前目录有这个文件，`tsc`就会自动读取，所以运行时可以不写参数。

```shell
$ tsc file1.ts file2.ts --outFile dist/app.js
```

上面这个命令写成`tsconfig.json`，就是下面这样。

```json
{
  "files": ["file1.ts", "file2.ts"],
  "compilerOptions": {
    "outFile": "dist/app.js"
  }
}
```

有了这个配置文件，编译时直接调用`tsc`命令就可以了。

```shell
$ tsc
```

`tsconfig.json`的详细介绍，参见《tsconfig.json 配置文件》一章。

### 7、ts-node 模块

[ts-node](https://github.com/TypeStrong/ts-node) 是一个非官方的 npm 模块，可以直接运行 TypeScript 代码。

使用时，可以先全局安装它。

```shell
$ npm install -g ts-node
```

安装后，就可以直接运行 TypeScript 脚本。

```shell
$ ts-node script.ts
```

上面命令运行了 TypeScript 脚本`script.ts`，给出运行结果。

如果不安装 ts-node，也可以通过 npx 调用它来运行 TypeScript 脚本。

```shell
$ npx ts-node script.ts
```

上面命令中，`npx`会在线调用 ts-node，从而在不安装的情况下，运行`script.ts`。

如果执行 ts-node 命令不带有任何参数，它会提供一个 TypeScript 的命令行 REPL 运行环境，你可以在这个环境中输入 TypeScript 代码，逐行执行。

```shell
$ ts-node
>
```

上面示例中，单独运行`ts-node`命令，会给出一个大于号，这就是 TypeScript 的 REPL 运行环境，可以逐行输入代码运行。

```shell
$ ts-node
> const twice = (x:string) => x + x;
> twice('abc')
'abcabc'
> 
```

上面示例中，在 TypeScript 命令行 REPL 环境中，先输入一个函数`twice`，然后调用该函数，就会得到结果。

要退出这个 REPL 环境，可以按下 Ctrl + d，或者输入`.exit`。

如果只是想简单运行 TypeScript 代码看看结果，ts-node 不失为一个便捷的方法。

## 三、any，unknown ，never 类型

### 1、any 类型

#### 1.1、基本含义

any 类型表示没有任何限制，该类型的变量可以赋予任意类型的值。

```typescript
let x:any;
x = 1; // 正确
x = 'foo'; // 正确
x = true; // 正确

let x:any = 'hello';
x(1) // 不报错
x.foo = 100; // 不报错
```

变量类型一旦设为`any`，TypeScript 实际上会关闭这个变量的类型检查。只要句法正确，都不会报错。

由于这个原因，应该尽量避免使用`any`类型，否则就失去了使用 TypeScript 的意义。

`any`类型主要适用以下两个场合：  

1. 需要关闭某些变量的类型检查
2. 为了适配以前老的 JavaScript 项目，让代码快速迁移到 TypeScript，可以把变量类型设为`any`

#### 1.2、类型推断问题

对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是`any`

```typescript
function add(x, y) {
  return x + y;
}

add(1, [1, 2, 3]) // 不报错
```

上面示例中，函数`add()`的参数变量`x`和`y`，都没有足够的信息，TypeScript 无法推断出它们的类型，就会认为这两个变量和函数返回值的类型都是`any`。以至于后面就不再对函数`add()`进行类型检查了，怎么用都可以。

TypeScript 提供了一个编译选项`noImplicitAny`，打开该选项，只要推断出`any`类型就会报错。

```shell
$ tsc --noImplicitAny app.ts # 会报错
```

这里有一个特殊情况，即使打开了`noImplicitAny`，使用`let`和`var`命令声明变量，但不赋值也不指定类型，是不会报错的。

```typescript
var x; // 不报错 TypeScript 会推断它们的类型为any。这时即使打开了noImplicitAny，也不会报错。
let y; // 不报错
```

:::info

建议使用`let`和`var`声明变量时，如果不赋值，就一定要显式声明类型，否则可能存在安全隐患。

`const`命令没有这个问题，因为 JavaScript 语言规定`const`声明变量时，必须同时进行初始化（赋值）

`const`命令声明的`x`是不能改变值的，声明时必须同时赋值，否则报错，所以它不存在类型推断为`any`的问题。

```typescript
const x; // 报错
```

:::

#### 1.3、污染问题

`any`类型除了关闭类型检查，还有一个很大的问题，就是它会“污染”其他变量。它可以赋值给其他任何类型的变量（因为没有类型检查），导致其他变量出错。

```typescript
let x:any = 'hello';
let y:number;

y = x; // 不报错

y * 123 // 不报错
y.toFixed() // 不报错
```

:::info

污染其他具有正确类型的变量，把错误留到运行时，这就是不宜使用`any`类型的另一个主要原因。

:::

### 2、unknown 类型

为了解决`any`类型“污染”其他变量的问题，TypeScript 3.0 引入了[`unknown`类型](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)。它与`any`含义相同，表示类型不确定，可能是任意类型，但是它的使用有一些限制，不像`any`那样自由，可以视为 **严格版的`any`**。

`unknown`跟`any`的**相似**之处，在于所有类型的值都可以分配给`unknown`类型。

```typescript
let x:unknown;

x = true; // 正确
x = 42; // 正确
x = 'Hello World'; // 正确
```

`unknown`类型跟`any`类型的不同之处在于，它不能直接使用。主要有以下几个限制。

1. `unknown`类型的变量，不能直接赋值给其他类型的变量（除了`any`类型和`unknown`类型）。

   ```typescript
   let v:unknown = 123;
   
   let v1:boolean = v; // 报错
   let v2:number = v; // 报错
   ```

   变量`v`是`unknown`类型，**赋值给`any`和`unknown`以外类型的变量都会报错**，这就避免了污染问题，从而克服了`any`类型的一大缺点。

2. 不能直接调用`unknown`类型变量的方法和属性。

   ```typescript
   let v1:unknown = { foo: 123 };
   v1.foo  // 报错
   
   let v2:unknown = 'hello';
   v2.trim() // 报错
   
   let v3:unknown = (n = 0) => n + 1;
   v3() // 报错
   ```

   直接调用`unknown`类型变量的属性和方法，或者直接当作函数执行，都会报错。

3. 再次，`unknown`类型变量能够进行的运算是有限的

   只能进行比较运算（运算符`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`运算符和`instanceof`运算符这几种，其他运算都会报错。

   ```typescript
   let a:unknown = 1;
   
   a + 1 // 报错
   a === 1 // 正确
   ```

4. 使用`unknown`类型变量

   只有经过“**类型缩小**”，`unknown`类型变量才可以使用。所谓“类型缩小”，就是缩小`unknown`变量的类型范围，确保不会出错。

   ```typescript
   let a:unknown = 1;
   if (typeof a === 'number') {
     let r = a + 10; // 正确
   }
   
   let s:unknown = 'hello';
   if (typeof s === 'string') {
     s.length; // 正确
   }
   ```

   上面示例中，`unknown`类型的变量`a`经过**`typeof`**运算以后，能够确定实际类型是`number`，就能用于加法运算了。这就是“类型缩小”，即将一个不确定的类型缩小为更明确的类型。

   `unknown`可以看作是更安全的`any`。一般来说，凡是需要设为`any`类型的地方，通常都应该优先考虑设为`unknown`类型。

   在集合论上，`unknown`也可以视为所有其他类型（除了`any`）的全集，所以它和`any`一样，也属于 TypeScript 的顶层类型。

### 3、never 类型

为了保持与集合论的对应关系，以及类型运算的完整性，TypeScript 还引入了“**空类型**”的概念，即该类型为空，不包含任何值。

由于不存在任何属于“空类型”的值，所以该类型被称为`never`，即不可能有这样的值。

```typescript
let x:never;
```

上面示例中，变量`x`的类型是`never`，就不可能赋给它任何值，否则都会报错。

`never`类型的使用场景，主要是在一些类型运算之中，保证类型运算的完整性，详见后面章节。  
另外，不可能返回值的函数，返回值的类型就可以写成`never`，详见《函数》一章。

如果一个变量可能有多种类型（即联合类型），通常需要使用分支处理每一种类型。这时，处理所有可能的类型之后，剩余的情况就属于`never`类型。

```typescript
function fn(x:string|number) {
  if (typeof x === 'string') {
    // ...
  } else if (typeof x === 'number') {
    // ...
  } else {
    x; // never 类型
  }
}
```

上面示例中，参数变量`x`可能是字符串，也可能是数值，判断了这两种情况后，剩下的最后那个`else`分支里面，`x`就是`never`类型了。

**`never`类型的一个重要特点是，可以赋值给任意其他类型。**

```typescript
function f():never {
  throw new Error('Error');
}

let v1:number = f(); // 不报错
let v2:string = f(); // 不报错
let v3:boolean = f(); // 不报错
```

上面示例中，函数`f()`会抛错，所以返回值类型可以写成`never`，即不可能返回任何值。各种其他类型的变量都可以赋值为`f()`的运行结果（`never`类型）。

为什么`never`类型可以赋值给任意其他类型呢？这也跟集合论有关，空集是任何集合的子集。TypeScript 就相应规定，任何类型都包含了`never`类型。因此，`never`类型是任何其他类型所共有的，TypeScript 把这种情况称为“底层类型”（bottom type）。

总之，TypeScript 有两个“**顶层类型**”（`any`和`unknown`），但是“**底层类型**”只有`never`唯一一个。

## 四、系统类型

### 1、基本类型

**JavaScript** 语言 将值分成8种类型。

- boolean
- string
- number
- bigint
- symbol
- object
- undefined
- null

TypeScript 继承了 JavaScript 的类型设计，以上8种类型可以看作 TypeScript 的基本类型。

:::info

注意，上面所有类型的名称都是小写字母，首字母大写的`Number`、`String`、`Boolean`等在 JavaScript 语言中都是内置对象，而不是类型名称。

另外，undefined 和 null 既可以作为值，也可以作为类型，取决于在哪里使用它们。

:::

这8种基本类型是 TypeScript 类型系统的基础，复杂类型由它们组合而成。

#### 1.1、boolean类型

`boolean`类型只包含`true`和`false`两个布尔值。

```typescript
const x:boolean = true;
const y:boolean = false;
```

#### 1.2、string 类型

string类型包含所有字符串。

```typescript
const x:string = 'hello';
const y:string = `${x} world`;
```

#### 1.3、number 类型

`number`类型包含所有**整数**和**浮点数**。

```typescript
const x:number = 123;
const y:number = 3.14;
const z:number = 0xffff;
```

#### 1.4、bigint 类型

bigint 类型包含所有的大整数。

```typescript
const x:bigint = 123n;
const y:bigint = 0xffffn;
```

#### 1.5、symbol 类型

symbol 类型包含所有的 Symbol 值。

```typescript
const x:symbol = Symbol();
```

symbol 类型的详细介绍，参见《Symbol》一章。

#### 1.6、object 类型

根据 JavaScript 的设计，object 类型包含了所有对象、数组和函数。

```typescript
const x:object = { foo: 123 };
const y:object = [1, 2, 3];
const z:object = (n:number) => n + 1;
```

#### 1.7、undefined 类型，null 类型

undefined 和 null 是两种独立类型，它们各自都只有一个值。

undefined 类型只包含一个值`undefined`，表示未定义（即还未给出定义，以后可能会有定义）。

```typescript
let x:undefined = undefined;
const y:null = null;
```

上面示例中，变量`x`就属于 undefined 类型。两个`undefined`里面，第一个是类型，第二个是值。

null 类型也只包含一个值`null`，表示为空（即此处没有值）。

注意，如果没有声明类型的变量，被赋值为`undefined`或`null`，它们的类型会被推断为`any`。

```typescript
let a = undefined;   // any
const b = undefined; // any

let c = null;        // any
const d = null;      // any
```

如果希望避免这种情况，则需要打开编译选项`strictNullChecks`。（vscode默认打开）

```typescript
// 打开编译设置 strictNullChecks
let a = undefined;   // undefined
const b = undefined; // undefined

let c = null;        // null
const d = null;      // null
```

上面示例中，打开编译设置`strictNullChecks`以后，赋值为`undefined`的变量会被推断为`undefined`类型，赋值为`null`的变量会被推断为`null`类型。

### 2、包装对象类型

## 五、数组

## 六、元祖

## 七、symbol 类型

## 八、函数

## 九、对象

## 十、interface

## 十一、类

## 十二、泛型

## 十三、Enum

## 十四、类型推断

## 十五、模块

## 十六、namespace

## 十七、装饰器

## 十八、装饰器（旧语法）

## 十九、declare 关键字

## 二十、d.ts 类型声明文件

## 二十一、运算符

## 二十二、类型映射

## 二十三、类型工具

## 二十四、注释指令

## 二十五、tsconfig.ts

## 二十六、tsc命令