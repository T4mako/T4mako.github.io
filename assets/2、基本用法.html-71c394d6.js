const t=JSON.parse('{"key":"v-3f7834f0","path":"/code/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/TypeScript/2%E3%80%81%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95.html","title":"TypeScript基本用法","lang":"zh-CN","frontmatter":{"title":"TypeScript基本用法","date":"2023-08-12T00:00:00.000Z","category":["TypeScript"],"order":2,"article":false,"description":"二、基本用法 1、类型声明 TypeScript 代码最明显的特征，就是为 JavaScript 变量加上了类型声明。 类型声明的写法，一律为在标识符后面添加“冒号 + 类型”。函数参数和返回值，也是这样来声明类型。 let foo:string; //声明了它的类型为string function toString(num:number):string { //num的类型是number。参数列表的圆括号后面，声明了返回值的类型是string return String(num); }","head":[["meta",{"property":"og:url","content":"https://T4mako.github.io/code/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/TypeScript/2%E3%80%81%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95.html"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"TypeScript基本用法"}],["meta",{"property":"og:description","content":"二、基本用法 1、类型声明 TypeScript 代码最明显的特征，就是为 JavaScript 变量加上了类型声明。 类型声明的写法，一律为在标识符后面添加“冒号 + 类型”。函数参数和返回值，也是这样来声明类型。 let foo:string; //声明了它的类型为string function toString(num:number):string { //num的类型是number。参数列表的圆括号后面，声明了返回值的类型是string return String(num); }"}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"T4mako"}],["meta",{"property":"article:published_time","content":"2023-08-12T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"TypeScript基本用法\\",\\"description\\":\\"二、基本用法 1、类型声明 TypeScript 代码最明显的特征，就是为 JavaScript 变量加上了类型声明。 类型声明的写法，一律为在标识符后面添加“冒号 + 类型”。函数参数和返回值，也是这样来声明类型。 let foo:string; //声明了它的类型为string function toString(num:number):string { //num的类型是number。参数列表的圆括号后面，声明了返回值的类型是string return String(num); }\\"}"]]},"headers":[{"level":2,"title":"二、基本用法","slug":"二、基本用法","link":"#二、基本用法","children":[{"level":3,"title":"1、类型声明","slug":"_1、类型声明","link":"#_1、类型声明","children":[]},{"level":3,"title":"2、类型推断","slug":"_2、类型推断","link":"#_2、类型推断","children":[]},{"level":3,"title":"3、TypeScript 的编译","slug":"_3、typescript-的编译","link":"#_3、typescript-的编译","children":[]},{"level":3,"title":"4、值与类型","slug":"_4、值与类型","link":"#_4、值与类型","children":[]},{"level":3,"title":"5、TypeScript Playground","slug":"_5、typescript-playground","link":"#_5、typescript-playground","children":[]},{"level":3,"title":"6、tsc 编辑器","slug":"_6、tsc-编辑器","link":"#_6、tsc-编辑器","children":[]},{"level":3,"title":"7、ts-node 模块","slug":"_7、ts-node-模块","link":"#_7、ts-node-模块","children":[]}]}],"readingTime":{"minutes":7.09,"words":2127},"filePathRelative":"code/前端开发/TypeScript/2、基本用法.md","localizedDate":"2023年8月12日","excerpt":"<h2> 二、基本用法</h2>\\n<h3> 1、类型声明</h3>\\n<p>TypeScript 代码最明显的特征，就是为 JavaScript 变量加上了类型声明。</p>\\n<p>类型声明的写法，一律为在标识符后面添加“<strong>冒号 + 类型</strong>”。函数参数和返回值，也是这样来声明类型。</p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">let</span> foo<span class=\\"token operator\\">:</span><span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//声明了它的类型为string</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">toString</span><span class=\\"token punctuation\\">(</span>num<span class=\\"token operator\\">:</span><span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">:</span><span class=\\"token builtin\\">string</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token comment\\">//num的类型是number。参数列表的圆括号后面，声明了返回值的类型是string</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token function\\">String</span><span class=\\"token punctuation\\">(</span>num<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};
