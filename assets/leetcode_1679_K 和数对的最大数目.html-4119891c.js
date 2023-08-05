import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as e,c as o,e as c,b as n,d as l,f as s}from"./app-a9db4bea.js";const u={},i=n("h1",{id:"_1679-k-和数对的最大数目",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1679-k-和数对的最大数目","aria-hidden":"true"},"#"),l(" 1679_K 和数对的最大数目")],-1),k=s(`<h2 id="解法一-哈希表" tabindex="-1"><a class="header-anchor" href="#解法一-哈希表" aria-hidden="true">#</a> 解法一：哈希表</h2><p>讲数组中所有的数添加到哈希表中，key存储数字，value存储个数，通过找对应key和k-key的个数判断执行几次操作</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">maxOperations</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> flag <span class="token operator">=</span> k <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> res <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Integer</span> integer <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">?</span> map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">:</span> map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> set <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Integer</span> integer <span class="token operator">:</span> set<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>integer <span class="token operator">&gt;</span> flag<span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>integer <span class="token operator">==</span> k <span class="token operator">-</span> integer<span class="token punctuation">)</span> res <span class="token operator">-=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>k <span class="token operator">-</span> integer<span class="token punctuation">)</span><span class="token punctuation">)</span> res <span class="token operator">-=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>integer<span class="token punctuation">)</span><span class="token punctuation">,</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>k <span class="token operator">-</span> integer<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>nums<span class="token punctuation">.</span>length <span class="token operator">-</span> res<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解法二-排序-双指针" tabindex="-1"><a class="header-anchor" href="#解法二-排序-双指针" aria-hidden="true">#</a> 解法二：排序 + 双指针</h2><p>先将数组进行排序，通过首尾双指针遍历数组，判断 val = nums[left] + nums[right] 与 k 的关系</p>`,5),r=n("ul",null,[n("li",null,"val > k; right--;"),n("li",null,"val < k; left--;"),n("li",{"left--;right--;res++":""},"val == k;")],-1),d=s(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">maxOperations</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> res<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> left<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> right<span class="token operator">=</span>nums<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">long</span> val<span class="token operator">=</span>nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token operator">+</span>nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>val <span class="token operator">&gt;</span> k<span class="token punctuation">)</span> <span class="token operator">--</span>right<span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>val <span class="token operator">&lt;</span> k<span class="token punctuation">)</span> <span class="token operator">++</span>left<span class="token punctuation">;</span>
            <span class="token keyword">else</span><span class="token punctuation">{</span> <span class="token operator">++</span>res<span class="token punctuation">;</span> <span class="token operator">++</span>left<span class="token punctuation">;</span> <span class="token operator">--</span>right<span class="token punctuation">;</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">k</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">maxOperations</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    nums<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a <span class="token operator">-</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> right <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">&gt;</span> k<span class="token punctuation">)</span> right<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">&lt;</span> k<span class="token punctuation">)</span> left<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span><span class="token punctuation">{</span>
            left<span class="token operator">++</span><span class="token punctuation">;</span>right<span class="token operator">--</span><span class="token punctuation">;</span>
            res<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function m(v,b){const a=t("Badge");return e(),o("div",null,[i,c(a,{text:"中等",type:"warning",vertical:"middle"}),k,r,d])}const y=p(u,[["render",m],["__file","leetcode_1679_K 和数对的最大数目.html.vue"]]);export{y as default};
