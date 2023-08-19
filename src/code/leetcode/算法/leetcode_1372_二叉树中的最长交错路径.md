---
article: false
date: 2023-08-18
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 二叉树
---

# 1372. 二叉树中的最长交错路径


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：  
dfs时传入一个参数 falg，判断这次所在结点应该向左还是向右    
对于该结点的另一方向，仍需dfs一次


:::code-tabs
@tab Java
```Java
class Solution {
   int res = 0;
    public int longestZigZag(TreeNode root) {
        if(root.right != null) dfs(root,0,true);
        if(root.left != null) dfs(root,0,false);
        return res;
    }
    // flag:true 向右 false:向左
    public void dfs(TreeNode node,int count,boolean flag){
        if(flag){
           if(node.right != null) {
               res=Math.max(++count,res);
               dfs(node.right,count, false);
           }
           if(node.left != null){
               dfs(node.left,1,true);
           }
        }
        else {
            if(node.left != null){
                res=Math.max(++count,res);
                dfs(node.left,count, true);
            }
            if(node.right != null){
                dfs(node.right,1,false);
            }
        }
    }
}
```
:::