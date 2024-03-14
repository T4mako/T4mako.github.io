---
date: 2024-03-14
category: 
  - 算法
tag: 
  - 哈希表
  - 字符串
  - 排序
---

# 242. 有效的字母异位词

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/valid-anagram/)

```java
class Solution {
    public boolean isAnagram(String s, String t) {
		if(s.length() != t.length()) return false;
		int len = s.length();
		int[] num1 = new int[26];
		int[] num2 = new int[26];
		for(int i = 0;i < len;i++) {
			num1[s.charAt(i) - 97]++;
			num2[t.charAt(i) - 97]++;
		}
		for(int i = 0;i < 26;i++) {
			if(num1[i] != num2[i]) return false;
		}
		return true;
    }
}
```