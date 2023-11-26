---
 
date: 2023-08-10
category: 
  - 算法
tag: 
  - 栈
  - 字符串
  - 模拟
---

# 2390. 从字符串中移除星号

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/removing-stars-from-a-string/description/?envType=study-plan-v2&envId=leetcode-755)

解法：  
模拟栈，初始栈顶为数组末尾  
（初始栈顶为 0 也可以且更好）

```java
class Solution {
    public String removeStars(String s) {
        StringBuilder res = new StringBuilder();
        int count = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            if(count == 0 && s.charAt(i) != '*') res.append(s.charAt(i));
            else if(s.charAt(i) == '*') count++;
            else count--;
        }
        return res.reverse().toString();
    }
}
```