---
date: 2023-09-03
category: 
  - 算法
tag: 
  - 数组
  - 动态规划
---

# 198. 打家劫舍


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/house-robber/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：   
动态规划  
状态转移方程：
`dp[k] = Math.max(dp[k-1], nums[k-1] + dp[k-2]);`

:::code-tabs
@tab Java
```java
class Solution {
    public int rob(int[] nums) {
        if (nums.length == 0) {
        return 0;
      }
      int len = nums.length;
      int[] dp = new int[N+1];
      dp[0] = 0;
      dp[1] = nums[0];
      for (int k = 2; k <= N; k++) {
        dp[k] = Math.max(dp[k-1], nums[k-1] + dp[k-2]);
      }
      return dp[len];
    }
}
```
@tab Ts
```ts
function rob(nums: number[]): number {
    if (nums.length == 0) {
        return 0;
    }
    let len:number = nums.length;
    let dp: number[] = [];
    dp[0] = 0;
    dp[1] = nums[0];
    for (let k: number = 2; k <= len; k++) {
        dp[k] = Math.max(dp[k-1], nums[k-1] + dp[k-2]);
    }
    return dp[len];
};
```
:::