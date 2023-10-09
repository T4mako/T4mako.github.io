import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-5071a38a.js";const e={},p=t(`<h2 id="_1、string" tabindex="-1"><a class="header-anchor" href="#_1、string" aria-hidden="true">#</a> 1、String</h2><h3 id="_1、理解-string-的不可变性" tabindex="-1"><a class="header-anchor" href="#_1、理解-string-的不可变性" aria-hidden="true">#</a> 1、理解 String 的不可变性</h3><p>String 字符串，使用一对「&quot;&quot;」来表示</p><ul><li>String 类声明为 final 的，不可被继承</li><li>String 类实现了 Serializable 接口：表示字符串是支持序列化的</li><li>String 类实现了 Comparable 接口，表示 String 可以比较大小</li><li>String 内部定义了 <code>final char[] value</code> 用于存储字符串数据</li><li>String 代表不可变的字符序列，简称「不可变性」</li></ul><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>String 不可变的体现：</p><ul><li>当字符串重新赋值时，需要重新指定内存区域赋值，不能使用原有的 value 进行赋值</li><li>当对现有的字符串重新赋值时，也需要重新指定内存区域赋值</li><li>当调用 String 的 replace() 方法修改指定字符或字符串时，也需要重新指定内存区域赋值</li><li>通过「字面量」的方式（区别于 new）给一个字符串赋值，此时的字符串值声明在字符串「常量池」中</li><li>字符串「常量池」中不会存储相同内容的字符串</li></ul><p>JVM 中字符串常量池存放位置说明：<br> JDK1.6：存储在方法区(永久区)<br> JDK1.7：存储在堆空间<br> JDK1.8：存储在方法区(元空间)</p></div><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220717211454938.png" alt="image-20220717211454938" loading="lazy"></p><h3 id="_2、string-的实例化式" tabindex="-1"><a class="header-anchor" href="#_2、string-的实例化式" aria-hidden="true">#</a> 2、String 的实例化式</h3><ul><li>通过「字面量」定义的方式</li><li>new + 构造器</li></ul><div class="hint-container info"><p class="hint-container-title">相关信息</p><p><code>String s = new String(&quot;abc&quot;);</code> 方式创建对象，在内存中创建了几个对象？<br> 两个，一个是堆空间中 new 的结构，一个是 char[] 对应的常量池中的数据：&quot;abc&quot;</p></div><p>结论：</p><ul><li>常量与（注意final）常量的拼接结果在常量池。 且常量池中不会存在相同内容的常量。</li><li>只要其中有一个是变量， 结果就在堆中</li><li>如果拼接的方法调用 intern() 方法，返回值接在常量池冲</li></ul><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220717212301406.png" alt="image-20220717212301406" loading="lazy"></p><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220717213536203.png" alt="image-20220717213536203" loading="lazy"></p><h3 id="_3、string-常用方法" tabindex="-1"><a class="header-anchor" href="#_3、string-常用方法" aria-hidden="true">#</a> 3、String 常用方法</h3><table><thead><tr><th>方法名</th><th>作用</th></tr></thead><tbody><tr><td>int length()</td><td>返回字符串的长度</td></tr><tr><td>char charAt(int index)</td><td>返回某索引处的字符</td></tr><tr><td>boolean equals(Object obj)</td><td>比较字符串的内容是否相同</td></tr><tr><td>boolean equalsIgnoreCase(String anotherString)</td><td>比较字符串的内容是否相同， 忽略大小写</td></tr><tr><td>String trim()</td><td>返回字符串的副本， 忽略前导空白和尾部空白</td></tr><tr><td>int compareTo(String anotherString)：</td><td>按字典序比较大小，相同返回0，大于返回正值，否则返回负值</td></tr><tr><td>boolean startsWith(String prefix)</td><td>判断字符串是否以指定的前缀开始</td></tr><tr><td>boolean endsWith(String suffix)</td><td>判断字符串是否以指定的后缀结束</td></tr><tr><td>boolean startsWith(String prefix, int offset)</td><td>测试此字符串从指定索引开始的子字符串是否以指定前缀开始</td></tr><tr><td>boolean regionMaches(int firstStart,String other,int otherStart,int length)</td><td>比较当前字符串 firstStart 开始取长度为 length 的字符串与 other 从 otherStart 开始取长度为 length 的字符串的字符序列大小</td></tr><tr><td>boolean regionMaches(int firstStart,String other,int otherStart,int length)</td><td>通过参数 b，决定是否忽略大小写</td></tr><tr><td>String concat(String str)</td><td>将指定字符串连接到此字符串的结尾。 等价于用「+」</td></tr><tr><td>boolean contains(String s)</td><td>判断当前 String 对象的字符串序列是否有 s 的字符序列</td></tr><tr><td>int indexOf(String str)</td><td>返回指定子字符串在此字符串中第一次出现处的索引</td></tr><tr><td>int indexOf(String str, int fromIndex)</td><td>返回指定子字符串在此字符串中第一次出现处的索引，从指定的索引开始</td></tr><tr><td>int lastIndexOf(String str)</td><td>返回指定子字符串在此字符串中最右边出现处的索引</td></tr><tr><td>int lastIndexOf(String str, int fromIndex)</td><td>返回指定子字符串在此字符串中最后一次出现处的索引，从指定的索引开始反向搜索</td></tr><tr><td>String substring(int beginIndex)</td><td>返回一个此字符串的从 beginIndex 开始截取到最后的一个子字符串</td></tr><tr><td>String substring(int start, int end)</td><td>返回一个此字符串从 start 开始截取到 end（不包含）的一个子字符串</td></tr><tr><td>boolean isEmpty()</td><td>判断是否是空字符串</td></tr><tr><td>String toLowerCase()</td><td>将 String 中的所有字符转换为小写</td></tr><tr><td>String toUpperCase()</td><td>将 String 中的所有字符转换为大写</td></tr><tr><td>String replace(char oldChar, char newChar)</td><td>返回一个新的字符串， 它是通过用 newChar 替换此字符串中出现的所有 oldChar 得到的</td></tr><tr><td>String replace(CharSequence target, CharSequence replacement)</td><td>使用指定的字面值替换序列替换此字符串所有匹配字面值目标序列的子字符</td></tr><tr><td>String replaceAll(String regex, String replacement)</td><td>使用给定的 replacement 替换此字符串所有匹配给定的正则表达式的子字符串。</td></tr><tr><td>String replaceFirst(String regex, String replacement)</td><td>使用给定的 replacement 替换此字符串匹配给定的正则表达式的第一个子字符串</td></tr><tr><td>boolean matches(String regex)</td><td>告知此字符串是否匹配给定的正则表达式</td></tr><tr><td>String[] split(String regex)</td><td>根据给定正则表达式的匹配拆分此字符串</td></tr><tr><td>String[] split(String regex, int limit)</td><td>根据匹配给定的正则表达式来拆分此字符串， 最多不超过limit个， 如果超过了， 剩下的全部都放到最后一个元素中</td></tr></tbody></table><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>indexOf 和 lastIndexOf 方法如果未找到都是返回 -1</p></div><h3 id="_4、string-与基本数据类型包装类的转换" tabindex="-1"><a class="header-anchor" href="#_4、string-与基本数据类型包装类的转换" aria-hidden="true">#</a> 4、String 与基本数据类型包装类的转换</h3><h4 id="string-与基本数据类型、包装类之间的转换" tabindex="-1"><a class="header-anchor" href="#string-与基本数据类型、包装类之间的转换" aria-hidden="true">#</a> String 与基本数据类型、包装类之间的转换</h4><ul><li>String 到基本数据类型，包装类：调用包装类的静态方法 <code>parseXxx(str)</code></li><li>基本数据类型，包装类到 String：调用 String 重载的 <code>valueOf(xxx)</code></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringTest1</span> <span class="token punctuation">{</span>
    <span class="token comment">// String 到基本数据类型，包装类:调用包装类的静态方法：parseXxx(str)</span>
    <span class="token comment">// 基本数据类型，包装类到 String：调用 String 重载的valueOf(xxx)</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> s1 <span class="token operator">=</span> <span class="token string">&quot;123&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> s2 <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> s3 <span class="token operator">=</span> num <span class="token operator">+</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="string-与字符数组之间的转换" tabindex="-1"><a class="header-anchor" href="#string-与字符数组之间的转换" aria-hidden="true">#</a> String 与字符数组之间的转换</h4><p>String 到 char[]：调用 String 的 <code>toCharArray()</code><br> char[] 到 String：调用 String 的构造器</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StringTest1</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//String到char[]:调用String的toCharArray()</span>
        <span class="token class-name">String</span> s1 <span class="token operator">=</span> <span class="token string">&quot;abc123&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> s1<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//char[]到String:调用String的构造器</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token char">&#39;h&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;o&#39;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> s2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="string-与-byte-之间的转换" tabindex="-1"><a class="header-anchor" href="#string-与-byte-之间的转换" aria-hidden="true">#</a> String 与 byte[] 之间的转换</h4><p>String 到 byte：调用 String 的 <code>getBytes()</code><br> byte 到 String：调用 String 的构造器<br> （注意字符集编码解码问题）</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnsupportedEncodingException</span> <span class="token punctuation">{</span>
        <span class="token comment">// String到byte:调用String的getBytes()</span>
        <span class="token class-name">String</span> s1 <span class="token operator">=</span> <span class="token string">&quot;abc123中国&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">// 编码:字符串--&gt;字节(二进制数据)</span>
        <span class="token comment">// 解码:字节--&gt;字符串</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> s1<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 使用默认的字符集，进行编码</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> gbks <span class="token operator">=</span> s1<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token string">&quot;gbk&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 使用GBK字符集进行编码</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>gbks<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// byte到String：调用String的构造器</span>
        <span class="token class-name">String</span> s2<span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 使用默认字符集解码</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> s3<span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>gbks<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 乱码，编码集合解码集不同</span>

        <span class="token class-name">String</span> s4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>gbks<span class="token punctuation">,</span> <span class="token string">&quot;gbk&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s4<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、stringbuffer、stringbuilder" tabindex="-1"><a class="header-anchor" href="#_2、stringbuffer、stringbuilder" aria-hidden="true">#</a> 2、StringBuffer、StringBuilder</h2><h3 id="_1、string-stringbuffer-stringbuilder三者的异同" tabindex="-1"><a class="header-anchor" href="#_1、string-stringbuffer-stringbuilder三者的异同" aria-hidden="true">#</a> 1、String，StringBuffer，StringBuilder三者的异同</h3><p>String：不可变的字符序列；底层使用char[]存储(jdk1.9之后用byte数组)<br> StringBuffer：可变的字符序列：线程安全的，效率低；底层使用char[]存储(jdk1.9之后用byte数组)<br> StringBuilder：可变的字符序列：jdk5.0新增，线程不安全的，效率高；底层使用char[]存储(jdk1.9之后用byte数组)</p><p>源码分析：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//new char[0];</span>
<span class="token class-name">String</span> str1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//new char[]{&#39;a&#39;,&#39;b&#39;,&#39;c&#39;};</span>

<span class="token class-name">StringBuffer</span> sb1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//new char[16];底层创建了一个长度为16的数组</span>
sb1<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//value[0]=&#39;a&#39;;</span>
sb1<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token char">&#39;b&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//value[1]=&#39;b&#39;;</span>

<span class="token class-name">StringBuffer</span> sb2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token comment">//char[] value = new char[&quot;abc&quot;.length()+16]</span>
<span class="token comment">//问题1：System.out.println(sb2.length())//3</span>
<span class="token comment">//问题2：扩容问题：如果要添加的数据底层数组盛不下，那需要扩容底层数组</span>
<span class="token comment">//默认情况下，扩容为原来容量的2倍+2，同时将原有数组的元素复制到新数组中</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>开发中建议使用StringBuffer</strong></p><h3 id="_2、stringbuffer类的常用方法" tabindex="-1"><a class="header-anchor" href="#_2、stringbuffer类的常用方法" aria-hidden="true">#</a> 2、StringBuffer类的常用方法</h3><p>StringBuffer append(xxx)：提供了很多的append()方法， 用于进行字符串拼接<br> StringBuffer delete(int start,int end)：删除指定位置的内容<br> StringBuffer replace(int start, int end, String str)：把[start,end)位置替换为str<br> StringBuffer insert(int offset, xxx)：在指定位置插入xxx<br> StringBuffer reverse() ：把当前字符序列逆转<br> public int indexOf(String str)<br> public String substring(int start,int end)：返回一个从start开始到end索引结束的<strong>左闭右开区间</strong>的子字符串<br> public int length()<br> public char charAt(int n)<br> public void setCharAt(int n ,char ch)</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">StringBuffer</span> s1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        s1<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//abc1</span>
        s1<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token char">&#39;1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//abc11</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//s1.delete(2,4);//ab1</span>
        <span class="token comment">//s1.replace(2,4,&quot;hello&quot;);//abhello1</span>
        <span class="token comment">//s1.insert(2,false);//abfalsec11</span>
        <span class="token class-name">String</span> s2 <span class="token operator">=</span> s1<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//s2=bc</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结：<br> 增：append()<br> 删：delete(int start,int end)<br> 改：setCharAt(int n ,char ch)<br> 查：charAt(int n )<br> 插： insert(int offset, xxx)<br> 长度：length()<br> 遍历：for()+charAt()</p><h2 id="_3、-stringtokenizer-类" tabindex="-1"><a class="header-anchor" href="#_3、-stringtokenizer-类" aria-hidden="true">#</a> 3、 StringTokenizer 类</h2><p>StringTokenizer 类用于分析字符序列并分解成独立的单词</p><p>StringTokenizer 类在 java.util 包中</p><p>构造方法：</p><ul><li><code>StringTokenizer(String str)</code>：为字符串 str 构造一个 tokenizer 对象</li><li><code>StringTokenizer(String str,String delim)</code>：为字符串 str 构造一个tokenizer 对象，分隔标记为 delim 中的字符</li></ul><p>常用方法：</p><ul><li><code>int countTokens()</code>：返回 tokenizer 对象所含单独单词个数</li><li><code>boolean hasMoreElements()</code>：返回是否还有单词</li><li><code>boolean hasMoreTokens()</code>：与 hasMoreElements() 功能相同，</li><li><code>String nextToken()</code>：取出下一个单词</li></ul><p>案例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;I,love;you&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">StringTokenizer</span> stringTokenizer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringTokenizer</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span><span class="token string">&quot;,;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>stringTokenizer<span class="token punctuation">.</span><span class="token function">hasMoreTokens</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>stringTokenizer<span class="token punctuation">.</span><span class="token function">countTokens</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>stringTokenizer<span class="token punctuation">.</span><span class="token function">nextToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
输出：
3 I
2 love
1 you
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,45),i=[p];function o(c,l){return s(),a("div",null,i)}const d=n(e,[["render",o],["__file","String相关类.html.vue"]]);export{d as default};
