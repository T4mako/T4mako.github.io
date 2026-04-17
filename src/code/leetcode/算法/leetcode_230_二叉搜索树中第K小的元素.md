---
date: 2023-08-03
category: 
  - 算法
tag: 
  - 数组
  - 前缀和
---

# 230. 二叉搜索树中第K小的元素

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)


解法：中序遍历

```java
class Solution {
    int num = 0;
	int res;
	public int kthSmallest(TreeNode root, int k) {
		if(root.left != null) {
			kthSmallest(root.left, k);
		}
		num++;
		if(num == k) res = root.val;
		if(root.right != null) {
			kthSmallest(root.right, k);
		}
		return res;
    }
}
```