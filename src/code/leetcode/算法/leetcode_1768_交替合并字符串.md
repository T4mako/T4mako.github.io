---
date: 2023-08-02
category: 
  - 算法
tag: 
  - 数组
---
# 1768_交替合并字符串

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/merge-strings-alternately/description/?envType=study-plan-v2&envId=leetcode-75)


```java
class Solution {
    public String mergeAlternately(String word1, String word2) {
        StringBuilder res = new StringBuilder();
        int len = Math.min(word1.length(), word2.length());
        for (int i = 0; i < len; i++) {
            res.append(word1.charAt(i));
            res.append(word2.charAt(i));
        }
        return res.append(len == word1.length() ? word2.substring(len):word1.substring(len)).toString();    
    }
}
```

