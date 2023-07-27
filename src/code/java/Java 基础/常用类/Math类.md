---
icon: java
category: 
    - java
tag: 
    - 基础语法
    - java
---
# Math类

## 1、Math.random()

```java
double value = Math.random();//生成一个 [0,1) 的随机数。
//公式：[a,b]
int x = (int)(Math.random()*(b - a + 1) + a)
```

## 2、Math.sqrt()

```java
int i = Math.sqrt(100);//开根
```

## 3、ceil,floor,round

`Math.ceil()`:向上取整，`Math.ceil(-11.6)`的结果为-11.  
`Math.floor()`:向下取整，`Math.floor(-11.4)`的结果-12.  
`Math.round()`:四舍五入，算法为`Math.floor(x+0.5)`,即将原来的数字加上0.5后再向下取整，`Math.round(11.5)`的结果是12，`Math.round(-11.5)`的结果为-11.

## 4、常用方法
![image-20220719212922435](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220719212922435.png)