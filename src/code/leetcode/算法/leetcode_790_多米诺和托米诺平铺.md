---
 
date: 2023-09-04
category: 
  - 算法
tag: 
  - 动态规划
---

# 790. 多米诺和托米诺平铺

<Badge text="中等" type="warning" vertical="middle" />


[题目描述](https://leetcode.cn/problems/domino-and-tromino-tiling/)

解题思路：   
将该问题转化为第 i - 1 列与 第 i 列的情况  
i - 1 与之前的列都已被填满  
第 i 列分为以下四种情况：
- `dp[i][0]` 第 i 列都没有方块填充，此时 i-1 列之前的瓷砖全被填充即 `dp[i][0] = dp[i-1][3]`
- `dp[i][1]` 第 i 列上方瓷砖被填充，此时 i-1 列被贴的瓷砖有两种情况即 i-1 原本为空和 i-1 原本下一个方块被贴。即 `dp[i][1] = dp[i - 1][0] + dp[i - 1][2]`
- `d[i][2]` 第 i 列下方瓷砖被填充，此时 i-1 列被贴的瓷砖有两种情况，i-1 原本为空和 i-1 原本上一个方块被贴。即 `dp[i][2] = dp[i - 1][0] + dp[i - 1][1]`
- `dp[i][3]` 第 i 列都被填充，有四种情况。`dp[i][3] = dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2] + dp[i - 1][3]`

初始时，dp[1][0] = dp[1][3] = 1  
对应「第一列不放置任何骨牌」和「第一列竖着放一块 1×2 骨牌」合法方案  

![img](https://assets.leetcode-cn.com/solution-static/790/1.png)

:::code-tabs
@tab Java
```java
class Solution {
    static final int MOD = 1000000007;

    public int numTilings(int n) {
        int[][] dp = new int[n + 1][4];
        dp[0][3] = 1;
        for (int i = 1; i <= n; i++) {
            dp[i][0] = dp[i - 1][3];
            dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % MOD;
            dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % MOD;
            dp[i][3] = (((dp[i - 1][0] + dp[i - 1][1]) % MOD + dp[i - 1][2]) % MOD + dp[i - 1][3]) % MOD;
        }
        return dp[n][3];
    }
}
```
:::