
# 053. 最大子数组和

[题目描述](https://leetcode.cn/problems/maximum-subarray/)

<Badge text="中等" type="warning" vertical="middle" />

解题思路：  
- 使用动态规划解决该问题，创建一维数组 `dp[]`，`dp[i]` 表示第 i 个位置为末的最大子数组和
- 对于状态转移方程 `dp[i + 1] = Math.max(dp[i],dp[i - 1] + num[i])`
  - 如果 `dp[i - 1] < 0`，则必然有 `dp [i - 1] + num[i] < num[i]`

:::code-tabs
@tab Java
```java
class Solution {
    public int maxSubArray(int[] nums) {
        int res = nums[0];
        int[] dp = new int[nums.length];
        dp[0] = res;
        for(int i = 1;i < dp.length;i++){
            dp[i] = Math.max(nums[i],dp[i - 1] + nums[i]);
            res = Math.max(dp[i],res);
        }
        return res;
    }
}
```

@tab Python
```py
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = nums[0]
        current_sum = nums[0]
        
        for i in range(1, len(nums)):
            current_sum = max(nums[i], current_sum + nums[i])
            max_sum = max(max_sum, current_sum)
            
        return max_sum
```
:::