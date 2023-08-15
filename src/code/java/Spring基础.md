---
title: Spring 基础
icon: leaf
order: 6
category: 
    - java
tag: 
    - Spring
    - java
---

## 1、Sprin5框架概述

1、 Spring 是**轻量级**的**开源**的 JavaEE 框架 
2、 Spring 可以解决企业应用开发的复杂性 
3、 Spring 有两个核心部分： IOC 和 Aop 
**（1） IOC：控制反转，把创建对象过程交给 Spring 进行管理** 
<!-- more -->
**（2）Aop：面向切面，不修改源代码进行功能增强**
4、 Spring 特点
（1）**方便解耦，简化开发** 
（2） **Aop 编程支持** 
（3）**方便程序测试** 
（4）**方便和其他框架进行整合** 
（5）**方便进行事务操作** 
（6）**降低 API 开发难度**
5、现在课程中，选取 Spring 版本 5.x

## 2、Spring的下载与使用

Spring下载地址：https://repo.spring.io/release/org/springframework/spring/

### 1、简单使用

#### 1、新建项目

#### 2、导入相关jar包

![image-20221107194510137]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221107194510137.png)

#### 3、创建普通类，在这个类创建普通方法

```java
public class User {
    public void add(){
        System.out.println("add...");
    }
}
```

#### 4、创建 Spring 配置文件，在配置文件配置创建的对象

**Spring 配置文件使用 xml 格式**

![image-20221107195317174]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221107195317174.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--配置User对象创建-->
    <bean id="user" class="spring5.User"></bean>
</beans>
```

#### 5、进行测试代码编写

```java
public class TestSpring5 {
    @Test
    public void testAdd(){
        //1、加载Spring的配置文件
        ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
        //2、获取配置创建的对象
        User user = context.getBean("user", User.class);
        System.out.println(user);
        user.add();
    }
}
```

## 3、IOC（概念和原理）  

### 1、什么是 IOC 

（1）控制反转，把**对象创建**和**对象之间的调用过程**，**交给 Spring 进行管理 **
（2）使用 IOC **目的**：为了**耦合度降低 **
（3）做入门案例就是 IOC 实现

### 2、IOC底层原理

 xml 解析、工厂模式、反射

IOC过程：
第一步：xml配置文件，配置创建的对象

```xml
<bean id="dao" class="UserDAO"></bean>
```

第二步：有service类和dao类，创建工厂类

```java
class UserFactory{
    public static UserDao getDao(){
        String classValue = class属性值; //1、xml解析，得到xml文件中class的值
        //通过反射创建对象
        Class clazz = Class.forName(classValue);//2 通过反射创建对象
        return UserDAO(clazz.newInstance());
    }
}
```

### 3、IOC（ BeanFactory 接口）  

1、 IOC 思想基于 IOC 容器完成， **IOC 容器底层就是对象工厂 **
2、 Spring 提供 IOC 容器实现两种方式：（两个接口） 
（1） **BeanFactory**： IOC 容器基本实现，是 Spring 内部的使用接口，不提供开发人员进行使用 * **加载配置文件时候不会创建对象，在获取对象（使用）才去创建对象 **
（2） **ApplicationContext**： ==BeanFactory 接口的子接口，提供更多更强大的功能，一般由开发人 员进行使用 * 加载配置文件时候就会把在配置文件对象进行创建==
3、 ApplicationContext 接口有两个主要的实现类
![image-20221108134930944]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221108134930944.png)

通常用**ClassPathXmlApplication**，通过**类路径（当前文件夹）**访问xml文件，而FileSystemXmlAppliaction通过文件系统访问，不常用。

## 4、IOC操作Bean管理（基于xml文件）

### 1、什么是bean管理

Bean 管理指的是两个操作 
（1） Spring 创建对象 
（2） Spirng 注入属性

### 2、Bean管理操作有两种实现方式

（1）基于 xml 配置文件方式实现
（2）基于注解方式实现

### 3、基于xml配置文件方式实现

#### 1、基于xml方式创建对象

![image-20221109115835509]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221109115835509.png)

（1）在spring配置文件中使用bean标签，标签里添加对应的属性，可以实现对象的创建
（2）在bean标签有横队属性，介绍常用的属性
		id 属性：唯一标识 
		class 属性：类全路径（包类路径）
（3）创建对象时候，默认也是执行无参数构造方法完成对象创建

#### 2、基于xml方式注入属性	

**DI：依赖注入，就是注入属性**

##### 1、第一种注入方式：使用set方式进行注入

（1）创建类，定义属性和对应的 set 方法

```java
public class Book {
    //创建属性
    private String bname;
    private String bauthor;

    //属性的set方法
    public void setBname(String bname) {
        this.bname = bname;
    }

    public void setBauthor(String bauthor) {
        this.bauthor = bauthor;
    }
}
```

（2）在 spring 配置文件配置对象创建，配置属性注入

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--set方式注入属性-->
    <bean id="book" class="spring5.Book">
        <!--使用property完成属性注入
            name：属性名称
            value：属性值
        -->
        <property name="bname" value="A书"></property>
        <property name="bauthor" value="AA"></property>
    </bean>
</beans>
```



##### 2、第二种注入方式：使用有参构造进行注入

（1）创建类，定义属性，创建对应有参数的构造方法

```java
public class Orders {
    private String oname;
    private String adders;

    public Orders(String oname, String adders) {
        this.oname = oname;
        this.adders = adders;
    }
}
```

（2）在spring配置文件中进行配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--有参构造器中注入属性-->
    <bean id="orders" class="spring5.Orders">
        <constructor-arg name="oname" value="BB"></constructor-arg>
        <constructor-arg name="adders" value="China"></constructor-arg>
    </bean>
</beans>
```

#### 3、p名称空间注入（了解）

（1）使用p名称空间，可以简化基于xml配置方式

第一步：添加p名称空间咋配置文件中

![image-20221109140816544]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221109140816544.png)

第二步：进行属性注入，在 bean 标签里面进行操作

```xml
<!--2 set 方法注入属性--> 
<bean id="book" class="spring5.Book" p:bname="B书" p:bauthor="BB">
 </bean>
```

### 4、xml 注入其他类型属性

#### 1、字面量

（1） null 值

```xml
<bean id="book" class="spring5.Book">
    <property name="address">
        <null></null>
    </property>
</bean>
```

（2）属性值包含特殊符号 

```xml
<!--属性值包含特殊符号
1 把<>进行转义 &lt; &gt;
2 把带特殊符号内容写到 CDATA
-->
<property name="address">
	<value><![CDATA[<<南京>>]]></value>
</property>
```

### 5、注入属性-外部 bean

（1）创建两个类service类和dao类
（2）在service里调用dao的方法
（3）在Spring配置文件中进行配置

```java
public interface UserDao {
    void update();
}

public class UserDaoImpl implements UserDao{
    @Override
    public void update() {
        System.out.println("update");
    }
}

public class UserService {
    //创建UserDao类型的属性，生成set方法
    UserDao userDao = null;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void add(){
        System.out.println("service add");
        userDao.update();
    }
}
```

```xml
<bean id="userService" class="spring5.service.UserService">
    <!--注入userDao的对象
        name属性值：类里面属性名称
        ref属性：创建userDao对象bean标签id值
    -->
    <property name="userDao" ref="userDaoImpl"></property>
</bean>
<bean id="userDaoImpl" class="spring5.dao.UserDaoImpl"></bean>
```

### 6、注入属性-内部bean和级联赋值

（1）一对多关系：
		部门和员工 一个部门有多个员工，一个员工属于一个部门 部门是一，员工是多 
（2）在实体类之间表示一对多关系，**员工表示所属部门，使用对象类型属性进行表示**

```java
//部门类
public class Dept {
    private String dname;

    public void setDname(String dname) {
        this.dname = dname;
    }
}

//员工类
public class Emp {
    private String ename;
    private String gender;

    //员工属于某一个部门
    private Dept dept;

    public void setDept(Dept dept) {
        this.dept = dept;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
```

（3）在 spring 配置文件中进行配置

```xml
<bean id="emp" class="spring5.bean.Emp">
    <!--设置两个普通属性-->
    <property name="ename" value="lucy"></property>
    <property name="gender" value="女"></property>
    <!--设置对象类型属性-->
    <property name="dept">
        <bean id="dept" class="spring5.bean.Dept">
            <property name="dname" value="安保部"></property>
        </bean>
    </property>
</bean>
```

### 7、注入属性-级联赋值

第一种写法：

```xml
<!--级联赋值-->
<bean id="emp" class="spring5.bean.Emp">
    <!--设置两个普通属性-->
    <property name="ename" value="lucy"></property>
    <property name="gender" value="女"></property>
    <!--级联赋值-->
    <property name="dept" ref="dept"></property>
</bean>
<bean id="dept" class="spring5.bean.Dept">
    <property name="dname" value="财务部"></property>
</bean>
```

第二种写法：

```xml
<bean id="emp" class="spring5.bean.Emp">
    <!--设置两个普通属性-->
    <property name="ename" value="lucy"></property>
    <property name="gender" value="女"></property>
    <!--级联赋值-->
    <property name="dept" ref="dept"></property>
    <property name="dept.dname" value="技术部"></property> <!--dept中应有对应的get方法，获取对象对其属性复赋值-->
</bean>
<bean id="dept" class="spring5.bean.Dept">
    <property name="dname" value="财务部"></property>
</bean>
```

### 8、xml注入集合属性

#### 1、注入数组，List集合，Map集合类型属性

（1）创建类

```java
public class Stu {
    //1 数组类型属性
    private String[] course;
    //2、list集合类型属性
    private List<String> list;
    //3、map集合类型属性
    private Map<String,String> maps;
    //4、set集合类型属性
    private Set<String> sets;

    public void setCourse(String[] course) {
        this.course = course;
    }
    public void setList(List<String> list) {
        this.list = list;
    }
    public void setMaps(Map<String, String> maps) {
        this.maps = maps;
    }
    public void setSets(Set<String> sets) {
        this.sets = sets;
    }
}
```

（2）在spring配置文件进行配置

```xml
<!--1、集合类型属性的注入-->
<bean id="stu" class="spring5.collectiontype.Stu">
    <!--数组属性注入-->
    <property name="course">
        <array>
            <value>java</value>
            <value>数据库</value>
        </array>
    </property>
    <!--list属性注入-->
    <property name="list">
        <list>
            <value>java</value>
            <value>数据库</value>
        </list>
    </property>
    <!--map属性注入-->
    <property name="maps">
        <map>
            <entry key="JAVA" value="java"></entry>
            <entry key="PHO" value="php"></entry>
        </map>
    </property>
    <!--set属性注入-->
    <property name="sets">
        <set>
            <value>MySQL</value>
            <value>Redis</value>
        </set>
    </property>
</bean>
```

#### 2、在集合里面设置对象类型值

```xml
<!--创建多个course对象-->
<bean id="course1" class="spring5.collectiontype.Course">
    <property name="cname" value="Spring框架"></property>
</bean>
<bean id="course2" class="spring5.collectiontype.Course">
    <property name="cname" value="MyBatis框架"></property>
</bean>
<bean>
    <!--注入list集合类型，值是对象-->
	<property name="coursesList">
        <list>
            <ref bean="course1"></ref>
            <ref bean="course2"></ref>
        </list>
    </property>
</bean>
```

#### 3、把集合注入部分提取出来

（1）在spring配置文件中引入名称空间 util

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/util http://www.springframework.org/schema/beans/spring-beans.xsd">
```

（2）使用util标签完成lsit集合注入提取

```xml
<!--1、提取list集合类型属性注入-->
<util:list id="bookList">
    <value>book1</value>
    <value>book2</value>
    <value>book3</value>
</util:list>

<!--2、提取list集合类型属性注入使用-->
<bean id="book" class="spring5.collectiontype.Book">
    <property name="list" ref="bookList"></property>
</bean>
```

### 9、FactoryBean

1、 Spring 有两种类型 bean，一种 **普通 bean**，另外一种 **工厂 bean**（FactoryBean）
		普通 bean：在配置文件中定义 bean 类型就是返回类型
		工厂bean：在配置文件定义bean类型可以和返回类型不一样

2、工厂bean的使用
第一步 创建类，让这个类作为工厂 bean，实现接口 FactoryBean 
第二步 实现接口里面的方法，在实现的方法中定义返回的 bean 类型

```java
public class MyBean implements FactoryBean<Course> {
    //定义返回bean
    @Override
    public Course getObject() throws Exception {
        Course course = new Course();
        course.setCname("abc");
        return course;
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }
}
```

```xml
<bean id="myBean" class="spring5.factorybean.MyBean"></bean>
```

```java
public void testCollection3(){
    ApplicationContext context = new ClassPathXmlApplicationContext("bean3.xml");
    Course myBean = context.getBean("myBean", Course.class);
    System.out.println(myBean);
}
```

### 10、bean作用域

1、在Spring里，设置创建bean实例是单实例还是多实例（同一个对象还是每次都创建新的对象）

2、在Spring里，默认情况下，bean是单实例对象

![image-20221112103808752]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221112103808752.png)

3、如何设置单实例还是多实例

（1）在 spring 配置文件 bean 标签里面有属性（**scope**）用于设置单实例还是多实例
（2） scope 属性值 第一个值 默认值，**singleton**，表示是单实例对象 第二个值 **prototype**，表示是多实例对象

![image-20221112104043739]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221112104043739.png)

（3） singleton 和 prototype 区别 
1、singleton 单实例， prototype 多实例 
2、  设置 scope 值是 **singleton** 时候，**加载 spring 配置文件时候就会创建单实例对象**
		设置 scope 值是 **prototype** 时候，不是在加载 spring 配置文件时候创建对象，在 **调用 getBean 方法时候创建多实例对象** 

### 11、bean生命周期

1、生命周期：从对象创建到对象销毁的过程

2、 bean 生命周期 
（1）通过构造器**创建bean 实例**（无参数构造） 
（2）为 bean 的**属性设置**值和对其他 bean 引用（调用 set 方法） 
（3）调用**bean的初始化**的方法（需要进行配置初始化的方法） 
（4） bean 可以使用了（对象获取到了） 
（5）当**容器关闭**时候，调用**bean的销毁**的方法（需要进行配置销毁的方法）

3、演示bean生命周期

```java
public class Orders {
    //无参构造器
    public Orders() {
        System.out.println("第一步，执行无参构造器创建bean实例");
    }
    private String oname;
    public void setOname(String oname) {
        this.oname = oname;
        System.out.println("第二步，调用set方法设置属性值");
    }
    //创建执行的初始化方法
    public void initMethod(){
        System.out.println("第三步 执行初始化方法");
    }
    //创建执行的销毁方法
    public void destoryMeghod(){
        System.out.println("第五步 执行销毁方法");
    }
}
```

```xml
<bean id="orders" class="spring5.bean.Orders" init-method="initMethod" destroy-method="destoryMeghod">
	<property name="oname" value="手机" >
	</property>
</bean>
```

```java
@Test
public void testBean3(){
    //ApplicationContext context = new ClassPathXmlApplicationContext("bean4.xml");
    ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("bean4.xml");
    Orders orders = context.getBean("orders", Orders.class);
    System.out.println("获取创建bean实例对象");
    System.out.println(orders);

    //手动执行销毁的方法
    context.close();
}
```

4、bean的后置处理器

**添加后置处理器后**，bean的生命周期为7步

（1）通过构造器**创建bean 实例**（无参数构造） 
（2）为 bean 的**属性设置**值和对其他 bean 引用（调用 set 方法） 
（3）把bean的实例传递给bean后置处理器的方法 **postProcessBeforeInitialization**
（4）调用**bean的初始化**的方法（需要进行配置初始化的方法） 
（5）把bean的实例传递给bean后置处理器的方法 **postProcessAfterInitialization**
（6） bean 可以使用了（对象获取到了） 
（7）当**容器关闭**时候，调用**bean的销毁**的方法（需要进行配置销毁的方法）

5、演示添加后置处理器的效果
（1）创建类，实现接口 BeanPostProcessor，创建后置处理器

```java
public class MyBeanPost implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在初始化之前执行的方法");
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在初始化之后执行的方法");
        return bean;
    }
}
```

（2）配置后置处理器

```xml
<bean id="orders" class="spring5.bean.Orders" init-method="initMethod" destroy-method="destoryMeghod">
    <property name="oname" value="手机" ></property>
</bean>
<!--配置后置处理器-->
<!--之前创建的bean会全丢到后置处理器中-->
<bean id="myBeanPost" class="spring5.bean.MyBeanPost"></bean>
```

### 12、XML自动装配

1、什么是自动装配 
	（1）根据指定装配规则（属性名称或者属性类型），Spring 自动将匹配的属性值进行注入
2、演示自动装配的过程
（1）根据属性名称自动注入

```xml
<!--实现自动装配
    bean标签属性autowire，配置自动装配
    autowire属性常用两个值：
        byName根据属性名称注入，注入值bean的id值和类中属性名称一样
        byType根据属性类型注入
-->
<bean id="emp" class="spring5.autowire.Emp" autowire="byName">
    <!--<property name="dept" ref="dept"></property>-->
</bean>
<bean id="dept" class="spring5.autowire.Dept"></bean>
```

```java
public class Emp {
    private Dept dept;

    public void setDept(Dept dept) {
        this.dept = dept;
    }

    @Override
    public String toString() {
        return "Emp{" +
                "dept=" + dept +
                '}';
    }
    public void test(){
        System.out.println(dept);
    }
}
```

（2）根据属性类型自动注入

```xml
<bean id="emp" class="spring5.autowire.Emp" autowire="byType">
    <!--<property name="dept" ref="dept"></property>-->
</bean>
<bean id="dept" class="spring5.autowire.Dept"></bean>
```

### 13、外部属性文件

1、直接配置数据库信息
（1）配置德鲁伊连接池
（2）引入德鲁伊连接池依赖jar包

```xml
<!--直接配置连接池-->
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
    <property name="url" value="jdbc:mysql://localhost:3306/atguigudb"></property>
    <property name="username" value="root"></property>
    <property name="password" value="root"></property>
</bean>
```

2、引入外部属性文件配置数据库连接池

（1）创建外部属性文件，properties格式文件，写数据库信息

```properties
prop.driverClass=com.mysql.jdbc.Driver
prop.url=jdbc:mysql://localhost:3306/atguigudb
prop.userName=root
prop.password=root
```

（2）把外部properties属性文件引入到spring配置文件中

引入context名称空间

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
</beans>
```

在spring配置文件使用标签引入外部属性文件

```xml
 <!--引入外部属性文件-->
<context:property-placeholder location="classpath:jdbc.properties" />
<!--配置连接池-->
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="${prop.driverClass}"></property>
    <property name="url" value="${prop.url}"></property>
    <property name="username" value="${prop.userName}"></property>
    <property name="password" value="${prop.password}"></property>
</bean>
```

## 5、IOC操作Bean管理（基于注解方式）

### 1、什么是注解

（1）注解是代码特殊标记，格式： **@注解名称(属性名称=属性值, 属性名称=属性值..) **
（2）使用注解，**注解作用在类上面，方法上面，属性上面 **
（3）使用注解目的：简化 xml 配置

### 2、Spring针对Bean管理中创建对象提供注解

**（1）@Compnent
（2）@Service
（3）@Controller
（4）@Repository**

**上面四个注解功能是一样的，都可以用来创建bean实例**

### 3、基于注解方式实现对象创建

#### 第一步 引入依赖

#### 第二步  开启组件扫描

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <!--开启组件扫描
        1、如果扫描多个包，多个包使用逗号隔开
        2、扫描包上层目录
        -->
    <context:component-scan base-package="spring5" />
</beans>
```

#### 第三步 创建类，在类上添加创建对象注解

```java
//在注解里面，value属性值可以省略不写，
//默认值是类名称的首字母小写 即（UserService --- userService）
@Component(value = "userService") //<bean id="userService" class=".." />
public class UserService {
    public void add(){
        System.out.println("service add...");
    }
}
```

```java
@Test
public void testCollection(){
    ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
    UserService userService = context.getBean("userService", UserService.class);
    System.out.println(userService);
    userService.add();
}
```

### 4、开启组件扫描细节配置

```xml
<!--spring扫描例子-->
<!--
use-default-filters="false" 表示现在不使用默认filter，自己配置filter
context:include-filter 设置扫描哪些内容
-->
<context:component-scan base-package="com.atguigu.springmvc" use-default-filters="false">
	<context:include-filter type="annotation"
           expression="org.springframework.stereotype.Controller"/> <!--表示只扫描带Controller注解的类-->
</context:component-scan>

<!--
下面配置扫描包括所有内容
context:exclude-filter 设置哪些内容不进行扫描
-->
<context:component-scan base-package="com.atguigu.springmvc">
	<context:exclude-filter type="annotation"
        	expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
```

### 5、基于注解方式实现属性注入

（1） **@Autowired：根据属性类型进行自动装配**
第一步：把service和dao对象创建，在service和dao类添加创建对象注解
第二步：在service注入dao对象，在service类添加dao类型属性，在属性上面使用注解

```java
public interface UserDao{
    public void add();
}

@Repository
public class UserDaoImpl implements UserDao{
    @Override
    public void add() {
        System.out.println("dao add ...");
    }
}

@Service
public class UserService{

    //定义dao类型属性
    //不需要添加set方法
    //添加注入属性注解
    @Autowired //根据类型进行注入
    private UserDao userDao;

    public void add(){
        System.out.println("service add...");
        userDao.add();
    }
}
```

（2）**@Qualifier：根据名称进行注入
@Qualifier注解的使用，和上面的@Autowired一起使用**

```java
@Repository(value = "userDaoImpl1") //一个类有多个对象
public class UserDaoImpl implements UserDao {
    @Override
    public void add() {
        System.out.println("dao add ...");
    }
}

@Service
public class UserService{

    //定义dao类型属性
    //不需要添加set方法
    //添加注入属性注解
    @Autowired //根据类型进行注入
    @Qualifier(value = "userDaoImpl1") //根据名称进行注入
    private UserDao userDao;

    public void add(){
        System.out.println("service add...");
        userDao.add();
    }
```

（3） **@Resource：可以根据类型注入，可以根据名称注入**

```java
@Service
public class UserService{

    //定义dao类型属性
    //不需要添加set方法
    //添加注入属性注解
    
    //@Resource //根据类型进行注入
    @Resource(name = "userDaoImpl1") //根据名称注入
    private UserDao userDao;

    public void add(){
        System.out.println("service add...");
        userDao.add();
    }
}
```

（4） **@Value：注入普通类型属性**

```java
@Value(value = "abc")
private String
```

### 6、完全注解开发

（1）创建配置类，替代xml配置文件

```java
@Configurable //作为配置类，替代xml配置文件
@ComponentScan(basePackages = "spring5")
public class SpringConfig {

}
```

（2）编写测试类

```java
@Test
    public void testCollection2(){
        //加载配置类
        ApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);//参数填写自己建的配置类
        UserService userService = context.getBean("userService", UserService.class);
        System.out.println(userService);
        userService.add();
    }
```

## 6、AOP

### 1、AOP相关概念

（1）面向切面编程（方面）， 利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得 业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。 
（2）通俗描述：不通过修改源代码方式，在主干功能里面添加新功能 
（3）使用登录例子说明 AOP

![image-20221116143148275]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221116143148275.png)



### 2、AOP底层原理（动态代理）

AOP底层使用动态代理

#### 1、有两种情况动态代理

**第一种 有接口情况，使用 JDK 动态代理**

![image-20221116145007186]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221116145007186.png)

**第二种 没有接口情况，使用 CGLIB 动态代理**

![image-20221116145816875]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221116145816875.png)

### 3、AOP（JDK动态代理）

1、使用JDK动态代理，使用Proxy类里面的方法创建代理对象

![image-20221116191550153]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221116191550153.png)

（1）**调用 newProxyInstance 方法**

![image-20221116191615418]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221116191615418.png)

**方法有三个参数：**
**第一个参数：类加载器**
**第二个参数：增强方法所在的类，这个类实现的接口，支持多个接口**
**第三个参数：实现这个接口InvocationHandler，创建代理对象，写增强的部分**

2、编写JDK动态代理代码

（1）创建接口，定义方法

```java
public interface UserDao {
    public int add(int a,int b);
    public String update(String id);
}
```

（2）创建接口实现类，实现方法

```java
public class UserDaoImpl implements UserDao{
    @Override
    public int add(int a, int b) {
        return a + b;
    }
    @Override
    public String update(String id) {
        return id;
    }
}
```

（3）使用Proxy类创建代理对象

```java
public class JDKProxy {
    public static void main(String[] args) {
        //创建实现类的代理对象
        Class[] interfaces = {UserDao.class};
//        Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new InvocationHandler() {
//            @Override
//            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
//                return null;
//            }
//        })
        UserDaoImpl userDao = new UserDaoImpl();
        UserDao dao = (UserDao) Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new UserDaoProxy(userDao));
        int res = dao.add(1, 2);
        System.out.println("res："+res);
    }
}

//创建代理对象代码
class UserDaoProxy implements InvocationHandler {
    //1、把创建的是谁的代理对象，把谁传递过来
    //有参数构造传递
    private Object obj;
    public UserDaoProxy(Object obj){
        this.obj = obj;
    }

    //增强的逻辑
    @Override
    public Object invoke(Object o, Method method, Object[] args) throws Throwable {
        //方法之前
        System.out.println("方法之前执行。。。" + method.getName() + ":传递的参数。。。" + Arrays.toString(args));

        //被增强的方法执行
        Object res = method.invoke(obj, args);

        //方法之后
        System.out.println("方法之后执行。。。" + obj);

        return res;
    }
}
```

### 4、AOP术语

1、连接点
类里面哪些方法可以被增强，这些方法称为连接点

2、切入点
实际被真正增强的方法，称为切入点

3、通知（增强）
（1）实际增强的逻辑的部分称为通知（增强）
（2）通知有多种类型
		前置通知
		后置通知
		环绕通知（前+后）
		异常通知
		最终通知（finally）

4、切面
是动作
（1）把通知应用到切入点过程

### 5、AOP操作（准备）

1、Spring框架一般基于AspectJ实现AOP操作
（1） AspectJ 不是 Spring 组成部分，它是独立的 AOP 框架，一般把 AspectJ 和 Spirng 框架一起使用，进行 AOP 操作

2、基于 AspectJ 实现 AOP 操作
（1）基于 xml 配置文件实现 
（2）基于注解方式实现（使用）

3、在项目工程里面引入AOP依赖

![image-20221117195034575]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221117195034575.png)

4、切入点表达式
（1）切入点表达式作用：知道对那个类里面的那个方法进行增强
（2）语法结构：
**execution([权限修饰符] [返回类型] [类全路径] \[方法名称\]([参数列表]) ) **
举例 1：对 com.atguigu.dao.BookDao 类里面的 add 进行增强 execution(* com.atguigu.dao.BookDao.add(..)) 
举例 2：对 com.atguigu.dao.BookDao 类里面的所有的方法进行增强 execution(* com.atguigu.dao.BookDao.* (..))
举例 3：对 com.atguigu.dao 包里面所有类，类里面所有方法进行增强 execution(* com.atguigu.dao.\*.\* (..))

### 6、AspectJ注解

#### 1、创建类，在类里面定义方法

```java
//被增强的类
public class User {
    public void add(){
        System.out.println("add...");
    }
}
```

#### 2、创建增强类（编写增强逻辑）

（1）在增强类里面创建方法，让不同方法代表不同通知类型

```java
//增强的类
public class UserProxy {
    
    //前置通知
    public void before(){
        System.out.println("before");
    }
}
```

#### 3、进行通知的配置

（1）在spring配置文件中，开启注解扫描

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--开启注解扫描-->
    <context:component-scan base-package="spring5.aopanno"></context:component-scan>
</beans>
```

（2）使用注解创建User和UserProxy对象

```java
@Component
//被增强的类
public class User {
    public void add(){
        System.out.println("add...");
    }
}

@Component
//增强的类
public class UserProxy {

    //前置通知
    public void before(){
        System.out.println("before");
    }
}
```

（3）在增强类上面添加注解@Aspect

```java
@Component
@Aspect  //生成代理对象
//增强的类
public class UserProxy {

    //前置通知
    public void before(){
        System.out.println("before");
    }
}
```

（4）在spring配置文件中开启生成代理对象

```xml
<!--开启注解扫描-->
<context:component-scan base-package="spring5.aopanno"></context:component-scan>

<!--开启Aspect生成代理对象-->
<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
```

#### 4、配置不同类型的通知

（1）在增强类里面，在作为通知方法上面添加通知类型注解，使用切入点表达式配置

```java
@Component
@Aspect  //生成代理对象
//增强的类
public class UserProxy {
    //前置通知
    //@Before注解表示作为前置通知
    @Before(value = "execution(* spring5.aopanno.User.add(..))")
    public void before(){
        System.out.println("before...");
    }

    //最终通知
    @After(value = "execution(* spring5.aopanno.User.add(..))")
    public void after(){
        System.out.println("after...");
    }

    //后置通知（返回通知）
    @AfterReturning(value = "execution(* spring5.aopanno.User.add(..))")
    public void afterReturning(){
        System.out.println("afterReturning...");
    }

    //异常通知
    @AfterThrowing(value = "execution(* spring5.aopanno.User.add(..))")
    public void afterThrowing(){
        System.out.println("afterThrowing...");
    }

    //环绕通知
    @Around(value = "execution(* spring5.aopanno.User.add(..))")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕之前...");

        //被增强的方法执行
        proceedingJoinPoint.proceed();

        System.out.println("环绕之后...");
    }
}
```

#### 5、相同切入点抽取

```java
//相同切入点抽取
@Pointcut(value = "execution(* spring5.aopanno.User.add(..))")
public void pointDemo(){}

//前置通知
//@Before注解表示作为前置通知
@Before(value = "pointDemo()")
public void before(){
    System.out.println("before...");
}
```

#### 6、增强优先级

有**多个增强类多同一个方法进行增强**，设置增强类优先级
（1）在增强类上面添加注解 @Order(数字类型值)，数字类型值越小优先级越高

```java
@Component 
@Aspect 
@Order(1) 
public class PersonProxy{
    //后置通知(返回通知)
    @Before(value = "execution(* spring5.aopanno.User.add(..))")
    public void before(){
        System.out.println("Person before...");
    }
}
```

#### 7、完全注解开发

创建配置类

```java
@Configuration //作为配置类，替代xml配置文件
@ComponentScan(basePackages = {"spring5"}) //开启注解扫描
@EnableAspectJAutoProxy(proxyTargetClass = true) //开启Aspect生成代理对象
public class ConfigAop {
}
```

### 7、AspectJ配置文件

#### 1、创建连个类，增强类和被增强类，创建方法

```java
public class Book {
    public void buy(){
        System.out.println("buy...");
    }
}

public class BookProxy {
    public void before(){
        System.out.println("before...");
    }
}
```

#### 2、在Spring配置文件中创建两个类的对象

```xml
<!--创建两个类的对象-->
<bean id="book" class="spring5.apoxml.Book"></bean>
<bean id="bookProxy" class="spring5.apoxml.BookProxy"></bean>
```

#### 3、在spring配置文件中配置切入点

```xml
<!--配置aop增强-->
    <aop:config>
        <!--切入点-->
        <aop:pointcut id="p" expression="execution(* spring5.apoxml.Book.buy(..))"/>
        <!--配置切面-->
        <aop:aspect ref="bookProxy">
            <!--增强作用在具体的方法上-->
            <aop:before method="before" pointcut-ref="p"/>
        </aop:aspect>
    </aop:config>
```

## 7、JdbcTemplate

### 1、什么是JdbcTemplate

（1）Spring框架对JDBC进行封装，使用 JdbcTemplate 方便实现对数据库操作

### 2、准备工作

（1）引入相关 jar 包

![image-20221119102945472]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221119102945472.png)

（2）在spring配置文件配置数据库连接池

```xml
<!-- 配置连接池 -->
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" destroy-method="close">
    <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"></property>
        <property name="url" value="jdbc:mysql://localhost:3306/test?characterEncoding=utf8&amp;useSSL=false&amp;serverTimezone=UTC&amp;rewriteBatchedStatements=true"></property>
    <property name="username" value="root"></property>
    <property name="password" value="root"></property>
</bean>
```

（3）配置JdbcTemplate对象，注入DataSource

```xml
<!--JdbcTemplate对象-->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <!--注入dataSource-->
    <property name="dataSource" ref="dataSource"></property>
</bean>
```

（4）创建service类，创建dao类，在dao注入jdbcTemplate对象

dao接口：对数据库的抽象方法
daoImpl类：对dao接口中方法的实现
service中：创建dao的对象，创建方法，内部调用dao子类的方法

配置文件中开启组件扫描

```xml
 <!--组件扫描-->
 <context:component-scan base-package="spring5"></context:component-scan>
```

Service中

```java
@Service
public class UserService {
    //注入dao
    @Autowired
    private UserDao userDao;
}
```

Dao中

```java
@Repository
public class UserDaoImpl implements UserDao{
    //注入JdbcTemplate
    @Autowired
    private JdbcTemplate jdbcTemplate;
}
```

### 3、JdbcTemplate操作数据库

#### 1、添加

1、对应数据库创建实体类

2、编写service和dao
（1）在dao进行数据库添加操作

```java
public interface UserDao {
    void add(User user);
}
```

（2）调用JdbcTemplate对象里的update方法实现添加操作

![image-20221119110350096]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221119110350096.png)

**有两个参数：
第一个参数：sql语句
第二个参数：可变参数，设置sql语句的值**

```java
@Repository
public class UserDaoImpl implements UserDao{

    //注入JdbcTemplate
    @Autowired
    private JdbcTemplate jdbcTemplate;

    //添加方法
    @Override
    public void add(User user) {
        //1、创建sql语句
        String sql = "insert into user values (?,?,?,?,?)";
        //2、调用方法实现
        Object[] args = {user.getId(), user.getName(), user.getPassword(), user.getAddress(), user.getPhone()};
        int update = jdbcTemplate.update(sql,args); //返回影响的行数
        System.out.println(update);
    }
}
```

3、测试类

```java
public class TestUser {
    @Test
    public void testJdbcTemplate(){
        ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
        UserService userService = context.getBean("userService", UserService.class);
        User user = new User();
        user.setId("8");
        user.setName("AB");
        user.setPassword("789456");
        user.setAddress("ShangHai");
        user.setPhone("12345678900");
        userService.addUser(user);
    }
}
```

#### 2、修改和删除

```java
//修改
@Override
public void updateUser(User user) {
    String sql = "update user set name = ? where id = ?";
    int update = jdbcTemplate.update(sql, user.getName(), user.getId());
    System.out.println(update);
}

//删除
@Override
public void delete(String id) {
    String sql = "delete from user where id = ?";
    int update = jdbcTemplate.update(sql, id);
    System.out.println(update);
}
```

#### 3、查询

##### 1、查询返回某个值

1、查询表里面有多少条记录，返回某个值
2、使用JdbcTemplate实现查询返回某个值代码
![image-20221119134145556]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221119134145556.png)

有两个参数：
（1）sql语句
（2）返回类型Class

##### 2、查询返回对象

1、场景：查询user详情
2、JdbcTemplate实现查询返回对象
![image-20221119134612167]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221119134612167.png)

有三个参数：
（1）sql语句
（2）RowMapper，是接口，返回不同类型数据，使用这个接口里面实现类完成数据封装
（3）sql语句值

##### 3、查询返回集合

1、场景：查询user列表分页
2、调用JdbcTemplate方法实现查询返回集合
![image-20221119140026889]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221119140026889.png)

有三个参数 
（1）sql 语句 
（2）RowMapper 是接口，针对返回不同类型数据，使用这个接口里面实现类完成 数据封装 
（3）sql 语句值（没有可以省略不写）

```java
//userDaoImpl中
//查询表记录数
@Override
public int selectCount() {
    String sql = "select count(*) from user";
    return jdbcTemplate.queryForObject(sql, Integer.class);
}

//查询返回对象
@Override
public User findUserInfo(String id) {
    String sql = "select * from user where id = ?";
    User user = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class), id);
    return user;
}

//查询返回集合
@Override
public List<User> findBookInfo() {
    String sql = "select * from user";
    List<User> query = jdbcTemplate.query(sql, new BeanPropertyRowMapper<User>(User.class));
    return query;
}
```

### 4、JdbcTemplate批量操作

1、批量操作：操作表里面多条记录
2、 JdbcTemplate 实现批量添加操作

有两个参数：
（1）sql语句
（2）List集合，添加多条记录数据

```java
//daoImpl中
//批量添加
@Override
public void batchAddUser(List<Object[]> batchArgs) {
    String sql = "insert into user values (?,?,?,?,?)";
    int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
}

//测试类中
//批量添加
List<Object[]> args = new ArrayList<>();
Object[] o1 = {"10","A","AA","DV","AS"};
Object[] o2 = {"11","B","AA","VD","sA"};
Object[] o3 = {"13","C","AA","",""};
args.add(o1);
args.add(o2);
args.add(o3);
//调用方法
userService.batchAdd(args);
```

3、批量修改

```java
//daoImpl中
//批量修改
@Override
public void batchUpdateUser(List<Object[]> batchArgs) {
    String sql = "update user set name = ?,password = ? where id = ?";
    int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
}

//测试类中
//批量修改
List<Object[]> batchArgs = new ArrayList<>();
Object[] o1 = {"BBB","12346","13"};
Object[] o2 = {"CCC","789456132","12"};
batchArgs.add(o1);
batchArgs.add(o2);
userService.batchUpdate(batchArgs);
```

4、批量删除

```java
//daoImpl中
public void batchDeleteUser(List<Object[]> batchArgs) {
    String sql = "delete from user where id = ?";
    int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
    System.out.println(ints);
}

//测试类中
//批量修改
List<Object[]> batchArgs = new ArrayList<>();
Object[] o1 = {"13"};
Object[] o2 = {"12"};
batchArgs.add(o1);
batchArgs.add(o2);
userService.batchDelete(batchArgs);
```

## 8、事务操作

### 1、事务概念

（1）事务是数据库操作最基本单元，逻辑上一组操作，要么都成功，如果有一个失败所有操 作都失败
（2）典型场景：银行转账

事务四个特性（ACID） 
（1）原子性 （2）一致性 （3）隔离性 （4）持久性

### 2、搭建事务操作的环境

![image-20221121081816310]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221121081816310.png)

1、创建数据数据库表，添加记录

![image-20221121082234231]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221121082234231.png)

2、创建service，搭建dao，完成对象创建和注入关系

（1）**service注入dao，在dao注入JdbcTemplate，在JdbcTemplate注入DataSource**

```java
public interface UserDao {   
}

@Repository
public class UserDaoImpl implements UserDao{
    @Autowired
    private JdbcTemplate jdbcTemplate;
}

@Service
public class UserService {
    //注入dao
    @Autowired
    private UserDao userDao;
}
```

3、在dao创建两个方法：多钱和少钱，在service创建方法（转账的方法）

```java
public interface UserDao {
    //多钱
    void addMoney();
    //少钱
    void reduceMoney();
}

@Repository
public class UserDaoImpl implements UserDao{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void addMoney() {
        String sql = "update t_account set money = money - ? where username = ?";
        jdbcTemplate.update(sql,100,"lucy");
    }

    @Override
    public void reduceMoney() {
        String sql = "update t_account set money = money + ? where username = ?";
        jdbcTemplate.update(sql,100,"mary");
    }
}

public class UserService {
    //注入dao
    @Autowired
    private UserDao userDao;

    //转账的方法
    public void accountMoney(){
        //lucy少100
        userDao.reduceMoney();
        //mary多100
        userDao.addMoney();
    }
}

public class Testtx {
    @Test
    public void testAccount(){
        ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
        UserService userService = context.getBean("userService", UserService.class);
        userService.accountMoney();
    }
}
```

4、上面代码，如果正常执行没有问题，但是如果代码执行过程中出现异常，会使数据异常

使用事务解决上述异常
事务操作过程：

![image-20221121171153711]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221121171153711.png)

### 3、事务操作

1、事务添加到 JavaEE 三层结构里面 Service 层（业务逻辑层）

2、在Spring进行事务管理操作
（1）有两种方式：
**编程式**事务管理 （直接编写代码）
**声明式**事务管理（使用配置文件、注解，推荐使用）

3、声明式事务管理
（1）基于注解方式
（2）基于xml配置文件方式

4、在Spring进行声明式事务管理，底层使用AOP原理

5、Spring事务管理API
（1）提供一个接口，代表事务管理器，这个接口针对不同的框架提供不同的实现
![image-20221121190002792]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221121190002792.png)

### 4、注解声明式事务管理

1、在spring配置文件配置事务管理器

```xml
<!--创建事务管理器-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <!--注入数据源-->
    <property name="dataSource" ref="dataSource"></property>
</bean>
```

2、在spring配置文件，开启事务注解

（1）在spring配置文件引入名称空间tx

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
                           http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">
```

（2）开启事务注解

```xml
<!--开启事务注解-->
<tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>
```

3、在service类上面（获取service类里面方法上面）添加事务注解

（1）@Transactional，这个注解添加到类上面，也可以添加到方法上
（2）如果把这个**注解添加类上面**，这个**类里面所有的方法都添加事务**
（3）如果把这个**注解添加方法上面**，为这个**方法添加事务**

```java
@Service
@Transactional
public class UserService {
```

### 5、声明式事务管理参数配置

在 service 类上面添加注解@Transactional，在这个注解里面可以配置事务相关参数

![image-20221121192313660]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221121192313660.png)

#### 1、propagation：事务传播行为

当一个事务方法被另外一个事务方法调用时，这个事务方法如何进行行为？

![image-20221121194945546]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221121194945546.png)

REQUIRED：方法2会开启事务A，调用方法1，**方法1加入到当前事务A**里面
![image-20221121195158088]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221121195158088.png)

REQUIRED_NEW：**内层事务不依赖于外层事务**
![image-20221121195640486]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221121195640486.png)

SUPPORTS：方法b可以单独运行，如果在事务a中，那就在事务a中运行
![image-20221121195811523]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221121195811523.png)

#### 2、ioslation：事务隔离级别

（1）事务有特性称为隔离性，多事务操作之间不会产生影响。不考虑隔离性产生很多问题
（2）有三个读问题：脏读，不可重复读，幻读
脏读：一个未提交事务读取到另一个未提交事务的数据
不可重复读：一个未提交事务读取到另一提交事务修改数据
幻读：一个未提交事务读取到另一提交事务添加数据

通过设置事务隔离级别，解读读的问题

| 隔离级别                     | 脏读 | 不可重复读 | 幻读 |
| ---------------------------- | ---- | ---------- | ---- |
| READ UMCOMMITTED（读未提交） | 有   | 有         | 有   |
| READ COMMITTED（读已提交）   | 无   | 有         | 有   |
| REPEATABLE READ（可重复读）  | 无   | 无         | 有   |
| SERIALIZABLE（串行化）       | 无   | 无         | 无   |

**Mysql默认隔离级别为REPEATABLE_READ**

```java
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.REPEATABLE_READ)
```

#### 3、timeout：超时时间

（1）事务需要在一定时间内进行提交，如果不提交进行回滚 
（2）默认值是 -1（没有时间限制） ，设置时间以秒单位进行计算

##### 4、readOnly：是否只读

（1）读：查询操作，写：添加修改删除操作
（2）readOnly默认值false，表示可以查询，也可以添加修改删除操作
（3）设置readOnly值是true，设置成true之后，只能查询

##### 5、rollbackFor：回滚

（1）设置出现哪些异常进行事务回滚

##### 6、noRollbackFor：不回滚

（1）设置出现哪些异常不进行事务回滚

### 6、XML声明式事务操作

1、在spring配置文件中进行配置
第一步：配置事务管理器
第二步：配置通知
第三步：配置切入点和切面

```xml
<!--1、创建事务管理器-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <!--注入数据源-->
    <property name="dataSource" ref="dataSource"></property>
</bean>

<!--2、配置通知-->
<tx:advice id="txadvice">
    <!--配置事务参数-->
    <tx:attributes>
        <!--指定那种规则的方法上添加事务-->
        <tx:method name="accountMoney"/>
        <tx:method name="account*" propagation="REQUIRED" isolation="REPEATABLE_READ"/>
    </tx:attributes>
</tx:advice>

<!--3、配置切入点和切面-->
<aop:config>
    <!--配置切入点-->
    <aop:pointcut id="pt" expression="execution(* spring5.service.UserService.*(..))"/>
    <!--配置切面-->
    <aop:advisor advice-ref="txadvice" pointcut-ref="pt"/>
</aop:config>
```

### 7、完全注解声明式事务管理

1、创建配置类，使用配置类替代xml配置文件

```java
@Configuration
@ComponentScan(basePackages = "spring5") //组件扫描
@EnableTransactionManagement //开启事务
public class TxConfig {
    //创建数据库连接池
    @Bean
    public DruidDataSource getDruidDataSource(){
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/atguigudb?characterEncoding=utf8&useSSL=false&serverTimezone=UTC&rewriteBatchedStatements=true");
        dataSource.setUsername("root");
        dataSource.setPassword("root");
        return dataSource;
    }

    //创建JdbcTemplate对象
    @Bean
    public JdbcTemplate getJdbcTemplate(DataSource dataSource){
        //到ioc容器中根据类型找到dataSource
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        //注入dataSource
        jdbcTemplate.setDataSource(dataSource);
        return jdbcTemplate;
    }

    //创建事务管理器的对象
    @Bean
    public DataSourceTransactionManager getDataSourceTransactionManager(DataSource dataSource){
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }
}
```

## 9、Spring5 框架新功能 

### 1、整个 Spring5 框架的代码基于 Java8，运行时兼容 JDK9， 许多不建议使用的类和方法在代码库中删除

### 2、 Spring 5.0 框架自带了通用的日志封装 

（1） Spring5 已经移除 Log4jConfigListener，官方建议使用 **Log4j2 **
（2） Spring5 框架整合 Log4j2

Spring5 框架整合 Log4j2：
第一步：引入jar包

![image-20221122124121656]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221122124121656.png)

第二步：创建log4j2.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--日志级别以及优先级排序: OFF > FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL (高优先级)-->
<!--Configuration后面的status用于设置log4j2自身内部的信息输出，可以不设置，当设置成trace时，可以看到log4j2内部各种详细输出-->
<configuration status="INFO">
    <!--先定义所有的appender-->
    <appenders>
        <!--输出日志信息到控制台-->
        <console name="Console" target="SYSTEM_OUT">
            <!--控制日志输出的格式-->
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </console>
    </appenders>
    <!--然后定义logger，只有定义了logger并引入的appender，appender才会生效-->
    <!--root：用于指定项目的根日志，如果没有单独指定Logger，则会使用root作为默认的日志输出-->
    <loggers>
        <root level="info">
            <appender-ref ref="Console"/>
        </root>
    </loggers>
</configuration>
```

### 3、spring5框架核心容器支持@Nullable注解

（1）@Nullable注解可以使用在方法上面，属性上面，参数上面，表示方法返回可以为空，属性值可以为空，参数值可以为空
（2）注解用在方法上面，方法返回值可以为空

![image-20221122125445610]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221122125445610.png)

（3）注解使用在方法参数里面，方法参数可以为空

![image-20221122125530349]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221122125530349.png)

（4）注解使用在属性上面，属性值可以为空

![image-20221122125548844]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221122125548844.png)

### 4、Spring5核心容器支持函数式风格GenericApplicationContext

```java
//函数式风格创建对象，交个spring进行管理
@Test
public void testGenericApplicationContext(){
    //1、创建GenericApplicationContext对象
    GenericApplicationContext context = new GenericApplicationContext();
    //2、调用context的方法对象注册
    context.refresh();
    context.registerBean("user1",User.class,() -> new User());
    //3、获取在spring注册对象
    User user = (User) context.getBean("user1");
    System.out.println(user);
}
```

### 5、Spring5 支持整合 JUnit5

（1）Spring5整合JUnit4
第一步 引入Spring相关针对测试依赖

![image-20221122132456482]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221122132456482.png)

第二步 创建测试类，使用注解方式完成

```java
@RunWith(SpringJUnit4ClassRunner.class)//单元测试框架
@ContextConfiguration("classpath:bean1.xml")//加载配置文件
public class JTest4 {
    
    @Autowired
    private UserService  userService;
    
    @Test
    public void test1(){
        userService.accountMoney();
    }
}
```

（2）Spring5整合JUnit5
第一步：引入JUnit5的jar包

第二步：创建测试类，使用注解完成

```java
@ExtendWith(SpringExtension.class)
@ContextConfiguration("classpath:bean1.xml")
public class JTest5 {
	@Autowired
	private UserService userService;
	@Test
	public void test1() {
		userService.accountMoney();
	}	
}
```

（3）使用一个复合注解替代上面两个注解完成整合

```java
@SpringJUnitConfig(locations = "classpath:bean1.xml")
public class JTest5 {
	@Autowired
	private UserService userService;
	@Test
	public void test1() {
        userService.accountMoney();
	}
}
```

## 10、Webflux  

### 1、 SpringWebflux 介绍 

（1）是 Spring5 添加新的模块，用于 web 开发的，功能和 SpringMVC 类似的， Webflux 使用 当前一种比较流程响应式编程出现的框架。

![image-20221123150035139]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221123150035139.png)

（2）使用传统 web 框架，比如 SpringMVC，这些基于 Servlet 容器， Webflux 是一种异步非阻塞的框架，异步非阻塞的框架在 Servlet3.1 以后才支持，核心是基于 Reactor 的相关 API 实现 的。

（3）解释什么是异步非阻塞 
异步和同步针对调用者，调用者发送请求，如果等着对方回应之后才去做其他事情就是同步，如果发送请求之后不等着对方回应就去做其他事情就是异步 
阻塞和非阻塞针对被调用者，被调用者收到请求之后，做完请求任务之后才给出反馈就是阻塞，受到请求之后马上给出反馈然后再去做事情就是非阻塞

（4）Webflux 特点：
第一 非阻塞式：在有限资源下，提高系统吞吐量和伸缩性，以 Reactor 为基础实现响应式编程 
第二 函数式编程： Spring5 框架基于 java8， Webflux 使用 Java8 函数式编程方式实现路由请求

（5）比较SpringMVC
第一 两个框架都可以使用注解方式，都运行在 Tomet 等容器中 
第二 SpringMVC 采用命令式编程， Webflux 采用异步响应式编程

### 2、响应式编程

（1）什么是响应式编程
响应式编程是一种面向数据流和变化传播的编程范式。这意味着可以在编程语言中很方便地表达静态或动态的数据流，而相关的计算模型会自动将变化的值通过数据流进行传播。 
电子表格程序就是响应式编程的一个例子。单元格可以包含字面值或类似"=B1+C1"的公 式，而包含公式的单元格的值会依据其他单元格的值的变化而变化。

（2）Java8及其之前版本
提供的观察者模式两个类 Observer 和 Observable

```java
public class ObserverDemo extends Observable {
	public static void main(String[] args) {
		ObserverDemo observer = new ObserverDemo();
		//添加观察者
		observer.addObserver((o,arg)->{
			System.out.println("发生变化");
		});
		observer.addObserver((o,arg)->{
			System.out.println("手动被观察者通知，准备改变");
		});
		observer.setChanged(); //数据变化
		observer.notifyObservers(); //通知
	}
}
```

### 3、响应式编程（Reactor 实现）

（1）响应式编程操作中， Reactor 是满足 Reactive 规范框架 
（2） Reactor 有两个核心类， Mono 和 Flux，这两个类实现接口 Publisher，提供丰富操作 符。 
		Flux 对象实现发布者，返回 N 个元素；
		Mono 实现发布者，返回 0 或者 1 个元素 
（3） Flux 和 Mono 都是数据流的发布者，使用 Flux 和 Mono 都可以发出三种数据信号：元素值，错误信号，完成信号，错误信号和完成信号都代表终止信号，终止信号用于告诉 订阅者数据流结束了，错误信号终止数据流同时把错误信息传递给订阅者

## 11、Spring、Maven版

### 1、Spring的使用

#### 导入依赖

```xml
<dependencies>
    <!-- 基于Maven依赖传递性，导入spring-context依赖即可导入当前所需所有jar包 -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.1</version>
    </dependency>
    <!-- junit测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### 2、基于XML管理bean  （IOC）

#### 1、获取bean

①方式一：根据id获取  
②方式二：根据类型获取  当根据类型获取bean时，要求IOC容器中指定类型的bean有且只能有一个  
**③方式三：根据id和类型  **

```java
@Test
public void testHelloWorld(){
    ApplicationContext ac = newClassPathXmlApplicationContext("applicationContext.xml");
	HelloWorld bean = ac.getBean("helloworld", HelloWorld.class);
	bean.sayHello();
}
```

如果组件类实现了接口，根据接口类型可以获取 bean 吗  ：可以，前提是bean唯一
如果一个接口有多个实现类，这些实现类都配置了 bean，根据接口类型可以获取 bean 吗？  不行，因为bean不唯一    

#### 2、依赖注入之setter注入  

property标签：**通过组件类的setXxx()方法给组件对象设置属性**
	name属性：指定属性名**（这个属性名是getXxx()、setXxx()方法定义的，和成员变量无关，即通过name的值找get，set方法）**
	value属性：指定属性值

```xml
<bean id="studentOne" class="com.T4mako.spring.pojo.Student">
    <property name="sid"  value="1001"></property>
    <property name="sname" value="张三"></property>
    <property name="gender" value="男"></property>
    <property name="age" value="21"></property>
</bean>
```

#### 3、依赖注入之构造器注入  

```xml
<bean id="studentTwo" class="com.atguigu.spring.bean.Student">
    <constructor-arg value="1002"></constructor-arg>
    <constructor-arg value="李四"></constructor-arg>
    <constructor-arg value="33"></constructor-arg>
    <constructor-arg value="女"></constructor-arg>
</bean>
```

constructor-arg标签还有两个属性可以进一步描述构造器参数：
	index属性：指定参数所在位置的索引（从0开始）
	name属性：指定参数名  

#### 4、特殊值处理  

##### null值 ：

```xml
<property name="name">
	<null />
</property>
```

##### xml实体  （< >）：

```xml
<!-- 小于号在XML文档中用来定义标签的开始，不能随便使用 -->
<!-- 解决方案一：使用XML实体来代替 -->
<property name="expression" value="a &lt; b"/>
```

##### CDATA节  ：

CDATA节必须放在value标签中
IDEA中快捷方式：大写的CD

```xml
<property name="expression">
    <!-- 解决方案二：使用CDATA节 -->
    <!-- CDATA中的C代表Character，是文本、字符的含义，CDATA就表示纯文本数据 -->
    <!-- XML解析器看到CDATA节就知道这里是纯文本，就不会当作XML标签或属性来解析 -->
    <!-- 所以CDATA节中写什么符号都随意 -->
    <value><![CDATA[a < b]]></value>
</property>
```

#### 5、为类类型属性赋值  

##### 方式一：外部bean  

```xml
<bean id="clazzOne" class="com.atguigu.spring.bean.Clazz">
	<property name="clazzId" value="1111"></property>
	<property name="clazzName" value="财源滚滚班"></property>
</bean>

<bean id="studentFour" class="com.atguigu.spring.bean.Student">
	<property name="id" value="1004"></property>
	<property name="name" value="赵六"></property>
	<property name="age" value="26"></property>
	<property name="sex" value="女"></property>
	<!-- ref属性：引用IOC容器中某个bean的id，将所对应的bean为属性赋值 -->
	<property name="clazz" ref="clazzOne"></property>
</bean>
```

##### 方式二：内部bean  

```xml
<bean id="studentFour" class="com.atguigu.spring.bean.Student">
    <property name="id" value="1004"></property>
    <property name="name" value="赵六"></property>
    <property name="age" value="26"></property>
    <property name="sex" value="女"></property>
    <property name="clazz">
        <!-- 在一个bean中再声明一个bean就是内部bean -->
        <!-- 内部bean只能用于给属性赋值，不能在外部通过IOC容器获取，因此可以省略id属性 -->
        <bean id="clazzInner" class="com.atguigu.spring.bean.Clazz">
            <property name="clazzId" value="2222"></property>
            <property name="clazzName" value="远大前程班"></property>
        </bean>
    </property>
</bean>
```

##### 方式三：级联属性赋值  （一般不使用）

```xml
<bean id="studentFour" class="com.atguigu.spring.bean.Student">
    <property name="id" value="1004"></property>
    <property name="name" value="赵六"></property>
    <property name="age" value="26"></property>
    <property name="sex" value="女"></property>
    <!-- 一定先引用某个bean为属性赋值，才可以使用级联方式更新属性 -->
    <property name="clazz" ref="clazzOne"></property>
    <property name="clazz.clazzId" value="3333"></property>
    <property name="clazz.clazzName" value="最强王者班"></property>
</bean>
```

#### 6、为数组类型属性赋值  

```xml
<bean id="studentFour" class="com.atguigu.spring.bean.Student">
    <property name="id" value="1004"></property>
    <property name="name" value="赵六"></property>
    <property name="age" value="26"></property>
    <property name="sex" value="女"></property>
    <!-- ref属性：引用IOC容器中某个bean的id，将所对应的bean为属性赋值 -->
    <property name="clazz" ref="clazzOne"></property>
    <property name="hobbies">
        <array>
            <value>抽烟</value>
            <value>喝酒</value>
            <value>烫头</value>
        </array>
    </property>
</bean>
```

#### 7、为集合类型属性赋值  

##### ①为List、Set集合类型属性赋值  

若为Set集合类型属性赋值，只需要将其中的list标签改为set标签即可  

```xml
<bean id="clazzTwo" class="com.atguigu.spring.bean.Clazz">
    <property name="clazzId" value="4444"></property>
    <property name="clazzName" value="Javaee0222"></property>
    <property name="students">
        <list>
            <ref bean="studentOne"></ref>
            <ref bean="studentTwo"></ref>
            <ref bean="studentThree"></ref>
        </list>
    </property>
</bean>
```

##### ②为Map集合类型属性赋值 

```xml
<bean id="teacherOne" class="com.atguigu.spring.bean.Teacher">
    <property name="teacherId" value="10010"></property>
    <property name="teacherName" value="大宝"></property>
</bean>
<bean id="teacherTwo" class="com.atguigu.spring.bean.Teacher">
    <property name="teacherId" value="10086"></property>
    <property name="teacherName" value="二宝"></property>
</bean>

<bean id="studentFour" class="com.atguigu.spring.bean.Student">
    <property name="id" value="1004"></property>
    <property name="name" value="赵六"></property>
    <property name="age" value="26"></property>
    <property name="sex" value="女"></property>
    <!-- ref属性：引用IOC容器中某个bean的id，将所对应的bean为属性赋值 -->
    <property name="clazz" ref="clazzOne"></property>
    <property name="hobbies">
        <array>
            <value>抽烟</value>
            <value>喝酒</value>
            <value>烫头</value>
        </array>
    </property>
    <property name="teacherMap">
        <map>
            <entry key="10086" value-ref="teacherOne"></entry>
            <entry key="10010" value-ref="teacherTwo"></entry>
        </map>
    </property>
</bean>
```

##### ③引用集合类型的bean  (p标签)

引入util命名空间

#### 8、p命名空间

引入p命名空间后，可以通过以下方式为bean的各个属性赋值  

```xml
<bean id="studentSix" class="com.atguigu.spring.bean.Student"
      p:id="1006" p:name="小明" p:clazz-ref="clazzOne" p:teacherMapref="teacherMap"></bean>
```

#### 9、引入外部属性文件

加入依赖  

```xml
<!-- MySQL驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.16</version>
</dependency>
<!-- 数据源 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.0.31</version>
</dependency>
```

创建properties
引入属性文件  

```xml
<context:property-placeholder location="classpath:jdbc.properties"/>
```

配置bean 

```xml
<bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="url" value="${jdbc.url}"/>
    <property name="driverClassName" value="${jdbc.driver}"/>
    <property name="username" value="${jdbc.user}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
```

#### 10、bean的作用域  

```xml
<bean id="student" class="com.T4mako.spring.pojo.Student" scope="prototype">
	<property name="sid" value="50"></property>
	<property name="sname" value="T4mako"></property>
</bean>
```

| 取值                  | 含义                                         | 创建对象的时机  |
| --------------------- | -------------------------------------------- | --------------- |
| ==singleton（默认）== | 在IOC容器中，这个bean的对象始终为**单实例 ** | IOC容器初始化时 |
| ==prototype==         | 这个bean在IOC容器中有**多个实例**            | 获取bean时      |

如果是在WebApplicationContext环境下还会有另外两个作用域（但不常用）：

| 取值    | 含义                 |
| ------- | -------------------- |
| request | 在一个请求范围内有效 |
| session | 在一个会话范围内有效 |

#### 11、bean的生命周期  

1、实例化
2、依赖注入
3、初始化，需要通过ben的init-method属性指定初始化方法
4、IOC容器关闭时销毁，需要通过bean的destory-method属性指定销毁的方法

**注：若bean的作用域为单例时，前三个步骤会在获取IOC容器时执行
若bean的作用域为多个时，前三个步骤会在获取bean的时候执行**

bean的前后置处理器可以看前面笔记

具体的生命周期过程：
bean对象创建（调用无参构造器）
给bean对象设置属性
bean对象初始化之前操作（由bean的后置处理器负责）
bean对象初始化（需在配置bean时指定初始化方法）
bean对象初始化之后操作（由bean的后置处理器负责）
bean对象就绪可以使用
bean对象销毁（需在配置bean时指定销毁方法）
IOC容器关闭  

#### 12、FactoryBean

FactoryBean是Spring提供的一种整合第三方框架的常用机制。和普通的bean不同，配置一个FactoryBean类型的bean，在获取bean的时候得到的并不是class属性中配置的这个类的对象，而是getObject()方法的返回值。通过这种机制，Spring可以帮我们把复杂组件创建的详细过程和繁琐细节都屏蔽起来，只把最简洁的使用界面展示给我们。  

FactoryBean是一个接口，需要创建一个类实现该接口
其中有三个方法：
getObject()：通过一个对象交给IOC容器管理
getObjectType()：设置所提供对象的类型
isSingleton()：所提供的对象是否单例
当把FactoryBean的实现类配置为bean时，会将当前类中getObject()所返回的对象交给IOC容器管理

#### 13、基于xml的自动装配  

自动装配：根据指定的策略，在IOC容器中匹配某一个bean，**自动为指定的bean中所依赖的类类型或接口类型属性赋值 ** 

使用bean标签的**autowire属性**设置自动装配效果
自动装配方式：**byType**
**byType：根据类型匹配IOC容器中的某个兼容类型的bean，为属性自动赋值**
若在IOC中，没有任何一个兼容类型的bean能够为属性赋值，则该属性不装配，即值为默认值null
若在IOC中，有多个兼容类型的bean能够为属性赋值，则抛出异常NoUniqueBeanDefinitionException  

配置自动准配后不用写property标签

```xml
<bean id="userController" class="com.atguigu.autowire.xml.controller.UserController" autowire="byType"></bean>
<bean id="userService"class="com.atguigu.autowire.xml.service.impl.UserServiceImpl" autowire="byType"></bean>
<bean id="userDao" class="com.atguigu.autowire.xml.dao.impl.UserDaoImpl"></bean>
```

自动装配方式：**byName**  
**byName：将自动装配的属性的属性名，作为bean的id在IOC容器中匹配相对应的bean进行赋值**  
当类型匹配的bean有多个时，此时使用byName实现自动装配

```xml
<bean id="userController"class="com.atguigu.autowire.xml.controller.UserController" autowire="byName"></bean>
<bean id="userService"   class="com.atguigu.autowire.xml.service.impl.UserServiceImpl" autowire="byName"></bean>
<bean id="userServiceImpl"class="com.atguigu.autowire.xml.service.impl.UserServiceImpl" autowire="byName"></bean>
<bean id="userDao" class="com.atguigu.autowire.xml.dao.impl.UserDaoImpl"></bean>
<bean id="userDaoImpl" class="com.atguigu.autowire.xml.dao.impl.UserDaoImpl"></bean>
```

### 3、基于注解管理bean  （IOC）

①注解：和 XML 配置文件一样，注解本身并不能执行，注解本身仅仅只是做一个标记，具体的功能是**框架检测到注解标记的位置**，然后针对这个位置按照注解标记的功能来执行具体操作。  
本质上：所有一切的操作都是Java代码来完成的，XML和注解只是告诉框架中的Java代码如何执行。  

②扫描：Spring 为了知道程序员在哪些地方标记了什么注解，就需要通过扫描的方式，来进行检测。然后根据注解进行后续操作。  

##### 1、基本注解

@Component：将类标识为普通组件 
@Controller：将类标识为控制层组件 
@Service：将类标识为业务层组件 
@Repository：将类标识为持久层组件  

通过查看源码我们得知，@Controller、@Service、@Repository这三个注解只是在@Component注解的基础上起了三个新的名字。
对于Spring使用IOC容器管理这些组件来说没有区别。所以@Controller、@Service、@Repository这三个注解只是给开发人员看的，让我们能够便于分辨组件的作用。
注意：虽然它们本质上一样，但是为了代码的可读性，为了程序结构严谨我们肯定不能随便胡乱标记。  

##### 2、扫描文件

通过扫描，ioc就有了扫描到注解的类的bean对象

情况一：最基本的扫描方式  

```xml
<context:component-scan base-package="com.atguigu">
</context:component-scan>
```

情况二：指定要排除的组件  

 type：设置排除或包含的依据
        type="annotation"，根据注解排除，expression中设置要排除的**注解的全类名**
        type="assignable"，根据类型排除，expression中设置要排除的**类型的全类名**

```xml
<context:component-scan base-package="com.atguigu">
    <!-- context:exclude-filter标签：指定排除规则 -->
    <!--
        type：设置排除或包含的依据
        type="annotation"，根据注解排除，expression中设置要排除的注解的全类名
        type="assignable"，根据类型排除，expression中设置要排除的类型的全类名
    -->
    <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    <!--<context:exclude-filter type="assignable" expression="com.atguigu.controller.UserController"/>-->
</context:component-scan>
```

情况三：仅扫描指定组件  

use-default-filters="true"（默认），所设置的包下所有的类都需要扫描，此时可以使用排除扫描
use-default-filters="false"，所设置的包下所有的类都不需要扫描，此时可以使用包含扫描

```xml
<context:component-scan base-package="com.atguigu" use-default-filters="false">
    <!-- context:include-filter标签：指定在原有扫描规则的基础上追加的规则 -->
    <!-- use-default-filters属性：取值false表示关闭默认扫描规则 -->
    <!-- 此时必须设置use-default-filters="false"，因为默认规则即扫描指定包下所有类 -->
    <!--
        type：设置排除或包含的依据
        type="annotation"，根据注解排除，expression中设置要排除的注解的全类名
        type="assignable"，根据类型排除，expression中设置要排除的类型的全类名
    -->
    <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    <!--<context:include-filter type="assignable"expression="com.atguigu.controller.UserController"/>-->
</context:component-scan>
```

##### 3、组件所对应的bean的id  

默认情况： **类名首字母小写就是bean的id**。例如：UserController类对应的bean的id就是userController。

自定义bean的id：可通过标识组件的注解的value属性设置自定义的bean的id

```java
@Service("userService")//默认为userServiceImpl （public class UserServiceImpl implements）
UserService {}  
```

##### 4、基于注解的自动装配  

@Autowired注解
在成员变量上直接标记@Autowired注解即可完成自动装配，不需要提供setXxx()方法。

@Autowired注解能够标识的位置：
	标识在成员变量上，此时不需要设置成员变量的set方法
	标识在set方法上
	标识在成员变量赋值的有参构造上

![image-20230106173514322]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230106173514322.png)

首先根据所需要的组件类型（**byType**）到IOC容器中查找，能够找到唯一的bean：直接执行装配
	如果完全找不到匹配这个类型的bean：装配失败
	和所需类型匹配的**bean不止一个**
		没有@Qualifier注解：根据@Autowired标记位置成员变量的变量名作为bean的id进行匹配（**byName**）
			能够找到：执行装配
			找不到：装配失败
		使用@Qualifier注解：根据**@Qualifier注解**中**指定的名称作为bean的id进行匹配**
			能够找到：执行装配
			找不到：装配失败  

### 4、AOP  

#### 1、静态代理与动态代理

##### 1、静态代理

创建静态代理类：  

```java
public class CalculatorStaticProxy implements Calculator {
    // 将被代理的目标对象声明为成员变量
    private Calculator target;
    public CalculatorStaticProxy(Calculator target) {
        this.target = target;
    } 
    @Override
    public int add(int i, int j) {
        // 附加功能由代理类中的代理方法来实现
        System.out.println("[日志] add 方法开始了，参数是：" + i + "," + j);
        // 通过目标对象来实现核心业务逻辑
        int addResult = target.add(i, j);
        System.out.println("[日志] add 方法结束了，结果是：" + addResult);
        return addResult;
    }
}
```

静态代理确实实现了解耦，但是由于**代码都写死了，完全不具备任何的灵活性**。就拿日志功能来说，将来其他地方也需要附加日志，那还得再声明更多个静态代理类，那就产生了大量重复的代码，日志功能还是分散的，没有统一管理。
提出进一步的需求：将日志功能**集中到一个代理类**中，将来有任何日志需求，都通过这一个代理类来实现。这就需要使用动态代理技术了。  

##### 2、动态代理

生产代理对象的工厂类 ：

newProxyInstance()：创建一个代理实例
其中有三个参数：
	1、classLoader：加载动态生成的代理类的类加载器
	2、interfaces：目标对象实现的所有接口的class对象所组成的数组
	3、invocationHandler：**设置代理对象实现目标对象方法的过程，即代理类中如何重写接口中的抽象方法**

```java
public class ProxyFactory {
    private Object target;
    public ProxyFactory(Object target) {
        this.target = target;
    }
    public Object getProxy(){
        /**
        * newProxyInstance()：创建一个代理实例
        * 其中有三个参数：
        * 1、classLoader：加载动态生成的代理类的类加载器
        * 2、interfaces：目标对象实现的所有接口的class对象所组成的数组
        * 3、invocationHandler：设置代理对象实现目标对象方法的过程，即代理类中如何重写接口中的抽象方法
        */
        ClassLoader classLoader = target.getClass().getClassLoader();
        Class<?>[] interfaces = target.getClass().getInterfaces();
        InvocationHandler invocationHandler = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            /**
            * proxy：代理对象
            * method：代理对象需要实现的方法，即其中需要重写的方法
            * args：method所对应方法的参数
            */
            Object result = null;
            try {
                System.out.println("[动态代理][日志] "+method.getName()+"，参数："+ Arrays.toString(args));
                result = method.invoke(target, args);//调用方法
                System.out.println("[动态代理][日志] "+method.getName()+"，结果："+ result);
            } catch (Exception e) {
           		e.printStackTrace();
            	System.out.println("[动态代理][日志] "+method.getName()+"，异常："+e.getMessage());
            } finally {
    			System.out.println("[动态代理][日志] "+method.getName()+"，方法执行完毕");
    		}
    		return result;
    		}
    	};
    	return Proxy.newProxyInstance(classLoader, interfaces,
    	invocationHandler);
    }
}
```

#### 2、AOP概念及相关术语  

AOP（Aspect Oriented Programming）是一种设计思想，是软件设计领域中的**面向切面编程**，它是面向对象编程的一种补充和完善，它以通过预编译方式和运行期动态代理方式实现在不修改源代码的情况下给程序动态统一添加额外功能的一种技术 。

①横切关注点 ：从每个方法中抽取出来的同一类**非核心业务**。（日志等）

②通知 ：每一个**横切关注点上要做的事情都需要写一个方法来实现**，这样的方法就叫通知方法。  
前置通知：在被代理的目标方法前执行
返回通知：在被代理的目标方法成功结束后执行（寿终正寝）
异常通知：在被代理的目标方法异常结束后执行（死于非命）
后置通知：在被代理的目标方法最终结束后执行（盖棺定论）
环绕通知：使用try...catch...finally结构围绕整个被代理的目标方法，包括上面四种通知对应的所有位置  

③切面 ：**封装通知方法的类  **

④目标 ：被代理的目标对象  

⑤代理 ：向目标对象应用通知之后创建的代理对象  

⑥连接点 ：类里面哪些方法可以被增强，这些方法称为连接点

⑦切入点：实际被真正增强的方法，称为切入点

#### 3、基于注解的AOP  

动态代理（InvocationHandler）：JDK原生的实现方式，需要被代理的目标类必须实现接口。因为这个技术要求代理对象和目标对象实现同样的接口（兄弟两个拜把子模式）。
cglib：通过继承被代理的目标类（认干爹模式）实现代理，所以不需要目标类实现接口。
**AspectJ：本质上是静态代理，将代理逻辑“织入”被代理的目标类编译得到的字节码文件，所以最终效果是动态的。weaver就是织入器。Spring只是借用了AspectJ中的注解。**  

##### 1、准备工作  

###### ①添加依赖  

```xml
<!-- spring-aspects会帮我们传递过来aspectjweaver -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>5.3.1</version>
</dependency>
```

###### ②准备被代理的目标资源  

接口：  

```java
public interface Calculator {
    int add(int i, int j);
    int sub(int i, int j);
    int mul(int i, int j);
    int div(int i, int j);
}
```

实现类：    

```java
@Component
public class CalculatorPureImpl implements Calculator {
    @Override
    public int add(int i, int j) {
        int result = i + j;
        System.out.println("方法内部 result = " + result);
        return result;
    } 
    @Override
    public int sub(int i, int j) {
        int result = i - j;
        System.out.println("方法内部 result = " + result);
        return result;
    } 
    @Override
    public int mul(int i, int j) {
        int result = i * j;
        System.out.println("方法内部 result = " + result);
        return result;
    } 
    @Override
    public int div(int i, int j) {
        int result = i / j;
        System.out.println("方法内部 result = " + result);
        return result;
    }
}
```

##### 2、创建切面类并配置  

```java
// @Aspect表示这个类是一个切面类
@Aspect
// @Component注解保证这个切面类能够放入IOC容器
@Component
public class LogAspect {
    @Before("execution(public int com.atguigu.aop.annotation.CalculatorImpl.*(..))")
        public void beforeMethod(JoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        String args = Arrays.toString(joinPoint.getArgs());
        System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
    }
    @After("execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))")
        public void afterMethod(JoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Logger-->后置通知，方法名："+methodName);
    }
    @AfterReturning(value = "execution(*com.atguigu.aop.annotation.CalculatorImpl.*(..))", returning = "result")
        public void afterReturningMethod(JoinPoint joinPoint, Object result){
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Logger-->返回通知，方法名："+methodName+"，结果："+result);
    }
    @AfterThrowing(value = "execution(*com.atguigu.aop.annotation.CalculatorImpl.*(..))", throwing = "ex")
        public void afterThrowingMethod(JoinPoint joinPoint, Throwable ex){
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Logger-->异常通知，方法名："+methodName+"，异常："+ex);
    } 
	@Around("execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))")
        public Object aroundMethod(ProceedingJoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        String args = Arrays.toString(joinPoint.getArgs());
        Object result = null;
        try {
        System.out.println("环绕通知-->目标对象方法执行之前");
        //目标对象（连接点）方法的执行
        result = joinPoint.proceed();
        System.out.println("环绕通知-->目标对象方法返回值之后");
        } catch (Throwable throwable) {
        throwable.printStackTrace();
        System.out.println("环绕通知-->目标对象方法出现异常时");
        } finally {
        System.out.println("环绕通知-->目标对象方法执行完毕");
		} 
		return result;
	}
}
```

在Spring的配置文件中配置：  
**<aop:aspectj-autoproxy />**开启注解方式的AOP

```xml
<!--
    基于注解的AOP的实现：
    1、将目标对象和切面交给IOC容器管理（注解+扫描）
    2、开启AspectJ的自动代理，为目标对象自动生成代理
    3、将切面类通过注解@Aspect标识
-->
<context:component-scan base-package="com.atguigu.aop.annotation"></context:component-scan>
<aop:aspectj-autoproxy />
```

##### 3、各种通知  

前置通知：**@Before**，在被代理的目标**方法前**执行
后置通知：**@After**，在被代理的目标方法**finally**中执行
返回通知：**@AfterReturning**，在被代理的目标方法**返回值之后**执行
异常通知：**@AfterThrowing**，在被代理的目标方法**catch中执行**
环绕通知：**@Around**，使用try...catch...finally结构围绕整个被代理的目标方法，包括上面四种通知对应的所有位置  

##### 4、切入点表达式语法  

![image-20230107162255980]( https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230107162255980.png)

**重用切入点表达式 ：**

```java
@Pointcut("execution(* com.atguigu.aop.annotation.*.*(..))")
public void pointCut(){}

//在同一个切面使用
@Before("pointCut()")
public void beforeMethod(JoinPoint joinPoint){
    String methodName = joinPoint.getSignature().getName();
    String args = Arrays.toString(joinPoint.getArgs());
    System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
}

//在不同切面中使用
@Before("com.atguigu.aop.CommonPointCut.pointCut()")
public void beforeMethod(JoinPoint joinPoint){
    String methodName = joinPoint.getSignature().getName();
    String args = Arrays.toString(joinPoint.getArgs());
    System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
}
```

##### 5、获取通知的相关信息  

**获取连接点信息  **  
获取连接点信息可以**在通知方法的参数位置设置JoinPoint类型的形参  **

```java
@Before("execution(public int com.atguigu.aop.annotation.CalculatorImpl.*(..))")
public void beforeMethod(JoinPoint joinPoint){
    //获取连接点的签名信息
    String methodName = joinPoint.getSignature().getName();
    //获取目标方法到的实参信息
    String args = Arrays.toString(joinPoint.getArgs());
    System.out.println("Logger-->前置通知，方法名："+methodName+"，参数："+args);
}
```

**获取目标方法的返回值 **
@AfterReturning中的属性returning，用来将通知方法的某个形参，接收目标方法的返回值  

```java
@AfterReturning(value = "execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))", returning = "result")
public void afterReturningMethod(JoinPoint joinPoint, Object result){
	String methodName = joinPoint.getSignature().getName();
	System.out.println("Logger-->返回通知，方法名："+methodName+"，结果："+result);
}
```

**获取目标方法的异常**
@AfterThrowing中的属性throwing，用来将通知方法的某个形参，接收目标方法的异常  

```java
@AfterThrowing(value = "execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))", throwing = "ex")
    public void afterThrowingMethod(JoinPoint joinPoint, Throwable ex){
    String methodName = joinPoint.getSignature().getName();
    System.out.println("Logger-->异常通知，方法名："+methodName+"，异常："+ex);
}
```

##### 6、环绕通知  

```java
@Around("execution(* com.atguigu.aop.annotation.CalculatorImpl.*(..))")
public Object aroundMethod(ProceedingJoinPoint joinPoint){
    String methodName = joinPoint.getSignature().getName();
    String args = Arrays.toString(joinPoint.getArgs());
    Object result = null;
    try {
        System.out.println("环绕通知-->目标对象方法执行之前");
        //目标方法的执行，目标方法的返回值一定要返回给外界调用者(result与返回值一致)
        result = joinPoint.proceed();
        System.out.println("环绕通知-->目标对象方法返回值之后");
    } catch (Throwable throwable) {
        throwable.printStackTrace();
        System.out.println("环绕通知-->目标对象方法出现异常时");
    } finally {
       System.out.println("环绕通知-->目标对象方法执行完毕");
    }
    return result;
}  
```

##### 7、切面的优先级  

相同目标方法上同时存在多个切面时，切面的优先级控制切面的内外嵌套顺序。
	优先级高的切面：外面
	优先级低的切面：里面
使用@Order注解可以控制切面的优先级：
	@Order(较小的数)：优先级高
	@Order(较大的数)：优先级低  

### 5、声明式事务  

#### 1、JdbcTemplate  

Spring 框架对 JDBC 进行封装，使用 JdbcTemplate 方便实现对数据库操作  

###### 1、准备工作

①加入依赖  

```xml
<dependencies>
    <!-- 基于Maven依赖传递性，导入spring-context依赖即可导入当前所需所有jar包 -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.1</version>
    </dependency>
    <!-- Spring 持久化层支持jar包 -->
    <!-- Spring 在执行持久化层操作、与持久化层技术进行整合过程中，需要使用orm、jdbc、tx三个jar包 -->
    <!-- 导入 orm 包就可以通过 Maven 的依赖传递性把其他两个也导入 -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-orm</artifactId>
        <version>5.3.1</version>
    </dependency>
    <!-- Spring 测试相关 -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>5.3.1</version>
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
    <!-- 数据源 -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.0.31</version>
    </dependency>
</dependencies>
```

②创建jdbc.properties  

③配置Spring的配置文件  

```xml
<!-- 导入外部属性文件 -->
<context:property-placeholder location="classpath:jdbc.properties" />
<!-- 配置数据源 -->
<bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="url" value="${atguigu.url}"/>
    <property name="driverClassName" value="${atguigu.driver}"/>
    <property name="username" value="${atguigu.username}"/>
    <property name="password" value="${atguigu.password}"/>
</bean>
<!-- 配置 JdbcTemplate -->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <!-- 装配数据源 -->
    <property name="dataSource" ref="druidDataSource"/>
</bean>
```

###### 2、使用

```java
//指定当前测试类在spring的测试环境中执行，此时可以通过注入的方式直接获取IOC容器中的bean
@RunWith(SpringJUnit4ClassRunner.class)
//设置spring测试环境中的配置文件
@ContextConfiguration("classpath:spring-jdbc.xml")
public class JdbcTemplateTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void testInsert(){
        String sql = "insert into t_user values(null,?,?,?,?,?)";
        jdbcTemplate.update(sql,"root","123",21,"女","123@qq.com");
    }

    @Test
    public void testGetUserById(){
        String sql = "select * from t_user where id = ?";
        User user = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(User.class), 2);
        System.out.println(user);
    }
}
```

#### 2、声明式事务

概念：既然事务控制的代码有规律可循，代码的结构基本是确定的，所以框架就可以将固定模式的代码抽取出来，进行相关的封装。（通过AOP抽取）

编程式：自己写代码实现功能 
声明式：通过配置让框架实现功能  

##### 1、基于注解的声明式事务

###### 准备工作：  

①加入依赖  (同上方依赖的加入)

②创建jdbc.properties （同上） 

③配置Spring的配置文件  

```xml
<!--扫描组件-->
    <context:component-scan base-package="com.T4mako.spring"></context:component-scan>
    <!-- 导入外部属性文件 -->
    <context:property-placeholder location="classpath:jdbc.properties" />
    <!-- 配置数据源 -->
    <bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="url" value="${jdbc.url}"/>
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
    <!-- 配置 JdbcTemplate -->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <!-- 装配数据源 -->
        <property name="dataSource" ref="druidDataSource"/>
    </bean>
```

④数据表的准备

⑤创建组件    

BookDao：  

```java
public interface BookDao {
    Integer getPriceByBookId(Integer bookId);
    void updateStock(Integer bookId);
    void updateBalance(Integer userId, Integer price);
}
```

BookDaoImpl：

```java
@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public Integer getPriceByBookId(Integer bookId) {
        String sql = "select price from t_book where book_id = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, bookId);
    } 
    @Override
    public void updateStock(Integer bookId) {
        String sql = "update t_book set stock = stock - 1 where book_id = ?";
        jdbcTemplate.update(sql, bookId);
    } 
    @Override
    public void updateBalance(Integer userId, Integer price) {
        String sql = "update t_user set balance = balance - ? where user_id =?";
        jdbcTemplate.update(sql, price, userId);
    }
}
```

BookService： 

```java
public interface BookService {
    void buyBook(Integer bookId, Integer userId);
}
```

BookServiceImpl：  

```java
@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;
    @Override
    public void buyBook(Integer bookId, Integer userId) {
        //查询图书的价格
        Integer price = bookDao.getPriceByBookId(bookId);
        //更新图书的库存
        bookDao.updateStock(bookId);
        //更新用户的余额
        bookDao.updateBalance(userId, price);
    }
}
```

BookController：  

```java
@Controller
public class BookController {
    @Autowired
    private BookService bookService;
    public void buyBook(Integer bookId, Integer userId){
        bookService.buyBook(bookId, userId);
    }
}
```

测试类 :

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:tx-annotation.xml")
public class TxByAnnotationTest {
    @Autowired
    private BookController bookController;
    @Test
    public void testBuyBook(){
        bookController.buyBook(1, 1);
    }
}
```

###### 加入事务

①添加事务配置  
在Spring的配置文件中添加配置：  

```xml
<bean id="transactionManager"class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"></property>
</bean>
<!--
	开启事务的注解驱动
    通过注解@Transactional所标识的方法或标识的类中所有的方法，都会被事务管理器管理事务
-->
<!-- transaction-manager属性的默认值是transactionManager，如果事务管理器bean的id正好就是这个默认值，则可以省略这个属性 -->
<tx:annotation-driven transaction-manager="transactionManager" />
```

注意：导入的名称空间需要 tx 结尾的那个。  

②添加事务注解  
因为service层表示业务逻辑层，一个方法表示一个完成的功能，因此处理事务一般在**service层处理在BookServiceImpl的buybook()添加注解@Transactional  **

**@Transactional标识在方法上，咋只会影响该方法
@Transactional标识的类上，则会影响类中所有的方法  **

事务属性：只读
对一个查询操作来说，如果我们把它设置成**只读**，就能够明确告诉数据库，这个操作不涉及写操作。这样数据库就能够针对查询操作来进行优化。
@Transactional(readOnly = true)    
例：对增删改操作设置只读会抛出异常

事务属性：超时（超时回滚，释放资源）
例：@Transactional(timeout = 3)  

事务属性：回滚策略  
可以通过@Transactional中相关属性设置回滚策略  
rollbackFor属性：需要设置一个Class类型的对象
rollbackForClassName属性：需要设置一个字符串类型的全类名
noRollbackFor属性：需要设置一个Class类型的对象
rollbackFor属性：需要设置一个字符串类型的全类名  
例：@Transactional(noRollbackFor = ArithmeticException.class)  

##### 2、基于XML的声明式事务  

将Spring配置文件中去掉tx:annotation-driven 标签，并添加配置：  

```xml
<aop:config>
    <!-- 配置事务通知和切入点表达式 -->
    <aop:advisor advice-ref="txAdvice" pointcut="execution(*com.atguigu.spring.tx.xml.service.impl.*.*(..))"></aop:advisor>
</aop:config>
<!-- tx:advice标签：配置事务通知 -->
<!-- id属性：给事务通知标签设置唯一标识，便于引用 -->
<!-- transaction-manager属性：关联事务管理器 -->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <tx:attributes>
        <!-- tx:method标签：配置具体的事务方法 -->
        <!-- name属性：指定方法名，可以使用星号代表多个字符 -->
        <tx:method name="get*" read-only="true"/>
        <tx:method name="query*" read-only="true"/>
        <tx:method name="find*" read-only="true"/>
        <!-- read-only属性：设置只读属性 -->
        <!-- rollback-for属性：设置回滚的异常 -->
        <!-- no-rollback-for属性：设置不回滚的异常 -->
        <!-- isolation属性：设置事务的隔离级别 -->
        <!-- timeout属性：设置事务的超时属性 -->
        <!-- propagation属性：设置事务的传播行为 -->
        <tx:method name="save*" read-only="false" rollbackfor="java.lang.Exception" propagation="REQUIRES_NEW"/>
        <tx:method name="update*" read-only="false" rollbackfor="java.lang.Exception" propagation="REQUIRES_NEW"/>
        <tx:method name="delete*" read-only="false" rollbackfor="java.lang.Exception" propagation="REQUIRES_NEW"/>
    </tx:attributes>
</tx:advice>
```

注意：基于xml实现的声明式事务，必须引入aspectJ的依赖  

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>5.3.1</version>	
</dependency>
```

