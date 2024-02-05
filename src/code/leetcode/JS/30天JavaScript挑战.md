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



