---
category: 
  - 算法
tag: 
  - 深度优先
  - 广度有限
  - 数组
  - 矩阵
date: 2024-03-19
---

# 200. 岛屿数量

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/number-of-islands/)

解法：使用深度优先的思想，不断找相邻为 1 的坐标

```java
class Solution {
    public int numIslands(char[][] grid) {
        int res = 0;
        for(int row = 0;row < grid.length;row++) {
        	for(int col = 0;col < grid[0].length;col++) {
        		if(grid[row][col] == '1') {
        			res++;
        			find(grid,row,col);
        		}else {
        			continue;
        		}
        	}
        }
        return res;
    }

	public void find(char[][] grid, int row, int col) {
		if(row >= 0 && col >= 0 && row < grid.length && col < grid[0].length && grid[row][col] == '1') {
			grid[row][col] = '2';
			// 上下左右
			find(grid,row - 1,col);
			find(grid,row + 1,col);
			find(grid,row,col - 1);
			find(grid,row,col + 1);
		}
		return;
	}
}
```