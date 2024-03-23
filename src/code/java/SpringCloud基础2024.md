---
title: SpringCloud 2024
icon: leaf
order: 12
category: 
    - java
tag: 
    - Spring
    - java
    - SpringCloud
---

## 1、Consul

### 1.1、介绍与下载

[Consul 官网](https://www.consul.io/)

[Consul 下载](https://developer.hashicorp.com/consul/downloads)

[Spring 中使用 Consul](https://docs.spring.io/spring-cloud-consul/docs/current/reference/html/)

Consul 用于服务注册与发现，数据共享

为什么要引入服务注册中心：  

- 微服务所在的IP地址和端口号硬编码到订单微服务中，会存在非常多的问题
- 因此需要引入服务治理功能，实现微服务之间的动态注册与发现

通过在 Consul 官网下载客户端，通过 cmd `consul agent -dev` 命令即可启动 Consul 与本地的 8500 端口

### 1.2、服务的注册与发现

对于需要注册与发现的服务：

#### POM

```xml
<!--SpringCloud consul discovery -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>
```

#### YML

```yml
server:
  port: 8001

# ==========applicationName + druid-mysql8 driver===================
spring:
  application:
    name: cloud-payment-service
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/db2024?characterEncoding=utf8&useSSL=false&serverTimezone=GMT%2B8&rewriteBatchedStatements=true&allowPublicKeyRetrieval=true
    username: root
    password: 123456
  ####Spring Cloud Consul for Service Discovery
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
```

#### 主启动类

```java
@SpringBootApplication
@MapperScan("com.atguigu.cloud.mapper")
@EnableDiscoveryClient // 服务注册与发现注解
public class Main8001{
    public static void main(String[] args){
        SpringApplication.run(Main8001.class,args);
    }
}
```

#### Controller

```java
@RestController
public class OrderController
{
    //public static final String PaymentSrv_URL = "http://localhost:8001";//先写死，硬编码

    public static final String PaymentSrv_URL = "http://cloud-payment-service"; //服务注册中心上的微服务名称

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/consumer/pay/add")
    public ResultData addOrder(PayDTO payDTO){
        return restTemplate.postForObject(PaymentSrv_URL + "/pay/add",payDTO,ResultData.class);
    }
}
```

> RestTemplate：Spring 提供的发送 Http 请求的工具，封装了 HTTP 请求的细节，可以快速地向其他 Web 服务发送请求

### 1.3、服务的配置与刷新

当希望对多个相同的服务使用一套同样的配置，并希望同一管理，一次修改，处处生效，则需要服务的配置与刷新功能

#### POM

```xml
!--SpringCloud consul config-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
```

#### YML（新增配置文件 **bootstrap.yml**）

- applicaiton.yml 是用户级的资源配置项
- bootstrap.yml 是系统级的，优先级更加高

Spring Cloud 会创建一个 Bootstrap Context ，作为 Spring 应用的 `Application Context` 的父上下文。初始化的时候，`Bootstrap Context` 负责从外部源加载配置属性并解析配置。这两个上下文共享一个从外部获取的 `Environment`。

`Bootstrap` 属性有高优先级，默认情况下，它们不会被本地配置覆盖。 `Bootstrap context` 和 `Application Context` 有着不同的约定，所以新增了一个 `bootstrap.yml` 文件，保证 `Bootstrap Context` 和 `Application Context` 配置的分离。

因为bootstrap.yml是比application.yml先加载的。bootstrap.yml优先级高于application.yml

```yml
# bootstrap.yml
spring:
  application:
    name: cloud-payment-service
    ####Spring Cloud Consul for Service Discovery
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
      config:
        profile-separator: '-' # default value is ","，we update '-'
        format: YAML
```

#### 在 Consul 服务器上创建配置文件

在 Consul 服务器上创建文件时需要按照一定的规则，创建文件夹（config/服务名(默认使用 `,` 连接，可以配置使用 `-` 连接)/data）

data 是文件，不是文件夹

#### Controller

可以通过 @Value 注解获取值

#### 动态刷新

```java
@SpringBootApplication
@MapperScan("com.atguigu.cloud.mapper")
@EnableDiscoveryClient //服务注册和发现
@RefreshScope // 动态刷新
public class Main8001{
    public static void main(String[] args){
        SpringApplication.run(Main8001.class,args);
    }
}
```

### 1.4、Consul 持久化

bat 配置文件：

```bat
@echo.服务启动......  
@echo off  
@sc create Consul binpath= "D:\consul\consul.exe agent -server -ui -bind=127.0.0.1 -client=0.0.0.0 -bootstrap-expect  1  -data-dir D:\consul\mydata"
@net start Consul
@sc config Consul start= AUTO  
@echo.Consul start is OK......success
@pause
```

需要 Consul.exe 的路径和持久化保存的路径

以管理员身份运行 bat 文件即可

## 2、LoadBalancer

[使用介绍](https://docs.spring.io/spring-cloud-commons/reference/spring-cloud-commons/loadbalancer.html)

[负载均衡算法](https://docs.spring.io/spring-cloud-commons/reference/spring-cloud-commons/loadbalancer.html#switching-between-the-load-balancing-algorithms)

### 2.1、介绍

LoadBalancer 用于负载均衡，老牌的 Ribbon 已进入维护模式

Spring Cloud LoadBalancer 是由 SpringCloud 官方提供的一个开源的、简单易用的 **客户端** 负载均衡器  
相比较于 Ribbon，SpringCloud LoadBalancer 不仅能够支持 **RestTemplate**，还支持 **WebClient**（WeClient 是 Spring Web Flux 中提供的功能，可以实现响应式异步请求）

:::info

loadbalancer 本地负载均衡客户端 与 Nginx 服务端负载均衡区别

Nginx 是服务器负载均衡，客户端所有请求都会交给 nginx，然后由 nginx 实现转发请求，即负载均衡是由服务端实现的

loadbalancer 本地负载均衡，在调用微服务接口时候，会在注册中心上获取注册信息服务列表之后缓存到 JVM 本地，从而在本地实现 RPC 远程服务调用技术

:::

### 2.2、LoadBalancer 工作原理

LoadBalancer 在工作时分成两步：

- 先选择 ConsulServer 从服务端查询并拉取服务列表，查看有几个相同服务
- 按照指定的负载均衡策略从 server 取到的服务注册列表中由客户端自己选择一个地址，所以 LoadBalancer 是一个 **客户端** 的负载均衡器。

### 2.3、基本使用

#### POM

```xml
<!--loadbalancer-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
```

在 RestTemplate 的 bean 上添加注解 `@LoadBalanced`

## 3、OpenFeign

### 3.1、介绍

[Spring OpenFeign 官网](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/#spring-cloud-feign)

[OpenFeign GitHub](https://github.com/spring-cloud/spring-cloud-openfeign)

> 个人理解，OpenFeign = RestTemplate + LoadBalancer

### 3.2、使用

#### POM

```xml
<!--openfeign-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

#### YML

```yml
server:
  port: 80

spring:
  application:
    name: cloud-consumer-openfeign-order
  ####Spring Cloud Consul for Service Discovery
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        prefer-ip-address: true #优先使用服务ip进行注册
        service-name: ${spring.application.name}
```

#### 主启动类

```java
@SpringBootApplication
@EnableDiscoveryClient //该注解用于向使用 consul 为注册中心时注册服务
@EnableFeignClients//启用 feign 客户端,定义服务 + 绑定接口，以声明式的方法优雅而简单的实现服务调用
public class MainOpenFeign80{
    public static void main(String[] args){
        SpringApplication.run(MainOpenFeign80.class,args);
    }
}
```

#### 建接口

新建服务接口 xxxFeignApi，并配置 `@FeignClient` 注解，value 值为发送到的微服务名

示例：

```java
@FeignClient(value = "cloud-payment-service")
public interface PayFeignApi
{
    @PostMapping("/pay/add")
    public ResultData addPay(@RequestBody PayDTO payDTO);

    @GetMapping("/pay/get/{id}")
    public ResultData getPayInfo(@PathVariable("id") Integer id);

    @GetMapping(value = "/pay/get/info")
    public String mylb();
}
```

:::info

@PathVaribale 注解必须使用 **@PathVaribale("value")** 的样式

:::

#### 修改 Controller 层

```java

 

便笺
package com.atguigu.cloud.controller;

import com.atguigu.cloud.apis.PayFeignApi;
import com.atguigu.cloud.entities.PayDTO;
import com.atguigu.cloud.resp.ResultData;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * @auther zzyy
 * @create 2023-11-09 15:49
 */
@RestController
@Slf4j
public class OrderController
{
    @Resource
    private PayFeignApi payFeignApi;

    @PostMapping("/feign/pay/add")
    public ResultData addOrder(@RequestBody PayDTO payDTO)
    {
        ResultData resultData = payFeignApi.addPay(payDTO);
        return resultData;
    }

    @GetMapping("/feign/pay/get/{id}")
    public ResultData getPayInfo(@PathVariable("id") Integer id)
    {
        ResultData resultData = payFeignApi.getPayInfo(id);
        return resultData;
    }
}
```

### 3.3、OpenFeign 高级特性

1. OpenFeign 超时控制
2. OpenFeign 重试机制
3. OpenFeign 默认 HttpClient 修改
4. OpenFeign 请求/响应压缩
5. OpenFeign 日志打印功能
6. OpenFeign 和 Sentinel 集成实现服务降级

## 4、CircuitBreaker 断路器

[Spring CircuitBreaker 官网](https://spring.io/projects/spring-cloud-circuitbreaker#overview)

CircuitBreaker 用于服务熔断，服务降级，隔离，限流

### 4.1、Resilience4J

[介绍](https://github.com/resilience4j/resilience4j#1-introduction) | [官网](https://resilience4j.readme.io/docs/circuitbreaker) | [中文手册](https://github.com/lmhmhl/Resilience4j-Guides-Chinese/blob/main/index.md)

Resilience4J 是 CircuitBreaker 的具体实现

实现熔断与降级有两套方案（算法）

- 基于计数的滑动窗口
- 基于时间的滑动窗口

### 4.2、服务熔断与降级

#### 4.2.1、配置

断路器有三种状态，关闭、开启与半开

断路器的配置：

- [English](https://resilience4j.readme.io/docs/circuitbreaker#create-and-configure-a-circuitbreaker)

- [中文手册](https://github.com/lmhmhl/Resilience4j-Guides-Chinese/blob/main/core-modules/CircuitBreaker.md)

- [默认配置](io.github.resilience4j.circuitbreaker.CircuitBreakerConfig)

- 主要使用的配置

  | **failure-rate-threshold**                       | **以百分比配置失败率峰值**                                   |
  | ------------------------------------------------ | ------------------------------------------------------------ |
  | **sliding-window-type**                          | **断路器的滑动窗口期类型 可以基于“次数”（COUNT_BASED）或者“时间”（TIME_BASED）进行熔断，默认是COUNT_BASED。** |
  | **sliding-window-size**                          | **若COUNT_BASED，则10次调用中有50%失败（即5次）打开熔断断路器；若为TIME_BASED则，此时还有额外的两个设置属性，含义为：在N秒内（sliding-window-size）100%（slow-call-rate-threshold）的请求超过N秒（slow-call-duration-threshold）打开断路器。** |
  | **slowCallRateThreshold**                        | **以百分比的方式配置，断路器把调用时间大于slowCallDurationThreshold的调用视为慢调用，当慢调用比例大于等于峰值时，断路器开启，并进入服务降级。** |
  | **slowCallDurationThreshold**                    | **配置调用时间的峰值，高于该峰值的视为慢调用。**             |
  | **permitted-number-of-calls-in-half-open-state** | **运行断路器在HALF_OPEN状态下时进行N次调用，如果故障或慢速调用仍然高于阈值，断路器再次进入打开状态。** |
  | **minimum-number-of-calls**                      | **在每个滑动窗口期样本数，配置断路器计算错误率或者慢调用率的最小调用数。比如设置为5意味着，在计算故障率之前，必须至少调用5次。如果只记录了4次，即使4次都失败了，断路器也不会进入到打开状态。** |
  | **wait-duration-in-open-state**                  | **从OPEN到HALF_OPEN状态需要等待的时间**                      |

#### 4.2.2、POM

```xml
<!--resilience4j-circuitbreaker-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
</dependency>
<!-- 由于断路保护等需要AOP实现，所以必须导入AOP包 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

#### 4.2.3、基于计数的滑动窗口

YML

```yaml
spring:
  cloud:
    openfeign:
      circuitbreaker:
        enabled: true
        group:
          enabled: true #没开分组永远不用分组的配置。精确优先、分组次之(开了分组)、默认最后
resilience4j:
  circuitbreaker:
    configs:
      default:
        failureRateThreshold: 50 #设置50%的调用失败时打开断路器，超过失败请求百分⽐CircuitBreaker变为OPEN状态。
                slidingWindowType: COUNT_BASED # 滑动窗口的类型
                slidingWindowSize: 6 #滑动窗⼝的⼤⼩配置COUNT_BASED表示6个请求，配置TIME_BASED表示6秒
                minimumNumberOfCalls: 6 #断路器计算失败率或慢调用率之前所需的最小样本(每个滑动窗口周期)。如果minimumNumberOfCalls为10，则必须最少记录10个样本，然后才能计算失败率。如果只记录了9次调用，即使所有9次调用都失败，断路器也不会开启。
                automaticTransitionFromOpenToHalfOpenEnabled: true # 是否启用自动从开启状态过渡到半开状态，默认值为true。如果启用，CircuitBreaker将自动从开启状态过渡到半开状态，并允许一些请求通过以测试服务是否恢复正常
                waitDurationInOpenState: 5s #从OPEN到HALF_OPEN状态需要等待的时间
                permittedNumberOfCallsInHalfOpenState: 2 #半开状态允许的最大请求数，默认值为10。在半开状态下，CircuitBreaker将允许最多permittedNumberOfCallsInHalfOpenState个请求通过，如果其中有任何一个请求失败，CircuitBreaker将重新进入开启状态。
                recordExceptions: - java.lang.Exception
    instances:
      cloud-payment-service:
        baseConfig: default
```

Controller

```java
@RestController
public class OrderCircuitController
{
    @Resource
    private PayFeignApi payFeignApi;

    @GetMapping(value = "/feign/pay/circuit/{id}")
    @CircuitBreaker(name = "cloud-payment-service", fallbackMethod = "myCircuitFallback")
    public String myCircuitBreaker(@PathVariable("id") Integer id)
    {
        return payFeignApi.myCircuit(id);
    }
    //myCircuitFallback 就是服务降级后的兜底处理方法
        public String myCircuitFallback(Integer id,Throwable t) {
        // 这里是容错处理逻辑，返回备用结果
        return "myCircuitFallback，系统繁忙，请稍后再试-----/(ㄒoㄒ)/~~";
    }
}
```

#### 4.2.4、基于时间的滑动窗口

YML

```yaml
 spring:
  cloud:
    openfeign:
      circuitbreaker:
        enabled: true
        group:
          enabled: true #没开分组永远不用分组的配置。精确优先、分组次之(开了分组)、默认最后
# Resilience4j CircuitBreaker 按照时间：TIME_BASED 的例子
resilience4j:
  timelimiter:
    configs:
      default:
        timeout-duration: 10s #神坑的位置，timelimiter 默认限制远程1s，超于1s就超时异常，配置了降级，就走降级逻辑
  circuitbreaker:
    configs:
      default:
        failureRateThreshold: 50 #设置50%的调用失败时打开断路器，超过失败请求百分⽐CircuitBreaker变为OPEN状态。
        slowCallDurationThreshold: 2s #慢调用时间阈值，高于这个阈值的视为慢调用并增加慢调用比例。
        slowCallRateThreshold: 30 #慢调用百分比峰值，断路器把调用时间⼤于slowCallDurationThreshold，视为慢调用，当慢调用比例高于阈值，断路器打开，并开启服务降级
        slidingWindowType: TIME_BASED # 滑动窗口的类型
        slidingWindowSize: 2 #滑动窗口的大小配置，配置TIME_BASED表示2秒
        minimumNumberOfCalls: 2 #断路器计算失败率或慢调用率之前所需的最小样本(每个滑动窗口周期)。
        permittedNumberOfCallsInHalfOpenState: 2 #半开状态允许的最大请求数，默认值为10。
        waitDurationInOpenState: 5s #从OPEN到HALF_OPEN状态需要等待的时间
        recordExceptions:
          - java.lang.Exception
    instances:
      cloud-payment-service:
        baseConfig: default 
```

### 4.3、隔离

[官网](https://resilience4j.readme.io/docs/bulkhead) | [中文](https://github.com/lmhmhl/Resilience4j-Guides-Chinese/blob/main/core-modules/bulkhead.md)

用于限制并发

实现方式有两种

- 实现 SemaphoreBulkhead（信号量舱壁）
- 实现 FixedThreadPoolBulkhead（固定线程池舱壁）

#### 4.3.1、SemaphoreBulkhead

POM

```xml
<!--resilience4j-bulkhead-->
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-bulkhead</artifactId>
</dependency>
```

YML

```yaml
####resilience4j bulkhead 的例子
resilience4j:
  bulkhead:
    configs:
      default:
        maxConcurrentCalls: 2 # 隔离允许并发线程执行的最大数量
                maxWaitDuration: 1s # 当达到并发调用数量时，新的线程的阻塞时间，我只愿意等待1秒，过时不候进舱壁兜底fallback
    instances:
      cloud-payment-service:
        baseConfig: default
  timelimiter:
    configs:
      default:
        timeout-duration: 20s
```

Controller

```java
@GetMapping(value = "/feign/pay/bulkhead/{id}")
@Bulkhead(name = "cloud-payment-service",fallbackMethod = "myBulkheadFallback",type = Bulkhead.Type.SEMAPHORE)
public String myBulkhead(@PathVariable("id") Integer id){
    return payFeignApi.myBulkhead(id);
}
public String myBulkheadFallback(Throwable t){
    return "myBulkheadFallback，隔板超出最大数量限制，系统繁忙，请稍后再试-----/(ㄒoㄒ)/~~";
}
```

#### 4.3.2、FixedThreadPoolBulkhead

底层使用 JUC 的线程池 ThreadPoolExecutor

POM

```xml
<!--resilience4j-bulkhead-->
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-bulkhead</artifactId>
</dependency>
```

YML

```yaml
resilience4j:
  timelimiter:
    configs:
      default:
        timeout-duration: 10s #timelimiter默认限制远程1s，超过报错不好演示效果所以加上10秒
  thread-pool-bulkhead:
    configs:
      default:
        core-thread-pool-size: 1
        max-thread-pool-size: 1
        queue-capacity: 1
    instances:
      cloud-payment-service:
        baseConfig: default
```

### 4.4、限流

[官网](https://resilience4j.readme.io/docs/ratelimiter) | [中文](https://github.com/lmhmhl/Resilience4j-Guides-Chinese/blob/main/core-modules/ratelimiter.md)

 常见的限流算法：

- 漏斗算法（漏桶算法对于存在突发特性的流量来说缺乏效率）
- 令牌桶算法（SpringCloud 默认使用该算法）
- 滚动时间窗口（间隔临界的一段时间内的请求肯呢个会超过系统限制，导致系统被压垮）
- 滑动时间窗口

POM

```xml
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-ratelimiter</artifactId>
</dependency>
```

YML

```yaml
resilience4j:
  ratelimiter:
    configs:
      default:
        limitForPeriod: 2 #在一次刷新周期内，允许执行的最大请求数
        limitRefreshPeriod: 1s # 限流器每隔limitRefreshPeriod刷新一次，将允许处理的最大请求数量重置为limitForPeriod
        timeout-duration: 1 # 线程等待权限的默认等待时间
    instances:
        cloud-payment-service:
          baseConfig: default
```

Controller

```java
@GetMapping(value = "/feign/pay/ratelimit/{id}")
@RateLimiter(name = "cloud-payment-service",fallbackMethod = "myRatelimitFallback")
public String myBulkhead(@PathVariable("id") Integer id){
    return payFeignApi.myRatelimit(id);
}
public String myRatelimitFallback(Integer id,Throwable t){
    return "你被限流了，禁止访问/(ㄒoㄒ)/~~";
}
```

## 5、Sleuth(Micrometer) + ZipKin 分布式链路追踪

### 介绍

Sleth 目前进入维护模式，Sleth 的替换方案（Micrometer Tracing）

随着问题的复杂化，微服务的增多，调用链条变长，链路追踪的需求明显

[Micrometer 官网](https://micrometer.io/docs/tracing) | [Spring Micrometer 官网](https://spring.io/projects/spring-cloud-sleuth#overview) | [GitHub](https://github.com/spring-cloud/spring-cloud-sleuth)

链路追踪原理：  

- 一条链路通过 Trace Id 唯一标识
- 每个节点有各自的 Span Id 标识发起的请求信息
- 各 Span Id 通过 Parent id 关联起来

[Zipkin 官网](https://zipkin.io/) Zipkin 为链路追踪提供了 UI 界面

### 使用

#### 父工程 POM

```xml
<properties>
    <micrometer-tracing.version>1.2.0</micrometer-tracing.version>
    <micrometer-observation.version>1.12.0</micrometer-observation.version>
    <feign-micrometer.version>12.5</feign-micrometer.version>
    <zipkin-reporter-brave.version>2.17.0</zipkin-reporter-brave.version>
</properties>

<dependencyManagement>
    <dependencies>
        <!--micrometer-tracing-bom导入链路追踪版本中心  1-->
        <dependency>
            <groupId>io.micrometer</groupId>
            <artifactId>micrometer-tracing-bom</artifactId>
            <version>${micrometer-tracing.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <!--micrometer-tracing指标追踪  2-->
        <dependency>
            <groupId>io.micrometer</groupId>
            <artifactId>micrometer-tracing</artifactId>
            <version>${micrometer-tracing.version}</version>
        </dependency>
        <!--micrometer-tracing-bridge-brave适配zipkin的桥接包 3-->
        <dependency>
            <groupId>io.micrometer</groupId>
            <artifactId>micrometer-tracing-bridge-brave</artifactId>
            <version>${micrometer-tracing.version}</version>
        </dependency>
        <!--micrometer-observation 4-->
        <dependency>
            <groupId>io.micrometer</groupId>
            <artifactId>micrometer-observation</artifactId>
            <version>${micrometer-observation.version}</version>
        </dependency>
        <!--feign-micrometer 5-->
        <dependency>
            <groupId>io.github.openfeign</groupId>
            <artifactId>feign-micrometer</artifactId>
            <version>${feign-micrometer.version}</version>
        </dependency>
        <!--zipkin-reporter-brave 6-->
        <dependency>
            <groupId>io.zipkin.reporter2</groupId>
            <artifactId>zipkin-reporter-brave</artifactId>
            <version>${zipkin-reporter-brave.version}</version>
        </dependency>
    </dependencies>
    </dependencyManagement>
```

#### 服务提供者

POM

```xml
<!--micrometer-tracing指标追踪  1-->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing</artifactId>
</dependency>
<!--micrometer-tracing-bridge-brave适配zipkin的桥接包 2-->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing-bridge-brave</artifactId>
</dependency>
<!--micrometer-observation 3-->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-observation</artifactId>
</dependency>
<!--feign-micrometer 4-->
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-micrometer</artifactId>
</dependency>
<!--zipkin-reporter-brave 5-->
<dependency>
    <groupId>io.zipkin.reporter2</groupId>
    <artifactId>zipkin-reporter-brave</artifactId>
</dependency>
```

YML

```yaml
# ========================zipkin===================
management:
  zipkin:
    tracing:
      endpoint: http://localhost:9411/api/v2/spans
  tracing:
    sampling:
      probability: 1.0 #采样率默认为0.1(0.1就是10次只能有一次被记录下来)，值越大收集越及时。
```

#### 服务的调用者

POM

```xml
<!--micrometer-tracing指标追踪  1-->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing</artifactId>
</dependency>
<!--micrometer-tracing-bridge-brave适配zipkin的桥接包 2-->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing-bridge-brave</artifactId>
</dependency>
<!--micrometer-observation 3-->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-observation</artifactId>
</dependency>
<!--feign-micrometer 4-->
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-micrometer</artifactId>
</dependency>
<!--zipkin-reporter-brave 5-->
<dependency>
    <groupId>io.zipkin.reporter2</groupId>
    <artifactId>zipkin-reporter-brave</artifactId>
</dependency>
```

YML

```yaml
# zipkin图形展现地址和采样率设置
management:
  zipkin:
    tracing:
      endpoint: http://localhost:9411/api/v2/spans
  tracing:
    sampling:
      probability: 1.0 #采样率默认为0.1(0.1就是10次只能有一次被记录下来)，值越大收集越及时。
```

## 6、GateWay 网关

### 6.1、基本概念

网关通常在各个微服务的前面，有反向代理，鉴权，流量控制，熔断，日志监控等作用

Spring Cloud Gateway 是整个微服务最前沿的防火墙和代理器，隐藏微服务结点 IP 端口信息，从而加强安全保护  
Spring Cloud Gateway 本身也是一个微服务，需要注册进服务注册中心

**GateWay 三大核心：**

- **Route** 路由：  
  由 **ID**，目标 **URI**，一系列的断言和过滤器组成，如果 **断言为 true 则匹配该路由**
- **Predicate** 断言：  
  参考的是 Java8 的 java.util.function.Predicate  
  开发人员可以匹配 **HTTP 请求中的所有内容**，通过断言判断 true 或 false
- **Filter** 过滤：  
  指的是 Spring 框架中 GatewayFilter 的实例，使用过滤器，可以在请求被路由前或者之后对请求进行修改

:::info

Predicate 就是匹配条件

Filter，可以理解为拦截器

有了这两个元素，再加上目标 uri，就可以实现一个具体的路由了

:::

**GateWay 工作流程：路由转发 + 断言判断 + 执行过滤链**

### 6.2、基础使用

新建网关模块

POM

```xml
<dependencies>
    <!--gateway-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>
    <!--服务注册发现consul discovery,网关也要注册进服务注册中心统一管控-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-consul-discovery</artifactId>
    </dependency>
    <!-- 指标监控健康检查的actuator,网关是响应式编程删除掉spring-boot-starter-web dependency-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
</dependencies>
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

基本 YML

```yaml
server:
  port: 9527
spring:
  application:
    name: cloud-gateway #以微服务注册进consul或nacos服务列表内
  cloud:
    consul: #配置consul地址
      host: localhost
      port: 8500
      discovery:
        prefer-ip-address: true
        service-name: ${spring.application.name}
```

主启动类

```java
@SpringBootApplication
@EnableDiscoveryClient //服务注册和发现
public class Main9527{
    public static void main(String[] args){
        SpringApplication.run(Main9527.class,args);
    }
}
```

GateWay 配置，YML：

```yaml
spring:
  application:
    name: cloud-gateway #以微服务注册进consul或nacos服务列表内
  cloud:
    consul: # 配置consul地址
      host: localhost
      port: 8500
      discovery:
        prefer-ip-address: true
        service-name: ${spring.application.name}
    gateway:
      routes:
        - id: pay_routh1 #pay_routh1                # 路由的 ID(类似主键 ID)，要求唯一，建议配合服务名
          uri: http://localhost:8001                # 匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/get/**              # 断言，路径相匹配的进行路由

        - id: pay_routh2 #pay_routh2               
          uri: http://localhost:8001                
          predicates:
            - Path=/pay/gateway/info/**           
```

此时，通过访问 `http://localhost:9527/pay/gateway/get/1` 也可访问成功

通常情况：

- 公司内部，系统内环境，直接找微服务

  修改 Feign 接口：

  ```java
  @FeignClient(value = "cloud-payment-service") //内部访问，写微服务名字即可
  public interface PayFeignApi{
      /**
       * GateWay 进行网关测试
       * @param id
       * @return
       */
      @GetMapping(value = "/pay/gateway/get/{id}")
      public ResultData getById(@PathVariable("id") Integer id);
  
      @GetMapping(value = "/pay/gateway/info")
      public ResultData<String> getGatewayInfo();
  }
  ```

- 公司外部，系统外访问，先找网关再服务

  修改 gateway 的 yml

  修改 Feign 接口：

  ```java
  @FeignClient(value = "cloud-gateway") //外部访问，先访问网关
  public interface PayFeignApi{
      /**
       * GateWay 进行网关测试
       * @param id
       * @return
       */
      @GetMapping(value = "/pay/gateway/get/{id}")
      public ResultData getById(@PathVariable("id") Integer id);
  
      @GetMapping(value = "/pay/gateway/info")
      public ResultData<String> getGatewayInfo();
  }
  ```

### 6.3、Route 动态获取 URI

为了解决 gateway 的 yaml 中的 uri 硬编码，需要修改 uri 的值

修改方式：`lb://服务名`，修改后，端口变更，同样能正常请求

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway #以微服务注册进consul或nacos服务列表内
  cloud:
    consul: #配置consul地址
      host: localhost
      port: 8500
      discovery:
        prefer-ip-address: true
        service-name: ${spring.application.name}
    gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service          #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/get/**              # 断言，路径相匹配的进行路由

        - id: pay_routh2 #pay_routh2                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service                #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/info/**              # 断言，路径相匹配的进行路由
```

### 6.4、Predicate 断言（谓词）

[Route Predicate Factories](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#gateway-request-predicates-factories) 断言工程可以配置多种断言

##### 常用的内置断言

内置断言有 [两种配置方式](https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway/configuring-route-predicate-factories-and-filter-factories.html)，通常使用 Shortcut Configuration

- [After Route Predicate Factory](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#the-after-route-predicate-factory) ：

  在指定的日期时间后发生的请求匹配（格式按照 java.time.ZonedDateTime 类的格式）  

  ```java
  ZonedDateTime zbj = ZonedDateTime.now(); // 默认时区
  System.out.println(zbj);
  ```

  YAML 配置：

  ```yaml
  predicates:
  	- Path=/pay/gateway/get/**              # 断言，路径相匹配的进行路由
  	- After=2023-11-20T17:38:13.586918800+08:00[Asia/Shanghai]
  ```

- [Before Route Predicate Factory](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#the-before-route-predicate-factory)

  ```yaml
  - Before=2023-11-27T15:25:06.424566300+08:00[Asia/Shanghai] #超过规定时间不可访问
  ```

- [Between Route Predicate Factory](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#the-between-route-predicate-factory)

  ```yaml
  - Between=2023-11-21T17:38:13.586918800+08:00[Asia/Shanghai],2023-11-22T17:38:13.586918800+08:00[Asia/Shanghai]
  ```

- [Cookie Route Predicate Factory](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#the-cookie-route-predicate-factory)

  ```yaml
  - Cookie=username,zzyy
  ```

- [Header Route Predicate Factory](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#the-header-route-predicate-factory)

  ```yaml
  - Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式
  ```

- [Host Route Predicate Factory](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#the-host-route-predicate-factory)

  ```yaml
  - Host=**.t4mako.com
  ```

- [Method Route Predicate Factory](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#the-method-route-predicate-factory)

- [Path Route Predicate Factory](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#the-path-route-predicate-factory)

- [Query Route Predicate Factory](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#the-query-route-predicate-factory)

- [RemoteAddr Route Predicate Factory](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#the-remoteaddr-route-predicate-factory)

### 6.5、自定义断言

继承 AbstractRoutePredicateFactory 抽象类或实现 RoutePredicateFactory 接口

- 类的命名规则：`XXXRoutePredicateFactory`
- 重写 **apply** 方法  
- 新建 Config 静态内部类， 这个 Config 类就是我们的路由断言规则
- 创建 **空参构造器**  
- 重写 **shortcutFieldOrder** 方法以支持 shortcut 格式

案例：

```java
@Component
public class MyRoutePredicateFactory extends AbstractRoutePredicateFactory<MyRoutePredicateFactory.Config>{
    public MyRoutePredicateFactory(){
        super(MyRoutePredicateFactory.Config.class);
    }

    @Validated
    public static class Config{
        @Setter
        @Getter
        @NotEmpty
        private String userType; //钻、金、银等用户等级
    }

    @Override
    public Predicate<ServerWebExchange> apply(MyRoutePredicateFactory.Config config){
        return new Predicate<ServerWebExchange>(){
            @Override
            public boolean test(ServerWebExchange serverWebExchange)
            {
                //检查 request 的参数里面，userType 是否为指定的值，符合配置就通过
                String userType = serverWebExchange.getRequest().getQueryParams().getFirst("userType");

                if (userType == null) return false;

                //如果说参数存在，就和config的数据进行比较
                if(userType.equals(config.getUserType())) {
                    return true;
                }
                return false;
            }
        };
    }
    
    @Override
    public List<String> shortcutFieldOrder() {
      return Collections.singletonList("userType");
    }
}
```

### 6.6、Filter 过滤

[spring 使用官网](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gatewayfilter-factories)

通过切面，在请求被执行前和被执行后调用，用来修改亲够和响应信息

通常用途：请求鉴权、异常处理、记录接口调用时长...

过滤器分为：

- 全局默认过滤器 [Global Filters](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#global-filters)
  - Gateway 出厂默认已有的，直接用即可，作用于所有的路由
  - 不需要在配置文件中配置，作用在所有的路由上，实现 GlobalFilter 接口即可
- 单一内置过滤器 [Gateway Filter](https://docs.spring.io/spring-cloud-gateway/docs/4.0.4/reference/html/#gatewayfilter-factories)
  - 也可以称为网关过滤器，这种过滤器主要是作用于单一路由或者某个路由分组
- 自定义过滤器

#### Gateway 内置过滤器

常用的内置过滤器：

- 请求头(RequestHeader)相关组

  - [AddRequestHeader GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-addrequestheader-gatewayfilter-factory) 添加请求头

  - [RemoveRequestHeader GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-removerequestheader-gatewayfilter-factory) 删除请求头

  - [SetRequestHeader GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-setrequestheader-gatewayfilter-factory) 修改请求头

  - 案例：

    ```yaml
     - id: pay_routh3 #pay_routh3
          uri: lb://cloud-payment-service                #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/filter/**              # 断言，路径相匹配的进行路由
          filters:
            - AddRequestHeader=X-Request-atguigu1,atguiguValue1  # 请求头 kv，若一头含有多参则重写一行设置
            - AddRequestHeader=X-Request-atguigu2,atguiguValue2
            - RemoveRequestHeader=sec-fetch-site      # 删除请求头 sec-fetch-site
            - SetRequestHeader=sec-fetch-mode, Blue-updatebyzzyy # 将请求头 sec-fetch-mode 对应的值修改为 Blue-updatebyzzyy
    ```

- 请求参数(RequestParameter)相关组

  - [AddRequestParameter GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-addrequestparameter-gatewayfilter-factory)

  - [RemoveRequestParameter GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-removerequestparameter-gatewayfilter-factory)

  - 案例：

  - ```yaml
    filters:
    	- AddRequestParameter=customerId,9527001 # 新增请求参数Parameter：k ，v
    	- RemoveRequestParameter=customerName   # 删除url请求参数customerName，你传递过来也是null
    ```

- 回应头(ResponseHeader)相关组

  - [AddResponseHeader GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-addresponseheader-gatewayfilter-factory)
  - [SetResponseHeader GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-setresponseheader-gatewayfilter-factory)
  - [RemoveResponseHeader GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-removeresponseheader-gatewayfilter-factory)

- 前缀和路径相关组

  - [PrefixPath GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-prefixpath-gatewayfilter-factory)
  - [SetPath GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-setpath-gatewayfilter-factory)
  - [RedirectTo GatewayFilter Factory](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-redirectto-gatewayfilter-factory)

- 其他

  - [Default Filters](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#default-filters)  配置在此处相当于全局通用

#### Gateway 自定义过滤器

##### 自定义全局 Filter

[官网](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gateway-combined-global-filter-and-gatewayfilter-ordering)

新建类 **XXXGlobalFilter** 并实现 **GlobalFilter**，**Ordered** 两个接口

Yaml 中的配置：

```yaml
gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          uri: lb://cloud-payment-service                #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/get/**              # 断言，路径相匹配的进行路由
            - After=2023-12-30T23:02:39.079979400+08:00[Asia/Shanghai]

        - id: pay_routh2 #pay_routh2                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          uri: lb://cloud-payment-service
          predicates:
            - Path=/pay/gateway/info/**              # 断言，路径相匹配的进行路由

        - id: pay_routh3 #pay_routh3
          uri: lb://cloud-payment-service                #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/filter/**              # 断言，路径相匹配的进行路由，默认正确地址
          filters:
            - AddRequestHeader=X-Request-atguigu1,atguiguValue1  # 请求头kv，若一头含有多参则重写一行设置
```

XXXGlobalFilter 类

```java
@Component
@Slf4j
public class MyGlobalFilter implements GlobalFilter, Ordered
{

    /**
     * 数字越小优先级越高
     * @return
     */
    @Override
    public int getOrder()
    {
        return 0;
    }

    private static final String BEGIN_VISIT_TIME = "begin_visit_time";//开始访问时间
    /**
     *第2版，各种统计
     * @param exchange
     * @param chain
     * @return
     */
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        //先记录下访问接口的开始时间
        exchange.getAttributes().put(BEGIN_VISIT_TIME, System.currentTimeMillis());

        return chain.filter(exchange).then(Mono.fromRunnable(()->{
            Long beginVisitTime = exchange.getAttribute(BEGIN_VISIT_TIME);
            if (beginVisitTime != null){
                log.info("访问接口主机: " + exchange.getRequest().getURI().getHost());
                log.info("访问接口端口: " + exchange.getRequest().getURI().getPort());
                log.info("访问接口URL: " + exchange.getRequest().getURI().getPath());
                log.info("访问接口URL参数: " + exchange.getRequest().getURI().getRawQuery());
                log.info("访问接口时长: " + (System.currentTimeMillis() - beginVisitTime) + "ms");
                log.info("我是美丽分割线: ###################################################");
                System.out.println();
            }
        }));
    }

}
```

##### 自定义条件 Filter

- 新建类名 **XXXGatewayFilterFactory** 类并继承 **AbstractGatewayFilterFactory** 类
- 重写 **apply** 方法
- 重写 **shortcutFieldOrder**
- 空参构造方法，内部调用 super

案例：

```java
@Component
public class MyGatewayFilterFactory extends AbstractGatewayFilterFactory<MyGatewayFilterFactory.Config>
{
    public MyGatewayFilterFactory()
    {
        super(MyGatewayFilterFactory.Config.class);
    }


    @Override
    public GatewayFilter apply(MyGatewayFilterFactory.Config config)
    {
        return new GatewayFilter()
        {
            @Override
            public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain)
            {
                ServerHttpRequest request = exchange.getRequest();
                System.out.println("进入了自定义网关过滤器MyGatewayFilterFactory，status："+config.getStatus());
                if(request.getQueryParams().containsKey("atguigu")){
                    return chain.filter(exchange);
                }else{
                    exchange.getResponse().setStatusCode(HttpStatus.BAD_REQUEST);
                    return exchange.getResponse().setComplete();
                }
            }
        };
    }

    @Override
    public List<String> shortcutFieldOrder() {
        return Arrays.asList("status");
    }

    public static class Config
    {
        @Getter@Setter
        private String status;//设定一个状态值/标志位，它等于多少，匹配和才可以访问
    }
}
//单一内置过滤器GatewayFilter
```

## 
