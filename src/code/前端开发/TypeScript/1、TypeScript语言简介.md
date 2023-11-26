---
title: TypeScript语言简介
date: 2023-08-12
category: 
  - TypeScript
order: 1
 
---
[官方文档](https://www.typescriptlang.org/zh/docs/)

[参考文章](https://wangdoc.com/typescript/)

官网的在线编译页面 [TypeScript Playground](http://www.typescriptlang.org/play/)。

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