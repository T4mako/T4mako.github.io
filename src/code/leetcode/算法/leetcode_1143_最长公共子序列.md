---
date: 2024-01-03
category: 
  - 算法
tag: 
  - 字符串
  - 动态规划
---

# 1143. 最长公共子序列


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/longest-common-subsequence/description/?envType=study-plan-v2&envId=leetcode-75)

解法思路：  
- 使用动态规划思想，创建一个长度为 `arr[len1 + 1][len2 + 1]` 的二维数组，数组的第一行和第一列始终保持为 0
- 状态转移方程：

$$ dp[i + 1][j + 1] = \begin{cases}
    dp[i][j] + 1, & \text{text1.charAt}(i) = \text{text2.charAt}(j) \\
    \max(dp[i][j + 1],dp[i + 1][j]), & \text{otherwise}
\end{cases}$$


```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int len1 = text1.length(),len2 = text2.length();
        int[][] dp = new int[len1 + 1][len2 + 1];
        for (int i = 0; i < len1; i++) {
            char c = text1.charAt(i);
            for (int j = 0; j < len2; j++) {
                if(c == text2.charAt(j)){
                    dp[i + 1][j + 1] = dp[i][j] + 1;
                }else {
                    dp[i + 1][j + 1] = Math.max(dp[i][j + 1],dp[i + 1][j]);
                }
            }
        }
        return dp[len1][len2];
    }
}
```