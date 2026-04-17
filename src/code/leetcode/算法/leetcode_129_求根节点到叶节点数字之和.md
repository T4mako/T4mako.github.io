---
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 二叉树
date: 2024-02-28
---

# 129. 求根节点到叶节点数字之和

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/sum-root-to-leaf-numbers/)


解法：dfs

```java
class Solution {
    int res = 0;

	public int sumNumbers(TreeNode root) {
		dfs(root, 0);
		return res;
	}

	public void dfs(TreeNode node, int sum) {
		sum = sum * 10 + node.val;
		if (node.left == null && node.right == null) {
			res += sum;
		} else if (node.left == null) {
			dfs(node.right, sum);
		} else if (node.right == null) {
			dfs(node.left, sum);
		} else {
			dfs(node.right, sum);
			dfs(node.left, sum);
		}
	} 
}
```