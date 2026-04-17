---
 
date: 2023-08-22
category: 
  - 算法
tag: 
  - 树
  - 二叉搜索树
  - 二叉树
---

# 700. 二叉搜索树中的搜索

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/search-in-a-binary-search-tree/?envType=study-plan-v2&envId=leetcode-75)



:::code-tabs
@tab Java
```java
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        if(root == null) return null;
        if(root.val == val) return root;
        else if (root.val > val) {
            return searchBST(root.left,val);
        }else {
            return searchBST(root.right,val);
        }
    }
}
```
@tab Ts
```ts
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    if(root == null) return null;
    if(root.val == val) return root;
    else if (root.val > val) {
        return searchBST(root.left,val);
    }else {
        return searchBST(root.right,val);
    }
};
```
:::