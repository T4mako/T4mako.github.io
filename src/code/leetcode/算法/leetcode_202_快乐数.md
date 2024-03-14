---
category: 
  - 算法
tag: 
  - 哈希表
  - 数学
  - 双指针
date: 2024-03-14
---

# 202. 快乐数


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/happy-number/)


```java
class Solution {
    public boolean isHappy(int n) {
		HashSet<Integer> set = new HashSet<>();
		while (true) {
			if (!set.contains(n)) {
				set.add(n);
				int count = 0;
				while(n != 0) {
					count += Math.pow(n % 10, 2);
					n /= 10;
				}
				if (count == 1)
					return true;
				else
					n = count;
			} else {
				return false;
			}

		}
	}
}
```