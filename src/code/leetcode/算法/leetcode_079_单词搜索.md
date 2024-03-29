---
date: 2024-03-25
category: 
  - 算法
tag: 
  - 数据组
  - 字符串
  - 回溯
  - 矩阵
---

# 79. 单词搜索


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/word-search/description/)

解法：回溯


```java
class Solution {
    public boolean exist(char[][] board, String word) {
    for (int row = 0; row < board.length; row++) {
        for (int col = 0; col < board[0].length; col++) {
            if (dfs(row, col, 0, board, word, new boolean[board.length][board[0].length], new StringBuilder())) {
                return true;
            }
        }
    }
    return false;
}

public boolean dfs(int row, int col, int i, char[][] board, String word, boolean[][] flag, StringBuilder check) {
    if (i >= word.length()) {
        return false;
    }
    
    if (row < 0 || col < 0 || row >= board.length || col >= board[0].length || flag[row][col] || word.charAt(i) != board[row][col]) {
        return false;
    }

    check.append(board[row][col]);
    if (i + 1 == word.length() && word.equals(check.toString())) {
        return true;
    }
    
    flag[row][col] = true;
    if (dfs(row - 1, col, i + 1, board, word, flag, check) ||
        dfs(row + 1, col, i + 1, board, word, flag, check) ||
        dfs(row, col - 1, i + 1, board, word, flag, check) ||
        dfs(row, col + 1, i + 1, board, word, flag, check)) {
        return true;
    }
    
    flag[row][col] = false;
    check.deleteCharAt(check.length() - 1);
    return false;
}


}
```