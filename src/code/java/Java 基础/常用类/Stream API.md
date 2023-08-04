---
icon: java
category: 
    - java
tag: 
    - 基础语法
    - java
Date: 2023-08-04
---

# Stream API的理解与使用

流表示包含着一系列`元素的集合`，可以对其做不同类型的操作，用来对这些元素执行计算  

```java
List<String> myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");
myList
    .stream() // 创建流
    .filter(s -> s.startsWith("c")) // 执行过滤，过滤出以 c 为前缀的字符串
    .map(String::toUpperCase) // 转换成大写
    .sorted() // 排序
    .forEach(System.out::println); // for 循环打印

// C1
// C2
```

Stream执行流程
- Stream的实例化
- 一系列中间操作（过滤，映射、......）
- 终止操作

中间操作与终端操作:
1. 中间操作会再次返回一个流，所以可以链接多个中间操作，上述代码中的 filter 过滤，map 对象转换，sorted 排序，就属于中间操作。
2. 终端操作是对流操作的一个结束动作，一般返回 `void` 或者一个`非流的结果`。上述代码中的 forEach循环 就是一个终止操作。

大部分流操作都支持 `lambda` 表达式作为参数，应该说是接受一个函数式接口的实现作为参数。

## 不同类型的 Stream 流

流按对象类型可分为 `原始流` 和 `对象流`

可以从各种数据源中创建 Stream 流，其中以 `Collection` 集合最为常见。如 `List` 和 `Set` 均支持 `stream()` 方法来创建顺序流或者是并行流。
> 并行流与顺序流：并行流是通过多线程的方式来执行的，本文先讨论顺序流

### 创建流的方式

- `stream()` 方法 通过集合获取 Stream 流
- `Stream.of()` 从一堆对象中创建 Stream 流。
- `IntStream`，`LongStream`，`DoubleStream`：特殊类型的流，用于处理原始数据类型int，long以及double

```java
// 创建流
Arrays.asList("a1", "a2", "a3").stream() // 创建流
// 创建流
Stream.of("a1", "a2", "a3");  // a1

```

`IntStreams.range()`方法还可以被用来取代常规的 for 循环
```java
IntStream.range(1, 4)
    .forEach(System.out::println); // 相当于 for (int i = 1; i < 4; i++) {sout}
```

- 原始类型流使用其独有的函数式接口，例如IntFunction代替Function，IntPredicate代替Predicate。
- 原始类型流支持额外的终端聚合操作，`sum()` 以及 `average()`

### 原始流和对象流的转换
1. 将常规对象流转换为原始类型流：  
`mapToInt()`，`mapToLong()`，`mapToDouble`

    ```java
    Stream.of("a1", "a2", "a3")
        .map(s -> s.substring(1)) // 对每个字符串元素从下标1位置开始截取
        .mapToInt(Integer::parseInt) // 转成 int 基础类型类型流
        .max() // 取最大值
        .ifPresent(System.out::println);  // 不为空则输出

    // 3
    ```

2. 原始类型流装换成对象流  
   `mapToObj()` 
   ```java
   IntStream.range(1, 4)
    .mapToObj(i -> "a" + i) // for 循环 1->4, 拼接前缀 a
    .forEach(System.out::println); // for 循环打印
    // a1
    // a2
    // a3 
   ```

## Stream 流的处理顺序