---
category: 
  - 算法
tag: 
  - 树
  - 栈
  - 深度优先
  - 链表
  - 二叉树
date: 2024-03-07
---

# 114. 二叉树展开为链表

<Badge text="中等" type="warning" vertical="middle" />

解法：
先序遍历树，将结果存入数组中，再通过根节点构造树

```java
class Solution {
    ArrayList<TreeNode> list = new ArrayList<>();

	public void flatten(TreeNode root) {
		if (root == null)
			return;
		TreeNode node = root;
		order(root);
		for (int i = 0; i < list.size(); i++) {
			node.left = null;
			node.right = list.get(i);
			node = node.right;
		}
	}

	public void order(TreeNode node) {
		if (node.left != null) {
			list.add(node.left);
			order(node.left);
		}
		if (node.right != null) {
			list.add(node.right);
			order(node.right);
		}
	}
}
```

