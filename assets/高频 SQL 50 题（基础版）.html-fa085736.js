import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as c,c as d,b as e,d as s,e as n,f as l}from"./app-03e32318.js";const i={},p={href:"https://leetcode.cn/studyplan/sql-free-50/",target:"_blank",rel:"noopener noreferrer"},_=e("h2",{id:"查询",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#查询","aria-hidden":"true"},"#"),s(" 查询")],-1),u=e("h3",{id:"可回收且低脂低产品",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#可回收且低脂低产品","aria-hidden":"true"},"#"),s(" 可回收且低脂低产品")],-1),h=l(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> product_id
<span class="token keyword">FROM</span> Products
<span class="token keyword">WHERE</span> low_fats <span class="token operator">=</span> <span class="token string">&#39;Y&#39;</span> <span class="token operator">AND</span> recyclable <span class="token operator">=</span> <span class="token string">&#39;Y&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function m(k,f){const t=a("ExternalLinkIcon"),o=a("Badge");return c(),d("div",null,[e("p",null,[e("a",p,[s("题目集合"),n(t)])]),_,u,n(o,{text:"简单",type:"tip",vertical:"middle"}),h])}const x=r(i,[["render",m],["__file","高频 SQL 50 题（基础版）.html.vue"]]);export{x as default};
