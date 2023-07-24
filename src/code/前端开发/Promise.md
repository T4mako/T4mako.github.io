---
title: Promise 基础
icon: object
---
## 1、Promise 介绍

### 1.1、Promise 是什么

#### 1.1.1、概念

Promise 是一门新的技术(ES6 规范)  
Promise 是 JS 中进行 **异步编程** 的新解决方案  （旧方案是单纯使用 **回调函数**  ）

从语法上来说: Promise 是一个**构造函数**  
从功能上来说: promise 对象用来**封装（包裹）一个异步操作**并可以获取其成功/失败的结果值  

#### 1.1.2、promise 的状态

1. pending 变为 **resolved**
2.  pending 变为 **rejected**  

说明: 只有这 2 种, 且一个 promise 对象**只改变一次**
		无论变为成功还是失败, 都会有一个结果数据
		成功的结果数据一般称为 **value**, 失败的结果数据一般称为 **reason**  

### 1.2、promise 工作流程

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230503142157.png)

### 1.3、Promise 的优点

① 指定回调函数的方式更加灵活  

旧回调：必须在启动异步任务前指定  

promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函
数(甚至可以在异步任务结束后指定/多个)  

② 支持**链式调用**, 可以解决回调地狱问题  

回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调执行的条件  

回调地狱不便于阅读和异常处理

解决方案：promise 链式调用，async/await  

### 1.4、Promise API

#### 1、构造函数

Promise **构造函数**: **Promise (excutor) {}**
 executor 函数: 执行器 **(resolve, reject) => {}**
	 resolve 函数: 内部定义 **成功时的回调** **value => {}**
 	reject 函数: 内部定义 **失败时的回调** **reason => {}**
说明: executor 会在 Promise 内部立即 ***同步*** 调用,异步操作在执行器中执行

#### 2、PromiseState 属性

Promise 内置 **属性**：**PromiseState**
	**pending**：未决定的
	**resolved / fullfilled** 成功
	**rejected** 失败

#### 3、PromiseResult 属性

Promise 内置 **属性**：**PromiseResult**
	该属性保存对象 成功 / 失败 的结果
	resolve() 和 reject() 两个函数 可以修改 PromiseResult 的值

#### 4、then() 方法

Promise.prototype.**then**(onResolved, [onRejected]) => {} 方法: 

```js
then(onFulfilled)
then(onFulfilled, onRejected)
```

(1) onResolved 函数: **成功** 的回调函数 **(value) => {}**
(2) onRejected 函数: **失败** 的回调函数 **(reason) => {}**
说明: 指定用于得到成功 value 的成功回调 和 用于得到失败 reason 的失败回调
返回一个新的 promise 对象

#### 5、catch() 方法

Promise.prototype.catch (onRejected) => {} 方法:

catch 只能指定 **失败** 的回调
onRejected 函数:  (reason) => {} 
说明: then()的语法糖, 相当于: then(undefined, onRejected)   

#### 6、resolve() 方法

Promise.resolve(value) => {} 方法: 

value: 数据 或 promise 对象
说明: 快速返回一个成功/失败的 promise 对象

```html
<script>
    let p1 = Promise.resolve(521);
    //如果传入的参数为 非Promise类型的对象, 则返回的结果为成功promise对象
    //如果传入的参数为 Promise 对象, 则参数的结果决定了 resolve 的结果
    let p2 = Promise.resolve(new Promise((resolve, reject) => {
        // resolve('OK');
        reject('Error');
    }));
    // console.log(p2);
    p2.catch(reason => {
        console.log(reason);
    })
</script>
```

#### 7、reject() 方法

Promise.reject(reason) => {} 方法: 

reason: 失败的原因
说明: 快速返回一个失败的 promise 对象

#### 8、all() 方法

Promise.**all**(promises) => {} 方法: 

(1) promises: 包含 n 个 promise 的 **数组**
说明: 返回一个新的 promise, 只有**所有的 promise 都成功才成功**, 只要有一个失败了就 直接失败

#### 9、race() 方法

Promise.**race**(promises) => {} 方法: 

(1) promises: 包含 n 个 promise 的 **数组**
说明: 返回一个新的 promise, **第一个完成的 promise** 的结果状态就是最终的结果状态  

### 1.5、几个关键问题

1、如何改变 promise 的状态：
	(1) resolve(value): 如果当前是 pending 就会变为 resolved
	(2) reject(reason): 如果当前是 pending 就会变为 rejected
	(3) 抛出异常 `throw '出问题了'`: 如果当前是 pending 就会变为 rejected  

2、一个 promise 调用 then 方法 指定多个成功/失败回调函数, 都会调用（当 promise 改变为对应状态时都会调用  ）

3、改变 promise 状态改变 和 then方法 的先后顺序
	(1) 都有可能, 正常情况下是先指定回调（then）再 改变状态, 但也可以先改状态再指定回调
	(2) 如何先改状态再指定回调?
		① 在执行器中直接调用 resolve()/reject()
		② 延迟更长时间才调用 then()
	(3) 什么时候才能得到数据?
		① 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据
		② 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据  

4、promise.then()返回的 **新 promise 的结果状态** 由什么决定?  
	由 then()指定的回调函数执行的结果决定  
		① 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常
		② 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值
		③ 如果返回的是另一个新 promise, 此 promise 的结果就会成为新  promise 的结果  

5、promise 如何串连多个操作任务?（**链式**操作）
	(1) promise 的 then()返回一个新的 promise, 可以看成 then()的链式调用
	(2) 通过 then 的链式调用串连多个同步/异步任务  

6、promise **异常传透**
	(1) 当使用 promise 的 then 链式调用时, 可以 **在最后指定失败的回调,**
	(2) 前面任何操作出了异常, 都会传到最后失败的回调中处理 （类似异常处理 catch）

```html
<script>
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('OK');
            // reject('Err');
        }, 1000);
    });

    p.then(value => {
        // console.log(111);
        throw '失败啦!';
    }).then(value => {
        console.log(222);
    }).then(value => {
        console.log(333);
    }).catch(reason => {
        console.warn(reason); // Err 失败啦
    });
</script>
```

7、**中断** promise **链**
	(1) 当使用 promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数
	(2) 办法: 在回调函数中**返回一个 pendding 状态的 promise 对象**  

## 2、Promise 使用

### 2.1、promise 初体验

需求： 点击按钮,  1s 后显示是否中奖(30%概率中奖)
			若中奖弹出   恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券
			若未中奖弹出  再接再厉

```html
<!--传统回调-->
<script>
    //生成随机数
    function rand(m,n){
        return Math.ceil(Math.random() * (n-m+1)) + m-1;
    }

    //获取元素对象
    const btn = document.querySelector('#btn');
    //绑定单击事件
    btn.addEventListener('click', function(){
        //定时器
        setTimeout(() => {
            let n = rand(1, 100);
            //判断
            if(n <= 30){
                alert('恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券');
            }else{
                alert('再接再厉');
            }
        }, 1000);
    }
</script>
```

```html
<!--Promise-->
<script>
    //生成随机数
    function rand(m,n){
        return Math.ceil(Math.random() * (n-m+1)) + m-1;
    }
    //获取元素对象
    const btn = document.querySelector('#btn');
    //绑定单击事件
    btn.addEventListener('click', function(){
        //Promise 形式实现
        // resolve 解决  函数类型的数据
        // reject  拒绝  函数类型的数据
        const p = new Promise((resolve, reject) => {
            setTimeout(() => {
                let n = rand(1, 100);
                //判断
                if(n <= 30){
                    resolve(n); // 将 promise 对象的状态设置为 『成功』
                }else{
                    reject(n); // 将 promise 对象的状态设置为 『失败』
                }
            }, 1000);
        });

        console.log(p);
        //调用 then 方法
        // value 和 reason 的命名为伪规则
        p.then((value) => {
            alert('恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券, 您的中奖数字为 ' + value);
        }, (reason) => {
            alert('再接再厉, 您的号码为 ' + reason);
        });

    });
</script>
```

### 2.2、fs 模块使用 Promise

```js
const fs = require('fs');

//回调函数 形式
// fs.readFile('./resource/content.txt', (err, data) => {
//     // 如果出错 则抛出错误
//     if(err)  throw err;
//     //输出文件内容
//     console.log(data.toString());
// });

//Promise 形式
let p = new Promise((resolve , reject) => {
    fs.readFile('./resource/content.tx', (err, data) => {
        //如果出错
        if(err) reject(err);
        //如果成功
        resolve(data);
    });
});

//调用 then 
p.then(value=>{
    console.log(value.toString());
}, reason=>{
    console.log(reason);
});
```

### 2.3、Ajax 操作 Promise

```html
<script>
    //接口地址 https://api.apiopen.top/getJoke
    //获取元素对象
    const btn = document.querySelector('#btn');

    btn.addEventListener('click', function(){
        //创建 Promise
        const p = new Promise((resolve, reject) => {
            //1.创建对象
            const xhr = new XMLHttpRequest();
            //2. 初始化
            xhr.open('GET', 'https://api.apiopen.top/getJoke');
            //3. 发送
            xhr.send();
            //4. 处理响应结果
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    //判断响应状态码 2xx   
                    if(xhr.status >= 200 && xhr.status < 300){
                        //控制台输出响应体
                        resolve(xhr.response);
                    }else{
                        //控制台输出响应状态码
                        reject(xhr.status);
                    }
                }
            }
        });
        //调用then方法
        // 成功时回调
        p.then(value=>{
            console.log(value);
            // 失败时回调
        }, reason=>{
            console.warn(reason);
        });
    });
</script>
```

### 2.4、util.promise

```js
/**
 * util.promisify 方法
 */
//引入 util 模块
const util = require('util');
//引入 fs 模块
const fs = require('fs');
//返回一个新的函数
let mineReadFile = util.promisify(fs.readFile);

// 函数调用后返回一个 promise 对象
mineReadFile('./resource/content.txt').then(value=>{
    console.log(value.toString());
});
```

### 2.5、Promise 封装 Ajax 请求

封装一个函数 sendAJAX 发送 GET AJAX 请求

```html
<script>
    /**
         * 封装一个函数 sendAJAX 发送 GET AJAX 请求
         * 参数   URL
         * 返回结果 Promise 对象
         */
    function sendAJAX(url){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("GET", url);
            xhr.send();
            //处理结果
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    //判断成功
                    if(xhr.status >= 200 && xhr.status < 300){
                        //成功的结果
                        resolve(xhr.response);
                    }else{
                        reject(xhr.status);
                    }
                }
            }
        });
    }

    sendAJAX('https://api.apiopen.top/getJok')
        .then(value => {
        console.log(value);
    }, reason => {
        console.warn(reason);
    });
</script>
```

## 3、Promise 自定义（手写）

### Promise 自定义封装

```js
//声明构造函数
function Promise(executor){
    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //声明属性
    this.callbacks = [];
    //保存实例对象的 this 的值
    const self = this;// self _this that
    //resolve 函数
    function resolve(data){
        //判断状态
        if(self.PromiseState !== 'pending') return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'fulfilled';// resolved
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
        //调用成功的回调函数
        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onResolved(data);
            });
        });
    }
    //reject 函数
    function reject(data){
        //判断状态
        if(self.PromiseState !== 'pending') return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'rejected';// 
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
        //执行失败的回调
        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onRejected(data);
            });
        });
    }
    try{
        //同步调用『执行器函数』
        executor(resolve, reject);
    }catch(e){
        //修改 promise 对象状态为『失败』
        reject(e);
    }
}

//添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){
    const self = this;
    //判断回调函数参数
    if(typeof onRejected !== 'function'){
        onRejected = reason => {
            throw reason;
        }
    }
    if(typeof onResolved !== 'function'){
        onResolved = value => value;
        //value => { return value};
    }
    return new Promise((resolve, reject) => {
        //封装函数
        function callback(type){
            try{
                //获取回调函数的执行结果
                let result = type(self.PromiseResult);
                //判断
                if(result instanceof Promise){
                    //如果是 Promise 类型的对象
                    result.then(v => {
                        resolve(v);
                    }, r=>{
                        reject(r);
                    })
                }else{
                    //结果的对象状态为『成功』
                    resolve(result);
                }
            }catch(e){
                reject(e);
            }
        }
        //调用回调函数  PromiseState
        if(this.PromiseState === 'fulfilled'){
            setTimeout(() => {
                callback(onResolved);
            });
        }
        if(this.PromiseState === 'rejected'){
            setTimeout(() => {
                callback(onRejected);
            });
        }
        //判断 pending 状态
        if(this.PromiseState === 'pending'){
            //保存回调函数
            this.callbacks.push({
                onResolved: function(){
                    callback(onResolved);
                },
                onRejected: function(){
                    callback(onRejected);
                }
            });
        }
    })
}

//添加 catch 方法
Promise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected);
}

//添加 resolve 方法
Promise.resolve = function(value){
    //返回promise对象
    return new Promise((resolve, reject) => {
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v);
            }, r=>{
                reject(r);
            })
        }else{
            //状态设置为成功
            resolve(value);
        }
    });
}

//添加 reject 方法
Promise.reject = function(reason){
    return new Promise((resolve, reject)=>{
        reject(reason);
    });
}

//添加 all 方法
Promise.all = function(promises){
    //返回结果为promise对象
    return new Promise((resolve, reject) => {
        //声明变量
        let count = 0;
        let arr = [];
        //遍历
        for(let i=0;i<promises.length;i++){
            //
            promises[i].then(v => {
                //得知对象的状态是成功
                //每个promise对象 都成功
                count++;
                //将当前promise对象成功的结果 存入到数组中
                arr[i] = v;
                //判断
                if(count === promises.length){
                    //修改状态
                    resolve(arr);
                }
            }, r => {
                reject(r);
            });
        }
    });
}

//添加 race 方法
Promise.race = function(promises){
    return new Promise((resolve, reject) => {
        for(let i=0;i<promises.length;i++){
            promises[i].then(v => {
                //修改返回对象的状态为 『成功』
                resolve(v);
            },r=>{
                //修改返回对象的状态为 『失败』
                reject(r);
            })
        }
    });
}
```

### Class 版本封装

```js
class Promise{
    //构造方法
    constructor(executor){
        //添加属性
        this.PromiseState = 'pending';
        this.PromiseResult = null;
        //声明属性
        this.callbacks = [];
        //保存实例对象的 this 的值
        const self = this;// self _this that
        //resolve 函数
        function resolve(data){
            //判断状态
            if(self.PromiseState !== 'pending') return;
            //1. 修改对象的状态 (promiseState)
            self.PromiseState = 'fulfilled';// resolved
            //2. 设置对象结果值 (promiseResult)
            self.PromiseResult = data;
            //调用成功的回调函数
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onResolved(data);
                });
            });
        }
        //reject 函数
        function reject(data){
            //判断状态
            if(self.PromiseState !== 'pending') return;
            //1. 修改对象的状态 (promiseState)
            self.PromiseState = 'rejected';// 
            //2. 设置对象结果值 (promiseResult)
            self.PromiseResult = data;
            //执行失败的回调
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onRejected(data);
                });
            });
        }
        try{
            //同步调用『执行器函数』
            executor(resolve, reject);
        }catch(e){
            //修改 promise 对象状态为『失败』
            reject(e);
        }
    }

    //then 方法封装
    then(onResolved,onRejected){
        const self = this;
        //判断回调函数参数
        if(typeof onRejected !== 'function'){
            onRejected = reason => {
                throw reason;
            }
        }
        if(typeof onResolved !== 'function'){
            onResolved = value => value;
            //value => { return value};
        }
        return new Promise((resolve, reject) => {
            //封装函数
            function callback(type){
                try{
                    //获取回调函数的执行结果
                    let result = type(self.PromiseResult);
                    //判断
                    if(result instanceof Promise){
                        //如果是 Promise 类型的对象
                        result.then(v => {
                            resolve(v);
                        }, r=>{
                            reject(r);
                        })
                    }else{
                        //结果的对象状态为『成功』
                        resolve(result);
                    }
                }catch(e){
                    reject(e);
                }
            }
            //调用回调函数  PromiseState
            if(this.PromiseState === 'fulfilled'){
                setTimeout(() => {
                    callback(onResolved);
                });
            }
            if(this.PromiseState === 'rejected'){
                setTimeout(() => {
                    callback(onRejected);
                });
            }
            //判断 pending 状态
            if(this.PromiseState === 'pending'){
                //保存回调函数
                this.callbacks.push({
                    onResolved: function(){
                        callback(onResolved);
                    },
                    onRejected: function(){
                        callback(onRejected);
                    }
                });
            }
        })
    }

    //catch 方法
    catch(onRejected){
        return this.then(undefined, onRejected);
    }

    //添加 resolve 方法
    static resolve(value){
        //返回promise对象
        return new Promise((resolve, reject) => {
            if(value instanceof Promise){
                value.then(v=>{
                    resolve(v);
                }, r=>{
                    reject(r);
                })
            }else{
                //状态设置为成功
                resolve(value);
            }
        });
    }

    //添加 reject 方法
    static reject(reason){
        return new Promise((resolve, reject)=>{
            reject(reason);
        });
    }

    //添加 all 方法
    static all(promises){
        //返回结果为promise对象
        return new Promise((resolve, reject) => {
            //声明变量
            let count = 0;
            let arr = [];
            //遍历
            for(let i=0;i<promises.length;i++){
                //
                promises[i].then(v => {
                    //得知对象的状态是成功
                    //每个promise对象 都成功
                    count++;
                    //将当前promise对象成功的结果 存入到数组中
                    arr[i] = v;
                    //判断
                    if(count === promises.length){
                        //修改状态
                        resolve(arr);
                    }
                }, r => {
                    reject(r);
                });
            }
        });
    }

    //添加 race 方法
    static race (promises){
        return new Promise((resolve, reject) => {
            for(let i=0;i<promises.length;i++){
                promises[i].then(v => {
                    //修改返回对象的状态为 『成功』
                    resolve(v);
                },r=>{
                    //修改返回对象的状态为 『失败』
                    reject(r);
                })
            }
        });
    }
}   
```

## 4、async 和 await

MDN：[async](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 
			[await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

### 4.1、async 函数

async 函数的返回值是一个 Promise 对象
返回的 promise 对象的结果由 async 函数执行的返回值决定

```html
<script>
    //返回值类型类似于 then 函数
    async function main(){
        //1. 如果返回值是一个非Promise类型的数据
        // return 521; //返回成功的promise对象，结果值为521
        //2. 如果返回的是一个Promise对象
        // return new Promise((resolve, reject) => {
        //     // resolve('OK');
        //     reject('Error');
        // });
        //3. 抛出异常
        throw "Oh NO"; //返回失败的promise对象，结果值为Oh NO
    }

    let result = main();
    console.log(result);
</script>
```

### 4.2、await 表达式

**await 右侧** 的表达式一般为 **promise 对象**, 但也可以是其它的值  
如果表达式是 promise 对象, await 返回的是 promise 成功的值  
如果表达式是其它值, 直接将此值作为 await 的返回值  

> 注：**await 必须写在 async 函数中**，但 async 函数中可以没有 await
> 		如果表达式是其它值, 直接将此值作为 await 的返回值  

```html
<script>
    async function main(){
        let p = new Promise((resolve, reject) => {
            // resolve('OK');
            reject('Error');
        })
        //1. 右侧为成功的promise的情况
        // let res = await p; // res 为 OK
        //2. 右侧为其他类型的数据
        // let res2 = await 20;
        //3. 如果promise是失败的状态 //抛出异常，通过try-catch解决
        try{
            let res3 = await p;
        }catch(e){
            console.log(e);
        }
    }
    main();
</script>
```

### 4.3、使用案例

#### 读取三个文件的内容

```js
const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);

//回调函数的方式
// fs.readFile('./resource/1.html', (err, data1) => {
//     if(err) throw err;
//     fs.readFile('./resource/2.html', (err, data2) => {
//         if(err) throw err;
//         fs.readFile('./resource/3.html', (err, data3) => {
//             if(err) throw err;
//             console.log(data1 + data2 + data3);
//         });
//     });
// });

//async 与 await
async function main(){
    try{
        //读取第一个文件的内容
        let data1 = await mineReadFile('./resource/1x.html');
        let data2 = await mineReadFile('./resource/2.html');
        let data3 = await mineReadFile('./resource/3.html');
        console.log(data1 + data2 + data3);
    }catch(e){
        console.log(e.code);
    }
}

main();
```

#### async + await 发送 Ajax 请求

```html
<script>
    function sendAJAX(url){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("GET", url);
            xhr.send();
            //处理结果
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    //判断成功
                    if(xhr.status >= 200 && xhr.status < 300){
                        //成功的结果
                        resolve(xhr.response);
                    }else{
                        reject(xhr.status);
                    }
                }
            }
        });
    }

    //接口地址 https://api.apiopen.top/getJoke
    let btn = document.querySelector('#btn');

    btn.addEventListener('click',async function(){
        //获取信息
        let duanzi = await sendAJAX('https://api.apiopen.top/getJoke');
        console.log(duanzi);
    });
</script>
```

