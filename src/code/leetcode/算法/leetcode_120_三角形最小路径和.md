---
category: 
  - 算法
tag: 
  - 数组
  - 动态规划
date: 2024-03-29
---

# 120. 三角形最小路径和

<Badge text="中等" type="warning" vertical="middle" />

解法：  
动态规划，状态转移方程：`dp[i][j]=min(dp[i+1][j],dp[i+1][j+1])+triangle[i][j]`

```java
class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[][] dp = new int[n + 1][n + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle.get(i).get(j);
            }
        }
        return dp[0][0];
    }
}
```

