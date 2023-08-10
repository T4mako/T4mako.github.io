---
category: 
  - 算法
tag: 
  - 树
  - 广度优先
  - 二叉树
---

# 103_二叉树的锯齿形层序遍历
<Badge text="中等" type="warning" vertical="middle" />


```java
class Solution {
    List<List<Integer>>list=new ArrayList<>();
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        if(root==null){
            return list;
        }
        fun(root,0);
        return list;
    }
    public void fun(TreeNode node,int level){
        if(level==list.size()){
            List<Integer>list1=new ArrayList<>();
            list1.add(node.val);
            list.add(list1);
        }else {
            if(level%2==0){
                list.get(level).add(node.val);
            }else {
                list.get(level).add(0,node.val);
            }
        }
        if(node.left!=null){
            fun(node.left,level+1);
        }
        if(node.right!=null){
            fun(node.right,level+1);
        }    
    }
}
```