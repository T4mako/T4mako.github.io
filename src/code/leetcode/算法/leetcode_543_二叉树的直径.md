---
date: 2026-08-07
category: 
  - 算法
tag: 
  - 图
  - 深度优先
  - 广度优先
  - 并查集
---

# 543. 二叉树的直径


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/diameter-of-binary-tree/description/)
 

```py
class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        self.res = 0
        def depth(root):
            if not root: return 0
            L = depth(root.left)
            R = depth(root.right)
            self.res = max(self.res, L + R)
            return max(L, R) + 1
        depth(root)
        return self.res
```

路径最大为左子树最深深度加右子树最深深度，使用 dp + 递归，递归函数的返回值是树的最大深度，外部 `res = max(self.res, L + R)`