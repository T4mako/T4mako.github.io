---
title: SpringBoot 基础
icon: leaf
order: 11
category: 
    - java
tag: 
    - Spring
    - java
    - SpringBoot
---
## 1、Spring与SpringBoot

Spring的生态：web开发、数据访问、安全控制、分布式、消息服务、移动开发、批处理、......
Spring5重大升级：响应式编程、响应式编程
<!-- more -->
SpringBoot优点：创建独立Spring应用、内嵌web服务器、自动starter依赖，简化构建配置、自动配置Spring以及第三方功能、提供生产级别的监控、健康检查及外部化配置、无代码生成、无需编写XML
SpringBoot缺点：称版本帝，迭代快，需要时刻关注变化、封装太深，内部原理复杂，不容易精通

时代背景：
	**微服务：**
		微服务是一种架构风格
		一个应用拆分为一组小型服务
		每个服务运行在自己的进程内，也就是可独立部署和升级
		服务之间使用轻量级HTTP交互
		服务围绕业务功能拆分
		可以由全自动部署机制独立部署
		去中心化，服务自治。服务可以使用不同的语言、不同的存储技术
	**分布式	**
	**云原生**

**[springboot的官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/documentation.html#documentation)**

## 2、SpringBoot2入门

### 1、创建maven工程引入依赖

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.4.RELEASE</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

### 2、创建主程序

```JAVA
/**
 * 主程序类
 * @SpringBootApplication：这是一个SpringBoot应用
 */
@SpringBootApplication
public class MainApplication {
    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class,args);
    }
}
```

### 3、编写业务

```java
@RestController //responsebody + controller
public class HelloController {
    @RequestMapping("/hello")
    public String handle01(){
        return "Hello, Spring Boot 2!";
    }
}
```

### 4、测试

**直接运行main方法**

### 5、简化配置

在 resources 中创建 **application.properties**

```properties
server.port=8888
```

### 6、简化部署

如果添加插件启动时报错，可以尝试在`<plugin>`标签内部添加设置版本号的version标签，版本号要与Spring版本号一致

在pom.xml中添加：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>2.3.4.RELEASE</version>
        </plugin>
    </plugins>
</build>
```

把项目打成 **jar 包**，直接在目标服务器执行即可。

注意点：
	有的时候cmd命令启动不了springboot项目，可能是因为在属性中开启了【快速编辑模式】，取消方法：右击cmd控制台的窗口上方标题区域打开【选项】取消勾选【快去编辑模式】

## 3、了解自动配置原理

### 1、SpringBoot特点

#### 1、依赖管理

##### ① 父项目做依赖管理

**在父工程中统一管理项目中的依赖信息，具体来说是管理依赖信息的版本。**

```xml
<!--父项目的父项目-->
<!--其中几乎声明了所有开发中常用的依赖的 版本号 ,自动版本仲裁机制-->
 <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.3.4.RELEASE</version>
</parent>

<!--依赖管理-->    
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.4.RELEASE</version>
</parent>
```

**可以修改默认版本号**

```xml
<!--1、查看spring-boot-dependencies里面规定当前依赖的版本 用的 key。
	2、在 当前 项目里面重写配置-->
<properties>
    <mysql.version>5.1.43</mysql.version>
</properties>
```

##### ②starter场景启动器

1、**spring-boot-starter-\*** ： *就某种场景（**官方starter**）
2、只要引入 **starter**，这个场景的所有常规需要的 **依赖** 都 **自动引入**
3、SpringBoot所有支持的场景
https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter
4、见到的 **\*-spring-boot-starter**： **第三方starter**为我们提供的简化开发的场景启动器。
5、所有 **场景启动器** **最底层的依赖**:

```xml
<!--所有场景启动器最底层的依赖-->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter</artifactId>
  <version>2.3.4.RELEASE</version>
  <scope>compile</scope>
</dependency>
```

注：无需关注版本号，自动版本仲裁:
	1、引入依赖默认都可以不写版本
	2、引入非版本仲裁的jar，要写版本号。

#### 2、自动配置

##### 1、自动配好Tomcat

​	引入Tomcat依赖
​	配置Tomcat

```xml
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-tomcat</artifactId>
      <version>2.3.4.RELEASE</version>
      <scope>compile</scope>
</dependency>
```

##### 2、自动配好SpringMVC

​	引入 SpringMVC 全套组件
​	自动配好 SpringMVC 常用组件（功能）

##### 3、自动配好Web常见功能，如：字符编码问题

​	SpringBoot 帮我们配置好了所有 web 开发的常见场景
​		*字符过滤器* 等

##### 4、默认的包扫描

**主程序所在包 **及其下面的所有 **子包** 里面的组件都会被默认扫描进来
**无需以前的包扫描配置**

*想要改变扫描路径*，在 MainApplication上添加
**@SpringBootApplication(scanBasePackages="com.t4mako")** 或者 **@ComponentScan指定扫描路径**

```java
@SpringBootApplication
等同于
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.t4mako.boot")
```

##### 5、各种配置拥有默认值

默认配置最终都是映射到某个类上，（MultipartProperties类）
配置文件的值（**application.properties**）最终会 **绑定每个类上**，这个类会在容器中创建对象

##### 6、按需加载所有自动配置项

非常多的 starter
**引入了哪些场景** 这个场景的 **自动配置才会被开启**
SpringBoot 的 **所有自动配置功能** 都在 **spring-boot-autoconfigur包** 里面（不一定都生效）

### 2、容器功能(关键注解-重要)

==spring boot 项目默认会扫描主类同级的包==

#### 1、组件相关

##### 1、@Configuration

**@Configuration **==告诉SpringBoot这是一个**配置类 == 配置文件（创建bean）**==
**在类上添加 Configration 类似于 Spring 中的 beans.xml**
**标注了@Configuration 注解的类本身也是一个组件**

参数 proxyBeanMethods：
	**true(默认)：单实例
	false：（类、方法）被调用时返回是新创建的**

在类**方法**中添加**@Bean**注解：
		==Id = 方法名，容器中的实例 = 返回的值==

**Full(true)模式** 与 **Lite(false)模式**：
**配置类 **组件之间 **无依赖关系**（没有相互调用）用Lite模式加速容器启动过程，减少判断 **false**
**配置类 **组件之间 **有依赖关系**，方法会被调用得到之前单实例组件 **true**

`Full模式获取组件时，会先检查容器中是否有该组件，Lite模式不会检查容器，直接创建一个新的组件返回`

*Full(proxyBeanMethods = true)（保证每个**@Bean方法**被调用多少次返回的组件都是**单实例**的）
Lite(proxyBeanMethods = false)（每个**@Bean方法**被调用多少次返回的组件都是**新创建**的）*

```java
@Configuration(proxyBeanMethods = false) //告诉SpringBoot这是一个配置类 == 配置文件（创建bean）
public class MyConfig {
    @Bean  //id = user01
    public User user01(){
        User zhangsan = new User("zhangsan", 18);
        //user组件依赖了Pet组件
        zhangsan.setPet(tomcatPet());
        return zhangsan;
    }
    @Bean("tom")
    public Pet tomcatPet(){
        return new Pet("tomcat");
    }
}
//################################@Configuration测试代码如下########################################
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.atguigu.boot")
public class MainApplication {
    public static void main(String[] args) {
        //1、返回我们IOC容器
        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
        //2、查看容器里面的组件
        String[] names = run.getBeanDefinitionNames();
        for (String name : names) {
            System.out.println(name);
        }
        //3、从容器中获取组件
        Pet tom01 = run.getBean("tom", Pet.class);
        Pet tom02 = run.getBean("tom", Pet.class);
        System.out.println("组件："+(tom01 == tom02));
        //4、com.atguigu.boot.config.MyConfig$$EnhancerBySpringCGLIB$$51f1e1ca@1654a892
        MyConfig bean = run.getBean(MyConfig.class);
        System.out.println(bean);
        //如果 @Configuration(proxyBeanMethods = true)代理对象调用方法。SpringBoot总会检查这个组件是否在容器中有。
        //保持组件单实例
        User user = bean.user01();
        User user1 = bean.user01();
        System.out.println(user == user1);
        User user01 = run.getBean("user01", User.class);
        Pet tom = run.getBean("tom", Pet.class);
        System.out.println("用户的宠物："+(user01.getPet() == tom));
    }
}
```

##### 2、@Bean、@Component、@Controller、@Service、@Repository（持久层注解）

@Repository 注解可以将这个数据访问对象标记为 Spring 应用程序上下文中的 bean，从而使得我们可以在其他组件中使用该 bean。

常规组件

##### 3、@ComponentScan、@Import

**@Import**：标注在有组件注解的类上（Configuration，Controller...）

**用于导入指定类型的组件并自动创建（放到容器中）**
**默认id = 全类名**

```java
@Import({User.class, DBHelper.class}) //默认id全类名
@Configuration(proxyBeanMethods = false) //告诉SpringBoot这是一个配置类==配置文件
public class MyConfig {
}
```

##### 4、@Conditional

条件装配：**满足** Conditional指定的 **条件** 时才进行组件（bean）注入

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230120113626334.png)

该注解可以标注在类上或方法上（类/方法是否生效）

例子：
**@ConditionalOnBean**(name = "tom")  容器中 **有** tom组件才生效
**@ConditionalOnMissingBean**(name = "tom") 容器中 **没有** tom组件才生效

#### 2、原生配置文件引入@ImportResource

==在随意一个配置类(@Configuration)上编写==

*在随意一个配置类(@Configuration)上编写*
**@ImportResource注解可以帮助**
**导入编写的beans.xml的文件导入配置文件中的bean**

```xml
======================有一文件beans.xml=========================
<bean id="haha" class="com.atguigu.boot.bean.User">
    <property name="name" value="zhangsan"></property>
    <property name="age" value="18"></property>
</bean>
```

```java
@Configuration
@ImportResource("classpath:beans.xml")
public class MyConfig {}
======================MainApplication测试=================
        boolean haha = run.containsBean("haha");
        boolean hehe = run.containsBean("hehe");
        System.out.println("haha："+haha);//true
        System.out.println("hehe："+hehe);//true
```

#### 3、配置绑定 (两种方法)

使用 Java 读取到 properties 文件中的内容，并且把它封装到 JavaBean 中，以供随时使用

只有在容器中的组件，才会拥有SpringBoot提供的强大功能

##### 1、@ConfigurationProperties

使用：
该注解标注 **在有组件注解的类**上 （只有在 **容器中的组件** 才能有springboot的强大功能）
**@ConfigurationProperties(prefix = "")  
表示在Application.properties中的前缀**
	将有这些前缀的属性的属性值赋值，并生成一个 bean 保存到容器中

```properties
mycar.brand=lambo
mycar.price=1000000
```

```java
/**
 * 只有在容器中的组件，才会拥有SpringBoot提供的强大功能
 */
@Component
@ConfigurationProperties(prefix = "mycar")//表示properties文件中的前缀
public class Car {
    private String brand;
    private Integer price;
    ......
}
```

##### 2、@EnableConfigurationProperties + @ConfigurationProperties

适用于需要将第三方的没有标注 @Component 的类引入到 IOC 中

使用：
在配置类上写 **@EnableConfigurationProperties(Car.class)**，作用：
	开启Car **类的属性配置绑定功能**
	把Car这个组件自动注入到容器中

**此时Car类中就不用写@component注解了**
（再通过@ConfigurationProperties配置属性）

```java
@EnableConfigurationProperties(Car.class) // 开启 Car 的属性配置并自动注入到容器中
public class MyConfiguration {

@ConfigurationProperties(prefix = "mycar")
public class Car {
}
```

### 3、自动配置原理入门（给容器中自动注入组件）

#### 3.1、引导加载自动配置类

**@SpringBootApplication=**
**@SpringBootConfiguration + @EnableAutoConfiguration + @ComponentScan("com.t4mako.boot")**

1、*@SpringBootConfiguration：*
	相当于*@Configuration*。代表当前是一个配置类

2、*@ComponentScan*：
	指定扫描哪些，Spring注解

3、***@EnableAutoConfiguration：***

**@EnableAutoConfiguration = @AutoConfigurationPackage + @Import**

```java
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {}
```

**① @AutoConfigurationPackage：**

自动配置包、指定了默认的包规则
即 **将MainApplication 所在包下所有组件导入进来**

*点入@AutoConfigurationPackage：*

```java
@Import(AutoConfigurationPackages.Registrar.class)  //给容器中导入一个组件
public @interface AutoConfigurationPackage {}
```

**AutoConfigurationPackages.Registrar.class**：
	利用Registrar给容器中导入一系列组件
	将指定的一个包下的所有组件导入进来，即**MainApplication 所在包下**。

**② @Import(AutoConfigurationImportSelector.class)**

*AutoConfigurationImportSelector.class：*
1、利用getAutoConfigurationEntry(annotationMetadata)方法：给容器中批量导入一些组件
2、调用`List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes)`：获取到所有需要导入到容器中的配置类
3、利用工厂加载 `Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader);`得到所有的组件
4、从META-INF/spring.factories位置来加载一个文件。
	默认扫描我们当前系统里面所有META-INF/spring.factories位置的文件：
    spring-boot-autoconfigure-2.3.4.RELEASE.jar包里面也有META-INF/spring.factories

文件里面写死了spring-boot一启动就要给容器中加载的所有配置类（127个，往后的版本有更改）

#### 3.2、按需开启自动配置项

虽然我们127个场景的所有自动配置**启动的时候默认全部加载**
xxxxAutoConfiguration按照**条件装配**规则（@Conditional），最终会**按需配置**。

#### 3.3、修改默认配置

给@Bean标注的方法传入了对象参数，这个参数的值就会从容器中找。

```java
@Bean
@ConditionalOnBean(MultipartResolver.class)  //容器中有这个类型组件
@ConditionalOnMissingBean(name = DispatcherServlet.MULTIPART_RESOLVER_BEAN_NAME) //容器中没有这个名字 multipartResolver 的组件
public MultipartResolver multipartResolver(MultipartResolver resolver) {
    //给@Bean标注的方法传入了对象参数，这个参数的值就会从容器中找。
    //SpringMVC multipartResolver。防止有些用户配置的文件上传解析器不符合规范
    // Detect if the user has created a MultipartResolver but named it incorrectly
    return resolver;
}
//给容器中加入了文件上传解析器；
```

**SpringBoot默认会在底层配好所有的组件。但是如果用户自己配置了以用户的优先**

```java
@Bean
@ConditionalOnMissingBean
public CharacterEncodingFilter characterEncodingFilter() {
}
```

总结：
	SpringBoot先**加载所有的自动配置类**xxxxxAutoConfiguration
	每个自动配置类**按照条件生效（不是全部）**，默认都会绑定配置文件指定的值。xxxxProperties里面拿。xxxProperties和配置文件进行了绑定
		（对应注解*@EnableConfigurationProperties*）
	生效的 **配置类**就会**给容器中装配很多组件**
	只要**容器中有这些组件**，相当于这些**功能就有了**
	定制化配置：
		用户自己**@Bean替换底层组件**
		用户去看这个组件是获取的**配置文件什么值就去修改**。

**xxxxxAutoConfiguration ---> 组件  --->** **xxxxProperties里面拿值  ----> application.properties（修改）**

#### 3.4最佳实践

1、引入场景依赖：
		https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters

2、查看自动配置了哪些（选做）
		自己分析，引入场景对应的自动配置一般都生效了
		**配置文件中debug=true**开启**自动配置报告**。Negative（不生效）\ Positive（生效）

3、是否需要修改
		参照文档修改配置项
			https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#appendix.application-properties
			自己分析，xxxxProperties绑定了配置文件的哪些。
		自定义或加入替换组件
			@Bean、@Component...
		自定义器
			 **XXXXXCustomizer**；

### 4、开发小技巧

#### 1、Lombok

**简化JavaBean开发**

1、引入依赖

```xml
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
</dependency>
```

2、搜索安装 lombak 插件

3、编写 JavaBean

```java
===============================简化JavaBean开发===================================
@NoArgsConstructor //无参构造器
@AllArgsConstructor //全参构造器
@Data //get、set方法
@ToString //toString方法
@EqualsAndHashCode //EqualsAndHashCode方法
public class User {

    private String name;
    private Integer age;  
    private Pet pet;
    public User(String name,Integer age){
        this.name = name;
        this.age = age;
    }
}



================================简化日志开发===================================
@Slf4j
@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String handle01(@RequestParam("name") String name){
        
        log.info("请求进来了....");
        
        return "Hello, Spring Boot 2!"+"你好："+name;
    }
}
```

#### 2、dev-tools

加入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

项目或者页面修改以后：**Ctrl+F9 （重启）即可**

#### 3、Spring Initailizr（项目初始化向导）

创建新项目

![image-20230120164235192](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230120164052376.png)

选择需要的功能模块，boot版本等

![image-20230120164418965](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230120164418965.png)

自动引入依赖

自动创建项目结构：

![image-20230120164443965](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230120164443965.png)

自动编写好主配置类：

![image-20230120164502332](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230120164502332.png)

## 4、配置文件

### 1、文件类型

#### 1、propertie

同以前的 properties 用法

#### 2、yaml

##### yaml简介：

YAML 是 "YAML Ain't Markup Language"（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是："Yet Another Markup Language"（仍是一种标记语言）。 

**非常适合用来做以数据为中心的配置文件**

##### 基本语法：

- key: value；kv之间有空格
- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格（idea开发可以用）
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释
- 字符串无需加引号，如果要加，''与""表示字符串内容 会被 转义/不转义

##### 数据类型：

字面量：单个的、不可再分的值。date、boolean、string、number、null

```yaml
k: v
```

对象：键值对的集合。map、hash、set、object 

```yaml
行内写法：  k: {k1:v1,k2:v2,k3:v3}
#或
k: 
  k1: v1
  k2: v2
  k3: v3
```

数组：一组按次序排列的值。array、list、queue

```yaml
行内写法：  k: [v1,v2,v3]
#或者
k:
 - v1
 - v2
 - v3
```

##### 示例：

```java
@Data
public class Person {
	
	private String userName;
	private Boolean boss;
	private Date birth;
	private Integer age;
	private Pet pet;
	private String[] interests;
	private List<String> animal;
	private Map<String, Object> score;
	private Set<Double> salarys;
	private Map<String, List<Pet>> allPets;
}

@Data
public class Pet {
	private String name;
	private Double weight;
}
```

```yaml
## yaml表示以上对象
person:
  userName: zhangsan
  boss: false
  birth: 2019/12/12 20:12:33
  age: 18
  pet: 
    name: tomcat
    weight: 23.4
  interests: [篮球,游泳]
  animal: 
    - jerry
    - mario
  score:
    english: 
      first: 30
      second: 40
      third: 50
    math: [131,140,148]
    chinese: {first: 128,second: 136}
  salarys: [3999,4999.98,5999.99]
  allPets:
    sick:
      - {name: tom}
      - {name: jerry,weight: 47}
    health: [{name: mario,weight: 47}]
```

如何在其他类中使用yaml配置文件的值：
在配置类中添加 **@PropertySource**注解指定要读取的配置文件路径。
 Spring Boot 的组件中使用 **@Value**注解来读取这些属性值

### 2、配置提示（常用）

自定义的类和配置文件绑定一般没有提示。
若要有提示，可以增加下面配置：

pom.xml 增加：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>

<!--打包时可排除包-->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <excludes>
                    <exclude>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-configuration-processor</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## 5、Web开发

### 1、静态资源/欢迎页/图标

#### 1、静态资源

##### 1、静态资源访问

静态资源放在类路径下：
	**/static** (或 `/public` 或 `/resources` 或 `/META-INF/resources`

访问方式 ：
	 当前项目根路径/ + 静态资源名 

原理：
	 静态映射/\*\*（拦截所有请求）
	 请求进来， **先去找Controller看能不能处理**。不能处理的所有请求又都交给 **静态资源处理器**。静态资源也找不到则响应404页面

改变默认的静态资源路径的方式：

```yaml
spring:
  mvc:
    static-path-pattern: /res/**
  resources:
    static-locations: [classpath:/haha/] #可以是数组
```

##### 2、静态资源访问前缀

默认是无前缀的

修改带上前缀/res：

```yaml
spring:
  mvc:
    static-path-pattern: /res/**
```

为了让拦截能区分出静态资源和动态资源，所以一般在静态资源前面加个前缀，拦截器在看到指定前缀时就放行，从而达到动态静态分开的目的

当前项目 + static-path-pattern + 静态资源名 = 静态资源文件夹下找

##### 3、webjar

自动映射 /[webjars](http://localhost:8080/webjars/jquery/3.5.1/jquery.js)/**

引入依赖

```xml
<dependency>
     <groupId>org.webjars</groupId>
     <artifactId>jquery</artifactId>
     <version>3.5.1</version>
</dependency>
```

访问地址：[http://localhost:8080/webjars/**jquery/3.5.1/jquery.js**](http://localhost:8080/webjars/jquery/3.5.1/jquery.js)   后面地址要按照依赖里面的包路径

#### 2、欢迎页

***创建欢迎页的两种方式：***

***1、静态资源路径下的index.html***
		可以配置静态资源路径
		但是不可以配置静态资源的**访问前缀**，否则导致index.html不能被默认访问

```yaml
spring:
##  mvc:
##    static-path-pattern: /res/**  （index在static下，要访问得添加/res/）
  resources:
    static-locations: [classpath:/index/]
```

***2、编写controller能处理 /index 请求***

#### 3、自定义Favicon

favicon.ico 文件放在 **静态资源目录下即可**。

```yaml
spring:
##  mvc:
##    static-path-pattern: /res/**   这个会导致 Favicon 功能失效
```

#### 4、静态资源配置原理

SpringBoot 启动默认加载  xxxAutoConfiguration 类（自动配置类）
`SpringMVC 功能的自动配置类 WebMvcAutoConfiguration 就生效了`

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnWebApplication(type = Type.SERVLET)
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10)
@AutoConfigureAfter({ DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class,
		ValidationAutoConfiguration.class })
public class WebMvcAutoConfiguration {}
```

给容器中的配置：

```java
@Configuration(proxyBeanMethods = false)
@Import(EnableWebMvcConfiguration.class)
@EnableConfigurationProperties({ WebMvcProperties.class, ResourceProperties.class })
@Order(0)
public static class WebMvcAutoConfigurationAdapter implements WebMvcConfigurer {}
```

绑定配置文件：
**WebMvcProperties**\==*spring.mvc*
**ResourceProperties**==*spring.resources*

***扩展：如果配置类只有一个有参构造器：***
***有参构造器所有的值都会从容器中确定***

ResourceProperties resourceProperties；获取和 `spring.resources` 绑定的所有的值的对象
WebMvcProperties mvcProperties 获取和 `spring.mvc` 绑定的所有的值的对象
ListableBeanFactory beanFactory Spring的 `beanFactory`
HttpMessageConverters 找到所有的 `HttpMessageConverters`
ResourceHandlerRegistrationCustomizer 找到 资源处理器的自定义器。
DispatcherServletPath  
ServletRegistrationBean   给应用注册 Servlet、Filter....

```java
public WebMvcAutoConfigurationAdapter(ResourceProperties resourceProperties, WebMvcProperties mvcProperties,
				ListableBeanFactory beanFactory, ObjectProvider<HttpMessageConverters> messageConvertersProvider,
				ObjectProvider<ResourceHandlerRegistrationCustomizer> resourceHandlerRegistrationCustomizerProvider,
				ObjectProvider<DispatcherServletPath> dispatcherServletPath,
				ObjectProvider<ServletRegistrationBean<?>> servletRegistrations) {
			this.resourceProperties = resourceProperties;
			this.mvcProperties = mvcProperties;
			this.beanFactory = beanFactory;
			this.messageConvertersProvider = messageConvertersProvider;
			this.resourceHandlerRegistrationCustomizer = resourceHandlerRegistrationCustomizerProvider.getIfAvailable();
			this.dispatcherServletPath = dispatcherServletPath;
			this.servletRegistrations = servletRegistrations;
		}
```

##### 1、资源处理的默认规则

```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    if (!this.resourceProperties.isAddMappings()) {
        logger.debug("Default resource handling disabled");
        return;
    }
    Duration cachePeriod = this.resourceProperties.getCache().getPeriod();
    CacheControl cacheControl = this.resourceProperties.getCache().getCachecontrol().toHttpCacheControl();
    //webjars的规则
    if (!registry.hasMappingForPattern("/webjars/**")) {
        customizeResourceHandlerRegistration(registry.addResourceHandler("/webjars/**")
                                             .addResourceLocations("classpath:/META-INF/resources/webjars/")
                                             .setCachePeriod(getSeconds(cachePeriod)).setCacheControl(cacheControl));
    }

    //
    String staticPathPattern = this.mvcProperties.getStaticPathPattern();
    if (!registry.hasMappingForPattern(staticPathPattern)) {
        customizeResourceHandlerRegistration(registry.addResourceHandler(staticPathPattern)
                                             .addResourceLocations(getResourceLocations(this.resourceProperties.getStaticLocations()))
                                             .setCachePeriod(getSeconds(cachePeriod)).setCacheControl(cacheControl));
    }
}
```

```yaml
spring:
##  mvc:
##    static-path-pattern: /res/**

  resources:
    add-mappings: false   禁用所有静态资源规则
```

```java
@ConfigurationProperties(prefix = "spring.resources", ignoreUnknownFields = false)
public class ResourceProperties {

	private static final String[] CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/META-INF/resources/",
			"classpath:/resources/", "classpath:/static/", "classpath:/public/" };

	/**
	 * Locations of static resources. Defaults to classpath:[/META-INF/resources/,
	 * /resources/, /static/, /public/].
	 */
	private String[] staticLocations = CLASSPATH_RESOURCE_LOCATIONS;
```

##### 2、欢迎页的处理规则

**HandlerMapping：处理器映射。保存了每一个Handler能处理哪些请求。	**

```java

		@Bean
		public WelcomePageHandlerMapping welcomePageHandlerMapping(ApplicationContext applicationContext,
				FormattingConversionService mvcConversionService, ResourceUrlProvider mvcResourceUrlProvider) {
			WelcomePageHandlerMapping welcomePageHandlerMapping = new WelcomePageHandlerMapping(
					new TemplateAvailabilityProviders(applicationContext), applicationContext, getWelcomePage(),
					this.mvcProperties.getStaticPathPattern());
			welcomePageHandlerMapping.setInterceptors(getInterceptors(mvcConversionService, mvcResourceUrlProvider));
			welcomePageHandlerMapping.setCorsConfigurations(getCorsConfigurations());
			return welcomePageHandlerMapping;
		}

	WelcomePageHandlerMapping(TemplateAvailabilityProviders templateAvailabilityProviders,
			ApplicationContext applicationContext, Optional<Resource> welcomePage, String staticPathPattern) {
		if (welcomePage.isPresent() && "/**".equals(staticPathPattern)) {
            //要用欢迎页功能，必须是/**
			logger.info("Adding welcome page: " + welcomePage.get());
			setRootViewName("forward:index.html");
		}
		else if (welcomeTemplateExists(templateAvailabilityProviders, applicationContext)) {
            // 调用Controller  /index
			logger.info("Adding welcome page template: index");
			setRootViewName("index");
		}
	}
```

##### 3、favicon

### 2、请求参数处理

#### 1、put、delete  请求映射

##### 1、开启 rest 

springBoot 中 需要 **手动开启**

**开启页面表单的Rest功能**

```yaml
spring:
  mvc:
    hiddenmethod:
      filter:
        enabled: true
```

> @xxxMapping
> Rest风格支持
> 	对用户的操作： /user*    GET-获取用户    DELETE-删除用户     PUT-修改用户     POST-保存用户
>
> 核心Filter：**HiddenHttpMethodFilter**（开启put，delete请求）
> （过滤器的一个作用）
>
> 前端发送put，delete请求的方式：**`表单 method=post，隐藏域 **\_**method=put`**
> 	

> Rest 原理：
> 	表单提交会带上 \_method=PUT/DELETE
> 	请求被 **HiddenHttpMethodFilter** 拦截
> 	判断 **请求** 是否正常且  **为POST**
> 	获取到 **_method的值** 并转为大写，判断是否为PUT、DELETE、PATCH
> 	包装模式 **requesWrapper** 与原生Request类类似，**重写了getMethod方法，返回的是传入的值**
> 	过滤器链放行的时候用 wrapper。以后的方法调用getMethod是调用requesWrapper的。
>
> 注：
> 使用客户端工具如 PostMan 直接发送Put、delete等方式请求，无需 Filter，直接为PUT/DELETE	

> 扩展：更改 \_method 这个名字：
>
> ```java
> @Configuration(proxyBeanMethods = false)
> public class WebConfig(){
>     //自定义filter
>     @Bean
> 	public HiddenHttpMethodFilter hiddenHttpMethodFilter(){
>    	 	HiddenHttpMethodFilter methodFilter = new HiddenHttpMethodFilter();
>    		methodFilter.setMethodParam("_m");
>     	return methodFilter;
> 	}
> }
> ```

##### 2、请求映射原理（从请求到方法）

DispatcherServlet 的继承树：
	`HttpServlet→FramworkServlet（重写doGet、doPost、调用doService）→DispatcherServlet（实现doService、调用doDispatch）`

SpringMVC 功能分析都从 org.springframework.web.servlet.**DispatcherServlet** 类的 **doDispatch()** 方法开始

① **通过请求地址找到对应的 Controller**

```java
// 找到当前请求使用哪个Handler（Controller的方法）处理
mappedHandler = getHandler(processedRequest);
```

② **HandlerMapping：处理器映射** 

所有的请求映射都在 HandlerMapping 中（请求→哪个handler处理器处理）

HandlerMapping一共有5个，依此寻找：

![image-20230122222555787](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230122222555787.png)

> **RequestMappingHandlerMapping**：
> 	保存了所有 @RequestMapping 和 handler 的映射规则。（springboot启动后自动扫描保存）
>
> 所有的请求映射都在 HandlerMapping 中，寻找案例：
> 	SpringBoot自动配置欢迎页的 WelcomePageHandlerMapping 。访问 /能访问到index.html
> 	SpringBoot自动配置了默认 的 RequestMappingHandlerMapping
> 	请求进来，挨个尝试所有的HandlerMapping看是否有请求信息
> 		如果有就找到这个请求对应的handler
> 		如果没有就是下一个HandlerMapping
>
> 也可以自己给容器中放 HandlerMapping。自定义 HandlerMapping



#### 2、获取请求参数

##### 1、关键注解获取

**@PathVariable（路径变量）
@RequestParam（请求参数）**
**@RequestHeader（获取请求头）**
**@RequestBody（获取请求体 [post]）**
**@CookieValue（获取 cookiee 值）**
**@RequestAttribute（获取 Request 域属性）**
**@ModelAttribute**
**@MatrixVariable（矩阵变量）**

1. **@RequestParam** 

   http请求的参数 => Controller 方法的 参数 上 （单个值，或封装成 List）

   @RequestParam 注解的 **三个属性**：
   	① **value**：设置和形参绑定 **请求参数的名字**
   	② **required**：设置是否必须传输value所对应的请求参数
   		默认值为 true，请求参数必须传输，否则页面报错（400错误）
   		若设置为 false，请求参数不必须传输，若不传输，则形参值为null	
   	③ **defaultValue**：设置当没有传输 value 所对应的请求参数时，为**形参设置默认值**，此时和required属性值无关

   > 使用 @RequestParam 注解：如果请求参数的名称和控制器方法的参数名称不一致，或者我们需要使用@RequestParam注解的一些特性（如设置默认值或者必传属性等），那么必须使用@RequestParam注解来获取请求参数的值。

2. **@PathVariable**

   在 @RequestMapping 的 value 属性路径中，使用 **{xxx}** 的方式表示 **路径中的数据**
   通过**@PathVariable注解**，将占位符所标识的值和控制器方法的形参进行绑定

   ```java
   @RestController
   public class ParameterTestController {
       @GetMapping("/car/{id}/owner/{username}")
       public String getCar(@PathVariable("id") Integer id, //请求参数中id
                                        @PathVariable("username") String name, //请求参数中username
                                        @PathVariable Map<String,String> pv, //获取所有的@PathVariable
   
           return "success";
       }
   ```

   

3. **@RequestBody**

   将 HTTP **请求体** 中的 **JSON** 或 XML => **Java 对象**。

   案例：

   ```java
   @PostMapping("/save")
   public Map postMethod(@RequestBody String content){ //获取请求体
       Map<String,Object> map = new HashMap<>();
       map.put("content",content);
       return map;
   }
   ```

4. @MatrixVariable（矩阵变量）（略）

获取请求参数案例：

```java+
@RestController
public class ParameterTestController {
    //  car/2/owner/zhangsan?age=18&inters=baseketball&inters=game
    @GetMapping("/car/{id}/owner/{username}")
    public Map<String,Object> getCar(@PathVariable("id") Integer id, //请求参数中id
                                     @PathVariable("username") String name, //请求参数中username
                                     @PathVariable Map<String,String> pv, //获取所有的@PathVariable
                                     
                                     @RequestHeader("User-Agent") String userAgent, //获取请求头
                                     @RequestHeader Map<String,String> header, //获取所有请求头
                                     
                                     @RequestParam("age") Integer age, //获取?后的age
                                     @RequestParam("inters") List<String> inters, //获取所有inters值
                                     @RequestParam Map<String,String> params, //获取所有param
                                     
                                     @CookieValue("_ga") String _ga, //获取cookiee中_ga的值
                                     @CookieValue("_ga") Cookie cookie){ //获取_ga的整个cookiee


        Map<String,Object> map = new HashMap<>();
        map.put("age",age);
        map.put("inters",inters);
        return map;
    }
```

##### 2、Servlet API 获取

参数中可以放 ServletAPI：

> WebRequest、ServletRequest、MultipartRequest、 HttpSession、javax.servlet.http.PushBuilder、Principal、InputStream、Reader、HttpMethod、Locale、TimeZone、ZoneId

**ServletRequestMethodArgumentResolver 类解析以上的部分参数**

##### 3、复杂参数

> Map、Model（map、model里面的数据会被放在 request的请求域  request.setAttribute）
> Errors/BindingResult、RedirectAttributes（重定向携带数据）、ServletResponse（response）、SessionStatus、UriComponentsBuilder、ServletUriComponentsBuilder

对 map<String,Object> map,
	Model model,
	HttpServletRequest request 
	操作都是给 request 域中放数据，即 **request.getAttribute();**

Map、Model类型的参数，返回的 都是 **map**
返回 mavContainer.getModel（）；---> BindingAwareModelMap 是Model 

##### 4、自定义对象参数

可以 **自动类型转换** 与格式化，可以 **级联封装**。

```java
@Data
public class Person { 
    private String userName;
    private Integer age;
    private Date birth;
    private Pet pet; //级联自定义对象
}

@Data
public class Pet {
    private String name;
    private String age;
}
```

#### 3、参数处理原理

HandlerMapping 中找到能处理请求的 **Handler**
为当前 Handler 找一个适配器 **HandlerAdapter**
适配器执行目标方法并确定方法参数的每一个值

##### 1、HandlerAdapter（适配器）

![image-20230123174924675](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230123174924675.png)

0 - 支持方法上标注@RequestMapping 
1 - 支持函数式编程的

##### 2、执行目标方法

![image-20230123175018355](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230123175018355.png)

##### 3、参数解析器-HandlerMethodArgumentResolver

**确定将要执行的目标方法的每一个参数的值是什么**
SpringMVC目标方法能写多少种参数类型。取决于参数解析器

![image-20230123175246221](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230123175246221.png)

判断当前解析器是否（support方法）支持解析这种参数，支持就调用 resolveArgument

##### 4、返回值处理器

![image-20230123175457405](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230123175457405.png)

##### 5、如何确定目标方法每一个参数的值

1、挨个判断所有参数解析器那个支持解析这个参数
2、解析这个参数的值
		调用各自 HandlerMethodArgumentResolver 的 resolveArgument 方法即可
3、自定义类型参数 封装POJO
		ServletModelAttributeMethodProcessor  这个参数处理器支持
		WebDataBinder 利用它里面的 Converters 将请求数据转成指定的数据类型。再次封装到JavaBean中
		GenericConversionService：在设置每一个值的时候，找它里面的所有converter那个可以将这个数据类型（request带来参数的字符串）转换到指定的类型（JavaBean -- Integer）

**byte -- > file**

##### 6、目标方法执行完成

所有的数据都放在 **ModelAndViewContainer**；包含要去的页面地址View。还包含Model数据。

##### 7、处理派发结果

**processDispatchResult**(processedRequest, response, mappedHandler, mv, dispatchException);
renderMergedOutputModel(mergedModel, getRequestToExpose(request), response);

### 3、数据响应(JSON)与内容协商

数据响应：
	① 响应页面
	② 响应数据（json，xml，xls，图片，音视频，自定义协议内容）

#### 1、响应JSON

##### 1、jackson.jar+@ResponseBody

通过 **jackson.jar** (自动导入) + **@ResponseBody** 注解可以给前端自动返回 json 数据；

@RequestBody 指示控制器方法参数应该 从 HTTP请求体中获取，并将其反序列化为方法参数的类型。
@RequestBody 注解将 HTTP请求体 中的 JSON或XML 转换为 Java对象。

> HttpMessageConverter（内容协商）是Spring框架中的一种机制，用于将请求和响应消息转换为特定的格式，例如JSON或XML。当您使用@RequestBody注解时，Spring Boot将尝试从请求体中获取数据，并 **使用适当的HttpMessageConverter** 将其转换为控制器方法参数的类型。
> 默认情况下，Spring Boot使用Jackson库将JSON请求体映射到Java对象中。**Jackson使用Java反射机制，查找Java类中的setter方法**，并使用它们将JSON字段映射到Java对象中。

> `原理：
> 1、有返回值解析器
> 2、返回值解析器原理：
> 	1、返回值处理器先判断是否支持这种类型返回值 （supportsReturnType()方法，返回Boolean类型）
> 	2、如果支持，返回值处理器调用 handleReturnValue() 进行处理
> 	3、RequestResponseBodyMethodProcessor() 可以处理返回值标了@ResponseBody 注解的方法
> 		1、利用 MessageConverters 进行处理 将数据写为json
> 			①内容协商（浏览器默认会以请求头的方式告诉服务器他能接受什么样的内容类型，且有优先级）
> 			②服务器最终根据自己自身的能力，决定服务器能生产出什么样内容类型的数据
> 			③SpringMVC会挨个遍历所有容器底层的 HttpMessageConverter ，看谁能处理
> 				得到MappingJackson2HttpMessageConverter可以将对象写为json
> 				利用MappingJackson2HttpMessageConverter将对象转为json再写出去。`

##### 2、SpringMVC 支持的返回值

> ModelAndView、Model、View
> ResponseEntity 、ResponseBodyEmitter、StreamingResponseBody、HttpEntity、HttpHeaders、Callable、DeferredResult、ListenableFuture、CompletionStage、WebAsyncTask
> 有 @ModelAttribute 且为对象类型的
> @ResponseBody 注解 ---> RequestResponseBodyMethodProcessor；

##### 3、HTTPMessageConverter（消息转换器）原理

HttpMessageConverter: 看是否支持将 此 Class 类型的对象，转为MediaType类型的数据。
例子：Person 对象转为 JSON。或者 JSON转为Person

默认的MessageConverter：
![image-20230125154948610](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230125154948610.png)

0 - 只支持Byte类型的
1 - String
2 - String
3 - Resource
4 - ResourceRegion
5 - DOMSource.class \ SAXSource.class \ StAXSource.class \StreamSource.class \Source.class
6 - MultiValueMap
7 - true 
8 - true
9 - 支持注解方式xml处理的。

最终 MappingJackson2HttpMessageConverter  把对象转为JSON（利用底层的jackson的objectMapper转换的）

#### 2、内容协商

**根据客户端接收能力不同，返回不同媒体类型的数据。**
（若客户端无法解析服务端返回的内容，即媒体类型未匹配，那么响应406）

##### 1、引入xml依赖

```xml
 <dependency>
     <groupId>com.fasterxml.jackson.dataformat</groupId>
     <artifactId>jackson-dataformat-xml</artifactId>
</dependency>
```

##### 2、postman分别测试返回json和xml

postman：模拟用户发起的各类HTTP请求

只需要改变请求头中Accept字段。Accept字段是Http协议中规定的，告诉服务器本客户端可以接收的数据类型。
![image-20230125161757892](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230125161757892.png)

##### 3、开启浏览器参数方式内容协商功能

为了方便内容协商，开启基于请求参数的内容协商功能。

```yaml
spring:
    contentnegotiation:
      favor-parameter: true  #开启请求参数内容协商模式
```

使用方式：

发送请求时，带上format参数：
http://localhost:8080/test/person?format=json
http://localhost:8080/test/person?format=xml

确定客户端接收什么样的内容类型：
1、Parameter策略优先确定是要返回json数据（获取请求头中的format的值）
2、最终进行内容协商返回给客户端json即可。

##### 4、内容协商原理

1、判断当前响应头中是否已经有确定的媒体类型。MediaType
2、**获取**客户端（PostMan、浏览器）**支持接收的内容类型**。（获取客户端Accept请求头字段）【application/xml】
	contentNegotiationManager 内容协商管理器 默认使用基于请求头的策略
	HeaderContentNegotiationStrategy  确定客户端可以接收的内容类型
3、遍历循环所有当前系统的 **MessageConverter**，看谁支持操作这个对象（Person）
4、找到支持操作Person的converter，把converter支持的媒体类型统计出来。
5、客户端需要【application/xml】。服务端能力【10种、json、xml】
6、进行内容协商的最佳匹配媒体类型
7、用 支持 将对象转为 最佳匹配媒体类型 的converter。调用它进行转化 。

##### 5、自定义 MessageConverter

实现多协议数据兼容。json、xml、x-guigu

0、@ResponseBody 响应数据出去 调用 **RequestResponseBodyMethodProcessor** 处理
1、Processor 处理方法返回值。通过 **MessageConverter** 处理
2、所有 **MessageConverter** 合起来可以支持各种媒体类型数据的操作（读、写）
3、内容协商找到最终的 **messageConverter**；

SpringMVC的什么功能。一个入口给容器中添加一个  WebMvcConfigurer

### 4、视图解析与模板引擎（不看）

视图解析：**SpringBoot默认不支持JSP，需要引入第三方模板引擎技术实现页面渲染。**（SpringBoot工程的打包结果是一个jar包，是压缩包，JSP不支持在压缩包中被编译运行，所以SpringBoot默认不支持JSP。）

#### 1、视图解析原理流程

1、目标方法处理的过程中，所有数据都会被放在 ModelAndViewContainer 里面。包括数据和视图地址
2、方法的参数是一个自定义类型对象（从请求参数中确定的），把他重新放在 ModelAndViewContainer 
3、任何目标方法执行完成以后都会返回 ModelAndView（数据和视图地址）。
4、processDispatchResult  处理派发结果（页面该如何响应）

#### 2、模板引擎Thymeleaf

##### 1、thymeleaf简介

现代化、服务端Java模板引擎

##### 2、基本语法

###### 1、表达式

| 表达式名字 | 语法        | 用途                               |
| ---------- | ----------- | ---------------------------------- |
| 变量取值   | **${...} ** | 获取请求域、session域、对象等值    |
| 选择变量   | *{...}      | 获取上下文对象值                   |
| 消息       | #{...}      | 获取国际化等值                     |
| 链接       | **@{...}**  | 加了前后缀，自动拼接，生成链接     |
| 片段表达式 | ~{...}      | jsp:include 作用，引入公共页面片段 |

###### 2、字面量

文本值: 'one text' , 'Another one!' 
数字: 0 , 34 , 3.0 , 12.3
布尔值: true , false
空值: null
变量： one，two  **变量不能有空格**

###### 3、文本操作

字符串拼接: **+**
变量替换: **|The name is ${name}|** 

###### 4、数学运算

运算符: + , - , * , / , %

###### 5、布尔运算

运算符:  and , or
一元运算: ! , not 

###### 6、比较运算

比较: > , < , >= , <= ( gt , lt , ge , le )等式: == , != ( eq , ne ) 

###### 7、条件运算

If-then: **(if) ? (then)**

If-then-else: **(if) ? (then) : (else)**

Default: (value) **?: (defaultvalue)** 

###### 8、特殊操作

无操作： _

##### 3、设置属性值-th:attr

```html
<input type="submit" value="Subscribe!" th:value="#{subscribe.submit}"/>
<form action="subscribe.html" th:action="@{/subscribe}">
```

##### 4、循环

```html
<tr th:each="prod : ${prods}">
        <td th:text="${prod.name}">Onions</td>
        <td th:text="${prod.price}">2.41</td>
        <td th:text="${prod.inStock}? #{true} : #{false}">yes</td>
</tr>
```

##### 5、条件运算

```html
<a href="comments.html"
th:href="@{/product/comments(prodId=${prod.id})}"
th:if="${not #lists.isEmpty(prod.comments)}">view</a>

<div th:switch="${user.role}">
  <p th:case="'admin'">User is an administrator</p>
  <p th:case="#{roles.manager}">User is a manager</p>
  <p th:case="*">User is some other thing</p>
</div>
```

#### 3、thymeleaf使用

##### 1、引入Starter

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

##### 2、自动配置好了thymeleaf

![image-20230126124513640](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230126124513640.png)

自动配好的策略

1、所有thymeleaf的配置值都在 ThymeleafProperties
2、配置好了 SpringTemplateEngine 
3、配好了 ThymeleafViewResolver 视图解析器
4、我们只需要直接开发页面

 ThymeleafProperties类中：视图前后缀

```java
public static final String DEFAULT_PREFIX = "classpath:/templates/";
public static final String DEFAULT_SUFFIX = ".html";  //xxx.html
```

#### 4、构建后台管理系统

##### 1、项目创建

添加模块：thymeleaf、web-starter、devtools、lombok

##### 2、静态资源处理

自动配置好，我们只需要把所有静态资源放到 static 文件夹下

##### 3、路径构建

th:action="@{/login}"

##### 4、模板抽取

th:insert/replace/include

##### 5、页面跳转

登入成功后创建user放入session中，通过session中的user对象判断是否要重新登录

```java
@Controller
public class IndexController {

    //登录页
    @GetMapping({"/","/login"})
    public String loginPage(){
        return "login";
    }

    @PostMapping("/login")
    public String main(User user, HttpSession session,Model model){
        if(!(StringUtils.isEmpty(user.getUserName()) && StringUtils.isEmpty(user.getPassword()))){
            //把登陆成功的用户保存起来
            session.setAttribute("loginUser",user);
            //登录成功，重定向到main.html → 重定向，防止表单重复提交
            return "redirect:/main.html";
        }else {
            model.addAttribute("msg","账号密码错误");
            //回到登录页
            return "login";
        }

    }

    @GetMapping("/main.html")
    public String mainPage(HttpSession session,Model model){
        //是否登录  拦截器，过滤器
        Object loginUser = session.getAttribute("loginUser");
        if(loginUser != null){
            return "main";
        }else {
            model.addAttribute("msg","请重新登录");
            //回到登录页
            return "login";
        }
    }
}
```

##### 6、数据渲染

```java
@GetMapping("/dynamic_table")
public String dynamic_table(Model model){
    //表格内容的遍历
    List<User> users = Arrays.asList(new User("zhangsan", "123456"),
                                     new User("lisi", "123444"),
                                     new User("haha", "aaaaa"),
                                     new User("hehe ", "aaddd"));
    model.addAttribute("users",users);

    return "table/dynamic_table";
}
```

```html
<table class="display table table-bordered" id="hidden-table-info">
    <thead>
        <tr>
            <th>#</th>
            <th>用户名</th>
            <th>密码</th>
        </tr>
    </thead>
    <tbody>
        <tr class="gradeX" th:each="user,stats:${users}">
            <td th:text="${stats.count}">Trident</td>
            <td th:text="${user.userName}">Internet</td>
            <td >[[${user.password}]]</td>
        </tr>
    </tbody>
</table>
```

### 5、Interceptor 拦截器

拦截器底层需要 **Interceptor接口**
接口中的三个方法：
	**`preHandle`**	目标方法执行之前
	**`postHandle`** 	目标方法执行之后
	**`afterCompletion`**	页面渲染

拦截器的作用：做登录检查

**配置拦截器要拦截哪些请求，把这些配置放在容器中（@Configuration）**
	实现 WebMvcConfigure 的 addInterceptors() 方法：
		*配置所有请求都别拦截，排除拦截登录页，静态页面*

#### 1、拦截器的使用

```java
//创建拦截器，实现HandlerInterceptor类
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    //目标方法执行之前
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //通过session判断是否登录
        HttpSession session = request.getSession();
        Object loginUser = session.getAttribute("loginUser");
        if(loginUser != null){
            return true; //放行
        }
        //拦截住，即未登录，跳转到登录页
        request.setAttribute("msg","请先登录");
        request.getRequestDispatcher("/").forward(request,response);
        return false;
    }

    @Override
    //目标方法执行之后
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }
    @Override
    //页面渲染
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
```

#### 2、配置拦截器（url）

**实现WebMvcConfigure的addInterceptors()方法**

```java
/* 配置拦截器工作：
 *   1、配置好拦截器要拦截哪些请求
 *   2、拦截器注册到容器中（实现WebMvcConfigure的addInterceptors()方法）
 *   3、指定拦截器规则（如果是拦截所有，静态资源也会被拦截，所以需要排除）
 */
//编写配置类，配置拦截器，实现WebMvcConfigurer类，重写addInterceptors方法
@Configuration
public class AdminWebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("/**") //所有请求都被拦截，包括静态资源（css，js...）
                .excludePathPatterns("/","/login","/css/**","/fonts/**","/images/**","/js/**"); //放行的请求
    }
}
```

#### 3、拦截器执行顺序、原理

1、根据当前请求，找到 HandlerExecutionChain（可以处理请求的handler以及handler的所有拦截器）
2、先 **顺序执行** 所有拦截器的 **preHandle**方法
	1、如果当前拦截器 prehandler返回为 **true**。则执行下一个拦截器的 preHandle 方法
	2、如果当前拦截器返回为 **false** 。**倒序** 执行经过的拦截器的 **afterCompletion** 方法；
3、如果任何一个 **拦截器返回false**。直接跳出 **不执行目标方法**
4、所有拦截器 **都返回True**。**执行目标方法**
5、倒序执行所有拦截器的 postHandle 方法
6、前面的步骤有任何异常都会直接 **倒序** 触发 afterCompletion
7、页面成功渲染完成以后，也会 倒序 触发 afterCompletion

### 6、文件上传

接收文件步骤：

① 注解：**@RequestPart**：表示一个文件
② 接收的参数类：**MultipartFile** multipartFile
③ 设置文件保存位置：**multipartFile.transferTo()**：

#### 1、表单页面

```html
<form method="post" action="/upload" enctype="multipart/form-data">
    <input type="file" name="file"><br>
    <input type="submit" value="提交">
</form>
```

#### 2、文件上传代码

```java
@Controller
public class FromTestController { 
    @PostMapping("/upload")
    public String upload(@RequestParam("email") String email, @RequestParam("username") String username,
                         // 接收文件
                         @RequestPart("headerImg") MultipartFile headerImg,
                         @RequestPart("photos") MultipartFile[] photos) throws IOException {
        
        if(!headerImg.isEmpty()){
            //保存到文件服务器、oss(对象存储)服务器
            String filename = headerImg.getOriginalFilename();
            headerImg.transferTo(new File("D:\\cache\\"+filename)); //文件保存的位置
        }
        
        if(photos.length != 0){
            for (MultipartFile photo : photos) {
                if(photo != null){
                    String filename = photo.getOriginalFilename();
                    photo.transferTo(new File("D:\\cache\\"+filename));
                }
            }
        }
        return "main";
    }
}
```

#### 3、修改上传文件大小限制

```properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=100MB
```

#### 4、文件上传自动配置原理

文件上传自动配置类-MultipartAutoConfiguration-MultipartProperties
	自动配置好了 StandardServletMultipartResolver   【文件上传解析器】
	原理步骤：
		请求进来使用文件上传解析器判断（isMultipart()）并封装（resolveMultipart，返回MultipartHttpServletRequest()）文件上传请求
		参数解析器来解析请求中的文件内容封装成MultipartFile
		将request中文件信息封装为一个Map，实现文件流的拷贝

### 7、异常处理

#### 1、默认规则

默认情况下，Spring Boot 提供 **/error** 处理所有错误的映射
	对于机器客户端，它将生成 JSON 响应，其中包含错误，HTTP状态和异常消息的详细信息。
	对于浏览器客户端，响应一个 whitelabel 错误视图，以HTML格式呈现相同的数据

要对其进行 **自定义**，**添加 View 解析为 error**
error/下的4xx，5xx页面会被自动解析:

![image-20230128171114694](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230128171114694.png)

#### 2、定制错误处理逻辑

自定义错误页:
	有精确的错误状态码页面就匹配精确，没有就找 4xx.html；如果都没有就触发白页

![image-20230128173840949](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230128173840949.png)

```java
@ResponseStatus(value= HttpStatus.FORBIDDEN,reason = "用户数量太多")
public class UserTooManyException extends RuntimeException{
    public UserTooManyException() {
    }

    public UserTooManyException(String message) {
        super(message);
    }
}
```

@ControllerAdvice是一个Spring框架中的注解，用于定义全局控制器异常处理器。当控制器方法抛出未被处理的异常时，Spring将查找带有@ControllerAdvice注解的类来处理该异常。该类中的方法可以使用@ExceptionHandler注解来处理特定类型的异常。

@ExceptionHandler是一个Spring框架中的注解，用于处理控制器方法中的异常。在控制器方法上添加@ExceptionHandler注解，可以指定要处理的异常类型。当控制器方法抛出该异常时，Spring将调用带有@ExceptionHandler注解的方法来处理该异常。

@ExceptionHandler注解可以被用于单个方法或全局控制器。在单个方法中使用时，它只会应用于该方法中的异常处理。如果在全局控制器中使用，则它将应用于整个控制器中的所有方法。

使用@ExceptionHandler注解可以简化异常处理逻辑，使代码更易于维护和测试。

```java
@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({ArithmeticException.class,NullPointerException.class}) //处理异常
    public String handlerArithException(Exception e){
        log.error("异常：{}",e);
        return "login";
    }
}
```

自定义异常解析器，实现 HandlerExceptionResolver 处理异常；可以作为默认的全局异常处理规则

```java
@Order(value = Ordered.HIGHEST_PRECEDENCE)
@Component
public class CustomerHandlerExceptionResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response,
                                         Object handler,
                                         Exception ex) {
        try {
            response.sendError(511,"我喜欢的错误码");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return new ModelAndView();
    }
}
```

#### 3、异常处理自动配置原理

![image-20230128173905589](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230128173905589.png)

![image-20230128173913355](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230128173913355.png)

#### 4、异常处理步骤流程

1、执行目标方法，目标方法运行期间**有任何异常都会被catch**、而且标志当前**请求结束**；并且用 **dispatchException** 
2、进入视图解析流程
3、处理handler发生的异常，处理完成返回ModelAndView；
	遍历所有的 handlerExceptionResolvers(处理器异常解析器)，看谁能处理当前异常
		DefaultErrorAttributes先来处理异常。把异常信息保存到rrequest域，并且返回null
		默认没有任何人能处理异常，所以异常会被抛出
			如果没有任何人能处理最终底层就会发送 /error 请求。会被底层的BasicErrorController处理
			解析错误视图；遍历所有的ErrorViewResolver  看谁能解析。
			默认的 DefaultErrorViewResolver ,作用是把响应状态码作为错误页的地址，error/500.html 
			模板引擎最终响应这个页面 error/500.html 

### 8、Web原生组件注入（Servlet、Filter、Listener）

有两种方式：

#### 1、使用Servlet API

核心注解：
@ServletComponentScan(basePackage = "")：指定原生Servlet组件（写在application上）
@WebServlet(urlPatterns = "“)  写在原生servlet上
@WebFilter(urlPatterns = "") 写在原生Servlet上
@WebListener 写在原生Listener上

```java
//指定原生Servlet组件都放在那里
@ServletComponentScan(basePackages = "com.t4mako.admin") //写在application上

//效果：直接响应，没有经过Spring的拦截器
@WebServlet(urlPatterns = "/my") //写在原生servlet上
@WebFilter(urlPatterns={"/css/*","/images/*"})//写在原生Servlet上
@WebListener//写在原生Listener上
```

扩展：DispatchServlet 如何注册进来
	容器中自动配置了  DispatcherServlet  属性绑定到 WebMvcProperties；对应的配置文件配置项是 **spring.mvc。**
	通过ServletRegistrationBean\<DispatcherServlet> 把 DispatcherServlet  配置进来。
	默认映射的是 / 路径。

![image-20230129152417865](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230129152417865.png)

Tomcat-Servlet；
多个Servlet都能处理到同一层路径，精确优选原则
A： /my/
B： /my/1

#### 2、使用RegistrationBean

```java
@Configuration
public class MyRegistConfig {

    @Bean
    public ServletRegistrationBean myServlet(){
        MyServlet myServlet = new MyServlet();

        return new ServletRegistrationBean(myServlet,"/my","/my02");
    }

    @Bean
    public FilterRegistrationBean myFilter(){

        MyFilter myFilter = new MyFilter();
//        return new FilterRegistrationBean(myFilter,myServlet());
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(myFilter);
        filterRegistrationBean.setUrlPatterns(Arrays.asList("/my","/css/*"));
        return filterRegistrationBean;
    }

    @Bean
    public ServletListenerRegistrationBean myListener(){
        MySwervletContextListener mySwervletContextListener = new MySwervletContextListener();
        return new ServletListenerRegistrationBean(mySwervletContextListener);
    }
}
```

### 9、嵌入式Servlet容器

#### 1、切换嵌入式Servlet容器

![image-20230129153355545](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230129153355545.png)

#### 2、定制Servlet容器

![image-20230129153440517](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230129153440517.png)

### 10、定制化原理

#### 1、定制化的常见方式 

**①修改配置文件**
**②xxxxxCustomizer**
**③编写自定义的配置类   xxxConfiguration；+ @Bean替换、增加容器中默认组件；视图解析器**
**④Web应用 编写一个配置类实现 WebMvcConfigurer 即可定制化web功能；+ @Bean给容器中再扩展一些组件**

```java
@Configuration
public class AdminWebConfig implements WebMvcConfigurer
```

![image-20230129153616598](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230129153616598.png)

#### 2、原理分析套路

**场景starter** **- xxxxAutoConfiguration - 导入xxx组件 - 绑定xxxProperties --** **绑定配置文件项** 

## 6、数据访问

### 1、SQL

#### 1、数据源的自动配置

##### 1、导入JDBC场景

① 导入JDBC starter：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jdbc</artifactId>
</dependency>
```

**starter帮忙导入的内容：数据源(连接池)、jdbc、事务....**
![image-20230129162828197](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230129162828197.png)

**没有导入驱动的原因：官方不知道我们接下要操作什么数据库。**
② **因此要导入mysql驱动的依赖:**

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

springboot做了版本仲裁，默认版本：8.0.22
修改版本的方式：
	①通过依赖修改版本号（maven的就近依赖原则）
	②重新声明版本（maven的就近依赖原则）

##### 2、分析自动配置

###### 1、自动配置的类

DataSourceAutoConfiguration类：**数据源** 的自动配置
	修改数据源相关配置：修改 **spring.datasource**
	数据库连接池池的配置，自己容器中没有 DataSource 才自动配置
	底层配置好的连接池是：HikariDataSource

DataSourceTransactionManagerAutoConfiguration类： **事务** 管理器的自动配置

JdbcTemplateAutoConfiguration类： **JdbcTemplate** 的自动配置，可以来对数据库进行 **crud**
	可以修改这个配置项 @ConfigurationProperties(prefix = **"spring.jdbc"**) 来修改JdbcTemplat
	容器中已经 **有了JdbcTemplate**这个组件（可以**自动注入**）

JndiDataSourceAutoConfiguration类： jndi的自动配置

XADataSourceAutoConfiguration乐扣： 分布式事务相关的

##### 3、数据源配置

```yaml
spring:
  datasource:
    url: "jdbc:mysql://localhost:3306/test?serverTimezone=UTC"
    driver-class-name: "com.mysql.cj.jdbc.Driver"
    username: "root"
    password: "root"
  jdbc:
    template:
      query-timeout: 3 #三秒后数据没查询出来认为超时
```

##### 4、测试

```java
@SpringBootTest
class Boot05WebAdminApplicationTests {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Test
    void contextLoads() {
        Integer integer = jdbcTemplate.queryForObject("select count(*) from user", Integer.class);
        System.out.println(integer);
    }
}
```

#### 2、使用Druid数据源

整合第三方技术的两种方式：
	① **自定义数据源：**
		原生JDBC数据源配置的 DataSourceAutoConfiguration 类在没有 DataSource 对象的时候自动创建
		所以只需要自己配置 **Configuration 类的 DataSource 对象**，返回其他数据源到IOC中即可

​	② **找starter**

##### 1、方式一：自定义方式

导入druid依赖：

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.15</version>
</dependency>
```

###### 1、创建数据源

```java
@Configuration
public class MyDataSourceConfig {
    /**默认的自动配置：容器中没有才会自动配置
     * @ConditionalOnMissingBean(DataSource.class)
     */
    @ConfigurationProperties("spring.datasource") //自动绑定
    @Bean
    public DataSource dataSource(){
        DruidDataSource dataSource = new DruidDataSource();
//        dataSource.setUrl("jdbc:mysql://localhost:3306/test?serverTimezone=UTC");
//        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
//        dataSource.setUsername("root");
//        dataSource.setPassword("root");
        return dataSource;
    }
}
```

##### 2、方式二：官方starter方式

###### 1、引入druid-starter

druid-starter引入的内容：druid数据源，slf4j，springboot自动配置

```xml
 <dependency>
     <groupId>com.alibaba</groupId>
     <artifactId>druid-spring-boot-starter</artifactId>
     <version>1.1.17</version>
</dependency>
```

**druid注入数据源：
		在 springboot 官方注入数据源之前注入一个数据源，官方的就不生效了**

###### 2、分析自动配置

扩展配置项：**spring.datasource.druid**

DruidSpringAopConfiguration.class,：  监控 SpringBean 的
	配置项：**spring.datasource.druid.aop-patterns**

DruidStatViewServletConfiguration.class： 监控页的配置：
	配置项：**spring.datasource.druid.stat-view-servlet	默认开启**

DruidWebStatFilterConfiguration.class, web监控配置
	配置项：**spring.datasource.druid.web-stat-filter；默认开启**

DruidFilterConfiguration.class})：所有Druid自己filter的配置

###### 3、配置示例

```yaml
spring:
  datasource:
    url: "jdbc:mysql://localhost:3306/test?serverTimezone=UTC"
    driver-class-name: "com.mysql.cj.jdbc.Driver"
    username: "root"
    password: "root"

    druid:
      aop-patterns: com.atguigu.admin.*  #监控SpringBean
      filters: stat,wall     # 底层开启功能，stat（sql监控），wall（防火墙）

      stat-view-servlet:   # 配置监控页功能
        enabled: true
        login-username: admin
        login-password: admin
        resetEnable: false

      web-stat-filter:  # 监控web
        enabled: true
        urlPattern: /*
        exclusions: '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*'

      filter:
        stat:    # 对上面filters里面的stat的详细配置
          slow-sql-millis: 1000
          logSlowSql: true
          enabled: true
        wall:
          enabled: true
          config:
            drop-table-allow: false
```

#### 3、整合MyBatis

**引入starter：**

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.4</version>
</dependency>
```

mybatis 引入的内容：mybatis，JDBCstarter，mybatis自动配置

##### 1、配置模式

全局配置文件
SqlSessionFactory: 自动配置好了
SqlSession：自动配置了 SqlSessionTemplate 组合了SqlSession
@Import(AutoConfiguredMapperScannerRegistrar.class）：找到所有标注了@Mapper注解的接口
Mapper： 只要我们写的操作MyBatis的接口标注了 **@Mapper** 就会被自动扫描进来

① 传统配置方式：

核心配置文件：mybatis-config.xml

yaml中：

```yaml
## 配置mybatis规则
mybatis:
  config-location: classpath:mybatis/mybatis-config.xml  #全局配置文件位置
  mapper-locations: classpath:mybatis/mapper/*.xml  #sql映射文件位置
```

Mapper接口→绑定mapper.xml

```xml
<!--namespace对应mapper接口的全类名-->
<mapper namespace="com.t4mako.admin.mapper.PersonMapper">

    <!--public Person getPerson(Integer id);-->
    <select id="getPerson" resultType="com.t4mako.admin.bean.Person">
        select * from person where id = #{id}
    </select>
</mapper>
```

```java
@Mapper
public interface PersonMapper {
    public Person getPerson(Integer id);
}
```

② **通过yaml配置**

配置 private Configuration configuration; mybatis.configuration下面的所有，就是相当于改 mybatis 全局配置文件中的值

***无需创建mybatis-config.xml***

```yaml
#配置mybatis规则
mybatis:
  #config-location: classpath:mybatis-config.xml 无需配置
  mapper-locations: classpath:mybatis/mapper/*.xml
  configuration: #指定mybatis全局配置文件中的相关配置项
    map-underscore-to-camel-case: true
```

总结，配置方式：
	导入 mybatis 官方 starter
	编写 mapper 接口。**标注@Mapper注解**
	编写 sql 映射文件并绑定 mapper 接口
	在 **application.yaml中指定Mapper配置文件的位置**，以及指定全局配置文件的信息 （建议：**配置在mybatis.configuration标签项下**）

##### 2、注解模式

mapper映射文件可以省略

```java
@Mapper
public interface CityMapper {

    @Select("select * from city where id=#{id}")
    public City getById(Long id);

    public void insert(City city);

}
```

##### 3、混合模式

```java
@Mapper
public interface CityMapper {

    @Select("select * from city where id=#{id}")
    public City getById(Long id);

    public void insert(City city);

}
```

##### 4、总结

最佳实战：     
	引入 mybatis-starter
	**配置 application.yam l中，指定 mapper-location 位置即可**
	编写 **Mapper接口** 并标注 **@Mapper** 注解
	简单方法直接注解方式
	复杂方法编写mapper.xml进行绑定映射
	**配置类** 上写 **@MapperScan**("com.t4mako.admin.mapper") 简化，其他的接口就可以 **不用标注@Mapper注解**

#### 4、整合 MyBatis-Plus

##### 1、引入starter

```xml
<dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-boot-starter</artifactId>
      <version>3.4.1</version>
</dependency>
```

**starter引入内容：mybatis-plus、jdbc-starter**

只需要我们的 **Mapper 继承 BaseMapper **就可以拥有crud能力，并且批量扫描进来 

```java
public interface UesrMapper extends BeseMapper<User>{
    
}
```

MybatisPlusAutoConfiguration 配置类，MybatisPlusProperties 配置项绑定：**mybatis-plus.xxx** 就是对 mybatis-plus 的定制

**SqlSessionFactory 自动配置** 好，底层是容器中的数据源

**mapperLocations 自动配置** 好：
	默认值：**`classpath\*:/mapper/\**/\*.xml`**
	任意包的类路径下的**所有mapper文件夹**下任意路径下的**所有xml**都是sql映射文件。  建议**sql映射文件，放在类路径mapper**下

容器中也**自动配置好了 SqlSessionTemplate**
@Mapper 标注的接口也会被自动扫描
	建议**直接 @MapperScan("com.t4mako.admin.mapper") 批量扫描**就行

**@TableField(exist = false)：
	mybatis-plus的注解，标注在bean类的属性上，表示该属性在表中不存在**

##### 2、CRUD功能

```java


public interface UserService extends IService<User> {
}
```

```java
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper,User> implements UserService {
}
```

```java
@GetMapping("/user/delete/{id}")
public String deleteUser(@PathVariable("id") Long id,
                         @RequestParam(value = "pn",defaultValue = "1")Integer pn,
                         RedirectAttributes ra){

    userService.removeById(id);

    ra.addAttribute("pn",pn);
    return "redirect:/dynamic_table";
}


@GetMapping("/dynamic_table")
public String dynamic_table(@RequestParam(value="pn",defaultValue = "1") Integer pn,Model model){
    //表格内容的遍历
    //        response.sendError
    //     List<User> users = Arrays.asList(new User("zhangsan", "123456"),
    //                new User("lisi", "123444"),
    //                new User("haha", "aaaaa"),
    //                new User("hehe ", "aaddd"));
    //        model.addAttribute("users",users);
    //
    //        if(users.size()>3){
    //            throw new UserTooManyException();
    //        }
    //从数据库中查出user表中的用户进行展示

    //构造分页参数
    Page<User> page = new Page<>(pn, 2);
    //调用page进行分页
    Page<User> userPage = userService.page(page, null);


    //        userPage.getRecords()
    //        userPage.getCurrent()
    //        userPage.getPages()


    model.addAttribute("users",userPage);

    return "table/dynamic_table";
}
```

### 2、NoSQL

#### 1、Redis自动配置

引入starter

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

自动配置：
	自动配置类：RedisAutoConfiguration 。RedisProperties 属性类 --> **spring.redis.xxx是对redis的配置**
	连接工厂是准备好的。LettuceConnectionConfiguration、JedisConnectionConfiguration
	自动注入了RedisTemplate<Object, Object> ： xxxTemplate；
	自动注入了StringRedisTemplate；k：v都是String
	key：value
	底层只要我们使用 StringRedisTemplate、RedisTemplate就可以操作redis

#### 2、RedisTemplate 与 Lettuce

```java
 @Test
void testRedis(){
    ValueOperations<String, String> operations = redisTemplate.opsForValue();

    operations.set("hello","world");

    String hello = operations.get("hello");
    System.out.println(hello);
}
```

#### 3、切换至jedis

```xml
 <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!--导入jedis-->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```

```yaml
spring:
  redis:
      host: r-bp1nc7reqesxisgxpipd.redis.rds.aliyuncs.com
      port: 6379
      password: lfy:Lfy123456
      client-type: jedis
      jedis:
        pool:
          max-active: 10
```

## 7、单元测试

### 1、JUnit5 的变化

**Spring Boot 2.2.0 版本开始引入 JUnit 5 作为单元测试默认库**
作为最新版本的JUnit框架，JUnit5与之前版本的Junit框架有很大的不同。由三个不同子项目的几个不同模块组成：
	JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage

JUnit Platform: Junit Platform是在JVM上启动测试框架的基础，不仅支持Junit自制的测试引擎，其他测试引擎也都可以接入。
JUnit Jupiter: JUnit Jupiter提供了JUnit5的新的编程模型，是JUnit5新特性的核心。内部 包含了一个**测试引擎**，用于在Junit Platform上运行。
JUnit Vintage: 由于JUint已经发展多年，为了照顾老的项目，JUnit Vintage提供了兼容JUnit4.x,Junit3.x的测试引擎。

注意：
SpringBoot 2.4 以上版本移除了默认对 Vintage 的依赖。如果需要兼容junit4需要自行引入（不能使用junit4的功能 @Test）

**引入单元测试依赖**

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
</dependency>
```

**现在单元测试的使用方式：**

```java
@SpringBootTest
class Boot05WebAdminApplicationTests {
    @Test
    void contextLoads() {
    }
}
```

SpringBoot整合Junit以后：
	编写测试方法：@Test标注（注意需要使用junit5版本的注解）
	Junit类具有Spring的功能，@Autowired、比如 @Transactional 标注测试方法，测试完成后自动回滚

### 2、JUnit5常用注解

JUnit5的注解与JUnit4的注解有所变化https://junit.org/junit5/docs/current/user-guide/#writing-tests-annotations

- **@Test :**表示方法是测试方法。但是与JUnit4的@Test不同，他的职责非常单一不能声明任何属性，拓展的测试将会由Jupiter提供额外测试
- **@ParameterizedTest :**表示方法是参数化测试，下方会有详细介绍
- **@RepeatedTest :**表示方法可重复执行，下方会有详细介绍
- **@DisplayName :**为测试**类**或者测试**方法**设置**展示名称**
- **@BeforeEach :**表示在每个单元测试之前执行
- **@AfterEach :**表示在每个单元测试之后执行
- **@BeforeAll :**表示在所有单元测试之前执行
- **@AfterAll :**表示在所有单元测试之后执行
- **@Tag :**表示单元测试类别，类似于JUnit4中的@Categories
- **@Disabled :**表示测试类或测试方法不执行，类似于JUnit4中的@Ignore
- **@Timeout :**表示测试方法运行如果超过了指定时间将会返回错误
- **@ExtendWith :**为测试类或测试方法提供扩展类引用

示例：

```java
@SpringBootTest
@DisplayName("测试DisplayName在类上注解")
public class JUnit5Test {

    @DisplayName("测试DisplayName注解")
    @Timeout(value = 500,unit = TimeUnit.MILLISECONDS) //超过500毫秒抛出超时异常
    @Test
    void testDisplayName(){
        System.out.println(1);
    }

    @DisplayName("test2")
    @Test
    void test2(){
        System.out.println(2);
    }

    @RepeatedTest(5) //重复测试5此
    @Test
    void test3(){
        System.out.println(3);
    }

    @BeforeEach
    void testBeforeEach(){
        System.out.println("测试就要开始了...");
    }

    @AfterEach
    void testAfterEach(){
        System.out.println("测试就要结束了...");
    }

    @BeforeAll
    static void testBeforeAll(){
        System.out.println("all测试就要开始了...");
    }

    @AfterAll
    static void testAfterAll(){
        System.out.println("all测试就要结束了...");
    }
}
```

### 3、断言（assertions）

断言（assertions）是测试方法中的核心部分，用来对测试需要满足的条件进行验证。这些断言方法都是 org.junit.jupiter.api.Assertions 的静态方法。
断言检查业务逻辑返回的数据是否合理。
**所有的测试运行结束以后，会有一个详细的测试报告；**

断言分类：
简单断言、数组断言、组合断言、异常断言、超时断言、快速失败

**断言：前面的断言失败，后面的断言都不会执行**

#### 1、简单断言

用来对单个值进行简单的验证。如：

| 方法            | 说明                                 |
| --------------- | ------------------------------------ |
| assertEquals    | 判断两个对象或两个原始类型是否相等   |
| assertNotEquals | 判断两个对象或两个原始类型是否不相等 |
| assertSame      | 判断两个对象引用是否指向同一个对象   |
| assertNotSame   | 判断两个对象引用是否指向不同的对象   |
| assertTrue      | 判断给定的布尔值是否为 true          |
| assertFalse     | 判断给定的布尔值是否为 false         |
| assertNull      | 判断给定的对象引用是否为 null        |
| assertNotNull   | 判断给定的对象引用是否不为 null      |

```java
@Test
@DisplayName("simple assertion")
public void simple() {
     assertEquals(3, 1 + 2, "simple math");
     assertNotEquals(3, 1 + 1);

     assertNotSame(new Object(), new Object());
     Object obj = new Object();
     assertSame(obj, obj);

     assertFalse(1 > 2);
     assertTrue(1 < 2);

     assertNull(null);
     assertNotNull(new Object());
}
```

#### 2、数组断言

通过 assertArrayEquals 方法来判断两个对象或原始类型的数组是否相等

```java
@Test
@DisplayName("array assertion")
public void array() {
	assertArrayEquals(new int[]{1, 2}, new int[] {1, 2}); //相等
}
```

#### 3、组合断言

assertAll 方法接受多个 org.junit.jupiter.api.Executable 函数式接口的实例作为要验证的断言，可以通过 lambda 表达式很容易的提供这些断言

```java
@Test
@DisplayName("assert all")
public void all() {
 assertAll("Math",
    () -> assertEquals(2, 1 + 1),
    () -> assertTrue(1 > 0)
 );
}
```

#### 4、异常断言

在JUnit4时期，想要测试方法的异常情况时，需要用**@Rule**注解的ExpectedException变量还是比较麻烦的。而JUnit5提供了一种新的断言方式**Assertions.assertThrows()** ,配合函数式编程就可以进行使用。

异常断言：一般断定业务逻辑一定出现异常

```java
@Test
@DisplayName("异常测试")
public void exceptionTest() {
    ArithmeticException exception = Assertions.assertThrows(
           //扔出断言异常
            ArithmeticException.class, () -> int i = 1 / 0,"业务逻辑正常");
}
```

#### 5、超时断言

Junit5还提供了**Assertions.assertTimeout()** 为测试方法设置了超时时间

```java
@Test
@DisplayName("超时测试")
public void timeoutTest() {
    //如果测试方法时间超过1s将会异常
    Assertions.assertTimeout(Duration.ofMillis(1000), () -> Thread.sleep(500));
}
```

#### 6、快速失败

通过 fail 方法直接使得测试失败

```java
@Test
@DisplayName("fail")
public void shouldFail() {
	fail("This should fail");
}
```

### 4、前置条件（assumptions）

JUnit 5 中的前置条件（assumptions【假设】）类似于断言，不同之处在于**不满足的断言会使得测试方法失败**，而不满足的**前置条件只会使得测试方法的执行终止**。前置条件可以看成是测试方法执行的前提，当该前提不满足时，就没有继续执行的必要。

```java
@DisplayName("前置条件")
public class AssumptionsTest {
 private final String environment = "DEV";
 
 @Test
 @DisplayName("simple")
 public void simpleAssume() {
    assumeTrue(Objects.equals(this.environment, "DEV"));
    assumeFalse(() -> Objects.equals(this.environment, "PROD"));
 }
 
 @Test
 @DisplayName("assume then do")
 public void assumeThenDo() {
    assumingThat(
       Objects.equals(this.environment, "DEV"),
       () -> System.out.println("In DEV")
    );
 }
}
```

assumeTrue 和 assumFalse 确保给定的条件为 true 或 false，不满足条件会使得**测试执行终止**。
assumingThat 的参数是表示条件的布尔值和对应的 Executable 接口的实现对象。只有条件满足时，Executable 对象才会被执行；当条件不满足时，测试执行并不会终止。

### 5、嵌套测试

JUnit 5 可以通过 Java 中的内部类和@Nested 注解实现嵌套测试，从而可以更好的把相关的测试方法组织在一起。在内部类中可以使用@BeforeEach 和@AfterEach 注解，而且嵌套的层次没有限制。

嵌套测试情况下，**外层的Test不能驱动内层的Before(After)Each/All之类的方法**提前/之后运行
**内层的Test可以驱动外层的Before(After)Each/All之类的方法**

```java
@DisplayName("A stack")
class TestingAStackDemo {

    Stack<Object> stack;//①

    @Test
    @DisplayName("is instantiated with new Stack()")
    void isInstantiatedWithNew() {
        new Stack<>(); //①-②
    }

    @Nested
    @DisplayName("when new")
    class WhenNew {

        @BeforeEach
        void createNewStack() {
            stack = new Stack<>(); //①-③
        }

        @Test
        @DisplayName("is empty")
        void isEmpty() {
            assertTrue(stack.isEmpty()); //①-③-④
        }

        @Test
        @DisplayName("throws EmptyStackException when popped")
        void throwsExceptionWhenPopped() {
            assertThrows(EmptyStackException.class, stack::pop);
        }

        @Test
        @DisplayName("throws EmptyStackException when peeked")
        void throwsExceptionWhenPeeked() {
            assertThrows(EmptyStackException.class, stack::peek);
        }

        @Nested
        @DisplayName("after pushing an element")
        class AfterPushing { //内部类的内部类

            String anElement = "an element";

            @BeforeEach
            void pushAnElement() {
                stack.push(anElement);
            }

            @Test
            @DisplayName("it is no longer empty")
            void isNotEmpty() {
                assertFalse(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when popped and is empty")
            void returnElementWhenPopped() {
                assertEquals(anElement, stack.pop());
                assertTrue(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when peeked but remains not empty")
            void returnElementWhenPeeked() {
                assertEquals(anElement, stack.peek());
                assertFalse(stack.isEmpty());
            }
        }
    }
}
```

### 6、参数化测试

参数化测试是JUnit5很重要的一个新特性，它使得用不同的参数多次运行测试成为了可能，也为我们的单元测试带来许多便利。
利用**@ValueSource**等注解，指定入参，我们将可以使用不同的参数进行多次单元测试，而不需要每新增一个参数就新增一个单元测试，省去了很多冗余代码。

**@ValueSource**: 为参数化测试指定入参来源，支持**八大基础类以及String类型,Class类型**
**@NullSource**: 表示为参数化测试提供一个null的入参
**@EnumSource**: 表示为参数化测试提供一个枚举入参
**@CsvFileSource**：表示读取指定CSV文件内容作为参数化测试入参
**@MethodSource**：表示读取指定方法的返回值作为参数化测试入参(注意方法返回需要是一个流)

CSV,YML,JSON 文件甚至方法的返回值也可以作为入参。只需要去实现**ArgumentsProvider**接口，任何外部文件都可以作为它的入参。

```java
public class TestingDemo {

    @ParameterizedTest
    @DisplayName("参数化测试")
    @ValueSource(ints = {1,2,3,4,5})
    void testParameterized(int i){
        System.out.println(i);
    }

    @ParameterizedTest
    @DisplayName("参数化测试2")
    @MethodSource("stringProvider")
    void testParameterized2(String i){
        System.out.println(i);
    }
    
    static Stream<String> stringProvider(){
        return Stream.of("apple","banana","cat");
    }
}
```

### 7、迁移指南

使用junit5测试，在进行迁移的时候需要注意如下的变化：
	注解在 org.junit.jupiter.api 包中，断言在 org.junit.jupiter.api.Assertions 类中，前置条件在 org.junit.jupiter.api.Assumptions 类中。
	把@Before 和@After 替换成@BeforeEach 和@AfterEach。
	把@BeforeClass 和@AfterClass 替换成@BeforeAll 和@AfterAll。
	把@Ignore 替换成@Disabled。
	把@Category 替换成@Tag。
	把@RunWith、@Rule 和@ClassRule 替换成@ExtendWith。

## 8、指标监控

### 1、SpringBoot Actuator

#### 1、简介

未来每一个微服务在云上部署以后，我们都需要对其进行监控、追踪、审计、控制等。SpringBoot就抽取了Actuator场景，使得我们每个微服务快速引用即可获得生产级别的应用监控、审计等功能。

引入场景：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### 2、1.x与2.x的不同

![image-20230131173627517](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230131173627517.png)

#### 3、如何使用

引入场景
访问 **http://localhost:8080/actuator/\*\***

暴露所有监控信息为HTTP:

```yaml
#management是所有的actuator的配置
management:
  endpoints:
    enabled-by-default: true #默认开启所有监控端点
    web:
      exposure:
        include: '*'  #以web方式暴露所有端点
```

#### 4、可视化

https://github.com/codecentric/spring-boot-admin

### 2、Actuator Endpoint

#### 1、最常使用的端点

| ID                 | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| `auditevents`      | 暴露当前应用程序的审核事件信息。需要一个`AuditEventRepository组件`。 |
| `beans`            | 显示应用程序中所有Spring Bean的完整列表。                    |
| `caches`           | 暴露可用的缓存。                                             |
| `conditions`       | 显示自动配置的所有条件信息，包括匹配或不匹配的原因。         |
| `configprops`      | 显示所有`@ConfigurationProperties`。                         |
| `env`              | 暴露Spring的属性`ConfigurableEnvironment`                    |
| `flyway`           | 显示已应用的所有Flyway数据库迁移。 需要一个或多个`Flyway`组件。 |
| `health`           | 显示应用程序运行状况信息。                                   |
| `httptrace`        | 显示HTTP跟踪信息（默认情况下，最近100个HTTP请求-响应）。需要一个`HttpTraceRepository`组件。 |
| `info`             | 显示应用程序信息。                                           |
| `integrationgraph` | 显示Spring `integrationgraph` 。需要依赖`spring-integration-core`。 |
| `loggers`          | 显示和修改应用程序中日志的配置。                             |
| `liquibase`        | 显示已应用的所有Liquibase数据库迁移。需要一个或多个`Liquibase`组件。 |
| `metrics`          | 显示当前应用程序的“指标”信息。                               |
| `mappings`         | 显示所有`@RequestMapping`路径列表。                          |
| `scheduledtasks`   | 显示应用程序中的计划任务。                                   |
| `sessions`         | 允许从Spring Session支持的会话存储中检索和删除用户会话。需要使用Spring Session的基于Servlet的Web应用程序。 |
| `shutdown`         | 使应用程序正常关闭。默认禁用。                               |
| `startup`          | 显示由`ApplicationStartup`收集的启动步骤数据。需要使用`SpringApplication`进行配置`BufferingApplicationStartup`。 |
| `threaddump`       | 执行线程转储。                                               |

如果您的应用程序是Web应用程序（Spring MVC，Spring WebFlux或Jersey），则可以使用以下附加端点：

| ID           | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `heapdump`   | 返回`hprof`堆转储文件。                                      |
| `jolokia`    | 通过HTTP暴露JMX bean（需要引入Jolokia，不适用于WebFlux）。需要引入依赖`jolokia-core`。 |
| `logfile`    | 返回日志文件的内容（如果已设置`logging.file.name`或`logging.file.path`属性）。支持使用HTTP`Range`标头来检索部分日志文件的内容。 |
| `prometheus` | 以Prometheus服务器可以抓取的格式公开指标。需要依赖`micrometer-registry-prometheus`。 |

最常用的Endpoint（端点）
	**Health：监控状况**
	**Metrics：运行时指标**
	**Loggers：日志记录**

#### 2、Health Endpoint

健康检查端点，我们一般用于在云平台，平台会定时的检查应用的健康状况，我们就需要Health Endpoint可以为平台返回当前应用的一系列组件健康状况的集合。

重要的几点：
	health endpoint返回的结果，应该是一系列健康检查后的一个汇总报告
	很多的健康检查默认已经自动配置好了，比如：数据库、redis等
	可以很容易的添加自定义的健康检查机制

```yaml
#management是所有的actuator的配置
management:
  endpoints:
    enabled-by-default: true #默认开启所有监控端点 默认为true
    web:
      exposure:
        include: '*'  #以web方式暴露所有端点

#management.endpoint.端点名。xxxx 对某个端点的具体配置
  endpoint:  #控制单个端点显示详细信息
    health:
      show-details: always
```



#### 3、Metrics Endpoint

提供详细的、层级的、空间指标信息，这些信息可以被pull（主动推送）或者push（被动获取）方式得到；

- 通过Metrics对接多种监控系统
- 简化核心Metrics开发
- 添加自定义Metrics或者扩展已有Metrics

#### 4、管理Endpoints

###### 1、开启与禁用Endpoints

默认所有的Endpoint除shutdown都是开启的。
需要开启或者禁用某个Endpoint。配置模式为  management.endpoint.\<endpointName\>.enabled = true
或者禁用所有的Endpoint然后手动开启指定的Endpoint

```yaml
#management是所有的actuator的配置
management:
  endpoints:
    enabled-by-default: false #默认关闭所有监控端点 默认为true
    web:
      exposure:
        include: '*'  #以web方式暴露所有端点

#management.endpoint.端点名。xxxx 对某个端点的具体配置
  endpoint:  #控制单个端点显示详细信息
    health:
      show-details: always
      enabled: true
    info:
      enabled: true
    beans:
      enabled: true
```

##### 2、暴露Endpoints

支持的暴露方式

- HTTP：默认只暴露**health**和**info** Endpoint
- **JMX**：默认暴露所有Endpoint
- 除health和info，剩下的Endpoint都应该进行保护访问。如果引入SpringSecurity，则会默认配置安全访问规则

##### 3、定制 Endpoint

###### 1、定制 Health 信息

```java
//编写类继承AbstractHealthIndicator
@Component //组件名为MyCom（把后面的截取掉）
public class MyComHealthIndicator extends AbstractHealthIndicator {
    //编写真实的检查方法
    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {
        //mongodb 获取连接进行测试
        //带回的数据
        Map<String,Object> map = new HashMap<>();
        //检查是否健康
        if(1 == 1){
            //builder.up(); //健康
            builder.status(Status.UP);
            map.put("count",1);
            map.put("ms",100);
        }else {
            //builder.down();
            builder.status(Status.OUT_OF_SERVICE);
            map.put("err","连接超时");
            map.put("ms",3000);
        }

        builder.withDetail("code",100)
                .withDetails(map);
    }
}
```

```yaml
management:
    health:
      enabled: true
      show-details: always #总是显示详细信息。可显示每个模块的状态信息
```

###### 2、定制Metrics信息

增加定制Metrics

```java
class MyService{
    Counter counter;
    public MyService(MeterRegistry meterRegistry){
         counter = meterRegistry.counter("myservice.method.running.counter");
    }

    public void hello() {
        counter.increment();
    }
}


//也可以使用下面的方式
@Bean
MeterBinder queueSize(Queue queue) {
    return (registry) -> Gauge.builder("queueSize", queue::size).register(registry);
}
```

###### 3、定制Endpoint

```java
@Component
@Endpoint(id = "container") //端点名
public class DockerEndpoint {
    @ReadOperation
    public Map getDockerInfo(){
        return Collections.singletonMap("info","docker started...");
    }

    @WriteOperation
    private void restartDocker(){
        System.out.println("docker restarted....");
    }
}
```

## 9、原理解析

### 1、Profile功能

为了方便多环境适配，springboot简化了profile功能。（在不同的生产环境下切换不同的配置文件）

#### 1、application-profile功能

默认配置文件  application.yaml；任何时候都会加载
指定环境配置文件  application-{参数}.yaml
激活指定环境：
	配置文件激活
	命令行激活：java -jar xxx.jar --**spring.profiles.active=prod  --person.name=haha**
		修改配置文件的任意值，命令行优先
默认配置与环境配置同时生效
同名配置项，profile配置优先

#### 2、@Profile条件装配功能

```java
@Configuration(proxyBeanMethods = false)
@Profile("production") //当生产环境是production时，类才生效
public class ProductionConfiguration {
    // ...
}
```

#### 3、profile分组

```properties
spring.profiles.group.production[0]=proddb
spring.profiles.group.production[1]=prodmq

#使用：--spring.profiles.active=production  激活
```

### 2、外部化配置

#### 1、外部配置源

常用：**Java属性文件**、**YAML文件**、**环境变量**、**命令行参数**；



#### 2、配置文件查找位置

(1) classpath 根路径

(2) classpath 根路径下config目录

(3) jar包当前目录

(4) jar包当前目录的config目录

(5) /config子目录的直接子目录

#### 3、配置文件加载顺序：

1. 　当前jar包内部的application.properties和application.yml
2. 　当前jar包内部的application-{profile}.properties 和 application-{profile}.yml
3. 　引用的外部jar包的application.properties和application.yml
4. 　引用的外部jar包的application-{profile}.properties 和 application-{profile}.yml

#### 4、指定环境优先，外部优先，后面的可以覆盖前面的同名配置项

### 3、自定义starter

#### 1、starter启动原理

starter-pom（pom的场景启动器）引入 **autoconfigurer** 包
autoconfigure包中配置使用 META-INF/spring.factories 中 EnableAutoConfiguration 的值，使得项目启动加载指定的自动配置类

starter→autoconfigure→spring-boot-starter

编写自动配置类 xxxAutoConfiguration -> xxxxProperties

引入starter --- xxxAutoConfiguration --- 容器中放入组件 ---- 绑定xxxProperties ---- 配置项

#### 2、自定义starter

atguigu-hello-spring-boot-starter（启动器）
atguigu-hello-spring-boot-starter-autoconfigure（自动配置包）

### 4、SpringBoot原理

Spring原理、SpringMVC原理、自动配置原理、SpringBoot原理

#### 1、SpringBoot启动过程

分两大步：

**①创建 SpringApplication**
	保存一些信息
	判断当前应用的类型（通过 ClassUtils 类：原生servlet 还是 响应式编程）
	获取所有初始化启动引导器 bootstrappers（去spring.factories文件中找）
	找 ApplicationContextInitializer（去spring.factories找）
	找 ApplicationListener  ；应用监听器（去spring.factories找）

**②运行SpringApplication**
	StopWahtch：监听整个应用程序启动停止的监听器
	记录应用启动时间
	创建引导上下文（Context环境）
		获取到所有之前的 bootstrappers 挨个执行 intitialize() 来完成对引导启动器上下文环境设置
	让当前应用进入headless模式（简言之就是自力更生模式）
	获取所有 RunListener保存到SpringApplicationRunListene（运行监听器）（为了方便所有Listener进行事件感知）
	遍历 SpringApplicationRunListener 调用 starting 方法（项目正在 starting）
	保存命令行参数；ApplicationArguments
	准备环境 prepareEnvironment（）
		返回或者创建基础环境信息对象
	**创建IOC容器**（createApplicationContext（））	
		根据项目类型（Servlet）创建容器
		遍历所有的 ApplicationContextInitializer 。调用 initialize.。来对ioc容器进行初始化扩展功能
		遍历所有的 listener 调用 contextPrepared。EventPublishRunListenr；通知所有的监听器contextPrepared
	刷新IOC容器。refreshContext
		创建容器中的所有组件（Spring注解）
	所有监听 器 调用 listeners.started(context); 通知所有的监听器 started
	调用所有runners；callRunners()
		获取容器中的 ApplicationRunner 
		获取容器中的  CommandLineRunner
如果以上有异常，调用Listener 的 failed

#### 2、Application Events and Listeners

https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-application-events-and-listeners

#### 3、ApplicationRunner 与 CommandLineRunner

![image-20230201174654270](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230201174654270.png)

## 10、常见问题

1、过滤器与拦截器的区别是什么

过滤器(Filter)和拦截器(Interceptor)都是在Web应用程序中用于拦截请求和响应的机制，但它们之间有以下几个区别：

1. 触发时间：过滤器在请求被分发给目标资源之前拦截请求，而拦截器在请求被分发给目标处理器(例如Controller)之前或之后拦截请求。
2. 应用范围：过滤器可以在Web应用程序中的任何地方使用，而拦截器只能在Spring MVC应用程序中使用。
3. 执行顺序：过滤器的执行顺序是根据它们在Web.xml中的声明顺序执行的，而拦截器的执行顺序是根据它们在Spring配置文件中的声明顺序执行的。
4. 功能不同：过滤器是用于过滤请求和响应，例如修改请求参数，添加HTTP头等等。而拦截器用于在请求处理前或后执行某些操作，例如权限检查，日志记录等等。
5. 对于返回结果的处理：过滤器可以直接处理请求和响应的内容，而拦截器只能拦截请求和响应的处理流程，无法直接处理内容。

综上所述，虽然过滤器和拦截器都是用于拦截请求和响应的机制，但它们的触发时间、应用范围、执行顺序、功能和对于返回结果的处理等方面都存在差异。在实际开发中，开发人员应该根据具体的需求来选择合适的机制。
