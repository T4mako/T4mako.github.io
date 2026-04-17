---
date: 2024-01-01
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 动态规划
---

# 435. 无重叠区间

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/non-overlapping-intervals/description/?envType=study-plan-v2&envId=leetcode-75)

解法思路：  
- 通过对每个数组的右端点排序，有端点最小的区间是要求的第一个区间，使用变量 right 记录右端点值
- 遍历排序过的数组，寻找下一个区间，下一个区间的左端点大于 right，则为下一个区间

```java
class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) {
            return 0;
        }
        // 对右端点进行排序
        Arrays.sort(intervals, new Comparator<int[]>() {
            public int compare(int[] interval1, int[] interval2) {
                return interval1[1] - interval2[1];
            }
        });

        int n = intervals.length;
        int right = intervals[0][1]; // 最小的右端点
        int ans = 1; // 记录总数
        for (int i = 1; i < n; ++i) {
            if (intervals[i][0] >= right) { // 判断与第一个区间是否重叠
                ++ans; // 没有则++
                right = intervals[i][1]; // 更新 right 值
            }
        }
        return n - ans;
    }
}
```