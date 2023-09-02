---
article: false
date: 2023-09-02
category: 
  - 算法
tag: 
  - 数组
  - 二分查找
---

# 875. 爱吃香蕉的珂珂


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/koko-eating-bananas/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：   
定义 left = 1，right = Integer.MAX_VALUE  
使用二分查找，计算时间 sum  
-  `sum <= h`，`res = Math.min(mid,res);right = mid - 1;`
- `sum > h`，`left = mid + 1;`

:::code-tabs
@tab Java
```java
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int res = Integer.MAX_VALUE;
        int left = 1;
        int right = Integer.MAX_VALUE;
        while (left <= right){
            long sum = 0;
            int mid = left + (right - left) / 2;
            for (int pile : piles) {
                sum += pile % mid == 0 ? pile / mid : pile / mid + 1;
            }
            if(sum <= h){res = Math.min(mid,res);right = mid - 1;}
            else {left = mid + 1;}
        }
        return res;
    }
}
```
:::