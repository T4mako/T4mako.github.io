---
date: 2023-08-01
category: 
  - 算法
tag: 
  - 数组
  - 贪心
order: 605
---

# 605_种花问题


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/can-place-flowers/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：
- 判断数组可种植多少朵花，与n比较
- 通过记录一组连续的0的左右边界，计算可种植多少多花
- 注意数组左右两头要多加一个0


```java
class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int left = -1; // 定义最左边的0
        int plant = 0; // 可种数量
        for (int i = 0; i < flowerbed.length; i++) {
            // 后面的都为0也种不下
            if(plant + getFlowers(left,flowerbed.length) < n) return false;
            // 找下一个与1紧贴的0
            if(flowerbed[i] == 1){
                plant += getFlowers(left,i-1);
                left = ++i;
            }
        }
        // 加上末尾为0的情况
        if(flowerbed[flowerbed.length-1] == 0) plant += getFlowers(left,flowerbed.length);
        return plant >= n ?  true : false;
    }

    // 计算多个0可种几多花
    public int getFlowers(int left,int right){
        return (right - left) / 2;
    }
}
```