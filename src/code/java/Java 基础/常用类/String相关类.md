---
title: String相关类
icon: java
date: 2022-06-22
category: 
    - java
tag: 
    - 基础语法
    - java
---
## 1、String

### 1、理解String的不可变性

String字符串，使用一对""来表示
1、String声明为final的，不可被继承
2、String实现了Serializable接口：表示字符串是支持序列化的
			   实现了Comparable接口：表示String可以比较大小
3、String内部定义了final char[] value用于存储字符串数据
4、String代表不可变的字符序列，**简称不可变性**
			   体现：1、当字符串重新赋值时，需要重新指定内存区域赋值，不能使用原有的value进行赋值
			   		   2、当对现有的字符串重新赋值时，也需要重新指定内存区域赋值
						  3、当调用String的replace()方法修改指定字符或字符串时，也需要重新指定内存区域赋值
 5、通过字面量的方式(区别于new)给一个字符串赋值，此时的字符串值声明在字符串常量池中
6、字符串常量池中不会存储相同内容的字符串

![image-20220717211454938](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220717211454938.png)

JVM中字符串常量池存放位置说明：
JDK1.6：存储在方法区(永久区)
JDK1.7：存储在堆空间
JDK1.8：存储在方法区(元空间)

### 2、String的实例化式

方式一：通过字面量定义的方式
方式二：new+构造器

面试题：String s = new String("abc");方式创建对象，在内存中创建了几个对象？
两个，一个是堆空间中new的结构，一个是char[]对应的常量池中的数据："abc"

结论：
**1、常量与(注意final)常量的拼接结果在常量池。 且常量池中不会存在相同内容的常量。**
**2、只要其中有一个是变量， 结果就在堆中  **
**3、如果拼接的方法调用intern()方法，返回值接在常量池冲**

![image-20220717212301406](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220717212301406.png)

![image-20220717213536203](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220717213536203.png)

### 3、String常用方法

int length()： 返回字符串的长度： return value.length
char charAt(int index)： 返回某索引处的字符return value[index]
boolean isEmpty()： 判断是否是空字符串： return value.length == 0
String toLowerCase()： 使用默认语言环境， 将 String 中的所有字符转换为小写
String toUpperCase()： 使用默认语言环境， 将 String 中的所有字符转换为大写
String trim()： 返回字符串的副本， 忽略前导空白和尾部空白
boolean equals(Object obj)： 比较字符串的内容是否相同
boolean equalsIgnoreCase(String anotherString)： 与equals方法类似， 忽略大小写
String concat(String str)： 将指定字符串连接到此字符串的结尾。 等价于用“+”
int compareTo(String anotherString)： 比较两个字符串的大小
String substring(int beginIndex)： 返回一个新的字符串， 它是此字符串的从beginIndex开始截取到最后的一个子字符串。
String substring(int beginIndex, int endIndex) ： 返回一个新字符串， 它是此字符串从beginIndex开始截取到endIndex(不包含)的一个子字符串。  

boolean endsWith(String suffix)： 测试此字符串是否以指定的后缀结束
boolean startsWith(String prefix)： 测试此字符串是否以指定的前缀开始
boolean startsWith(String prefix, int toffset)： 测试此字符串从指定索引开始的子字符串是否以指定前缀开始  

boolean contains(CharSequence s)： 当且仅当此字符串包含指定的 char 值序列时，返回 true
int indexOf(String str)： 返回指定子字符串在此字符串中第一次出现处的索引
int indexOf(String str, int fromIndex)： 返回指定子字符串在此字符串中第一次出现处的索引，从指定的索引开始
int lastIndexOf(String str)： 返回指定子字符串在此字符串中最右边出现处的索引
int lastIndexOf(String str, int fromIndex)： 返回指定子字符串在此字符串中最后一次出现处的索引，从指定的索引开始反向搜索
**注： indexOf和lastIndexOf方法如果未找到都是返回-1  **

String replace(char oldChar, char newChar)： 返回一个新的字符串， 它是通过用 newChar 替换此字符串中出现的所有 oldChar 得到的。
String replace(CharSequence target, CharSequence replacement)： 使用指定的字面值替换序列替换此字符串所有匹配字面值目标序列的子字符串。
String replaceAll(String regex, String replacement) ： 使 用 给 定 的replacement 替换此字符串所有匹配给定的正则表达式的子字符串。
String replaceFirst(String regex, String replacement) ： 使 用 给 定 的replacement 替换此字符串匹配给定的正则表达式的第一个子字符串。  

boolean matches(String regex)： 告知此字符串是否匹配给定的正则表达式。

String[] split(String regex)： 根据给定正则表达式的匹配拆分此字符串。
String[] split(String regex, int limit)： 根据匹配给定的正则表达式来拆分此字符串， 最多不超过limit个， 如果超过了， 剩下的全部都放到最后一个元素中。  

注：
**什么情况下，indexOf(str)和lastIndexOf(str)返回值相同
①存在唯一一个str
②不存在str**

```java
public class StringMethodTest {
    @Test
    public void test1(){
        String s1 = "HelloWorld";
        System.out.println(s1.length());//10
        System.out.println(s1.charAt(1));//e
        System.out.println(s1.isEmpty());//false

        String s2 = s1.toUpperCase();
        System.out.println(s2);//HELLOWORLE
        System.out.println(s1);//HelloWorld

        String s3 = "   Hello   World   ";
        String s4 = s3.trim();
        System.out.println(s3);//Hello   World
        System.out.println(s4);//Hello   World

        String s5 = "HELLOWORLE";
        String s6 = "helloworld";
        System.out.println(s1.equals(s2));//false
        System.out.println(s1.equalsIgnoreCase(s2));//true

        String s7 = s1.concat(s5);
        System.out.println(s7);//HelloWorldHELLOWORLE

        String s8 = "abc";
        String s9 = "abe";
        System.out.println(s8.compareTo(s9));//-2 涉及到字符串排序

        String s10 = s1.substring(2);
        System.out.println(s10);//lloWorld

        System.out.println(s1.substring(2,5));//llo
    }
    @Test
    public void test2(){
        String s1 = "HelloWorld";

        boolean b1 = s1.endsWith("ld");//true
        boolean b2 = s1.startsWith("he");//false
        boolean b3 = s1.startsWith("llo",2);//true
        boolean b4 = s1.contains("wo"); //true

        System.out.println(s1.indexOf("lo"));//3
        System.out.println(s1.indexOf("lol"));//-1
        System.out.println(s1.indexOf("lo",5));//-1
        System.out.println(s1.lastIndexOf("or"));//6
        System.out.println(s1.lastIndexOf("or",8));//6
    }
    @Test
    public void test3(){
        String s1 = "abcde";
        String s2 = s1.replace('a','f');
        System.out.println(s2);//fbcde  
    }
}
```

### 4、String与基本数据类型包装类的转换

1、String与基本数据类型、包装类之间的转换
String到基本数据类型，包装类:调用包装类的静态方法：parseXxx(str)
基本数据类型，包装类到String：调用String重载的valueOf(xxx)

```java
public class StringTest1 {
    //String到基本数据类型，包装类:调用包装类的静态方法：parseXxx(str)
    //基本数据类型，包装类到String：调用String重载的valueOf(xxx)
    @Test
    public void test() {
        String s1 = "123";
        int num = Integer.parseInt(s1);

        String s2 = String.valueOf(num);
        String s3 = num + "";
    }
}
```

2、String与字符数组之间的转换
String到char[]:调用String的toCharArray()
char[]到String:调用String的构造器

```java
public class StringTest1 {
    @Test
    public void test2(){
        //String到char[]:调用String的toCharArray()
        String s1 = "abc123";
        char[] chars = s1.toCharArray();
        //char[]到String:调用String的构造器
        char[] arr = new char[]{'h','e','l','l','o'};
        String s2 = new String(arr);
    }
}
```

3、String与byte[]之间的转换
String到byte:调用String的getBytes()
byte到String：调用String的构造器
（注意字符集编码解码问题）

```java
@Test
    public void test3() throws UnsupportedEncodingException {
        //String到byte:调用String的getBytes()
        String s1 = "abc123中国";
        //编码:字符串-->字节(二进制数据)
        //解码:字节-->字符串
        byte[] bytes = s1.getBytes();//使用默认的字符集，进行编码
        System.out.println(Arrays.toString(bytes));

        byte[] gbks = s1.getBytes("gbk");//使用GBK字符集进行编码
        System.out.println(Arrays.toString(gbks));

        //byte到String：调用String的构造器
        String s2= new String(bytes);//使用默认字符集解码
        System.out.println(s2);

        String s3= new String(gbks);
        System.out.println(s3);//乱码，编码集合解码集不同

        String s4 = new String(gbks, "gbk");
        System.out.println(s4);
    }

}
```



## 2、StringBuffer、StringBuilder

### 1、String，StringBuffer，StringBuilder三者的异同

String：不可变的字符序列；底层使用char[]存储(jdk1.9之后用byte数组)
StringBuffer：可变的字符序列：线程安全的，效率低；底层使用char[]存储(jdk1.9之后用byte数组)
StringBuilder：可变的字符序列：jdk5.0新增，线程不安全的，效率高；底层使用char[]存储(jdk1.9之后用byte数组)

源码分析：

```java
String str = new String();//new char[0];
String str1 = new String("abc");//new char[]{'a','b','c'};

StringBuffer sb1 = new StringBuffer();//new char[16];底层创建了一个长度为16的数组
sb1.append('a');//value[0]='a';
sb1.append('b');//value[1]='b';

StringBuffer sb2 = new StringBuffer("abc")//char[] value = new char["abc".length()+16]
//问题1：System.out.println(sb2.length())//3
//问题2：扩容问题：如果要添加的数据底层数组盛不下，那需要扩容底层数组
//默认情况下，扩容为原来容量的2倍+2，同时将原有数组的元素复制到新数组中
```

**开发中建议使用StringBuffer**

### 2、StringBuffer类的常用方法

StringBuffer append(xxx)：提供了很多的append()方法， 用于进行字符串拼接
StringBuffer delete(int start,int end)：删除指定位置的内容
StringBuffer replace(int start, int end, String str)：把[start,end)位置替换为str
StringBuffer insert(int offset, xxx)：在指定位置插入xxx
StringBuffer reverse() ：把当前字符序列逆转  
public int indexOf(String str)
public String substring(int start,int end)：返回一个从start开始到end索引结束的**左闭右开区间**的子字符串
public int length()
public char charAt(int n)
public void setCharAt(int n ,char ch)  

```java
@Test
    public void test2(){
        StringBuffer s1 = new StringBuffer("abc");
        s1.append(1);//abc1
        s1.append('1');//abc11
        System.out.println(s1);
        //s1.delete(2,4);//ab1
        //s1.replace(2,4,"hello");//abhello1
        //s1.insert(2,false);//abfalsec11
        String s2 = s1.substring(1,3);//s2=bc
        System.out.println(s1);
    }
```

总结：
增：append()
删：delete(int start,int end)
改：setCharAt(int n ,char ch)  
查：charAt(int n )
插： insert(int offset, xxx)
长度：length()
遍历：for()+charAt()
