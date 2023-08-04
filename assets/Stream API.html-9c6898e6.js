const n=JSON.parse('{"key":"v-7e6074a3","path":"/code/java/Java%20%E5%9F%BA%E7%A1%80/%E5%B8%B8%E7%94%A8%E7%B1%BB/Stream%20API.html","title":"Stream API的理解与使用","lang":"zh-CN","frontmatter":{"icon":"java","category":["java"],"tag":["基础语法","java"],"Date":"2023-08-04T00:00:00.000Z","description":"Stream API的理解与使用 流表示包含着一系列元素的集合，可以对其做不同类型的操作，用来对这些元素执行计算 List&lt;String&gt; myList = Arrays.asList(\\"a1\\", \\"a2\\", \\"b1\\", \\"c2\\", \\"c1\\"); myList .stream() // 创建流 .filter(s -&gt; s.startsWith(\\"c\\")) // 执行过滤，过滤出以 c 为前缀的字符串 .map(String::toUpperCase) // 转换成大写 .sorted() // 排序 .forEach(System.out::println); // for 循环打印 // C1 // C2","head":[["meta",{"property":"og:url","content":"https://T4mako.github.io/code/java/Java%20%E5%9F%BA%E7%A1%80/%E5%B8%B8%E7%94%A8%E7%B1%BB/Stream%20API.html"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"Stream API的理解与使用"}],["meta",{"property":"og:description","content":"Stream API的理解与使用 流表示包含着一系列元素的集合，可以对其做不同类型的操作，用来对这些元素执行计算 List&lt;String&gt; myList = Arrays.asList(\\"a1\\", \\"a2\\", \\"b1\\", \\"c2\\", \\"c1\\"); myList .stream() // 创建流 .filter(s -&gt; s.startsWith(\\"c\\")) // 执行过滤，过滤出以 c 为前缀的字符串 .map(String::toUpperCase) // 转换成大写 .sorted() // 排序 .forEach(System.out::println); // for 循环打印 // C1 // C2"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"T4mako"}],["meta",{"property":"article:tag","content":"基础语法"}],["meta",{"property":"article:tag","content":"java"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Stream API的理解与使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"T4mako\\",\\"url\\":\\"https://github.com/T4mako/T4mako.github.io\\"}]}"]]},"headers":[{"level":2,"title":"不同类型的 Stream 流","slug":"不同类型的-stream-流","link":"#不同类型的-stream-流","children":[{"level":3,"title":"创建流的方式","slug":"创建流的方式","link":"#创建流的方式","children":[]},{"level":3,"title":"原始流和对象流的转换","slug":"原始流和对象流的转换","link":"#原始流和对象流的转换","children":[]}]},{"level":2,"title":"Stream 流的处理顺序","slug":"stream-流的处理顺序","link":"#stream-流的处理顺序","children":[]}],"readingTime":{"minutes":2.3,"words":690},"filePathRelative":"code/java/Java 基础/常用类/Stream API.md","excerpt":"<h1> Stream API的理解与使用</h1>\\n<p>流表示包含着一系列<code>元素的集合</code>，可以对其做不同类型的操作，用来对这些元素执行计算</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span> myList <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"a1\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"a2\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"b1\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"c2\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"c1\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nmyList\\n    <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">stream</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// 创建流</span>\\n    <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">filter</span><span class=\\"token punctuation\\">(</span>s <span class=\\"token operator\\">-&gt;</span> s<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">startsWith</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"c\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// 执行过滤，过滤出以 c 为前缀的字符串</span>\\n    <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">map</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span><span class=\\"token operator\\">::</span><span class=\\"token function\\">toUpperCase</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// 转换成大写</span>\\n    <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">sorted</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// 排序</span>\\n    <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">forEach</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token operator\\">::</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// for 循环打印</span>\\n\\n<span class=\\"token comment\\">// C1</span>\\n<span class=\\"token comment\\">// C2</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
