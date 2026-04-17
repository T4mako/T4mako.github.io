---
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 二叉树
  - 回溯
---

# 113_路径总和II
<Badge text="中等" type="warning" vertical="middle" />



```java
class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
       List<List<Integer>> res = new ArrayList<>();
        if(root == null){
            return res;
        }
        List list = new ArrayList();
        list.add(root.val);
        path(root,root.val,targetSum,res,list);
        return res;
    }
    public void path(TreeNode root, int sum,int target, List<List<Integer>> res,List<Integer> list){
        if(root.left != null){
            list.add(root.left.val);
            sum += root.left.val;
            TreeNode temp = root.left;
            path(temp,sum,target,res,list);
            sum -= list.get(list.size() - 1);
            list.remove(list.size() - 1);
        }
        if(root.right != null){
            list.add(root.right.val);
            sum += root.right.val;
            TreeNode temp = root.right;
            path(temp,sum,target,res,list);
            sum -= list.get(list.size() - 1);
            list.remove(list.size() - 1);
        }
        if(root.left == null && root.right == null && sum == target){
            res.add(new ArrayList<>(list));
        }
    }
}
```

深度优先遍历每个节点，计算它们的求和值是否与目标一致，一致就将数组加入到res中