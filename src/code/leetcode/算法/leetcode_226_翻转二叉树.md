---
date: 2023-08-31
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 广度优先
  - 二叉树
---

# 226. 翻转二叉树

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/invert-binary-tree/)

解题思路：使用递归交换左右子树 

:::code-tabs
@tab Java
```java
class Solution {
    public TreeNode invertTree(TreeNode root) {
        if(root == null) return root;
        TreeNode temp = new TreeNode();
        if(root.left != null && root.right != null) {
        	temp = root.left;
        	root.left = root.right;
        	root.right = temp;
        	invertTree(root.left);
        	invertTree(root.right);
        }else if(root.left == null) {
        	root.left = root.right;
        	root.right = null;
        	invertTree(root.left);
        }else if(root.right == null) {
        	root.right = root.left;
        	root.left = null;
        	invertTree(root.right);
        }
        return root;
    }
}
```
:::