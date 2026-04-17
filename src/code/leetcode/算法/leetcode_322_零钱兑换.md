---
date: 2024-03-28
category: 
  - 算法
tag: 
  - 数组
  - 动态规划
---

# 322. 零钱兑换

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/coin-change/description/)

解法：    
创建 dp 数组，`dp[i]` 表示这个金额需要的最少数量  
状态转移方程：`dp[i] = Min(dp[i - coins[j]] + 1)`，其公式代表一枚硬币加 i 金额减去该硬币的值所需的硬币数


```java
public class Solution {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int j = 0; j < coins.length; j++) {
                if (coins[j] <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```