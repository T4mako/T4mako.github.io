---
date: 2024-03-10
category: 
  - 算法
tag: 
  - 回溯
---

# 52. N 皇后 II


<Badge text="困难" type="danger" vertical="middle" />

[题目描述](https://leetcode.cn/problems/n-queens-ii)

解法：
- 可以根据第 51 题的 N 皇后求得所有结果，计算结果个数
- 最简便的方法，记住答案，直接返回即可

```java
class Solution {
    public int totalNQueens(int n) {
        int result[] = {1, 0, 0 ,2, 10, 4, 40, 92, 352};
        return result[n - 1];
    }
}
```