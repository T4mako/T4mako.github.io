---
date: 2024-01-07
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 动态规划
---

# 714. 买卖股票的最佳时机含手续费

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/?envType=study-plan-v2&envId=leetcode-75)

解法思路：  
使用动态规划，建立一个 n 行 2 列的二维数组 `dp[n][2]`  
`dp[i][0]` 表示第 i 天不持有可获得的最大利润  
`dp[i][1]` 表示第 i 天持有可获得的最大利润（注意是第 i 天持有，而不是第 i 天买入）  
$$ 
    dp[i][0] = max(dp[i−1][0],dp[i−1][1] + prices[i] − fee)（不持有） \\
    dp[i][1] = max(dp[i−1][1],dp[i−1][0]−prices[i]) （持有）

$$



```java
class Solution {
    public int maxProfit(int[] prices, int fee) {
        int n = prices.length;
        int[] dp = new int[2];
        dp[0] = 0;
        dp[1] = -prices[0];
        for (int i = 1; i < n; i++) {
            int tmp = dp[0];
            dp[0] = Math.max(dp[0], dp[1] + prices[i] - fee); 
            dp[1] = Math.max(dp[1], tmp - prices[i]);
        }
        return dp[0];
    }
}
```