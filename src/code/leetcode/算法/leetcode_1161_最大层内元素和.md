---
article: false
date: 2023-08-21
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 广度优先
  - 二叉树
---

# 1161. 最大层内元素和

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路:  
使用广度优先搜索 bfs ，记录每行的最大值与行号

:::code-tabs
@tab Java
```java
class Solution {
    int level = 0;
    int res = -1;
    int max = -65535;
    public int maxLevelSum(TreeNode root) {
        List<TreeNode> list = new ArrayList<>();
        list.add(root);
        while ((list = bfs(list)).size() != 0);
        return res;
    }

    public List<TreeNode> bfs(List<TreeNode> nodes){
        level++;
        int sum = 0;
        List<TreeNode> list = new ArrayList<TreeNode>();
        for (int i = 0; i < nodes.size(); i++) {
            TreeNode node = nodes.get(i);
            sum += node.val;
            if(node.left != null) list.add(node.left);
            if(node.right != null) list.add(node.right);
        }
        if(sum > max)  {res = level;max = sum;}
        return list;
    }
}
```
:::