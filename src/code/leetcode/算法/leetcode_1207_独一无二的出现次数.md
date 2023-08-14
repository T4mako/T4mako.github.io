---
article: false
date: 2023-08-09
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
order: 1207
---

# 1207. 独一无二的出现次数



<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/unique-number-of-occurrences/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：  
定义一个map，存放数组中的数与出现的次数。  
将出现的次数转换为set，比较set与arr的长度


```java
class Solution {
    public boolean uniqueOccurrences(int[] arr) {
        HashMap<Integer,Integer> map = new HashMap<>();
        for (int i = 0; i < arr.length; i++) {
            map.put(arr[i],map.getOrDefault(arr[i],0) + 1);
        }
        return new HashSet<>(map.values()).size() == map.keySet().size();
    }
}
```