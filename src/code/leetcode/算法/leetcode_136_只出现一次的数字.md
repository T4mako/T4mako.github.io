---
date: 2023-09-11
category: 
  - 算法
tag: 
  - 位运算
  - 数组 
---

# 136. 只出现一次的数字



<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/single-number/description/?envType=study-plan-v2&envId=leetcode-75)


解法：异或

- 异或交换律：`a ^ b ^ c = a ^ c ^ b`

- 任何数于 0 异或为任何数 `0 ^ n = n`

- 相同的数异或为 0: `n ^ n = 0`

:::code-tabs
@tab Java
```java
class Solution {
    public int singleNumber(int[] nums) {
        int res = nums[0];
        for (int i = 1; i < nums.length; i++) {
            res ^= nums[i];
        }
        return res;
    }
}
```
@tab Ts
```ts
function singleNumber(nums: number[]): number {
    let res: number = nums[0];
    for (let i:number = 1; i < nums.length; i++) {
        res ^= nums[i];
    }
    return res;
};
```
:::