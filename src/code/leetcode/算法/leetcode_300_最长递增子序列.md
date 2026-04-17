---
date: 2024-03-30
category: 
  - 算法
tag: 
  - 数组
  - 动态规划
  - 二分查找
---

# 300. 最长递增子序列

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/longest-increasing-subsequence/)

解法：动态规划，dp[i] 表示截止到为止 i 的最长递增子序列，状态转移方程：`dp[i] = Math.max(dp[j] + 1, dp[i]);`


```java
class Solution {
    public int lengthOfLIS(int[] nums) {
		int res = Integer.MIN_VALUE;
		int[] dp = new int[nums.length];
		for (int i = 0; i < nums.length; i++) {
			dp[i] = 1;
			for (int j = 0; j < i; j++) {
				if(nums[i] > nums[j]) {
					dp[i] = Math.max(dp[j] + 1, dp[i]);
				}
			}
			res = Math.max(res, dp[i]);
		}
		return res;
    }
}
```