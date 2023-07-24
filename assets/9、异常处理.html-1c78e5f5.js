import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,d as t}from"./app-a589a01e.js";const p={},e=t(`<h2 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理" aria-hidden="true">#</a> 异常处理</h2><h3 id="_1、异常概述和异常体系结构" tabindex="-1"><a class="header-anchor" href="#_1、异常概述和异常体系结构" aria-hidden="true">#</a> 1、异常概述和异常体系结构</h3><p>异常的分类：error，exception<br><strong>编译时异常必须显示处理，运行时异常交给虚拟机。</strong></p><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220710204105263.png" alt="image-20220710204105263" loading="lazy"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//Error</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ErrorTest</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//1、栈溢出：java.lang.StackOverflowError</span>
        <span class="token function">main</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//2、堆溢出：java.lang.OutOfMemoryError</span>
        <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220711141545219.png" alt="image-20220711141545219" loading="lazy"></p><p><strong>蓝色：运行时异常</strong><br><strong>红色：编译时异常</strong></p><p><strong>编译时异常（checked）</strong><br><strong>运行时异常（unchecked）</strong></p><p>一、异常体系结构：<br><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220711170136676.png" alt="image-20220711170136676" loading="lazy"></p><p>常见异常：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//运行时异常</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionTest</span><span class="token punctuation">{</span>
    
    <span class="token comment">//NullPointerException</span>
    <span class="token comment">//空指针异常</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//ArrayIndexOutOfBoundsException</span>
    <span class="token comment">//数组角标越界</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//ClassCastExceotion</span>
    <span class="token comment">//类型转换异常</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span>abj<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//NumberFormateException</span>
    <span class="token comment">//数据转换异常</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//InputMismatchException</span>
    <span class="token comment">//输入不匹配</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test5</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token class-name">Scanner</span> scan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">int</span> score <span class="token operator">=</span> scan<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//输入abc</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//ArithmeticException</span>
    <span class="token comment">//算数异常</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test6</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token operator">/</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、java异常处理的方式" tabindex="-1"><a class="header-anchor" href="#_2、java异常处理的方式" aria-hidden="true">#</a> 2、Java异常处理的方式</h3><p>方式一：<code>try-catch-finally</code><br> 方式二：<code>throws+异常类型</code></p><h4 id="异常的处理-抓抛模型" tabindex="-1"><a class="header-anchor" href="#异常的处理-抓抛模型" aria-hidden="true">#</a> 异常的处理：抓抛模型</h4><p>过程一：<br> “抛”：程序在正常执行的过程中，一旦出现异常，就会在异常代码处生成一个对应异常对象。并将此对象抛出。<br> 一旦抛出对象后，其后的代码就不在执行</p><p>过程二：“抓”：<br> 可以理解为异常的处理方式：①try-catch-finally ②throws</p><h4 id="_1、try-catch-finally的使用" tabindex="-1"><a class="header-anchor" href="#_1、try-catch-finally的使用" aria-hidden="true">#</a> 1、try-catch-finally的使用</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">try</span><span class="token punctuation">{</span>
    <span class="token comment">//可能出现异常的代码</span>
<span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span>异常类型<span class="token number">1</span> 变量名<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//处理异常的方式1</span>
<span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span>异常类型<span class="token number">2</span> 变量名<span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//处理异常的方式2</span>
<span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span>异常类型<span class="token number">3</span> 变量名<span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//处理异常的方式3</span>
<span class="token punctuation">}</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">finally</span><span class="token punctuation">{</span>
    <span class="token comment">//一定会执行的代码</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> test1<span class="token punctuation">{</span>
    <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//出现异常，直接进入catch</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
    <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">NumberFormatException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//String getMessage():</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//printStakeTracce():</span>
        e<span class="token punctuation">.</span><span class="token function">printStakeTracce</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;出现数值转换异常&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//处理掉异常，往下执行</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：</p><ul><li>finally是可选的</li><li>使用try将可能出现异常的代码包装起来，在执行过程中，一旦出现异常，就会生成一个对应异常类的对象，根据此对象的类型，<strong>去catch中匹配</strong></li><li>一旦try中异常对象匹配到某一个catch，进入catch中进行异常处理。<strong>一旦处理完成，就跳出try-catch结构</strong>（在没有写finally的情况）。<mark>继续执行其后的代码</mark></li><li>catch中异常类型注意子父类、先后顺序。父类声明在子类之上，报错。</li><li>常用的异常对象处理方式：①String getMessage() ②printStakeTracce()</li><li><strong>在try结构中声明的变量，出了try结构后，就不能再被调用。</strong></li><li><strong>try-catch-finally结构可以相互嵌套</strong></li></ul><p>体会：<br> 使用try-catch-finally处理编译时异常，将编译时异常转换为运行时异常，延迟出现。<br> 由于运行时异常比较常见，不针对运行时异常编写try-catch-finally。<br> 针对编译时异常，一定要考虑try-catch-finally</p><p>try-catch-finally中finally的使用</p><ul><li>finally是可选的</li><li>finally中声明的是一定会被执行的代码。即使catch中又出现了异常，try中有return语句，catch中有return语句等情况</li><li>像数据库连接、输入输出流、网络编程Socket等资源，Jvm是不能自动回收的，我们需要手动进行资源的释放，此时资源释放就需要声明在finally中。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FinallyTest</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        	<span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token operator">/</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">ArithmeticExceptioin</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">finally</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">prinln</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、throws-异常类型" tabindex="-1"><a class="header-anchor" href="#_2、throws-异常类型" aria-hidden="true">#</a> 2、throws+异常类型</h4><p>1、<code>throws+异常类型</code><strong>写在方法的声明</strong>处，指明此方法执行时，<strong>可能会抛出的异常类型</strong>。<br> 一旦当方法体执行时，出现异常，仍会在异常代码处生成一个异常类的对象，此对象满足throws后异常类型时，就会被抛出。<strong>异常代码后续的代码就不再执行。</strong><br> 2、<code>try-catch-finally</code>：真正的将异常处理掉。<br><code>throws</code>只是将异常抛给了方法的调用者。并没有将异常处理掉</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token class-name">ExceptionTest2</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span><span class="token punctuation">,</span><span class="token class-name">IOException</span><span class="token punctuation">{</span>
        <span class="token comment">//异常</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">method2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IoException</span><span class="token punctuation">{</span>
        <span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法重写的规则之一：<br> 子类重写的方法抛出的异常不大于父类被重写的方法抛出的异常类型</p><h4 id="_3、开发中try-catch-finally和throws的选择" tabindex="-1"><a class="header-anchor" href="#_3、开发中try-catch-finally和throws的选择" aria-hidden="true">#</a> 3、开发中try-catch-finally和throws的选择</h4><ul><li>如果父类中被重写的方法没有throws方式处理异常，则子类重写的方法也不能使用throws，意味着如果子类重写的方法中有异常，必须使用try-catch-finally方式处理。</li><li>执行的方法a中先后又调用了另外几个方法，这几个方法是递进关系执行的，建议这几个方法使用throws的方式进行处理。而执行的方法a可以考虑try-catch-finally方式进行胡成立</li></ul><h3 id="_3、手动抛出异常对象" tabindex="-1"><a class="header-anchor" href="#_3、手动抛出异常对象" aria-hidden="true">#</a> 3、手动抛出异常对象</h3><p>关于异常对象的产生：</p><ol><li>系统自动生成的异常对象</li><li>手动生成并抛出一个异常对象（throw）</li></ol><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>throws和throw的区别：<br> throw表示抛出一个异常的对象，生成异常对象的过程，声明在方法体内 throw new 异常类(&quot;abc&quot;)<br> throws属于异常处理的一种方式，声明在方法的声明处</p></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">mian</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Student</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    s<span class="token punctuation">.</span><span class="token function">regist</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1001</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//最后try-catch一下</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">regist</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>id <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token comment">//System.out.pringln(&quot;非法&quot;);</span>
            <span class="token comment">//手动抛出异常</span>
            <span class="token comment">//throw new RuntimeException(&quot;您输入的数据非法&quot;);</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;您输入的数据非法&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、用户自定义异常类" tabindex="-1"><a class="header-anchor" href="#_4、用户自定义异常类" aria-hidden="true">#</a> 4、用户自定义异常类</h3><p>自定义异常类：</p><ul><li>继承于现有的异常结构：RuntimeException、Exception</li><li>提供全局变量：serialVersionUID</li><li>提供重载的构造器</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyException</span> <span class="token keyword">extends</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">61641614198984L</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">MyException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        
	<span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">MyException</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40),c=[e];function o(l,i){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","9、异常处理.html.vue"]]);export{r as default};
