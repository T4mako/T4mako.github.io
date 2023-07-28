---
category: 
  - 算法
tag: 
  - 树
  - 广度优先
  - 二叉树
---

# 107_二叉树的层序遍历 II
<Badge text="中等" type="warning" vertical="middle" />

```java
class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        List<List<Integer>> res = new LinkedList<>();
        if(root == null){
            return res;
        }
        Queue<TreeNode> temp = new LinkedList<>();
        temp.add(root);
        while(temp.size() != 0){
            LinkedList<Integer> list = new LinkedList<>();
            int len = temp.size();
            for (int i = 0; i < len; i++) {
                TreeNode node = temp.poll();
                list.add(node.val);
                if(node.left != null){
                    temp.add(node.left);
                }
                if(node.right != null){
                    temp.add(node.right);
                }
            }
            res.add(0,list);
        }
        return res;
    }
}
```