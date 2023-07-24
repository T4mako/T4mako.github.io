---
title: Docker 基础
icon: docker
category: Linux
tag:
  - docker
  - 部署
---
## Docker

```sh
systemctl start docker  # 启动docker服务
systemctl stop docker  # 停止docker服务
systemctl restart docker  # 重启docker服务
```



## 1、Docker介绍与安装

### 1.1、Docker概念

#### 1.1.1、应用部署的环境问题

微服务虽然具备各种各样的优势，但服务的拆分通用给部署带来了很大的麻烦：

- 分布式系统中，依赖的组件非常多，不同组件之间部署时往往会产生一些冲突。
- 在数百上千台服务中重复部署，环境不一定一致，会遇到各种问题

大型项目组件较多，运行环境也较为复杂，部署时会碰到一些问题：

- 依赖关系复杂，容易出现兼容性问题
- 开发、测试、生产环境有差异

#### 1.1.2、Docker解决依赖兼容问题

Docker为了解决依赖的兼容问题的，采用了两个手段：

- 将应用的Libs（函数库）、Deps（依赖）、配置与应用**一起打包**

- 将每个应用放到一个隔离**容器**去运行，避免互相干扰

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230324200128.png)

这样打包好的应用包中，既包含应用本身，也保护应用所需要的Libs、Deps，**无需再操作系统上安装这些**，自然就不存在不同应用之间的兼容问题了。

虽然解决了不同应用的兼容问题，但是开发、测试等环境会存在差异，操作系统版本也会有差异，怎么解决这些问题呢？

#### 1.1.3、Docker解决操作系统环境差异

要解决不同操作系统环境差异问题，必须先了解操作系统结构。以一个Ubuntu操作系统为例

结构包括：
	计算机硬件：例如CPU、内存、磁盘等
	系统内核：所有Linux发行版的内核都是Linux，例如CentOS、Ubuntu、Fedora等。内核可以与计算机硬件交互，对外提供**内核指令**，用于操作计算机硬件。
	**系统应用**：操作系统本身提供的应用、函数库。这些函数库是对内核指令的封装，使用更加方便。

应用于计算机交互的流程如下：
	应用调用操作系统应用（函数库），实现各种功能
	**系统函数库**是对内核指令集的封装，会调用内核指令
	内核指令操作计算机硬件

Ubuntu和CentOs都是基于Linux内核，无非是系统应用不同，**提供的函数库有差异** 
此时，如果将一个Ubuntu版本的MySQL应用安装到CentOS系统，MySQL在调用Ubuntu函数库时，会发现找不到或者不匹配，就会报错了



***Docker如何解决不同系统环境的问题？***

- Docker将用户程序与所需要调用的系统(比如Ubuntu)函数库一起打包
- Docker运行到不同操作系统时，直接基于打包的函数库，借助于操作系统的Linux内核来运行

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230324200848.png)

#### 1.1.4、小结

Docker如何解决大型项目依赖关系复杂，不同组件依赖的兼容性问题？

- Docker允许开发中将应用、依赖、函数库、配置一起**打包**，形成可移植镜像
- Docker应用运行在容器中，使用沙箱机制，相互**隔离**

Docker如何解决开发、测试、生产环境有差异的问题？

- **Docker镜像中包含完整运行环境**，包括系统函数库，仅依赖系统的Linux内核，因此可以在任意Linux操作系统上运行

Docker是一个**快速交付应用、运行应用的技术**，具备下列优势：

- 可以将程序及其依赖、运行环境一起打包为一个镜像，**可以迁移到任意Linux操作系统**
- 运行时利用沙箱机制形成隔离容器，各个应用互不干扰
- 启动、移除都可以通过一行命令完成，方便快捷

### 1.2、Docker和虚拟机的区别

Docker可以让一个应用在任何操作系统中非常方便的运行。而以前我们接触的虚拟机，也能在一个操作系统中，运行另外一个操作系统，保护系统中的任何应用。

两者的差异：

**虚拟机**（virtual machine）是在操作系统中**模拟硬件设备**，然后运行另一个操作系统，比如在 Windows 系统里面运行 Ubuntu 系统，这样就可以运行任意的Ubuntu应用了。
**Docker**仅仅是**封装函数库**，并没有模拟完整的操作系统，如图：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230324202321.png)

| 特性     | Docker   | 虚拟机   |
| -------- | -------- | -------- |
| 性能     | 接近原生 | 性能较差 |
| 硬盘占用 | 一般为MB | 一般为GB |
| 启动     | 秒级     | 分钟级   |

- docker是一个系统进程；虚拟机是在操作系统中的操作系统

- docker体积小、启动速度快、性能好；虚拟机体积大、启动速度慢、性能一般

### 1.3、Docker架构

#### 1.3.1、镜像和容器

**镜像（Image）**：Docker将应用程序及其所需的依赖、函数库、环境、配置等文件**打包在一起**，称为**镜像**

**容器（Container）**：镜像中的**应用程序运行后形成的进程**就是**容器**，只是Docker会给容器进程做隔离，对外不可见



镜像，就是把一个应用在硬盘上的文件、及其运行环境、部分系统函数库文件一起打包形成的文件包。这个文件包是**只读**的
容器，就是将这些文件中编写的程序、函数加载到内存中允许，形成进程，只不过要隔离起来。因此**一个镜像可以启动多次，形成多个容器进程**

#### 1.3.2、DockerHub

**[DockerHub](https://hub.docker.com/)**：一个Docker镜像的托管平台，这样的平台称为Docker Registry

国内也有类似于DockerHub 的公开服务，比如 [网易云镜像服务](https://c.163yun.com/hub)、[阿里云镜像库](https://cr.console.aliyun.com/)等。

一方面可以将自己的镜像共享到DockerHub，另一方面也可以从DockerHub拉取镜像

#### 1.3.3、Docker架构

我们要使用Docker来操作镜像、容器，就必须要安装Docker。

Docker是一个CS架构的程序，由两部分组成：

- 服务端(server)：Docker守护进程，负责处理Docker指令，管理镜像、容器等

- 客户端(client)：通过命令或RestAPI向Docker服务端发送指令。可以在本地或远程向服务端发送指令。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230324203906.png)

### 1.4、安装Docker

在CentOS下安装Docker：
Docker CE 支持 64 位版本 CentOS 7，并且要求内核版本不低于 3.10， CentOS 7 满足最低内核的要求

#### 1.4.1、卸载（可选）

如果之前安装过旧版本的Docker，可以使用下面命令卸载：

```
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce
```

> \ 表示命令的拼贴，表示一行写不下

#### 1.4.2、安装Docker

安装yum工具

```sh
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken
```

然后更新本地镜像源：

```sh
## 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast
```

输入命令：

```sh
yum install -y docker-ce
```

docker-ce为**社区免费版本**。稍等片刻，docker即可安装成功。

### 1.5、启动docker

Docker应用需要用到各种端口，逐一去修改防火墙设置。非常麻烦，因此建议大家直接**关闭防火墙**！
启动docker前，一定要关闭防火墙

关闭防火墙：

```sh
## 关闭
systemctl stop firewalld
## 禁止开机启动防火墙
systemctl disable firewalld
```

通过命令启动docker：

```sh
systemctl start docker  # 启动docker服务
systemctl stop docker  # 停止docker服务
systemctl restart docker  # 重启docker服务
```

然后输入命令，可以查看docker版本：

```
docker -v
```

![image-20230324205228531](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230324205228531.png)

### 1.6、配置介绍

docker官方镜像仓库网速较差，我们需要设置国内镜像服务：

参考阿里云的镜像加速文档：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230324205410.png)

## 2、Docker基本操作

### 2.1、镜像操作

#### 2.1.1、镜像名称

镜像的名称组成：

- 镜名称一般分两部分组成：[repository]:[tag]。
- 在没有指定tag时，默认是latest，代表最新版本的镜像

比如Mysql : 5.7
这里的mysql就是repository，5.7就是tag，合一起就是镜像名称，代表5.7版本的MySQL镜像。

#### 2.1.2、镜像命令

常见的镜像操作命令如图：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325201245.png)

#### 2.1.3、拉取、查看镜像

从DockerHub中拉取一个nginx镜像并查看：

1）首先去镜像仓库搜索nginx镜像，比如[DockerHub](https://hub.docker.com/):

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325201540.png)

2）根据查看到的镜像名称，拉取自己需要的镜像，通过命令：**docker pull nginx**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325201611.png)

3）通过命令：**docker images** 查看拉取到的镜像

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325201958.png)

#### 2.1.4、保存、导入镜像

利用docker save将nginx镜像导出磁盘，然后再通过load加载回来

1）**docker xx --help** 命令查看docker命令的语法

例如：docker save --help

2）**docker save** 保存镜像

docker save 的命令格式

o：output

```sh
docker save -o [保存的目标文件名称] [镜像名称]
```

使用docker save导出镜像到磁盘 

```sh
docker save -o nginx.tar nginx:latest
```

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325202433.png)

3）**docker rmi **删除镜像

```0sh
docker rmi nginx:latest
```

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325203133.png)

4）使用**docker load** 加载镜像

先删除本地的nginx镜像，然后运行命令，加载本地文件：

i：inpute

```SH
docker load -i nginx.tar
```

### 2.2、容器操作

#### 2.2.1.容器相关命令

容器操作的命令如图：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325204158.png)

容器保护三个状态：
	运行：进程正常运行
	暂停：进程暂停，CPU不再运行，并不释放内存
	停止：进程终止，回收进程占用的内存、CPU等资源

**docker ps -a**：查看全部容器命令
**docker run**：创建并运行一个容器，处于运行状态
**docker pause**：让一个运行的容器暂停
**docker unpause**：让一个容器从暂停状态恢复运行
**docker stop**：停止一个运行的容器
**docker start**：让一个停止的容器再次运行
**docker rm**：删除一个容器

#### 2.2.2、创建并运行一个容器

首先去docker hub查看Nginx的容器运行命令

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325204823.png)

 创建并运行nginx容器的命令：

```sh
docker run --name mynginx -p 80:80 -d nginx
```

**docker run** ：创建并运行一个容器
--name : 给容器起一个名字，比如叫做mn
-p ：将宿主机端口与容器端口映射，冒号**左侧是宿主机端口，右侧是容器端口**（容器是隔离环境，访问不到容器中的nginx）
-d：后台运行容器
nginx：镜像名称，例如nginx

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325205509.png)

使用 **docker ps **查看容器状态：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325205636.png)

使用 **docker log 容器名** ：查看容器日志信息

```sh
docker logs mynginx
docker logs -f mynginx #持续跟踪
```

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325210207.png)

#### 2.2.3、进入容器，修改文件

1）进入容器

```sh
docker exec -it mynginx bash
```

**docker exec** ：进入容器内部，执行一个命令
-it: 给当前进入的容器创建一个标准输入、输出终端，允许我们与容器交互
mynginx：要进入的容器的名称
bash：进入容器后执行的命令，bash是一个linux终端交互命令

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325211126.png)

2）进入nginx的HTML所在目录 /usr/share/nginx/html

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325212440.png)

容器内部会模拟一个独立的Linux文件系统，看起来如同一个linux服务器一样

```sh
cd /usr/share/nginx/html
```

3）修改index.html的内容

容器内没有vi命令，无法直接修改，我们用下面的命令来修改：

```sh
sed -i -e 's#Welcome to nginx#T4mako欢迎您#g' -e 's#<head>#<head><meta charset="utf-8">#g' index.html
```

**exit：**退出容器

**docker stop** mynginx：停止容器

**docker ps -a** （查看所有容器，不带-a是正在运行的）

**docker start mynginx**：开启容器

**docker rm** mynginx：删除容器（要先stop才能删除）

**docker rm -f** mynginx：强制删除容器

### 2.3、数据卷（容器数据管理）

在之前的nginx案例中，修改nginx的html页面时，需要进入nginx内部。并且因为没有编辑器，修改文件也很麻烦。
这就是因为**容器与数据（容器内文件）耦合**带来的后果。

要解决这个问题，必须将数据与容器解耦，这就要用到**数据卷**了。

#### 2.3.1、数据卷的概念

**数据卷（volume）**是一个虚拟目录，指向宿主机文件系统中的某个目录。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325214249.png)

一旦完成数据卷挂载，**对容器的一切操作**都会作用**在数据卷对应的宿主机目录**了。
这样，我们操作宿主机的/var/lib/docker/volumes/html目录，就等于操作容器内的/usr/share/nginx/html目录了

#### 2.3.2、数据卷操作命令

基本语法：

```sh
docker volume [COMMAND]
```

docker volume命令是数据卷操作，根据命令后**跟随的command**来确定**下一步**的操作：

**create** 			创建一个volume
**inspect** 		  显示一个或多个volume的信息
**ls** 					列出所有的volume
**prune** 			 删除未使用的volume
**rm** 				  删除一个或多个指定的volume

#### 2.3.3、创建和查看数据卷

创建一个数据卷，并查看数据卷在宿主机的目录位置

```sh
docker volume create html    #创建数据卷
docker volume ls		    #查看所有数据
docker volume inspect html   #docker volume inspect html
```

可以看到，我们创建的html这个数据卷关联的宿主机目录为`/var/lib/docker/volumes/html/_data`目录。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325215020.png)

#### 2.3.4、挂载数据卷

在创建容器时，可以通过 -v 参数来挂载一个数据卷到某个容器内目录，命令格式如下：

```sh
docker run \
  --name mynginx \
  -v html:/usr/share/nginx/html \
  -p 80:80
  -d
  nginx \
```

> **注意：如果容器运行时volume不存在，会被自动创建出来**（即无需创建卷，在容器创建时直接挂在卷即可）

#### 2.3.6、挂载本地目录

容器不仅仅可以挂载数据卷，也可以直接挂载到宿主机目录上。关联关系如下：

- 带数据卷模式：宿主机目录 --> 数据卷 ---> 容器内目录
- **直接挂载**模式：宿主机目录 ---> 容器内目录

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325221338.png)

目录挂载与数据卷挂载的语法是类似的：

- -v [宿主机目录]:[容器内目录]
- -v [宿主机文件]:[容器内文件]

举例：
创建并运行一个MySQL容器，将宿主机目录直接挂载到容器
	1）在将课前资料中的mysql.tar文件上传到虚拟机，通过load命令加载为镜像
	2）创建目录/tmp/mysql/data
	3）创建目录/tmp/mysql/conf，将课前资料提供的hmy.cnf文件上传到/tmp/mysql/conf
	4）去DockerHub查阅资料，创建并运行MySQL容器，要求：
		① 挂载/tmp/mysql/data到mysql容器内数据存储目录
		② 挂载/tmp/mysql/conf/hmy.cnf到mysql容器的配置文件
		③ 设置MySQL密码

```sh
docker run \
	--name mysql \
	-e MYSQL_ROOT_PASSWOES=root \
	-p 3306:3306 \
	-v /tmp/mysql/conf/hmy.cnf:/etc/mysql/conf.d/hmy.cnf
	-v /tmp/mysql/data:/var/lib/mysql
	-d \
	mysql:5.7.25
```

## 3、Dockerfile自定义镜像

常见的镜像在DockerHub就能找到，但是我们自己写的项目就必须自己构建镜像了。

### 3.1、镜像结构

**镜像**是将**应用程序及其需要的系统函数库、环境、配置、依赖打包**而成。

镜像是一个分层结构，每一层称为一个Layer
**BaseImage**层：包含基本的系统函数库，环境变量，文件系统
**Entrypoint**：入口，是镜像中应用启动的命令
其他：在BaseImage基础上添加依赖，安装程序、完成整个应用的安装和配置

简单来说，镜像就是在**系统函数库**、运行环境基础上，**添加应用程序文件、配置文件、依赖文件**等组合，然后编写好**启动脚本**打包在一起形成的**文件**。

构建镜像，其实就是实现上述打包的过程。

### 3.2、Dockerfile语法

构建自定义的镜像时，并不需要一个个文件去拷贝，打包
只需要告诉Docker，我们的镜像的组成，需要哪些**BaseImage**、需要**拷贝什么文件**、需要安装什么**依赖**、**启动脚本**是什么，将来Docker会帮助我们构建镜像。

而描述上述信息的文件就是**Dockerfile文件**

**Dockerfile**就是一个**文本文件**，其中包含一个个的**指令(Instruction)**，用指令来说明要执行什么操作来构建镜像。每一个指令都会形成一层Layer。
[官网文档](https://docs.docker.com/engine/reference/builder)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230326100643.png)

### 3.3、构建Java项目案例

#### 3.3.1、基于Ubuntu构建Java项目（麻烦）

基于Ubuntu镜像构建一个新镜像，运行一个java项目

步骤1：新建一个空文件夹docker-demo
步骤2：拷贝课前资料中的docker-demo.jar文件到docker-demo这个目录
步骤3：拷贝课前资料中的jdk8.tar.gz文件到docker-demo这个目录
步骤4：拷贝课前资料提供的Dockerfile到docker-demo这个目录
	其中的内容如下：

```dockerfile
## 指定基础镜像
FROM ubuntu:16.04
## 配置环境变量，JDK的安装目录
ENV JAVA_DIR=/usr/local

## 拷贝jdk和java项目的包
COPY ./jdk8.tar.gz $JAVA_DIR/
COPY ./docker-demo.jar /tmp/app.jar

## 安装JDK
RUN cd $JAVA_DIR \
 && tar -xf ./jdk8.tar.gz \
 && mv ./jdk1.8.0_144 ./java8

## 配置环境变量
ENV JAVA_HOME=$JAVA_DIR/java8
ENV PATH=$PATH:$JAVA_HOME/bin

## 暴露端口
EXPOSE 8090
## 入口，java项目的启动命令
ENTRYPOINT java -jar /tmp/app.jar
```

步骤5：进入docker-demo
	将准备好的docker-demo上传到虚拟机任意目录，然后进入docker-demo目录下

步骤6：运行命令：

```sh
docker build -t javaweb:1.0 .
```

```sh
docker run --name web -p 8090:8090 -d
```

最后访问 http://192.168.80.135:8090/hello/count

#### 3.3.2、基于java8构建Java项目（简便）

虽然我们可以基于Ubuntu基础镜像，添加任意自己需要的安装包，构建镜像，但是却比较麻烦。所以大多数情况下，我们都可以**在一些安装了部分软件的基础镜像上做改造**。
构建java项目的镜像，可以在已经准备了JDK的基础镜像基础上构建。

基于java:8-alpine镜像，将一个Java项目构建为镜像：

① 新建一个空的目录，然后在目录中新建一个文件，命名为Dockerfile
② 拷贝课前资料提供的docker-demo.jar到这个目录中
③ 修改Dockerfile文件：
		a ）基于java:8-alpine作为基础镜像
		b ）将app.jar拷贝到镜像中
		c ）暴露端口
		d ）编写入口ENTRYPOINT

内容如下：

```dockerfile
FROM java:8-alpine
COPY ./app.jar /tmp/app.jar
EXPOSE 8090
ENTRYPOINT java -jar /tmp/app.jar
```

④ 使用docker build命令构建镜像

```sh
docker build -t javaweb2.0 .
```

⑤ 使用docker run创建容器并运行

## 4、Docker-Compose

Docker Compose可以**基于Compose文件**帮我们**快速的部署分布式应用，而无需手动一个个创建和运行容器**！

### 4.1、认识DockerCompose

Compose文件是一个文本文件，通过指令定义集群中的每个容器如何运行。格式如下：

```json
version: "3.8"
 services:
  mysql:  //mysql服务，服务名即容器名
    image: mysql:5.7.25 //镜像名称
    environment:
     MYSQL_ROOT_PASSWORD: 123  //环境变量
    volumes: //数据卷配置
     - "/tmp/mysql/data:/var/lib/mysql"
     - "/tmp/mysql/conf/hmy.cnf:/etc/mysql/conf.d/hmy.cnf"
  web:
    build: . //当前目录构建镜像
    ports:
     - "8090:8090" //暴露端口
```

[DockerCompose的详细语法参考官网](https://docs.docker.com/compose/compose-file/)

DockerCompose文件可以看做是将多个docker run命令写到一个文件，只是语法稍有差异。

### 4.2、CentOS7安装DockerCompose

#### 4.2.1、下载

Linux下需要通过命令下载：

```sh
## 安装
curl -L https://github.com/docker/compose/releases/download/1.23.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

如果下载速度较慢，或者下载失败，可以使用课前资料提供的docker-compose文件，上传到`/usr/local/bin/`目录也可以。

#### 4.2.2、修改文件权限

```sh
## 修改权限
chmod +x /usr/local/bin/docker-compose
```

#### 4.3.3、Base自动补全命令：

```sh
## 补全命令
curl -L https://raw.githubusercontent.com/docker/compose/1.29.1/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose
```

如果这里出现错误，需要修改自己的hosts文件：

```sh
echo "199.232.68.133 raw.githubusercontent.com" >> /etc/hosts
```

### 4.3、部署微服务集群案例

案例：将cloud-demo微服务集群利用DockerCompose部署

**实现思路**：

① 查看课前资料提供的cloud-demo文件夹，里面已经编写好了docker-compose文件
② 修改自己的cloud-demo项目，将数据库、nacos地址都命名为docker-compose中的服务名
③ 使用maven打包工具，将项目中的每个微服务都打包为app.jar
④ 将打包好的app.jar拷贝到cloud-demo中的每一个对应的子目录中
⑤ 将cloud-demo上传至虚拟机，利用 docker-compose up -d 来部署

#### 4.3.1、compose文件

课前资料提供的cloud-demo文件夹，里面已经编写好了docker-compose文件，而且每个微服务都准备了一个独立的目录：

```yml
version: "3.2"
services:
  nacos:
    image: nacos/nacos-server
    environment:
      MODE: standalone
    ports:
      - "8848:8848"
  mysql:
    image: mysql:5.7.25
    environment:
      MYSQL_ROOT_PASSWORD: 123
    volumes:
      - "$PWD/mysql/data:/var/lib/mysql"
      - "$PWD/mysql/conf:/etc/mysql/conf.d/"
  userservice:
    build: ./user-service
  orderservice:
    build: ./order-service
  gateway:
    build: ./gateway
    ports:
      - "10010:10010"
```

其中包含5个service服务：
`nacos`：作为注册中心和配置中心
	`image: nacos/nacos-server`： 基于nacos/nacos-server镜像构建
	`environment`：环境变量
		`MODE: standalone`：单点模式启动
	`ports`：端口映射，这里暴露了8848端口

`mysql`：数据库
	`image: mysql:5.7.25`：镜像版本是mysql:5.7.25
	`environment`：环境变量
		`MYSQL_ROOT_PASSWORD: 123`：设置数据库root账户的密码为123
	`volumes`：数据卷挂载，这里挂载了mysql的data、conf目录，其中有提前准备好的数据

​	`userservice`、`orderservice`、`gateway`：都是基于Dockerfile临时构建的

查看mysql目录，可以看到其中已经准备好了cloud_order、cloud_user表
查看微服务目录，可以看到都包含Dockerfile文件

内容如下：

```dockerfile
FROM java:8-alpine
COPY ./app.jar /tmp/app.jar
ENTRYPOINT java -jar /tmp/app.jar
```

#### 4.3.2、修改微服务配置

**微服务**将来要**部署为docker容器**，而**容器之间**互联不是通过IP地址，而是**通过容器名**。这里我们**将order-service、user-service、gateway服务的mysql、nacos地址都修改为基于容器名的访问**

```yml
spring:
  datasource:
    url: jdbc:mysql://mysql:3306/cloud_order?useSSL=false
    username: root
    password: 123
    driver-class-name: com.mysql.jdbc.Driver
  application:
    name: orderservice
  cloud:
    nacos:
      server-addr: nacos:8848 # nacos服务地址
```



#### 4.3.3、打包

接下来需要将我们的每个微服务都打包。因为之前查看到**Dockerfile中的jar包名称都是app.jar**，因此我们的每个微服务都需要用这个名称。

可以通过**修改pom.xml**中的**打包名称**来实现，每个微服务都需要修改：

```xml
<build>
  <!-- 服务打包的最终名称 -->
  <finalName>app</finalName>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

打包后

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230326113508.png)

#### 4.3.4、拷贝jar包到部署目录

编译打包好的app.jar文件，需要**放到Dockerfile的同级目录中**
注意：每个微服务的app.jar放到与服务名称对应的目录

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230326113628.png)

#### 4.3.5、部署

最后，需要将文件整个cloud-demo文件夹上传到虚拟机中，由DockerCompose部署。

进入cloud-demo目录，然后运行下面的命令：

```sh
docker-compose up -d
```

## 5.Docker镜像仓库 

### 5.1、搭建私有镜像仓库

搭建镜像仓库可以基于Docker官方提供的[DockerRegistry](https://hub.docker.com/_/registry)来实现。

#### 5.1.1、简化版镜像仓库

Docker官方的Docker Registry是一个基础版本的Docker镜像仓库，具备仓库管理的完整功能，但是没有图形化界面。

搭建方式比较简单，命令如下：

```sh
docker run -d \
    --restart=always \
    --name registry	\
    -p 5000:5000 \
    -v registry-data:/var/lib/registry \
    registry
```

命令中挂载了一个数据卷registry-data到容器内的/var/lib/registry 目录，这是私有镜像库存放数据的目录。

访问http://YourIp:5000/v2/_catalog 可以查看当前私有镜像服务中包含的镜像

#### 5.1.2、带有图形化界面版本

使用DockerCompose部署带有图象界面的DockerRegistry，命令如下：

```yml
version: '3.0'
services:
  registry:
    image: registry
    volumes:
      - ./registry-data:/var/lib/registry
  ui:
    image: joxit/docker-registry-ui:static
    ports:
      - 8080:80
    environment:
      - REGISTRY_TITLE=Tmako私有仓库
      - REGISTRY_URL=http://registry:5000
    depends_on:
      - registry
```

#### 5.1.3、配置Docker信任地址

我们的私服采用的是http协议，默认不被Docker信任，所以需要做一个配置：

```sh
## 打开要修改的文件
vi /etc/docker/daemon.jsonn j
## 添加内容：
"insecure-registries":["http://192.168.80.135:8080"]
## 重加载
systemctl daemon-reload
## 重启docker
systemctl restart docker
```

### 5.2、推送、拉取镜像

推送镜像到私有镜像服务必须先tag，步骤如下：

① 重新tag本地镜像，名称前缀为私有仓库的地址：
192.168.80.135:8080/

```sh
docker tag nginx:latest 192.168.80.130:8080/nginx:1.0 
```

② 推送镜像

```sh
docker push 192.168.80.130:8080/nginx:1.0 
```

③ 拉取镜像

```sh
docker pull 192.168.80.130:8080/nginx:1.0 
```
