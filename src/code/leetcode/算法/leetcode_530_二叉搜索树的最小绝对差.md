---
date: 2023-08-24
category: 
  - 算法
tag: 
  - 图
  - 深度优先
  - 广度优先
  - 并查集
---

# 530. 二叉搜索树的最小绝对差


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/minimum-absolute-difference-in-bst/)
 
解法：中序遍历


```java
class Solution {
    int res = Integer.MAX_VALUE;
	TreeNode last = null;

	public int getMinimumDifference(TreeNode root) {
		if (root.left != null) {
			getMinimumDifference(root.left);
		}
		res = last == null ? res : Math.min(res, Math.abs(last.val - root.val));
		last = root;
		if (root.right != null) {
			getMinimumDifference(root.right);
		}
		return res;
	}
}
```





