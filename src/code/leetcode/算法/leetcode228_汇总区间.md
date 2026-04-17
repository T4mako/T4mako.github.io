---
date: 2024-03-03
category: 
  - 算法
tag: 
  - 数组
---

# 228. 汇总区间

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/summary-ranges/description/)

解题思路：一次遍历，判断是否连续

:::code-tabs
@tab Java
```java
class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> res = new ArrayList<>();
		if (nums.length == 0)
			return res;
		if (nums.length == 1) {
			res.add(nums[0] + "");
			return res;
		}
		int left = 0;
		int right = 1;
		int temp = nums[left];
		while (right < nums.length) {
			if (nums[right] == ++temp)
				right++;
			else if (right == left + 1) {
				res.add(String.valueOf(nums[left]));
				left = right;
				right++;
				temp = nums[left];
			} else {
				res.add(nums[left] + "->" + nums[right - 1]);
				left = right;
				right++;
				temp = nums[left];
			}
		}
		int end = right - 1;
		if(end == left) res.add(String.valueOf(nums[left]));
		else res.add(String.valueOf(nums[left] + "->" + nums[end]));
		return res;
    }
}
```
:::