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

# 117. 填充每个节点的下一个右侧节点指针 II

<Badge text="中等" type="warning" vertical="middle" />

解法：
层序遍历

```java
class Solution {
    public Node connect(Node root) {
        if(root == null) return null;
		List<Node> list = new ArrayList<Node>();
		list.add(root);
		setNext(list);
		return root;
	}
	
	public void setNext(List<Node> list) {
		if(list.size() == 0) return;
		List<Node> arr = new ArrayList<>();
		for(int i = 0;i < list.size();i++) {
			Node node = list.get(i);
			if(i + 1 < list.size()) {
				node.next = list.get(i + 1);
			}
			if(node.left != null) {
				arr.add(node.left);
			}
			if(node.right != null) {
				arr.add(node.right);
			}
		}
		setNext(arr);
	}
}
```

