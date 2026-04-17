---
date: 2024-03-16
category: 
  - 算法
tag: 
  - 哈希表
  - 字符串
  - 滑动窗口
---

# 76. 最小覆盖子串


<Badge text="困难" type="hard" vertical="middle" />

[题目描述](https://leetcode.cn/problems/minimum-window-substring/description/)

### 从小到大的滑动窗口

设置一个滑动窗口，从字符串 t 的长度开始之间变大，查找结果

```java
class Solution {
    public String minWindow(String s, String t) {
		int len = t.length();
		if (len > s.length())
			return "";
		int[] origin = new int[128];
		for (int i = 0; i < len; i++) {
			origin[t.charAt(i)]++;
		}

		for (int space = len - 1; space < s.length(); space++) {
			int[] compare = null;
			int left, right;
			for (left = 0, right = left + space; right < s.length(); left++, right++) {
				if (compare == null) {
					compare = new int[128];
					for (int i = 0; i <= right; i++) {
						compare[s.charAt(i)]++;
					}
					int i = 0;
					for (; i < t.length(); i++) {
						if (compare[t.charAt(i)] < origin[t.charAt(i)])
							break;
					}
					if (i == t.length())
						return s.substring(left, right+1);
				} else {
					compare[s.charAt(left - 1)]--;
					compare[s.charAt(right)]++;
					int i = 0;
					for (; i < t.length(); i++) {
						if (compare[t.charAt(i)] < origin[t.charAt(i)])
							break;
					}
					if (i == t.length())
						return s.substring(left, right+1);
				}
			}
		}
		return "";
	}
}
```

### 更简易的滑动窗口

right 指针不断右移，直到包含全部字符  
left 指针不断右移，找到最短的结果长度  
ansL & ansR 记录最终符合条件且最短字符串的始末位置，l & r 作滑动窗口上下界，cnt 存储 t 中每个字符出现次数，当 cntT 为 0 表示 t 中所有字符已被当前窗口包含。

```java
class Solution {
    public String minWindow(String s, String t) {
        int[] cnt = new int[128];
        for (int i = 0; i < t.length(); i++) cnt[t.charAt(i)]++;
        int l = 0, r = 0, ansL = 0, ansR = 0, ans = Integer.MAX_VALUE, cntT = t.length();
        while (r < s.length()) {
            if (cnt[s.charAt(r++)]-- > 0) cntT--;
            while (cntT == 0) {
                if (r - l < ans) {
                    ans = r - l;
                    ansL = l;
                    ansR = r;
                }
                if (cnt[s.charAt(l++)]++ == 0) cntT++;
            }
        }
        return ans == Integer.MAX_VALUE ? "" : s.substring(ansL, ansR);
    }
}
```