---
article: false
date: 2023-08-02
category: 
  - 算法
tag: 
  - 双指针
  - 字符串
---

# 345_反转字符串中的元音字母



<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/reverse-vowels-of-a-string/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：
- 双指针


```java
class Solution {
    public String reverseVowels(String s) {
        char[] vowels = new char[]{'a','e','i','o','u'};
        Set<Character> set = new HashSet<>();
        for (char c : vowels) {
            set.add(c);
            set.add(Character.toUpperCase(c));
        }
        StringBuilder res = new StringBuilder(s);
        int left = 0,right = res.length() - 1;
        while (left < right){
            while(!set.contains(res.charAt(left)) && (left < right)) left++;
            while(!set.contains(res.charAt(right)) && (left < right)) right--;
            char temp = res.charAt(right);
            res.setCharAt(right--,res.charAt(left));
            res.setCharAt(left++,temp);
        }
        return res.toString();
    }
}
```