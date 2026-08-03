---
category: 
  - 算法
tag: 
  - 队列
  - 数组
  - 滑动窗口
  - 队列

 
---
# 240. 搜索二维矩阵II

<Badge text="中等" type="warning" vertical="middle" />

https://leetcode.cn/problems/search-a-2d-matrix-ii/description/


```py
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        i, j = len(matrix) - 1, 0
        while i >= 0 and j < len(matrix[0]):
            if matrix[i][j] > target: i -= 1
            elif matrix[i][j] < target: j += 1
            else: return True
        return False
```

从矩阵 matrix 左下角元素（索引设为 (i, j) ）开始遍历，并与目标值对比：
- 当 `matrix[i][j] > target` 时，执行 `i--` ，即消去第 `i` 行元素。
- 当 `matrix[i][j] < target` 时，执行 `j++` ，即消去第 `j` 列元素。
- 当 `matrix[i][j] = target` 时，返回 `true` ，代表找到目标值。

若行索引或列索引越界，则代表矩阵中无目标值，返回 false 。