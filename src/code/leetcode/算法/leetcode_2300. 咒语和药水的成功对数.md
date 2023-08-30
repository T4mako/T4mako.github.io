---
article: true
date: 2023-08-30
category: 
  - 算法
tag: 
  - 数组
  - 双指针
  - 二分查找
  - 排序
---

# 2300. 咒语和药水的成功对数

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：   
将 `spells` 数组排序，再遍历 `potions` 数组，在 `spells` 数组中找到第一个与 `potions[i]` 相乘大于等于 `success` 的位置


:::code-tabs
@tab Java
```java
class Solution {
    public int[] successfulPairs(int[] spells, int[] potions, long success) {
        // 返回结果数组
        int[] res = new int[spells.length];
        // 将 potions 排序
        Arrays.sort(potions);
        for (int i = 0; i < spells.length; i++) {
            int l = 0;
            int r =  potions.length - 1;
            int index = potions.length;
            // 二分查找
            while(l <= r){
                int m = (r - l) / 2 + l;
                if ((long)spells[i] * potions[m] >= success) {
                    r = m - 1;
                    index = m;
                } else {
                    l = m + 1;
                }
            }
            res[i] = potions.length - index;
        }
        return res;
    }
}
```
:::