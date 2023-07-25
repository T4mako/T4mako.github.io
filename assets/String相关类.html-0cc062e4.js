const t=JSON.parse('{"key":"v-0a517cc6","path":"/code/java/Java%20%E5%9F%BA%E7%A1%80/%E5%B8%B8%E7%94%A8%E7%B1%BB/String%E7%9B%B8%E5%85%B3%E7%B1%BB.html","title":"String相关类","lang":"zh-CN","frontmatter":{"title":"String相关类","icon":"java","date":"2022-06-22T00:00:00.000Z","category":["java"],"tag":["基础语法","java"],"description":"1、String 1、理解String的不可变性 String字符串，使用一对\\"\\"来表示 1、String声明为final的，不可被继承 2、String实现了Serializable接口：表示字符串是支持序列化的 实现了Comparable接口：表示String可以比较大小 3、String内部定义了final char[] value用于存储字符串数据 4、String代表不可变的字符序列，简称不可变性 体现：1、当字符串重新赋值时，需要重新指定内存区域赋值，不能使用原有的value进行赋值 2、当对现有的字符串重新赋值时，也需要重新指定内存区域赋值 3、当调用String的replace()方法修改指定字符或字符串时，也需要重新指定内存区域赋值 5、通过字面量的方式(区别于new)给一个字符串赋值，此时的字符串值声明在字符串常量池中 6、字符串常量池中不会存储相同内容的字符串","head":[["meta",{"property":"og:url","content":"https://T4mako.github.io/code/java/Java%20%E5%9F%BA%E7%A1%80/%E5%B8%B8%E7%94%A8%E7%B1%BB/String%E7%9B%B8%E5%85%B3%E7%B1%BB.html"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"String相关类"}],["meta",{"property":"og:description","content":"1、String 1、理解String的不可变性 String字符串，使用一对\\"\\"来表示 1、String声明为final的，不可被继承 2、String实现了Serializable接口：表示字符串是支持序列化的 实现了Comparable接口：表示String可以比较大小 3、String内部定义了final char[] value用于存储字符串数据 4、String代表不可变的字符序列，简称不可变性 体现：1、当字符串重新赋值时，需要重新指定内存区域赋值，不能使用原有的value进行赋值 2、当对现有的字符串重新赋值时，也需要重新指定内存区域赋值 3、当调用String的replace()方法修改指定字符或字符串时，也需要重新指定内存区域赋值 5、通过字面量的方式(区别于new)给一个字符串赋值，此时的字符串值声明在字符串常量池中 6、字符串常量池中不会存储相同内容的字符串"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"T4mako"}],["meta",{"property":"article:tag","content":"基础语法"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:published_time","content":"2022-06-22T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"String相关类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-22T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"T4mako\\",\\"url\\":\\"https://github.com/T4mako/T4mako.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1、String","slug":"_1、string","link":"#_1、string","children":[{"level":3,"title":"1、理解String的不可变性","slug":"_1、理解string的不可变性","link":"#_1、理解string的不可变性","children":[]},{"level":3,"title":"2、String的实例化式","slug":"_2、string的实例化式","link":"#_2、string的实例化式","children":[]},{"level":3,"title":"3、String常用方法","slug":"_3、string常用方法","link":"#_3、string常用方法","children":[]},{"level":3,"title":"4、String与基本数据类型包装类的转换","slug":"_4、string与基本数据类型包装类的转换","link":"#_4、string与基本数据类型包装类的转换","children":[]}]},{"level":2,"title":"2、StringBuffer、StringBuilder","slug":"_2、stringbuffer、stringbuilder","link":"#_2、stringbuffer、stringbuilder","children":[{"level":3,"title":"1、String，StringBuffer，StringBuilder三者的异同","slug":"_1、string-stringbuffer-stringbuilder三者的异同","link":"#_1、string-stringbuffer-stringbuilder三者的异同","children":[]},{"level":3,"title":"2、StringBuffer类的常用方法","slug":"_2、stringbuffer类的常用方法","link":"#_2、stringbuffer类的常用方法","children":[]}]}],"readingTime":{"minutes":7.57,"words":2270},"filePathRelative":"code/java/Java 基础/常用类/String相关类.md","localizedDate":"2022年6月22日","excerpt":"<h2> 1、String</h2>\\n<h3> 1、理解String的不可变性</h3>\\n<p>String字符串，使用一对\\"\\"来表示<br>\\n1、String声明为final的，不可被继承<br>\\n2、String实现了Serializable接口：表示字符串是支持序列化的<br>\\n实现了Comparable接口：表示String可以比较大小<br>\\n3、String内部定义了final char[] value用于存储字符串数据<br>\\n4、String代表不可变的字符序列，<strong>简称不可变性</strong><br>\\n体现：1、当字符串重新赋值时，需要重新指定内存区域赋值，不能使用原有的value进行赋值<br>\\n2、当对现有的字符串重新赋值时，也需要重新指定内存区域赋值<br>\\n3、当调用String的replace()方法修改指定字符或字符串时，也需要重新指定内存区域赋值<br>\\n5、通过字面量的方式(区别于new)给一个字符串赋值，此时的字符串值声明在字符串常量池中<br>\\n6、字符串常量池中不会存储相同内容的字符串</p>","autoDesc":true}');export{t as data};
