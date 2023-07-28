---
category: 
  - 算法
tag: 
  - 树
  - 广度优先
  - 深度优先
  - 二叉树
---

# 104_二叉树的最大深度
<Badge text="简单" type="tip" vertical="middle" />



```java
class Solution {
    public int maxDepth(TreeNode root) {
        if(root != null){
            return 1 + Math.max(maxDepth(root.left),maxDepth(root.right));
        }
        return 0;
    }
}
```

返回1加上左右子树的最大深度，递归运算得出结果