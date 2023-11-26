---
 
date: 2023-08-18
category: 
  - 算法
tag: 
  - 数学
  - 动态规划
  - 组合数学
---

# 62. 不同路径


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/unique-paths/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：  
dp，画表，找出递推关系式
if `j == 0 && i == 0` -> `a[i][j] = 0`  
else if `j == 0 || i == 0` -> `a[i][j] = 1`  
else `a[i][j] = a[i-1][j] + a[i][j-1]`


:::code-tabs
@tab Java
```java
class Solution {
    public int uniquePaths(int m, int n) {
        if(m == 1 && n == 1) return 1;
        int[][] a = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if(j == 0 && i == 0) a[i][j] = 0;
                else if(j == 0 || i == 0) a[i][j] = 1;
                else  a[i][j] = a[i-1][j] + a[i][j-1];
            }
        }
        return a[m-1][n-1];
    }
}
```
@tab Ts
```Ts
function uniquePaths(m: number, n: number): number {
    if(m == 1 && n == 1) return 1;
    let a: number[][] = new Array(m);
    for (let i: number = 0; i < m; i++) {
        a[i] = new Array(n);
    }
    for (let i:number = 0; i < m; i++) {
        for (let j:number = 0; j < n; j++) {
            if(j === 0 && i === 0) a[i][j] = 0;
            else if(j === 0 || i === 0) a[i][j] = 1;
            else  a[i][j] = a[i-1][j] + a[i][j-1];
        }
    }
    return a[m-1][n-1];
};
```
:::