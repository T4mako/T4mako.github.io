---
title: MongoDB
icon: article
---

[MongoDB](https://www.mongodb.com/  ) 是一个基于**分布式文件存储**的数据库

## 1、介绍

### 1.1、概念

Mongodb 中有三个重要概念：

数据库 -> 集合(表) -> 文档(行)

数据库（database）数据库服务可以创建很多数据库，**数据库**中存放很多**集合**
集合（collection） 集合类似于 **JS 中的数组**，在集合中可以**存放**很多**文档**
文档（document） **文档**是数据库中的**最小单位**，类似于 JS 中的**对象**  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230429213859.png)

### 1.2、下载

下载地址： https://www.mongodb.com/try/download/community  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230429214304.png)

将压缩包移动到 C:\Program Files 下，解压
创建 C:\data\db 目录，mongodb 会将数据**默认保存**在这个文件夹

### 1.3、启动服务

以 mongodb 中 bin 目录作为工作目录，启动命令行
运行命令 **mongod**  

看到最后的 waiting for connections 则表明服务 已经启动成功  

可以使用 **mongo** 命令连接本机的 mongodb 服务  

> 注：
> 为了方便后续方便使用 mongod 命令，可以将 bin 目录配置到环境变量 Path 中
> 千万不要选中服务端窗口的内容 ，选中会停止服务，可以 敲回车 取消选中  

## 2、基础命令

### 2.1、数据库

显示所有数据库：

```sql
show dbs
```

切换到指定的数据库（不存在自动创建）

```sql
use 数据库名
```

显示当前所在数据库  

```sql
db
```

删除当前数据库  

```sql
use 库名
db.dropDatabase()
```

### 2.2、集合

创建集合  

```sql
db.createCollection('集合名称')
db.createCollection('books')
```

显示当前数据库的所有集合  

```sql
show collections
```

删除某个集合  

```sql
db.集合名.drop();
db.books.drop();
```

重命名集合  

```sql
db.集合名.renameCollection('newName')
db.books.renameCollection('movies')
```

### 2.3、文档

插入文档

```sql
db.集合名.insert(文档对象);
db.books.insert({name:'good book',prive:80})
```

查询文档

```sql
db.集合名.find(查询条件)
db.books.find() #查询books集合中的全部
db.books.find({price:80}) #查询price字段为80的文档
```

**_id** 是 mongodb 自动生成的唯一编号，用来唯一标识文档

更新文档

```sql
db.集合名.update(查询条件,新的文档)
db.books.update({name:'A Book'},{price:100}) #查询name为A Book的对象，用{price:100}对象代替（不合逻辑）
db.books.update({name:'A Book'},{$set:{price:100}}) #查询name为A Book的对象,更新字段值（合逻辑）
```

删除文档

```sql
db.集合名.remove(查询条件) 
db.books.remove({name:'A Book'})
```

## 3、Mongoose  

[Mongoose](http://www.mongoosejs.net/  ) 是一个对象文档模型库
可以使用 **代码操作 mongodb** 数据库 

安装：

```js
npm i mongoose
```

### 3.1、使用流程

```js
//1. 导入 mongoose
const mongoose = require('mongoose');
//2. 连接数据库(ip,端口,数据库名（没有则自动创建）)
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');
//3. 设置连接回调
//连接成功（once即只连接一次）
mongoose.connection.once('open', () => {
	console.log('连接成功');
	//4. 创建文档结构对象
	let BookSchema = new mongoose.Schema({
		title: String,
		author: String,
		price: Number
	});
	//5. 创建文档模型对象（对文档crud的对象）
    // mongoose会使用集合的复数创建集合（books）
	let BookModel = mongoose.model('book', BookSchema);//集合名称，结构对象
	//6. 插入文档
	BookModel.create({
		title: '西游记',
		author: '吴承恩',
		price: 19.9
	}, (err, data) => {
		if (err) throw err;
    	//输出 data 对象
		console.log(data);
		//7. 断开连接（一般不关）
		mongoose.disconnect();
	});
});

//连接出错的回调
mongoose.connection.on('error', () => {
	console.log('连接出错~~');
})
//连接关闭的回调
	mongoose.connection.on('close', () => {
console.log('连接关闭');
})
```

### 3.2、字段类型

| 类型       | 描述                                                       |
| ---------- | ---------------------------------------------------------- |
| String     | 字符串                                                     |
| Number     | 数字                                                       |
| Boolean    | 布尔值                                                     |
| Array      | 数组，也可以使用 [] 来标识                                 |
| Date       | 日期                                                       |
| Buffer     | Buffer 对象                                                |
| Mixed      | 任意类型，需要使用 mongoose.Schema.Types.Mixed 指定        |
| ObjectId   | 对象 ID，需要使用 mongoose.Schema.Types.ObjectId 指定      |
| Decimal128 | 高精度数字，需要使用 mongoose.Schema.Types.Decimal128 指定 |

```js
let BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number，
    test: mongoose.Schema.Types.Mixed,
    test2: mongoose.Schema.Types.ObjectId
});
```



### 3.3、字段值验证

Mongoose 内置了一些验证器，可以对字段值进行验证  

① 必填

```js
title: {
    type: String,
    required: true // 设置必填项
},
```

② 默认值  

```js
author: {
    type: String,
    default: '匿名' //默认值
},
```

③ 枚举值

```js
gender: {
	type: String,
	enum: ['男','女'] //设置的值必须是数组中的
},
```

④ 唯一值  

```js
username: {
	type: String,
	unique: true
},
```

举例：

```js
let BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, //必须填
        unique: true //唯一
    },
    author: {
    	type: String,
    	default: '匿名' //默认值
    },
    gender: {
        type: String,
		enum: ['男','女'] //设置时必须是数组中的
    },
    price: Number，
    test: mongoose.Schema.Types.Mixed,
    test2: mongoose.Schema.Types.ObjectId
});
```

> 注：
> unique 需要 重建集合 才能有效果  ，即不能在旧的集合中使用

### 3.4、crud

增加（create），删除（delete），修改（update），查（read）  

#### 3.4.1、插入

插入一条：

```js
SongModel.create({
	title:'Song',
	author: 'Jay'
}, function(err, data){
	//错误
	console.log(err);
	//插入后的数据对象
	console.log(data);
});
```

批量插入：

```js
//创建模型对象
const PhoneModel = mongoose.model('phone',PhoneSchema);

PhoneModel.insertMany([
    {
        brand:'华为',
        color:'灰色',
        price:2399,
        tags:['电量大','屏幕大','信号好']
    },
    {
        brand:'小米',
        color:'白色',
        price:2099,
        tags:['电量大','屏幕大','信号好']
    }
	],(err,data)=>{
        if(err) throw err;
        console.log('写入成功');
        mongoose.connection.close();
	})
})
```

#### 3.4.2、删除

删除一条数据  

```js
SongModel.deleteOne({_id:'5dd65f32be6401035cb5b1ed'}, function(err){
    if(err) throw err;
    console.log('删除成功');
    mongoose.connection.close();
});
```

批量删除  

```js
SongModel.deleteMany({author:'Jay'}, function(err){
	if(err) throw err;
	console.log('删除成功');
	mongoose.connection.close();
});
```

#### 3.4.3、更新  

更新一条数据  

```js
//前面为条件，后面为数据，可以直接修改
SongModel.updateOne({author: 'JJ'}, {author: '林俊杰'}, function (err) {
    if(err) throw err;
    mongoose.connection.close();
});
```

批量更新数据  

```js
SongModel.updateMany({author: 'AA'}, {author: 'BB'}, function (err) {
    if(err) throw err;
    mongoose.connection.close();
});
```

#### 3.4.4、查询

查询一条数据  

```js
SongModel.findOne({author: 'name'}, function(err, data){
    if(err) throw err;
    console.log(data);
    mongoose.connection.close();
});
//根据 id 查询数据
SongModel.findById('5dd662b5381fc316b44ce167',function(err, data){
    if(err) throw err;
    console.log(data);
    mongoose.connection.close();
});
```

批量查询数据  

```js
//不加条件查询
SongModel.find(function(err, data){
    if(err) throw err;
    console.log(data);
    mongoose.connection.close();
});
//加条件查询
SongModel.find({author: 'name'}, function(err, data){
    if(err) throw err;
    console.log(data);
    mongoose.connection.close();
});
```

### 3.5、运算符

#### 3.5.1、条件运算  

在 mongodb 不能 > < >= <= !== 等运算符，需要使用替代符号  

\> 使用 $gt
< 使用 $lt
\>= 使用 $gte
<= 使用 $lte
!== 使用 $ne  

```js
BookModel.find({price: {$lt:20}},(err,data) => {
    if(err){
        console.log('failed')
        return;
    }
    console.log(data)
})
```

#### 3.5.2、逻辑运算

`$or` 逻辑或的情况  
`$and` 逻辑与的情况  

```js
BookModel.find({$or:[{author: 'name'},{autohr: 'name2'}]},(err,data) => {
    if(err){
        console.log('failed')
        return;
    }
    console.log(data)
})


BookModel.find({$and:[{price: {$gt: 30}},{autohr: 'name'}]},(err,data) => {
    if(err){
        console.log('failed')
        return;
    }
    console.log(data)
})
```

条件中可以直接使用 JS 的正则语法，通过正则可以进行模糊查询  

```js
BookModel.find({name:/n/});
```

### 3.6、个性化读取  

#### 3.6.1、字段筛选  

```js
//0:不要的字段
//1:要的字段
SongModel.find().select({_id:0,title:1}).exec(function(err,data){
	if(err) throw err;
	console.log(data);
	mongoose.connection.close();
});
```

#### 3.6.2、排序

```js
//sort 排序
//1:升序
//-1:倒序
SongModel.find().sort({hot:1}).exec(function(err,data){
	if(err) throw err;
	console.log(data);
	mongoose.connection.close();
});
```

#### 3.6.3、截取

跨过几条，截取几条

```js
//skip 跳过 limit 限定
SongModel.find().skip(10).limit(10).exec(function(err,data){
    if(err) throw err;
    console.log(data);
    mongoose.connection.close();
});
```

## 4、图形化工具

可以使用图形化的管理工具来对 Mongodb 进行交互  

Robo 3T 免费 https://github.com/Studio3T/robomongo/releases
Navicat 收费 https://www.navicat.com.cn/  