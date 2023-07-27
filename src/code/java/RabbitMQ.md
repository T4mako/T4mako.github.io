---
title: RabbitMQ 基础
icon: article
order: 14
category: 
    - java
tag: 
    - 消息队列
    - java
---
## RabbitMQ

## 1.初识MQ

### 1.1、同步和异步通讯

微服务间通讯有同步和异步两种方式：
	**同步通讯**：就像打电话，需要实时响应。
	**异步通讯**：就像发邮件，不需要马上回复。
<!-- more -->
两种方式各有优劣，打电话可以立即得到响应，但是你却不能跟多个人同时通话。发送邮件可以同时与多个人收发邮件，但是往往响应会有延迟。

#### 1.1.1、同步通讯

同步调用的优点：
	时效性较强，可以立即得到结果

同步调用的问题：
	耦合度高
	性能和吞吐能力下降
	有额外的资源消耗
	有级联失败问题

#### 1.1.2、异步通讯

异步调用常见实现就是**时间驱动模式**

异步调用则可以避免上述问题

在事件模式中，支付服务是**事件发布者**（publisher），在支付完成后只需要发布一个支付成功的事件（event），事件中带上订单id。
订单服务和物流服务是**事件订阅者**（Consumer），订阅支付成功的事件，监听到事件后完成自己业务即可。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210422095356088.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230327150410.png)

解除事件发布者与订阅者之间的耦合，两者并不是直接通信，而是有一个**中间人（Broker）**。发布者发布事件到Broker，不关心谁来订阅事件。订阅者从Broker订阅事件，不关心谁发来的消息。

好处：

- 吞吐量提升：无需等待订阅者处理完成，响应更快速

- 故障隔离：服务没有直接调用，不存在级联失败问题
- 调用间没有阻塞，不会造成无效的资源占用
- 耦合度极低，每个服务都可以灵活插拔，可替换
- 流量削峰：不管发布事件的流量波动多大，都由Broker接收，订阅者可以按照自己的速度去处理事件

缺点：

- 架构复杂了，业务没有明显的流程线，不好管理
- 需要依赖于Broker的可靠、安全、性能

### 1.2、技术对比

**MQ**，中文是**消息队列（MessageQueue）**，字面来看就是**存放消息的队列**。也就是**事件驱动架构中的Broker**。

比较常见的MQ实现：
ActiveMQ、RabbitMQ、RocketMQ、Kafka

几种常见MQ的对比：

|            | **RabbitMQ**            | **ActiveMQ**                   | **RocketMQ** | **Kafka**  |
| ---------- | ----------------------- | ------------------------------ | ------------ | ---------- |
| 公司/社区  | Rabbit                  | Apache                         | 阿里         | Apache     |
| 开发语言   | Erlang                  | Java                           | Java         | Scala&Java |
| 协议支持   | AMQP，XMPP，SMTP，STOMP | OpenWire,STOMP，REST,XMPP,AMQP | 自定义协议   | 自定义协议 |
| 可用性     | 高                      | 一般                           | 高           | 高         |
| 单机吞吐量 | 一般                    | 差                             | 高           | 非常高     |
| 消息延迟   | 微秒级                  | 毫秒级                         | 毫秒级       | 毫秒以内   |
| 消息可靠性 | 高                      | 一般                           | 高           | 一般       |

## 2、RabbitMQ入门

### 2.1、安装RabbitMQ

#### 2.1.1、单机部署

在Centos7虚拟机中使用Docker来安装。

##### 1）下载镜像

方式一：在线拉取

``` sh
docker pull rabbitmq:3-management
```

方式二：从本地加载

在课前资料已经提供了镜像包，上传到虚拟机（/tmp）后，使用命令加载镜像即可

```sh
docker load -i mq.tar
```

##### 2）安装MQ

运行MQ容器：

```sh
docker run \
 -e RABBITMQ_DEFAULT_USER=root \ #用户名
 -e RABBITMQ_DEFAULT_PASS=root \ #密码
 --name mq \ #容器名
 --hostname mq1 \ #集群主机名
 -p 15672:15672 \ #图形界面端口
 -p 5672:5672 \ #消息队列端口
 -d \
 rabbitmq:3-management #镜像名称
```

```sh
docker run \
 -e RABBITMQ_DEFAULT_USER=root \ 
 -e RABBITMQ_DEFAULT_PASS=root \ 
 --name mq \ 
 --hostname mq1 \ 
 -p 15672:15672 \ 
 -p 5672:5672 \ 
 -d \
 rabbitmq:3-management
```

浏览器输入http://192.168.80.130:15672进行访问图形界面

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230327170357.png)

RabbitMQ中的几个概念：
	channel：操作MQ的工具
	exchenge：路由消息到队列
	queue：缓存消息
	virtual host：虚拟主机，对queue、exchange等资源的逻辑分组（不同的路径代表不同用户）

MQ的基本结构：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230327170223.png)

#### 2.1.2、集群部署

##### 1）集群分类

在RabbitMQ的官方文档中，讲述了两种集群的配置方式：

- 普通模式：普通模式集群不进行数据同步，每个MQ都有自己的队列、数据信息（其它元数据信息如交换机等会同步）。例如我们有2个MQ：mq1，和mq2，如果你的消息在mq1，而你连接到了mq2，那么mq2会去mq1拉取消息，然后返回给你。如果mq1宕机，消息就会丢失。
- 镜像模式：与普通模式不同，队列会在各个mq的镜像节点之间同步，因此你连接到任何一个镜像节点，均可获取到消息。而且如果一个节点宕机，并不会导致数据丢失。不过，这种方式增加了数据同步的带宽消耗。

##### 2）设置网络

首先，我们需要让3台MQ互相知道对方的存在。

分别在3台机器中，设置 /etc/hosts文件，添加如下内容：

```
192.168.150.101 mq1
192.168.150.102 mq2
192.168.150.103 mq3
```

并在每台机器上测试，是否可以ping通对方

### 2.2、RabbitMQ消息模型

[RabbitMQ](https://www.rabbitmq.com/getstarted.html)官方提供了5个不同的Demo示例，对应了不同的用法：

没有交换机：
	基本消息队列（BasicQueue）
	工作消息队列（WorkQueue）

发布订阅（Publish、Subscribe），又根据交换机类型不同分为三种（有交换机）：
	Fanout Exchange：广播
	Direct Exchange：路由
	Topic Exchange：主题

![image-20230327172104202](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230327172104202.png)

### 2.3、HelloWorld案例

官方的HelloWorld是基于最基础的消息队列模型来实现的，只包括三个角色：
publisher：消息发布者，将消息发送到queue
queue：消息队列，负责接受并缓存消息
consumer：订阅列表，处理队列中的消息

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230327172429.png)

导入Demo工程：
将资料中的mq-demo导入idea，导入后的结构如下：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230327192106.png)

包括三部分：
	mq-demo：父工程，管理项目依赖
	publisher：消息的发送者
	consumer：消息的消费者

官方的HelloWorld是基于最基础的消息队列模型来实现的，只包括三个角色：
	publisher：消息发布者，将消息发送到队列queue
	queue：消息队列，负责接受并缓存消息
	consumer：订阅队列，处理队列中的消息

### 2.4、publisher实现

代码思路：建立连接、创建Channel、声明队列、发送消息、关闭连接和channel

代码实现：

```java
public class PublisherTest {
    @Test
    public void testSendMessage() throws IOException, TimeoutException {
        // 1.建立连接
        ConnectionFactory factory = new ConnectionFactory();
        // 1.1.设置连接参数，分别是：主机名、端口号、vhost、用户名、密码
        factory.setHost("192.168.80.130");
        factory.setPort(5672);
        factory.setVirtualHost("/"); //设置虚拟主机
        factory.setUsername("root");
        factory.setPassword("root");
        // 1.2.建立连接
        Connection connection = factory.newConnection();

        // 2.创建通道Channel
        Channel channel = connection.createChannel();

        // 3.创建队列
        String queueName = "simple.queue";
        channel.queueDeclare(queueName, false, false, false, null);

        // 4.发送消息
        String message = "hello, rabbitmq!";
        channel.basicPublish("", queueName, null, message.getBytes());
        System.out.println("发送消息成功：【" + message + "】");

        // 5.关闭通道和连接
        channel.close();
        connection.close();
    }
}
```

### 2.5、consumer实现

代码思路：建立连接、创建Channel、声明队列、订阅消息

```java
public class ConsumerTest {

    public static void main(String[] args) throws IOException, TimeoutException {
        // 1.建立连接
        ConnectionFactory factory = new ConnectionFactory();
        // 1.1.设置连接参数，分别是：主机名、端口号、vhost、用户名、密码
        factory.setHost("192.168.80.130");
        factory.setPort(5672);
        factory.setVirtualHost("/");
        factory.setUsername("root");
        factory.setPassword("root");
        // 1.2.建立连接
        Connection connection = factory.newConnection();

        // 2.创建通道Channel
        Channel channel = connection.createChannel();

        // 3.创建队列
        String queueName = "simple.queue";
        channel.queueDeclare(queueName, false, false, false, null);

        // 4.订阅消息
        channel.basicConsume(queueName, true, new DefaultConsumer(channel){
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope,
                                       AMQP.BasicProperties properties, byte[] body) throws IOException {
                // 5.处理消息
                String message = new String(body);
                System.out.println("接收到消息：【" + message + "】");
            }
        });
        System.out.println("等待接收消息。。。。");
    }
}
```

### 2.6、总结

基本消息队列的消息发送流程：

1. 建立connection

2. 创建channel

3. 利用channel声明队列

4. 利用channel向队列发送消息

基本消息队列的消息接收流程：

1. 建立connection

2. 创建channel

3. 利用channel声明队列

4. 定义consumer的消费行为handleDelivery()

5. 利用channel将消费者与队列绑定

## 3、SpringAMQP

AMQP（Advanced Message Queuing Protocol）高级消息队列协议，是用于在应用程序之间传递业务消息的开放标准。该协议与语言和平台无关，更符合微服务中独立性的要求。

[SpringAMQP](https://spring.io/projects/spring-amqp)是基于RabbitMQ封装的一套模板，并且还利用SpringBoot对其实现了自动装配，使用起来非常方便。

SpringAMQP提供了三个功能：

- 自动声明队列、交换机及其绑定关系
- 基于注解的监听器模式，异步接收消息
- 封装了RabbitTemplate工具，用于发送消息 

### 3.1、Basic Queue

利用SpringAMQP实现HelloWorld中的基本消息队列功能

流程如下：
1、在父工程中引入spring-amqp的依赖
2、在publisher服务中利用RabbitTemplate发送消息到simple.queue这个队列
3、在consumer服务中编写消费逻辑，绑定simple.queue这个队列

#### 3.1.1、引入依赖

在父工程mq-demo中引入依赖：

```xml
<!--AMQP依赖，包含RabbitMQ-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

#### 3.1.2、消息发送

首先配置MQ地址，在**publisher**服务的**application.yml**中添加配置：

```yml
spring:
  rabbitmq:
    host: 192.168.80.130 # 主机名
    port: 5672 # 端口
    virtual-host: / # 虚拟主机
    username: root # 用户名
    password: root # 密码
```

在publisher服务中编写测试类SpringAmqpTest，并利用RabbitTemplate实现消息发送：

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringAmqpTest {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testSimpleQueue() {
        // 队列名称
        String queueName = "simple.queue";
        // 消息
        String message = "hello, spring amqp!";
        // 发送消息
        rabbitTemplate.convertAndSend(queueName, message);
    }
}
```

#### 3.1.2、消息接收

首先配置MQ地址，在consumer服务的application.yml中添加配置：

```yml
spring:
  rabbitmq:
    host: 192.168.80.130 # 主机名
    port: 5672 # 端口
    virtual-host: / # 虚拟主机
    username: root # 用户名
    password: root # 密码
```

然后在consumer服务的`cn.itcast.mq.listener`包中新建一个类SpringRabbitListener类，代码如下：

```java
package cn.itcast.mq.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class SpringRabbitListener {

    @RabbitListener(queues = "simple.queue") //声明队列名称
    public void listenSimpleQueueMessage(String msg) throws InterruptedException {
        System.out.println("spring 消费者接收到消息：【" + msg + "】");
    }
}
```

### 3.2、Work Queue

**Work queues**，也被称为（Task queues），**任务模型**。单来说就是**让多个消费者绑定到一个队列，共同消费队列中的消息**。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230328143733.png)

当消息处理比较耗时的时候，可能生产消息的速度会远远大于消息的消费速度。长此以往，消息就会堆积越来越多，无法及时处理。
此时就可以使用work 模型，**多个消费者共同处理消息**处理，**速度**就能大大**提高**了。

#### 3.2.1、消息发送

循环发送，模拟大量消息堆积
在publisher服务中的SpringAmqpTest类中添加一个测试方法：

```java
@Test
public void testSendMessage2WorkQueue() throws InterruptedException {
    String queueName = "simple.queue";
    String message = "hello, message__";
    for (int i = 1; i <= 50; i++) {
        rabbitTemplate.convertAndSend(queueName, message + i);
        Thread.sleep(20);
    }
}
```

#### 3.2.2、消息接收

模拟多个消费者绑定同一个队列，我们在consumer服务的SpringRabbitListener中添加2个新的方法：

```java
@RabbitListener(queues = "simple.queue")
public void listenWorkQueue1(String msg) throws InterruptedException {
    System.out.println("消费者1接收到消息：【" + msg + "】" + LocalTime.now());
    Thread.sleep(20);
}

@RabbitListener(queues = "simple.queue")
public void listenWorkQueue2(String msg) throws InterruptedException {
    System.err.println("消费者2........接收到消息：【" + msg + "】" + LocalTime.now());
    Thread.sleep(200);
}
```

#### 3.2.4、能者多劳

启动ConsumerApplication后，可以看到消费者1很快完成了自己的25条消息。消费者2却在缓慢的处理自己的25条消息。
也就是说消息是平均分配给每个消费者，并**没有考虑到消费者的处理能力**。这样显然是有问题的。

在spring中有一个简单的配置，可以解决这个问题。我们修改consumer服务的application.yml文件，添加配置：

```yml
spring:
  rabbitmq:
    listener:
      simple:
        prefetch: 1 # 每次只能获取一条消息，处理完成才能获取下一个消息
```

#### 总结

Work模型的使用：
	**多个消费者绑定到一个队列**，同一条消息只会被一个消费者处理
	通过**设置prefetch**来控制消费者预取的消息数量

### 3.3、发布/订阅

发布订阅模式与之前案例的区别：允许将一个消息发送给多个消费者。实现方式加入了exchange（交换机）

发布订阅的模型如图：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230328182402.png)

常见的exchange包括：
	Fanout 广播： 将消息交给所有绑定到交换机的队列
	Direct 定向： 把消息交给符合指定routing key 的队列
	Topic 通配符： 把消息交给符合routing pattern（路由模式） 的队列

**不同类型的交换机，路由方式不同**

> **注意：exchange负责消息路由，而部署存储，路由失败则消息失败**

### 3.4、Fanout Exchange

Fanout Exchange会将接收到的消息**路由到每一个跟其绑定的queue**

利用SpringAMQP演示FanoutExchange的使用：
实现思路如下：
	1、consumer服务中，利用代码声明队列，并将队列与交换机绑定
	2、consumer服务中，编写两个消费者方法，分析监听fanout.queue1和fanout.queue2两个队列
	3、在publisher中编写测试方法，向itcast.fanout发送消息

![image-20230328183449340](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230328183449340.png)

#### 3.4.1、声明队列和交换机

在consumer服务声明Exchange、Queue、Binding

Spring提供了一个接口Exchange，来表示所有不同类型的交换机：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230328183548.png)

在consumer服务中创建一个类，添加@configuration注解，并声明FanoutExchange、Queue和绑定关系队形Binding

```java
package cn.itcast.mq.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FanoutConfig {
    /**
     * 声明交换机
     * @return Fanout类型交换机
     */
    @Bean
    public FanoutExchange fanoutExchange(){
        return new FanoutExchange("itcast.fanout");
    }

    /**
     * 第1个队列
     */
    @Bean
    public Queue fanoutQueue1(){
        return new Queue("fanout.queue1");
    }

    /**
     * 绑定队列和交换机
     */
    @Bean
    public Binding bindingQueue1(Queue fanoutQueue1, FanoutExchange fanoutExchange){
        return BindingBuilder.bind(fanoutQueue1).to(fanoutExchange);
    }

    /**
     * 第2个队列
     */
    @Bean
    public Queue fanoutQueue2(){
        return new Queue("fanout.queue2");
    }

    /**
     * 绑定队列和交换机
     */
    @Bean
    public Binding bindingQueue2(Queue fanoutQueue2, FanoutExchange fanoutExchange){
        return BindingBuilder.bind(fanoutQueue2).to(fanoutExchange);
    }
}
```

#### 3.4.2、消息发送

在publisher服务的SpringAmqpTest类中添加测试方法：

```java
@Test
public void testFanoutExchange() {
    // 队列名称
    String exchangeName = "itcast.fanout";
    // 消息
    String message = "hello, everyone!";
    rabbitTemplate.convertAndSend(exchangeName, "", message);
}
```

#### 3.4.3、消息接收

在consumer服务的SpringRabbitListener中添加两个方法，作为消费者：

```java
@RabbitListener(queues = "fanout.queue1")
public void listenFanoutQueue1(String msg) {
    System.out.println("消费者1接收到Fanout消息：【" + msg + "】");
}

@RabbitListener(queues = "fanout.queue2")
public void listenFanoutQueue2(String msg) {
    System.out.println("消费者2接收到Fanout消息：【" + msg + "】");
}
```

#### 3.4.4、总结

交换机的作用：
	接收publisher发送的消息
	将消息按照规则路由到与之绑定的队列
	不能缓存消息，路由失败，消息丢失
	FanoutExchange的会将消息路由到每个绑定的队列

声明队列、交换机、绑定关系的Bean是什么？
	Queue
	FanoutExchange
	Binding

### 3.5、Direct Exchange

Direct Exchange会将接收到的消息根据规则**路由到指定的Queue**，因此称为路由模式（routes）

每一个Queue都与Exchange设置一个BindingKey
发布者发送消息时，指定消息的RoutingKey
Exchange将消息路由到BIndkey与消息RoutingKey一致的队列

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230328194337.png)

案例：

1. 利用@RabbitListener声明Exchange、Queue、RoutingKey
2. 在consumer服务中，编写两个消费者方法，分别监听direct.queue1和direct.queue2
3. 在publisher中编写测试方法，向itcast. direct发送消息

实现思路如下：
1、利用@RabbitListener声明Exchange、Queue、RoutingKey
2、在consumer服务中，编写两个测试方法，向itcast.direct发送消息
3、在publisher中编写测试方法，向itcast.direct发送消息

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230328194553.png)



#### 3.5.1、基于注解声明队列和交换机

基于@Bean的方式声明队列和交换机比较麻烦，Spring还提供了**基于注解方式声明**。

在consumer的SpringRabbitListener中**添加两个消费者**，**同时**基于注解来**声明队列和交换机**：

```java
@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "direct.queue1"),
    exchange = @Exchange(name = "itcast.direct", type = ExchangeTypes.DIRECT),
    key = {"red", "blue"}
))
public void listenDirectQueue1(String msg){
    System.out.println("消费者接收到direct.queue1的消息：【" + msg + "】");
}

@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "direct.queue2"),
    exchange = @Exchange(name = "itcast.direct", type = ExchangeTypes.DIRECT),
    key = {"red", "yellow"}
))
public void listenDirectQueue2(String msg){
    System.out.println("消费者接收到direct.queue2的消息：【" + msg + "】");
}
```

#### 3.5.2、消息发送

```java
@Test
public void testSendDirectExchange() {
    // 交换机名称
    String exchangeName = "itcast.direct";
    // 消息
    String message = "msg";
    // 发送消息
    rabbitTemplate.convertAndSend(exchangeName, "red", message);
}
```

### 3.6、Topic Exchange

Topic Exchange与DirectExchange类似，区别在于**routingKey**必须是**多个单词列表**，并且以  **.**   分割，例如： `item.insert`

Queue与Exchange指定BindingKey时可以使用**通配符**：
#：代指0个或多个单词
*：代指一个单词

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230328200530.png)

案例需求：

实现思路如下：
1、利用@RabbitListener声明Exchange、Queue、RoutingKey
2、在consumer服务中，编写两个消费者方法，分别监听topic.queue1和topic.queue2
3、在publisher中编写测试方法，向itcast. topic发送消息

#### 3.6.2、消息发送

在publisher服务的SpringAmqpTest类中添加测试方法：

```java
@Test
public void testSendTopicExchange() {
    // 交换机名称
    String exchangeName = "itcast.topic";
    // 消息
    String message = "msg";
    // 发送消息
    rabbitTemplate.convertAndSend(exchangeName, "china.news", message);
}
```

#### 3.6.3、消息接收

在consumer服务的SpringRabbitListener中添加方法：

```java
@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "topic.queue1"),
    exchange = @Exchange(name = "itcast.topic", type = ExchangeTypes.TOPIC),
    key = "china.#"
))
public void listenTopicQueue1(String msg){
    System.out.println("消费者接收到topic.queue1的消息：【" + msg + "】");
}

@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "topic.queue2"),
    exchange = @Exchange(name = "itcast.topic", type = ExchangeTypes.TOPIC),
    key = "#.news"
))
public void listenTopicQueue2(String msg){
    System.out.println("消费者接收到topic.queue2的消息：【" + msg + "】");
}
```

### 3.7、消息转换器

Spring会把**发送的消息序列化为字节**发送给MQ，**接收**消息的时候，还会**把字节反序列化为Java对象**。

默认情况下Spring采用的序列化方式是JDK序列化。众所周知，JDK序列化存在下列问题：

- **数据体积过大**
- **有安全漏洞**
- **可读性差**

#### 3.7.1、测试默认转换器

修改消息发送的代码，发送一个Map对象：

```java
@Test
public void testSendMap() throws InterruptedException {
    // 准备消息
    Map<String,Object> msg = new HashMap<>();
    msg.put("name", "Jack");
    msg.put("age", 21);
    // 发送消息
    rabbitTemplate.convertAndSend("simple.queue","", msg);
}
```

发送消息后查看控制台：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230328201619.png)

#### 3.7.2、配置JSON转换器

DK序列化方式并不合适。我们希望消息体的体积更小、可读性更高，因此**可以使用JSON方式来做序列化和反序列化**。

在publisher和consumer两个服务中都引入依赖：

```xml
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
    <version>2.9.10</version>
</dependency>
```

**配置消息转换器：**
在**启动类**中添加一个Bean即可：

```java
@Bean
public MessageConverter jsonMessageConverter(){
    return new Jackson2JsonMessageConverter();
}
```

