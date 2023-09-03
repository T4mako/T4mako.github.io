import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as l,c as p,a as c,b as n,d as s,e,f as t}from"./app-109e850b.js";const u={},r=n("p",null,"使用 GitHub Actions 部署，以 vuepress-theme-hope Blog 为例",-1),d=n("p",null,[s("关于 git 相关使用 "),n("a",{href:"/code/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/Git"},"GIt基础")],-1),k={href:"https://github.com/features/actions",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.ruanyifeng.com/blog/2015/09/continuous-integration.html",target:"_blank",rel:"noopener noreferrer"},m=t('<h3 id="github-actions-术语" tabindex="-1"><a class="header-anchor" href="#github-actions-术语" aria-hidden="true">#</a> GitHub Actions 术语：</h3><ul><li><strong>workflow</strong> （工作流程）：持续集成一次运行的过程，就是一个 wor kflow。</li><li><strong>job</strong> （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。</li><li><strong>step</strong>（步骤）：每个 job 由多个 step 构成，一步步完成。</li><li><strong>action</strong> （动作）：每个 step 可以依次执行一个或多个命令（action）。</li></ul><h3 id="workflow-文件" tabindex="-1"><a class="header-anchor" href="#workflow-文件" aria-hidden="true">#</a> workflow 文件</h3><p>GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的<code>.github/workflows</code>目录。</p><p>workflow 文件采用 YAML 格式，文件名可以任意取<br> 一个库可以有多个 workflow 文件<br> GitHub 只要发现<code>.github/workflows</code>目录里面有<code>.yml</code>文件，就会自动运行该文件。</p>',5),b={href:"https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions",target:"_blank",rel:"noopener noreferrer"},h=t(`<h3 id="部署-vuepress-theme-hope-blog-到-github-pages" tabindex="-1"><a class="header-anchor" href="#部署-vuepress-theme-hope-blog-到-github-pages" aria-hidden="true">#</a> 部署 vuepress-theme-hope Blog 到 GitHub pages</h3><p>当 commit 到 main 分支后，GitHub Actions 就会执行 jobs 下的步骤</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 自动部署的名称</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> 部署文档

<span class="token comment"># 自动部署的条件</span>
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token comment"># 确保这是你正在使用的分支名称</span>
      <span class="token punctuation">-</span> main

<span class="token key atrule">permissions</span><span class="token punctuation">:</span>
  <span class="token key atrule">contents</span><span class="token punctuation">:</span> write

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">deploy-gh-pages</span><span class="token punctuation">:</span>
    <span class="token comment">#运行在Ubuntu环境</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest 
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>
          <span class="token comment"># 如果你文档需要 Git 子模块，取消注释下一行</span>
          <span class="token comment"># submodules: true</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup pnpm
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> pnpm/action<span class="token punctuation">-</span>setup@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">8</span>
          <span class="token key atrule">run_install</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>


      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">18</span>
          <span class="token key atrule">cache</span><span class="token punctuation">:</span> pnpm


      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 构建文档
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">NODE_OPTIONS</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>max_old_space_size=8192
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
          pnpm run docs<span class="token punctuation">:</span>build
          <span class="token punctuation">&gt;</span> src/.vuepress/dist/.nojekyll

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 部署文档
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 这是文档部署到的分支名称</span>
          <span class="token key atrule">branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token key atrule">folder</span><span class="token punctuation">:</span> src/.vuepress/dist

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，提交到 main 分支下的内容通过自动构建并将 dist 目录部署到 GitHub Pages 上（注意设置GitHub Pages的依赖分支）</p>`,4);function g(y,f){const a=o("ExternalLinkIcon");return l(),p("div",null,[r,c(" more "),d,n("p",null,[n("a",k,[s("GitHub Actions"),e(a)]),s(" 是 GitHub 的 "),n("a",v,[s("持续集成服务(CI/CD)"),e(a)])]),m,n("p",null,[s("workflow 文件配置规则："),n("a",b,[s("https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions"),e(a)])]),h])}const G=i(u,[["render",g],["__file","GitHub Actions.html.vue"]]);export{G as default};
