---
title: git 基础
icon: git
order: 1
category: 
	- 基础
tag:
	- git
---
## 0、常用命令速览：

### ①git工作机制：

**工作区（写代码）`git add` → 暂存区（临时存储）`git commit` → 本地库（会生成对应的历史版本）`push`→ 远程库**

### ②在本地使用的git命令：

| 命令                               | 解释             |
| ---------------------------------- | ---------------- |
| git add 文件名(*)                  | 添加到暂存区     |
| git commit -m "日志信息" 文件名(*) | 提交到本地库     |
| git reflog                         | 查看历史记录     |
| git reset --hard 版本号            | 版本穿梭         |
| git log                            | 查看版本详细信息 |
| git config --list                  | 查看配置信息     |
| git config --global user.name      | 用户名           |
| git config --global user.email     | 邮箱             |

### ③远程仓库操作

| 命令                               | 解释                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| git remote                         | 查看远程仓库                                                 |
| git remote -v                      | 查看当前所有远程地址别名                                     |
| git remote add 别名 远程地址       | 关联/添加远程仓库（用于push,pull），添加一个新的远程git仓库，同时可以起别名 |
| git remote remove 别名        | 取消关联远程仓库 |
| git clone 远程地址                 | 将远程仓库的内容克隆到本地                                   |
| git pull 远程库地址别名 远程分支名 | 将远程仓库对于分支最新内容拉下来后与 当前本地分支直接合并    |
| git push 别名 分支                 | 推送本地分支上的内容到远程仓库                               |

### ④分支操作

| 命令                | 解释                         |
| ------------------- | ---------------------------- |
| git branch 分支名   | 创建分支                     |
| git branch          | 查看分支                     |
| git branch -v       | 查看分支                     |
| git checkout 分支名 | 切换分支                     |
| git merge 分支名    | 把指定的分支合并到当前分支上 |

### ⑤标签操作

| 命令                            | 解释                                 |
| ------------------------------- | ------------------------------------ |
| git tag                         | 列出已有标签                         |
| git tag 标签名                  | 创建标签                             |
| git push 远程仓库别名 标签名    | 将标签推送至远程仓库                 |
| git checkout -b 新分支名 标签名 | 检出标签（将当前标签的状态下载下来） |

## 1、Git 概述  

Git 是一个免费的、开源的**分布式版本控制系统**，可以快速高效地处理从小型到大型的各种项目  

Git 易于学习，占地面积小，性能极快。 它具有廉价的本地库(在磁盘上)，方便的暂存区域和多个工作分支等特性。 其性能优于 Subversion、 CVS、 Perforce 和 ClearCase 等版本控制工具。  

### 1.1 何为版本控制  

版本控制是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统。
版本控制其实最重要的是可以**记录文件修改历史记录**，从而让**用户能够查看历史版本，方便版本切换**。  

为什么需要版本控制：协作开发

### 1.2 版本控制工具  

#### ①集中式版本控制工具  

CVS、 SVN(Subversion)、 VSS……  
	集中化的版本控制系统诸如 CVS、 SVN 等，都有一个**单一的集中管理的服务器**，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。多年以来，这已成为版本控制系统的标准做法。
	这种做法带来了许多好处，每个人都可以在一定程度上看到项目中的其他人正在做些什么。而**管理员也可以轻松掌控每个开发者的权限**，并且管理一个集中化的版本控制系统， 要远**比在各个客户端上维护本地数据库来得轻松容易**。
	这么做显而易见的缺点是**中央服务器的单点故障**。如果服务器宕机一小时，那么在这一小时内，**谁都无法提交更新，也就无法协同工作** 。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208144134.png)

#### ②分布式版本控制工具  

Git、 Mercurial、 Bazaar、 Darcs……
	像 Git 这种分布式版本控制工具，**客户端**提取的不是最新版本的文件快照，而是**把代码仓库完整地镜像下来（本地库）**。这样任何一处协同工作用的文件发生故障，事后都可以用**其他客户端的本地仓库进行恢复**。因为每个客户端的每一次文件提取操作，实际上都是一次对整个文件仓库的完整备份。
分布式的版本控制系统出现之后,解决了集中式版本控制系统的缺陷:
	**服务器断网的情况下也可以进行开发**（因为版本控制是在本地进行的）
	**每个客户端保存的也都是整个完整的项目**（包含历史记录， 更加安全）  

![image-20230207181938977](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230207181938977.png)

### 1.3 Git 简史  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230207183809424.png)

### 1.4 Git 工作机制  

==**工作区（写代码）`git add` → 暂存区（临时存储）`git commit` → 本地库（会生成对应的历史版本）`push`→ 远程库**==

### 1.5 Git 和代码托管中心  

**代码托管中心**是基于网络服务器的**远程代码仓库**，一般我们简单称为**远程库**

局域网：GitLab
互联网：GitHub（外网）、Gitee 码云（国内网站）  

## 2、Git 安装  

修改安装路径和是否修改环境变量，其他保持默认

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230207185923544.png)

## 3、Git本地命令  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208131542077.png)

**快捷键：**
**ctrl+l：清屏**
**ctrl+insert 复制**
**shift+insert 粘贴**
**选中+鼠标中键：复制**

**重要概念：
commit：提交，将本地文件和版本信息保存到本地仓库
push：推送，将本地仓库文件和版本信息上传到远程仓库
pull：拉取，将远程仓库文件和版本信息下载到本地仓库
clone：从远程服务器克隆整个版本到本地（下载）**

### 3.1 设置用户签名  

基本语法：
git config --global user.name 用户名
git config --global user.email 邮箱  
git config --list 查看配置信息

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208135606324.png)

签名的作用是区分不同操作者身份。**用户的签名信息在每一个版本的提交信息中能够看到**，以此确认本次提交是谁做的。 Git 首次安装**必须设置一下用户签名**，否则无法提交代码。
注意： 这里设置用户签名和将来登录 GitHub（或其他代码托管中心）的账号没有任何关系。  

### 3.2 初始化本地库  

未跟踪：没有git add
已跟踪：已git add

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230314202301.png)

基本语法：git init

![image-20230208140317884](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208140317884.png)

### 3.3 查看本地库状态  

基本语法：git status  

### 3.4 添加暂存区  

#### 3.4.1 将工作区的文件添加到暂存区  

基本语法：git add 文件名 

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208141427049.png)

### 3.5 提交本地库  

基本语法：git commit -m "日志信息" 文件名  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208141853101.png)

### 3.6 历史版本  

#### 3.6.1 查看历史版本  

基本语法：
git reflog 查看版本信息
git log 查看版本详细信息  

#### 3.6.2 版本穿梭  

基本语法：git reset --hard 版本号  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208143353.png)

Git 切换版本， 底层其实是移动的 HEAD 指针，具体原理如下图所示：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208144344.png)

## 4、Git 分支操作  

### 4.1 什么是分支  

在版本控制过程中，同时推进多个任务，为每个任务，我们就可以创建每个任务的单独分支。使用分支意味着程序员可以把自己的工作***从开发主线上分离开来**， **发自己分支的时候，不会影响主线分支的运行**。对于初学者而言，**分支可以简单理解为副本**，一个分支就是一个单独的副本。（分支底层其实也是**指针的引用**）  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208144807.png)

### 4.2 分支的好处  

同时**并行推进多个功能开发**，提高开发效率。
各个分支在开发过程中，如果某一个分支开发失败，**不会对其他分支有任何影响**。失败的分支删除重新开始即可。  

### 4.3 分支的操作  

| 命令名称            | 作用                         |
| ------------------- | ---------------------------- |
| git branch 分支名   | 创建分支                     |
| git branch -v       | 查看分支                     |
| git checkout 分支名 | 切换分支                     |
| git merge 分支名    | 把指定的分支合并到当前分支上 |

#### 4.3.1 查看分支  

基本语法：git branch -v  

#### 4.3.2 创建分支  

基本语法：git branch 分支名  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208150636020.png)

#### 4.3.3 修改分支  

先切换到分支

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208151114.png)

#### 4.3.4 切换分支  

基本语法：git checkout 分支名  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208150846.png)

#### 4.3.5 合并分支  

基本语法：git merge 分支名  

**合并到master主分支**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208151426.png)

#### 4.3.6 产生冲突  

冲突产生的表现： 后面状态为 **MERGING  **

```git
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/SH0720 (master|MERGING)  
```

冲突产生的原因：
合并分支时，两个分支在**同一个文件的同一个位置有两套完全不同的修改**。 Git 无法替我们决定使用哪一个。必须人为决定新代码内容。  

查看状态（检测到有文件有两处修改）  

#### 4.3.7 解决冲突  

**编辑有冲突的文件，删除特殊符号**，决定要使用的内容 

​	特殊符号：<<<<<<< HEAD
​	当前分支的代码：\=\=\=\=\=\=\=
​	合并过来的代码：>>>>>>> hot-fix

**添加到暂存区  **

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208152657.png)

**执行提交（注意： 此时使用 git commit 命令时**==不能带文件名==**）**

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208152726.png)

注：**合并分支只会修改被合并的那个分支**

### 4.4 创建分支和切换分支图解  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208152913324.png)

master、 hot-fix 其实都是指向具体版本记录的指针。**当前所在的分支**，其实是由 **HEAD决定的**。所以创建分支的本质就是多创建一个指针。
HEAD 如果指向 master，那么我们现在就在 master 分支上。
HEAD 如果执行 hotfix，那么我们现在就在 hotfix 分支上。  
所以切换分支的本质就是移动 HEAD 指针

## 5、Git 团队协作机制  

### 5.1 团队内协作  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208153723251.png)

### 5.2 跨团队协作  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208153915.png)

## 6、GitHub/git远程命令 

### 6.1 创建远程仓库  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208160941.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208161047.png)

### 6.2 远程仓库操作  

| 命令名称                           | 作用                                                      |
| ---------------------------------- | --------------------------------------------------------- |
| git remote -v                      | 查看当前所有远程地址别名                                  |
| git remote add 别名 远程地址       | 起别名                                                    |
| git push 别名 分支                 | 推送本地分支上的内容到远程仓库                            |
| git clone 远程地址                 | 将远程仓库的内容克隆到本地                                |
| git pull 远程库地址别名 远程分支名 | 将远程仓库对于分支最新内容拉下来后与 当前本地分支直接合并 |

**git  clone与git pull的区别：**
git clone是在**没有版本**库的时候，从远程服务器克隆整个版本到本地（下载），是一个本地从无到有的过程
git pull是在本地**有版本库**的情况下，从远程库获取最新commit数据并且merge到本地

注意：如果当前本地仓库不是远程仓库克隆，而是本地创建的仓库，并且仓库中存在文件，此时再从远程仓库拉去文件时会宝座（fastal：refusing to merge histories）`本地有远程库没有的文件`
|解决方法：在git pull命令后加入参数--allow-unterlate-histories

适用场景：
通常情况下，远程操作的第一步是先使用git clone从远程主机克隆一个到本地
本地修改代码后，**每次从本地仓库push到远程仓库前都要先进行git pull操作，保证push到远程仓库时没有版本冲突**

#### 6.2.1 创建远程仓库别名  

基本语法：
git remote -v 查看当前所有远程地址别名 
git remote add 别名 远程地址   

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208163110.png)

#### 6.2.2 推送本地分支到远程仓库  

基本语法：git push 别名 分支

![image-20230208170934154](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208170934154.png)

***注意使用token登录***

#### 6.2.3 拉取远程库内容  

基本语法：git pull 远程库地址别名 远程分支名  

![image-20230208174717409](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208174717409.png)

#### 6.2.4 克隆远程仓库到本地  

基本语法：git clone 远程地址  

例如：git clone https://github.com/atguiguyueyue/git-shTest.git  

**克隆代码不需要登录账号**

clone 会做如下操作：
 1、拉取代码。 2、初始化本地仓库。 3、创建别名  

#### 6.2.5 邀请加入团队  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208180634.png)

生成邀请函，发给别人
然后同意邀请

### 6.3 跨团队协作  

找到他人的项目，点击folk

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208181210.png)

编辑完后提交。

可以创建一个新的请求：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208181337.png)

还可以聊天

如果代码没有问题，可以点击 Merge pull request 合并代码。

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208181551.png)  

### 6.4 SSH 免密登录  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208181656.png)

生成ssh文件（用户文件夹下）

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208181925.png)

复制公钥

![image-20230208182104368](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230208182104368.png)

添加ssh

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230208182303.png)

***可以通过ssh来pull，push	不用多次输入密码***

## 7、IDEA 集成 Git  

### 7.1 配置 Git 忽略文件  

eclipse，Idea都有一定的无关配置文件（.iml，target文件）

为什么要忽略他们：
	与项目的实际功能无关，不参与服务器上部署运行。把它们忽略掉能够屏蔽 IDE 工具之间的差异。  

怎么忽略：
	1） 创建忽略规则文件 xxxx.ignore（前缀名随便起，**建议是 git.ignore**）  
	这个文件的存放位置原则上在哪里都可以，为了便于让~/.gitconfig 文件引用，建议也放在用户家目录下  

git.ignore文件模板内容如下：

```txt
## Compiled class file
*.class

## Log file
*.log

## BlueJ files
*.ctxt

## Mobile Tools for Java (J2ME)
.mtj.tmp/

## Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

## virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*

.classpath
.project
.settings
target
.idea
*.iml
```

2） 在.gitconfig 文件中引用忽略配置文件（此文件在 Windows 的家目录中）  

```txt
[user]
	name = Layne
	email = Layne@atguigu.com
[core]
	excludesfile = C:/Users/asus/git.ignore
注意：这里要使用“正斜线（/）”，不要使用“反斜线（\）”
```

### 7.2 定位 Git 程序  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209141311.png)

### 7.3 初始化本地库 

在窗体栏选择==**VCS**==(版本控制)：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209141528.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209141619.png)

### 7.4 添加到暂存区、提交到本地库  

右键点击项目选择 Git -> Add 将项目添加到暂存区。  
右键点击项目选择 Git -> Commit Directory 将项目添加到暂存区。  

### 7.5 切换版本  

在 IDEA 的左下角，点击Git，然后点击 Log 查看版本  

右键选择要切换的版本，然后在菜单里点击 Checkout Revision。  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209143755.png)

### 7.6 创建分支  

创建方式：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209144140.png)

或：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209144201.png)

### 7.7 切换分支

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209144309.png)

### 7.8 合并分支  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209144646.png)

### 7.9 解决冲突  

手动合并代码：
点击 Conflicts 框里的 Merge 按钮，进行手动合并代码
手动合并完代码以后，点击右下角的 Apply 按钮  
代码冲突解决，自动提交本地库。  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209144949.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209145042.png)

## 8、IDEA 集成 GitHub  

### 8.1 设置 GitHub 账号  

密码或token登录

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209145418.png)

### 8.2 分享工程到 GitHub

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209145819.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209150159.png)

### 8.3 push 推送本地库到远程库  

右键点击项目，可以将当前分支的内容 push 到 GitHub 的远程仓库中  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209150425.png)

或者

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209150455.png)

默认使用https来push
也可以用ssh push：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209150649.png)

注意： push 是将本地库代码推送到远程库，如果**本地库代码跟远程库代码版本不一致，push 的操作是会被拒绝的**。也就是说， 要想 push 成功，一定要**保证本地库的版本要比远程库的版本高**！ 因此一个成熟的程序员在动手改本地代码之前，一定会**先检查下远程库跟本地代码的区别**！如果本地的**代码版本**已经**落后**，切记要**先 pull 拉取一下远程库的代码**，将本地代码更新到最新以后，然后再修改，提交，推送！  

### 8.4 pull 拉取远程库到本地库  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209151108.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209151236.png)

注意： pull 是拉取远端仓库代码到本地，如果远程库代码和本地库代码不一致，会自动合并，如果自动合并失败，还会涉及到手动解决冲突的问题。  

### 8.5 clone 克隆远程库到本地  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230314213440.png)

或者
**在idea初始化界面点击Get from VCSl通过url克隆代码**

![image-20230209152200957](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230209152200957.png)



设置打开idea为初始化界面：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209152424.png)

## 9、码云  

### 9.1 码云创建远程库  

点击首页右上角的加号，选择下面的新建仓库  
填写仓库名称，路径和选择是否开源（共开库或私有库）  
最后根据需求选择分支模型，然后点击创建按钮。  
远程库创建好以后，就可以看到 HTTPS 和 SSH 的链接。  

### 9.2 IDEA 集成码云  

Idea 默认不带码云插件，我们第一步要安装 Gitee 插件

添加码云账号：

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209202215.png)

分享项目到码云上：  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209202655.png)

push、pull与github操作差不多（注意ssh或https链接地址

### 9.3 码云复制 GitHub 项目  

新建仓库时导入

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209203418.png)

## 10、自建代码托管平台-GitLab  

### 10.1 GitLab 简介 

​	GitLab 是由 GitLabInc.开发，使用 MIT 许可证的基于网络的 Git 仓库管理工具，且具有wiki 和 issue 跟踪功能。使用 Git 作为代码管理工具，并在此基础上搭建起来的 web 服务。
​	GitLab 由乌克兰程序员 DmitriyZaporozhets 和 ValerySizov 开发，它使用 Ruby 语言写成。后来，一些部分用 Go 语言重写。截止 2018 年 5 月，该公司约有 290 名团队成员，以及 2000 多名开源贡献者。 GitLab 被 IBM， Sony， JülichResearchCenter， NASA， Alibaba，
Invincea， O’ReillyMedia， Leibniz-Rechenzentrum(LRZ)， CERN， SpaceX 等组织使用。  

### 10.2 GitLab 官网地址 

官网地址： https://about.gitlab.com/
安装说明： https://about.gitlab.com/installation/  

### 10.3 GitLab 安装  

#### 10.3.1 服务器准备  

准备一个系统为 CentOS7 以上版本的服务器， 要求内存 4G，磁盘 50G。
关闭防火墙， 并且配置好主机名和 IP，保证服务器可以上网。
此教程使用虚拟机：主机名： gitlab-server
								 IP 地址： 192.168.6.200  

#### 10.3.2 安装包准备  

​	Yum 在线安装 gitlab- ce 时，需要下载几百 M 的安装文件，非常耗时，所以最好提前把所需 RPM 包下载到本地，然后使用离线 rpm 的方式安装。  

下载地址：
https://packages.gitlab.com/gitlab/gitlabce/packages/el/7/gitlab-ce-13.10.2-ce.0.el7.x86_64.rpm  

#### 10.3.3 编写安装脚本  

安装 gitlab 步骤比较繁琐，因此我们可以参考官网编写 gitlab 的安装脚本。  

![image-20230209215654883](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230209215654883.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209215709.png)

给脚本增加执行权限

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209215726.png)

然后执行该脚本，开始安装 gitlab-ce。注意一定要保证服务器可以上网

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209215747.png)

#### 10.3.4 初始化 GitLab 服务  

执行以下命令初始化 GitLab 服务，过程大概需要几分钟，耐心等待  

![image-20230209215813902](https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20230209215813902.png)

#### 10.3.5 启动 GitLab 服务  

执行以下命令启动 GitLab 服务：gitlab-ctl start  
如需停止：执行 gitlab-ctl stop  

#### 10.3.6 使用浏览器访问 GitLab  

使用主机名或者 IP 地址即可访问 GitLab 服务。需要提前配一下 windows 的 hosts 文件。  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209215915.png)

首次登陆之前，需要修改下 GitLab 提供的 root 账户的密码，要求 8 位以上，包含大小写子母和特殊符号。因此我们修改密码
然后使用修改后的密码登录 GitLab  

#### 10.3.7 GitLab 创建远程库  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209220007.png)

#### 10.3.8 IDEA 集成 GitLab  

1） 安装 GitLab 插件  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209220030.png)

2）设置 GitLab 插件  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209220053.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209220108.png)

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209220123.png)

3） push 本地代码到 GitLab 远程库  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209220146.png)

自定义远程连接  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209220208.png)

注意： gitlab 网页上复制过来的连接是： http://gitlab.example.com/root/git-test.git，
需要手动修改为： http://gitlab-server/root/git-test.git
选择 gitlab 远程连接，进行 push。  

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230209220238.png)

只要 GitLab 的远程库连接定义好以后， 对 GitLab 远程库进行 pull 和 clone 的操作和 Github 和码云一致

## 11、Git标签操作

Git中的标签是指**某个分支某个特定时间点的状态**（快照？），通过标签，可以很方便的切换到标记时的状态

![](https://raw.githubusercontent.com/T4mako/ImageBed/main/20230314211432.png)

git tag				列出已有标签
git tag 标签名	创建标签
git push 远程仓库别名 标签名	将标签推送至远程仓库
git checkout -b 新分支名 标签名	检出标签（将当前标签的状态下载下来）		

**标签是一个静态的概念，标签打好了，就不会变了**
**分支可以修改，是动态的**