---
title: SpringMVC 基础
icon: leaf
order: 9
date: 2023-01-08
category: 
    - java
tag: 
    - spring
    - java
---
## 1、SpringMVC简介  

### 1、什么是MVC  

MVC是一种软件架构的**思想**，将软件按照**模型、视图、控制器**来划分 
<!-- more -->
M：**Model**，模型层，指工程中的JavaBean，作用是处理数据
JavaBean分为两类：
	一类称为**实体类Bean**：专门存储业务数据的，如 **Student、User** 等
	一类称为**业务处理 Bean**：指 **Service 或 Dao 对象**，专门用于处理业务逻辑和数据访问。   

V：**View**，视图层，指工程中的**html或jsp等页面**，作用是与用户进行交互，展示数据  

C：**Controller**，控制层，指**工程中的servlet**，作用是**接收请求和响应浏览器**

MVC的工作流程： 用户通过视图层发送请求到服务器，在服务器中请求被Controller接收，Controller调用相应的Model层处理请求，处理完毕将结果返回到Controller，Controller再根据请求处理的结果找到相应的View视图，渲染数据后最终响应给浏览器
**用户→View→Controller→Model→Controller→View→浏览器** 

### 2、什么是SpringMVC  

SpringMVC是Spring的一个后续产品，是Spring的一个子项目  

SpringMVC 是 Spring 为表述层开发提供的一整套完备的解决方案。在表述层框架历经 Strust、WebWork、Strust2 等诸多产品的历代更迭之后，目前业界普遍选择了 SpringMVC 作为 Java EE 项目表述层开发的首选方案  
注：三层架构分为**表述层（或表示层）**、**业务逻辑层（业务层）**、**数据访问层（持久层）**
	**表述层表示前台页面和后台servlet** 

### 3、SpringMVC的特点  

Spring 家族原生产品，与 IOC 容器等基础设施无缝对接
基于原生的Servlet，通过了功能强大的**前端控制器DispatcherServlet**，对请求和响应进行统一处理
表述层各细分领域需要解决的问题全方位覆盖，提供全面解决方案
代码清新简洁，大幅度提升开发效率
内部组件化程度高，可插拔式组件即插即用，想要什么功能配置相应组件即可
性能卓著，尤其适合现代大型、超大型互联网项目要求  

## 2、入门案例  

### 1、创建maven工程  

①添加web模块  

注意创建web.xml文件目录需要修改为如下图：

![image-20230222202004184](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230222202004184.png)

②打包方式：war 

```xml
<packaging>war</packaging>
```


③引入依赖  

```xml
<dependencies>
    <!-- SpringMVC -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.1</version>
    </dependency>
    <!-- 日志 -->
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.3</version>
    </dependency>
    <!-- ServletAPI -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
    </dependency>
    <!-- Spring5和Thymeleaf整合包 -->
    <dependency>
        <groupId>org.thymeleaf</groupId>
        <artifactId>thymeleaf-spring5</artifactId>
        <version>3.0.12.RELEASE</version>
    </dependency>
</dependencies>
```

### 2、配置web.xml  

**注册SpringMVC的前端控制器DispatcherServlet**

```xml
<!--
    配置SpringMVC的前端控制器DispatcherServlet
	
	SpringMVC的配置文件默认的位置和名称：
	位置：WEB-INF下
	名称：<servlet-name>-servlet.xml,当前配置下的配置文件名为SpringMVC-servlet.xml（之后并不会放在默认位置）

    url-pattern中/和/*的区别：
    /：匹配；浏览器向服务器发送的所有请求（不包括.jsp）
    /*：匹配浏览器向服务器（包括.jsp）
-->
<servlet>
    <servlet-name>SpringMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>SpringMVC</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

### 3、创建请求控制器  

由于前端控制器对浏览器发送的请求进行了统一的处理，但是**具体的请求有不同的处理过程**，因此需要创建处理具体请求的类，即**请求控制器**  
请求控制器中每一个处理请求的方法成为控制器方法 
因为SpringMVC的控制器由一个POJO（普通的Java类）担任，因此需要通过@Controller注解将其标识为一个控制层组件，交给Spring的IOC容器管理，此时SpringMVC才能够识别控制器的存在  

```java
@Controller
public class HelloController {
}
```

### 4、创建SpringMVC的配置文件  

SpringMVC的配置文件**默认**的位置和名称：
位置：WEB-INF下
名称：\<servlet-name>-servlet.xml（web.xml文件下），所以当前配置下的配置文件名为SpringMVC-servlet.xml

**但配置文件一般都要放在resources下，因此在web.xml文件中添加\<init-param>，配置springmvc的配置文件**
**所以，springmvc的配置文件一般放在resources下的springmvc.xml中**

**目标（物理视图）：/WEB-INF/templates/index.html
                            视图前缀：/WEB-INF/templates/
                            视图后缀：.html
                            逻辑视图：index**

```xml
<!--扫描控制层组件-->
<context:component-scan base-package="com.T4mako.Controller"></context:component-scan>

<!-- 配置Thymeleaf视图解析器 -->
<bean id="viewResolver" class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
    <property name="order" value="1"/>
    <property name="characterEncoding" value="UTF-8"/>
    <property name="templateEngine">
        <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
            <property name="templateResolver">
                <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
                    <!--
                            目标（物理视图）：/WEB-INF/templates/index.html
                            视图前缀：/WEB-INF/templates/
                            视图后缀：.html
                            逻辑视图：index
                        -->
                    <!-- 视图前缀 -->
                    <property name="prefix" value="/WEB-INF/templates/"/>
                    <!-- 视图后缀 -->
                    <property name="suffix" value=".html"/>
                    <property name="templateMode" value="HTML5"/>
                    <property name="characterEncoding" value="UTF-8" />
                </bean>
            </property>
        </bean>
    </property>
</bean>
```

### 5、配置Tomcat

![image-20230222202824265](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230222202824265.png)

![image-20230109150922942](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230109150922942.png)

![image-20230109151044511](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230109151044511.png)

![image-20230109151102714](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230109151102714.png)

![image-20230109151143776](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230109151143776.png)

**不同的上下文对应Web服务器（单个Tomcat）中不同的工程**

![image-20230109151316851](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230109151316851.png)

**热部署 **

### 6、测试HelloWorld  

#### ①实现对首页的访问 

在请求控制器中创建处理请求的方法  

@RequestMapping注解：处理请求和控制器方法之间的映射关系
@RequestMapping注解的**value属性**可以**通过请求地址匹配请求**，**/表示的当前工程的上下文路径**，匹配成功则执行对应的方法
return的String字符串为对应的**逻辑视图名称**

```java
// @RequestMapping注解：处理请求和控制器方法之间的映射关系
// @RequestMapping注解的value属性可以通过请求地址匹配请求，/表示的当前工程的上下文路径
// localhost:8080/springMVC/
@RequestMapping("/")
public String index() {
	//设置视图名称
	return "index";
}
```

#### ②通过超链接跳转到指定页面  

在主页index.html中设置超链接  

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8">
<title>首页</title>
</head>
<body>
<h1>首页</h1>
<a th:href="@{/hello}">HelloWorld</a><br/>
</body>
</html>
```

在请求控制器中创建处理请求的方法  

```java
@RequestMapping("/hello")
public String HelloWorld() {
    return "target";
}
```

### 7、总结  

**浏览器发送请求**，若请求地址**符合前端控制器的url-pattern**，该请求就会被前端控制器**DispatcherServlet处理**。前端控制器会**读取SpringMVC的核心配置文件**，通过**扫描组件找到控制器**，将请求地址和控制器中**@RequestMapping注解的value属性值进行匹配**，若匹配成功，该注解所标识的控制器方法就是处理请求的方法。处理请求的方法需要返回一个字符串类型的视图名称，该视图名称会被视图解析器解析，加上前缀和后缀组成视图的路径，通过Thymeleaf对视图进行渲染，最终转发到视图所对应页面 

### 8、web.xml的改进

设置SpringMVC核心配置文件的位置和名称
将DispatcherServlet的初始化时间提前到服务器启动时

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!--
        配置SpringMVC的前端控制器DispatcherServlet

        SpringMVC的配置文件默认的位置和名称：
        位置：WEB-INF下
        名称：<servlet-name>-servlet.xml,当前配置下的配置文件名为SpringMVC-servlet.xml

        url-pattern中/和/*的区别：
        /：匹配；浏览器向服务器发送的所有请求（不包括.jsp）
        /*：匹配浏览器向服务器（包括.jsp）

    -->
    <servlet>
        <servlet-name>SpringMVC</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--设置SpringMVC核心配置文件的位置和名称-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc.xml</param-value><!--类路径：java，resources对应路径-->
        </init-param>
        <!--将DispatcherServlet的初始化时间提前到服务器启动时-->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>SpringMVC</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

## 3、@RequestMapping注解  

### 1、@RequestMapping注解的功能

从注解名称上我们可以看到，@RequestMapping注解的作用就是将请求和处理请求的控制器方法关联起来，建立映射关系。  
SpringMVC 接收到指定的请求，就会来找到在映射关系中对应的控制器方法来处理这个请求。  

### 2、@RequestMapping注解的位置  

@RequestMapping**标识一个类**：设置映射请求的**请求路径的初始信息**
@RequestMapping**标识一个方法**：设置映射请求请求**路径的具体信息**

```java
@Controller
@RequestMapping("/test")
public class TestRequestMappingController {
    //此时请求映射所映射的请求的请求路径为：/test/testRequestMapping
    @RequestMapping("/hello")
    public String hello(){
        return "success";
    }
}
```

### 3、@RequestMapping注解的value属性  

作用：通过请求的请求路径匹配请求
 **value属性是数组类型**，即当前浏览器发送请求的请求路径匹配**value属性中的任何一个值**，则当前请求就会被注解所表示的方法**进行处理**

```java
@Controller
public class TestRequestMappingController {
    @RequestMapping({"/hello","/abc"})
    public String hello(){
        return "success";
    }
}
```

### 4、@RequestMapping注解的method属性  

作用：通过请求的**请求方式匹配请求**
method属性是RequestMethod类型的**数组**，即当前浏览器所发送的请路径匹配method属性中的任何一种请求方式
若**浏览器发送请求**的请求路径和@RequestMapping的value值匹配，但**请求方式和method值不匹配，报405错误**
默认值为都支持

```java
@Controller
public class TestRequestMappingController {
    @RequestMapping(
            value = {"/hello","/abc"},
            method = {RequestMethod.GET,RequestMethod.POST})
    public String hello(){
        return "success";
    }
}
```

在@RequestMapping的基础上，结合请求方式的一些派生注解：
@GetMapping，@PostMapping，@DeleteMapping，@PutMapping

### 5、@RequestMapping注解的params属性（了解）  

作用：通过请求的请求参数匹配请求，即浏览器发送的请求的请求参数必须满足params属性的设置
params可以使用四种表达式：
	"param"：要求请求映射所匹配的请求必须携带param请求参数  
	"!param"：要求请求映射所匹配的请求必须不能携带param请求参数  
	"param=value"：要求请求映射所匹配的请求必须携带param请求参数且param=value  
	"param!=value"：要求请求映射所匹配的请求必须携带param请求参数但是param!=value  

若当前请求满足@RequestMapping注解的value和method属性，但是不满足params属性，此时页面回报错400  

### 6、@RequestMapping注解的headers属性（了解）  

作用：通过请求的请求头匹配请求，即浏览器发送的请求头信息必须满足headers属性的设置  
	"header"：要求请求映射所匹配的请求必须携带header请求头信息
	"!header"：要求请求映射所匹配的请求必须不能携带header请求头信息
	"header=value"：要求请求映射所匹配的请求必须携带header请求头信息且header=value
	"header!=value"：要求请求映射所匹配的请求必须携带header请求头信息且header!=value  

若当前请求满足@RequestMapping注解的value和method属性，但是不满足headers属性，此时页面显示404错误，即资源未找到  
（注：请求头和响应头不区分大小写）

### 7、SpringMVC支持ant风格的路径  

SpringMVC支持ant风格的路径
在@requestMapping注解的value属性值中设置一些特殊字符：

**？：表示任意的单个字符，不包括?本身
*：表示任意的0个或多个字符，不包括?和/
\*\*：表示任意层数的任意目录，\*\*只能写在双斜线中，中间，左右不能有其他字符**
注意：在使用\*\*时，只能使用/\*\*/xxx的方式  

```java
@RequestMapping("/**/test/ant")
public String testAnt(){
    return "success";
}
```

### 8、SpringMVC支持路径中的占位符（重点）  

传统方式：/deleteUser?id=1  通过？传参数
rest方式：/user/delete/1   通过/传参数

需要在@RequestMapping注解的value属性所设置的路径中，使用**{xxx}**的方式表示路径中的数据
再通过**@PathVariable注解**，将占位符所标识的值和控制器方法的形参进行绑定

```html
<a th:href="@{/test/rest/t4mako/1}">rest风格</a>
```

```java
@RequestMapping("/test/rest/{username}/{id}")
public String testRest(@PathVariable("id") Integer id,@PathVariable("username") String username){//获取请求参数
    System.out.println("id:"+id + "username:"+username);
    return "success";
}
```

## 4、SpringMVC获取请求参数  

### 1、通过ServletAPI获取  

只需要在控制器方法的新参位置设置HttpServletRequest类型的形参
就可以在控制器方法中使用request对象获取请求参数

```java
@RequestMapping("/param/servletAPI")
public String getParamByServletAPI(HttpServletRequest request){
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    System.out.println(username + "," + password);
    return "success";
}
```

### 2、通过控制器方法的形参获取请求参数  

只需要在控制器方法的形参位置，设置一个形参，形参的名字和请求参数的名字一致即可

```html
<form th:action="@{/param}" method="post">
    用户名：<input type="text" name="username"><br />
    密码：<input type="password" name="password"><br />
    <input type="submit" value="登录"><br />
</form>
```

```java
@RequestMapping("/param")
public String getParam(String username,String password){
	System.out.println(username + "," + password);
	return "success";
}
```

### 3、@RequestParam  将请求参数和控制器形参绑定

@RequestParam注解的三个属性：value、required，defaultValue

value：设置和形参绑定请求参数的名字
required：设置是否必须传输value所对应的请求参数
	默认值为true，表示value所对应的请求参数必须传输，否则页面报错（400错误）
	若设置为false，表示value所对应的请求参数不是必须传输，若为传输，则形参值为null	
defaultValue：设置当没有传输value所对应的请求参数时，为形参设置的默认值，此时和required属性值无关

```java
@RequestMapping("/param")
public String getParam(@RequestParam(value = "userName",required = false,defaultValue = "root") String username, String password){
    System.out.println(username + "," + password);
    return "success";
}
```

### 4、@RequestHeader  

将请求头信息和控制器方法的形参绑定

### 5、@CookieValue  

将cookie数据和控制器方法的形参绑定

```java
@RequestMapping("/param")
    public String getParam(@RequestParam(value = "userName",required = false,defaultValue = "root") String username, 	String password,
                           @RequestHeader("referer") String referer,
                           @CookieValue("JSESSIONID") String jsessionId
    ){
        System.out.println(username + "," + password + "," + referer);
        System.out.println(jsessionId);
        return "success";
    }
```

### 6、通过实体类类型的形参获取请求参数  

需要在控制器方法的形参位置设置实体类类型的形参

要保证实体类中的属性的属性名和请求参数的名字一致

可以通过实体类类型的形参获取请求参数

```html
<form th:action="@{/param/pojo}" method="post">
    用户名：<input type="text" name="username"><br />
    密码：<input type="password" name="password"><br />
    <input type="submit" value="登录"><br />
</form>
```

```java
@RequestMapping("/param/pojo")
    public String getParamByPojo(User user){
    System.out.println(user);
    return "success";
}
```

### 7、解决获取请求参数的乱码问题  	

在web.xml中配置Spring的编码过滤器CharacterEncodingFilter

```xml
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
        <param-name>forceEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

**注：SpringMVC中处理编码的过滤器一定要配置到其他过滤器之前，否则无效**

## 5、域对象共享数据  

### 1、使用ServletAPI向request域对象共享数据  

```java
@RequestMapping("/testServletAPI")
public String testServletAPI(HttpServletRequest request){
    request.setAttribute("testScope", "hello,servletAPI");
    return "success";
}
```

### 2、使用ModelAndView向request域对象共享数据  

ModelAndView包含Model和View的功能：
	Model：向请求域中共享数据
	View：设置逻辑视图实现页面跳

通过ModelAndView向请求域共享数据：
	使用ModelAndView时，可以使用其**Model功能向请求域共享数据**
	使用**View功能设置逻辑视图**，但是控制器方法**一定要将ModelAndView作为方法的返回值**

```java
@RequestMapping("/test/mav")
public ModelAndView testMAV(){
    /**
     * ModelAndView包含Model和View的功能：
     * Model：向请求域中共享数据
     * View：设置逻辑视图实现页面跳转
     */
    ModelAndView mav = new ModelAndView();
    //向请求域中共享数据
    mav.addObject("testRequestScope","hello,MAV");
    //设置逻辑视图
    mav.setViewName("success");
    return mav;
}
```

### 3、使用Model，ModelMap，Map向request域对象共享数据  

Model，ModelMap和Map的关系：
在底层中，这些类型的形参最终都是通过BindingAwareModelMap创建 
Model、ModelMap、Map类型的参数其实本质上都是 BindingAwareModelMap 类型的                      

```java
@RequestMapping("/test/model")
public String testModel(Model model){
    model.addAttribute("testRequestScope","hello,model");
    return "success";
}

@RequestMapping("/test/modelmap")
public String testModelMap(ModelMap modelMap){
    modelMap.addAttribute("testRequestScope","hello,modelmap");
    return "success";
}

@RequestMapping("/test/map")
public String testModelMap(Map<String,Object> map){
    map.put("testRequestScope","hello,map");
    return "success";
}
```

### 4、向session域共享数据  

```html
<p th:text="${session.testSessionScope}"></p>
```

```java
@RequestMapping("/test/session")
public String testSession(HttpSession session){
    session.setAttribute("testSessionScope","hello session");
    return "success";
}
```

### 5、向application域共享数据  

```html
<p th:text="${application.testApplicationScope}"></p>
```

```java
@RequestMapping("/test/application")
public String testApplication(HttpSession session){
    ServletContext servletContext = session.getServletContext();
    servletContext.setAttribute("testApplicationScope","hello,application");
    return "success";
}
```

## 6、SpringMVC的视图  

SpringMVC中的视图是View接口，视图的作用渲染数据，将模型Model中的数据展示给用户  
SpringMVC视图的种类很多，默认有转发视图和重定向视图
当工程引入jstl的依赖，转发视图会自动转换为JstlView
若使用的视图技术为Thymeleaf，在SpringMVC的配置文件中配置了Thymeleaf的视图解析器，由此视图解析器解析之后所得到的是ThymeleafView  

### 1、ThymeleafView  

当控制器方法中所设置的视图名称**没有任何前缀**时，此时的视图名称会被SpringMVC配置文件中所配置的视图解析器解析（ThymeleafView），视图名称拼接视图前缀和视图  

```java
@RequestMapping("/test/view/thymeleaf")
public String testThymeleaf(){
    return "success";
}
```

### 2、转发视图  

SpringMVC中默认的转发视图是InternalResourceView  

当控制器方法中所设置的视图名称以"forward:"为前缀时，创建InternalResourceView视图，此时的视图名称不会被SpringMVC配置文件中所配置的视图解析器解析，而是会将前缀"forward:"去掉，剩余部分作为最终路径通过转发的方式实现跳转  

```java
@RequestMapping("/test/view/forward")
public String testInternalResourceView(){
    return "forward:/test/model";
}
```

### 3、重定向视图  

SpringMVC中默认的重定向视图是RedirectView  

当控制器方法中所设置的视图名称以"redirect:"为前缀时，创建RedirectView视图，此时的视图名称不会被SpringMVC配置文件中所配置的视图解析器解析，而是会将前缀"redirect:"去掉，剩余部分作为最终路径通过重定向的方式实现跳转  

```java
@RequestMapping("/test/view/redirect")
public String testRedirectView(){
	return "redirect:/test/model";
}
```

### 4、视图控制器view-controller  

当控制器方法中，仅仅用来实现页面跳转，即只需要设置视图名称时，可以将处理器方法使用viewcontroller标签进行表示  

SpringMVC.xml中添加：

```xml
<!--开启mvc注解驱动-->
<mvc:annotation-driven />
<!--
    视图控制器：为当前的请求直接设置视图名称实现页面跳转
    若设置视图控制器，则只有视图控制器所设置的请求会被处理，其他的全部404
    此时必须配置一个标签<mvc:annotation-driven />
-->
<mvc:view-controller path="/" view-name="index"></mvc:view-controller>
```

## 7、RESTful 

### 1、RESTful简介  

REST：Representational State Transfer，表现层资源状态转移。  

①资源  
将服务器看作是由很多离散的资源组成，即一切皆资源。一个资源可以由一个或多个URI来标识。URI既是资源的名称，也是资源在Web上的地址。对某个资源感兴趣的客户端应用，可以通过资源的URI与其进行交互。  

②资源的表述  
资源的表述可以有多种格式，例如HTML/XML/JSON/纯文本/图片/视频/音频等等。资源的表述格式可以通过协商机制来确定。请求-响应方向的表述通常使用不同的格式。  

③状态转移  
状态转移说的是：在客户端和服务器端之间转移（transfer）代表资源状态的表述。通过转移和操作资源的表述，来间接实现操作资源的目的。  

### 2、RESTful的实现  

具体说，就是 HTTP 协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。  

它们分别对应四种基本操作：
	**GET 用来获取资源
	POST 用来新建资源
	PUT 用来更新资源
	DELETE用来删除资源**  

REST 风格提倡 URL 地址使用统一的风格设计，从前到后各个单词使用斜杠分开，不使用问号键值对方式携带请求参数，而是将要发送给服务器的数据作为 URL 地址的一部分，以保证整体风格的一致性  

| 操作     | 传统方式         | REST风格                |
| -------- | ---------------- | ----------------------- |
| 查询操作 | getUserById?id=1 | user/1-->get请求方式    |
| 保存操作 | saveUser         | user-->post请求方式     |
| 删除操作 | deleteUser?id=1  | user/1-->delete请求方式 |
| 更新操作 | updateUser       | user-->put请求方式      |

### 3、HiddenHttpMethodFilter

浏览器目前只能发送get和post请求
若要发送put和delete请求，需要**在web.xml中配置一个过滤器HiddenMethodFilter**
配置了过滤器之后，发送的请求要**满足两个条件**，才能将请求方式转换为put或delete
	**1、当前请求的请求方式必须为post
	2、当前请求参数必须传输请求参数\_method,\_method的值才是最终的请求方式**

**web.xml：**
**注：其他过滤器一定要放在Spring的编码过滤器的后面**

```xml
<!--设置处理请求方式的过滤器-->
<filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

**index.html:**

```html
<h1>index.html</h1>
<a th:href="@{/user}">查询所有的用户信息</a><br>
<a th:href="@{/user/1}">查询id为1的用户信息</a><br>
<form th:action="@{/user}" method="post">
    <input type="submit" value="添加用户信息">
</form>
<form th:action="@{/user}" method="post">
    <input type="hidden" name="_method" value="put">
    <input type="submit" value="修改用户信息">
</form>
<form th:action="@{/user/2}" method="post">
    <input type="hidden" name="_method" value="delete">
    <input type="submit" value="删除用户信息">
</form>
```

**Controller:**

```java
/**
 * @author T4mako
 * @date 2023/1/11 14:30
 * 查询所有的用户信息-->/user-->get
 * 根据id查询用户信息-->/user/1-->get
 * 添加用户信息-->/user-->post
 * 修改用户信息-->/user-->put
 * 删除用户信息-->/user/1-->delete
 *
 * 注意：浏览器目前只能发送get和post请求
 * 若要发送put和delete请求，需要在web.xml中配置一个过滤器HiddenMethodFilter
 * 配置了过滤器之后，发送的请求要满足两个条件，才能将请求方式转换为put或delete
 *  1、当前请求的请求方式必须为post
 *  2、当前请求参数必须传输请求参数_method,_method的值才是最终的请求方式
 */
@Controller
public class TestRestController {
    //@RequestMapping(value = "/user",method = RequestMethod.GET)
    @GetMapping("/user")
    public String getAllUser(){
        System.out.println("查询所有的用户信息-->/user-->get");
        return "success";
    }

    //@RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
    @GetMapping("/user/{id}")
    public String getUserById(@PathVariable("id") Integer id){
        System.out.println("根据id查询用户信息-->/user/" + id + "-->get");
        return "success";
    }

    //@RequestMapping(value = "/user",method = RequestMethod.POST)
    @PostMapping(value = "/user")
    public String insertUser(){
        System.out.println("添加用户信息-->/user-->post");
        return "success";
    }

    //@RequestMapping(value = "/user",method = RequestMethod.PUT)
    @PutMapping(value = "/user")
    public String updateUser(){
        System.out.println("修改用户信息-->/user-->put");
        return "success";
    }

    //@RequestMapping(value = "/user/{id}",method = RequestMethod.DELETE)
    @DeleteMapping(value = "/user/{id}")
    public String deleteUser(@PathVariable("id") Integer id){
        System.out.println("删除用户信息-->/user/" + id +"-->delete");
        return "success";
    }
}
```

## 8、RESTful案例  

### 1、准备工作  

①创建pojo实体类
②准备dao模拟数据  

```java
@Repository
public class EmployeeDao {

    private static Map<Integer, Employee> employees = null;

    static {
        employees = new HashMap<Integer, Employee>();
        employees.put(1001, new Employee(1001, "E-AA", "aa@163.com", 1));
        employees.put(1002, new Employee(1002, "E-BB", "bb@163.com", 1));
        employees.put(1003, new Employee(1003, "E-CC", "cc@163.com", 0));
        employees.put(1004, new Employee(1004, "E-DD", "dd@163.com", 0));
        employees.put(1005, new Employee(1005, "E-EE", "ee@163.com", 1));
    }

    private static Integer initId = 1006;

    public void save(Employee employee) {
        if (employee.getId() == null) {
            employee.setId(initId++);
        }
        employees.put(employee.getId(), employee);
    }

    public Collection<Employee> getAll() {
        return employees.values();
    }

    public Employee get(Integer id) {
        return employees.get(id);
    }

    public void delete(Integer id) {
        employees.remove(id);
    }
}
```

### 2、功能清单  

| 功能                | URL 地址    | 请求方式 |
| ------------------- | ----------- | -------- |
| 访问首页√           | /           | GET      |
| 查询全部数据√       | /employee   | GET      |
| 删除√               | /employee/2 | DELETE   |
| 跳转到添加数据页面√ | /toAdd      | GET      |
| 执行保存√           | /employee   | POST     |
| 跳转到更新数据页面√ | /employee/2 | GET      |
| 执行更新√           | /employee   | PUT      |

### 3、具体功能：访问首页  

#### ①配置web.xml

浏览器向服务器请求访问css样式等静态资源
tomcat的xml配置的DefaultServlet的url-pattern是/
当前工程的web.xml配置的前端控制器DispatcherServlet的url-pattern也是/
因为tomcat中的xml有继承性，当前工程为子，tomcat为父，因此处理请求时会全给DispatcherServlet处理，而它不能处理静态资源等，只能处理有请求的request，所以要在当前工程的web.xml添加配置

**web.xml:**

```xml
<!--
    配置默认的servlet处理静态资源
    当前工程的web.xml配置的前端控制器DispatcherServlet的url-pattern是/
    tomcat的xml配置的DefaultServlet的url-pattern也是/
    此时浏览器发送的请求会优先被DispatcherServlet处理，但是DispatcherServlet无法处理静态资源
    若配置了<mvc:default-servlet-handler />，此时浏览器发送的所有请求会被DispatcherServlet处理
    若配置了<mvc:default-servlet-handler />和<mvc:annotation-driven />，此时浏览器发送的所有请求会先被DispatcherServlet处理，无法处理就交给defaultServlet处理
-->
<mvc:default-servlet-handler />

<!--开启mvc注解驱动-->
<mvc:annotation-driven />

<!--配置视图控制器-->
<mvc:view-controller path="/" view-name="index"></mvc:view-controller>
```

#### ②创建页面  

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
</head>
<body>
<h1>index.html</h1>
<a th:href="@{/user}">查询所有的用户信息</a><br>
<a th:href="@{/user/1}">查询id为1的用户信息</a><br>
<form th:action="@{/user}" method="post">
    <input type="submit" value="添加用户信息">
</form>
<form th:action="@{/user}" method="post">
    <input type="hidden" name="_method" value="put">
    <input type="submit" value="修改用户信息">
</form>
<form th:action="@{/user/2}" method="post">
    <input type="hidden" name="_method" value="delete">
    <input type="submit" value="删除用户信息">
</form><hr>
<a th:href="@{/employee}">查询所有的员工信息</a>
</body>
</html>
```

### 4、具体功能：查询所有员工数据  

#### ①控制器方法  

```java
/**
 * @author T4mako
 * @date 2023/1/11 16:02
 *
 * 查询所有员工信息-->/employee-->get
 * 跳转到添加页面-->/to/add-->get
 * 新增员工信息-->/employee-->post
 * 跳转到修改页面-->/emplloyee/1-->get
 * 修改员工信息-->/employee-->put
 * 删除员工信息-->/employee-->delete
 */
@Controller
public class EmployeeController {

    @Autowired
    private EmployeeDao employeeDao;

    @RequestMapping(value = "/employee",method = RequestMethod.GET)
    public String getAllEmployee(Model model){
        Collection<Employee> allEmployee = employeeDao.getAll();
        //将所有的员工信息在请求域中共享
        model.addAttribute("allEmployee",allEmployee);
        //跳转到列表界面
        return "employee_list";
    }
}
```

#### ②创建employee_list.html 

```xml
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>employee list</title>
    <link rel="stylesheet" th:href="@{/static/css/index_work.css}">
</head>
<body>
<table>
    <tr>
        <th>employee list</th>
    </tr>
    <tr>
        <th>id</th>
        <th>lastName</th>
        <th>email</th>
        <th>options</th>
    </tr>
    <tr th:each="employee : ${allEmployee}">
        <td th:text="${employee.id}"></td>
        <td th:text="${employee.lastName}"></td>
        <td th:text="${employee.email}"></td>
        <td th:text="${employee.gender}"></td>
        <td>
            <a href="">delete</a>
            <a href="">update</a>
        </td>
    </tr>
</table>
</body>
</html>
```



### 5、其他功能添加

```java
@Controller
public class EmployeeController {

    @Autowired
    private EmployeeDao employeeDao;

    @RequestMapping(value = "/employee",method = RequestMethod.GET)
    public String getAllEmployee(Model model){
        Collection<Employee> allEmployee = employeeDao.getAll();
        //将所有的员工信息在请求域中共享
        model.addAttribute("allEmployee",allEmployee);
        //跳转到列表界面
        return "employee_list";
    }

    @RequestMapping(value = "/employee",method = RequestMethod.POST)
    public String addEmployee(Employee employee){
        //保存员工信息
        employeeDao.save(employee);
        //使用重定向跳转到列表功能（/employee）
        return "redirect:/employee";
    }

    @RequestMapping(value = "/employee/{id}",method = RequestMethod.GET)
    public String toUpdate(@PathVariable("id") Integer id,Model model){
        //根据id查询信息
        Employee employee = employeeDao.get(id);
        //将员工信息共享到请求域中
        model.addAttribute("employee",employee);
        //跳转到employee_update.html
        return "employee_update";
    }

    @RequestMapping(value = "/employee",method = RequestMethod.PUT)
    public String updateEmployee(Employee employee){
        //修改员工信息
        employeeDao.save(employee);
        //重定向到列表功能
        return "redirect:/employee";
    }

    @RequestMapping(value = "/employee/{id}",method = RequestMethod.DELETE)
    public String deleteEmployee(@PathVariable("id") Integer id){
        //删除员工信息
        employeeDao.delete(id);
        //重定向到列表动能
        return "redirect:/employee";
    }
}
```

## 9、SpringMVC处理ajax请求  

### 1、@RequestBody  

@RequestBody可以获取请求体信息，使用@RequestBody注解标识控制器方法的形参，当前请求的请求体就会为当前注解所标识的形参赋值
**@RequestBody注解将HTTP *请求体* 中的 *JSON或XML等数据* 转换为 *Java对象* 。**

```html
<!--此时必须使用post请求方式，因为get请求没有请求体-->
<form th:action="@{/test/RequestBody}" method="post">
    用户名：<input type="text" name="username"><br>
    密码：<input type="password" name="password"><br>
    <input type="submit">
</form>
```

```java
@RequestMapping("/test/RequestBody")
public String testRequestBody(@RequestBody String requestBody){
    System.out.println("requestBody:"+requestBody);
    return "success";
}
```

输出结果：
requestBody:username=admin&password=123456  

### 2、@RequestBody获取json格式的请求参数  

1、@RequestBody：将请求体中的内容和控制器方法的形参惊醒绑定
2、使用@RequestBody注解将json格式的请求参数转换为java对象

在使用了axios发送ajax请求之后，浏览器发送到服务器的请求参数有两种格式：  
1、name=value&name=value...，此时的请求参数可以通过request.getParameter()获取，对应SpringMVC中，可以直接通过控制器方法的形参获取此类请求参数  
2、{key:value,key:value,...}，此时**无法通过request.getParameter()获取**，之前我们使用操作json的相关jar包gson或jackson处理此类请求参数，可以将其转换为指定的实体类对象或map集合。在SpringMVC中，**直接使用@RequestBody注解**标识控制器方法的形参即可将此类请求参数转换为java对象  

**使用@RequestBody获取json格式的请求参数的条件**：  

1、导入jackson的依赖  

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.12.1</version>
</dependency>
```

2、SpringMVC的配置文件中设置开启mvc的注解驱动  

```xml
<!--开启mvc的注解驱动-->
<mvc:annotation-driven />
```

3、在控制器方法的形参位置，设置**json格式的请求参数要转换成的java类型**（实体类或map）的参数，并使用@RequestBody注解标识  

```html
<input type="button" value="测试@RequestBody获取json格式的请求参数"
@click="testRequestBody()"><br>
<script type="text/javascript" th:src="@{/js/vue.js}"></script>
<script type="text/javascript" th:src="@{/js/axios.min.js}"></script>
<script type="text/javascript">
	var vue = new Vue({
        el:"#app",
        methods:{
            testRequestBody(){
            axios.post(
                "/SpringMVC/test/RequestBody/json",
                {username:"admin",password:"123456"}
            ).then(response=>{
                console.log(response.data);
            });
        }
    }
});
</script>
```

使用@RequestBody注解将json格式的数据转换为map集合

```java
//将json格式的数据转换为map集合
@RequestMapping("/test/RequestBody/json")
public void testRequestBody(@RequestBody Map<String, Object> map,HttpServletResponse response) throws IOException {
    System.out.println(map);
    //{username=admin, password=123456}
    response.getWriter().print("hello,axios");
} 
    //将json格式的数据转换为实体类对象
@RequestMapping("/test/RequestBody/json")
public void testRequestBody(@RequestBody User user, HttpServletResponse response) throws IOException {
    System.out.println(user);
    //User{id=null, username='admin', password='123456', age=null,gender='null'}
	response.getWriter().print("hello,axios");
}
```

### 3、@ResponseBody  

@ResponseBody用于标识一个控制器方法，可以将该方法的**返回值直接作为响应报文的响应体响应到浏览器  **

```java
@RequestMapping("/testResponseBody")
public String testResponseBody(){
    //此时会跳转到逻辑视图success所对应的页面
    return "success";
} 

@RequestMapping("/testResponseBody")
@ResponseBody
public String testResponseBody(){
    //此时响应浏览器数据success
    return "success";
}
```

### 4、@ResponseBody响应浏览器json数据  

1、@RequestBody：将请求体中的内容和控制器方法的形参进行绑定
2、使用@requestBody注解将json格式的请求参数转换为java对象

服务器处理ajax请求之后，大多数情况都需要向浏览器响应一个java对象，此时必须将java对象转换为json字符串才可以响应到浏览器，之前我们使用操作json数据的jar包gson或jackson将java对象转换为json字符串。在SpringMVC中，我们可以直接**使用@ResponseBody注解实现此功能  **

**@ResponseBody响应浏览器json数据的条件：  **

1、导入jackson的依赖  (同上一个)
2、SpringMVC的配置文件中设置开启mvc的注解驱动  
3、**使用@ResponseBody注解标识控制器方法**，在方法中，将需要转换为json字符串并响应到浏览器的**java对象作为控制器方法的返回值**，此时SpringMVC就可以将此对象直接转换为json字符串并响应到浏览器  

常用的Java对象转换为json结果：
实体类-->json对象
map-->json对象
list-->json数组

```xml
<input type="button" value="测试@ResponseBody响应浏览器json格式的数据" @click="testResponseBody()"><br>
<script type="text/javascript" th:src="@{/js/vue.js}"></script>
<script type="text/javascript" th:src="@{/js/axios.min.js}"></script>、
<script type="text/javascript">
	var vue = new Vue({
		el:"#app",
		methods:{
			testResponseBody(){
				axios.post("/SpringMVC/test/ResponseBody/json").then(response=>{
					console.log(response.data);
				});
			}
		}
	});
</script>
```

```java
//响应浏览器list集合
@RequestMapping("/test/ResponseBody/json")
@ResponseBody
public List<User> testResponseBody(){
    User user1 = new User(1001,"admin1","123456",23,"男");
    User user2 = new User(1002,"admin2","123456",23,"男");
    User user3 = new User(1003,"admin3","123456",23,"男");
    List<User> list = Arrays.asList(user1, user2, user3);
    return list;
}


//响应浏览器map集合
@RequestMapping("/test/ResponseBody/json")
@ResponseBody
public Map<String, Object> testResponseBody(){
    User user1 = new User(1001,"admin1","123456",23,"男");
    User user2 = new User(1002,"admin2","123456",23,"男");
    User user3 = new User(1003,"admin3","123456",23,"男");
    Map<String, Object> map = new HashMap<>();
    map.put("1001", user1);
    map.put("1002", user2);
    map.put("1003", user3);
    return map;
}

//响应浏览器实体类对象
@RequestMapping("/test/ResponseBody/json")
@ResponseBody
public User testResponseBody(){
    return user;
}
```

### 5、@RestController注解  

@RestController注解是springMVC提供的一个复合注解，标识在控制器的类上，就相当于为类添加了@Controller注解，并且为其中的每个方法添加了@ResponseBody注解 
**@RestController = @Controller+@ResponseBody**

## 10、文件上传和下载  

### 1、文件下载  

ResponseEntity:可以作为控制器方法的返回值，表示响应到浏览器的响应报文
ResponseEntity用于控制器方法的返回值类型，该控制器方法的返回值就是响应到浏览器的响应报文使用ResponseEntity实现下载文件的功能 

文件下载的模板：

```java
@RequestMapping("/test/down")
public ResponseEntity<byte[]> testResponseEntity(HttpSession session) throws IOException {
    //获取ServletContext对象
    ServletContext servletContext = session.getServletContext();
    //获取服务器中文件的真实路径
    String realPath = servletContext.getRealPath("img");
    realPath += File.separator + "tamako.png";
    //创建输入流
    InputStream is = new FileInputStream(realPath);
    //创建字节数组,is.available()获取输入流所对应文件的字节数
    byte[] bytes = new byte[is.available()];
    //将流读到字节数组中
    is.read(bytes);
    //创建HttpHeaders对象设置响应头信息
    MultiValueMap<String, String> headers = new HttpHeaders();
    //设置要下载方式以及下载文件的名字
    headers.add("Content-Disposition", "attachment;filename=tamako.jpg");
    //设置响应状态码
    HttpStatus statusCode = HttpStatus.OK;
    //创建ResponseEntity对象
    ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(bytes, headers, statusCode);
    //关闭输入流
    is.close();
    return responseEntity;
}
```

### 2、文件上传  

文件上传要求form表单的请求方式**必须为post**，并且添加**属性enctype="multipart/form-data"**SpringMVC中将上传的文件封装到MultipartFile对象中，通过此对象可以获取文件相关信息  

上传步骤：  
①添加依赖：  

```xml
<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload --> 
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.1</version>
</dependency>
```

②在SpringMVC的配置文件中添加配置：  

```xml
<!--必须通过文件解析器的解析才能将文件转换为MultipartFile对象-->
<bean id="multipartResolver"class="org.springframework.web.multipart.commons.CommonsMultipartResolver"></bean>
```

③控制器方法：  

```java
@RequestMapping("/testUp")
public String testUp(MultipartFile photo, HttpSession session) throws IOException {
    //获取上传的文件的文件名
    String fileName = photo.getOriginalFilename();
    //处理文件重名问题
    String hzName = fileName.substring(fileName.lastIndexOf("."));
    fileName = UUID.randomUUID().toString() + hzName;
    //获取服务器中photo目录的路径
    ServletContext servletContext = session.getServletContext();
    String photoPath = servletContext.getRealPath("photo");
    File file = new File(photoPath);
    if(!file.exists()){
        file.mkdir();
    }
    String finalPath = photoPath + File.separator + fileName;
    //实现上传功能
    photo.transferTo(new File(finalPath));
    return "success";
}
```

## 11、拦截器  

### 1、拦截器的配置  

SpringMVC中的拦截器用于拦截控制器方法的执行
SpringMVC中的拦截器需要实现HandlerInterceptor
SpringMVC的拦截器必须在SpringMVC的配置文件中进行配置

```xml
<mvc:interceptors>
    <!--bean和ref标签所配置的拦截器默认对DispatcherServlet处理的所有的请求进行拦截-->
    <!--<bean class="com.t4mako.interceptor.FirstInterceptor"></bean>-->
    <!--<ref bean="firstInterceptor"></ref>-->
    <mvc:interceptor>
        <!--配置需要拦截的请求的请求路径，/**表示所有请求-->
        <mvc:mapping path="/*"/>
        <!--配置需要排除拦截的请求路径-->
        <mvc:exclude-mapping path="/abc"/>
        <!--配置拦截器-->
        <ref bean="firstInterceptor"></ref>
    </mvc:interceptor>
</mvc:interceptors>
```

### 2、拦截器的三个抽象方法  

SpringMVC中的拦截器有三个抽象方法：  

preHandle：控制器方法执行之前执行preHandle()，其boolean类型的返回值表示是否拦截或放行，返回true为放行，即调用控制器方法；返回false表示拦截，即不调用控制器方法
postHandle：控制器方法执行之后执行postHandle()
afterCompletion：处理完视图和模型数据，渲染视图完毕之后执行afterCompletion()  

### 3、多个拦截器的执行顺序  

多个拦截器的执行顺序和在SpringMVC配置文件中配置的顺序有关
preHandle()按照配置的顺序执行，而postHandle()和afterCompletion()按照配置的反序执行

若拦截器中有某个拦截器的preHandle()返回了false
拦截器的preHandel()返回false和它之前的拦截器的preHandle()都会执行
所有的postHandle()都不执行
拦截器的preHandle()返回false之前的拦截器的afterCompletion()会执行

## 12、异常处理器  

### 1、基于配置的异常处理

SpringMVC提供了一个处理控制器方法执行过程中所出现的异常的接口：HandlerExceptionResolver
HandlerExceptionResolver接口的实现类有：DefaultHandlerExceptionResolver和SimpleMappingExceptionResolver
SpringMVC提供了自定义的异常处理器SimpleMappingExceptionResolver，使用方式：  

```xml
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
    <property name="exceptionMappings">
        <props>
            <!--key设置要处理的异常，value设置出现该异常时要跳转的页面所对应的逻辑视图-->
            <prop key="java.lang.ArithmeticException">error</prop>
        </props>
    </property>
    <!--设置共享在请求域中的异常信息的属性名-->
    <property name="exceptionAttribute" value="ex"></property>
</bean>
```

### 2、基于注解的异常处理

```java
//将当前类标识为异常处理的组件
@ControllerAdvice
public class ExceptionController {

    //设置要处理的异常信息
    @ExceptionHandler(ArithmeticException.class)
    public String handleException(Throwable ex,Model model){
        //ex表示控制器方法所出现的异常
        model.addAttribute("ex",ex);
        return "error";
    }
}
```

## 13、注解配置SpringMVC  

使用配置类和注解代替web.xml和SpringMVC配置文件的功能  

### 1、WebInit类，代替web.xml  

在Servlet3.0环境中，容器会在类路径中查找实现javax.servlet.ServletContainerInitializer接口的类，如果找到的话就用它来配置Servlet容器（Tomcat）。 Spring提供了这个接口的实现，名为SpringServletContainerInitializer，这个类反过来又会查找实现WebApplicationInitializer的类并将配置的任务交给它们来完成。Spring3.2引入了一个便利的WebApplicationInitializer基础实现，名为AbstractAnnotationConfigDispatcherServletInitializer，当我们的类扩展了AbstractAnnotationConfigDispatcherServletInitializer并将其部署到Servlet3.0容器的时候，容器会自动发现它，并用它来配置Servlet上下文。  

```java
public class WebInit extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    //设置一个配置类代替Spring的配置文件
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{SpringConfig.class};
    }

    @Override
    //设置一个配置类代替SpringMvc的配置文件
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebConfig.class};
    }

    @Override
    //设置SpringMvc的前端控制器DispatcherServlet的url-pattern
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    //设置当前的过滤器
    protected Filter[] getServletFilters() {
        //创建编码过滤器
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
        //创建处理请求方式的过滤器(put,delete)
        HiddenHttpMethodFilter hiddenHttpMethodFilter = new HiddenHttpMethodFilter();
        return new Filter[]{characterEncodingFilter,hiddenHttpMethodFilter};
    }
}
```

### 2、SpringConfig类，代替spring的配置文件

```java
//将类标识为配置类
@Configuration
public class SpringConfig {
}
```



### 3、WebConfig类，代替SpringMVC的配置文件：

功能：扫描组件，视图解析器，默认的servlet，mvc注解驱动，视图控制器、文件上传解析器、拦截器、异常解析器

```java
//将类标识为配置类
@Configuration
//扫描组件
@ComponentScan("com.t4mako.controller")
//开启mvc注解驱动
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    //默认的servlet处理静态资源
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Override
    //配置视图解析器
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }

    //@Bean注解：可以将标识的方法的返回值作为bean进行管理，bean的id为方法的方法名
    @Bean
    public CommonsMultipartResolver multipartResolver(){
        return new CommonsMultipartResolver();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        FirstInterceptor firstInterceptor = new FirstInterceptor();
        registry.addInterceptor(firstInterceptor).addPathPatterns("/**");
    }

    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        SimpleMappingExceptionResolver exceptionResolver = new SimpleMappingExceptionResolver();
        Properties prop = new Properties();
        prop.setProperty("java.lang.ArithmeticException","error");
        exceptionResolver.setExceptionMappings(prop);
        exceptionResolver.setExceptionAttribute("ex");
        resolvers.add(exceptionResolver);
    }

    //配置生成模板解析器
    @Bean
    public ITemplateResolver templateResolver() {
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        // ServletContextTemplateResolver需要一个ServletContext作为构造参数，可通过WebApplicationContext的方法获得
        ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(webApplicationContext.getServletContext());
        templateResolver.setPrefix("/WEB-INF/templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setCharacterEncoding("UTF-8");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        return templateResolver;
    }

    //生成模板引擎并为模板引擎注入模板解析器
    @Bean
    public SpringTemplateEngine templateEngine(ITemplateResolver templateResolver) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);
        return templateEngine;
    }

    //生成视图解析器并未解析器注入模板引擎
    @Bean
    public ViewResolver viewResolver(SpringTemplateEngine templateEngine) {
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
        viewResolver.setCharacterEncoding("UTF-8");
        viewResolver.setTemplateEngine(templateEngine);
        return viewResolver;
    }
```

## 14、SpringMVC执行流程  

### 14.1、SpringMVC常用组件  

DispatcherServlet：前端控制器，不需要工程师开发，由框架提供 
作用：统一处理请求和响应，整个流程控制的中心，由它调用其它组件处理用户的请求  

HandlerMapping：处理器映射器，不需要工程师开发，由框架提供 
作用：根据请求的url、method等信息查找Handler，即控制器方法  

Handler：处理器，需要工程师开发 
作用：在DispatcherServlet的控制下Handler对具体的用户请求进行处理  

HandlerAdapter：处理器适配器，不需要工程师开发，由框架提供 
作用：通过HandlerAdapter对处理器（控制器方法）进行执行  

ViewResolver：视图解析器，不需要工程师开发，由框架提供 
作用：进行视图解析，得到相应的视图，例如：ThymeleafView、InternalResourceView、RedirectView  

View：视图 
作用：将模型数据通过页面展示给用户

### 14.2、DispatcherServlet初始化过程  

DispatcherServlet **本质上是一个 Servlet**，所以天然的遵循 Servlet 的生命周期。所以宏观上是 **Servlet生命周期来进行调度**。  

①初始化WebApplicationContext  
所在类：org.springframework.web.servlet.FrameworkServlet

②创建WebApplicationContext  
所在类：org.springframework.web.servlet.FrameworkServlet

③DispatcherServlet初始化策略 
FrameworkServlet创建WebApplicationContext后，刷新容器，调用onRefresh(wac)，此方法在DispatcherServlet中进行了重写，调用了initStrategies(context)方法，初始化策略，即初始化DispatcherServlet的各个组件
所在类：org.springframework.web.servlet.DispatcherServlet  

### 14.3、DispatcherServlet调用组件处理请求  

①processRequest()  
FrameworkServlet重写HttpServlet中的service()和doXxx()，这些方法中调用了processRequest(request, response)
所在类：org.springframework.web.servlet.FrameworkServlet  

②doService()  
所在类：org.springframework.web.servlet.DispatcherServlet  

③doDispatch()  
所在类：org.springframework.web.servlet.DispatcherServlet  

### 14.4、SpringMVC的执行流程                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

1、用户向服务器发送请求，请求**被SpringMVC 前端控制器 DispatcherServlet捕获**。  

2、DispatcherServlet**对请求URL**进行**解析**，得到请求**资源标识符（URI）**，**判断请求URI对应的映射**：  

如果不存在：
	再判断是否配置了mvc:default-servlet-handler|
    如果没配置，则控制台报映射查找不到，客户端展示404错误
	如果有配置，则访问目标资源（一般为静态资源，如：JS,CSS,HTML），找不到客户端也会展示404错误 

如果存在则执行下面的流程

3、根据该URI，调用HandlerMapping获得该Handler配置的所有相关的对象（包括Handler对象以及Handler对象对应的拦截器），最后以HandlerExecutionChain执行链对象的形式返回。

4、DispatcherServlet 根据获得的Handler，选择一个合适的HandlerAdapter。  

5、如果成功获得HandlerAdapter，此时将开始执行**拦截器的preHandler**(…)方法【正向】  

6、提取Request中的模型数据，填充Handler入参，开始**执行Handler（Controller 控制器)方法**，处理请求。
在填充Handler的入参过程中，根据你的配置，Spring将帮你做一些额外的工作：  
	HttpMessageConveter： 将请求消息（如Json、xml等数据）转换成一个对象，将对象转换为指定的响应信息
	数据转换：对请求消息进行数据转换。如String转换成Integer、Double等
	数据格式化：对请求消息进行数据格式化。 如将字符串转换成格式化数字或格式化日期等
	数据验证： 验证数据的有效性（长度、格式等），验证结果存储到BindingResult或Error中  

7、Handler执行完成后，向DispatcherServlet**返回一个ModelAndView对象**。  

8、此时将开始执行**拦截器的postHandle(...)方法**【逆向】。  

9、根据返回的ModelAndView（此时会判断是否存在异常：如果**存在异常**，则执行**HandlerExceptionResolver进行异常处理**）选择一个适合的ViewResolver进行**视图解析**，根据Model和View，来渲染视图。  

10、**渲染视图完毕**执行**拦截器的afterCompletion(…)方法**【逆向】  

11、将**渲染结果返回给客户端 **

## 15、SSM整合  

### 1、ContextLoaderListener  

**SpringMVC的IOC**容器在**DispatcherServlet初始化**的时候创建，而配置文件中加入load-on-startup标签将**DispatcherServlet初始化提前到服务器启动时创建servlet时创建**，所以SpringMVC的IOC容器在服务器启动时就会创建。但SpringMVC的IOC容器中要注入Service等对象，而它由Spring的IOC创建，所以**Spring的IOC要比SpringMVC的IOC创建要提前**。在服务器启动时，会**先创建监听器，过滤器，Servlet**。所以**将读取Spring配置文件，创建Spring的IOC放在监听器的初始方法中**。

**web.xml新增：**

```xml
<listener>
    <!--
        配置Spring的监听器，在服务器启动时加载Spring的配置文件
        Spring配置文件默认位置和名称：/WEB-INF/applicationContext.xml
        可通过上下文参数自定义Spring配置文件的位置和名称
    -->
    <listenerclass>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
	<!--自定义Spring配置文件的位置和名称-->
<context-param>
	<param-name>contextConfigLocation</param-name>
	<param-value>classpath:spring.xml</param-value>
</context-param>
```

**spring.xml**

```xml
<!--扫描组件-->
<context:component-scan base-package="com.t4mako.service.impl"></context:component-scan>
```

### 2、准备工作  

#### ①创建Maven Module  

#### ②导入依赖  

```xml
<packaging>war</packaging>

<properties>
    <spring.version>5.3.1</spring.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-beans</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <!--springmvc-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-aspects</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <!-- Mybatis核心 -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.7</version>
    </dependency>
    <!--mybatis和spring的整合包-->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>2.0.6</version>
    </dependency>
    <!-- 连接池 -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.0.9</version>
    </dependency>
    <!-- junit测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <!-- MySQL驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.16</version>
    </dependency>
    <!-- log4j日志 -->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
    <dependency>
        <groupId>com.github.pagehelper</groupId>
        <artifactId>pagehelper</artifactId>
        <version>5.2.0</version>
    </dependency>
    <!-- 日志 -->
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.3</version>
    </dependency>
    <!-- ServletAPI -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.12.1</version>
    </dependency>
    <dependency>
        <groupId>commons-fileupload</groupId>
        <artifactId>commons-fileupload</artifactId>
        <version>1.3.1</version>
    </dependency>
    <!-- Spring5和Thymeleaf整合包 -->
    <dependency>
        <groupId>org.thymeleaf</groupId>
        <artifactId>thymeleaf-spring5</artifactId>
        <version>3.0.12.RELEASE</version>
    </dependency>
</dependencies>
```

③创建表  

### 3、配置web.xml  

```xml
<!-- 配置Spring的编码过滤器 -->
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <!--处理请求的编码-->
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <!--处理响应的编码-->
    <init-param>
        <param-name>forceEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>

<!--配置处理请求方式PUT和DELETE的过滤器 -->
<filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>

<!--配置SpringMVC的前端控制器DispatcherServlet-->
<servlet>
    <servlet-name>SpringMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!--设置SpringMVC的配置文件的位置和名称 -->
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:springmvc.xml</param-value>
    </init-param>
    <!--将DispatcherServlet的初始化时间提前到服务器初始化-->
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>SpringMVC</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>

<!--配置Spring的监听器，在服务器启动时加载Spring的配置文件-->
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>

<!--设置Spring配置文件自定义的位置和名称-->
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:spring.xml</param-value>
</context-param>
```

### 4、配置springmvc.xml

```xml
<!--扫描控制层组件-->
<context:component-scan base-package="com.t4mako.controller"></context:component-scan>

<!--配置视图解析器-->
<bean id="viewResolver"
      class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
    <property name="order" value="1"/>
    <property name="characterEncoding" value="UTF-8"/>
    <property name="templateEngine">
        <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
            <property name="templateResolver">
                <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
                    <!-- 视图前缀 -->
                    <property name="prefix" value="/WEB-INF/templates/"/>
                    <!-- 视图后缀 -->
                    <property name="suffix" value=".html"/>
                    <property name="templateMode" value="HTML5"/>
                    <property name="characterEncoding" value="UTF-8" />
                </bean>
            </property>
        </bean>
    </property>
</bean>

<!--配置默认的Servlet处理静态资源-->
<mvc:default-servlet-handler />

<!--开启mvc注解驱动-->
<mvc:annotation-driven />

<!--配置视图控制器-->
<mvc:view-controller path="/" view-name="index"></mvc:view-controller>

<!--配置文件上传解析器-->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"></bean>

<!--拦截器和异常解析器（若有则配置）-->
```

### 5、搭建MyBatis环境  

#### ①创建属性文件jdbc.properties  

```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/ssm?serverTimezone=UTC
jdbc.username=root
jdbc.password=root
```

#### ②创建MyBatis的核心配置文件mybatis-config.xml  

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

<!--<properties resource="jdbc.properties"/>-->

<settings>
    <!--将下划线映射为驼峰-->
    <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>

<plugins>
    <!--配置分页插件-->
    <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
</plugins>

<!--
    &lt;!&ndash;设置类型别名(实体类所对应的包))&ndash;&gt;
    <typeAliases>
        <package name=""/>
    </typeAliases>
-->

<!--    &lt;!&ndash;设置连接数据库的环境&ndash;&gt;
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>-->

<!--    &lt;!&ndash;引入mybatis映射文件(映射文件所对应的包))&ndash;&gt;
    <mappers>
        <package name=""/>
    </mappers>-->
</configuration>
```

#### ③创建Mapper接口和映射文件  

```java
public interface EmployeeMapper {
    //查询所有员工信息
    List<Employee> getALlEmployee();
}
```

```xml
<!--namespace对应mapper接口的全类名-->
<mapper namespace="com.t4mako.mapper.EmployeeMapper">

    <!-- List<Employee> getALlEmployee();-->
    <select id="getALlEmployee" resultType="Employee">
        select * from t_emp
    </select>

</mapper>
```

#### ④创建日志文件log4j.xml  

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">
    <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
        <param name="Encoding" value="UTF-8"/>
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS}%m (%F:%L) \n"/>
        </layout>
    </appender>
    <logger name="java.sql">
        <level value="debug"/>
    </logger>
    <logger name="org.apache.ibatis">
        <level value="info"/>
    </logger>
    <root>
        <level value="debug"/>
        <appender-ref ref="STDOUT"/>
    </root>
</log4j:configuration>
```

### 6、创建Spring的配置文件并配置  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

    <!--扫描组件（除控制层）-->
    <context:component-scan base-package="com.t4mako">
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>

    <!--引入jdbc.properties-->
    <context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>

    <!--配置数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"></property>
        <property name="url" value="${jdbc.url}"></property>
        <property name="username" value="${jdbc.username}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>

    <!--配置事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"></property>
    </bean>

    <!--开启事务的注解驱动-->
    <!--将使用注解@Transactional标识的方法或类中所有的方法通过进行事务管理-->
    <tx:annotation-driven transaction-manager="transactionManager" />


    <!--配置SqlSessionFactoryBean，可以直接在Spring的IOC中获取SqlSessionFactory-->
    <bean class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--设置MyBatis的核心配置文件的路径-->
        <property name="configLocation" value="classpath:mybatis-config.xml"></property>
        <!--设置数据源-->
        <property name="dataSource" ref="dataSource"></property>
        <!--设置类型别名所对应的包-->
        <property name="typeAliasesPackage" value="com.t4mako.pojo"></property>
        <!--设置映射文件的路径，只有映射文件的包和mapper接口的包不一致时需要设置-->
        <!--<property name="mapperLocations" value="classpath:mappers/*"></property>-->
<!--        &lt;!&ndash;设置分页插件&ndash;&gt;
        <property name="plugins">
            <array>
                <bean class="com.github.pagehelper.PageInterceptor"></bean>
            </array>
        </property>-->
    </bean>

    <!--配置mapper接口的扫描，可以将指定包下所有的mapper接口，通过SqlSession创建代理实现类对象，并将这些对象交给IOC容器管理-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.t4mako.mapper"></property>
    </bean>
</beans>
```

### 7、测试功能  

#### ①创建组件  

实体类Employee  （略）

控制层组件EmployeeController  

```java
@RequestMapping(value = "/employee/page/{pageNum}",method = RequestMethod.GET)
public String getEmployeePage(@PathVariable("pageNum") Integer pageNum,Model model){
    //获取员工的分页信息
    PageInfo<Employee> page = employeeService.getAllEmployeePage(pageNum);
    //将分页数据共享在请求域中
    model.addAttribute("page",page);
    return "employee_list";
}
```

创建接口EmployeeService  

```java
@Service
public interface EmployeeService {
    List<Employee> getAllEmployee();

    //获取员工分页信息
    PageInfo<Employee> getAllEmployeePage(Integer pageNum);
}
```

创建实现类EmployeeServiceImpl  

```java
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeMapper employeeMapper;

    @Override
    public List<Employee> getAllEmployee() {
        return employeeMapper.getALlEmployee();
    }

    @Override
    public PageInfo<Employee> getAllEmployeePage(Integer pageNum) {
        //开启分页功能
        PageHelper.startPage(pageNum,4);
        //查询所有的员工信息
        List<Employee> list = employeeMapper.getALlEmployee();
        //获取分页相关顺序
        PageInfo<Employee> page = new PageInfo<>(list,5);
        return page;
    }
}
```

#### ②创建页面  

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>员工列表</title>
    <link rel="stylesheet" th:href="@{/static/css/index_work.css}">

</head>
<body>
<table>
    <tr>
        <th colspan="6">员工列表</th>
    </tr>
    <tr>
        <th>序号</th>
        <th>员工姓名</th>
        <th>年龄</th>
        <th>性别</th>
        <th>邮箱</th>
        <th>操作</th>
    </tr>
    <tr th:each="employee,status : ${page.list}">
        <td th:text="${status.count}"></td>
        <td th:text="${employee.empName}"></td>
        <td th:text="${employee.age}"></td>
        <td th:text="${employee.gender}"></td>
        <td th:text="${employee.email}"></td>
        <td>
            <a href="">删除</a>
            <a href="">修改</a>
        </td>
    </tr>
</table>
<div style="text-align: center;">
    <a th:if="${page.hasPreviousPage}" th:href="@{/employee/page/1}">首页</a>
    <a th:if="${page.hasPreviousPage}" th:href="@{'/employee/page/'+${page.prePage}}">上一页</a>
    <span th:each="num : ${page.navigatepageNums}">
        <a th:if="${page.pageNum == num}" style="color: red" th:href="@{'/employee/page/'+${num}}" th:text="'['+${num}+']'"></a>
        <a th:if="${page.pageNum != num}" th:href="@{'/employee/page/'+${num}}" th:text="${num}"></a>
    </span>
    <a th:if="${page.hasNextPage}" th:href="@{'/employee/page/'+${page.nextPage}}">下一页</a>
    <a th:if="${page.hasNextPage}" th:href="@{'/employee/page/'+${page.pages}}">末页</a>

</div>
</body>
</html>
```

#### ③访问测试分页功能  

http://localhost:8080/ssm/employee/page/2
