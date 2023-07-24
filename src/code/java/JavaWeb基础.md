---
title: Java Web 基础
icon: network
order: 5
date: 2022-08-16
category: 
    - java
tag: 
    - java
    - servlet
---


## 一、配置文件

### 1、XML配置文件

#### 1、名词解释

XML是e**X**tensible **M**arkup **L**anguage的缩写，翻译过来就是**可扩展标记语言**。**XML和HTML一样都是标记语言**，也就是说它们的基本语法都是**标签**。
<!-- more -->
**可扩展**意思是XML允许**自定义格式**

在XML基本语法规范的基础上，第三方应用程序、框架通过设计**『XML约束』**的方式**『强制规定』**配置文件中可以写什么和怎么写

#### 2、XML基本语法

XML的基本语法和HTML的基本语法如出一辙，XML基本语法+HTML约束=HTML语法。在逻辑上HTML是XML的子集。

①根标签
根标签有且只能有一个

```xml
<?xml version="1.0" encoding="UTF-8"?>
```

②单双标签
双标签：开始标签和结束标签必须成对出现。
单标签：单标签在标签内关闭。

③属性
属性必须有值
属性值必须加引号，单双都行

#### 3、XML约束

我们主要就是根据XML约束中的规定来编写XML配置文件。而XML约束主要包括**DTD和Schema**两种。如果XML配置文件使用的是DTD，那么对我们几乎没有影响。如果是Schema约束，需要我们稍微参与一点点。

详情见https://heavy_code_industry.gitee.io/code_heavy_industry/pro001-javaweb/lecture/chapter05/verse01.html#_2%E5%B1%9E%E6%80%A7%E6%96%87%E4%BB%B6

### 2、属性文件

以**properties作为扩展名**的文件
由**键值对**组成
键和值之间的符号是**等号**
每一行都必须顶格写，前面**不能有空格之类的其他符号**

```properties
atguigu.jdbc.url=jdbc:mysql://192.168.198.100:3306/mybatis1026
atguigu.jdbc.driver=com.mysql.jdbc.Driver
atguigu.jdbc.username=root
atguigu.jdbc.password=atguigu
```

### 3、其他形式

①YAML语言的配置文件：在SpringBoot中使用。

```yaml
spring:
  profiles:
    active: fc
  datasource:
    name: mydb
    type: com.alibaba.druid.pool.DruidDataSource
    url: jdbc:mysql://192.168.41.100:3306/spring_boot?serverTimezone=UTC
    username: root
    password: atguigu
    driver-class-name: com.mysql.cj.jdbc.Driver
mybatis:
  mapper-locations: classpath*:/mybatis-mapper/*Mapper.xml
logging:
  level:
    com.atguigu.function.compute.mapper: debug
```

②JSON格式的配置文件：一般是前端使用。

## 二、Tomcat

### 1、Tomcat扮演的角色

**① 对外：Web服务器**

![image-20220914194924351](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220914194924351.png)

**② 对内：Servlet容器**

![image-20220914195004706](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220914195004706.png)

### 2、部署

==Tomcat本身是一个Java程序==，所以当前系统中必须正确配置了JAVA_HOME **环境变量**。
将Tomcat压缩包解压到一个**非中文无空格**的目录下。
Tomcat的目录结构：

![image-20220914204033528](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220914204033528.png)

启动Tomcat：运行Tomcat解压后根目录下\bin\startup.bat即可

### 3、在IDEA中关联Tomcat

https://heavy_code_industry.gitee.io/code_heavy_industry/pro001-javaweb/lecture/chapter05/verse03.html

### 4、动态Web工程目录结构介绍

| 目录或文件名            | 功能                                                         |
| ----------------------- | ------------------------------------------------------------ |
| src目录                 | 存放Java源文件                                               |
| web目录                 | 存放Web开发相关资源                                          |
| web/WEB-INF目录         | 存放web.xml文件、classes目录、lib目录                        |
| web/WEB-INF/web.xml文件 | 别名：部署描述符，deployment descriptor 作用：Web工程的核心配置文件 |
| web/WEB-INF/classes目录 | 存放编译得到的*.class字节码文件                              |
| web/WEB-INF/lib目录     | 存放第三方jar包                                              |

==新建web项目并在Tomcat中部署，访问==

**context root 相当于 application context**（Tomcat中application context Server中的url）

![03.第一次使用Servlet](https://raw.githubusercontent.com/T4mako/ImageBed/main/03.第一次使用Servlet.png)

==action为add，向服务器的add组件发请求，add对应AddServler这个类==，将request这个对象传给服务器

```java
request.getParameter() //该方法:1.获取通过http协议提交过来的数据.    通过容器的实现来取得通过get或者post方式提交过来的数据 
//通过html标签中的name获取
```

==request设置相应字符集==

```java
request.setCharacterEncoding("UTF-8")
```

打开网页URL设置可以直接设置为组件（Tomcat Server OpenBrowser URL）

## 三、HTTP协议

HTTP：**H**yper **T**ext **T**ransfer **P**rotocol超文本传输协议。HTTP最大的作用就是**确定了请求和响应数据的格式**。
**浏览器发送给服务器的数据：请求报文**
**服务器返回给浏览器的数据：响应报文。**

 1） Http 称之为 超文本传输协议
 2） Http 是 无状态 的
 3） Http 请求响应包含两个部分：==请求和响应==

      - 请求：
        请求包含三个部分： 1.请求行 ； 2.请求消息头 ； 3.请求主体
        1)请求行包含是三个信息： 1. 请求的方式 ； 2.请求的URL ； 3.请求的协议（一般都是HTTP1.1）
        2)请求消息头中包含了很多客户端需要告诉服务器的信息，比如：我的浏览器型号、版本、我能接收的内容的类型、我给你发的内容的类型、内容的长度等等
        3)请求体，三种情况
          get方式，没有请求体，但是有一个queryString
          post方式，有请求体，form data
          json格式，有请求体，request payload
            - 响应：
        响应也包含三本： 1. 响应行 ； 2.响应头 ； 3.响应体
        1)响应行包含三个信息：1.协议 2.响应状态码(200) 3.响应状态(ok)
        2)响应头：包含了服务器的信息；服务器发送给浏览器的信息（内容的媒体类型、编码、内容长度等）
        3)响应体：响应的实际内容（比如请求add.html页面时，响应的内容就是<html><head><body><form....）



### 1、请求报文

==请求报文的三部分：请求行、请求消息头、请求体==

**浏览器→服务器**

#### 1、请求行

作用：展示当前请求的最基本信息

```http
POST /dynamic/target.jsp HTTP/1.1
```

请求方式
访问地址
HTTP协议的版本

#### 2、请求消息头

作用：通过具体的参数**对本次请求进行详细的说明**
格式：键值对，键和值之间使用冒号隔开

相对比较重要的请求消息头：

| 名称           | 功能                                                 |
| -------------- | ---------------------------------------------------- |
| Host           | 服务器的主机地址                                     |
| Accept         | 声明当前请求能够接受的『媒体类型』                   |
| Referer        | 当前请求来源页面的地址                               |
| Content-Length | 请求体内容的长度                                     |
| Content-Type   | 请求体的内容类型，这一项的具体值是媒体类型中的某一种 |
| Cookie         | **浏览器访问服务器时携带的Cookie数据**               |

![image-20220917150026204](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917150026204.png)

#### 3、请求体

作用：作为请求的主体，发送数据给服务器。具体来说其实就是**POST请求方式下的请求参数**。

[1]form data
含义：当前请求体是一个**表单提交的请求参数**

![image-20220917150418728](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917150418728.png)

[2]Request Payload
含义：**整个请求体**以某种**特定格式**来组织数据，例如JSON格式。

![image-20220917150459419](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917150459419.png)

### 2、请求方式

#### ①HTTP协议已定义的请求方式

HTTP1.1中共定义了八种请求方式：

**GET**：*从服务器端获取*数据
**POST**：将数据保存到服务器端
**PUT**：命令服务器对数据执行更新
**DELETE**：命令服务器删除数据*
HEAD
CONNECT
OPTIONS
TRACE

#### ②GET请求

特征1：**没有请求体**
特征2：**请求参数**附着在**URL地址后面**
特征3：请求参数在浏览器地址栏**能够直接被看到**，存在安全隐患
特征4：在URL地址后面携带请求参数，**数据容量非常有限**。如果数据量大，那么超出容量的数据会丢失
特征5：从报文角度分析，**请求参数是在请求行中携带的**，因为访问地址在请求行

#### ③POST请求

特征1：**有请求体**
特征2：**请求参数放在请求体中**
特征3：请求体发送**数据的空间没有限制**
特征4：可以**发送各种不同类型**的数据
特征5：从报文角度分析，**请求参数是在请求体中**携带的
特征6：由于**请求参数是放在请求体**中，所以**浏览器地址栏看不到**

### 3、响应报文

==响应报文的三部分：响应状态行、响应消息头、响应体==

**服务器→浏览器**

#### ①响应状态行

```http
HTTP/1.1 200 OK
```

HTTP协议版本
**响应状态码**
响应状态的说明文字

#### ②响应消息头

响应体的说明书。
**服务器端对浏览器端设置数据**，例如：服务器端返回Cookie信息。

| 名称           | 功能                                                     |
| -------------- | -------------------------------------------------------- |
| Content-Type   | 响应体的内容类型                                         |
| Content-Length | 响应体的内容长度                                         |
| Set-Cookie     | **服务器返回新的Cookie信息给浏览器**                     |
| location       | 在**重定向**的情况下，告诉**浏览器访问下一个资源的地址** |

![image-20220917151743113](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917151743113.png)

#### ③响应体

服务器返回的数据主体，有可能是各种数据类型。

HTML页面、图片、视频以下载形式返回的文件
CSS文件、JavaScript文件

![image-20220917151835657](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917151835657.png)

#### ④响应状态码

作用：以编码的形式告诉浏览器当前请求处理的结果

| 状态码  | 含义                                                         |
| ------- | ------------------------------------------------------------ |
| 200     | 服务器成功处理了当前请求，成功返回响应                       |
| 302     | 重定向                                                       |
| 400     | [SpringMVC特定环境]请求参数问题                              |
| 403     | 没有权限                                                     |
| **404** | **找不到目标资源**                                           |
| **405** | **请求方式和服务器端对应的处理方式不一致 **（请求为get而处理为post） |
| 406     | [SpringMVC特定环境]请求扩展名和实际返回的响应体类型不一致    |
| **50X** | **服务器端内部错误，通常都是服务器端抛异常了**               |

**404产生的具体原因：**
访问地址写错了，确实是没有这个资源
访问了WEB-INF目录下的资源
Web应用启动的时候，控制台已经抛出异常，导致整个Web应用不可用，访问任何资源都是404
服务器端缓存

### 4、会话

1、http是 **无状态** 的
无状态：服务器无法判断两次请求是否是同一个客户端还是不同客户端
通过 **会话跟踪技术** 解决无状态的问题

2、会话跟踪技术：
**客户端第一次发请求给服务器，服务器获取session**，**获取不到，则创建新的**，然后响应给客户端
下一次客户端给服务器发请求时，会把sessionID带给服务器服务器判断这次和上次请求是否是同一个客户端，从而区分开客户端
常用API：
**request.getSession() -> 获取当前的会话，没有则创建一个新的会话
request.getSession(true)-> 效果和不带参数相同
request.getSession(false) -> 获取当前会话，没有则返回null，不会创建新的
session.getId() -> 获取sessionId
session.isNew() -> 判断当前session是否是新的
session.getMaxInactiveInterval() -> session的非激活间隔时长，默认1800秒 （session持续时间）
session.setMaxInactiveInterval()
session.invalidate() -> 强制让会话立即失效**

3、session保存作用域
sessioin保存作用域是和具体的某一个session对应的 **（一次会话范围内有效 （*一个客户端一个session*））**
常用的API：
**void session.setAttribute(k,v)  往session保存作用域中保存数据
Object session.getAttribute(k)  往session保存作用域中获取数据
void removeAttribute(k)**

### 5、服务器内部转发以及客户端重定向

1） **服务器内部转发 : request.getRequestDispatcher("...").forward(request,response);**

      - 一次请求响应的过程，对于客户端而言，内部经过了多少次转发，客户端是不知道的
            - **地址栏没有变化**

2）**客户端重定向：response.sendRedirect("....");**

   - 两次请求响应的过程。客户端肯定知道请求URL有变化
     **地址栏有变化**

![04.服务器内部转发](https://raw.githubusercontent.com/T4mako/ImageBed/main/04.服务器内部转发.png)

![05.客户端重定向](https://raw.githubusercontent.com/T4mako/ImageBed/main/05.客户端重定向.png)

## 四、Servlet

### 1、Servlet概述

**Servlet=Server+applet**
*Server：服务器、applet：小程序*
**Servlet含义是服务器端的小程序***

![image-20220917152349188](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917152349188.png)

在整个Web应用中，Servlet主要负责 **处理请求、协调调度功能**。我们可以把Servlet称为Web应用中的 **控制器**

### 2、Servlet  HelloWorld

在页面上点击超链接，由Servlet处理这个请求，并返回一个响应字符串：Hello,I am Servlet

①第一步：创建动态 Web module
②第二步：创建超链接

```html
<!-- /Web应用地址/Servlet地址 -->
<a href="/app/helloServlet">Servlet Hello World</a>
```

③第三步：创建HelloServlet的Java类

```java
public class HelloServlet implements Servlet {
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {

    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {

        // 控制台打印，证明这个方法被调用了
        System.out.println("我是HelloServlet，我执行了！");

        // 返回响应字符串
        // 1、获取能够返回响应数据的字符流对象
        PrintWriter writer = servletResponse.getWriter();

        // 2、向字符流对象写入数据
        writer.write("Hello,I am Servlet");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}
```

④第四步：配置HelloServlet
配置文件位置：WEB-INF/web.xml

```xml
<!-- 配置Servlet本身 -->
<servlet>
    <!-- 全类名太长，给Servlet设置一个简短名称 -->
    <servlet-name>HelloServlet</servlet-name>
    <!-- 配置Servlet的全类名 -->
    <servlet-class>com.atguigu.servlet.HelloServlet</servlet-class>
</servlet>
<!-- 将Servlet和访问地址关联起来 -->
<servlet-mapping>
    <servlet-name>HelloServlet</servlet-name>
    <url-pattern>/helloServlet</url-pattern>
</servlet-mapping>
```

<img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917153143610.png" alt="image-20220917153143610" style="zoom:200%;" />

**虚拟路径**：Servlet并**不是**文件系统中**实际存在**的**目录或文件**，所以为了方便浏览器访问，我们创建了**虚拟**出来的路径来访问它。

#### Web工程中的资源：

静态资源：HTML，CSS，JS，图片
动态资源：Servlet

访问资源的地址：
静态资源：/Web应用名称/静态资源本身的路径
动态资源：/Web应用名称/虚拟路径

#### 总体逻辑结构：

![image-20220917153538804](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917153538804.png)

![image-20220917153638692](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917153638692.png)

![image-20220917153645060](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917153645060.png)

![image-20220917153654438](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917153654438.png)

![image-20220917153702954](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917153702954.png)

### 3、Servlet生命周期

生命周期：从出生到死亡的过程就，对应Servlet的三个方法：==init(),service(),destroy()==

默认情况下：Servlet在**第一次接收到请求**的时候才**创建对象**(调用**构造器**，实例化)，然后初始化（init方法）、然后服务（service方法）
当容器关闭时，其中的所有servlet实例被销毁，调用销毁方法

创建对象后，所有的URL地址匹配的请求都由这同一个对象来处理
Tomcat中，每一个请求会被分配一个线程来处理，所以可以说：Servlet是**单实例，多线程**方式运行的。
既然Servlet是多线程方式运行，所以有线程安全方面的可能性，所以**不能在处理请求的方法中修改公共属性**。

在web.xml中修改Servlet配置，使得在Web应用启动的时候创建Servlet对象

```xml
<!-- 配置Servlet本身 -->
<servlet>
    <!-- 全类名太长，给Servlet设置一个简短名称 -->
    <servlet-name>HelloServlet</servlet-name>

    <!-- 配置Servlet的全类名 -->
    <servlet-class>com.atguigu.servlet.HelloServlet</servlet-class>

    <!-- 配置Servlet启动顺序 -->
    <load-on-startup>1</load-on-startup>
</servlet>
```

### 4、Servlet容器

①容器
在开发使用的各种技术中，经常会有**很多对象会放在容器**中。

②容器提供的功能
容器会管理内部对象的整个生命周期。**对象在容器中才能够正常的工作，得到来自容器的全方位的支持**。

创建对象
初始化
工作
清理

③容器本身也是对象
特点1：往往是非常大的对象
特点2：通常的单例的

④典型Servlet容器产品举例
Tomcat、jetty、jboss、Weblogic、WebSphere、glassfish

#### 

| 名称       | 时机                                                         | 次数 |
| ---------- | ------------------------------------------------------------ | ---- |
| 创建对象   | 默认情况：接收到第一次请求 修改启动顺序后：Web应用启动过程中 | 一次 |
| 初始化操作 | 创建对象之后                                                 | 一次 |
| 处理请求   | 接收到请求                                                   | 多次 |
| 销毁操作   | Web应用卸载之前                                              | 一次 |

### 5、ServletConfig和ServletContext

#### 1、ServletConfig接口

接口方法：

| 方法名                  | 作用                                                         |
| ----------------------- | ------------------------------------------------------------ |
| getServletName()        | 获取<servlet-name>HelloServlet</servlet-name>定义的Servlet名称 |
| **getServletContext()** | 获取ServletContext对象                                       |
| getInitParameter()      | 获取配置Servlet时设置的『初始化参数』，根据名字获取值        |
| getInitParameterNames() | 获取所有初始化参数名组成的Enumeration对象                    |

使用举例：

```xml
<!-- 配置Servlet本身 -->
<servlet>
    <!-- 全类名太长，给Servlet设置一个简短名称 -->
    <servlet-name>HelloServlet</servlet-name>
    <!-- 配置Servlet的全类名 -->
    <servlet-class>com.atguigu.servlet.HelloServlet</servlet-class>
    <!-- 配置初始化参数 -->
    <init-param>
        <param-name>goodMan</param-name>
        <param-value>me</param-value>
    </init-param>
    <!-- 配置Servlet启动顺序 -->
    <load-on-startup>1</load-on-startup>
</servlet>
```

```java
public class HelloServlet implements Servlet {

    // 声明一个成员变量，用来接收init()方法传入的servletConfig对象
    private ServletConfig servletConfig;

    public HelloServlet(){
        System.out.println("我来了！HelloServlet对象创建！");
    }

    @Override
    public void init(ServletConfig servletConfig) throws ServletException {

        System.out.println("HelloServlet对象初始化");

        // 将Tomcat调用init()方法时传入的servletConfig对象赋值给成员变量
        this.servletConfig = servletConfig;

    }

    @Override
    public ServletConfig getServletConfig() {

        // 返回成员变量servletConfig，方便使用
        return this.servletConfig;
    }

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {

        // 控制台打印，证明这个方法被调用了
        System.out.println("我是HelloServlet，我执行了！");

        // 返回响应字符串
        // 1、获取能够返回响应数据的字符流对象
        PrintWriter writer = servletResponse.getWriter();

        // 2、向字符流对象写入数据
        writer.write("Hello,I am Servlet");

        // =============分割线===============
        // 测试ServletConfig对象的使用
        // 1.获取ServletConfig对象：在init()方法中完成
        System.out.println("servletConfig = " + servletConfig.getClass().getName());

        // 2.通过servletConfig对象获取ServletContext对象
        ServletContext servletContext = this.servletConfig.getServletContext();
        System.out.println("servletContext = " + servletContext.getClass().getName());

        // 3.通过servletConfig对象获取初始化参数
        Enumeration<String> enumeration = this.servletConfig.getInitParameterNames();
        while (enumeration.hasMoreElements()) {
            String name = enumeration.nextElement();
            System.out.println("name = " + name);

            String value = this.servletConfig.getInitParameter(name);
            System.out.println("value = " + value);
        }
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {
        System.out.println("HelloServlet对象即将销毁，现在执行清理操作");
    }
}
```

Servlet标准和JDBC标准对比：

| Servlet标准                     | JDBC标准                             |
| ------------------------------- | ------------------------------------ |
| javax.servlet包下的一系列接口   | javax.sql包下的一系列接口            |
| Servlet容器厂商提供的具体实现类 | 数据库厂商提供的实现类（数据库驱动） |

#### 2、ServletContext接口

功能：
获取 **某个资源的真实路径**：getRealPath()
**获取** 整个Web应用级别的 **初始化参数**：getInitParameter()
作为Web应用范围的域对象
	**存入数据：setAttribute()**
	**取出数据：getAttribute()**

使用举例：

```xml
 <!-- 配置Web应用的初始化参数 -->
    <context-param>
        <param-name>handsomeMan</param-name>
        <param-value>alsoMe</param-value>
    </context-param>
```

```java
String handsomeMan = servletContext.getInitParameter("handsomeMan");
System.out.println("handsomeMan = " + handsomeMan);
```

### 6、Servlet继承关系

1、继承关系：
javax.servlet.Servlet接口
	javax.servlet.GenericServlet抽象类
		javax.servlet.http.HttpServlet抽象子类

2、相关方法：
**javax.servlet.Servlet接口：**
	void init(config)	初始化方法
	void service(request,response)	服务方法
	void destory()	销毁方法

**对于service方法：**
①在javax.servlet.GenericServlet抽象类中，void service(request,response)仍然是抽象的
在java.servlet.HttpServlet抽象子类：void service(request,response)不是抽象的
②**当有请求过来时，service方法会自动响应**（其实是tomcat容器调用的）
③servlet方法所做的事：
**获取的请求方式**
**根据请求方式的不同，调用不同的doXXX方法**
在HttpServlet中这些doXXX方法默认都是405实现风格->要子类实现对应方法，否则报405错误
④因此，我们在新建Servlet时，我们才会去考虑请求方法，从而决定重写哪个do方法

![image-20220917160608144](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917160608144.png)

![image-20220917160624439](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917160624439.png)

### 7、动态web工程内编写路径

整个系统要根据功能拆分成许许多多**独立**的**资源**
资源之间既要完成自身的功能又要和其他资源**配合**
写路径就是为了**从一个资源跳转到下一个资源**

**工程目录**：我们**写代码的地方**，但是在服务器上运行的不是这个。
**部署目录**：经过Java源文件**编译**和**目录重组**后，IDEA就替我们准备好了可以在服务器上运行的部署目录。
部署目录经过了目录重组，所以目录结构不一样
用户通过浏览器访问服务器，而服务器上运行的是部署目录，**所以写路径的时候参考部署目录而不是工程目录。**
**对应关系**：**工程目录下的web目录对应部署目录的根目录**，同时部署目录的根目录也是路径中的**Web应用根目录**。

#### **①具体文件：**

![image-20220917161721361](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917161721361.png)

#### ②**Servlert路径**

访问Servlet的路径是我们在web.xml中配置的，大家可能注意到了，url-pattern里面的路径我们也是**斜杠开头**的，但是这个开头的斜杠代表**Web应用根目录**。

![image-20220917161801727](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917161801727.png)

#### 准则：

一个路径由谁来解析(浏览器、服务器)，其实就是这个路径是谁来用。

| 路径类型           | 解析方式                  |
| ------------------ | ------------------------- |
| 由浏览器解析的路径 | 开头斜杠代表服务器根目录  |
| 由服务器解析的路径 | 开头斜杠代表Web应用根目录 |

![image-20220917161926471](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917161926471.png)

- 浏览器解析的路径举例：
  - 所有HTML标签中的路径
  - 重定向过程中指定的路径
- 服务器解析的路径举例：
  - 所有web.xml中配置的路径
  - 请求转发过程中指定的路径

![image-20220917162121772](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917162121772.png)

#### 动态获取上下文路径：

**上下文路径（context path）=/Web应用名称**

由于项目部署的时候，上下文路径是可以变化的，所以写死有可能发生错误。此时我们通过**request对象动态获取上下文路径**就不用担心这个问题了。调用下面这个方法，每一次获取的都是当前环境下实际的上下文路径的值。

**request.getContextPath()**

### 8、请求转发和重定向

#### 1、服务器内部转发

在请求的处理过程中，Servlet完成了自己的任务，需要把请求**转交给下一个资源**继续处理。

```java
request.getRequestDispatcher("/fruit/apple/red/sweet/big.html").forward(request, response);
```

| 代码                             | 类比           |
| -------------------------------- | -------------- |
| request                          | 小货车         |
| getRequestDispatcher("转发地址") | 告诉司机要去哪 |
| forward(request, response)       | 出发           |

由于转发操作的核心部分是**在服务器端完成**的，所以**浏览器感知不到**，整个过程中**浏览器只发送一次请求**。

#### 2、浏览器重定向

在请求的处理过程中，Servlet完成了自己的任务，然后以一个**响应**的方式告诉浏览器：“要完成这个任务还需要你另外**再访问下一个资源**”。

```java
response.sendRedirect("/app/fruit/apple/red/sweet/big.html");
```

由于重定向操作的核心部分是**在浏览器端完成**的，所以整个过程中浏览器**共发送两次请求**。

| 转发                                         | 重定向                                       |
| -------------------------------------------- | -------------------------------------------- |
| **一次请求**                                 | **两次请求**                                 |
| 浏览器**地址栏显示**的是**第一个**资源的地址 | 浏览器**地址栏显示**的是**第二个**资源的地址 |
| 全程使用的是**同一个request对象**            | 全程使用的是**不同的request对象**            |
| 在**服务器端完成**                           | 在**浏览器端完成**                           |
| 目标资源地址由服务器解析                     | 目标资源地址由浏览器解析                     |
| 目标资源可以在WEB-INF目录下                  | 目标资源不能在WEB-INF目录下                  |
| 目标资源仅限于本应用内部                     | 目标资源可以是外部资源                       |

使用场景：
能用转发的先用转发，如果转发不行，再使用重定向。

需要通过同一个request对象把数据携带到目标资源：只能用转发
如果希望前往下一个资源之后，浏览器刷新访问的是第二个资源：只能用重定向

### 9、获取请求参数

浏览器在给服务器发送请求的同时，携带的参数数据。
请求参数的基本形式：
	URL地址后面附着的请求参数
	表单
	Ajax请求

总体上来说，服务器端将请求参数封装为**Map<String, String[]>**。
	**键：请求参数的名字**
	**值：请求参数的值组成的数组**

#### 获取请求参数的方法(request.)

| 方法名                                       | 返回值类型            |
| -------------------------------------------- | --------------------- |
| request.getParameterMap()                    | `Map<String, String[]>` |
| request.getParameter("请求参数的名字")       | String                |
| request.getParameterValues("请求参数的名字") | String []             |
| request.getParameterNames()                  | `Enumeration<String>`   |

### 10、请求响应设置字符集

#### 1、请求

#### 1、GET

设置方式

![image-20220917164406033](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917164406033.png)

#### 2、Post

设置方式
注：设置字符集必须在获取请求参数之前

```java
// 使用request对象设置字符集
request.setCharacterEncoding("UTF-8");

// 获取请求参数
String username = request.getParameter("username");

System.out.println("username = " + username);
```

#### 2、响应

1、设置方式一：

```java
// 设置服务器端的编码字符集
response.setCharacterEncoding("UTF-8");
```

2、设置方式二：

```java
response.setContentType("text/html;charset=UTF-8");
```

response.getWriter()不能出现在设置字符集操作的前面（两种方式都不行）

## 五、Thymeleaf

1） 添加thymeleaf的jar包
2） ==新建一个Servlet类**ViewBaseServlet**==
3） 在web.xml文件中添加配置

       - 配置前缀 view-prefix
              - 配置后缀 view-suffix

4） ==使得**我们的Servlet继承ViewBaseServlet**==
**VIewBaseServlet继承了HttpServlet
我们创建的Servlet继承了ViewServlet**

5） 根据逻辑视图名称 得到 物理视图名称
//此处的视图名称是 index
//那么thymeleaf会将这个 逻辑视图名称 对应到 物理视图 名称上去
//逻辑视图名称 ：   index
//物理视图名称 ： **view-prefix + 逻辑视图名称 + view-suffix**
//所以真实的视图名称是：      /       index       .html
super.processTemplate("index",request,response);
6） 使用thymeleaf的标签
  th:if   ,  th:unless   , th:each   ,   th:text



### ViewBaseServlet

有关ViewBaseServlet

```java
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ViewBaseServlet extends HttpServlet {

    private TemplateEngine templateEngine;

    @Override
    public void init() throws ServletException {

        // 1.获取ServletContext对象
        ServletContext servletContext = this.getServletContext();

        // 2.创建Thymeleaf解析器对象
        ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(servletContext);

        // 3.给解析器对象设置参数
        // ①HTML是默认模式，明确设置是为了代码更容易理解
        templateResolver.setTemplateMode(TemplateMode.HTML);

        // ②设置前缀
        String viewPrefix = servletContext.getInitParameter("view-prefix");

        templateResolver.setPrefix(viewPrefix);

        // ③设置后缀
        String viewSuffix = servletContext.getInitParameter("view-suffix");

        templateResolver.setSuffix(viewSuffix);

        // ④设置缓存过期时间（毫秒）
        templateResolver.setCacheTTLMs(60000L);

        // ⑤设置是否缓存
        templateResolver.setCacheable(true);

        // ⑥设置服务器端编码方式
        templateResolver.setCharacterEncoding("utf-8");

        // 4.创建模板引擎对象
        templateEngine = new TemplateEngine();

        // 5.给模板引擎对象设置模板解析器
        templateEngine.setTemplateResolver(templateResolver);

    }

    protected void processTemplate(String templateName, HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // 1.设置响应体内容类型和字符集
        resp.setContentType("text/html;charset=UTF-8");

        // 2.创建WebContext对象
        WebContext webContext = new WebContext(req, resp, getServletContext());

        // 3.处理模板数据
        templateEngine.process(templateName, webContext, resp.getWriter());
    }
}
```



### 1、Thymeleaf简介

Thymeleaf、JSP、Freemarker、Velocity等等，它们有一个共同的名字：**服务器端模板技术**

**thymeleaf帮助我们做视图渲染**
**渲染：在html页面上加载java内存中的数据**

Thymeleaf的优势：
SpringBoot官方推荐使用的视图模板技术，和SpringBoot完美整合。
不经过服务器运算仍然可以直接查看原始值，对前端工程师更友好。

物理视图和逻辑视图
①物理视图
在Servlet中，将请求转发到一个HTML页面文件时，使用的完整的转发路径就是**物理视图**。

如果我们把所有的HTML页面都放在某个统一的目录下，那么转发地址就会呈现出明显的规律：![image-20220917185459523](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917185459523.png)

所以，路径开头的部分我们称之为**视图前缀**，路径结尾的部分我们称之为**视图后缀**。

②逻辑视图
物理视图=视图前缀+逻辑视图+视图后缀
上面的例子中：

| 视图前缀     | 逻辑视图      | 视图后缀 | 物理视图                       |
| ------------ | ------------- | -------- | ------------------------------ |
| /pages/user/ | login         | .html    | /pages/user/login.html         |
| /pages/user/ | login_success | .html    | /pages/user/login_success.html |

### 2、在服务器端引入Thymeleaf环境

https://heavy_code_industry.gitee.io/code_heavy_industry/pro001-javaweb/lecture/chapter08/verse03.html

### 3、基本语法：th名称空间

![image-20220917190228445](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917190228445.png)

### 4、基本语法：表达式语法

#### 1、修改标签文本值

```html
<p th:text="标签体新值">标签体原始值</p>
```

##### ①th:text作用

不经过服务器解析，直接用浏览器打开HTML文件，看到的是标签体原始值
**经过服务器解析**，Thymeleaf引擎根**据th:text属性指定**的标签体新值去**替换**标签体原始值

##### ②字面量

字面量是一个经常会遇到的概念，我们可以对照变量来理解它的含义
**变量**：变量名字符串本身不是它的值，**它指向的才是它的值**
**字面量**：它就是字面上的含义，我们**从字面上看到的直接就是它的值**
现在我们在th:text属性中使用的就是**字面量**，它**不指代任何其他值**

#### 2、修改指定属性值

```html
<input type="text" name="username" th:value="文本框新值" value="文本框旧值" />
```

语法：任何HTML标签原有的属性，**前面加上『th:』就都可以通过Thymeleaf来设定新值。**

#### ==3、解析URL地址==

##### ①基本语法

```html
<p th:text="@{/aaa/bbb/ccc}">标签体原始值</p>
```

经过解析后得到：/view/aaa/bbb/ccc

所以==@{}==的作用是**在字符串前附加『上下文路径』**

这个语法的好处是：实际开发过程中，项目在不同环境部署时，Web应用的名字有可能发生变化。所以上下文路径不能写死。而通过@{}动态获取上下文路径后，不管怎么变都不怕啦！

##### ②首页使用URL地址解析

如果我们直接访问index.html本身，那么**index.html是不需要通过Servlet**，**当然也不经过模板引擎**，所以**index.html上的Thymeleaf的任何表达式都不会被解析**。

![image-20220917191612545](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917191612545.png)

解决办法：通过Servlet访问index.html，这样就可以让模板引擎渲染页面了：

![image-20220917191730539](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917191730539.png)

##### ③==给URL地址后面附加请求参数==

**一个变量对应一个value值**

![image-20220923195523837](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220923195523837.png)

#### 4、直接执行表达式

![image-20220917191950294](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220917191950294.png)

### 5、基本语法：访问域对象（保存作用域）

#### 1、域对象

##### ①请求域：HttpServletRequest对象内部给我们提供的存储空间（requese 一次会话范围有效）

##### ②会话域（session 一次会话范围有效）

![image-20220923154339888](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220923154339888.png)

##### ③应用域（application 一次应用程序范围有效）

![image-20220923154427454](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220923154427454.png)

#### 2、在servlet中将数据存入域

##### ①操作请求域

**Servlet中：**

```java
String requestAttrName = "helloRequestAttr";
String requestAttrValue = "helloRequestAttr-VALUE";
request.setAttribute(requestAttrName, requestAttrValue);//(key,value)
```

**thymeleaf中：**

```html
<!-- ${}只需要写key，为String类型 -->
<p th:text="${helloRequestAttr}">request field value</p>
```

```html
<form th:action="@{/update.do}" method="post" th:object="${fruit}"> <!--表示from中的属性都来自fruit-->
					<input type="hidden" name="fid" th:value="*{fid}" />
```

##### ②操作会话域

**Servlet中代码：**

```java
// 1、通过request对象获取session对象
HttpSession session = request.getSession();
// 2、存入数据
session.setAttribute("helloSessionAttr", "helloSessionAttr-VALUE");
```

**thymeleaf中：**

```html
<p th:text="${session.helloSessionAttr}">这里显示会话域数据</p>
```

##### ③操作应用域

**Servlet中代码：**

```java
// 1、通过调用父类的方法获取ServletContext对象
//ServletContext:Servlet上下文
ServletContext application = getServletContext();
// 2、存入数据
application.setAttribute("helloAppAttr", "helloAppAttr-VALUE");
```

**Thymeleaf表达式：**

```html
<p th:text="${application.helloAppAttr}">这里显示应用域数据</p>
```

### 6、获取请求参数

![image-20220923161405776](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220923161405776.png)

```html
<p th:text="${param.username}">这里替换为请求参数的值</p> <!--一个名字一个值-->
<p th:text="${param.team}">这里替换为请求参数的值</p> <!--一个名字多个值-->
<p th:text="${param.team[0]}">这里替换为请求参数的值</p>
<p th:text="${param.team[1]}">这里替换为请求参数的值</p>
```

### 7、内置对象

所谓内置对象其实就是在表达式中**可以直接使用**的对象

**基本内置对象：**

![image-20220923162427773](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220923162427773.png)

```html
<h3>表达式的基本内置对象</h3>
<p th:text="${#request.getClass().getName()}">这里显示#request对象的全类名</p>
<p th:text="${#request.getContextPath()}">调用#request对象的getContextPath()方法</p>
<p th:text="${#request.getAttribute('helloRequestAttr')}">调用#request对象的getAttribute()方法，读取属性域</p>
```

基本思路：
如果不清楚这个对象有哪些方法可以使用，那么就**通过getClass().getName()获取全类名**，再**回到Java环境查看这个对象有哪些方法**
内置对象的**方法可以直接调用**
**调用方法**时**需要传参**的也可以**直接传入参数**

**公共内置对象：**

![image-20220923162455736](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220923162455736.png)

Servlet中将List集合数据存入请求域：

```java
request.setAttribute("aNotEmptyList", Arrays.asList("aaa","bbb","ccc"));
request.setAttribute("anEmptyList", new ArrayList<>());
```

页面代码：

```html
<p>#list对象isEmpty方法判断集合整体是否为空aNotEmptyList：<span th:text="${#lists.isEmpty(aNotEmptyList)}">测试#lists</span></p>
<p>#list对象isEmpty方法判断集合整体是否为空anEmptyList：<span th:text="${#lists.isEmpty(anEmptyList)}">测试#lists</span></p>
```

### 8、${ }中的表达式本质是OGNL

OGNL：Object-Graph Navigation Language对象-图 导航语言

### 9、OGNL语法

#### ①起点

在Thymeleaf环境下，${}中的表达式可以从下列元素开始：

访问属性域的起点:
	请求域属性名
	session
	application
	param
	内置对象
		\#request
		\#session
		\#lists
		\#strings

#### ②属性访问语法

访问对象属性：使用getXxx()、setXxx()方法定义的属性
	对象.属性名
访问List集合或数组
	集合或数组[下标]
访问Map集合
	Map集合.key
	Map集合['key']

### 10、分支与迭代

#### 1、分支

**①if和unless**
让标记了th:if、th:unless的标签根据条件决定是否显示。

示例的实体类：

```java
public class Employee {

    private Integer empId;
    private String empName;
    private Double empSalary;
```

示例的Servlet代码：

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    // 1.创建ArrayList对象并填充
    List<Employee> employeeList = new ArrayList<>();

    employeeList.add(new Employee(1, "tom", 500.00));
    employeeList.add(new Employee(2, "jerry", 600.00));
    employeeList.add(new Employee(3, "harry", 700.00));

    // 2.将集合数据存入请求域
    request.setAttribute("employeeList", employeeList);

    // 3.调用父类方法渲染视图
    super.processTemplate("list", request, response);
}
```

示例的HTML代码：

```html
<table>
    <tr>
        <th>员工编号</th>
        <th>员工姓名</th>
        <th>员工工资</th>
    </tr>
    <tr th:if="${#lists.isEmpty(employeeList)}">
        <td colspan="3">抱歉！没有查询到你搜索的数据！</td>
    </tr>
    <tr th:if="${not #lists.isEmpty(employeeList)}">
        <td colspan="3">有数据！</td>
    </tr>
    <tr th:unless="${#lists.isEmpty(employeeList)}">
        <td colspan="3">有数据！</td>
    </tr>
</table>
```

#### ②switch

```html
<h3>测试switch</h3>
<div th:switch="${user.memberLevel}">
    <p th:case="level-1">银牌会员</p>
    <p th:case="level-2">金牌会员</p>
    <p th:case="level-3">白金会员</p>
    <p th:case="level-4">钻石会员</p>
</div>
```

#### 2、迭代

```html
<h3>测试each</h3>
<table>
    <thead>
        <tr>
            <th>员工编号</th>
            <th>员工姓名</th>
            <th>员工工资</th>
        </tr>
    </thead>
    <tbody th:if="${#lists.isEmpty(employeeList)}">
        <tr>
            <td colspan="3">抱歉！没有查询到你搜索的数据！</td>
        </tr>
    </tbody>
    <tbody th:if="${not #lists.isEmpty(employeeList)}">
        <!-- 遍历出来的每一个元素的名字 : ${要遍历的集合} -->
        <tr th:each="employee : ${employeeList}">
            <td th:text="${employee.empId}">empId</td>
            <td th:text="${employee.empName}">empName</td>
            <td th:text="${employee.empSalary}">empSalary</td>
        </tr>
    </tbody>
</table>
```

![image-20220923164310877](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220923164310877.png)

```html
<h3>测试each</h3>
<table>
    <thead>
        <tr>
            <th>员工编号</th>
            <th>员工姓名</th>
            <th>员工工资</th>
            <th>迭代状态</th>
        </tr>
    </thead>
    <tbody th:if="${#lists.isEmpty(employeeList)}">
        <tr>
            <td colspan="3">抱歉！没有查询到你搜索的数据！</td>
        </tr>
    </tbody>
    <tbody th:if="${not #lists.isEmpty(employeeList)}">
        <!-- 遍历出来的每一个元素的名字 : ${要遍历的集合} -->
        <tr th:each="employee,empStatus : ${employeeList}">
            <td th:text="${employee.empId}">empId</td>
            <td th:text="${employee.empName}">empName</td>
            <td th:text="${employee.empSalary}">empSalary</td>
            <td th:text="${empStatus.count}">count</td>
        </tr>
    </tbody>
</table>
```

### 11、包含其他模板文件

https://heavy_code_industry.gitee.io/code_heavy_industry/pro001-javaweb/lecture/chapter08/verse11.html

## CRUD练习

https://heavy_code_industry.gitee.io/code_heavy_industry/pro001-javaweb/lecture/chapter08/verse12.html

## Fruit项目优化

1. 一个请求对应一个Servlet，这样存在的问题是servlet太多了
2. 把一些列的请求都对应一个Servlet, IndexServlet/AddServlet/EditServlet/DelServlet/UpdateServlet -> 合并成FruitServlet
   通过一个operate的值来决定调用FruitServlet中的哪一个方法
   使用的是switch-case
3. 在上一个版本中，Servlet中充斥着大量的switch-case，试想一下，随着我们的项目的业务规模扩大，那么会有很多的Servlet，也就意味着会有很多的switch-case，这是一种代码冗余
   因此，我们在servlet中使用了反射技术，我们规定operate的值和方法名一致，那么接收到operate的值是什么就表明我们需要调用对应的方法进行响应，如果找不到对应的方法，则抛异常
4. 在上一个版本中我们使用了反射技术，但是其实还是存在一定的问题：每一个servlet中都有类似的反射技术的代码。因此继续抽取，设计了中央控制器类：`DispatcherServlet`
  ` DispatcherServlet`这个类的工作分为两大部分：
1. 根据url定位到能够处理这个请求的controller组件：
    - 从url中提取servletPath : /fruit.do -> fruit
    - 根据fruit找到对应的组件:FruitController ， 这个对应的依据我们存储在applicationContext.xml中
      `<bean id="fruit" class="com.atguigu.fruit.controllers.FruitController/>`
      通过DOM技术我们去解析XML文件，在中央控制器中形成一个beanMap容器，用来存放所有的Controller组件
    - 根据获取到的operate的值定位到我们FruitController中需要调用的方法
2. 调用Controller组件中的方法：
   - 获取参数
       获取即将要调用的方法的参数签名信息: Parameter[] parameters = method.getParameters();
       通过parameter.getName()获取参数的名称；
       准备了Object[] parameterValues 这个数组用来存放对应参数的参数值
       另外，我们需要考虑参数的类型问题，需要做类型转化的工作。通过parameter.getType()获取参数的类型
    - 执行方法
       Object returnObj = method.invoke(controllerBean , parameterValues);
    - 视图处理


## 六、MVC
###  1、servlet初始化回顾

Servlet生命周期：实例化、初始化、服务、销毁

Servlet中的初始化方法有两个：init() , init(config)
其中带参数的方法代码如下：

```java
//带参数
public void init(ServletConfig config) throws ServletException {
    this.config = config ;
    init();
}
//无参数
public void init() throws ServletException{
}
```

   如果我们想要在Servlet**初始化时做一些准备工作，那么我们可以重写init方法**
   我们可以通过如下步骤去获取初始化设置的数据

**获取config对象：ServletConfig config = getServletConfig();
获取初始化参数值： config.getInitParameter(key);**

在web.xml文件中配置Servlet

```xml
<servlet>
    <servlet-name>Demo01Servlet</servlet-name>
    <servlet-class>com.atguigu.servlet.Demo01Servlet</servlet-class>
    <init-param>
        <param-name>hello</param-name>
        <param-value>world</param-value>
    </init-param>
    <init-param>
        <param-name>uname</param-name>
        <param-value>jim</param-value>
    </init-param>
</servlet>
<servlet-mapping>
    <servlet-name>Demo01Servlet</servlet-name>
    <url-pattern>/demo01</url-pattern>
</servlet-mapping>
```

也可以通过注解的方式进行配置：

```java
@WebServlet(urlPatterns = {"/demo01"} ,
initParams = {
    @WebInitParam(name="hello",value="world"),
    @WebInitParam(name="uname",value="jim")
})
```

### 2、学习Servlet中的ServletContext和\<context-param>

1) 获取ServletContext，有很多方法
   在初始化方法中： ServletContxt servletContext = getServletContext();
   在服务方法中也可以通过request对象获取，也可以通过session获取：
   request.getServletContext(); session.getServletContext()
2) 获取初始化值：
   servletContext.getInitParameter();

通过ServletContext获取配置的上下文参数

### 3业务层

Model1和Model2
**MVC : Model（模型）、View（视图）、Controller（控制器）**
视图层：用于做**数据展示**以及和**用户交互的**一个**界面**
控制层：能够**接受客户端的请求**，**具体的业务功能还是需要借助于模型组件来完成**
模型层：模型分为很多种：有比较简单的pojo/vo(value object)，有业务模型组件，有数据访问层组件
	pojo/vo : 值对象
	DAO ： 数据访问对象
	BO ： 业务对象

模型有很多种类：数据访问模型（DAO）；业务逻辑模型（BO）；值对象模型（POJO）；数据传输对象（DTO）

**DAO中的方法**都是**单精度**方法或称**细粒度**方法。一个方法只考虑一个操作，比如添加，那就是insert操作、查询那就是select操作....(**只是一种操作**)
**BO**中的方法属于**业务方法**，也实际的业务是**比较复杂**的，因此业务方法的**粒度是比较粗**的
          注册这个功能属于业务功能，也就是说注册这个方法属于业务方法。
          那么这个**业务方法中包含了多个DAO方法**。

## 七、IOC（控制反转）

**IOC - 控制反转 / DI - 依赖注入**

**控制反转：**
	之前在Servlet中，我们创建service对象 ， FruitService fruitService = new FruitServiceImpl();
	这句话如果出现在servlet中的**某个方法内部**，那么这个fruitService的作用域（生命周期）应该就是**这个方法级别**；
	如果这句话出现在servlet的**类中**，也就是说fruitService是一个**成员变量**，那么这个fruitService的作用域（生命周期）应该就是这个**servlet实例级别**

​	之后我们在**applicationContext.xml中定义了这个fruitService**。然后**通过解析XML**，**产生fruitService实例**，**存放在beanMap中**，这个**beanMap在一个BeanFactory中 **
​	因此，我们**转移（改变）了之前的service实例、dao实例等等他们的生命周期**。控制权从程序员转移到**BeanFactory(IOC容器)**。这个现象我们称之为**控制反转**

**依赖注入：**
	之前我们在控制层出现代码：FruitService fruitService = new FruitServiceImpl()；
	那么，控制层和service层存在耦合。
	之后，我们将代码修改成FruitService fruitService = null ;
	然后，在配置文件中配置:

```xml
<bean id="fruit" class="FruitController">
     <property name="fruitService" ref="fruitService"/>
</bean>
```



### 配置监听器要读取的文件，目的是加载IOC容器的配置文件

```xml
<beans>
    <!--需要的组件-->
    <bean id="userBasicDAO" class="qqzone.DAO.impl.UserBasicDAOImp"/>
    <bean id="topicDAO" class="qqzone.DAO.impl.TopicDaoImpl"/>
    <bean id="userBasicService" class="qqzone.service.impl.UserBasicServiceImpl">
<!--        组件中需要的属性 属性名，id值-->
        <property name="userBasicDAO" ref="userBasicDAO"/>
    </bean>

    <bean id="topicService" class="qqzone.service.impl.TopicServiceImpl">
        <property name="topicDAO" ref="topicDAO"/>
    </bean>

    <bean id="user" class="qqzone.Controller.UserController">
        <property name="userBasicService" ref="userBasicService"/>
        <property name="topicService" ref="topicService"/>
    </bean>
</beans>
```

**根据bean获取所有元素节点，添加到map中，对于每个节点的子节点，通过反射添加它们中的依赖**

## 八、过滤器Filter

### 1、过滤器的三要素：

①拦截：
过滤器之所以能够对请求进行预处理，关键是对请求进行拦截，把请求拦截下来才能够做后续的操作。而且对于一个具体的过滤器，它**必须明确它要拦截的请求**，而不是所有请求都拦截。

②过滤：
根据业务功能实际的需求，看看在把请求拦截到之后，需要**做什么检查或什么操作，写对应的代码即可**。

③放行：
过滤器完成自己的任务或者是检测到当前请求符合过滤规则，那么可以将请求放行。所谓放行，就是**让请求继续去访问它原本要访问的资源**。

### 2、操作步骤

1. Filter也属于Servlet规范

2. Filter开发步骤：新建类**实现javax.servlet.Filter接口**，然后实现其中的三个方法：init、doFilter、destroy
   配置Filter，可以用注解@WebFilter，`也可以使用xml文件 <filter> <filter-mapping>`

   **在doFilter()方法中执行过滤**

   如果**满足过滤条件**使用**chain.doFilter(request, response);放行**

   如果**不满足过滤条件转发或重定向请求**

3. Filter在配置时，和servlet一样，也可以配置通配符，例如 @WebFilter("*.do")表示**拦截所有以.do结尾的请求**

4. 过滤器链
   1）如果采取的是**注解的方式进行配置**，那么过滤器链的拦截顺序是**按照全类名的先后顺序**排序的
   2）如果采取的是**xml的方式**进行配置，那么按照**配置的先后顺序**进行排序

5. ```java
   public class Target01Filter implements Filter {
       @Override
       public void init(FilterConfig filterConfig) throws ServletException {
   
       }
   
       @Override
       public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
   
           // 1.打印一句话表明Filter执行了
           System.out.println("过滤器执行：Target01Filter");
   
           // 2.检查是否满足过滤条件
           // 人为设定一个过滤条件：请求参数message是否等于monster
           // 等于：放行
           // 不等于：将请求跳转到另外一 页面
           // ①获取请求参数
           String message = request.getParameter("message");
   
           // ②检查请求参数是否等于monster
           if ("monster".equals(message)) {
               // ③执行放行
               // FilterChain对象代表过滤器链
               // chain.doFilter(request, response)方法效果：将请求放行到下一个Filter，
               // 如果当前Filter已经是最后一个Filter了，那么就将请求放行到原本要访问的目标资源
               chain.doFilter(request, response);
   
           }else{
   
               // ④跳转页面
               request.getRequestDispatcher("/SpecialServlet?method=toSpecialPage").forward(request, response);
           }
       }
       
       @Override
       public void destroy() {
       }
   }
   ```

   

![01.Filter](https://raw.githubusercontent.com/T4mako/ImageBed/main/01.Filter.png)

![02.CharacterEncodingFilter](https://raw.githubusercontent.com/T4mako/ImageBed/main/02.CharacterEncodingFilter.png)

### 3、过滤器生命周期

和Servlet生命周期类比，Filter生命周期的关键区别是：**在Web应用启动时创建对象**

| 生命周期阶段 | 执行时机         | 执行次数 |
| ------------ | ---------------- | -------- |
| 创建对象     | Web应用启动时    | 一次     |
| 初始化       | 创建对象后       | 一次     |
| 拦截请求     | 接收到匹配的请求 | 多次     |
| 销毁         | Web应用卸载前    | 一次     |

## 九、事务管理

1) 涉及到的组件：
     - OpenSessionInViewFilter
     - TransactionManager
     - ThreadLocal
     - ConnUtil
     - BaseDAO


2) ThreadLocal
   
     get() , set(obj)方法（对于同一个线程中）
     
     ThreadLocal称之为本地线程 。 我们可以**通过set方法在当前线程上存储数据、通过get方法在当前线程上获取数据**
     
     set方法源码分析：
     
     ```java
     public void set(T value) {
       Thread t = Thread.currentThread(); //获取当前的线程
       ThreadLocalMap map = getMap(t);    //每一个线程都维护各自的一个容器（ThreadLocalMap）
       if (map != null)
           map.set(this, value);          //这里的key对应的是ThreadLocal，因为我们的组件中需要传输（共享）的对象可能会有多个（不止Connection）
       else
           createMap(t, value);           //默认情况下map是没有初始化的，那么第一次往其中添加数据时，会去初始化
     }
     ```
     
     get方法源码分析：
     
     ```java
     public T get() {
       Thread t = Thread.currentThread(); //获取当前的线程
       ThreadLocalMap map = getMap(t);    //获取和这个线程（企业）相关的ThreadLocalMap（也就是工作纽带的集合）
       if (map != null) {
           ThreadLocalMap.Entry e = map.getEntry(this);   //this指的是ThreadLocal对象，通过它才能知道是哪一个工作纽带
           if (e != null) {
               @SuppressWarnings("unchecked")
               T result = (T)e.value;     //entry.value就可以获取到工具箱了
               return result;
           }
       }
       return setInitialValue();
     }
     ```
     
     

![05.编程式事务管理03](https://raw.githubusercontent.com/T4mako/ImageBed/main/05.编程式事务管理03.png)

![06.ThreadLocal](https://raw.githubusercontent.com/T4mako/ImageBed/main/06.ThreadLocal.png)

## 十、监听器

### 1、观察者模式

- 观察者：监控『被观察者』的行为，一旦发现『被观察者』触发了事件，就会调用事先准备好的方法执行操作。
- 被观察者：『被观察者』一旦触发了被监控的事件，就会被『观察者』发现。

### 2、监听器简介

1、**Servlet监听器**：Servlet规范中定义的一种特殊类，它用于监听Web应用程序中的**ServletContext，HttpSession 和HttpServletRequest等域对象的创建与销毁事件**，以及监听这些**域对象中的属性发生修改的事件**

2、监听器分类

- 域对象监听器
- 域对象的属性域监听器
- Session域中数据的监听器

![image-20221003161917547](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221003161917547.png)

### 3、监听器列表

#### ①ServletContextListener

作用：监听**ServletContext对象**的创建与销毁

| 方法名                                      | 作用                     |
| ------------------------------------------- | ------------------------ |
| contextInitialized(ServletContextEvent sce) | ServletContext创建时调用 |
| contextDestroyed(ServletContextEvent sce)   | ServletContext销毁时调用 |

ServletContextEvent对象代表从ServletContext对象身上捕获到的事件，通过这个事件对象我们可以获取到ServletContext对象。

#### ②HttpSessionListener

作用：监听**HttpSession对象**的创建与销毁

| 方法名                                 | 作用                      |
| -------------------------------------- | ------------------------- |
| sessionCreated(HttpSessionEvent hse)   | HttpSession对象创建时调用 |
| sessionDestroyed(HttpSessionEvent hse) | HttpSession对象销毁时调用 |

HttpSessionEvent对象代表从HttpSession对象身上捕获到的事件，通过这个事件对象我们可以获取到触发事件的HttpSession对象。

#### ③ServletRequestListener

作用：监听**ServletRequest对象**的创建与销毁

| 方法名                                      | 作用                         |
| ------------------------------------------- | ---------------------------- |
| requestInitialized(ServletRequestEvent sre) | ServletRequest对象创建时调用 |
| requestDestroyed(ServletRequestEvent sre)   | ServletRequest对象销毁时调用 |

ServletRequestEvent对象代表从HttpServletRequest对象身上捕获到的事件，通过这个事件对象我们可以获取到触发事件的HttpServletRequest对象。另外还有一个方法可以获取到当前Web应用的ServletContext对象。

#### ④ServletContextAttributeListener

作用：监听**ServletContext中属性**的创建、修改和销毁

| 方法名                                               | 作用                                 |
| ---------------------------------------------------- | ------------------------------------ |
| attributeAdded(ServletContextAttributeEvent scab)    | 向ServletContext中添加属性时调用     |
| attributeRemoved(ServletContextAttributeEvent scab)  | 从ServletContext中移除属性时调用     |
| attributeReplaced(ServletContextAttributeEvent scab) | 当ServletContext中的属性被修改时调用 |

ServletContextAttributeEvent对象代表属性变化事件，它包含的方法如下：

| 方法名              | 作用                         |
| ------------------- | ---------------------------- |
| getName()           | 获取**修改或添加的属性名**   |
| getValue()          | 获取**被修改或添加的属性值** |
| getServletContext() | 获取**ServletContext对象**   |

#### ⑤HttpSessionAttributeListener

作用：监听**HttpSession中属性**的创建、修改和销毁

| 方法名                                        | 作用                                  |
| --------------------------------------------- | ------------------------------------- |
| attributeAdded(HttpSessionBindingEvent se)    | 向HttpSession中**添加属性时**调用     |
| attributeRemoved(HttpSessionBindingEvent se)  | 从HttpSession中**移除属性时**调用     |
| attributeReplaced(HttpSessionBindingEvent se) | 当HttpSession中的**属性被修改时**调用 |

**HttpSessionBindingEvent对象**代表属性变化事件，它包含的方法如下：

| 方法名       | 作用                          |
| ------------ | ----------------------------- |
| getName()    | 获取修改或添加的属性名        |
| getValue()   | 获取被修改或添加的属性值      |
| getSession() | 获取触发事件的HttpSession对象 |

#### ⑥ServletRequestAttributeListener

作用：监听**ServletRequest中属性**的创建、修改和销毁

| 方法名                                               | 作用                                 |
| ---------------------------------------------------- | ------------------------------------ |
| attributeAdded(ServletRequestAttributeEvent srae)    | 向ServletRequest中添加属性时调用     |
| attributeRemoved(ServletRequestAttributeEvent srae)  | 从ServletRequest中移除属性时调用     |
| attributeReplaced(ServletRequestAttributeEvent srae) | 当ServletRequest中的属性被修改时调用 |

ServletRequestAttributeEvent对象代表属性变化事件，它包含的方法如下：

| 方法名               | 作用                             |
| -------------------- | -------------------------------- |
| getName()            | 获取修改或添加的属性名           |
| getValue()           | 获取被修改或添加的属性值         |
| getServletRequest () | 获取触发事件的ServletRequest对象 |

#### ⑦HttpSessionBindingListener

作用：监听某个对象在Session域中的创建与移除

| 方法名                                      | 作用                              |
| ------------------------------------------- | --------------------------------- |
| valueBound(HttpSessionBindingEvent event)   | 该类的实例被放到Session域中时调用 |
| valueUnbound(HttpSessionBindingEvent event) | 该类的实例从Session中移除时调用   |

HttpSessionBindingEvent对象代表属性变化事件，它包含的方法如下：

| 方法名       | 作用                          |
| ------------ | ----------------------------- |
| getName()    | 获取当前事件涉及的属性名      |
| getValue()   | 获取当前事件涉及的属性值      |
| getSession() | 获取触发事件的HttpSession对象 |

#### ⑧HttpSessionActivationListener

作用：监听某个对象在Session中的序列化与反序列化。

| 方法名                                    | 作用                                  |
| ----------------------------------------- | ------------------------------------- |
| sessionWillPassivate(HttpSessionEvent se) | 该类实例和Session一起钝化到硬盘时调用 |
| sessionDidActivate(HttpSessionEvent se)   | 该类实例和Session一起活化到内存时调用 |

HttpSessionEvent对象代表事件对象，通过getSession()方法获取事件涉及的HttpSession对象。

### 4、监听器的使用

#### ①创建监听器类

```java
public class AtguiguListener implements ServletContextListener {
    @Override
     // Event对象代表本次事件，通过这个对象可以获取ServletContext对象本身
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Hello，我是ServletContext，我出生了！");

        ServletContext servletContext = sce.getServletContext();
        System.out.println("servletContext = " + servletContext);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Hello，我是ServletContext，我打算去休息一会儿！");
    }
}
```

#### ②注册监听器

```xml
<!-- 每一个listener标签对应一个监听器配置，若有多个监听器，则配置多个listener标签即可 -->
<listener>
    <!-- 配置监听器指定全类名即可 -->
    <listener-class>com.atguigu.listener.AtguiguListener</listener-class>
</listener>
```

## 目前我们进行javaweb项目开发的“套路”是这样的：

1. 拷贝 myssm包
2. 新建配置文件applicationContext.xml或者可以不叫这个名字，在web.xml中指定文件名
3. 在web.xml文件中配置：
   1) 配置前缀和后缀，这样thymeleaf引擎就可以根据我们返回的字符串进行拼接，再跳转
   ```xml
    <context-param>
     <param-name>view-prefix</param-name>
     <param-value>/</param-value>
    </context-param>
    <context-param>
     <param-name>view-suffix</param-name>
     <param-value>.html</param-value>
    </context-param>
   ```
   2) 配置监听器要读取的参数，目的是加载IOC容器的配置文件（也就是applicationContext.xml）
       
    ```xml
    <context-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>applicationContext.xml</param-value>
    </context-param>
     ```
   
1. 开发具体的业务模块：
   1） 一个具体的业务模块纵向上由几个部分组成：
   
      - html页面
      - POJO类
      - DAO接口和实现类
      - Service接口和实现类
      - Controller 控制器组件
   2） 如果html页面有thymeleaf表达式，一定不能够直接访问，必须要经过PageController
   3） 在applicationContext.xml中配置 DAO、Service、Controller，以及三者之间的依赖关系
   4） DAO实现类中 ， 继承BaseDAO，然后实现具体的接口, 需要注意，BaseDAO后面的泛型不能写错。
   
   ```java
   例如：
   public class UserDAOImpl extends BaseDAO<User> implements UserDAO{}
   ```
   5） Service是业务控制类，这一层我们只需要记住一点：
       - 业务逻辑我们都封装在service这一层，不要分散在Controller层。也不要出现在DAO层（我们需要保证DAO方法的单精度特性）
           - 当某一个业务功能需要使用其他模块的业务功能时，尽量的调用别人的service，而不是深入到其他模块的DAO细节
         6） Controller类的编写规则
           ① 在applicationContext.xml中配置Controller
           <bean id="user" class="com.atguigu.qqzone.controllers.UserController>
           那么，用户在前端发请求时，对应的servletpath就是   /user.do   , 其中的“user”就是对应此处的bean的id值
           ② 在Controller中设计的方法名需要和operate的值一致
           public String login(String loginId , String pwd , HttpSession session){
           return "index";
           }
           因此，我们的登录验证的表单如下：
       <form th:action="@{/user.do}" method="post">
         <inut type="hidden" name="operate" value="login"/>
       </form>
   ​    ③ 在表单中，组件的name属性和Controller中方法的参数名一致
   ​    <input type="text" name="loginId" />
   ​    public String login(String loginId , String pwd , HttpSession session){
   ​    ④ 另外，需要注意的是： Controller中的方法中的参数不一定都是通过请求参数获取的
   ​    if("request".equals...) else if("response".equals....) else if("session".equals....){
   ​      直接赋值
   ​    }else{
   ​      此处才是从request的请求参数中获取
   ​      request.getParameter("loginId") .....
   ​    }
   7）  DispatcherServlet中步骤大致分为：
       1. 从application作用域获取IOC容器
           1. 解析servletPath ， 在IOC容器中寻找对应的Controller组件
           2. 准备operate指定的方法所要求的参数
           3. 调用operate指定的方法
           4. 接收到执行operate指定的方法的返回值，对返回值进行处理 - 视图处理
   
   1) 为什么DispatcherServlet能够从application作用域获取到IOC容器？
      ContextLoaderListener在容器启动时会执行初始化任务，而它的操作就是：
      1. 解析IOC的配置文件，创建一个一个的组件，并完成组件之间依赖关系的注入
      2. 将IOC容器保存到application作用域

## 十一、其他知识

### 1、cookie

cookie时客户端保存的一些数据，比如sessioinID
给服务器发请求时，服务器会产生cookie，响应时将cookie带给客户端，客户端将cookie文件保存在本地电脑下

1. 创建Cookie对象

2. 在客户端保存Cookie

3. 设置Cookie的有效时长

   cookie.setMaxAge(60)  ， 设置cookie的有效时长是60秒
   cookie.setDomain(pattern);
   cookie.setPath(uri);

4. Cookie的应用：
   4-1: 记住用户名和密码十天 setMaxAge(60 * 60 * 24 * 10)
   4-2: 十天免登录

创建cookie并返回：

```java
// 1.创建Cookie对象
Cookie cookie = new Cookie("cookie-message", "hello-cookie");

// 2.将Cookie对象添加到响应中
response.addCookie(cookie);

// 3.返回响应
processTemplate("page-target", request, response);
```

服务器端读取cookie信息

```java
// 1.通过request对象获取Cookie的数组
Cookie[] cookies = request.getCookies();

// 2.遍历数组
for (Cookie cookie : cookies) {
    System.out.println("cookie.getName() = " + cookie.getName());
    System.out.println("cookie.getValue() = " + cookie.getValue());
    System.out.println();
}
```

cookie的时效性

```java
// ※给Cookie设置过期时间
// 正数：Cookie的过期时间，以秒为单位
// 负数：表示这个Cookie是会话级的Cookie，浏览器关闭时释放
// 0：通知浏览器立即删除这个Cookie
cookie.setMaxAge(20);
```



### 2、Kaptcha

1、验证码的作用：防止机器发送大量请求
2、Kaptcha的使用：
	添加jar包
	在web.xml文件中注册KaptchaServlet，并设置验证码图片的相关属性
	在html页面上编写一个img标签，然后设置src等于KaptchaServlet对应的url-pattern
3、kaptcha验证码图片的各个属性在常量接口：Constants中
4、KaptchaServlet在生成验证码图片时，会同时将验证码信息保存到session中
因此，我们在注册请求时，首先将用户文本框中输入的验证码值和session中保存的值进行比较，相等，则进行注册

## 十二、JavaWeb总结

java实体类的不同名称

- POJO：Plain old Java Object，传统的普通的Java对象
- entity：实体类
- bean或Java bean
- domain：领域模型

DAO：dao中的方法都是单精度的

Servce：一个业务方法，它对应多个单精度方法，将其封装到service方法中

Controller：主要分为三个部分， 参数获取，服务，资源转发，将部分代码抽取到中央控制器中

IOC容器：层与层之间有耦合，降低耦合，依赖注入，管理对象的生命周期（对bean的组装，添加依赖关系）

filter：设置编码，开启事务，对事务的try-catch

listener：监听上下文启动，在上下文启动的时候去创建IOC容器,然后将其保存到application作用域，后面中央控制器再从application作用域中去获取IOC容器

threadLocal的引入

DispatcherServlet:中央控制器

### MVC各个层的设计
