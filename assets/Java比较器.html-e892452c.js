const a=JSON.parse('{"key":"v-ae84991c","path":"/code/java/Java%20%E5%9F%BA%E7%A1%80/%E5%B8%B8%E7%94%A8%E7%B1%BB/Java%E6%AF%94%E8%BE%83%E5%99%A8.html","title":"Java比较器","lang":"zh-CN","frontmatter":{"icon":"java","date":"2022-06-22T00:00:00.000Z","category":["java"],"tag":["基础语法","java"],"description":"Java比较器 一、说明 正常情况下，Java中的对象只能通过==或!=进行比较，不能使用&gt;或&lt; 但是在开发场景中，需要对多个对象进行排序，言外之意，就需要比较对象的大小。因此需要两个接口中的任何一个：Comparable或Comparator 二、Comparable接口的使用：(自然排序)java.lang.Comparable 1、像String、包装类等实现了Comparable接口，重写了compareTo()方法，给出了比较两个对象大小的方式。（从小到大排列） 2、重写compareTo()的规则： 如果当前对象this大于形参对象obj， 则返回正整数，如果当前对象this小于形参对象obj， 则返回负整数，如果当前对象this等于形参对象obj， 则返回零。 3、对于自定义类需要排序，通过自定义类事项Comparable接口，重写compareTo(obj)方法。在方法中指明如何排序","head":[["meta",{"property":"og:url","content":"https://T4mako.github.io/code/java/Java%20%E5%9F%BA%E7%A1%80/%E5%B8%B8%E7%94%A8%E7%B1%BB/Java%E6%AF%94%E8%BE%83%E5%99%A8.html"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"Java比较器"}],["meta",{"property":"og:description","content":"Java比较器 一、说明 正常情况下，Java中的对象只能通过==或!=进行比较，不能使用&gt;或&lt; 但是在开发场景中，需要对多个对象进行排序，言外之意，就需要比较对象的大小。因此需要两个接口中的任何一个：Comparable或Comparator 二、Comparable接口的使用：(自然排序)java.lang.Comparable 1、像String、包装类等实现了Comparable接口，重写了compareTo()方法，给出了比较两个对象大小的方式。（从小到大排列） 2、重写compareTo()的规则： 如果当前对象this大于形参对象obj， 则返回正整数，如果当前对象this小于形参对象obj， 则返回负整数，如果当前对象this等于形参对象obj， 则返回零。 3、对于自定义类需要排序，通过自定义类事项Comparable接口，重写compareTo(obj)方法。在方法中指明如何排序"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"T4mako"}],["meta",{"property":"article:tag","content":"基础语法"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:published_time","content":"2022-06-22T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java比较器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-22T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"T4mako\\",\\"url\\":\\"https://github.com/T4mako/T4mako.github.io\\"}]}"]]},"headers":[{"level":2,"title":"一、说明","slug":"一、说明","link":"#一、说明","children":[]},{"level":2,"title":"二、Comparable接口的使用：(自然排序)java.lang.Comparable","slug":"二、comparable接口的使用-自然排序-java-lang-comparable","link":"#二、comparable接口的使用-自然排序-java-lang-comparable","children":[]},{"level":2,"title":"三、Comparator接口(定制排序)java.util.Comparator","slug":"三、comparator接口-定制排序-java-util-comparator","link":"#三、comparator接口-定制排序-java-util-comparator","children":[]},{"level":2,"title":"四、Comparable和Comparator的使用对比","slug":"四、comparable和comparator的使用对比","link":"#四、comparable和comparator的使用对比","children":[]}],"readingTime":{"minutes":2.17,"words":651},"filePathRelative":"code/java/Java 基础/常用类/Java比较器.md","localizedDate":"2022年6月22日","excerpt":"<h1> Java比较器</h1>\\n<h2> 一、说明</h2>\\n<p>正常情况下，Java中的对象只能通过==或!=进行比较，不能使用&gt;或&lt;<br>\\n但是在开发场景中，需要对多个对象进行排序，言外之意，就需要比较对象的大小。因此需要两个接口中的任何一个：Comparable或Comparator</p>\\n<h2> 二、Comparable接口的使用：(自然排序)java.lang.Comparable</h2>\\n<p>1、像String、包装类等实现了Comparable接口，重写了compareTo()方法，给出了比较两个对象大小的方式。（从小到大排列）<br>\\n2、重写compareTo()的规则：<br>\\n如果<strong>当前对象this大于形参对象obj</strong>， 则<strong>返回正整数</strong>，如果<strong>当前对象this小于形参对象obj</strong>， 则返回<strong>负整数</strong>，如果当前对象this<strong>等于</strong>形参对象obj， 则返回<strong>零</strong>。<br>\\n3、对于自定义类需要排序，通过自定义类事项Comparable接口，重写compareTo(obj)方法。在方法中指明如何排序</p>","autoDesc":true}');export{a as data};
