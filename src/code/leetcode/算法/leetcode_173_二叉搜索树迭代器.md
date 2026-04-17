---
date: 2024-03-09
category: 
  - 算法
tag: 
  - 栈
  - 树
  - 二叉树
---

# 173. 二叉搜索树迭代器


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/binary-search-tree-iterator/)

解法：将中序遍历的过程拆分

```java
class BSTIterator {
  // 建立双端队列
    Deque<TreeNode> d = new ArrayDeque<>();
    public BSTIterator(TreeNode root) {
        // 将左节点加入队列中
        dfsLeft(root);
    }
    
    public int next() {
        // 出队
        TreeNode root = d.pollLast();
        int ans = root.val;
        root = root.right;
        dfsLeft(root);
        return ans;
    }

    void dfsLeft(TreeNode root) {
        while (root != null) {
            d.addLast(root);
            root = root.left;
        }
    }
    
    public boolean hasNext() {
        return !d.isEmpty();
    }
}
```