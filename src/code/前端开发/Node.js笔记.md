---
title: Node.js 教程
icon: nodeJS
---

[node.js API](https://nodejs.cn/api-v16/)

## 1、Node.js介绍

### 1.1、Node.js 概念

**Node.js** 是一个**开源**的，**跨平台**的 JavaScript 运行环境
通俗来讲，Node.js 就是一款**应用程序**，是一款**软件**，它可以运行JS

**Node.js 作用：**

- 开发服务器应用
- 开发工具类应用
- 开发桌面端应用

### 1.2、Node.js 的安装

[Node.js 官网](https://nodejs.org/en) 下载LTS版本

打开cmd，输入 `node -v` 查看安装情况
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230420185728.png)

> 注：[注册表配置使用VSCode打开文件与文件夹](https://www.jianshu.com/p/e8c29211fba9)

## 2、Node.js 入门

### 2.1、NodeJS 初体验

新建一个js文件，通过vs使用终端运行文件

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230420192316.png)

使用 `node hello.js` 运行文件

> 注意：Node.js 中**不能使用 BOM 和 DOM 的 API**
> 		   Node.js 中的顶级对象为 **global**（相当于浏览器中的windows）
> 		   **console，定时器** 的API可以使用

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230420192544.png)

![image-20230420192620431](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230420192620431.png)

## 3、Buffer

### 3.1、概念

Buffer 是一个类似于数组的 **对象** ，用于表示固定长度的字节序列
Buffer 本质是一段内存空间，专门用来处理 **二进制数据** 。  

### 3.2、特点

1. Buffer 大小固定且无法调整
2. Buffer 性能较好，可以直接对计算机内存进行操作
3. 每个元素的大小为 1 字节（byte）  

### 3.3、创建 Buffer

Node.js 中创建 Buffer 的方式主要如下几种：  

1. Buffer.alloc  
2. Buffer.allocUnsafe  
3. Buffer.from  

```js
//创建了一个长度为 10 字节的 Buffer，相当于申请了 10 字节的内存空间，每个字节的值为 0
let buf_1 = Buffer.alloc(10); // 结果为 <Buffer 00 00 00 00 00 00 00 00 00 00>

//创建了一个长度为 10 字节的 Buffer，buffer 中可能存在旧的数据, 可能会影响执行结果，所以叫unsafe
let buf_2 = Buffer.allocUnsafe(10);

//通过字符串创建 Buffer 转换为unicode
let buf_3 = Buffer.from('0Aa'); //<Buffer 30 41 61>

//通过数组创建 Buffer 转换为16进制
let buf_4 = Buffer.from([1,10,16,50]); //<Buffer 01 0a 10 32>
```

### 3.4、Buffer 与字符串的转化  

可以借助 **toString** 方法将 Buffer 转为字符串 

toString 默认是按照 utf-8 编码方式进行转换的。  

```js
 let buf4 = Buffer.from([48,49,65,97]);
console.log(buf4.toString())  // 01Aa
```

### 3.5、Buffer 的读写  

Buffer 可以直接通过 **[ ]** 的方式对数据进行处理  

```js
let buf = Buffer.form('abc')
//读取
console.log(buf[0]); //97
//修改
buf[1] = 97;
//查看字符串结果
console.log(buf.toString()); //aac
```

> 注意:
> 如果修改的数值**超过 255** ，则超过 8 位数据会被舍弃
> 一个 utf-8 的字符 一般占 **3** 个字节  

## 4、fs 模块

fs 全称为 **file system** ，称之为 文件系统 ，是 Node.js 中的 内置模块 ，可以对计算机中的磁盘进行操作。  

#### ***fs模块的导入：***

```js
const fs = require('fs')
```

### 4.1、文件写入

文件写入就是将 数据 保存到 文件 中，我们可以使用如下几个方法来实现该效果  

| 方法                            | 说明     |
| ------------------------------- | -------- |
| writeFile()                     | 异步写入 |
| writeFileSync()                 | 同步写入 |
| appendFile() / appendFileSync() | 追加写入 |
| createWriteStream()             | 流式写入 |

#### 4.1.1、writeFile 异步写入  

**主线程 不会等待 其他线程的执行结果，直接执行后续的主线程代码，效率较好**  

**语法**： **fs.writeFile(file, data[, options], callback)**   

> 注：**callback（回调函数）**

**参数**说明：
	file 文件名
	data 待写入的数据
	options 选项设置 （可选）
	callback 写入回调

**返回值**： undefined  

案例：

```js
// 导入fs模块
const fs = require('fs')

// 2.写入文件 (文件名：a.txt，写入数据：aa)
fs.writeFile('./a.txt','aa',err => {
    // err 写入失败：错误对象 写入成功：null
    if(err){
        console.log('写入失败');
        return;
    }
    console.log('写入成功');
})
```

#### 4.1.2、writeFileSync 同步写入  

**主线程等待写入完成后继续执行，效率较低  **

**语法**: fs.writeFileSync(file, data[, options])

**参数**与 fs.writeFile 大体一致，只是没有 callback 参数

**返回值**： undefined  

示例：

```js
try{
    fs.writeFileSync('./b.txt', 'bb');
}catch(e){
    console.log(e);
}
```

#### 4.1.3、appendFile / appendFileSync 追加写入  

**appendFile** 作用是在文件尾部追加内容，appendFile 语法与 writeFile 语法完全相同  

**语法:**
fs.appendFile(file, data[, options], callback)
fs.appendFileSync(file, data[, options])

**返回值**： 都为 undefined  

案例：

```js
fs.appendFile('./test.txt','ABCD', err => {
	if(err) throw err;
	console.log('追加成功')
});

fs.appendFileSync('./test.txt','\r\nDCBA');
```

通过 **writeFile 实现追加写入**

```js
fs.writeFile('./a.txt','love love',{flag: 'a'},err => {
    if(err){
        console.log('failed');
        return;
    } 
    console.log('succees')
})
```

#### 4.1.4、createWriteStream 流式写入  

**语法**： fs.createWriteStream(path[, options])  

**参数**说明：
	path 文件路径
	options 选项配置（ 可选 ）

**返回值**： Object  

案例：

```js
let ws = fs.createWriteStream('./读后感.txt');
ws.write('哈哈\r\n');
ws.write('嘿嘿\r\n');
ws.write('吼吼\r\n');
ws.write('呵呵\r\n');
ws.close(); //ws在js执行完毕后自动关闭，可视情况不写
```

程序打开一个文件是需要消耗资源的 ，流式写入可以**减少打开关闭文件的次数**。
**流式写入**方式 **适用于大文件写入或者频繁写入** 的场景, writeFile 适合于写入频率较低的场景  

### 4.2、文件读取

通过程序从文件中取出其中的数据，有如下几种方式：  

| 方法               | 说明     |
| ------------------ | -------- |
| readFile()         | 异步读取 |
| readFileSync()     | 同步读取 |
| createReadStream() | 流式读取 |

#### 4.2.1、readFile 异步读取  

**语法**： fs.readFile(path[, options], callback)  

**参数**说明：
	path 文件路径
	options 选项配置
	callback 回调函数

**返回值**： undefined  

案例：

```js
//导入 fs 模块
const fs = require('fs');
fs.readFile('./A.txt', (err, data) => { //err 错误信息 //data 读取的数据
	if(err) throw err;
	console.log(data);
});
fs.readFile('./A.txt', 'utf-8',(err, data) => {
	if(err) throw err;
	console.log(data);
});
```

#### 4.2.2、readFileSync 同步读取  

**语法**： fs.readFileSync(path[, options])

**参数**说明：
	path 文件路径
	options 选项配置

**返回值**： string | Buffer  

```js
let data = fs.readFileSync('./A.txt');
let data2 = fs.readFileSync('./A.txt', 'utf-8');  
```

#### 4.2.3、createReadStream 流式读取  

流式读取 为 **一块一块读取**
每次从文件中读取数据 **64K**

**语法**： fs.createReadStream(path[, options])

**参数**说明：
	path 文件路径  
	options 选项配置（ 可选 ）  

**返回值**： Object  

案例：

```js
const fs = require('fs');
const rs = fs.createReadStream('../AAA.mp4');

//data事件
rs.on('data',chunk => { //chunk 块，大块
    console.log(chunk.length());
    //console.log(chunk.toString());
})

//end 可选事件
rs.on('end',() => {
    console.log('读取完成')
})
```

### 4.3、复制文件

方式一：readFile

```js
// 方式一：readFile
fs.readFileSync('../test.mp4') // 读取
let data = fs.writeFileSync('../new File.mp4',data); // 写入
```

方式二：流式操作

```js
// 方式二：流式操作
const rs = fs.createReadStream('../test.mp4'); // 创建读取流
const ws = fs.createWriteStream('../new File2.mp4') // 创建写入流
// 绑定 data 事件
rs.on('data',chunk => {
    ws.write(chunk);
})
```

方式三：pip（不常用）

```js
const rs = fs.createReadStream('../test.mp4'); // 创建读取流
const ws = fs.createWriteStream('../new File3.mp4') // 创建写入流
rs.pipe(ws)
```

### 4.4、文件移动与重命名

在 Node.js 中，我们可以使用 **rename** 或 **renameSync** 来移动或**重命名 文件或文件夹**  

**语法**：
fs.rename(oldPath, newPath, callback)
fs.renameSync(oldPath, newPath)  

**参数**说明：
	oldPath 文件当前的路径
	newPath 文件新的路径（可以用于移动文件）
	callback 操作后的回调  

案例：

```js
const fs = require('fs');
fs.rename('./a.txt','../b.txt',err => {
    if(err){
        console.log('failed')
        return;
    }
    console.log('success')
})
```

### 4.5、文件删除

在 Node.js 中，我们可以使用 **unlink** 或 **unlinkSync** 或 **rm** 来删除文件  

**语法**：
	fs.unlink(path, callback)
	fs.unlinkSync(path)
	fs.rm(path,callback)

**参数**说明：
	path 文件路径
	callback 操作后的回调

示例：  

```js
const fs = require('fs')

fs.unlink('./a.txt',err => {
    if(err) {
        console.log('failed');
        return;
    }
    console.log('success')
});
```

```js
const fs = require('fs')
// rm 方法
fs.rm('./a.txt',err => {
    if(err) {
        console.log('failed');
        return;
    }
    console.log('success')
})
```

### 4.6、文件夹操作  

借助 Node.js 的能力，我们可以对文件夹进行 **创建 、 读取 、 删除** 等操作  

| 方法                  | 说明       |
| --------------------- | ---------- |
| mkdir / mkdirSync     | 创建文件夹 |
| readdir / readdirSync | 读取文件夹 |
| rmdir / rmdirSync     | 删除文件夹 |

#### 4.6.1、mkdir 创建文件夹  

在 Node.js 中，我们可以使用 **mkdir** 或 **mkdirSync** 来创建文件夹

**语法**：
fs.mkdir(path[, options], callback)
fs.mkdirSync(path[, options])  

参数说明：
	path 文件夹路径
	options 选项配置（ 可选 ）
	callback 操作后的回调  

示例：

```js
const fs = require('fs');

fs.mkdir('./html',err => {
    if(err){
        console.log('failed');
    	return;
    } 
    console.log('success')
})
```

递归创建：
**recursive:true** 表示递归创建

```js
const fs = require('fs');

fs.mkdir('./a/b/c',{recursive:true},err => {
    if(err){
        console.log('failed');
    	return;
    } 
    console.log('success')
})
```

#### 4.6.2、readdir 读取文件夹  

在 Node.js 中，我们可以使用 **readdir** 或 **readdirSync** 来读取文件夹

**语法**：
	fs.readdir(path[, options], callback)
	fs.readdirSync(path[, options])

**参数**说明：
	path 文件夹路径
	options 选项配置（ 可选 ）
	callback 操作后的回调

示例：  

```js
const fs = require('fs');

fs.readdir('../资料',(err,data) => {
    if(err){
        console.log('failed');
        return;
    }
    console.log(data); //data为文件名数组
})
```

#### 4.6.3、 rmdir 删除文件夹  

在 Node.js 中，我们可以使用 **rm** ， **rmdir** 或 **rmdirSync** 来删除文件夹  

**语法**：
	fs.rmdir(path[, options], callback)
	fs.rmdirSync(path[, options])

**参数**说明：
	path 文件夹路径
	options 选项配置（ 可选 ）
	callback 操作后的回调

**示例**：  

```js
const fs = require('fs');

fs.rmdir('../资料',err => {
    if(err){
        console.log(err);
        return;
    }
    console.log('success'); 
})
```

递归删除：

```js
const fs = require('fs');

fs.rmdir('./a',{recursive:true},err => {
    if(err){
        console.log(err);
        return;
    }
    console.log('success'); 
})
```

建议使用 **rm** 方法：

```js
fs.rm('./a',{recursive:true},err => {
    if(err){
        console.log(err);
        return;
    }
    console.log('success'); 
})
```

### 4.7、查看资源状态  

在 Node.js 中，我们可以使用 **stat** 或 **statSync** 来查看资源的详细信息

**语法**：
	fs.stat(path[, options], callback)
	fs.statSync(path[, options])

**参数**说明：
	path 文件夹路径
	options 选项配置（ 可选 ）
	callback 操作后的回调

**示例**：  

```js
const fs = requier('fs')

//stat 方法 status 状态缩写
fs.stat('../a.mp4',(err,data) => {
    if(err){
        consolelog('failed')
        return;
    }
    console.log(data);
    console.log(data.isFile);
    console.log(data.isDirectory());
})
```

### 4.8、__dirname  

**相对路径存在的问题：**
	fs模块**相对路径**的**参照**为：**命令行的工作目录**，并非是文件的所在目录  

**\_\_dirname** 与 **require** 类似，都是 Node.js 环境中的 **'全局变量'**
\_\_dirname 保存着 当前**文件**所在目录的**绝对路径** ，可以使用 __dirname 与文件名拼接成绝对路径  

作用：通过 **\_\_dirname** 拼接 绝对路径

```js
const fs = require('fs')
console.log(__dirname);
fs.writeFileSync(__dirname + '/index.html','love');
```

### 4.9、批量重命名

案例：批量重命名

```js
// 导入fs模块
const fs = require('fs')

// 读取 code 文件夹
const files = fs.readdirSync('./code');

//遍历数组
files.forEach(item => {
    // 拆分文件名
    let data = item.split('-')
    let [num,name] = data;
    // 判断
    if(Number(num) < 10){
        num = '0' + num;
    }
    let newName = num + '-' + name;
    // 重命名
    fs.renameSync(`./code/${item}`,`./code/${newName}`);
})
```

## 5、path 模块

path模块的导入：**const path = require('path')**

path 模块提供了 操作路径 的功能，如下为几个较常用的API：  

| API           | 说明                     |
| ------------- | ------------------------ |
| path.resolve  | 拼接规范的绝对路径 常用  |
| path.sep      | 获取操作系统的路径分隔符 |
| path.parse    | 解析路径并返回对象       |
| path.basename | 获取路径的基础名称       |
| path.dirname  | 获取路径的目录名         |
| path.extname  | 获得路径的扩展名         |

为 **规范化** 绝对路径 （将路径中的斜线都改为 `/` ）可以使用 **path.resolve** 

```js
const path = require('path')
console.log(path.resolve(__dirname,'./index.html')); 
console.log(path.resolve(__dirname,'index.html')); 

console.log(path.sep); // 输出 \ 

console.log(__filename); // 当前文件的绝对路径

let str = 'E:\\Study\\Web前端\\3、Node.js\\代码练习\\index.html'
console.log(path.parse(str));

console.log(path.basename(str)); // 获取当前文件夹下的文件名

console.log(path.dirname(str)); // 获取当前所在文件夹路径

console.log(path.extname(str)); // 获取后缀名
```

## 6、http 模块

HTTP（hypertext transport protocol）协议；中文叫超文本传输协议  
是一种基于TCP/IP的应用层通信协议
这个协议详细规定了 浏览器 和万维网 服务器 之间互相通信的规则。  

协议中主要规定了两个方面的内容
	客户端：用来向服务器发送数据，可以被称之为**请求报文**
	服务端：向客户端返回数据，可以被称之为**响应报文**  

### 6.1、请求报文

请求报文的组成：请求行、请求头、空行、请求体  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230422090654.png)

#### 6.1.1、请求行

请求行的组成：
	请求方法（get、post、put、delete等），请求URL（统一资源定位器）

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230422090923.png)

#### 6.1.2、请求头

请求头为**键值对**类型

格式：『头名：头值』  

常见的请求头有：  

| 请求头                    | 解释                                                         |
| ------------------------- | ------------------------------------------------------------ |
| Host                      | 主机名                                                       |
| Connection                | 连接的设置 keep-alive（保持连接）；close（关闭连接）         |
| Cache-Control             | 缓存控制 max-age = 0 （没有缓存）                            |
| Upgrade Insecure Requests | 将网页中的http请求转化为https请求（很少用）老网站升级        |
| User-Agent                | 用户代理，客户端字符串标识，服务器可以通过这个标识来识别这个请求来自 哪个客户端 ，一般在PC端和手机端的区分 |
| Accept                    | 设置浏览器接收的数据类型                                     |
| Accept-Encoding           | 设置接收的压缩方式                                           |
| Accept Language           | 设置接收的语言 q=0.7 为喜好系数，满分为1                     |
| Cookie                    | cookie                                                       |

#### 6.1.3、请求体

请求体内容的格式是非常灵活的，

（可以是空）=> GET请求，
（也可以是字符串，还可以是JSON）=> POST请求  

### 6.2、响应报文

响应报文组成：

响应行：
	HTTP协议版本号 、状态码、响应状态描述  `例如 HTTP/1.1 200 OK  `
	响应状态码和响应字符串关系是一一对应的。  

响应头 

空行

响应体:
	响应体内容的类型是非常灵活的，常见的类型有 HTML、CSS、JS、图片、JSON  

### 6.3、创建 HTTP 服务  

使用 nodejs 创建 HTTP 服务  

操作步骤：

```js
// 1.导入 http 模块
const http = require('http')

// 2.创建服务对象
const server = http.createServer((request,response) => {
    response.end('Hello HTTP Server') //设置响应体
}) 

// 3监听端口，启动服务
server.listen(9000,() =>{
    console.log('sever start');
})
```

>  http.createServer 里的回调函数的执行时机： 当接收到 HTTP 请求的时候，就会执行  

使用浏览器访问：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230422095002.png)

停止服务的方式：**ctrl+c**

响应内容**中文乱码**的**解决办法** ：response.setHeader('content-type','text/html;charset=utf-8');  

```js
// 2.创建服务对象
const server = http.createServer((request,response) => {
	response.setHeader('content-type','text/html;charset=utf-8'); 
	response.end('Hello HTTP Server') //设置响应体
}) 
```

HTTP 协议默认端口是 80 。HTTPS 协议的默认端口是 443, HTTP 服务开发常用端口有 3000，8080，8090，9000 等  
端口号被占用 的报错：Error: listen EADDRINUSE: address already in use :::9000  

如果端口被其他程序占用，可以使用 资源监视器 找到占用端口的程序，然后使用 任务管理器 关闭对应的程序  

### 6.4、查看 HTTP 报文

查看请求行，请求头

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230422101448.png)

查看请求体

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230422101526.png)

查看响应行，响应头

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230422101053.png)

查看响应体

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230422101148.png)

### 6.5、获取 HTTP 请求报文  

想要获取请求的数据，需要通过 **request** 对象  

| 含义               | 语法                                                         |
| ------------------ | ------------------------------------------------------------ |
| **请求方法**       | **request.method**                                           |
| 请求版本           | request.httpVersion                                          |
| **请求路径**       | **request.url**                                              |
| **URL 路径**       | **require('url').parse(request.url).pathname**               |
| **URL 查询字符串** | **require('url').parse(request.url, true).query**            |
| **请求头**         | **request.headers**                                          |
| 请求体             | request.on('data', function(chunk){}) request.on('end', function(){}); |

注意：

1、**request.url** 只能获取**路径以及查询字符串**，无法获取 URL 中的域名以及协议的内容（如 `/search?name=A`）
2、 **request.headers** 将请求信息转化成一个**对象**，并将**属性名**都转化成了『**小写**』
3、favicon.ico：这个请求是属于浏览器自动发送的请求  

```js
// 1.导入 http 模块
const http = require('http')

// 2.创建服务对象
const server = http.createServer((request,response) => {
    //获取请求的方法
    console.log(request.method);
    //获取请求的url
    console.log(request.url); //只包含url中的路径与查询字符串
    //获取http协议的版本号
    console.log(request.httpVersion);
    //获取http请求头
    console.log(request.headers);
    console.log(request.headers.host);

    response.end('hello') //设置响应体
}) 

// 3监听端口，启动服务
server.listen(9000,() =>{
    console.log('sever start');
})
```

#### 6.5.1、提取请求体

请求为POST才有请求体，GET没有请求体

```js
// 1.导入 http 模块
const http = require('http')

// 2.创建服务对象
const server = http.createServer((request,response) => {
    // 1、声明一个变量
    let body = '';
    // 2、绑定data事件
    request.on('data',chunk => {
        body += chunk;
    })
    // 3、绑定and事件
    request.on('end',() => {
        console.log(body); 
        //响应
        response.end('Hello HTTP');
    })
}) 

// 3.监听端口，启动服务
server.listen(9000,() =>{
    console.log('sever start');
})
```

#### 6.5.2、获取请求路径和查询字符串

方式一：

const res =  **url.parse(request.url,true)** 
该方法用于解析request.url （`比如解析/search?name=A`）
第二个参数用于将返回结果 res 的 **query** 属性设置为对象
	参数二默认为 false ，query对象为数组

```js
const http = require('http')
// 1、导入url模块
const url = require('url')
const server = http.createServer((request,resqonse) => {

    //console.log(request.url); --> /search?name=A /favicon.ico

    // 2、解析url模块
    let res = url.parse(request.url,true) //解析request.url
    // url路径
    let pathname = res.pathname; // --> /search /favicon.ico
    //查询字符串
    let name = res.query.name;
    //console.log(name); // A undefined

    resqonse.end('url')
});
server.listen(9000,()=>{
    console.log('sever start');
})
```

方式二：

实例化 UR L对象 url
通过 url 的 **pathname** 属性 和 **searchParams.get()** 方法 获取请求路径和查询字符串

```js
const http = require('http')

const server = http.createServer((request,response)=> {
    // 实例化URL对象
    let url = new URL(request.url,'http://17.0.0.1'); //补全url
    //输出路径
    console.log(url.pathname);
    //输出查询字符串
    console.log(url.searchParams.get('name'));

    response.end('url new');
})

server.listen(9000,() => {
    console.log('server start');
})
```

#### 6.5.3、练习：获取请求报文

| 请求类型(方法) | 请求地址 | 响应体结果 |
| -------------- | -------- | ---------- |
| get            | /login   | 登录页面   |
| get            | /reg     | 注册页面   |

```js
// 导入http模块
const http = require('http')

//创建server对象
const server = http.createServer((request,response) => {
    //获取请求和url
    let {method} = request;
    let {pathname} = new URL(request.url,'http://127.0.0.1')
    console.log(pathname);
    console.log(method);
    //判断
    response.setHeader("Content-Type","text/html;charset=utf-8");
    if(method === 'GET' && pathname == '/login'){ //注意GET大写
        console.log(typeof(method));
        response.end('登录页面')
    }else if(method === 'GET' && pathname == '/reg'){
        response.end('注册页面')
    }else{
        response.end('<h1>404 Not Found</h1>')
    }
})
```

### 6.6、获取 HTTP 响应报文

| 作用                          | 语法                                     |
| ----------------------------- | ---------------------------------------- |
| 设置响应状态码                | response.statusCode                      |
| 设置响应状态描述              | response.statusMessage （ 用的非常少 ）  |
| 设置响应头信息                | response.setHeader('头名', '头值')       |
| 设置响应体                    | response.write('xx') response.end('xxx') |
| 返回对 `ClientRequest` 的引用 | response.end(字符串 或 **buffer**)       |

注意：setHeader() 可以**多次调用**，使用了该方法一般不在 end() 方法中写值，end() 方法只能**调用一次**

```js
// 导入http模块
const http = require('http')
//创建服务对象
const server = http.createServer((request,response) => {
    // 1、设置响应状态代码
    response.statusCode = 200;
    // 2、响应状态的描述
    response.statusMessage = 'love'
    // 3、添加响应头
    response.setHeader('content-type','text/html;charset=utf-8')
    response.setHeader('Server','Node.js')
    // 3.1 设置多个同名的响应头
    response.setHeader('test',['a','b','c'])
    //4、设置响应体，write可以多次调用
    response.write('love');
    response.write('u');

    //如果用write设置了响应体，一般end中就不写了
    //注：response.end() 方法只能调用一次
    response.end('')  
})

server.listen(9000,() => {
    console.log('server start');
})
```

#### 响应文件内容

```js
// 导入http模块
const http = require('http')
const fs = require('fs')
//创建服务对象
const server = http.createServer((request,response) => {
    let html = fs.readFileSync(__dirname + '/table.html')
    response.end(html) //end中的参数可以是字符串，也可以是buffer
})

server.listen(9000,() => {
    console.log('server start');
})
```

> 注：网页资源加载的基本过程：浏览器向服务器先发送访问 html 的请求，解析 html 文件中的其他文件，发送的请求包括请求 css，js，图片等等，这些请求许多是并行的。

#### 实现网页引入外部资源

 根据不同的请求路径，获取不同的文件

```js
// 导入http模块
const http = require('http')
const fs = require('fs')
//创建服务对象
const server = http.createServer((request,response) => {
    // 根据不同的请求路径，获取不同的文件
    let {pathname} = new URL(request.url,'http://127.0.0.1')
    if(pathname === '/'){
        let html = fs.readFileSync(__dirname + '/table.html')
        response.end(html) //end中的参数可以是字符串，也可以是buffer
    }else if(pathname === '/table.css'){
        let css = fs.readFileSync(__dirname + '/table.css')
        response.end(css)
    }else if(pathname === '/table.js'){
        let js = fs.readFileSync(__dirname + '/table.js')
        response.end(js)
    }else{
        response.statusCode = 404
        response.end('error')
    }
})

server.listen(9000,() => {
    console.log('server start');
})
```

代码仍然存在麻烦的问题
因此引入静态资源服务

### 6.7、静态资源服务

静态资源：图片，视频，css，js，html文件，字体文件
动态资源：内容常更新的资源，例如列表搜索页面等

#### 6.7.1、网站根目录或静态资源目录  

HTTP 服务在哪个文件夹中寻找静态资源，那个文件夹就是 **静态资源目录** ，也称之为网站 **根目录** 

vscode 中使用 live-server 访问 HTML 时， 它启动的服务中网站根目录是vs打开的当前目录

```js
// 导入http模块
const http = require('http')
const fs = require('fs')
//创建服务对象
const server = http.createServer((request,response) => {
    // 获取请求url路径
    let {pathname} = new URL(request.url,'http://127.0.0.1')
    // 拼接文件路径
    let filePath= __dirname + '/page' + pathname; //静态资源全部存放在page下
    // 读取文件 fs异步API
    fs.readFile(filePath,(err,data) => {
        if(err){
            response.statusCode = 500;
            response.end('文件读取失败')
            return;
        }
        // 响应文件内容
        response.end('<h1>404 NOT FOUND</h1>')
    })
})

server.listen(9000,() => {
    console.log('server start');
})
```

### 6.8、网页中的URL

网页中的 URL 主要分为两大类：相对路径与绝对路径  

#### 6.8.1 绝对路径

绝对路径可靠性强，而且相对容易理解，在项目中运用较多  

| 形式                       | 特点                                                         |
| -------------------------- | ------------------------------------------------------------ |
| **http://bilibli.com/web** | 直接向目标资源发送请求，容易理解。网站的外链会用到此形式     |
| //bilibili.com/web         | 与页面 URL 的协议拼接形成完整 URL 再发送请求。大型网站用的比较多 |
| **/web**                   | 与页面 URL 的协议、主机名、端口拼接形成完整 URL 再发送请求。中小 型网站（**常用**，方便在修改域名时防止大规模修改代码url） |

#### 6.8.2 相对路径

相对路径在发送请求时，需要**与当前页面 URL** 路径进行 **计算** ，得到完整 URL 后，再发送请求，学习阶段用的较多
例如当前网页 url 为 http://www.bilibili.com/course/h5.html

| 形式               | 最终的 URL                                 |
| ------------------ | ------------------------------------------ |
| ./css/app.css      | http://www.bilibili.com/course/css/app.css |
| js/app.js          | http://www.bilibili.com/course/js/app.js   |
| ../img/logo.png    | http://www.bilibili.com/img/logo.png       |
| ../../mp4/show.mp4 | http://www.bilibili.com/mp4/show.mp4       |

网页中使用 URL ：a 标签 href、link 标签 href、script 标签 src、img 标签 src、video audio 标签 src、form 中的 action、AJAX 请求中的 URL  等

### 6.9、设置资源类型  （MIME类型）

媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）是一种标准，用来表示文档、文件或字节流的性质和格式。  

```
mime 类型结构： [type]/[subType]
例如： text/html text/css image/jpeg image/png application/json
```

HTTP 服务可以**设置响应头** **Content-Type** 来表明响应体的 **MIME 类型**，浏览器会根据该类型决定如何处理资源  

下面是常见文件对应的 mime 类型  
可以根据请求文件路径**后缀名**获取对应类型（便于规范）（如果获取不到可选application/octet-stream类型）

```json
html: 'text/html',
css: 'text/css',
js: 'text/javascript',
png: 'image/png',
jpg: 'image/jpeg',
gif: 'image/gif',
mp4: 'video/mp4',
mp3: 'audio/mpeg',
json: 'application/json'
```

> 对于未知的资源类型，可以选择 **application/octet-stream** 类型，浏览器在遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常见的 **下载** 效果  

解决乱码问题：

```js
// type 为对应 mime 类型
response.setHeader('content-type',type + ';charset=utf-8')
```

> 注：响应头的字符集优先级大于 html 中的 meta 标签
>
> 网页字符集为utf-8，所以一般不需要设置字符集

## 7、Node.js 模块化

### 7.1、模块化介绍

将一个复杂的程序文件依据一定规则（规范）拆分成多个文件的过程称之为 **模块化**
其中拆分出的 **每个文件就是一个模块** ，模块的**内部数据**是**私有**的，不过模块可以**暴露内部数据**以便其他模块使用  

编码时是按照模块一个一个编码的， 整个项目就是一个模块化的项目  

模块化好处：防止命名冲突、高复用性、高维护性  

### 7.2、模块暴露数据  

#### 7.2.1、暴露数据

模块暴露数据的方式有两种：

1. **module.exports = value**
2. **exports.name = value**  

注：
① module.exports 可以暴露 **任意** 数据
② 不能使用 exports = value 的形式暴露数据
模块内部 module 与 exports 的隐式关系：**exports = module.exports = {}** ，**require()** 函数返回的是**目标模块**中 **module.exports 的值**  

exports 与 module.exports地址关系：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230423093420.png)

案例：

```js
// me.js
// 声明函数
function tiemo(){
console.log('AAA....');
}
//暴露数据
module.exports = tiemo;
```

```js
// index.js
// 导入模块
const tiemo = require('./me.js');
// 调用函数
tiemo();  
```



### 7.3、require() 函数

在模块中使用 **require()** 传入**文件路径**即可引入文件  

```js
const test = require('./filename.js');
```

require 使用的一些注意事项：  

1. 对于**自己创建的模块**，导入时路径建议写 **相对路径** ，且**不能省略 ./ 和 ../**
2. **js** 和 **json** 文件导入时可以**不用写后缀**，c/c++编写的 node 扩展文件也可以不写后缀，但是一般用不到
3. 如果导入其他类型的文件，会以 **js** 文件进行处理
4. 如果**导入**的路径是个**文件夹**，则会 **首先** 检测该文件夹下 **package.json** 文件中 **main** 属性**对应的文件**，如果存在则导入，反之如果文件不存在会报错。
   如果 main 属性**不存在**，或者 package.json 不存在，则会尝试**导入**文件夹下的 i**ndex.js 和index.json** ，如果还是没找到，就会报错
5. 导入 **node.js 内置模块**时，直接 **require** **模块**的**名**字即可，**无需加 ./ 和 ../**  

### 7.4、require 导入的基本流程

**require** 导入 **自定义模块** 的基本流程  

1. 将相对路径转为绝对路径，定位目标文件
2. 缓存检测
3. 读取目标文件代码
4. 将代码包裹为一个函数并执行（自执行函数）。可以通过 **arguments.callee.toString()** 查看自执行函数
5. 缓存模块的值
6. 返回 **module.exports** 的值  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230423100033.png)

### 7.5、 CommonJS 规范  

module.exports 、 exports 以及 require 这些都是 CommonJS 模块化规范中的内容。
而 Node.js 是实现了 CommonJS 模块化规范，二者关系有点像 JavaScript 与 ECMAScript  

## 8、npm 包管理工具

『包』package ，代表了一组特定功能的源码集合  

管理『包』的应用软件，可以对「包」进行 **下载安装 ， 更新 ， 删除 ， 上传** 等操作
借助包管理工具，可以快速开发项目，提升开发效率
包管理工具是一个通用的概念，很多编程语言都有包管理工具，所以 掌握好包管理工具非常重要  

常用的包管理工具：**npm**、yarn、cnpm  

npm 全称 **Node Package Manager** ，翻译为中文意思是Node 的包管理工具
npm 是 node.js 官方内置的包管理工具，是 必须要掌握住的工具  

### 8.1、npm 的安装  

node.js 在安装时会 自动安装 npm ，安装了 node.js，可以直接使用 npm
在 cmd 通过 **npm -v** 查看版本号测试，如果显示版本号说明安装成功  



### 8.2、npm 初始化

创建一个空目录，然后以此目录作为工作目录 启动命令行工具 ，执行 **npm init**  

![image-20230423101809069](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230423101809069.png)

输入一些值（没有直接回车，括号中的为默认）

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230423102006.png)

**npm init** 命令的作用是将文件夹初始化为一个包， 交互式创建 **package.json** 文件
package.json 是包的配置文件，**每个包都必须要有 package.json**  

初始化的过程中还有一些**注意事项**：

1. **package name** ( 包名 ) **不能使用中文、大写**，默认值是 文件夹的名称 ，所以文件夹名称也不能使用中文和大写
2. version ( 版本号 )要求 x.x.x 的形式定义， x 必须是数字，默认值是 1.0.0
3. ISC 证书与 MIT 证书功能上是相同的，关于开源证书扩展阅读http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html
4. package.json 可以手动创建与修改
5.  使用 npm init -y 或者 npm init --yes 极速创建 package.json  

package.json 讲解：

```js
{
"name": "1-npm", #包的名字
"version": "1.0.0", #包的版本
"description": "", #包的描述
"main": "index.js", #包的入口文件
"scripts": { #脚本配置
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "", #作者
"license": "ISC" #开源证书
}
```

### 8.3、npm 搜索包

搜索包的方式有两种

1. 命令行 **npm s/search** 关键字
2. 网站搜索 网址是 https://www.npmjs.com/  （常用）

### 8.4、npm 下载包

可以通过 **npm install** 和 **npm i** 命令安装包  

```shell
## 格式
npm install <包名>
npm i <包名>
## 示例
npm install uniq
npm i uniq
```

下载包之后会增加两个资源：
	**node_modules** 文件夹 存放 **下载的包**  
	**package-lock.json** 包的锁文件 ，用来**锁定包的版本**  

依赖的概念：
创建一个包名字为 A，A 中安装了包名字是 B，我们就说 B 是 A 的一个依赖包，也会说A 依赖 B  

### 8.5、npm 包使用

通过 **require** 导入 npm 包

```js
// 1、导入 uniq 包
const uniq = require('uniq')
```

**require** 导入 npm 包**基本流程**：
	① 在当前文件夹下 node_modules 中寻找同名的文件夹
	② 在上级目录中下的 node_modules 中寻找同名的文件夹，直至找到磁盘根目录  

### 8.6、 生产依赖与开发依赖  

生产环境与开发环境 对应 生产依赖与开发依赖  

可以在安装时设置选项来 **区分依赖的类型** ，目前分为两类：  

| 类型         | 命令                                | 补充                                                         |
| ------------ | ----------------------------------- | ------------------------------------------------------------ |
| **生产**依赖 | npm i -S uniq npm i --save uniq     | -S 等效于 --save， -S 是**默认选项** 包信息保存在 package.json 中 **dependencies** 属性下 |
| **开发**依赖 | npm i -D less npm i --save-dev less | -D 等效于 --save-dev 包信息保存在 package.json 中 **devDependencies** 属性下 |

开发依赖 是只在开发阶段使用的依赖包 	-D
生产依赖 是开发阶段和最终上线运行阶段都用到的依赖包  	-S（默认选项）

### 8.7、npm 全局安装

可以执行安装选项 **npm i -g 包名** 进行全局安装  

安装 **nodemon** 包：

```shell
npm i -g nodemon
```

nodemon 该命令的作用是 **自动重启 node 应用程序** （文件保存后自动重启） 
全局安装后可以在命令行的任何位置运行 nodemon  命令

```shell
nodemon .\httptest.js
```

全局安装的命令不受工作目录位置影响
可以通过 **npm root -g** 可以查看**全局安装包的位置**
不是所有的包都适合全局安装 ， 只有全局类的工具才适合，可以通过 查看包的官方文档来确定安装方式

> 注：windows 默认不允许 npm 全局命令执行脚本文件，所以需要修改执行策略：
> ① 以管理员身份打开PowerShell
> ② 键入命令 set-ExecutionPolicy remoteSigned 
> ③ 键入 A 然后敲回车  
> ④ 重启 vscode 
>
> 方法二：修改默认配置文件，使用cmd运行
> ![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230423111538.png)

### 8.8、npm 安装包所有依赖

在项目协作中有一个常用的命令就是 **npm i** ，通过该命令可以**依据** **package.json** 和 **packagelock.json** 的依赖声明安装项目依赖  

```shell
npm i
npm install #效果一样
```

node_modules 文件夹大多数情况都不会存入版本库 （文件大，数量多）

### 8.9、npm 安装指定版本包

项目中可能会遇到版本不匹配的情况，有时就需要安装指定版本的包，可以使用下面的命令的  

```shell
### 格式
npm i <包名@版本号>
### 示例
npm i jquery@1.11.2
```

### 8.10、npm 删除包

```shell
### 局部删除
npm remove uniq
npm r uniq
### 全局删除
npm remove -g nodemon
```

### 8.11、npm 配置命令别名

通过配置命令别名可以更简单的执行命令
配置 package.json 中的 **scripts** 属性  
配置完成后，可以使用 **npm run 别名** 执行别名

案例：


```js
{
	. . . 
	"scripts": {
		"server": "node server.js",
		"start": "node index.js",
	},
	. .
}
```

可以使用别名执行命令  

```shell
npm run server
npm run start
```

不过 **start** 别名比较特别，使用时可以省略 run  

```shell
npm start
```

**npm start** 是项目中常用的一个命令，一般用来启动项目 
**npm run** 有自动向上级目录查找的特性，跟 require 函数也一样 
对于陌生的项目，我们可以通过查看 **scripts** 属性来参考项目的一些操作  

### 8.12、npm 配置淘宝镜像  

方式一：直接配置

​	执行如下命令即可完成配置  

```shell
npm config set registry https://registry.npmmirror.com/
```

方式二：工具配置（推荐）

​	使用 **nrm** 配置 npm 的镜像地址 （nrm：**npm registry manager**）：

​	① 安装nrm：
（最新的open版本变成了ES Module版本）

```shell
npm i -g nrm open@8.4.2
```

​	② 修改镜像 ：

```shell
nrm use taobao
```

​	③ 检查是否配置成功：

```shell
npm config list
```

检查 registry 地址是否为 https://registry.npmmirror.com/ , 如果 是 则表明成功  

建议使用第二种方式 进行镜像配置，因为后续修改起来会比较方便 

## 9、cnpm

### 9.1、介绍

cnpm 是一个淘宝构建的 **npmjs.com** 的完整镜像，也称为 淘宝镜像，网址https://npmmirror.com/
cnpm 服务部署在国内 阿里云服务器上 ， 可以提高包的下载速度
官方也提供了一个全局工具包 **cnpm** ，操作命令与 npm 大体相同

### 9.2、安装

可以通过 npm 来安装 cnpm 工具  

```shell
npm install -g cnpm --registry=https://registry.npmmirror.com
```

### 9.3、命令

| 功能         | 命令                                                         |
| ------------ | ------------------------------------------------------------ |
| 初始化       | cnpm init                                                    |
| 安装包       | cnpm i uniq<br />cnpm i -S uniq<br /> cnpm i -D uniq <br />cnpm i -g nodemon |
| 安装项目依赖 | cnpm i                                                       |
| 删除         | cnpm r uniq                                                  |

虽然 cnpm 可以提高速度，但是 npm 也可以通过淘宝镜像进行加速，所以 npm 的使用率还是高于 cnpm  

## 10、yarn

### 10.1、yarn 介绍

[yarn](https://yarnpkg.com/) 是由 Facebook 在 2016 年推出的新的 Javascript 包管理工具  

yarn 官方宣称的一些特点 ：
	速度超快：yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快
	超级安全：在执行代码之前，yarn 会通过算法校验每个安装包的完整性
	超级可靠：使用详细、简洁的锁文件格式和明确的安装算法，yarn 能够保证在不同系统上无差异的
工作  

### 10.2、yarn 安装

```shell
npm i yarn
```

### 10.3、yarn 常用命令

| 功能         | 命令                                                         |
| ------------ | ------------------------------------------------------------ |
| 初始化       | yarn init / yarn init -y                                     |
| 安装包       | yarn add uniq 生产依赖 <br />yarn add less --dev 开发依赖 <br />yarn global add nodemon 全局安装 |
| 删除包       | yarn remove uniq 删除项目依赖包 yarn global remove nodemon 全局删除包 |
| 安装项目依赖 | yarn                                                         |
| 运行命令别名 | yarn <别名> # 不需要添加 run<br />(yarn start / yarn server) |

这里有个小问题就是 全局安装的包（ nodemon）不可用 ，yarn 全局安装包的位置可以通过 yarn global bin 来查看，将查看到的文件夹配置到环境变量即可解决问题  

### 10.4、yarn 配置淘宝镜像  

```shell
yarn config set registry https://registry.npmmirror.com/
```

通过 **yarn config list** 查看 yarn 的配置项  

### 10.5、npm 和 yarn 选择  

哪个工具都可以  

他人的项目可以通过**锁文件**判断 项目的包管理工具  

npm 的锁文件为 package-lock.json
yarn 的锁文件为 yarn.lock  

包管理工具 **不要混着用**，切记，切记，切记  

## 11、nvm

nvm 全称 Node Version Manager 顾名思义它是用来管理 node 版本的工具，方便 **切换不同版本的Node.js**  

nvm 的使用非常的简单，跟 npm 的使用方法类似  

首先先下载 nvm，下载地址 https://github.com/coreybutler/nvm-windows/releases，  选择 nvm-setup.exe 下载即可

nvm 常用命令（cmd下）：

| 命令                  | 说明                            |
| --------------------- | ------------------------------- |
| nvm list available    | 显示所有可以下载的 Node.js 版本 |
| nvm list              | 显示已安装的版本                |
| nvm install 18.12.1   | 安装 18.12.1 版本的 Node.js     |
| nvm install latest    | 安装最新版的 Node.js            |
| nvm uninstall 18.12.1 | 删除某个版本的 Node.js          |
| nvm use 18.12.1       | 切换 18.12.1 的 Node.js         |

## 12、Express JS

### 12.1、express 介绍  

express 是一个基于 Node.js 平台的极简、灵活的 WEB 应用开发框架，官方网址：https://www.expressjs.com.cn/
简单来说，express 是一个**封装好的工具包**，封装了很多功能，便于我们**开发 WEB 应用（HTTP 服务）**  

### 12.2、express 使用  

express 本身是一个 npm 包，所以可以通过 npm 安装  

```shell
npm init
npm i express
```

```js
//1. 导入 express
const express = require('express');

//2. 创建应用对象
const app = express();

//3. 创建路由规则
// 如果请求方式是get，url是 /home，则执行后面的回调函数
app.get('/home', (req, res) => {
	res.end('hello express server');
});

//4. 监听端口 启动服务
app.listen(3000, () =>{
console.log('服务已经启动, 端口监听为 3000...');
});
```

命令行下执行该脚本  

```shell
node <文件名>
## 或者
nodemon <文件名>
```

在浏览器就可以访问 http://127.0.0.1:3000/home  

### 12.3、express  路由

**路由**的概念：路由确定了**应用程序（服务端）**如何 **响应客户端** 对**特定端点**的请求  

#### 12.3.1、路由的使用

一个路由的组成有 **请求方法** ， **路径** 和 **回调函数** 组成  

express 中提供了一系列方法，可以很方便的使用路由，使用格式如下：  

```js
app.<method>(path，callback)
```

```js
//导入 express
const express = require('express');
//创建应用对象
const app = express();
//创建 get 路由
app.get('/home', (req, res) => {
	res.send('网站首页');
});
//首页路由
app.get('/', (req,res) => {
	res.send('我才是真正的首页');
});
//创建 post 路由
app.post('/login', (req, res) => {
	res.send('登录成功');
});
//匹配所有的请求方法
app.all('/search', (req, res) => {
	res.send('1 秒钟为您找到相关结果约 100,000,000 个');
});
//自定义 404 路由
app.all("*", (req, res) => { //404路由
	res.send('<h1>404 Not Found</h1>')
});
//监听端口 启动服务
app.listen(3000, () =>{
	console.log('服务已经启动, 端口监听为 3000');
});
```

#### 12.3.2、获取请求参数

express 框架封装了一些 API 来方便获取请求报文中的数据，并且兼容原生 HTTP 模块的获取方式  

```js
//导入 express
const express = require('express');
//创建应用对象
const app = express();
//获取请求的路由规则
app.get('/request', (req, res) => {
    //1. 获取报文的方式与原生 HTTP 获取方式是兼容的
    console.log(req.method);
    console.log(req.url);
    console.log(req.httpVersion);
    console.log(req.headers);
    //2. express 独有的获取报文的方式
    //获取查询字符串
    console.log(req.query); // 『相对重要』
    // 获取指定的请求头
    console.log(req.get('host'));
	res.send('请求报文的获取');
});
//启动服务
app.listen(3000, () => {
	console.log('启动成功....')
})
```

#### 12.3.3、获取路由参数

路由参数指的是 **URL 路径中的参数（数据）**  

```js
// /1654616654.html -> req.params.id = 1654616654
app.get('/:id.html', (req, res) => {
	res.send('商品详情, 商品 id 为' + req.params.id);
});
```

### 12.4、express 响应设置

express 框架封装了一些 API 来方便给客户端响应数据，并且兼容原生 HTTP 模块的获取方式

```js
//获取请求的路由规则
app.get("/response", (req, res) => {
    //res.setHeader('content-type','text/html;charset=utf-8');
  
    // 方式一：
    //1. express 中设置响应的方式兼容 HTTP 模块的方式
    res.statusCode = 404;
    res.statusMessage = 'xxx';
    res.setHeader('xxx','yyy');
    res.write('设置响应体');
    res.end('+xxx');
    
    // 方式二：
    //2. express 的响应方法
    res.status(500); //设置响应状态码
    res.set('xxx','yyy');//设置响应头
    //sent 方法自动添加字符集编码的响应头
    res.send('中文响应不乱码');//设置响应体
    
    //连贯操作
    res.status(404).set('xxx','yyy').send('你好朋友')
    
    //3. 其他响应
    res.redirect('http://atguigu.com')//重定向
    res.download('./package.json');//下载响应
    res.json();//响应 JSON
    res.sendFile(__dirname + '/home.html') //响应文件内容
});
```

### 12.5、express 中间件  

中间件（Middleware）本质是一个回调函数  

中间件函数 可以像路由回调一样访问 请求对象（request） ， 响应对象（response）  

中间件的作用 就是 **使用函数封装公共操作，简化代码**  

中间件的类型：全局中间件， 路由中间件

#### 12.5.1、全局中间件  

（拦截）**每一个请求** 到达服务端之后 都会**执行全局中间件函数**  

声明全局中间件函数：
函数： function(request,response,next)	`（公共部分提取）`
next：调用后续的路由回调函数

```js
let recordMiddleware = function(request,response,next){
    //实现功能代码
    //.....
    //执行next函数(当如果希望执行完中间件函数之后，仍然继续执行路由中的回调函数，必须调用next)
    next();
}
```

应用中间件  

```js
app.use(recordMiddleware);
```

声明时可以直接将匿名函数传递给 **use**  

```js
app.use(function (request, response, next) {
	console.log('定义第一个中间件');
	next();
})
```

![image-20230425170744017](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230425170744017.png)

多个全局中间件：

```js
app.use(function (request, response, next) {
	console.log('定义第一个中间件');
	next();
})
app.use(function (request, response, next) {
	console.log('定义第二个中间件');
	next();
})
```

#### 15.2.2、路由中间件  

如果 只需要对某一些路由进行功能封装 ，则就需要路由中间件  

调用格式如下  

```js
let recordMiddleware1 = function(request,response,next){
    //实现功能代码
    //.....
    next();
}
app.get('/路径',recordMiddleware1,(request,response)=>{
    
});
app.get('/路径',中间件函数1,中间件函数2,(request,response)=>{
    
});
```

#### 15.2.3、静态资源中间件  

express 内置处理静态资源的中间件  

```js
//引入express框架
const express = require('express');
//创建服务对象
const app = express();

//静态资源中间件的设置，将当前文件夹下的public目录作为网站的根目录
app.use(express.static(__dirname + './public')); //当然这个目录中都是一些静态资源


//如果访问的内容经常变化，还是需要设置路由
//但是，在这里有一个问题，如果public目录下有index.html文件，单独也有index.html的路由，
//则谁书写在前，优先执行谁
//创建路由
app.get('/index.html',(request,response)=>{
respsonse.send('首页');
});
//监听端口
app.listen(3000,()=>{
console.log('3000 端口启动....');
});
```

> 注：
> index.html 文件为**默认打开**的资源
> 如果静态资源与路由规则同时匹配，谁**先**匹配谁就响应
> **路由**响应**动态资源**，**静态**资源中间件响应**静态资源**  

### 12.6、获取请求体数据 body-parser  

express 可以使用 **body-parser** 包处理请求体  

安装：

```shell
npm i body-parser  
```

导入 body-parser 包 ：

```js
const bodyParser = require('body-parser');
```

获取中间件函数  

```js
//处理 querystring 格式的请求体
let urlParser = bodyParser.urlencoded({extended:false}));
//处理 JSON 格式的请求体
let jsonParser = bodyParser.json();
```

设置路由中间件，然后使用 **request.body** 来获取请求体数据  

```js
app.post('/login', urlParser, (request,response)=>{ //当urlParser中间件执行完毕后，自动为request添加body对象
    //获取请求体数据
    //用户名
    console.log(request.body.username);
    //密码
    console.log(request.body.userpass);
    response.send('获取请求体数据');
});
```

### 12.7、防盗链实现

防盗链：禁止其他网站访问非此域名下的资源（图片，css等）

防盗链实现：通过 请求头中 **referer**（参考页）判断是否为当前域名下的访问，如果不是返回404

实现：

```js
// 导入express
const express = require('express')
// 创建应用对象
const app = express();
// 声明中间件
app.use((req,res,next) => {
    // 检测请求头中的 referer 是否为 127.0.0.1
    let referer = req.get('referer');
    //console.log(referer);
    if(referer){
        //实例化
        let url = new URL(referer)
        //获取hostname
        let hostname = url.hostname
        // console.log(hostname);
        //判断
        if(hostname !== '127.0.0.1'){
            res.status(404).send('<h1>404 NOT Found</h1>')
            return;
        }
    }
    next();    
})
```

### 12.8、Router 路由模块化

express 中的 **Router** 是一个完整的中间件和路由系统，可以看做是一个**小型的 app 对象**。  

Router 的作用：对路由进行模块化，更好的 **管理路由**  

使用案例：

创建独立的 JS 文件（homeRouter.js）  

```js
//1. 导入 express
const express = require('express');
//2. 创建路由器对象
const router = express.Router();
//3. 在 router 对象身上添加路由
router.get('/', (req, res) => {
	res.send('首页');
})
router.get('/cart', (req, res) => {
	res.send('购物车');
});
//4. 暴露
module.exports = router;
```

主文件  

```js
const express = require('express');
const app = express();
//5.引入子路由文件
const homeRouter = require('./routes/homeRouter');
//6.设置和使用中间件
app.use(homeRouter);
app.listen(3000,()=>{
	console.log('3000 端口启动....');
})
```

### 12.9、express generator工具

使用应用程序生成器工具 [express-generator](http://expressjs.com/en/starter/generator.html#express-application-generator) 快速创建应用程序框架。

可以使用命令运行应用程序生成器`npx`

```shell
npx express-generator
express -e accounts
```

npm start 开启服务

## 13、接口

### 13.1、介绍

接口API (Application Program Interface)  是 前后端通信的桥梁  ，这里的接口指的是 **数据接口**

一个接口就是 服务中的一个路由规则 ，根据请求响应结果  

### 13.2、Restful

RESTful API 是一种特殊风格的接口

规则示例：  

| 操作         | 请求类型 | URL      | 返回                 |
| ------------ | -------- | -------- | -------------------- |
| 新增歌曲     | POST     | /song    | 返回新生成的歌曲信息 |
| 删除歌曲     | DELETE   | /song/10 | 返回一个空文档       |
| 修改歌曲     | PUT      | /song/10 | 返回更新后的歌曲信息 |
| 修改歌曲     | PATCH    | /song/10 | 返回更新后的歌曲信息 |
| 获取所有歌曲 | GET      | /song    | 返回歌曲列表数组     |
| 获取单个歌曲 | GET      | /song/10 | 返回单个歌曲信息     |

### 13.3、json-server  

[json-server](https://github.com/typicode/json-server) 本身是一个 JS 编写的工具包，可以快速搭建 RESTful API 服务  

全局安装 json-server  ：

```shell
npm i -g json-server
```

使用：

创建 JSON 文件（db.json），编写基本结构  

```json
{
    "song": [
    { "id": 1, "name": "干杯", "singer": "五月天" },
    { "id": 2, "name": "当", "singer": "动力火车" },
    { "id": 3, "name": "不能说的秘密", "singer": "周杰伦" }
    ]
}
```

以 JSON 文件所在文件夹作为工作目录 ，执行如下命令 ，默认监听端口为 3000  

```shell
json-server --watch db.json
```

测试访问：
127.0.0.1:3000/song
127.0.0.1:3000/song/2

## 14、会话控制  

HTTP 是一种 **无状态** 协议，它没有办法区分多次的请求是否来自于同一个客户端， **无法区分用户**，所以我们需要通过 **会话控制** 来解决该问题  

常见的会话控制技术有三种：
**cookie  ，session  ，token**  

### 14.1、cookie

cookie 是 **保存在 浏览器端 **（本地）的一小块数据  
cookie 是按照域名划分保存的  

浏览器向服务器发送请求时，会自动将 当前域名下 **可用的 cookie 设置在请求头中**，然后传递给服务器  
这个请求头的名字也叫 cookie ，所以将 cookie 理解为一个 HTTP 的请求头也是可以的  

不同浏览器中的 cookie 是相互独立的，不共享  
浏览器限制单个 cookie 保存的数据不能超过 4K  



express 中可以使用 cookie-parser 进行处理  （使用较少）：
向cookie中添加，读取，删除数据，设置数据的时效性

```js
const express =require('express');
//1. 安装 cookie-parser npm i cookie-parser
//2. 引入 cookieParser 包
const cookieParser = require('cookie-parser');
const app = express();
//3. 设置 cookieParser 中间件
app.use(cookieParser());

//4-1 设置 cookie
app.get('/set-cookie', (request, response) => {
	// 不带时效性（会在浏览器关闭时销毁）
	response.cookie('username','wangwu');
	// 带时效性
	response.cookie('email','23123456@qq.com', {maxAge: 5*60*1000 });
	//响应
	response.send('Cookie的设置');
});

//4-2 读取 cookie
app.get('/get-cookie', (request, response) => {
	//读取 cookie
	console.log(request.cookies);
	//响应体
	response.send('Cookie的读取');
});

//4-3 删除cookie
app.get('/delete-cookie', (request, response) => {
	//删除
	response.clearCookie('username');
	//响应
	response.send('cookie 的清除');
});
	//4. 启动服务
	app.listen(3000, () => {
	console.log('服务已经启动....');
});
```

### 14.2、session

session 是**保存在 服务器端** 的一块儿数据 ，保存当前访问用户的相关信息  

填写账号和密码校验身份，校验通过后创建 session 信息 ，然后将 session_id 的值通过响应头返回给浏览器 
有了 cookie，下次发送请求时会自动携带 cookie，服务器通过 cookie 中的 session_id 的值确定用户的身份   

![image-20230430123721044](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230430123721044.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230430123752.png)

express 中可以使用 express-session 对 session 进行操作  

```js
const express = require('express');
//1. 安装包 npm i express-session connect-mongo
//2. 引入 express-session connect-mongo
const session = require("express-session");
const MongoStore = require('connect-mongo');
const app = express();

//3. 设置 session 的中间件
app.use(session({
	name: 'sid', //设置cookie的name，默认值是：connect.sid
	secret: '12345', //参与加密的字符串（又称签名） 别称：加盐
	saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
	resave: true, //是否在每次请求时重新保存session（重置保存时间）
	store: MongoStore.create({
		mongoUrl: 'mongodb://127.0.0.1:27017/project' //数据库的连接配置
	}),
	cookie: {
		httpOnly: true, // 开启后前端无法通过 JS 操作
		maxAge: 1000 * 60 * 5 // 这一条 是控制 sessionID 的过期时间的！！！5分钟
	},
}))
//创建 session
app.get('/login', (req, res) => {
	//设置session
	req.session.username = 'zhangsan';
	req.session.email = 'zhangsan@qq.com'
	res.send('登录成功');
})
//获取 session
app.get('/home', (req, res) => {
	console.log('session的信息');
	console.log(req.session.username);
	if (req.session.username) {
		res.send(`你好 ${req.session.username}`);
	}else{
		res.send('登录 注册');
	}
})
//销毁 session
app.get('/logout', (req, res) => {
	//销毁session
	// res.send('设置session');
	req.session.destroy(() => {
		res.send('成功退出');
	});
});

app.listen(3000, () => {
	console.log('服务已经启动, 端口 ' + 3000 + ' 监听中...');
});
```

cookie 和 session 的区别：  
① 存储位置：
	cookie：浏览器端
	session：服务端

②  安全性：
	cookie 是以**明文**的方式存放在客户端的，安全性相对较低
	session 存放于服务器中，所以安全性 相对 较好

③  网络传输量
	cookie 设置内容过多会增大报文体积， 会影响传输效率
	session 数据存储在服务器，只是通过 cookie 传递 id，所以不影响传输效率

④  存储限制
浏览器限制单个 cookie 保存的数据不能超过 4K ，且单个域名下的存储数量也有限制
session 数据存储在服务器中，所以没有这些限制  

### 14.3、token

**token 保存在客户端**

**token** 是 **服务端生成** 并 **返回给 HTTP 客户端** 的一串**加密字符串**， token 中保存着 用户信息  

token 可以实现会话控制，识别用户的身份，主要用于**移动端 APP**  

token 工作流程：
填写账号和密码校验身份，**服务端** 校验通过后创建并**响应 token**，token 一般是在 **响应体** 中返回给客户端的  

后续 **客户端** 发送请求时，需要 **手动**将 **token 添加在** 请求报文** 中，一般是放在 **请求头** 中  

![image-20230430135704524](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230430135704524.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230430135727.png)

token特点：
① 数据存储在客户端  
② 数据加密  ，可以避免 CSRF（跨站请求伪造）  
③ 扩展性更强  ，服务间可以共享  ，增加服务节点更简单  

#### JWT 工具

JWT（JSON Web Token ）是目前最流行的跨域认证解决方案，可用于基于 token 的身份验证  
JWT 使 **token 的生成与校验更规范** 
可以使用 jsonwebtoken 包 来操作 token  

安装 jsonwebtoken ：

```shell
npm i jsonwebtoken
```

创建（生成）token：

```js
const jwt = require('jsonwebtoken');
jwt.sign(数据, 加密字符串, 配置对象)
```

```js
//导入 jsonwebtokan
const jwt = require('jsonwebtoken');
//创建 token
// jwt.sign(数据, 加密字符串, 配置对象)
let token = jwt.sign({
	username: 'zhangsan'
}, 't4mako', {
	expiresIn: 60 //单位是 秒
})
//解析 token
jwt.verify(token, 't4mako', (err, data) => {
	if(err){
		console.log('校验失败~~');
	return
} 
console.log(data);
})
```



## 15、EJS（不常用）

EJS 是一个高效的 Javascript 的模板引擎  ，文件后缀名 .ejs

官网: https://ejs.co/
中文站：https://ejs.bootcss.com/  

## 16、扩展：配置HTTPS证书

https = http + ssl
https 可以加密 http 报文

工具官网：https://certbot.eff.org
