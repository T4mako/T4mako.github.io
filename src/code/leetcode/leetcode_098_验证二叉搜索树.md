---
category: 
  - 算法
tag: 
  - 树
  - 二叉搜索树
  - 深度优先
  - 二叉树
---

# 098_验证二叉搜索树
<Badge text="中等" type="warning" vertical="middle" />



```java
class Solution {
    public boolean isValidBST(TreeNode root) {
        return inSpread(root,(long)Integer.MIN_VALUE - 1,(long)Integer.MAX_VALUE + 1);
    }
    boolean inSpread(TreeNode node,long left,long right){
        if(node.val <= left || node.val >= right){
            return false;
        }
        if(node.left != null){
            if(!inSpread(node.left, left, node.val)) return false;
        }
        if(node.right != null){
            if(!inSpread(node.right, node.val, right)) return false;
        }
        return true;
    }
}
```

递归判断左右节点是否满足条件，传入参数为左右区间的值，小于等于left或大于等于right都是false