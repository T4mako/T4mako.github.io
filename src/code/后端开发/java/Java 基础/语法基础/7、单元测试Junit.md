---
title: 7、单元测试
icon: java
order: 7
category: 
    - java
tag: 
    - 基础语法
    - java
---
## 单元测试JUnit
步骤：

1. 创建一个java类进行单元测试  
此Java类的要求：①是public的 ②此类提供公共的无参的构造器
2. 此类中声明单元测试的方法  
此时的单元测试方法：方法的权限是public，无返回值，无形参
3. 此单元测试方法上需要声明注解：@Test，并在单元测试中导入import.org.junit.Test;
4. 声明好单元测试方法以后，就可以在方法体内测试相关代码
