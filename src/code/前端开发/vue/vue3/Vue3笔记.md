---
icon: vue
date: 2023-05-20
category: 
    - Vue
tag: 
    - Vue
---
# Vue 3

## 1、创建Vue3工程
```shell
### 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
### 安装或者升级你的@vue/cli
npm install -g @vue/cli
```

### 1.1、使用 vue-cli 创建

[官方文档](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)

```shell
### 创建
vue create vue3_test
### 启动
cd vue3_test
npm run serve
```

### 1.2、使用 vite 创建

[官方文档](https://v3.cn.vuejs.org/guide/installation.html#vite)

vite官网：https://vitejs.cn

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230521142306.png)

```shell
### 创建工程
npm init vite-app <project-name>
### 进入工程目录
cd <project-name>
### 安装依赖
npm install
### 运行
npm run dev
```

### 1.3、简单介绍

#### 1.3.1、main.js

使用 vue-cil 创建项目

main.js 的内容：

```js
// 引入的不再是Vue构造函数，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象并挂载-app（类似于vue2中的vm，但app比vm更轻）
createApp(App).mount('#app')
```

#### 1.3.2、关闭语法检查

https://cli.vuejs.org/zh/config/#lintonsave

```js
lintOnSave: process.env.NODE_ENV !== 'production'
```

#### 1.3.3、Vue3 组件中的模板结构可以没有根标签

```vue
<template>
  <!-- Vue3 组件中的模板结构可以没有根标签 -->
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>
```

## 2、常用 Composition API

Composition API（组合式API `vue3`）对应 Options API（选项式API `vue2`）

### 2.1、setup

setup 执行的时机：在 beforeCreate 之前执行一次，this 是 undefined。

#### 2.1.1、setup 配置数据，方法

1. **setup**：Vue3中一个新 **配置项**，值为一个函数。
2. setup是所有 Composition API（组合API）的舞台。
3. 组件中所用到的 **数据、方法** 等，均 **配置在 setup** 中。
4. setup函数的两种返回值：
   1. 若 **返回一个对象**，则对象中的 **属性、方法**, 在模板中均可以 **直接使用**
   2. 若返回一个渲染函数：则可以自定义渲染内容。（了解）
5. 注意点：
   1. 尽量不要与 Vue2 配置混用
      - Vue2.x配置（data、methos、computed...）中 **可以访问到** setup 中的属性、方法。
      - 但在setup中 **不能访问到** Vue2.x配置（data、methos、computed...）
      - 如果有重名, **setup 优先**。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

```vue
<template>
	<h1>一个人的信息</h1>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>性别：{{sex}}</h2>
	<h2>a的值是：{{a}}</h2>
	<button @click="sayHello">说话(Vue3所配置的——sayHello)</button>
	<button @click="sayWelcome">说话(Vue2所配置的——sayWelcome)</button>
	<button @click="test1">在Vue2的配置中去读取Vue3中的数据、方法</button>
	<button @click="test2">在Vue3的setup配置中去读取Vue2中的数据、方法</button>

</template>

<script>
	// import {h} from 'vue'
	export default {
		name: 'App',
		data() {
			return {
				sex:'男',
				a:100
			}
		},
		methods: {
			sayWelcome(){
				alert('欢迎来到尚硅谷学习')
			},
			test1(){
				console.log(this.sex)
				console.log(this.name)
				console.log(this.age)
				console.log(this.sayHello)
			}
		},
		//此处只是测试一下setup，暂时不考虑响应式的问题。
		setup(){
			//数据
			let name = '张三'
			let age = 18
			let a = 200

			//方法
			function sayHello(){
				alert(`我叫${name}，我${age}岁了，你好啊！`)
			}
			function test2(){
				console.log(name)
				console.log(age)
				console.log(sayHello)
				console.log(this.sex)
				console.log(this.sayWelcome)
			}

			//返回一个对象（常用）
			return {
				name,
				age,
				sayHello,
				test2,
				a
			}

			//返回一个函数（渲染函数）
			// return ()=> h('h1','Test')
		}
	}
</script>
```

#### 2.1.2、setup 的参数

setup的参数

- **props**：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
- **context**：上下文对象
  - **attrs**: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
  - **slots**: 收到的插槽内容, 相当于 ```this.$slots```。
  - **emit**: 分发自定义事件的函数, 相当于 ```this.$emit```。

案例：

父组件 App.vue：

```vue
<template>
	<!-- 定义自定义事件，传递参数 -->
	<Demo @hello="showHelloMsg" msg="你好" school="USTS">
        <!-- 定义插槽 -->
		<template v-slot:qwe>
			<span>USTS</span>
		</template>
		<!-- 定义插槽 -->
		<template v-slot:asd>
			<span>USTS</span>
		</template>
	</Demo>
</template>

<script>
	import Demo from './components/Demo'
	export default {
		name: 'App',
		components:{Demo},
		setup(){
            // 触发自定义事件的回调
			function showHelloMsg(value){
				alert(`触发了hello事件，收到的参数是:${value}`)
			}
            // 返回定义的数据与函数
			return {
				showHelloMsg
			}
		}
	}
</script>
```

子组件 Demo.vue：

```vue
<template>
	<h1>信息</h1>
	<h2>姓名：{{person.name}}</h2>
	<h2>年龄：{{person.age}}</h2>
	<button @click="test">测试触发Demo组件的Hello事件</button>
</template>

<script>
    // 引入 reactice
	import {reactive} from 'vue'
	export default {
		name: 'Demo',
        // 接收数据
		props:['msg','school'],
        // 接收自定义事件
		emits:['hello'],
        // setup 的两个参数，props，context
		setup(props,context){
			console.log('---setup---',props)
			console.log('---setup---',context)
			console.log('---setup---',context.attrs) //相当与Vue2中的$attrs
			console.log('---setup---',context.emit) //触发自定义事件的。
			console.log('---setup---',context.slots) //插槽
			//数据
			let person = reactive({
				name:'张三',
				age:18
			})

			//方法
			function test(){
                // 触发自定义事件
				context.emit('hello',666)
			}

			//返回一个对象（常用）
			return {
				person,
				test
			}
		}
	}
</script>
```

### 2.2、ref 函数

作用: 定义一个 **响应式的数据**

导入：

```shell
import {ref} from 'vue'
```

语法: **`const xxx = ref(initValue)`**

- 创建一个包含响应式数据的 **引用对象**（reference对象，简称 **ref 对象**）。
- JS中操作数据： **`xxx.value`**
- **模板中** 读取数据: **不需要.value**，**直接**：**```<div>{{xxx}}</div>```**

> 注：
>
> - 接收的数据可以是：基本类型、也可以是对象类型。
> - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
> - 对象类型的数据：ref 接收对象属性本质上是调用**`reactive`**函数。

```vue
<template>
	<h1>一个人的信息</h1>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h3>工作种类：{{job.type}}</h3>
	<h3>工作薪水：{{job.salary}}</h3>
	<button @click="changeInfo">修改人的信息</button>
</template>

<script>
    // 导入 ref
	import {ref} from 'vue'
	export default {
		name: 'App',
		setup(){
			//数据
			let name = ref('张三')
			let age = ref(18)
			let job = ref({
				type:'java',
				salary:'30'
			})
			//方法
			function changeInfo(){
				name.value = '李四'
				age.value = 48
				// console.log(job.value)
				job.value.type = 'vue'
				job.value.salary = '20'
				// console.log(name,age)
			}

			//返回一个对象（常用）
			return {
				name,
				age,
				job,
				changeInfo
			}
		}
	}
</script>
```

### 2.3、reactive 函数

- 作用: 定义一个 **对象类型** 的响应式数据（基本类型不要用它，要用```ref```函数）
- 语法： **```const 代理对象= reactive(源对象)```** 接收一个对象（或数组），返回一个 代理对象（Proxy的实例对象，简称 **proxy对象**
- reactive 定义的响应式数据是“**深层次的**”。
- 内部基于 ES6 的 Proxy 实现，通过 **代理对象操作** 源对象内部数据进行操作。

```vue
<template>
    <h2>{{ name }}</h2>
    <h2>{{ age }}</h2>
    <h2>{{ hobbies }}</h2>
    <h2>{{ hobbies[0] }}</h2>
    <button @click="sayHello">click</button>
</template>

<script lang="js">
    import {ref,reactive} from 'vue'
    export default {
        name:'Test3',
        setup(){
            let name = ref('张三')
            let age = ref(18)
            // reactive 只能处理对象或数组
            let number = reactive({
                type: 'A',
                salary: 50000,
            })
            let hobbies = reactive(['play','game','love'])
            function sayHello() {
                console.log(name.value);
                console.log((number.type));
                console.log((number.salary));
                // 修改值并通过Proxy响应式修改
                hobbies[0] = 't4mako'
            }
            // 返回一个对象
            return {
                name:name,
                age,
                sayHello,
                hobbies
            }
        }
    }
</script>
```

> reactive对比ref:
>
> -  从定义数据角度对比：
>    -  **ref** 定义： **基本类型数据。**
>    -  **reactive** 定义：**对象（或数组）类型数据**。
>    -  备注：ref也可以用来定义 对象（或数组）类型数据 , 它内部会自动通过```reactive```转为 代理对象。
> -  从原理角度：对比
>    -  ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
>    -  reactive通过使用 **Proxy** 来实现响应式（数据劫持）, 并通过 **Reflect** 操作 **源对象** 内部的数据。
> -  从使用角度对比：
>    -  ref 定义的数据：操作数据需要 `.value`，读取数据时模板中直接读取不需要。
>    -  reactive 定义的数据：操作数据与读取数据：均不需要```.value```。

### 2.4、Vue 3 响应式原理

#### vue2.x的响应式

- 实现原理：

  - 对象类型：通过 **`Object.defineProperty()`** 对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：

  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

#### Vue3.0的响应式

- 实现原理: 

  - 通过 **Proxy**（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。

  - 通过 **Reflect**（反射）:  对源对象的属性进行操作。

  - MDN文档中描述的Proxy与Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

      ```js
      new Proxy(data, {
      	// 拦截读取属性值
          get (target, prop) {
          	return Reflect.get(target, prop)
          },
          // 拦截设置属性值或添加新属性
          set (target, prop, value) {
          	return Reflect.set(target, prop, value)
          },
          // 拦截删除属性
          deleteProperty (target, prop) {
          	return Reflect.deleteProperty(target, prop)
          }
      })
      proxy.name = 'tom'   
      ```

### 2.5、computed 计算属性

与 Vue2 中 computed 配置功能一致

写法：

```js
import {computed} from 'vue'

setup(){
    ...
	//计算属性——简写
    let fullName = computed(()=>{
        return person.firstName + '-' + person.lastName
    })
    //计算属性——完整
    let fullName = computed({
        get(){
            return person.firstName + '-' + person.lastName
        },
        set(value){
            const nameArr = value.split('-')
            person.firstName = nameArr[0]
            person.lastName = nameArr[1]
        }
    })
}
```

### 2.6、watch 函数

watch 的导入：

```js
import {watch} from 'vue'
```

与Vue2.x中watch配置功能一致，但有以下注意点：

- 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
- 监视reactive定义的响应式数据中某个属性时：deep配置有效。

```vue
<script>
	import {ref,reactive,watch} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let msg = ref('你好啊')
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})
            
			//情况一：监视ref所定义的一个响应式数据
			watch(sum,(newValue,oldValue)=>{
				console.log('sum变了',newValue,oldValue)
			},{immediate:true})

			//情况二：监视ref所定义的多个响应式数据
			watch([sum,msg],(newValue,oldValue)=>{
				console.log('sum或msg变了',newValue,oldValue)
			},{immediate:true})

			/* 
				情况三：监视reactive所定义的一个响应式数据的全部属性
						1.注意：此处无法正确的获取oldValue
						2.注意：强制开启了深度监视（deep配置无效）
			*/
			watch(person,(newValue,oldValue)=>{
				console.log('person变化了',newValue,oldValue)
			},{deep:false}) //此处的deep配置无效

			//情况四：监视reactive所定义的一个响应式数据中的某个属性
			watch(()=>person.name,(newValue,oldValue)=>{
				console.log('person的name变化了',newValue,oldValue)
			})

			//情况五：监视reactive所定义的一个响应式数据中的某些属性
			watch([()=>person.name,()=>person.age],(newValue,oldValue)=>{
				console.log('person的name或age变化了',newValue,oldValue)
			})

			//特殊情况
			atch(()=>person.job,(newValue,oldValue)=>{
				console.log('person的job变化了',newValue,oldValue)
			},{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效

			//返回一个对象（常用）
			return {
				sum,
				msg,
				person
			}
		}
	}
</script>
```

### 2.7、watchEffect 函数

watch：既要指明监视的属性，也要指明监视的回调。
watchEffect ：不用指明监视哪个属性，**监视的回调中用到哪个属性，那就监视哪个属性**

watchEffect有点像computed：

- 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
- 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

watchEffect 的导入：

```js
import {watchEffect} from 'vue'
```

watchEffect 的使用方式：

```js
// 在setup() 中使用
watchEffect(()=>{
    //使用属性
})
```

举例：

```vue
<script>
	import {ref,reactive,watch,watchEffect} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let msg = ref('你好啊')
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})

			//监视
			/* watch(sum,(newValue,oldValue)=>{
				console.log('sum的值变化了',newValue,oldValue)
			},{immediate:true}) */

			watchEffect(()=>{
				const x1 = sum.value
				const x2 = person.job.j1.salary
				console.log('watchEffect所指定的回调执行了')
			})

			//返回一个对象（常用）
			return {
				sum,
				msg,
				person
			}
		}
	}
</script>
```

### 2.8、Vue3 生命周期

Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
	```beforeDestroy```改名为 ```beforeUnmount```，
	```destroyed```改名为 ```unmounted```

Vue3.0 也提供了 Composition API 形式的生命周期钩子，与 Vue2.x 中钩子对应关系如下（在setup()中编写右边的函数，函数参数为一个回调）：

- `beforeCreate`==>`setup()`
- `created`==>`setup()`
- `beforeMount` ==>`onBeforeMount`
- `mounted`==>`onMounted`
- `beforeUpdate`==>`onBeforeUpdate`
- `updated` ==>`onUpdated`
- `beforeUnmount` ==>`onBeforeUnmount`
- `unmounted` ==>`onUnmounted`

使用案例：

```vue
<script>
    // 导入
	import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			console.log('---setup---')
			//数据
			let sum = ref(0)

			//通过组合式API的形式去使用生命周期钩子
			onBeforeMount(()=>{
				console.log('---onBeforeMount---')
			})
			onMounted(()=>{
				console.log('---onMounted---')
			})
			onBeforeUpdate(()=>{
				console.log('---onBeforeUpdate---')
			})
			onUpdated(()=>{
				console.log('---onUpdated---')
			})
			onBeforeUnmount(()=>{
				console.log('---onBeforeUnmount---')
			})
			onUnmounted(()=>{
				console.log('---onUnmounted---')
			})

			//返回一个对象（常用）
			return {sum}
		},
		//通过配置项的形式使用生命周期钩子
		//#region 
		beforeCreate() {
			console.log('---beforeCreate---')
		},
		created() {
			console.log('---created---')
		},
		beforeMount() {
			console.log('---beforeMount---')
		},
		mounted() {
			console.log('---mounted---')
		},
		beforeUpdate(){
			console.log('---beforeUpdate---')
		},
		updated() {
			console.log('---updated---')
		},
		beforeUnmount() {
			console.log('---beforeUnmount---')
		},
		unmounted() {
			console.log('---unmounted---')
		},
		//#endregion
	}
</script>
```

### 2.9、hook 函数

hook：本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装（类似于vue2.x中的mixin）
自定义 hook 的优势: 复用代码, 让 setup 中的逻辑更清楚易懂

hook 函数的创建：在 **src** 文件夹下新建 **hooks** 文件夹，在改文件夹下创建要 **复用的 js 文件**

举例：实现在窗体点击后显示点击坐标

hooks/usrPoint.js：

```js
import {reactive,onMounted,onBeforeUnmount} from 'vue'
export default function (){
	//实现鼠标“打点”相关的数据
	let point = reactive({
		x:0,
		y:0
	})

	//实现鼠标“打点”相关的方法
	function savePoint(event){
		point.x = event.pageX
		point.y = event.pageY
		console.log(event.pageX,event.pageY)
	}

	//实现鼠标“打点”相关的生命周期钩子
	onMounted(()=>{
		window.addEventListener('click',savePoint) // 添加事件
	})
	onBeforeUnmount(()=>{
		window.removeEventListener('click',savePoint) //移除事件
	})
	return point
}
```

Demo.vue：

```vue
<template>
	<h2>当前求和为：{{sum}}</h2>
	<button @click="sum++">点我+1</button>
	<hr>
	<h2>当前点击时鼠标的坐标为：x：{{point.x}}，y：{{point.y}}</h2>
</template>

<script>
	import {ref} from 'vue'
    // 导入 usePoint 函数
	import usePoint from '../hooks/usePoint'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let point = usePoint() //使用函数
			//返回一个对象（常用）
			return {sum,point}
		}
	}
</script>
```

### 2.10、toRef(s) 函数

作用：创建 一个 **ref** 对象，其 value 值 **指向另一个对象中的某个属性**。

使用：```const name = toRef(person,'name') ```（person 的 name 属性）

应用场景： 将响应式对象中的某个属性单独提供给外部使用时。

扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：```toRefs(person)```

举例：

```vue
<template>
	<h4>{{person}}</h4>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>薪资：{{job.j1.salary}}K</h2>
	<button @click="name+='~'">修改姓名</button>
	<button @click="age++">增长年龄</button>
	<button @click="job.j1.salary++">涨薪</button>
</template>

<script>
	import {ref,reactive,toRef,toRefs} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})

			//返回一个对象（常用）
			return {
				person,
                // toRef(): 响应式某个对象的单独属性
				// name:toRef(person,'name'),
				// age:toRef(person,'age'),
				// salary:toRef(person.job.j1,'salary'),
                
                // toRefs(): 响应式某个对象的多个属性
				...toRefs(person) // 只能响应式第一层
			}
		}
	}
</script>
```

## 3、其他 Composition API

### 3.1、shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

```js
let person = shallowReactive({}) //只考虑第一层数据的响应式
// 不进行对象的响应式处理
let x = shallowRef({
    y:0
})
```

### 3.2、readonly 与 shallowReadonly

- readonly: 让一个 **响应式数据** 变为 只读 的（**深只读**）。
- shallowReadonly：让一个 **响应式数据** 变为只读的（**浅只读**）。
- 应用场景: 不希望数据被修改时。

导入 readonly，shallowReadonly：

```js
import {ref,reactive,readonly,shallowReadonly} from 'vue'
```

```js
setup(){
    //数据
    let sum = ref(0)
    let person = reactive({
        name:'张三',
        age:18,
        job:{
            j1:{
                salary:20
            }
        }
    })

    person = readonly(person)
    person = shallowReadonly(person)
    sum = readonly(sum)
    sum = shallowReadonly(sum)

    //返回一个对象（常用）
    return {
        sum,
        ...toRefs(person)
    }
}
```

### 3.3、toRaw 与 markRaw

- toRaw：
  - 作用：将一个由 **`reactive`** 生成的 **响应式对象** 转为 **普通对象**
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- **markRaw**：
  - 作用：标记一个对象，使其 **永远** 不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的 **第三方类库** 等。
    2. 当渲染具有 **不可变数据源** 的大列表时，跳过响应式转换可以提高性能。

```vue
<template>
    <h2>{{ person }}</h2>
    <button @click="testToRaw">toRaw</button>
    <button @click="addCar">addCar</button>
    <button @click="changePrice">changePrice</button>
</template>

<script lang="js">
import {ref,reactive,watch,toRaw,markRaw} from 'vue'
    export default {
        name:'Test3',
        setup(){
            let person = reactive({name: 'AA',age: 20})
            function testToRaw(){
                person = toRaw(person)
                // 修改person的age值，修改成功，但数据不再响应式
                person.age++
                console.log(person);
            }
            function addCar(){
				let car = {name:'奔驰',price:40}
				person.car = markRaw(car) // 将car更改为不可变对象
			}

			function changePrice(){
				person.car.price++
				console.log(person.car.price) //修改成功，但数据不会响应
			}
            // 返回一个对象
            return {
                person,
                testToRaw,
                addCar,
                changePrice
            }
        }
    }
</script>
```

### 3.4、customRef

创建一个 **自定义的 ref**，并对其依赖项跟踪和更新触发进行显式控制。

```vue
<template>
	<input type="text" v-model="keyword">
	<h3>{{keyword}}</h3>
</template>

<script>
    // 导入 customRef
	import {ref,customRef} from 'vue'
	export default {
		name:'Demo',
		setup(){
			//自定义一个myRef
			function myRef(value,delay){
				let timer //实现防抖
				//通过 customRef 去实现自定义
				return customRef((track,trigger)=>{
                    //返回有get，set方法的对象
					return{
						get(){
							track() //告诉Vue这个value值是需要被“追踪”的
							return value
						},
						set(newValue){
							clearTimeout(timer)
							timer = setTimeout(()=>{
								value = newValue
								trigger() //告诉Vue去更新界面
							},delay)
						}
					}
				})
			}
			let keyword = myRef('hello',500) //使用程序员自定义的ref
			return {
				keyword
			}
		}
	}
</script>
```

### 3.5、provide 与 inject 数据通信

作用：实现 **后代** 组件间的 **通信**

父组件有一个  **`provide`**  选项来提供数据，后代组件有一个  **`inject`** 选项来开始使用这些数据

具体写法：

​	① 祖组件中：

```js
setup(){
	......
    let car = reactive({name:'奔驰',price:'40万'})
    provide('car',car) // 给后代组件通信
    ......
}
```

​		② 后代组件中：

```js
setup(){
	......
    const car = inject('car') // 后代组件接受数据
    return {car}
	......
}
```

### 3.6、响应式数据判断 API

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

## 4、新的组件

### 4.1、Fragment

- 在Vue2中: 组件必须有一个根标签
- 在 **Vue3** 中: 组件 **可以没有根标签** ， 内部会将 **多个标签** 包含在一个 **Fragment虚拟元素** 中
- 好处: 减少标签层级, 减小内存占用

### 4.2、Teleport

`Teleport` 是一种能够将 **组件html结构** 移动到指定位置的技术。

```vue
<teleport to="移动位置">
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>弹窗</h3>
			<button @click="isShow = false">关闭弹窗</button>
		</div>
	</div>
</teleport>
```

举例：

```vue
<template>
	<div>
		<button @click="isShow = true">点我弹个窗</button>
        <!-- 将html结构移动到body标签上 -->
		<teleport to="body">
			<div v-if="isShow" class="mask">
				<div class="dialog">
					<h3>我是一个弹窗</h3>
					<h4>一些内容</h4>
					<h4>一些内容</h4>
					<h4>一些内容</h4>
					<button @click="isShow = false">关闭弹窗</button>
				</div>
			</div>
		</teleport>
	</div>
</template>

<script lang="js">
	import {ref} from 'vue'
	export default {
		name:'Dialog',
		setup(){
			let isShow = ref(false)
			return {isShow}
		}
	}
</script>

<style>
	.mask{
		position: absolute;
		top: 0;bottom: 0;left: 0;right: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.dialog{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		text-align: center;
		width: 300px;
		height: 300px;
		background-color: green;
	}
</style>
```

### 4.3、Suspense

**等待**异步组件时**渲染**一些额外内容，让应用有更好的用户体验（正在加载）

异步引入组件：

```js
import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('./components/Child.vue')) //动态引入
```

使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

```vue
<template>
	<div class="app">
		<h3>我是App组件</h3>
		<Suspense>
            <!-- 加载完成时的内容 -->
			<template v-slot:default>
				<Child/>
			</template>
			<!-- 等待加载时的内容 -->
			<template v-slot:fallback>
				<h3>加载中.....</h3>
			</template>
		</Suspense>
	</div>
</template>
```

## 5、其他

### 5.1、全局API的转移

Vue3 中对 **全局API** 做出了调整：

- 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

| 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)        |
| ------------------------- | --------------------------- |
| Vue.config.xxxx           | app.config.xxxx             |
| Vue.config.productionTip  | **移除**                    |
| Vue.component             | app.component               |
| Vue.directive             | app.directive               |
| Vue.mixin                 | app.mixin                   |
| Vue.use                   | app.use                     |
| Vue.prototype             | app.config.globalProperties |

- 移除 ```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- 移除 keyCode 作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- 移除过滤器（filter）
