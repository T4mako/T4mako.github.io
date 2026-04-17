---
order: 3
icon: vue
category: 
    - Vue
tag: 
    - Vue CLI
    - Vue
---
# Vue 脚手架

[Vue 脚手架](https://cli.vuejs.org/zh/  ) 是 Vue 官方提供的标准化开发工具（开发平台）

Vue 脚手架：Vue CLI (command line interface)

全局安装 @vue/cli  ：

```shell
npm install -g @vue/cli
```

## 1.1、初始化脚手架

① 切换到你要创建项目的目录，然后使用命令创建项目  

```shell
vue create xxxx
```

② 启动项目  

使用 npm 或 yarn

```shell
npm run serve
```

**创建Vue组件的快捷方式：`<v 回车` 快速搭建结构**

## 1.2、vue.js 与 vue.runtime.xxx.js

关于不同版本的Vue：

1.vue.js与vue.runtime.xxx.js的区别：
	(1).vue.js是完整版的Vue，包含：核心功能+模板解析器。
	(2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用 template 配置项，需要使用 **render函数** 接收到的 createElement 函数去指定具体内容。

```js
//创建Vue实例对象---vm
new Vue({
	el:'#app',
	//render函数完成了这个功能：将App组件放入容器中
  	render: h => h(App),
	// render:q=> q('h1','你好啊')

	// template:`<h1>你好啊</h1>`,
	// components:{App},
})
```

## 1.3、vue.config.js 配置文件

> 注：Vue 脚手架隐藏了所有 webpack 相关的配置，若想查看具体的 webpack 配置：
>
> ```
> vue inspect > output.js
> ```
>
> 

配置文件：项目文件夹下 **vue.config.js**

通过 vue.config.js 配置文件个性化定制：https://cli.vuejs.org/zh/guide/

[禁用语法检查配置](https://cli.vuejs.org/zh/config/#lintonsave)：

```js
lintOnSave: process.env.NODE_ENV !== 'production'
```

## 1.4、ref 属性

1. 被用来给 **元素** 或 **子组件** 注册引用信息（`id的替代者`）**获取 dom 或 vc**
2. 应用在 html 标签上获取的是 **真实DOM** 元素，应用在 组件标签 上是组件实例对象（**vc**）
3. 使用方式：
    1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
    2. 获取：```this.$refs.xxx```

```vue
<template>
    <h1 v-text="msg" ref="title"></h1>
	<button ref="btn" @click="showDOM">输出上方的DOM元素</button>
</template>

<script>
	//引入School组件
	import School from './components/School'

	export default {
		name:'App',
		components:{School},
		data() {
			return {
				msg:'欢迎学习Vue！'
			}
		},
		methods: {
			showDOM(){
				console.log(this.$refs.title) //真实DOM元素
				console.log(this.$refs.btn) //真实DOM元素
				console.log(this.$refs.sch) //School组件的实例对象（vc）
			}
		},
	}
</script>
```

## 1.5、props 配置项

1. 功能：让 **组件** **接收** 外部传过来的 **数据**

2. 传递数据：通过**组件传递数据** `<Student name="李四" sex="女" :age="18"/>`

3. 接收数据：

    1. 第一种方式（只接收）：```props:['name'] ```

    2. 第二种方式（限制类型）：```props:{name:String}```

    3. 第三种方式（限制类型、限制必要性、指定默认值）：

        ```js
        props:{
         name:{
         type:String, //类型
         required:true, //必要性
         default:'D' //默认值
         }
        }
        ```
        
        关于 **[$attrs](https://cn.vuejs.org/api/component-instance.html#attrs)**：父组件传递的数据会先 挂载 在 **$attrs** 对象上，如果子组件用 props 接收，接收到的数据在 $attrs 上删除
    
    > 备注：**props 是只读的**，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

案例：

App.vue:

```vue
<template>
	<div>
        <!-- : v-bind, 双引号中解析为js表达式 -->
        <!-- 没有: 就是字符串 -->
		<Student name="李四" sex="女" :age="18"/>
	</div>
</template>

<script>
	import Student from './components/Student'

	export default {
		name:'App',
		components:{Student}
	}
</script>
```

Student.vue:

```vue
<template>
	<div>
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<h2>学生年龄：{{myAge+1}}</h2>
		<button @click="updateAge">修改年龄</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			return {
				myAge:this.age
			}
		},
		methods: {
			updateAge(){
				this.myAge++
			}
		},
		//简单声明接收
		// props:['name','age','sex'] 

		//接收的同时对数据进行类型限制
		/* props:{
			name:String,
			age:Number,
			sex:String
		} */

		//接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
		props:{
			name:{
				type:String, //name的类型是字符串
				required:true, //name是必要的
			},
			age:{
				type:Number,
				default:99 //默认值
			},
			sex:{
				type:String,
				required:true
			}
		}
	}
</script>
```

## 1.6、mixin（混入） 配置项

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

   第一步定义混合（创建混合文件）：

   ```js
   {
       data(){....},
       methods:{....}
       ....
   }
   ```

   第二步使用混入：

   ​	全局混入：```Vue.mixin(xxx)```

   ​	局部混入：```mixins:['xxx']  ```

案例：

① 创建混入文件 mixin.js

```js
export const hunhe = {
	methods: {
		showName(){
			alert(this.name)
		}
	},
	mounted() {
		console.log('你好！')
	},
}
export const hunhe2 = {
	data() {
		return {
			x:100,
			y:200
		}
	},
}
```

② 局部混入

在对应组件中 import 并添加 mixins 配置项

```vue
<template>
	<div>
		<h2 @click="showName">学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
	</div>
</template>

<script>
	//引入 hunhe，hunhe2
	import {hunhe,hunhe2} from '../mixin'

	export default {
		name:'School',
		data() {
			return {
				name:'尚硅谷',
				address:'北京',
				x:666
			}
		},
		mixins:[hunhe,hunhe2],
	}
</script>
```

③ 全局混入

在 main.js 中添加混入语句 import 并添加 Vue.mixin() 语句

main.js：

```js
import Vue from 'vue'
import App from './App.vue'

// 引入
import {hunhe,hunhe2} from './mixin'

Vue.config.productionTip = false

// 混入
Vue.mixin(hunhe)
Vue.mixin(hunhe2)

// 全局混入
new Vue({
	el:'#app',
	render: h => h(App)
})
```

## 1.7、Vue 插件

1. 功能：用于**增强Vue**

2. 本质：包含 **install()** 方法的 **一个对象**，install 的 **第一个参数是Vue**，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

    ```js
    对象.install = function (Vue, options) {
        // 1. 添加全局过滤器
        Vue.filter(....)
    
        // 2. 添加全局指令
        Vue.directive(....)
    
        // 3. 配置全局混入(合)
        Vue.mixin(....)
    
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function () {...}
        Vue.prototype.$myProperty = xxxx
    }
    ```

4. 使用插件：在main.js 中 import 并使用  **`Vue.use()`**

示例：

```js
// 创建插件文件 plugins.js
export default {
	install(Vue,x,y,z){
		//全局过滤器
		Vue.filter(...)

		//定义全局指令
		Vue.directive(...)

		//定义混入
		Vue.mixin(...)
	}
}
```

在 main.js 中引入

```js
import Vue from 'vue'
import App from './App.vue'
//引入插件
import plugins from './plugins'

Vue.config.productionTip = false

//应用（使用）插件
Vue.use(plugins,1,2,3)

new Vue({
	el:'#app',
	render: h => h(App)
})
```

## 1.8、scoped 样式

组件中的 css 样式最后都会汇总到一起，为了防止 css 冲突，可以使用 scoped 避免冲突

写法：`<style scoped>`

```css
<style scoped>
	.title{
		color: red;
	}
</style>
```

## 1.9、组件化编码流程

1、实现静态组件：抽取组件，使用组件实现静态页面效果，命名不要与html元素冲突

2、展示动态数据：
	考虑 数据的类型，名称
	考虑 数据保存在哪个组件：
		① 一个组件在用：放在组件自身即可
		② 一些组件在用：放在他们共同的父组件上（状态提升）

3、交互 - 从绑定事件监听开始

> 注：
> 1、props适用于：
>
>    (1) 父组件 ==> 子组件 通信
>
>    (2) 子组件 ==> 父组件 通信（要求父先给子一个函数）
>
> 2、使用 **v-model** 时要切记：**v-model 绑定的值不能是 props 传过来的值**，因为 props 是 不可以修改（**只读**） 的
>
> 3、props 传过来的若是对象类型的值，修改对象中的属性时 Vue 不会报错，但不推荐这样做。

## 1.10、本地存储

**webStorage**

1. 存储内容大小一般支持 5MB 左右

2. 浏览器端通过 Window.**sessionStorage** 和 Window.**localStorage** 属性来实现本地存储机制。

3. 相关API：

    1. ```xxxxxStorage.setItem('key', 'value');```
                  该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

    2. ```xxxxxStorage.getItem('key');```

          ​    该方法接受一个键名作为参数，返回键名对应的值。

    3. ```xxxxxStorage.removeItem('key');```

          ​    该方法接受一个键名作为参数，并把该键名从存储中删除。

    4. ``` xxxxxStorage.clear()```

          ​    该方法会清空存储中的所有数据。

4. 备注：

    1. **SessionStorage** 存储的内容会随着 **浏览器窗口关闭而消失**。
    2. **LocalStorage** 存储的内容，需要 **手动清除** 才会消失。
    3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
    4. ```JSON.parse(null)```的结果依然是null。

## 1.11、组件自定义事件

1. 一种组件间通信的方式，适用于：**子组件 ===> 父组件 通信**

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（**事件的回调在父组件中**）。

3. 绑定自定义事件：

    1. 第一种方式，在父组件中：```<Demo @t4mako="test"/>```  或 ```<Demo v-on:t4mako="test"/>```

    2. 第二种方式，在父组件中：

        ```js
        <Demo ref="demo"/>
        ......
        mounted(){
           this.$refs.xxx.$on('t4mako',this.test)
        }
        ```

    3. 若想让自定义事件只能触发一次，可以使用 `once` 修饰符，或 `$once` 方法。

4. 触发自定义事件： `this.$emit('t4mako',数据)`

   > **$emit()**：在当前组件触发一个自定义事件。任何额外的参数都会传递给事件监听器的回调函数。

5. 解绑自定义事件 `this.$off('t4mako')`
6. 组件上也可以绑定原生DOM事件，需要使用 `native` 修饰符。
7. 注意：通过```this.$refs.xxx.$on('t4mako',回调)```绑定自定义事件时，**回调** 要么 **配置在methods中** ，要么 **用箭头函数**，否则 this 指向会出问题！

### 案例：

App.vue：

```vue
<template>
	<div class="app">
		<!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
		<School :getSchoolName="getSchoolName"/>

		<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据 -->
        <!-- 方法①：使用 @ 或 v-on -->
		<Student @t4mako="getStudentName" @demo="m1"/>

		<!-- 方法②：使用 ref -->
		<Student ref="student" @click.native="show"/> <!-- native 属性，原生事件 -->
	</div>
</template>

<script>
	import Student from './components/Student'
	import School from './components/School'
	export default {
		name:'App',
		components:{School,Student},
		data() {
		},
		methods: {
            // 父组件 给 子组件 传递 函数
			getSchoolName(name){
				console.log('App收到了学校名：',name)
			},
            // 自定义事件
			getStudentName(name,...params){
				console.log('App收到了学生名：',name,params)
				this.studentName = name
			},
			m1(){
				console.log('demo事件被触发了！')
			},
			show(){
				alert(123)
			}
		},
		mounted() {

			//绑定自定义事件
         	this.$refs.student.$on('t4mako2',this.getStudentName) 
			//绑定自定义事件（一次性）
            this.$refs.student.$once('t4mako3',this.getStudentName) 
		},
	}
</script>
<style scoped>
</style>
```

School.vue：

```vue
<template>
	<div class="school">
		<button @click="sendSchoolName">把学校名给App</button>
	</div>
</template>

<script>
	export default {
		name:'School',
        // 函数传递
		props:['getSchoolName'],
		data() {
		},
		methods: {
			sendSchoolName(){
				this.getSchoolName(this.name)
			}
		},
	}
</script>
```

Student.vue：

```vue
<template>
	<div class="student">
		<button @click="add">点我number++</button>
		<button @click="sendStudentlName">把学生名给App</button>
		<button @click="unbind">解绑t4mako事件</button>
		<button @click="death">销毁当前Student组件的实例(vc)</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
		},
		methods: {
			add(){
				console.log('add回调被调用了')
				this.number++
			},
			sendStudentlName(){
				//触发 事件
				this.$emit('t4mako',this.name,666,888,900)
				// this.$emit('demo')
				// this.$emit('click')
			},
			unbind(){
				this.$off('t4mako') //解绑一个自定义事件
				// this.$off(['t4mako','demo']) //解绑多个自定义事件
				// this.$off() //解绑所有的自定义事件
			},
			death(){
				this.$destroy() //销毁了当前Student组件的实例，销毁后所有Student实例的自定义事件全都不奏效。
			}
		},
	}
</script>
```

## 1.12、全局事件总线

1. 一种组件间通信的方式，适用于 **任意组件间通信** 。

2. 安装全局事件总线：**`$bus就是当前应用的vm`**

   ```js
   new Vue({
      ......
      beforeCreate() {
         Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm（this）
      },
       ......
   }) 
   ```

3. 使用事件总线：

   1. **接收** 数据：A组件想 **接收数据**，则在A组件中给 $bus 绑定自定义事件，事件的 **回调留在A组件自身。**

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
          // 通过 $on 绑定的方法要么在 methods 中，要么用箭头函数
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在 **beforeDestroy** 钩子中，用 **$off** 去解绑 **当前组件所用到的** 事件。

**案例：**

① 在 **main.js** 中创建 vm ，安装全局事件总线

```js
//创建vm
new Vue({
    el:'#app',
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线
    },
})
```

② 在 School 组件中 绑定自定义事件

```vue
<template>
<div class="school">
    <h2>学校名称：{{name}}</h2>
    </div>
</template>

<script>
    export default {
        name:'School',
        data() {
            return {
                name:'李四',
            }
        },
        mounted() {
            // console.log('School',this)
            // 绑定自定义事件
            this.$bus.$on('hello',(data)=>{
                console.log('我是School组件，收到了数据',data)
            })
        },
        // 解绑事件
        beforeDestroy() {
            this.$bus.$off('hello')
        },
    }
</script>
```

③ 在 Studnert 组件中 触发事件

```vue
<template>
	<div class="student">
		<h2>学生姓名：{{name}}</h2>
		<button @click="sendStudentName">把学生名给School组件</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
			}
		},
		mounted() {
		},
		methods: {
			sendStudentName(){
                // 触发事件
				this.$bus.$emit('hello',this.name)
			}
		},
	}
</script>
```

## 1.13、消息订阅与发布（pubsub）

1.   一种组件间通信的方式，适用于 **任意组件间** 通信

2. 使用步骤：

   1. 安装pubsub：**```npm i pubsub-js```**

   2. 引入: **```import pubsub from 'pubsub-js'```**

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的 **回调留在A组件自身**

      ```js
      methods(){
        demo(_,data){......} // 第一个参数不用，可以用下划线 _ 占位
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：**```pubsub.publish('xxx',数据)```**

   5. 最好在 beforeDestroy 钩子中，用```PubSub.unsubscribe(pid)```去 **取消订阅**

案例：

Student：发布消息

```vue
<script>
    import pubsub from 'pubsub-js'
    export default {
        name:'Student',
        data(){
            return {
                name:'T4mako',
            }
        },
        props:['sex','salary'],
        methods: {
            sendStudentName(){
                // 发布消息 （发布名，数据）
                pubsub.publish('hello',this.name)
            }
        }
    }
</script>
```

School：订阅消息

```vue
<template>
	<div>
		<button @click="sendStudentName">click</button>
	</div>
</template>

<script>
	import pubsub from 'pubsub-js'
	export default {
		name:'School',
		data(){
			return {
				name:'T4mako',
		},
		methods: {
		},
		mounted() {
			// 使用箭头函数，让 this 指向 vc
			// 订阅消息 （订阅名，数据）
			pubsub.subscribe('hello',(_,data)=>{ // 第一个参数不用，可以用下划线 _ 占位
				console.log('sb subscribe',data);
			})
		},
	}
</script>
```

## 1.14、$nextTick()

1. 语法：**`this.$nextTick(回调函数)`**

2. 作用：在下一次 **DOM 更新结束后执行** 其指定的 **回调**。

3. 当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

举例：

```js
//编辑
handleEdit(todo){
    if(todo.hasOwnProperty('isEdit')){
        todo.isEdit = true
    }else{
        // console.log('@')
        this.$set(todo,'isEdit',true)
    }
    // 修改 isEdit 属性，数据更新后，执行回调，触发焦点事件
    this.$nextTick(function(){
        this.$refs.inputTitle.focus()
    })
}
```

## 1.15、动画效果

第三方样式库：
	[anime.css](https://animate.style/)

1. 作用：在 **插入、更新或移除 DOM元素** 时，在合适的时候给元素添加样式类名。

3. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用 **`<transition>`** 包裹要过度的元素，并配置name属性：

      ```vue
      <transition name="hello">
         <h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：**`<transition-group>`**，且每个元素都要指定 **`key`** 值。
   
      ```html
      <transition-group name="hello" appear>
          <h1 v-show="!isShow" key="1">你好啊！</h1>
          <h1 v-show="isShow" key="2">尚硅谷！</h1>
      </transition-group>
      ```
   
      

举例：

```vue
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<transition-group name="hello" appear>
			<h1 v-show="!isShow" key="1">你好啊！</h1>
			<h1 v-show="isShow" key="2">我不好！</h1>
		</transition-group>
	</div>
</template>

<script>
	export default {
		name:'Test',
		data() {
			return {
				isShow:true
			}
		},
	}
</script>

<style scoped>
	h1{
		background-color: orange;
	}
	/* 进入的起点、离开的终点 */
	.hello-enter,.hello-leave-to{
		transform: translateX(-100%);
	}
	.hello-enter-active,.hello-leave-active{
		transition: 0.5s linear;
	}
	/* 进入的终点、离开的起点 */
	.hello-enter-to,.hello-leave{
		transform: translateX(0);
	}
</style>
```

```vue
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<transition-group 
			appear
			name="animate__animated animate__bounce" 
			enter-active-class="animate__swing"
			leave-active-class="animate__backOutUp"
		>
			<h1 v-show="!isShow" key="1">你好啊！</h1>
			<h1 v-show="isShow" key="2">尚硅谷！</h1>
		</transition-group>
	</div>
</template>

<script>
	import 'animate.css'
	export default {
		name:'Test',
		data() {
			return {
				isShow:true
			}
		},
	}
</script>

<style scoped>
	h1{
		background-color: orange;
	}
</style>
```

