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

:::code-tabs
@tab Java
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
@tab Python
```py
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        def dfs(board,cur_i,cur_j,word,visted):
            if not word: return True
            if cur_i < 0 or cur_i >= len(board) or cur_j < 0 or cur_j >= len(board[0]): return False
            if(word[0] == board[cur_i][cur_j] and not visited[cur_i][cur_j]):
                visited[cur_i][cur_j] = True
                res = (dfs(board, cur_i - 1, cur_j, word[1:], visited) or 
                         dfs(board, cur_i + 1, cur_j, word[1:], visited) or 
                         dfs(board, cur_i, cur_j - 1, word[1:], visited) or 
                         dfs(board, cur_i, cur_j + 1, word[1:], visited))
                visited[cur_i][cur_j] = False
                return res
            else: return False

        visited = [[False] * len(board[0]) for _ in range(len(board))]
        for i in range(len(board)):
            for j in range(len(board[0])):
                if dfs(board,i,j,word,visited): return True
        return False
```
:::