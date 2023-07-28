import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c as e,d as o,a as n,b as c,e as l}from"./app-e1356749.js";const u={},i=n("h1",{id:"_034-在排序数组中查找元素的第一个和最后一个位置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_034-在排序数组中查找元素的第一个和最后一个位置","aria-hidden":"true"},"#"),c(" 034_在排序数组中查找元素的第一个和最后一个位置")],-1),r=l(`<h2 id="解法" tabindex="-1"><a class="header-anchor" href="#解法" aria-hidden="true">#</a> 解法</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">searchRange</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">binarySearch</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>a <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> res<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> a<span class="token punctuation">,</span>right <span class="token operator">=</span> a<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>left <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>left <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            left <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">binarySearch</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>left<span class="token punctuation">,</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>right <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;=</span>  len <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>right <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            right <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">binarySearch</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span>right <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>len<span class="token punctuation">,</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        res<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> left<span class="token punctuation">;</span>
        res<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> right<span class="token punctuation">;</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先用二分查找找到一个元素，在从左右再次查找</p>`,3);function k(d,m){const s=t("Badge");return p(),e("div",null,[i,o(s,{text:"中等",type:"warning",vertical:"middle"}),r])}const b=a(u,[["render",k],["__file","leetcode_034_在排序数组中查找元素的第一个和最后一个位置.html.vue"]]);export{b as default};
