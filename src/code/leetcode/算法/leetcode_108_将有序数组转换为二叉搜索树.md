---
category: 
  - 算法
tag: 
  - 树
  - 二叉搜索树
  - 分治
  - 数组
  - 二叉树
date: 2024-03-28
---

# 108. 将有序数组转换为二叉搜索树

<Badge text="简单" type="tip" vertical="middle" />

解法：递归

:::code-tabs
@tab Java
```java
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
		int i = nums.length / 2;
		TreeNode res = new TreeNode(nums[i]);
		res.left = build(nums,0,i - 1);
		res.right = build(nums,i + 1,nums.length - 1);
		return res;
    }

	public TreeNode build(int[] nums, int left, int right) {
		if(left > right) return null;
		else {
			int i = (left + right) / 2;
			TreeNode node = new TreeNode(nums[i]);
			node.left = build(nums,left,i - 1);
			node.right = build(nums,i + 1,right);
			return node;
		}
	}
}
```
@tab Python
```py
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        if(len(nums) == 0):
                return None
        else:
            node = TreeNode(val = nums[len(nums)//2])
            node.left = self.sortedArrayToBST(nums[0:len(nums)//2])
            node.right = self.sortedArrayToBST(nums[len(nums)//2 + 1 : len(nums)])
        return node
```
:::