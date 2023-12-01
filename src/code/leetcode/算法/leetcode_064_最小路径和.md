---
category: 
  - 算法
tag: 
  - 数组
  - 动态规划
  - 矩阵
---

# 064. 最小路径和

[题目描述](https://leetcode.cn/problems/minimum-path-sum/description/)

<Badge text="简单" type="tip" vertical="middle" />


```java
class Solution {
    public int minPathSum(int[][] grid) {
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if(i - 1 >= 0 && j - 1 >= 0) grid[i][j] += Math.min(grid[i - 1][j],grid[i][j - 1]);
                else if (i - 1 >= 0) grid[i][j] += grid[i - 1][j];
                else if (j - 1 >= 0) grid[i][j] += grid[i][j - 1];
            }
        }
        return grid[grid.length - 1][grid[0].length - 1];
    }
}
```

