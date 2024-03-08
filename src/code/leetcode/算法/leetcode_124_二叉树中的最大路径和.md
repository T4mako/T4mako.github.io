---
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 动态规划
  - 二叉树
date: 2024-02-28
---

# 124. 二叉树中的最大路径和

<Badge text="困难" type="danger" vertical="middle" />

[题目描述](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)


解法：
- 对于一个节点，过该点的最大值为 该点的值加左右子树的最大值
  `maxRight + maxLeft + node.val`  
  对于叶子节点，左右子树的最大值都为 0
- 对于一个节点，该节点为父节点提供的最大值为 该节点的值加 0 或左右节点其中的最大值
  `node.val + (Math.max(maxRight, maxLeft) < 0 ? 0 : Math.max(maxRight, maxLeft));`

```java
class Solution {
    int res = Integer.MIN_VALUE;
	
	public int maxPathSum(TreeNode root) {
		dfs(root);
        return res;
    }
	
	public int dfs(TreeNode node) {
		if(node == null) {
			return 0;
		}
		int maxLeft = dfs(node.left);
		int maxRight = dfs(node.right);
		
		// 更新 res
		res = Math.max(res, maxRight + maxLeft + node.val);
		// 该节点最大值
		int maxNodeVal = node.val + (Math.max(maxRight, maxLeft) < 0 ? 0 : Math.max(maxRight, maxLeft));
		return maxNodeVal <= 0 ? 0 : maxNodeVal;
	}
}
```