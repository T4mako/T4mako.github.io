---
 
date: 2023-08-16
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 二叉树
---

# 872. 叶子相似的树



<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/leaf-similar-trees/description/?envType=study-plan-v2&envId=leetcode-75)

使用dfs将叶子结点存入数组中，判断两个数组是否相等

::: code-tabs
@tab Java
```java
class Solution {
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        List<Integer> q1 = new ArrayList<>();
        List<Integer> q2 = new ArrayList<>();
        dfs(q1,root1);
        dfs(q2,root2);
        if(q1.size() != q2.size()) return false;
        for (int i = 0; i < q1.size(); i++) {
            if(q1.get(i) != q2.get(i)) return false;
        }
        return true;

    }

    public void dfs(List<Integer> list,TreeNode node){
        if(node.left != null) dfs(list,node.left);
        if(node.right != null) dfs(list,node.right);
        if(node.left == null && node.right == null) list.add(node.val);
    }
}
```
@tab Ts
```ts
function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
    let q1:number[] = [];
    let q2:number[] = [];
    dfs(q1,root1);
    dfs(q2,root2);
    if(q1.length != q2.length) return false;
    for (let i = 0; i < q1.length; i++) {
        if(q1[i] != q2[i]) return false;
    }
    return true;
};

function dfs(list:number[],node: TreeNode | null){
    if(node.left != null) dfs(list,node.left);
    if(node.right != null) dfs(list,node.right);
    if(node.left == null && node.right == null) list.push(node.val);
}
```
:::
