---
date: 2024-09-4
category: 
  - 算法
tag: 
  - 双指针
  - 数组
  - 排序
---

# 75. 颜色分类


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/sort-colors/)

解法思路：选择排序

```py
class Solution(object):
    def sortColors(self, nums):
        """
        :type nums: List[int]
        :rtype: None Do not return anything, modify nums in-place instead.
        """
        l = len(nums)
        for i in range(l):
            min_idx = i
            for j in range(i + 1,l):
                if nums[j] < nums[min_idx]:
                    min_idx = j
            nums[i], nums[min_idx] = nums[min_idx], nums[i]  # 交换最小值到当前位置
```

解法思路：找出所有的 0 交换至数组的头部，并且找出所有的 2 交换至数组的尾部。

```py
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        n = len(nums)
        p0, p2 = 0, n - 1
        i = 0
        while i <= p2:
            while i <= p2 and nums[i] == 2:
                nums[i], nums[p2] = nums[p2], nums[i]
                p2 -= 1
            if nums[i] == 0:
                nums[i], nums[p0] = nums[p0], nums[i]
                p0 += 1
            i += 1
```