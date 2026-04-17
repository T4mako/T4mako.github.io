---
icon: java
category: 
    - java
tag: 
    - 基础语法
    - java
title: Pattern 与 Matcher 类
---

java.util.regex 包提供了 Patter 类与 Matcher 类用于模式匹配  

## Pattern 对象与 Matcher 对象的创建：
```java
Srring input = "待匹配字符"
String regex = "\\w+@\\w+\\.[a-z]+(\\.[a-z]+)?" // 创建邮箱验证正则表达式
Pattern pattern = Pattern.compile(regex); // 创建 pattern 对象
Matcher matcher = pattern.matcher(input); // 创建 matcher 对象
```
## matcher 对象的方法：
| 方法 | 含义 |
|----|----|
| boolean find() | 寻找 input 和 regex 匹配的子序列，返回 true 或 false，若返回 true，可调用 start()，end()，group() 方法 |
| boolean find(int start) | 从 input 的 start 开始寻找 |
| boolean matches() | 判断 input 和 regex 是否完全匹配 |
| String replaceAll(String replacement) | 将 input 中所有和 regex 匹配的替换成 replacement（注意 input 不变） |
| String replaceFirst(String replacement) | 将 input 中所有和 regex 匹配的第一个子字符序列替换成 replacement（注意 input 不变） |
| String group() | 返回一个 String 对象，即 find() 匹配到的子字符序列 |


## 实例
```java
String regex = "\\w+@\\w+\\.[a-z]+(\\.[a-z]+)?";
String input = "haha email: haha@163.com;Wang email: wang@qq.com";
Pattern pattern = Pattern.compile(regex);
Matcher matcher = pattern.matcher(input);
while (matcher.find()){
    System.out.println(matcher.start() + " " + matcher.end());
    System.out.println(matcher.group());
}

/*
输出：
12 24
haha@163.com
37 48
wang@qq.com
 */
```





