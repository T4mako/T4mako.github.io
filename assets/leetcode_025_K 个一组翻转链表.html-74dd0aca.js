import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c as e,e as o,b as n,d as c,f as l}from"./app-76075488.js";const i={},u=n("h1",{id:"_025-k-个一组翻转链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_025-k-个一组翻转链表","aria-hidden":"true"},"#"),c(" 025_K 个一组翻转链表")],-1),k=l(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Definition for singly-linked list.
 * public class ListNode <span class="token punctuation">{</span>
 *     int val;
 *     ListNode next;
 *     ListNode() <span class="token punctuation">{</span><span class="token punctuation">}</span>
 *     ListNode(int val) <span class="token punctuation">{</span> this.val = val; <span class="token punctuation">}</span>
 *     ListNode(int val, ListNode next) <span class="token punctuation">{</span> this.val = val; this.next = next; <span class="token punctuation">}</span>
 * <span class="token punctuation">}</span>
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseKGroup</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> p <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> s <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">int</span> i<span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> temp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> k <span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                temp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> s<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    s <span class="token operator">=</span> s<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                    count<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> k <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> k <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">||</span> count <span class="token operator">==</span> k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">for</span><span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> k<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                p<span class="token punctuation">.</span>val <span class="token operator">=</span> temp<span class="token punctuation">[</span>k <span class="token operator">-</span> i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                p <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建两个指针s，p，通过for循环将s指针每次扫过k个元素，将其数据存储到事先创建好的一维数组，通过p指针移动相同位置，将数组中的值逆序赋给p扫过的位置，并用一个count记录，如果count的值不是k或k-1时，说明元素不足k个，就没必要赋值</p>`,2);function r(d,v){const s=t("Badge");return p(),e("div",null,[u,o(s,{text:"困难",type:"danger",vertical:"middle"}),k])}const _=a(i,[["render",r],["__file","leetcode_025_K 个一组翻转链表.html.vue"]]);export{_ as default};
