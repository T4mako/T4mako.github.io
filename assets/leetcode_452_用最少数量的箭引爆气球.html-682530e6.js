import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as c,c as l,e as a,b as n,d as t,f as u}from"./app-184a2d19.js";const i={},k=n("h1",{id:"_452-用最少数量的箭引爆气球",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_452-用最少数量的箭引爆气球","aria-hidden":"true"},"#"),t(" 452. 用最少数量的箭引爆气球")],-1),r={href:"https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/description/?envType=study-plan-v2&envId=leetcode-75",target:"_blank",rel:"noopener noreferrer"},d=u(`<p>解法思路：</p><ul><li>通过对每个数组左右端点进行排序</li><li>比较出每个区间的公共子区间，如果没有则 +1</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">findMinArrowShots</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> intervals<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>intervals<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span> intervals<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token comment">// 根据每个数组第一个元素优先排序，再根据第二个元素排序</span>
        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>intervals<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Comparator</span><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 首先按照每个数组的第一个元素进行比较</span>
                <span class="token keyword">int</span> compareFirstElement <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> b<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>compareFirstElement <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> compareFirstElement<span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 如果第一个元素相同，则按照第二个元素进行比较</span>
                    <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> b<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> res <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> temp <span class="token operator">=</span> intervals<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 记录公共子区间</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>temp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> intervals<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 更新子区间</span>
                temp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>temp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>intervals<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                temp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>temp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>intervals<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                res<span class="token operator">++</span><span class="token punctuation">;</span>
                temp <span class="token operator">=</span> intervals<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function m(v,b){const p=s("Badge"),e=s("ExternalLinkIcon");return c(),l("div",null,[k,a(p,{text:"中等",type:"warning",vertical:"middle"}),n("p",null,[n("a",r,[t("题目描述"),a(e)])]),d])}const y=o(i,[["render",m],["__file","leetcode_452_用最少数量的箭引爆气球.html.vue"]]);export{y as default};
