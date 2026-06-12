---
category: 
  - 算法
tag: 
  - 双指针
---

# 88. 合并两个有序数组

[题目描述](https://leetcode.cn/problems/merge-sorted-array/description/)

<Badge text="简单" type="tip" vertical="middle" />

从后往前双指针：因为 nums1 尾部有足够空间，从两个数组末尾开始比较，将较大值填入 nums1 末尾，避免覆盖未处理的元素。

:::code-tabs
@tab Java
```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        if(nums2.length == 0) return;
        int i = m + n - 1;
        m--;n--;
        while(i >= 0){
            if(m < 0) nums1[i--] = nums2[n--];
            else if(n < 0) nums1[i--] = nums1[m--];
            else if(nums1[m] < nums2[n]){
                nums1[i--] = nums2[n--];
            }else{
                nums1[i--] = nums1[m--];
            }
        }
    }
}
```
@tab Python
```py
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        i, j, k = m - 1, n - 1, m + n - 1
        while j >= 0:
            if i >= 0 and nums1[i] > nums2[j]:
                nums1[k] = nums1[i]
                i -= 1
            else:
                nums1[k] = nums2[j]
                j -= 1
            k -= 1
```
:::

