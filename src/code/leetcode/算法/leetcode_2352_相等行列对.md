---
date: 2023-08-09
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
  - 矩阵
  - 模拟
order: 1207
---

# 1207. 独一无二的出现次数

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/equal-row-and-column-pairs/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：  
定义一个map，存放每行组成的字符串和出现的次数  
取出每列的字符串，与key进行比对    
注：通过存储list的方式替代存储字符串的方式可以提升运行效率


```java
class Solution {
        public int equalPairs(int[][] grid) {
        int res = 0;
        HashMap<String,Integer> map = new HashMap<>();
        for (int[] ints : grid) {
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 0; i < grid.length; i++) {
                stringBuilder.append(ints[i]).append(".");
            }
            map.put(stringBuilder.toString(),map.getOrDefault(stringBuilder.toString(),0)+ 1);

        }
        for (int i = 0; i < grid.length; i++) {
            StringBuilder stringBuilder = new StringBuilder();
            for (int[] ints : grid) {
                stringBuilder.append(ints[i]).append(".");
            }
            res += map.getOrDefault(stringBuilder.toString(),0);
        }
        return res;
    }
}
```