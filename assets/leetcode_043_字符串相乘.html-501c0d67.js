import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as t,c as o,d as e,a as n,b as c,e as l}from"./app-e1356749.js";const u={},i=n("h1",{id:"_043-字符串相乘",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_043-字符串相乘","aria-hidden":"true"},"#"),c(" 043_字符串相乘")],-1),k=l(`<h2 id="解法一" tabindex="-1"><a class="header-anchor" href="#解法一" aria-hidden="true">#</a> 解法一：</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">multiply</span><span class="token punctuation">(</span><span class="token class-name">String</span> num1<span class="token punctuation">,</span> <span class="token class-name">String</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>num1<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token operator">||</span> num2<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">StringBuilder</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len1 <span class="token operator">=</span> num1<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len2 <span class="token operator">=</span> num2<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> maxlen <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> len1 <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> n1 <span class="token operator">=</span> num1<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">48</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> add <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name">StringBuilder</span> temp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> len2 <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> n2 <span class="token operator">=</span> num2<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">48</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> mul <span class="token operator">=</span> n1 <span class="token operator">*</span> n2<span class="token punctuation">;</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>j <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    temp<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">(</span>mul<span class="token operator">+</span> add<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    add <span class="token operator">=</span> <span class="token punctuation">(</span>mul<span class="token operator">+</span> add<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token class-name">StringBuilder</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    s<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>add <span class="token operator">+</span> mul<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    temp<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            temp <span class="token operator">=</span> temp<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> len1 <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">-</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                temp<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            maxlen <span class="token operator">=</span> res<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> temp<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> res<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> temp<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> add_2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            temp<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> maxlen<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> a <span class="token operator">=</span> j <span class="token operator">&gt;=</span> temp<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> temp<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">48</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> b <span class="token operator">=</span> j <span class="token operator">&gt;=</span> res<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> res<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">48</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>j <span class="token operator">==</span> maxlen <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token class-name">StringBuilder</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    s<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b <span class="token operator">+</span> add_2<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b <span class="token operator">+</span> add_2<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                add_2 <span class="token operator">=</span> <span class="token punctuation">(</span>a <span class="token operator">+</span> b <span class="token operator">+</span> add_2<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">10</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            res <span class="token operator">=</span> sb<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过两个for循环将每个个位数与各位数的乘积相加，再通过每一次的乘积相加，得到最终结果</p><h2 id="解法二" tabindex="-1"><a class="header-anchor" href="#解法二" aria-hidden="true">#</a> 解法二：</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">multiply</span><span class="token punctuation">(</span><span class="token class-name">String</span> num1<span class="token punctuation">,</span> <span class="token class-name">String</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>num1<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span> <span class="token operator">||</span> num2<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>num1<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> num2<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> num1<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> n1 <span class="token operator">=</span> num1<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> num2<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> n2 <span class="token operator">=</span> num2<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token punctuation">(</span>res<span class="token punctuation">[</span>i <span class="token operator">+</span> j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> n1 <span class="token operator">*</span> n2<span class="token punctuation">)</span><span class="token punctuation">;</span>
                res<span class="token punctuation">[</span>i <span class="token operator">+</span> j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> sum <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">;</span>
                res<span class="token punctuation">[</span>i <span class="token operator">+</span> j<span class="token punctuation">]</span> <span class="token operator">+=</span> sum <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">StringBuilder</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> res<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> res<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
            result<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>res<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两个数相乘的位数和为两个数位数的总和m+n，num1[i] x num2[j] 的结果为 tmp(位数为两位，&quot;0x&quot;,&quot;xy&quot;的形式)，其第一位位于 res[i+j]，第二位位于 res[i+j+1]。将它们相加即可</p>`,6);function r(d,m){const s=p("Badge");return t(),o("div",null,[i,e(s,{text:"中等",type:"warning",vertical:"middle"}),k])}const f=a(u,[["render",r],["__file","leetcode_043_字符串相乘.html.vue"]]);export{f as default};
