---
article: true
date: 2023-08-21
category: 
  - 算法
tag: 
  - 数组
  - 动态规划
---

# 746. 使用最小花费爬楼梯

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/min-cost-climbing-stairs/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路:  
对于第 n 个台阶，取决于上第 n-1 个台阶的最小花费 + 第 n-1 个台阶对应的花费 与 上第 n-2 个台阶的最小花费 + 第 n-2 个台阶对应的花费 的较小的一个。  
即状态转义方程可写为：`dp[i] = min(dp[i - 1] + cost[i - 1],dp[i - 2] + cost[i - 2])`
- 建立 dp数组，其长度为 `cost.length + 1` （要上到 cost 的长度的台阶 + 1）
- 上到第一层与第二层台阶只需要花费 0，所以 `dp[0]=dp[1]=0`
- 上第三层台阶开始使用状态转义方程
- 返回 dp 数组的最后一项



:::code-tabs
@tab Java
```java
class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int[] dp = new int[cost.length + 1];
        dp[0] = 0;
        dp[1] = 0;
        for (int i = 2; i <= cost.length; i++) {
            dp[i] = Math.min(dp[i-1] + cost[i-1],dp[i - 2] + cost[i - 2]);
        }
        return dp[cost.length];
    }
}
```
@tab Ts
```ts
function minCostClimbingStairs(cost: number[]): number {
    let dp:number[] = [];
    dp[0] = dp[1] = 0;
    for (let i:number = 2; i <= cost.length; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1],dp[i - 2] + cost[i - 2]);
    }
    return dp[cost.length];
};
```
:::