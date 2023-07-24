---
icon: java
date: 2022-06-22
category: 
    - java
tag: 
    - 基础语法
    - java
---
# Scanner类

1、`import java.util.Scanner`
2、Scanner的实例化：`Scanner scan = new Scanner(System.in);`
3、调用Scanner类的相关方法，获取指定类型的变量。
<!-- more -->
```java
import java.util.Scanner;
CLass ScannerTest{
    public static void main(String[] args){
        Scanner scan = new Scanner(System.in);
        int num = scan.nextInt();
        double db = scan.nextDouble();
        String str = scan.next();
        boolean bool = scan.nextBoolean();
        System.out.println(num);
        char c = str.charAt(0);
}
}   
```
:::info
对于char型的获取，Scanner没有提供相关的方法，只能获取一个字符串  
将字符串提取出char字符  
如果输入的数据类型与要求的不匹配时，会报异常。
:::

