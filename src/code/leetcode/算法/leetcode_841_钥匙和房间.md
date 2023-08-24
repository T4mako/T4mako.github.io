---
article: true
date: 2023-08-23
category: 
  - 算法
tag: 
  - 图
  - 深度优先
  - 广度优先
---

# 841. 钥匙和房间

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/keys-and-rooms/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：  

dfs：
- 设置一个 bool 数组，存放 rooms 中每个数是否可访问。
- 定义 `num` 判断可访问的房间个数
- 定义 `dfs()` 函数，传入 rooms 和 第x个索引房间
- 递归调用 `dfs()`

:::code-tabs
@tab Java
```java
class Solution {
    boolean[] vis;
    int num;
    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        num = 0;
        vis = new boolean[n];
        dfs(rooms, 0);
        return num == n;
    }
    // 传入 rooms 和 第x个索引房间
    public void dfs(List<List<Integer>> rooms, int x) {
        vis[x] = true;
        num++;
        for (int it : rooms.get(x)) {
            if (!vis[it]) {
                dfs(rooms, it);
            }
        }
    }
}
```
:::