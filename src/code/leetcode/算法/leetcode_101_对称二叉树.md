---
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 广度优先
  - 二叉树
data: 2024-03-06
---

# 101. 对称二叉树

<Badge text="简单" type="tip" vertical="middle" />

解法一：  
使用队列的方式进行层序遍历，判断同一层的值是否对称

```java
public boolean isSymmetric(TreeNode root) {
		if (root == null || (root.left == null && root.right == null))
			return true;
		ArrayList<TreeNode> list = new ArrayList<>();
		list.add(root);
		return isFlag(list);
	}

	public boolean isFlag(ArrayList<TreeNode> list) {
		if (list.size() == 0)
			return true;
		ArrayList<TreeNode> arr = new ArrayList<TreeNode>();
		int left = 0, right = list.size() - 1;
		while (left <= right) {
			TreeNode l = list.get(left);
			TreeNode r = list.get(right);
			if (l == null && r == null) {

			} else if (l == null || r == null) {
				return false;
			} else if (l.val != r.val) {
				return false;
			}
			left++;
			right--;
		}
		for (int i = 0; i < list.size(); i++) {
			TreeNode node = list.get(i);
			if (node == null)
				continue;
			else {
				arr.add(node.left);
				arr.add(node.right);
			}
		}
		return isFlag(arr);
	}
```

解法二：递归，通过两个对称节点的左孩子与右孩子，右孩子与左孩子的值是否相同

```java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        return check(root, root);
    }

    public boolean check(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p == null || q == null) {
            return false;
        }
        return p.val == q.val && check(p.left, q.right) && check(p.right, q.left);
    }
}
```