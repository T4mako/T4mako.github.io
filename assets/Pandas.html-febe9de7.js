const e=JSON.parse('{"key":"v-237d7a16","path":"/code/python/Pandas.html","title":"Pandas","lang":"zh-CN","frontmatter":{"description":"Pandas 一、简介 Pandas 是开源的数据分析和数据处理库，基于 Python Pandas 适用于处理结构化数据 Pandas 主要引入了两种新的数据结构： Series（一维） 类似于一维数组，由一组数据以及与之相关的数据标签（索引）构成 Series 可以看作是 DataFrame 中的一列，也可以是单独存在的一维数据结构 DataFrame （二维） 类似于一个二维表格，它是 Pandas 中最重要的数据结构。 DataFrame 既有行索引也有列索引 DataFrame 可视为由多个 Series 组成的数据结构","head":[["meta",{"property":"og:url","content":"https://T4mako.github.io/code/python/Pandas.html"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"Pandas"}],["meta",{"property":"og:description","content":"Pandas 一、简介 Pandas 是开源的数据分析和数据处理库，基于 Python Pandas 适用于处理结构化数据 Pandas 主要引入了两种新的数据结构： Series（一维） 类似于一维数组，由一组数据以及与之相关的数据标签（索引）构成 Series 可以看作是 DataFrame 中的一列，也可以是单独存在的一维数据结构 DataFrame （二维） 类似于一个二维表格，它是 Pandas 中最重要的数据结构。 DataFrame 既有行索引也有列索引 DataFrame 可视为由多个 Series 组成的数据结构"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"T4mako"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Pandas\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"T4mako\\",\\"url\\":\\"https://github.com/T4mako/T4mako.github.io\\"}]}"]]},"headers":[{"level":2,"title":"一、简介","slug":"一、简介","link":"#一、简介","children":[]},{"level":2,"title":"二、Series","slug":"二、series","link":"#二、series","children":[{"level":3,"title":"Series 创建","slug":"series-创建","link":"#series-创建","children":[]},{"level":3,"title":"Series 数据增删改查","slug":"series-数据增删改查","link":"#series-数据增删改查","children":[]},{"level":3,"title":"Series 基本运算","slug":"series-基本运算","link":"#series-基本运算","children":[]},{"level":3,"title":"Series 属性与方法","slug":"series-属性与方法","link":"#series-属性与方法","children":[]}]},{"level":2,"title":"三、DataFrame","slug":"三、dataframe","link":"#三、dataframe","children":[{"level":3,"title":"DateFrom 创建","slug":"datefrom-创建","link":"#datefrom-创建","children":[]},{"level":3,"title":"DataFrame 的属性和方法","slug":"dataframe-的属性和方法","link":"#dataframe-的属性和方法","children":[]},{"level":3,"title":"DataFrame 增删改查","slug":"dataframe-增删改查","link":"#dataframe-增删改查","children":[]},{"level":3,"title":"DataFrame 的统计分析","slug":"dataframe-的统计分析","link":"#dataframe-的统计分析","children":[]},{"level":3,"title":"DataFrame 的索引操作","slug":"dataframe-的索引操作","link":"#dataframe-的索引操作","children":[]},{"level":3,"title":"DataFrame 的布尔索引","slug":"dataframe-的布尔索引","link":"#dataframe-的布尔索引","children":[]},{"level":3,"title":"DataFrame 的数据类型","slug":"dataframe-的数据类型","link":"#dataframe-的数据类型","children":[]},{"level":3,"title":"DataFrame 的合并与分割","slug":"dataframe-的合并与分割","link":"#dataframe-的合并与分割","children":[]},{"level":3,"title":"DataFrame 索引和切片","slug":"dataframe-索引和切片","link":"#dataframe-索引和切片","children":[]}]},{"level":2,"title":"四、Pandas CSV","slug":"四、pandas-csv","link":"#四、pandas-csv","children":[{"level":3,"title":"读取与保存","slug":"读取与保存","link":"#读取与保存","children":[]},{"level":3,"title":"数据处理","slug":"数据处理","link":"#数据处理","children":[]}]},{"level":2,"title":"五、Pandas Json","slug":"五、pandas-json","link":"#五、pandas-json","children":[{"level":3,"title":"读取与保存","slug":"读取与保存-1","link":"#读取与保存-1","children":[]}]},{"level":2,"title":"六、数据清洗","slug":"六、数据清洗","link":"#六、数据清洗","children":[{"level":3,"title":"Pandas 清洗空值","slug":"pandas-清洗空值","link":"#pandas-清洗空值","children":[]},{"level":3,"title":"Pandas 清洗格式错误数据","slug":"pandas-清洗格式错误数据","link":"#pandas-清洗格式错误数据","children":[]},{"level":3,"title":"Pandas 清洗错误数据","slug":"pandas-清洗错误数据","link":"#pandas-清洗错误数据","children":[]},{"level":3,"title":"Pandas 清洗重复数据","slug":"pandas-清洗重复数据","link":"#pandas-清洗重复数据","children":[]}]},{"level":2,"title":"七、常用函数","slug":"七、常用函数","link":"#七、常用函数","children":[{"level":3,"title":"数据结构","slug":"数据结构","link":"#数据结构","children":[]},{"level":3,"title":"读取数据","slug":"读取数据","link":"#读取数据","children":[]},{"level":3,"title":"查看数据","slug":"查看数据","link":"#查看数据","children":[]},{"level":3,"title":"数据清洗","slug":"数据清洗","link":"#数据清洗","children":[]},{"level":3,"title":"数据选择和切片","slug":"数据选择和切片","link":"#数据选择和切片","children":[]},{"level":3,"title":"数据排序","slug":"数据排序","link":"#数据排序","children":[]},{"level":3,"title":"数据分组和聚合","slug":"数据分组和聚合","link":"#数据分组和聚合","children":[]},{"level":3,"title":"数据合并","slug":"数据合并","link":"#数据合并","children":[]},{"level":3,"title":"数据选择和过滤","slug":"数据选择和过滤","link":"#数据选择和过滤","children":[]},{"level":3,"title":"数据统计和描述","slug":"数据统计和描述","link":"#数据统计和描述","children":[]}]},{"level":2,"title":"八、相关性分析","slug":"八、相关性分析","link":"#八、相关性分析","children":[]},{"level":2,"title":"九、其他函数","slug":"九、其他函数","link":"#九、其他函数","children":[{"level":3,"title":"一般函数","slug":"一般函数","link":"#一般函数","children":[]}]}],"readingTime":{"minutes":20.75,"words":6224},"filePathRelative":"code/python/Pandas.md","excerpt":"<h1> Pandas</h1>\\n<h2> 一、简介</h2>\\n<p>Pandas 是开源的数据分析和数据处理库，基于 Python</p>\\n<p>Pandas 适用于处理结构化数据</p>\\n<p>Pandas 主要引入了两种新的数据结构：</p>\\n<ul>\\n<li><strong>Series</strong>（一维）</li>\\n</ul>\\n<p>类似于一维数组，由一组数据以及与之相关的数据标签（索引）构成</p>\\n<p>Series 可以看作是 DataFrame 中的一列，也可以是单独存在的一维数据结构</p>\\n<ul>\\n<li>\\n<p><strong>DataFrame</strong> （二维）</p>\\n<p>类似于一个二维表格，它是 Pandas 中最重要的数据结构。</p>\\n<p>DataFrame 既有行索引也有列索引</p>\\n<p>DataFrame 可视为由多个 Series 组成的数据结构</p>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
