---
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 二叉树
  - 广度优先
date: 2024-03-08
---

# 112. 路径总和

<Badge text="简单" type="tip" vertical="middle" />

解法思路：dfs

```java
class Solution {
    boolean res = false;

	public boolean hasPathSum(TreeNode root, int targetSum) {
		if (root == null)
			return false;
		int sum = 0;
		dfs(root, sum, targetSum);
		return res;
	}

	public void dfs(TreeNode node, int sum, int target) {
		sum += node.val;
		if (node.left == null && node.right == null) {
			if (sum == target)
				res = true;
		} else if (node.left == null) {
			dfs(node.right, sum, target);
		} else if (node.right == null) {
			dfs(node.left, sum, target);
		} else {
			dfs(node.left, sum, target);
			dfs(node.right, sum, target);
		}
	}
}
```