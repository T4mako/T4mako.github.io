import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,d as e}from"./app-a589a01e.js";const t={},p=e(`<h2 id="程序流程控制" tabindex="-1"><a class="header-anchor" href="#程序流程控制" aria-hidden="true">#</a> 程序流程控制</h2><h3 id="_1、if-else" tabindex="-1"><a class="header-anchor" href="#_1、if-else" aria-hidden="true">#</a> 1、if-else</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">if</span><span class="token punctuation">(</span>条件表达式<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    执行表达式<span class="token number">1</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>条件表达式<span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   执行表达还<span class="token number">2</span> 
<span class="token punctuation">}</span>
<span class="token keyword">else</span><span class="token punctuation">{</span>
    执行表达式<span class="token number">3</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、switch-case" tabindex="-1"><a class="header-anchor" href="#_2、switch-case" aria-hidden="true">#</a> 2、switch-case</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">switch</span><span class="token punctuation">(</span>表达式<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">case</span> 常量<span class="token number">1</span><span class="token operator">:</span> 语句<span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">//break;</span>
    <span class="token keyword">case</span> 常量<span class="token number">2</span><span class="token operator">:</span> 语句<span class="token number">2</span><span class="token punctuation">;</span><span class="token comment">//break;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">default</span><span class="token operator">:</span> 语句<span class="token punctuation">;</span> <span class="token comment">//break;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>case语句中没break会一直执行下去。</strong><br><strong>case后</strong>只能声明<strong>常量</strong>。</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>switch后的表达式，只能是如下的6中数据类型之一：<br> byte，short，char，int，枚举类型（JDK5.0新增），String类型（JDK7.0新增）</p></div><p><strong>switch-case与if-else的区别：</strong><br> 1、可以用<strong>switch-case</strong>结构的语句<strong>都可转换成if-else</strong>，<strong>反之不成立</strong>。<br> 2、若要写的分支语句既可以用switch-case又可以用if-else，同时switch情况不太多，则<strong>优先使用switch-case</strong>。(switch-case比if-else执行效率稍高)</p><h3 id="_3、for循环" tabindex="-1"><a class="header-anchor" href="#_3、for循环" aria-hidden="true">#</a> 3、for循环</h3><p>循环结构的四要素：<br> ①初始化条件②循环条件③循环体④迭代条件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for(①;②;④){
    ③
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、while与do-while循环" tabindex="-1"><a class="header-anchor" href="#_4、while与do-while循环" aria-hidden="true">#</a> 4、while与do-while循环</h3><p>for循环和while循环<strong>可以相互转换</strong><br> do-while<strong>至少会执行一次</strong>循环体</p><h3 id="_5、break与continue" tabindex="-1"><a class="header-anchor" href="#_5、break与continue" aria-hidden="true">#</a> 5、break与continue</h3><p><strong>break</strong>：结束当前循环<br><strong>continue</strong>：结束当次循环</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//结束指定的循环层</span>
label<span class="token operator">:</span> <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>i <span class="token operator">&lt;=</span> <span class="token number">4</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>j <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span>j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>j<span class="token operator">%</span><span class="token number">4</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span> label<span class="token punctuation">;</span><span class="token comment">//结束指定表示的一层循环结构</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//输出123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","4、程序流程控制.html.vue"]]);export{d as default};
