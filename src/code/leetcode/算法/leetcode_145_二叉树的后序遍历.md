---
article: false
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 栈
  - 二叉树
---

# 145_二叉树的后序遍历
<Badge text="简单" type="tip" vertical="middle" />



```java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        ArrayList<Integer> res = new ArrayList<>();
        if(root == null){
            return res;
        }
        inorder(root,res);
        return res;
    }
    public void inorder(TreeNode root,ArrayList<Integer> res){
        if(root.left != null) {
            inorder(root.left, res);
        }
        if(root.right != null){
            inorder(root.right,res);
        }
        res.add(root.val);
    }
}
```