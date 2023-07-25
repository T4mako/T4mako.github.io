const e=JSON.parse(`{"key":"v-73c4da82","path":"/code/leetcode/leetcode_010_%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%8C%B9%E9%85%8D.html","title":"010_正则表达式匹配","lang":"zh-CN","frontmatter":{"description":"010_正则表达式匹配 tag：动态规划、递归、字符串 难度：困难 题目： 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。 '.' 匹配任意单个字符 '*' 匹配零个或多个前面的那一个元素 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。 示例 1： 输入：s = \\"aa\\", p = \\"a\\" 输出：false 解释：\\"a\\" 无法匹配 \\"aa\\" 整个字符串。 示例 2: 输入：s = \\"aa\\", p = \\"a*\\" 输出：true 解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 \\"aa\\" 可被视为 'a' 重复了一次。 示例 3： 输入：s = \\"ab\\", p = \\".\\" 输出：true 解释：\\".\\" 表示可匹配零个或多个（'*'）任意字符（'.'）。 来源：力扣（LeetCode） 链接：https://leetcode.cn/problems/regular-expression-matching 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。","head":[["meta",{"property":"og:url","content":"https://T4mako.github.io/code/leetcode/leetcode_010_%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%8C%B9%E9%85%8D.html"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"010_正则表达式匹配"}],["meta",{"property":"og:description","content":"010_正则表达式匹配 tag：动态规划、递归、字符串 难度：困难 题目： 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。 '.' 匹配任意单个字符 '*' 匹配零个或多个前面的那一个元素 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。 示例 1： 输入：s = \\"aa\\", p = \\"a\\" 输出：false 解释：\\"a\\" 无法匹配 \\"aa\\" 整个字符串。 示例 2: 输入：s = \\"aa\\", p = \\"a*\\" 输出：true 解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 \\"aa\\" 可被视为 'a' 重复了一次。 示例 3： 输入：s = \\"ab\\", p = \\".\\" 输出：true 解释：\\".\\" 表示可匹配零个或多个（'*'）任意字符（'.'）。 来源：力扣（LeetCode） 链接：https://leetcode.cn/problems/regular-expression-matching 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"T4mako"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"010_正则表达式匹配\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"T4mako\\",\\"url\\":\\"https://github.com/T4mako/T4mako.github.io\\"}]}"]]},"headers":[{"level":2,"title":"解法：","slug":"解法","link":"#解法","children":[]}],"readingTime":{"minutes":1.29,"words":386},"filePathRelative":"code/leetcode/leetcode_010_正则表达式匹配.md","excerpt":"<h1> 010_正则表达式匹配</h1>\\n<blockquote>\\n<p>tag：动态规划、递归、字符串</p>\\n<p>难度：困难</p>\\n</blockquote>\\n<blockquote>\\n<p>题目：</p>\\n<p>给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。</p>\\n<p>'.' 匹配任意单个字符<br>\\n'*' 匹配零个或多个前面的那一个元素<br>\\n所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。</p>\\n<p>示例 1：</p>\\n<p>输入：s = \\"aa\\", p = \\"a\\"<br>\\n输出：false<br>\\n解释：\\"a\\" 无法匹配 \\"aa\\" 整个字符串。<br>\\n示例 2:</p>\\n<p>输入：s = \\"aa\\", p = \\"a*\\"<br>\\n输出：true<br>\\n解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 \\"aa\\" 可被视为 'a' 重复了一次。<br>\\n示例 3：</p>\\n<p>输入：s = \\"ab\\", p = \\".<em>\\"<br>\\n输出：true<br>\\n解释：\\".</em>\\" 表示可匹配零个或多个（'*'）任意字符（'.'）。</p>\\n<p>来源：力扣（LeetCode）<br>\\n链接：<a href=\\"https://leetcode.cn/problems/regular-expression-matching\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://leetcode.cn/problems/regular-expression-matching</a><br>\\n著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。</p>\\n</blockquote>","autoDesc":true}`);export{e as data};
