---
title: Redis 基础
icon: article
---
Redis的安装位置：
**/usr/local/bin**

**启动redis：**
	cd /usr/local/bin
	redis-server /etc/redis.conf
**连接redis**：
	/usr/local/bin/redis-cli

## 1、NoSQL数据库简介

### 1.1、技术发展

技术的分类：
1、解决**功能性**的问题：Java、Jsp、RDBMS、Tomcat、HTML、Linux、JDBC、SVN
2、解决**扩展性**的问题：Struts、Spring、SpringMVC、Hibernate、Mybatis
3、解决**性能**的问题：NoSQL、Java线程、Hadoop、Nginx、MQ、ElasticSearch

#### 1.1.1、Web1.0时代

Web1.0的时代，数据访问量很有限，用一夫当关的高性能的单点服务器可以解决大部分问题。

#### 1.1.2.、Web2.0时代

随着Web2.0的时代的到来，用户访问量大幅度提升，同时产生了大量的用户数据。加上后来的智能移动设备的普及，所有的互联网平台都面临了巨大的性能挑战。

#### 1.1.3、 解决CPU及内存压力

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230212180730.png)

#### 1.1.4、解决IO压力

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230212180815.png)

### 1.2、NoSQL数据库

#### 1.2.1、NoSQL数据库概述

NoSQL(**Not Only SQL**)，意即“不仅仅是SQL”，泛指**非关系型的数据库**。 
NoSQL 不依赖业务逻辑方式存储，而以简单的key-value模式存储。因此大大的增加了数据库的扩展能力。

不遵循SQL标准。
不支持ACID。
远超于SQL的性能。

#### 1.2.2、NoSQL适用场景

对数据高并发的读写
海量数据的读写
对数据高可扩展性的

#### 1.2.3、NoSQL不适用场景

需要**事务**支持
基于sql的**结构化查询存储**，处理复杂的关系,需要即席查询。
***（用不着sql的和用了sql也不行的情况，请考虑用NoSql）***

#### 1.2.4、常见的NoSQL数据库

Memcache：|
很早出现的NoSql数据库
数据都在内存中，一般不持久化
支持简单的key-value模式，支持类型单一
一般是作为缓存数据库辅助持久化的数据库

**Redis：**
几乎覆盖了Memcached的绝大部分功能
数据都在内存中，支持持久化，主要用作备份恢复
除了支持简单的key-value模式，还支持多种数据结构的存储，比如 list、set、hash、zset等。
一般是作为缓存数据库辅助持久化的数据库

MongoDB：
高性能、开源、模式自由(schema free)的**文档型数据库**
数据都在内存中， 如果内存不足，把不常用的数据保存到硬盘
虽然是key-value模式，但是对value（尤其是**json**）提供了丰富的查询功能
支持二进制数据及大型对象
可以根据数据的特点**替代RDBMS** ，成为独立的数据库。或者配合RDBMS，存储特定的数据。

### 1.3、行式存储数据库（大数据时代）

#### 1.3.1、行式数据库

各有利弊

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230212204234.png)

#### 1.3.2、列式数据库

各有利弊

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230212204335.png)

##### 1.3.2.1、Hbase

HBase是**Hadoop**项目中的数据库。它用于需要对大量的数据进行随机、实时的读写操作的场景中。
HBase的目标就是处理数据量**非常庞大**的表，可以用**普通的计算机**处理超过**10**亿行数据**，还可处理有数百万**列元素的数据表。

##### 1.3.2.2、Cassandra

Apache Cassandra是一款免费的开源NoSQL数据库，其设计目的在于管理由大量商用服务器构建起来的庞大集群上的海量数据集(数据量通常达到**PB级别**)。在众多显著特性当中，Cassandra最为卓越的长处是对写入及读取操作进行规模调整，而且其不强调主集群的设计思路能够以相对直观的方式简化各集群的创建与扩展流程。

### 1.4、图关系型数据库

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230212204638.png)

## 2、Redis概述安装

### 2.1、概述

Redis是一个开源的key-value存储系统
和Memcached类似，它支持存储的value类型相对更多，包括string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）
这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些**操作**都是**原子性**的
在此基础上，Redis支持各种不同方式的**排序**
与memcached一样，为了保证效率，数据都是**缓存在内存**中
**区别**的是Redis会**周期性**的把更新的数据**写入磁盘**或者把修改操作写入追加的记录文件
并且在此基础上实现了**master-slave(主从)同步**

### 2.2、安装步骤

不用考虑在windows环境下对Redis的支持

下载redis 6

**①使用Xftp上传文件：**
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230213153223.png)

（使用老师的Redis）

**②使用Xshell进入终端**

准备工作：**下载安装最新版的gcc编译器**
**yum install gcc**

测试 gcc版本：
**gcc --version**
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230213153850.png)

下载redis-6.2.1.tar.gz放/opt目录
解压命令：**tar -zxvf redis-6.2.1.tar.gz**
解压完成后进入目录：**cd redis-6.2.1**
在redis-6.2.1目录下再次执行**make**命令（只是编译好）
跳过make test 继续执行: **make install**

### 2.3、安装目录：/usr/local/bin

查看默认安装目录：
redis-benchmark:性能测试工具，可以在自己本地运行，看看自己本子性能如何
redis-check-aof：修复有问题的AOF文件，rdb和aof后面讲
redis-check-dump：修复有问题的dump.rdb文件
redis-sentinel：Redis集群使用
**redis-server**：Redis服务器启动命令
**redis-cli**：客户端，操作入口

### 2.4、前台使用（不推荐）

前台启动，命令行窗口不能关闭，否则服务器停止
![image-20230213155313486](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230213155313486.png)

使用ctrl+c停止服务

### 2.5、后台启动

#### 2.5.1、备份redis.conf

拷贝一份redis.conf到其他目录
cp /opt/redis-3.2.5/redis.conf /etc/redis.conf

#### 2.5.2、后台启动设置daemonize no改成yes

修改redis.conf(128行)文件将里面的daemonize no 改成 yes，让服务在后台启动

cd /etc
vim redis.conf

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230213160945.png)

#### 2.5.3、Redis启动

cd /usr/local/bin
redis-server /etc/redis.conf

查看进程：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230213161309.png)

#### 2.5.4、用客户端访问redis-cli

#### 2.5.5、多个端口可以：redis-cli -p6379

#### 2.5.6、测试验证：ping

![image-20230213161433861](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230213161433861.png)

#### 2.5.7、Reds关闭

单实例关闭：redis-cli shutdown

也可以进入终端后通过进程kill再关闭

多实例关闭，指定端口关闭：redis-cli -p 6379 shutdown

### 2.6、Redis介绍相关知识

端口***6379***从何而来：Alessia  Merz（6379）

默认16个数据库，类似数组下标从0开始，初始默认使用0号库
使用命令 select 来切换数据库。如: select 8 
统一密码管理，所有库同样密码
dbsize查看当前数据库的key的数量
**flushdb**清空当前库
**flushall**通杀全部库

edis是单线程+多路IO复用技术

多路复用是指使用一个线程来检查多个文件描述符（Socket）的就绪状态，比如调用select和poll函数，传入多个文件描述符，如果有一个文件描述符就绪，则返回，否则阻塞直到超时。得到就绪状态后进行真正的操作可以在同一个线程里执行，也可以启动线程执行（比如使用线程池）

**串行  vs  多线程+锁（memcached） vs  单线程+多路IO复用(Redis)**

![image-20230213162353213](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230213162353213.png)

## 3、常用5大数据类型

redis常见数据类型操作命令http://www.redis.cn/commands.html

**启动redis：**
	cd /usr/local/bin
	redis-server /etc/redis.conf
**连接redis**：
	/usr/local/bin/redis-cli

### 3.1、键(key)

keys *：			查看当前库所有key  (匹配：keys *1)
exists key：	  判断某个key是否存在
type key：	    查看你的key是什么类型
del key：    	  删除指定的key数据
unlink key：     根据value选择**非阻塞删除**（仅将keys从keyspace元数据中删除，真正的删除会在后续异步操作。）
expire key 10：10秒钟：为给定的key设置过期时间
ttl key：			查看还有多少秒过期，-1表示永不过期，-2表示已过期
select：			命令切换数据库（默认有15可库）
dbsize：		   查看当前数据库的key的数量
**flushdb**：		  清空当前库
flushall：		  通杀全部库

### 3.2、字符串（String）

#### 3.2.1、简介

String是Redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value。

String类型是**二进制安全**的。意味着Redis的string可以包含任何数据。比如jpg图片或者序列化的对象。

String类型是Redis最基本的数据类型，一个Redis中字符串value最多可以是**512M**

#### 3.2.2、常用命令

set \<key> \<value>：	  添加键值对
get \<key>：					查询对应键值
append \<key>\<value>：将给定的\<value>：追加到原值的末尾
strlen \<key>：				获得值的长度
setnx \<key> \<value>：  只有在 key 不存在时  设置 key 的值
incr \<key>：				   将 key 中储存的数字值减1，只能对数字值操作，如果为空，新增值为-1decr \<key>：将 key 中储存的数字值减1，只能对数字值操作，如果为空，新增值为-1
incrby / decrby \<key> <步长>：						将 key 中储存的数字值增减，自定义步长
mset \<key1>\<value1>\<key2>\<value2>...：	 同时设置一个或多个 key-value对 
mget \<key1>\<key2>\<key3>...：				 	  同时获取一个或多个 value 
msetnx \<key1>\<value1>\<key2>\<value2>...： 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。
getrange \<key><起始位置><结束位置>：	    获得值的范围，类似java中的substring，**左闭右闭**
setrange \<key><起始位置>\<value>：			  用 \<value> **覆写**\<key>所储存的字符串值，从<起始位置>开始(索引从0开始)。
setex \<key><过期时间>\<value>：				    设置键值的同时，设置过期时间，单位秒
getset \<key>\<value>：									 以新换旧，设置了新值同时获得旧值

**redis操作时原子性的（单线程，多路IO复用）**

#### 3.2.3、底层数据结构

tring的数据结构为简单动态字符串(Simple Dynamic String,缩写SDS)。是可以修改的字符串，内部结构实现上类似于Java的ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配

内部为当前字符串实际分配的空间capacity一般要高于实际字符串长度len。当字符串长度小于1M时，扩容都是加倍现有的空间，如果超过1M，扩容时一次只会多扩1M的空间。需要注意的是字符串最大长度为512M。

### 3.3、列表（List）

#### 3.3.1、简介

**单键多值**
Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。
它的底层实际是个**双向链表**，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。

#### 3.3.2、常用命令

lpush/rpush \<key>\<value1>\<value2>\<value3> ....：从左边/右边插入一个或多个值
lpop/rpop \<key>：从左边/右边吐出一个值。**值在键在，值光键亡**
rpoplpush \<key1>\<key2>：从\<key1>列表右边吐出一个值，插到\<key2>列表左边
lrange \<key>\<start>\<stop>：按照索引下标获得元素(从左到右)
lrange \<key> 0 -1：0左边第一个，-1右边第一个，（**0-1表示获取所有**）
lindex \<key>\<index>：按照索引下标获得元素(从左到右)
llen \<key>：获得列表长度 
linsert \<key> before/after \<value> \<newvalue>：在\<value>的前、后面插入\<newvalue>插入值
lrem \<key>\<n>\<value>：从左边删除n个value(从左到右)
lset\<key>\<index>\<value>：将列表key下标为index的值替换成value

#### 3.3.3、底层数据结构

List的数据结构为快速链表quickList
首先在列表元素较少的情况下会使用一块连续的内存存储，这个结构是ziplist，也即是压缩列表。
它将所有的元素紧挨着一起存储，分配的是一块连续的内存。
当数据量比较多的时候才会改成quicklist。
因为普通的链表需要的附加指针空间太大，会比较浪费空间。
Redis将链表和ziplist结合起来组成了quicklist。也就是将多个ziplist使用双向指针串起来使用。这样既满足了快速的插入删除性能，又不会出现太大的空间冗余。

### 3.4、集合（Set）

#### 3.4.1、简介

Redis set对外提供的功能与list类似是一个列表的功能，特殊之处在于set是可以**自动去重**的，当你需要存储一个列表数据，又不希望出现重复数据时，set是一个很好的选择，并且set提供了判断某个成员是否在一个set集合内的重要接口，这个也是list所不能提供的。

Redis的Set是string类型的无序集合。它底层其实是一个value为null的hash表，所以添加，删除，查找的复杂度都是**O(1)**。

#### 3.4.2、常用命令

sadd \<key>\<value1>\<value2> ...：将一个或多个 member 元素加入到集合 key 中，已经存在的 member元素将被忽略
smembers \<key>：取出该集合的所有值。
sismember \<key>\<value>：判断集合\<key>是否为含有该\<value>值，有1，没有0
scard\<key>：返回该集合的元素个数。
srem \<key>\<value1>\<value2> ...： 删除集合中的某个元素。
spop \<key>：**随机**从该集合中吐出一个值
srandmember \<key>\<n>：随机从该集合中取出n个值。不会从集合中删除 。
smove \<key1>\<key2>\<value>：把集合中一个值从一个集合移动到另一个集合
sinter \<key1>\<key2>：返回两个集合的交集元素。
sunion \<key1>\<key2>：返回两个集合的并集元素。
sdiff \<key1>\<key2>：返回两个集合的**差集**元素(key1中的，不包含key2中的)

#### 3.4.3、底层数据结构

Set数据结构是dict字典，字典是用哈希表实现的
Java中HashSet的内部实现使用的是HashMap，只不过所有的value都指向同一个对象。Redis的set结构也是一样，它的内部也使用hash结构，所有的value都指向同一个内部值。

### 3.5、哈希（Hash）

Redis hash 是一个键值对集合。
Redis hash是一个string类型的field和value的映射表，hash特别适合用于存储对象。
类似Java里面的Map<String,Object>

#### 3.5.1、简介

Redis hash 是一个键值对集合。
Redis hash的value是一个string类型的**field和value的映射表**，hash特别适合用于存储对象。
类似Java里面的**Map<String,Object>**
用户ID为查找的key，存储的value用户对象包含姓名，年龄，生日等信息，如果用普通的key/value结构来存储

不同的存储方式：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230215162617.png)

#### 3.5.2、常用命令

hset \<key>\<field>\<value>：给\<key>集合中的 \<field>键赋值\<value>
hget \<key1>\<field>：从\<key1>集合\<field>取出 value 
hmset \<key1>\<field1>\<value1>\<field2>\<value2>... ：批量设置hash的值
hexists\<key1>\<field>：查看哈希表 key 中，给定域 field 是否存在。 
hkeys \<key>：列出该hash集合的所有field
hvals \<key>：列出该hash集合的所有value
hincrby \<key>\<field>\<increment>：为哈希表 key 中的域 field 的值加上增量 1  -1
hsetnx \<key>\<field>\<value>：将哈希表 key 中的域 field 的值设置为 value ，当且仅当域 field 不存在 

#### 3.5.3、底层数据结构

Hash类型对应的数据结构是两种：ziplist（压缩列表），hashtable（哈希表）。当field-value长度较短且个数较少时，使用ziplist，否则使用hashtable。

### 3.6、有序集合Zset（sorted set）

#### 3.6.1、简介

Redis有序集合zset与普通集合set非常相似，是一个**没有重复元素**的字符串集合。
不同之处是有序集合的每个成员都关联了一个**评分（score）**,这个评分（score）被用来按照从最低分到最高分的方式**排序**集合中的成员。集合的成员是唯一的，但是**评分可以是重复**了 。

因为元素是有序的, 所以你也可以很快的根据评分（score）或者次序（position）来获取一个范围的元素。

访问有序集合的中间元素也是非常快的,因此你能够使用有序集合作为一个没有重复成员的智能列表。

#### 3.6.2、常用命令

zadd \<key>\<score1>\<value1>\<score2>\<value2>…：将一个或多个 member 元素及其 score 值加入到有序集 key 当中。
zrange \<key>\<start>\<stop> [WITHSCORES]：返回有序集 key 中，下标在\<start>\<stop>之间的元素。带WITHSCORES，可以让分数一起和值返回到结果集。
zrangebyscore key \<min> \<max> [withscores] [limit offset count]：返回有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员。有序集成员按 score 值递增(从小到大)次序排列。 
zrevrangebyscore key \<max> \<min> [withscores] [limit offset count]  ：同上，改为从大到小排列。 
zincrby \<key>\<increment>\<value>：为元素的score加上增量
zrem \<key>\<value>：删除该集合下，指定值的元素
zcount \<key>\<min>\<max>：统计该集合，分数区间内的元素个数 
zrank \<key>\<value>：返回该值在集合中的排名，从0开始。

#### 3.6.3、底层数据结构

SortedSet(zset)是Redis提供的一个非常特别的数据结构，一方面它等价于Java的数据结构Map<String, Double>，可以给每一个元素value赋予一个权重score，另一方面它又类似于TreeSet，内部的元素会按照权重score进行排序，可以得到每个元素的名次，还可以通过score的范围来获取元素的列表。

zset底层使用了两个数据结构：
（1）hash，hash的作用就是关联元素value和权重score，保障元素value的唯一性，可以通过元素value找到相应的score值。
（2）跳跃表，跳跃表的目的在于给元素value排序，根据score的范围获取元素列表。

#### 3.6.4、跳跃表（调表）

Redis采用的是跳跃表。跳跃表效率堪比红黑树，实现远比红黑树简单。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230215171716.png)

例如查找元素51：
从第2层开始，1节点比51节点小，向后比较。
21节点比51节点小，继续向后比较，后面就是NULL了，所以从21节点向下到第1层
在第1层，41节点比51节点小，继续向后，61节点比51节点大，所以从41向下
在第0层，51节点为要查找的节点，节点被找到，共查找4次。

## 4、Redis配置文件

自己设置的redis配置文件的位置：/etc/redis.conf

### 4.1、Units单位

配置大小单位,开头定义了一些基本的度量单位，只支持bytes，不支持bit
大小写不敏感

![image-20230216150107283](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216150107283.png)

### 4.2、INCLUDES包含

类似jsp中的include，多实例的情况可以把公用的配置文件提取出来

![image-20230216150215092](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216150215092.png)

### 4.3、网络相关配置

#### 4.3.1、bind

默认情况**bind=127.0.0.1**只能接受本机的访问请求
不写的情况下，无限制接受任何ip地址的访问
生产环境肯定要写你应用服务器的地址；服务器是需要远程访问的，所以需要将其**注释掉**
如果开启了protected-mode，那么在没有设定bind ip且没有设密码的情况下，Redis只允许接受本机的响应

![image-20230216150324687](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216150324687.png)

保存配置，停止服务，重启启动查看进程，不再是本机访问了

#### 4.3.2、protected-mode

将本机访问护模式设置no

![image-20230216150406973](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216150406973.png)

#### 4.3.3、port

端口号，默认 6379

![image-20230216150437268](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216150437268.png)

#### 4.3.4、tcp-backlog

设置tcp的backlog，backlog其实是一个连接队列，backlog队列总和=未完成三次握手队列 + 已经完成三次握手队列。

在高并发环境下你需要一个高backlog值来避免慢客户端连接问题。

注意Linux内核会将这个值减小到/proc/sys/net/core/somaxconn的值（128），所以需要确认增大/proc/sys/net/core/somaxconn和/proc/sys/net/ipv4/tcp_max_syn_backlog（128）两个值来达到想要的效果

#### 4.3.5、timeout

一个空闲的客户端维持多少秒会关闭，0表示关闭该功能。即永不关闭。

#### 4.3.6、tcp-keepalive

对访问客户端的一种心跳检测，每个n秒检测一次。
单位为秒，如果设置为0，则不会进行Keepalive检测，建议设置成60 

### 4.4、GENERAL通用

#### 4.4.1、daemonize

是否为后台进程，设置为yes
守护进程，后台启动

![image-20230216150656768](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216150656768.png)

#### 4.4.2、pidfile

存放pid文件的位置，每个实例会产生一个不同的pid文件

#### 4.4.3、loglevel

指定日志记录级别，Redis总共支持四个级别：debug、verbose、notice、warning，默认为**notice**

四个级别根据使用阶段来选择，生产环境选择notice 或者warning

#### 4.4.4、logfile

日志文件名称

#### 4.4.5、database 16

设定库的数量 默认16，默认数据库为0，可以使用SELECT \<dbid>命令在连接上指定数据库id

### 4.5、SECURITY 安全

#### 4.5.1、设置密码

![image-20230216151109341](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216151109341.png)

访问密码的查看、设置和取消
在命令中设置密码，只是临时的。重启redis服务器，密码就还原了。
永久设置，需要再配置文件中进行设置。

![image-20230216151302849](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216151302849.png)

### 4.6、LIMITS限制

#### 4.6.1、maxclients

设置redis同时可以与多少个客户端进行连接。

默认情况下为10000个客户端。

如果达到了此限制，redis则会拒绝新的连接请求，并且向这些连接请求方发出“max number of clients reached”以作回应。

#### 4.6.2、maxmeory

建议**必须设置**，否则，将内存占满，造成服务器宕机

设置redis可以使用的内存量。一旦到达内存使用上限，redis将会试图移除内部数据，移除规则可以通过**maxmemory-policy**来指定。

如果redis无法根据移除规则来移除内存中的数据，或者设置了“不允许移除”，那么redis则会针对那些需要申请内存的指令返回错误信息，比如SET、LPUSH等。

但是对于无内存申请的指令，仍然会正常响应，比如GET等。如果你的redis是主redis（说明你的redis有从redis），那么在设置内存使用上限时，需要在系统中留出一些内存空间给同步队列缓存，只有在你设置的是“不移除”的情况下，才不用考虑这个因素。

#### 4.6.3、maxmemory-policy

volatile-lru：使用LRU算法移除key，只对设置了过期时间的键；（最近最少使用）
allkeys-lru：在所有集合key中，使用LRU算法移除key
volatile-random：在过期集合中移除随机的key，只对设置了过期时间的键
allkeys-random：在所有集合key中，移除随机的key
volatile-ttl：移除那些TTL值最小的key，即那些最近要过期的key
noeviction：不进行移除。针对写操作，只是返回错误信息

#### 4.6.4、maxmemory-samples

设置样本数量，LRU算法和最小TTL算法都并非是精确的算法，而是估算值，所以你可以设置样本的大小，redis默认会检查这么多个key并选择其中LRU的那个。

一般设置3到7的数字，数值越小样本越不准确，但性能消耗越小。

## 5、Redis发布和订阅

### 5.1、什么是发布和订阅

Redis 发布订阅 (pub/sub) 是一种**消息通信模式**：
发送者 (pub) 发送消息
订阅者 (sub) 接收消息。

 Redis 客户端可以订阅任意数量的频道。

### 5.2、Redis的发布和订阅

客户端可以订阅频道：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230216152128.png)

当给这个频道发布消息后，消息就会发送给订阅的客户端：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230216152211.png)

### 5.3、发布订阅命令的实现

1、打开一个客户端订阅channel1：

subscribe channel1

![image-20230216152925974](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216152925974.png)

2、打开另一个客户端，给channel1发布消息hello

publish channel1 hello
返回的1是订阅者数量

![image-20230216152950911](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216152950911.png)

## 6、Redis6新数据类型

### 6.1、Bitmaps

#### 6.1.1、简介

Redis提供了Bitmaps这个“数据类型”可以实现对位的操作：
	（1）  Bitmaps本身不是一种数据类型， 实际上它就是字符串（key-value） ， 但是它可以**对字符串的位进行操作**。
	（2）Bitmaps单独提供了一套命令， 所以在Redis中使用Bitmaps和使用字符串的方法不太相同。 可以把Bitmaps想象成一个7**以位为单位的数组**， 数组的**每个单元只能存储0和1**， 数组的**下标**在Bitmaps中叫做**偏移量**

#### 6.1.2、命令

1、setbit

格式：setbit\<key>\<offset>\<value> 设置bitmaps中某个偏移量的值（0或1）
offset:偏移量从0开始

举例：将key为users:20210101的1、6、11、15、19位设置为1

![image-20230216161852940](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216161852940.png)

2、getbit

格式：getbit\<key>\<offset>获取Bitmaps中某个偏移量的值

获取键的第offset位的值（从0开始算）：

![image-20230216161935200](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216161935200.png)

3、bitcount

统计**字符串**被设置为1的bit数
通过指定额外的 start 或 end 参数，可以让计数只在特定的位上进行
-1 表示最后一个位，-2 表示倒数第二个位

格式：bitcount\<key>[start end] 统计字符串从**start字节**到**end字节**比特值为1的数量

![image-20230216162108342](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216162108342.png)

4、bitop

格式：bitop and(or/not/xor) \<destkey> [key…]
bitop是一个复合操作， 它可以做多个Bitmaps的and（交集） 、 or（并集） 、 not（非） 、 xor（异或） 操作并将结果保存在destkey中。

举例：
2020-11-04 日访问网站的userid=1,2,5,9
	setbit unique:users:20201104 1 1
	setbit unique:users:20201104 2 1
	setbit unique:users:20201104 5 1
	setbit unique:users:20201104 9 1

2020-11-03 日访问网站的userid=0,1,4,9
	setbit unique:users:20201103 0 1
	setbit unique:users:20201103 1 1
	setbit unique:users:20201103 4 1
	setbit unique:users:20201103 9 1

计算出两天都访问过网站的用户数量：
	bitop and unique:users:and:20201104_03 unique:users:20201103 unique:users:20201104

![image-20230216165709921](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216165709921.png)

#### 6.1.3、bitmaps与set对比

用户多时或存储独立用户使用Bitmap节省很多空间
若活跃用户较少，那大部分都是0，用集合节省空间

### 6.2、HyperLogLog

#### 6.2.1、简介

在工作当中，我们经常会遇到与统计相关的功能需求，比如统计网站PV（PageView页面访问量）,可以使用Redis的incr、incrby轻松实现。

但像UV（UniqueVisitor，独立访客）、独立IP数、搜索记录数等需要去重和计数的问题如何解决？这种求集合中不重复元素个数的问题称为**基数问题**

基数：所有非重复数字

解决基数问题有很多种方案：
（1）数据存储在MySQL表中，使用distinct count计算不重复个数
（2）使用Redis提供的hash、set、bitmaps等数据结构来处理

以上的方案结果精确，但随着数据不断增加，导致占用空间越来越大，对于非常大的数据集是不切实际的。

能否能够降低一定的精度来平衡存储空间？Redis推出了**HyperLogLog**

Redis HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定的、并且是很小的。

在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

但是，因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。

#### 6.2.2、命令

1、pfadd

格式：pfadd \<key>\<element> [element ...]  添加指定元素到 HyperLogLog 中

举例：
![image-20230216171619915](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216171619915.png)

如果执行命令后HLL估计的近似基数发生变化，则返回1，否则返回0。

2、pfcount

格式：pfcount\<key> [key ...] 计算HLL的近似基数

![image-20230216171824571](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216171824571.png)

3、pfmerge

格式：pfmerge\<destkey>\<sourcekey> [sourcekey ...] 将一个或多个HLL合并后的结果存储在另一个HLL中，比如每月活跃用户可以使用每天的活跃用户来合并计算可得

![image-20230216172107315](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216172107315.png)

### 6.3、Geospatial

#### 6.3.1、简介

Redis 3.2 中增加了对GEO类型的支持。GEO，Geographic，地理信息的缩写。该类型，就是元素的2维坐标，在地图上就是经纬度。redis基于该类型，提供了经纬度设置，查询，范围查询，距离查询，经纬度Hash等常见操作。

####  6.3.2、命令

1、geoadd

格式：geoadd\<key>< longitude>\<latitude>\<member> [longitude latitude member...]  添加地理位置（经度，纬度，名称）

举例：
geoadd china:city 121.47 31.23 shanghai
geoadd china:city 106.50 29.53 chongqing 114.05 22.52 shenzhen 116.38 39.90 beijing

两极无法直接添加，一般会下载城市数据，直接通过 Java 程序一次性导入。
有效的经度从 -180 度到 180 度。有效的纬度从 -85.05112878 度到 85.05112878 度。

当坐标位置超出指定范围时，该命令将会返回一个错误。
已经添加的数据，是无法再次往里面添加的。

2、geopos 

格式：geopos \<key>\<member> [member...] 获得指定地区的坐标值

举例：![image-20230216173526297](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216173526297.png)

3、geodist

格式：geodist\<key>\<member1>\<member2> [m|km|ft|mi ] 获取两个位置之间的直线距离

举例：![image-20230216173915212](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216173915212.png)

单位：
m 表示单位为米[默认值]。
km 表示单位为千米。
mi 表示单位为英里。
ft 表示单位为英尺。
如果用户没有显式地指定单位参数， 那么 GEODIST 默认使用米作为单位

4、georadius

格式：georadius\<key>< longitude>\<latitude>radius m|km|ft|mi  以给定的经纬度为中心，找出某一半径内的元素（经度 纬度 距离 单位）

举例：
![image-20230216174034734](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230216174034734.png)

## 7、Jedis入门

### 7.1、Jedis所需jar包

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.2.0</version>
</dependency>
```

### 7.2、连接Redis注意事项

**禁用Linux的防火墙**：Linux(CentOS7)里执行命令

***systemctl stop/disable firewalld.service***  

redis.conf中注释掉bind 127.0.0.1 ,然后 protected-mode no

### 7.3、Jedis常用操作

#### 7.3.1、创建maven工程

#### 7.3.2、创建测试程序

```java
public class JedisDemo1 {
    public static void main(String[] args) {
        //创建Jedis对象
        Jedis jedis = new Jedis("192.168.80.130",6379);

        //测试
        String value = jedis.ping();
        System.out.println(value);
        
        jedis.close();
    }
}
```

### 7.4、测试相关数据类型

#### 7.4.1、Key、String

```java
@Test
public void demo1(){
    Jedis jedis = new Jedis("192.168.80.130",6379);
    //添加
    jedis.set("name","lucy");

    //获取
    String name = jedis.get("name");
    System.out.println(name);

    //设置多个key-value
    jedis.mset("k1","v1","k2","v2");
    List<String> mget = jedis.mget("k1", "k2");
    System.out.println(mget);

    //遍历key
    Set<String> keys = jedis.keys("*");
    for (String key : keys) {
        System.out.println(key);
    }
}
```

#### 7.4.2、List

```java
@Test
public void demo2(){
    Jedis jedis = new Jedis("192.168.80.130",6379);

    jedis.lpush("key1","lucy","mary","jack");
    List<String> key1 = jedis.lrange("key1", 0, -1);
    System.out.println(key1);
}
```

#### 7.4.3、set

```java
@Test
public void demo3() {
    Jedis jedis = new Jedis("192.168.80.130", 6379);

    jedis.sadd("names","lucy","jack");
    Set<String> names = jedis.smembers("names");
    System.out.println(names);
}
```

#### 7.4.4、hash

```java
@Test
public void demo4(){
    Jedis jedis = new Jedis("192.168.80.130", 6379);

    jedis.hset("users","age","20");
    String hget = jedis.hget("users", "age");
    System.out.println(hget);
}
```

#### 7.4.5、zset

```java
@Test
public void demo5(){
    Jedis jedis = new Jedis("192.168.80.130", 6379);

    jedis.zadd("china",100d,"shanghai");
    Set<String> china = jedis.zrange("china", 0, -1);
    System.out.println(china);
}
```

## 8、Jedis实例

完成一个手机验证码功能

要求：
1、输入手机号，点击发送后随机生成6位数字码，2分钟有效
2、输入验证码，点击验证，返回成功或失败
3、每个手机号每天只能输入3次

分析：
1、生成随机数：random
2、验证码二分钟有效：把验证码放入redis，设置过期时间120s
3、判断验证码是否一致：从redis获取验证码和输入的验证码进行比较
4、每个手机只能发送三次验证码：incr每次发送后+1，大于2的时候，提交不能发送

```java
public class PhoneCode {

    //1、生成6为数字验证码
    public static String getCode(){
        Random random = new Random();
        int code = 0;
        for (int i = 0; i < 6; i++) {
            code *= 10;
            code += random.nextInt(10);
        }
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append(code);
        return stringBuffer.toString();
    }

    //2、每个手机只能发送三次，验证码放到redis中，设置过期时间
    public static void verifyCode(String phone){
        //连接redis
        Jedis jedis = new Jedis("192.168.80.130", 6379);

        //拼接key
        //手机发送次数key
        String countKey = "VerifyCode" + phone + ":count";
        //验证码key
        String codeKey = "VerfyCode" + phone + ":code";

        //每个手机只能发送三次
        String count = jedis.get(codeKey);
        if(count == null){
            //没有发送次数，第一次发送
            //设置发送次数是1
            jedis.setex(countKey,24*60*60,"1");
        }else if (Integer.parseInt(count) <= 2){
            //发送次数+1
            jedis.incr(countKey);
        }else {
            System.out.println("今天的发送次数已超过三次");
            jedis.close();
            return;
        }

        //发送的验证码放到redis里
        String vcode = getCode();
        jedis.setex(codeKey,120,vcode);
        jedis.close();

        jedis.close();
    }

    //3、验证码校验
    public static void getRedisCode(String phone,String code){
        Jedis jedis = new Jedis("192.168.80.130", 6379);
        //从redis中获取验证码
        String codeKey = "VerifyCode" + phone + ":count";
        String redisCode = jedis.get(codeKey);
        //判断
        if(redisCode.equals(code)){
            System.out.println("成功");
        }else {
            System.out.println("失败");
        }
        jedis.close();
    }
}
```

## 9、SpringBoot整合Redis

### 9.1、 添加依赖

在spring boot中，可以使用Spring Data Redis来简化Redis操作

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230315210937.png)

在pom.xml文件中引入redis相关依赖

```xml
<!-- redis -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- spring2.X集成redis所需common-pool2-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

### 9.2、application中的配置

```properties
#Redis服务器地址
spring.redis.host=192.168.80.130
#Redis服务器连接端口
spring.redis.port=6379
#Redis数据库索引（默认为0）
spring.redis.database=0
#连接超时时间（毫秒）
spring.redis.timeout=1800000
#连接池最大连接数（使用负值表示没有限制）
spring.redis.lettuce.pool.max-active=20
#最大阻塞等待时间(负数表示没限制)
spring.redis.lettuce.pool.max-wait=-1
#连接池中的最大空闲连接
spring.redis.lettuce.pool.max-idle=5
#连接池中的最小空闲连接
spring.redis.lettuce.pool.min-idle=0
```

### 9.3、添加redis配置类

更改Redis的序列化器：

```java
//开启缓存
@EnableCaching
//配置类
@Configuration
public class RedisConfig extends CachingConfigurerSupport {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        template.setConnectionFactory(factory);
        //key序列化方式
        template.setKeySerializer(redisSerializer);
        //value序列化
        template.setValueSerializer(jackson2JsonRedisSerializer);
        //value hashmap序列化
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        return template;
    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        //解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        // 配置序列化（解决乱码的问题）,过期时间600秒
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(600))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer))
                .disableCachingNullValues();
        RedisCacheManager cacheManager = RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
        return cacheManager;
    }
}
```

### 9.4、测试

```java
@RestController
@RequestMapping("/redisTest")
public class RedisTestController {
    @Autowired
    private RedisTemplate redisTemplate;

    @GetMapping
    public String testRedis() {
        //设置值到redis
        redisTemplate.opsForValue().set("name","lucy");
        //从redis获取值
        String name = (String)redisTemplate.opsForValue().get("name");
        return name;
    }
}
@Test
    public void testRedisHash(){
        //操作hash
        HashOperations hashOperations = redisTemplate.opsForHash();

        hashOperations.put("002","name","xiaoming");
        hashOperations.put("002","age","20");
        hashOperations.put("002","address","jiangsu");

        String name = (String) hashOperations.get("002", "name");
        System.out.println(name);

        //获取hash结构中的所有字段
        Set keys = hashOperations.keys(002);
        for (Object key : keys) {
            System.out.println(key);
        }

        //获取hash结构中的所有值
        List values = hashOperations.values("002");
        for (Object value : values) {
            System.out.println(value);
        }
    }
    //操作list
    @Test
    public void testRedisList(){
        ListOperations listOperations = redisTemplate.opsForList();
        //存值
        listOperations.leftPush("mylief","a");
        listOperations.leftPushAll("mylist","b","c","d");

        //取值
        List<String> mylist = listOperations.range("mylist", 0, -1);
        for (String o : mylist) {
            System.out.println(o);
        }

        //获得列表的长度llen
        Long size = listOperations.size("mylist");
        int LSize = size.intValue();
        //出队列
        Object mylist1 = listOperations.rightPop("mylist");
        for (int i = 0; i < LSize; i++) {
            String element = (String) listOperations.rightPop("mylist");
            System.out.println(element);
        }
    }

//操作Set类型的数据
@Test
public void testSet(){
    SetOperations setOperations = redisTemplate.opsForSet();
    //存值
    setOperations.add("myset","a","b","c","a");
    //删除成员
    setOperations.remove("myset","a","b");
    //取值
    Set<String> mySet = setOperations.members("mySet");
    for (String s : mySet) {
        System.out.println(s);
    }

}

//操作Zset类型的数据
@Test
public void testZset(){
    ZSetOperations zSetOperations = redisTemplate.opsForZSet();

    //存值
    zSetOperations.add("myZset","a",10);
    zSetOperations.add("myZset","b",11);
    zSetOperations.add("myZset","c",12.0);
    zSetOperations.add("myZset","a",13);

    //取值
    Set<String> myZset = zSetOperations.range("myZset", 0, -1);
    for (String s : myZset) {
        System.out.println(s);
    }

    //修改分数
    zSetOperations.incrementScore("myZset","b",20.0);

    //删除成员
    zSetOperations.remove("myZset","a","b");
}

//通用操作，针对不同数类型都可以操作
@Test
public void testCommon(){
    //获取哦Reds中所有的key
    Set keys = redisTemplate.keys("*");
    //判断某个key是否存在
    Boolean itcast = redisTemplate.hasKey("itcast");
    //删除指定的key
    redisTemplate.delete("myZset");
    //获取指定key对应的value的数据类型
    DataType myset = redisTemplate.type("myset");
    System.out.println(myset.name());
}
```

## 10、Redis事务

### 10.1、Redis的事务定义

Redis事务是一个单独的隔离操作：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。
Redis事务的主要作用就是**串联多个命令，防止别的命令插队**。

### 10.2、Multi、Exec、discard

从输入Multi命令开始，输入的命令都会依次进入命令队列中，但不会执行，直到输入Exec后，Redis会将之前的命令队列中的命令依次执行。
组队的过程中可以通过discard来放弃组队。 

![image-20230219140612333](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230219140612333.png)

举例：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230219141038.png)

### 10.3、事务错误处理

（1）组队阶段报错，提交失败
组队中某个命令出现了报告错误，执行时整个的**所有**队列都会被取消。

举例：
![image-20230219141437027](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230219141437027.png)

（2）组队成功，提交有成功有失败情况
如果执行阶段某个命令报出了错误，则只有报错的命令不会被执行，而其他的命令都会执行，不会回滚。

举例：
![image-20230219141445831](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230219141445831.png)

### 10.4、事务冲突的问题

#### 10.4.1、悲观锁

**悲观锁(Pessimistic Lock)**, 顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以**每次在拿数据的时候都会上锁**，这样别人想拿这个数据就会block直到它拿到锁。**传统的关系型数据库里边就用到了很多这种锁机制**，比如**行锁**，**表锁**等，**读锁**，**写锁**等，都是在做操作之前先上锁。

**Redis默认不能直接使用悲观锁**

![image-20230219150245282](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230219150245282.png)

#### 10.4.2、乐观锁

**乐观锁(Optimistic Lock)**, 顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用**版本号**等机制。**乐观锁适用于多读的应用类型，这样可以提高吞吐量**。Redis就是利用这种check-and-set机制实现事务的。

![image-20230219150305527](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230219150305527.png)

#### 10.4.3、WATCH key [key...]

在执行multi之前，先执行watch key1 [key2],可以监视一个(或多个) key ，如果在**事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230219151206.png)

### 10.5、Redis事务三特性

①单独的隔离操作：
	**事务**中的**所有命令**都会**序列化**、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。 

②没有隔离级别的概念：
	队列中的命令**没有提交之前都不会实际被执行**，因为事务提交前任何指令都不会被实际执行

③不保证原子性
	事务中如果有一**条命令执行失败**，**其后的命令仍然会被执行**，**没有回滚 **

## 11、Redis事务案例

秒杀案例

### 11.1、解决计数器和人员记录的事务操作

![image-20230219152515148](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230219152515148.png)

### 11.2、并发模拟工具

压力测试：
使用工具ab模拟测试：
	CentOS6 默认安装
	CentOS7需要手动安装

#### 11.2.1、有网络：yum install httpd-tools

#### 11.2.3、无网络：

（1） 进入cd /run/media/root/CentOS 7 x86_64/Packages（路径跟centos6不同）
（2） 顺序安装
apr-1.4.8-3.el7.x86_64.rpm
apr-util-1.5.2-6.el7.x86_64.rpm
httpd-tools-2.4.6-67.el7.centos.x86_64.rpm 

#### 11.2.4、测试

##### 11.2.4.1、通过ab测试

使用**ab --help**查看ab的使用方式

通过**vim postfile** 在~文件夹下创建文件：模拟表单提交参数,以&符号结尾;存放当前目录
内容：prodid=1010&

ab -n 1000 -c 100 -p ~/postfile -T application/x-www-form-urlencoded http://192.168.137.221:8080/seckill
表示一共有一千个请求，有100个请求是并发的

### 11.3、超时问题

连接超时，通过连接池解决：

节省每次连接redis服务带来的消耗，把连接好的实例反复利用。
通过参数管理连接的行为

JedisPoolUtil工具类：

```java
package com.atguigu;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisPoolUtil {
	private static volatile JedisPool jedisPool = null;

	private JedisPoolUtil() {
	}

	public static JedisPool getJedisPoolInstance() {
		if (null == jedisPool) {
			synchronized (JedisPoolUtil.class) {
				if (null == jedisPool) {
					JedisPoolConfig poolConfig = new JedisPoolConfig();
					poolConfig.setMaxTotal(200);
					poolConfig.setMaxIdle(32);
					poolConfig.setMaxWaitMillis(100*1000);
					poolConfig.setBlockWhenExhausted(true);
					poolConfig.setTestOnBorrow(true);  // ping  PONG
				 
					jedisPool = new JedisPool(poolConfig, "192.168.44.168", 6379, 60000 );
				}
			}
		}
		return jedisPool;
}

	public static void release(JedisPool jedisPool, Jedis jedis) {
		if (null != jedis) {
			jedisPool.returnResource(jedis);
		}
	}
}
```

链接池参数
	MaxTotal：控制一个pool可分配多少个jedis实例，通过pool.getResource()来获取；如果赋值为-1，则表示不限制；如果pool已经分配了MaxTotal个jedis实例，则此时pool的状态为exhausted。

maxIdle：控制一个pool最多有多少个状态为idle(空闲)的jedis实例；

MaxWaitMillis：表示当borrow一个jedis实例时，最大的等待毫秒数，如果超过等待时间，则直接抛JedisConnectionException

testOnBorrow：获得一个jedis实例的时候是否检查连接可用性（ping()）；如果为true，则得到的jedis实例均是可用的

### 11.4、超卖问题

利用乐观锁淘汰用户，解决超卖问题

![image-20230219161241564](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230219161241564.png)

```java
//增加乐观锁
jedis.watch(qtkey);
 
//判断库存
String qtkeystr = jedis.get(qtkey);
if(qtkeystr==null || "".equals(qtkeystr.trim())) {
    System.out.println("未初始化库存");
    jedis.close();
    return false ;
}
int qt = Integer.parseInt(qtkeystr);
if(qt<=0) {
    System.err.println("已经秒光");
    jedis.close();
    return false;
}

//增加事务
Transaction multi = jedis.multi();
 
//减少库存
//jedis.decr(qtkey);
multi.decr(qtkey);
 
//加人
//jedis.sadd(usrkey, uid);
multi.sadd(usrkey, uid);
 
//执行事务
List<Object> list = multi.exec();
 
//判断事务提交是否失败
if(list==null || list.size()==0) {
System.out.println("秒杀失败");
jedis.close();
return false;
}
System.err.println("秒杀成功");
jedis.close();
```

### 11.5、库存遗留问题

乐观锁会造成库存遗留问题，乐观锁导致很多请求都失败。先点的没秒到，后点的可能秒到了。

#### 11.5.1、LUA脚本

**Lua**是一个小巧的**脚本语言**，Lua脚本可以很容易的**被C/C++ 代码调用**，也可以反过来**调用C/C++的函数**，Lua并没有提供强大的库，一个完整的Lua解释器不过200k，所以Lua不适合作为开发独立应用程序的语言，而是作为**嵌入式脚本语言**。

很多应用程序、游戏使用LUA作为自己的嵌入式脚本语言，以此来实现可配置性、可扩展性。这其中包括魔兽争霸地图、魔兽世界、博德之门、愤怒的小鸟等众多游戏插件或外挂。

#### 11.5.2、LUA脚本在Redis中的优势

将复杂的或者多步的redis操作，写为一个脚本，一次提交给redis执行，**减少反复连接redis的次数**。提升性能

LUA脚本是类似redis事务，有一定的原子性，不会被其他命令插队，可以完成一些redis事务性的操作

但是注意redis的lua脚本功能，只有在Redis 2.6以上的版本才可以使用

利用lua脚本淘汰用户，解决超卖问题

redis 2.6版本以后，通过lua脚本解决**争抢问题**，实际上是**redis** **利用其单线程的特性，用任务队列的方式解决多任务并发问题**。

![image-20230219162833961](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230219162833961.png)

LUA脚本：

```lua
local userid=KEYS[1]; 
local prodid=KEYS[2];
local qtkey="sk:"..prodid..":qt";
local usersKey="sk:"..prodid.":usr'; 
local userExists=redis.call("sismember",usersKey,userid);
if tonumber(userExists)==1 then 
  return 2;
end
local num= redis.call("get" ,qtkey);
if tonumber(num)<=0 then 
  return 0; 
else 
  redis.call("decr",qtkey);
  redis.call("sadd",usersKey,userid);
end
return 1;
```

## 12、Redis持久化之RDB

Redis 提供了2个不同形式的持久化方式：
	RDB（Redis DataBase）
	AOF（Append Of File）

### 12.1、RDB介绍

RDB（Redis DataBase）

在指定的**时间间隔**内将内存中的数据集**快照写入磁盘**， 也就是行话讲的Snapshot快照，它恢复时是将**快照文件直接读到内存**里

### 12.2、备份是如何执行的

Redis会单独创建（**fork**）一个**子进程**来进行持久化，会先将数据**写入到一个临时文件中**，待持久化过程都结束了，再用这个*临时文件替换上次持久化好的文件*。 整个过程中，主进程是不进行任何IO操作的，这就确保了极高的性能如果需要进行大规模数据的恢复，且对于数据恢复的完整性不是非常敏感，那RDB方式要比AOF方式更加的高效。**RDB的缺点是最后一次持久化后的数据可能丢失**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230220162243.png)

### 12.3、Fork

Fork的作用是**复制**一个与当前**进程**一样的进程。新进程的所有数据（变量、环境变量、程序计数器等） 数值都和原进程一致，但是是一个全新的进程，并**作为原进程的子进程**

在Linux程序中，fork()会产生一个和父进程完全相同的子进程，但子进程在此后多会exec系统调用，出于效率考虑，Linux中引入了“**写时复制技术**（先写入一个临时文件，替换文件的过程）”

**一般情况父进程和子进程会共用同一段物理内存**，只有进程空间的各段的内容要**发生变化**时，才会将**父进程的内容复制一份给子进程**。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230220162351.png)

### 12.4、dump.rdb文件

在redis.conf中：vim /etc/redis.conf

查找到snapshotting：

rdb的默认文件名：dump.rdb
rdb文件位置：redis的启动目录中（/usr//local/bin/）
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230220163011.png)

### 12.5、如何触发RDB快照；保持策略

配置文件中默认的快照配置：
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230220163918.png)

#### 12.5.1、命令save VS bgsave

**save** ：save时只管保存，其它不管，全部阻塞，手动保存，不建议。

**bgsave**：Redis会在后台异步进行**快照操作**，快照同时还可以响应客户端请求。可以通过lastsave 命令获取最后一次成功执行快照的时间

save格式：save 秒钟 写操作次数

RDB是整个内存的压缩过的Snapshot，RDB的数据结构，可以配置复合的快照触发条件，**默认是1分钟内改了1万次，或5分钟内改了10次，或15分钟内改了1次**。
禁用
不设置save指令，或者给save传入空字符串

#### 12.5.2、flushall命令

执行flushall命令，也会产生dump.rdb文件，但里面是空的，无意义

#### 12.5.3、stop-writes-on-bgsave-error

当Redis无法写入磁盘的话，直接关掉Redis的写操作。推荐yes.

#### 12.5.4、rdbcompression 压缩文件

对于存储到磁盘中的快照，可以设置是否进行压缩存储。如果是的话，redis会采用LZF算法进行压缩。

如果你不想消耗CPU来进行压缩的话，可以设置为关闭此功能。推荐yes.

#### 12.5.5、 rdbchecksum 检查完整性

在存储快照后，还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能。推荐yes.

##### 12.5.6、dump.rdb的备份、恢复

将rdb文件目录下（/usr/loacl/bin）的*.rdb的文件拷贝到别的地方
rdb的恢复：①关闭redis②先把备份的文件拷贝到工作目录下（ cp dump2.rdb dump.rdb）③启动Redis, 备份数据会直接加载

### 12.6、RDB的优势

①适合大规模的数据恢复
②对数据完整性和一致性要求不高更适合使用
③节省磁盘空间
④恢复速度快

### 12.7、RDB的劣势

①Fork的时候，内存中的数据被克隆了一份，大致2倍的膨胀性需要考虑
②虽然Redis在fork时使用了**写时拷贝技术**,但是如果数据庞大时还是比较消耗性能
③在备份周期在一定间隔时间做一次备份，所以**如果Redis意外down掉的话，就会丢失最后一次快照后的所有修改**

### 12.8、停止RDB

动态停止RDB：redis-cli config set save ""#save后给空值，表示禁用保存策略

### 12.9、总结

![image-20230220170054543](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230220170054543.png)

## 13、Redis持久化之AOF

### 13.1、AOF简介

AOF（Append Only File）

以**日志**的形式来记录每个**写操作**（增量保存），将Redis执行过的**所有写指令**记录下来(**读操作不记录**)， **只许追加文件但不可以改写文件**，redis启动之初会读取该文件重新构建数据，换言之，redis 重启的话就根据日志文件的内容将写指令从前到后执行一次以完成数据的恢复工作

### 13.2、AOF持久化流程

### 13.3、AOF的开启

AOF默认不开启，可以在redis.conf中配置文件名称，默认为**appendonly.aof**
AOF文件的保存路径，同RDB的路径一致。

### 13.4、AOF和RDB同时开启，系统默认取AOF的数据（数据不会存在丢失）

### 13.5、AOF启动/修复/恢复

启动：AOF的备份机制和性能虽然和RDB不同, 但是备份和恢复的操作同RDB一样，都是拷贝备份文件，需要恢复时再拷贝到Redis工作目录下，启动系统即加载

恢复：
	正常恢复：
		修改默认的appendonly no，改为yes
		将有数据aof文件名复制一份保存到对应目录（查看目录：config get dir）
		重启redis然后重新加载
	异常恢复：
		修改默认的n appendonly no，改为yes
		如遇到**AOF文件损坏**，通过/usr/local/bin/**redis-check-aof--fix appendonly.aof**进行恢复
		备份写坏的AOF文件
		恢复：重启redis，然后重新加载

### 13.6、AOF同步频率设置

在配置文件中：
appendfsync always：始终同步，每次Redis的写入都会立刻记入日志；性能较差但数据完整性比较好
appendfsync everysec：每秒同步，每秒记入日志一次，如果宕机，本秒的数据可能丢失。
appendfsync no：redis不主动进行同步，把同步时机交给操作系统。

### 13.7、Rewrite重写压缩

1、Rewrite：
当AOF文件的大小超过所设定的阈值时，Redis就会启动AOF文件的内容压缩， 只保留可以恢复数据的最小指令集.可以使用命令bgrewriteaof

2、重写原理：
AOF文件持续增长而过大时，会fork出一条新进程来将文件重写(也是先写临时文件最后再rename)，redis4.0版本后的重写，是指上就是把rdb 的快照，以二级制的形式附在新的aof头部，作为已有的历史数据，替换掉原来的流水账操作

no-appendfsync-on-rewrite：
如果 no-appendfsync-on-rewrite=yes ,不写入aof文件只写入缓存，用户请求不会阻塞，但是在这段时间如果宕机会丢失这段时间的缓存数据。（降低数据安全性，提高性能）
如果 no-appendfsync-on-rewrite=no, 还是会把数据往磁盘里刷，但是遇到重写操作，可能会发生阻塞。（数据安全，但是性能降低）

触发机制，何时重写：
Redis会记录上次重写时的AOF大小，默认配置是当***AOF文件大小是上次rewrite后大小的一倍且文件大于64M时触发**

重写虽然可以节约大量磁盘空间，减少恢复时间。但是每次重写还是有一定的负担的，因此设定Redis要满足一定条件才会进行重写：
auto-aof-rewrite-percentage：设置重写的基准值，文件达到100%时开始重写（文件是原来重写后文件的2倍时触发）
auto-aof-rewrite-min-size：设置重写的基准值，最小文件64MB。达到这个值开始重写。

3、重写流程：
（1）bgrewriteaof触发重写，判断是否当前有bgsave或bgrewriteaof在运行，如果有，则等待该命令结束后再继续执行。
（2）主进程fork出子进程执行重写操作，保证主进程不会阻塞。
（3）子进程遍历redis内存中数据到临时文件，客户端的写请求同时写入aof_buf缓冲区和aof_rewrite_buf重写缓冲区保证原AOF文件完整以及新AOF文件生成期间的新的数据修改动作不会丢失。
（4）1).子进程写完新的AOF文件后，向主进程发信号，父进程更新统计信息。2).主进程把aof_rewrite_buf中的数据写入到新的AOF文件。（5）使用新的AOF文件覆盖旧的AOF文件，完成AOF重写。

![image-20230220175403234](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230220175403234.png)

### 13.8、AOF优势

备份机制更稳健，丢失数据概率更低。
可读的日志文本，通过操作AOF稳健，可以处理误操作。

### 13.9、AOF劣势

比起RDB占用更多的磁盘空间。
恢复备份速度要慢。
每次读写都同步的话，有一定的性能压力。
存在个别Bug，造成恢复不能。

### 13.10、总结

![image-20230220175717896](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230220175717896.png)

**RDB，AOF使用建议**
官方推荐两个都启用
如果对数据不敏感，可以选单独用RDB
不建议单独用 AOF，因为可能会出现Bug
如果只是做纯内存缓存，可以都不用

## 14、Redis主从复制

### 14.1、主从复制的概念

主机数据更新后根据配置和策略， 自动同步到备机的master/slaver机制（主从机制），**Master(主)以写为主，Slave(从)以读为主**

一主多从：主服务器只能有一台，从服务器可以有多台
集群：多个一主多从

### 14.2、主从复制的作用

1、读写分离（在不同服务器进行读操作，写操作），性能扩展
2、容灾快速恢复

![image-20230221173858332](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230221173858332.png)

### 14.3、主从复制的实现

搭建一主两从的服务器：

①开启redis
②创建/myredis文件夹
③复制redis.conf配置文件到/myredis文件夹中
	开启daemonize yes
	关闭AOF，设置：appendpnly no
④配置一主多从（一主两从），创建三个配置文件：
		redis6379.conf
		redis6380.conf
		redis6381.conf

![image-20230221190907287](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230221190907287.png)

⑤在三个配置文件中写入内容（不同文件修改不同数字)

Pid文件名，指定端口port，dump.rdb名字

```vim
include /myredis/redis.conf
pidfile /var/run/redis_6379.pid
port 6379
dbfilename dump6379.rdb	
```

⑥启动三台redis

redis-server redis6379.conf

![image-20230221191343334](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230221191343334.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230221191548.png)

⑦查看三台主机运行情况

连接不同的redis服务器：**redis-cli -p 6379**
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230221191905.png)

**info replication**：打印主从复制的相关信息
![image-20230221192038152](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230221192038152.png)

在从机上执行命令，开启主从关系：slaveof 主机ip 端口号

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230221192429.png)

**在主机上可以做读写（set，get）操作，在从机上只能做读（get）操作**

### 14.4、主从复制常用操作

#### 14.4.1、一主二从

①当从服务器挂掉后（shutdown），主服务器写入数据。重启从服务器，默认为主服务器，需要创建主从关系：slaveof 主机ip 端口号，成为从服务器后，可以看到主服务器新加的数据。

②当主服务器挂掉后（shutdown），从服务器不会成为主服务器

#### 14.4.2、薪火相传

一台从服务器作为另一台从服务器的从服务器，使用slaveof 主机ip 端口号

与一主二从相同，主服务器挂掉，从服务器不会上位，主服务器开启，仍为主服务器。一旦某个slave宕机，后面的slave都没法备份

#### 14.4.3、反客为主

当一个主服务器宕机后，后面的从服务器可以立刻升为主服务器：**slaveof no one**，其后面的从服务器不用做任何修改。

### 14.5、主从复制原理

1、当从连接上主服务器后，从服务器向主服务器发送进行数据同步消息
2、主服务器接到从服务器发送过来同步消息，把从服务器数据进行持久化，把rdb文件发送给从服务器，从服务器进行读取
3、每次主服务器进行写操作后，向从服务器进行数据同步（主服务器发起的）

两个名词：
全量复制：slave服务器在接收到数据库文件数据后，将其存盘并加载到内存中。
增量复制：Master继续将新的所有收集到的修改命令依次传给slave,完成同步

### 14.6、哨兵模式（自动反客为主）

哨兵模式为**反客为主的自动版**，能够后台监控主机是否故障，如果故障了根据投票数自动将从库转换为主库

![image-20230221201438282](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230221201438282.png)

#### 14.6.1、哨兵模式的启用

①调整为一主二仆模式，6379带着6380、6381

②自定义的/myredis目录下新建**sentinel.conf**文件，名字固定不能错
配置哨兵，填写内容：**sentinel monitor mymaster 127.0.0.1 6379 1**

sentinel（哨兵）monitor（监控）
其中mymaster为监控对象起的服务器名称， 1为至少有多少个哨兵同意迁移的数量（投票）。 

③启动哨兵

**redis-sentinel sentinel.conf**

![image-20230221202821446](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230221202821446.png)

当主机挂掉，从机选举中产生新的主机
(大概10秒左右可以看到哨兵窗口日志，切换了新的主机)
哪个从机会被选举为主机呢？根据优先级别：slave-priority 
原主机重启后会变为从机。

#### 14.6.2、复制延时

由于所有的写操作都是先在Master上操作，然后同步更新到Slave上，所以从Master同步到Slave机器有一定的延迟，当系统很繁忙的时候，延迟问题会更加严重，Slave机器数量的增加也会使这个问题更加严重。

#### 14.6.3、故障恢复

![image-20230221203932529](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230221203932529.png)

**优先级**在redis.conf中默认：**replica-priority 100**，值越小优先级越高
**偏移量**是指获得原主机数据最全的
每个redis实例启动后都会随机生成一个40位的**runid**

#### 14.6.4、在java中进行主从复制

```java
private static JedisSentinelPool jedisSentinelPool=null;

public static  Jedis getJedisFromSentinel(){
	if(jedisSentinelPool==null){
        Set<String> sentinelSet = new HashSet<>();
        sentinelSet.add("192.168.11.103:26379");//IP，端口号

        JedisPoolConfig jedisPoolConfig =new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(10); //最大可用连接数
        jedisPoolConfig.setMaxIdle(5); //最大闲置连接数
        jedisPoolConfig.setMinIdle(5); //最小闲置连接数
        jedisPoolConfig.setBlockWhenExhausted(true); //连接耗尽是否等待
        jedisPoolConfig.setMaxWaitMillis(2000); //等待时间
        jedisPoolConfig.setTestOnBorrow(true); //取连接的时候进行一下测试 ping pong

        jedisSentinelPool=new JedisSentinelPool("mymaster",sentinelSet,jedisPoolConfig);
		return jedisSentinelPool.getResource();
    }else{
		return jedisSentinelPool.getResource();
    }
}
```

## 15、Redis集群

### 15.1、问题引出

Redis容量不够，redis如何进行扩容
并发写操作难，redis如何分摊
主从模式，薪火相传模式，主机宕机，导致ip地址发生变化，应用程序中配置需要修改对应的主机地址、端口等信息

之前通过**代理主机**来解决，但是redis3.0中提供了解决方案。就是**无中心化集群**配置。

**Redis集群的好处：实现扩容、分摊压力、无中心配置相对简单**

代理主机：8台服务器
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222125830.png)

**无中心化集群：6台服务器**
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222130125.png)

### 15.2、Redis集群的概念

Redis 集群实现了对Redis的水平扩容，即启动N个redis节点，将整个数据库分布存储在这N个节点中，每个节点存储总数据的1/N。
Redis 集群通过分区（partition）来提供一定程度的可用性（availability）： 即使集群中有一部分节点失效或者无法进行通讯， 集群也可以继续处理命令请求。

### 15.3、redis集群的实践

#### 15.3.1、删除所有rdb，aof文件

cd /myredis
rm -rf dump63*

#### 15.3.2、制作六个实例，修改配置

创建6个实例：6379,6380,6381,6389,6390,6391

**配置基本信息：**
开启daemonize yes、pidfile 文件名、指定端口、Dump.rdb 名字、Dump.rdb名字、Appendonly 关掉或者换名字
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222131536.png)

**配置修改：**
cluster-enabled yes  打开集群模式
cluster-config-file nodes-6379.conf 设定节点配置文件名
cluster-node-timeout 15000  设定节点失联时间，超过该时间（毫秒），集群自动进行主从切换。
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222131818.png)

修改这六个配置文件
vi编辑器的替换操作：*:%s/6379/6380*

#### 15.3.3、启动6个redis服务

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222132601.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222132631.png)

#### 15.3.4、将六个节点合成一个集群

组合之前，请确保所有redis实例启动后，nodes-xxxx.conf文件都生成正常

进入redis一开始安装的src（cd /opt/redis-6.2.1）
cd src

集成只能在src目录下进行

```linux
redis-cli --cluster create --cluster-replicas 1 192.168.80.130:6379 192.168.80.130:6380 192.168.80.130:6381 192.168.80.130:6389 192.168.80.130:6390 192.168.80.130:6391
```

此处不要用127.0.0.1， 请用真实IP地址
--replicas 1 采用最简单的方式配置集群，一台主机，一台从机，正好三组。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222133458.png)

#### 15.3.5、集群登录

普通登录方式：
redis-cli -p 端口号：可能直接进入读主机，存储数据时，会出现MOVED重定向操作。所以，应该以集群方式登录。

**集群方式登录：redis-cli -c -p 集群中任意一台端口号**
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222133832.png)

#### 15.3.6、查看集群信息

通过 **cluster nodes** 命令查看集群信息
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222134148.png)

### 15.4、redis cluster如何分配这六个节点

一个集群至少要有三个主节点。

选项 --cluster-replicas 1 表示我们希望为集群中的每个主节点创建一个从节点。

**分配原则**尽量保证每个**主数据库运行在不同的IP**地址，每个**从库和主库不在一个IP地址上**。

### 15.5、slots

一个 **Redis 集群**包含 **16384 个插槽**（hash slot），插槽平均分配， 数据库中的每个键都属于这 16384 个插槽的其中一个

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222135222.png)

集群使用公式 CRC16(key) % 16384 来**计算键 key 属于哪个槽**， 其中CRC16(key) 语句用于计算键 key 的 CRC16 校验和

**集群中的每个节点负责处理一部分插槽**。 
举个例子， 如果一个集群可以有主节点， 其中：
节点 A 负责处理 0 号至 5460 号插槽。
节点 B 负责处理 5461 号至 10922 号插槽。
节点 C 负责处理 10923 号至 16383 号插槽。

### 15.6、在集群中录入值

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222135735.png)

不在一个slot下的键值，是**不能使用mget,mset等多键操作**。

可以通过{}来定义组的概念，从而使key中**{}内相同内容的键值对**放到**一个slot**中去
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222140513.png)

### 15.7、查询集群中的值

cluster keyslot k1：根据k1查询slot值
cluster countkeysinslot 4847：查询插槽内key的个数（不同端口只能看**自己插槽中的值**）
luster getkeysinslot 4847 5：返回对应插槽（4847）中对应数目（5）的key

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230222141328.png)

### 15.8、故障恢复

如果主节点下线，从节点自动升为主节点，(15秒超时,15秒内重启好还是主机，否则为从机）
主节点挂掉后重新上线，会变成从机
如果某一段插槽的主从都挂掉：
	*redis.conf中的参数 cluster-require-full-coverage*
	如果cluster-require-full-coverage 为yes ，那么 ，整个集群都挂掉
	如果cluster-require-full-coverage 为no ，那么，**该插槽**数据全都不能使用，也无法存储，**其他插槽能够提供服务**

### 15.9、集群的Jedis开发

关闭Linux防火墙
**systemctl stop firewalld.service**

```java
@Test
public void redisClusterDemo(){
    //创建对象
    HostAndPort hostAndPort = new HostAndPort("192.168.80.130",6379);
    JedisCluster jedisCluster = new JedisCluster(hostAndPort);

    //进行操作
    jedisCluster.set("b1","value1");
    String value= jedisCluster.get("b1");
    System.out.println("value:" + value);

    jedisCluster.close();
}
```

### 15.10、Redis 集群的优劣

redis集群的好处：
**实现扩容、分摊压力、无中心配置相对简单**

redis集群的不足：
多键操作是不被支持的
多键的Redis事务是不被支持的。lua脚本不被支持
由于集群方案出现较晚，很多公司已经采用了其他的集群方案，而代理或者客户端分片的方案想要迁移至redis cluster，需要整体迁移而不是逐步过渡，复杂度较大。

## 16、应用问题解决

### 16.1、缓存穿透

#### 问题描述

![image-20230222145050453](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230222145050453.png)

现象：
1、应用服务器压力变大
2、redis命中率降低
3、一直查询数据库

原因：
1、redis查询不到数据库
2、出现很非正常url访问（如rest风格频繁访问不存在资源，而在缓存中找不到，所以一直访问数据库，失去了缓存的意义）

#### 解决方案

一个一定不存在缓存及查询不到的数据，由于缓存是不命中时被动写的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据**每次请求都要到存储层去查询**，失去了缓存的意义

*解决方案：*

**（1）**  **对空值缓存：**
如果一个查询返回的数据为空（不管是数据是否不存在），我们仍然把这个空结果（null）进行缓存，设置空结果的过期时间会很短，最长不超过五分钟（应急方案）

**（2）**  **设置可访问的名单（白名单）：**
使用bitmaps类型定义一个可以访问的名单，名单id作为bitmaps的偏移量，每次访问和bitmap里面的id进行比较，如果访问id不在bitmaps里面，进行拦截，不允许访问。（效率不高）

**（3）**  **采用布隆过滤器**：
与方案二类似
(布隆过滤器（Bloom Filter）是1970年由布隆提出的。它实际上是一个很长的二进制向量(位图)和一系列随机映射函数（哈希函数）。
布隆过滤器可以用于检索一个元素是否在一个集合中。它的**优点是空间效率和查询时间都远远超过一般的算法**，**缺点是有一定的误识别率和删除困难**。)

将所有可能存在的数据哈希到一个足够大的bitmaps中，一个一定不存在的数据会被这个bitmaps拦截掉，从而避免了对底层存储系统的查询压力。

**（4）**  **进行实时监控：**
当发现Redis的命中率开始急速降低，需要排查访问对象和访问的数据，和运维人员配合，可以设置黑名单限制服务

### 16.2、缓存击穿

#### 问题描述

![image-20230222150301413](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230222150301413.png)

现象：
1、数据库访问压力瞬时增大
2、redis里面没有出现大量ket过期
3、redis正常运行

原因：
1、redis某个key过期了，大量访问都要使用这个key

#### 解决方案

key可能会在某些时间点被超高并发地访问，是一种**非常“热点”的数据**。这个时候，需要考虑一个问题：缓存被“击穿”的问题。

解决方案：

**（1）预先设置热门数据**：
在redis高峰访问之前，把一些热门数据提前存入到redis里面，**加大这些热门数据key的时长**

**（2）实时调整**：
现场**监控哪些数据热门**，实时**调整key的过期时长**

**（3）使用锁：**
①  就是在缓存失效的时候（判断拿出来的值为空），不是立即去load db。
②  先使用缓存工具的某些带成功操作返回值的操作（比如Redis的SETNX）去set一个mutex key
③  当操作返回成功时，再进行load db的操作，并回设缓存,最后删除mutex key；
④  当操作返回失败，证明有线程在load db，当前线程睡眠一段时间再重试整个get缓存的方法。

**缺点：效率低**

![image-20230222151053788](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230222151053788.png)

### 16.3、缓存雪崩

#### 问题描述

![image-20230222151421251](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230222151421251.png)

现象：
1、数据库压力变大，导致服务器崩溃

原因：
1、在极少时间段内，查询大量key的集中过期

#### 解决方案

缓存失效时的雪崩效应对底层系统的冲击非常可怕！

解决方案：

**（1）**  **构建多级缓存架构：**
nginx缓存 + redis缓存 +其他缓存（ehcache等）（构建复杂）

**（2）**  **使用锁或队列：**
用**加锁**或者队列的方式保证来保证不会有**大量的线程对数据库一次性进行读写**，从而避免失效时大量的并发请求落到底层存储系统上。**效率极低，不适用高并发情况**

**（3）**  **设置过期标志更新缓存：**
记录缓存数据是否过期（设置提前量），**如果过期**会触发通知另外的线程在后台去**更新实际key的缓存**。

**（4）**  **将缓存失效时间分散开：**
比如我们可以**在原有的失效时间基础上增加一个随机值**，比如1-5分钟随机，这样每一个缓存的**过期时间的重复率就会降低**，就很难引发集体失效的事件。

###  16.4、分布式锁

#### 16.4.1、问题描述

随着业务发展的需要，原单体单机部署的系统被演化成分布式集群系统后，由于分**布式系统多线程、多进程**并且分布在不同机器上，这将使原**单机**部署情况下的**并发控制锁策略失效**，单纯的**Java API并不能提供分布式锁的能力**。为了解决这个问题就需要一种跨JVM的互斥机制来控制共享资源的访问，这就是分布式锁要解决的问题！

**分布式锁：加一把锁，对整个集群都有效**

 分布式锁主流的实现方案：
1、基于数据库实现分布式锁
2、基于缓存（Redis等）
3、基于Zookeeper

每一种分布式锁解决方案都有各自的优缺点：
性能：redis最高
可靠性：zookeeper最高

这里，我们就**基于redis实现分布式锁**

#### 16.4.2、使用redis实现分布式锁

使用**setnx上锁**，使用**del释放锁**
不设置过期时间，锁会一直没有释放，因此要**设置key的过期时间**，自动释放
在上锁之后，突然出现异常，无法设置过期时间。该**原子操作没有完成**。因此，要上锁的同时设置过期时间

redis命令：
setnx key value：上锁（只有当key不存在时才设置value）
del key： 释放锁， 删除指定的key数据
pire key 10：为给定的key设置过期时间10秒

***set key value nx ex time：上锁的同时设置过期时间***

多个客户端（index）获取锁的情况：
![image-20230223085248497](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230223085248497.png)

#### 16.4.3、Jedis演示

```java
@GetMapping("testLock")
public void testLock(){
    //1获取锁，setnx，设置过期时间
    Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock", "111",3, TimeUnit.SECONDS);
    //2获取锁成功、查询num的值
    if(lock){
        Object value = redisTemplate.opsForValue().get("num");
        //2.1判断num为空return
        if(StringUtils.isEmpty(value)){
            return;
        }
        //2.2有值就转成成int
        int num = Integer.parseInt(value+"");
        //2.3把redis的num加1
        redisTemplate.opsForValue().set("num", ++num);
        //2.4释放锁，del
        redisTemplate.delete("lock");
    }else{
        //3获取锁失败、每隔0.1秒再获取
        try {
            Thread.sleep(100);
            testLock();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

重启，服务集群，通过网关压力测试，查看num值
ab -n 1000 -c 100 http://192.168.137.1:8080/test/testLock

问题：setnx刚好获取到锁，业务逻辑出现异常，导致锁无法释放
解决：**设置过期时间，自动释放锁**。

#### 16.4.4、优化之UUID防误删

问题引入：
有三个操作，a操作拿到锁后未进行操作，导致锁10s过期，被操作b上锁，a的操作未进行

解决方案：引入uuid

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230223134600.png)

```java
@GetMapping("testLock")
public void testLock(){
    String uuid = UUID.randomUUID().toString();
    //1获取锁，setnx，设置过期时间
    Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock", uuid,3, TimeUnit.SECONDS);
    //2获取锁成功、查询num的值
    if(lock){
        Object value = redisTemplate.opsForValue().get("num");
        //2.1判断num为空return
        if(StringUtils.isEmpty(value)){
            return;
        }
        //2.2有值就转成成int
        int num = Integer.parseInt(value+"");
        //2.3把redis的num加1
        redisTemplate.opsForValue().set("num", ++num);
        //2.4释放锁，del
        //比较uuid值是否一样
        String lockUuid = (String) redisTemplate.opsForValue().get("lock");
        if(lockUuid.equals(uuid)){
            redisTemplate.delete("lock");
        }
    }else{
        //3获取锁失败、每隔0.1秒再获取
        try {
            Thread.sleep(100);
            testLock();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

#### 16.4.5、优化之LUA脚本保证删除的原子性

问题引入：
a，b两个操作，当a操作完后，判断uuid相同，而锁正好过期，b上锁，导致删除了b的锁

解决方案：lua脚本保证原子性

```java
@GetMapping("testLockLua")
public void testLockLua() {
    //1 声明一个uuid ,将做为一个value 放入我们的key所对应的值中
    String uuid = UUID.randomUUID().toString();
    //2 定义一个锁：lua 脚本可以使用同一把锁，来实现删除！
    String skuId = "25"; // 访问skuId 为25号的商品 100008348542
    String locKey = "lock:" + skuId; // 锁住的是每个商品的数据

    // 3 获取锁
    Boolean lock = redisTemplate.opsForValue().setIfAbsent(locKey, uuid, 3, TimeUnit.SECONDS);

    // 第一种： lock 与过期时间中间不写任何的代码。
    // redisTemplate.expire("lock",10, TimeUnit.SECONDS);//设置过期时间
    // 如果true
    if (lock) {
        // 执行的业务逻辑开始
        // 获取缓存中的num 数据
        Object value = redisTemplate.opsForValue().get("num");
        // 如果是空直接返回
        if (StringUtils.isEmpty(value)) {
            return;
        }
        // 不是空 如果说在这出现了异常！ 那么delete 就删除失败！ 也就是说锁永远存在！
        int num = Integer.parseInt(value + "");
        // 使num 每次+1 放入缓存
        redisTemplate.opsForValue().set("num", String.valueOf(++num));
        /*使用lua脚本来锁*/
        // 定义lua 脚本
        String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
        // 使用redis执行lua执行
        DefaultRedisScript<Long> redisScript = new DefaultRedisScript<>();
        redisScript.setScriptText(script);
        // 设置一下返回值类型 为Long
        // 因为删除判断的时候，返回的0,给其封装为数据类型。如果不封装那么默认返回String 类型，
        // 那么返回字符串与0 会有发生错误。
        redisScript.setResultType(Long.class);
        // 第一个要是script 脚本 ，第二个需要判断的key，第三个就是key所对应的值。
        redisTemplate.execute(redisScript, Arrays.asList(locKey), uuid);
    } else {
        // 其他线程等待
        try {
            // 睡眠
            Thread.sleep(1000);
            // 睡醒了之后，调用方法。
            testLockLua();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

####  16.4.6、总结

1、加锁

```java
// 1. 从redis中获取锁
String uuid = UUID.randomUUID().toString();
Boolean lock = this.redisTemplate.opsForValue().setIfAbsent("lock", uuid, 2, TimeUnit.SECONDS);
```

2、使用lua释放锁

```java
// 2. 释放锁 del
String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
// 设置lua脚本返回的数据类型
DefaultRedisScript<Long> redisScript = new DefaultRedisScript<>();
// 设置lua脚本返回类型为Long
redisScript.setResultType(Long.class);
redisScript.setScriptText(script);
redisTemplate.execute(redisScript, Arrays.asList("lock"),uuid);
```

3、重试

```java
Thread.sleep(500);
testLock();
```

为了确保分布式锁可用，我们至少要确保锁的实现同时**满足以下四个条件**：

①互斥性。在任意时刻，**只有一个客户端能持有锁**
②不会发生死锁。即使有一个客户端在持有锁的期间崩溃而没有主动解锁，也能保证后续其他客户端能加锁。（设置**过期时间**）
③解铃还须系铃人。**加锁和解锁必须是同一个客户端**，客户端自己不能把别人加的锁给解了
④加锁和解锁必须具有**原子性**
