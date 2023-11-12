---
date: 2023-08-07
category: 
  - 算法
tag: 
  - 数组
  - 滑动窗口
---

# 643_子数组最大平均数 I



<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/maximum-average-subarray-i/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：使用大小固定的滑动窗口，判断窗口在移动时的大小变化（新数与旧数）


```java
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        int sum = 0,max = 0;
        if (nums.length <= k) {
            for (int num : nums) {
                sum += num;
            }
            return (double) sum / k;
        }
        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }
        max = sum;
        for (int i = k; i < nums.length; i++) {
            max = Math.max(max,sum = sum - nums[i-k] + nums[i]);

        }
        return (double) max / k;
    }
}
```