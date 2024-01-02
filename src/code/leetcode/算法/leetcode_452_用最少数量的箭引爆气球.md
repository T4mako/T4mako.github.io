---
date: 2024-01-02
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 排序
---

# 452. 用最少数量的箭引爆气球


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/description/?envType=study-plan-v2&envId=leetcode-75)

解法思路：  
- 通过对每个数组左右端点进行排序
- 比较出每个区间的公共子区间，如果没有则 +1

```java
class Solution {
    public int findMinArrowShots(int[][] intervals) {
        if (intervals.length == 0) return 0;
        int len = intervals.length;
        // 根据每个数组第一个元素优先排序，再根据第二个元素排序
        Arrays.sort(intervals, new Comparator<int[]>() {
            @Override
            public int compare(int[] a, int[] b) {
                // 首先按照每个数组的第一个元素进行比较
                int compareFirstElement = Integer.compare(a[0], b[0]);
                if (compareFirstElement != 0) {
                    return compareFirstElement;
                } else {
                    // 如果第一个元素相同，则按照第二个元素进行比较
                    return Integer.compare(a[1], b[1]);
                }
            }
        });
        int res = 1;
        int[] temp = intervals[0]; // 记录公共子区间
        for (int i = 1; i < len; i++) {
            if(!(temp[1] < intervals[i][0])){ // 更新子区间
                temp[0] = Math.max(temp[0],intervals[i][0]);
                temp[1] = Math.min(temp[1],intervals[i][1]);
            }else{
                res++;
                temp = intervals[i];
            }
        }
        return res;
    }
}
```