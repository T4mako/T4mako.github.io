const n=JSON.parse('{"key":"v-7158263b","path":"/code/java/Java%20%E5%9F%BA%E7%A1%80/%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80/8%E3%80%81%E5%8C%85%E8%A3%85%E7%B1%BB.html","title":"8、包装类","lang":"zh-CN","frontmatter":{"title":"8、包装类","icon":"java","order":8,"date":"2022-06-22T00:00:00.000Z","category":["java"],"tag":["基础语法","java"],"description":"包装类(Wrapper)的使用 1、包装类的使用 Java提供了8种基本数据类型对应的包装类，使得基本数据类型具有类的特征 2、基本数据类型、包装类、String三者之间的转换 基本数据类型和包装类的转换 public class WrapperTest{ @Test //基本数据类型到包装类 public void test1(){ int num1 = 10; Integer in1 = new Integer(num1); System.out.println(in1.toString); Integer in2 = new Integer(\\"123\\"); System.out.println(in2.toString); Float f1 = new Float(12.3f); Float f2 = new Float(\\"12.3\\"); System.out.println(f1); System.out.println(f2); Boolean b1 = new Boolean(true); Boolean b1 = new Boolean(\\"true\\"); Boolean b3 = new Boolean(\\"true123\\"); System.out.println(b3)//false } public void test2(){ @Test //包装类到基本数据类型 //调用包装类Xxx的xxxValue() Integer in1 = new Integer(12); int i1 = in1.intValue(); System.out.println(i1+1); \\t} }","head":[["meta",{"property":"og:url","content":"https://T4mako.github.io/code/java/Java%20%E5%9F%BA%E7%A1%80/%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80/8%E3%80%81%E5%8C%85%E8%A3%85%E7%B1%BB.html"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"8、包装类"}],["meta",{"property":"og:description","content":"包装类(Wrapper)的使用 1、包装类的使用 Java提供了8种基本数据类型对应的包装类，使得基本数据类型具有类的特征 2、基本数据类型、包装类、String三者之间的转换 基本数据类型和包装类的转换 public class WrapperTest{ @Test //基本数据类型到包装类 public void test1(){ int num1 = 10; Integer in1 = new Integer(num1); System.out.println(in1.toString); Integer in2 = new Integer(\\"123\\"); System.out.println(in2.toString); Float f1 = new Float(12.3f); Float f2 = new Float(\\"12.3\\"); System.out.println(f1); System.out.println(f2); Boolean b1 = new Boolean(true); Boolean b1 = new Boolean(\\"true\\"); Boolean b3 = new Boolean(\\"true123\\"); System.out.println(b3)//false } public void test2(){ @Test //包装类到基本数据类型 //调用包装类Xxx的xxxValue() Integer in1 = new Integer(12); int i1 = in1.intValue(); System.out.println(i1+1); \\t} }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"T4mako"}],["meta",{"property":"article:tag","content":"基础语法"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:published_time","content":"2022-06-22T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"8、包装类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-22T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"T4mako\\",\\"url\\":\\"https://github.com/T4mako/T4mako.github.io\\"}]}"]]},"headers":[{"level":2,"title":"包装类(Wrapper)的使用","slug":"包装类-wrapper-的使用","link":"#包装类-wrapper-的使用","children":[{"level":3,"title":"1、包装类的使用","slug":"_1、包装类的使用","link":"#_1、包装类的使用","children":[]},{"level":3,"title":"2、基本数据类型、包装类、String三者之间的转换","slug":"_2、基本数据类型、包装类、string三者之间的转换","link":"#_2、基本数据类型、包装类、string三者之间的转换","children":[]},{"level":3,"title":"3、自动装箱与自动拆箱","slug":"_3、自动装箱与自动拆箱","link":"#_3、自动装箱与自动拆箱","children":[]},{"level":3,"title":"4、包装类的题","slug":"_4、包装类的题","link":"#_4、包装类的题","children":[]}]}],"readingTime":{"minutes":2.02,"words":606},"filePathRelative":"code/java/Java 基础/语法基础/8、包装类.md","localizedDate":"2022年6月22日","excerpt":"<h2> 包装类(Wrapper)的使用</h2>\\n<h3> 1、包装类的使用</h3>\\n<p>Java提供了8种基本数据类型对应的包装类，使得基本数据类型具有类的特征</p>\\n<h3> 2、基本数据类型、包装类、String三者之间的转换</h3>\\n<h5> 基本数据类型和包装类的转换</h5>\\n<p><img src=\\"https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220707161920628.png\\" alt=\\"image-20220707161920628\\" loading=\\"lazy\\"></p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">WrapperTest</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token annotation punctuation\\">@Test</span>\\n    <span class=\\"token comment\\">//基本数据类型到包装类</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">test1</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">int</span> num1 <span class=\\"token operator\\">=</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">Integer</span> in1 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">(</span>num1<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span>in1<span class=\\"token punctuation\\">.</span>toString<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        \\n        <span class=\\"token class-name\\">Integer</span> in2 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"123\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span>in2<span class=\\"token punctuation\\">.</span>toString<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        \\n        <span class=\\"token class-name\\">Float</span> f1 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Float</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">12.3f</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">Float</span> f2 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Float</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"12.3\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span>f1<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span>f2<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        \\n        <span class=\\"token class-name\\">Boolean</span> b1 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Boolean</span><span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">Boolean</span> b1 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Boolean</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"true\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        \\n        <span class=\\"token class-name\\">Boolean</span> b3 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Boolean</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"true123\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span>b3<span class=\\"token punctuation\\">)</span><span class=\\"token comment\\">//false</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">test2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token annotation punctuation\\">@Test</span>\\n        <span class=\\"token comment\\">//包装类到基本数据类型</span>\\n        <span class=\\"token comment\\">//调用包装类Xxx的xxxValue()</span>\\n        <span class=\\"token class-name\\">Integer</span> in1 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Integer</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">12</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">int</span> i1 <span class=\\"token operator\\">=</span> in1<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">intValue</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span>i1<span class=\\"token operator\\">+</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
