---
：title: Shiro 基础
category: 
    - java

---

## 1、基本介绍

### 1.1、Shiro 架构：

- Subject：任何可以与应用交互的用户

- SecurityManager ：是 Shiro 的核心

  所有具体的交互都通过 SecurityManager 进行控制；它管理着所有 Subject、且负责进 行认证、授权、会话及缓存的管理

- Authenticator：负责 Subject 认证，可以自定义实现；可以使用认证策略（ Authentication Strategy），即什么情况下算用户认证通过了

- Authorizer：授权器、即访问控制器，用来决定主体是否有权限进行相应的操作；即控制着用户能访问应用中的哪些功能

- Realm：可以有 1 个或多个 Realm，可以认为是安全实体数据源，即用于获取安全实体的；可以是 JDBC 实现，也可以是内存实现等等；由用户提供；所以一般在应用中都需要实现自己的 Realm；  

- SessionManager：管理 Session 生命周期的组件；而 Shiro 并不仅仅可以用在 Web环境，也可以用在如普通的 JavaSE 环境  

- CacheManager：缓存控制器，来管理如用户、角色、权限等的缓存的；因为这些数据基本上很少改变，放到缓存中后可以提高访问的性能

- Cryptography：密码模块， Shiro 提高了一些常见的加密组件用于如密码加密/解密。  

### 1.2、登录认证

在 shiro 中，用户需要提供 principals（身份）和credentials（证明）给 shiro，从而应用能验证用户身份：  

- principals：身份，即主体的标识属性，可以是任何属性，如用户名、邮箱等，唯一即可。一个主体可以有多个principals，但只有一个Primary principals，一般是用户名 / 邮箱 / 手机号
- credentials：证明/凭证，即只有主体知道的安全值，如密码/数字证书等  
- 最常见的 principals 和 credentials 组合就是用户名/密码  

登录认证基本流程：

- 收集用户身份/凭证，即如用户名 / 密码  
- 用 Subject.login 进行登录，如果失败将得到相应的 AuthenticationException 异常，根据异常提示用户错误信息；否则登录成功  
- 创建自定义的 Realm 类，继承 org.apache.shiro.realm.AuthenticatingRealm 类，实现 doGetAuthenticationInfo() 方法  

自定义登录认证：

- Shiro 默认的登录认证是不带加密的，如果想要实现加密认证需要自定义登录认证，自定义 Realm。  

```java
public class MyRealm extends AuthenticatingRealm {
//自定义的登录认证方法， Shiro 的 login 方法底层会调用该类的认证方法完成登录认证
//需要配置自定义的 realm 生效，在 ini 文件中配置，或 Springboot 中配置
//该方法只是获取进行对比的信息，认证逻辑还是按照 Shiro 的底层认证逻辑完成认证
	protected AuthenticationInfo doGetAuthenticationInfo(
		AuthenticationToken authenticationToken) throws AuthenticationException {
        //1 获取身份信息
        String principal = authenticationToken.getPrincipal().toString();
        //2 获取凭证信息
        String password = new String((char[])
        authenticationToken.getCredentials());
        System.out.println("认证用户信息： "+principal+"---"+password);
        //3 获取数据库中存储的用户信息
    	if(principal.equals("zhangsan")){
            //3.1 数据库存储的加盐迭代 3 次密码
            String pwdInfo = "7174f64b13022acd3c56e2781e098a5f";
            //3.2 创建封装了校验逻辑的对象，将要比较的数据给该对象
            AuthenticationInfo info = new SimpleAuthenticationInfo(
            authenticationToken.getPrincipal(),
            pwdInfo,
            ByteSource.Util.bytes("salt"),
            authenticationToken.getPrincipal().toString());
            return info;
    	}
		return null;
	}
}
```

在shiro.ini中添加配置信息  

```ini
[main]
md5CredentialsMatcher=org.apache.shiro.authc.credential.Md5CredentialsMatcher
md5CredentialsMatcher.hashIterations=3
myrealm=com.atguigu.shirotest.MyRealm
myrealm.credentialsMatcher=$md5CredentialsMatcher
securityManager.realms=$myrealm
[users]
zhangsan=7174f64b13022acd3c56e2781e098a5f,role1,
role2
lisi=l4
[roles]
role1=user:insert,user:select
```



### 1.3、角色授权

在授权中需了解的几个关键对象：主体（Subject）、资源（Resource）、权限 （Permission）、角色（Role）。- 

- 主体（Subject）：

  访问应用的用户，在 Shiro 中使用 Subject 代表该用户。用户只
  有授权 后才允许访问相应的资源。

- 资源（Resource)） 在应用中用户可以访问的 URL，查看 / 编辑
  某些数据、访问某个业务方法、打印文本等等都是资源。用户只要授权后才能访问。

- 权限（Permission）：安全策略中的原子授权单位，通过权限我们可以表示在应用中用户有没有操作某个资源的权力。 即权限表示在应用中用户能不能访问某个资源，（即很多时候都是CRUD（增查改删）式权
  限控 制）等。权限代表了用户有没有操作某个资源的权利

- Shiro 支持粗粒度权限（如用户模块的所有权限）和细粒度权限（操作某个用户的权限， 即实例级别的）

- 角色（Role）： 权限的集合，一般情况下会赋予用户角色而不是权限，即这样用户可以拥有 一组权限，赋予权限时比较方便。典型的如：项目经理、技术总监、 CTO、开发工程师等 都是角色，不同的角色拥有一组不同的权限  

## 2、Shiro 与 SprintBoot 整合

相关依赖

```xml
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-spring-boot-web-starter</artifactId>
    <version>1.9.0</version>
</dependency>
```

### 2.1、自定义 realm  

```java
@Component
public class MyRealm extends AuthorizingRealm {
    @Autowired
    private UserService userService;
	//自定义授权方法
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection
        principalCollection) {
            return null;
    }
	//自定义登录认证方法
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //1 获取用户身份信息
        String name = token.getPrincipal().toString();
        //2 调用业务层获取用户信息（数据库中）
        User user = userService.getUserInfoByName(name);
        //3 判断并将数据完成封装
        if(user!=null){
            AuthenticationInfo info = new SimpleAuthenticationInfo(
            token.getPrincipal(),
            user.getPwd(),
            ByteSource.Util.bytes("salt"),
            token.getPrincipal().toString()
            );
            return info;
		}
	return null;
	}
}
```

编写配置类

```java
@Configuration
public class ShiroConfig {
@Autowired
private MyRealm myRealm;
//配置 SecurityManager
@Bean
public DefaultWebSecurityManager defaultWebSecurityManager(){
//1 创建 defaultWebSecurityManager 对象
DefaultWebSecurityManager defaultWebSecurityManager = new
DefaultWebSecurityManager();
//2 创建加密对象，并设置相关属性
HashedCredentialsMatcher matcher = new
HashedCredentialsMatcher();
//2.1 采用 md5 加密
matcher.setHashAlgorithmName("md5");
//2.2 迭代加密次数
matcher.setHashIterations(3);
//3 将加密对象存储到 myRealm 中
myRealm.setCredentialsMatcher(matcher);
//4 将 myRealm 存入 defaultWebSecurityManager 对象
defaultWebSecurityManager.setRealm(myRealm);
//5 返回
return defaultWebSecurityManager;
}
//配置 Shiro 内置过滤器拦截范围
@Bean
public DefaultShiroFilterChainDefinition
shiroFilterChainDefinition(){
DefaultShiroFilterChainDefinition definition = new
DefaultShiroFilterChainDefinition();
//设置不认证可以访问的资源
definition.addPathDefinition("/myController/userLogin","anon");
definition.addPathDefinition("/login","anon");
//设置需要进行登录认证的拦截范围
definition.addPathDefinition("/**","authc");
return definition;
}
```

### 2.2、多个 realm

当应用程序配置多个 Realm 时，例如：用户名密码校验、手机号验证码校验等等。Shiro 的 ModularRealmAuthenticator 会使用内部的 AuthenticationStrategy 组件判断认证是成功还是失败  

AuthenticationStrategy 是一个无状态的组件，它在身份验证尝试中被询问  4 次（这 4 次交互所需的任何必要的状态将被作为方法参数）：  

- 在所有 Realm 被调用之前
-  在调用 Realm 的 getAuthenticationInfo 方法之前
- 在调用 Realm 的 getAuthenticationInfo 方法之后
- 在所有 Realm 被调用之后  

认证策略的另外一项工作就是聚合所有 Realm 的结果信息封装至一个
AuthenticationInfo 实例中，并将此信息返回，以此作为 Subject 的身份信息  

Shiro 中定义了 3 种认证策略的实现：  

- AtLeastOneSuccessfulStrategy：只要有一个（或更多）的 Realm 验证成功，那么认证将视为成功
- FirstSuccessfulStrategy：第一个 Realm 验证成功，整体认证将视为成功，且后续 Realm 将被忽略
- AllSuccessfulStrategy：所有 Realm 成功，认证才视为成功

ModularRealmAuthenticator 内置的认证策略默认实现是
AtLeastOneSuccessfulStrategy 方式。可以通过配置修改策略  

多个 realm 代码实现：

```java
//配置 SecurityManager
@Bean
public DefaultWebSecurityManager defaultWebSecurityManager(){
//1 创建 defaultWebSecurityManager 对象
DefaultWebSecurityManager defaultWebSecurityManager = new
DefaultWebSecurityManager();
//2 创建认证对象，并设置认证策略
ModularRealmAuthenticator modularRealmAuthenticator = new
ModularRealmAuthenticator();
modularRealmAuthenticator.setAuthenticationStrategy(new
AllSuccessfulStrategy());
defaultWebSecurityManager.setAuthenticator(modularRealmAuthenticator)
;
//3 封装 myRealm 集合
List<Realm> list = new ArrayList<>();
list.add(myRealm);
list.add(myRealm2);
//4 将 myRealm 存入 defaultWebSecurityManager 对象
defaultWebSecurityManager.setRealms(list);
//5 返回
return defaultWebSecurityManager;
}
```

### 2.3、remember me  

Shiro 提供了记住我（RememberMe）的功能，比如访问一些网站时，关闭了浏览器，下次再打开时还是能记住你是谁， 下次访问时无需再登录即可访问。  （一般会把 RememberMe 的 Cookie 写到客户端并保存下来；  ）

代码实现：

```java
/* 
* 配置类
*/
@Configuration
public class ShiroConfig {
@Autowired
private MyRealm myRealm;
//配置 SecurityManager
@Bean
public DefaultWebSecurityManager defaultWebSecurityManager(){
//1 创建 defaultWebSecurityManager 对象
DefaultWebSecurityManager defaultWebSecurityManager = new
DefaultWebSecurityManager();
//2 创建加密对象，并设置相关属性
HashedCredentialsMatcher matcher = new
    HashedCredentialsMatcher();
//2.1 采用 md5 加密
matcher.setHashAlgorithmName("md5");
//2.2 迭代加密次数
matcher.setHashIterations(3);
//3 将加密对象存储到 myRealm 中
myRealm.setCredentialsMatcher(matcher);
//4 将 myRealm 存入 defaultWebSecurityManager 对象
defaultWebSecurityManager.setRealm(myRealm);
//4.5 设置 rememberMe
defaultWebSecurityManager.setRememberMeManager(rememberMeManager());
//5 返回
return defaultWebSecurityManager;
}
//cookie 属性设置
public SimpleCookie rememberMeCookie(){
SimpleCookie cookie = new SimpleCookie("rememberMe");
//设置跨域
//cookie.setDomain(domain);
cookie.setPath("/");
cookie.setHttpOnly(true);
cookie.setMaxAge(30*24*60*60);
return cookie;
}
//创建 Shiro 的 cookie 管理对象
public CookieRememberMeManager rememberMeManager(){
CookieRememberMeManager cookieRememberMeManager = new
CookieRememberMeManager();
cookieRememberMeManager.setCookie(rememberMeCookie());
cookieRememberMeManager.setCipherKey("1234567890987654".getBytes());
return cookieRememberMeManager;
}
//配置 Shiro 内置过滤器拦截范围
@Bean
public DefaultShiroFilterChainDefinition
shiroFilterChainDefinition(){
DefaultShiroFilterChainDefinition definition = new
DefaultShiroFilterChainDefinition();
//设置不认证可以访问的资源
definition.addPathDefinition("/myController/userLogin","anon");
definition.addPathDefinition("/myController/login","anon");
//设置需要进行登录认证的拦截范围
definition.addPathDefinition("/**","authc");
//添加存在用户的过滤器（rememberMe）
definition.addPathDefinition("/**","user");
return definition;
}
```

```java
/*
* controller
*/
//登录认证
@GetMapping("userLogin")
public String userLogin(String name, String pwd,@RequestParam(defaultValue =
"false")boolean rememberMe, HttpSession session){
//1 获取 Subject 对象
Subject subject = SecurityUtils.getSubject();
//2 封装请求数据到 token 对象中
AuthenticationToken token = new UsernamePasswordToken(name,pwd,rememberMe);
//3 调用 login 方法进行登录认证
try {
subject.login(token);
session.setAttribute("user",token.getPrincipal().toString());
return "main";
} catch (AuthenticationException e) {
e.printStackTrace();
System.out.println("登录失败");
return "登录失败";
}
}
```

### 2.4、授权、角色认证

用户登录后， 需要验证是否具有指定角色指定权限。  

通过 Realm 的 doGetAuthorizationInfo 方法进行判断。触发权限判断的有两种方式  

- 在页面中通过shiro:****属性判断  
- 在接口服务中通过注解@Requires****进行判断  

后端接口服务注解  

- @RequiresAuthentication：验证用户是否登录，等同于方法subject.isAuthenticated()

-  @RequiresUser：

  验证用户是否被记忆：
  登录认证成功 subject.isAuthenticated() 为 true
  登录后被记忆 subject.isRemembered() 为 true

- @RequiresGuest：验证 subject 是否有相应角色，有角色访问方法，没有则会抛出异常 AuthorizationException

- @RequiresRoles：

  例如： @RequiresRoles(“aRoleName”)
  void someMethod();
  只有 subject 有 aRoleName 角色才能访问方法 someMethod()

- @RequiresPermissions：

  验证 subject 是否有相应权限，有权限访问方法，没有则会抛出异常
  AuthorizationException

  例如： @RequiresPermissions (“file:read”,”wite:aFile.txt”)
  void someMethod();
  subject 必须同时含有 file:read 和 wite:aFile.txt 权限才能访问方法someMethod()  

  

