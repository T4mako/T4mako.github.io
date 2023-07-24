---
title: JWT 教程
icon: token
order: 13
date: 2022-06-09
category: 
    - java
tag: 
    - jwt
    - 单点登录
    - 安全
---
## JWT 

### 1、JWT 介绍

JSON Web Token ([JWT](https://jwt.io/introduction/)) 是一个开放标准（rfc7519），它定义了一种紧凑的、自包含的方式，用于在各方之间以 **JSON对象** 安全地传输信息。此信息可以验证和信任，因为它是数字签名的。JWT 可以使用 HMAC算法 或 使用 RSA 或 ECDSA 的公钥/私钥对进行签名
<!-- more -->

JSON Web Token（缩写 JWT）是目前最流行的跨域认证解决方案																																																										

### 2、JWT 作用

1、**登录授权**

- 用户登录，后续每个请求将包括 JWT，从而允许用户访问该令牌允许的路由，服务和资源。|
  **单点登录** 是当今广泛使用JWT的一项功能，因为它的开销小且能在不同的域中使用。

2、**信息交换**

- JSON Web Token 可以在各方之间安全传输信息
  通过对 JWT 进行签名（例如，使用公钥/私钥对），可以确保发件人是他们所说的人。
  此外，由于签名是使用标头和有效负载计算的，因此您还可以验证内容是否遭到篡改。

### 3、session 与 JWT 对比

#### 传统的Session认证

认证方式：

1. 用户向服务器发送用户名和密码。
2. 服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。
3. 服务器向用户返回一个 session_id，写入用户的 Cookie。
4. 用户 **随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器**。
5. 服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。

> 这种模式的问题在于，扩展性（scaling）不好。
> 单机当然没有问题，如果是服务器集群，或者是跨域的服务导向架构，就要求 session 数据共享，**每台服务器都能够读取 session**
>
> http 协议本身是一种 无状态 的协议，我们并不能知道是哪个用户发出的请求
>
> 所以为了让我们的应用能识别是哪个用户发出的请求，我们只能在 **服务器存储** 一份用户登录的信息，这份登录信息会在响应时传递给浏览器，告诉其保存为cookie,以便下次请求时发送给我们的应用，这样我们的应用就能识别请求来自哪个用户了,这就是传统的基于session认证。

![image-20200726103959013](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20200726103959013.png)

暴露问题：

1. 每个用户经过我们的应用认证之后，我们的应用都要在服务端做一次记录，通常而言 session 都是保存在 **内存** 中，而随着认证用户的增多，服务端的开销会明显增大
2. 用户认证之后，服务端做认证记录，如果认证的记录被保存在内存中的话，这意味着用户下次请求还必须要请求在这台服务器上，这样在分布式的应用上，相应的限制了 **负载均衡** 器的能力。这也意味着限制了应用的扩展能力。
3. 因为是基于cookie来进行用户识别的, cookie如果被截获，用户就会很容易受到跨站请求伪造的攻击。
4. 在前后端分离系统中：
   ① 通常用户一次请求就要转发多次。如果每次携带 sessionid 到服务器，服务器还要查询用户信息。
   ② 如果用户很多。这些信息存储在服务器内存中，给 **服务器增加负担**。
   ③ **CSRF** 攻击：session 是基于cookie 进行用户识别的, cookie 如果被截获，用户就会很容易受到 跨站请求伪造 的攻击。
   ④ sessionid 就是一个特征值，**表达的信息不够丰富**。不容易扩展。而且如果你后端应用是多节点部署。那么就需要实现session共享机制。不方便集群应用。

> 一种解决方案是 **session 数据持久化**，写入数据库或别的持久层。各种服务收到请求后，都向持久层请求数据。这种方案的优点是架构清晰，缺点是工程量比较大。另外，持久层万一挂了，就会单点失败。
>
> 另一种方案是服务器索性不保存 session 数据了，所有数据都保存在客户端，每次请求都发回服务器。JWT 就是这种方案的一个代表。

#### JWT认证

JWT 的原理是，服务器认证以后，生成一个 JSON 对象，发回给用户

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20200726183248298.png)

**认证流程**

- 前端通过表单将用户名、密码发送到后端。
- 后端核对用户名和密码成功后，将用户的 **id等信息** 作为 **JWT Payload（负载）**，将其与头部分别进行Base64编码拼接后签名，形成一个JWT(Token)。
- 后端将 JWT字符串 作为登录成功的返回结果返回给前端。前端可以将返回的结果保存在 **localStorage** 或 **sessionStorage**上，退出登录时前端删除保存的JWT即可。

- 前端在每次请求时将 JWT 放入 HTTP Header 中的 **Authorization** 位。(解决XSS和XSRF问题) 

- 后端验证 JWT 的有效性。例如，检查签名是否正确、Token是否过期、Token的接收方是否是自己等。
- 验证通过后后端使用 JWT 中包含的用户信息进行其他逻辑操作，返回相应结果。

**JWT优势**

- 简洁(Compact): 可以通过URL，POST参数或者在HTTP header发送，因为数据量小，传输速度也很快

- 自包含(Self-contained)：负载中包含了所有用户所需要的信息，避免了多次查询数据库

- 因为 Token 是以 JSON 加密的形式保存在客户端的，所以 JWT 是跨语言的，原则上任何web形式都支持。

- 不需要在服务端保存会话信息，特别适用于分布式微服务。

### 4、JWT 结构

**header.payload.singnature**

- 1.标头(Header)
- 2.有效载荷(Payload)
- 3.签名(Signature)

#### Header

标头通常由两部分组成：
	① 令牌的类型（即JWT）
	② 所使用的签名算法，例如HMAC SHA256或RSA。
	它会使用 Base64 编码组成 JWT 结构的第一部分。

> 注：Base64是一种编码，并不是一种加密过程，它可以被翻译回原来的样子。

```json
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### Payload

令牌第二部分是 有效负载，其中包含声明。
声明是有关实体（通常是用户）和其他数据的声明。
同样，它会使用 Base64 编码组成 JWT 结构的第二部分

```json
// Payload
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

> 注：JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。

#### Signature

- Signature 需要使用编码后的 header 和 payload 以及我们提供的一个密钥（**盐**），然后使用 header 中指定的签名算法（HS256）进行签名。签名的作用是保证 JWT 没有被篡改过

  Signature = HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload),secret);

签名目的

- 最后一步签名的过程，实际上是对头部以及负载内容进行签名，防止内容被窜改。
- 如果有人对头部以及负载的内容解码之后进行修改，再进行编码，最后加上之前的签名组合形成新的JWT的话，那么服务器端会判断出新的头部和负载形成的签名和JWT附带上的签名是不一样的。
- 如果要对新的头部和负载进行签名，在不知道服务器加密时用的密钥的话，得出来的签名也是不一样的。

信息安全问题

- Base64是一种编码，是可逆的，那么信息会暴露

- 因此在 JWT 中，所以不要把秘密信息放在这个部分。

![image-20200726181136113](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20200726181136113.png)

#### 放在一起

**header.payload.singnature**

- 输出是三个由点分隔的Base64-URL字符串
- 可以通过URL, POST 参数或者在 HTTP header 发送，数据量小，传输速度快
- 自包含(Self-contained)
	负载中包含了所有用户所需要的信息，避免了多次查询数据库

![image-20200726124257203](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20200726124257203.png)

### 5、JWT 使用

[JWT官网提供的使用](https://jwt.io/libraries)

[基于 Java 的使用](https://github.com/auth0/java-jwt)：

#### 1、引入依赖

```xml
<!--引入jwt-->
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>java-jwt</artifactId>
  <version>3.4.0</version>
</dependency>
```

#### 2、生成token

```java
Calendar instance = Calendar.getInstance();
instance.add(Calendar.SECOND, 600); // Token 过期时间为 600s
//生成令牌
String token = JWT.create()
  .withClaim("name", "T4mako")//设置自定义用户名
  .withExpiresAt(instance.getTime())//设置过期时间
  .sign(Algorithm.HMAC256("t4mako!@(*#&$)"));//设置签名 保密 复杂
//输出令牌
System.out.println(token);
```

####  3、根据令牌和签名解析数据

```java
JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256("t4mako!@(*#&$)")).build();
DecodedJWT decodedJWT = jwtVerifier.verify(token);
System.out.println("用户名: " + decodedJWT.getClaim("name").asString());
System.out.println("过期时间: "+decodedJWT.getExpiresAt());
```

#### 4、常见异常信息
- SignatureVerificationException:				签名不一致异常
- TokenExpiredException:    						令牌过期异常
- AlgorithmMismatchException:						算法不匹配异常
- InvalidClaimException:								失效的payload异常

### 6.封装工具类

```java
public class JWTUtils {
    private static String TOKEN = "token!Q@W3e4r";
    /**
     * 生成token
     * @param map  //传入payload
     * @return 返回token
     */
    public static String getToken(Map<String,String> map){
        JWTCreator.Builder builder = JWT.create();
        map.forEach((k,v)->{
            builder.withClaim(k,v);
        });
        Calendar instance = Calendar.getInstance();
        instance.add(Calendar.SECOND,7);
        builder.withExpiresAt(instance.getTime());
        return builder.sign(Algorithm.HMAC256(TOKEN)).toString();
    }
    /**
     * 验证token
     * @param token
     * @return
     */
    public static void verify(String token){
        JWT.require(Algorithm.HMAC256(TOKEN)).build().verify(token);
    }
    /**
     * 获取token中payload
     * @param token
     * @return
     */
    public static DecodedJWT getToken(String token){
        return JWT.require(Algorithm.HMAC256(TOKEN)).build().verify(token);
    }
}
```

### 7.整合springboot

#### Controller 层开发

```java
@RestController
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;
    
    // 此处用 get 模拟
    @GetMapping("/user/login")
    public Map<String,Object> login(User user) {
        Map<String,Object> result = new HashMap<>();
        try {
            User userDB = userService.login(user); // 查找db中的user对象
            Map<String, String> map = new HashMap<>(); // 用来存放payload
            map.put("id",userDB.getId());
            map.put("username", userDB.getName());
            String token = JWTUtils.getToken(map); // 生成Token
            result.put("state",true);
            result.put("msg","登录成功");
            result.put("token",token); //成功返回token信息
        } catch (Exception e) {
            e.printStackTrace();
            result.put("state","false");
            result.put("msg",e.getMessage()); //登录失败
        }
        return result;
    }
}
```

#### 测试类编写

```java
@PostMapping("/test/test")
public Map<String, Object> test(String token) {
  Map<String, Object> map = new HashMap<>();
  try {
    JWTUtils.verify(token);
    map.put("msg", "验证通过");
    map.put("state", true);
  } catch (TokenExpiredException e) {
    map.put("state", false);
    map.put("msg", "Token已经过期");
  } catch (SignatureVerificationException e){
    map.put("state", false);
    map.put("msg", "签名错误");
  } catch (AlgorithmMismatchException e){
    map.put("state", false);
    map.put("msg", "加密算法不匹配");
  } catch (Exception e) {
    e.printStackTrace();
    map.put("state", false);
    map.put("msg", "无效token");
  }
  return map;
}
```

通过 Postman 携带 token 测试

![image-20200805215451442](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20200805215451442.png)

#### 优化

- 使用上述方式每次都要传递 token 数据,每个方法都需要 **验证 token 代码冗余**
- 可以使用 **拦截器** 进行优化

```java
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
  String token = request.getHeader("token"); // 获取请求头的Token
  Map<String,Object> map = new HashMap<>();
  try {
    JWTUtils.verify(token); // 验证Token
    return true;
  } catch (TokenExpiredException e) {
    map.put("state", false);
    map.put("msg", "Token已经过期");
  } catch (SignatureVerificationException e){
    map.put("state", false);
    map.put("msg", "签名错误");
  } catch (AlgorithmMismatchException e){
    map.put("state", false);
    map.put("msg", "加密算法不匹配");
  } catch (Exception e) {
    e.printStackTrace();
    map.put("state", false);
    map.put("msg", "无效token");
  }
  String json = new ObjectMapper().writeValueAsString(map);
  response.setContentType("application/json;charset=UTF-8");
  response.getWriter().println(json);
  return false;
}
```

```java
@Component
public class InterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new JwtTokenInterceptor()).
          excludePathPatterns("/user/**") // 排除登录相关请求
          .addPathPatterns("/**"); // 拦截所有请求
    }
}
```



> 参考：
> https://www.bilibili.com/video/BV1i54y1m7cP/
> https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
