---
date: 2024-03-06
category: 
  - 算法
tag: 
  - 树
  - 深度优先
  - 广度优先
  - 二叉树
---

# 637. 二叉树的层平均值



<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/average-of-levels-in-binary-tree/)


解题思路：使用队列，层次遍历获取平均值


```java
class Solution {

    List<Double> res = new ArrayList<>();

    public List<Double> averageOfLevels(TreeNode root) {
		List<TreeNode> arr = new ArrayList<>();
		arr.add(root);
		avg(arr);
		return res;
    }
	
	
	public void avg(List<TreeNode> list) {
		if(list.size() == 0) return;
		double sum = 0;
		List<TreeNode> arr = new ArrayList<>();
		for(int i = 0;i < list.size();i++) {
			TreeNode node = list.get(i);
			sum += node.val;
			if(node.left != null) arr.add(node.left);
			if(node.right != null) arr.add(node.right);
		}
		res.add(sum / list.size());
		avg(arr);
	}
}
```