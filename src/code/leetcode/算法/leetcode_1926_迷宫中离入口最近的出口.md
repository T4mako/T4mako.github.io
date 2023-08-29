---
article: false
date: 2023-08-26
category: 
  - 算法
tag: 
  - 数组
  - 广度优先
  - 矩阵
---

# 1926. 迷宫中离入口最近的出口

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/nearest-exit-from-entrance-in-maze/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：  
使用 bfs 广度优先遍历
- 定义一个数组，存放上下左右的操作
- 广度优先的核心之一就是队列，队列中存放 bfs 中遍历到的节点
- 开始时，将初始点加入到队列中，并将初始点设置为墙
- 从队列中弹出节点，如果节点满足出口条件，返回 res
- 若不满足，执行上下左右的操作，将没有越界和为空的节点放入队列，res++，将前一步空地设置为墙
- 若队列为空，返回 -1

:::code-tabs
@tab Java
```java
class Solution {
    public int nearestExit(char[][] maze, int[] entrance) {
        int[][] dirs = new int[][]{{-1, 0}, {1, 0}, {0, 1}, {0, -1}}; // 左右上下
        int rows = maze.length; // 总行数
        int cols = maze[0].length; // 总列数
        Deque<int[]> queue = new ArrayDeque<>();  // 构造双端队列
        queue.add(entrance); // 原点入队
        maze[entrance[0]][entrance[1]] = '+'; // 设置初始地地为墙
        int res = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            while (size-- > 0) {
                int[] poll = queue.poll(); // 出队
                // 到出口的情况
                if (res != 0 && (poll[0] == 0 || poll[1] == 0
                        || poll[0] == rows - 1 || poll[1] == cols - 1)) {
                    return res;
                }

                for (int[] dir : dirs) { // 取出上下左右
                    int x = poll[0] + dir[0];
                    int y = poll[1] + dir[1];
                    if (x < 0 || x >= rows || y < 0 || y >= cols) continue;
                    if (maze[x][y] == '+') continue;
                    queue.add(new int[]{x, y}); // 为空，加入队列
                    maze[x][y] = '+'; // 设置空地为墙
                }
            }
            res++;
        }
        return -1;
    }
}
```
:::