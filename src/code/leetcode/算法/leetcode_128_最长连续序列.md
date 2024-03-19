---
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
date: 2024-03-18
---

# 128. 最长连续序列

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/longest-consecutive-sequence/)


解法：
1. 首先通过 set 将数组去重
2. 从 set 中取出值 num
   1. 如果 set 中有 num - 1，进入下一次循环
   2. 如果没有，依此在 set 中寻找 num 的连续值，并记录最大长度

```java
class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> num_set = new HashSet<Integer>();
        for (int num : nums) {
            num_set.add(num);
        }
        int longestStreak = 0;
        for (int num : num_set) {
            if (!num_set.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;
                while (num_set.contains(currentNum + 1)) {
                    currentNum += 1;
                    currentStreak += 1;
                }
                longestStreak = Math.max(longestStreak, currentStreak);
            }
        }
        return longestStreak;
    }
}
```