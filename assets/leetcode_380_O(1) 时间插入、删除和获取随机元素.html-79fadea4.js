import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as c,c as l,e as a,b as n,d as p,f as i}from"./app-898aaf2b.js";const u={},k=n("h1",{id:"_380-o-1-时间插入、删除和获取随机元素",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_380-o-1-时间插入、删除和获取随机元素","aria-hidden":"true"},"#"),p(" 380. O(1) 时间插入、删除和获取随机元素")],-1),d={href:"https://leetcode.cn/problems/insert-delete-getrandom-o1/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noopener noreferrer"},r=i(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">RandomizedSet</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">;</span>
    <span class="token class-name">Random</span> random<span class="token punctuation">;</span>
    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> map<span class="token punctuation">;</span>
    <span class="token keyword">int</span> index<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">RandomizedSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        nums <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">200010</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        random <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        index <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            nums<span class="token punctuation">[</span><span class="token operator">++</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
            map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// map 中删除，获得旧值索引</span>
            <span class="token class-name">Integer</span> idx <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// index 指向索引移动到旧数据上，k-v 改变</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>idx <span class="token operator">!=</span> index<span class="token punctuation">)</span><span class="token punctuation">{</span>
                map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">,</span>idx<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 旧索引的值为新索引所在的值，index--</span>
            nums<span class="token punctuation">[</span>idx<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>index<span class="token operator">--</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> nums<span class="token punctuation">[</span>random<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function v(m,b){const t=s("Badge"),e=s("ExternalLinkIcon");return c(),l("div",null,[k,a(t,{text:"中等",type:"warning",vertical:"middle"}),n("p",null,[n("a",d,[p("题目描述"),a(e)])]),r])}const y=o(u,[["render",v],["__file","leetcode_380_O(1) 时间插入、删除和获取随机元素.html.vue"]]);export{y as default};
