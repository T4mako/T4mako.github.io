import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as t,c as p,e as o,b as n,d as c,f as l}from"./app-9c03759f.js";const i={},u=n("h1",{id:"_019-删除链表的倒数第-n-个结点",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_019-删除链表的倒数第-n-个结点","aria-hidden":"true"},"#"),c(" 019_删除链表的倒数第 N 个结点")],-1),r=l(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">removeNthFromEnd</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> left <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> right <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> s <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>s <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            count<span class="token operator">++</span><span class="token punctuation">;</span>
            s <span class="token operator">=</span> s<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">==</span> count<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>n <span class="token operator">&lt;</span> count<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            right <span class="token operator">=</span> right<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            left <span class="token operator">=</span> left<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            count<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            left<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            left<span class="token punctuation">.</span>next <span class="token operator">=</span> right<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先遍历一边链表，得出链表的总个数count，如果n=count，返回head.next，否则定义一个left和right指针，指针不断后移，count--，直到count==n，判断right后面是否有值，如果没有，left.next = null，否则left.next = right.next</p>`,2);function d(k,v){const s=e("Badge");return t(),p("div",null,[u,o(s,{text:"中等",type:"warning",vertical:"middle"}),r])}const b=a(i,[["render",d],["__file","leetcode_019_删除链表的倒数第 N 个结点.html.vue"]]);export{b as default};
