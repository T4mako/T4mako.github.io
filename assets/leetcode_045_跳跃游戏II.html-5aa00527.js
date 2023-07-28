import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as e,c as t,d as o,a as n,b as c,e as l}from"./app-e1356749.js";const i={},u=n("h1",{id:"_045-跳跃游戏ii",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_045-跳跃游戏ii","aria-hidden":"true"},"#"),c(" 045_跳跃游戏II")],-1),r=l(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">jump</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> res <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> max <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> nexPos <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> j <span class="token operator">&gt;=</span> <span class="token number">1</span><span class="token punctuation">;</span> j<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">+</span> j <span class="token operator">&gt;=</span> len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token operator">++</span>res<span class="token punctuation">;</span><span class="token punctuation">}</span>
                <span class="token keyword">int</span> nextNum <span class="token operator">=</span> nums<span class="token punctuation">[</span>i <span class="token operator">+</span> j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>j <span class="token operator">+</span> nextNum <span class="token operator">&gt;=</span> max<span class="token punctuation">)</span><span class="token punctuation">{</span>
                   max <span class="token operator">=</span> j <span class="token operator">+</span> nextNum<span class="token punctuation">;</span>
                   nexPos <span class="token operator">=</span> i <span class="token operator">+</span> j<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            i <span class="token operator">=</span> nexPos<span class="token punctuation">;</span>
            res<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义一个指针，对于这个指针指向的数字，计算它由远及近到的数字的值加上改数字能到达的最远处，谁最远，移动到该位置。</p>`,2);function k(d,m){const s=p("Badge");return e(),t("div",null,[u,o(s,{text:"中等",type:"warning",vertical:"middle"}),r])}const _=a(i,[["render",k],["__file","leetcode_045_跳跃游戏II.html.vue"]]);export{_ as default};
