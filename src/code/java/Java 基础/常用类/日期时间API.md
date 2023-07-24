---
title: 日期时间API
icon: java
date: 2022-06-22
category: 
    - java
tag: 
    - 基础语法
    - java
---
## JDK8之前日期时间API

### 1、System类中的currentTimeMillis

System类提供的public static long currentTimeMillis( )用来返回当前时间与1970年1月1日0时0分0秒之间以毫秒为单位的时间差。（时间戳）
*此方法适于计算时间差。*

```java
long time = System.currentTimeMillis();//时间戳
```

### 2、java.util.Data类

1、两个构造器的使用
构造器一：Data():创建一个对应当前时间的date对象
构造器二:创建指定毫秒数的date对象
2、两个方法的使用
toString()：显示当前年，月，日，时，分，秒
getTime()：获取当前Date对象对应的毫秒数（时间戳）

```java
public void test(){
        //构造器一：Data():创建一个对应当前时间的date对象
        Date date1 = new Date();
        System.out.println(date1.toString());//Mon Jul 18 16:40:42 CST 2022
        System.out.println(date1.getTime());//1658133946199
        //构造器二:创建指定毫秒数的date对象
        Date date2 = new Date(1658133946199L);
        System.out.println(date2);
    }
```

### 3、java.sql.Date对应数据库中的日期类型的变量

1、如何实例化
2、如何将java.util.Date对象转换为java.sql.Date对象

```java
//情况一
Date date4 = new java.sql.Date(123456789L);
java.sql.Date datej5 = (java.sql.Date) date4;
//情况二
Date date6 = new Date();
java.sql.Date date7 = new Java.sql.Date(date6.getTime());
```

### 4、java.text.SimpleDateFormat类  

SimpleDateFormat的使用：SimpleDateFormat对日期Date类的格式化和解析
两个操作
①日期-->字符串
②解析：格式化的逆过程，字符串-->日期

```java
public class DateTimeTest {
    @Test
    public void testSimpleDateFormate() throws ParseException {
        //实例化SimpleDateFormat
        SimpleDateFormat sdf = new SimpleDateFormat();
        //格式化：日期-->字符串
        Date date = new Date();
        System.out.println(sdf.format(date));

        //解析：格式化的逆过程，字符串-->日期
        String str = "22-7-19 下午3:15";
        Date date1 = sdf.parse(str);
        System.out.println(date1);

        //指定的方式格式化和解析：调用带参的构造器
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String format = sdf1.format(date);
        System.out.println(format);
        //要求：字符串必须是符合SimpleDateFormate识别的格式(通过构造器参数体现)，否则抛异常
        Date date2 = sdf1.parse("2020-01-01 11:00:00");
        System.out.println(date2);
    }

}
```

### 5、java.util.Calendar(日历)类  

```java
@Test
    public void testCalendar(){
        //1、实例化
        //方式一：创建子类（GregorianCalendar）的对象
        //方式二：调用其静态方法getInstance
        Calendar calendar = Calendar.getInstance();

        //2、常用方法
        // get()
        int days= calendar.get(Calendar.DAY_OF_MONTH);
        int days2 = calendar.get(Calendar.DAY_OF_YEAR);
        System.out.println(days);
        // set()
        calendar.set(Calendar.DAY_OF_MONTH,22);
        days = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println(days);
        // add()
        calendar.add(Calendar.DAY_OF_MONTH,3);
        days = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println(days);
        //getTime():日历类——>Date
        Date date = calendar.getTime();
        System.out.println(date);
        //setTime():Date——>日历类
        Date date1 = new Date();
        calendar.setTime(date1);
        days = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println(days);
    }
```

## 4、JDK8中新日期时间API

### 1、LocalDateTime，LocalTIme，LocalDate

![image-20220719162417843](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220719162417843.png)

![image-20220719162517581](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220719162517581.png)

说明：**LocalDateTime** 相较于LocalTIme和LocalDate使用频率更高

```java
	@Test
    public void test1(){
        //now():获取当前日期，时间
        LocalDate localDate = LocalDate.now();
        LocalTime localTime = LocalTime.now();
        LocalDateTime localDateTime = LocalDateTime.now();

        System.out.println(localDate);
        System.out.println(localTime);
        System.out.println(localDateTime);

        //of():设置指定的年月日，时分秒。没有偏移量
        LocalDateTime localDateTime1 = LocalDateTime.of(2022, 7, 19, 16, 30, 45);
        System.out.println(localDateTime1);

        //getXxx()
        System.out.println(localDateTime.getDayOfMonth());
        System.out.println(localDateTime.getDayOfWeek());
        System.out.println(localDateTime.getMinute());
        System.out.println(localDateTime.getMonth());
        System.out.println(localDateTime.getMonthValue());

        //体现不可变性
        //更改
        LocalDate localDate1 = localDate.withDayOfMonth(22);
        System.out.println(localDate);
        System.out.println(localDate1);
        //增加
        LocalDateTime localDateTime2 = localDateTime.plusMonths(3);
        System.out.println(localDateTime2);
        System.out.println(localDateTime);
        //减少
        LocalDateTime localDateTime3 = localDateTime.minusDays(10);
        System.out.println(localDateTime3);
        System.out.println(localDateTime);
    }
```

### 2、瞬时Instant

类似于Date类

```java
@Test
public void test2(){
    //now():获取本初子午线对应的标准时间
    Instant instant = Instant.now();
    System.out.println(instant);
    //添加时间的偏移量
    OffsetDateTime offsetDateTime = instant.atOffset(ZoneOffset.ofHours(8));
    System.out.println(offsetDateTime);
    //获取自1970年一月一日0时0分0秒（UTC）开始的毫秒数-->Date类的getTime
    long l = instant.toEpochMilli();
    System.out.println(l);
    //ofEpochMilli():通过给定的毫秒数，获取Instance实例-->Date(long millis)
    Instant instant1 = Instant.ofEpochMilli(12346578910l);
    System.out.println(instant1);
}
```

### 3、DateTimeFormatter类

DateTimeFormatter：格式化或解析如期，时间
类似于SimpleDateFormat

```java
@Test
    public void test3(){
        //1、预定义的标准格式。如：ISO_LOCAL_DATE_TIME;ISO_LOCAL_DATE;ISO_LOCAL_TIME
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        //格式化 日期-->字符串
        LocalDateTime localDateTime = LocalDateTime.now();
        String str1 = formatter.format(localDateTime);
        System.out.println(str1);
        //解析 字符串-->日期
        /*TemporalAccessor parse = formatter.parse("2022-07-19T17:15:38.97");
        System.out.println(parse);*/

        //2、本地化相关的格式。如： ofLocalizedDateTime(FormatStyle.LONG)
        DateTimeFormatter formatter1 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG);
        //格式化
        String str2 = formatter1.format(localDateTime);
        System.out.println(str2);

        DateTimeFormatter formatter2 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.FULL);
        /*String str3 = formatter2.format(LocalDate.now());
        System.out.println(str3);*/

        //重点：3、自定义的格式。如： ofPattern(“yyyy-MM-dd hh:mm:ss”)
        DateTimeFormatter formatter3 = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
        //格式化
        String str4 = formatter3.format(LocalDateTime.now());
        System.out.println(str4);
        //解析
        TemporalAccessor accessor = formatter3.parse("2022-07-19 05:20:46");
        System.out.println(accessor);
    }
```
