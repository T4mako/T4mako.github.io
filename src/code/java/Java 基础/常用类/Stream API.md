---
sticky: 9
date: 2023-08-04
icon: java
category: 
    - java
tag: 
    - 基础语法
    - java
---

# Stream API的理解与使用

流表示包含着一系列`元素的集合`，可以对其做不同类型的操作，用来对这些元素执行计算  

Stream执行流程
- Stream的实例化
- 一系列中间操作（过滤，映射、......）
- 终止操作

<!-- more    -->

中间操作与终端操作:
1. 中间操作会再次返回一个流，所以可以链接多个中间操作，上述代码中的 filter 过滤，map 对象转换，sorted 排序，就属于中间操作。
2. 终端操作是对流操作的一个结束动作，一般返回 `void` 或者一个`非流的结果`。上述代码中的 forEach循环 就是一个终止操作。

大部分流操作都支持 `lambda` 表达式作为参数，应该说是接受一个函数式接口的实现作为参数。

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



## 1、一些 Stream API

### 创建流

- `stream()` 方法 通过集合获取 Stream 流
- `Stream.of()` 从一堆对象中创建 Stream 流。
- `IntStream`，`LongStream`，`DoubleStream`：特殊类型的流，用于处理原始数据类型int，long以及double
### 中间操作
#### 1、筛选与切片

| 方 法               | 描 述                                                        |
| ------------------- | ------------------------------------------------------------ |
| filter(Predicate p) | 接收 Lambda ， 从流中排除某些元素                            |
| distinct()          | 筛选，通过流所生成元素的 hashCode() 和 equals() 去除重复元素 |
| limit(long maxSize) | 截断流，使其元素不超过给定数量                               |
| skip(long n)        | 跳过元素，返回一个扔掉了前 个空流。与 limit(n) 互补 n 个元素的流。若流中元素不足 n 个，则返回一 |

#### 2、映射

| 方法                            | 描述                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| map(Function f)                 | 接收一个函数作为参数，该函数会被应用到每个元 素上，并将其映射成一个新的元素。 |
| mapToDouble(ToDoubleFunction f) | 接收一个函数作为参数，该函数会被应用到每个元 素上，产生一个新的 DoubleStream。 |
| mapToInt(ToIntFunction f)       | 接收一个函数作为参数，该函数会被应用到每个元 素上，产生一个新的 IntStream。 |
| mapToLong(ToLongFunction f)     | 接收一个函数作为参数，该函数会被应用到每个元 素上，产生一个新的 LongStream。 |
| flatMap(Function f)             | 接收一个函数作为参数，将流中的每个值都换成另 一个流，然后把所有流连接成一个流 |

#### 3、排序

| 方法                   | 描述                               |
| ---------------------- | ---------------------------------- |
| sorted()               | 产生一个新流，其中按自然顺序排序   |
| sorted(Comparator com) | 产生一个新流，其中按比较器顺序排序 |


### 终止操作  

1、匹配与查找

| 方法                   | 描述                     |
| ---------------------- | ------------------------ |
| allMatch(Predicate p)  | 检查是否匹配所有元素     |
| anyMatch(Predicate p)  | 检查是否至少匹配一个元素 |
| noneMatch(Predicate p) | 检查是否没有匹配所有元素 |
| findFirst()            | 返回第一个元素           |
| findAny()              | 返回当前流中的任意元素   |

| 方法                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| count()             | 返回流中元素总数                                             |
| max(Comparator c)   | 返回流中最大值                                               |
| min(Comparator c)   | 返回流中最小值                                               |
| forEach(Consumer c) | 内部迭代(使用 Collection 接口需要用户去做迭代， 称为外部迭代。相反， Stream API 使用内部迭 代——它帮你把迭代做了) |


### collect(),reduce(),flatMap()
## 2、不同类型的 Stream 流

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

## 3、Stream 流的处理顺序

### 垂直执行

垂直执行：输出的结果是随着链条垂直移动的。  
上一个中间操作的结果顺势往下执行直到终端操作。

典型的方法如：`filter`，`map`，`forEach`，`anyMatch`

```java
Stream.of("d2", "a2", "b1", "b3", "c")
    .filter(s -> {
        System.out.println("filter: " + s);
        return true;
    })
    .forEach(s -> System.out.println("forEach: " + s));

/*
filter:  d2
forEach: d2
filter:  a2
forEach: a2
filter:  b1
forEach: b1
filter:  b3
forEach: b3
filter:  c
forEach: c
 */
```
:::info
中间操作顺序的不同会影响性能
:::

### 水平执行
所有元素都要完成这个操作  
比如 `sorted` 排序方法是水平执行的  
如果 元素只有一个，`sorted` 方法不执行

```java
Stream.of("d2", "a2", "b1", "b3", "c")
    .sorted((s1, s2) -> {
        System.out.printf("sort: %s; %s\n", s1, s2);
        return s1.compareTo(s2); // 排序
    })
    .filter(s -> {
        System.out.println("filter: " + s);
        return s.startsWith("a"); // 过滤出以 a 为前缀的元素
    })
    .map(s -> {
        System.out.println("map: " + s);
        return s.toUpperCase(); // 转大写
    })
    .forEach(s -> System.out.println("forEach: " + s)); // for 循环输出
/*
sort:    a2; d2
sort:    b1; a2
sort:    b1; d2
sort:    b1; a2
sort:    b3; b1
sort:    b3; d2
sort:    c; b3
sort:    c; d2
filter:  a2
map:     a2
forEach: A2
filter:  b1
filter:  b3
filter:  c
filter:  d2
 */
```

## 4、数据流复用
Java8 Stream 流是不能被复用的，调用任何终端操作，流就会关闭    
为了克服这个限制，可以为想要执行的每个终端操作创建一个新的流链，例如，可以通过 Supplier 来包装一下流，通过 `get()` 方法来构建一个新的 `Stream` 流：
```java
Supplier<Stream<String>> streamSupplier =
    () -> Stream.of("d2", "a2", "b1", "b3", "c")
            .filter(s -> s.startsWith("a"));

streamSupplier.get().anyMatch(s -> true);   // ok
streamSupplier.get().noneMatch(s -> true);  // ok

```
## 5、常用操作

### collect()收集器

`collect` 是终端操作,将流中的元素转变成另外一个不同的对象，例如一个`List`，`Set`或`Map`。`collect` 接受入参为`Collector`（收集器），它由四个不同的操作组成：供应器（supplier）、累加器（accumulator）、组合器（combiner）和终止器（finisher）。

```java
// collect 为 list
//如果需要构造一个 `Set` 集合，只需要使用 Collectors.toSet()
List<Person> filtered =
    persons
        .stream() // 构建流
        .filter(p -> p.name.startsWith("P")) // 过滤出名字以 P 开头的
        .collect(Collectors.toList()); // 生成一个新的 List

// collect 为 map
Map<Integer, List<Person>> personsByAge = persons
    .stream()
    .collect(Collectors.groupingBy(p -> p.age)); // 以年龄为 key,进行分组

// collect 为一个 浮点数
Double averageAge = persons
    .stream()
    .collect(Collectors.averagingInt(p -> p.age)); // 聚合出平均年龄

```

### 自定义收集器

比如将流中的所有人转换成一个字符串，包含所有大写的名称，并以|分割。为了达到这种效果，可以通过`Collector.of()`创建一个新的收集器。同时，我们还需要传入收集器的四个组成部分：`供应器`、`累加器`、`组合器`和`终止器`。

```java
Collector<Person, StringJoiner, String> personNameCollector =
    Collector.of(
        () -> new StringJoiner(" | "),          // supplier 供应器
        (j, p) -> j.add(p.name.toUpperCase()),  // accumulator 累加器
        (j1, j2) -> j1.merge(j2),               // combiner 组合器
        StringJoiner::toString);                // finisher 终止器

String names = persons
    .stream()
    .collect(personNameCollector); // 传入自定义的收集器

System.out.println(names);  // MAX | PETER | PAMELA | DAVID
```

由于Java 中的字符串是 `final` 类型的，我们需要借助辅助类`StringJoiner`，来帮我们构造字符串。  
最开始供应器使用分隔符构造了一个`StringJointer`。  
累加器用于将每个人的人名转大写，然后加到`StringJointer`中。  
组合器将两个`StringJointer`合并为一个。  
最终，终结器从`StringJointer`构造出预期的字符串。 

### FlatMap()
`FlatMap` 能够将流的每个元素, 转换为其他对象的流。  
因此，每个对象可以被转换为零个，一个或多个其他对象，并以流的方式返回。  
之后，这些流的内容会被放入`flatMap`返回的流中。

```java
class Foo {
    String name;
    List<Bar> bars = new ArrayList<>();

    Foo(String name) {
        this.name = name;
    }
}

class Bar {
    String name;

    Bar(String name) {
        this.name = name;
    }
}

List<Foo> foos = new ArrayList<>();

//创建了包含三个foo的集合，每个foo中又包含三个 bar。
// 创建 foos 集合
IntStream
    .range(1, 4)
    .forEach(i -> foos.add(new Foo("Foo" + i)));

// 创建 bars 集合
foos.forEach(f ->
    IntStream
        .range(1, 4)
        .forEach(i -> f.bars.add(new Bar("Bar" + i + " <- " + f.name))));

// 使用 flatMap
foos.stream()
    .flatMap(f -> f.bars.stream())
    .forEach(b -> System.out.println(b.name));

// Bar1 <- Foo1
// Bar2 <- Foo1
// Bar3 <- Foo1
// Bar1 <- Foo2
// Bar2 <- Foo2
// Bar3 <- Foo2
// Bar1 <- Foo3
// Bar2 <- Foo3
// Bar3 <- Foo3
```
简化上述操作
```java
IntStream.range(1, 4)
    .mapToObj(i -> new Foo("Foo" + i))
    .peek(f -> IntStream.range(1, 4)
        .mapToObj(i -> new Bar("Bar" + i + " <- " f.name))
        .forEach(f.bars::add))
    .flatMap(f -> f.bars.stream())
    .forEach(b -> System.out.println(b.name));
```

`flatMap`也可用于Java8引入的`Optional`类。`Optional`的`flatMap`操作返回一个`Optional`或其他类型的对象。所以它可以用于避免繁琐的null检查。

```java
class Outer {
    Nested nested;
}

class Nested {
    Inner inner;
}

class Inner {
    String foo;
}

Optional.of(new Outer())
    .flatMap(o -> Optional.ofNullable(o.nested))
    .flatMap(n -> Optional.ofNullable(n.inner))
    .flatMap(i -> Optional.ofNullable(i.foo))
    .ifPresent(System.out::println);
```
如果不为空的话，每个`flatMap`的调用都会返回预期对象的`Optional`包装，否则返回为`null`的`Optional`包装类。

### Reduce()

Java8 三种不同的Reduce方法  
1. 第一种将流中的元素规约成流中的一个元素。
    ```java
    //筛选出年龄最大的那个人
    persons
        .stream()
        .reduce((p1, p2) -> p1.age > p2.age ? p1 : p2)
        .ifPresent(System.out::println);    // Pamela
    ```

2. 第二种`reduce`方法接受标识值和BinaryOperator累加器。此方法可用于构造一个新的 `Person`，其中包含来自流中所有其他人的聚合名称和年龄：
   ```java
   Person result =
    persons
        .stream()
        .reduce(new Person("", 0), (p1, p2) -> {
            p1.age += p2.age;
            p1.name += p2.name;
            return p1;
        });
    ```
3. 第三种reduce方法接受三个参数：标识值，BiFunction累加器和类型的组合器函数BinaryOperator。由于初始值的类型不一定为Person，我们可以使用这个归约函数来计算所有人的年龄总和：
   ```java
   Integer ageSum = persons
    .stream()
    .reduce(0, (sum, p) -> sum += p.age, (sum1, sum2) -> sum1 + sum2);

   ```

## 6、并行流
流是可以并行执行的，当流中存在**大量元素**时，可以**显著提升性能**。  
并行流底层使用的`ForkJoinPool`, 它由`ForkJoinPool.commonPool()`方法提供。底层线程池的大小**最多为五个** - 默认值取决于 CPU 可用核心数

### 创建并行流
集合支持`parallelStream()`方法来创建元素的并行流。  
或者在已存在的数据流上调用中间方法`parallel()`，将串行流转换为并行流  

```java
Arrays.asList("a1", "a2", "b1", "c2", "c1")
    .parallelStream()
    .filter(s -> {
        System.out.format("filter: %s [%s]\n",
            s, Thread.currentThread().getName());
        return true;
    })
    .map(s -> {
        System.out.format("map: %s [%s]\n",
            s, Thread.currentThread().getName());
        return s.toUpperCase();
    })
    .forEach(s -> System.out.format("forEach: %s [%s]\n",
        s, Thread.currentThread().getName()));
```
上述代码输出：
```apache
filter:  b1 [main]
filter:  a2 [ForkJoinPool.commonPool-worker-1]
map:     a2 [ForkJoinPool.commonPool-worker-1]
filter:  c2 [ForkJoinPool.commonPool-worker-3]
map:     c2 [ForkJoinPool.commonPool-worker-3]
filter:  c1 [ForkJoinPool.commonPool-worker-2]
map:     c1 [ForkJoinPool.commonPool-worker-2]
forEach: C2 [ForkJoinPool.commonPool-worker-3]
forEach: A2 [ForkJoinPool.commonPool-worker-1]
map:     b1 [main]
forEach: B1 [main]
filter:  a1 [ForkJoinPool.commonPool-worker-3]
map:     a1 [ForkJoinPool.commonPool-worker-3]
forEach: A1 [ForkJoinPool.commonPool-worker-3]
forEach: C1 [ForkJoinPool.commonPool-worker-2]
```