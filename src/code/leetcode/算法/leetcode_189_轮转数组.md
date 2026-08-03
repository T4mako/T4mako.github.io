---
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 动态规划
date: 2024-02-14
---

# 189. 轮转数组
<Badge text="中等" type="warning" vertical="middle" />


https://leetcode.cn/problems/rotate-array/description/

:::code-tabs
@tab Java
```java
class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        int[] ints = Arrays.copyOfRange(nums, nums.length - k,nums.length);
        int[] ints1 = Arrays.copyOfRange(nums, 0, nums.length - k);
        for (int i = 0; i < nums.length; i++) {
            if(i < ints.length){
                nums[i] = ints[i];
            }else {
                nums[i] = ints1[i - ints.length];
            }
        }
    }
}
```
@tab Python
```py
# 注：请勿使用切片，会产生额外空间
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        def reverse(i: int, j: int) -> None:
            while i < j:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
                j -= 1

        n = len(nums)
        k %= n  # 轮转 k 次等同于轮转 k % n 次
        reverse(0, n - 1)
        reverse(0, k - 1)
        reverse(k, n - 1)
```
:::


空间复杂度 O(1) 解法：

定义一个 reverse 函数，先将整个数组反转，再将前 `k` 个反转，后 `k` 到 `n - 1` 反转，即可得到答案，负负得正