---
title: CentOS 部署 Java 项目
icon: centOS
category: Linux
tag:
  - centOS
  - java
  - 部署
---

**基于CentOs的Java项目部署**

## 1、软件安装

### 1、软件安装方式

二进制发布包安装	软件已经针对具体平台编译打包发布，只要解压，修改配置即可
rmp安装			(Red-Hat Package Manage)，软件已经按照redhat的包管理规范进行打包，使用rpm命令安装，不能自行解决库依赖问题
yum安装			(Yellow dog Updater)一种在线软件安装方式，本质上还是rpm安装，自动下载安装包并安装，安装过程中自动解决库依赖问题
源码编译安装	软件以源码工程形式发布，需要自己编译打包

### 2、搭建环境

**安装JDK、Tomcat、MySQL、lrzsz，Redis**

jdk的重新安装位置：/usr/lcoal

#### 1、Tomcat的开启，使用、关闭

在Tomecat官网下砸Tomcat8.tar.gz，通过xftp上传至CentOS
上传地址为**/usr/lcoal/tomcat**
使用tar -zxvf apache-tomcat-8.5.87.tar.gz解压
进入Tomcat的bin目录启动服务，命令为**sh startup.sh** 或 **./startup.sh**

![image-20230315131921000](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230315131921000.png)

要访问Tomcat，需要开放8080端口
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --reload

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230315132243.png)

停止Tomcat服务的方式：
运行Tomcat中bin目录的shutdown.sh
**sh shutdown.sh** 或者 **./shutdowndown.sh**

结束Tomcat进程：
使用ps -ef | grep tomcat查看tomcat进程，获得进程id
执行kill -9 id命令

#### 2、安装lrzsz

1、搜索lrzsz安装包，命令为yum list lrzsz
2、使用yum命令在线安装，命令为yum install lrzsz.x86_64

`Yum是一个在Fedora和RedHat以及CEntOS中的shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理一拉关系，并且一次安装所有依赖的软件包，无需繁琐地一次次下载，安装`

### 3、安装GIt

yum list git	列出git安装包
yum install git	在线安装git

### 4、安装maven

将maven.tar.gz复制到/usr目录下
tar -zxvf apache-maven-3.8.8-bin.tar.gz

修改配置文件：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230315144922.png)

配置环境变量

```
LANG="en_US.UTF-8"
JAVA_HOME=/usr/local/jdk1.8.0_171
export MAVEN_HOME=/usr/local/apache-maven-3.8.8
export PATH=$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH
```

修改settings文件，配置maven的本地仓库为/usr/local/repo
![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230315154928.png)



## 2、项目部署

### 1、手工部署项目（不推荐）

##### 1、先将idea中的项目打成jar包

![image-20230315140251283](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230315140251283.png)

#### 2、将jar包传到linux上，目录/usr/app

#### 3、通过java -jar XXX.jar 运行jar包

#### 4、检查防火墙，确保8080端口对外开放，访问springboot项目

fire-cmd --zone=public --list-ports

#### 5、改为后台运行项目，并将日志输出到日志文件

目前程序运行的问题：
	线上程序霸屏控制台，应该后台运行
	日志不应输出到控制台，应该输入到文件，方便运维查阅信息

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230315141525.png)

命令：
**nohup java -jar XXX.jar &> XXX,log &** 

关闭项目：
ps -ef | grep java -jar   查找id
kill -9 id						结束进程

### 2、通过Shell脚本自动部署项目

操作步骤：
①在Linux中安装Git
②在Linux中安装maven
③编写Shell脚本（拉取代码，编译，打包，启动）
④为用户授予执行shell脚本的权限
⑤执行shell脚本

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230315142408.png)

```
LANG="en_US.UTF-8"
JAVA_HOME=/usr/local/jdk1.8.0_171
PATH=$JAVA_HOME/bin:$PATH
export MAVEN_HOME=/usr/local/apache-maven-3.8.8
```

将shell脚本复制到项目中，chmod修改权限777，通过./bootStart.sh运行shell脚本