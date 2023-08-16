import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,f as e}from"./app-6755ab4a.js";const o={},p=e(`<h2 id="七、symbol-类型" tabindex="-1"><a class="header-anchor" href="#七、symbol-类型" aria-hidden="true">#</a> 七、symbol 类型</h2><h3 id="_1、简介" tabindex="-1"><a class="header-anchor" href="#_1、简介" aria-hidden="true">#</a> 1、简介</h3><p>Symbol 是 ES2015 新引入的一种原始类型的值。它类似于字符串，但是每一个 Symbol 值都是独一无二的，与其他任何值都不相等。</p><p>Symbol 值通过<code>Symbol()</code>函数生成。在 TypeScript 里面，Symbol 的类型使用<code>symbol</code>表示。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> x<span class="token operator">:</span><span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> y<span class="token operator">:</span><span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

x <span class="token operator">===</span> y <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，变量<code>x</code>和<code>y</code>的类型都是<code>symbol</code>，且都用<code>Symbol()</code>生成，但是它们是不相等的。</p><h3 id="_2、unique-symbol" tabindex="-1"><a class="header-anchor" href="#_2、unique-symbol" aria-hidden="true">#</a> 2、unique symbol</h3><p><code>symbol</code>类型包含所有的 Symbol 值，但是无法表示某一个具体的 Symbol 值。</p><p>比如，<code>5</code>是一个具体的数值，就用<code>5</code>这个字面量来表示，这也是它的值类型。但是，Symbol 值不存在字面量，必须通过变量来引用，所以写不出只包含单个 Symbol 值的那种值类型。</p><p>为了解决这个问题，TypeScript 设计了<code>symbol</code>的一个子类型<code>unique symbol</code>，它表示单个的、某个具体的 Symbol 值。</p><p>因为<code>unique symbol</code>表示单个值，所以这个类型的变量是不能修改值的，只能用<code>const</code>命令声明，不能用<code>let</code>声明。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 正确</span>
<span class="token keyword">const</span> x<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">let</span> y<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，<code>let</code>命令声明的变量，不能是<code>unique symbol</code>类型，会报错。</p><p><code>const</code>命令为变量赋值 Symbol 值时，变量类型默认就是<code>unique symbol</code>，所以类型可以省略不写。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> x<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个声明为<code>unique symbol</code>类型的变量，它们的值都是不一样的，其实属于两个值类型。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> a<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

a <span class="token operator">===</span> b <span class="token comment">// 报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，变量<code>a</code>和变量<code>b</code>的类型虽然都是<code>unique symbol</code>，但其实是两个值类型。不同类型的值肯定是不相等的，所以最后一行就报错了。</p><p>由于 Symbol 类似于字符串，可以参考下面的例子来理解。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> a<span class="token operator">:</span><span class="token string">&#39;hello&#39;</span> <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b<span class="token operator">:</span><span class="token string">&#39;world&#39;</span> <span class="token operator">=</span> <span class="token string">&#39;world&#39;</span><span class="token punctuation">;</span>

a <span class="token operator">===</span> b <span class="token comment">// 报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，变量<code>a</code>和<code>b</code>都是字符串，但是属于不同的值类型，不能使用严格相等运算符进行比较。</p><p>而且，由于变量<code>a</code>和<code>b</code>是两个类型，就不能把一个赋值给另一个。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> a<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> a<span class="token punctuation">;</span> <span class="token comment">// 报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，变量<code>a</code>和变量<code>b</code>的类型都是<code>unique symbol</code>，但是其实类型不同，所以把<code>a</code>赋值给<code>b</code>会报错。</p><p>上例变量<code>b</code>的类型，如果要写成与变量<code>a</code>同一个<code>unique symbol</code>值类型，只能写成类型为<code>typeof a</code>。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> a<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b<span class="token operator">:</span><span class="token keyword">typeof</span> a <span class="token operator">=</span> a<span class="token punctuation">;</span> <span class="token comment">// 正确</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>不过我们知道，相同参数的<code>Symbol.for()</code>方法会返回相同的 Symbol 值。TypeScript 目前无法识别这种情况，所以可能出现多个 unique symbol 类型的变量，等于同一个 Symbol 值的情况。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> a<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，变量<code>a</code>和<code>b</code>是两个不同的值类型，但是它们的值其实是相等的。</p><p>unique symbol 类型是 symbol 类型的子类型，所以可以将前者赋值给后者，但是反过来就不行。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> a<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> b<span class="token operator">:</span><span class="token builtin">symbol</span> <span class="token operator">=</span> a<span class="token punctuation">;</span> <span class="token comment">// 正确</span>

<span class="token keyword">const</span> c<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> b<span class="token punctuation">;</span> <span class="token comment">// 报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，unique symbol 类型（变量<code>a</code>）赋值给 symbol 类型（变量<code>b</code>）是可以的，但是 symbol 类型（变量<code>b</code>）赋值给 unique symbol 类型（变量<code>c</code>）会报错。</p><p>unique symbol 类型的一个作用，就是用作属性名，这可以保证不会跟其他属性名冲突。如果要把某一个特定的 Symbol 值当作属性名，那么它的类型只能是 unique symbol，不能是 symbol。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> x<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> y<span class="token operator">:</span><span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 正确</span>
  <span class="token punctuation">[</span>y<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，变量<code>y</code>当作属性名，但是<code>y</code>的类型是 symbol，不是固定不变的值，导致报错。</p><p><code>unique symbol</code>类型也可以用作类（class）的属性值，但只能赋值给类的<code>readonly static</code>属性。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name"><span class="token constant">C</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">readonly</span> foo<span class="token operator">:</span>unique <span class="token builtin">symbol</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，静态只读属性<code>foo</code>的类型就是<code>unique symbol</code>。注意，这时<code>static</code>和<code>readonly</code>两个限定符缺一不可，这是为了保证这个属性是固定不变的。</p><h3 id="_3、类型推断" tabindex="-1"><a class="header-anchor" href="#_3、类型推断" aria-hidden="true">#</a> 3、类型推断</h3><p>如果变量声明时没有给出类型，TypeScript 会推断某个 Symbol 值变量的类型。</p><p><code>let</code>命令声明的变量，推断类型为 symbol。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 类型为 symbol</span>
<span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>const</code>命令声明的变量，推断类型为 unique symbol。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 类型为 unique symbol</span>
<span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，<code>const</code>命令声明的变量，如果赋值为另一个 symbol 类型的变量，则推断类型为 symbol。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 类型为 symbol</span>
<span class="token keyword">const</span> y <span class="token operator">=</span> x<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>let</code>命令声明的变量，如果赋值为另一个 unique symbol 类型的变量，则推断类型还是 symbol。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 类型为 symbol</span>
<span class="token keyword">let</span> y <span class="token operator">=</span> x<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,48),t=[p];function c(l,i){return n(),a("div",null,t)}const r=s(o,[["render",c],["__file","7、symbol 类型.html.vue"]]);export{r as default};
