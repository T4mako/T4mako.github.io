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

## 对每个根节点深度遍历

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


## 前缀和

参考题目 [560_和为 K 的子数组](.\leetcode_560_和为 K 的子数组.md)
```py
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        # key：从根到 node 的节点值之和
        # value：节点值之和的出现次数
        # 注意在递归过程中，哈希表只保存根到 node 的路径的前缀的节点值之和
        cnt = defaultdict(int)  
        cnt[0] = 1
        ans = 0

        # s 表示从根到 node 的父节点的节点值之和（node 的节点值尚未计入）
        def dfs(node: Optional[TreeNode], s: int) -> None:
            if node is None:
                return

            nonlocal ans
            s += node.val
            # 把 node 当作路径的终点，统计有多少个起点
            ans += cnt[s - targetSum]

            cnt[s] += 1
            dfs(node.left, s)
            dfs(node.right, s)
            cnt[s] -= 1  # 恢复现场（撤销 cnt[s] += 1）

        dfs(root, 0)
        return ans
```