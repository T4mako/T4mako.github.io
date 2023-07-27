---
order: 2
icon: vue
category: 
    - Vue
tag: 
    - 基础语法
    - Vue
---
# Vue组件

组件定义：  
组件：实现应用中 **局部** 功能 **代码** 和 **资源** 的 **集合**
组件化：当应用中的功能都是多组件的方式来编写的, 那这个应用就是一个组件化的应用  

注：
模块：向外提供特定功能的 js 程序, 一般就是一个 js 文件  
模块化：当应用中的 js 都以模块来编写的, 那这个应用就是一个模块化的应用。  



## 1.1、非单文件组件

非单文件组件：一个文件中包含 **n** 个组件

组件创建的三步骤：
	① 定义组件(创建组件)
	② 注册组件
	③ 使用组件(写组件标签)

一、定义组件：
使用 **Vue.extend({配置对象})** 创建，
其中 配置对象 和 new Vue(options) 时传入的那个 options 几乎一样
**区别**如下：
	el 不要写
	**data** 必须写成 **函数，以 return 形式返回对象**

> 注：使用template可以配置组件结构。

二、注册组件
	局部注册：靠 new Vue 的时候传入**components** 选项
	全局注册：靠 **Vue.component('组件名',组件)**

三、编写组件标签：直接写 Vue.extend() 对应对象的标签

```html
<div id="root">
    <hello></hello>
    <hr>
    <h1>{{msg}}</h1>
    <hr>
    <!-- 第三步：编写组件标签 -->
    <school></school>
    <hr>
    <!-- 第三步：编写组件标签 -->
    <student></student>
</div>

<div id="root2">
    <hello></hello>
</div>

<script type="text/javascript">

    //第一步：创建school组件
    const school = Vue.extend({
        template:`
				<div class="demo">
					<h2>学校名称：{{schoolName}}</h2>
					<h2>学校地址：{{address}}</h2>
					<button @click="showName">点我提示学校名</button>	
    </div>
			`,
        data(){
            return {
                schoolName:'Hello',
                address:'shanghai'
            }
        },
        methods: {
            showName(){
                alert(this.schoolName)
            }
        },
    })

    //第一步：创建student组件
    const student = Vue.extend({
        template:`
				<div>
					<h2>学生姓名：{{studentName}}</h2>
					<h2>学生年龄：{{age}}</h2>
    </div>
			`,
        data(){
            return {
                studentName:'张三',
                age:18
            }
        }
    })

    //第一步：创建hello组件
    const hello = Vue.extend({
        template:`
				<div>	
					<h2>你好啊！{{name}}</h2>
    </div>
			`,
        data(){
            return {
                name:'Tom'
            }
        }
    })

    //第二步：全局注册组件
    Vue.component('hello',hello)

    //创建vm
    new Vue({
        el:'#root',
        data:{
            msg:'你好啊！'
        },
        //第二步：注册组件（局部注册）
        components:{
            school, //简写形式（school: school）
            student
        }
    })

    new Vue({
        el:'#root2',
    })
</script>
```

注意点：

1.关于组件名:
	① 一个单词组成：
		第一种写法(首字母小写)：school
		第二种写法(首字母大写)：School
	② 多个单词组成：
		第一种写法(kebab-case命名)：my-school
		第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
			备注：
				1.组件名尽可能回避HTML中已有的元素名称
				2.可以使用name配置项指定组件在开发者工具中呈现的名字。

2.关于组件标签:
	第一种写法：<school></school>
	第二种写法：<school/> 

> 注：不用使用脚手架时，<school/>会导致后续组件不能渲染。



3.一个简写方式：
const school = Vue.extend(options) 可简写为：const school = options

## 1.2、组件嵌套

```html
<body>
    <div id="root">
        <school></school>
    </div>
</body>
<script>
    const stu = Vue.extend({
        name: 'stu',
        template: `
            <div>{{name}}</div>
        `,
        data(){
            return {
                name:'T4mako'
            }
        }
    })

    const school = Vue.extend({
        // 将嵌套组件用 名字 引入
        // 必须放在 父盒子 中 表示子组件
        template: `
            <div>
                AAA
                <stu></stu>
            </div>
            
        `,
        components: {
            stu
        }
    })

    const vm = new Vue({
        el: '#root',
        // 局部注册组件
        components: {
            school,
        }
    })
</script>
```

## 1.3、VueComponent

1、school **组件** 本质是一个名为 **VueComponent** 的构造函数，且不是程序员定义的，是 **Vue.extend 生成** 的。

2、我们只需要 写<school/>或<school></school>，Vue解析时会帮我们创建 schoo l组件的 实例对象，
	即Vue帮我们执行的：`new VueComponent(options)`

3、特别注意：每次 **调用 Vue.extend**，返回的都是一个 **全新的VueComponent** (VueComponent 的构造函数 不唯一)

4、关于this指向：

​    ① **组件**配置中：
​	**data函数**、**methods中的函数**、**watch中的函数**、**computed中的函数** 它们的 **this**均是【**VueComponent** 实例 **对象**】。

​    ② **new Vue(options)** 配置中：
​	data函数、methods中的函数、watch中的函数、computed中的函数 它们的 **this** 均是【**Vue实例对象**】。

5、VueComponent 的实例对象，以后 **简称 vc**（也可称之为：组件实例对象）
	Vue的实例对象，以后简称 **vm**。
vm 与 vc 区别：vc 没有 el，data 必须写成 方法

## 1.4、重要的内置关系 (VC 与 Vue)

1、一个重要的内置关系：VueComponent.prototype._\_proto__ === Vue.prototype

2、什么要有这个关系：让 **组件实例对象**（vc）可以 **访问到 Vue 原型上的属性、方法。**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230513172905.png)

```js
Vue.prototype.x = 99

//定义school组件
const school = Vue.extend({
    name:'school',
    template:`
				<div>
					<h2>AA</h2>	
					<button @click="showX">点我输出x</button>
				</div>
			`,
    data(){
        return {
        }
    },
    methods: {
        showX(){
            console.log(this.x) //99
        }
    },
})
```

## 1.5、单文件组件

一个文件中只包含 1 个组件
单文件组件名都是 **.vue** 结尾的

创建组件到注册使用过程：
结构：
![image-20230514145754676](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230514145754676.png)

> 注:
> ① 创建组件 XXX.vue
> ② App.vue (引入所有的 vue 组件)
> ③ 创建 main.js 做为入口文件，引入 app.vue , 创建 vm，使用 template 创建 app
> ④ 在 index.html 创建 root 容器，引入 vue.js ， main.js

School 组件创建：

```vue
<template>
<!-- 组件结构 -->
	<div class="demo">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
		<button @click="showName">点我提示学校名</button>	
	</div>
</template>

<script>
// 组件js
	// 默认暴露
	// 简写方式，可以省略Vue.extend()
	 export default {
		name:'School',
		data(){
			return {
				name:'Hello',
				address:'shanghai'
			}
		},
		methods: {
			showName(){
				alert(this.name)
			}
		},
	}
</script>

<style>
/* 组件样式 */
	.demo{
		background-color: orange;
	}
</style>
```

创建 App.vue (引入所有的 vue 组件)

```vue
<template>
	<div>
		<School></School>
		<Student></Student>
	</div>
</template>

<script>
	//引入组件
	import School from './School.vue'
	import Student from './Student.vue'

	
	export default {
		name:'App',
		components:{
			School,
			Student
		}
	}
</script>
```

创建 main.js 做为入口文件，引入 app.vue , 创建 vm，使用 template 创建 app
注：浏览器不能直接解析 .vue 文件，需要脚手架

```js
// 引入 app.vue
import App from './App.vue'	// 注：浏览器不能直接解析 .vue 文件，需要脚手架
// main.js （入口文件） 
// 专门用于创建 Vue 对象 vm 
new Vue({
	el:'#root',
	template:`<App></App>`,
	components: {App},
})
```

创建 index.html 文件：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>练习一下单文件组件的语法</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="root"></div>
		<script type="text/javascript" src="../js/vue.js"></script>
		<script type="text/javascript" src="./main.js"></script>
	</body>
</html>
```

