---
order: 6
icon: vue
category: 
    - Vue
tag: 
    - vuex
    - Vue
---
# vuex

[vuex](https://github.com/vuejs/vuex) 概念：专门在 Vue 中实现 **集中式状态（数据）管理** 的一个 Vue 插件，对 vue 应用中多个组件的共享状态进行集中式的管理（读/写），也是一种 **组件间通信** 的方式，且 **适用于任意组件间通信**。  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230518181919.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230518182011.png)

使用 vuex 的场景 （**共享**）：
	① 多个组件依赖于同一状态  
	② 来自不同组件的行为需要变更同一状态  

## 1.1、vuex 原理

actions，mutations，state 本质都为一个对象
actions，mutations，state 都被 store 管理

state 用于存储数据

dispatch 与 actions 交互
commit 与 mutations 交互

vc 可以通过 **this.$store.commit/dispatch('fun_name,value')** 调用方法

开发者工具 与 Mutations 关联

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230518185213.png)

## 1.2、搭建 vuex 环境

vuex 的安装：

```shell
npm i vuex
```

> 注意：
> vue2 中，要使用 vuex 的 3 版本
> vue3 中，要使用 vuex 的 4版本

① 在 **src** 文件夹下创建 **store 文件夹**，在该文件夹下创建一个 **index.js** 文件，创建 vuex 的核心 store 

```js
// 该文件用于创建Vuex中最核心的store

// 引入 Vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'

//准备actions（用于响应组件中的动作）
const actions = {}

//准备mutations（用于操作数据（state））
const mutations = {}

//准备state（存储数据）
const state = {}

Vue.use(Vuex)

//创建并暴露 store
export default new Vuex.Store({
    // 对象的简写形式
    actions,
    mutations,
    state
})
```

② 在 main.js 中引入vuex，使用插件

```js
import Vue from 'vue'
import App from './App.vue'

// 引入 store
import store from './store/index'

// 关闭 vue 的生产提示
Vue.config.productionTip = false

new Vue({
  el:'#app',
  render: h => h(App),
  //配置 store
  store,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  },
}).$mount('#app')

```

## 1.3、vuex 基本使用

1. 初始化数据  `state`、配置```actions```、配置```mutations```，操作文件```src/store/index.js```
2. **组件中** **读取** vuex 中的数据：**```$store.state.xxx```**
3. **组件中** **修改** vuex 中的数据：**```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```**

>  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

求和案例：

src/store/index.js

```js
//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions——用于响应组件中的动作
const actions = {
    // context上下文，包含了数据state
	jiaOdd(context,value){
		console.log('actions中的jiaOdd被调用了')
		if(context.state.sum % 2){
			context.commit('JIA',value)
		}
	},
	jiaWait(context,value){
		console.log('actions中的jiaWait被调用了')
		setTimeout(()=>{
			context.commit('JIA',value)
		},500)
	}
}
//准备mutations——用于操作数据（state）
// 方法写成大写，用于区分
const mutations = {
	JIA(state,value){
		console.log('mutations中的JIA被调用了')
		state.sum += value
	},
	JIAN(state,value){
		console.log('mutations中的JIAN被调用了')
		state.sum -= value
	}
}
//准备state——用于存储数据
const state = {
	sum:0 //当前的和
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
})
```

components/Count.vue

```vue
<script>
	export default {
		name:'Count',
		data() {
			return {
				n:1, //用户选择的数字
			}
		},
		methods: {
			increment(){
               	 // 直接调用 commit 方法，
				this.$store.commit('JIA',this.n)
			},
			decrement(){
				this.$store.commit('JIAN',this.n)
			},
			incrementOdd(){
				this.$store.dispatch('jiaOdd',this.n)
			},
			incrementWait(){
				this.$store.dispatch('jiaWait',this.n)
			},
		},
		mounted() {
			console.log('Count',this)
		},
	}
</script>
```

## 1.4、vuex 的开发者工具

vuex 与 vue 开发者工具相同

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230518195313.png)

## 1.5、vuex getters 配置项

1. 概念：当 state 中的数据需要 **经过加工后再使用** 时，可以使用 getters 加工。（类似 vc 中的 data 与 computed）

2. 在**```store/index.js```**中追加**```getters```**配置

   ```js
   // 在 store/index.js 中添加配置
   const getters = {
   	bigSum(state){
           // 得写返回值
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
       actions,
   	mutations,
   	state,
       // 添加暴露项
   	getters
   })
   ```

3. 组件中读取数据：**```$store.getters.数据```**

## 1.6、四个map方法的使用

导入 mapState , mapGetters , mapmapActions 和 mapMutations

```vue
<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default {.......}
</script>
```

1. **mapState() **方法：用于帮助我们 **映射 state 中的数据** 为 **计算属性**

   ```js
   computed: {
       
       //靠程序员自己亲自去写计算属性
   	/* sum(){
   		return this.$store.state.sum
   	},*/
       
       /* 以下写法选其一即可 */
       
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. **mapGetters() **方法：用于帮助我们 **映射```getters```中的数据** 为 **计算属性**

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. **mapActions() **方法：用于帮助我们生成 **与```actions```对话** 的方法，即：包含 ```$store.dispatch(xxx)``` 的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       // 组件的方法名：incrementOdd，actions 中的方法名：jiaOdd
       // 注意参数的传递，可以在事件的方法名后直接加 (参数1，参数2...)
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. **mapMutations() **方法：用于帮助我们生成 **与```mutations```对话** 的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中**绑定事件时传递参数**，否则参数是事件对象。

举例：

```vue
<template>
	<div>
		<h1>{{sum}}</h1>
		<h3>{{bigSum}}</h3>
		<h3>我在{{school}}，学习{{subject}}</h3>
        <!-- 绑定的数据为number类型 -->
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
        <!-- 绑定事件时触发参数 -->
		<button @click="increment(n)">+</button>
		<button @click="decrement(n)">-</button>
		<button @click="incrementOdd(n)">当前求和为奇数再加</button>
		<button @click="incrementWait(n)">等一等再加</button>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default {
		name:'Count',
		data() {
			return {
				n:1, 
			}
		},
		computed:{
			//借助mapState生成计算属性，从state中读取数据。（对象写法）
			// ...mapState({he:'sum',xuexiao:'school',xueke:'subject'}),

			//借助mapState生成计算属性，从state中读取数据。（数组写法）
			...mapState(['sum','school','subject']),

			/* ******************************************************************** */

			//借助mapGetters生成计算属性，从getters中读取数据。（对象写法）
			// ...mapGetters({bigSum:'bigSum'})
			
			//借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
			...mapGetters(['bigSum'])

		},
		methods: {
			//程序员亲自写方法
			/* increment(){
				this.$store.commit('JIA',this.n)
			},
			decrement(){
				this.$store.commit('JIAN',this.n)
			}, */

			//借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
			...mapMutations({increment:'JIA',decrement:'JIAN'}),

			//借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(数组写法)
			// ...mapMutations(['JIA','JIAN']),

			/* ************************************************* */

			//程序员亲自写方法
			/* incrementOdd(){
				this.$store.dispatch('jiaOdd',this.n)
			},
			incrementWait(){
				this.$store.dispatch('jiaWait',this.n)
			}, */

			//借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
			...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

			//借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(数组写法)
			// ...mapActions(['jiaOdd','jiaWait'])
		},
		mounted() {
			const x = mapState({he:'sum',xuexiao:'school',xueke:'subject'})
			console.log(x)
		},
	}
</script>

<style lang="css">
</style>
```

## 1.7、模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改 **```store.js```** （不同的数据分类，配置开启命名空间）

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中 **读取 state** 数据：

   ```js
   //方式一：通过 $store.state 自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助 mapState 读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中 **读取 getters** 数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中 **调用 dispatch**

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中 **调用 commit**

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

> 注:
> 可以创建不同的 js 数据文件 并暴露，然后在 index 中导入



举例：

count.js：

```js
export default { // 暴露
	namespaced:true, // 开启命名空空间
	actions:{
		jiaOdd(context,value){
			if(context.state.sum % 2){
				context.commit('JIA',value)
			}
		},
		jiaWait(context,value){
			console.log('actions中的jiaWait被调用了')
			setTimeout(()=>{
				context.commit('JIA',value)
			},500)
		}
	},
	mutations:{
		JIA(state,value){
			state.sum += value
		},
		JIAN(state,value){
			state.sum -= value
		},
	},
	state:{
		sum:0, //当前的和
		school:'school',
		subject:'Vue',
	},
	getters:{
		bigSum(state){
			return state.sum*10
		}
	},
}
```

person.js：

```js
import axios from 'axios'
import { nanoid } from 'nanoid'
export default { // 暴露
	namespaced:true,
	actions:{
		addPersonWang(context,value){
			if(value.name.indexOf('王') === 0){
				context.commit('ADD_PERSON',value)
			}else{
				alert('添加的人必须姓王！')
			}
		},
        // 在 actions 中使用 ajax
		addPersonServer(context){
			axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
				response => {
					context.commit('ADD_PERSON',{id:nanoid(),name:response.data})
				},
				error => {
					alert(error.message)
				}
			)
		}
	},
	mutations:{
		ADD_PERSON(state,value){
			state.personList.unshift(value)
		}
	},
	state:{
		personList:[
			{id:'001',name:'张三'}
		]
	},
	getters:{
		firstPersonName(state){
			return state.personList[0].name
		}
	},
}
```

index.js：引入 count.js 和 person.js 两个 vuex

```js
//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import countOptions from './count'
import personOptions from './person'
//应用Vuex插件
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
	modules:{
		countAbout:countOptions,
		personAbout:personOptions
	}
})
```

Count.vue

```vue
<template>
	<div>
		<h1>当前求和为：{{sum}}</h1>
		<h3>当前求和放大10倍为：{{bigSum}}</h3>
		<h3>我在{{school}}，学习{{subject}}</h3>
		<h3>Person组件的总人数是：{{personList.length}}</h3>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment(n)">+</button>
		<button @click="decrement(n)">-</button>
		<button @click="incrementOdd(n)">当前求和为奇数再加</button>
		<button @click="incrementWait(n)">等一等再加</button>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex' // 导入
	export default {
		name:'Count',
		data() {
			return {
				n:1, 
			}
		},
		computed:{
			//借助mapState生成计算属性，从state中读取数据。（数组写法）
			...mapState('countAbout',['sum','school','subject']),
			...mapState('personAbout',['personList']),
			//借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
			...mapGetters('countAbout',['bigSum'])
		},
		methods: {
			//借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
			...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
			//借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
			...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
		},
		mounted() {
			console.log(this.$store)
		},
	}
</script>
<style lang="css">
</style>
```

person.vue：

```vue
<template>
	<div>
		<h1>人员列表</h1>
		<h3 style="color:red">Count组件求和为：{{sum}}</h3>
		<h3>列表中第一个人的名字是：{{firstPersonName}}</h3>
		<input type="text" placeholder="请输入名字" v-model="name">
		<button @click="add">添加</button>
		<button @click="addWang">添加一个姓王的人</button>
		<button @click="addPersonServer">添加一个人，名字随机</button>
		<ul>
			<li v-for="p in personList" :key="p.id">{{p.name}}</li>
		</ul>
	</div>
</template>

<script>
	import {nanoid} from 'nanoid'
	export default {
		name:'Person',
		data() {
			return {
				name:''
			}
		},
		computed:{
			personList(){
                // 通过 $store 获取数据
				return this.$store.state.personAbout.personList
			},
			sum(){
				return this.$store.state.countAbout.sum
			},
			firstPersonName(){
				return this.$store.getters['personAbout/firstPersonName'] //获取 getters 的数据
			}
		},
		methods: {
			add(){
				const personObj = {id:nanoid(),name:this.name}
				this.$store.commit('personAbout/ADD_PERSON',personObj) //commit
				this.name = ''
			},
			addWang(){
				const personObj = {id:nanoid(),name:this.name}
				this.$store.dispatch('personAbout/addPersonWang',personObj) // dispatch
				this.name = ''
			},
			addPersonServer(){
				this.$store.dispatch('personAbout/addPersonServer')
			}
		},
	}
</script>
```

