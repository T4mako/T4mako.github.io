import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as i,c as l,e as a,b as n,f as e,d as c}from"./app-00d6fe81.js";const r={},d=n("h1",{id:"_875-爱吃香蕉的珂珂",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_875-爱吃香蕉的珂珂","aria-hidden":"true"},"#"),e(" 875. 爱吃香蕉的珂珂")],-1),u={href:"https://leetcode.cn/problems/middle-of-the-linked-list/description/",target:"_blank",rel:"noopener noreferrer"},k=c(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">middleNode</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        :type head: ListNode
        :rtype: ListNode
        &quot;&quot;&quot;</span>
        left <span class="token operator">=</span> head
        right <span class="token operator">=</span> head
        i <span class="token operator">=</span> <span class="token number">1</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>right<span class="token punctuation">.</span><span class="token builtin">next</span> <span class="token operator">!=</span> <span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">:</span>
                left <span class="token operator">=</span> left<span class="token punctuation">.</span><span class="token builtin">next</span>
                i <span class="token operator">-=</span> <span class="token number">1</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                i <span class="token operator">+=</span> <span class="token number">1</span>
            right <span class="token operator">=</span> right<span class="token punctuation">.</span><span class="token builtin">next</span>
        <span class="token keyword">return</span> left
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function v(m,_){const t=s("Badge"),o=s("ExternalLinkIcon");return i(),l("div",null,[d,a(t,{text:"简单",type:"tip",vertical:"middle"}),n("p",null,[n("a",u,[e("题目描述"),a(o)])]),k])}const f=p(r,[["render",v],["__file","leetcode_876_链表的中间结点.html.vue"]]);export{f as default};
