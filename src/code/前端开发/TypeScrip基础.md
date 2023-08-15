---
title: TypeScript基础
date: 2023-08-12
category: 
  - TypeScript
---

(参考文章)[https://wangdoc.com/typescript/]

最简单的 TypeScript 使用方法，就是使用官网的在线编译页面， [TypeScript Playground](http://www.typescriptlang.org/play/)。

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

:::warning

注意，如果没有声明类型的变量，被赋值为`undefined`或`null`，它们的类型会被推断为`any`。

:::

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

#### 2.1、包装对象的概念

JavaScript 的8种类型之中（boolean，number，bigint，stristring，symbol，undefined，null，object），`undefined`和`null`其实是两个特殊值，`object`属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。

- boolean、string、number、bigint、symbol

上面这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。

```javascript
'hello'.charAt(1) // 'e'
```

上面示例中，字符串`hello`执行了`charAt()`方法。但是，在 JavaScript 语言中，只有对象才有方法，原始类型的值本身没有方法。这行代码之所以可以运行，就是因为在调用方法时，字符串会**自动转为包装对象**，`charAt()`方法其实是定义在包装对象上。

五种包装对象之中，symbol 类型和 bigint 类型无法直接获取它们的包装对象（即`Symbol()`和`BigInt()`不能作为构造函数使用），但是剩下三种可以。

- `Boolean()`、`String()`、`Number()`

```javascript
const s = new String('hello');
typeof s // 'object'
s.charAt(1) // 'e'
```

::warning

注意，`String()`只有当作构造函数使用时（即带有`new`命令调用），才会返回包装对象。如果当作普通函数使用（不带有`new`命令），返回就是一个普通字符串。其他两个构造函数`Number()`和`Boolean()`也是如此。

:::

#### 2.2、包装对象类型与字面量类型

由于包装对象的存在，导致每一个原始类型的值都有包装**对象**和**字面量**两种情况。

```javascript
'hello' // 字面量
new String('hello') // 包装对象
```

为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型。

- Boolean 和 boolean
- String 和 string
- Number 和 number
- BigInt 和 bigint
- Symbol 和 symbol

其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。

```typescript
const s1:String = 'hello'; // 正确
const s2:String = new String('hello'); // 正确
const s3:string = 'hello'; // 正确
const s4:string = new String('hello'); // 报错 基本类型不能接受包装类型
```

:::info

建议只使用小写类型，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。  
而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错。

:::

```typescript
const n1:number = 1;
const n2:Number = 1;

Math.abs(n1) // 1
Math.abs(n2) // 报错
```

上面示例中，`Math.abs()`方法的参数类型被定义成小写的`number`，传入大写的`Number`类型就会报错。

上一小节说过，`Symbol()`和`BigInt()`这两个函数不能当作构造函数使用，所以没有办法直接获得 symbol 类型和 bigint 类型的包装对象，除非使用下面的写法。但是，它们没有使用场景，因此`Symbol`和`BigInt`这两个类型虽然存在，但是完全没有使用的理由。

```typescript
let a:Symbol = Object(Symbol());
let b:BigInt = Object(BigInt());
```

上面示例中，得到的就是 Symbol 和 BigInt 的包装对象，但是没有使用的意义。

### 3、Object 类型与 object 类型

TypeScript 的**对象类型**也有大写`Object`和小写`object`两种。

#### 3.1、Object 类型

大写的`Object`类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值，都是`Object`类型，这囊括了几乎所有的值。

```typescript
let obj:Object;
 
obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;

obj = undefined; // 报错
obj = null; // 报错
```

上面示例中，原始类型值、对象、数组、函数都是合法的`Object`类型。

:::info

事实上，除了`undefined`和`null`这两个值不能转为对象，其他任何值都可以赋值给`Object`类型。

上面示例中，`undefined`和`null`赋值给`Object`类型，就会报错。

:::

另外，空对象`{}`是`Object`类型的简写形式，所以使用`Object`时常常用空对象代替。

```typescript
let obj:{}; // {} 是 Object 的简写形式
 
obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
```

上面示例中，变量`obj`的类型是空对象`{}`，就代表`Object`类型。

显然，无所不包的`Object`类型既不符合直觉，也不方便使用。

#### 3.2、object 类型

小写的`object`类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，**不包括原始类型**的值。

```typescript
let obj:object;
 
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
obj = true; // 报错
obj = 'hi'; // 报错
obj = 1; // 报错
```

上面示例中，`object`类型不包含原始类型值，只包含**对象、数组和函数**。

:::info 
所以，建议总是使用小写类型`object`，不使用大写类型`Object`。

注意，无论是大写的`Object`类型，还是小写的`object`类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。

:::

```typescript
const o1:Object = { foo: 0 };
const o2:object = { foo: 0 };

o1.toString() // 正确
o1.foo // 报错

o2.toString() // 正确
o2.foo // 报错
```

上面示例中，`toString()`是对象的原生方法，可以正确访问。`foo`是自定义属性，访问就会报错。  
如何描述对象的自定义属性，详见《对象类型》一章。

### 4、undefined 和 null 的特殊性

:::info

`undefined`和`null`既是 **值**，又是 **类型**。

作为值，它们有一个特殊的地方：任何**其他类型**的变量都可以赋值为`undefined`或`null`。

:::

```typescript
let age:number = 24;

age = null;      // 正确
age = undefined; // 正确
```

上面代码中，变量`age`的类型是`number`，但是赋值为`null`或`undefined`并不报错。

这并不是因为`undefined`和`null`包含在`number`类型里面，而是故意这样设计  
任何类型的变量都可以赋值为`undefined`和`null`，以便跟 JavaScript 的行为保持一致。

JavaScript 的行为是，变量如果等于`undefined`就表示还没有赋值，如果等于`null`就表示值为空。所以，TypeScript 就允许了任何类型的变量都可以赋值为这两个值。

但是有时候，这并不是开发者想要的行为，也不利于发挥类型系统的优势。

```typescript
const obj:object = undefined;
obj.toString() // 编译不报错，运行就报错
```

上面示例中，变量`obj`等于`undefined`，编译不会报错。但是，实际执行时，调用`obj.toString()`就报错了，因为`undefined`不是对象，没有这个方法。

为了避免这种情况，及早发现错误，TypeScript 提供了一个编译选项`strictNullChecks`。  
只要打开这个选项，`undefined`和`null`就不能赋值给其他类型的变量（除了`any`类型和`unknown`类型）。

下面是 tsc 命令打开这个编译选项的例子。

```typescript
// tsc --strictNullChecks app.ts

let age:number = 24;

age = null;      // 报错
age = undefined; // 报错
```

上面示例中，打开`--strictNullChecks`以后，`number`类型的变量`age`就不能赋值为`undefined`和`null`。

这个选项在配置文件**`tsconfig.json`**的写法如下。

```json
{
  "compilerOptions": {
    "strictNullChecks": true
    // ...
  }
}
```

打开`strictNullChecks`以后，`undefined`和`null`这两种值也不能互相赋值了。

```typescript
// 打开 strictNullChecks

let x:undefined = null; // 报错
let y:null = undefined; // 报错
```

上面示例中，`undefined`类型的变量赋值为`null`，或者`null`类型的变量赋值为`undefind`，都会报错。

总之，打开`strictNullChecks`以后，`undefined`和`null`只能赋值给自身，或者`any`类型和`unknown`类型的变量。

```typescript
let x:any     = undefined;
let y:unknown = null;
```

### 5、值类型

TypeScript 规定，单个值也是一种类型，称为“值类型”。

```typescript
let x:'hello';

x = 'hello'; // 正确
x = 'world'; // 报错
```

上面示例中，变量`x`的类型是字符串`hello`，导致它只能赋值为这个字符串，赋值为其他字符串就会报错。

:::info

TypeScript 推断类型时，遇到`const`命令声明的变量，如果代码里面没有注明类型，就会推断该变量是值类型。

:::

```typescript
// x 的类型是 "https"
const x = 'https';

// y 的类型是 string
const y:string = 'https';
```

上面示例中，变量`x`是`const`命令声明的，TypeScript 就会推断它的类型是值`https`，而不是`string`类型。

这样推断是合理的，因为`const`命令声明的变量，一旦声明就不能改变，相当于常量。值类型就意味着不能赋为其他值。

:::info

注意，`const`命令声明的变量，如果赋值为对象，并不会推断为值类型。

:::

```typescript
// x 的类型是 { foo: number }
const x = { foo: 1 };
```

上面示例中，变量`x`没有被推断为值类型，而是推断属性`foo`的类型是`number`。  
这是因为 JavaScript 里面，**`const`变量赋值为对象时，属性值是可以改变的**。

值类型可能会出现一些很奇怪的报错。

```typescript
const x:5 = 4 + 1; // 报错
```

上面示例中，等号左侧的类型是数值`5`，等号右侧`4 + 1`的类型，TypeScript 推测为`number`。由于`5`是`number`的子类型，`number`是`5`的父类型，父类型不能赋值给子类型，所以报错了（详见本章后文）。

但是，反过来是可以的，子类型可以赋值给父类型。

```typescript
let x:5 = 5;
let y:number = 4 + 1;

x = y; // 报错
y = x; // 正确
```

上面示例中，变量`x`属于子类型，变量`y`属于父类型。`y`不能赋值为子类型`x`，但是反过来是可以的。

如果一定要让子类型可以赋值为父类型的值，就要用到类型断言（详见《类型断言》一章）。

```typescript
const x:5 = (4 + 1) as 5; // 正确
```

上面示例中，在`4 + 1`后面加上`as 5`，就是告诉编译器，可以把`4 + 1`的类型视为值类型`5`，这样就不会报错了。

只包含单个值的值类型，用处不大。实际开发中，往往将多个值结合，作为联合类型使用。

### 6、联合类型 |

联合类型（union types）指的是多个类型组成的一个新类型，使用符号`|`表示。

联合类型`A|B`表示，任何一个类型只要属于`A`或`B`，就属于联合类型`A|B`。

```typescript
let x:string|number;

x = 123; // 正确
x = 'abc'; // 正确
```

上面示例中，变量`x`就是联合类型`string|number`，表示它的值既可以是字符串，也可以是数值。

联合类型可以与值类型相结合，表示一个变量的值有若干种可能。

```typescript
let setting:true|false;

let gender:'male'|'female';

let rainbowColor:'赤'|'橙'|'黄'|'绿'|'青'|'蓝'|'紫';
```

上面的示例都是由值类型组成的联合类型，非常清晰地表达了变量的取值范围。其中，`true|false`其实就是布尔类型`boolean`。

前面提到，打开编译选项`strictNullChecks`后，其他类型的变量不能赋值为`undefined`或`null`。这时，如果某个变量确实可能包含空值，就可以采用联合类型的写法。

```typescript
let name:string|null;

name = 'John';
name = null;
```

上面示例中，变量`name`的值可以是字符串，也可以是`null`。

联合类型的第一个成员前面，也可以加上竖杠`|`，这样便于多行书写。

```typescript
let x:
  | 'one'
  | 'two'
  | 'three'
  | 'four';
```

如果一个变量有多种类型，读取该变量时，往往需要进行“类型缩小”（type narrowing），区分该值到底属于哪一种类型，然后再进一步处理。

```typescript
// 未进行类型缩小
function printId(
  id:number|string
) {
    console.log(id.toUpperCase()); // 报错
}
```

解决方法就是对参数`id`做一下类型缩小，确定它的类型以后再进行处理。

```typescript
function printId(
  id:number|string
) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

上面示例中，函数体内部会判断一下变量`id`的类型，如果是字符串，就对其执行`toUpperCase()`方法。

“类型缩小”是 TypeScript 处理联合类型的标准方法，凡是遇到可能为多种类型的场合，都需要先缩小类型，再进行处理。  
实际上，联合类型本身可以看成是一种“**类型放大**”（type widening），处理时就需要“**类型缩小**”（type narrowing）。

下面是“类型缩小”的另一个例子。

```typescript
function getPort(
  scheme: 'http'|'https'
) {
  switch (scheme) {
    case 'http':
      return 80;
    case 'https':
      return 443;
  }
}
```

上面示例中，函数体内部对参数变量`scheme`进行类型缩小，根据不同的值类型，返回不同的结果。

### 7、交叉类型 &

交叉类型（intersection types）指的多个类型组成的一个新类型，使用符号`&`表示。

交叉类型`A&B`表示，任何一个类型必须**同时属于`A`和`B`**，才属于交叉类型`A&B`，即交叉类型同时满足`A`和`B`的特征。

```typescript
let x:number&string;
```

上面示例中，变量`x`同时是数值和字符串，这当然是不可能的，所以 TypeScript 会认为`x`的类型实际是**`never`**。

交叉类型的主要用途是表示**对象的合成**。

```typescript
let obj:
  { foo: string } &
  { bar: string };

obj = {
  foo: 'hello',
  bar: 'world'
};
```

上面示例中，变量`obj`同时具有属性`foo`和属性`bar`。

交叉类型常常用来为对象类型添加新属性。

```typescript
type A = { foo: number };

type B = A & { bar: number };
```

上面示例中，类型`B`是一个交叉类型，用来在`A`的基础上增加了属性`bar`。

### 8、type 命令

`type`命令用来定义一个类型的别名。

```typescript
type Age = number;

let age:Age = 55;
```

上面示例中，`type`命令为`number`类型定义了一个别名`Age`。这样就能像使用`number`一样，使用`Age`作为类型。

别名可以让类型的名字变得更有意义，也能增加代码的可读性，还可以使复杂类型用起来更方便，便于以后修改变量的类型。

**别名不允许重名**。

```typescript
type Color = 'red';
type Color = 'blue'; // 报错
```

上面示例中，同一个别名`Color`声明了两次，就报错了。

别名的作用域是**块级作用域**。这意味着，代码块内部定义的别名，影响不到外部。

```typescript
type Color = 'red';

if (Math.random() < 0.5) {
  type Color = 'blue';
}
```

上面示例中，`if`代码块内部的类型别名`Color`，跟外部的`Color`是不一样的。

别名支持使用表达式，也可以在定义一个别名时，使用另一个别名，即**别名允许嵌套**。

```typescript
type World = "world";
type Greeting = `hello ${World}`;
```

上面示例中，别名`Greeting`使用了模板字符串，读取另一个别名`World`。

`type`命令属于类型相关的代码，编译成 JavaScript 的时候，会被全部删除。

### 9、typeof 运算符

JavaScript 语言中，typeof 运算符是一个一元运算符，返回一个字符串，代表操作数的类型。

```javascript
typeof 'foo'; // 'string'
```

上面示例中，`typeof`运算符返回字符串`foo`的类型是`string`。

:::warning

注意，这时 typeof 的操作数是一个**值**。

:::

JavaScript 里面，`typeof`运算符只可能返回八种结果，而且都是字符串。

```javascript
typeof undefined; // "undefined"
typeof true; // "boolean"
typeof 1337; // "number"
typeof "foo"; // "string"
typeof {}; // "object"
typeof parseInt; // "function"
typeof Symbol(); // "symbol"
typeof 127n // "bigint"
```

TypeScript 将`typeof`运算符移植到了**类型**运算，它的操作数依然是一个值，但是返回的不是字符串，而是该值的 TypeScript 类型。

```typescript
const a = { x: 0 };

type T0 = typeof a;   // { x: number }
type T1 = typeof a.x; // number
```

上面示例中，`typeof a`表示返回变量`a`的 TypeScript 类型（`{ x: number }`）。同理，`typeof a.x`返回的是属性`x`的类型（`number`）。

这种用法的`typeof`返回的是 TypeScript 类型，所以只能用在**类型运算**之中（即跟类型相关的代码之中），不能用在**值运算**。

也就是说，同一段代码可能存在两种`typeof`运算符，一种用在值相关的 JavaScript 代码部分，另一种用在类型相关的 TypeScript 代码部分。

```typescript
let a = 1;
let b:typeof a;

if (typeof a === 'number') {
  b = a;
}
```

上面示例中，用到了两个`typeof`，第一个是类型运算，第二个是值运算。它们是不一样的，不要混淆。

JavaScript 的 typeof 遵守 JavaScript 规则，TypeScript 的 typeof 遵守 TypeScript 规则。  
它们的一个重要区别在于，编译后，前者会保留，后者会被全部删除。

上例的代码编译结果如下。

```typescript
let a = 1;
let b;
if (typeof a === 'number') {
    b = a;
}
```

上面示例中，只保留了原始代码的第二个 typeof，删除了第一个 typeof。

由于编译时不会进行 JavaScript 的值运算，所以TypeScript 规定，typeof 的参数只能是**标识符**，不能是需要运算的表达式。

```typescript
type T = typeof Date(); // 报错
```

上面示例会报错，原因是 typeof 的参数不能是一个值的运算式，而`Date()`需要运算才知道结果。

另外，`typeof`命令的参数不能是类型。

```typescript
type Age = number;
type MyAge = typeof Age; // 报错
```

上面示例中，`Age`是一个类型别名，用作`typeof`命令的参数就会报错。

typeof 是一个很重要的 TypeScript 运算符，有些场合不知道某个变量`foo`的类型，这时使用`typeof foo`就可以获得它的类型。

### 10、块级类型声明

TypeScript 支持块级类型声明，即类型可以声明在代码块（用大括号表示）里面，并且只在当前代码块有效。

```typescript
if (true) {
  type T = number;
  let v:T = 5;
} else {
  type T = string;
  let v:T = 'hello';
}
```

上面示例中，存在两个代码块，其中分别有一个类型`T`的声明。这两个声明都只在自己的代码块内部有效，在代码块外部无效。

### 11、类型的兼容

TypeScript 的类型存在兼容关系，某些类型可以兼容其他类型。

```typescript
type T = number|string;

let a:number = 1;
let b:T = a;
```

上面示例中，变量`a`和`b`的类型是不一样的，但是变量`a`赋值给变量`b`并不会报错。这时，我们就认为，`b`的类型兼容`a`的类型。

TypeScript 为这种情况定义了一个专门术语。如果类型`A`的值可以赋值给类型`B`，那么类型`A`就称为类型`B`的**子类型**（subtype）。  
在上例中，类型`number`就是类型`number|string`的子类型。

TypeScript 的一个规则是，凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。

```typescript
let a:'hi' = 'hi';
let b:string = 'hello';

b = a; // 正确
a = b; // 报错
```

上面示例中，`hi`是`string`的子类型，`string`是`hi`的父类型。所以，变量`a`可以赋值给变量`b`，但是反过来就会报错。

之所以有这样的规则，是因为子类型继承了父类型的所有特征，所以可以用在父类型的场合。但是，子类型还可能有一些父类型没有的特征，所以父类型不能用在子类型的场合。

## 五、数组

JavaScript 数组在 TypeScript 里面分成两种类型，分别是**数组（array）**和**元组（tuple）**。

### 1、简介

TypeScript 数组有一个根本特征：所有成员的**类型必须相同**，但是成员数量是不确定的，可以是无限数量的成员，也可以是零成员。

数组的类型有两种写法。第一种写法是在数组成员的类型后面，加上一对方括号。

```typescript
let arr:number[] = [1, 2, 3];
```

上面示例中，数组`arr`的类型是`number[]`，其中`number`表示数组成员类型是`number`。

如果数组成员的类型比较复杂，可以写在圆括号里面。

```typescript
let arr:(number|string)[];
```

上面示例中，数组`arr`的成员类型是`number|string`。

这个例子里面的圆括号是必须的，否则因为竖杠`|`的优先级低于`[]`，TypeScript 会把`number|string[]`理解成`number`和`string[]`的联合类型。

如果数组成员可以是任意类型，写成`any[]`。当然，这种写法是应该避免的。

```typescript
let arr:any[];
```

数组类型的第二种写法是使用 TypeScript 内置的 `Array `接口。

```typescript
let arr:Array<number> = [1, 2, 3];
```

上面示例中，数组`arr`的类型是`Array<number>`，其中`number`表示成员类型是`number`。

这种写法对于成员类型比较复杂的数组，代码**可读性**会稍微好一些。

```typescript
let arr:Array<number|string>;
```

这种写法本质上属于泛型，详细解释参见《泛型》一章。  
另外，数组类型还有第三种写法，因为很少用到，本章就省略了，详见《interface 接口》一章。

数组类型声明了以后，成员数量是不限制的，任意数量的成员都可以，也可以是空数组。

```typescript
let arr:number[];
arr = [];
arr = [1];
arr = [1, 2];
arr = [1, 2, 3];
```

上面示例中，数组`arr`无论有多少个成员，都是正确的。

这种规定的隐藏含义就是，数组的成员是可以动态变化的。

```typescript
let arr:number[] = [1, 2, 3];

arr[3] = 4;
arr.length = 2;

arr // [1, 2]
```

上面示例中，数组增加成员或减少成员，都是可以的。

正是由于成员数量可以动态变化，所以 TypeScript 不会对数组边界进行检查，越界访问数组并不会报错。

```typescript
let arr:number[] = [1, 2, 3];
let foo = arr[3]; // 正确
```

上面示例中，变量`foo`的值是一个不存在的数组成员，TypeScript 并不会报错。

TypeScript 允许使用方括号读取数组成员的类型。

```typescript
type Names = string[];
type Name = Names[0]; // string
```

上面示例中，类型`Names`是字符串数组，那么`Names[0]`返回的类型就是`string`。

由于数组成员的索引类型都是`number`，所以读取成员类型也可以写成下面这样。

```typescript
type Names = string[];
type Name = Names[number]; // string
```

上面示例中，`Names[number]`表示数组`Names`所有数值索引的成员类型，所以返回`string`。

### 2、数组的类型推断

如果数组变量没有声明类型，TypeScript 就会推断数组成员的类型。这时，推断行为会因为值的不同，而有所不同。

如果变量的初始值是空数组，那么 TypeScript 会推断数组类型是`any[]`。

```typescript
// 推断为 any[]
const arr = [];
```

后面，为这个数组赋值时，TypeScript 会自动更新类型推断。

```typescript
const arr = [];
arr // 推断为 any[]

arr.push(123);
arr // 推断类型为 number[]

arr.push('abc');
arr // 推断类型为 (string|number)[]
```

:::info

上面示例中，数组变量`arr`的初始值是空数组，然后随着新成员的加入，TypeScript 会自动修改推断的数组类型。

但是，类型推断的自动更新只发生初始值为空数组的情况。如果初始值不是空数组，类型推断就不会更新。

:::

```typescript
// 推断类型为 number[]
const arr = [123];

arr.push('abc'); // 报错
```

上面示例中，数组变量`arr`的初始值是`[123]`，TypeScript 就推断成员类型为`number`。新成员如果不是这个类型，TypeScript 就会报错，而不会更新类型推断。

### 3、只读数组，const 断言

JavaScript 规定，`const`命令声明的数组变量是可以改变成员的。

```typescript
const arr = [0, 1];
arr[0] = 2;
```

上面示例中，修改`const`命令声明的数组的成员是允许的。

但是，很多时候确实有声明为只读数组的需求，即不允许变动数组成员。

TypeScript 允许声明只读数组，方法是在数组类型前面加上`readonly`关键字。

```typescript
const arr:readonly number[] = [0, 1];

arr[1] = 2; // 报错
arr.push(3); // 报错
delete arr[0]; // 报错
```

TypeScript 将`readonly number[]`与`number[]`视为两种不一样的类型，后者是前者的子类型。

这是因为只读数组没有`pop()`、`push()`之类会改变原数组的方法，所以`number[]`的方法数量要多于`readonly number[]`，这意味着`number[]`其实是`readonly number[]`的子类型。

我们知道，子类型继承了父类型的所有特征，并加上了自己的特征，所以子类型`number[]`可以用于所有使用父类型的场合，反过来就不行。

```typescript
let a1:number[] = [0, 1];
let a2:readonly number[] = a1; // 正确

a1 = a2; // 报错
```

上面示例中，子类型`number[]`可以赋值给父类型`readonly number[]`，但是反过来就会报错。

由于只读数组是数组的父类型，所以它不能代替数组。这一点很容易产生令人困惑的报错。

```typescript
function getSum(s:number[]) {
  // ...
}

const arr:readonly number[] = [1, 2, 3];

getSum(arr) // 报错
```

上面示例中，函数`getSum()`的参数`s`是一个数组，传入只读数组就会报错。原因就是只读数组是数组的父类型，父类型不能替代子类型。这个问题的解决方法是使用类型断言`getSum(arr as number[])`，详见《类型断言》一章。

:::warning

注意，`readonly`关键字不能与数组的泛型写法一起使用。

:::

```typescript
// 报错
const arr:readonly Array<number> = [0, 1];
```

上面示例中，`readonly`与数组的泛型写法一起使用，就会报错。

实际上，TypeScript 提供了两个专门的泛型，用来生成只读数组的类型。

```typescript
const a1:ReadonlyArray<number> = [0, 1];

const a2:Readonly<number[]> = [0, 1];
```

上面示例中，泛型`ReadonlyArray<T>`和`Readonly<T[]>`都可以用来生成只读数组类型。两者尖括号里面的写法不一样，`Readonly<T[]>`的尖括号里面是整个数组（`number[]`），而`ReadonlyArray<T>`的尖括号里面是数组成员（`number`）。

只读数组还有一种声明方法，就是使用“const 断言”。

```typescript
const arr = [0, 1] as const;

arr[0] = [2]; // 报错 
```

上面示例中，`as const`告诉 TypeScript，推断类型时要把变量`arr`推断为只读数组，从而使得数组成员无法改变。

### 4、多维数组

TypeScript 使用`T[][]`的形式，表示二维数组，`T`是最底层数组成员的类型。

```typescript
var multi:number[][] =
  [[1,2,3], [23,24,25]];
```

上面示例中，变量`multi`的类型是`number[][]`，表示它是一个二维数组，最底层的数组成员类型是`number`。

## 六、元祖

### 1、简介

元组（tuple）是 TypeScript 特有的数据类型，JavaScript 没有单独区分这种类型。

元组必须明确声明每个成员的类型。

```typescript
const s:[string, string, boolean]
  = ['a', 'b', true];
```

上面示例中，元组`s`的前两个成员的类型是`string`，最后一个成员的类型是`boolean`。

元组类型的写法，与上一章的数组有一个重大差异。数组的成员类型写在方括号外面（`number[]`），元组的成员类型是写在方括号里面（`[number]`）。

TypeScript 的区分方法是，成员类型写在方括号里面的就是元组，写在外面的就是数组。

```typescript
let a:[number] = [1];
```

上面示例中，变量`a`是一个元组，只有一个成员，类型是`number`。

使用元组时，必须明确给出类型声明（上例的`[number]`），不能省略，否则 TypeScript 会把一个值自动推断为数组。

```typescript
// a 的类型为 (number | boolean)[]
let a = [1, true];
```

上面示例中，变量`a`的值其实是一个元组，但是 TypeScript 会将其推断为一个联合类型的数组，即`a`的类型为`(number | boolean)[]`。

元组成员的类型可以添加问号后缀（`?`），表示该成员是可选的。

```typescript
let a:[number, number?] = [1];
```

上面示例中，元组`a`的第二个成员是可选的，可以省略。

:::warning

注意，问号只能用于元组的尾部成员，也就是说，所有可选成员必须在必选成员之后。

:::

```typescript
type myTuple = [
  number,
  number,
  number?,
  string?
];
```

上面示例中，元组`myTuple`的最后两个成员是可选的。也就是说，它的成员数量可能有两个、三个和四个。

由于需要声明每个成员的类型，所以大多数情况下，元组的成员数量是有限的，从类型声明就可以明确知道，元组包含多少个成员，越界的成员会报错。

```typescript
let x:[string, string] = ['a', 'b'];

x[2] = 'c'; // 报错
```

上面示例中，变量`x`是一个只有两个成员的元组，如果对第三个成员赋值就报错了。

但是，使用扩展运算符（`...`），可以表示不限成员数量的元组。

```typescript
type NamedNums = [
  string,
  ...number[]
];

const a:NamedNums = ['A', 1, 2];
const b:NamedNums = ['B', 1, 2, 3];
```

上面示例中，元组类型`NamedNums`的第一个成员是字符串，后面的成员使用扩展运算符来展开一个数组，从而实现了不定数量的成员。

扩展运算符用在元组的任意位置都可以，但是它后面只能是数组或元组。

```typescript
type t1 = [string, number, ...boolean[]];
type t2 = [string, ...boolean[], number];
type t3 = [...boolean[], string, number];
```

上面示例中，扩展运算符分别在元组的尾部、中部和头部。

如果不确定元组成员的类型和数量，可以写成下面这样。

```typescript
type Tuple = [...any[]];
```

上面示例中，元组`Tuple`可以放置任意数量和类型的成员。但是这样写，也就失去了使用元组和 TypeScript 的意义。

元组可以通过方括号，读取成员类型。

```typescript
type Tuple = [string, number];
type Age = Tuple[1]; // number
```

上面示例中，`Tuple[1]`返回1号位置的成员类型。

由于元组的成员都是数值索引，即索引类型都是`number`，所以可以像下面这样读取。

```typescript
type Tuple = [string, number, Date];
type TupleEl = Tuple[number];  // string|number|Date
```

上面示例中，`Tuple[number]`表示元组`Tuple`的所有数值索引的成员类型，所以返回`string|number|Date`，即这个类型是三种值的联合类型。

### 2、只读元组

元组也可以是只读的，不允许修改，有两种写法。

```typescript
// 写法一
type t = readonly [number, string]

// 写法二
type t = Readonly<[number, string]>
```

上面示例中，两种写法都可以得到只读元组，其中写法二是一个泛型，用到了工具类型`Readonly<T>`。

跟数组一样，只读元组是元组的父类型。所以，元组可以替代只读元组，而只读元组不能替代元组。

```typescript
type t1 = readonly [number, number];
type t2 = [number, number];

let x:t2 = [1, 2];
let y:t1 = x; // 正确

x = y; // 报错
```

上面示例中，类型`t1`是只读元组，类型`t2`是普通元组。`t2`类型可以赋值给`t1`类型，反过来就会报错。

由于只读元组不能替代元组，所以会产生一些令人困惑的报错。

```typescript
function distanceFromOrigin([x, y]:[number, number]) {
  return Math.sqrt(x**2 + y**2);
}

let point = [3, 4] as const;

distanceFromOrigin(point); // 报错
```

上面示例中，函数`distanceFromOrigin()`的参数是一个元组，传入只读元组就会报错，因为只读元组不能替代元组。

:::info

读者可能注意到了，上例中`[3, 4] as const`的写法，在上一章讲到，生成的是只读数组，其实生成的同时也是只读元组。因为它生成的实际上是一个只读的“值类型”`readonly [3, 4]`，把它解读成只读数组或只读元组都可以。

:::

上面示例报错的解决方法，就是使用类型断言，在最后一行将传入的参数断言为普通元组，详见《类型断言》一章。

```typescript
distanceFromOrigin(
  point as [number, number]
)
```

### 3、成员数量的推断

如果没有可选成员和扩展运算符，TypeScript 会推断出元组的成员数量（即元组长度）。

```typescript
function f(point: [number, number]) {
  if (point.length === 3) {  // 报错
    // ...
  }
}
```

上面示例会报错，原因是 TypeScript 发现元组`point`的长度是`2`，不可能等于`3`，这个判断无意义。

如果包含了可选成员，TypeScript 会推断出可能的成员数量。

```typescript
function f(
  point:[number, number?, number?]
) {
  if (point.length === 4) {  // 报错
    // ...
  }
}
```

上面示例会报错，原因是 TypeScript 发现`point.length`的类型是`1|2|3`，不可能等于`4`。

### 4、扩展运算符与成员数量

扩展运算符（`...`）将数组（注意，不是元组）转换成一个逗号分隔的序列，这时 TypeScript 会认为这个序列的成员数量是不确定的，因为数组的成员数量是不确定的。

这导致如果函数调用时，使用扩展运算符传入函数参数，可能发生参数数量与数组长度不匹配的报错。

```typescript
const arr = [1, 2];

function add(x:number, y:number){
  // ...
}

add(...arr) // 报错
```

上面示例会报错，原因是函数`add()`只能接受两个参数，但是传入的是`...arr`，TypeScript 认为转换后的参数个数是不确定的。

有些函数可以接受任意数量的参数，这时使用扩展运算符就不会报错。

```typescript
const arr = [1, 2, 3];
console.log(...arr) // 正确
```

上面示例中，`console.log()`可以接受任意数量的参数，所以传入`...arr`就不会报错。

解决这个问题的一个方法，就是把成员数量不确定的数组，写成成员数量确定的元组，再使用扩展运算符。

```typescript
const arr:[number, number] = [1, 2];
function add(x:number, y:number){
  // ...
}

add(...arr) // 正确
```

上面示例中，`arr`是一个拥有两个成员的元组，所以 TypeScript 能够确定`...arr`可以匹配函数`add()`的参数数量，就不会报错了。

另一种写法是使用`as const`断言。

```typescript
const arr = [1, 2] as const;
```

上面这种写法也可以，因为 TypeScript 会认为`arr`的类型是`readonly [1, 2]`，这是一个只读的值类型，可以当作数组，也可以当作元组。

## 七、symbol 类型

### 1、简介

Symbol 是 ES2015 新引入的一种原始类型的值。它类似于字符串，但是每一个 Symbol 值都是独一无二的，与其他任何值都不相等。

Symbol 值通过`Symbol()`函数生成。在 TypeScript 里面，Symbol 的类型使用`symbol`表示。

```typescript
let x:symbol = Symbol();
let y:symbol = Symbol();

x === y // false
```

上面示例中，变量`x`和`y`的类型都是`symbol`，且都用`Symbol()`生成，但是它们是不相等的。

### 2、unique symbol

`symbol`类型包含所有的 Symbol 值，但是无法表示某一个具体的 Symbol 值。

比如，`5`是一个具体的数值，就用`5`这个字面量来表示，这也是它的值类型。但是，Symbol 值不存在字面量，必须通过变量来引用，所以写不出只包含单个 Symbol 值的那种值类型。

为了解决这个问题，TypeScript 设计了`symbol`的一个子类型`unique symbol`，它表示单个的、某个具体的 Symbol 值。

因为`unique symbol`表示单个值，所以这个类型的变量是不能修改值的，只能用`const`命令声明，不能用`let`声明。

```typescript
// 正确
const x:unique symbol = Symbol();

// 报错
let y:unique symbol = Symbol();
```

上面示例中，`let`命令声明的变量，不能是`unique symbol`类型，会报错。

`const`命令为变量赋值 Symbol 值时，变量类型默认就是`unique symbol`，所以类型可以省略不写。

```typescript
const x:unique symbol = Symbol();
// 等同于
const x = Symbol();
```

每个声明为`unique symbol`类型的变量，它们的值都是不一样的，其实属于两个值类型。

```typescript
const a:unique symbol = Symbol();
const b:unique symbol = Symbol();

a === b // 报错
```

上面示例中，变量`a`和变量`b`的类型虽然都是`unique symbol`，但其实是两个值类型。不同类型的值肯定是不相等的，所以最后一行就报错了。

由于 Symbol 类似于字符串，可以参考下面的例子来理解。

```typescript
const a:'hello' = 'hello';
const b:'world' = 'world';

a === b // 报错
```

上面示例中，变量`a`和`b`都是字符串，但是属于不同的值类型，不能使用严格相等运算符进行比较。

而且，由于变量`a`和`b`是两个类型，就不能把一个赋值给另一个。

```typescript
const a:unique symbol = Symbol();
const b:unique symbol = a; // 报错
```

上面示例中，变量`a`和变量`b`的类型都是`unique symbol`，但是其实类型不同，所以把`a`赋值给`b`会报错。

上例变量`b`的类型，如果要写成与变量`a`同一个`unique symbol`值类型，只能写成类型为`typeof a`。

```typescript
const a:unique symbol = Symbol();
const b:typeof a = a; // 正确
```

不过我们知道，相同参数的`Symbol.for()`方法会返回相同的 Symbol 值。TypeScript 目前无法识别这种情况，所以可能出现多个 unique symbol 类型的变量，等于同一个 Symbol 值的情况。

```typescript
const a:unique symbol = Symbol.for('foo');
const b:unique symbol = Symbol.for('foo');
```

上面示例中，变量`a`和`b`是两个不同的值类型，但是它们的值其实是相等的。

unique symbol 类型是 symbol 类型的子类型，所以可以将前者赋值给后者，但是反过来就不行。

```typescript
const a:unique symbol = Symbol();

const b:symbol = a; // 正确

const c:unique symbol = b; // 报错
```

上面示例中，unique symbol 类型（变量`a`）赋值给 symbol 类型（变量`b`）是可以的，但是 symbol 类型（变量`b`）赋值给 unique symbol 类型（变量`c`）会报错。

unique symbol 类型的一个作用，就是用作属性名，这可以保证不会跟其他属性名冲突。如果要把某一个特定的 Symbol 值当作属性名，那么它的类型只能是 unique symbol，不能是 symbol。

```typescript
const x:unique symbol = Symbol();
const y:symbol = Symbol();

interface Foo {
  [x]: string; // 正确
  [y]: string; // 报错
}
```

上面示例中，变量`y`当作属性名，但是`y`的类型是 symbol，不是固定不变的值，导致报错。

`unique symbol`类型也可以用作类（class）的属性值，但只能赋值给类的`readonly static`属性。

```typescript
class C {
  static readonly foo:unique symbol = Symbol();
}
```

上面示例中，静态只读属性`foo`的类型就是`unique symbol`。注意，这时`static`和`readonly`两个限定符缺一不可，这是为了保证这个属性是固定不变的。

### 3、类型推断

如果变量声明时没有给出类型，TypeScript 会推断某个 Symbol 值变量的类型。

`let`命令声明的变量，推断类型为 symbol。

```typescript
// 类型为 symbol
let x = Symbol();
```

`const`命令声明的变量，推断类型为 unique symbol。

```typescript
// 类型为 unique symbol
const x = Symbol();
```

但是，`const`命令声明的变量，如果赋值为另一个 symbol 类型的变量，则推断类型为 symbol。

```typescript
let x = Symbol();

// 类型为 symbol
const y = x;
```

`let`命令声明的变量，如果赋值为另一个 unique symbol 类型的变量，则推断类型还是 symbol。

```typescript
const x = Symbol();

// 类型为 symbol
let y = x;
```

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