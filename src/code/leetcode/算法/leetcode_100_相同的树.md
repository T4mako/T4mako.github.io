---
category: 
  - 算法
tag: 
  - 链表
data: 2024-03-05
---

# 100. 相同的树

<Badge text="简单" type="tip" vertical="middle" />

解法一：  
使用队列的方式进行层序遍历，判断是否为相同的结点

```java
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
		if (p == null && q == null)
			return true;
		if (p == null && q != null)
			return false;
		if (p != null && q == null)
			return false;
		LinkedList<TreeNode> list1 = new LinkedList<>();
		LinkedList<TreeNode> list2 = new LinkedList<>();
		list1.add(q);
		list2.add(p);
		while (true) {
			int len = list1.size();
			if (list1.size() == 0 && list2.size() == 0)
				return true;
			if (list1.size() != list2.size())
				return false;
			else {
				for (int i = 0; i < len; i++) {
					TreeNode n1 = list1.get(i);
					TreeNode n2 = list2.get(i);
					if (n1 == null && n2 == null) {
					} else if (n1 == null || n2 == null)
						return false;
					else if (n1.val == n2.val) {
						list1.add(n1.left);
						list1.add(n1.right);
						list2.add(n2.left);
						list2.add(n2.right);
					} else {
						return false;
					}
					
				}
			}
			for(int i = 0;i < len;i++) {
				list1.remove(0);
				list2.remove(0);
			}
		}

	}
}
```

解法二：递归

```java
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        } else if (p == null || q == null) {
            return false;
        } else if (p.val != q.val) {
            return false;
        } else {
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
        }
    }
}
```