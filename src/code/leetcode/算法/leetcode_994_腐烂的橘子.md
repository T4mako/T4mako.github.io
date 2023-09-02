---
article: false
date: 2023-08-27
category: 
  - 算法
tag: 
  - 数组
  - 广度优先
  - 矩阵
---

# 994. 腐烂的橘子

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/rotting-oranges/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：  
使用 bfs 广度优先遍历  
- 建立队列 将为 2 的坐标加入到 queue 中
- 若全为 2 ，返回 0
- bfs 时，将节点取出，将附近为 1 的格子赋值为 2 ，并加入到新队列中
- 递归调用 bfs
- 最后判断是否还有为 1 的格子，有返回 -1
- 若没有返回 res-1

:::code-tabs
@tab Java
```java
class Solution {
    int res = 0;
    public int orangesRotting(int[][] grid) {
        int sum = 0;
        Queue<int[]> queue = new LinkedList<>(); // 存放每分钟的新烂橘子
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if(grid[i][j] == 2){
                    queue.add(new int[]{i,j});
                    sum++;
                }else if(grid[i][j] == 1){
                    sum++;
                }
            }
        }
        if(sum == queue.size()) return 0;
        bfs(grid,queue);
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if(grid[i][j] == 1) return -1;
            }
        }
        return --res;
    }
    public void bfs(int[][] grid,Queue<int[]> queue){
        Queue<int[]> next = new LinkedList<>();
        while (queue.size() != 0){
            int[] t = queue.poll();
            int row = t[0];
            int col = t[1];
            // 上下左右为1的格子赋值为2，并加入到队列中
            // 上
            if(row - 1 >= 0 && grid[row - 1][col] == 1) {grid[row - 1][col] = 2;next.add(new int[]{row - 1,col});}
            // 下
            if(row + 1 < grid.length && grid[row + 1][col] == 1) {grid[row + 1][col] = 2;next.add(new int[]{row + 1,col});}
            // 左
            if(col - 1 >= 0 && grid[row][col - 1] == 1) {grid[row][col - 1] = 2;next.add(new int[]{row,col - 1});}
            // 右
            if(col + 1 < grid[0].length && grid[row][col + 1] == 1) {grid[row][col + 1] = 2;next.add(new int[]{row,col + 1});}
        }
        res++;
        if(next.size() != 0) bfs(grid,next);
    }
}
```
:::