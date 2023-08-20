---
article: true
date: 2023-08-19
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 广度优先
  - 二叉树
---

# 199. 二叉树的右视图



<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/binary-tree-right-side-view/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路:  
使用广度优先搜索 bfs ，通过层序遍历的方式将每个层的最后一个结点加入到结果数组中。

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