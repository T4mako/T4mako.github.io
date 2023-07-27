---
icon: java
category: 
    - java
tag: 
    - 基础语法
    - java
---
# System类
常用方法：  
1、native long currentTimeMillis()：该方法的作用是返回当前的计算机时间，时间的表达格式为当前计算机时间和GMT时间(格林威治时间)1970年1月1号0时0分0秒所差的毫秒数。  
2、void exit(int status)：该方法的作用是退出程序。其中status的值为0代表正常退出，非零代表异常退出。 使用该方法可以在图形界面编程中实现程序的退出功能等。  
3、void gc()：该方法的作用是请求系统进行垃圾回收。至于系统是否立刻回收，则
取决于系统中垃圾回收算法的实现以及系统执行时的情况。  

```java
tring javaVersion = System.getProperty("java.version");
System.out.println("java的version:" + javaVersion);
String javaHome = System.getProperty("java.home");
System.out.println("java的home:" + javaHome);
String osName = System.getProperty("os.name");
System.out.println("os的name:" + osName);
String osVersion = System.getProperty("os.version");
System.out.println("os的version:" + osVersion);
String userName = System.getProperty("user.name");
System.out.println("user的name:" + userName);
String userHome = System.getProperty("user.home");
System.out.println("user的home:" + userHome);
String userDir = System.getProperty("user.dir");
System.out.println("user的dir:" + userDir)
```
