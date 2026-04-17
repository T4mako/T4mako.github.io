---
date: 2024-03-09
category: 
  - 算法
tag: 
  - 树
  - 二分查找
  - 二叉树
---

# 222. 完全二叉树的节点个数

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/count-complete-tree-nodes/)

解题思路：先序遍历

:::code-tabs
@tab Java
```java
class Solution {
    int res = 0;
	public int countNodes(TreeNode root) {
		if(root == null) return res;
		dfs(root);
		return res;
    }
	
	public void dfs(TreeNode node) {
		if(node == null) return;
		else {
			res++;
			dfs(node.left);
			dfs(node.right);
		}
		
	}
}
```
:::