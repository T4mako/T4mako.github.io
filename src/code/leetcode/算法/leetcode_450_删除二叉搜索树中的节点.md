---
article: true
date: 2023-08-22
category: 
  - 算法
tag: 
  - 树
  - 二叉搜索树
  - 二叉树
---

# 700. 二叉搜索树中的搜索

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/delete-node-in-a-bst/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：  
二叉搜索树：
- 左子树的所有节点（如果有）的值均小于当前节点的值；
- 右子树的所有节点（如果有）的值均大于当前节点的值；
- 左子树和右子树均为二叉搜索树。

使用 **递归** 解决该问题：
- `root` 为空，返回空
- `root.val` >(<) `key`，`key` 的节点在左(右)子树中，递归调用 `deleteNode` 并返回 `root`
- `root.val` = `key`
  - `root` 为叶子节点，没有子树。此时可以直接将它删除，即返回空
  - `root` 只有左子树，返回它的左子节点。
  - `root` 只有右子树，返回它的右子节点。
  - `root` 有左右子树，将 `root` 的后继节点（比 `root` 大的最小节点，即它的右子树中的最小节点，记为 `successor` 作为新的根节点替代 `root`，并将 successor 从 `root` 的右子树中删除，使得在保持有序性的情况下合并左右子树。

:::code-tabs
@tab Java
```java
class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) {
            return null;
        }
        // 递归
        if (root.val > key) {
            root.left = deleteNode(root.left, key);
            return root;
        }
        // 递归
        if (root.val < key) {
            root.right = deleteNode(root.right, key);
            return root;
        }
        if (root.val == key) {
            // 叶子节点
            if (root.left == null && root.right == null) {
                return null;
            }
            // 只有左子树
            if (root.right == null) {
                return root.left;
            }
            // 只有右子树
            if (root.left == null) {
                return root.right;
            }
            
            TreeNode successor = root.right;
            // 右子树的最小节点
            while (successor.left != null) {
                successor = successor.left;
            }
            root.right = deleteNode(root.right, successor.val);
            successor.right = root.right;
            successor.left = root.left;
            return successor;
        }
        return root;
    }
}
```
:::