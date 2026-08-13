---
date: 2026-08-13
category: 
  - 算法
tag: 
  - 数组
  - 回溯
  - 位运算
---

# 78. 子集


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/subsets/description/)

解法：回溯


```java
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = [[]]
        def list_all(nums,left):
            if not left: return
            for idx,i in enumerate(left):
                res.append(nums + [i])
                list_all(nums + [i],left[idx+1:])
        list_all([],nums)
        return res
        
```