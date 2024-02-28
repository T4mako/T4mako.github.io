---
category: 
  - 算法
tag: 
  - 双指针
  - 字符串
date: 2024-02-28
---

# 125. 验证回文串

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/valid-palindrome/description/?envType=study-plan-v2&envId=top-interview-150)


解法：双指针

```java
class Solution {
    public boolean isPalindrome(String s) {
		if (s.trim().equals("")) return true;
		int left = 0,right = s.length() - 1;
		while(left <= right) {
			int l = s.charAt(left);
			int r = s.charAt(right);
			if(!((l >= 48 && l  < 58) || (l >= 65 && l < 91) || (l >= 97 && l < 123))) {
				left++;
			}else if(!((r >= 48 && r  < 58) || (r >= 65 && r < 91) || (r >= 97 && r < 123))) {
				right--;
			}else if(l == r || (Math.min(l, r) >= 65 && (l == r + 32)) || (Math.min(l, r) >= 65 && (r == l + 32))) {
				left++;
				right--;
			}else { 
				return false;
			}
		}
		return true;
    }
}
```