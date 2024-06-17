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

- 微服务所在的 IP 地址和端口号硬编码到订单微服务中，会存在非常多的问题
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
//单一内置过滤器 GatewayFilter
```

## 7、Nacos

[官网](https://nacos.io/)  [中文文档](https://spring-cloud-alibaba-group.github.io/github-pages/2022/zh-cn/2022.0.0.0-RC2.html)

Nacos 就是注册中心 + 配置中心，等价于 Consul

Nacos 的下载：官网下载安装包，运行 bin 目录下 startup.cmd，访问 http://localhost:8848/nacos，默认账号密码都是 nacos

### 7.1、服务注册与发现

#### 服务提供者

POM

```xml
<!--nacos-discovery-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

YML

```yml
# application.yml
server:
  port: 9001

spring:
  application:
    name: nacos-payment-provider # 提供者的服务名称
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #配置 Nacos 地址
```

启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class Main9001
{
    public static void main(String[] args)
    {
        SpringApplication.run(Main9001.class,args);
    }
}
```

业务类

```java
@RestController
public class PayAlibabaController
{
    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/pay/nacos/{id}")
    public String getPayInfo(@PathVariable("id") Integer id)
    {
        return "nacos registry, serverPort: "+ serverPort+"\t id"+id;
    }
}
```

#### 服务消费者

POM

```xml
<!--nacos-discovery-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
<!--loadbalancer-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
```

YML

```yml
server:
  port: 83

spring:
  application:
    name: nacos-order-consumer # 消费者的服务名称
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
# 消费者将要去访问的微服务名称(nacos 微服务提供者叫什么你写什么)
service-url:
  nacos-user-service: http://nacos-payment-provider # 提供者的 url
```

启动类

```java
@EnableDiscoveryClient
@SpringBootApplication
public class Main83
{
    public static void main(String[] args)
    {
        SpringApplication.run(Main83.class,args);
    }
}
```

业务类

```java
// RestTemplateConfig.java
@Configuration
public class RestTemplateConfig
{
    @Bean
    @LoadBalanced //赋予 RestTemplate 负载均衡的能力
    public RestTemplate restTemplate()
    {
        return new RestTemplate();
    }
}
```

```java
// Controller
@RestController
public class OrderNacosController
{
    @Resource
    private RestTemplate restTemplate;

    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping("/consumer/pay/nacos/{id}")
    public String paymentInfo(@PathVariable("id") Integer id)
    {
        String result = restTemplate.getForObject(serverURL + "/pay/nacos/" + id, String.class);
        return result+"\t"+"    我是OrderNacosController83调用者。。。。。。";
    }
}
```

### 7.2、配置中心

[官方文档](https://nacos.io/zh-cn/docs/v2/ecology/use-nacos-with-spring-cloud.html)

Nacos 作为配置中心的配置步骤：

#### POM

```xml
 <!--bootstrap-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
<!--nacos-config-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

Nacos 同 Consul一样，在项目初始化时，要保证先从配置中心进行配置拉取  
拉取配置之后，才能保证项目的正常启动，为了满足动态刷新和全局广播通知

springboot 中配置文件的加载是存在优先级顺序的，**bootstrap** 优先级高于 **application**

#### YML

bootstrap.yml

```yml
# nacos 配置
spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos 服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos 作为配置中心地址
        file-extension: yaml #指定 yaml 格式的配置

# nacos 端配置文件 DataId 的命名规则是：
# ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
# 本案例的 DataID 是:nacos-config-client-dev.yaml
```

application.yml

```yml
server:
  port: 3377
spring:
  profiles:
    active: dev # 表示开发环境
       #active: prod # 表示生产环境
       #active: test # 表示测试环境
```

#### 启动类

```java
@EnableDiscoveryClient
@SpringBootApplication
public class NacosConfigClient3377
{
    public static void main(String[] args)
    {
        SpringApplication.run(NacosConfigClient3377.class,args);
    }
}
```

#### 业务类

```java
@RestController
@RefreshScope //在控制器类加入 @RefreshScope 注解使当前类下的配置支持Nacos的动态刷新功能。
public class NacosConfigClientController
{
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }
}
```

#### 在 Nacos 中添加配置信息

[DataId 的组成格式与配置规则](https://nacos.io/zh-cn/docs/v2/ecology/use-nacos-with-spring-cloud.html)：${spring.application.name}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}

- prefix 默认为 spring.application.name 的值
- spring.profile.active 即为当前环境对应的 profile，可以通过配置项 spring.profile.active 来配置
- file-exetension 为配置内容的数据格式，可以通过配置项 spring.cloud.nacos.config.file-extension 来配置

### 7.3、Namespace-Group-DataId

一个系统通常有多个子项目，每个子项目通常有 dev、test、prod 环境，如何对每个项目每个环境进行分组，配置文件管理？

Nacos data model：Namespace，Group，DataId

DataId 方案：

- 指定 spring.profile.active 和配置文件的 DataID 来使不同环境下读取不同的配置
- 默认空间 public + 默认分组 DEFAULT_GROUP + 新建 DataId
- 通过 spring.profile.active 属性就能进行多环境下配置文件的读取

Group 方案：

- 通过 Group 实现环境区分

- 默认空间 public + 新建 PROD_GROUP + 新建 DataID

- 修改 yaml，新增 group 配置

  ```yml
  # bootstrap.yml
  # nacos 配置 第2种:默认空间 + 新建分组 + 新建 DataID
  spring:
    application:
      name: nacos-config-client
    cloud:
      nacos:
        discovery:
          server-addr: localhost:8848 #Nacos服务注册中心地址
        config:
          server-addr: localhost:8848 #Nacos作为配置中心地址
          file-extension: yaml #指定yaml格式的配置
          group: PROD_GROUP
  
  # nacos端配置文件DataId的命名规则是：
  # ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
  # 本案例的DataID是:nacos-config-client-dev.yaml
  ```

  ```yml
  # application.yml
  server:
    port: 3377
  
  spring:
    profiles:
      #active: dev # 表示开发环境
      #active: test # 表示测试环境
      active: prod # 表示生产环境
  ```

Namespace 方案

- 通过 Namespace 实现命名空间环境区分

- Prod_Namespace + PROD_GROUP + DataID(nacos-config-client-prod.yaml)

- 修改 yml，添加 namespace 字段

  ```yml
  # bootstrap.yml
  # nacos配置 第3种:新建空间+新建分组+新建DataID
  spring:
    application:
      name: nacos-config-client
    cloud:
      nacos:
        discovery:
          server-addr: localhost:8848 #Nacos服务注册中心地址
        config:
          server-addr: localhost:8848 #Nacos作为配置中心地址
          file-extension: yaml #指定yaml格式的配置
          group: PROD_GROUP
          namespace: Prod_Namespace
  
  # nacos端配置文件DataId的命名规则是：
  # ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
  # 本案例的DataID是:nacos-config-client-dev.yaml
  ```

  ```yml
  # application.yml
  server:
    port: 3377
  
  spring:
    profiles:
      #active: dev # 表示开发环境
      #active: test # 表示测试环境
      active: prod # 表示生产环境
  ```

## 8、Sentinel 熔断与限流

[官网](https://sentinelguard.io/zh-cn/) [GitHub](https://github.com/alibaba/Sentinel/wiki/%E4%B8%BB%E9%A1%B5)  [下载](https://github.com/alibaba/Sentinel/releases) 等价于 CircuitBreaker 

作用：流量路由、流量控制、流量整形、熔断降级、系统自适应过载保护、热点流量防护

解决

- 服务雪崩

  多个微服务之间调用的时候，假设微服务A调用微服务B和微服务C，微服务B和微服务C又调用其它的微服务，这就是所谓的“扇出”。如果扇出的链路上某个微服务的调用响应时间过长或者不可用，对微服务A的调用就会占用越来越多的系统资源，进而引起系统崩溃，所谓的“雪崩效应”。对于高流量的应用来说，单一的后端依赖可能会导致所有服务器上的所有资源都在几秒钟内饱和。比失败更糟糕的是，这些应用程序还可能导致服务之间的延迟增加，备份队列，线程和其他系统资源紧张，导致整个系统发生更多的级联故障。这些都表示需要对故障和延迟进行隔离和管理，以便单个依赖关系的失败，不能取消整个应用程序或系统。

  复杂分布式体系结构中的应用程序有数十个依赖关系，每个依赖关系在某些时候将不可避免地失败。

- 服务降级

  是一种服务托底方案，如果服务无法完成正常的调用流程，就使用默认的托底方案来返回数据

- 服务熔断

  如果下游服务因为访问压力过大导致响应很慢或者一直调用失败时，上游服务为了保证系统的整体可用性，会暂时断开与下游服务的调用连接。这种方式就是熔断。类比保险丝达到最大服务访问后，直接拒绝访问，拉闸限电，然后调用服务降级的方法并返回友好提示。

  服务熔断一般情况下会有三种状态：闭合、开启和半熔断：

  - 闭合：服务一切正常，没有故障时，上游服务调用下游服务时，不会有任何限制
  - 开启：上游服务不再调用下游服务的接口，会直接返回上游服务中预定的方法
  - 半熔断状态：处于开启状态时，上游服务会根据一定的规则，尝试恢复对下游服务的调用

- 服务限流

  限制进入系统的流量，以防止进入系统的流量过大而压垮系统。防止瞬时流量过大使服务和数据崩溃；还可用于平滑请求，类似秒杀高并发等操作，严禁一窝蜂的过来拥挤，大家排队，一秒钟 N 个，有序进行。

  限流算法有两种，一种就是简单的请求总量计数，一种就是时间窗口限流（一般为1s），如令牌桶算法和漏牌桶算法就是时间窗口的限流算法

- 服务隔离

  按照一定的规则将系统划分成多个服务模块，并且每个服务模块之间是互相独立的，不会存在强依赖的关系。如果某个拆分后的服务发生故障后，能够将故障产生的影响限制在某个具体的服务内，不会向其他服务扩散，自然也就不会对整体服务产生致命的影响

  常用的服务隔离方式有：线程池隔离 和 信号量隔离

- 服务超时

  服务与服务之间互相调用的现象，从而形成一个个调用链。主动调用其他服务接口的服务处于调用链的上游，提供接口供其他服务调用的服务处于调用链的下游。服务超时就是在上游服务调用下游服务时，设置一个最大响应时间，如果超过这个最大响应时间下游服务还未返回结果，则断开上游服务与下游服务之间的请求连接，释放资源。

sentinel 有两部分组成：

- 核心库，运行与所有 Java 运行时环境
- 控制台（Dashboard），基于 SpringBoot

### 8.1 基本使用

启动 Nacos 8848，Sentinel 8080

新建微服务

#### POM

```xml
<!--SpringCloud alibaba sentinel -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

#### YML

```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848         #Nacos服务注册中心地址
    sentinel:
      transport:
        dashboard: localhost:8080 #配置Sentinel dashboard控制台服务地址
        port: 8719 #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
```

#### 主启动

```java
@EnableDiscoveryClient
@SpringBootApplication
public class Main8401
{
    public static void main(String[] args)
    {
        SpringApplication.run(Main8401.class,args);
    }
}
```

#### 业务类

```java
@RestController
public class FlowLimitController
{

    @GetMapping("/testA")
    public String testA()
    {
        return "------testA";
    }

    @GetMapping("/testB")
    public String testB()
    {
        return "------testB";
    }
}
```

Sentinel 采用懒加载：

- 想使用 Sentinel 对某个接口进行限流和降级等，一定要先访问下接口，使 Sentinel 检测出相应接口

### 8.2、流量控制

Sentinel 监控应用的 QPS 流量或者并发线程数等指标，如果达到指定的阈值时，就会被流量进行控制

流控模式：

- 直连：默认的流控模式，当接口达到限流条件时，直接开启限流功能。
- 关联：当与 A 关联的资源B达到阀值后，就限流 A 自己（B 惹事，A 挂了）
- 链路：来自不同链路的请求对同一个目标访问时，实施针对性的不同限流措施

流控效果：

- 直接：快速失败（默认的流控处理），直接抛出异常
- 预热 WarmUp：https://github.com/alibaba/Sentinel/wiki/%E9%99%90%E6%B5%81---%E5%86%B7%E5%90%AF%E5%8A%A8
- 排队等待：处理间隔性突发的流量

### 8.3、熔断规则

[官网](https://github.com/alibaba/Sentinel/wiki/%E7%86%94%E6%96%AD%E9%99%8D%E7%BA%A7) 

### 8.4、@SentinelResource 注解

SentinelResource 是一个流量防卫防护组件，用于指定防护资源，对配置的资源进行流量控制、熔断降级等功能。

- 不使用注解的限流方式：按照 Rest 地址限流 + 默认限流返回

- 按 SentinelResource 资源名称限流 + 自定义限流返回：

  ```java
  @RestController
  @Slf4j
  public class RateLimitController
  {
      @GetMapping("/rateLimit/byUrl")
      public String byUrl()
      {
          return "按rest地址限流测试OK";
      }
  
      @GetMapping("/rateLimit/byResource")
      @SentinelResource(value = "byResourceSentinelResource",blockHandler = "handleException")
      public String byResource()
      {
          return "按资源名称SentinelResource限流测试OK";
      }
      public String handleException(BlockException exception)
      {
          return "服务不可用@SentinelResource启动"+"\t"+"o(╥﹏╥)o";
      }
  }
  ```

  资源名：byResourceSentinelResource

  自定义限流返回：handleException

- 资源名称限流 + 自定义限流返回 + 服务降级处理

  ```java
  @GetMapping("/rateLimit/doAction/{p1}")
  @SentinelResource(value = "doActionSentinelResource",
          blockHandler = "doActionBlockHandler", fallback = "doActionFallback")
  public String doAction(@PathVariable("p1") Integer p1) {
      if (p1 == 0){
          throw new RuntimeException("p1等于零直接异常");
      }
      return "doAction";
  }
  
  public String doActionBlockHandler(@PathVariable("p1") Integer p1,BlockException e){
      log.error("sentinel配置自定义限流了:{}", e);
      return "sentinel配置自定义限流了";
  }
  
  public String doActionFallback(@PathVariable("p1") Integer p1,Throwable e){
      log.error("程序逻辑异常了:{}", e);
      return "程序逻辑异常了"+"\t"+e.getMessage();
  }
  ```

### 8.5、热点规则

https://github.com/alibaba/Sentinel/wiki/%E7%83%AD%E7%82%B9%E5%8F%82%E6%95%B0%E9%99%90%E6%B5%81

统计或者限制某个热点数据中访问频次最高的 TopN 数据，并对其访问进行限流或者其它操作

```java
@GetMapping("/testHotKey")
@SentinelResource(value = "testHotKey",blockHandler = "dealHandler_testHotKey")
public String testHotKey(@RequestParam(value = "p1",required = false) String p1, 
                         @RequestParam(value = "p2",required = false) String p2){
    return "------testHotKey";
}
public String dealHandler_testHotKey(String p1,String p2,BlockException exception)
{
    return "-----dealHandler_testHotKey";
}
```

配置：方法 testHotKey 里面第一个参数 P1 只要 QPS 超过每秒 1 次，马上降级处理

热点参数的注意点，参数必须是基本类型或者 String

### 8.6、授权规则

https://github.com/alibaba/Sentinel/wiki/%E9%BB%91%E7%99%BD%E5%90%8D%E5%8D%95%E6%8E%A7%E5%88%B6

在 Sentinel 的授权规则中，提供了 白名单与黑名单 两种授权类型。白放行、黑禁止（监控请求参数）

### 8.7、规则持久化：

#### POM

```xml
<!--SpringCloud ailibaba sentinel-datasource-nacos -->
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-nacos</artifactId>
</dependency>
```

YML：添加 Nacos 数据源配置

```yaml
spring:
  cloud:
    sentinel:
      datasource: # Sentinel 持久化配置
        ds1:  # 自定义 Key，也可称为限流类型
          nacos:
            server-addr: localhost:8848 # nacos
            dataId: ${spring.application.name}
            groupId: DEFAULT_GROUP
            data-type: json
            rule-type: flow # 流控规则
```

添加 Nacos 业务配置规则：

填写 Data ID，配置格式 Json

```json
[
    {
        "resource": "/rateLimit/byUrl",
        "limitApp": "default",
        "grade": 1,
        "count": 1,
        "strategy": 0,
        "controlBehavior": 0,
        "clusterMode": false
    }
]
```

### 8.8、OpenFeign 和 Sentinel 集成实现 fallback 服务降级

访问者要有 fallback 服务降级的情况，不要持续访问加大微服务负担，但是通过 feign 接口调用的又方法各自不同，如果每个不同方法都加一个 fallback 配对方法，会导致代码膨胀不好管理

解决方式：

- OpenFeign 接口的统一 fallback 服务降级处理
- Sentinel 访问触发了自定义的限流配置，在注解 @SentinelResource 里面配置的 blockHandler 方法

#### 案例：

##### 服务提供方：

POM

```xml
<!--openfeign-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
<!--alibaba-sentinel-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

yml

```yml
sentinel:
      transport:
        dashboard: localhost:8080 #配置Sentinel dashboard控制台服务地址
        port: 8719 #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
```

启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class Main9001
{
    public static void main(String[] args)
    {
        SpringApplication.run(Main9001.class,args);
    }
}
```

业务类

```java
@RestController
public class PayAlibabaController
{
    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/pay/nacos/{id}")
    public String getPayInfo(@PathVariable("id") Integer id)
    {
        return "nacos registry, serverPort: "+ serverPort+"\t id"+id;
    }

    @GetMapping("/pay/nacos/get/{orderNo}")
    @SentinelResource(value = "getPayByOrderNo",blockHandler = "handlerBlockHandler")
    public ResultData getPayByOrderNo(@PathVariable("orderNo") String orderNo)
    {
        //模拟从数据库查询出数据并赋值给DTO
        PayDTO payDTO = new PayDTO();

        payDTO.setId(1024);
        payDTO.setOrderNo(orderNo);
        payDTO.setAmount(BigDecimal.valueOf(9.9));
        payDTO.setPayNo("pay:"+IdUtil.fastUUID());
        payDTO.setUserId(1);

        return ResultData.success("查询返回值："+payDTO);
    }
    public ResultData handlerBlockHandler(@PathVariable("orderNo") String orderNo,BlockException exception)
    {
        return ResultData.fail(ReturnCodeEnum.RC500.getCode(),"getPayByOrderNo服务不可用，" +
                "触发sentinel流控配置规则"+"\t"+"o(╥﹏╥)o");
    }
    /*
    fallback服务降级方法纳入到Feign接口统一处理，全局一个
    public ResultData myFallBack(@PathVariable("orderNo") String orderNo,Throwable throwable)
    {
        return ResultData.fail(ReturnCodeEnum.RC500.getCode(),"异常情况："+throwable.getMessage());
    }
    */
}
```

##### 修改 api-commons（feign）

POM

```xml
<!--openfeign-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
<!--alibaba-sentinel-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
<!-- 引入自己定义的api通用包 -->
<dependency>
    <groupId>com.atguigu.cloud</groupId>
    <artifactId>cloud-api-commons</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

新增 PayFeignSentinelApi 接口

```java
@FeignClient(value = "nacos-payment-provider",fallback = PayFeignSentinelApiFallBack.class)
public interface PayFeignSentinelApi
{
    @GetMapping("/pay/nacos/get/{orderNo}")
    public ResultData getPayByOrderNo(@PathVariable("orderNo") String orderNo);
}
```

新建全局统一服务降级类

```java
@Component
public class PayFeignSentinelApiFallBack implements PayFeignSentinelApi
{
    @Override
    public ResultData getPayByOrderNo(String orderNo)
    {
        return ResultData.fail(ReturnCodeEnum.RC500.getCode(),"对方服务宕机或不可用，FallBack服务降级o(╥﹏╥)o");
    }
}
```

##### 修改服务消费者

POM

```xml
<!-- 引入自己定义的api通用包 -->
<dependency>
    <groupId>com.atguigu.cloud</groupId>
    <artifactId>cloud-api-commons</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
<!--openfeign-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
<!--alibaba-sentinel-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

YML

```yml
# 激活Sentinel对Feign的支持
feign:
  sentinel:
    enabled: true
```

启动类

```java
@EnableDiscoveryClient
@SpringBootApplication
@EnableFeignClients
public class Main83
{
    public static void main(String[] args)
    {
        SpringApplication.run(Main83.class,args);
    }
}
```

业务类

```java
@RestController
public class OrderNacosController
{
    @Resource
    private RestTemplate restTemplate;
    @Resource
    private PayFeignSentinelApi payFeignSentinelApi;

    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping("/consumer/pay/nacos/{id}")
    public String paymentInfo(@PathVariable("id") Integer id)
    {
        String result = restTemplate.getForObject(serverURL + "/pay/nacos/" + id, String.class);
        return result+"\t"+"    我是OrderNacosController83调用者。。。。。。";
    }

    @GetMapping(value = "/consumer/pay/nacos/get/{orderNo}")
    public ResultData getPayByOrderNo(@PathVariable("orderNo") String orderNo)
    {
        return payFeignSentinelApi.getPayByOrderNo(orderNo);
    }
}
```

### 8.9、GateWay 和 Sentinel 集成实现服务限流

GateWay 保护服务提供者

## 9、Seata

一次业务操作需要跨 **多个数据源** 或多个系统进行远程调用，就会产生分布式事务问题

关系型数据库提供的能力是基于 **单机事务** 的，一旦遇到分布式事务场景，就需要通过更多其他技术手段来解决问题

Seata：简单可扩展自治事务框架，一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务

[官网](https://seata.io/zh-cn/index.html) [源码](https://github.com/seata/seata/releases) [下载](https://seata.io/zh-cn/unversioned/download/seata-server) 

下载 Seata 后，在数据库中添加 Seata 库，备份 conf 下的 application.yml，添加新的 yml

```yml
server:
  port: 7091
spring:
  application:
    name: seata-server
logging:
  config: classpath:logback-spring.xml
  file:
    path: ${log.home:${user.home}/logs/seata}
  extend:
    logstash-appender:
      destination: 127.0.0.1:4560
    kafka-appender:
      bootstrap-servers: 127.0.0.1:9092
      topic: logback_to_logstash
console:
  user:
    username: seata
    password: seata
seata:
  config:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace:
      group: SEATA_GROUP #后续自己在nacos里面新建,不想新建SEATA_GROUP，就写DEFAULT_GROUP
      username: nacos
      password: nacos
  registry:
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group: SEATA_GROUP #后续自己在nacos里面新建,不想新建SEATA_GROUP，就写DEFAULT_GROUP
      namespace:
      cluster: default
      username: nacos
      password: nacos    
  store:
    mode: db
    db:
      datasource: druid
      db-type: mysql
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://localhost:3306/seata?characterEncoding=utf8&useSSL=false&serverTimezone=GMT%2B8&rewriteBatchedStatements=true&allowPublicKeyRetrieval=true
      user: root
      password: 123456
      min-conn: 10
      max-conn: 100
      global-table: global_table
      branch-table: branch_table
      lock-table: lock_table
      distributed-lock-table: distributed_lock
      query-limit: 1000
      max-wait: 5000
  #  server:
  #    service-port: 8091 #If not configured, the default is '${server.port} + 1000'
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.jpeg,/**/*.ico,/api/v1/auth/login,/metadata/v1/**
```

### 9.1、Seata 工作流程

纵观整个分布式事务的管理，就是全局事务ID的传递和变更，要让开发者无感知

1 个 XID

- XID 是全局事务的唯一标识，它可以在服务的调用链路中传递，绑定到服务的事务上下文中

TC、TM、RM

- TC（Transaction Coordinator）事务协调器：就是 Seata，维护全局事务和分支事务的状态，驱动全局事务提交或回滚
- TM（Transaction Manager）事务管理器：标注全局 @GlobalTransaction 启动入口动作的微服务模块。它是事务的发起者，负责定义全局事务的范围，并根据 TC 维护的全局事务和分支事务状态，做出开始事务、提交事务、回滚事务的决议
- RM（Resource Manager）资源管理器：mysql 数据本身，可以是多个 RM，负责管理分支事务上的资源，向 TC 注册分支事务，汇报分支事务状态，驱动分支事务的提交或回滚

![image-20240522162640287](E:\Study\=my repo\vuepress-hope-bloc\my-docs\src\code\java\assets\image-20240522162640287.png)

### 9.2、案例

目前有三个数据库：订单，库存，账户。当用户下单时，会在订单服务中创建一个订单，然后通过远程调用库存服务来扣减下单商品的库存，再通过远程调用账户服务来扣减用户账户里面的余额，最后在订单服务中修改订单状态为已完成。

为上述数据库分别创建 undo_log 表（[AT 模式 ](https://seata.io/zh-cn/docs/user/mode/at/)专用）[表案例](https://github.com/seata/seata/blob/2.x/script/client/at/db/mysql.sql)

为业务添加 OpenFeign 接口，为上述三个微服务模块添加 Seata 的 yml

```yml
seata:
  registry:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace: ""
      group: SEATA_GROUP
      application: seata-server
  tx-service-group: default_tx_group # 事务组，由它获得TC服务的集群名称
  service:
    vgroup-mapping: # 点击源码分析
      default_tx_group: default # 事务组与TC服务集群的映射关系
  data-source-proxy-mode: AT

logging:
  level:
    io:
      seata: info
```

对于订单业务模块的 ServiceImpl 代码，在订单模块下添加 **@GlobalTransactional** 完成分布式事务：

```java
/*
* 下订单->减库存->扣余额->改(订单)状态
*/
@Slf4j
@Service
public class OrderServiceImpl implements OrderService
{
    @Resource
    private OrderMapper orderMapper;
    @Resource//订单微服务通过OpenFeign去调用库存微服务
    private StorageFeignApi storageFeignApi;
    @Resource//订单微服务通过OpenFeign去调用账户微服务
    private AccountFeignApi accountFeignApi;


    @Override
    @GlobalTransactional(name = "zzyy-create-order",rollbackFor = Exception.class) //AT
    //@GlobalTransactional @Transactional(rollbackFor = Exception.class) //XA
    public void create(Order order) {

        //xid检查
        String xid = RootContext.getXID();

        //1. 新建订单
        log.info("==================>开始新建订单"+"\t"+"xid_order:" +xid);
        //订单状态status：0：创建中；1：已完结
        order.setStatus(0);
        int result = orderMapper.insertSelective(order);

        //插入订单成功后获得插入 mysql 的实体对象
        Order orderFromDB = null;
        if(result > 0)
        {
            orderFromDB = orderMapper.selectOne(order);
            //orderFromDB = orderMapper.selectByPrimaryKey(order.getId());
            log.info("-------> 新建订单成功，orderFromDB info: "+orderFromDB);

            //2. 扣减库存
            log.info("-------> 订单微服务开始调用Storage库存，做扣减count");
            storageFeignApi.decrease(orderFromDB.getProductId(), orderFromDB.getCount());
            log.info("-------> 订单微服务结束调用Storage库存，做扣减完成");

            //3. 扣减账号余额
            log.info("-------> 订单微服务开始调用Account账号，做扣减money");
            accountFeignApi.decrease(orderFromDB.getUserId(), orderFromDB.getMoney());
            log.info("-------> 订单微服务结束调用Account账号，做扣减完成");
            System.out.println();
            //4. 修改订单状态
            //订单状态status：0：创建中；1：已完结
            log.info("-------> 修改订单状态");
            orderFromDB.setStatus(1);

            Example whereCondition=new Example(Order.class);
            Example.Criteria criteria=whereCondition.createCriteria();
            criteria.andEqualTo("userId",orderFromDB.getUserId());
            criteria.andEqualTo("status",0);

            int updateResult = orderMapper.updateByExampleSelective(orderFromDB, whereCondition);

            log.info("-------> 修改订单状态完成"+"\t"+updateResult);
            log.info("-------> orderFromDB info: "+orderFromDB);
        }
        System.out.println();
        log.info("==================>结束新建订单"+"\t"+"xid_order:" +xid);
    }
}
```

### 9.3、原理

AT 模式整体机制（两阶段）

- 一阶段：业务数据和回滚日志记录在同一个本地事务中提交，释放本地锁和连接资源
- 二阶段：
  - 提交异步化，非常快速完成
  - 回滚通过一阶段的回滚日志进行反向补偿、

一阶段：

- Seata 拦截 SQL，解析 SQL 语义，找到「业务 SQL」要更新的业务数据，在业务数据被更新前，将其保存成 before image
-  执行“业务 SQL”更新业务数据，在业务数据更新之后，其保存成 after image，最后生成行锁

二阶段：

- 正常提交：只需将一阶段保存的快照数据和行锁删掉，完成数据清理即可
- 异常回滚：
  - Seata 需要回滚一阶段已经执行的「业务 SQL」，还原业务数据
  - 用 before image 还原业务数据；但在还原前要首先要校验脏写，对比数据库当前业务数据和 after image
  - 如果两份数据完全一致就说明没有脏写，可以还原业务数据，如果不一致就说明有脏写，出现脏写就需要转人工处理。



