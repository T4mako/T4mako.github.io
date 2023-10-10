---
title: String 相关类
icon: java
category: 
    - java
tag: 
    - 基础语法
    - java
---
## 1、String

### 1、理解 String 的不可变性

String 字符串，使用一对「""」来表示

- String 类声明为 final 的，不可被继承
- String 类实现了 Serializable 接口：表示字符串是支持序列化的
- String 类实现了 Comparable 接口，表示 String 可以比较大小
- String 内部定义了 `final char[] value` 用于存储字符串数据
- String 代表不可变的字符序列，简称「不可变性」


:::info
String 不可变的体现：
- 当字符串重新赋值时，需要重新指定内存区域赋值，不能使用原有的 value 进行赋值
- 当对现有的字符串重新赋值时，也需要重新指定内存区域赋值
- 当调用 String 的 replace() 方法修改指定字符或字符串时，也需要重新指定内存区域赋值
- 通过「字面量」的方式（区别于 new）给一个字符串赋值，此时的字符串值声明在字符串「常量池」中
- 字符串「常量池」中不会存储相同内容的字符串

JVM 中字符串常量池存放位置说明：  
JDK1.6：存储在方法区(永久区)  
JDK1.7：存储在堆空间  
JDK1.8：存储在方法区(元空间)  
:::
			   

![image-20220717211454938](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220717211454938.png)



### 2、String 的实例化式

- 通过「字面量」定义的方式
- new + 构造器

:::info
`String s = new String("abc");` 方式创建对象，在内存中创建了几个对象？
两个，一个是堆空间中 new 的结构，一个是 char[] 对应的常量池中的数据："abc"
:::

结论：
- 常量与（注意final）常量的拼接结果在常量池。 且常量池中不会存在相同内容的常量。
- 只要其中有一个是变量， 结果就在堆中
- 如果拼接的方法调用 intern() 方法，返回值接在常量池冲

![image-20220717212301406](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220717212301406.png)

![image-20220717213536203](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220717213536203.png)

### 3、String 常用方法

| 方法名                                                       | 作用                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| int length()                                                 | 返回字符串的长度                                             |
| char charAt(int index)                                       | 返回某索引处的字符                                           |
| boolean equals(Object obj)                                   | 比较字符串的内容是否相同                                     |
| boolean equalsIgnoreCase(String anotherString)               | 比较字符串的内容是否相同， 忽略大小写                        |
| String trim()                                                | 返回字符串的副本， 忽略前导空白和尾部空白                    |
| int compareTo(String anotherString)：                        | 按字典序比较大小，相同返回0，大于返回正值，否则返回负值      |
| boolean startsWith(String prefix)                            | 判断字符串是否以指定的前缀开始                               |
| boolean endsWith(String suffix)                              | 判断字符串是否以指定的后缀结束                               |
| boolean startsWith(String prefix, int offset)                | 测试此字符串从指定索引开始的子字符串是否以指定前缀开始       |
| boolean regionMaches(int firstStart,String other,int otherStart,int length) | 比较当前字符串 firstStart 开始取长度为 length 的字符串与 other 从 otherStart 开始取长度为 length 的字符串的字符序列大小 |
| boolean regionMaches(int firstStart,String other,int otherStart,int length) | 通过参数 b，决定是否忽略大小写                               |
| String concat(String str)                                    | 将指定字符串连接到此字符串的结尾。 等价于用「+」             |
| boolean contains(String s)                                   | 判断当前 String 对象的字符串序列是否有 s 的字符序列          |
| int indexOf(String str)                                      | 返回指定子字符串在此字符串中第一次出现处的索引               |
| int indexOf(String str, int fromIndex)                       | 返回指定子字符串在此字符串中第一次出现处的索引，从指定的索引开始 |
| int lastIndexOf(String str)                                  | 返回指定子字符串在此字符串中最右边出现处的索引               |
| int lastIndexOf(String str, int fromIndex)                   | 返回指定子字符串在此字符串中最后一次出现处的索引，从指定的索引开始反向搜索 |
| String substring(int beginIndex)                             | 返回一个此字符串的从 beginIndex 开始截取到最后的一个子字符串 |
| String substring(int start, int end)                         | 返回一个此字符串从 start 开始截取到 end（不包含）的一个子字符串 |
| boolean isEmpty()                                            | 判断是否是空字符串                                           |
| String toLowerCase()                                         | 将 String 中的所有字符转换为小写                             |
| String toUpperCase()                                         | 将 String 中的所有字符转换为大写                             |
| String replace(char oldChar, char newChar)                   | 返回一个新的字符串， 它是通过用 newChar 替换此字符串中出现的所有 oldChar 得到的 |
| String replace(CharSequence target, CharSequence replacement) | 使用指定的字面值替换序列替换此字符串所有匹配字面值目标序列的子字符 |
| String replaceAll(String regex, String replacement)          | 使用给定的 replacement 替换此字符串所有匹配给定的正则表达式的子字符串。 |
| String replaceFirst(String regex, String replacement)        | 使用给定的 replacement 替换此字符串匹配给定的正则表达式的第一个子字符串 |
| boolean matches(String regex)                                | 告知此字符串是否匹配给定的正则表达式                         |
| String[] split(String regex)                                 | 根据给定正则表达式的匹配拆分此字符串                         |
| String[] split(String regex, int limit)                      | 根据匹配给定的正则表达式来拆分此字符串， 最多不超过limit个， 如果超过了， 剩下的全部都放到最后一个元素中 |

:::info
indexOf 和 lastIndexOf 方法如果未找到都是返回 -1 
:::

### 4、String 与基本数据类型包装类的转换

#### String 与基本数据类型、包装类之间的转换
  - String 到基本数据类型，包装类：调用包装类的静态方法 `parseXxx(str)`
  - 基本数据类型，包装类到 String：调用 String 重载的 `valueOf(xxx)`

```java
public class StringTest1 {
    // String 到基本数据类型，包装类:调用包装类的静态方法：parseXxx(str)
    // 基本数据类型，包装类到 String：调用 String 重载的valueOf(xxx)
    @Test
    public void test() {
        String s1 = "123";
        int num = Integer.parseInt(s1);
        String s2 = String.valueOf(num);
        String s3 = num + "";
    }
}
```

#### String 与字符数组之间的转换
String 到 char[]：调用 String 的 `toCharArray()`
char[] 到 String：调用 String 的构造器

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

#### String 与 byte[] 之间的转换
String 到 byte：调用 String 的 `getBytes()`
byte 到 String：调用 String 的构造器
（注意字符集编码解码问题）

```java
@Test
    public void test3() throws UnsupportedEncodingException {
        // String到byte:调用String的getBytes()
        String s1 = "abc123中国";
        // 编码:字符串-->字节(二进制数据)
        // 解码:字节-->字符串
        byte[] bytes = s1.getBytes();// 使用默认的字符集，进行编码
        System.out.println(Arrays.toString(bytes));

        byte[] gbks = s1.getBytes("gbk");// 使用GBK字符集进行编码
        System.out.println(Arrays.toString(gbks));

        // byte到String：调用String的构造器
        String s2= new String(bytes);// 使用默认字符集解码
        System.out.println(s2);

        String s3= new String(gbks);
        System.out.println(s3);// 乱码，编码集合解码集不同

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

## 3、 StringTokenizer 类

StringTokenizer 类用于分析字符序列并分解成独立的单词

StringTokenizer 类在 java.util 包中

构造方法：
- `StringTokenizer(String str)`：为字符串 str 构造一个 tokenizer 对象
- `StringTokenizer(String str,String delim)`：为字符串 str 构造一个tokenizer 对象，分隔标记为 delim 中的字符

常用方法：
- `int  countTokens()`：返回 tokenizer 对象所含单独单词个数
- `boolean  hasMoreElements()`：返回是否还有单词
- `boolean hasMoreTokens()`：与 hasMoreElements() 功能相同，
- `String nextToken()`：取出下一个单词

案例：
```java
String str = "I,love;you";
StringTokenizer stringTokenizer = new StringTokenizer(str,",;");
while (stringTokenizer.hasMoreTokens()){
    System.out.print(stringTokenizer.countTokens() + " ");
    System.out.println(stringTokenizer.nextToken());
}
/*
输出：
3 I
2 love
1 you
 */
```


## 4、Scanner 类

- `import java.util.Scanner`
- Scanner 的实例化：
  - `Scanner sc = new Scanner(System.in);`
  - `Scanner sc = new Scanner("i love u");`
- 调用 Scanner 类的相关方法，获取指定类型的变量
  - sc 对象调用 `next()` 方法依此返回 s 的字符序列中的单词
  - 如果最后一个单词已被 `next()` 方法返回，sc 调用 `hasNext()` 将返回 false，否则返回 true 
  - sc 可以调用 `nextDouble()`，`nextInt()` 方法将数字型单词转换为 int 或 double 数据返回
  -  scanner 默认使用「空格」做分隔标记，通过 `sc.useDelimiter(正则表达式)` 将正则表达式作为分隔标记

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

        Scanner sc = new Scanner("i;love:u");
        sc.useDelimiter(":");
        System.out.println(sc.next()); // i;love
}
}   
```
:::info
对于 char 型的获取，Scanner 没有提供相关的方法，只能获取一个字符串  
将字符串提取出 char 字符  
如果输入的数据类型与要求的不匹配时，会报异常 `InputMismatchException`
:::

:::info
StringTokenizer 类和 Scanner 类都可用于分解字符序列中的单词，StringTokenizer 类把分解出来的单词全部存入对象实体中，
Scanner 仅仅存放怎样获取单词的分隔标记  
- StringTokenizer 更快的获取单词，占用较多内存，对象一诞生就可知道单词的数目
- Scanner 类节省更多内存空间，不能立刻知道单词数目，必须一个一个取出
:::
  

