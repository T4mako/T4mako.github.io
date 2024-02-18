---
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 动态规划
date: 2024-02-17
---

# 122. 买卖股票的最佳时机 I

<Badge text="简单" type="tip" vertical="middle" />

```java
class Solution {
    public int maxProfit(int[] prices) {
        int min = Integer.MAX_VALUE;
        int res = 0;
        for (int price : prices) {
            if (price < min) {
                min = price;
            } else if (price - min > res) {
                res = price - min;
            }
        }
        return res;
    }
}
```