import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o,c as l,b as n,f as s,e as c,d as a}from"./app-8a02cab4.js";const i={},u=n("h1",{id:"_021-合并两个有序链表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_021-合并两个有序链表","aria-hidden":"true"},"#"),s(" 021_合并两个有序链表")],-1),r=n("blockquote",null,[n("p",null,"tag：递归、链表"),n("p",null,"难度：简单")],-1),d=a("<p>题目：</p><p>将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。</p><p>示例 1：</p><p>输入：l1 = [1,2,4], l2 = [1,3,4]<br> 输出：[1,1,2,3,4,4]<br> 示例 2：</p><p>输入：l1 = [], l2 = []<br> 输出：[]<br> 示例 3：</p><p>输入：l1 = [], l2 = [0]<br> 输出：[0]</p>",6),k=n("br",null,null,-1),v={href:"https://leetcode.cn/problems/merge-two-sorted-lists",target:"_blank",rel:"noopener noreferrer"},m=n("br",null,null,-1),b=a(`<h2 id="解法" tabindex="-1"><a class="header-anchor" href="#解法" aria-hidden="true">#</a> 解法：</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>建立一个res链表用于返回，通过list1，list2两个节点遍历链表，将值赋给新的链表节点中</p>`,3);function _(h,w){const e=p("ExternalLinkIcon");return o(),l("div",null,[u,r,n("blockquote",null,[d,n("p",null,[s("来源：力扣（LeetCode）"),k,s(" 链接："),n("a",v,[s("https://leetcode.cn/problems/merge-two-sorted-lists"),c(e)]),m,s(" 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。")])]),b])}const f=t(i,[["render",_],["__file","leetcode_021_合并两个有序链表.html.vue"]]);export{f as default};
