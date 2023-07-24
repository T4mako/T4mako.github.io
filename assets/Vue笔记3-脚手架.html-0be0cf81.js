const e=JSON.parse('{"key":"v-355c6832","path":"/code/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/vue/vue2%20%E5%9F%BA%E7%A1%80/Vue%E7%AC%94%E8%AE%B03-%E8%84%9A%E6%89%8B%E6%9E%B6.html","title":"Vue 脚手架","lang":"zh-CN","frontmatter":{"order":3,"icon":"vue","date":"2023-05-14T00:00:00.000Z","category":["Vue"],"tag":["Vue CLI","Vue"],"description":"Vue 脚手架 Vue 脚手架 是 Vue 官方提供的标准化开发工具（开发平台） Vue 脚手架：Vue CLI (command line interface) 全局安装 @vue/cli ： npm install -g @vue/cli","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/code/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/vue/vue2%20%E5%9F%BA%E7%A1%80/Vue%E7%AC%94%E8%AE%B03-%E8%84%9A%E6%89%8B%E6%9E%B6.html"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"Vue 脚手架"}],["meta",{"property":"og:description","content":"Vue 脚手架 Vue 脚手架 是 Vue 官方提供的标准化开发工具（开发平台） Vue 脚手架：Vue CLI (command line interface) 全局安装 @vue/cli ： npm install -g @vue/cli"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-24T12:06:56.000Z"}],["meta",{"property":"article:author","content":"T4mako"}],["meta",{"property":"article:tag","content":"Vue CLI"}],["meta",{"property":"article:tag","content":"Vue"}],["meta",{"property":"article:published_time","content":"2023-05-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-24T12:06:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vue 脚手架\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-14T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-24T12:06:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"T4mako\\",\\"url\\":\\"https://github.com/T4mako/T4mako.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1.1、初始化脚手架","slug":"_1-1、初始化脚手架","link":"#_1-1、初始化脚手架","children":[]},{"level":2,"title":"1.2、vue.js 与 vue.runtime.xxx.js","slug":"_1-2、vue-js-与-vue-runtime-xxx-js","link":"#_1-2、vue-js-与-vue-runtime-xxx-js","children":[]},{"level":2,"title":"1.3、vue.config.js 配置文件","slug":"_1-3、vue-config-js-配置文件","link":"#_1-3、vue-config-js-配置文件","children":[]},{"level":2,"title":"1.4、ref 属性","slug":"_1-4、ref-属性","link":"#_1-4、ref-属性","children":[]},{"level":2,"title":"1.5、props 配置项","slug":"_1-5、props-配置项","link":"#_1-5、props-配置项","children":[]},{"level":2,"title":"1.6、mixin（混入） 配置项","slug":"_1-6、mixin-混入-配置项","link":"#_1-6、mixin-混入-配置项","children":[]},{"level":2,"title":"1.7、Vue 插件","slug":"_1-7、vue-插件","link":"#_1-7、vue-插件","children":[]},{"level":2,"title":"1.8、scoped 样式","slug":"_1-8、scoped-样式","link":"#_1-8、scoped-样式","children":[]},{"level":2,"title":"1.9、组件化编码流程","slug":"_1-9、组件化编码流程","link":"#_1-9、组件化编码流程","children":[]},{"level":2,"title":"1.10、本地存储","slug":"_1-10、本地存储","link":"#_1-10、本地存储","children":[]},{"level":2,"title":"1.11、组件自定义事件","slug":"_1-11、组件自定义事件","link":"#_1-11、组件自定义事件","children":[{"level":3,"title":"案例：","slug":"案例","link":"#案例","children":[]}]},{"level":2,"title":"1.12、全局事件总线","slug":"_1-12、全局事件总线","link":"#_1-12、全局事件总线","children":[]},{"level":2,"title":"1.13、消息订阅与发布（pubsub）","slug":"_1-13、消息订阅与发布-pubsub","link":"#_1-13、消息订阅与发布-pubsub","children":[]},{"level":2,"title":"1.14、$nextTick()","slug":"_1-14、-nexttick","link":"#_1-14、-nexttick","children":[]},{"level":2,"title":"1.15、动画效果","slug":"_1-15、动画效果","link":"#_1-15、动画效果","children":[]}],"git":{"createdTime":1690200416000,"updatedTime":1690200416000,"contributors":[{"name":"T4mako","email":"1536954632@qq.com","commits":1}]},"readingTime":{"minutes":12.39,"words":3716},"filePathRelative":"code/前端开发/vue/vue2 基础/Vue笔记3-脚手架.md","localizedDate":"2023年5月14日","excerpt":"<h1> Vue 脚手架</h1>\\n<p><a href=\\"https://cli.vuejs.org/zh/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Vue 脚手架</a> 是 Vue 官方提供的标准化开发工具（开发平台）</p>\\n<p>Vue 脚手架：Vue CLI (command line interface)</p>\\n<p>全局安装 @vue/cli  ：</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token function\\">npm</span> <span class=\\"token function\\">install</span> <span class=\\"token parameter variable\\">-g</span> @vue/cli\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
