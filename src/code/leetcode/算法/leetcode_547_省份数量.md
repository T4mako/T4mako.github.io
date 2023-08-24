---
article: true
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

解题思路：  

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

## 并查集