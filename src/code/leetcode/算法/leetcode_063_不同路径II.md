---
category: 
  - 算法
tag: 
  - 数组
  - 动态规划
  - 矩阵
---

# 063. 不同路径 II

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/unique-paths-ii/description/)

将障碍物填充 0
​
 


```java
class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int n = obstacleGrid.length, m = obstacleGrid[0].length;
        int[] f = new int[m];
        f[0] = obstacleGrid[0][0] == 0 ? 1 : 0;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (obstacleGrid[i][j] == 1) {
                    f[j] = 0;
                    continue;
                }
                if (j - 1 >= 0 && obstacleGrid[i][j - 1] == 0) {
                    f[j] += f[j - 1];
                }
            }
        }
        return f[m - 1];
    }
}
```