---
date: 2023-08-03
category: 
  - 算法
tag: 
  - 数组
  - 贪心
---

# 334_递增的三元子序列


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/increasing-triplet-subsequence/description/?envType=study-plan-v2&envId=leetcode-75)


## 解法一：
以中间的数为基准，向两侧分别寻找小于与大于它的数

```java
class Solution {
    public boolean increasingTriplet(int[] nums) {
        if(nums.length <= 2) return false;
        int left = nums[0];
        int mid;
        int right = left;
        int rightIndex = 0; // 记录 right 的索引

        for (int i = 1; i < nums.length - 1; i++) {
            left = Math.min(left, nums[i - 1]); // 更新 left
            mid = nums[i]; // 更新 mid
            if(left >= mid) continue; // 判断 left 与 right
            // 更新 right
            // 如果 mid 已大于等于 rightIndex,重新计算 right 与 rightIndex
            if(mid >= rightIndex){
                right = nums[i + 1];
                rightIndex = i + 1;
                for (int j = i + 2; j < nums.length; j++) {
                    if(right <= nums[j]){
                        // 更新 right 与 rightIndex
                        rightIndex = j;
                        right = nums[j];
                        // 判断
                        if(right > mid) return true;
                    }
                }
            }
            if(right > mid) return true;
        }
        return false;
    }
}
```

## 解法二：

使用贪心求解：  
- 如果 num > second 则找到了一个递增的三元子序列，返回 true；

- 否则，如果 num > first 则将 second 的值更新为 num；

- 否则，将 first 的值更新为 num。


```java
class Solution {
    public boolean increasingTriplet(int[] nums) {
        int n = nums.length;
        if (n < 3) {
            return false;
        }
        int first = nums[0], second = Integer.MAX_VALUE;
        for (int i = 1; i < n; i++) {
            int num = nums[i];
            if (num > second) {
                return true;
            } else if (num > first) {
                second = num;
            } else {
                first = num;
            }
        }
        return false;
    }
}
```