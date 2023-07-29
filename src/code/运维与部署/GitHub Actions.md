---
title: GitHub Actions 部署
icon: ci  
date: 2023-07-24  
category: 
    - 部署
tag:   
    - CI/CD  
    - 部署  
    - GitHub
---


使用 GitHub Actions 部署，以 vuepress-theme-hope Blog 为例

<!-- more -->

关于 git  相关使用  [GIt基础](/code/基础知识/Git)

[GitHub Actions](https://github.com/features/actions) 是 GitHub 的 [持续集成服务(CI/CD)](https://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)

### GitHub Actions 术语：

- **workflow** （工作流程）：持续集成一次运行的过程，就是一个 wor	kflow。
- **job** （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。
- **step**（步骤）：每个 job 由多个 step 构成，一步步完成。
- **action** （动作）：每个 step 可以依次执行一个或多个命令（action）。

### workflow 文件

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的`.github/workflows`目录。

workflow 文件采用 YAML 格式，文件名可以任意取  
一个库可以有多个 workflow 文件  
GitHub 只要发现`.github/workflows`目录里面有`.yml`文件，就会自动运行该文件。

workflow 文件配置规则：https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions

### 部署 vuepress-theme-hope Blog 到 GitHub pages

当 commit 到 main 分支后，GitHub Actions 就会执行 jobs 下的步骤

```yml
# 自动部署的名称
name: 部署文档

# 自动部署的条件
on:
  push:
    branches:
      # 确保这是你正在使用的分支名称
      - main

permissions:
  contents: write

jobs:
  deploy-gh-pages:
    #运行在Ubuntu环境
    runs-on: ubuntu-latest 
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # 如果你文档需要 Git 子模块，取消注释下一行
          # submodules: true

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          run_install: true


      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm


      - name: 构建文档
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          pnpm run docs:build
          > src/.vuepress/dist/.nojekyll

      - name: 部署文档
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # 这是文档部署到的分支名称
          branch: gh-pages
          folder: src/.vuepress/dist

```

最后，提交到 main 分支下的内容通过自动构建并将 dist 目录部署到 GitHub Pages 上（注意设置GitHub Pages的依赖分支）