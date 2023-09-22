const l=JSON.parse('{"key":"v-6ab1288a","path":"/code/java/MyBatis.html","title":"Mybatis 基础","lang":"zh-CN","frontmatter":{"title":"Mybatis 基础","icon":"flow","order":8,"category":["java"],"tag":["orm","java"],"description":"1、MyBatis简介 MyBatis最初是Apache的一个开源项目iBatis, 2010年6月这个项目由Apache Software Foundation迁移到了Google Code。随着开发团队转投Google Code旗下， iBatis3.x正式更名为MyBatis。代码于2013年11月迁移到Github。iBatis一词来源于“internet”和“abatis”的组合，是一个基于Java的持久层框架。 iBatis提供的持久层框架包括SQL Maps和Data Access Objects（DAO）。","head":[["meta",{"property":"og:url","content":"https://T4mako.github.io/code/java/MyBatis.html"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"Mybatis 基础"}],["meta",{"property":"og:description","content":"1、MyBatis简介 MyBatis最初是Apache的一个开源项目iBatis, 2010年6月这个项目由Apache Software Foundation迁移到了Google Code。随着开发团队转投Google Code旗下， iBatis3.x正式更名为MyBatis。代码于2013年11月迁移到Github。iBatis一词来源于“internet”和“abatis”的组合，是一个基于Java的持久层框架。 iBatis提供的持久层框架包括SQL Maps和Data Access Objects（DAO）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"T4mako"}],["meta",{"property":"article:tag","content":"orm"}],["meta",{"property":"article:tag","content":"java"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mybatis 基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"T4mako\\",\\"url\\":\\"https://github.com/T4mako/T4mako.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1、MyBatis简介","slug":"_1、mybatis简介","link":"#_1、mybatis简介","children":[{"level":3,"title":"1.1MyBatis特性","slug":"_1-1mybatis特性","link":"#_1-1mybatis特性","children":[]},{"level":3,"title":"1.2、MyBatis下载","slug":"_1-2、mybatis下载","link":"#_1-2、mybatis下载","children":[]},{"level":3,"title":"1.3、和其它持久化层技术对比","slug":"_1-3、和其它持久化层技术对比","link":"#_1-3、和其它持久化层技术对比","children":[]}]},{"level":2,"title":"2、搭建MyBatis","slug":"_2、搭建mybatis","link":"#_2、搭建mybatis","children":[{"level":3,"title":"2.1、开发环境","slug":"_2-1、开发环境","link":"#_2-1、开发环境","children":[]},{"level":3,"title":"2.2、创建maven工程","slug":"_2-2、创建maven工程","link":"#_2-2、创建maven工程","children":[]},{"level":3,"title":"2.3、创建MyBatis的核心配置文件","slug":"_2-3、创建mybatis的核心配置文件","link":"#_2-3、创建mybatis的核心配置文件","children":[]},{"level":3,"title":"2.4、创建mapper接口","slug":"_2-4、创建mapper接口","link":"#_2-4、创建mapper接口","children":[]},{"level":3,"title":"2.5、创建MyBatis的映射文件","slug":"_2-5、创建mybatis的映射文件","link":"#_2-5、创建mybatis的映射文件","children":[]},{"level":3,"title":"2.6、通过junit测试功能","slug":"_2-6、通过junit测试功能","link":"#_2-6、通过junit测试功能","children":[]},{"level":3,"title":"2.7、加入log4j日志功能","slug":"_2-7、加入log4j日志功能","link":"#_2-7、加入log4j日志功能","children":[]}]},{"level":2,"title":"3、核心配置文件详解","slug":"_3、核心配置文件详解","link":"#_3、核心配置文件详解","children":[{"level":3,"title":"tips：创建文件模板","slug":"tips-创建文件模板","link":"#tips-创建文件模板","children":[]}]},{"level":2,"title":"4、MyBatis的增删改查","slug":"_4、mybatis的增删改查","link":"#_4、mybatis的增删改查","children":[]},{"level":2,"title":"5、MyBatis获取参数值的两种方式","slug":"_5、mybatis获取参数值的两种方式","link":"#_5、mybatis获取参数值的两种方式","children":[{"level":3,"title":"5.1、单个字面量类型的参数","slug":"_5-1、单个字面量类型的参数","link":"#_5-1、单个字面量类型的参数","children":[]},{"level":3,"title":"5.2、多个字面量类型的参数","slug":"_5-2、多个字面量类型的参数","link":"#_5-2、多个字面量类型的参数","children":[]},{"level":3,"title":"5.3、map集合类型的参数","slug":"_5-3、map集合类型的参数","link":"#_5-3、map集合类型的参数","children":[]},{"level":3,"title":"5.4、实体类类型的参数","slug":"_5-4、实体类类型的参数","link":"#_5-4、实体类类型的参数","children":[]},{"level":3,"title":"5.5、使用@Param标识参数","slug":"_5-5、使用-param标识参数","link":"#_5-5、使用-param标识参数","children":[]}]},{"level":2,"title":"6、MyBatis的各种查询功能","slug":"_6、mybatis的各种查询功能","link":"#_6、mybatis的各种查询功能","children":[{"level":3,"title":"6.1、查询一个实体类对象","slug":"_6-1、查询一个实体类对象","link":"#_6-1、查询一个实体类对象","children":[]},{"level":3,"title":"6.2、查询一个list集合","slug":"_6-2、查询一个list集合","link":"#_6-2、查询一个list集合","children":[]},{"level":3,"title":"6.3、查询单个数据","slug":"_6-3、查询单个数据","link":"#_6-3、查询单个数据","children":[]},{"level":3,"title":"6.4、查询一条数据为map集合","slug":"_6-4、查询一条数据为map集合","link":"#_6-4、查询一条数据为map集合","children":[]},{"level":3,"title":"6.5、查询多条数据为map集合","slug":"_6-5、查询多条数据为map集合","link":"#_6-5、查询多条数据为map集合","children":[]}]},{"level":2,"title":"7、特殊SQL的执行","slug":"_7、特殊sql的执行","link":"#_7、特殊sql的执行","children":[{"level":3,"title":"7.1、模糊查询","slug":"_7-1、模糊查询","link":"#_7-1、模糊查询","children":[]},{"level":3,"title":"7.2、批量删除","slug":"_7-2、批量删除","link":"#_7-2、批量删除","children":[]},{"level":3,"title":"7.3、动态设置表名","slug":"_7-3、动态设置表名","link":"#_7-3、动态设置表名","children":[]},{"level":3,"title":"7.4、添加功能获取自增的主键","slug":"_7-4、添加功能获取自增的主键","link":"#_7-4、添加功能获取自增的主键","children":[]}]},{"level":2,"title":"8、自定义映射resultMap","slug":"_8、自定义映射resultmap","link":"#_8、自定义映射resultmap","children":[{"level":3,"title":"8.1、resultMap处理字段和属性的映射关系","slug":"_8-1、resultmap处理字段和属性的映射关系","link":"#_8-1、resultmap处理字段和属性的映射关系","children":[]},{"level":3,"title":"8.2、多对一映射处理","slug":"_8-2、多对一映射处理","link":"#_8-2、多对一映射处理","children":[]},{"level":3,"title":"8.3、一对多映射处理","slug":"_8-3、一对多映射处理","link":"#_8-3、一对多映射处理","children":[]}]},{"level":2,"title":"9、动态SQL","slug":"_9、动态sql","link":"#_9、动态sql","children":[{"level":3,"title":"9.1、if  、where、trim","slug":"_9-1、if-、where、trim","link":"#_9-1、if-、where、trim","children":[]},{"level":3,"title":"9.2、choose、when、otherwise","slug":"_9-2、choose、when、otherwise","link":"#_9-2、choose、when、otherwise","children":[]},{"level":3,"title":"9.3、foreach","slug":"_9-3、foreach","link":"#_9-3、foreach","children":[]},{"level":3,"title":"9.4、SQL片段","slug":"_9-4、sql片段","link":"#_9-4、sql片段","children":[]}]},{"level":2,"title":"10、MyBatis缓存","slug":"_10、mybatis缓存","link":"#_10、mybatis缓存","children":[{"level":3,"title":"10.1、MyBatis的一级缓存","slug":"_10-1、mybatis的一级缓存","link":"#_10-1、mybatis的一级缓存","children":[]},{"level":3,"title":"10.2、MyBatis的二级缓存","slug":"_10-2、mybatis的二级缓存","link":"#_10-2、mybatis的二级缓存","children":[]},{"level":3,"title":"10.3、二级缓存的相关配置","slug":"_10-3、二级缓存的相关配置","link":"#_10-3、二级缓存的相关配置","children":[]},{"level":3,"title":"10.4、MyBatis缓存查询的顺序","slug":"_10-4、mybatis缓存查询的顺序","link":"#_10-4、mybatis缓存查询的顺序","children":[]},{"level":3,"title":"10.5、整合第三方缓存EHCache","slug":"_10-5、整合第三方缓存ehcache","link":"#_10-5、整合第三方缓存ehcache","children":[]}]},{"level":2,"title":"11、MyBatis的逆向工程","slug":"_11、mybatis的逆向工程","link":"#_11、mybatis的逆向工程","children":[{"level":3,"title":"11.1、创建逆向工程的步骤","slug":"_11-1、创建逆向工程的步骤","link":"#_11-1、创建逆向工程的步骤","children":[]},{"level":3,"title":"11.2、QBC查询","slug":"_11-2、qbc查询","link":"#_11-2、qbc查询","children":[]}]},{"level":2,"title":"12、分页插件","slug":"_12、分页插件","link":"#_12、分页插件","children":[{"level":3,"title":"12.1、分页插件的使用步骤","slug":"_12-1、分页插件的使用步骤","link":"#_12-1、分页插件的使用步骤","children":[]},{"level":3,"title":"12.2、分页插件的使用","slug":"_12-2、分页插件的使用","link":"#_12-2、分页插件的使用","children":[]}]}],"readingTime":{"minutes":28.41,"words":8522},"filePathRelative":"code/java/MyBatis.md","excerpt":"<h2> 1、MyBatis简介</h2>\\n<p>MyBatis最初是Apache的一个开源项目iBatis, 2010年6月这个项目由Apache Software Foundation迁移到了Google Code。随着开发团队转投Google Code旗下， iBatis3.x正式更名为MyBatis。代码于2013年11月迁移到Github。iBatis一词来源于“internet”和“abatis”的组合，是一个基于Java的持久层框架。 iBatis提供的持久层框架包括SQL Maps和Data Access Objects（DAO）。</p>\\n","autoDesc":true}');export{l as data};