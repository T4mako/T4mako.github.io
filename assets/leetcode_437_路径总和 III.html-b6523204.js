import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as c,c as l,e as a,b as n,d as t,f as u}from"./app-a3e67ed2.js";const i={},k=n("h1",{id:"_437-路径总和-iii",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_437-路径总和-iii","aria-hidden":"true"},"#"),t(" 437. 路径总和 III")],-1),r={href:"https://leetcode.cn/problems/path-sum-iii/description/?envType=study-plan-v2&envId=leetcode-75",target:"_blank",rel:"noopener noreferrer"},d=u(`<p>解题思路：<br> 对每个根节点深度遍历</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> res <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pathSum</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">,</span> <span class="token keyword">long</span> targetSum<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token function">path</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span>targetSum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">path</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">,</span> <span class="token keyword">long</span> targetSum<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span>targetSum<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token function">path</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span>targetSum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token function">path</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span>targetSum<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> node<span class="token punctuation">,</span><span class="token keyword">long</span> targetSum<span class="token punctuation">,</span><span class="token keyword">long</span> sum<span class="token punctuation">)</span><span class="token punctuation">{</span>
        sum <span class="token operator">+=</span> node<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>sum <span class="token operator">==</span> targetSum<span class="token punctuation">)</span> res<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token function">dfs</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span>targetSum<span class="token punctuation">,</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token function">dfs</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span>targetSum<span class="token punctuation">,</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function m(v,b){const p=s("Badge"),e=s("ExternalLinkIcon");return c(),l("div",null,[k,a(p,{text:"中等",type:"warning",vertical:"middle"}),n("p",null,[n("a",r,[t("题目描述"),a(e)])]),d])}const y=o(i,[["render",m],["__file","leetcode_437_路径总和 III.html.vue"]]);export{y as default};
