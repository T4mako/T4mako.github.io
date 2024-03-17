---
date: 2024-03-17
category: 
  - 算法
tag: 
  - 数组
  - 矩阵
---


# 054. 螺旋矩阵

[题目描述](https://leetcode.cn/problems/spiral-matrix/)

<Badge text="中等" type="warning" vertical="middle" />

解题思路： index 代表动作，flag 数组代表该位置是否已访问过

```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
		int maxRow = matrix.length;
		int maxCol = matrix[0].length;
		boolean[][] flag = new boolean[maxRow][maxCol];
		int index = 0;
		List<Integer> res = new ArrayList<>();
		int row = 0, col = 0;
		while (true) {
			if(row < 0 || col < 0 || row >= maxRow || col >= maxCol || flag[row][col]) return res;
			flag[row][col] = true;
			res.add(matrix[row][col]);
			if (index == 0) {
				// 右
				if (col + 1 < maxCol && !flag[row][col + 1]) {
					col++;
				} else {
					index = 1;
					row++;
				}
				continue;
			}
			// 下
			if (index == 1) {
				if (row + 1 < maxRow && !flag[row + 1][col]) {
					row++;
				} else {
					index = 2;
					col--;
				}
				continue;
			}
			// 左
			if (index == 2) {
				if (col - 1 >= 0 && !flag[row][col - 1]) {
					col--;
				} else {
					index = 3;
					row--;
				}
				continue;
			}
			// 上
			if (index == 3) {
				if (row - 1 >= 0 && !flag[row - 1][col]) {
					row--;
					
				} else {
					index = 0;
                    col++;
				}
				continue;
			}
		}
	}
}
```