import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as c,c as l,e as a,b as n,d as p,f as i}from"./app-591f25ed.js";const u={},r=n("h1",{id:"_75-颜色分类",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_75-颜色分类","aria-hidden":"true"},"#"),p(" 75. 颜色分类")],-1),k={href:"https://leetcode.cn/problems/sort-colors/",target:"_blank",rel:"noopener noreferrer"},d=i(`<p>解法思路：选择排序</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">sortColors</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        :type nums: List[int]
        :rtype: None Do not return anything, modify nums in-place instead.
        &quot;&quot;&quot;</span>
        l <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">:</span>
            min_idx <span class="token operator">=</span> i
            <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>l<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;</span> nums<span class="token punctuation">[</span>min_idx<span class="token punctuation">]</span><span class="token punctuation">:</span>
                    min_idx <span class="token operator">=</span> j
            nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>min_idx<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>min_idx<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span>  <span class="token comment"># 交换最小值到当前位置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解法思路：找出所有的 0 交换至数组的头部，并且找出所有的 2 交换至数组的尾部。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">sortColors</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> nums<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        n <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span>
        p0<span class="token punctuation">,</span> p2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">1</span>
        i <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">while</span> i <span class="token operator">&lt;=</span> p2<span class="token punctuation">:</span>
            <span class="token keyword">while</span> i <span class="token operator">&lt;=</span> p2 <span class="token keyword">and</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">:</span>
                nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>p2<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>p2<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
                p2 <span class="token operator">-=</span> <span class="token number">1</span>
            <span class="token keyword">if</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
                nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>p0<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>p0<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
                p0 <span class="token operator">+=</span> <span class="token number">1</span>
            i <span class="token operator">+=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function m(v,b){const t=s("Badge"),e=s("ExternalLinkIcon");return c(),l("div",null,[r,a(t,{text:"中等",type:"warning",vertical:"middle"}),n("p",null,[n("a",k,[p("题目描述"),a(e)])]),d])}const f=o(u,[["render",m],["__file","leetcode_075_颜色分类.html.vue"]]);export{f as default};
