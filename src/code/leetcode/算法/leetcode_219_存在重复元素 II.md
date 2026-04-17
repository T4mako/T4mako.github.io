---
date: 2024-03-15
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
  - 滑动窗口
---

# 219. 存在重复元素 II

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/contains-duplicate-ii/)

解题思路： 哈希 + 数组 

:::code-tabs
@tab Java
```java
class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
		HashMap<Integer,ArrayList<Integer>> map = new HashMap<>();
		for(int i = 0;i < nums.length;i++) {
			if(map.containsKey(nums[i])) {
				ArrayList<Integer> list = map.get(nums[i]);
				for(int j : list) {
					if(Math.abs(j - i) <= k) return true;
				}
				list.add(i);
			}else {
				ArrayList<Integer> list = new ArrayList<Integer>();
				list.add(i);
				map.put(nums[i],list);
			}
		}
		return false;
    }
}
```
:::