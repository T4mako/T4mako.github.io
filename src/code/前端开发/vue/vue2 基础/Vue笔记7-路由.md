---
order: 7
icon: vue
category: 
    - Vue
tag: 
    - vue router
    - Vue
---
# vue-router 路由

## 1.1、相关概念

### SPA

**vue-router** ：vue 的一个插件库，专门用来实现 SPA 应用 

> 对 **SPA** 应用的理解 :
>
> 1. **单页** Web 应用（**single page web application**，SPA）
> 2. 整个应用只有**一个完整的页面**
> 3. 点击页面中的 **导航链接** 不会刷新页面，只会做页面的 **局部更新**
> 4. 数据需要通过 **ajax** 请求获取。  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230519122533.png)

### 路由的理解

1. 一个 **路由** 就是一组 **映射关系**（key - value）
2. **key** 为 **路径**， **value** 可能是 **function** 或 **component**  

### 路由分类：

1. 后端路由：

   理解：value 是 function, 用于处理客户端提交的请求。
   工作过程：服务器接收到一个请求时, 根据请求路径找到匹配的函数来处理请求, 返回响应数据。

2. 前端路由：
   理解：value 是 component，用于展示页面内容。
   工作过程：当浏览器的路径改变时, 对应的组件就会显示。  

## 1.2、vue-router 基本使用

插件的安装：

```shell
npm i vue-router
```

> 注：vue-router 最新为4版本，只能在 vue3 中使用
> 	vue2 需使用 3 版本的 vue-router

1. 在 src 下 创建 **router 文件夹**，并创建 **index.js** 文件

   ```js
   // 该文件专门用于创建整个应用的路由器
   // 引入 VueRouter
   import VueRouter from 'vue-router'
   // 引入组件
   import About from '../components/About.vue'
   import Home from '../components/Home.vue'
   
   
   // 创建一个路由器
   export default new VueRouter({
       // 配置路由
       routes:[
           {
               path:'/about',
               component:About
           },
           {
               path:'/home',
               component:Home
           },
       ]
   }
   )
   ```

2. 修改 **main.js**

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   
   // 引入 VueRouter
   import VueRouter from 'vue-router'
   // 应用插件
   Vue.use(VueRouter)
   
   // 引入路由器
   // /router/index.js 可以简写，省略index.js
   import router from './router' 
   
   // 关闭 vue 的生产提示
   Vue.config.productionTip = false
   
   const vm = new Vue({
     el:'#app',
     // 渲染
     render: h => h(App),
     beforeCreate() {
       Vue.prototype.$bus = this //安装全局事件总线
     },
     // 增加路由配置项
     router:router
   }).$mount('#app')	
   ```

3. 切换导航栏（active-class可配置高亮样式）

   在对应组件中添加

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

4. 展示组件

   在对应组件中添加

   ```vue
   <router-view></router-view>
   ```

   

## 1.3、几个注意点

1. **路由组件** 通常存放在 **`pages`** 文件夹，**一般组件** 通常存放在 **`components`** 文件夹。

2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。

3. 每个 **组件** 都有 **自己的** **`$route`** 属性，里面存储着 **自己的路由信息**。

4. 整个应用只有 **一个router**，可以通过组件的 **`$router`** 属性获取到。

（注意 route 和 router 的区别）

## 1.4、多级（嵌套）路由

1. 在 router/index.js 中配置路由规则

   使用 **children** 配置项：

   ```js
   routes:[
      {
         path:'/about',
         component:About,
      },
      {
          // 第一级需要加 '/'
         path:'/home',
         component:Home,
         children:[ //通过 children 配置子级路由
            {
                //此处一定不要写：/news
               path:'news', 
               component:News
            },
            {
                //此处一定不要写：/message
               path:'message',
               component:Message
            }
         ]
      }
   ]
   ```
   以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径

2. 跳转（要写完整路径）：

   在对应组件中添加

   ```vue
   <!-- 注意些完整路径，不要加. -->
   <router-link to="/home/news">News</router-link>
   ```

3. 展示组件

   在对应组件中添加

   ```vue
   <router-view></router-view>
   ```

## 1.5、路由传参

### 1.5.1、query 参数

1. ​	传递参数

   通过 router-link 向 指定组件 传递数据 

   ① query参数 字符串写法

   ② query参数 对象写法

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
               
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
      :to="{
         path:'/home/message/detail',
         query:{
            id:666,
               title:'你好'
         }
      }"
   >跳转</router-link>
   ```

2. 接收参数：

   在 接受组件中 通过 **`$route.query.xxx`** 接受参数

   ```js
   $route.query.id
   $route.query.title
   ```

### 1.5.2、params 参数

1. **配置路由**，**声明接收 params 参数**

   在 **index.js** 中提供配置，使用占位符声明接收 params 参数

   ```js
   {
      path:'/home',
      component:Home,
      children:[
         {
            path:'news',
            component:News
         },
         {
            component:Message,
            children:[
               {
                  name:'xiangqing',
                  path:'detail/:id/:title', //使用占位符声明接收params参数
                  component:Detail
               }
            ]
         }
      ]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link>
               
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link :to="{
           name: 'detail',
           params: {
               id: m.id,
               title: m.title
           }
   }">{{m.title}}</router-link>
   ```

   > 特别注意：路由携带 params 参数时，若使用 to 的 **对象写法**，则不能使用path配置项，**必须使用name配置**！

3. 接收参数：

   通过 params 接收参数

   ```js
   $route.params.id
   $route.params.title
   ```

## 1.6、路由命名

1. 作用：可以简化路由的跳转

2. 使用方式：

   1. 给路由命名：

      ```js
      // 创建一个路由器
      export default new VueRouter({
          routes:[
              // 一级路由
              {
                  path:'/about',
                  component:About
              },
              {
                  path:'/home',
                  component:Home,
                  children:[
                      {
                          path:'news',
                          component:News
                      },
                      {
                          path:'message',
                          component:Message,
                          children:[
                              { // 带 命名 的 路由
                                  name:'detail',
                                  path:'detail',
                                  component:Detail,
                              }
                          ]
                      }
                  ]
              },
          ]
      }
      )
      ```
   
   2. 简化跳转：
   
      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
         :to="{
            name:'hello',
            query:{
               id:666,
                  title:'你好'
            }
         }"
      >跳转</router-link>
      ```

## 1.7、路由的 props 配置

  作用：让路由组件更方便的收到参数

发送参数：在 index.js 中配置 **props** 配置项

```js
{
	name:'detail',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

接收参数：在 接收参数的组件 用 props 配置项接收

```vue
<script>
	export default {
		name:'Detail',
		props:['id','title'], //接收
		computed: {
			// id(){
			// 	return this.$route.query.id
			// },
			// title(){
			// 	return this.$route.query.title
			// },
		},
		mounted() {
			// console.log(this.$route)
		},
	}
</script>
```

## 1.8、router-link 的 replace 属性

1. 作用：控制路由跳转时操作 **浏览器历史记录** 的模式

2. 浏览器的历史记录有两种写入方式：分别为 **`push`** 和 **`replace`**
   ```push```是**追加**历史记录 （可回退）
   ```replace```是**替换**当前记录 （不可回退）
   路由跳转时候 **默认为`push`**

3. 如何 **开启```replace```** 模式：**```<router-link replace .......>News</router-link>```**

## 1.9、编程式路由导航（$router）

不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

具体编码：
`this.$router.push`：push 方式路由
`this.$router.replace`：replace 方式路由
`this.$router.forward()` /：前进
`this.$router.back()` ：后退
`this.$router.go()` ：可前进也可后退（正负数控制）

```js
//$router的两个API
this.$router.push({
    name:'xiangqing',
    params:{
        id:xxx,
        title:xxx
    }
})

this.$router.replace({
    name:'xiangqing',
    params:{
        id:xxx,
        title:xxx
    }
})
this.$router.forward() //前进
this.$router.back() //后退
this.$router.go() //可前进也可后退
```

案例：

```vue
<template>
	<div>
		<ul>
			<li v-for="m in messageList" :key="m.id">
               <!-- 通过按钮的点击事件完成路由，通过方法传递参数m --> 
				<button @click="pushShow(m)">push查看</button>
				<button @click="replaceShow(m)">replace查看</button>
			</li>
		</ul>
		<hr>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name:'Message',
		data() {
			return {
				messageList:[
					{id:'001',title:'消息001'},
					{id:'002',title:'消息002'},
					{id:'003',title:'消息003'}
				]
			}
		},
		methods: {
            // 路由实现
			pushShow(m){
				this.$router.push({
					name:'xiangqing',
					query:{
						id:m.id,
						title:m.title
					}
				})
			},
			replaceShow(m){
				this.$router.replace({
					name:'xiangqing',
					query:{
						id:m.id,
						title:m.title
					}
				})
			}
		},
	}
</script>
```

## 1.10、缓存路由组件

作用：让不展示的路由组件保持挂载，不被销毁。

具体编码：
在 **router-view 外** 添加 keep-alive
不写 include 代表 router-view 中所有组件
写 include 指定 **组件名** 

```vue
<!-- include 中为组件名 -->
<!-- 多个组件： :include="['News','Messages']" -->
<keep-alive include="News"> 
    <router-view></router-view>
</keep-alive>
```

## 1.11、新生命周期 activated、deactivated

路由组件所独有的两个钩子，用于捕获路由组件的激活状态。

具体名字：

1. ```activated```路由组件被 **激活** 时触发。
2. ```deactivated```路由组件 **失活** 时触发

当缓存了路由组件后，有些方法等不想被缓存，可以使用这两个生命周期钩子

举例：

```vue
<script>
	export default {
		name:'News',
		data() {
			return {
				opacity:1
			}
		},
		/* beforeDestroy() {
			console.log('News组件即将被销毁了')
			clearInterval(this.timer)
		}, */
		/* mounted(){
			this.timer = setInterval(() => {
				console.log('@')
				this.opacity -= 0.01
				if(this.opacity <= 0) this.opacity = 1
			},16)
		}, */
		activated() {
			console.log('News组件被激活了')
			this.timer = setInterval(() => {
				console.log('@')
				this.opacity -= 0.01
				if(this.opacity <= 0) this.opacity = 1
			},16)
		},
		deactivated() {
			console.log('News组件失活了')
			clearInterval(this.timer)
		},
	}
</script>
```

## 1.12、路由守卫

作用：对路由进行权限控制
分类：分类：全局前置路由守卫、全局后置路由守卫、独享守卫、组件内守卫

### 1.12.1、全局路由守卫

全局路由守卫分为：① 全局前置路由守卫 ② 全局后置路由守卫

全局前置路由守卫：
	**初始化时执行、每次路由切换前执行**	
	方法：**`router.beforeEach(to,from,next)`**

全局后置路由守卫：
	**初始化的时候被调用、每次路由切换之后被调用**
	方法：**`router.afterEach(to,from)`**

在 **index.js** 中编写全局路由守卫：

```js
//创建并暴露一个路由器
const router =  new VueRouter({
	routes:[
        {
            name:'xinwen',
            path:'news',
            component:News,
            meta:{isAuth:true,title:'新闻'} // 配置 meta 中的数据
        },
    ]
})

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to,from,next)=>{
	console.log('前置路由守卫',to,from)
	if(to.meta.isAuth){ //判断是否需要鉴权
		if(localStorage.getItem('school')==='school A'){
			next() // 放行
		}else{
			alert('学校名不对，无权限查看！')
		}
	}else{
		next()
	}
})

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to,from)=>{
	console.log('后置路由守卫',to,from)
	document.title = to.meta.title || 'system'
})

export default router
```

### 1.12.2、独享守卫

独享守卫在 index.js 给单独的路由配置，注：独享路由守卫只有前置守卫

函数：**beforeEnter: (to, from, next) => {}**

```js
//创建并暴露一个路由器
const router =  new VueRouter({
	routes:[
		{
			name:'zhuye',
			path:'/home',
			component:Home,
			meta:{title:'主页'},
			children:[
				{
					name:'xinwen',
					path:'news',
					component:News,
					meta:{isAuth:true,title:'新闻'},// 配置 meta 数据
                    // 独享路由守卫
					beforeEnter: (to, from, next) => {
						console.log('独享路由守卫',to,from)
						if(to.meta.isAuth){ //判断是否需要鉴权
							if(localStorage.getItem('school')==='school a'){
								next()
							}else{
								alert('学校名不对，无权限查看！')
							}
						}else{
							next()
						}
					}
				},
			]
		}
	]
})

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to,from)=>{
	console.log('后置路由守卫',to,from)
	document.title = to.meta.title || '硅谷系统'
})

export default router
```

### 1.12.3、组件内守卫

组件内守卫写在 **组件的配置项** 中，对应函数的调用时机为 进入该组件和离开该组件时调用，区别于前后置路由守卫的执行时机

进入该组件时被调用：**beforeRouteEnter (to, from, next)**
离开该组件时被调用：**beforeRouteLeave (to, from, next)**

```js
//进入守卫：通过路由规则，进入该组件时被调用
beforeRouteEnter (to, from, next) {
},
    
//离开守卫：通过路由规则，离开该组件时被调用
beforeRouteLeave (to, from, next) {
}
```

举例：

```vue
<script>
	export default {
		name:'About',

		//通过路由规则，进入该组件时被调用
		beforeRouteEnter (to, from, next) {
			if(to.meta.isAuth){ //判断是否需要鉴权
				if(localStorage.getItem('school')==='school A'){
					next()
				}else{
					alert('学校名不对，无权限查看！')
				}
			}else{
				next()
			}
		},

		//通过路由规则，离开该组件时被调用
		beforeRouteLeave (to, from, next) {
			console.log('About--beforeRouteLeave',to,from)
			next()
		}
	}
</script>
```

## 1.13、路由器的两种工作模式

1. 对于一个url来说，# 及其后面的内容就是 hash 值。
2. hash值 **不会包含在 HTTP 请求中**，即：hash值不会带给服务器
3. hash模式：
   1. **地址中永远带着 # 号**，不美观 。
   2. 若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，**解决刷新页面服务端404的问题**

hash 模式与 history 模式的切换：在 **index.js** 中通过 **mode** 配置项配置

```js
const router =  new VueRouter({
	mode:'history',
	routes:[...]
})
```

前端项目的打包（最后都以 html，css，js 的文件呈现）

```shell
npm run build
yarn run build
```

