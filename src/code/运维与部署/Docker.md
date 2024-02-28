---
title: Docker 基础
icon: docker
category: Docker
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

## 1、Docker 介绍与安装

### 1.1、Docker概念

Docker 为了解决依赖的兼容问题的，采用了两个手段：

- 将应用的 Libs（函数库）、Deps（依赖）、配置与应用 **一起打包**

- 将每个应用放到一个隔离 **容器** 去运行，避免互相干扰

这样打包好的应用包中，既包含应用本身，也保护应用所需要的Libs、Deps，**无需再操作系统上安装这些**，自然就不存在不同应用之间的兼容问题了。

虽然解决了不同应用的兼容问题，但是开发、测试等环境会存在差异，操作系统版本也会有差异

Docker 如何解决不同系统环境的问题？

- Docker 将用户程序与所需要调用的系统（比如Ubuntu）函数库一起打包
- Docker 运行到不同操作系统时，直接基于打包的函数库，借助于操作系统的 Linux 内核来运行

- docker是一个系统进程；虚拟机是在操作系统中的操作系统
- docker体积小、启动速度快、性能好；虚拟机体积大、启动速度慢、性能一般


### 1.2、镜像和容器

**镜像（Image）**：Docker 将应用程序及其所需的依赖、函数库、环境、配置等文件 **打包在一起**，称为 **镜像**

**容器（Container）**：镜像中的 **应用程序运行后形成的进程** 就是 **容器**，只是 Docker 会给容器进程做隔离，对外不可见

镜像与容器的关系类似于 java 中类与对象的关系  
一个镜像可以启动多次，形成多个容器进程

#### 1.3、DockerHub

**[DockerHub](https://hub.docker.com/)**：一个 Docker 镜像的托管平台

国内也有类似于 DockerHub 的公开服务，比如 [网易云镜像服务](https://c.163yun.com/hub)、[阿里云镜像库](https://cr.console.aliyun.com/)等。

一方面可以将自己的镜像共享到 DockerHub，另一方面也可以从DockerHub 拉取镜像

#### 1.4、Docker架构

Docker 是一个 **CS 架构** 的程序，由两部分组成：

- 服务端(server)：Docker 守护进程，负责处理 Docker 指令，管理镜像、容器等

- 客户端(client)：通过命令或 RestAPI 向 Docker 服务端发送指令。可以在本地或远程向服务端发送指令。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230324203906.png)

### 1.4、安装与卸载 Docker

在 CentOS 下安装 Docker：
Docker CE 支持 64 位版本 CentOS 7，并且要求内核版本不低于 3.10， CentOS 7 满足最低内核的要求

安装 yum 工具

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

docker-ce 为 **社区免费版本**。稍等片刻，docker 即可安装成功。


如果之前安装过旧版本的 Docker，可以使用下面命令卸载：

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




### 1.5、启动 docker

Docker 应用需要用到各种端口，逐一去修改防火墙设置。非常麻烦，因此建议大家直接 **关闭防火墙**！
启动 docker 前，一定要关闭防火墙

关闭防火墙：

```sh
## 关闭
systemctl stop firewalld
## 禁止开机启动防火墙
systemctl disable firewalld
```

通过命令启动docker：

```sh
systemctl start docker  # 启动 docker 服务
systemctl stop docker  # 停止 docker 服务
systemctl restart docker  # 重启 docker 服务
```

然后输入命令，可以查看 docker 版本：

```
docker -v
```

docker 官方镜像仓库网速较差，国内镜像服务：

参考阿里云的镜像加速文档：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230324205410.png)

## 2、Docker 基本操作

### 2.1、镜像操作

#### 2.1.1、镜像名称

镜像的名称组成：

- 镜名称一般分两部分组成：`[repository]:[tag]`
- 在没有指定 tag 时，默认是  latest，代表最新版本的镜像

比如 Mysql : 5.7
这里的 mysql 就是 repository，5.7 就是 tag，合一起就是镜像名称，代表 5.7 版本的 MySQL 镜像。

#### 2.1.2、镜像命令

常见的镜像操作命令如图：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325201245.png)

#### 2.1.3、拉取、查看镜像

- 从 DockerHub 中拉取一个 nginx 镜像并查看

- 根据查看到的镜像名称，拉取自己需要的镜像，通过命令： `docker pull nginx`

- 通过命令：`docker images` 查看拉取到的镜像

#### 2.1.4、保存、导入镜像

利用 docker save 将 nginx 镜像导出磁盘，然后再通过 load 加载回来

1）`docker xx --help` 命令查看docker命令的语法

例如：`docker save --help`

2）`docker save` 保存镜像

`docker save` 的命令格式

o：output

```sh
docker save -o [保存的目标文件名称] [镜像名称]
```

使用 docker save 导出镜像到磁盘 

```sh
docker save -o nginx.tar nginx:latest
```


- `docker rmi` 删除镜像

```sh
docker rmi nginx:latest
```

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325203133.png)

4）使用 `docker load` 加载镜像

先删除本地的 nginx 镜像，然后运行命令，加载本地文件：

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
	暂停：进程暂停，CPU 不再运行，并不释放内存
	停止：进程终止，回收进程占用的内存、CPU 等资源

`docker ps -a` ：查看全部容器命令
`docker run` ：创建并运行一个容器，处于运行状态
`docker pause` ：让一个运行的容器暂停
`docker unpause` ：让一个容器从暂停状态恢复运行
`docker stop` ：停止一个运行的容器
`docker start` ：让一个停止的容器再次运行
`docker rm` ：删除一个容器

#### 2.2.2、创建并运行一个容器

首先去 docker hub 查看 Nginx 的容器运行命令

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325204823.png)

 创建并运行 nginx 容器的命令：

```sh
docker run --name mynginx -p 80:80 -d nginx
```

`docker run` ：创建并运行一个容器  
`--name` : 给容器起一个名字，比如叫做mn  
`-p` ：将宿主机端口与容器端口映射，冒号**左侧是宿主机端口，右侧是容器端口**（容器是隔离环境，访问不到容器中的nginx）
`-d`：后台运行容器
nginx：镜像名称，例如 nginx

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325205509.png)

使用 `docker ps` 查看容器状态`

使用 `docker log 容器名` ：查看容器日志信息

```sh
docker logs mynginx
docker logs -f mynginx #持续跟踪
```

#### 2.2.3、进入容器，修改文件

1）进入容器

```sh
docker exec -it mynginx bash
```

**docker exec** ：进入容器内部，执行一个命令
-it: 给当前进入的容器创建一个标准输入、输出终端，允许我们与容器交互
mynginx：要进入的容器的名称
bash：进入容器后执行的命令，bash是一个linux终端交互命令


2）进入 nginx 的 HTML 所在目录 /uhsr/share/nginx/tml

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230325212440.png)

容器内部会模拟一个独立的 Linux 文件系统，看起来如同一个 linux 服务器一样

```sh
cd /usr/share/nginx/html
```

3）修改 index.html 的内容

容器内没有 vi 命令，无法直接修改，我们用下面的命令来修改：
 
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

在之前的 nginx 案例中，修改 nginx 的 html 页面时，需要进入nginx内部。并且因为没有编辑器，修改文件也很麻烦。
这就是因为 **容器与数据（容器内文件）耦合** 带来的后果。

要解决这个问题，必须将数据与容器解耦，这就要用到 **数据卷**了。

#### 2.3.1、数据卷的概念

**数据卷（volume）** 是一个虚拟目录，指向宿主机文件系统中的某个目录。

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

## 3、Dockerfile 自定义镜像

常见的镜像在 DockerHub 就能找到，但是我们自己写的项目就必须自己构建镜像了。

### 3.1、镜像结构

构建镜像，其实就是打包的过程。

### 3.2、Dockerfile 语法


Dockerfile 就是一个 文本文件，其中包含一个个的指令(Instruction)，用指令来说明要执行什么操作来构建镜像。每一个指令都会形成一层 Layer。

### 3.3、构建 Java 项目案例

#### 3.3.1、基于 Ubuntu 构建 Java 项目（麻烦）

基于 Ubuntu 镜像构建一个新镜像，运行一个 java 项目

步骤1：新建一个空文件夹 docker-demo
步骤2：拷贝 jar 包，JDK，Dockerfile 到文件夹中

```dockerfile
## 指定基础镜像
FROM ubuntu:16.04
## 配置环境变量，JDK 的安装目录
ENV JAVA_DIR=/usr/local

## 拷贝 jdk 和 java 项目的包
COPY ./jdk8.tar.gz $JAVA_DIR/
COPY ./docker-demo.jar /tmp/app.jar

## 安装 JDK
RUN cd $JAVA_DIR \
 && tar -xf ./jdk8.tar.gz \
 && mv ./jdk1.8.0_144 ./java8

## 配置环境变量
ENV JAVA_HOME=$JAVA_DIR/java8
ENV PATH=$PATH:$JAVA_HOME/bin

## 暴露端口
EXPOSE 8090
## 入口，java 项目的启动命令
ENTRYPOINT java -jar /tmp/app.jar
```

步骤5：进入 docker-demo
	将准备好的 docker-demo 上传到虚拟机任意目录，然后进入docker-demo 目录下

步骤6：运行命令：

```sh
docker build -t javaweb:1.0 .
```

```sh
docker run --name web -p 8090:8090 -d
```

最后访问 http://192.168.80.135:8090/hello/count

#### 3.3.2、基于 java8 构建 Java 项目（简便）

虽然我们可以基于 Ubuntu 基础镜像，添加任意自己需要的安装包，构建镜像，但是却比较麻烦。所以大多数情况下，我们都可以在一些安装了部分软件的基础镜像上做改造。
构建 java 项目的镜像，可以在 **已经准备了 JDK** 的基础镜像基础上构建。

基于 java:8-alpine 镜像，将一个 Java 项目构建为镜像：

① 新建一个空的目录，然后在目录中新建一个文件，命名为 Dockerfile
② 拷贝 jar 包到这个目录中
③ 修改 Dockerfile 文件：
		a ）基于 java:8-alpine 作为基础镜像
		b ）将 app.jar 拷贝到镜像中
		c ）暴露端口
		d ）编写入口 ENTRYPOINT

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

⑤ 使用 docker run 创建容器并运行

## 4、Docker-Compose

Docker Compose 可以基于 Compose 文件帮我们快速的部署分布式应用，而无需手动一个个创建和运行容器！

### 4.1、认识 DockerCompose

Compose 文件是一个文本文件，通过指令定义集群中的每个容器如何运行。格式如下：

```json
version: "3.8"
 services:
  mysql:  //mysql 服务，服务名即容器名
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

DockerCompose 文件可以看做是将多个docker run命令写到一个文件，只是语法稍有差异。

### 4.2、CentOS7 安装 DockerCompose

#### 4.2.1、下载

Linux下需要通过命令下载：

```sh
## 安装
curl -L https://github.com/docker/compose/releases/download/1.23.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

#### 4.2.2、修改文件权限

```sh
## 修改权限
chmod +x /usr/local/bin/docker-compose
```

#### 4.3.3、Base 自动补全命令：

```sh
## 补全命令
curl -L https://raw.githubusercontent.com/docker/compose/1.29.1/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose
```

如果这里出现错误，需要修改自己的 hosts 文件：

```sh
echo "199.232.68.133 raw.githubusercontent.com" >> /etc/hosts
```

### 4.3、部署微服务集群案例

案例：将 cloud-demo 微服务集群利用 DockerCompose 部署

**实现思路**：

① 查看课前资料提供的 cloud-demo 文件夹，里面已经编写好了docker-compose 文件
② 修改自己的 cloud-demo 项目，将数据库、nacos 地址都命名为docker-compose 中的服务名
③ 使用 maven 打包工具，将项目中的每个微服务都打包为 app.jar
④ 将打包好的 app.jar 拷贝到 cloud-demo 中的每一个对应的子目录中
⑤ 将 cloud-demo 上传至虚拟机，利用 docker-compose up -d 来部署

#### 4.3.1、compose 文件

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

其中包含 5 个 service 服务：
`nacos`：作为注册中心和配置中心
- `image: nacos/nacos-server`： 基于 nacos/nacos-server镜像构建
- `environment`：环境变量
	- `MODE: standalone`：单点模式启动
- `ports`：端口映射，这里暴露了 8848 端口

- `mysql`：数据库
	- `environment`：环境变量
	- `image: mysql:5.7.25`：镜像版本是mysql:5.7.25
		- `MYSQL_ROOT_PASSWORD: 123`：设置数据库 root 账户的密码为 123
	- `volumes`：数据卷挂载，这里挂载了mysql 的 data、conf 目录，其中有提前准备好的数据

​	- `userservice`、`orderservice`、`gateway`：都是基于Dockerfile 临时构建的

查看 mysql 目录，可以看到其中已经准备好了 cloud_order、cloud_user 表
查看微服务目录，可以看到都包含 Dockerfile 文件

内容如下：

```dockerfile
FROM java:8-alpine
COPY ./app.jar /tmp/app.jar
ENTRYPOINT java -jar /tmp/app.jar
```

#### 4.3.2、修改微服务配置

微服务 将来要部署为 docker 容器，而 容器之间 互联不是通过 IP 地址，而是 通过容器名。这里我们将 order-service、user-service、gateway 服务的 mysql、nacos 地址都修改为基于容器名的访问

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

接下来需要将我们的每个微服务都打包。因为之前查看到Dockerfile中的jar包名称都是 app.jar，因此我们的每个微服务都需要用这个名称。

可以通过修改 pom.xml 中的打包名称来实现，每个微服务都需要修改：

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

#### 4.3.4、拷贝 jar 包到部署目录

编译打包好的 app.jar 文件，需要放到 Dockerfile 的同级目录中
注意：每个微服务的 app.jar 放到与服务名称对应的目录


#### 4.3.5、部署

最后，需要将文件整个 cloud-demo 文件夹上传到虚拟机中，由 DockerCompose 部署。

进入 cloud-demo 目录，然后运行下面的命令：

```sh
docker-compose up -d
```

## 5.Docker 镜像仓库 

### 5.1、搭建私有镜像仓库

搭建镜像仓库可以基于 Docker 官方提供的[DockerRegistry](https://hub.docker.com/_/registry)来实现。

#### 5.1.1、简化版镜像仓库

Docker 官方的 Docker Registry 是一个基础版本的 Docker 镜像仓库，具备仓库管理的完整功能，但是没有图形化界面。

搭建方式比较简单，命令如下：

```sh
docker run -d \
    --restart=always \
    --name registry	\
    -p 5000:5000 \
    -v registry-data:/var/lib/registry \
    registry
```

命令中挂载了一个数据卷 registry-data 到容器内的 /var/lib/registry 目录，这是私有镜像库存放数据的目录。

访问 http://YourIp:5000/v2/_catalog 可以查看当前私有镜像服务中包含的镜像

#### 5.1.2、带有图形化界面版本

使用 DockerCompose 部署带有图象界面的 DockerRegistry，命令如下：

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

我们的私服采用的是 http 协议，默认不被 Docker 信任，所以需要做一个配置：

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

① 重新 tag 本地镜像，名称前缀为私有仓库的地址：
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
