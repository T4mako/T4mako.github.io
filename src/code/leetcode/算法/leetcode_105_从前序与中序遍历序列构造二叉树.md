---
category: 
  - 算法
tag: 
  - 树
  - 数组
  - 哈希表
  - 分治
  - 二叉树
---

# 105_从前序与中序遍历序列构造二叉树
<Badge text="中等" type="warning" vertical="middle" />

# Hash + 递归

```java
class Solution {
    TreeNode res = new TreeNode();
    HashMap<Integer,Integer> map = new HashMap();
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) {
            map.put(inorder[i],i);
        }

        build(res,preorder,inorder,0,preorder.length - 1,0,inorder.length - 1,res);
        return res;
    }
    public void build(TreeNode node, int[] preorder, int[] inorder, int pre_left, int pre_right, int in_left, int in_right,TreeNode res){
        if(pre_left > pre_right || in_left > in_right){
            return;
        }
        node.val = preorder[pre_left];
        if(pre_right == pre_left || in_left == in_right) return;
        int i = map.get(node.val);
        int k = map.get(inorder[in_left]);
        i -= k;
        if(i != 0){
            node.left = new TreeNode();
            build(node.left,preorder,inorder,pre_left + 1,pre_left + i,in_left,in_left + i - 1,res);
        }
        if(in_left + i != in_right){
            node.right = new TreeNode();
            build(node.right,preorder,inorder,pre_left + i + 1,pre_right,in_left + i + 1,in_right,res);
        }
    }
}
```

将节点存入到map中，方便之后的查找，记录每一次递归时前序数组和中序数组的首尾值，方便递归时判断，当首大于尾时，结束递归。否则按照构造二叉树的方法，将前序的第一个数加入，在构造对应的左右子树

## 递归

```py
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        
        if(not inorder or not preorder): return None

        head = TreeNode(val = preorder[0])

        mid = inorder.index(preorder[0])
        head.left = self.buildTree(preorder[1:mid+1], inorder[:mid])
        head.right = self.buildTree(preorder[mid+1:], inorder[mid+1:])

        return head
```


