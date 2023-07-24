---
title: Elasticsearch
icon: search
---

## elasticsearch分布式搜索引擎

## 1、初识elasticsearch

### 1.1、了解ES

#### 1.1.1、elasticsearch的作用

elasticsearch是一款非常强大的**开源搜索引擎**，具备非常多强大功能，可以帮助我们**从海量数据中快速找到需要的内容**，可以用来实现搜索、日志统计、分析、系统监控等功能

#### 1.1.2、ELK技术栈

elasticsearch结合kibana、Logstash、Beats，也就是**elastic stack（ELK）**。被广泛应用在日志数据分析、实时监控等领域

而elasticsearch是elastic stack的核心，负责存储、搜索、分析数据。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230329134229.png)

#### 1.1.3、elasticsearch的发展

elasticsearch底层是基于**lucene**来实现的。

**[Lucene](https://lucene.apache.org/ )**是一个Java语言的搜索引擎类库，是Apache公司的顶级项目，由DougCutting于1999年研发。

Lucene的优势：易扩展，高性能（基于倒排索引）
Lucene的缺点：只限于Java语言开发，学习曲线陡峭，不支持水平扩展

**[elasticsearch](https://www.elastic.co/cn/)**的发展历史：
	2004年Shay Banon基于Lucene开发了Compass
	2010年Shay Banon 重写了Compass，取名为Elasticsearch。

### 1.2、倒排索引

倒排索引的概念是基于MySQL这样的正向索引而言的。

#### 1.2.1、正向索引

如果是根据**id查询**，那么直接走索引，查询**速度非常快**

但如果是基于title做**模糊查询**，只能是逐行扫描数据，流程如下：
1）用户搜索数据，条件是title符合`"%手机%"`
2）逐行获取数据，比如id为1的数据
3）判断数据中的title是否符合用户搜索条件
4）如果符合则放入结果集，不符合则丢弃。回到步骤1

**逐行扫描**，也就是全表扫描，随着数据量增加，其查询效率也会越来越低。当数据量达到数百万时，就是一场灾难。

#### 1.2.2、倒排索引

倒排索引中两个非常重要的概念：

- **文档（`Document`）**：用来搜索的数据，其中的每一条数据就是一个文档。例如一个网页、一个商品信息
- **词条（`Term`）**：对文档数据或用户搜索数据，利用某种算法分词，得到的具备含义的词语就是词条。例如：我是中国人，就可以分为：我、是、中国人、中国、国人这样的几个词条

**创建倒排索引**是对正向索引的一种特殊处理，流程如下：

- 将每一个文档的数据利用算法分词，得到一个个词条
- 创建表，每行数据包括词条、词条所在文档id、位置等信息
- 因为词条唯一性，可以给词条创建索引，例如hash表结构索引

如图：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230329140151.png)

举例：倒排索引的**搜索流程**如下（以搜索"华为手机"为例）：

1）用户输入条件`"华为手机"`进行搜索。
2）对用户输入内容**分词**，得到词条：`华为`、`手机`。
3）拿着词条在倒排索引中查找，可以得到包含词条的文档id：1、2、3。
4）拿着文档id到正向索引中查找具体文档。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230329140231.png)

#### 1.2.3、正向和倒排

- **正向索引**是最传统的，根据**id索引**的方式。但根据词条查询时，必须**先逐条获取每个文档**，然后判断文档中是否包含所需要的词条，是**根据文档找词条**的过程。

- **倒排索引**则相反，是先找到用户要搜索的词条，根据词条得到保护词条的文档的id，然后根据id获取文档。是**根据词条找文档**的过程。

|          | 正向索引                                                     | **倒排索引**                                            |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| **优点** | 可以给多个字段创建索引<br/>根据索引字段搜索、排序速度非常快  | 根据词条搜索、模糊搜索时，速度非常快                    |
| **缺点** | 根据非索引字段，或者索引字段中的部分词条查找时，只能全表扫描。 | 只能给词条创建索引，而不是字段 <br />无法根据字段做排序 |

### 1.3、es中的概念

#### 1.3.1、文档和字段

elasticserch是**面向文档**存储的，可以是数据库的一条商品数据，一个订单信息。
文档数据会被序列化为**json格式**后存储在elasticsearch中

而Json文档中往往包含很多的**字段（Field）**，类似于数据库中的列。

#### 1.3.2、索引和映射

**索引（Index）**，就是相同类型的文档的集合。

例如：
	所有用户文档，就可以组织在一起，称为用户的索引；
	所有商品的文档，可以组织在一起，称为商品的索引；
	所有订单的文档，可以组织在一起，称为订单的索引；

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230329141204.png)

因此，我们可以把**索引**当做是数据库中的**表**。

数据库的表会有约束信息，用来定义表的结构、字段的名称、类型等信息。因此，索引库中就有**映射（mapping）**，是索引中文档的字段约束信息，**类似表的结构约束**。

#### 1.3.3、mysql与elasticsearch

| **MySQL** | **Elasticsearch** | **说明**                                                     |
| --------- | ----------------- | ------------------------------------------------------------ |
| Table     | Index             | 索引(index)，就是文档的集合，类似数据库的表(table)           |
| Row       | Document          | 文档（Document），就是一条条的数据，类似数据库中的行（Row），文档都是JSON格式 |
| Column    | Field             | 字段（Field），就是JSON文档中的字段，类似数据库中的列（Column） |
| Schema    | Mapping           | Mapping（映射）是索引中文档的约束，例如字段类型约束。类似数据库的表结构（Schema） |
| SQL       | DSL               | DSL是elasticsearch提供的JSON风格的请求语句，用来操作elasticsearch，实现CRUD |

Mysql：擅长事务类型操作，可以确保数据的安全和一致性
Elasticsearch：擅长海量数据的搜索、分析、计算

因此在企业中，往往是两者结合使用：
	对安全性要求较高的写操作，使用mysql实现
	对查询性能要求较高的搜索需求，使用elasticsearch实现
	两者再基于某种方式，实现数据的同步，保证一致性

## 2、安装、部署es、kibana

### 2.1.创建网络

因为我们还需要部署**kibana容器**，因此需要让es和kibana容器互联。这里先**创建一个网络**

```sh
docker network create es-net
```

### 2.2、加载镜像

采用elasticsearch的7.12.1版本的镜像，这个镜像体积非常大，接近1G。不建议大家自己pull

将课前资料中的es.tar，kibana.tar上传到虚拟机中，然后运行命令加载即可

```sh
## 导入数据
docker load -i es.tar
docker load -i kibana.tar
```

### 2.3、部署ES

运行docker命令，部署单点es：

```sh
docker run -d \
	--name es \
    -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
    -e "discovery.type=single-node" \
    -v es-data:/usr/share/elasticsearch/data \
    -v es-plugins:/usr/share/elasticsearch/plugins \
    --privileged \
    --network es-net \
    -p 9200:9200 \
    -p 9300:9300 \
elasticsearch:7.12.1
```

```sh
docker run -d \
	--name es \
    -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \ #内存大小
    -e "discovery.type=single-node" \ #非集群模式
    -v es-data:/usr/share/elasticsearch/data \ #挂载逻辑卷，绑定es的数据目录
    -v es-plugins:/usr/share/elasticsearch/plugins \ #挂载逻辑卷，绑定es的插件目录
    --privileged \ #授予逻辑卷访问权
    --network es-net \ #加入一个名为es-net的网络中
    -p 9200:9200 \ #端口映射配置
    -p 9300:9300 \
elasticsearch:7.12.1
```

命令解释：

- `-e "cluster.name=es-docker-cluster"`：设置集群名称
- `-e "http.host=0.0.0.0"`：监听的地址，可以外网访问
- `-e "ES_JAVA_OPTS=-Xms512m -Xmx512m"`：内存大小
- `-e "discovery.type=single-node"`：非集群模式
- `-v es-data:/usr/share/elasticsearch/data`：挂载逻辑卷，绑定es的数据目录
- `-v es-logs:/usr/share/elasticsearch/logs`：挂载逻辑卷，绑定es的日志目录
- `-v es-plugins:/usr/share/elasticsearch/plugins`：挂载逻辑卷，绑定es的插件目录
- `--privileged`：授予逻辑卷访问权
- `--network es-net` ：加入一个名为es-net的网络中
- `-p 9200:9200`：端口映射配置

在浏览器中输入：http://192.168.80.130:9200 即可看到elasticsearch的响应结果：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230329151453.png)

### 2.4、部署kibana

kibana可以给我们提供一个elasticsearch的可视化界面，便于我们学习。

#### 2.4.1、部署

运行docker命令，部署kibana

```sh
docker run -d \
--name kibana \
-e ELASTICSEARCH_HOSTS=http://es:9200 \
--network=es-net \
-p 5601:5601  \
kibana:7.12.1
```

- `--network es-net` ：加入一个名为es-net的网络中，与elasticsearch在同一个网络中
- `-e ELASTICSEARCH_HOSTS=http://es:9200"`：设置elasticsearch的地址，因为kibana已经与elasticsearch在一个网络，因此可以用容器名直接访问elasticsearch
- `-p 5601:5601`：端口映射配置

kibana启动一般比较慢，需要多等待一会，可以通过命令：

```sh
docker logs -f kibana
```

查看运行日志，当查看到下面的日志，说明成功：

![image-20230329151658886](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230329151658886.png)

此时，在浏览器输入地址访问：http://192.168.80.130:5601，即可看到结果

#### 2.4.2、DevTools

kibana中提供了一个DevTools界面，这个界面中可以编写DSL来操作elasticsearch。并且对DSL语句有自动补全功能。

![image-20230330194248676](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230330194248676.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230329151743.png)

```dsl
GET _search #get请求，执行一次search
{
  "query": {
    "match_all": {}
  }
}

#模拟请求
GET /

#测试分词器
POST /_analyze
{
  "text":"T4mako太帅了,主打的就是一个无敌"
  , "analyzer": "ik_smart"
}

POST /_analyze
{
  "text":"T4mako太帅了,主打的就是一个无敌"
  , "analyzer": "ik_max_word"
}
```

## 3、安装IK分词器

es在创建倒排索引时需要对文档分词，在搜索时，需要对用户输入内容分词。但默认的分词规则对中文处理并不友好。

因此，一般会使用IK分词器

### 3.1、在线安装ik插件（较慢）

```sh
## 进入容器内部
docker exec -it es /bin/bash

## 在线下载并安装
./bin/elasticsearch-plugin  install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.12.1/elasticsearch-analysis-ik-7.12.1.zip

#退出
exit
#重启容器
docker restart elasticsearch
```

### 3.2、离线安装ik插件（推荐）

#### 1）查看数据卷目录

安装插件需要知道elasticsearch的plugins目录位置，而我们用了数据卷挂载，因此需要查看elasticsearch的数据卷目录，通过下面命令查看:

```sh
docker volume inspect es-plugins
```

显示结果：

```json
[
    {
        "CreatedAt": "2022-05-06T10:06:34+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/es-plugins/_data",
        "Name": "es-plugins",
        "Options": null,
        "Scope": "local"
    }
]
```

说明plugins目录被挂载到了：`/var/lib/docker/volumes/es-plugins/_data `这个目录中。

#### 2）解压缩分词器安装包

把课前资料中的ik分词器解压缩，重命名为ik

#### 3）上传到es容器的插件数据卷中

也就是`/var/lib/docker/volumes/es-plugins/_data `：

#### 4）重启容器

```sh
## 4、重启容器
docker restart es
```

```sh
## 查看es日志
docker logs -f es
```

#### 5）测试

IK分词器包含两种模式：
	**`ik_smart`：智能切分，组粒度
	`ik_max_word`：最细切分，细粒度**

```json
GET /_analyze
{
  "analyzer": "ik_max_word",
  "text": "程序员学习java"
}
```

### 3.3、扩展、停用词词典

随着互联网的发展，“造词运动”也越发的频繁。出现了很多新的词语，在原有的词汇列表中并不存在。
所以我们的**词汇**字典也需要**不断的更新**，IK分词器提供了**扩展词汇**的功能。

1）打开IK分词器config目录：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230329153523.png)

2）在IKAnalyzer.cfg.xml配置文件内容添加：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <comment>IK Analyzer 扩展配置</comment>
    <!--可以在这配置自己的扩展字典 *** 添加扩展词典-->
    <entry key="ext_dict">ext.dic</entry>
    <!--可以在这配置扩展停止词 *** 添加停用词词典-->
    <entry key="ext_stopwords">stopword.dic</entry>
</properties>
```

3）**新建ext.dic，stopword.dic**可以参考config目录下复制一个配置文件进行修改

```properties
T4mako
白嫖
```

4）重启elasticsearch 

```sh
docker restart es

## 查看 日志
docker logs -f elasticsearch
```

日志中已经成功加载ext.dic配置文件

5）测试效果：

```json
GET /_analyze
{
  "analyzer": "ik_max_word",
  "text": "传智播客Java就业超过90%,奥力给！"
}
```

> 注意当前文件的编码必须是 **UTF-8** 格式，严禁使用Windows记事本编辑

## 4、索引库操作

**索引库**就类似**数据库表**，**mapping映射**就类似**表的结构**。
我们要向es中存储数据，必须先创建“库”和“表”。

### 4.1、mapping属性

mapping是对索引库中文档的约束，常见的mapping属性包括：

- **type**：字段**数据类型**，常见的简单类型有：
  - **字符串**：
    	**text**（可分词的文本）
    	**keyword**（不分词，是精确值，例如：品牌、国家、ip地址）
  - **数值**：
        **long、integer、short、byte、double、float**
  - 布尔：
        boolean
  - 日期：
        date
  - 对象：
        object
- **index**：是否创建**倒排索引**，默认为true，false：将来不会参与搜索
- **analyzer**：使用哪种**分词器**
- **properties**：该字段的**子字段**

例如：

```json
{
    "age": 21, //Integer类型，参与搜索（index为true），无需分词器
    "weight": 52.1, //float
    "isMarried": false, //boolean
    "info": "Tmako", //text，分词器可以用ik_smart
    "email": "AA@itcast.cn", //字符串
    "score": [99.1, 99.5, 98.9], //float
    "name": { //object
        "firstName": "三", //name.firstName；类型为字符串但是不需要分词，因此是keyword；参与搜索，因此需要index为true；无需分词器
        "lastName": "张" //name.lastName；类型为字符串
    }
}
```

### 4.2、创建索引库

ES中通过**Restful请求操作索引库、文档**。请求内容用DSL语句来表示。创建索引库和mapping的DSL语法如下：

请求方式：PUT
请求路径：/索引库名，可以自定义
请求参数：mapping映射

```json
PUT /索引库名称
{
  "mappings": {
    "properties": {
      "字段名":{
        "type": "text",
        "analyzer": "ik_smart"
      },
      "字段名2":{
        "type": "keyword",
        "index": "false"
      },
      "字段名3":{
        "properties": {
          "子字段": {
            "type": "keyword"
          }
        }
      },
      // ...略
    }
  }
}
```

```json
//举例
PUT /test
{
  "mappings": {
    "properties": {
      "info":{
        "type": "text",
        "analyzer": "ik_smart"
      },
      "email":{
        "type": "keyword",
        "index": "falsae"
      },
      "name":{
        "properties": {
          "firstName": {
            "type": "keyword"
          }
        }
      },
      // ... 略
    }
  }
}
```

### 4.2、修改索引库

倒排索引结构虽然不复杂，但是一旦数据结构改变（比如改变了分词器），就需要重新创建倒排索引，这简直是灾难。因此索引库**一旦创建，无法修改mapping**。

虽然无法修改mapping中已有的字段，但是却**允许添加新的字段**到mapping中，因为不会对倒排索引产生影响。

```json
PUT /索引库名/_mapping
{
  "properties": {
    "新字段名":{
      "type": "integer"
    }
  }
}
```

### 4.3、查询索引库

**基本语法**：

- 请求方式：GET

- 请求路径：/索引库名

- 请求参数：无

**格式**：

```
GET /索引库名
```

### 4.4、总结

索引库的操作：
	创建索引库：PUT /索引库名
	查询索引库：GET /索引库名
	删除索引库：DELETE /索引库名
	添加字段：PUT /索引库名/_mapping

## 5、文档操作

### 5.1、新增文档

**POST**

**语法：**

```json
POST /索引库名/_doc/文档id
{
    "字段1": "值1",
    "字段2": "值2",
    "字段3": {
        "子属性1": "值3",
        "子属性2": "值4"
    },
    // ...
}
```

**示例：**

```json
POST /heima/_doc/1
{
    "info": "黑马程序员Java讲师",
    "email": "zy@itcast.cn",
    "name": {
        "firstName": "云",
        "lastName": "赵"
    }
}
```

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210720212933362.png)

### 5.2、查询文档

根据rest风格，查询是**GET**，不过查询一般都需要条件，这里我们把文档id带上。

**语法：**

```json
GET /{索引库名称}/_doc/{id}
```

**通过kibana查看数据：**

```json
GET /heima/_doc/1
```

### 5.3、删除文档

删除使用**DELETE**请求，同样，需要根据id进行删除：

**语法：**

```json
DELETE /{索引库名}/_doc/id值
```

**示例：**

```json
## 根据id删除数据
DELETE /heima/_doc/1
```

### 5.4、修改文档

修改有两种方式：

- 全量修改：直接覆盖原来的文档
- 增量修改：修改文档中的部分字段

#### 5.4.1、全量修改

全量修改是覆盖原来的文档，其本质是：

- 根据指定的id删除文档
- 新增一个相同id的文档

> **注意**：如果根据id删除时，id不存在，第二步的新增也会**执行**，也就**从修改变成了新增**操作了。

**语法：**

```json
PUT /{索引库名}/_doc/文档id
{
    "字段1": "值1",
    "字段2": "值2",
    // ... 略
}

```

**示例：**

```json
PUT /heima/_doc/1
{
    "info": "黑马程序员高级Java讲师",
    "email": "zy@itcast.cn",
    "name": {
        "firstName": "云",
        "lastName": "赵"
    }
}
```

#### 5.4.2、增量修改

增量修改是只修改指定id匹配的文档中的部分字段。

**语法：**

```json
POST /{索引库名}/_update/文档id
{
    "doc": {
         "字段名": "新的值",
    }
}
```

**示例：**

```json
POST /heima/_update/1
{
  "doc": {
    "email": "ZhaoYun@itcast.cn"
  }
}
```

### 5.5、总结

文档操作有哪些？

- 创建文档：POST /{索引库名}/_doc/文档id   { json文档 }
- 查询文档：GET /{索引库名}/_doc/文档id
- 删除文档：DELETE /{索引库名}/_doc/文档id
- 修改文档：
  - 全量修改：PUT /{索引库名}/_doc/文档id { json文档 }
  - 增量修改：POST /{索引库名}/_update/文档id { "doc": {字段}}

## 6、RestAPI

ES官方提供了各种不同语言的客户端，用来操作ES。这些客户端的本质就是组装DSL语句，通过http请求发送给ES。官方文档地址：https://www.elastic.co/guide/en/elasticsearch/client/index.html

其中的Java Rest Client又包括两种：

- Java Low Level Rest Client
- Java High Level Rest Client

我们学习的是Java HighLevel Rest Client客户端API

利用JavaRestClient实现创建、删除索引库，判断索引是否存在
根据课前资料提供的数据创建索引库，名称为hotel，mapping属性根据数据库结构定义。
基本步骤入下：
	1、导入课前资料Demo
	2、分析数据结构，定义mapping属性
	3、初始化JavaRestClient
	4、利用JavaRestClient创建索引库
	5、利用JavaRestClient删除索引库
	6、利用JavaRestClient判断索引库是否存在

### 6.0、导入、配置Demo工程

#### 6.0.1、导入工程

首先导入课前资料提供的数据库数据（tb_hotel.sql）

然后导入课前资料提供的项目（hotel-demo）

#### 6.0.2、mapping映射分析

创建索引库，最关键的是mapping映射，而mapping映射要考虑的信息包括：

- 字段名
- 字段数据类型
- 是否参与搜索
- 是否需要分词
- 如果分词，分词器是什么？

其中：

- 字段名、字段数据类型，可以参考数据表结构的名称和类型
- 是否参与搜索要分析业务来判断，例如图片地址，就无需参与搜索
- 是否分词呢要看内容，内容如果是一个整体就无需分词，反之则要分词
- 分词器，我们可以统一使用ik_max_word

酒店数据的**索引库结构**:

```json
PUT /hotel
{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword" //id设置成keyword数据类型，不参与分词
      },
      "name":{
        "type": "text", 
        "analyzer": "ik_max_word", //参与分词，ik分词器
        "copy_to": "all"
      },
      "address":{
        "type": "keyword",
        "index": false //不参与搜索
      },
      "price":{
        "type": "integer"
      },
      "score":{
        "type": "integer"
      },
      "brand":{
        "type": "keyword",
        "copy_to": "all"
      },
      "city":{
        "type": "keyword",
        "copy_to": "all"
      },
      "starName":{
        "type": "keyword"
      },
      "business":{
        "type": "keyword"
      },
      "location":{
        "type": "geo_point"
      },
      "pic":{
        "type": "keyword",
        "index": false
      },
      "all":{
        "type": "text",
        "analyzer": "ik_max_word"
      }
    }
  }
}
```

特殊字段说明：
	location：地理坐标，里面包含精度、纬度
	**all**：一个**组合字段**，其目的是将多字段的值 **利用copy_to合并**，提供给用户搜索（多字段搜索）

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210720222110126.png)

字段拷贝可以使用**copy_to**属性**将当前字段拷贝到指定字段**

#### 6.0.3、初始化JavaRestClient

1、导入es的依赖

```xml
<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>elasticsearch-rest-high-level-client</artifactId>
</dependency>
```

2、因为SpringBoot默认的ES版本是7.6.2，所以我们需要覆盖默认的ES版本：

```xml
<properties>
    <java.version>1.8</java.version>
    <elasticsearch.version>7.12.1</elasticsearch.version>
</properties>
```

3、初始化RestHighLevelClient：

初始化核心代码：

```java
RestHighLevelClient client = new RestHighLevelClient(RestClient.builder(
        HttpHost.create("http://192.168.80.130:9200")
));
```

注：为了单元测试方便，我们创建一个测试类HotelIndexTest，然后将初始化的代码编写在@BeforeEach方法中：

```java
public class HotelIndexTest {
    private RestHighLevelClient client;

    @BeforeEach
    void setUp() {
        this.client = new RestHighLevelClient(RestClient.builder(
                HttpHost.create("http://192.168.150.101:9200")
        ));
    }

    @AfterEach
    void tearDown() throws IOException {
        this.client.close();
    }
}
```

### 6.1、创建索引库

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20210720223049408.png)

代码分为三步：
	1、创建Request对象。Request是**CreateIndexRequest**
	2、添加请求参数，其实就是**DSL的JSON参数**部分。因为json字符串很长，这里是定义了**静态字符串常量**MAPPING_TEMPLATE，让代码看起来更加优雅。
	3、发送请求，**client.indices()**方法的返回值是IndicesClient类型，封装了所有与索引库操作有关的方法。

### 6.2、删除索引库

与删除的Java代码流程是类似的。依然是三步走：
	1、创建Request对象。这次是**GetIndexRequest**对象
	2、准备参数。这里是**无参**
	3、**发送请求。改用exists方法**

```java
//删除
@Test
void testDeleteHotelIndex() throws IOException {
    //1、创建Request对象
    DeleteIndexRequest request = new DeleteIndexRequest("hotel");
    //2、发送请求
    client.indices().delete(request, RequestOptions.DEFAULT);
}
```

### 6.3、判断索引库是否存在

判断索引库是否存在，本质就是查询，对应的DSL：GET /hotel

```java
//判断是否存在
@Test
void testExistHotelIndex() throws IOException {
    //1、创建Request对象
    GetIndexRequest request = new GetIndexRequest("hotel");
    //2、发送请求
    boolean exists = client.indices().exists(request, RequestOptions.DEFAULT);
    //3、输出
    System.err.println(exists? "存在": "不存在");
}
```

## 7、RestClient操作文档

利用JavaRestClient事项文档的CRUD

数据库查询酒店数据，导入到hotel索引库，实现酒店数据的CRUD

基本步骤：
	1、初始化JavaRestClient
	2、利用JavaRestClient新增酒店数据
	3、利用哦JavaRestClient根据id查询酒店数据
	4、利用JavaRestClient删除酒店数据
	5、利用JavaRestClient修改酒店数据

### 7.1、新增文档

将数据库的酒店数据查询出来，写入elasticsearch中

注意准备**两个实体类**，Hotel，HotelDoc
Hotel类型与**索引库结构存在差异**：
	longitude和latitude需要合并为location
因此，我们需要定义一个新的类型，与索引库结构吻合

新增文档的DSL语句如下：

```json
POST /{索引库名}/_doc/1
{
    "name": "Jack",
    "age": 21
}
```

对应的java代码：

```java
@Test
void testAddDocument() throws IOException {
    //根据id查询酒店数据
    Hotel hotel = service.getById(61083L);
    //装换为文档类型
    HotelDoc hotelDoc = new HotelDoc(hotel);
    //1、准备Request对象
    IndexRequest request = new IndexRequest("hotel").id(hotelDoc.getId().toString());
    //2、准备Json文档
    request.source(JSON.toJSONString(hotelDoc), XContentType.JSON);
    //3、发送请求
    client.index(request, RequestOptions.DEFAULT);
}
```

三步走：
	1）创建Request对象
	2）准备请求参数，也就是DSL中的JSON文档
	3）发送请求
			变化的地方在于，这里直接使用client.xxx()的API

### 7.2、查询文档

根据id查询到文档数据时json，需要反序列化为java对象

查询的DSL语句如下：

```json
GET /hotel/_doc/{id}
```

与之前类似，也是三步走：
	1）准备Request对象。这次是查询，所以是GetRequest
	2）发送请求，得到结果。因为是查询，这里调用client.get()方法
	3）解析结果，就是对JSON做反序列化

```java
@Test
void testGetDocumentById() throws IOException {
    //1、准备Request
    GetRequest request = new GetRequest("hotel", "61083");
    //2、发送请求，得到响应
    GetResponse response = client.get(request, RequestOptions.DEFAULT);
    //3、解析响应结果
    String json = response.getSourceAsString();
    HotelDoc hotelDoc = JSON.parseObject(json, HotelDoc.class);
    System.out.println(hotelDoc);
}
```

### 7.3、修改文档

根据id修改数据的方式有两种：
	方式一：全量修改：本质是先根据id删除，再新增
	方式二：增量修改：修改文档中的指定字段值

在RestClient的API中，全量修改与新增的API完全一致，判断依据是ID：
	如果新增时，ID已经存在，则修改
	如果新增时，ID不存在，则新增

增量修改：
与之前类似，也是三步走：
	1）准备Request对象。这次是修改，所以是UpdateRequest
	2）准备参数。也就是JSON文档，里面包含要修改的字段
	3）更新文档。这里调用client.update()方法

```java
@Test
void testUpdateDocument() throws IOException {
    // 1、准备Request
    UpdateRequest request = new UpdateRequest("hotel", "61083");
    // 2、准备请求参数
    request.doc(
        "price", "952", //注意逗号隔开
        "starName", "四钻"
    );
    // 3、发送请求
    client.update(request, RequestOptions.DEFAULT);
}
```

### 7.4、删除文档

删除的DSL为是这样的：

```json
DELETE /hotel/_doc/{id}
```

依然是三步走：
	1）准备Request对象，因为是删除，这次是DeleteRequest对象。要指定索引库名和id
	2）准备参数，无参
	3）发送请求。因为是删除，所以是client.delete()方法

```java
@Test
void testDeleteDocument() throws IOException {
    // 1.准备Request
    DeleteRequest request = new DeleteRequest("hotel", "61083");
    // 2.发送请求
    client.delete(request, RequestOptions.DEFAULT);
}
```

### 7.5、批量导入文档

批量查询数据，然后批量导入索引库中：
思路：
1、利用mybatis-plus查询酒店数据
2、将查询到的数据（Bean）装换为文档数据类型（BeanDOC）
3、利用JavaRequestClient的Bulk批处理，实现批量新增文档

```java
@Test
void testBulkRequest() throws IOException {
    // 批量查询酒店数据
    List<Hotel> hotels = service.list();

    // 1.创建Request
    BulkRequest request = new BulkRequest();
    // 2.准备参数，添加多个新增的Request
    for (Hotel hotel : hotels) {
        // 2.1.转换为文档类型HotelDoc
        HotelDoc hotelDoc = new HotelDoc(hotel);
        // 2.2.创建新增文档的Request对象
        request.add(new IndexRequest("hotel")
                    .id(hotelDoc.getId().toString())
                    .source(JSON.toJSONString(hotelDoc), XContentType.JSON));
    }
    // 3.发送请求
    client.bulk(request, RequestOptions.DEFAULT);
}
```

