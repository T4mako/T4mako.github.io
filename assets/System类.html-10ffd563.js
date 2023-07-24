import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,d as t}from"./app-a589a01e.js";const p={},o=t(`<h1 id="system类" tabindex="-1"><a class="header-anchor" href="#system类" aria-hidden="true">#</a> System类</h1><p>常用方法：<br> 1、native long currentTimeMillis()：该方法的作用是返回当前的计算机时间，时间的表达格式为当前计算机时间和GMT时间(格林威治时间)1970年1月1号0时0分0秒所差的毫秒数。<br> 2、void exit(int status)：该方法的作用是退出程序。其中status的值为0代表正常退出，非零代表异常退出。 使用该方法可以在图形界面编程中实现程序的退出功能等。<br> 3、void gc()：该方法的作用是请求系统进行垃圾回收。至于系统是否立刻回收，则<br> 取决于系统中垃圾回收算法的实现以及系统执行时的情况。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>tring javaVersion <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;java.version&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;java的version:&quot;</span> <span class="token operator">+</span> javaVersion<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> javaHome <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;java.home&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;java的home:&quot;</span> <span class="token operator">+</span> javaHome<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> osName <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;os.name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;os的name:&quot;</span> <span class="token operator">+</span> osName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> osVersion <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;os.version&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;os的version:&quot;</span> <span class="token operator">+</span> osVersion<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> userName <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;user.name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;user的name:&quot;</span> <span class="token operator">+</span> userName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> userHome <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;user.home&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;user的home:&quot;</span> <span class="token operator">+</span> userHome<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> userDir <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;user.dir&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;user的dir:&quot;</span> <span class="token operator">+</span> userDir<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","System类.html.vue"]]);export{k as default};
