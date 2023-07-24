---
title: SpringCloud 基础
icon: leaf
order: 12
date: 2023-03-20
category: 
    - java
tag: 
    - spring
    - java
    - SpringCloud
---
## 1、微服务介绍
**单体架构**：将业务的所有能集中在一个项目中开发，打成一个包部署
	优点：架构简单，部署成本低
	缺点：耦合度高

**分布式架构**：根据业务功能对系统进行拆分，每个业务模块作为独立项目开发，称为一个服务。
	优点：降低服务耦合、有利于服务升级拓展
	缺点：架构复杂，难度大
  <!-- more -->
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230321132615.png)

分布式架构要考虑的问题：
	服务拆分粒度如何？服务集群地址如何维护？服务之间如何实现远程调用？服务健康状态如何感知？

**微服务**：微服务是一种经过**良好架构设计的分布式架构方案**，微服务架构特征：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230321134134.png)

微服务技术对比：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230321134826.png)

企业需求：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230321134909.png)

## 2、服务拆分及远程调用

### 2.1、SpringCloud介绍

[SpringCloud](https://spring.io/projects/spring-cloud)是目前国内使用最广泛的微服务框架
SpringCloud集成了各种微服务功能组件，并基于SpringBoot实现了这些组件的自动装配，从而提供了良好的开箱即用体验

SpringCloud与SpringBoot的版本兼容关系如下：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230321135409.png)

本次学习的版本是Hoxton.SR10，因此对应的SpringBOot版本：2.3.x版本。

### 2.2、服务拆分及远程调用

服务拆分注意事项：
1、不同微服务，不要重复开发相同业务
2、微服务数据独立，不要访问其他微服务的数据库
3、微服务可以将自己的业务暴露为接口，供其他微服务调用

以课前资料中的微服务cloud-demo为例：

将项目解压到idea工作空间，通过idea打开工程文件：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230321141027.png)

#### 2.2.1、功能需求

运行项目，根据订单id查询订单的同时，返回的用户为null

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230321145505.png)

需求：根据订单id查询订单的同时，把订单所属的用户信息一起返回，**即从一个服务到另一个服务的远程调用**

**远程调用**方式解析：**在Java代码中发起Http请求**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230321145718.png)

#### 2.2.2、远程调用，注册RestTemplate

***RestTemplate***：Spring提供的**发送Http请求的工具**，封装了HTTP请求的细节，可以快速地向其他Web服务发送GET、POST、PUT、DELETE等请求

在order-service的OrderApplication中**注册RestTemplate**

```java
@MapperScan("cn.itcast.order.mapper")
@SpringBootApplication
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }
    
    //注册RestTemplate
    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

在**service中使用RestTemplate**

```java
public Order queryOrderById(Long orderId) {
    // 1.查询订单
    Order order = orderMapper.findById(orderId);
    // 2.利用RestTemplate发送http请求，查询用户
    // 2.1.url路径：
    String url = "Http://localhost:8081/user/" + order.getUserId();
    // 2.2发送http请求，实现远程调用
    User user = restTemplate.getForObject(url, User.class); //通过反序列化，将json对象转化为java对象
    // 3.封装User到Order
    order.setUser(user);
    // 4.返回
    return order;
}
```

两个概念：
**服务提供者**：一次业务中，被其他微服务调用的服务（提供接口给其他微服务）
**服务消费者**：一次业务中，调用其他微服务的服务（调用其他微服务提供的接口）
若服务A调用服务B，服务B调用服务C，则它**既是提供者，又是消费者**

## 3、Eureka注册中心

### 3.1、Eureka的作用

- 消费者该如何获取服务提供者具体信息：
  - 服务提供者启动时向eureka注册自己的信息
  - eureka保存这些信息
  - 消费者根据服务名称向eureka拉去提供者信息
- 如果有多个服务提供者，消费者该如何选择：
  - 服务消费者利用负载均衡算法，从服务列表中挑选一个
- 消费者如何感知服务提供者健康状态
  - 服务提供者会每隔30s向EurekaServer发送心跳请求，报告健康状态
  - eureka会更新记录到服务列表信息，心跳不支持会被剔除
  - 消费者就可以拉去到最新信息

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230321180314.png)

### 3.2、搭建Eureka服务

**搭建EurekaServer服务步骤如下：**

1、创建项目，引入spring-cloud-starter-netflix-eureka-**server**依赖

创建**新的服务（model）**，选择maven

```xml
<!--eureka的服务端依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230322130611.png)

2、编写**启动类，添加@EnableEurekaServer**注解

```java
package cn.itcast.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaApplication.class, args);
    }
}
```

3、添加application.yml文件，编写下面配置

```yml
server:
  port: 10086
spring:
  application:
    name: eureka-server
eureka:
  client:
    service-url: 
      defaultZone: http://127.0.0.1:10086/eureka
```

### 3.3、Eureka服务注册

将user-service项目引入到EurekaServer步骤如下：

1、在user-service项目中引入spring-cloud-starter-netflix-eureka-**client**依赖

```xml
<!--eureka的客户端依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

2、在application.yml文件，编写下面配置

```yml
spring:
  application:
    name: userservice
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
```

另外，我们可以将user-service多次启动，模拟多实例部署，但为了避免端口冲突，需要修改端口设置

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230322133510.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230322133349.png)

### 3.4、服务发现

在OrderService完成服务拉取：
服务拉取是基于服务名称获取服务列表，然后在服务列表做负载均衡

1、在OrderService的代码，修改访问的url路径，用服务名代替ip，端口：

```java
// 2.1.url路径：
String url = "Http://userservice/user/" + order.getUserId(); //服务名为userservice
```

2、在order-service项目的启动类OrderApplication中的RestTemplate添加负载均衡注解：

```java
@Bean
@LoadBalanced
public RestTemplate restTemplate(){
    return new RestTemplate();
}
```

## 4、Ribbon负载均衡

### 4.1负载均衡流程

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210713224517686.png)

SpringCloudRibbon的底层采用了一个拦截器，拦截了RestTemplate发出的请求（拦截客户端发起的HTTP请求，RestTemplate符合，所以被拦截），获取拦截的地址，对地址做了修改。

基本流程如下：

- 拦截我们的RestTemplate请求http://userservice/user/1
- RibbonLoadBalancerClient会从请求url中获取服务名称，也就是userservice
- DynamicServerListLoadBalancer根据userservice到eureka**拉取服务**列表
- eureka**返回列表**，localhost:8081、localhost:8082
- IRule利用**内置负载均衡规则**，从列表中选择一个，例如localhost:8081
- RibbonLoadBalancerClient修改请求地址，用localhost:8081替代userservice，得到http://localhost:8081/user/1，发起真实请求

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210713224724673.png)

### 4.2、负载均衡策略

#### 4.2.1.负载均衡策略

Ribbon的负载均衡规则是一个叫做IRule的接口来定义的，每一个子接口都是一种规则

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210713225653000.png)

不同规则的含义如下：

| **内置负载均衡规则类**    | **规则描述**                                                 |
| ------------------------- | ------------------------------------------------------------ |
| RoundRobinRule            | **简单轮询**服务列表来选择服务器。它是Ribbon**默认**的负载均衡规则。 |
| AvailabilityFilteringRule | 对以下两种服务器进行忽略：   （1）在默认情况下，这台服务器如果3次连接失败，这台服务器就会被设置为“短路”状态。短路状态将持续30秒，如果再次连接失败，短路的持续时间就会几何级地增加。  （2）并发数过高的服务器。如果一个服务器的并发连接数过高，配置了AvailabilityFilteringRule规则的客户端也会将其忽略。并发连接数的上限，可以由客户端的`<clientName>.<clientConfigNameSpace>.ActiveConnectionsLimit`属性进行配置。 |
| WeightedResponseTimeRule  | 为每一个服务器赋予一个权重值。服务器响应时间越长，这个服务器的权重就越小。这个规则会随机选择服务器，这个权重值会影响服务器的选择。 |
| **ZoneAvoidanceRule**     | 以区域可用的服务器为基础进行服务器的选择。使用Zone对服务器进行分类，这个Zone可以理解为一个机房、一个机架等。而后再对Zone内的多个服务做轮询。 |
| BestAvailableRule         | 忽略那些短路的服务器，并选择并发数较低的服务器。             |
| RandomRule                | 随机选择一个可用的服务器。                                   |
| RetryRule                 | 重试机制的选择逻辑                                           |



#### 4.2.2修改Ribbon负载均衡策略

通过定义IRule实现可以修改负载均衡规则，有两种方式：

1. 代码方式：在order-service中的OrderApplication类中，定义一个新的IRule：

```java
@Bean
public IRule randomRule(){
    return new RandomRule();
}
```

2. 配置文件方式：在order-service的application.yml文件中，添加新的配置也可以修改规则：

```yaml
userservice: # 给某个微服务配置负载均衡规则，这里是userservice服务
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule # 负载均衡规则 
```

> **注意：一般用默认的负载均衡规则，不做修改。**

### 4.3、饥饿加载

Ribbon默认是采用懒加载，即第一次访问时才会去创建LoadBalanceClient，请求时间会很长。

而饥饿加载则会在项目启动时创建，降低第一次访问的耗时，通过下面配置开启饥饿加载：

```yml
ribbon:
  eager-load:
  	#开启饥饿加载
    enabled: true
    #指定对userservice这个服务饥饿加载
    clients: 
    #多个服务
     - userservice
     - XXservice
```

## 5、Nacos注册中心

[Nacos](https://nacos.io/)是阿里巴巴的产品，现在是[SpringCloud](https://spring.io/projects/spring-cloud)中的一个组件，相比[Eureka](https://github.com/Netflix/eureka)功能更加丰富，在国内受欢迎程度较高

### 5.1、安装Nacos

[Nacos安装指南](E:\Study\Java后端\14、SpringCloud\基础篇\day01-SpringCloud01\资料\Nacos安装指南.md)

在Windows下安装Nacos，安装路径：D:\Nacos

启动Nacos：**startup.cmd -m standalone** （单机启动）

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230322145507.png)

通过地址访问Nacos

### 5.2、服务注册到Nacos

1、在cloud-demo父工程的pom文件中的`<dependencyManagement>`中引入SpringCloudAlibaba的依赖：

```xml
<!--Nacos的管理依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.2.6.RELEASE</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

然后在user-service和order-service中的pom文件中引入nacos-discovery依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

> **注意：不要忘了注释掉eureka的依赖。**

2、配置Nacos地址

在user-service和order-service的application.yml中添加nacos地址：

```yml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
```

> **注意：不要忘了注释掉eureka的依赖。**

3、重启

重启微服务后，登录nacos管理页面，可以看到微服务信息：

### 5.3、Nacos集群配置

#### 5.3.1、服务分级存储模型

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210713232522531.png)

一个**服务**可以有多个**实例**，例如我们的user-service，可以有:
127.0.0.1:8081、127.0.0.1:8082、127.0.0.1:8083

假如这些实例分布于全国各地的不同机房，例如：
127.0.0.1:8081，在上海机房
127.0.0.1:8082，在上海机房
127.0.0.1:8083，在杭州机房

Nacos就将同一机房内的实例 划分为一个**集群**。

也就是说，user-service是服务，一个服务可以包含多个集群，如杭州、上海，每个集群下可以有多个实例，形成分级模型

微服务互相访问时，应该**尽可能访问同集群实例**，因为本地访问速度更快。当本集群内不可用时，才访问其它集群

#### 5.3.2、给user-service配置集群

修改application.yml，添加如下内容：

```yml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
```

通过修改application.yml，重启服务，实现不同集群

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230322152537.png)

#### 5.3.2、同集群优先的负载均衡

Nacos中提供了一个`NacosRule`的实现，可以**优先从同集群中挑选实例**。

1）给order-service配置集群信息

修改order-service的application.yml文件，添加集群配置：

```yml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
```

2）修改负载均衡规则

不修改负载均衡规则，依然以轮询的方式访问

修改order-service的application.yml文件，**修改负载均衡规则**：

```yaml
userservice: #要做配置的微服务名称
  ribbon:
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule # 负载均衡规则
```

此时会优先向同集群挑选实例，**同集群下默认随机访问**，如果同集群挂掉，会发生跨集群访问

### 5.4、权重配置

实际部署中会出现这样的场景：

服务器设备性能有差异，部分实例所在机器性能较好，另一些较差，我们**希望性能好的机器承担更多的用户请求**。
但**默认情况下NacosRule是同集群内随机挑选**，不会考虑机器的性能问题。
因此，**Nacos提供了权重配置**来控制访问频率，权重越大则访问频率越高。

在nacos控制台，通过**编辑按钮**，即可**修改权重**

**注意**：如果权重修改为0，则该实例永远不会被访问

### 5.5、环境隔离

Nacos中服务存储和数据存储的最外层都是一个名为namespace的东西，用来做最外层隔离

Nacos提供了**namespace来实现环境隔离**功能。

- nacos中可以有多个namespace
- namespace下可以有group、service等
- 不同namespace之间相互隔离，例如不同namespace的服务互相不可见

![image-20210714000101516](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210714000101516.png)

#### 5.5.1、创建namespace

默认情况下，所有service、data、group都在同一个namespace，名为public：

我们可以点击页面新增按钮，添加一个namespace

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230322162127.png)

#### 5.5.2、给微服务配置namespace

给微服务配置namespace只能通过修改配置来实现。

例如，修改order-service的application.yml文件：

```yml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ
        namespace: 32ef43d7-b97e-4941-94cf-47890b51d23e # 命名空间，填ID
```

此时访问order-service，因为namespace不同，会导致找不到userservice，控制台会报错

### 5.6、Nacos与Eureka的区别

Nacos的服务实例分为两种l类型：
临时实例：如果实例宕机超过一定时间，会从服务列表剔除，默认的类型。|
非临时实例：如果实例宕机，不会从服务列表剔除，也可以叫永久实例。

​	配置一个服务实例为永久实例：

```yaml
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: false # 设置为非临时实例
```



Nacos和Eureka整体结构类似，服务注册、服务拉取、心跳等待，但是也存在一些差异：
Nacos注册中心细节分析：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210714001728017.png)

- Nacos与eureka的共同点
  - 都支持服务注册和服务拉取
  - 都支持服务提供者心跳方式做健康检测

- Nacos与Eureka的区别
  - Nacos支持服务端主动检测提供者状态：临时实例采用心跳模式，**非临时实例采用主动检测模式**
  - 临时实例心跳不正常会被**剔除**，非临时实例则不会被剔除
  - Nacos支持服务列表变更的消息推送模式，服务列表更新更及时
  - Nacos集群默认采用AP方式，当集群中存在非临时实例时，采用CP模式；Eureka采用AP方式

##  6、Nacos管理配置

当微服务部署的实例越来越多，达到数十、数百时，逐个修改微服务配置就会让人抓狂，而且很容易出错。所以需要一种统一配置管理方案，可以**集中管理所有实例的配置**。
Nacos一方面可以将配置集中管理，另一方可以在配置变更时，及时通知微服务，实现配置的热更新。

**即将配置交给Nacos管理**

### 6.1、统一配置管理

#### 6.1.1、在Nacos中新建配置

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210714164742924.png)

![image-20210714164856664](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210714164856664.png)

> 注意：项目的核心配置，**需要热更新的配置才有放到nacos管理的必要**。基本不会变更的一些配置还是保存在微服务本地比较好。

#### 6.1.2、配置的获取

微服务要**拉取nacos中管理的配置**，并且**与本地的application.yml配置合并**，才能完成项目启动。

但**若尚未读取application.yml，服务无法得知nacos地址**

因此**spring**引入了一种**新的配置文件**：***bootstrap.yaml***文件，会在application.yml之前被读取

**配置获取的步骤如下：**
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/L0iFYNF.png)

1）引入Nacos的配置管理客户端依赖

首先，在user-service服务中，引入nacos-config的客户端依赖：

```xml
<!--nacos配置管理依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

2）在userservice中的Source目录添加一个bootstrap.yml文件，这个文件是引导文件，优先级高于application.yml

配置服务名称，开发环境，文件后缀名→就是Data Id，因此知道是nacos中的哪个文件
配置Nacos地址，就知道去哪读取nacos中的配置文件

```yml
spring:
  application:
    name: userservice # 服务名称
  profiles:
    active: dev #开发环境，这里是dev 
  cloud:
    nacos:
      server-addr: localhost:8848 # Nacos地址
      config:
        file-extension: yml # 文件后缀名
```

里会根据spring.cloud.nacos.server-addr获取nacos地址，再根据
`${spring.application.name}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}`作为文件id，来读取配置。
本例中，就是去读取`userservice-dev.yaml`：

因此，可以删除application.yml中重复的配置：服务名称，Nacos地址等

3）读取nacos配置

在user-service中的UserController中添加业务逻辑，读取pattern.dateformat配置：

```java
@Slf4j
@RestController
@RequestMapping("/user")
@RefreshScope //用于在运行时动态地更新应用程序中的配置信息
public class UserController {

    @Autowired
    private UserService userService;

    @Value("${pattern.dateformat}")
    private String dateformat;

    @GetMapping("now")
    public String now(){
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(dateformat)); //获取配置 
    }
    ...
}
```

### 6.2、配置热更新

在Nacos中配置文件变更后，微服务无需重启就可以感知。不过需要通过下面两种配置实现：

#### 6.2.1、方式一

在@Value注入的变量所在类上添加注解**@RefreshScope**：

```java
@Slf4j
@RestController
@RequestMapping("/user")
@RefreshScope //用于在运行时动态地更新应用程序中的配置信息
public class UserController {
```

#### 6.2.2、方式二

使用**@ConfigurationProperties**注解

在user-service服务中，添加一个类，读取patterrn.dateformat属性：

```java
@Component
@Data
@ConfigurationProperties(prefix = "pattern")
public class PatternProperties {
    private String dateformat;
}
```

在UserController中使用这个类代替@Value：

```java
public class UserController{
    @Autowired
    private PatternProperties patternProperties;
    
    @GetMapping("now")
    public String now(){
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(patternProperties.getDateformat()));
    }
}
```

### 6.3、配置共享

微服务启动时，会**从nacos读取多个配置文件**，例如：

- `[spring.application.name]-[spring.profiles.active].yaml`，例如：userservice-dev.yaml

- `[spring.application.name].yaml`，例如：userservice.yaml

而`[spring.application.name].yaml`这个文件一定会加载，因此多环境**共享配置**可以**写入这个文件**

#### 1）添加一个环境共享配置

在nacos中添加一个userservice.yaml文件：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230323205335.png)

#### 2）在user-service中读取共享配置

在user-service服务中，修改PatternProperties类，读取新添加的属性
在user-service服务中，修改UserController，添加一个方法

```java
@Component
@Data
@ConfigurationProperties(prefix = "pattern")
public class PatternProperties {
    private String dataformat;
    private String enSharedValue;
}
```

```java
@Autowired
private PatternProperties properties;

@GetMapping("prop")
public PatternProperties properties(){
    return properties;
}
```

#### 3）运行两个UserApplication，使用不同的profile

修改UserApplication2这个启动项，改变其profile值：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230323205521.png)

这样，UserApplication(8081)使用的profile是dev，UserApplication2(8082)使用的profile是test。

启动UserApplication和UserApplication2，发现结果的差异
可以看出来，不管是dev，还是test环境，都读取到了envSharedValue这个属性的值。

#### 4）配置共享的优先级

当nacos、服务本地同时出现相同属性时，优先级有高低之分：

**服务名-profile.yaml > 服务名称.yaml > 本地配置**

## 7、Nacos集群搭建

Nacos生产环境下一定要部署为集群状态

### 7.1、集群结构图

官方给出的Nacos集群图：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230323210255.png)

其中包含3个nacos节点，然后一个负载均衡器代理3个Nacos。这里负载均衡器可以使用nginx。

我们计划的集群结构：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230323210319.png)

三个nacos节点的地址：

| 节点   | ip            | port |
| ------ | ------------- | ---- |
| nacos1 | 192.168.137.1 | 8845 |
| nacos2 | 192.168.137.1 | 8846 |
| nacos3 | 192.168.137.1 | 8847 |

### 7.2、集群搭建

搭建集群的基本步骤：

- 搭建数据库，初始化数据库表结构
- 下载nacos安装包
- 配置nacos
- 启动nacos集群
- nginx反向代理

#### 7.2.1、初始化数据库

Nacos默认数据存储在内嵌数据库Derby中，不属于生产可用的数据库。

这里以单点的数据库为例来讲解。

首先新建一个数据库，命名为nacos，而后导入相关的SQL

#### 7.2.2、下载Nacos

[nacos](https://github.com/alibaba/nacos/tags)
本例中使用1.4.1版本

#### 7.2.3、配置Nacos

进入nacos安装目录下的conf目录，修改配置文件cluster.conf.example，**重命名为cluster.conf**

然后添加内容：

```
127.0.0.1:8845
127.0.0.1.8846
127.0.0.1.8847
```

然后修改conf文件下的application.properties文件，添加数据库配置

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230323211509.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230323211653.png)

```properties
spring.datasource.platform=mysql

db.num=1

db.url.0=jdbc:mysql://127.0.0.1:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user.0=root
db.password.0=root
```

### 7.3、启动

将nacos文件夹复制三份，分别命名为：nacos1、nacos2、nacos3（模糊nacos集群）

然后分别修改三个文件夹中的application.properties

nacos1:

```properties
server.port=8845
```

nacos2:

```properties
server.port=8846
```

nacos3:

```properties
server.port=8847
```

然后分别启动三个nacos节点：

```
startup.cmd
```

### 7.4、nginx反向代理

修改nginx安装目录下的conf/nginx.conf文件，配置如下：

```nginx
upstream nacos-cluster {
    server 127.0.0.1:8845;
	server 127.0.0.1:8846;
	server 127.0.0.1:8847;
}

server {
    listen       80;
    server_name  localhost;

    location /nacos {
        proxy_pass http://nacos-cluster;
    }
}
```

而后在浏览器访问：http://localhost/nacos即可。

代码中application.yml文件配置如下：

```yml
spring:
  cloud:
    nacos:
      server-addr: localhost:80 # Nacos地址
```

## 8、Feign远程调用

目前利用RestTemplate发起远程调用的代码：

```java
String url = "Http://userservice/user/" + order.getUserId();
User user = restTemplate.getForObject(url, User.class); //通过反序列化，将json对象转化为java对象
```

存在下面的问题：
代码可读性差，编程体验不统一
参数复杂URL难以维护

[Feign](https://github.com/OpenFeign/feign)是一个声明式的http客户端，其作用就是帮助我们优雅的实现http请求的发送，解决上面提到的问题。

### 8.1、Feign替代RestTemplate

Fegin的使用步骤如下：

#### 1）引入依赖

在order-service服务的pom文件中引入feign的依赖：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

#### 2）添加注解

在order-service的启动类添加注解开启Feign的功能：

**@EnableFeginClients**

```java
@MapperScan("cn.itcast.order.mapper")
@SpringBootApplication
@EnableFeignClients
public class OrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }

    /**
     * 创建RestTemplate并注入Spring容器
     * @return
     */
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

#### 3）编写Feign的客户端

在order-service中新建一个接口，内容如下：

```java 
package cn.itcast.order.client;

import cn.itcast.order.pojo.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("userservice")
public interface UserClient {
    @GetMapping("/user/{id}")
    User findById(@PathVariable("id") Long id);
}
```

请求路径为http://userservice/user/

这个客户端主要是基于SpringMVC的注解来声明远程调用的信息，比如：

- 服务名称：userservice
- 请求方式：GET
- 请求路径：/user/{id}
- 请求参数：Long id
- 返回值类型：User

这样，Feign就可以帮助我们发送http请求，无需自己使用RestTemplate来发送了。

#### 5）总结

使用Feign的步骤：
① 引入依赖
② 添加@EnableFeignClients注解
③ 编写FeignClient接口
④ 使用FeignClient中定义的方法代替RestTemplate

### 8.2、自定义配置

Feign可以支持很多的自定义配置，如下表所示：

| 类型                   | 作用             | 说明                                                   |
| ---------------------- | ---------------- | ------------------------------------------------------ |
| **feign.Logger.Level** | 修改日志级别     | 包含四种不同的级别：NONE、BASIC、HEADERS、FULL         |
| feign.codec.Decoder    | 响应结果的解析器 | http远程调用的结果做解析，例如解析json字符串为java对象 |
| feign.codec.Encoder    | 请求参数编码     | 将请求参数编码，便于通过http请求发送                   |
| feign.Contract         | 支持的注解格式   | 默认是SpringMVC的注解                                  |
| feign.Retryer          | 失败重试机制     | 请求失败的重试机制，默认是没有，不过会使用Ribbon的重试 |

一般情况下，默认值就能满足我们使用，如果要自定义时，只需要创建自定义的@Bean覆盖默认Bean即可。

配置Feign日志有两种方式：

#### 8.2.1、配置文件方式

基于配置文件修改feign的日志级别可以**针对单个服务**：

```yml
feign:  
  client:
    config: 
      userservice: # 针对某个微服务的配置
        loggerLevel: FULL #  日志级别 
```

也可以针对所有服务（全局配置）：

```yml
feign:  
  client:
    config: 
      default: # 这里用default就是全局配置，如果是写服务名称，则是针对某个微服务的配置
        loggerLevel: FULL #  日志级别 
```

而日志的级别分为四种：
	NONE：不记录任何日志信息，这是默认值。
	BASIC：仅记录请求的方法，URL以及响应状态码和执行时间
	HEADERS：在BASIC的基础上，额外记录了请求和响应的头信息
	FULL：记录所有请求和响应的明细，包括头信息、请求体、元数据。

#### 8.2.2、Java代码方式

也可以基于Java代码来修改日志级别，**先声明一个类，然后声明一个Logger.Level的对象**：

```java
public class DefaultFeignConfiguration  {
    @Bean
    public Logger.Level feignLogLevel(){
        return Logger.Level.BASIC; // 日志级别为BASIC
    }
}
```

如果要**全局生效**，将其放到启动类的@EnableFeignClients这个注解中：

```java
@EnableFeignClients(defaultConfiguration = DefaultFeignConfiguration .class) 
```

如果是**局部生效**，则把它放到对应的@FeignClient这个注解中：

```java
@FeignClient(value = "userservice", configuration = DefaultFeignConfiguration .class) //针对userservice服务
```

### 8.3、Feign性能优化

Feign**底层发起http请求**，依赖于其它的框架。其底层客户端实现包括：
	URLConnection：默认实现，不支持连接池
	Apache HttpClient ：支持连接池
	OKHttp：支持连接池

因此提高Feign的性能主要手段就是：
① 使用**连接池**代替默认的URLConnection
② 日志级别，最好使用basic或none

#### 用Apache的HttpClient连接池

1）引入依赖

在order-service的pom文件中引入Apache的HttpClient依赖：

```xml
<!--httpClient的依赖 -->
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-httpclient</artifactId>
</dependency>
```

2）配置连接池

在order-service的application.yml中添加配置：

```yaml
feign:
  client:
    config:
      default: # default全局的配置
        loggerLevel: BASIC # 日志级别，BASIC就是基本的请求和响应信息
  httpclient:
    enabled: true # 开启feign对HttpClient的支持
    max-connections: 200 # 最大的连接数
    max-connections-per-route: 50 # 每个路径的最大连接数
```

总结，Feign的优化：
1.日志级别尽量用basic
2.使用HttpClient或OKHttp代替URLConnection
	①  引入feign-httpClient依赖
	②  配置文件开启httpClient功能，设置连接池参数

### 8.4、Feign最佳实践

Feign的客户端与服务提供者的controller代码非常相似：

feign客户端：

```java
@FeignClient("userservice")
public interface UserClient {
    @GetMapping("/user/{id}")
    User findById(@PathVariable("id") Long id);
}
```

controller：

```java
//userservice服务
@GetMapping("/{id}")
public User queryById(@PathVariable("id") Long id) {
    return userService.queryById(id);
}
```

所以可以简化这种重复的代码

#### 8.4.1、继承方式（不推荐）

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210714190640857.png)

缺点：

- 服务提供方、服务消费方紧耦合

- 参数列表中的注解映射并不会继承，因此Controller中必须再次声明方法、参数列表、注解

#### 8.4.2、抽取方式

将Feign的Client抽取为独立模块，并且把接口有关的POJO、默认的Feign配置都放到这个模块中，提供给所有消费者使用。

例如，将UserClient、User、Feign的默认配置都抽取到一个feign-api包中，所有微服务引用该依赖包，即可直接使用。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210714214041796.png)

#### 8.4.3、实现Feign最佳实践

##### 1）抽取

首先创建一个module，命名为feign-api

在feign-api中然后引入feign的starter依赖：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

然后，order-service中编写的UserClient、User、DefaultFeignConfiguration都复制到feign-api项目中

![image-20230324143244552](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230324143244552.png)

##### 2）在order-service中使用feign-api

删除order-service中的UserClient、User、DefaultFeignConfiguration等类或接口

在order-service的pom文件中中引入feign-api的依赖：

```xml
<dependency>
    <groupId>cn.itcast.demo</groupId>
    <artifactId>feign-api</artifactId>
    <version>1.0</version>
</dependency>
```

修改order-service中的所有与上述三个组件有关的导包部分，改成导入feign-api中的包

##### 3）重启测试

重启后，发现服务报错了：无法注入UserClient对象

这是因为UserClient现在在cn.itcast.feign.clients包下，
而order-service的@EnableFeignClients注解是在cn.itcast.order包下，**不在同一个包，无法扫描到UserClient**

##### 4）解决扫描包问题

方式一（批量扫描）：

指定Feign应该扫描的包：

```java
@EnableFeignClients(basePackages = "cn.itcast.feign.clients")
```

方式二（精准定位，推荐）：

**指定需要加载的Client接口：**

```java
@EnableFeignClients(clients = {UserClient.class})
```

## 9、Gateway服务网关

Spring Cloud Gateway 是 Spring Cloud 的一个全新项目，该项目是基于 Spring 5.0，Spring Boot 2.0 和 Project Reactor 等响应式编程和事件流技术开发的网关，它旨在为微服务架构提供一种简单有效的统一的 API 路由管理方式。

### 9.1、为什么需要网关

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210714210131152.png)

**网关功能：**

- **权限控制**：网关作为微服务入口，需要校验用户是是否有请求资格，如果没有则进行拦截。

- **路由和负载均衡**：一切请求都必须先经过gateway，但网关不处理业务，而是根据某种规则，把请求转发到某个微服务，这个过程叫做路由。当然路由的目标服务有多个时，还需要做负载均衡。

- **限流**：当请求流量过高时，在网关中按照下流的微服务能够接受的速度来放行请求，避免服务压力过大。

在SpringCloud中网关的实现包括两种：

- gatewat
- zuul

Zuul是基于Servlet的实现，属于阻塞式编程。而**SpringCloudGateway**则是基于Spring5中提供的WebFlux，属于响应式编程的实现，具备更好的性能。

### 9.2、gateway快速入门

搭建网关服务的步骤：

#### 1）创建新的module，引入依赖

引入SpringCloudGateway的依赖和nacos的服务发现依赖：

```xml
<!--网关依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<!--nacos服务发现依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

#### 2）编写启动类

```java
package cn.itcast.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
}
```

#### 3）编写路由配置及nacos地址

创建application.yml文件，内容如下：

```yml
server:
  port: 10010 # 网关端口
spring:
  application:
    name: gateway # 服务名称
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
    gateway:
      routes: # 网关路由配置
        - id: user-service # 路由id，自定义，只要唯一即可
          # uri: http://127.0.0.1:8081 # 路由的目标地址 http就是固定地址
          uri: lb://userservice # 路由的目标地址 lb（loadbalance）就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/user/** # 这个是按照路径匹配，只要以/user/开头就符合要求
```

**将符合`Path` 规则的一切请求，都代理到 `uri`参数指定的地址**

本例中，我们将 `/user/**`开头的请求，代理到`lb://userservice`，lb是负载均衡，根据服务名拉取服务列表，实现负载均衡。

#### 4）网关路由的流程图

整个访问的流程如下：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210714211742956.png)

总结：

网关搭建步骤：

1. 创建项目，引入nacos服务发现和gateway依赖

2. 配置application.yml，包括服务基本信息、nacos地址、路由

路由配置包括：

1. 路由id：路由的唯一标示

2. 路由目标（uri）：路由的目标地址，http代表固定地址，lb代表根据服务名负载均衡

3. 路由断言（predicates）：判断路由的规则，

4. 路由过滤器（filters）：对请求或响应做处理

### 9.3、断言工厂

我们在配置文件中写的断言规则只是字符串，这些字符串会被Predicate Factory读取并处理，转变为路由判断的条件

例如Path=/user/**是按照路径匹配，这个规则是由`org.springframework.cloud.gateway.handler.predicate.PathRoutePredicateFactory`类来
处理的，像这样的断言工厂在SpringCloudGateway还有十几个:

| **名称**   | **说明**                       | **示例**                                                     |
| ---------- | ------------------------------ | ------------------------------------------------------------ |
| After      | 是某个时间点后的请求           | -  After=2037-01-20T17:42:47.789-07:00[America/Denver]       |
| Before     | 是某个时间点之前的请求         | -  Before=2031-04-13T15:14:47.433+08:00[Asia/Shanghai]       |
| Between    | 是某两个时间点之前的请求       | -  Between=2037-01-20T17:42:47.789-07:00[America/Denver],  2037-01-21T17:42:47.789-07:00[America/Denver] |
| Cookie     | 请求必须包含某些cookie         | - Cookie=chocolate, ch.p                                     |
| Header     | 请求必须包含某些header         | - Header=X-Request-Id, \d+                                   |
| Host       | 请求必须是访问某个host（域名） | -  Host=**.somehost.org,**.anotherhost.org                   |
| Method     | 请求方式必须是指定方式         | - Method=GET,POST                                            |
| **Path**   | 请求路径必须符合指定规则       | - Path=/red/{segment},/blue/**                               |
| Query      | 请求参数必须包含指定参数       | - Query=name, Jack或者-  Query=name                          |
| RemoteAddr | 请求者的ip必须是指定范围       | - RemoteAddr=192.168.1.1/24                                  |
| Weight     | 权重处理                       |                                                              |

### 9.4、路由过滤器GateFilter

GatewayFilter是网关中提供的一种过滤器，可以对进入网关的请求和微服务返回的响应做处理：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210714212312871.png)

过滤器的作用：
① 对路由的请求或响应做加工处理，比如添加请求头
② 配置在路由下的过滤器只对当前路由的请求生效

defaultFilters的作用：
① 对所有路由都生效的过滤器

#### 9.4.1、路由过滤器的种类

Spring提供了31种不同的路由过滤器工厂。例如：

| **名称**             | **说明**                     |
| -------------------- | ---------------------------- |
| AddRequestHeader     | 给当前请求添加一个请求头     |
| RemoveRequestHeader  | 移除请求中的一个请求头       |
| AddResponseHeader    | 给响应结果中添加一个响应头   |
| RemoveResponseHeader | 从响应结果中移除有一个响应头 |
| RequestRateLimiter   | 限制请求的流量               |

#### 9.4.2、请求头过滤器

以AddRequestHeader 为例：

> 需求：给所有进入userservice的请求添加一个请求头：Truth=itcast is freaking awesome!

只需要修改gateway服务的application.yml文件，添加路由过滤即可：

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: user-service 
        uri: lb://userservice 
        predicates: 
        - Path=/user/** 
        filters: # 过滤器
        - AddRequestHeader=Truth, Itcast is freaking awesome! # 添加请求头
```

当前过滤器写在userservice路由下，因此**仅仅对访问userservice的请求有效**。

#### 9.4.3、默认过滤器

如果要对所有的路由都生效，则可以将过滤器工厂写到default下。格式如下：

```yml
spring:
  cloud:
    gateway:
      routes:
      - id: user-service 
        uri: lb://userservice 
        predicates: 
        - Path=/user/**
      default-filters: # 默认过滤项
      - AddRequestHeader=Truth, Itcast is freaking awesome! 
```

### 9.5、全局过滤器

#### 9.5.1.全局过滤器作用

全局过滤器是处理一切进入网关的请求和微服务响应，与GatewayFilter的作用一样

它与GatewayFilter的区别：
GatewayFilter通过配置定义，处理逻辑是固定的。而GlobalFilter的逻辑需要自己写代码实现
（即复杂的逻辑可以自定义实现）

全局过滤器定义方式是**实现GlobalFilter接口**。

```java
public interface GlobalFilter {
    /**
     *  处理当前请求，有必要的话通过{@link GatewayFilterChain}将请求交给下一个过滤器处理
     *
     * @param exchange 请求上下文，里面可以获取Request、Response等信息
     * @param chain 用来把请求委托给下一个过滤器 
     * @return {@code Mono<Void>} 返回标示当前过滤器业务结束
     */
    Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain);
}
```

在filter中编写自定义逻辑，可以实现下列功能：
	登录状态判断、权限校验、请求限流等

#### 9.5.2、自定义全局过滤器

需求：定义全局过滤器，拦截请求，判断请求的参数是否满足下面条件：
	① 参数中是否有authorization
	② authorization参数值是否为admin
如果同时满足则放行，否则拦截

实现：
在gateway中定义一个过滤器：

```java
package cn.itcast.gateway.filters;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Order(-1) //过滤器的顺序，数字越小，优先级越高
@Component
public class AuthorizeFilter implements GlobalFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 1.获取请求参数
        MultiValueMap<String, String> params = exchange.getRequest().getQueryParams();
        // 2.获取authorization参数
        String auth = params.getFirst("authorization");
        // 3.校验
        if ("admin".equals(auth)) {
            // 放行
            return chain.filter(exchange);
        }
        // 4.拦截
        // 4.1.禁止访问，设置状态码
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED); //状态码401，表示未登录
        // 4.2.结束处理
        return exchange.getResponse().setComplete();
    }
}
```

#### 9.5.3、过滤器执行顺序

请求进入网关会碰到三类过滤器：当前路由的过滤器、DefaultFilter、GlobalFilter

***请求路由后***，会将**当前路由过滤器和DefaultFilter，GLobalFilter**合并到一个**过滤器链**（集合）中，排序后依此执行每个过滤器

***排序的规则***：

- 每一个过滤器都必须指定一个int类型的order值，**order值越小，优先级越高，执行顺序越靠前**。
- GlobalFilter通过实现Ordered接口，或者添加@Order注解来指定order值，由我们自己指定
- 路由过滤器和defaultFilter的order**由Spring指定**，默认是**按照声明顺序从1递增**。（路由过滤器和defaultFilter分开计算）
- 当过滤器的**order值一样时**，会按照 **defaultFilter > 路由过滤器 > GlobalFilter**的顺序执行。

### 9.6.跨域问题

#### 9.6.1.什么是跨域问题

跨域：用于限制一个网页或应用程序的访问另一个源（网域）的资源，域名不一致就是跨域，主要包括：

- 域名不同： www.taobao.com 和 www.taobao.org 和 www.jd.com 和 miaosha.jd.com

- 域名相同，端口不同：localhost:8080和localhost8081

跨域问题：浏览器禁止请求的发起者与服务端发生跨域ajax请求，请求被浏览器拦截的问题

解决方案：CORS，可以查看https://www.ruanyifeng.com/blog/2016/04/cors.html

#### 9.6.2.解决跨域问题

比如：从localhost:8090访问localhost:10010，端口不同，显然是跨域的请求。

在gateway服务的application.yml文件中，添加下面的配置：

```yml
spring:
  cloud:
    gateway:
      globalcors: # 全局的跨域处理
        add-to-simple-url-handler-mapping: true # 解决options请求被拦截问题
        corsConfigurations:
          '[/**]':
            allowedOrigins: # 允许哪些网站的跨域请求 
              - "http://localhost:8090"
            allowedMethods: # 允许的跨域ajax的请求方式
              - "GET"
              - "POST"
              - "DELETE"
              - "PUT"
              - "OPTIONS"
            allowedHeaders: "*" # 允许在请求中携带的头信息
            allowCredentials: true # 是否允许携带cookie
            maxAge: 360000 # 这次跨域检测的有效期
```

