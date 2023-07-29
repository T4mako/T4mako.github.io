---
order: 4
icon: vue
category: 
    - Vue
tag: 
    - Vue
---
# Vue 中的 Ajax

## 1.1、Ajax 跨域问题  （代理服务器）

请求的发送：
	① ajax （xhr）
	② axios （对 xhr 的封装）
	③ fetch（window 对象自带的 fetch() 函数，不常用）
	④  vue-resource （对 xhr 的封装，用的不多）

解决 ajax 跨域问题的常用方法：
	① jsonp （几乎不用）
	② CORS （完全在服务器中进行，设置响应头 `Access-Control-Allow-Origin`）
	③ 配置代理服务器 （nginx 或 **借助 vue-cli `vue脚手架` 解决**）

**[使用代理服务器](https://cli.vuejs.org/zh/config/#devserver-proxy)**  

### 方法一

  在 **vue.config.js** 中添加如下配置：

```js
devServer: {
    proxy: 'http://localhost:5000'
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （**优先匹配前端资源**）

### 方法二

  编写 **vue.config.js** 配置具体代理规则：

```js
module.exports = {
   devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        pathRewrite: {'^/api1': ''}， // 配置路径重写，去掉 api 请求前缀
        changeOrigin: true, // 控制请求头中的 host值
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}

```

> 注:
>
>    changeOrigin 设置为 true 时，服务器收到的请求头中的 host 为：localhost:5000
>    changeOrigin设置为 false 时，服务器收到的请求头中的host为：localhost:8080
>    changeOrigin默认值为true

说明：

1. 优点：可以配置多个代理，且可以灵活的 **控制请求是否走代理**。
2. 缺点：配置略微繁琐，**请求资源时必须加前缀**。

### 示例

**vue.config.js 添加配置项**：

```js
devServer: {
    proxy: {
      '/api': { // 请求前缀，写前缀的走代理
        target: 'http://localhost:5000', //配置目标服务器
        pathRewrite:{'^/api':''}, // 配置路径重写，去掉 api 请求前缀
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的 host值 （true为:5000，false为:8080，默认为true）
      },
      '/test': { // 请求前缀，写前缀的走代理
        target: 'http://localhost:5001', //配置目标服务器
        pathRewrite:{'^/test':''}, // 配置路径重写，去掉 api 请求前缀
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的 host值 （true为:5000，false为:8080，默认为true）
      },
    }
  }
```

编写 **组件**：

```vue
<template>
	<div id="app">
        <button @click="getStu">获取学生信息</button>
        <button @click="getCar">获取汽车信息</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'App',
    components: {
    },
    data() {
    },
    methods: {
        getStu(){
            axios.get('http://localhost:8080/api/students').then(
                response => {
                    console.log('success',response.data);
                },
                error => {'failed',error}
            )
        },
        getCar(){
            axios.get('http://localhost:8080/test/cars').then(
                response => {
                    console.log('success',response.data);
                },
                error => {
                    console.log('failed',error);
                }
            )
        },
    }
}
</script>
```

## 1.2、vue-resource（了解）

安装：

```shell
npm i vue-resource
```

在 main.js 中引入

```js
import vueResource from 'vue-resource'
Vue.use(vue.Resource)
```

使用方法与 axios 相同，但官方已不再维护

