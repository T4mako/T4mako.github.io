const e=JSON.parse('{"key":"v-1db3a566","path":"/code/java/Java%20%E5%9F%BA%E7%A1%80/%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80/17%E3%80%81%E5%8F%8D%E5%B0%84.html","title":"17、反射","lang":"zh-CN","frontmatter":{"title":"17、反射","icon":"java","order":17,"date":"2022-07-15T00:00:00.000Z","category":["java"],"tag":["基础语法","java"],"description":"反射 1、Class类的理解 类的加载过程： 程序在执行javac.exe命令后，会生成一个或多个字节码文件（.class结尾） 使用java.exe命令对某个字节码文件进行解释运行。相当于将某个字节码文件加载到内存中。此过程称为类的加载。加载到内存中的内，称为运行时类，此运行时类，就作为一个Class的一个实例 换句话说，Class的实例就对应着一个运行时类。 加载到内存中的运行时类，会缓存一定的时间，在此时间之内，可以通过不同的方式来获取此运行时类","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/code/java/Java%20%E5%9F%BA%E7%A1%80/%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80/17%E3%80%81%E5%8F%8D%E5%B0%84.html"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"17、反射"}],["meta",{"property":"og:description","content":"反射 1、Class类的理解 类的加载过程： 程序在执行javac.exe命令后，会生成一个或多个字节码文件（.class结尾） 使用java.exe命令对某个字节码文件进行解释运行。相当于将某个字节码文件加载到内存中。此过程称为类的加载。加载到内存中的内，称为运行时类，此运行时类，就作为一个Class的一个实例 换句话说，Class的实例就对应着一个运行时类。 加载到内存中的运行时类，会缓存一定的时间，在此时间之内，可以通过不同的方式来获取此运行时类"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-24T12:06:56.000Z"}],["meta",{"property":"article:author","content":"T4mako"}],["meta",{"property":"article:tag","content":"基础语法"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:published_time","content":"2022-07-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-24T12:06:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"17、反射\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-15T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-24T12:06:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"T4mako\\",\\"url\\":\\"https://github.com/T4mako/T4mako.github.io\\"}]}"]]},"headers":[{"level":2,"title":"反射","slug":"反射","link":"#反射","children":[{"level":3,"title":"1、Class类的理解","slug":"_1、class类的理解","link":"#_1、class类的理解","children":[]},{"level":3,"title":"2、获取Class实例的四种方式","slug":"_2、获取class实例的四种方式","link":"#_2、获取class实例的四种方式","children":[]},{"level":3,"title":"3、类的加载与ClassLoader的理解","slug":"_3、类的加载与classloader的理解","link":"#_3、类的加载与classloader的理解","children":[]},{"level":3,"title":"4、创建运行时类的对象","slug":"_4、创建运行时类的对象","link":"#_4、创建运行时类的对象","children":[]},{"level":3,"title":"5、获取运行时类的完整结构","slug":"_5、获取运行时类的完整结构","link":"#_5、获取运行时类的完整结构","children":[]},{"level":3,"title":"6、调用运行时类的指定结构","slug":"_6、调用运行时类的指定结构","link":"#_6、调用运行时类的指定结构","children":[]},{"level":3,"title":"7、代理模式与动态代理","slug":"_7、代理模式与动态代理","link":"#_7、代理模式与动态代理","children":[]}]}],"git":{"createdTime":1690200416000,"updatedTime":1690200416000,"contributors":[{"name":"T4mako","email":"1536954632@qq.com","commits":1}]},"readingTime":{"minutes":10.13,"words":3038},"filePathRelative":"code/java/Java 基础/语法基础/17、反射.md","localizedDate":"2022年7月15日","excerpt":"<h2> 反射</h2>\\n<p><img src=\\"https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220726114239139.png\\" alt=\\"image-20220726114239139\\" loading=\\"lazy\\"></p>\\n<h3> 1、Class类的理解</h3>\\n<ol>\\n<li>类的加载过程：</li>\\n</ol>\\n<ul>\\n<li>程序在执行javac.exe命令后，会生成一个或多个字节码文件（.class结尾）</li>\\n<li>使用java.exe命令对某个字节码文件进行解释运行。相当于将某个字节码文件加载到内存中。此过程称为<code>类的加载</code>。加载到内存中的内，称为<code>运行时类</code>，此运行时类，就作为一个<code>Class的一个实例</code></li>\\n<li>换句话说，Class的实例就对应着一个运行时类。</li>\\n<li>加载到内存中的运行时类，会缓存一定的时间，在此时间之内，可以通过不同的方式来获取此运行时类</li>\\n</ul>","autoDesc":true}');export{e as data};
