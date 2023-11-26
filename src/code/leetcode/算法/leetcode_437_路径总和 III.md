---
 
date: 2023-08-17
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 二叉树
---

# 437. 路径总和 III


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/path-sum-iii/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：
对每个根节点深度遍历

```java
class Solution {
    long res = 0;
    public int pathSum(TreeNode root, long targetSum) {
        if (root == null) return 0;
        path(root,targetSum);
        return (int) res;
    }

    public void path(TreeNode root, long targetSum){
        dfs(root,targetSum,0);
        if(root.left != null) path(root.left,targetSum);
        if (root.right != null) path(root.right,targetSum);
    }

    public void dfs(TreeNode node,long targetSum,long sum){
        sum += node.val;
        if(sum == targetSum) res++;
        if(node.left != null) dfs(node.left,targetSum,sum);
        if(node.right != null) dfs(node.right,targetSum,sum);
    }

}
```