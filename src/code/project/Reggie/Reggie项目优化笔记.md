---
title: Reggie 优化
---
## 1、缓存优化

用户数量多，系统访问量大
频繁访问数据库，系统性能下降，用户体验差

### 1、通过git推送远程仓库

在github上新建仓库
在idea中新建git本地仓库
在idea中add添加缓存区
在ieda中commit提交本地库
在idea中关联远程仓库
在idea中push代码

### 2、创建新分支

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230317141628.png)

创建新分支名为v1.0

push到远程仓库

### 3、环境搭建

在pom文件中导入spring data redids的maven坐标

```xml
<!--redis-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

在项目的applicaation.yml中加入redis相关配置

```yaml
#redis
redis:
 host: 192.168.80.130
 port: 6379
 database: 0
```

在项目中配置RedisConfig，更改序列化器

```java
@Configuration
public class RedisConfig extends CachingConfigurerSupport {
    @Bean
    public RedisTemplate<Object,Object> redisTemplate(RedisConnectionFactory connectionFactory){
        RedisTemplate<Object,Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setConnectionFactory(connectionFactory);
        return redisTemplate;
    }
}
```

### 4、缓存短信验证码

将原本保存在Session中的短信验证码放到Redis中，具体实现思路：
1、在服务短板UserController中注入RedisTemplate对象，用于操作Redis
2、在服务端UserController中的sendMsg方法，将随机生成的验证码缓存到Redis中，设置有效期为5分钟
3、在服务端UserController的login方法中，从Redis中获取缓存的验证码，如果登录成功删除Redis中的验证码

更改UserController类：

```java
@Autowired
private RedisTemplate redisTemplate;

public R<String> sendMeg(@RequestBody User user, HttpSession session){
    ...
 	//将生成的验证码缓存到Redis中，并且设置有效期为5分钟
    redisTemplate.opsForValue().set(phone,code,5, TimeUnit.MINUTES);
}

public R<User> login(@RequestBody Map map,HttpSession session){
    ...
	//登陆成功，删除redis中缓存的验证码
    redisTemplate.delete(phone);
    
}
```

### 5、缓存菜品数据

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230317162916.png)

实现思路如下：
1、改造DIshController的list方法，先从Redis中获取数据，如果有则直接返回，如果没有则查询数据库，并将查询到的菜品数据放入Redis。
2、改造DIshController的save和update方法，加入清理缓存的逻辑

在使用缓存过程中，要注意保证数据中的数据和缓存中的一致，如果数据库中的数据和缓存的数据一致，如果数据库中的数据发生变化，需要及时清理缓存数据。

更改DIshController

```java
@Autowired
private RedisTemplate redisTemplate;

@PutMapping
public R<String> update(@RequestBody DishDto dishDto){
    dishService.updateWithFlavor(dishDto);

    //清理所有菜品的缓存数据
    /*Set keys = redisTemplate.keys("dish_*");//获取所欲dish_开头的key
        redisTemplate.delete(keys);*/

    //清理某个分类下面的菜品数据
    String key = "dish_" + dishDto.getCategoryId() + "_1";
    redisTemplate.delete(key);

    return R.success("菜品修改成功");
}

@GetMapping("/list")
public R<List<DishDto>> list(Dish dish){
    List<DishDto> dishDtoList = null;

    //先从Redis中获取数据
    String key = "dish_" + dish.getCategoryId() + "_" + dish.getStatus(); //动态构造key
    dishDtoList = (List<DishDto>) redisTemplate.opsForValue().get(key);

    if(dishDtoList != null){
        //如果存在，直接返回
        return R.success(dishDtoList);
    }
    //如果不存在，查询数据库，将查询到的菜品数据缓存到Redis
    //构造查询条件
    LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper<>();
    //添加查询条件
    queryWrapper.eq(dish.getCategoryId() != null,Dish::getCategoryId,dish.getCategoryId());
    //查询状态为1（起售状态）
    queryWrapper.eq(Dish::getStatus,1);
    //构造排序条件
    queryWrapper.orderByAsc(Dish::getSort).orderByDesc(Dish::getUpdateTime);
    List<Dish> list = dishService.list(queryWrapper);
    dishDtoList = list.stream().map((item) -> {
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

    //将菜品缓存到redis
    //将数组序列化为一个字符串
    redisTemplate.opsForValue().set(key,dishDtoList,60, TimeUnit.MINUTES);

    return R.success(dishDtoList);
}
```

### 6、合并分支

切到master分支

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230317172319.png)

## 2、Spring Cache

### 1、Spring Cache介绍

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230317172539.png)

SpringCache常用注解

| 注解           | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| @EnableCaching | 开启缓存注解功能                                             |
| @Cacheable     | 在方法执行前Spring先查看缓存中是否有数据，如果有数据，直接返回缓存数据，如果没有数据，调用方法并将方法返回值放到缓存中 |
| @CachePut      | 将方法的返回值放到缓存中                                     |
| @CacheEvict    | 将一条或多条数据从缓存中删除                                 |

在spring boot项目中，使用缓存技术只需要在项目中导入相关缓存技术的依赖包，并在启动类上使用@EnableCaching开启缓存支持即可
例如，使用Redis作为缓存技术，Spring data Redis的maven坐标即可

```java
/**
* CachePut：将方法返回值放入缓存
* value：缓存的名称，每个缓存名称下面可以有多个key
* key：缓存的key
*/
@CachePut(value = "userCache" key = "#user.id")
@PostMapping
public User save(User user){}

/**
* CacheEvict：清理指定缓存
* value：缓存的名称，每个缓存名称下面可以有多个key
* key：缓存的key
* allEntries = true/false：是否删除这个分类（value）下所有的缓存数据
*/
//@CacheEvit(value = "userCache" key = "#root.args[0]")
//@CacheEvit(value = "userCache" key = "#id")
@CacheEvit(value = "userCache" key = "#p0")
@DeleteMapping("/{id}")
public void delete(@pathVariable Long id){}

//@CacheEvict(value = "userCache",key = "#p0.id")
//@CacheEvict(value = "userCache",key = "#user.id")
//@CacheEvict(value = "userCache",key = "#root.agrs[0].id")
@CacheEvict(value = "userCache",key = "#result.id") //返回值的id
@PutMapping
public UserUpdate(USer uer){}

/**
* Cacheable:在方法执行前Spring先查看缓存中是否有数据，如果有数据，直接返回缓存数据，如果没有数据，调用方法并将方法返回值放到缓存中
* value：缓存的名称，每个缓存名称下面可以有多个key
* key：缓存的key
* condition：条件，满足条件才缓存数据
* unless：满足条件则不缓存
*/
@Cacheable(value = "userCache",key = "#id",condition = "#result != null")
@GetMapping("/{id}")
public List<User> getById(@pathVariable Long id){}

@Cacheable(Value = "userCache",key = "#user.id + '_' + #user.name")
@GetMapping("/list")
public List<User> list(User user){}
```

### 2、Spring Cache使用方式

在Spring Boot项目中使用Spring Cache的操作步骤（使用redis缓存技术）：
1、导入maven坐标

```xml
<!--Spring Cache-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

2、配置application.yml

```yml
#设置缓存有效期
spring:
  cache:
    redis:
      #过期时间，单位毫秒，即30分钟
      time-to-live: 1800000
```

3、在启动类上加入@EnableCaching注解，开启缓存注解功能
4、@Controller的方法上加入@Cacheable、@CacheEvict等注解，进行缓存操作

### 3、缓存套餐数据

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230317205237.png)

具体实现思路：
1、导入Spring Cache和Redis相关maven坐标
2、在application.yml中配置缓存数据过期时间
3、在启动类上加入EnableCacheing注解，开启缓存注解功能
4、在SetmealController的list方法上加入@Cacheable注解
5、在SetmealController的save和delete方法上加入CacheEvict注解

更改list方法：

```java
@GetMapping("list")
@Cacheable(value = "setmealCache" , key = "#setmeal.categoryId + '_' + #setmeal.status")
public R<List<Setmeal>> list(Setmeal setmeal){
    LambdaQueryWrapper<Setmeal> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(setmeal.getCategoryId() != null,Setmeal::getCategoryId,setmeal.getCategoryId());
    queryWrapper.eq(setmeal.getStatus() != null,Setmeal::getStatus,1);
    queryWrapper.orderByDesc(Setmeal::getUpdateTime);
    List<Setmeal> list = setmealService.list(queryWrapper);
    return R.success(list);
}
```

注：将返回结果**R实现序列化接口**，否则缓存会报错

```java
public class R<T> implements Serializable {}
```

更改delete与save方法：

```java
@PostMapping
@DeleteMapping
@CacheEvict(value = "setmealCache",allEntries = true)
public R<String> save(@RequestBody SetmealDto setmealDto){}

@DeleteMapping
@CacheEvict(value = "setmealCache",allEntries = true)
public R<String> delete(@RequestParam List<Long> ids)()
```

## 3、读写分离

### 1、MySQL主从复制

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230317212236.png)

主库只能有一个，从库可以有多个

#### 1、主从数据库的准备

MySQL主从复制-前置条件：
提前准备好两台服务器，分别安装Mysql并启动服务成功

这里一台为本机，一台为CentOS
在 CentOS 操作系统上，可以通过以下步骤来启动、使用 MySQL 服务：

1. 使用以下命令启动 MySQL 服务：

   ```shell
   sudo systemctl start mysqld.service
   ```

2. 如果需要在系统启动时自动启动 MySQL 服务，可以使用以下命令设置：

   ```shell
   sudo systemctl enable mysqld.service
   ```

3. 检查 MySQL 服务是否已经启动，可以使用以下命令：

   ```shell
   luaCopy code
   sudo systemctl status mysqld.service
   ```

   如果服务已经启动，将会显示 Active: active (running)。

4. 连接到 MySQL：

   ```shell
   cssCopy code
   mysql -u username -p
   ```

   其中 `username` 是您的 MySQL 用户名。在输入此命令后，系统将提示您输入密码。

主库：192.168.80.130
从库：192.168.80.135

#### 2、配置主库Master

第一步，修改Mysql数据库的配置文件 /etc/my.cnf

```
log-bin=mysql-bin #[必须]启动二进制文件
server-id=100 #[必须]服务器唯一ID
```

第二步：重启Mysql服务

```shell
systemctl restart mysqld
```

第三步：登录Mysql数据库，执行下面SQL

```sql
create user t4mako identified by 'root';
grant replication slave on *.* to t4mako;
```

上面的SQL的作用是创建一个用户t4mako，密码为root，并且给t4mako用户授予REPLICATION SLAVE权限，常用于建立复制时所需要用到的用户权限，也就是slave必须被master授权具有该权限的用户，才能通过该用户复制。

第四步：登录mysql数据库，执行下面SQL记录下结果中file和position的值

```sql
 show master status; 
```

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318113857.png)

#### 3、配置从库Slaver

第一步：修改Mysql数据库配置文件/etc/my.cnf （Ubuntu下在 /etc/mysql/my.cnf）

```
!server-id=101 #[必须]服务器唯一ID (Ubuntu下加一个！)
```

第二步：重启服务

```shell
systemctl restart mysql
```

第三步：登录数据库，执行下面SQL：

```sql
change master to master_host='192.168.80.130',master_user='t4mako',master_password='root',master_log_file='mysql-bin.000001',master_log_pos=695;

start slave;
```

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318120010.png)

第四步：查看数据库状态

```sql
show slave status;
```

### 2、ShardingJDBC

![image-20230318134934027](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230318134934027.png)

### 3、读写分离案例

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318134703.png)

使用Sharding-JDBC实现读写分离步骤：
1、导入maven坐标
2、在配置文件中配置读写分离规则
3、在配置文件中配置允许bean定义覆盖配置项

```xml
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>sharding-jdbc-spring-boot-starter</artifactId>
    <version>4.0.0-RC1</version>
</dependency>
```

```yml
server:
  port: 8080
mybatis-plus:
  configuration:
    #在映射实体或者属性时，将数据库中表名和字段名中的下划线去掉，按照驼峰命名法映射
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      id-type: ASSIGN_ID
spring:
  shardingsphere:
    datasource:
      names:
        master,slave
      # 主数据源
      master:
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://192.168.138.100:3306/rw?characterEncoding=utf-8
        username: root
        password: root
      # 从数据源
      slave:
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://192.168.138.101:3306/rw?characterEncoding=utf-8
        username: root
        password: root
    masterslave:
      # 读写分离配置
      load-balance-algorithm-type: round_robin #轮询
      # 最终的数据源名称
      name: dataSource
      # 主库数据源名称
      master-data-source-name: master
      # 从库数据源名称列表，多个逗号分隔
      slave-data-source-names: slave
    props:
      sql:
        show: true #开启SQL显示，默认false
  main:
    allow-bean-definition-overriding: true #允许并定义覆盖（定义覆盖配置项）
```

Sharding-JDBC会通过type类名反射创建DataSource，所以druid就无需配置DataSource，所以用druid-starter的话要排除druid的自动配置类去配置DataSource。这是通过Bean覆盖的方式去解决

### 4、项目实现读写分离

配置方式与3一致

## 4、Nginx

### 1、Nginx概述

Nginx是一款轻量级的Web服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，其特点是占有内存少，并发能力强，事实上nginx的并发能力在同类型的网页服务器中表现较好，中国大陆使用nginx的网站有：百度，京东，新浪，网易，腾讯，淘宝等

Nginx是由伊戈尔·塞索耶夫为俄罗斯访问量第二的Rambler.ru站点开发的，第一个公开版本0.1.0发布于2004年10月

官网：https://nginx.org

### 2、Nginx的下载与安装

通过官网下载tar.gz或者如下步骤

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318143107.png)

注意：若第六步骤安装出错，先执行

```shell
yum -y install openssl openssl-devel
```

再执行 5 、6 两步

安装完成：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318144340.png)

Nginx的目录结构：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318144609.png)

### 3、Nginx命令

在**sbin目录**下查看Nginx版本：**./nginx -v**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318144902.png)

**检查配置文件的正确性**：在启动Nginx服务之前，可以先检查一下conf/nginx.conf文件配置是否有错误，命令如下：**./nginx -t**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318145106.png)

启动Nginx服务命令： **./nginx**

停止Nginx服务命令： **./nginx -s stop**

重启Nginx服务命令： **./nginx -s reload**

启动完成后可以查看Nginx进程： ps -ef | grep nginx
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318145445.png)

关闭防火墙后，通过ip即可访问nginx
**Nginx端口为80，可以省略**

通过**配置Nginx环境变量**，在处处可使用Nginx命令：
 vim /etc/profile 修改文件	source /etc/profile 立即生效
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318150349.png)

这样可以直接通过
Nginx	启动Nginx

### 4、Nginx配置文件结构

整体结构介绍：
Nginx配置文件（conf/nginx.conf）整体分为三部分：

1. 全局块：和Nginx运行相关的全局配置

2. enents块：和网络连接相关的配置

3. http块：代理、缓存、日志记录、虚拟主机配置

   ​	http全局块

   ​	server块：

   ​		server全局块

   ​		location块

注：http块中可以配置多个Server块，每个Server块中可以配置多个location块

查看配置文件
cat /usr/local/nginx/conf/nginx.conf

### 5、Nginx具体应用

#### 1、部署静态资源

Nginx可以作为静态web服务器来部署静态资源。静态资源指在服务端真实存在并且能够直接展示的一些文件。比如常见的html页面，css文件，图片，视频等资源。
相对于Tomcat，**Nginx处理静态资源的能力更加高效**，所以在生产环境下，一般会将静态资源部署到Nginx中。
将静态资源部署到Nginx非常简单，只需要将文件复制到Nginx安装目录下的html目录中即可。

#### 2、反向代理

**正向代理**
正向代理一般在**客户端设置代理服务器**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318154039.png)



**反向代理**
反向代理，**客户端不知道目标服务器地址，也无需用户端的任何设定**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318154247.png)

配置反向代理：
针对82这个端口的请求，转发到另一台服务器上

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318154927.png)

#### 3、负载均衡

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318155937.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318160002.png)

配置负载均衡：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318160308.png)

upstream指令用于定义一组服务器
最后一行 targetserver 名字任意，与 upstream 后的名字一致即可
可以在upstream中server服务器ip后添加 weight=10 参数设置权重，数值越大，分发给它的几率越高

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318160929.png)

## 5、前后端分离开发/API

### 1、前后端分离开发介绍

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318161318.png)

工程拆分：
将一个完整工程拆分成前端工程和后端工程
前端工程部署到Nginx中
后端工程部署到Tomcat中

开发流程：
前后端分离开发后，面临一个问题，就是前后端开发人员后后端开发人员如何进行配合来共同开发一个项目？
可以按照如下流程进行：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318161852.png)

接口（API）接口就是一个Http的请求地址，只要就是去定义：请求路径、请求方式、请求参数，响应数据等内容

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230318162352.png)

### 2、YApi/ApiFox



![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230319092700.png)

[YApi源码地址](https://github.com/YMFE/yapi)

要使用YApi，需要自己进行部署

相似产品：[apifox](https://www.apifox.cn/)（更方便，无需自己部署）
[apifox的使用](https://www.bilibili.com/video/BV1ae4y1y7bf/?vd_source=93736dd4ac5c01d75d784e06d15a93ac)

### 3、Swagger

#### 1、Swagger介绍

使用Swagger只需要按照它的规范定义接口信息及接口相关信息，在通过Swagger衍生出来的一系列项目和工具就可以做到生成各种格式的接口文档，以及在线接口调试页面等。
[Swagger官网](https://swagger.io/)

**knife4j**是Java MVC框架**集成Swagger生成Api文档**的**增强解决方案**。

```xml
<!--knife4j,集成Swagger生成API文档-->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.2</version>
</dependency>
```

#### 2、使用方式

1、导入knife4j的maven坐标
2、导入knife4j相关配置类
3、设置静态资源，否则接口文档页面无法访问
4、在LoginCheckFilter中设置不需要处理的请求

① maven坐标

```xml
<!--knife4j,集成Swagger生成API文档-->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.2</version>
</dependency>
```

② 导入knife4j相关配置类

更新WebMvcConfig：

```java
@Slf4j
@Configuration
@EnableSwagger2
@EnableKnife4j
public class WebMvcConfig extends WebMvcConfigurationSupport {
    @Bean
    public Docket createRestApi() {
        // 文档类型
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
			   //扫描controller包结构，每个方法生成对应接口文档
                .apis(RequestHandlerSelectors.basePackage("com.t4mako.reggie.controller")) 
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("瑞吉外卖")
                .version("1.0")
                .description("瑞吉外卖接口文档")
                .build();
    }
```

③ 设置静态资源，否则接口文档页面无法访问

```java
@Override
protected void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("doc.html").addResourceLocations("classpath:/META-INF/resources/");
    registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    registry.addResourceHandler("/backend/**").addResourceLocations("classpath:/backend/");
    registry.addResourceHandler("/front/**").addResourceLocations("classpath:/front/");
}
```

④ 在LoginCheckFilter中设置不需要处理的请求

修改LoginCheckFilter：

```java
//定义不需要处理的请求路径
String[] urls = new String[]{
    "/employee/login",
    "/employee/logout",
    "/backend/**",
    "/front/**",
    "/common/**",
    "/user/sendMsg", //front的短信验证情趣
    "/user/login",   //用户登录
    "/doc.html",
    "/webjars/**",
    "/swagger-resources",
    "/v2/api-docs"
};
```

访问localhost/doc.html查看接口文档

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230319100514.png)

可以测试数据，下载接口文档

#### 3、Swagger常用注解

| 注解               | 说明                                                     |
| ------------------ | -------------------------------------------------------- |
| @Api               | 用在请求的类上，例如Controller，表示对类的说明           |
| @ApiMoedl          | 用在类上，通常是实体类，表示一个返回响应数据的信息       |
| @ApiModelProperty  | 用在属性上，描述响应类的属性                             |
| @ApiOperation      | 用在请求的方法上，说明方法的用途，作用                   |
| @ApiImplicitParams | 用在请求的方法上，表示一组参数说明                       |
| @ApiImplicitParam  | 用在@ApiImplicitParams注解中，指定一个请求参数的各个方面 |

## 6、项目部署

### 1、部署架构、环境

部署架构：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230319102525.png)

部署环境说明：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230319102727.png)

### 2、部署前端项目

1、在服务器A中安装Nginx，将项目中的dist目录上传到Nginx的html下

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230319103030.png)

2、修改Nginx配置文件

修改配置文件，完成重写请求路径的功能

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230319103914.png)

### 3、后端项目的部署

1、在服务器B中安装jdk，git，maven，MySQL，使用git clone将git远程仓库的diamante克隆下俩

2、将资料中的reggieStart.sh文件上传到服务器B，通过chmod命令设置执行权限

3、修改图存存储的位置

如：

```yml
reggie：
 path：/usr/local/img/
```