---
 
date: 2023-08-04
category: 
  - 算法
tag: 
  - 数组
  - 二分查找
---
# 153. 寻找旋转排序数组中的最小值


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/)

## 解法一

```py
class Solution:
    def findMin(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        return nums[left]
```

判断中间值与右边界：
- 如果中间值比右边界大，中间值在左侧递增部分，移动 left 指针
- 如果中间值比右边界小，右边严格单调递增，移动 right 指针