import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-94759c00.js";const p={},e=t(`<h1 id="vue-router-路由" tabindex="-1"><a class="header-anchor" href="#vue-router-路由" aria-hidden="true">#</a> vue-router 路由</h1><h2 id="_1-1、相关概念" tabindex="-1"><a class="header-anchor" href="#_1-1、相关概念" aria-hidden="true">#</a> 1.1、相关概念</h2><h3 id="spa" tabindex="-1"><a class="header-anchor" href="#spa" aria-hidden="true">#</a> SPA</h3><p><strong>vue-router</strong> ：vue 的一个插件库，专门用来实现 SPA 应用</p><blockquote><p>对 <strong>SPA</strong> 应用的理解 :</p><ol><li><strong>单页</strong> Web 应用（<strong>single page web application</strong>，SPA）</li><li>整个应用只有<strong>一个完整的页面</strong></li><li>点击页面中的 <strong>导航链接</strong> 不会刷新页面，只会做页面的 <strong>局部更新</strong></li><li>数据需要通过 <strong>ajax</strong> 请求获取。</li></ol></blockquote><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/20230519122533.png" alt="" loading="lazy"></p><h3 id="路由的理解" tabindex="-1"><a class="header-anchor" href="#路由的理解" aria-hidden="true">#</a> 路由的理解</h3><ol><li>一个 <strong>路由</strong> 就是一组 <strong>映射关系</strong>（key - value）</li><li><strong>key</strong> 为 <strong>路径</strong>， <strong>value</strong> 可能是 <strong>function</strong> 或 <strong>component</strong></li></ol><h3 id="路由分类" tabindex="-1"><a class="header-anchor" href="#路由分类" aria-hidden="true">#</a> 路由分类：</h3><ol><li><p>后端路由：</p><p>理解：value 是 function, 用于处理客户端提交的请求。<br> 工作过程：服务器接收到一个请求时, 根据请求路径找到匹配的函数来处理请求, 返回响应数据。</p></li><li><p>前端路由：<br> 理解：value 是 component，用于展示页面内容。<br> 工作过程：当浏览器的路径改变时, 对应的组件就会显示。</p></li></ol><h2 id="_1-2、vue-router-基本使用" tabindex="-1"><a class="header-anchor" href="#_1-2、vue-router-基本使用" aria-hidden="true">#</a> 1.2、vue-router 基本使用</h2><p>插件的安装：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i vue-router
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>注：vue-router 最新为4版本，只能在 vue3 中使用<br> vue2 需使用 3 版本的 vue-router</p></blockquote><ol><li><p>在 src 下 创建 <strong>router 文件夹</strong>，并创建 <strong>index.js</strong> 文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 该文件专门用于创建整个应用的路由器</span>
<span class="token comment">// 引入 VueRouter</span>
<span class="token keyword">import</span> VueRouter <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>
<span class="token comment">// 引入组件</span>
<span class="token keyword">import</span> About <span class="token keyword">from</span> <span class="token string">&#39;../components/About.vue&#39;</span>
<span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">&#39;../components/Home.vue&#39;</span>


<span class="token comment">// 创建一个路由器</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// 配置路由</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/about&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span>About
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/home&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span>Home
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改 <strong>main.js</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>

<span class="token comment">// 引入 VueRouter</span>
<span class="token keyword">import</span> VueRouter <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>
<span class="token comment">// 应用插件</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VueRouter<span class="token punctuation">)</span>

<span class="token comment">// 引入路由器</span>
<span class="token comment">// /router/index.js 可以简写，省略index.js</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">&#39;./router&#39;</span> 

<span class="token comment">// 关闭 vue 的生产提示</span>
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>productionTip <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 渲染</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">beforeCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$bus <span class="token operator">=</span> <span class="token keyword">this</span> <span class="token comment">//安装全局事件总线</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 增加路由配置项</span>
  <span class="token literal-property property">router</span><span class="token operator">:</span>router
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>切换导航栏（active-class可配置高亮样式）</p><p>在对应组件中添加</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">active-class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>active<span class="token punctuation">&quot;</span></span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/about<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>About<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>展示组件</p><p>在对应组件中添加</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><h2 id="_1-3、几个注意点" tabindex="-1"><a class="header-anchor" href="#_1-3、几个注意点" aria-hidden="true">#</a> 1.3、几个注意点</h2><ol><li><p><strong>路由组件</strong> 通常存放在 <strong><code>pages</code></strong> 文件夹，<strong>一般组件</strong> 通常存放在 <strong><code>components</code></strong> 文件夹。</p></li><li><p>通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。</p></li><li><p>每个 <strong>组件</strong> 都有 <strong>自己的</strong> <strong><code>$route</code></strong> 属性，里面存储着 <strong>自己的路由信息</strong>。</p></li><li><p>整个应用只有 <strong>一个router</strong>，可以通过组件的 <strong><code>$router</code></strong> 属性获取到。</p></li></ol><p>（注意 route 和 router 的区别）</p><h2 id="_1-4、多级-嵌套-路由" tabindex="-1"><a class="header-anchor" href="#_1-4、多级-嵌套-路由" aria-hidden="true">#</a> 1.4、多级（嵌套）路由</h2><ol><li><p>在 router/index.js 中配置路由规则</p><p>使用 <strong>children</strong> 配置项：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">routes</span><span class="token operator">:</span><span class="token punctuation">[</span>
   <span class="token punctuation">{</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/about&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">component</span><span class="token operator">:</span>About<span class="token punctuation">,</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
       <span class="token comment">// 第一级需要加 &#39;/&#39;</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/home&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">component</span><span class="token operator">:</span>Home<span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span> <span class="token comment">//通过 children 配置子级路由</span>
         <span class="token punctuation">{</span>
             <span class="token comment">//此处一定不要写：/news</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;news&#39;</span><span class="token punctuation">,</span> 
            <span class="token literal-property property">component</span><span class="token operator">:</span>News
         <span class="token punctuation">}</span><span class="token punctuation">,</span>
         <span class="token punctuation">{</span>
             <span class="token comment">//此处一定不要写：/message</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span>Message
         <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>跳转（要写完整路径）：</p><p>在对应组件中添加</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- 注意些完整路径，不要加. --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/home/news<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>News<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>展示组件</p><p>在对应组件中添加</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><h2 id="_1-5、路由传参" tabindex="-1"><a class="header-anchor" href="#_1-5、路由传参" aria-hidden="true">#</a> 1.5、路由传参</h2><h3 id="_1-5-1、query-参数" tabindex="-1"><a class="header-anchor" href="#_1-5-1、query-参数" aria-hidden="true">#</a> 1.5.1、query 参数</h3><ol><li><p>​ 传递参数</p><p>通过 router-link 向 指定组件 传递数据</p><p>① query参数 字符串写法</p><p>② query参数 对象写法</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- 跳转并携带query参数，to的字符串写法 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/home/message/detail?id=666&amp;title=你好<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
            
<span class="token comment">&lt;!-- 跳转并携带query参数，to的对象写法 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> 
   <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
      path:&#39;/home/message/detail&#39;,
      query:{
         id:666,
            title:&#39;你好&#39;
      }
   }<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>接收参数：</p><p>在 接受组件中 通过 <strong><code>$route.query.xxx</code></strong> 接受参数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>$route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>id
$route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>title
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="_1-5-2、params-参数" tabindex="-1"><a class="header-anchor" href="#_1-5-2、params-参数" aria-hidden="true">#</a> 1.5.2、params 参数</h3><ol><li><p><strong>配置路由</strong>，<strong>声明接收 params 参数</strong></p><p>在 <strong>index.js</strong> 中提供配置，使用占位符声明接收 params 参数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/home&#39;</span><span class="token punctuation">,</span>
   <span class="token literal-property property">component</span><span class="token operator">:</span>Home<span class="token punctuation">,</span>
   <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
         <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;news&#39;</span><span class="token punctuation">,</span>
         <span class="token literal-property property">component</span><span class="token operator">:</span>News
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
         <span class="token literal-property property">component</span><span class="token operator">:</span>Message<span class="token punctuation">,</span>
         <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
               <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;xiangqing&#39;</span><span class="token punctuation">,</span>
               <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;detail/:id/:title&#39;</span><span class="token punctuation">,</span> <span class="token comment">//使用占位符声明接收params参数</span>
               <span class="token literal-property property">component</span><span class="token operator">:</span>Detail
            <span class="token punctuation">}</span>
         <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>传递参数</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- 跳转并携带params参数，to的字符串写法 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>\`/home/message/detail/\${m.id}/\${m.title}\`<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{m.title}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
            
<span class="token comment">&lt;!-- 跳转并携带params参数，to的对象写法 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
        name: &#39;detail&#39;,
        params: {
            id: m.id,
            title: m.title
        }
}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{m.title}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>特别注意：路由携带 params 参数时，若使用 to 的 <strong>对象写法</strong>，则不能使用path配置项，<strong>必须使用name配置</strong>！</p></blockquote></li><li><p>接收参数：</p><p>通过 params 接收参数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>$route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id
$route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>title
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_1-6、路由命名" tabindex="-1"><a class="header-anchor" href="#_1-6、路由命名" aria-hidden="true">#</a> 1.6、路由命名</h2><ol><li><p>作用：可以简化路由的跳转</p></li><li><p>使用方式：</p><ol><li><p>给路由命名：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建一个路由器</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token comment">// 一级路由</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/about&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span>About
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/home&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span>Home<span class="token punctuation">,</span>
            <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;news&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">component</span><span class="token operator">:</span>News
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">component</span><span class="token operator">:</span>Message<span class="token punctuation">,</span>
                    <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span>
                        <span class="token punctuation">{</span> <span class="token comment">// 带 命名 的 路由</span>
                            <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;detail&#39;</span><span class="token punctuation">,</span>
                            <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;detail&#39;</span><span class="token punctuation">,</span>
                            <span class="token literal-property property">component</span><span class="token operator">:</span>Detail<span class="token punctuation">,</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>简化跳转：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!--简化前，需要写完整的路径 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/demo/test/welcome<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!--简化后，直接通过名字跳转 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{name:&#39;hello&#39;}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!--简化写法配合传递参数 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> 
   <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
      name:&#39;hello&#39;,
      query:{
         id:666,
            title:&#39;你好&#39;
      }
   }<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">&gt;</span></span>跳转<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol></li></ol><h2 id="_1-7、路由的-props-配置" tabindex="-1"><a class="header-anchor" href="#_1-7、路由的-props-配置" aria-hidden="true">#</a> 1.7、路由的 props 配置</h2><p>作用：让路由组件更方便的收到参数</p><p>发送参数：在 index.js 中配置 <strong>props</strong> 配置项</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
	<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;detail&#39;</span><span class="token punctuation">,</span>
	<span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;detail/:id&#39;</span><span class="token punctuation">,</span>
	<span class="token literal-property property">component</span><span class="token operator">:</span>Detail<span class="token punctuation">,</span>

	<span class="token comment">//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件</span>
	<span class="token comment">// props:{a:900}</span>

	<span class="token comment">//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件</span>
	<span class="token comment">// props:true</span>
	
	<span class="token comment">//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件</span>
	<span class="token function">props</span><span class="token punctuation">(</span><span class="token parameter">route</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">id</span><span class="token operator">:</span>route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
			<span class="token literal-property property">title</span><span class="token operator">:</span>route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>title
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接收参数：在 接收参数的组件 用 props 配置项接收</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;Detail&#39;</span><span class="token punctuation">,</span>
		<span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;title&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//接收</span>
		<span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token comment">// id(){</span>
			<span class="token comment">// 	return this.$route.query.id</span>
			<span class="token comment">// },</span>
			<span class="token comment">// title(){</span>
			<span class="token comment">// 	return this.$route.query.title</span>
			<span class="token comment">// },</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// console.log(this.$route)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-8、router-link-的-replace-属性" tabindex="-1"><a class="header-anchor" href="#_1-8、router-link-的-replace-属性" aria-hidden="true">#</a> 1.8、router-link 的 replace 属性</h2><ol><li><p>作用：控制路由跳转时操作 <strong>浏览器历史记录</strong> 的模式</p></li><li><p>浏览器的历史记录有两种写入方式：分别为 <strong><code>push</code></strong> 和 <strong><code>replace</code></strong><br><code>push</code>是<strong>追加</strong>历史记录 （可回退）<br><code>replace</code>是<strong>替换</strong>当前记录 （不可回退）<br> 路由跳转时候 <strong>默认为<code>push</code></strong></p></li><li><p>如何 <strong>开启<code>replace</code></strong> 模式：<strong><code>&lt;router-link replace .......&gt;News&lt;/router-link&gt;</code></strong></p></li></ol><h2 id="_1-9、编程式路由导航-router" tabindex="-1"><a class="header-anchor" href="#_1-9、编程式路由导航-router" aria-hidden="true">#</a> 1.9、编程式路由导航（$router）</h2><p>不借助<code>&lt;router-link&gt; </code>实现路由跳转，让路由跳转更加灵活</p><p>具体编码：<br><code>this.$router.push</code>：push 方式路由<br><code>this.$router.replace</code>：replace 方式路由<br><code>this.$router.forward()</code> /：前进<br><code>this.$router.back()</code> ：后退<br><code>this.$router.go()</code> ：可前进也可后退（正负数控制）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//$router的两个API</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;xiangqing&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">params</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span>xxx<span class="token punctuation">,</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span>xxx
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;xiangqing&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">params</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span>xxx<span class="token punctuation">,</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span>xxx
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//前进</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//后退</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//可前进也可后退</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案例：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>m in messageList<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>m.id<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
               <span class="token comment">&lt;!-- 通过按钮的点击事件完成路由，通过方法传递参数m --&gt;</span> 
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pushShow(m)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>push查看<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>replaceShow(m)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>replace查看<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>hr</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;Message&#39;</span><span class="token punctuation">,</span>
		<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>
				<span class="token literal-property property">messageList</span><span class="token operator">:</span><span class="token punctuation">[</span>
					<span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">&#39;001&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&#39;消息001&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
					<span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">&#39;002&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&#39;消息002&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
					<span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">&#39;003&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&#39;消息003&#39;</span><span class="token punctuation">}</span>
				<span class="token punctuation">]</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token comment">// 路由实现</span>
			<span class="token function">pushShow</span><span class="token punctuation">(</span><span class="token parameter">m</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
					<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;xiangqing&#39;</span><span class="token punctuation">,</span>
					<span class="token literal-property property">query</span><span class="token operator">:</span><span class="token punctuation">{</span>
						<span class="token literal-property property">id</span><span class="token operator">:</span>m<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
						<span class="token literal-property property">title</span><span class="token operator">:</span>m<span class="token punctuation">.</span>title
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token function">replaceShow</span><span class="token punctuation">(</span><span class="token parameter">m</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
					<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;xiangqing&#39;</span><span class="token punctuation">,</span>
					<span class="token literal-property property">query</span><span class="token operator">:</span><span class="token punctuation">{</span>
						<span class="token literal-property property">id</span><span class="token operator">:</span>m<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
						<span class="token literal-property property">title</span><span class="token operator">:</span>m<span class="token punctuation">.</span>title
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-10、缓存路由组件" tabindex="-1"><a class="header-anchor" href="#_1-10、缓存路由组件" aria-hidden="true">#</a> 1.10、缓存路由组件</h2><p>作用：让不展示的路由组件保持挂载，不被销毁。</p><p>具体编码：<br> 在 <strong>router-view 外</strong> 添加 keep-alive<br> 不写 include 代表 router-view 中所有组件<br> 写 include 指定 <strong>组件名</strong></p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- include 中为组件名 --&gt;</span>
<span class="token comment">&lt;!-- 多个组件： :include=&quot;[&#39;News&#39;,&#39;Messages&#39;]&quot; --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">include</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>News<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-11、新生命周期-activated、deactivated" tabindex="-1"><a class="header-anchor" href="#_1-11、新生命周期-activated、deactivated" aria-hidden="true">#</a> 1.11、新生命周期 activated、deactivated</h2><p>路由组件所独有的两个钩子，用于捕获路由组件的激活状态。</p><p>具体名字：</p><ol><li><code>activated</code>路由组件被 <strong>激活</strong> 时触发。</li><li><code>deactivated</code>路由组件 <strong>失活</strong> 时触发</li></ol><p>当缓存了路由组件后，有些方法等不想被缓存，可以使用这两个生命周期钩子</p><p>举例：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;News&#39;</span><span class="token punctuation">,</span>
		<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>
				<span class="token literal-property property">opacity</span><span class="token operator">:</span><span class="token number">1</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">/* beforeDestroy() {
			console.log(&#39;News组件即将被销毁了&#39;)
			clearInterval(this.timer)
		}, */</span>
		<span class="token comment">/* mounted(){
			this.timer = setInterval(() =&gt; {
				console.log(&#39;@&#39;)
				this.opacity -= 0.01
				if(this.opacity &lt;= 0) this.opacity = 1
			},16)
		}, */</span>
		<span class="token function">activated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;News组件被激活了&#39;</span><span class="token punctuation">)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;@&#39;</span><span class="token punctuation">)</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>opacity <span class="token operator">-=</span> <span class="token number">0.01</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>opacity <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>opacity <span class="token operator">=</span> <span class="token number">1</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">16</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">deactivated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;News组件失活了&#39;</span><span class="token punctuation">)</span>
			<span class="token function">clearInterval</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-12、路由守卫" tabindex="-1"><a class="header-anchor" href="#_1-12、路由守卫" aria-hidden="true">#</a> 1.12、路由守卫</h2><p>作用：对路由进行权限控制<br> 分类：分类：全局前置路由守卫、全局后置路由守卫、独享守卫、组件内守卫</p><h3 id="_1-12-1、全局路由守卫" tabindex="-1"><a class="header-anchor" href="#_1-12-1、全局路由守卫" aria-hidden="true">#</a> 1.12.1、全局路由守卫</h3><p>全局路由守卫分为：① 全局前置路由守卫 ② 全局后置路由守卫</p><p>全局前置路由守卫：<br><strong>初始化时执行、每次路由切换前执行</strong> <br> 方法：<strong><code>router.beforeEach(to,from,next)</code></strong></p><p>全局后置路由守卫：<br><strong>初始化的时候被调用、每次路由切换之后被调用</strong><br> 方法：<strong><code>router.afterEach(to,from)</code></strong></p><p>在 <strong>index.js</strong> 中编写全局路由守卫：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//创建并暴露一个路由器</span>
<span class="token keyword">const</span> router <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token literal-property property">routes</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;xinwen&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;news&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span>News<span class="token punctuation">,</span>
            <span class="token literal-property property">meta</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">isAuth</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&#39;新闻&#39;</span><span class="token punctuation">}</span> <span class="token comment">// 配置 meta 中的数据</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用</span>
router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span>from<span class="token punctuation">,</span>next</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;前置路由守卫&#39;</span><span class="token punctuation">,</span>to<span class="token punctuation">,</span>from<span class="token punctuation">)</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>isAuth<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//判断是否需要鉴权</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&#39;school&#39;</span><span class="token punctuation">)</span><span class="token operator">===</span><span class="token string">&#39;school A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 放行</span>
		<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
			<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;学校名不对，无权限查看！&#39;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
		<span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用</span>
router<span class="token punctuation">.</span><span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span><span class="token keyword">from</span></span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;后置路由守卫&#39;</span><span class="token punctuation">,</span>to<span class="token punctuation">,</span>from<span class="token punctuation">)</span>
	document<span class="token punctuation">.</span>title <span class="token operator">=</span> to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>title <span class="token operator">||</span> <span class="token string">&#39;system&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> router
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-12-2、独享守卫" tabindex="-1"><a class="header-anchor" href="#_1-12-2、独享守卫" aria-hidden="true">#</a> 1.12.2、独享守卫</h3><p>独享守卫在 index.js 给单独的路由配置，注：独享路由守卫只有前置守卫</p><p>函数：<strong>beforeEnter: (to, from, next) =&gt; {}</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//创建并暴露一个路由器</span>
<span class="token keyword">const</span> router <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token literal-property property">routes</span><span class="token operator">:</span><span class="token punctuation">[</span>
		<span class="token punctuation">{</span>
			<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;zhuye&#39;</span><span class="token punctuation">,</span>
			<span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/home&#39;</span><span class="token punctuation">,</span>
			<span class="token literal-property property">component</span><span class="token operator">:</span>Home<span class="token punctuation">,</span>
			<span class="token literal-property property">meta</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&#39;主页&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span>
				<span class="token punctuation">{</span>
					<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;xinwen&#39;</span><span class="token punctuation">,</span>
					<span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;news&#39;</span><span class="token punctuation">,</span>
					<span class="token literal-property property">component</span><span class="token operator">:</span>News<span class="token punctuation">,</span>
					<span class="token literal-property property">meta</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">isAuth</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&#39;新闻&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token comment">// 配置 meta 数据</span>
                    <span class="token comment">// 独享路由守卫</span>
					<span class="token function-variable function">beforeEnter</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
						console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;独享路由守卫&#39;</span><span class="token punctuation">,</span>to<span class="token punctuation">,</span>from<span class="token punctuation">)</span>
						<span class="token keyword">if</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>isAuth<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//判断是否需要鉴权</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&#39;school&#39;</span><span class="token punctuation">)</span><span class="token operator">===</span><span class="token string">&#39;school a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
								<span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
							<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;学校名不对，无权限查看！&#39;</span><span class="token punctuation">)</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
							<span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">]</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用</span>
router<span class="token punctuation">.</span><span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span><span class="token keyword">from</span></span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;后置路由守卫&#39;</span><span class="token punctuation">,</span>to<span class="token punctuation">,</span>from<span class="token punctuation">)</span>
	document<span class="token punctuation">.</span>title <span class="token operator">=</span> to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>title <span class="token operator">||</span> <span class="token string">&#39;硅谷系统&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> router
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-12-3、组件内守卫" tabindex="-1"><a class="header-anchor" href="#_1-12-3、组件内守卫" aria-hidden="true">#</a> 1.12.3、组件内守卫</h3><p>组件内守卫写在 <strong>组件的配置项</strong> 中，对应函数的调用时机为 进入该组件和离开该组件时调用，区别于前后置路由守卫的执行时机</p><p>进入该组件时被调用：<strong>beforeRouteEnter (to, from, next)</strong><br> 离开该组件时被调用：<strong>beforeRouteLeave (to, from, next)</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//进入守卫：通过路由规则，进入该组件时被调用</span>
<span class="token function">beforeRouteEnter</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
    
<span class="token comment">//离开守卫：通过路由规则，离开该组件时被调用</span>
<span class="token function">beforeRouteLeave</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;About&#39;</span><span class="token punctuation">,</span>

		<span class="token comment">//通过路由规则，进入该组件时被调用</span>
		<span class="token function">beforeRouteEnter</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>isAuth<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//判断是否需要鉴权</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&#39;school&#39;</span><span class="token punctuation">)</span><span class="token operator">===</span><span class="token string">&#39;school A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
					<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;学校名不对，无权限查看！&#39;</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
				<span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>

		<span class="token comment">//通过路由规则，离开该组件时被调用</span>
		<span class="token function">beforeRouteLeave</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;About--beforeRouteLeave&#39;</span><span class="token punctuation">,</span>to<span class="token punctuation">,</span>from<span class="token punctuation">)</span>
			<span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-13、路由器的两种工作模式" tabindex="-1"><a class="header-anchor" href="#_1-13、路由器的两种工作模式" aria-hidden="true">#</a> 1.13、路由器的两种工作模式</h2><ol><li>对于一个url来说，# 及其后面的内容就是 hash 值。</li><li>hash值 <strong>不会包含在 HTTP 请求中</strong>，即：hash值不会带给服务器</li><li>hash模式： <ol><li><strong>地址中永远带着 # 号</strong>，不美观 。</li><li>若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法。</li><li>兼容性较好。</li></ol></li><li>history模式： <ol><li>地址干净，美观 。</li><li>兼容性和hash模式相比略差。</li><li>应用部署上线时需要后端人员支持，<strong>解决刷新页面服务端404的问题</strong></li></ol></li></ol><p>hash 模式与 history 模式的切换：在 <strong>index.js</strong> 中通过 <strong>mode</strong> 配置项配置</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> router <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token literal-property property">mode</span><span class="token operator">:</span><span class="token string">&#39;history&#39;</span><span class="token punctuation">,</span>
	<span class="token literal-property property">routes</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前端项目的打包（最后都以 html，css，js 的文件呈现）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> run build
<span class="token function">yarn</span> run build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,76),o=[e];function l(c,i){return s(),a("div",null,o)}const d=n(p,[["render",l],["__file","Vue笔记7-路由.html.vue"]]);export{d as default};
