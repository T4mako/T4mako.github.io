---
category: 
  - 算法
tag: 
  - 贪心
  - 数组
date: 2024-02-17
---

# 134. 加油站

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/gas-station/)


解法：遍历数组，同时加 `gas[i]`，减 `cost[i]`，得到最小值的索引的下一个即为答案

```java
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
    int len = gas.length;
    int spare = 0;
    int minSpare = Integer.MAX_VALUE;
    int minIndex = 0;

    for (int i = 0; i < len; i++) {
        spare += gas[i] - cost[i];
        if (spare <= minSpare) {
            minSpare = spare;
            minIndex = i;
        }
    }

    return spare < 0 ? -1 : (minIndex + 1) % len;
    }
}
```