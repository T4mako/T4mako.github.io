---
title: Ajax 教程
icon: ajax
---
## 1、原生 Ajax

### 1.1、 Ajax简介

- Ajax 全称为 Asynchronous Javascript And XML，即 **异步JS和XML**
- 通过Ajax可以在浏览器中向服务器发送异步请求，最大的优势：**无刷新获取数据**
- AJAX不是新的编程语言，而是一种将 **现有** 的 **标准组合** 在一起使用的新方式

### 1.2、 XML简介

- XML：可扩展标记语言
- XML：被设计用来传输和存储数据
- XML和HTML类似，不同点：HTML中都是预定义标签，**XML** 中没有预定义标签，全是 **自定义标签**，用来表示一些数据
- 现在已被JSON取代

### 1.3 、AJAX 的特点

#### 1.3.1 AJAX的优点

1. 可以 **无刷新页面** 与 **服务端进行通信** 
2. 允许你 **根据用户事件** 来 **更新部分页面** 内容

#### 1.3.2、 AJAX 的缺点

1. 没有浏览历史，不能回退
2. **Ajax** 存在 **跨域问题**（同源）
3. SEO不友好（爬虫获取不到信息）

### 1.4、 AJAX 的使用

#### 1.4.1、 核心对象 XMLHttpRequest

1. **XMLHttpRequest ：**
   `XMLHttpRequest`（**XHR**）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。
   这允许网页在不影响用户操作的情况下，更新页面的局部内容。`XMLHttpRequest` 在 AJAX 编程中被大量使用。

2. **构造函数：`XMLHttpRequest()`**
   该构造函数用于初始化一个 `XMLHttpRequest` 实例对象。
   在调用下列任何其他方法之前，**必须先调用该构造函数**，或通过其他方式，得到一个实例对象。

   **const xhr = new XMLHttpRequest();**

3. **常用属性：**

   | 属性名             | 作用                                                         |
   | ------------------ | ------------------------------------------------------------ |
   | status             | 响应状态码。**200,404,5XX...**                               |
   | readystate         | 请求的状态。**0 1 2 3 4**<br />0：初始值<br />1：open 方法调用<br />2：send 方法调用<br />3：服务端返回部分结果<br />4：服务端返回全部结果 |
   | onreadystatechange | 当 `readyState` 属性发生变化时，调用的事件处理器             |
   | responseType       | 指定响应的数据类型<br />如：**xhr.responseType = 'json';**   |
   | timeout            | 设置响应超时时间，超过该时间，取消 ajax 请求                 |
   | ontimeout          | 超时回调的方法<br />xhr.ontimeout = function(){} |
   | onerror            | 网络异常回调                                                 |

4. **常用方法：**

| 方法名             | 作用                                                         |
| ------------------ | ------------------------------------------------------------ |
| open()             | 初始化一个请求，设置 请求方法 和 url<br />xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300') |
| send()             | 发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。<br />xhr.send() |
| setRequestHeader() | 设置 **请求头** 的值。必须在 `open()` 之后、`send()` 之前调用 该方法。 |
| abort()            | 立刻中止请求                                                 |



#### 1.4.2、GET 请求

GET.html：

```html
<button>点击发送请求</button>
<div id="result"></div>

<script>
    //获取button元素
    const btn = document.getElementsByTagName('button')[0];
    const result = document.getElementById("result");
    //绑定事件
    btn.onclick = function(){
        //1. 创建对象
        const xhr = new XMLHttpRequest();
        //2. 初始化 设置请求方法和 url
        xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');
        //3. 发送
        xhr.send();
        //4. 事件绑定 处理服务端返回的结果
        // on  when 当....时候
        // readystate 是 xhr 对象中的属性, 表示状态 0 1 2 3 4
        // change  改变
        xhr.onreadystatechange = function(){
            //判断 (服务端返回了所有的结果)
            if(xhr.readyState === 4){
                //判断响应状态码 200  404  403 401 500
                // 2xx 成功
                if(xhr.status >= 200 && xhr.status < 300){
                    //处理结果  行 头 空行 体
                    //响应 
                    // console.log(xhr.status);//状态码
                    // console.log(xhr.statusText);//状态字符串
                    // console.log(xhr.getAllResponseHeaders());//所有响应头
                    // console.log(xhr.response);//响应体
                    //设置 result 的文本
                    result.innerHTML = xhr.response;
                }else{

                }
            }
        }
    }
</script>
```

Server.js：

```js
//1. 引入express
const express = require('express');

//2. 创建应用对象
const app = express();

//3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体
    response.send('HELLO AJAX - 2');
});
//4. 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动, 8000 端口监听中....");
});
```

#### 1.4.3、POST 请求

```html
<div id="result"></div>
<script>
    //获取元素对象
    const result = document.getElementById("result");
    //绑定事件
    result.addEventListener("mouseover", function(){
        //1. 创建对象
        const xhr = new XMLHttpRequest();
        //2. 初始化 设置类型与 URL
        xhr.open('POST', 'http://127.0.0.1:8000/server');
        //设置请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//设置请求体类型，固定写法
        xhr.setRequestHeader('name','T4mako');
        //3. 发送
        xhr.send('a=100&b=200&c=300');
        // xhr.send('a:100&b:200&c:300');
        // xhr.send('1233211234567');

        //4. 事件绑定
        xhr.onreadystatechange = function(){
            //判断
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    //处理服务端返回的结果
                    result.innerHTML = xhr.response;
                }
            }
        }
    });
</script>
```

```js
//可以接收任意类型的请求 
app.all('/server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应头 所有类型的头信息都可以接受
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应体
    response.send('HELLO AJAX POST');
});
```

#### 1.4.4、 处理 JSON 响应体

```html
<div id="result"></div>
<script>
    const result = document.getElementById('result');
    //绑定键盘按下事件
    window.onkeydown = function(){
        //发送请求
        const xhr = new XMLHttpRequest();
        //设置响应体数据的类型
        xhr.responseType = 'json';
        //初始化
        xhr.open('GET','http://127.0.0.1:8000/json-server');
        //发送
        xhr.send();
        //事件绑定
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    //
                    // console.log(xhr.response);
                    // result.innerHTML = xhr.response;
                    // 1. 手动对数据转化
                    // let data = JSON.parse(xhr.response);
                    // console.log(data);
                    // result.innerHTML = data.name;
                    // 2. 自动转换
                    console.log(xhr.response);
                    result.innerHTML = xhr.response.name;
                }
            }
        }
    }
</script>
```

```js
//JSON 响应
app.all('/json-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    //响应一个数据
    const data = {
        name: 'atguigu'
    };
    //对对象进行字符串转换
    let str = JSON.stringify(data);
    //设置响应体
    response.send(str);
});
```

#### 1.4.5、超时与网络异常

设置服务器响应的时间，如果超过该时间，取消 ajax 请求

```html
<button>点击发送请求</button>
<div id="result"></div>
<script>
    const btn = document.getElementsByTagName('button')[0];
    const result = document.querySelector('#result');

    btn.addEventListener('click', function(){
        const xhr = new XMLHttpRequest();
        //超时设置 2s 设置
        xhr.timeout = 2000;
        //超时回调
        xhr.ontimeout = function(){
            alert("网络异常, 请稍后重试!!");
        }
        //网络异常回调
        xhr.onerror = function(){
            alert("你的网络似乎出了一些问题!");
        }

        xhr.open("GET",'http://127.0.0.1:8000/delay');
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status< 300){
                    result.innerHTML = xhr.response;
                }
            }
        }
    })
</script>
```

```js
//延时响应
app.all('/delay', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    setTimeout(() => {
        //设置响应体
        response.send('延时响应');
    }, 1000)
});
```

#### 1.4.6、 取消 Ajax 请求

```html
<button>点击发送</button>
<button>点击取消</button>
<script>
    //获取元素对象
    const btns = document.querySelectorAll('button');
    let x = null;

    btns[0].onclick = function(){
        x = new XMLHttpRequest(); 
        x.open("GET",'http://127.0.0.1:8000/delay');
        x.send();
    }

    // abort
    btns[1].onclick = function(){
        x.abort();
    }
</script>
```

#### 1.4.7、 Ajax 重复发送问题

通过 节流 的方式
设置一个 **判断标识变量**

```html
<button>点击发送</button>
<script>
    //获取元素对象
    const btns = document.querySelectorAll('button');
    let x = null;
    //标识变量
    let isSending = false; // 是否正在发送AJAX请求

    btns[0].onclick = function(){
        //判断标识变量
        if(isSending) x.abort();// 如果正在发送, 则取消该请求, 创建一个新的请求
        x = new XMLHttpRequest();
        //修改 标识变量的值
        isSending = true;
        x.open("GET",'http://127.0.0.1:8000/delay');
        x.send();
        x.onreadystatechange = function(){
            if(x.readyState === 4){
                //修改标识变量
                isSending = false;
            }
        }
    }
    // abort
    btns[1].onclick = function(){
        x.abort();
    }
</script>
```



## 2、Axios 发送 Ajax 

使用 cnd链接 引入Axios：

```html
<script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.6/axios.js"></script>
```

发送请求：

```html
<button>GET</button>
<button>POST</button>
<button>AJAX</button>

<script>
    const btns = document.querySelectorAll('button');

    //配置 baseURL
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
	
    //GET 请求
    btns[0].onclick = function () {
        //GET 请求
        axios.get('/axios-server', {
            //url 参数
            params: {
                id: 100,
                vip: 7
            },
            //请求头信息
            headers: {
                name: 'atguigu',
                age: 20
            }
        }).then(value => {
            console.log(value);
        });
    }

    //POST 请求
    btns[1].onclick = function () {
        axios.post('/axios-server', {
            username: 'admin',
            password: 'admin'
        }, {
            //url 
            params: {
                id: 200,
                vip: 9
            },
            //请求头参数
            headers: {
                height: 180,
                weight: 180,
            }
        });
    }

    //通过请求
    btns[2].onclick = function(){
        axios({
            //请求方法
            method : 'POST',
            //url
            url: '/axios-server',
            //url参数
            params: {
                vip:10,
                level:30
            },
            //头信息
            headers: {
                a:100,
                b:200
            },
            //请求体参数
            data: {
                username: 'admin',
                password: 'admin'
            }
        }).then(response=>{
            //响应状态码
            console.log(response.status);
            //响应状态字符串
            console.log(response.statusText);
            //响应头信息
            console.log(response.headers);
            //响应体
            console.log(response.data);
        })
    }
</script>
```

```js
//axios 服务
app.all('/axios-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    // response.send('Hello jQuery AJAX');
    const data = {name:'T4mako'};
    response.send(JSON.stringify(data));
});
```

## 3、fetch 函数发送 Ajax

fetch 区别于 ajax
可以直接通过 window对象 内置的 **fetch** 发送请求
fetch 也是 promise 风格

```html
<button>AJAX请求</button>
<script>
    //文档地址
    //https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch

    const btn = document.querySelector('button');

    btn.onclick = function(){
        fetch('http://127.0.0.1:8000/fetch-server?vip=10', {
            //请求方法
            method: 'POST',
            //请求头
            headers: {
                name:'atguigu'
            },
            //请求体
            body: 'username=admin&password=admin'
        }).then(response => {
            // return response.text();
            return response.json();
        }).then(response=>{
            console.log(response);
        });
    }
</script>
```

```js
//fetch 服务
app.all('/fetch-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    // response.send('Hello jQuery AJAX');
    const data = {name:'尚硅谷'};
    response.send(JSON.stringify(data));
});
```

## 4、 跨域

### 4.1、同源策略

同源策略（Same-Origin Policy）最早由 Netscape 公司提出，是浏览器的一种安全策略。
 **同源**：**协议、域名、端口号** 必须 **完全相同**
违背同源策略就是 **跨域**

Ajax 默认遵循同源规则

### 4.2、 JSONP 解决跨域 （几乎不用）

1. JSONP是什么

   JSONP (JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，**只支持get请求**

2. JSONP 怎么工作的？

   在网页有一些 **标签** 天生 **具有跨域能力**，比如：img, link, iframe, script

   JSONP就是利用 **script** **标签** 的跨域能力来发送请求的

3. JSONP的使用

   - 动态的创建一个script标签

   ```js
   var script = document.createElement("script");
   ```

   - 设置script的src，设置回调函数

   ~~~js
   script.src = "http://locallhost:3000/textAJAX?callback=abc"
   ~~~


JSONP 实践：

```html
用户名: <input type="text" id="username">
<p></p>
<script>
    //获取 input 元素
    const input = document.querySelector('input');
    const p = document.querySelector('p');

    //声明 handle 函数
    function handle(data){
        input.style.border = "solid 1px #f00";
        //修改 p 标签的提示文本
        p.innerHTML = data.msg;
    }

    //绑定事件
    input.onblur = function(){
        //获取用户的输入值
        let username = this.value;
        //向服务器端发送请求 检测用户名是否存在
        //1. 创建 script 标签
        const script = document.createElement('script');
        //2. 设置标签的 src 属性
        script.src = 'http://127.0.0.1:8000/check-username';
        //3. 将 script 插入到文档中
        document.body.appendChild(script);
    }
</script>
```

```js
//用户名检测是否存在
app.all('/check-username',(request, response) => {
    // response.send('console.log("hello jsonp")');
    const data = {
        exist: 1,
        msg: '用户名已经存在'
    };
    //将数据转化为字符串
    let str = JSON.stringify(data);
    //返回结果
    response.end(`handle(${str})`);
});
```

### 4.3、CORS 解决跨域

1. CORS是什么？

   **CORS** (Cross-Origin Resource Sharing), 跨域资源共享。CORS 是 **官方的跨域解决方案**，它的特点是不需要在客户端做任何特殊的操作，**完全在服务器中进行处理**，支持 get 和 post 等请求。跨域资源共享标准 **新增了一组 HTTP  首部字段**（**响应头**），允许服务器声明哪些源站通过浏览器有权限访问哪些资源

2. CORS怎么工作的？

   CORS 是通过设置一个 **响应头** 来告诉浏览器，**该请求允许跨域，浏览器收到该响应以后就会对响应放行**。

   

主要是服务端的设置
在 node.js 中设置 响应头

```js
app.all('/cors-server', (request, response)=>{
    //设置（不同的）响应头
    response.setHeader("Access-Control-Allow-Origin", "*"); // * 代表所有网页
     // response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    response.setHeader("Access-Control-Allow-Headers", '*'); // * 代表任意请求头
    response.setHeader("Access-Control-Allow-Methods", '*'); // * 代表任意方法
    response.send('hello CORS');
});
```

推荐阅读：

- http://www.ruanyifeng.com/blog/2016/04/cors.html
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

### 4.4、配置代理服务器

1、借助 nginx
2、借助 vue-cli （vue脚手架）见 vue 笔记