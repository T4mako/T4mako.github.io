import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as e,c as p,e as o,b as n,f as l,d as c}from"./app-00d6fe81.js";const i={},u=n("h1",{id:"_92-反转链表-ii",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_92-反转链表-ii","aria-hidden":"true"},"#"),l(" 92. 反转链表 II")],-1),r=c(`<p>解法：<br> 使用四个指针代表 start，end 和要改变方向的结点，最后再拼接起来</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseBetween</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> left <span class="token operator">==</span> right<span class="token punctuation">)</span>
			<span class="token keyword">return</span> head<span class="token punctuation">;</span>
		<span class="token class-name">ListNode</span> leftNode <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token class-name">ListNode</span> rightNode <span class="token operator">=</span> head<span class="token punctuation">;</span>
		<span class="token class-name">ListNode</span> l<span class="token punctuation">;</span>
		<span class="token class-name">ListNode</span> r<span class="token punctuation">;</span>
		<span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> right <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>leftNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
					leftNode <span class="token operator">=</span> head<span class="token punctuation">;</span>
				<span class="token keyword">else</span>
					leftNode <span class="token operator">=</span> leftNode<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			rightNode <span class="token operator">=</span> rightNode<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
			i<span class="token operator">++</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		l <span class="token operator">=</span> leftNode <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> head <span class="token operator">:</span> leftNode<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
		r <span class="token operator">=</span> l<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
		<span class="token keyword">while</span> <span class="token punctuation">(</span>r <span class="token operator">!=</span> rightNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">ListNode</span> temp <span class="token operator">=</span> r<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
			r<span class="token punctuation">.</span>next <span class="token operator">=</span> l<span class="token punctuation">;</span>
			l <span class="token operator">=</span> r<span class="token punctuation">;</span>
			r <span class="token operator">=</span> temp<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">ListNode</span> temp <span class="token operator">=</span> head<span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>leftNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			temp<span class="token punctuation">.</span>next <span class="token operator">=</span> rightNode<span class="token punctuation">;</span>
            <span class="token keyword">return</span> l<span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			leftNode<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> rightNode<span class="token punctuation">;</span>
			leftNode<span class="token punctuation">.</span>next <span class="token operator">=</span> l<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">return</span> head<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function d(k,v){const s=t("Badge");return e(),p("div",null,[u,o(s,{text:"中等",type:"tiwarning",vertical:"middle"}),r])}const h=a(i,[["render",d],["__file","leetcode_092_反转链表 II.html.vue"]]);export{h as default};
