---
date: 2024-01-05
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 排序
  - 堆
---

# 2542. 最大子序列的分数


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/maximum-subsequence-score/description/?envType=study-plan-v2&envId=leetcode-75)

解法思路：  
- 根据 `nums[2]` 排序，同时根据更改的下标更新 `nums[1]`
- 建立小根堆，


```java
class Solution {
    public long maxScore(int[] nums1, int[] nums2, int k) {
        int n = nums1.length;
        int[][] arr = new int[n][2];
        for (int i = 0; i < n; i++) {
            arr[i] = new int[]{nums1[i], nums2[i]};
        }
        Arrays.sort(arr, (a, b) -> (b[1] - a[1]));
        PriorityQueue<Integer> pq = new PriorityQueue();
        long res = 0;
        long sum = 0;
        for (int i = 0; i < n; i++) {
            sum += arr[i][0];
            pq.offer(arr[i][0]);
            if (pq.size() == k) {
                res = Math.max(res, sum * arr[i][1]);
                sum -= pq.poll();
            }
        }
        return res;
    }
}
```