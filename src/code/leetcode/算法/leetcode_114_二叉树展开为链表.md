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

## 解法一

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

## 解法二

找出左子树最右边的节点，把右子树接过来

```py
class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        while root is not None:
            # 左子树为空，直接处理下一个节点（右子树）
            if root.left is None:
                root = root.right
            else:
                # 找到左子树中最右边的节点
                pre = root.left
                while pre.right is not None:
                    pre = pre.right
                
                # 将原来的右子树接到该节点的右侧
                pre.right = root.right
                
                # 将左子树移到右子树位置，左子树置空
                root.right = root.left
                root.left = None
                
                # 继续处理下一个节点（即新的右子树根）
                root = root.right
```
