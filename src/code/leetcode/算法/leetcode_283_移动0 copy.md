---
date: 2024-03-13
category: 
  - 算法
tag: 
  - 哈希表
  - 字符串
---



# 290. 单词规律

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/word-pattern/)


解法思路：哈希表

```java
class Solution {
    public boolean wordPattern(String pattern, String s) {
		HashMap<Character, String> map = new HashMap<>();
		HashSet<String> set = new HashSet<>();
		String[] split = s.split(" ");
        if(pattern.length() != split.length) return false;
		for (int i = 0; i < pattern.length(); i++) {
			if (!map.containsKey(pattern.charAt(i))) {

				if (set.contains(split[i]))
					return false;
				map.put(pattern.charAt(i), split[i]);
                set.add(split[i]);
			} else if (!map.get(pattern.charAt(i)).equals(split[i])) {
				return false;
			}
		}
		return true;
	}
}
```