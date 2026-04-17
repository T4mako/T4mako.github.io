---
category: 
  - 算法
tag: 
  - 树
  - 数组
  - 哈希表
  - 分治
  - 二叉树
date: 2024-03-07
---

# 106. 从中序与后序遍历序列构造二叉树

<Badge text="中等" type="warning" vertical="middle" />

解法：
将后序遍历的节点与索引存入 map 中，方便之后的查找  
递归构建树，查找根节点与左右子树  

```java
class Solution {

    HashMap<Integer,Integer> memo = new HashMap<>();
    int[] post;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        // 将后序遍历的值与索引添加到 map 中
        for(int i = 0;i < inorder.length; i++) memo.put(inorder[i], i);
        post = postorder;
        TreeNode root = buildTree(0, inorder.length - 1, 0, post.length - 1);
        return root;
    }

    public TreeNode buildTree(int is, int ie, int ps, int pe) {
        if(ie < is || pe < ps) return null;

        // 后序遍历末节点为根节点
        int root = post[pe];
        int rootIndex = memo.get(root);
        // 构造节点
        TreeNode node = new TreeNode(root);
        node.left = buildTree(is, rootIndex - 1, ps, ps + rootIndex - is - 1);
        node.right = buildTree(rootIndex + 1, ie, ps + rootIndex - is, pe - 1);
        return node;
    }
}
```

