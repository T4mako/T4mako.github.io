---
title: Mybatis 基础
icon: flow
order: 8
date: 2022-12-26
category: 
    - java
tag: 
    - orm
    - java
---
## 1、MyBatis简介  

MyBatis最初是Apache的一个开源项目iBatis, 2010年6月这个项目由Apache Software Foundation迁移到了Google Code。随着开发团队转投Google Code旗下， iBatis3.x正式更名为MyBatis。代码于2013年11月迁移到Github。iBatis一词来源于“internet”和“abatis”的组合，是一个基于Java的持久层框架。 iBatis提供的持久层框架包括SQL Maps和Data Access Objects（DAO）。  
<!-- more -->
### 1.1MyBatis特性

1） MyBatis 是支持定制化 SQL、存储过程以及高级映射的优秀的持久层框架
2） MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集
3） MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和Java的POJO（Plain Old JavaObjects，普通的Java对象）映射成数据库中的记录
4） MyBatis 是一个 半自动的ORM（Object Relation Mapping）框架  

### 1.2、MyBatis下载

MyBatis下载地址：https://github.com/mybatis/mybatis-3  

### 1.3、和其它持久化层技术对比  

JDBC
	SQL 夹杂在Java代码中耦合度高，导致**硬编码内伤**（要修改java中的代码）
	维护不易且实际开发需求中 SQL 有变化，频繁修改的情况多见
	代码冗长，开发效率低

Hibernate 和 JPA
	操作简便，开发效率高
	程序中的长难复杂 SQL 需要绕过框架 
	内部自动生产的 SQL，不容易做特殊优化
	基于全映射的全自动框架，大量字段的 POJO 进行部分映射时比较困难。
	反射操作太多，导致数据库性能下降  

MyBatis
	轻量级，性能出色
	SQL 和 Java 编码分开，功能边界清晰。Java代码专注业务、SQL语句专注数据
	开发效率稍逊于HIbernate，但是完全能够接受  

## 2、搭建MyBatis  

### 2.1、开发环境  

IDE：idea2022.1.3
构建工具：maven 3.8.6
MySQL版本：MySQL 8
MyBatis版本：MyBatis 3.5.11  

### 2.2、创建maven工程

#### ①新建项目，更改settings

![image-20221226160430380](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221226160430380.png)

#### ②新建模块

![image-20221226160638023](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221226160638023.png)

#### ③修改打包方式

![image-20221226160928407](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221226160928407.png)

#### ④引入依赖

```xml
<dependencies>
	<!-- Mybatis核心 -->
	<dependency>
		<groupId>org.mybatis</groupId>
		<artifactId>mybatis</artifactId>
		<version>3.5.7</version>
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
</dependencies>
```

  若代码报红，右上角的m点击下载

### 2.3、创建MyBatis的核心配置文件  

习惯上命名为**mybatis-config.xml**，这个文件名仅仅只是建议，并非强制要求。将来**整合Spring之后，这个配置文件可以省略**，所以大家操作时可以直接复制、粘贴。
核心配置文件主要用于**配置连接数据库的环境以及MyBatis的全局配置信息**
核心配置文件存放的位置是**src/main/resources**目录下  

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--设置连接数据库的环境-->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/ssm?serverTimezone=UTC"/>
                <property name="username" value="root"/>
                <property name="password" value="root"/>
            </dataSource>
        </environment>
    </environments>
    
    <!--引入映射文件-->
    <mappers>
        
    </mappers>
</configuration>
```

### 2.4、创建mapper接口  

MyBatis中的mapper接口相当于以前的dao。但是区别在于，mapper仅仅是接口，我们不需要提供实现类。  Mybatis可以帮你实现

例如：

```java
public interface UserMapper {
    /**
    * 添加用户信息
    */
    int insertUser();
}
```

### 2.5、创建MyBatis的映射文件  

相关概念：**ORM**（Object Relationship Mapping）对象关系映射
	**对象：Java的实体类对象
	关系：关系型数据库
	映射：二者之间的对应关系**  

| Java概念 | 数据库概念 |
| -------- | ---------- |
| 类       | 表         |
| 属性     | 字段/列    |
| 对象     | 记录/行    |

1、映射文件的命名规则：
	表所对应的实体类的类名+Mapper.xml
	例如：**表t_user，映射的实体类为User，所对应的映射文件为UserMapper.xml**
	因此**一个映射文件对应一个实体类**，对应一张表的操作
	MyBatis**映射文件用于编写SQL**，访问以及操作表中的数据
	MyBatis映射文件存放的位置是**src/main/resources/mappers**目录下
2、 MyBatis中可以**面向接口操作数据**，要保证两个一致：
	==**mapper接口**的全类名和**映射文件**的**命名空间（namespace）保持一致**
	**mapper接口**中**方法的方法名**和映射文件中编写**SQL的标签的id**属性保持一致==

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.T4mako.mybatis.mapper.UserMapper">
    <!--int insertUser();-->
    <insert id="insertUser">
        insert into t_user values(null,'admin','123456',23,'男','12345@qq.com')
    </insert>
</mapper>
```

==在核心配置文件中引入映射==

```xml
<!--引入映射文件-->
<mappers>
	<mapper resource="mappers/UserMapper.xml" />
</mappers>
```

### 2.6、通过junit测试功能  

```java
public class MyBatisTest {
    @Test
    public void testInsert() throws IOException {
        //获取核心配置文件的输入流
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        //获取SqlSessionFactoryBuilder对象
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        //获取sqlSessionFactory对象
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        //获取sql的会话对象SqlSession，是Mybatis提供的操作数据库的对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //获取UserMapper的代理实现类对象
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        //调用Mapper接口中的方法，实现添加用户信息的功能
        int result = mapper.insertUser();
        System.out.println("结果：" + result);
        //提交事务
        sqlSession.commit();
        //关闭SqlSession
        sqlSession.close();
    }
}
```

**SqlSession**：代表**Java程序和数据库之间的会话**。（HttpSession是Java程序和浏览器之间的会话）
SqlSessionFactory：是“生产”SqlSession的“工厂”。
工厂模式：如果创建某一个对象，使用的过程基本固定，那么我们就可以把创建这个对象的相关代码封装到一个“工厂类”中，以后都使用这个工厂类来“生产”我们需要的对象。  

### 2.7、加入log4j日志功能  

#### ①加入依赖 

```xml
<!-- log4j日志 -->
<dependency>
	<groupId>log4j</groupId>
	<artifactId>log4j</artifactId>
	<version>1.2.17</version>
</dependency>
```

#### ②加入log4j的配置文件  

log4j的配置文件名为log4j.xml，存放的位置是src/main/resources目录下  

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

日志的级别：
**FATAL(致命) > ERROR(错误) > WARN(警告) > INFO(信息) > DEBUG(调试)
从左到右打印的内容越来越详细**

## 3、核心配置文件详解  

核心配置文件中的标签必须按照固定的顺序：
properties?,settings?,typeAliases?,typeHandlers?,objectFactory?,objectWrapperFactory?,reflectorFactory?,plugins?,environments?,databaseIdProvider?,mappers?  

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--
        MyBatis核心配置文件中，标签的顺序：
        properties?,settings?,typeAliases?,typeHandlers?,
        objectFactory?,objectWrapperFactory?,reflectorFactory?,
        plugins?,environments?,databaseIdProvider?,mappers?
    -->

    <!--引入properties文件，此后就可以在当前文件中使用${key}的方式访问value-->
    <properties resource="jdbc.properties" />

    <!--typeAlias:设置类型别名，即为某个具体的类型设置一个别名，在mybatis的范围中，就可以使用别名表示一个具体的类型-->
    <typeAliases>
        <!--
            type：设置需要写别名的类型
            alias：设置某个类型的别名
        -->
        <!--<typeAlias type="com.T4mako.mybatis.pojo.User" alias="abc"></typeAlias>-->
        <!--若不设置alias，当前的类型拥有默认的别名，即类名且不区分大小写-->
        <!--<typeAlias type="com.T4mako.mybatis.pojo.User"></typeAlias>-->
        <!--通过包来设置类型别名，指定包下所有的类型将全部拥有默认的别名，即类名不区分大小写-->
        <package name="com.T4mako.mybatis.pojo" />
    </typeAliases>

    <!--设置连接数据库的环境-->
    <environments default="development">
        <!--
            environment:设置一个具体的连接数据库的环境
            属性：
            id：设置环境的唯一标识，不能重复
         -->
        <environment id="development">
            <!--
                transactionManager:设置事务管理器
                属性：
                type：设置事务管理的方式
                type = “JDBC/MANAGED”（有两个取值）
                    JDBC:表示使用JDBC中原生的事务管理方式
                    MANAGED：被管理，例如Spring
            -->
            <transactionManager type="JDBC"/>
            <!--
                dataSource：设置数据源
                属性：
                type：设置数据源的类型
                type = “POOLED/UNPOOLED/JNDI”
                    POOLED：表示使用数据库连接池
                    UNPOOLED：表示不使用数据库连接池
                    JNDI：表示使用上下文中的数据源
            -->
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>

    <!--引入映射文件-->
    <mappers>
        <!--<mapper resource="mappers/UserMapper.xml" />-->
        <!--
            以包的方式引入映射文件，但是必须满足一下条件：
            1、mapper接口和映射文件所在的包必须一致
            2、mapper接口的名字和映射文件的名字必须一致
        -->
        <package name="com.T4mako.mybatis.mapper"/>
    </mappers>
</configuration>
```

### tips：创建文件模板

![image-20221228145920237](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221228145920237.png)

创建模板名为mybatis-config和mybatis-mapper的模板，下次创建核心配置文件时只需要通过模板创建

## 4、MyBatis的增删改查  

4.1、新增

```xml
<!--int insertUser();-->
<insert id="insertUser">
	insert into t_user values(null,'admin','123456',23,'男')
</insert>
```

4.2、删除

```xml
<!--int deleteUser();-->
<delete id="deleteUser">
	delete from t_user where id = 7
</delete>
```

4.3、修改

```xml
<!--int updateUser();-->
<update id="updateUser">
	update t_user set username='ybc',password='123' where id = 6
</update>
```

4.4、查询一个实体类对象

```xml
<!--User getUserById();-->
<select id="getUserById" resultType="com.atguigu.mybatis.bean.User">
	select * from t_user where id = 2
</select>
```

4.5、查询list集合

```xml
<!--List<User> getUserList();-->
<select id="getUserList" resultType="com.atguigu.mybatis.bean.User">
	select * from t_user
</select>
```

注意
1、查询的标签select必须设置属性resultType或resultMap，用于设置实体类和数据库表的映射关系
resultType：自动映射，用于属性名和表中字段名一致的情况
resultMap：自定义映射，用于一对多或多对一或字段名和属性名不一致的情况  

## 5、MyBatis获取参数值的两种方式  

MyBatis**获取参数值**的两种方式：`${}`和`#{}` ，此时可以通过`#{}`和`${}`以任意的内容获取参数值
`${}` 的本质就是`字符串拼接`，`#{}`的本质就是`占位符赋值` 
`${}`使用字符串拼接的方式拼接sql，若为字符串类型或日期类型的字段进行赋值时，**需要手动加单引号**
但是`#{}`使用占位符赋值的方式拼接sql，此时为字符串类型或日期类型的字段进行赋值时，**可以自动添加单引号  **

### 5.1、单个字面量类型的参数  

若mapper接口中的方法参数为单个的字面量类型
此时可以使用`${}`和`#{}`以任意的名称获取参数的值，注意`${}`需要手动加单引号

```xml
<!--User getUserByUsername(String username);-->
<select id="getUserByUsername" resultType="User">
    <!--select * from t_user where username = #{username}-->
    select * from t_user where username = '${username}'
</select>
```

### 5.2、多个字面量类型的参数  

若mapper接口中的方法**参数为多个**时，此时MyBatis会自动将这些参数存**放在一个map集合中**，有两种方式存储：
**以arg0,arg1...为键，以参数为值；
以param1,param2...为键，以参数为值；**
因此只需要通过`${}`和`#{}`访问map集合的键就可以获取相对应的值，注意`${}`需要手动加单引号  

```xml
<!--User checkLogin(String username,String password);-->
<select id="checkLogin" resultType="User">
    select * from t_user where username = #{arg0} and password = #{arg1}
    <!--select * from t_user where username = #{param1} and password = #{param2}-->
</select>
```

### 5.3、map集合类型的参数  

若mapper接口中的方法需要的参数为多个时，此时可以**手动创建map集合**，将这些数据放在map中
只需要通过`${}`和`#{}`访问map集合的键就可以获取相对应的值，注意`${}`需要手动加单引号  

```java
public void testCheckLoginByMap(){
    SqlSession sqlSession = SqlSessionUtil.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    Map<String,Object> map = new HashMap<>();
    map.put("username","admin");
    map.put("password","123456");
    User user = mapper.checkLoginByMap(map);
    System.out.println(user);
}
```

```xml
<!--User checkLoginByMap(Map<String,Object> map);-->
<select id="checkLoginByMap" resultType="User">
	select * from t_user where username = #{username} and password = #{password}
</select>
```

### 5.4、实体类类型的参数  

若mapper接口中的方法参数为**实体类对象**时
此时可以使用`${}`和`#{}`，通过访问实体类对象中的**属性名获取属性值**，注意${}需要手动加单引号  

```java
public void testInsertUser(){
    SqlSession sqlSession = SqlSessionUtil.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    mapper.insertUser(new User(null,"root","123456",33,"女","123@qq.com"));
}
```

```xml
<!--void insertUser(User user);-->
<insert id="insertUser">
	insert into t_user values(null,#{username},#{password},#{age},#{gender},#{email})
</insert>
```

### 5.5、使用@Param标识参数  

可以通过@Param注解标识mapper接口中的方法参数。此时，会将这些参数放在map集合中，有两种情况
以**@Param注解的value属性名为键**，以参数为值；
以param1,param2...为键，以参数为值；
只需要通过`${}`和`#{}`访问map集合的键就可以获取相对应的值，
注意`${}`需要手动加单引`号  

```java
//接口中：User checkLoginByParam(@Param("username") String username, @Param("password") String password);
public void testCheckLoginByParam(){
    SqlSession sqlSession = SqlSessionUtil.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    User user = mapper.checkLoginByParam("admin", "123456");
    System.out.println(user);
}
```

## 6、MyBatis的各种查询功能  

### 6.1、查询一个实体类对象

```java
//根据用户id查询用户信息
User getUserById(@Param("id") int id);  
```

```xml
<!--User getUserById(@Param("id") int id);-->
<select id="getUserById" resultType="User">
	select * from t_user where id = #{id}
</select>
```

### 6.2、查询一个list集合  

```java
//查询所有用户信息
List<User> getUserList();
```

```xml
<!--List<User> getUserList();-->
<select id="getUserList" resultType="User">
	select * from t_user
</select>
```

当查询的数据为多条时，不能使用实体类作为返回值，否则会抛出异常TooManyResultsException；
但是若查询的数据只有一条，可以使用实体类或集合作为返回值；

### 6.3、查询单个数据  

```java
/**
* 查询用户的总记录数
* 在MyBatis中，对于Java中常用的类型都设置了类型别名
* 例如： java.lang.Integer-->int|integer
* 例如： int-->_int|_integer
* 例如： Map-->map,List-->list
*/
int getCount();
```

```xml
<!--int getCount();-->
<select id="getCount" resultType="_integer">
	select count(id) from t_user
</select>
```

### 6.4、查询一条数据为map集合  

```java
//根据用户id查询用户信息为map集合
Map<String, Object> getUserToMap(@Param("id") int id);
```

```xml
<!--Map<String, Object> getUserToMap(@Param("id") int id);-->
<!--结果： {password=123456, sex=男 , id=1, age=23, username=admin}-->
<!--以字段名为键，以字段值为值-->
<select id="getUserToMap" resultType="map">
	select * from t_user where id = #{id}
</select>
```

### 6.5、查询多条数据为map集合  

若查询的数据有多条时，并且要将每条数据转换为map集合
此时有两种解决方案：

#### ①方式一  

将表中的数据以map集合的方式查询，一条数据对应一个map；若有多条数据，就会产生多个map集合，此时可以将**这些map放在一个list集合中**获取  

```java
List<Map<String, Object>> getAllUserToMap();
```

```xml
<!--Map<String, Object> getAllUserToMap();-->
<select id="getAllUserToMap" resultType="map">
	select * from t_user
</select>
```

#### ②方式二  

将表中的数据以map集合的方式查询，一条数据对应一个map；若有多条数据，就会产生多个map集合，并且最终要以一个map的方式返回数据，此时需要通过**@MapKey注解设置map集合的键**，值是每条数据所对应的map集合  

```java
@MapKey("id")
Map<String, Object> getAllUserToMap();
```

```xml
<!--Map<String, Object> getAllUserToMap();-->
<!--
{
1={password=123456, sex=男, id=1, age=23, username=admin},
2={password=123456, sex=男, id=2, age=23, username=张三},
3={password=123456, sex=男, id=3, age=23, username=张三}
} -->
<select id="getAllUserToMap" resultType="map">
	select * from t_user
</select>
```

## 7、特殊SQL的执行  

### 7.1、模糊查询  

```java
//模糊查询
List<User> testMohu(@Param("mohu") String mohu);
```

```xml
<!--List<User> testMohu(@Param("mohu") String mohu);-->
<select id="testMohu" resultType="User">
    <!--不能直接用#{}-->
	<!--select * from t_user where username like '%${mohu}%'--> 
	<!--select * from t_user where username like concat('%',#{mohu},'%')-->
	select * from t_user where username like "%"#{mohu}"%"
</select>
```

### 7.2、批量删除  

```java
//批量删除
int deleteMore(@Param("ids") String ids);  
```

```xml
<!--int deleteMore(@Param("ids") String ids);-->
<delete id="deleteMore">
	delete from t_user where id in (${ids})
</delete>
```

### 7.3、动态设置表名  

```java
//动态设置表名，查询所有的用户信息
List<User> getAllUser(@Param("tableName") String tableName);
```

```xml
<!--List<User> getAllUser(@Param("tableName") String tableName);-->
<select id="getAllUser" resultType="User">
	select * from ${tableName}
</select>
```

### 7.4、添加功能获取自增的主键  

场景模拟：
t_clazz(clazz_id,clazz_name)
t_student(student_id,student_name,clazz_id)
1、添加班级信息
2、获取新添加的班级的id
3、为班级分配学生，即将某学的班级id修改为新添加的班级的id  

**useGeneratedKeys:表示当前添加功能使用自增的主键
keyProperty:将添加的数据的自增主键为实体类类型的参数属性赋值**

```java
//添加用户信息
int insertUser(User user);
```

```xml
<!--
    useGeneratedKeys:表示当前添加功能使用自增的主键
    keyProperty:将添加的数据的自增主键为实体类类型的参数的属性赋值
-->
<!--int insertUser(User user);-->
<insert id="insertUser" useGeneratedKeys="true" keyProperty="id">
	insert into t_user values(null,#{username},#{password},#{age},#{sex})
</insert>
```

## 8、自定义映射resultMap  

对于**数据库中的字段名与java中实体类属性名不一致**的情况的解决方法：
①在mapper中的sql语句起别名

```xml
<!--Emp getEmpByEmpId(@Param("empId") Integer empId);-->
<select id="getEmpByEmpId" resultType="Emp">
    select emp_id empId,emp_name empName,age,gender from t_emp where emp_id = #{EmpId}
</select>
```

②在mybatis的核心配置文件mybatis-config.xml中设置下划线命名到驼峰命名的自动转换

```xml
 <settings>
     <!--将下划线映射为驼峰-->
     <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>
```

③使用resultMap处理字段名和属性名不一致的情况

### 8.1、resultMap处理字段和属性的映射关系

**若字段名和实体类中的属性名不一致，则可以通过resultMap设置自定义映射**

相关标签：

主标签：
**resultMap**:设置自定义的映射关系
    **id**：唯一标识
    **type**：处理映射关系到的实体类的类型
内部常用标签：
    **id**：处理主键和实体类中实现的元素关系
    **result**：处理普通字段和实体类中属性的映射关系
        **column**:设置映射关系中的字段名，必须是sql查询出的某个字段
        **property**:设置映射关系中的属性的属性名，必须是处理的实体类类型中的属性名

```xml
<mapper namespace="com.T4mako.mybatis.mapper.EmpMapper">

    <!--
        字段名和属性名不一致的情况，如何处理映射关系：
            1、为查询字段设置别名，和属性名保持一致
            2、当字段符合mysql要求使用_,而属性符合java要求使用驼峰
            此时可以在mybatis的核心配置文件中设置一个全局配置，可以自动将下划线映射为驼峰
    -->
    
    <!--
        主标签：
        resultMap:设置自定义的映射关系
            id：唯一标识
            type：处理映射关系到的实体类的类型
        内部常用标签：
        id：处理主键和实体类中实现的元素关系
        result：处理普通字段和实体类中属性的映射关系
            column:设置映射关系中的字段名，必须是sql查询出的某个字段
            property:设置映射关系中的属性的属性名，必须是处理的实体类类型中的属性名
    -->
    <resultMap id="empResultMap" type="Emp">
        <id column="emp_id" property="empId"></id>
        <result column="emp_name" property="empName"></result>
        <result column="age" property="age"></result>
        <result column="gender" property="gender"></result>
    </resultMap>

    <!--Emp getEmpByEmpId(@Param("empId") Integer empId);-->
    <select id="getEmpByEmpId" resultMap="empResultMap">
        select * from t_emp where emp_id = #{empId}
    </select>
</mapper>
```

### 8.2、多对一映射处理  

#### 8.2.1、级联方式处理映射关系  

```xml
<resultMap id="empAndDeptByResultMap" type="Emp">
    <id column="emp_id" property="empId"></id>
    <result column="emp_name" property="empName"></result>
    <result column="age" property="age"></result>
    <result column="gender" property="gender"></result>
    <result column="dept_id" property="dept.deptId"></result>
    <result column="dept_name" property="dept.deptName"></result>
</resultMap>

<!--getEmpAndDeptByEmpId-->
<select id="getEmpAndDeptByEmpId" resultMap="empAndDeptByResultMap">
    select * from t_emp left join t_dept on t_emp.dept_id = t_dept.dept_id where t_emp.emp_id = #{empId}
</select>
```

#### 8.2.2、使用association处理映射关系  

association:处理多对一的映射关系（处理实体类类型的属性）
    **property：设置需要处理映射关系的属性的属性名
    javaType：设置要处理的属性的类型**

```xml
<resultMap id="empAndDeptByResultMap" type="Emp">
    <id column="emp_id" property="empId"></id>
    <result column="emp_name" property="empName"></result>
    <result column="age" property="age"></result>
    <result column="gender" property="gender"></result>
    <association property="dept" javaType="Dept">
        <id column="dept_id" property="deptId"></id>
        <result column="dept_name" property="deptName"></result>
    </association>
</resultMap>

<!--getEmpAndDeptByEmpId-->
<select id="getEmpAndDeptByEmpId" resultMap="empAndDeptByResultMap">
    select * from t_emp left join t_dept on t_emp.dept_id = t_dept.dept_id where t_emp.emp_id = #{empId}
</select>
```

#### 8.2.3、分步查询  

property：设置需要处理映射关系的属性的属性名
select：设置下一步分步查询的唯一标识
colum：将查询出的某个字段作为下一步分步查询的sql条件

```java
//①查询员工信息
//通过分步查询查询员工以及所对应的部门信息的第一步
Emp getEmpAndDeptByStepOne(@Param("empId") Integer empId);
```

```java
//②根据员工所对应的部门id查询部门信息
//通过分步查询查询员工以及所对应的部门信息的第二步
Dept getEmpAndDeptByStepTwo(@Param("deptId") Integer deptId);
```

```xml
<resultMap id="empAndDeptByStepResultMap" type="Emp">
    <id column="emp_id" property="empId"></id>
    <result column="emp_name" property="empName"></result>
    <result column="age" property="age"></result>
    <result column="gender" property="gender"></result>
    <association property="dept"
                 select="com.T4mako.mybatis.mapper.DeptMapper.getEmpAndDeptByStepTwo"
                 column="dept_id"></association>
</resultMap>

<!--Emp getEmpAndDeptByStepOne(@Param("empId") Integer empId);-->
<select id="getEmpAndDeptByStepOne" resultMap="empAndDeptByStepResultMap">
    select * from t_emp where emp_id = #{empId}
</select>
```

分步查询的优点：可以实现**延迟加载 **
但是必须在核心配置文件中设置全局配置信息：  
lazyLoadingEnabled：全局延迟加载。当开启时，**所有关联对象都会延迟加载**
aggressiveLazyLoading：当开启时，任何方法的调用都会加载该对象的所有属性。否则，**每个属性会按需加载此时就可以实现按需加载，获取的数据是什么**==(false)==，就只会执行相应的sql。此时可通过association和collection中的fetchType属性设置当前的分步查询是否使用延迟加载， **fetchType="lazy(延迟加载)|eager(立即加载)"  **

**mytais-config:**

```xml
<settings>
    <!--将下划线映射为驼峰-->
    <setting name="mapUnderscoreToCamelCase" value="true"/>
    <!--开启延迟加载-->
    <setting name="lazyLoadingEnabled" value="true"/>
    <!--按需加载-->
    <setting name="aggressiveLazyLoading" value="false"/>
</settings>
```

mapper接口：

**fetchType：在开启了延迟加载的环境中，通过该属性设置当前的分步查询是否使用延迟加载
    属性值：eager（立即加载）、lazy（延迟加载）**

```xml
<resultMap id="empAndDeptByStepResultMap" type="Emp">
    <id column="emp_id" property="empId"></id>
    <result column="emp_name" property="empName"></result>
    <result column="age" property="age"></result>
    <result column="gender" property="gender"></result>
    <association property="dept" fetchType="eager"
                 select="com.T4mako.mybatis.mapper.DeptMapper.getEmpAndDeptByStepTwo"
                 column="dept_id"></association>
</resultMap>
```



### 8.3、一对多映射处理  

处理一对多的映射关系：
1、collection
2、分步查询

#### 8.3.1、collection  

collection:处理一对多的映射关系（处理集合类型的属性）
ofType:设置集合类型的属性中存储读数据的类型

```java
//通过分步查询查询员工以及所对应的部门信息的第一步
Emp getEmpAndDeptByStepOne(@Param("empId") Integer empId);
```

```xml
<!--collection:处理一对多的映射关系（处理集合类型的属性）-->
<!--ofType:集合中的类型-->
<resultMap id="deptAndEmpResultMap" type="Dept">
    <id column="dept_id" property="deptId"></id>
    <result column="dept_name" property="deptName"></result>
    <!--ofType:设置集合类型的属性中存储读数据的类型-->
    <collection property="emps" ofType="Emp">
        <id column="emp_id" property="empId"></id>
        <result column="emp_name" property="empName"></result>
        <result column="age" property="age"></result>
        <result column="gender" property="gender"></result>
    </collection>
</resultMap>
<!--Dept getDeptAndEmpByDeptId(@Param("deptId") Integer deptId);-->
<select id="getDeptAndEmpByDeptId" resultMap="deptAndEmpResultMap">
    select * from t_dept left join t_emp on t_dept.dept_id = t_emp.dept_id where t_dept.dept_id = #{deptId}
</select>
```

#### 8.3.2、分步查询  

```java
//分步查询部门中的员工信息的第一步
Dept getDeptAndEmpByStepOne(@Param("deptId") Integer deptId);
```

```java
//分步查询部门中的员工信息的第二步
List<Emp> getDeptAndEmpByStepTwo(@Param("deptId") Integer deptId);
```

```xml
<resultMap id="deptAndEmpResultMapByStep" type="Dept">
<id column="dept_id" property="deptId"></id>
<result column="dept_name" property="deptName"></result>
<collection property="emps"
            select="com.T4mako.mybatis.mapper.EmpMapper.getDeptAndEmpByStepTwo"
            column="dept_id"></collection>
</resultMap>

<!--Dept getDeptAndEmpByStepOne(@Param("deptId") Integer deptId);-->
<select id="getDeptAndEmpByStepOne" resultMap="deptAndEmpResultMapByStep">
	select * from t_dept where dept_id = #{deptId}
</select>
```

## 9、动态SQL  

Mybatis框架的动态SQL技术是一种根据特定条件动态拼装SQL语句的功能，它存在的意义是为了解决 拼接SQL语句字符串时的痛点问题。  

### 9.1、if  、where、trim

动态SQL：
1、if：通过test属性中的表达式判断标签中的内容是否有效（是否会拼接到sql中）
2、where：若where标签中有条件成立，会自动生成where关键字。会自动将内容中**前面多余的and去掉，但后面的and无法去掉**。若where标签中没有条件成立，那就不生成where关键字
3、trim：
    属性： prefix、suffix：在标签中内容前面或后面添加指定内容
            	prefixOverrides、suffixOverrides：在标签中内容前面或后面去掉指定内容

方法一：

```xml
<!--List<Emp> getEmpListByCondition(Emp emp);-->
<select id="getEmpListByMoreTJ" resultType="Emp">
	select * from t_emp where 1=1
    <if test="ename != '' and ename != null">
        and ename = #{ename}
    </if>
    <if test="age != '' and age != null">
        and age = #{age}
    </if>
    <if test="sex != '' and sex != null">
        and sex = #{sex}
    </if>
</select>
```

方法二：

```xml
<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
    select * from t_emp
    <where>
        <if test="empName != null and empName != ''">
            emp_name = #{empName}
        </if>
        <if test="age != null and age != ''">
            and age = #{age}
        </if>
        <if test="gender != null and gender != ''">
            and gender = #{gender}
        </if>
    </where>
</select>
```

方法三：

```xml
<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
    select * from t_emp
    <trim prefix="where" suffixOverrides="and">
        <if test="empName != null and empName != ''">
            emp_name = #{empName} and
        </if>
        <if test="age != null and age != ''">
            and age = #{age} and
        </if>
        <if test="gender != null and gender != ''">
            gender = #{gender}
        </if>
    </trim>
</select>
```

### 9.2、choose、when、otherwise  

choose、when、 otherwise相当于if...else if..else 
when至少设置一个，otherwise至多设置一个
只要有一个条件成立，下面的条件就都不判断了

```xml
<!--List<Emp> getEmpByChoose(Emp emp);-->
<select id="getEmpByChoose" resultType="Emp">
    select * from t_emp
    <where>
        <choose>
            <when test="empName != null and empName != ''">
                emp_name =#{empName}
            </when>
            <when test="age != null and age != ''">
                age = #{age}
            </when>
            <when test="gender != null and gender != ''">
                gender = #{gender}
            </when>
        </choose>
    </where>
</select>
```

### 9.3、foreach  

foreach：
	collection：设置要循环的数组或集合（一般通过java代码中的@Param()注解获取）
	item：用一个字符串表示数组或集合中的每一个数据
	separator：设置每次循环的数据之间的分隔符
	open：循环的所有内容以什么开始
	close：循环的所有内容以什么结束

```xml
<!--void deleteMoreEmp(@Param("empIds") Integer[] empIds);-->
<delete id="deleteMoreEmp">
    
    <!--delete from t_emp where emp_id in
        <foreach collection="empIds" item="empId" separator="," open="(" close=")">
            #{empId}
        </foreach>-->
    delete from t_emp where
    <foreach collection="empIds" item="empId" separator="or">
        emp_id = #{empId}
    </foreach>
</delete>
```

### 9.4、SQL片段  

sql片段：可以记录一段sql，在需要用的地方**使用include标签进行引用**

```xml
<sql id="empColumns">
	emp_id,emp_name,age,gender,dept_id
</sql>

<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
    <!--引用sql标签-->
    select <include refid="empColumns"></include> from t_emp
    <trim prefix="where" suffixOverrides="and">
        <if test="empName != null and empName != ''">
            emp_name = #{empName} and
        </if>
        <if test="age != null and age != ''">
            and age = #{age} and
        </if>
        <if test="gender != null and gender != ''">
            gender = #{gender}
        </if>
    </trim>
</select>
```

## 10、MyBatis缓存

### 10.1、MyBatis的一级缓存  

**一级缓存是默认开启的**

MyBatis的一级缓存是SqlSession级别的，即通过同一个SqlSession查询的数据会被缓存，下次查询相同的数据，就会从缓存中直接获取，不会从数据库重新访问  

使一级缓存失效的四种情况：  
1、不同的SqlSession对应不同的一级缓存
2、同一个SqlSession但是查询条件不同
3、同一个SqlSession两次查询期间执行了任何一次增删改操作
4、同一个SqlSession两次查询期间手动清空了缓存  

### 10.2、MyBatis的二级缓存  

二级缓存是**SqlSessionFactory级别**，通过**同一个SqlSessionFactory创建的SqlSession查询的结果会被缓存**；此后若再次执行相同的查询语句，结果就会从缓存中获取  

二级缓存开启的条件：  
1、在核心配置文件中，设置全局配置属性cacheEnabled="true"，默认为true，不需要设置
2、在**映射文件中设置标签\<cache/>**
3、二级缓存必须在**SqlSession关闭或提交之后有效**
4、查询的数据所转换的实体类类型**必须实现序列化的接口**
使二级缓存失效的情况：
两次查询之间执行了任意的增删改，会使一级和二级缓存同时失效  

### 10.3、二级缓存的相关配置  

在mapper配置文件中添加的cache标签可以设置一些属性：

①eviction属性：
**缓存回收策略，默认的是 LRU。**
LRU（Least Recently Used） – 最近最少使用的：移除最长时间不被使用的对象。
FIFO（First in First out） – 先进先出：按对象进入缓存的顺序来移除它们。
SOFT – 软引用：移除基于垃圾回收器状态和软引用规则的对象。  
WEAK – 弱引用：更积极地移除基于垃圾收集器状态和弱引用规则的对象。  

②flushInterval属性：
刷新间隔，单位毫秒默认情况是不设置，也就是没有刷新间隔，缓存仅仅调用语句时刷新  

③size属性：
引用数目，正整数代表缓存最多可以存储多少个对象，太大容易导致内存溢出  

④readOnly属性：只读， true/false
true：只读缓存；会给所有调用者返回缓存对象的相同实例。因此这些对象不能被修改。这提供了很重要的性能优势。
false：读写缓存；会返回缓存对象的拷贝（通过序列化）。这会慢一些，但是安全，因此默认是false。  

### 10.4、MyBatis缓存查询的顺序  

先查询二级缓存，因为二级缓存中可能会有其他程序已经查出来的数据，可以拿来直接使用。
如果二级缓存没有命中，再查询一级缓存
如果一级缓存也没有命中，则查询数据库
SqlSession关闭之后，一级缓存中的数据会写入二级缓存  

### 10.5、整合第三方缓存EHCache  

**第三方缓存针对二级缓存**

#### 10.5.1、添加依赖  

```xml
<!-- Mybatis EHCache整合包 -->
<dependency>
	<groupId>org.mybatis.caches</groupId>
	<artifactId>mybatis-ehcache</artifactId>
	<version>1.2.1</version>
</dependency>
<!-- slf4j日志门面的一个具体实现 -->
<dependency>
	<groupId>ch.qos.logback</groupId>
	<artifactId>logback-classic</artifactId>
	<version>1.2.3</version>
</dependency>
```

#### 10.5.2、各jar包功能  

![image-20230103154950209](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230103154950209.png)

#### 10.5.3、创建EHCache的配置文件ehcache.xml  

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="../config/ehcache.xsd">
    <!-- 磁盘保存路径 -->
    <diskStore path="D:\atguigu\ehcache"/>
    <defaultCache
            maxElementsInMemory="1000"
            maxElementsOnDisk="10000000"
            eternal="false"
            overflowToDisk="true"
            timeToIdleSeconds="120"
            timeToLiveSeconds="120"
            diskExpiryThreadIntervalSeconds="120"
            memoryStoreEvictionPolicy="LRU">
    </defaultCache>
</ehcache>
```

#### 10.5.4、设置二级缓存的类型  

```xml
<cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
```

#### 10.5.5、加入logback日志  

存在SLF4J时，作为简易日志的log4j将失效，此时我们**需要借助SLF4J的具体实现logback来打印日志**。 创建logback的配置文件**logback.xml  **

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="true">
    <!-- 指定日志输出的位置 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <!-- 日志输出的格式 -->
            <!-- 按照顺序分别是： 时间、日志级别、线程名称、打印日志的类、日志主体内容、换行
            -->
            <pattern>[%d{HH:mm:ss.SSS}] [%-5level] [%thread] [%logger]
                [%msg]%n</pattern>
        </encoder>
    </appender>
    <!-- 设置全局日志级别。日志级别按顺序分别是： DEBUG、INFO、WARN、ERROR -->
    <!-- 指定任何一个日志级别都只打印当前级别和后面级别的日志。 -->
    <root level="DEBUG">
        <!-- 指定打印日志的appender，这里通过“STDOUT”引用了前面配置的appender -->
        <appender-ref ref="STDOUT" />
    </root>
    <!-- 根据特殊需求指定局部日志级别 -->
    <logger name="com.atguigu.crowd.mapper" level="DEBUG"/>
</configuration>
```

#### 10.5.6、EHCache配置文件说明  

![image-20230103155446316](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230103155446316.png)

## 11、MyBatis的逆向工程  

正向工程：先创建Java实体类，由框架负责根据实体类生成数据库表。 Hibernate是支持正向工程的。  

逆向工程：**先创建数据库表**，由框架负责根据数据库表，**反向生成**如下资源：  
**Java实体类、Mapper接口、Mapper映射文件 **

### 11.1、创建逆向工程的步骤  

#### ①添加依赖和插件  

```xml
<!-- 依赖MyBatis核心包 -->
<dependencies>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.7</version>
    </dependency>
    <!-- junit测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <!-- log4j日志 -->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.16</version>
    </dependency>
</dependencies>
<!-- 控制Maven在构建过程中相关配置 -->
<build>
    <!-- 构建过程中用到的插件 -->
    <plugins>
        <!-- 具体插件，逆向工程的操作是以构建过程中插件形式出现的 -->
        <plugin>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-maven-plugin</artifactId>
            <version>1.3.0</version>
            <!-- 插件的依赖 -->
            <dependencies>
                <!-- 逆向工程的核心依赖 -->
                <dependency>
                    <groupId>org.mybatis.generator</groupId>
                    <artifactId>mybatis-generator-core</artifactId>
                    <version>1.3.2</version>
                </dependency>
                <!-- MySQL驱动 -->
                <dependency>
                    <groupId>mysql</groupId>
                    <artifactId>mysql-connector-java</artifactId>
                    <version>8.0.16</version>
                </dependency>
            </dependencies>
        </plugin>
    </plugins>
    </build>
```

#### ②创建MyBatis的核心配置文件  

#### ③创建逆向工程的配置文件  

**文件名必须是：generatorConfig.xml  **

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!--
    targetRuntime: 执行生成的逆向工程的版本
    MyBatis3Simple: 生成基本的CRUD（清新简洁版）
    MyBatis3: 生成带条件的CRUD（奢华尊享版）
    -->
    <context id="DB2Tables" targetRuntime="MyBatis3">
        <!-- 数据库的连接信息 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/ssm?serverTimezone=UTC"
                        userId="root"
                        password="root">
        </jdbcConnection>
        <!-- javaBean的生成策略-->
        <javaModelGenerator targetPackage="com.atguigu.mybatis.pojo"
                            targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
            <property name="trimStrings" value="true" />
        </javaModelGenerator>
        <!-- SQL映射文件的生成策略 -->
        <sqlMapGenerator targetPackage="com.atguigu.mybatis.mapper"
                         targetProject=".\src\main\resources">
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>
        <!-- Mapper接口的生成策略 -->
        <javaClientGenerator type="XMLMAPPER"
                             targetPackage="com.atguigu.mybatis.mapper" targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>
        <!-- 逆向分析的表 -->
        <!-- tableName设置为*号，可以对应所有表，此时不写domainObjectName -->
        <!-- domainObjectName属性指定生成出来的实体类的类名 -->
        <table tableName="t_emp" domainObjectName="Emp"/>
        <table tableName="t_dept" domainObjectName="Dept"/>
    </context>
</generatorConfiguration>
```

#### ④执行MBG插件的generate目标  

![image-20230103165027388](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230103165027389.png)

### 11.2、QBC查询  

```java
@Test
public void testMBG(){
    SqlSession sqlSession = SqlSessionUtil.getSqlSession();
    EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);

    //根据id查询数据
    /*Emp emp = mapper.selectByPrimaryKey(1);
    System.out.println(emp);*/

    //根据条件查询数据（查询所有数据）
    /*List<Emp> list = mapper.selectByExample(null);
    list.forEach(System.out::println);*/

    //根据条件查询数据
    /*EmpExample example = new EmpExample();
    example.createCriteria().andEmpNameEqualTo("张三").andAgeGreaterThan(20);
    example.or().andGenderEqualTo("男");
    List<Emp> list = mapper.selectByExample(example);
    list.forEach(System.out::println);*/

    Emp emp = new Emp(1,"小黑",null,"女",null);
    //测试普通修改功能
    /*mapper.updateByPrimaryKey(emp);*/

    //测试选择性修改
    mapper.updateByPrimaryKeySelective(emp); //如果属性为null不会修改该属性

}
```

## 12、分页插件  

分页思想：
limit index,pageSize 
pageSize：每页显示的条数  、pageNum：当前页的页码  
index：当前页的起始索引，index=(pageNum-1)*pageSize  
count：总记录数  、 totalPage：总页数
totalPage = count / pageSize;
`if(count % pageSize != 0){totalPage += 1;}`  

pageSize=4，pageNum=1，index=0 limit 0,4
pageSize=4，pageNum=3，index=8 limit 8,4
pageSize=4，pageNum=6，index=20 limit 8,4  

效果：首页 上一页 2 3 4 5 6 下一页 末页  

### 12.1、分页插件的使用步骤  

#### ①添加依赖  

```xml
<dependency>
	<groupId>com.github.pagehelper</groupId>
	<artifactId>pagehelper</artifactId>
	<version>5.2.0</version>
</dependency>
```

#### ②配置分页插件  

在MyBatis的核心配置文件中配置插件

```xml
<plugins>
	<!--设置分页插件-->
	<plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
</plugins>
```

### 12.2、分页插件的使用  

```java
@Test
public void testPage(){
    SqlSession sqlSession = SqlSessionUtil.getSqlSession();
    EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);
    //查询功能之前开启分页功能
    Page<Object> page = PageHelper.startPage(3, 4);
    List<Emp> list = mapper.selectByExample(null);
    //查询功能之后可以获取分页相关的所有数据
    PageInfo<Emp> pageInfo = new PageInfo<>(list,5); //中间显示的页码数
    list.forEach(System.out::println);
    System.out.println(pageInfo);
}
```

1、查询功能之前使用**PageHelper.startPage(int pageNum, int pageSize)开启分页功能 **
pageNum：当前页的页码  
pageSize：每页显示的条数  

2、在查询获取list集合之后，使用`PageInfo<T> pageInfo = new PageInfo<>(List<T> list, intnavigatePages)`获取分页相关数据  
list：分页之后的数据  
navigatePages：导航分页的页码数 

3、分页相关数据  
pageNum：当前页的页码
pageSize：每页显示的条数
size：当前页显示的真实条数
total：总记录数
pages：总页数
prePage：上一页的页码
nextPage：下一页的页码
isFirstPage/isLastPage：是否为第一页/最后一页
hasPreviousPage/hasNextPage：是否存在上一页/下一页
navigatePages：导航分页的页码数
navigatepageNums：导航分页的页码，[1,2,3,4,5]  
