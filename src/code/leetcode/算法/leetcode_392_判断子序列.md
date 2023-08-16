---
article: false
date: 2023-08-06
category: 
  - 算法
tag: 
  - 字符串
  - 双指针
  - 动态规划
---



# 392_判断子序列

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/is-subsequence/description/?envType=study-plan-v2&envId=leetcode-75)


解法思路：
- ① 双指针   
- ② DP 
  使用动态规划的方法实现预处理，令 `f[i][j]` 表示字符串 t 中从位置 i 开始往后字符 j 第一次出现的位置。在进行状态转移时，如果 t 中位置 i 的字符就是 j，那么 `f[i][j]=i`，否则 j 出现在位置 i+1 开始往后，即 `f[i][j]=f[i+1][j]`，因此我们要倒过来进行动态规划，从后往前枚举 i。

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int left = 0,right = 0;
        while (right < nums.length){
            if (nums[right] != 0){
                nums[left++] = nums[right++];
            }else {
                right++;
            }
        }
        for(;left < nums.length;left++){
            nums[left] = 0;
        }
    }
}
```