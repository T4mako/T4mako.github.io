---
title: noob-Rg
---
<!-- more -->

## 2、项目介绍

技术选型：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230225220831.png)

功能架构：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230225221142.png)

角色：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230225221347.png).

## 3、开发环境搭建

### 1、数据库环境搭建

1、创建数据库
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230226143813.png)

2、导入表结构（db_reggie.sql）
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230226144053.png)

或打开命令行：source 绝对路径
**注意：路径不能有中文字符**

数据表：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230226144406.png)

### 2、maven项目创建

创建maven项目，修改名字与位置
导入pom文件
导入application.yaml配置文件

```xml
<!--引入依赖-->
<dependencies>
    <!--springboot-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <!--单元测试-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <!--web-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <scope>compile</scope>
    </dependency>
    <!--mybatis-plus-->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.4.2</version>
    </dependency>
    <!--lombok，简化JavaBean开发-->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.20</version>
    </dependency>
    <!--将对象转换为json-->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.76</version>
    </dependency>
    <!--通用工具包-->
    <dependency>
        <groupId>commons-lang</groupId>
        <artifactId>commons-lang</artifactId>
        <version>2.6</version>
    </dependency>
    <!--mysql驱动-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    <!--数据库连接池-->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid-spring-boot-starter</artifactId>
        <version>1.1.23</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <!--插件-->
        <plugin>
            <!--当运行“mvn package”进行打包时，会打包成一个可以直接运行的 JAR 文件，使用“Java -jar”命令就可以直接运行。-->
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>2.4.5</version>
        </plugin>
    </plugins>
</build>
```

```yaml
server:
  #端口号
  port: 8080
spring:
  application:
    #指定应用名称
    name: reggie_take_out
  datasource:
    #数据源
    druid:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://localhost:3306/reggie?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true
      username: root
      password: root
mybatis-plus:
  configuration:
    #在映射实体或者属性时，将数据库中表名和字段名中的下划线去掉，按照驼峰命名法映射
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      id-type: ASSIGN_ID
```

配置主类

```java
@Slf4j
@SpringBootApplication //这是一个springboot应用
public class ReggieApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReggieApplication.class,args);
        log.info("项目启动成功-----");
    }
}
```

Alibaba Fastjson是一种快速、高效、功能丰富的Java JSON库，可以将Java对象序列化为JSON格式，或将JSON字符串反序列化为Java对象。Fastjson提供了多种序列化和反序列化选项，包括支持Java泛型、自定义序列化、反序列化和过滤器等。

*Fastjson的主要用途包括：*

1. 序列化Java对象：Fastjson可以将Java对象序列化为JSON格式的字符串，方便在不同系统之间传输数据。
2. 反序列化JSON字符串：Fastjson可以将JSON格式的字符串反序列化为Java对象，方便在接收到JSON数据时将其转换为Java对象进行处理。
3. 支持Java泛型：Fastjson可以序列化和反序列化Java泛型对象，使得在处理复杂数据结构时更加方便。
4. 自定义序列化和反序列化：Fastjson提供了自定义序列化和反序列化的选项，可以对Java对象进行定制化的序列化和反序列化处理。
5. 过滤器：Fastjson提供了过滤器选项，可以过滤掉不需要序列化或反序列化的属性，提高性能和安全性。

### 3、前端资源导入

导入前端资源到 resources 中
由于静态资源的访问springboot默认配置在static文件夹等其他配置下

***创建配置类修改静态资源映射：***
创建 config 包，创建 WebMvcConfig 类

```java
@Slf4j
@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {
    //设置静态资源映射
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        log.info("开始静态资源映射");
        registry.addResourceHandler("/backend/**").addResourceLocations("classpath:/backend/");
        registry.addResourceHandler("/front/**").addResourceLocations("classpath:/front/");
    }
}
```

`WebMvcConfigurationSupport` 是Spring MVC框架中的一个配置类，它可以用来自定义Spring MVC的配置，包括添加拦截器、消息转换器、视图解析器

## 4、后台登录功能开发

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230226154222.png)

创建实体类Employee，和employee表进行映射：
创建Entity包：实体类包
创建controller，service，service→impl，mapper包

### 1、实体类创建

```java
//员工实体类
@Data
public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String username;
    private String name;
    private String password;
    private String phone;
    private String sex;
    private String idNumber; //身份证号码
    private Integer status;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    @TableField(fill = FieldFill.INSERT)
    private Long createUser;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Long updateUser;
}
```

### 2、mapper创建

```java
@Mapper
public interface EmployeeMapper extends BaseMapper<Employee> { //继承baseMapper，继承常见的增删改查
}
```

### 3、service，serviceImpl创建

```java
public interface EmployeeService extends IService<Employee> {
}
```

```java
@Service
public class EmployeeServiceImpl extends ServiceImpl<EmployeeMapper, Employee> implements EmployeeService {
}
```

### 4、controller创建

```java
@Slf4j
@RestController
@RequestMapping("/employee")
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
}
```

### 5、导入返回结果类R

***此类是一个通用结果类，服务端响应的所有结果最终都会包装成此种类型给前端***

创建通用类：
创建common包，创建通过返回结果类R

```java
@Data
public class R<T> {

    private Integer code; //编码：1成功，0和其它数字为失败

    private String msg; //错误信息

    private T data; //数据

    private Map map = new HashMap(); //动态数据

    public static <T> R<T> success(T object) {
        R<T> r = new R<T>();
        r.data = object;
        r.code = 1;
        return r;
    }

    public static <T> R<T> error(String msg) {
        R r = new R();
        r.msg = msg;
        r.code = 0;
        return r;
    }

    public R<T> add(String key, Object value) {
        this.map.put(key, value);
        return this;
    }
}
```

### 6、登录方法的编写

登录的业务：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230226170122.png)

```java
@Slf4j
@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    //@RequestBody：获取请求体（json数据）
    //使用request获取session，将返回的数据添加进session内
    @PostMapping("/login")
    public R<Employee> login(HttpServletRequest request, @RequestBody Employee employee){

        //1、将页面提交的密码进行md5加密
        String password = employee.getPassword();
        password = DigestUtils.md5DigestAsHex(password.getBytes());

        //2、根据页面提交的用户名username查询数据库
        LambdaQueryWrapper<Employee> queryWrapper = new LambdaQueryWrapper<>();
        //Employee实体中的getUsername方法获取username字段的值，employee.getUsername()表示指定的username属性值。
        queryWrapper.eq(Employee::getUsername,employee.getUsername()); //添加查询条件
        Employee emp = employeeService.getOne(queryWrapper);


        //3、如果没有查询到则返回登录失败结果
        if(emp == null){
            return R.error("登录失败");
        }

        //4、密码对比，如果不一致则返回登录失败结果
        if(!emp.getPassword().equals(password)){
            return R.error("登录失败");
        }

        //5、查看员工状态，如果为已禁用，则返回员工已禁用结果
        if(emp.getStatus() == 0){
            return R.error("账号已被经用");
        }

        //6、登录成功，将员工id存入session中并返回登录结果
        request.getSession().setAttribute("employee",emp.getId());
        return R.success(emp);
    }
}
```

### 7、后台系统退出功能

退出业务：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230304133242.png)

```java
//员工退出
@PostMapping("/logout")
public R<String> logout(HttpServletRequest request){
    //清理Sesion中保存的当前登录员工的id
    request.getSession().removeAttribute("employee");
    return R.success("退出成功");
}
```

### 8、完善登录功能

问题分析：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230304135037.png)

实现步骤：
1、创建自定义过滤器LoginCheckFilter
2、在启动类上加入注解@ServletComponentScan(扫描)
3、完善过滤器的处理逻辑
`在SpringBootApplication上使用@ServletComponentScan注解后，Servlet、Filter、Listener可以直接通过@WebServlet、@WebFilter、@WebListener注解自动注册，无需其他代码。`

过滤器的具体业务逻辑：
1、获取本次请求的URL
2、判断本次请求是否需要处理
3、如果不需要处理，则直接放行
4、判断登录状态，如果已登录，则直接放行
5、如果未登录则返回未登录结果

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230304144250.png)

```java
//检查用户是否已经完成登录
@WebFilter(filterName = "loginCheckFilter",urlPatterns = "/*")
@Slf4j
public class LoginCheckFilter implements Filter {

    //路径匹配器，支持通配符
    public static final AntPathMatcher PATH_MATCHER = new AntPathMatcher();

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        //HttpServletRequest和ServletRequest都是接口，HttpServletRequest比ServletRequest多了一些针对于Http协议的方法。 例如：getHeader()， getMethod() ， getSession()
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        //1、获取本次请求的URL
        String requestURI = request.getRequestURI();
        //定义不需要处理的请求路径
        String[] urls = new String[]{
                "/employee/login",
                "/employee/logout",
                "/backend/**",
                "/front/**"
        };

        //2、判断本次请求是否需要处理
        boolean check = check(urls,requestURI);

        //3、如果不需要处理，则直接放行
        if(check){
            filterChain.doFilter(request,response);
            return;
        }

        //4、判断登录状态，如果已登录，则直接放行
        if(request.getSession().getAttribute("employee") != null){
            filterChain.doFilter(request,response);
            return;
        }

        //5、如果未登录则返回未登录结果,通过输出流方式向客户端页面响应数据
        response.getWriter().write(JSON.toJSONString(R.error("NOTLOGIN")));
    }

    //路径匹配，检查本次请求是否需要放行
    public boolean check(String[] urls,String requestURI){
        for (String url : urls) {
            boolean match = PATH_MATCHER.match(url, requestURI);
            if(match){
                return true;
            }
        }
        return false;
    }
}
```

## 5、员工管理

### 1、新增员工

后台系统中可以管理员工信息，通过新员工来添加后台系统用户，点击添加员工按钮跳转到新增页
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230304154615.png)

新增员工即将新增的员工插入到employee表中
employee表中，username字段为唯一约束，status字段默认值为1，id通过雪花算法生成

整个程序执行过程：
1、页面发送ajax请求，将新增员工页面中输入的数据以json的形式提交到服务端
2、服务端Controller接受页面提交的数据并调用Service将数据进行保存
3、Service调用Mapper操作数据库，保存数据

### 2、编写全局异常处理器

当新增员工时输入账号已存在，由于employee表中对该字段加入了唯一约束，因此程序会抛出异常
此时我们需要异常捕获，通常有两种处理方式：
1、在Controller中加入try-catch进行异常捕获
2、使用异常处理器进行全局异常捕获

**@ControllerAdvice**是一个Spring框架中的注解，用于定义**全局控制器异常处理器**。当控制器方法抛出未被处理的异常时，Spring将查找带有@ControllerAdvice注解的类来处理该异常。该类中的方法可以使用@ExceptionHandler注解来处理特定类型的异常。
`@ControllerAdvice`是一个特殊的`@Component`，用于标识一个类，这个类中被以下三种注解标识的方法：`@ExceptionHandler`，`@InitBinder`，`@ModelAttribute`，将作用于所有的`@Controller`类的接口上。

**@ExceptionHandler**是一个Spring框架中的注解，用于处理控制器方法中的异常。在控制器方法上添加@ExceptionHandler注解，可以指定要处理的异常类型。当控制器方法抛出该异常时，Spring将调用带有@ExceptionHandler注解的方法来处理该异常。

@ExceptionHandler注解可以被用于单个方法或全局控制器。在单个方法中使用时，它只会应用于该方法中的异常处理。如果在全局控制器中使用，则它将应用于整个控制器中的所有方法。

使用@ExceptionHandler注解可以简化异常处理逻辑，使代码更易于维护和测试。

```java
//拦截添加了RestController,Controller注解的Controller
@ControllerAdvice(annotations = {RestController.class, Controller.class})
@ResponseBody
@Slf4j
public class GlobalExceptionHandler {
    //异常处理方法
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public R<String> exception(SQLIntegrityConstraintViolationException ex){
        if(ex.getMessage().contains("Duplicate entry")) {//重复entry
            String[] split = ex.getMessage().split(" ");
            String msg = split[2] + "已存在";
            return R.error(msg);
        }
        return R.error("服务器繁忙");
    }
}
```

### 3、员工信息分页查新

在开发代码前，梳理整个程序的执行过程：
1、页面发送ajax请求，将分页查询参数（page，pageSize，name）提交到服务端
2、服务端Controller接受页面提交的数据并调用Service查询数据
3、Service调用Mapper操作数据库，查询分页数据
4、Controller将查询到的分页数据响应给页面
5、页面接受到分页数据并通过ElementUI的Table组件展示到页面上

创建配置类配置分页插件

```java
//配置MybatisPlus分页插件
@Configuration
public class MybatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor(){
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        //添加分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL)); //配置数据库类型为MySQL
        return interceptor;
    }
}
```

编写Controller中的业务

```java
//员工信息分页查询
@GetMapping("/page")
public R<Page> page(int page,int pageSize,String name){
    //构造分页构造器
    Page pageIngo = new Page(page,pageSize);
    //构造条件构造器
    LambdaQueryWrapper<Employee> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.like(StringUtils.isNotBlank(name),Employee::getName,name);
    //添加排序条件
    queryWrapper.orderByDesc(Employee::getUpdateTime);
    //执行查询
    employeeService.page(pageIngo,queryWrapper);//无需返回，在内部已封装给pageInfo
    return R.success(pageIngo);
}
```

### 4、启用/禁用员工账号

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230305145523.png)

只有管理员有启用禁用按钮原理：前端通过v-if判断是否为admin管理员

程序的执行过程：
1、页面发送ajax请求，将参数（id、status）提交到服务端
2、服务端Controller接受页面提交的数据并调用Service更新数据
3、Service调用Mapper操作数据库

```java
@PutMapping
//根据id修改员工信息
public R<String> update(HttpServletRequest request,@RequestBody Employee employee){
    Long empId = (Long) request.getSession().getAttribute("employee");
    employee.setUpdateTime(LocalDateTime.now());
    employee.setUpdateUser(empId);
    employeeService.updateById(employee);
    return R.success("员工信息修改成功");
}
```

**页面中js处理long型数字只能精确到前16位，所以最终通过ajax请求提交给服务端的时候会丢失精度**

如何解决：
在服务端给页面响应json数据时将long型转换成String字符串

具体实现步骤：
（1）提供对象转换器JacksonObjectMapper，基于Jackson进行Java对象到json数据的转换（资料中提供的类）
（2）在WebMvcConfig配置类中扩展Spring mvc的消息转换器，在此消息转换器中使用提供的对象转换器（JacksonObjectMapper）进行java对象到json数据的转换
（如果不扩展配置消息转换器，使用spring mvc提供的消息转换器）

JacksonObjectMapper类（对象转换器类）

```java
/**
 * 对象映射器:基于jackson将Java对象转为json，或者将json转为Java对象
 * 将JSON解析为Java对象的过程称为 [从JSON反序列化Java对象]
 * 从Java对象生成JSON的过程称为 [序列化Java对象到JSON]
 */
public class JacksonObjectMapper extends ObjectMapper {

    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    public static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";

    public JacksonObjectMapper() {
        super();
        //收到未知属性时不报异常
        this.configure(FAIL_ON_UNKNOWN_PROPERTIES, false);

        //反序列化时，属性不存在的兼容处理
        this.getDeserializationConfig().withoutFeatures(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

        SimpleModule simpleModule = new SimpleModule()
                .addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_FORMAT)))
                .addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT)))
                .addDeserializer(LocalTime.class, new LocalTimeDeserializer(DateTimeFormatter.ofPattern(DEFAULT_TIME_FORMAT)))

                .addSerializer(BigInteger.class, ToStringSerializer.instance)
                .addSerializer(Long.class, ToStringSerializer.instance)
                .addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_FORMAT)))
                .addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT)))
                .addSerializer(LocalTime.class, new LocalTimeSerializer(DateTimeFormatter.ofPattern(DEFAULT_TIME_FORMAT)));

        //注册功能模块 例如，可以添加自定义序列化器和反序列化器
        this.registerModule(simpleModule);
    }
}
```

扩展MVC的消息转换器：在WebMvcConfig配置类中添加

```java
//扩展mvc的消息转换器
@Override
protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
    //创建消息转换器对象
    MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter();
    //设置对象转换器，底层使用Jackson将java转换为json
    messageConverter.setObjectMapper(new JacksonObjectMapper());
    //将上面的消息转换器对象追加到mvc框架的转换器集合中
    converters.add(0,messageConverter);
}
```



### 5、编辑员工信息

在员工管理列表页面点击编辑按钮，跳转到编辑页面，在编辑页面回显员工信息并进行修改，最后点击保存按钮完成编辑操作

操作过程对应的程序执行流程：
1、点击编辑按钮，页面跳转到add.html，在url中携带参数【员工id】
2、在add.html页面获取url中的参数【员工id】
3、发送ajax请求，请求服务器，同时提交员工id参数
4、服务端接受请求，根据员工id查询员工信息，将员工信息以json形式响应给页面
5、页面接受服务端响应的json数据，通过VUE的数据绑定进行员工信息回显
6、点击保存按钮，发送ajax请求，将页面中的员工信息以json方式提交给服务器
7、服务端接受员工信息，并进行处理，完成后给页面响应
8、页面接收到服务器响应信息后进行相应的处理

在Controller中编写业务：

```java
@GetMapping("/{id}")
public R<Employee> getById(@PathVariable Long id){
    Employee emp = employeeService.getById(id);
    if(emp != null){
        return R.success(emp);
    }
    return R.error("没有查询到员工信息");
}
```

### 6、公共字段自动填充

在员工管理中，新增员工要添加创建时间，创建人，修改时间，修改人等字段，这些字段**为公共字段，很多表中都有这些字段**。
能否对于这些字段在某个地方同一管理，简化开发？即使用Mybatis Plus提供的公共字段自动填充功能

Mybatis Plus公共字段自动填充，就是在插入或更新的时候为指定字段赋予指定的值，使用它的好处就是可以同一对这些字段进行处理，避免重复代码。

实现步骤：
1、在实体类的属性上加上@TableField注解，指定自动填充的策略
2、按照框架要求编写元数据对象处理器，在此类中统一为公共字段赋值，此类需要实现MetaObjectHandler接口

实现：
1、在Employee实体类上添加注解：

```java
@TableField(fill = FieldFill.INSERT) //插入时填充字段
private LocalDateTime createTime;

@TableField(fill = FieldFill.INSERT_UPDATE) //插入和更新时填充字段
private LocalDateTime updateTime;

@TableField(fill = FieldFill.INSERT) //插入时填充字段
private Long createUser;

@TableField(fill = FieldFill.INSERT_UPDATE) //插入和更新时填充字段
private Long updateUser;
```

2、按照框架要求编写元数据对象处理器，在此类中统一为公共字段赋值，此类需要实现MetaObjectHandler接口

自定义元数据对象处理器：MyMetaObjectHandler

```java
//自定义元数据对象处理器
@Component
@Slf4j
public class MyMetaObjectHandler implements MetaObjectHandler {

    //插入操作，自动填充
    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("insert公共字段自动填充");
        metaObject.setValue("createTime", LocalDateTime.now());
        metaObject.setValue("updateTime",LocalDateTime.now());
        metaObject.setValue("createUser",new Long(1));
        metaObject.setValue("updateUser",new Long(1));
    }

    //更新操作，自动填充
    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("update公共字段自动填充");
    }
}
```

在设置创建用户与更新用户时，需要放置用户ID，但在此类中无法获取session对象，因此通过**ThreadLocal解决**

### 7、ThreadLocal

前导知识：
在客户端**每次发送http请求时，对应的在服务端都会分配一个新的线程来处理**，在处理过程中涉及到下面类中的方法都属于相同的一个线程：
1、LoginCheckFilter的doFilter方法
2、EmployeeController的update方法
3、MyMetaObjectHandler的updateFill方法

ThreadLocal:
ThreadLocal并不是一个Thread，而是Thread的局部变量。当使用ThreadLocal维护变量时，**ThreadLocal为每个使用该变量的线程提供独立的变量副本**，所以**每一个线程都可以独立地改变自己的副本**，而不会影响其他线程对应的副本。ThreadLocal为每个线程提供单独一份存储空间，具有线程隔离的效果，只有在线程内才能获取到对应的值，线程外则不能访问。
ThreadLocal存放的值为一个对象。

ThreadLocal常用方法：
public void set(T value) 设置当前线程的线程局部变量的值
public T get() 返回当前线程所对应的线程局部变量的值

我们可以在LoginCheckFilter的doFilter方法中获取当前登录用户id，并调用ThreadLocal的set方法设置当前线程的线程局部变量的值（用户id），然后在MyMetaObjectHandler的updateFill中调用ThreadLcoal的get方法获得当前线程局部变量的值。

### 8、使用ThreadLocal功能完善

1、编写BaseContext工具类，基于ThreadLocal封装的工具类
2、在LoginCheckFilter的doFilter方法中调用BaseContest获取登录用户的id
3、在MyMetaObjectHandler的方法中调用BaeContest获取用户登录的id

BaseContext工具类：

```java
//基于ThreadLocal封装工具类，用于保存和获取当前登录用户的id
public class BaseContext{
    private static ThreadLocal<Long> threadLocal = new InheritableThreadLocal<>();

    public static void setCurrentId(Long id){
        threadLocal.set(id);
    }

    public static Long getCurrentId(){
        return threadLocal.get();
    }
}
```

更新doFilter方法：

```java
 //4、判断登录状态，如果已登录，则直接放行
if(request.getSession().getAttribute("employee") != null){
    Long empId = (Long) request.getSession().getAttribute("employee");
    BaseContext.setCurrentId(empId);//set id
    filterChain.doFilter(request,response);
    return;
}
```

MyMetaObjectHandler类：

```java
//自定义元数据对象处理器
@Component
@Slf4j
public class MyMetaObjectHandler implements MetaObjectHandler {

    //插入操作，自动填充
    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("insert公共字段自动填充");
        metaObject.setValue("createTime", LocalDateTime.now());
        metaObject.setValue("updateTime",LocalDateTime.now());
        metaObject.setValue("createUser",BaseContext.getCurrentId()); //get id
        metaObject.setValue("updateUser",BaseContext.getCurrentId());
    }

    //更新操作，自动填充
    @Override
    public void updateFill(MetaObject metaObject) {
        metaObject.setValue("updateTime", LocalDateTime.now());
        metaObject.setValue("updateUser",BaseContext.getCurrentId());
    }
}
```

## 6、菜品分类

### 1、新增分类

![image-20230306143750619](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230306143750619.png)

创建需要用到的类和接口：
1、实体类Category
2、Mapper接口CategoryMapper
3、业务层接口CategoryService
4、业务层实现类CategoryServiceImpl
5、控制层CategoryController

整个程序的执行过程：
1、页面(backend/page/category/list.html)发送ajax请求，将新分类窗口输入的数据以json形式提交到服务端
2、服务端Controller接受页面提交的数据并调用Service将数据进行保存
3、Servie调用Mapper操作数据库，保存数据

新增菜品与套餐请求的服务器端地址和提交的json数据结构相同，所以服务端只需要提供一个方法统一处理即可

编写Controller方法：

```java
//分类管理
@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    public CategoryService categoryService;

    //新增分类
    @PostMapping
    public R<String> save(@RequestBody Category category){
        categoryService.save(category);
        return R.success("新增分类成功");
    }
}
```

### 2、分类信息分页查询

程序的执行过程：
1、页面发送ajax请求，将分页查询参数（page、pageSize）提交到服务端
2、服务端Controller接受页面提交的数据并调用Serice查询数据
3、Service调用Mapper操作数据库，查询分页数据
4、Controller将查询到的分页数据响应给页面
5、页面接收到分页数据并通过ElementUI的Table组件展示到页面上

```java
//分页功能
@GetMapping("/page")
public R<Page> page(int page,int pageSize){
    //分页构造器
    Page<Category> pageInfo = new Page<>(page,pageSize);
    //条件构造器
    LambdaQueryWrapper<Category> queryWrapper = new LambdaQueryWrapper<>();
    //添加排序规则，根据sort排序
    queryWrapper.orderByAsc(Category::getSort);
    //进行分页查询
    categoryService.page(pageInfo,queryWrapper);
    return R.success(pageInfo);
}
```

### 3、删除分类

在分类管理列表页面，可以对某个分类进行删除操作，需要注意的是**当分类关联了菜品或套餐时，此分类不允许删除**

要实现分类删除功能，需要先准备基础的类和接口：
1、实体类Dish和Setmeal（菜品与套餐）
2、Mapper接口DishMapper和SetmealMapper
3、Service接口DishService和SetmealService
4、Service实现类DishServiceImpl和SetMealSericeImpl

业务编写过程：
1、Controller接受前端请求，获取id值，调用service中自己编写的remove方法，删除分类
2、在service编写remove抽象方法。在serviceImpl中实现。
3、在serviceImpl中注入DishService和SetmealService，通过id值查询Dish表和Setmeal表中是否有该分类的category_id
4、如果存在，抛出自己编写的异常类。如果没有，调用super.removeById(id)删除分类
5、将自己编写的异常类写入GlobalExceptionHandler类中，统一返回消息

CustomException自定义异常类：

```java
//自定义业务异常类
public class CustomException extends RuntimeException {
    public CustomException(String message){
        super(message);
    }
}
```

GlobalExceptionHandler类中添加：

```java
//异常处理方法
@ExceptionHandler(CustomException.class)
public R<String> exception(CustomException ex){
    return R.error(ex.getMessage());
}
```

CategoryServiceImpl：

```java
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper,Category> implements CategoryService {

    @Autowired
    public DishService dishService;

    @Autowired
    public SetmealService setmealService;

    //根据id删除分类，删除之前需要进行判断
    @Override
    public void remove(Long id) {
        //查询当前分类是否关联了菜品，如果已经关联，抛出一个业务异常
        LambdaQueryWrapper<Dish> dishLambdaQueryWrapper = new LambdaQueryWrapper<>();
        //添加查询条件，根据分类id查询
        dishLambdaQueryWrapper.eq(Dish::getCategoryId,id);
        int count = dishService.count(dishLambdaQueryWrapper);
        if(count > 0){
            //已经关联菜品，抛出一个业务异常
            throw new CustomException("当前分类下关联了菜品，不能删除");
        }

        //查询当前分类是否关联了套餐，如果已经关联，抛出一个业务异常
        LambdaQueryWrapper<Setmeal> setmealLambdaQueryWrapper = new LambdaQueryWrapper<>();
        //添加查询条件，根据分类id查询
        setmealLambdaQueryWrapper.eq(Setmeal::getCategoryId,id);
        count = setmealService.count(setmealLambdaQueryWrapper);
        if(count > 0){
            //已经关联菜品，抛出一个业务异常
            throw new CustomException("当前分类下关联了套餐，不能删除");
        }

        //正常删除分类
        super.removeById(id);
    }
}
```

Controller：

```java
//根据id删除分类
@DeleteMapping
public R<String> delete(Long ids){
    categoryService.remove(ids);
    return R.success("分类信息删除成功");
}
```

### 4、修改分类

在分类管理列表页面点击修改按钮，弹出修改窗口，在修改窗口回显信息并进行修改，最后点击确定按钮完成修改操作

```java
//根据id修改分类信息
@PutMapping
public R<String> update(@RequestBody Category category){
    categoryService.updateById(category);
    return R.success("修改分类信息成功");
}
```

## 7、菜品管理

### 1、文件的上传和下载

#### 1、概念介绍

文件上传，也称为**upload**，是指将本地图片、视频、音频等文件上传到服务器，可以供其他用户浏览或下载的过程。

文件上传时，对页面的form表单有如下要求：
**method=“post”	（采用post方式提交）
enctype=“multipart/form-data”	(采用multipart格式上传文件)
type=“file”	(使用input的file控件上传)**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230307133505.png)

目前一些前端组件库也提供了相应的上传组件，但是底层原理还是基于form表单的文件上传
例如ElementUI中提供的upload上传组件

服务端要接受客户端页面上传的文件，通常会使用Apache的两个组件：
**commins-fileupload
commons-io**

spring框架在**spring-web包**中对文件上传进行了封装，大大简化了服务端代码，我们只需要**在Controller的方法中声明一个MultipartFile类型的参数**即可接收上传文件，例如：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230307134027.png)

文件下载，也称为**download**
浏览器进行文件下载，通常有两种形式：
①以附件形式下载，弹出保存对话框，将文件保存到指定目录
②直接在浏览器中打开

通过浏览器下载，本质就是服务端将文件以流的形式写回浏览器的过程

#### 2、文件上传代码实现

前端使用ElementUI提供上传组件

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230307134547.png)

可以在application.yml中配置文件上传的通用目录：

```yml
#自定义图片存储位置
reggie:
  path: D:\ReggieTemp\
```

编写CommonController

```java
//文件的上传和下载
@RestController
@RequestMapping("/common")
@Slf4j
public class CommonController {

    //获取yml中的值
    @Value("${reggie.path}")
    private String basePath;

    //文件上传
    @PostMapping("/upload")
    public R<String> upload(MultipartFile file){ //请求参数传入，MultipartFile对象名要与name值保持一致
        //file是一个临时文件，需要转存到指定位置，否则本次请求完成后临时文件会删除

        //原始文件名
        String originalFilename = file.getOriginalFilename(); //XXX.jpd
        //获取后缀名
        String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
        //使用UUID重新生成文件名，防止文件名称重复造成文件覆盖
        String fileName = UUID.randomUUID().toString();

        //创建一个目录对象
        File dir = new File(basePath);
        //判断当前目录是否存在
        if(!dir.exists()){
            //目录不存在，需要创建
            dir.mkdir();
        }

        try {
            //将临时文件转存到指定位置
            file.transferTo(new File(basePath + fileName + suffix));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return R.success(fileName);
    }
}
```

#### 3、文件下载代码实现

文件下载，页面端可以使用\<img>标签展示下载的图片

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230307145926.png)

在controller中添加方法：
通过输出流的方式将数据流返回给前端页面

```java
//文件下载
@GetMapping("/download")
public void download(String name, HttpServletResponse response){
    try {
        //输入流，通过输入流读取文件内容
        FileInputStream fileInputStream = new FileInputStream(new File(basePath + name + ".jpg"));
        //输出流，通过输出流将文件
        ServletOutputStream outputStream = response.getOutputStream();

        int len = 0;
        byte[] bytes = new byte[1024];
        while((len = fileInputStream.read(bytes)) != -1){
            outputStream.write(bytes,0,len);
            outputStream.flush();
        }
        //关闭资源
        outputStream.close();
        fileInputStream.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### 2、新增菜品

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230307185259.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230307185420.png)

在开发业务功能前，先将需要用到的类和接口基本结构创建好：
实体类：DishFlavor
Mapper接口：DishFlavorMapper
业务层接口：DishFlavorServvice
业务层实现类：DishFlavorServiceImpl
控制层：DishController

新增菜品时前端和服务端的交互过程：
1、页面（backend/page/food/add.html）发送ajax请求，请求服务端获取菜品分类并展示到下拉框中
2、页面发送请求进行图片上传，请求服务端将图片保存到服务器
3、页面发送请求进行图片下载，将上传的图片进行回显
4、点击保存按钮，发送ajax请求，将菜品相关数据以json形式提交到服务端

请求服务端获取菜品分类并展示到下拉框中
在CategoryController中编写：

```java
//根据条件查询分类数据
@GetMapping("/list")
public R<List<Category>> list(Category category){
    //条件构造器
    LambdaQueryWrapper<Category> queryWrapper = new LambdaQueryWrapper<>();
    //添加条件
    queryWrapper.eq(category.getType() != null,Category::getType,category.getType());
    //添加排序条件
    queryWrapper.orderByAsc(Category::getSort).orderByDesc(Category::getUpdateTime);
    List<Category> list = categoryService.list(queryWrapper);
    return R.success(list);
}
```

DTO：全称为DataTransfer Object，即数据传输对象，一般用于展示层与服务层之间的数据传输
导入DishDTO，用于封装页面提交的数据

```java
//给Dish类扩展属性
@Data
public class DishDto extends Dish {

    private List<DishFlavor> flavors = new ArrayList<>();

    private String categoryName;

    private Integer copies;
}
```

新增菜品，同时插入菜品对应的口味数据，需要操作两张表：dish、dish_flavor。因此在DishService中添加方法

```java
public interface DishService extends IService<Dish> {
    //新增菜品，同时插入菜品对应的口味数据，需要操作两张表：dish、dish_flavor
    public void saveWithFlavor(DishDto dishDto);
}
```

在DishServiceImpl中添加方法

```java
@Service
public class DishServiceImpl extends ServiceImpl<DishMapper, Dish> implements DishService {
    @Autowired
    private DishFlavorService dishFlavorService;

    //新增菜品，同时保存对应的口味数据
    @Override
    @Transactional //事务
    public void saveWithFlavor(DishDto dishDto) {
        //保存菜品的基本信息到菜品表dish
        this.save(dishDto);

        //获取菜品id
        Long dishId = dishDto.getId();
        //菜品口味
        List<DishFlavor> flavors = dishDto.getFlavors();
        flavors = flavors.stream().map((item) -> {
            item.setDishId(dishId);
            return item;
        }).collect(Collectors.toList());

        //保存菜品口味数据到菜品口味表dish_flavor
        dishFlavorService.saveBatch(flavors);
    }
}
```

### 3、菜品信息分页查询

前端页面与服务端交互过程：
1、页面（backend/page/food/list.html）发型ajax请求，将分页查询参数（page、pageSize、name）提交到服务端，获取分页数据
2、页面发送请求，请求服务端进行图片下载，用于图片展示

开发菜品信息分页查询功能，其实就是在服务端编写代码去处理前端页面发送的两次请求即可、

```java
//菜品信息的分类
    @PutMapping("/page")
    public R<Page> page(int page,int pageSize,String name){
        //分页构造器
        Page<Dish> pageInfo = new Page<>(page,pageSize);
        Page<DishDto> dishDtoPage = new Page<>();
        //条件构造器
        LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper<>();
        //添加过滤条件
        queryWrapper.like(name != null,Dish::getName,name);
        //添加排序条件
        queryWrapper.orderByDesc(Dish::getUpdateTime);

        //执行分页查询
        dishService.page(pageInfo,queryWrapper);

        //对象拷贝，不拷贝records属性，单独处理该属性
        BeanUtils.copyProperties(pageInfo,dishDtoPage,"records");
        List<Dish> records = pageInfo.getRecords();
        List<DishDto> list = records.stream().map((item) -> {
            DishDto dishDto = new DishDto();
            BeanUtils.copyProperties(item, dishDto);
            //分类id
            Long categoryId = item.getCategoryId();
            //根据id查询分类对象
            Category category = categoryService.getById(categoryId);
            if(category != null){
                String categoryName = category.getName();
                dishDto.setCategoryName(categoryName);
            }
            return dishDto;
        }).collect(Collectors.toList());

        dishDtoPage.setRecords(list);

        return R.success(dishDtoPage);
    }
```

### 4、修改菜品

修改菜品时前端（add.html）和服务端的交互过程：
1、页面发送ajax请求，请求服务端获取分类数据，用于菜品分类下拉框中数据展示
2、页面发送ajax请求，请求服务端，根据id查询当前菜品的信息，用于菜品信息回显
3、页面发送请求，请求服务端进行图片下载，用于页图片回显
4、点击保存按钮，页面发送ajax请求，将修改后的菜品相关数据以JSON形式提交到服务端

开发修改菜品功能，其实就是在服务端编写代码去处理前端页面发送的这4次请求即可

在DishService接口与其对应实现类添加方法：

```java
public interface DishService extends IService<Dish> {
    //根据id查询菜品信息和对应口味信息
    public DishDto getByIdWithFlavor(Long id);
	//更新菜品信息，同时更新对应的口味信息
    public void updateWithFlavor(DishDto dishDto);
}
```

```java
//根据id查询菜品信息和对应口味信息
    @Override
    public DishDto getByIdWithFlavor(Long id) {
        //查询菜品基本信息，从dish表查询
        Dish dish = this.getById(id);

        //对象拷贝
        DishDto dishDto = new DishDto();
        BeanUtils.copyProperties(dish,dishDto);

        //查询当前菜品对应的口味信息，从dish_flavor表中查询
        LambdaQueryWrapper<DishFlavor> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(DishFlavor::getDishId,dish.getId());
        List<DishFlavor> flavors = dishFlavorService.list(queryWrapper);
        dishDto.setFlavors(flavors);
        return dishDto;
    }

    //更新菜品信息，同时更新对应的口味信息
    @Override
    @Transactional //事务
    public void updateWithFlavor(DishDto dishDto) {
        //更新dish表基本信息
        this.updateById(dishDto);

        //清理当前菜品对应口味数据--dish_flavor表的delete操作
        LambdaQueryWrapper<DishFlavor> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(DishFlavor::getDishId,dishDto.getId());
        dishFlavorService.remove(queryWrapper);

        //添加当前提交过来的口味数据--dish_flavor表的insert操作
        List<DishFlavor> flavors = dishDto.getFlavors();

        flavors = flavors.stream().map((item) -> {
            item.setDishId(dishDto.getId());
            return item;
        }).collect(Collectors.toList());

        dishFlavorService.saveBatch(flavors);
    }
```

### 5、启售、停售

```java
//启售，停售功能
@PostMapping("/status/{code}")
public R<String> status(@PathVariable int code,@RequestParam List<Long> ids){
    //停售
    if(code == 0){
        LambdaUpdateWrapper<Dish> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.in(ids != null,Dish::getId,ids).set(Dish::getStatus,0);
        dishService.update(updateWrapper);
    }
    //启售
    if(code == 1){
        LambdaUpdateWrapper<Dish> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.in(ids != null,Dish::getId,ids).set(Dish::getStatus,1);
        dishService.update(updateWrapper);
    }
    return R.success("修改成功");
}
```

## 8、套餐管理

### 1、新增套餐

新增套餐，其实就是将新增页面录入的套餐信息插入到setmeal表，还需要向setmeal_dish表插入套餐和菜品关联数据
所以在新增套餐时，设计两个表：
setmeal 套餐表
setmeal_dish 套餐菜品关系表

将用到的类和接口基本结构准备好：
实体类SetmealDish
DTO SetmealDto
Mapper接口 SetmealDishMapper
业务层接口 SetmealDishMapper
控制层 SetmealController

新增套餐时，前端页面和服务端的交互过程：
1、页面（backend/page/combo/add.html）发送ajax请求，请求服务端获取套餐分类数据并展示到下拉框中
2、页面发送ajax请求，请求服务端获取菜品分类数据并展示到添加菜品窗口中
3、页面发送ajax请求，请求服务端，根据菜品分类查询对应的菜品数据并展示到菜品窗口中
4、页面发送请求进行图片上传，请求服务端将图片保存到服务器
5、页面发送请求进行图片下载，将上传的图片进行回显
6、点击保存按钮，发送ajax请求，将套餐相关数据以json形式提交到服务端

①请求服务端获取套餐分类数据并展示到下拉框中已在上述代码中完成

②页面发送ajax请求，请求服务端获取菜品分类数据并展示到添加菜品窗口中
在DishController中添加：

```java
//根据条件查询对应的菜品数据
@GetMapping("/list")
public R<List<Dish>> list(Dish dish){
    //构造查询条件
    LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper<>();
    //添加查询条件
    queryWrapper.eq(dish.getCategoryId() != null,Dish::getCategoryId,dish.getCategoryId());
    //查询状态为1（起售状态）
    queryWrapper.eq(Dish::getStatus,1);
    //构造排序条件
    queryWrapper.orderByAsc(Dish::getSort).orderByDesc(Dish::getUpdateTime);
    List<Dish> list = dishService.list(queryWrapper);
    return R.success(list);
}
```

③点击保存按钮，发送ajax请求，将套餐相关数据以json形式提交到服务端
发送请求的参数**通过dto接收**

在setmealService添加方法：

```java
public interface SetmealService extends IService<Setmeal> {
    //新增套餐，同时需要保存套餐和菜品的关联关系
    public void saveWithDish(SetmealDto setmealDto);
}
```

方法实现：

```java
@Service
@Slf4j
public class SetMealSericeImpl extends ServiceImpl<SetmealMapper, Setmeal> implements SetmealService {

    @Autowired
    private SetmealDishService setmealDishService;

    //新增套餐，同时需要保存套餐和菜品的关联关系
    @Override
    @Transactional
    public void saveWithDish(SetmealDto setmealDto) {
        //保存套餐的基本信息，操作setmeal，执行insert操作
        this.save(setmealDto);

        List<SetmealDish> setmealDishes = setmealDto.getSetmealDishes();
        setmealDishes.stream().map((item) -> {
            item.setSetmealId(setmealDto.getId());
            return item;
        }).collect(Collectors.toList());

        //保存套餐和菜品的关联信息，操作setmeal_dish,执行insert操作
        setmealDishService.saveBatch(setmealDishes);
    }
}
```

SeController中添加：

```java
@Autowired
private SetmealService setmealService;

@Autowired
private SetmealDishService setmealDishService;

//新增套餐
@PostMapping
public R<String> save(@RequestBody SetmealDto setmealDto){
    log.info("test");
    setmealService.saveWithDish(setmealDto);
    return R.success("新增套餐成功");
}
```

### 2、套餐信息分页查询

前后端交互过程：
1、页面（bacend/page/combo/list.html）发送ajax请求，将分页查询参数（page，pageSize、name）提交到服务端，获取分页数据
2、页面发送请求，请求服务端进行图片下载，用于页面图片展示

在SetmealController中添加代码：

```java
@Autowired
private CategoryService categoryService;

//套餐分页查询
@GetMapping("/page")
public R<Page<SetmealDto>> page(int page,int pageSize,String name){
    //构造分页构造器
    Page<Setmeal> pageInfo = new Page<>(page,pageSize);
    Page<SetmealDto> dtoPage = new Page<>(); //页面展示需要其他属性，使用dto返回
    //查询构造器
    LambdaQueryWrapper<Setmeal> queryWrapper = new LambdaQueryWrapper<>();
    //查询条件
    queryWrapper.like(name != null,Setmeal::getName,name);
    //排序条件
    queryWrapper.orderByDesc(Setmeal::getUpdateTime);
    setmealService.page(pageInfo,queryWrapper);
    //对pageInfo进行对象拷贝
    BeanUtils.copyProperties(pageInfo,dtoPage,"records");
    List<Setmeal> records = pageInfo.getRecords();
    List<SetmealDto> list = records.stream().map((item)->{
        SetmealDto setmealDto = new SetmealDto();
        //对象拷贝
        BeanUtils.copyProperties(item,setmealDto);
        //分类id
        Long categoryId = item.getCategoryId();
        //根据分类id查询分类对象
        Category category= categoryService.getById(categoryId);
        if(category != null){
            //分类名称
            String categoryName = category.getName();
            setmealDto.setCategoryName(categoryName);
        }
        return setmealDto;
    }).collect(Collectors.toList());

    dtoPage.setRecords(list);
    return R.success(dtoPage);
}
```

### 3、删除套餐

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230311105827.png)

注意：对于状态为售卖中的套餐不能删除，需要先停售，然后才能删除

梳理交互过程：
1、删除单个套餐时，页面发送ajax请求，根据id删除对应套餐
2、删除多个套餐时，页面发送ajax请求，根据提交的多个套餐id删除对应套餐
可以在服务端通过一个方法处理这两种请求

删除套餐功能编写：

SetmealService：

```java
public void removeWithDish(List<Long> ids);
```

SetmealServiceImpl：

```java
@Transactional
@Override
public void removeWithDish(List<Long> ids) {
    //查询套餐状态，确定是否可用删除
    LambdaQueryWrapper<Setmeal> queryWrapper = new LambdaQueryWrapper<>();
    //SQL:select * from setmeal where id in (1,2,3...) and status = 1;
    queryWrapper.in(Setmeal::getId,ids);
    queryWrapper.eq(Setmeal::getStatus,1);
    int count = this.count(queryWrapper);
    //如果不能删除，抛出一个业务异常信息
    if(count > 0){
        throw new CustomException("套餐正在售卖中，不能删除");
    }
    //如果可以删除，先删除套餐表中的数据---setmeal
    this.removeByIds(ids);
    //删除关系表中的数据---setmeal_dish
    //SQL:delete from setmeal_dish where setmeal_id in (1,2,3... ids);
    LambdaQueryWrapper<SetmealDish> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.in(SetmealDish::getSetmealId,ids);
    setmealDishService.remove(lambdaQueryWrapper);
}
```

SetmealController：

```java
//删除套餐
@DeleteMapping
public R<String> delete(@RequestParam List<Long> ids){
	setmealService.removeWithDish(ids);
	return R.success("套餐数据删除成功");
}
```

启售，停售功能编写：

```java
//停售功能（修改setmeal的status为0）
@PostMapping("/status/0")
public R<String> statusTo0(@RequestParam List<Long> ids){
    //条件修改器
    LambdaUpdateWrapper<Setmeal> updateWrapper = new LambdaUpdateWrapper<>();
    //SQL:update setmeal set status = 0 where id in (1,2,3);
    updateWrapper.in(Setmeal::getId,ids).set(Setmeal::getStatus,0);
    setmealService.update(updateWrapper);
    return R.success("status更新成功");
}

//启售功能（修改setmeal的status为1）
@PostMapping("/status/1")
public R<String> statusTo1(@RequestParam List<Long> ids){
    //条件修改器
    LambdaUpdateWrapper<Setmeal> updateWrapper = new LambdaUpdateWrapper<>();
    //SQL:update setmeal set status = 1 where id in (1,2,3);
    updateWrapper.in(Setmeal::getId,ids).set(Setmeal::getStatus,1);
    setmealService.update(updateWrapper);
    return R.success("status更新成功");
}
```

## 9、订单管理

OrdersController类

```java
//订单明细分页
@GetMapping("/page")
public R<Page> page( int page,
                    int pageSize,
                    @RequestParam(required = false) String number,
                    @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime beginTime,
                    @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime){
    Page pageInfo = new Page(page,pageSize);
    //条件构造器
    LambdaQueryWrapper<Orders> queryWrapper = new LambdaQueryWrapper<>();
    //查询条件
    if(number != null){
        queryWrapper.like(Orders::getId,number);
    }
    if(beginTime != null){
        queryWrapper.ge(Orders::getOrderTime,beginTime);
    }
    if(endTime!=null){
        queryWrapper.le(Orders::getOrderTime,endTime);
    }
    ordersService.page(pageInfo,queryWrapper);
    return R.success(pageInfo);
}
```



## 10、验证码登录

### 1、阿里云短信服务

进入阿里云控制台，选择短信服务

设置短信签名和短信模板：
短信签名是短信发送者的署名，表示发送方的身份
短信模板包含短信发送内容，场景，变量信息

使用阿里云短信服务发送短信，可以参照官方提供的文档即可
具体开发步骤：
①导入maven坐标
②调用API

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230311164159.png)

![image-20230311164220854](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230311164220854.png)

### 2、手机验证码登录

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230311164513.png)

通过手机验证码登录时，涉及的表为user表，结构如下：

![image-20230311165126504](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230311165126504.png)

登录时，页面与服务端的交互过程：
1、在登录页面（front/page/login.html）输入手机号，点击获取验证码按钮，页面发送ajax请求，在服务端调用短信服务API给指定手机号发送验证码短信
2、在登录页输入验证码，点击登录按钮，发送ajax请求，在服务端处理登录请求

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230311165456.png)

修改LoginCheckFilter，添加不需要处理的请求路径
在LoginCheckFilter过滤器中扩展逻辑，判断移动端用户登录状态

```java
//定义不需要处理的请求路径
String[] urls = new String[]{
    "/employee/login",
    "/employee/logout",
    "/backend/**",
    "/front/**",
    "/common/**",
    "/user/sendMsg", //front的短信验证情趣
    "/user/login"   //用户登录
};
```

在UserController中编写业务逻辑：

```java
@Autowired
    private UserService userService;

    //发送手机短信验证码
    @PostMapping("/sendMsg")
    public R<String> sendMeg(@RequestBody User user, HttpSession session){
        //获取手机号
        String phone = user.getPhone();
        if(StringUtils.isNotBlank(phone)){
            //生成随机四位验证码
            String code = ValidateCodeUtils.generateValidateCode(4).toString();
            log.info("验证码={}",code);
            //调用阿里云提供的短信服务API完成发送短信
            //SMSUtils.sendMessage("瑞吉外卖","",phone,code);
            //需要生成的验证码保存到Session
            session.setAttribute(phone,code);
            return R.success("手机验证码短信发送成功");
        }
        return R.error("短信发送失败");
    }

    //移动端用户登录
    @PostMapping("/login")
    public R<User> login(@RequestBody Map map,HttpSession session){
        //获取手机号
        String phone = map.get("phone").toString();
        //获取验证码
        String code = map.get("code").toString();
        //从Session中获取保存的验证码
        Object codeInSession = session.getAttribute(phone);
        //进行验证码的比对（页面提交的验证码和Session中保存的验证码比对）
        if(codeInSession != null && codeInSession.equals(code)){
            //如果能够比对成功，说明登录成功
            LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(User::getPhone,phone);
            User user = userService.getOne(queryWrapper);
            if(user == null){
                //判断当前手机号对应的用户是否为新用户，如果是新用户就自动完成注册
                user = new User();
                user.setPhone(phone);
                user.setStatus(1);
                userService.save(user);
            }
            //登录成功，将id放入session中
            session.setAttribute("user",user.getId());
            return R.success(user);
        }
        return R.error("登录失败");
```



## 11、菜品展示、购物车、下单

### 1、导入用户地址簿相关功能代码

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230312100057.png)

用户地址信息会存储在address_book表中，即地址簿表中

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230312100250.png)

编写controller业务代码：（导入AddressBookController，手动添加更改与删除地址）

```java
/**
 * 删除地址
 */
@DeleteMapping
public R<String> delete(Long ids){
    LambdaQueryWrapper<AddressBook> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(ids != null,AddressBook::getId,ids);
    addressBookService.remove(queryWrapper);
    return R.success("删除成功");
}

/**
 * 更新收货地址
 */
@PutMapping
public R<AddressBook> update(@RequestBody AddressBook addressBook){
    addressBook.setUserId(BaseContext.getCurrentId());
    log.info("addressBook:{}", addressBook);
    addressBookService.updateById(addressBook);
    return R.success(addressBook);
}
```

### 2、菜品展示

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230312101915.png)

梳理交互过程：
1、页面（front/index.html）发送ajax请求，获取分类数据（菜品分类和套餐分类）
2、页面发送ajax请求，获取第一个分类下的菜品或者套餐

前端展示的页面中不仅要有菜品信息，还要有口味信息，套餐信息
因此，更改DIshController中的list查询方法，返回DIshDto，增加SetmealController的方法，返回套餐

DIshController：

```java
@GetMapping("/list")
    public R<List<DishDto>> list(Dish dish){
        //构造查询条件
        LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper<>();
        //添加查询条件
        queryWrapper.eq(dish.getCategoryId() != null,Dish::getCategoryId,dish.getCategoryId());
        //查询状态为1（起售状态）
        queryWrapper.eq(Dish::getStatus,1);
        //构造排序条件
        queryWrapper.orderByAsc(Dish::getSort).orderByDesc(Dish::getUpdateTime);
        List<Dish> list = dishService.list(queryWrapper);
        List<DishDto> dishDtoList = list.stream().map((item) -> {
            DishDto dishDto = new DishDto();
            BeanUtils.copyProperties(item, dishDto);
            //分类id
            Long categoryId = item.getCategoryId();
            //根据id查询分类对象
            Category category = categoryService.getById(categoryId);
            if(category != null){
                String categoryName = category.getName();
                dishDto.setCategoryName(categoryName);
            }
            //当前菜品的Id
            Long dishId = item.getId();
            LambdaQueryWrapper<DishFlavor> lambdaQueryWrapper = new LambdaQueryWrapper<>();
            lambdaQueryWrapper.eq(DishFlavor::getDishId,dishId);
            //SQL:select * from dish_flavor where dish_id = ?
            List<DishFlavor> dishFlavorList = dishFlavorService.list(lambdaQueryWrapper);
            dishDto.setFlavors(dishFlavorList);
            return dishDto;
        }).collect(Collectors.toList());
        return R.success(dishDtoList);
    }
```

SetmealController：

```java
//根据条件查询套餐数据
@GetMapping("list")
public R<List<Setmeal>> list(Setmeal setmeal){
    LambdaQueryWrapper<Setmeal> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(setmeal.getCategoryId() != null,Setmeal::getCategoryId,setmeal.getCategoryId());
    queryWrapper.eq(setmeal.getStatus() != null,Setmeal::getStatus,1);
    queryWrapper.orderByDesc(Setmeal::getUpdateTime);
    List<Setmeal> list = setmealService.list(queryWrapper);
    return R.success(list);
}

//点击套餐显示详情
@GetMapping("/dish/{id}")
public R<List<SetmealDish>> dish(@PathVariable Long id){
    LambdaQueryWrapper<SetmealDish> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(SetmealDish::getSetmealId,id);
    List<SetmealDish> list = setmealDishService.list(queryWrapper);
    return R.success(list);
}
```

### 3、购物车

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230312111156.png)

购物车对应的数据表为shopping_cart表

购物车操作时前端页面和服务端的交互过程：
1、点击加入购物车或加好按钮，发送ajax请求，请求服务端，将菜品或套餐添加到购物车
2、点击购物车图标，法功ajax请求，请求服务端查询购物车中的菜品和套餐
3、点击清空购物车，页面发送ajax请求，请求服务端来执行清空购物车操作

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230312111834.png)

添加、减少购物车：

```java
//添加购物车
@PostMapping("/add")
public R<ShoppingCart> add(ShoppingCart shoppingCart){
    //设置用户id，指定当前是哪个用户的购物车数据
    Long currentId = BaseContext.getCurrentId();
    shoppingCart.setUserId(currentId);

    LambdaQueryWrapper<ShoppingCart> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(ShoppingCart::getUserId,currentId);

    //判断当前菜品是菜品还是套餐
    Long dishId = shoppingCart.getDishId();
    if(dishId != null){
        //添加到购物车的是菜品
        queryWrapper.eq(ShoppingCart::getDishId,dishId);
    }else {
        //添加到购物车的是套餐
        queryWrapper.eq(ShoppingCart::getSetmealId,dishId);
    }
    //将菜品/套餐添加到购物车中
    //SQL:select * from shopping_cart where usr_id = ? and dish_id/setmeal_id = ?
    ShoppingCart cartServiceOne = shoppingCartService.getOne(queryWrapper);
    //判断购物车是否有同款菜
    if(cartServiceOne != null){
        //如果已经存在，就在原来数量基础上+1
        cartServiceOne.setNumber(cartServiceOne.getNumber()+1);
        shoppingCartService.updateById(cartServiceOne);
    }else {
        //如果不存在，则添加到购物车，数量默认就是1(需要手动设置)
        shoppingCart.setNumber(1);
        shoppingCartService.save(shoppingCart);
        cartServiceOne = shoppingCart;
    }
    return R.success(cartServiceOne);
}

//减少购物车
@PostMapping("/sub")
public R<ShoppingCart> sub(@RequestBody ShoppingCart shoppingCart){
    //判断是菜品还是套餐
    Long dishId = shoppingCart.getDishId();
    LambdaQueryWrapper<ShoppingCart> queryWrapper = new LambdaQueryWrapper<>();
    if(dishId != null){
        queryWrapper.eq(ShoppingCart::getDishId,dishId);
    }else {
        queryWrapper.eq(ShoppingCart::getSetmealId,shoppingCart.getSetmealId());
    }
    ShoppingCart cartServiceOne = shoppingCartService.getOne(queryWrapper);
    int number = cartServiceOne.getNumber();
    //如果number为1，删除购物车
    if(number == 1){
        shoppingCartService.remove(queryWrapper);
    }else {
        //如果>1，number-1
        cartServiceOne.setNumber(cartServiceOne.getNumber() - 1);
        shoppingCartService.updateById(cartServiceOne);
    }
    shoppingCart = cartServiceOne;
    return R.success(shoppingCart);
}
```

### 4、查看、清空购物车

```java
//查看购物车
@GetMapping("/list")
public R<List<ShoppingCart>> list(){
    LambdaQueryWrapper<ShoppingCart> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(ShoppingCart::getUserId,BaseContext.getCurrentId());
    queryWrapper.orderByAsc(ShoppingCart::getCreateTime);
    List<ShoppingCart> list = shoppingCartService.list(queryWrapper);
    return R.success(list);
}

//清空购物车
@DeleteMapping("/clean")
public R<String> clean(){
    //SQL:delete form shopping_cart where user_id = ?
    LambdaQueryWrapper<ShoppingCart> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(ShoppingCart::getUserId,BaseContext.getCurrentId());
    shoppingCartService.remove(queryWrapper);
    return R.success("清空购物车成功");
}
```

### 5、用户下单

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230312131226.png)

用户下单业务对应的数据表为orders表和order_detail表

前后端交互过程：
1、在购物车中点击去结算按钮，页面跳转到订单确认页面
2、在订单确认页面，发送ajax请求，请求服务端获取当前登录用户的默认地址
3、在订单确认页面，发送ajax请求，请求服务端获取当前用户的购物车数据
4、在订单确认页面点击去支付按钮，发送ajax请求，请求服务端完成下单操作

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230312133031.png)

OrdersService：

```java
//用户下单
public void submit(Orders orders);
```

OrderServceImpl

```java
//用户下单
@Override
@Transactional
public void submit(Orders orders) {
    //获得当前用户id
    Long userId = BaseContext.getCurrentId();
    //查询当前用户的购物车数据
    LambdaQueryWrapper<ShoppingCart> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(ShoppingCart::getUserId,userId);
    List<ShoppingCart> shoppingCarts = shoppingCartService.list(queryWrapper);
    if(shoppingCarts == null || shoppingCarts.size() == 0){
        throw new CustomException("购物车为空，不能下单");
    }
    //查询用户数据
    User user = userService.getById(userId);
    //查询地址数据
    Long addressBookId = orders.getAddressBookId();
    AddressBook addressBook = addressBookService.getById(addressBookId);
    if(addressBook == null){
        throw new CustomException("地址信息有误，不能下单");
    }
    //向订单表插入数据，一条数据
    long orderId = IdWorker.getId();//订单号，使用MybatisPlus提供的类

    //计算总金额，构造订单明细
    AtomicInteger amount = new AtomicInteger(0);
    List<OrderDetail> orderDetails = shoppingCarts.stream().map((item) -> {
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrderId(orderId);
        orderDetail.setNumber(item.getNumber());
        orderDetail.setDishFlavor(item.getDishFlavor());
        orderDetail.setDishId(item.getDishId());
        orderDetail.setSetmealId(item.getSetmealId());
        orderDetail.setName(item.getName());
        orderDetail.setImage(item.getImage());
        orderDetail.setAmount(item.getAmount());
        amount.addAndGet(item.getAmount().multiply(new BigDecimal(item.getNumber())).intValue());
        return orderDetail;
    }).collect(Collectors.toList());

    orders.setId(orderId);
    orders.setOrderTime(LocalDateTime.now());
    orders.setCheckoutTime(LocalDateTime.now());
    orders.setStatus(2);
    orders.setAmount(new BigDecimal(amount.get()));//总金额
    orders.setUserId(userId);
    orders.setNumber(String.valueOf(orderId));
    orders.setUserName(user.getName());
    orders.setConsignee(addressBook.getConsignee());
    orders.setPhone(addressBook.getPhone());
    orders.setAddress((addressBook.getProvinceName() == null ? "" : addressBook.getProvinceName())
                      + (addressBook.getCityName() == null ? "" : addressBook.getCityName())
                      + (addressBook.getDistrictName() == null ? "" : addressBook.getDistrictName())
                      + (addressBook.getDetail() == null ? "" : addressBook.getDetail()));

    this.save(orders);
    //向订单明细表插入数据，多条数据
    orderDetailService.saveBatch(orderDetails);
    //下单完成后，清空购物车数据
    shoppingCartService.remove(queryWrapper);
}
```

OrderController

```java
@Slf4j
@RestController
@RequestMapping("/order")
public class OrdersController {
    @Autowired
    public OrdersService ordersService;
    
    //用户下单
    @PostMapping("/submit")
    public R<String> submit(@RequestBody Orders orders){
        ordersService.submit(orders);
        return R.success("下单成功");
    }
}
```

### 6、用户退出

```java
//用户退出
@GetMapping("/userPage")
public R<Page> userPage(int page,int pageSize){
    Page pageInfo = new Page(page,pageSize);
    //构造条件构造器
    LambdaQueryWrapper<Orders> queryWrapper = new LambdaQueryWrapper<>();
    //添加条件
    queryWrapper.eq(Orders::getUserId, BaseContext.getCurrentId());
    queryWrapper.orderByDesc(Orders::getOrderTime);
    //执行查询
    ordersService.page(pageInfo,queryWrapper);//无需返回，在内部已封装给pageInfo
    return R.success(pageInfo);
}
```

