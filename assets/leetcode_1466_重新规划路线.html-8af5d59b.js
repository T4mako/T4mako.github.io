import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as c,c as l,e as a,b as n,d as t,f as i}from"./app-743b090f.js";const u={},k=n("h1",{id:"_1466-重新规划路线",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1466-重新规划路线","aria-hidden":"true"},"#"),t(" 1466. 重新规划路线")],-1),r={href:"https://leetcode.cn/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/?envType=study-plan-v2&envId=leetcode-75",target:"_blank",rel:"noopener noreferrer"},d=i(`<p>解法思路：</p><ul><li>首先创建领接表（建立一个 <code>List&lt;List&lt;Integer&gt;&gt;</code>，外层 List 下标为起始点，内层 List 存储与该点有连接的点），该点为出点，添加正数，为入点，添加负数</li><li>建立一个 bool 数组，存储该点是否被访问过</li><li>从结点 0 开始遍历图，获取邻接点，如果邻接点没有被访问过，且需要变更方向（&gt;0），count++</li><li>dfs 递归调用，传入从邻接表中获取的点</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">int</span> count<span class="token punctuation">;</span> <span class="token comment">// 变更方向的路线数</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">minReorder</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> connections<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 构建领接表</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> graph <span class="token operator">=</span> <span class="token function">buildGraph</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> connections<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token comment">// 记录节点的访问状态</span>
        <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> visited <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span> 
         <span class="token comment">// 从节点 0 开始深度优先搜索</span>
        <span class="token function">dfs</span><span class="token punctuation">(</span>graph<span class="token punctuation">,</span> visited<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">// 返回变更方向的路线数</span>
        <span class="token keyword">return</span> count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> graph<span class="token punctuation">,</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> visited<span class="token punctuation">,</span> <span class="token keyword">int</span> city<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 标记当前节点为已访问</span>
        visited<span class="token punctuation">[</span>city<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> 
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> neighbor <span class="token operator">:</span> graph<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>city<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果邻居节点未被访问</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>visited<span class="token punctuation">[</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>neighbor<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
                <span class="token comment">// 需要反向</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>neighbor <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    count<span class="token operator">++</span><span class="token punctuation">;</span> 
                <span class="token punctuation">}</span>
                <span class="token function">dfs</span><span class="token punctuation">(</span>graph<span class="token punctuation">,</span> visited<span class="token punctuation">,</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>neighbor<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token function">buildGraph</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> connections<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 用邻接表表示有向图</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> graph <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 初始化</span>
            graph<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> connection <span class="token operator">:</span> connections<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> from <span class="token operator">=</span> connection<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> <span class="token keyword">to</span> <span class="token operator">=</span> connection<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            graph<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>from<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">to</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
            graph<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">to</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token operator">-</span>from<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> graph<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function v(m,b){const p=s("Badge"),e=s("ExternalLinkIcon");return c(),l("div",null,[k,a(p,{text:"中等",type:"warning",vertical:"middle"}),n("p",null,[n("a",r,[t("题目描述"),a(e)])]),d])}const f=o(u,[["render",v],["__file","leetcode_1466_重新规划路线.html.vue"]]);export{f as default};
