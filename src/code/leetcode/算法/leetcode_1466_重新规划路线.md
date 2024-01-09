---
date: 2024-01-07
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 动态规划
---

# 1466. 重新规划路线

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/?envType=study-plan-v2&envId=leetcode-75)

解法思路：  
- 首先创建领接表（建立一个 `List<List<Integer>>`，外层 List 下标为起始点，内层 List 存储与该点有连接的点），该点为出点，添加正数，为入点，添加负数
- 建立一个 bool 数组，存储该点是否被访问过
- 从结点 0 开始遍历图，获取邻接点，如果邻接点没有被访问过，且需要变更方向（>0），count++
- dfs 递归调用，传入从邻接表中获取的点

```java
class Solution {
  private int count; // 变更方向的路线数

    public int minReorder(int n, int[][] connections) {
        // 构建领接表
        List<List<Integer>> graph = buildGraph(n, connections); 
        // 记录节点的访问状态
        boolean[] visited = new boolean[n]; 
         // 从节点 0 开始深度优先搜索
        dfs(graph, visited, 0);
         // 返回变更方向的路线数
        return count;
    }

    private void dfs(List<List<Integer>> graph, boolean[] visited, int city) {
        // 标记当前节点为已访问
        visited[city] = true; 
        for (int neighbor : graph.get(city)) {
            // 如果邻居节点未被访问
            if (!visited[Math.abs(neighbor)]) { 
                // 需要反向
                if (neighbor > 0) {
                    count++; 
                }
                dfs(graph, visited, Math.abs(neighbor)); 
            }
        }
    }

    private List<List<Integer>> buildGraph(int n, int[][] connections) {
        // 用邻接表表示有向图
        List<List<Integer>> graph = new ArrayList<>(); 
        for (int i = 0; i < n; i++) {
            // 初始化
            graph.add(new ArrayList<>()); 
        }
        for (int[] connection : connections) {
            int from = connection[0];
            int to = connection[1];
            graph.get(from).add(to); 
            graph.get(to).add(-from);
        }
        return graph;
    }
}

```