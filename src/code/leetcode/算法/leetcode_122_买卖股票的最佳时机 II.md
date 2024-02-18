---
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 动态规划
date: 2024-02-18
---

# 122. 买卖股票的最佳时机 II
<Badge text="中等" type="warning" vertical="middle" />


### 解法一 动态规划

建立两行的 dp 数组，第一行是没有买入状态下的余额，第二行是有买入状态下的余额

初始化时:
```java
dp[0][0] = 0; // 没买入
dp[1][0] = -prices[0]; // 买入
```

状态转移方程：
```java
dp[0][i] = Math.max(dp[0][i-1],dp[1][i-1] + prices[i]); // 前一天未买入与前一天卖出的最大值
dp[1][i] = Math.max(dp[1][i-1],dp[0][i-1] - prices[i]); // 前一天买入与前一天有买入不做操作的最大值
```



```java
class Solution {
    public int maxProfit(int[] prices) {
        int len = prices.length;
        int[][] dp = new int[2][len];
        dp[0][0] = 0;
        dp[1][0] = -prices[0];
        for (int i = 1; i < len; i++) {
            dp[0][i] = Math.max(dp[0][i-1],dp[1][i-1] + prices[i]);
            dp[1][i] = Math.max(dp[1][i-1],dp[0][i-1] - prices[i]);
        }
        return dp[0][len - 1];
    }
}
```


### 解法二

```java
class Solution {
    public int maxProfit(int[] prices) {
        int result = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1])
                result += prices[i] - prices[i - 1];
        }
        return result;
    }
}
```