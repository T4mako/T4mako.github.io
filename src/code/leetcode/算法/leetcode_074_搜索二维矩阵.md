---
date: 2024-03-16
category: 
  - 算法
tag: 
  - 二分查找
  - 数组
  - 矩阵
---

# 74. 搜索二维矩阵


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/search-a-2d-matrix/description/)

解法思路： 二维矩阵的二分查找，`mid = (left + right) // 2; x = matrix[mid // n][mid % n]`

```py
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m, n = len(matrix), len(matrix[0])
        left, right = 0, m * n - 1
        while left <= right:
            mid = (left + right) // 2
            mid_m = mid // n
            mid_n = mid % n
            if matrix[mid_m][mid_n] == target:
                return True
            elif matrix[mid_m][mid_n] > target:
                right = mid - 1
            else:
                left = mid + 1
        return False
```