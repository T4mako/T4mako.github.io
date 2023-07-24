import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as e,c as o,b as n,f as s,e as c,d as l}from"./app-a589a01e.js";const i={},u=n("h1",{id:"_020-有效的括号",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_020-有效的括号","aria-hidden":"true"},"#"),s(" 020_有效的括号")],-1),r=n("blockquote",null,[n("p",null,"tag：栈、字符串"),n("p",null,"难度：简单")],-1),k=n("p",null,"题目：",-1),d=n("p",null,"给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。",-1),v=n("p",null,"有效字符串需满足：",-1),m=n("p",null,[s("左括号必须用相同类型的右括号闭合。"),n("br"),s(" 左括号必须以正确的顺序闭合。"),n("br"),s(" 每个右括号都有一个对应的相同类型的左括号。")],-1),b=n("br",null,null,-1),_={href:"https://leetcode.cn/problems/valid-parentheses",target:"_blank",rel:"noopener noreferrer"},h=n("br",null,null,-1),f=l(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isValid</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">char</span> c <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>c <span class="token operator">==</span> <span class="token char">&#39;)&#39;</span> <span class="token operator">||</span> c <span class="token operator">==</span> <span class="token char">&#39;]&#39;</span> <span class="token operator">||</span> c <span class="token operator">==</span> <span class="token char">&#39;}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>c <span class="token operator">==</span> <span class="token char">&#39;(&#39;</span> <span class="token operator">||</span> c <span class="token operator">==</span> <span class="token char">&#39;[&#39;</span> <span class="token operator">||</span> c <span class="token operator">==</span> <span class="token char">&#39;{&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                stack<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                index<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>c <span class="token operator">==</span> <span class="token char">&#39;)&#39;</span> <span class="token operator">&amp;&amp;</span> stack<span class="token punctuation">[</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;(&#39;</span> <span class="token operator">||</span> c <span class="token operator">==</span> <span class="token char">&#39;]&#39;</span> <span class="token operator">&amp;&amp;</span> stack<span class="token punctuation">[</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;[&#39;</span> <span class="token operator">||</span> c <span class="token operator">==</span> <span class="token char">&#39;}&#39;</span> <span class="token operator">&amp;&amp;</span> stack<span class="token punctuation">[</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;{&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                index<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>建立一个数组，一个指针index，如果index指针指向0并且入栈为有括号时，返回false，如果是左括号则进栈，inmdex++，如果是有括号，匹配index-1所指向的括号是否匹配，匹配则index--</p>`,2);function w(x,y){const a=t("ExternalLinkIcon");return e(),o("div",null,[u,r,n("blockquote",null,[k,d,v,m,n("p",null,[s("来源：力扣（LeetCode）"),b,s(" 链接："),n("a",_,[s("https://leetcode.cn/problems/valid-parentheses"),c(a)]),h,s(" 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。")])]),f])}const N=p(i,[["render",w],["__file","leetcode_020_有效的括号.html.vue"]]);export{N as default};
