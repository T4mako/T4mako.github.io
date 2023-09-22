import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as e,c as p,e as o,b as n,d as l,f as c}from"./app-acbf79fc.js";const i={},u=n("h1",{id:"_021-合并两个有序链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_021-合并两个有序链表","aria-hidden":"true"},"#"),l(" 021_合并两个有序链表")],-1),d=c(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
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
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> list1<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> list2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>list1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> list2<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>list2 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> list1<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ListNode</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> move <span class="token operator">=</span> res<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>list1 <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">||</span> list2 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>list1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                move<span class="token punctuation">.</span>next <span class="token operator">=</span> list2<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>list2 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                move<span class="token punctuation">.</span>next <span class="token operator">=</span> list1<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>list1<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> list2<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">{</span>
                move<span class="token punctuation">.</span>next <span class="token operator">=</span> list1<span class="token punctuation">;</span>
                list1 <span class="token operator">=</span> list1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                move <span class="token operator">=</span> move<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                move<span class="token punctuation">.</span>next <span class="token operator">=</span> list2<span class="token punctuation">;</span>
                list2 <span class="token operator">=</span> list2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                move <span class="token operator">=</span> move<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>建立一个res链表用于返回，通过list1，list2两个节点遍历链表，将值赋给新的链表节点中</p>`,2);function k(r,v){const s=t("Badge");return e(),p("div",null,[u,o(s,{text:"简单",type:"tip",vertical:"middle"}),d])}const _=a(i,[["render",k],["__file","leetcode_021_合并两个有序链表.html.vue"]]);export{_ as default};
