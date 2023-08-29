---
article: false
date: 2023-08-24
category: 
  - 算法
tag: 
  - 图
  - 深度优先
  - 广度优先
  - 并查集
---

# 547. 省份数量


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/number-of-provinces/description/?envType=study-plan-v2&envId=leetcode-75)
 

## 深度优先遍历：
- 设置一个 bool 数组判断该点是否被访问过
- 定义 res = 0
- 通过 for 循环判断 bool 数组中的值是否为 0，若为 0 ，调用 res++ , 调用 dfs 函数
- dfs 函数：将传入的下标对应的 bool 数组的值修改为 1 ，取出 isConnected 对应的数组的值，判断该值是否被访问过，递归调用 dfs

:::code-tabs
@tab Java
```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int res = 0;
        boolean[] visited = new boolean[isConnected.length];
        for (int i = 0; i < visited.length; i++) {
            if(!visited[i]) {dfs(isConnected,visited,i);res++;}
        }
        return res;

    }

    public void dfs(int[][] isConnected, boolean[] visited,int i){
        visited[i] = true;
        for (int j = 0; j < isConnected.length; j++) {
            if(isConnected[i][j] == 1 && !visited[j]) dfs(isConnected,visited,j);
        }
    }
}
```
:::

## 广度优先遍历
- 设置一个 bool 数组判断该点是否被访问过
- 定义 res = 0
- 设置一个队列用于存放 bfs 需要的节点
- 遍历 bool 数组，如果值为 false，将该点加入到队列中
- 不断从队列中取值，对每个值的的下一个节点加入到队列中，直到队列为空
- 队列为空，`res++`

:::code-tabs
@tab Java
```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int res = 0;
        Queue<Integer> queue = new LinkedList<>();
        boolean[] isVisited = new boolean[isConnected.length];
        for (int i = 0; i < isConnected.length; i++) {
            if(!isVisited[i]){
                queue.add(i);
                while (!queue.isEmpty()){
                    int k = queue.poll();
                    for (int j = 0; j < isConnected.length; j++) {
                        if(isConnected[k][j] == 1 && !isVisited[j]){
                            queue.add(j);
                            isVisited[j] = true;
                        }
                    }
                }
                res++;
            }
        }
        return res;
    }
}
```
:::

## 并查集

并查集（Disjoint-set data structure，直译为不交集数据结构）是一种数据结构，用于处理一些不交集（Disjoint sets，一系列没有重复元素的集合）的合并及查询问题。  
并查集支持的操作：查询、合并、添加

- 如果两个城市之间有相连关系，则它们属于同一个连通分量，对它们进行合并。
- 遍历矩阵 isConnected\textit{isConnected}isConnected 的全部元素之后，计算连通分量的总数，即为省份的总数。


:::code-tabs
@tab Java
```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int cities = isConnected.length;
        int[] parent = new int[cities];
        for (int i = 0; i < cities; i++) {
            parent[i] = i;
        }
        for (int i = 0; i < cities; i++) {
            for (int j = i + 1; j < cities; j++) {
                if (isConnected[i][j] == 1) {
                    union(parent, i, j);
                }
            }
        }
        int provinces = 0;
        for (int i = 0; i < cities; i++) {
            if (parent[i] == i) {
                provinces++;
            }
        }
        return provinces;
    }

    public void union(int[] parent, int index1, int index2) {
        parent[find(parent, index1)] = find(parent, index2);
    }

    public int find(int[] parent, int index) {
        if (parent[index] != index) {
            parent[index] = find(parent, parent[index]);
        }
        return parent[index];
    }
}
```
:::







