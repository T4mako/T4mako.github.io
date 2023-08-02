---
date: 2023-08-02
category: 
  - 算法
tag: 
  - 数组
  - 双指针
order: 1431
---
# 1431_拥有最多糖果的孩子

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/kids-with-the-greatest-number-of-candies/description/?envType=study-plan-v2&envId=leetcode-75)


```java
class Solution {
    public List<Boolean> kidsWithCandies(int[] candies, int extraCandies) {
        List<Boolean> res = new ArrayList<>();
        int max = 0;
        for (int candy : candies) {
            if (candy > max) max = candy;
        }
        for (int candy : candies) {
            if (candy + extraCandies >= max) {
                res.add(true);
            } else {
                res.add(false);
            }

        }
        return res;
    }
}
```

