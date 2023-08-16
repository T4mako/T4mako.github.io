---
article: false
date: 2023-08-07
category: 
  - 算法
tag: 
  - 数组
  - 前缀和
---

# 1732. 找到最高海拔



<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/find-the-highest-altitude/description/?envType=study-plan-v2&envId=leetcode-75)



```java
class Solution {
    public int largestAltitude(int[] gain) {
        int res = 0;
        int high = 0;
        for (int i : gain) {
            high += i;
            res = Math.max(high,res);
        }
        return res;
    }
}
```