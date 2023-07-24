import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as e,c,b as n,f as s,e as u,d as a}from"./app-a589a01e.js";const l={},i=n("h1",{id:"_030-串联所有单词的子串",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_030-串联所有单词的子串","aria-hidden":"true"},"#"),s(" 030_串联所有单词的子串")],-1),k=n("blockquote",null,[n("p",null,"tag：哈希表、字符串、滑动窗口"),n("p",null,"难度：困难")],-1),r=a("<p>题目：</p><p>给定一个字符串 s 和一个字符串数组 words。 words 中所有字符串 长度相同。</p><p>s 中的 串联子串 是指一个包含 words 中所有字符串以任意顺序排列连接起来的子串。</p><p>例如，如果 words = [&quot;ab&quot;,&quot;cd&quot;,&quot;ef&quot;]， 那么 &quot;abcdef&quot;， &quot;abefcd&quot;，&quot;cdabef&quot;， &quot;cdefab&quot;，&quot;efabcd&quot;， 和 &quot;efcdab&quot; 都是串联子串。 &quot;acdbef&quot; 不是串联子串，因为他不是任何 words 排列的连接。<br> 返回所有串联字串在 s 中的开始索引。你可以以 任意顺序 返回答案。</p><p>示例 1：</p><p>输入：s = &quot;barfoothefoobarman&quot;, words = [&quot;foo&quot;,&quot;bar&quot;]<br> 输出：[0,9]<br> 解释：因为 words.length == 2 同时 words[i].length == 3，连接的子字符串的长度必须为 6。<br> 子串 &quot;barfoo&quot; 开始位置是 0。它是 words 中以 [&quot;bar&quot;,&quot;foo&quot;] 顺序排列的连接。<br> 子串 &quot;foobar&quot; 开始位置是 9。它是 words 中以 [&quot;foo&quot;,&quot;bar&quot;] 顺序排列的连接。<br> 输出顺序无关紧要。返回 [9,0] 也是可以的。<br> 示例 2：</p><p>输入：s = &quot;wordgoodgoodgoodbestword&quot;, words = [&quot;word&quot;,&quot;good&quot;,&quot;best&quot;,&quot;word&quot;]<br> 输出：[]<br> 解释：因为 words.length == 4 并且 words[i].length == 4，所以串联子串的长度必须为 16。<br> s 中没有子串长度为 16 并且等于 words 的任何顺序排列的连接。<br> 所以我们返回一个空数组。<br> 示例 3：</p><p>输入：s = &quot;barfoofoobarthefoobarman&quot;, words = [&quot;bar&quot;,&quot;foo&quot;,&quot;the&quot;]<br> 输出：[6,9,12]<br> 解释：因为 words.length == 3 并且 words[i].length == 3，所以串联子串的长度必须为 9。<br> 子串 &quot;foobarthe&quot; 开始位置是 6。它是 words 中以 [&quot;foo&quot;,&quot;bar&quot;,&quot;the&quot;] 顺序排列的连接。<br> 子串 &quot;barthefoo&quot; 开始位置是 9。它是 words 中以 [&quot;bar&quot;,&quot;the&quot;,&quot;foo&quot;] 顺序排列的连接。<br> 子串 &quot;thefoobar&quot; 开始位置是 12。它是 words 中以 [&quot;the&quot;,&quot;foo&quot;,&quot;bar&quot;] 顺序排列的连接。</p>",8),d=n("br",null,null,-1),m={href:"https://leetcode.cn/problems/substring-with-concatenation-of-all-words",target:"_blank",rel:"noopener noreferrer"},b=n("br",null,null,-1),v=a(`<h2 id="解法" tabindex="-1"><a class="header-anchor" href="#解法" aria-hidden="true">#</a> 解法：</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> <span class="token function">findSubstring</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> words<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> strslen <span class="token operator">=</span>  words<span class="token punctuation">.</span>length <span class="token operator">*</span> words<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//串联子串的长度</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> strslen<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> res<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">int</span> slen <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> wlen <span class="token operator">=</span> words<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span> words<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//存放所有words，key对应words里的子串，value对应个数</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> wlen<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>words<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>words<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>words<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>words<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> slen<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//长度太短，直接返回</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>slen <span class="token operator">-</span> i <span class="token operator">&lt;</span> strslen<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> res<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//与words[i]等长的字符串</span>
            <span class="token class-name">String</span> temp<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>map<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span>i<span class="token operator">+</span>len<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//复制一个map</span>
            <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> clone <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> map<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> index <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span>index <span class="token operator">-</span> i <span class="token operator">&lt;</span> strslen<span class="token punctuation">)</span><span class="token punctuation">{</span>
                temp <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span>index<span class="token operator">+</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//不包含，或者words里对应的的子串用完</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>clone<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span> <span class="token operator">||</span> clone<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> clone<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token comment">//value-1</span>
                    clone<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>temp<span class="token punctuation">,</span>clone<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    index <span class="token operator">+=</span> len<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">==</span> i <span class="token operator">+</span> strslen<span class="token punctuation">)</span><span class="token punctuation">{</span>
                res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>建立一个hashmap，key对应words中的字符串，value对应出现的次数。对s遍历，判断与words[0]等长的字符串在map中是否包含，不包含则进入下一次循环，如果包含，建立一个while循环，判断以words[0]等长的字符串在map中是否包含且value不为0，如果为0，break；否则value--，直到while循环扫过了串联子串的长度</p>`,3);function q(w,f){const t=o("ExternalLinkIcon");return e(),c("div",null,[i,k,n("blockquote",null,[r,n("p",null,[s("来源：力扣（LeetCode）"),d,s(" 链接："),n("a",m,[s("https://leetcode.cn/problems/substring-with-concatenation-of-all-words"),u(t)]),b,s(" 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。")])]),v])}const _=p(l,[["render",q],["__file","leetcode_030_串联所有单词的子串.html.vue"]]);export{_ as default};
