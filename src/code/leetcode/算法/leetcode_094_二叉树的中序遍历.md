---
category: 
  - 算法
tag: 
  - 栈
  - 树
  - 二叉树
  - 深度优先
---

# 094_二叉树的中序遍历

<Badge text="简单" type="tip" vertical="middle" />


:::code-tabs
@tab Java
```java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
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
        res.add(root.val);
        if(root.right != null){
            inorder(root.right,res);
        }
    }
}
```

@tab Python
```py
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        def getRes(node):                   
            if not node: return
            if node.left: getRes(node.left)           
            res.append(node.val)            
            if node.right: getRes(node.right)
        getRes(root)                       
        return res
```
建立一个递归函数inorder，传入节点root，判断节点是否有左子树，如果有，递归调用函数，如果没有左子树，将节点添加到res，判断是否有右子树，如果有再调用递归函数