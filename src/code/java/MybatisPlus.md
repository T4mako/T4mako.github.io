---
title: MybatisPlus 基础
icon: flow
order: 10
category: 
    - java
tag: 
    - orm
    - java
---
## 1、MybatisPlus简介

MyBatis-Plus（简称 MP）是一个 MyBatis的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。
<!-- more -->
特性：
无侵入、损耗小
强大的 CRUD 操作：**内置通用 Mapper、通用 Service**，仅仅通过少量配置即可实现单表大部分CRUD 操作，更有强大的条件构造器，满足各类使用需求
**支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
**支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
支持 ActiveRecord 模式：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
支持自定义全局通用操作：支持全局通用方法注入（ Write once, use anywhere ）
内置代码生成器：采用代码或者 Maven 插件可**快速生成 Mapper 、 Model 、 Service 、Controller 层代码**，支持模板引擎，更有超多自定义配置等您来使用
**内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
分页插件支持多种数据库：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
内置性能分析插件：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
内置全局拦截插件：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作  

支持数据库：
MySQL，Oracle，DB2，H2，HSQL，SQLite，PostgreSQL，SQLServer，Phoenix，Gauss ，
ClickHouse，Sybase，OceanBase，Firebird，Cubrid，Goldilocks，csiidb
达梦数据库，虚谷数据库，人大金仓数据库，南大通用(华库)数据库，南大通用数据库，神通数据
库，瀚高数据库

框架结构：
![image-20230227202859252](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230227202859252.png)

代码文档地址：
***官方地址: http://mp.baomidou.com***
代码发布地址:
Github: https://github.com/baomidou/mybatis-plus
Gitee: https://gitee.com/baomidou/mybatis-plus
文档发布地址: https://baomidou.com/pages/24112f  

## 2、入门案例  

### 1、创建、配置springboot工程

加入依赖：

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.2</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.0.32</version>
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

配置数据源：

```YAML
spring:
  #配置数据源
  datasource:
    #数据源类型
    type: com.zaxxer.hikari.HikariDataSource
    #各个信息
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=GMT%2B8&characterEncoding=utf-8&useSSL=false
    username: root
    password: root
```

### 2、创建实体类

```java
@Data
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

***@Data***注解：导入lombok依赖，在实体类上添加@Data注解，直接生成对应的get，set，有参，无参，equals，hashcode方法

### 3、创建mapper

```java
public interface UserMapper extends BaseMapper<User> {
}
```

BaseMapper是MyBatis-Plus提供的模板mapper，其中**包含了基本的CRUD方法，泛型为操作的实体类型 **

### 4、测试

创建测试类
**Wrapper**：条件构造器，当查询时有条件可以创建Wrapper对象，如果没有就设置null为参数

```java
@SpringBootTest
public class MybatisPlusTest {
    @Autowired
    UserMapper userMapper;//运行时，mapperScan扫描mapper接口会创建代理实现类，并放入IOC容器中，编译阶段的报错可以忽略
    //可以通过在Mapper上添加@Repository注解（持久层注解）消除报错

    @Test
    public void testSelectList(){
        //selectList方法中传入Wrapper
        //Wrapper：条件构造器，当查询时有条件可以创建Wrapper对象，如果没有就设置null为参数
        List<User> list = userMapper.selectList(null);
        list.forEach(System.out::println);
    }
}
```

添加日志：
在application.yml中配置日志输出 

```yaml
## 配置MyBatis日志
mybatis-plus:
	configuration:
		log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

## 3、基本CRUD

### 1、BaseDAO

mapper接口继承了BaseDAO，查看BaseDAO的源码（下载源码）
MyBatis-Plus中的基本CRUD在内置的BaseMapper中都已得到了实现，我们可以直接使用

### 2、插入

mapper.insert(对象)

```java
@Test
public void testInsert(){
    //新增用户信息
    User user = new User();
    user.setName("ZS");
    user.setAge(23);
    user.setEmail("123@qq.com");
    //insert into user (id，name，age，email) values (?,?,?,?)
    int result = userMapper.insert(user);
    System.out.println("result:"+result);
    System.out.println("id:"+user.getId());
}
```

### 3、删除

mapper.deleteById(id)	根据id删除
mapper.deleteByMap(map)	根据map中对应的条件删除
mapper.deleteBatchIds(list)	根据list中所有的id删除

```java
@Test
public void testDelete(){
    //通过id删除用户信息
    //delete from user where id=?
    int result = userMapper.deleteById(1630444150786678785L);
    System.out.println("result:"+result);

    //根据map集合中设置的条件删除数据
    //delete from user where name=? and age=?
    Map<String,Object> map = new HashMap<>();
    map.put("name","ZS");
    map.put("age",23);
    int res = userMapper.deleteByMap(map);
    System.out.println("result:"+res);

    //通过多个id进行批量删除
    List<Long> list = Arrays.asList(1L, 2L, 3L);
    userMapper.deleteBatchIds(list);
}
```

### 4、更新

mapper.updateById(对象)	根据对象的id更新数据，null值不做修改

```java
@Test
public void testUpdate(){
    //修改用户信息
    //update user set name=?,email=? where id=?
    User user = new User();
    user.setId(4L);
    user.setName("李四");
    int result = userMapper.updateById(user);
    System.out.println("result:"+result);
}
```

### 5、查找

mapper.selectById(id)	根据id查询用户信息
mapper.selectBatchIds(list)	根据list中的值查询用户信息
mapper.selectByMap(map)	根据map中的条件查询用户信息
mapper.selectList(null)	根据wrapper查询用户信息，如果为null表示所有的

```java
@Test
public void testSelect(){
    //通过id查询用户信息
    //select id,name,age,email, from user where id=?
    User user = userMapper.selectById(1L);
    System.out.println(user);

    //根据多个id查询多个信息
    //select id,name,age,email from user where id in(?,?,?)
    List<Long> list = Arrays.asList(1L, 2L, 3L);
    List<User> users = userMapper.selectBatchIds(list);
    users.forEach(System.out::println);

    //根据map集合中的条件查询用户信息
    //select id,name,age,email form user where name=? and age=?
    Map<String,Object> map = new HashMap<>();
    map.put("name","Jack");
    map.put("age",20);
    List<User> lists = userMapper.selectByMap(map);
    lists.forEach(System.out::println);

    //select * from user
    List<User> list1 = userMapper.selectList(null);//如果修改器为null表示为所有的
    list1.forEach(System.out::println);

    //自定义功能
    //select id,name,age,email from user where id = ?
    Map<String, Object> map1 = userMapper.selectMapById(1L);
    System.out.println(map1);
}
```

自定义功能：
在mapper接口中新建抽象方法，在resources文件夹下新建mapper文件夹，创建映射文件XXXMapper.xml，编写sql语句

### 6、通用Service 

MyBatis-Plus中有一个接口**IService**和其实现类**ServiceImpl**，封装了常见的业务层逻辑。详情查看源码IService和ServiceImpl  

通用 Service CRUD 封装**IService**接口，进一步封装 CRUD 采用 **get 查询单行** **remove 删
除** **list 查询集合** **page 分页** 前缀命名方式**区分 Mapper 层避免混淆**（方法名与mapper调用的方法名不同）
泛型 T 为任意实体对象
建议如果存在自定义通用 Service 方法的可能，请创建自己的 IBaseService 继承Mybatis-Plus 提供的基类

举例：
创建**UserService接口继承IService**接口，IServie泛型填写对应**实体类**
编写UserService接口的实现类**UserServiceImpl继承ServiceImpl实现UserService接口**
ServiceImpl泛型编写**mapper和对应的实体类**
由于ServiceImpl实现了IService接口，因此UserServiceImpl不需要实现IService的方法
在UserServiceImol上添加**@Service注解**

代码示例：

```java
public interface UserService extends IService<User> {
}
```

```java
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
```

```java
@SpringBootTest
public class MybatisPlusServiceTest {
    @Autowired
    private UserService userService;

    @Test
    public void testGetCount(){
        //查询总记录数
        //select count(*) from user
        long count = userService.count();
        System.out.println("总记录数："+count);
    }

    @Test
    public void testInsertMore(){
        List<User> list = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            User user = new User();
            user.setName("abc" + i);
            user.setAge(20 + i);
            list.add(user);
        }
        //INSERT INTO user ( id, name, age ) VALUES ( ?, ?, ? )
        boolean b = userService.saveBatch(list);
        System.out.println(b);
    }
}
```

## 4、常用注解  

### 1、@TableName  

由此得出结论，MyBatis-Plus在**确定操作的表**时，由**BaseMapper的泛型决定**，即实体类型决定，且**默认操作的表名和实体类型的类名一致 **

如果实体类类名与表名不一致，可以在**实体类**上标注**@TableName("")**注解，标识实体类对应的表

如果所有表名都含有相同的前缀，可以使用MyBatis-Plus提供的全局配置，为实体类所对应的表名设置默认的前缀  

```yaml
mybatis-plus:
	configuration:
        # 配置MyBatis日志
		log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
	global-config:
		db-config:
			# 配置MyBatis-Plus操作表的默认前缀
			table-prefix: t_
```

### 2、@TableId   

MyBatis-Plus在实现CRUD时，会**默认将id作为主键列**，并在插入数据时，默认基于雪花算法的策略生成id  

如果表的主键字段名不为id，crud会出现错误

因此可以在**实体类中uid属性上**通过**@TableId将其标识为主键**，即可成功执行SQL语句  

#### @TableId的value属性  

若实体类中**主键**对应的属性为**id**，而**表中**表示主键的字段为**uid**，此时若只在**属性id上添加注解@TableId**，则抛出异常Unknown column 'id' in 'field list'，即MyBatis-Plus仍然会将id作为表的主键操作，而表中**表示主键的是字段uid** 

```java
@Data
public class User{
	//将属性所对应的字段指定为主键
    //@TableId注解的value属性用于指定主键的字段
    @TableId(value="uid")
    private Long id;
}
```

#### @TableId的type属性  

type属性用来定义主键策略  

常用的主键策略：  

| 值                        | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| IdType.ASSIGN_ID（默 认） | 基于雪花算法的策略生成数据id，与数据库id是否设置自增无关     |
| IdType.AUTO               | 使用数据库的自增策略，注意，该类型请确保数据库设置了id自增， 否则无效 |

```java
@Data
public class User{
	//将属性所对应的字段指定为主键
    //@TableId注解的value属性用于指定主键的字段
    //@TableId注解的IdType属性用于指定主键生成策略
    @TableId(value = "uid",type = IdType.AUTO)
    private Long id;
}
```

配置全局主键策略：  

```yaml
mybatis-plus:
	configuration:
		# 配置MyBatis日志
		log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
	global-config:
		db-config:
			# 配置MyBatis-Plus操作表的默认前缀
			table-prefix: t_
			# 配置MyBatis-Plus的主键策略
			id-type: auto
```

**雪花算法：**

背景：需要选择合适的方案去应对数据规模的增长，以应对逐渐增长的访问压力和数据量。数据库的扩展方式主要包括：**业务分库、主从复制，数据库分表**。  

数据库分表：
将不同业务数据分散存储到不同的数据库服务器，能够支撑百万甚至千万用户规模的业务，但如果业务继续发展，同一业务的单表数据也会达到单台数据库服务器的处理瓶颈。例如，淘宝的几亿用户数据，如果全部存放在一台数据库服务器的一张表中，肯定是无法满足性能要求的，此时就需要对单表数据进行拆分。  

单表数据拆分有两种方式：垂直分表和水平分表。

**垂直分表**：垂直分表适合将表中某些不常用且占了大量空间的列拆分出去。

**水平分表**：水平分表适合表行数特别大的表，有的公司要求单表行数超过 5000 万就必须进行分表，这个数字可以作为参考，但并不是绝对标准，关键还是要看表的访问性能。对于一些比较复杂的表，可能超过 1000万就要分表了；而对于一些简单的表，即使存储数据超过 1 亿行，也可以不分表。但不管怎样，当看到表的数据量达到千万级别时，作为架构师就要警觉起来，因为这很可能是架构的性能瓶颈或者隐患。
水平分表相比垂直分表，会引入更多的复杂性，例如要求全局唯一的数据id该如何处理  ：

①主键自增
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230228201035.png)

②取模
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230228201101.png)

③雪花算法
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230228201144.png)

雪花算法是由Twitter公布的分布式主键生成算法，它能够保证不同表的主键的不重复性，以及相同表的主键的有序性。  

1、核心思想：
长度共64bit（一个long型）。
首先是一个符号位，1bit标识，由于long基本类型在Java中是带符号的，最高位是符号位，正数是0，负数是1，所以id一般是正数，最高位是0。41bit时间截(毫秒级)，存储的是时间截的差值（当前时间截 - 开始时间截)，结果约等于69.73年。
10bit作为机器的ID（5个bit是数据中心，5个bit的机器ID，可以部署在1024个节点）。
12bit作为毫秒内的流水号（意味着每个节点在每毫秒可以产生 4096 个 ID）。  

2、优点：整体上按照时间自增排序，并且整个分布式系统内不会产生ID碰撞，并且效率较高。  

### 3、@TableField  

**MyBatis-Plus会自动将下划线命名风格转化为驼峰命名风格  **，所以无需手动开启驼峰转换

若实体类中的属性和表中的字段不同且也不是下划线、驼峰风格，此时需要在实体类属性上使用**@TableField("")**设置属性所对应的字段名  

例如实体类属性name，表中字段username :

```java
@TableField("username")
private String name
```

### 4、@TableLogic  

物理删除：真实删除，将对应数据从数据库中删除，之后查询不到此条被删除的数据
逻辑删除：假删除，将对应数据中代表是否被删除字段的状态修改为“被删除状态”，之后在数据库中仍旧能看到此条数据记录
使用场景：可以进行数据恢复  

#### 实现逻辑删除:

①数据库中创建逻辑删除状态列，设置默认值为0  
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230228203636.png)

②实体类中添加逻辑删除属性  
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230228203654.png)

③测试
测试删除功能，真正执行的是修改
UPDATE t_user SET is_deleted=1 WHERE id=? AND is_deleted=0
测试查询功能，被逻辑删除的数据默认不会被查询
SELECT id,username AS name,age,email,is_deleted FROM t_user WHERE is_deleted=0  

## 5、条件构造器和常用接口  

### 1、Wrapper介绍

**wrapper可以链式添加规则**

Wrapper ： 条件构造抽象类，最顶端父类
	AbstractWrapper ： 用于查询条件封装，生成 sql 的 where 条件
		***QueryWrapper ： 查询条件封装***
		**UpdateWrapper ： Update 条件封装**
		AbstractLambdaWrapper ： 使用Lambda 语法
			LambdaQueryWrapper ：用于Lambda语法使用的查询Wrapper
			LambdaUpdateWrapper ： Lambda 更新封装Wrapper  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230301143137.png)

创建新的Wrapper对象，泛型为对应的实体类，给Wrapper添加条件，通过自动注入的mapper对象调用方法，执行wrapper条件



### 2、QueryWrapper

**创建测试类，注入userMapper**

#### ①组装查询条件：

```java
@Test
public void test01(){
    //查询用户名包含a，年龄在20到30之间，邮箱信息不为null的用户信息
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.like("name","a")
        .between("age",20,30)
        .isNotNull("email");
    List<User> users = userMapper.selectList(queryWrapper);
    users.forEach(System.out::println);
}
```

#### ②组装排序条件

```java
 @Test
 public void test02(){
     //查询用户信息，按照年龄降序排序，若年龄相同，按照id升序排序
     QueryWrapper<User> queryWrapper = new QueryWrapper<>();
     queryWrapper.orderByDesc("age").orderByAsc("id");
     List<User> list = userMapper.selectList(queryWrapper);
     list.forEach(System.out::println);
 }
```

#### ③组装删除条件

```java
@Test
public void test03(){
    //删除邮箱为null的用户
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.isNull("email");
    int result = userMapper.delete(queryWrapper);
    System.out.println(result);
}
```

#### ④条件的优先级

```java
@Test
public void test04(){
    //将年龄大于20并用户名中包含a 或 邮箱为null的用户信息修改
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.gt("age",20).like("name","a")
        .or().isNull("email");
    User user = new User();
    user.setName("aaa");
    user.setEmail("12345@aa.com");
    int result = userMapper.update(user, queryWrapper);
    System.out.println(result);
}

@Test
public void test05(){
    //将年龄大于20 并 用户名中包含a或邮箱为null的用户信息修改
    //lambda中的条件优先执行
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.like("name","a")
        .and(i->i.gt("age",20).or().isNull("email"));
    User user = new User();
    user.setName("bbb");
    user.setEmail("12345@aa.com");
    int result = userMapper.update(user, queryWrapper);
    System.out.println(result);
}
```

#### ⑤组装select字句

```java
@Test
public void test06(){
    //查询用户的用户名，年龄，邮箱信息
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.select("name","age","email");
    List<Map<String, Object>> maps = userMapper.selectMaps(queryWrapper);
    maps.forEach(System.out::println);
}
```

#### ⑥实现子查询  

```java
@Test
public void test07(){
    //查询id小于等于100的用户信息
    //SELECT id,name,age,email FROM user WHERE (id IN (select id from user where id <= 100))
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.inSql("id","select id from user where id <= 100");
    List<User> list = userMapper.selectList(queryWrapper);
    list.forEach(System.out::println);
}
```

### 3、UpdateWrapper  

```java
@Test
public void test08(){
    //将用户名中包含a 并且 年龄大于20或邮箱为null的用户信息修改
    UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
    updateWrapper.like("name","a")
        .and(i -> i.gt("age",20).or().isNull("email"));
    updateWrapper.set("name","ccc").set("email","abc@dd.com");
    int result = userMapper.update(null, updateWrapper);
    System.out.println(result);
}
```

### 4、组装条件

在真正开发的过程中，**组装条件是常见的功能**，而这些条件数据来**源于用户输入**，是可选的，因此我们在组装这些条件时，必须先判断用户是否选择了这些条件，若选择**则需要组装该条件**，若没有选择则一定不能组装，以免影响SQL执行的结果  

思路一：

```java
@Test
public void test09(){
    String username = "";
    Integer ageBegin = 20;
    Integer ageEnd = 30;
    //SELECT id,name,age,email FROM user WHERE (age > ? AND age <= ?)
    QueryWrapper<User> queryWrapper= new QueryWrapper<>();
    if(StringUtils.isNotBlank(username)){
        //注意StringUtils类是Mybatis包下的
        //isNotBlank：判断某个字符串是否不为空字符串，不为null，不为空白符
        queryWrapper.like("name",username);
    }
    if(ageBegin != null){
        queryWrapper.gt("age",ageBegin);
    }
    if(ageEnd != null){
        queryWrapper.le("age",ageEnd);
    }
    List<User> list = userMapper.selectList(queryWrapper);
    list.forEach(System.out::println);
}
```

思路二：

上面的实现方案没有问题，但是代码比较复杂，我们可以使用带condition参数的重载方法构建查询条件，简化代码的编写  

```java
@Test
public void test10(){
    String username = "a";
    Integer ageBegin = null;
    Integer ageEnd = 30;
    //SELECT id,name,age,email FROM user WHERE (name LIKE ? AND age <= ?)
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.like(StringUtils.isNotBlank(username),"name",username)
        .ge(ageBegin != null, "age",ageBegin)
        .le(ageEnd != null,"age",ageEnd);
    List<User> list = userMapper.selectList(queryWrapper);
    list.forEach(System.out::println);
}
```

### 5、LambdaQueryWrapper 

**使用实体类的方法引用，避免写错实体类的字段名**

```java
@Test
public void test11(){
    String username = "a";
    Integer ageBegin = null;
    Integer ageEnd = 30;
    LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.like(StringUtils.isNotBlank(username),User::getName,username)
        .ge(ageBegin!=null,User::getAge,ageBegin)
        .le(ageEnd != null,User::getAge,ageEnd);
    List<User> list = userMapper.selectList(lambdaQueryWrapper);
    list.forEach(System.out::println);
}
```

### 6、LambdaUpdateWrapper  

```java
@Test
public void test12(){
    LambdaUpdateWrapper<User> lambdaUpdateWrapper = new LambdaUpdateWrapper<>();
    lambdaUpdateWrapper.like(User::getName,"a")
        .and(i->i.gt(User::getAge,20).or().isNull(User::getEmail));
    lambdaUpdateWrapper.set(User::getName,"ddd").set(User::getEmail,"fff@aa.com");
    int result = userMapper.update(null, lambdaUpdateWrapper);
    System.out.println(result);
}
```

## 6、插件

### 1、分页插件  

MyBatis Plus自带分页插件，只要简单的配置即可实现分页功能  

#### 1、添加配置类  

```java
@Configuration
@MapperScan("com.t4mako.mybatisplus.mapper") //可以将主类中的注解移到此处
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

#### 2、测试

```java
@SpringBootTest
public class MybatisPlusPluginsTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testPage(){
        //创建page对象，参数为当前页为第几页，每页显示几条数据
        Page<User> page = new Page<>(2,3);
        //两个参数，第一个为page对象，第二个为条件构造器，如果条件构造器为null则选择所有数据
        userMapper.selectPage(page,null);
        //当前查询出来的数据分装在page中
        System.out.println(page);
    }
}
```

**page对象可以获取当前页码，是否有上一页，下一页，总页数等数据**

### 2、xml自定义分页  

#### 1、UserMapper中定义接口方法

```java
//通过年龄查询用户信息并分页
Page<User> selectPageVo(Page<User> page,Integer age);
```

#### 2、UserMapper.xml中编写SQL  

可以再yaml文件中配置类型别名，在maper中编写resultType无需从com开始编写：

```yaml
mybatis-plus:
  #配置类型别名所对应的包
  type-aliases-package: com.t4mako.mybatisplus.pojo
```

```xml
<!--Page<User> selectPageVo(Page<User> page,Integer age);-->
<select id="selectPageVo" resultType="User"><!--配置类型别名简写resultType-->
    select id,name,age,email from user where age > #{age}
</select>
```

### 3、乐观锁

#### 1、乐观锁实现流程 ：

​	数据库中添加**version字段**
​	取出记录时，获取当前version
​	更新时，version + 1，如果where语句中的version版本不对，则更新失败  

#### 2、Mybatis-Plus实现乐观锁  

①修改实体类

```java
package com.atguigu.mybatisplus.entity;
import com.baomidou.mybatisplus.annotation.Version;
import lombok.Data;
@Data
public class Product {
    private Long id;
    private String name;
    private Integer price;
    @Version
    private Integer version;
}
```

添加mapper

```java
public interface ProductMapper extends BaseMapper<Product> {
}
```

②添加乐观锁插件配置  

在mybatisPlus配置文件中添加乐观锁配置

```java
@Configuration
@MapperScan("com.t4mako.mybatisplus.mapper") //可以将主类中的注解移到此处
public class MybatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor(){
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        //添加分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL)); //配置数据库类型为MySQL
        //添加乐观锁插件
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }
}
```

测试修改冲突  

```java
@Test
public void testConcurrentVersionUpdate() {
    //小李取数据
    Product p1 = productMapper.selectById(1L);
    //小王取数据
    Product p2 = productMapper.selectById(1L);
    //小李修改 + 50
    p1.setPrice(p1.getPrice() + 50);
    int result1 = productMapper.updateById(p1);
    System.out.println("小李修改的结果：" + result1);
    //小王修改 - 30
    p2.setPrice(p2.getPrice() - 30);
    int result2 = productMapper.updateById(p2);
    System.out.println("小王修改的结果：" + result2);
    if(result2 == 0){
        //失败重试，重新获取version并更新
        p2 = productMapper.selectById(1L);
        p2.setPrice(p2.getPrice() - 30);
        result2 = productMapper.updateById(p2);
    }
    System.out.println("小王修改重试的结果：" + result2);
    //老板看价格
    Product p3 = productMapper.selectById(1L);
    System.out.println("老板看价格：" + p3.getPrice());
}
```

## 7、通用枚举

表中的有些字段值是固定的，例如性别（男或女），此时我们可以使用MyBatis-Plus的通用枚举来实现  

数据库表添加字段sex

①创建通用枚举类型：

```java
package com.atguigu.mp.enums;
import com.baomidou.mybatisplus.annotation.EnumValue;
import lombok.Getter;
@Getter
public enum SexEnum {
    MALE(1, "男"),
    FEMALE(2, "女");
    @EnumValue
    private Integer sex;
    private String sexName;
    SexEnum(Integer sex, String sexName) {
    this.sex = sex;
    this.sexName = sexName;
    }
}
```

配置扫描通用枚举（可以省略）

②测试

```java
@Test
public void testSexEnum(){
    User user = new User();
    user.setName("Enum");
    user.setAge(20);
    //设置性别信息为枚举项，会将@EnumValue注解所标识的属性值存储到数据库
    user.setSex(SexEnum.MALE);
    //INSERT INTO t_user ( username, age, sex ) VALUES ( ?, ?, ? )
    //Parameters: Enum(String), 20(Integer), 1(Integer)
    userMapper.insert(user);
}
```

## 8、代码生成器  

**比逆向工程更加强大，自动生成controller，entitu，mapper，service**

### 1、引入依赖  

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.1</version>
</dependency>
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.31</version>
</dependency>
```

### 2、快速生成

举例：

将生成的controller，entitu，mapper，service，mapper文件与java类放到指定的目录下

```java
public class FastAutoGeneratorTest {
    public static void main(String[] args) {
        FastAutoGenerator.create("jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=GMT%2B8&characterEncoding=utf-8&useSSL=false"
                        , "root", "root")
                .globalConfig(builder -> {
                    builder.author("t4mako") // 设置作者
                            //.enableSwagger() // 开启 swagger 模式（快速生成）
                            .fileOverride() // 覆盖已生成文件
                            .outputDir("E://mybatis_plus"); // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent("com.t4mako") // 设置父包名
                            .moduleName("mybatisplus") // 设置父包模块名
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "E://mybatis_plus"));// 设置mapperXml生成路径
                })
                .strategyConfig(builder -> { //策略配置
                    builder.addInclude("user") // 设置需要生成的表名
                            .addTablePrefix("t_", "c_"); // 设置过滤表前缀
                })
                .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker 引擎模板，默认的是Velocity引擎模板
                .execute();
    }
}
```

## 9、多数据源  

适用于多种场景：纯粹多库、 读写分离、 一主多从、 混合模式等  

场景说明：
我们创建两个库，分别为：mybatis_plus（以前的库不动）与mybatis_plus_1（新建），将mybatis_plus库的product表移动到mybatis_plus_1库，这样每个库一张表，通过一个测试用例分别获取用户数据与商品数据，如果获取到说明多库模拟成功  

创建新的数据库和新的工程

### 1、引入依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
    <version>3.5.0</version>
</dependency>
```

### 2、配置多数据源  

```yml
spring:
	# 配置数据源信息
	datasource:
		dynamic:
			# 设置默认的数据源或者数据源组,默认值即为master
			primary: master
			# 严格匹配数据源,默认false。true表示未匹配到指定数据源时抛异常,false未匹配到则使用默认数据源
			strict: false
			datasource:
				#主数据源
				master:
					url: jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=GMT%2B8&characterEncoding=utf-8&useSSL=false
					driver-class-name: com.mysql.cj.jdbc.Driver
					username: root
					password: root
				#从数据源
				slave_1:
					url: jdbc:mysql://localhost:3306/mybatis_plus2?serverTimezone=GMT%2B8&characterEncoding=utf-8&useSSL=false
					driver-class-name: com.mysql.cj.jdbc.Driver
					username: root
					password: root
```

### 3、创建用户service  

```java
public interface UserService extends IService<User> {
}
```

```java
@DS("master") //指定所操作的数据源
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
```

### 4、创建商品service  

```java
public interface ProductService extends IService<Product> {
}
```

```java
@DS("slave_1")
@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {
}
```

### 5、测试

```java
@Autowired
private UserService userService;
@Autowired
private ProductService productService;
@Test
public void testDynamicDataSource(){
    System.out.println(userService.getById(1L));
    System.out.println(productService.getById(1L));
}
```

1、都能顺利获取对象，则测试成功
2、如果我们实现读写分离，将写操作方法加上主库数据源，读操作方法加上从库数据源，自动切
换，是不是就能实现读写分离？  

## 10、MyBatisX插件  

MyBatis-Plus为我们提供了强大的mapper和service模板，能够大大的提高开发效率
但是在真正开发过程中，MyBatis-Plus并不能为我们解决所有问题，例如一些复杂的SQL，多表联查，我们就需要自己去编写代码和SQL语句，我们该如何快速的解决这个问题呢，这个时候可以使用MyBatisX插件
MyBatisX一款基于 IDEA 的快速开发插件，为效率而生。  

MyBatisX插件用法：https://baomidou.com/pages/ba5b24/  
