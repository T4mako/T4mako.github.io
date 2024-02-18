---
date: 2024-02-05
category: 
  - JS
---
# leetcode 30 天 JS 挑战

https://leetcode.cn/studyplan/30-days-of-javascript/

## 闭包

### 2667. 创建 Hello World 函数

```js
var createHelloWorld = function() {
    
    return function(...args) {
        return 'Hello World'
    }
};
```

### 2620. 计数器

```js
var createCounter = function(n) {
    return function() {
        return n++;
    };
};
```

### 2704. 相等还是不相等

```js
var expect = function(val) {
    return {
        toBe: function toBe(i){
            if(i === val){
                return true;
            } else{
                throw 'Not Equal';
            }
        },
        notToBe: function notToBe(i){
            if(i !== val){
                return true
            }else{
                throw "Equal"
            }
        }
    }
    
};
```

### 2665. 计数器

```js
var createCounter = function(init) {
    let record = init;
    return {
        increment(){
            return ++init;
        },
        decrement(){
            return --init;
        },
        reset(){
            init = record;
            return init;
        }
    }
};
```

## 基本数组转换

### 2635. 转换数组中的每个元素

```js
var map = function(arr, fn) {
    let res = []
    for(let i = 0;i < arr.length;i++){
        res.push(fn(arr[i],i))
    }
    return res
};
```

### 2634. 过滤数组中的元素

```js
var filter = function(arr, fn) {
    let res = []
    for(i = 0;i < arr.length;i++){
        if(fn(arr[i],i)){
            res.push(arr[i])
        }
    }
    return res;
};
```

### 2626. 数组归约运算

```js
var reduce = function(nums, fn, init) {
    for(i = 0;i < nums.length;i++){
        init = fn(init,nums[i])
    }
    return init;
};
```

## 函数转换

### 2629. 复合函数

```js
var compose = function(functions) {
	return function(x) {
        for(i = functions.length - 1;i >= 0;i--){
            let f = functions[i];
            x = f(x)
        }
        return x
    }
};
```

### 2703. 返回传递的参数的长度

```js
var argumentsLength = function(...args) {
    let res = 0
    for( i in args){
        res++;
    }
    return res;
};
```

### 2666. 只允许一次函数调用

```js
var once = function(fn) {
    let count = 0;
    return function(...args){
        if(count < 1){
            count++;
            return fn(...args)
        }
        return undefined
    }
};
```

### 2623. 记忆函数

```js
function memoize(fn) {
  const cache = {};
  return function() {
    // 将参数转换为字符串
    let key = '';
    for (const arg of arguments) {
      key += ',' + arg;
    }

    if (key in cache) {
      return cache[key];
    }
    const functionOutput = fn(...arguments);
    cache[key] = functionOutput;
    return functionOutput;
  }
}
```

## Promise 和 Time

### 2723. 两个 Promise 对象相加

```js
var addTwoPromises = async function(promise1, promise2) {
    return await Promise.all([promise1, promise2]).then(([a, b]) => a + b)
};
```

### 2621. 睡眠函数

```js
async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis))  
}
```

### 2715. 执行可取消的延迟函数

```js
var cancellable = function(fn, args, t) {
    let timer = setTimeout(() => fn(...args), t)
    return () => {
        clearTimeout(timer)
    }
};
```

### 2725. 间隔取消

```js
var cancellable = function(fn, args, t) {
    fn(...args);
    
    const timer = setInterval(fn, t, ...args);
    
    return () => clearInterval(timer);
};
```