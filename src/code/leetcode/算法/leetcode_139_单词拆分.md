---
category: 
  - 算法
tag: 
  - 数组
  - 字符串
  - 哈希表
  - 动态规划
date: 2024-03-28
---

# 139. 单词拆分

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/word-break/)




> 解法：  
> 引用：https://leetcode.cn/problems/word-break/solutions/302471/dan-ci-chai-fen-by-leetcode-solution/comments/2152649
> 
> 以字符串 s = "leetcode" 和字典 wordDict = "leet", "code" 为例
> 
> 首先，我们初始化一个长度为 9 的布尔数组 dp，所有元素都初始化为 false，除了 dp[0]，它表示空字符串，所以初始化为 true。
> 
> 然后，我们开始遍历字符串 "leetcode" 的每个字符，同时对于每个字符，我们都会遍历从当前字符到字符串末尾的每个子字符串。
> 
> 当 i = 0 时，我们检查子字符串 "l", "le", "lee", "leet", "leetc", "leetco", "leetcod", "leetcode"。当我们检查到 "leet" 时，> 我们发现 "leet" 在字典中，而且 dp[0] 是 true，所以我们将 dp[4] 设置为 true。
> 
> 当 i = 1 时，我们检查子字符串 "e", "ee", "eet", "eetc", "eetco", "eetcod", "eetcode"。但是因为 dp[1] 是 false，所以我们不会> 更新任何 dp[j]。
> 
> 当 i = 2 和 i = 3 时，同样因为 dp[2] 和 dp[3] 都是 false，所以我们也不会更新任何 dp[j]。
> 
> 当 i = 4 时，我们检查子字符串 "c", "co", "cod", "code"。当我们检查到 "code" 时，我们发现 "code" 在字典中，而且 dp[4] 是 > true，所以我们将 dp[8] 设置为 true。
> 
> 最后，我们返回 dp[8]，也就是 true，表示字符串 "leetcode" 可以被拆分为字典中的单词。

```java
public class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordDictSet = new HashSet(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordDictSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}
```