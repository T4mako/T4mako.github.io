---
date: 2023-08-28
category: 
  - 算法
tag: 
  - 数组
  - 广度优先
  - 矩阵
---

# 215. 数组中的第K个最大元素

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/kth-largest-element-in-an-array/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：  
快速排序选择法，在快速排序时，每轮排序会将一个数排在正确的位置，若该数为第 K 大的数即可返回

:::code-tabs
@tab Java
```java
class Solution {
    int quickselect(int[] nums, int l, int r, int k) {
        if (l == r) return nums[k]; // 左右指针指向同一位置，nums[k] 为第 K 小的数
        int x = nums[l], i = l - 1, j = r + 1; // 初始化 l，r 指针
        while (i < j) {
            do i++; while (nums[i] < x); // 移动 l，找比 x 小或相等
            do j--; while (nums[j] > x); // 移动 r，找比 x 大或相等的
            if (i < j){ // 交换 nums[i] 和 nums[j]
                int tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
            }
        }
        if (k <= j) return quickselect(nums, l, j, k); // 判断 k 与 j 的位置
        else return quickselect(nums, j + 1, r, k);
    }
    public int findKthLargest(int[] _nums, int k) {
        int n = _nums.length;
        return quickselect(_nums, 0, n - 1, n - k);// n - k 个最小元素即为第 k 个最大元素
    }
}
```
:::