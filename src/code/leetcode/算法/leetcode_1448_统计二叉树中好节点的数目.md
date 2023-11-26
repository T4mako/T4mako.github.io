---
 
date: 2023-08-17
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 广度优先
  - 二叉树
---

# 1448. 统计二叉树中好节点的数目


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/count-good-nodes-in-binary-tree/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：
dfs

```java
class Solution {
    int res = 0;
    public int goodNodes(TreeNode root) {
        int max = root.val;
        dfs(root, root.val);
        return res;
    }

    public void dfs(TreeNode node,int max){
        if(node.val >= max) {res++;max = node.val;}
        if(node.left != null) dfs(node.left,max);
        if(node.right != null) dfs(node.right,max);
    }
}
```