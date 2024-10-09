---
category: 
  - 算法
tag: 
  - 树
  - 广度优先
  - 二叉树
---

# 102_二叉树的层序遍历
<Badge text="中等" type="warning" vertical="middle" />


:::code-tabs
@tab Java
```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if(root == null){
            return res;
        }
        Queue<TreeNode> temp = new LinkedList<>();
        temp.add(root);
        while(temp.size() != 0){
            ArrayList<Integer> list = new ArrayList<>();
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
            res.add(list);
        }
        return res;
    }
}
```
@tab Python
```py
class Solution(object):
    def levelOrder(self, root):
        """
        :type root: TreeNode
        :rtype: List[List[int]]
        """
        res = []
        if root is None:
            return res
        queue = []
        queue.append(root)
        while queue:
            size = len(queue)
            node_list = []
            for _ in range(size):
                node = queue.pop(0)  
                node_list.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            res.append(node_list)
        return res
        
```
:::
将根节点存到LinkedList中，当temp的长度不为0时，队列元素出队，将他的左右节点入队，出队的所有元素存入数组中，最后当temp为0时，结束循环。