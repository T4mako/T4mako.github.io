---
order: 1
icon: vue
category: 
    - Vue
tag: 
    - 基础语法
    - Vue
---
# Vue 核心

## 1.1、Vue 对象

想要 Vue 工作必须要创建 **Vue 实例**，并传入一个 **配置对象**

**el ：绑定容器**
**容器** 与 **Vue实例** 关系：**一对一**
**Vue实例** 与 **组件** 配合使用
容器中的代码符合 html 规范，并且加入了特殊的 Vue 语法 （**Vue 模板**）

```html
<!-- 创建一个 root 容器 -->
<div id="root">
    <h1>GoodBye {{name}},{{age}},{{Date.now()}},</h1> 
</div>


<script type="text/javascript">

    // 创建 Vue 实例
    new Vue({

        // el 用于指定当前 Vue 实例为哪个容器服务
        // 值 通常 为 css 选择器
        el: '#root', // id 为 root 的元素

        // data 中用于存储数据，数据供 el 所指定的容器使用
        // 值 可以写成 对象，函数
        data: {
            name: 't4mako',
            age: 18
        }
    })
</script>
```

## 1.2、el 与 data 的两种写法

el 的 两种写法：
	① new Vue() 时配置
	② 先创建实例，通过 vm.$mount('#root') 指定

data 的 两种写法：
	对象式
	函数式

> 注：由 Vue 管理的函数，不要写箭头函数，this 就不再是Vue实例了（ this 指向问题 window）

```html
<div id="root">
    <h2>{{name}}</h2>
</div>

<script>
    const vm = new Vue({
        // 写法一
        //el: '#root', 
        // data: {
        //     name: 'hello'
        // }

        // 写法二
        // 此处:functioin可省略:
        // data(){return{ name: 'hello'}}
        data:function(){
            return{
                name: 'hello'
            }
        }
    })
    vm.$mount('#root') // 写法二
</script>
```

## 1.3、Vue 模板语法

**插值语法** 与 **指令语法**

差值语法
	解析 **标签体内容**
	语法：**{{xxx}}**
	双括号内只能写 **Js表达式**  

指令语法：
	解析 **标签属性**、**解析标签体内容**、**绑定事件**  
	如：v-bind:href = 'xxxx  （v-bind: 可简写成 : ）

```html
<div id="root">
    <h1>插值语法</h1> 
    <h3>你好，{{name}}</h3>

    <h1>指令语法</h1>
    <a v-bind:href="url">bilibili 1</a>
    <a :href="url">bilibili 2</a> <!-- v-bind 可以简写成 : -->
</div>


<script type="text/javascript">
    // 创建 Vue 实例
    new Vue({
        el: '#root',             
        data: {
            name: 'Tom',
            url: 'http://www.bilibili.com'
        }
    })
</script>
```

## 1.4、v-bind/model 数据绑定

### 1.4.1、v-bind 单项数据绑定

**v-bind：单项数据绑定**

![image-20230509152524615](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230509152524615.png)

### 1.4.2、v-model 双向数据绑定 

**v-model：双向数据绑定**

v-model 只能应用在 **表单类元素** 上（输入类元素 input select）
v-model:value 可以简写成 **v-model**，因为 v-model 默认收集的就是 value 值

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230509152751.png)

```html
<div id="root">
    单项数据绑定：<input type="text" v-bind:value="name"><br>
    双项数据绑定：<input type="text" v-model:value="name">
    
    <!-- 简写 -->
    单项数据绑定：<input type="text" :value="name"><br>
    双项数据绑定：<input type="text" v-model="name"><br>

</div>

<script>
    new Vue({
        el: '#root',
        data: {
            name: 'hello'
        }
    })
</script>
```

## 1.5、MVVM 理解

**Vue 参考了 MVVM 模型**

M：模型 model （对应 data 中的数据  ）
V：视图 View （模板  ）
VM：视图模型 ViewModel （Vue 实例对象）

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230509155543.png)

## 1.6、数据代理

数据代理：通过 一个对象 代理 对另一个对象中 属性的操作（读/写）

### 1.6.1、回顾 defineProperty()

回顾 ES6语法：[defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)：
**`Object.defineProperty()`** 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```html
<script type="text/javascript" >
    let number = 18
    let person = {
        name:'张三',
        sex:'男',
    }

    Object.defineProperty(person,'age',{
        
        // 基本配置项：
        value:18,
        enumerable:true, //控制属性是否可以枚举，默认值是false
        writable:true, //控制属性是否可以被修改，默认值是false
        configurable:true, //控制属性是否可以被删除，默认值是false

        //当读取 person 的 age 属性时，get函数(getter) 就会被调用，且 返回值 就是 age值
        get(){
            console.log('有人读取age属性了')
            return number
        },

        //当 修改 person 的 age 属性时，set函数(setter)就会被调用，且会 收到 修改的具体值
        set(value){
            console.log('有人修改了age属性，且值是',value)
            number = value
        }

    })

    // console.log(Object.keys(person))

    console.log(person)
</script>
```

通过  Object.defineProperty() 实现数据代理：

```html
<!-- 数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）-->
<script type="text/javascript" >
    let obj = {x:100}
    let obj2 = {y:200}

    Object.defineProperty(obj2,'x',{
        get(){
            return obj.x
        },
        set(value){
            obj.x = value
        }
    })
</script>
```

### 1.6.2、Vue 中的数据代理

data 中的值都会有对应的 getter setter 方法

创建 vm对象 时，对象中 data 的数据最后会在 _data 中（数据劫持）
_data 中的数据会再 添加到 vm对象 中

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230509163329.png)

## 1.7、v-on/@ 事件处理

### 1.7.1、事件的基本使用

​	绑定事件： **v-on:xxx** 或者 **@xxx** 绑定事件
​		@xxx = “yyy”，""内可以写一些简单的语句，对应 vm 身上的属性与方法
​		事件的回调需配置在 **methods** 对象中，最终会在 vm 上
​		methods 中的函数不要写箭头函数，（ this ）
​		methods 中的函数被 vue 管理，this 指向 vm 或 组件实例对象}
​		参数传递：@click="demo($event)"	（$event 为当前dom）

```html
<div id="a">
    <h2>welcome {{name}}</h2>
    
    <button @click="show">click</button> 
    
    <!-- 普通写法 -->
    <button v-on:click="showInfo">click me1</button>
    <!-- 简写形式 -->
    <button @click="showInfo">click me2</button> 
    <!-- 参数传递 -->
    <button @click="showInfo1($event,66)">click me3</button> 
</div>
<script>
    const vm = new Vue({
        el: '#a',
        data: {
            name: 'T4mako'
        },
        methods: {
            show(){
                alert('11')
            },
            
            showInfo(event){ // 不要写成箭头函数
                console.log(event);
                console.log(event.target.innerText);
                console.log(this); //此处的this是vm
                alert('hello');
            },
            showInfo1(event,number){
                console.log(number);
                console.log(event);
            }
        }
    })
</script>
```

### 1.7.2、事件修饰符

Vue中的事件修饰符：
	prevent：阻止默认事件（常用）；
	stop：阻止事件冒泡（常用）；
	once：事件只触发一次（常用）；
	capture：使用事件的捕获模式；
	self：只有event.target是当前操作的元素时才触发事件；
	passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

```html
<div id="root">
    
    <!-- 阻止默认事件（常用） -->
    <a href="http://www.bilibili.com" @click.prevent="showInfo">click me</a>

    <!-- 阻止事件冒泡（常用） -->
    <div class="demo1" @click="showInfo">
        <button @click.stop="showInfo">阻止事件冒泡</button>
        <!-- 修饰符可以连续写 -->
        <!-- <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
    </div>

    <!-- 事件只触发一次（常用） -->
    <button @click.once="showInfo">事件只触发一次</button>

    <!-- 使用事件的捕获模式 -->
    <div class="box1" @click.capture="showMsg(1)">
        <!-- 点击输出 1 2 -->
        div1
        <div class="box2" @click="showMsg(2)">
            div2
        </div>
    </div>

    <!-- 只有event.target是当前操作的元素时才触发事件； -->
    <div class="demo1" @click.self="showInfo">
        <button @click="showInfo">点我提示信息</button>
    </div>

    <!-- 事件的默认行为立即执行，无需等待事件回调执行完毕； -->
    <!-- 滚动条事件 -->
    <ul @wheel.passive="demo" class="list">
        <!-- 此处有滚动条 -->
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>

</div>
</body>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    new Vue({
        el:'#root',
        data:{
            name:'AAA'
        },
        methods:{
            showInfo(e){
                alert('你好！')
                // console.log(e.target)
            },
            showMsg(msg){
                console.log(msg)
            },
            demo(){
                for (let i = 0; i < 100000; i++) {
                    console.log('#')
                }
                console.log('累坏了')
            }
        }
    })
</script>
```

### 1.7.3、键盘事件

① Vue中 **常用** 的 **按键别名**：
	回车 => enter
	删除 => delete (捕获“删除”和“退格”键)
	退出 => esc
	空格 => space
	换行 => tab (特殊，必须配合keydown去使用)
	上 => up
	下 => down
	左 => left
	右 => right

② ctrl、alt、shift、meta（Win键）：
	配合 **keyup** 使用：按下这些键的同时，再按下其他键，随后释放其他键，事件才被触发。
	配合 **keydown** 使用：正常触发事件。

③ 也可以使用keyCode去指定具体的按键（不推荐）

④ Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名

⑤ 修饰符可以 **链式** 调用 
	**@click.prevent.stop = "show"**
	**@click.ctrl.s = "show"**

```html
<div id="root">
    
    <input type="text" placeholder="enter" @keyup.enter="show">
    <button @click.prevent.stop="show" value="123">click me</button>
    <input type="text" @keyup.huiche="show">
</div>

<script>

    Vue.config.keyCodes.huiche = 13 //定义了一个别名按键

    new Vue({
        el: '#root',
        data: {},
        methods: {
            show(e){
                console.log(e.target.value);
            }
        }
    })
</script>
```

## 1.8、计算属性computed 与 监视watch

**computed** 与 **watch** 配置项

### 1.8.1、计算属性

通过 已有属性 计算得来 要用的属性
原理：底层借助了Objcet.defineproperty 方法提供的getter和setter
内部有 **缓存机制**（复用），效率更高，调试方便
get 函数执行时间：
	初次读取时会执行一次
	当依赖的数据发生改变时会被再次调用

**计算属性** 最终会出现在 vm 上，**直接读取** 使用即可
如果计算属性要被修改，那必须写 **set函数** 去响应修改 （改 data 中数据）

```html
<body>
    <div id="root">
        <!-- 双向绑定 -->
        姓：<input type="text" v-model="firstName"> <br/><br/>
        名：<input type="text" v-model="lastName"> <br/><br/>
        全名：<span>{{fullName}}</span> <br/><br/>
    </div>
</body>

<script type="text/javascript">

    const vm = new Vue({
        el:'#root',
        data:{
            firstName:'张',
            lastName:'三',
        },
        // 计算属性
        computed:{
            fullName:{
                // 初次读取 fullName 时。调用哦 get
                // 所依赖的数据发生变化时 调用 get （否则为缓存）
                // get 返回值就作为 fullName 的值
                // get 中的 this 指向 vm
                get(){
                    console.log('get被调用了')
                    // console.log(this) //此处的this是vm
                    return this.firstName + '-' + this.lastName
                },
                // set 非必须的
                // 当fullName被修改调用set
                // set 中的 this 指向 vm
                set(value){
                    console.log('set',value)
                    const arr = value.split('-')
                    this.firstName = arr[0]
                    this.lastName = arr[1]
                }
            }
        }
    })
</script>
```

#### 计算属性简写：

**没有 set** 方法时可以简写

```html
<body>
    <!-- 准备好一个容器-->
    <div id="root">
        姓：<input type="text" v-model="firstName"> <br/><br/>
        名：<input type="text" v-model="lastName"> <br/><br/>
        全名：<span>{{fullName}}</span> <br/><br/>
    </div>
</body>

<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    const vm = new Vue({
        el:'#root',
        data:{
            firstName:'张',
            lastName:'三',
        },
        computed:{
            // 简写
            // 函数就当 get() 用
            fullName(){
                console.log('get被调用了')
                return this.firstName + '-' + this.lastName
            }
            //完整写法
            /* fullName:{
					get(){
						console.log('get被调用了')
						return this.firstName + '-' + this.lastName
					},
					set(value){
						console.log('set',value)
						const arr = value.split('-')
						this.firstName = arr[0]
						this.lastName = arr[1]
					}
				} */
        }
    })
</script>
```

### 1.8.2、监视

#### 1.8.2.1、监视属性

配置项：**watch**
① 当 **被监视的属性变化**, 回调函数调用
② 监视的属性必须存在，才能进行监视
③ 监视的两种写法：
	(1) new Vue时传入**watch** **配置**
	(2) 通过 **vm.$watch** 监视

```html
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            isHot: true
        },
        computed: {
            info(){
                return this.isHot ? 'hot' : 'cold'
            }
        },
        methods: {
            changeWeather(){
                this.isHot = !this.isHot
            }
        },
        
        // ① 通过 watch 实现监视
        // watch: {
        //     isHot: {
        //         immediate: true, // 初始化时让 handler() 调用
        //         // 当 isHot 发生改变时 调用 handler()
        //         handler(newValue,oldValue){
        //             console.log('isHot changed',newValue,oldValue);
        //         }

        //     }
        // }
    })

    // ② 通过 $watch 监视
    vm.$watch('isHot', {
        immediate: true, // 初始化时让 handler() 调用
        // 当 isHot 发生改变时 调用 handler()
        handler(newValue,oldValue){
            console.log('isHot changed',newValue,oldValue);
        }
    })
</script>
```

#### 1.8.2.2、深度监视

深度监视：
	Vue中的watch默认不监测对象内部值的改变（只监视一层）。
	配置 **deep:true** 可以监测对象内部值改变（多层）。

> 注：
> Vue自身可以监测对象内部值的改变，但 Vue 提供的 **watch 默认不可以**
> 使用 watch 时根据数据的具体结构，决定是否采用深度监视。

```html
<div id="root">
    <h3>a 的值：{{numbers.a}}</h3>
    <button @click="numbers.a++">click me let a++</button>
    <h3>b 的值：{{numbers.b}}</h3>
    <button @click="numbers.b++">click me let b++</button>
    <h3>numbers 的值：{{numbers}}</h3>
    <button @click="numbers = {a:666,b:888}">click me change numbers</button>
</div>

<script>
    const vm = new Vue({
        el: "#root",
        data: {
            isHot: true,
            numbers: {
                a: 1,
                b: 2
            }
        },
        computed: {
            info(){
                return this.isHot ? 'hot' : 'cold'
            }
        },
        methods: {
        },
        // 通过 watch 实现监视
        watch: {

            // 深度监视 a （必须加引号）
            // 'numbers.a':{
            //     handler(){
            //         console.log('a changed');
            //     }
            // },

            // deep 深度监视
            // 监视多级结构中所有属性的变化
            numbers: {
                deep: true, // 开启深度监视
                handler(){
                    console.log('numbers changed');
                }
            }
        }
    })
</script>
```

#### 1.8.2.3、监视属性简写

**watch** **配置项** 简写

```js
watch: {
    // 简写
    // 相当于 handler()
    isHot(newValue,oldValue){
        console.log('changed',newValue,oldValue);
    }
    
    // 正常写法
    /*isHot:{
        // immediate: true, 初始化调用
        // deep:true,
        handler(newValue,oldValue){
                        console.log('changed',newValue,oldValue);
		}
	}*/
}
```

**vm.$watch** 简写

```js
//简写
vm.$watch('isHot', function(newValue,oldValue){
    console.log(newValue,oldValue);
})

// 正常写法
vm.$watch('isHot', {
    immediate: true, // 初始化时让 handler() 调用
    // 当 isHot 发生改变时 调用 handler()
    handler(newValue,oldValue){
        console.log('isHot changed',newValue,oldValue);
    }
})
```

### 1.8.3、computed 和 watch 区别

computed和watch之间的区别：
	1.computed能完成的功能，watch都可以完成。
	2.watch能完成的功能，computed不一定能完成，例如：**watch可以进行异步操作**

两个重要的小原则：
	1.**被Vue管理的函数**，最好**写成普通函数**，这样this的指向才是 vm 或 组件实例对象。
	2.所有 **不被Vue所管理的函数**（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好 **写成箭头函数**，这样this的指向才是vm 或 组件实例对象。

## 1.9、:class/style 绑定样式

class 样式绑定：
	写法 **`:class="xxx"  `** 	xxx可以是 **字符串、对象、数组** （：代表 v-bind）

style 样式：
	**:style = "{fontSize: xxx}"** 	其中xxx是动态值。`{ } 内是 js 的表达式`
	**:style = "[a,b]"** 	其中a、b是样式对象。

```html
<div id="root">
    <!-- 绑定 class 样式 -->
    <!-- 字符串 写法
		适用于：样式类名不确定，需动态指定 -->
    <!-- : 代表 v-bind -->
    <div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br/><br/>

    <!-- 数组 写法
		适用于：要绑定的样式个数不确定、名字也不确定 -->
    <div class="basic" :class="classArr">{{name}}</div> <br/><br/>

    <!-- 对象 写法
		适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
    <div class="basic" :class="classObj">{{name}}</div> <br/><br/>


    
    <!-- 绑定 style 样式 -->
    <!-- 对象 写法 -->
    <div class="basic" :style="styleObj">{{name}}</div> <br/><br/>
    
    <!-- 数组 写法 -->
    <div class="basic" :style="styleArr">{{name}}</div>
</div>

<script type="text/javascript">

    const vm = new Vue({
        el:'#root',
        data:{
            name:'t4mako',
            mood:'normal',
            classArr:['atguigu1','atguigu2','atguigu3'],
            classObj:{
                atguigu1:false,
                atguigu2:false,
            },
            styleObj:{
                fontSize: '40px',
                color:'red',
            },
            styleObj2:{
                backgroundColor:'orange'
            },
            styleArr:[
                {
                    fontSize: '40px',
                    color:'blue',
                },
                {
                    backgroundColor:'gray'
                }
            ]
        },
        methods: {
            changeMood(){
                const arr = ['happy','sad','normal']
                const index = Math.floor(Math.random()*3)
                this.mood = arr[index]
            }
        },
    })
</script>
```

## 1.10、条件渲染

### 1、 v-show

​	写法：v-show = "表达式"
​	适用于：**切换频率较高** 的场景。
​	特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉 （display  = none）

```html
<h2 v-show="false">欢迎{{name}}</h2>
<h2 v-show="1 === 1">欢迎{{name}}</h2>
```

### 2、 v-if

写法：
	① v-if = "表达式" 
	② v-else-if = "表达式"
	③ v-else = "表达式"
适用于：切换频率较低的场景。
特点：不展示的DOM元素直接被移除。

> 注：v-if 可以和 v-else-if、v-else 一起使用，但要求结构 **不能被“打断”**（处在相同 if else 的元素要紧挨在一起）

```html
<div id="root">
    <h2>当前的n值是:{{n}}</h2>
    <button @click="n++">点我n+1</button>
    <!-- 使用v-show做条件渲染 -->
    <!-- <h2 v-show="false">欢迎来到{{name}}</h2> -->
    <!-- <h2 v-show="1 === 1">欢迎来到{{name}}</h2> -->

    <!-- 使用v-if做条件渲染 -->
    <!-- <h2 v-if="false">欢迎来到{{name}}</h2> -->
    <!-- <h2 v-if="1 === 1">欢迎来到{{name}}</h2> -->

    <!-- v-else和v-else-if -->
    <!-- <div v-if="n === 1">Angular</div>
	<div v-else-if="n === 2">React</div>
	<div v-else-if="n === 3">Vue</div>
	<div v-else>哈哈</div> -->

    <!-- v-if与template的配合使用 -->
    <template v-if="n === 1">
        <h2>你好</h2>
        <h2>尚硅谷</h2>
        <h2>北京</h2>
    </template>

</div>
</body>
<script type="text/javascript">
    Vue.config.productionTip = false

    const vm = new Vue({
        el:'#root',
        data:{
            name:'city',
            n:0
        }
    })
</script>
```

内容模板（**`<template>`**）**不影响结构**，该元素是一种用于保存客户端内容机制，该内容在加载页面时不会呈现，但随后可以 在运行时使用 JavaScript 实例化。

## 1.11、v-for 列表渲染

### 1.11.1、基本列表

**v-for**：
	用于 **展示列表数据**
	语法：**v-for = "(item, index) in xxx" :key = "yyy" **（in 可以换成 of）
	可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

```html
<div id="root">
    <!-- 遍历数组 -->
    <h2>遍历数组</h2>
    <ul>
        <li v-for="(p,index) in persons" :key="index">
            {{p.name}}-{{p.age}}
        </li>
    </ul>

    <!-- 遍历对象 -->
    <h2>遍历对象</h2>
    <ul>
        <li v-for="(value,k) in car" :key="k">
            {{k}}-{{value}}
        </li>
    </ul>

    <!-- 遍历字符串 -->
    <h2>测试遍历字符串（用得少）</h2>
    <ul>
        <li v-for="(char,index) in str" :key="index">
            {{char}}-{{index}}
        </li>
    </ul>

    <!-- 遍历指定次数 -->
    <h2>测试遍历指定次数（用得少）</h2>
    <ul>
        <li v-for="(number,index) in 5" :key="index">
            {{index}}-{{number}}
        </li>
    </ul>
</div>

<script type="text/javascript">

    new Vue({
        el:'#root',
        data:{
            persons:[
                {id:'001',name:'张三',age:18},
                {id:'002',name:'李四',age:19},
                {id:'003',name:'王五',age:20}
            ],
            car:{
                name:'奥迪A8',
                price:'70万',
                color:'黑色'
            },
            str:'hello'
        }
    })
</script>
```

> 注：
> :key 的原理：
>
> 1. 虚拟 DOM 中 key 的作用：
>                                         **key** 是 **虚拟DOM对象** 的 **标识** ，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
>                                         随后Vue进行【**新**虚拟DOM】与【**旧**虚拟DOM】的 **差异比较**，比较规则如下：
>                                         
>                         2.**对比**规则：
>                                     (1).旧虚拟 DOM 中找到了与新虚拟 DOM 相同的key：
>                                                 ① 若虚拟DOM中内容没变, 直接使用之前的 真实DOM！
>                                                 ② 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
>
>                         ​            (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
>                         ​                        创建新的真实DOM，随后渲染到到页面。
>                         ​                        
>                         
>                         3. 用 **index 作为 key** 可能会引发的 **问题**：
>                                   1. 若对数据进行：**逆序添加、逆序删除等破坏顺序操作**:
>                                                   会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但**效率低**。
>                                   1. 如果结构中还**包含输入类的DOM**：
>                                                   会产生**错误DOM更新** ==> 界面有问题。
>                         4. 开发中如何选择key?:
>                                   1.最好使用每条数据的 **唯一标识作为key, 比如id、手机号、身份证号、学号** 等唯一值。
>                                   2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
>                                       使用 index 作为 key 是没有问题的。
>                         
>                         ![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230511193617.png)
>                         
>                         ![image-20230511193447250](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230511193447250.png)

```html
<li v-for="(p,index) of persons" :key="p.id">
    {{p.name}}-{{p.age}}
    <input type="text">
</li>
```

### 1.11.2、列表过滤与排序

通过 vue 对数据实现关键字 **查找** 与 **排序**

#### 列表过滤

```html
<div id="root">
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWord">
    <ul>
        <li v-for="(p,index) of filPerons" :key="index">
            {{p.name}}-{{p.age}}-{{p.sex}}
        </li>
    </ul>
</div>

<script type="text/javascript">
    //用 watch 实现
    /* new Vue({
				el:'#root',
				data:{
					keyWord:'',
					persons:[
						{id:'001',name:'马冬梅',age:19,sex:'女'},
						{id:'002',name:'周冬雨',age:20,sex:'女'},
						{id:'003',name:'周杰伦',age:21,sex:'男'},
						{id:'004',name:'温兆伦',age:22,sex:'男'}
					],
					filPerons:[]
				},
				watch:{
					keyWord:{
						immediate:true,
						handler(val){
							this.filPerons = this.persons.filter((p)=>{
								return p.name.indexOf(val) !== -1
							})
						}
					}
				}
			}) */

    //用computed实现
    new Vue({
        el:'#root',
        data:{
            keyWord:'',
            persons:[
                {id:'001',name:'马冬梅',age:19,sex:'女'},
                {id:'002',name:'周冬雨',age:20,sex:'女'},
                {id:'003',name:'周杰伦',age:21,sex:'男'},
                {id:'004',name:'温兆伦',age:22,sex:'男'}
            ]
        },
        computed:{
            filPerons(){
                return this.persons.filter((p)=>{
                    return p.name.indexOf(this.keyWord) !== -1
                })
            }
        }
    }) 
</script>
```

#### 列表排序

```html
<div id="root">
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWord">
    <button @click="sortType = 2">年龄升序</button>
    <button @click="sortType = 1">年龄降序</button>
    <button @click="sortType = 0">原顺序</button>
    <ul>
        <li v-for="(p,index) of filPerons" :key="p.id">
            {{p.name}}-{{p.age}}-{{p.sex}}
            <input type="text">
        </li>
    </ul>
</div>

<script type="text/javascript">

    new Vue({
        el:'#root',
        data:{
            keyWord:'',
            sortType:0, //0原顺序 1降序 2升序
            persons:[
                {id:'001',name:'马冬梅',age:30,sex:'女'},
                {id:'002',name:'周冬雨',age:31,sex:'女'},
                {id:'003',name:'周杰伦',age:18,sex:'男'},
                {id:'004',name:'温兆伦',age:19,sex:'男'}
            ]
        },
        computed:{
            filPerons(){
                const arr = this.persons.filter((p)=>{
                    return p.name.indexOf(this.keyWord) !== -1
                })
                //判断一下是否需要排序
                if(this.sortType){
                    arr.sort((p1,p2)=>{
                        return this.sortType === 1 ? p2.age-p1.age : p1.age-p2.age
                    })
                }
                return arr
            }
        }
    }) 
</script>
```

## 1.12、Vue 检测数据原理

Vue监视数据的原理：
	1、vue 会监视 data 中 **所有层次**（到基本数据类型，包括数组） 的数据。（添加到 _data 中，并添加 get set 方法）

​	2、如何监测对象中的数据？
​		通过setter实现监视，且要在new Vue时就传入要监测的数据。
​			对象中后追加的属性，Vue默认不做响应式处理
​		如需给后添加的属性做响应式，请使用如下API：
​			**Vue.set(target，propertyName/index，value) 或** 
​			**vm/vc.$set(target，propertyName/index，value)**

​	3、如何监测数组中的数据？
​		通过包裹数组更新元素的方法实现，本质就是做了两件事：
​			① 调用原生对应的方法对数组进行更新。
​			② 重新解析模板，进而更新页面。

​	4、在 Vue 修改数组中的某个元素一定要用如下方法：
​			使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
​			Vue.set() 或 vm.$set()

​        特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm 的根数据对象 添加属性！！！（**第一个参数必须是 vm.XXX 或 vm._data.XXX**）

### 1.12.1、模拟一个数据检测

[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法

```js
let data = {
    name:'zhangsan',
    address:'shanghai',
}

//创建一个监视的实例对象，用于监视data中属性的变化
const obs = new Observer(data)		
console.log(obs)	

//准备一个vm实例对象
let vm = {}
vm._data = data = obs

function Observer(obj){
    //汇总对象中所有的属性形成一个数组
    const keys = Object.keys(obj)
    //遍历
    keys.forEach((k)=>{
        // console.log(this);
        // this 指 Observer 对象
        Object.defineProperty(this,k,{
            get(){
                return obj[k]
            },
            set(val){
                console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
                obj[k] = val
            }
        })
    })
}
```

### 1.12.2、Vue.set()

Vue.set(vm.属性名,属性名/索引,属性值)
第一个参数也可以是 vm._data.属性名

```js
const vm = new Vue({
    el:'#root',
    data:{
        school:{
            name:'尚硅谷',
            address:'北京',
        },
        student:{
            name:'tom',
            age:{
                rAge:40,
                sAge:29,
            },
            friends:[
                {name:'jerry',age:35},
                {name:'tony',age:36}
            ]
        }
    },
    methods: {
        addSex(){
            // 给 student 添加一个属性 sex
            // Vue.set(this.student,'sex','男')
            this.$set(this.student,'sex','男')
        }
    }
})
```

### 1.12.3、Vue 检测数组原理

https://cn.vuejs.org/guide/essentials/list.html#array-change-detection

Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新
这些变更方法包括：`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`

注：通过索引更改单个元素变化不会被 Vue 监测到

```html
<script type="text/javascript">
const vm = new Vue({
    el:'#root',
    data:{
        student:{
            name:'tom',
            age:18,
            hobby:['抽烟','喝酒','烫头'],
            friends:[
                {name:'jerry',age:35},
                {name:'tony',age:36}
            ]
        }
    },
    methods: {
        addSex(){
            // Vue.set(this.student,'sex','男')
            this.$set(this.student,'sex','男')
        },
        addFriend(){
            this.student.friends.unshift({name:'jack',age:70})
        },
        updateFirstFriendName(){
            this.student.friends[0].name = '张三'
        },
        addHobby(){
            this.student.hobby.push('学习')
        },
        updateHobby(){
            // this.student.hobby.splice(0,1,'开车')
            // Vue.set(this.student.hobby,0,'开车')
            this.$set(this.student.hobby,0,'开车')
        },
        removeSmoke(){
            this.student.hobby = this.student.hobby.filter((h)=>{
                return h !== '抽烟'
            })
        }
    }
})
</script>
```

## 1.13、收集表单数据

收集表单数据：
若 \<input type="text"/>，则 v-model 收集的是 **value 值**，用户输入的就是value值。
若：\<input type="radio"/>，则 v-model收集的是 **value 值**，且要给标签配置value 值。
若：\<input type="checkbox"/>
	1.没有配置 input 的 value 属性，那么收集的就是 checked（勾选 or 未勾选，是布尔值）
	2.配置 input 的 value 属性:
		① v-model 的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
		② v-model的初始值是数组，那么收集的的就是value组成的数组

v-model的三个修饰符：
	**v-model.lazy**：失去焦点再收集数据
	**v-model.number**：输入字符串转为有效的数字
	**v-model.trim**：输入首尾空格过滤

```html
<div id="root">
    <form @submit.prevent="demo">
        账号：<input type="text" v-model.trim="userInfo.account"> <br/><br/>
        密码：<input type="password" v-model="userInfo.password"> <br/><br/>
        年龄：<input type="number" v-model.number="userInfo.age"> <br/><br/>
        性别：
        男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
        女<input type="radio" name="sex" v-model="userInfo.sex" value="female"> <br/><br/>
        爱好：
        学习<input type="checkbox" v-model="userInfo.hobby" value="study">
        打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
        吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
        <br/><br/>
        所在地
        <select v-model="userInfo.city">
            <option value="">请选择校区</option>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="shenzhen">深圳</option>
            <option value="wuhan">武汉</option>
        </select>
        <br/><br/>
        其他信息：
        <textarea v-model.lazy="userInfo.other"></textarea> <br/><br/>
        <input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>
        <button>提交</button>
    </form>
</div>
<script type="text/javascript">
    new Vue({
        el:'#root',
        data:{
            userInfo:{
                account:'',
                password:'',
                age:18, //为数字
                sex:'female',
                hobby:[], //为数组
                city:'beijing',
                other:'',
                agree:''
            }
        },
        methods: {
            demo(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```

## 1.14、过滤器

过滤器：
	定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
	语法：
		1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}} （全局过滤器 与 局部过滤器）
		2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"

​        备注：
​		1.过滤器也可以接收额外参数、多个过滤器也可以串联
​		2.并没有改变原本的数据, 是产生新的对应的数据

```html
<div id="root">
    <h2>显示格式化后的时间</h2>
    <!-- 计算属性实现 -->
    <h3>现在是：{{fmtTime}}</h3>
    <!-- methods实现 -->
    <h3>现在是：{{getFmtTime()}}</h3>
    <!-- 过滤器实现 -->
    <h3>现在是：{{time | timeFormater}}</h3>
    <!-- 过滤器实现（传参） -->
    <h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
    <h3 :x="msg | mySlice">尚硅谷</h3>
</div>
<div id="root2">
    <h2>{{msg | mySlice}}</h2>
</div>

<script type="text/javascript">
    //全局过滤器
    Vue.filter('mySlice',function(value){
        return value.slice(0,4)
    })
    new Vue({
        el:'#root',
        data:{
            time:1621561377603, //时间戳
            msg:'你好，尚硅谷'
        },
        computed: {
            fmtTime(){
                return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
            }
        },
        methods: {
            getFmtTime(){
                return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
            }
        },
        //局部过滤器
        filters:{
            timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){ //如果str有值，就传过来，没有就是默认值
                // console.log('@',value)
                // 引入外部函数 day.js
                return dayjs(value).format(str)
            }
        }
    })
    new Vue({
        el:'#root2',
        data:{
            msg:'hello,atguigu!'
        }
    })
</script>
```

## 1.15、其他内置命令

### 1、v-text 

v-text 指令：
	作用：向其所在的节点中渲染文本内容。
	与插值语法的区别：v-text会完全替换掉节点中的内容，{{xx}}则不会。

```html
<div v-text="str"></div> <!-- str为<h1>AAA</h1> 都会解析成字符串 -->
```

### 2、v-html 

v-html 指令：
	作用：向指定节点中渲染包含html结构的内容。
	与插值语法的区别：
		① v-html会替换掉节点中所有的内容，{{xx}}则不会。
		② v-html可以 **识别 html 结构**。
	严重注意：**v-html有安全性问题** ！！！！
		在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
		一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！

```html
<div v-html="str"></div> <!-- str为<h1>AAA</h1> 解析成 AAA -->
```

### 3、v-cloak

v-cloak 指令（没有值）：
	本质是一个特殊属性，**Vue实例** 创建完毕并 **接管容器** 后，会 **删掉v-cloak** 属性。
	使用 css 配合 v-cloak 可以解决网速慢时页面展示出{{xxx}}的问题。（解决页面闪现问题）

```html
<head>
    <style>
        /* 选中所有带 v-clock 属性的标签 */
        [v-cloak]{
            display:none;
        }
    </style>
</head>
<body>
    <div id="root">
        <h2 v-cloak>{{name}}</h2>
    </div>
</body>
```

### 4、v-once

v-once 指令：
	v-once 所在节点在初次动态渲染后，就视为静态内容了。（**只渲染一次**）
	以后数据的改变不会引起 v-once 所在结构的更新，可以用于优化性能。

```html
<h2 v-once>初始化的n值是:{{n}}</h2>
```

### 5、v-pre

v-pre指令：
	跳过其所在节点的编译过程。
	可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

```html
<h2 v-pre>当前的n值是:{{n}}</h2> <!-- 当前的n值是:{{n}} -->
```

## 1.16、自定义 Vue 指令

一、定义语法：

​	① 局部指令：

```js
new Vue({
    directive:{指令名:配置对象}
})

//或者

new Vue({
    directives{指令名:回调函数	}
})
```

​	② 全局指令：

```js
Vue.directive(指令名,配置对象) 
或  
Vue.directive(指令名,回调函数)
```



二、配置对象中常用的3个回调：

方法的两个参数：**当前 dom 对象**	**传入的值**

​	(1).**bind(element,binding)**：指令与元素成功**绑定时**调用。

​	(2).**inserted(element,binding)**：指令所在**元素被插入页面**时调用。

​	(3).**update(element,binding)**：指令所在模板结构被**重新解析**时调用。

三、备注：
	1.指令定义时不加v-，但使用时要加v-；
	2.指令名如果是多个单词，要使用 kebab-case（**下划线**） 命名方式，不要用camelCase命名。.

```html
<div id="root">
    <h2>当前的n值是：<span v-text="n"></span> </h2>
    <!-- <h2>放大10倍后的n值是：<span v-big-number="n"></span> </h2> -->
    <h2>放大10倍后的n值是：<span v-big="n"></span> </h2>
    <button @click="n++">点我n+1</button>
    <hr/>
    <input type="text" v-fbind:value="n">
</div>

<script type="text/javascript">

    //定义全局指令
    /* Vue.directive('fbind',{
			//指令与元素成功绑定时（一上来）
			bind(element,binding){
				element.value = binding.value
			},
			//指令所在元素被插入页面时
			inserted(element,binding){
				element.focus()
			},
			//指令所在的模板被重新解析时
			update(element,binding){
				element.value = binding.value
			}
		}) */

    new Vue({
        el:'#root',
        data:{
            n:1
        },
        directives:{
            //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
            /* 'big-number'(element,binding){
					// console.log('big')
					element.innerText = binding.value * 10
				}, */
            big(element,binding){
                console.log('big',this) //注意此处的this是window
                // console.log('big')
                element.innerText = binding.value * 10
            },
            fbind:{
                //指令与元素成功绑定时（一上来）
                bind(element,binding){
                    element.value = binding.value
                },
                //指令所在元素被插入页面时
                inserted(element,binding){
                    element.focus()
                },
                //指令所在的模板被重新解析时
                update(element,binding){
                    element.value = binding.value
                }
            }
        }
    })
</script>
```

## 1.17、Vue 生命周期

Vue 在关键时刻帮我们调用的一些特殊名称的函数
生命周期函数的名字不可更改，内容可以自由编写
**生命周期函数** 中的 **this** 指向是 **vm** 或 **组件实例** 对象。

生命周期 分为 挂载流程 ， 更新流程 ，销毁流程
`生命周期的函数：
beforeCreated()、created()、beforeMount()、mounted()、beforeUpdate()、upDdated()、beforeDestory()、destroyed()`

**常用的生命周期钩子：**
	**mounted**: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
	**beforeDestroy**: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

**mounted** 的执行时期：Vue 完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用 mounted 
（Vue-dom流程：生成虚拟dom -> 虚拟dom转换为真实dom -> dom挂载到页面上）

**关于销毁Vue实例**
	销毁后借助Vue开发者工具看不到任何信息。
	销毁后 **自定义事件** 会失效，但 **原生DOM事件** 依然有效。
	一般不会在 beforeDestroy 操作数据，因为即便操作数据，也不会再触发更新流程了。

![生命周期](https://raw.githubusercontent.com/T4mako/ImageBed/main/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)