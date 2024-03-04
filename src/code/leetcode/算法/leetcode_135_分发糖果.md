---
category: 
  - 算法
tag: 
  - 贪心
  - 数组
date: 2024-02-17
---

# 135. 分发糖果

<Badge text="困难" type="danger" vertical="middle" />

[题目描述](https://leetcode.cn/problems/candy/description/)


解法：  
- 从左向右遍历，将满足右数大于左数的情况作为一次遍历结果
- 从右向左遍历，将满足左数大于右数的情况作为一次遍历结果
- 取上述遍历两次的相同位置的最大值为该位置的结果

```java
class Solution {
    public int candy(int[] ratings) {
        int[] left = new int[ratings.length];
        int[] right = new int[ratings.length];
        Arrays.fill(left, 1);
        Arrays.fill(right, 1);
        for(int i = 1; i < ratings.length; i++)
            if(ratings[i] > ratings[i - 1]) left[i] = left[i - 1] + 1;
        int count = left[ratings.length - 1];
        for(int i = ratings.length - 2; i >= 0; i--) {
            if(ratings[i] > ratings[i + 1]) right[i] = right[i + 1] + 1;
            count += Math.max(left[i], right[i]);
        }
        return count;
    }
}
```