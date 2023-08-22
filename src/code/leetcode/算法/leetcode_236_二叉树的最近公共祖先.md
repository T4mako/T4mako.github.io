---
article: false
date: 2023-08-19
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 二叉树
  - 递归
---

# 236. 二叉树的最近公共祖先


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路:  递归


题目的一个条件：所有 `Node.val` 互不相同，因此判断该点是否为 p或q 可以使用 `val` 属性判断

一个节点为公共祖先的要求：  
- 子问题：该节点的左右子树分别包含 p，q 或 该点为p(或q)，其中的一个子树包含q(或p)

在递归时，函数的返回值为： 左子树包含p或q 或 该点为p 或 该点为 q


:::code-tabs
@tab Java
```java
class Solution {
    private TreeNode ans = null;

    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        this.dfs(root, p, q);
        return this.ans;
    }

    private boolean dfs(TreeNode root, TreeNode p, TreeNode q) {
        // 递归出口
        if (root == null) return false;
        // 递归
        boolean lson = dfs(root.left, p, q);
        boolean rson = dfs(root.right, p, q);
        // 判断是否为最近公共祖先
        if ((lson && rson) || ((root.val == p.val || root.val == q.val) && (lson || rson))) {
            ans = root;
        } 
        // 递归返回值
        return lson || rson || (root.val == p.val || root.val == q.val);
    }

    
}
```
:::