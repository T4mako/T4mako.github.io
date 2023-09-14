---
date: 2023-09-12
category: java
tag: 
  - SpringBoot
title: SpringBoot 常用注解总结
---

参考：https://javaguide.cn/system-design/framework/spring/spring-common-annotations.html

## 一、 @SpringBootApplication


这个注解是 Spring Boot 项目的基石，创建 SpringBoot 项目之后会默认在主类加上。

我们可以把 `@SpringBootApplication` 看作是 `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`

```java
...
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
...
)
...
public @interface SpringBootApplication {...}
```

根据 SpringBoot 官网，这三个注解的作用分别是：
- `@EnableAutoConfiguration`：启用 SpringBoot 的自动配置机制
- `@ComponentScan`：扫描被 @Component 注解的 bean，注解默认会扫描该类所在的**包下所有的类**。
- `@Configuration`：允许在 Spring 上下文中注册额外的 bean 或导入其他配置类

## 二、Spring Bean 相关

### 2.1 @Autowired

一般使用` @Autowired` 注解让 Spring 容器帮我们自动装配 bean。  

### 2.2 @Component 相关
要想把类标识成可用于 @Autowired 注解自动装配的 bean 的类，可以采用以下注解：
- `@Component`：通用的注解
- `@Repository`：持久层即 Dao 层，主要用于数据库相关操作
- `@Service`：服务层，主要涉及一些复杂的逻辑，需要用到 Dao 层
- `@Controller`：控制层，主要用于接受用户请求并调用 Service 层返回数据给前端页面

### 2.3 @RestController
`@RestController` = `@Controller` + `@ResponseBody`  
表示这是个控制器 bean，并且是将函数的返回值直接填入 HTTP 响应体中，是 REST 风格的控制器。

### 2.4 @Scope

声明 Spring Bean 的作用域，使用方法:
```java
@Bean
@Scope("singleton")
public Person personSingleton() {
    return new Person();
}

```

四种常见的 Spring Bean 的作用域：
- singleton : 唯一 bean 实例，Spring 中的 bean 默认都是单例的。
- prototype : 每次请求都会创建一个新的 bean 实例。
- request : 每一次 HTTP 请求都会产生一个新的 bean，该 bean 仅在当前 HTTP request 内有效。
- session : 每一个 HTTP Session 会产生一个新的 bean，该 bean 仅在当前 HTTP session 内有效。

### 2.5 @Configuration
一般用来声明 **配置类** ，可以使用 @Component 注解替代，不过使用 @Configuration 注解声明配置类更加语义化。

```java
@Configuration
public class AppConfig {
    @Bean
    public TransferService transferService() {
        return new TransferServiceImpl();
    }

}
```

## 三、 处理常见的 HTTP 请求类型

5 种常见的请求类型:
- GET：请求从服务器获取特定资源。
- POST：在服务器上创建一个新的资源。
- PUT：更新服务器上的资源（客户端提供更新后的整个资源）。
- DELETE：从服务器删除特定的资源。
- PATCH：更新服务器上的资源（客户端提供更改的属性，可以看做作是部分更新）。

:::info
`@GetMapping("users")` 等价于 `@RequestMapping(value="/users",method=RequestMethod.GET)`  

`@PostMapping("users")` 等价于 `@RequestMapping(value="/users",method=RequestMethod.POST)`  

`@PutMapping("/users/{userId}")` 等价于 `@RequestMapping(value="/users/{userId}",method=RequestMethod.PUT)`  

`@DeleteMapping("/users/{userId}")` 等价于 `@RequestMapping(value="/users/{userId}",method=RequestMethod.DELETE)`  

一般实际项目中，我们都是 PUT 不够用了之后才用 PATCH 请求去更新数据。  
`@PatchMapping("/profile")`
:::

## 四、 前后端传值

### 4.1 @PathVariable 和 @RequestParam
`@PathVariable` 用于获取路径参数

`@RequestParam` 用于获取查询参数。

```java
@GetMapping("/classes/{classId}/teachers")
public List<Teacher> getClassRelatedTeachers(
         @PathVariable("classId") Long classId,
         @RequestParam(value = "type", required = false) String type ) {
...
}

```

若请求的 url 是：/classes/123456/teachers?type=web  
则获取到的数据就是：classId=123456,type=web。 

### 4.2 @RequestBody

用于读取 Request 请求（可能是 POST,PUT,DELETE,GET 请求）的 body 部分并且 Content-Type 为 application/json 格式的数据  
接收到数据之后会自动将数据绑定到 Java 对象上去。系统会使用 `HttpMessageConverter` 或者自定义的 `HttpMessageConverter` 将请求的 body 中的 json 字符串转换为 java 对象。

:::info
一个请求方法只可以有一个 @RequestBody，但是可以有多个 @RequestParam 和 @PathVariable。   
如果你的方法必须要用两个 @RequestBody 来接受数据的话，大概率是你的数据库设计或者系统设计出问题了！
:::

## 五、 读取配置信息

很多时候我们需要将一些常用的配置信息比如阿里云 oss、发送短信、微信认证的相关配置信息等等放到配置文件中。

Spring 为我们提供从配置文件中读取这些配置信息的方式如下。


假设数据源 `application.yml` 内容如下：
```yml
test: AAA

my-profile:
  name: T4mako
  email: 123@163.com

library:
  location: CN
  books:
    - name: BOOK
      description: disc1
    - name: BOOK2
      description: disc2
    - name: BOOK3
      description: disc3
```

### 5.1 @Value（常用）
使用 `@Value("${property}")` 读取比较简单的配置信息：
```java
@Value("${test}")
String str;
```

### 5.2 @ConfigurationProperties（常用）
通过 `@ConfigurationProperties` 读取配置信息并与 bean 绑定。
```java
@Component
@ConfigurationProperties(prefix = "library")
class LibraryProperties {
    @NotEmpty
    private String location;
    private List<Book> books;

    @Setter
    @Getter
    @ToString
    static class Book {
        String name;
        String description;
    }
    ......
}
```
可以像使用普通的 Spring bean 一样，将其注入到类中使用

### 5.3 @PropertySource（不常用）
`@PropertySource` 读取指定 properties 文件

```java
@Component
@PropertySource("classpath:website.properties")
class WebSite {
    @Value("${url}")
    private String url;
    ......
}
```


## 六、 参数校验
JSR（Java Specification Requests） 是一套 JavaBean 参数校验的标准，它定义了很多常用的校验注解，我们可以直接将这些注解加在 JavaBean 的属性上面，这样就可以在需要校验的时候进行校验了

校验的时候我们实际用的是 Hibernate Validator 框架。  
SpringBoot 项目的 spring-boot-starter-web 依赖中已经有 hibernate-validator 包，不需要引用相关依赖。

:::info
需要注意的是：  
所有的注解，推荐使用 JSR 注解，即 `javax.validation.constraints`，而不是 org.hibernate.validator.constraints
:::

### 6.1 一些常用的字段验证的注解

| 注解 | 含义 |
| ---- | ---- |
| @NotEmpty     | 被注释的字符串的不能为 null 也不能为空     |
| @NotBlank | 被注释的字符串非 null，并且必须包含一个非空白字符 |
| @Null | 被注释的元素必须为 null |
| @NotNull | 被注释的元素必须不为 null |
| @AssertTrue | 被注释的元素必须为 true |
| @AssertFalse | 被注释的元素必须为 false |
| @Pattern(regex=,flag=) | 被注释的元素必须符合指定的正则表达式 |
| @Email | 被注释的元素必须是 Email 格式 |
| @Min(value) | 被注释的元素必须是 >= value 的数字 |
| @Max(value) | 被注释的元素必须是 <= value 的数字 |
| @DecimalMin(value) | 被注释的元素必须是 >= value 的数字 |
| @DecimalMax(value) | 被注释的元素必须是 <= value 的数字 |
| @Size(max=, min=) | 被注释的元素的大小必须在指定的范围内 |
| @Digits(integer, fraction) | 被注释的元素必须是一个数字，其值必须在可接受的范围内 |
| @Past | 被注释的元素必须是一个过去的日期 |
| @Future | 被注释的元素必须是一个将来的日期 |


### 6.2 验证请求体（RequestBody）

```java
// 实体类
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Person {

    @NotNull(message = "classId 不能为空")
    private String classId;

    @Size(max = 33)
    @NotNull(message = "name 不能为空")
    private String name;

    @Pattern(regexp = "((^Man$|^Woman$|^UGM$))", message = "sex 值不在可选范围")
    @NotNull(message = "sex 不能为空")
    private String sex;

    @Email(message = "email 格式不正确")
    @NotNull(message = "email 不能为空")
    private String email;

}
```
在需要验证的参数上加上了 `@Valid` 注解，如果验证失败，它将抛出 `MethodArgumentNotValidException`

```java
@RestController
@RequestMapping("/api")
public class PersonController {

    @PostMapping("/person")
    public ResponseEntity<Person> getPerson(@RequestBody @Valid Person person) {
        return ResponseEntity.ok().body(person);
    }
}
```

### 6.3 验证请求参数（Path Variables 和 Request Parameters）
在类上加上 `@Validated` 注解，这个参数可以告诉 Spring 去校验方法参数

```java
@RestController
@RequestMapping("/api")
@Validated
public class PersonController {
    @GetMapping("/person/{id}")
    public ResponseEntity<Integer> getPersonByID(@Valid @PathVariable("id") @Max(value = 5,message = "超过 id 的范围了") Integer id) {
        return ResponseEntity.ok().body(id);
    }
}

```

## 七、 全局处理 Controller 层异常

Spring 项目必备全局处理 Controller 层异常 

- `@ControllerAdvice`：注解定义全局异常处理类
- `@ExceptionHandler`：注解声明异常处理方法

以参数校验这块举例子。如果方法参数不对的话就会抛出 `MethodArgumentNotValidException`，我们来处理这个异常。

```java
// 全局异常处理类
@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {
    /**
     * 请求参数异常处理
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request) {
       ......
    }
}

```

[SpringBoot 处理异常的几种常见姿势](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247485568&idx=2&sn=c5ba880fd0c5d82e39531fa42cb036ac&chksm=cea2474bf9d5ce5dcbc6a5f6580198fdce4bc92ef577579183a729cb5d1430e4994720d59b34&token=2133161636&lang=zh_CN#rd)  
[使用枚举简单封装一个优雅的 Spring Boot 全局异常处理](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247486379&idx=2&sn=48c29ae65b3ed874749f0803f0e4d90e&chksm=cea24460f9d5cd769ed53ad7e17c97a7963a89f5350e370be633db0ae8d783c3a3dbd58c70f8&token=1054498516&lang=zh_CN#rd)



## 八、JPA 相关

(Spring Data JPA)[https://spring.io/projects/spring-data-jpa#overview]

### 8.1 创建表

- `@Entity` 声明一个类对应一个数据库实体  
- `@Table` 设置表名

```java
@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    ...
}
```

### 8.2 创建主键
- `@Id`：声明一个字段为主键。声明后还需要定义主键的生成策略。  

#### @GeneratedValue 生成
`@GeneratedValue` 直接使用 JPA 内置提供的四种主键生成策略来指定主键生成策略。
`@GeneratedValue` 注解默认使用的策略是 `GenerationType.AUTO`  

一般使用 MySQL 数据库的话，使用 `GenerationType.IDENTITY` 策略比较普遍一点（分布式系统的话需要另外考虑使用分布式 ID）。
```java
public enum GenerationType {

    /**
     * 使用一个特定的数据库表格来保存主键
     * 持久化引擎通过关系数据库的一张特定的表格来生成主键,
     */
    TABLE,

    /**
     *在某些数据库中,不支持主键自增长,比如Oracle、PostgreSQL其提供了一种叫做"序列(sequence)"的机制生成主键
     */
    SEQUENCE,

    /**
     * 主键自增长
     */
    IDENTITY,

    /**
     *把主键生成策略交给持久化引擎(persistence engine),
     *持久化引擎会根据数据库在以上三种主键生成 策略中选择其中一种
     */
    AUTO
}
```
#### @GenericGenerator
通过 `@GenericGenerator` 声明一个主键策略，然后 `@GeneratedValue` 使用这个策略

```java
@Id
@GeneratedValue(generator = "IdentityIdGenerator")
@GenericGenerator(name = "IdentityIdGenerator", strategy = "identity")
private Long id;

// 等价于
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```


jpa 提供的主键生成策略有如下几种：
```java

public class DefaultIdentifierGeneratorFactory
		implements MutableIdentifierGeneratorFactory, Serializable, ServiceRegistryAwareService {
	@SuppressWarnings("deprecation")
	public DefaultIdentifierGeneratorFactory() {
		register( "uuid2", UUIDGenerator.class );
		register( "guid", GUIDGenerator.class );			// can be done with UUIDGenerator + strategy
		register( "uuid", UUIDHexGenerator.class );			// "deprecated" for new use
		register( "uuid.hex", UUIDHexGenerator.class ); 	// uuid.hex is deprecated
		register( "assigned", Assigned.class );
		register( "identity", IdentityGenerator.class );
		register( "select", SelectGenerator.class );
		register( "sequence", SequenceStyleGenerator.class );
		register( "seqhilo", SequenceHiLoGenerator.class );
		register( "increment", IncrementGenerator.class );
		register( "foreign", ForeignGenerator.class );
		register( "sequence-identity", SequenceIdentityGenerator.class );
		register( "enhanced-sequence", SequenceStyleGenerator.class );
		register( "enhanced-table", TableGenerator.class );
	}

	public void register(String strategy, Class generatorClass) {
		LOG.debugf( "Registering IdentifierGenerator strategy [%s] -> [%s]", strategy, generatorClass.getName() );
		final Class previous = generatorStrategyToClassNameMap.put( strategy, generatorClass );
		if ( previous != null ) {
			LOG.debugf( "    - overriding [%s]", previous.getName() );
		}
	}
}

```

### 8.3 设置字段类型

`@Column` 声明字段  

```java
// 设置属性 userName 对应的数据库字段名为 user_name，长度为 32，非空
@Column(name = "user_name", nullable = false, length=32)
private String userName;

// 设置字段类型并且加默认值，常用
@Column(columnDefinition = "tinyint(1) default 1")
private Boolean enabled;

```

### 8.4 指定不持久化特定字段

`@Transient`：声明不需要与数据库映射的字段，在保存的时候不需要保存进数据库

```java
@Entity(name="USER")
public class User {
    // 如果我们想让 secrect 这个字段不被持久化，可以使用 @Transient 关键字声明。
    @Transient
    private String secrect;

}
```
还可以采用下面几种方法：
```java
static String secrect; // not persistent because of static
final String secrect = "Satish"; // not persistent because of final
transient String secrect; // not persistent because of transient
```


### 8.5 声明大字段

`@Lob`：声明某个字段为大字段。
```java
@Lob
private String content;

// 更详细的声明：
@Lob
//指定 Lob 类型数据的获取策略， FetchType.EAGER 表示非延迟加载，而 FetchType.LAZY 表示延迟加载 ；
@Basic(fetch = FetchType.EAGER)
//columnDefinition 属性指定数据表对应的 Lob 字段类型
@Column(name = "content2", columnDefinition = "LONGTEXT NOT NULL")
private String content2;

```

### 8.6 创建枚举类型的字段

可以使用枚举类型的字段，不过枚举字段要用 `@Enumerated` 注解修饰。

```java
public enum Gender {
    MALE("男性"),
    FEMALE("女性");

    private String value;
    Gender(String str){
        value=str;
    }
}
```

```java
@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    // 数据库里面对应存储的是 MALE/FEMALE
    @Enumerated(EnumType.STRING)
    private Gender gender;
    ......
}
```

### 8.7 增加审计功能

只要继承了 `@AbstractAuditBase` 的类都会默认加上下面四个字段。
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
@EntityListeners(value = AuditingEntityListener.class)
public abstract class AbstractAuditBase {

    @CreatedDate
    @Column(updatable = false)
    @JsonIgnore
    private Instant createdAt;

    @LastModifiedDate
    @JsonIgnore
    private Instant updatedAt;

    @CreatedBy
    @Column(updatable = false)
    @JsonIgnore
    private String createdBy;

    @LastModifiedBy
    @JsonIgnore
    private String updatedBy;
}
```
我们对应的审计功能对应地配置类可能是下面这样的（Spring Security 项目）:
```java
@Configuration
@EnableJpaAuditing
public class AuditSecurityConfiguration {
    @Bean
    AuditorAware<String> auditorAware() {
        return () -> Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getName);
    }
}

```
- `@CreatedDate`: 表示该字段为创建时间字段，在这个实体被 insert 的时候，会设置值
- `@CreatedBy` :表示该字段为创建人，在这个实体被 insert 的时候，会设置值
  `@LastModifiedDate`、`@LastModifiedBy` 同理。
  
`@EnableJpaAuditing`：开启 JPA 审计功能。

### 8.8 删除/修改数据
`@Modifying` 注解提示 JPA 该操作是修改操作，注意还要配合 · 注解使用。

```java
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Modifying
    @Transactional(rollbackFor = Exception.class)
    void deleteByUserName(String userName);
}
```

### 8.9 关联关系
- `@OneToOne` 声明一对一关系
- `@OneToMany` 声明一对多关系
- `@ManyToOne` 声明多对一关系
- `@ManyToMany` 声明多对多关系

## 九、事务 @Transactional

在要开启事务的方法上使用 `@Transactional` 注解即可

```java
@Transactional(rollbackFor = Exception.class)
public void save() {
}
```
Exception 分为 运行时异常 和 非运行时异常。  
在 `@Transactional` 注解中如果不配置 `rollbackFor` 属性，那么事务只会在遇到 RuntimeException 的时候才会回滚  
加上 `rollbackFor=Exception.class` 可以让事务在遇到非运行时异常时也回滚。

@Transactional 注解一般可以作用在 **类** 或者 **方法** 上。  
- 作用于类：所有该类的 `public` 方法都配置相同的事务属性信息。
- 作用于方法：当类配置了 @Transactional，方法也配置了 @Transactional，方法的事务会覆盖类的事务配置信息。

## 10、 json 数据处理

### 10.1 过滤 json 数据
`@JsonIgnoreProperties` 作用在类上用于过滤掉特定字段不返回或者不解析。
```java
//生成json时将userRoles属性过滤
@JsonIgnoreProperties({"userRoles"})
public class User {
    private String userName;
    private String fullName;
    private String password;
    private List<UserRole> userRoles = new ArrayList<>();
}
```
`@JsonIgnore` 一般用于属性上，作用和 `@JsonIgnoreProperties` 一样。

```java

public class User {
    private String userName;
    private String fullName;
    private String password;
   //生成json时将userRoles属性过滤
    @JsonIgnore
    private List<UserRole> userRoles = new ArrayList<>();
}
```

### 10.2 格式化 json 数据

`@JsonFormat` 一般用来格式化 json 数据。

```java
@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone="GMT")
private Date date;
```

### 10.3 扁平化对象

使用 `@JsonUnwrapped` 扁平对象，通常加在属性上

```java
@Getter
@Setter
@ToString
public class Account {
    @JsonUnwrapped
    private Location location;
    @JsonUnwrapped
    private PersonInfo personInfo;
    ......
}
```

```json
// 未扁平化之前：
{
  "location": {
    "provinceName": "JiangSu",
    "countyName": "SuZhou"
  },
  "personInfo": {
    "userName": "T4mako",
    "fullName": "T4mako"
  }
}

// 扁平化之后：
{
  "provinceName": "JiangSu",
  "countyName": "SuZhou",
  "userName": "T4mako",
  "fullName": "T4mako"
}
```

## 十一、测试相关
`@ActiveProfiles` 一般作用于测试类上， 用于声明生效的 Spring 配置文件。
```java
@SpringBootTest(webEnvironment = RANDOM_PORT)
@ActiveProfiles("test")
@Slf4j
public abstract class TestBase {
  ......
}
```

`@Test`： 声明一个方法为测试方法  
`@Transactional`： 被声明的测试方法的数据会回滚，避免污染测试数据。  
`@WithMockUser`： Spring Security 提供的，用来模拟一个真实用户，并且可以赋予权限。