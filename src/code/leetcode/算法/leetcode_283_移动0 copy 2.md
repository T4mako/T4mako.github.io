---
category: 
  - 算法
tag: 
  - 数组
  - 矩阵
date: 2024-03-18
---




# 289. 生命游戏

<Badge text="中等" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/game-of-life/description/)


解法思路：对每一个位置计算其周围的 0 和 1 的值

```java
class Solution {
    public void gameOfLife(int[][] board) {
		int rows = board.length;
		int cols = board[0].length;
		int[][] copy = new int[rows][cols];
		for (int i = 0; i < board.length; i++) {
            System.arraycopy(board[i], 0, copy[i], 0, board[i].length);
        }
		
		for (int row = 0; row < rows; row++) {
			for (int col = 0; col < cols; col++) {
				modify(row, col, copy, board);
			}
		}
	}

	public void modify(int row, int col, int[][] board, int[][] res) {
		int val = board[row][col];
		int count1 = 0, count0 = 0;
		// 左上
		int temp = row - 1 < 0 || col - 1 < 0 || board[row - 1][col - 1] == 0 ? count0++ : count1++;
		// 上
		temp = row - 1 < 0 || board[row - 1][col] == 0 ? count0++ : count1++;
		// 右上
		temp = row - 1 < 0 || col + 1 >= board[0].length || board[row - 1][col + 1] == 0 ? count0++ : count1++;
		// 左
		temp = col - 1 < 0 || board[row][col - 1] == 0 ? count0++ : count1++;
		// 右
		temp = col + 1 >= board[0].length || board[row][col + 1] == 0 ? count0++ : count1++;
		// 左下
		temp = col - 1 < 0 || row + 1 >= board.length || board[row + 1][col - 1] == 0 ? count0++ : count1++;
		// 下
        temp = row + 1 >= board.length || board[row + 1][col] == 0 ? count0++ : count1++;
        // 右下
		temp = col + 1 >= board[0].length || row + 1 >= board.length || board[row + 1][col + 1] == 0 ? count0++ : count1++;
		if (val == 0) {
			res[row][col] = count1 == 3 ? 1 : 0;
		} else {
			res[row][col] = count1 < 2 || count1 > 3 ? 0 : 1;
		}

	}
}
```