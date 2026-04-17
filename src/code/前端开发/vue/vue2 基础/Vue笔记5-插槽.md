---
order: 5
icon: vue
category: 
    - Vue
tag: 
    - Vue
    - slot
---
# 插槽

作用：让 **父组件** 可以**向** **子组件** **指定位置** **插入html结构**（注意只能是结构），也是一种组件间通信的方式，适用于 **父组件 ===> 子组件**

分类：默认插槽、具名插槽、作用域插槽

[官网API](https://cn.vuejs.org/guide/components/slots.html#slots)

关于 [$slots](https://cn.vuejs.org/api/component-instance.html#slots)：一个表示父组件所传入 插槽 的对象。

## 1.1、默认插槽

**使用：**

​	父组件：

```vue
<!-- 将要插入的 html结构 写在组件标签中 -->
<!-- 控制要插入的 css样式 可以写在 父组件 与 子组件中 -->
<Category>
    <div>html结构1</div>
</Category>
```

​	子组件：

```vue
<template>
    <div>
    <!-- 定义插槽 -->
    <slot>此处写插槽的默认内容</slot>
    </div>
</template>
```

**案例：**

​	父组件 app.vue:

```vue
<div class="container">
    <Category title="美食" >
        <img src="https://XXX.jpg" alt="">
    </Category>

    <Category title="游戏" >
        <ul>
            <li v-for="(g,index) in games" :key="index">{{g}}</li>
        </ul>
    </Category>

    <Category title="电影">
        <video controls src="http://XXX.XXmp4"></video>
    </Category>
</div>
```

​	子组件 Category.vue:

```vue
<template>
	<div class="category">
		<h3>{{title}}分类</h3>
		<!-- 定义一个插槽） -->
		<slot>默认值</slot>
	</div>
</template>
```

## 1.2、具名插槽

**使用**：

​	父组件：
​		通过 **slot=""** 或 **v-slot:XXX** 获取名字 （v-slot: 加在 template 上）

```vue
<Category>
    <!-- 方式一：通过 slot="" 传递，该方法可以加在任意标签上-->
    <template slot="center">
		<div>html结构1</div>
    </template>
	<!-- 方式二：通过 v-slot:XXX 传递，该方法只能加在 template 标签上 -->
    <template v-slot:footer>
		<div>html结构2</div>
    </template>
</Category>
```

​	子组件：
​		通过 **name=""** 添加名字

```vue
<template>
	<div>
    	<!-- 定义插槽 -->
    	<slot name="center">插槽默认内容...</slot>
    	<slot name="footer">插槽默认内容...</slot>
    </div>
</template>
```

**案例**：

​	父组件：

```vue
<template>
	<div class="container">
		<Category title="美食" >
			<img slot="center" src="XXX.jpg" alt="">
			<a slot="footer" href="http://www.bilibili.com">more</a>
		</Category>

		<Category title="游戏" >
			<ul slot="center">
				<li v-for="(g,index) in games" :key="index">{{g}}</li>
			</ul>
			<div class="foot" slot="footer">
				<a href="http://www.bilibili.com">game1</a>
				<a href="http://www.bilibili.com">game2</a>
			</div>
		</Category>

		<Category title="电影">
			<video slot="center" controls src="http://XXX.mp4"></video>
			<template v-slot:footer>
				<div class="foot">
					<a href="http://www.bilibili.com">A</a>
					<a href="http://www.bilibili.com">B</a>
					<a href="http://www.bilibili.com">C</a>
				</div>
			</template>
		</Category>
	</div>
</template>
```

​	子组件：

```vue
<template>
	<div class="category">
		<h3>{{title}}分类</h3>
		<slot name="center">默认值</slot>
		<slot name="footer">默认值</slot>
	</div>
</template>
```

## 1.3、作用域插槽

当 **数据在子组件** 的自身，但 **根据数据生成的结构** 需要 **父组件来决定**。（games数据在 Category 组件中，但使用数据所遍历出来的结构由 App组件决定）

子组件在传输数据可定义多个数据
父组件在接收是接收一个大的对象

**使用：**

父组件（接受数据并使用）：
	通过 **v-slot=""** 接受数据

```vue
<Category>
    <!-- 接受一个对象，对象名为scopeData（随意） -->
    <template v-slot="scopeData">
		<!-- 生成 ul 列表结构 -->
		<ul>
    		<li v-for="g in scopeData.games" :key="g">{{g}}</li>
    	</ul>
    </template>
</Category>

<Category>
    <template v-slote="{games}"> <!-- 解构赋值 -->
		<!-- 生成 h4 结构 -->
		<h4 v-for="g in games" :key="g">{{g}}</h4>
    </template>
</Category>
```

子组件（传输数据）：
	通弄 **:xxx="xxx"** 传递数据

```vue
<template>
	<div>
        <!-- 向父组件传输数据 -->
    	<slot :games="games"></slot>
    </div>
</template>

<script>
    export default {
        name:'Category',
        //数据在子组件自身
        data() {
            return {
                games:['A','B','C','D']
            }
        },
    }
</script>
```

> 注：
>
> v-slot:XXX
> 	表示插槽的名字
>
> v-slot="XXX"
> 	表示子组件传来的数据（大对象名）