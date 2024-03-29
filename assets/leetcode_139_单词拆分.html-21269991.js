import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as c,c as l,e as a,b as n,d as s,f as u}from"./app-df1c5097.js";const i={},r=n("h1",{id:"_139-单词拆分",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_139-单词拆分","aria-hidden":"true"},"#"),s(" 139. 单词拆分")],-1),k={href:"https://leetcode.cn/problems/word-break/",target:"_blank",rel:"noopener noreferrer"},d=n("br",null,null,-1),_={href:"https://leetcode.cn/problems/word-break/solutions/302471/dan-ci-chai-fen-by-leetcode-solution/comments/2152649",target:"_blank",rel:"noopener noreferrer"},m=n("p",null,'以字符串 s = "leetcode" 和字典 wordDict = "leet", "code" 为例',-1),b=n("p",null,"首先，我们初始化一个长度为 9 的布尔数组 dp，所有元素都初始化为 false，除了 dp[0]，它表示空字符串，所以初始化为 true。",-1),v=n("p",null,'然后，我们开始遍历字符串 "leetcode" 的每个字符，同时对于每个字符，我们都会遍历从当前字符到字符串末尾的每个子字符串。',-1),h=n("p",null,'当 i = 0 时，我们检查子字符串 "l", "le", "lee", "leet", "leetc", "leetco", "leetcod", "leetcode"。当我们检查到 "leet" 时，> 我们发现 "leet" 在字典中，而且 dp[0] 是 true，所以我们将 dp[4] 设置为 true。',-1),f=n("p",null,'当 i = 1 时，我们检查子字符串 "e", "ee", "eet", "eetc", "eetco", "eetcod", "eetcode"。但是因为 dp[1] 是 false，所以我们不会> 更新任何 dp[j]。',-1),w=n("p",null,"当 i = 2 和 i = 3 时，同样因为 dp[2] 和 dp[3] 都是 false，所以我们也不会更新任何 dp[j]。",-1),g=n("p",null,'当 i = 4 时，我们检查子字符串 "c", "co", "cod", "code"。当我们检查到 "code" 时，我们发现 "code" 在字典中，而且 dp[4] 是 > true，所以我们将 dp[8] 设置为 true。',-1),y=n("p",null,'最后，我们返回 dp[8]，也就是 true，表示字符串 "leetcode" 可以被拆分为字典中的单词。',-1),j=u(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">wordBreak</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> wordDict<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> wordDictSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token punctuation">(</span>wordDict<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span>s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>dp<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> wordDictSet<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dp<span class="token punctuation">[</span>s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function x(S,B){const p=e("Badge"),t=e("ExternalLinkIcon");return c(),l("div",null,[r,a(p,{text:"中等",type:"warning",vertical:"middle"}),n("p",null,[n("a",k,[s("题目描述"),a(t)])]),n("blockquote",null,[n("p",null,[s("解法："),d,s(" 引用："),n("a",_,[s("https://leetcode.cn/problems/word-break/solutions/302471/dan-ci-chai-fen-by-leetcode-solution/comments/2152649"),a(t)])]),m,b,v,h,f,w,g,y]),j])}const V=o(i,[["render",x],["__file","leetcode_139_单词拆分.html.vue"]]);export{V as default};
