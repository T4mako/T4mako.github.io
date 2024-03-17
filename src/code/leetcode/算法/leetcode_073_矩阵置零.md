---
date: 2024-03-16
category: 
  - 算法
tag: 
  - 哈希表
  - 数组
  - 矩阵
---

# 73. 矩阵置零


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/set-matrix-zeroes/)

解法思路：首先通过遍历记录哪些行和列需要置 0，再遍历一次将 0 填充

```java
class Solution {
    public void setZeroes(int[][] matrix) {
		HashSet<Integer> rows = new HashSet<>();
		HashSet<Integer> cols = new HashSet<>();
		for (int r = 0; r < matrix.length; r++) {
			for (int c = 0; c < matrix[0].length; c++) {
				if (matrix[r][c] == 0) {
					rows.add(r);
					cols.add(c);
				}
			}
		}
		for (int r = 0; r < matrix.length; r++) {
			for (int c = 0; c < matrix[0].length; c++) {
				if (rows.contains(r)) {
					matrix[r][c] = 0;
				}
				if (cols.contains(c)) {
					matrix[r][c] = 0;
				}
			}
		}

	}
}
```

