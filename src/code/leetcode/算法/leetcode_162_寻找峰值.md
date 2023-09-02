---
article: false
date: 2023-09-01
category: 
  - 算法
tag: 
  - 数组
---

# 162. 寻找峰值


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/find-peak-element/?envType=study-plan-v2&envId=leetcode-75)

解题思路：   
遍历数组，寻找两边小，中间大的数的索引

:::code-tabs
@tab Java
```java
class Solution {
    public int findPeakElement(int[] nums) {
        if (nums.length == 1) return 0;
        if(nums[0] > nums[1]) return 0;
        if(nums[nums.length - 1] > nums[nums.length - 2]) return nums.length - 1;
        for (int i = 1; i < nums.length - 1; i++) {
            if(nums[i - 1] < nums[i] && nums[i + 1] < nums[i]){
                return i;
            }
        }
        return -1;
    }
}
```
@tab Ts
```ts
function findPeakElement(nums: number[]): number {
    if (nums.length == 1) return 0;
    if(nums[0] > nums[1]) return 0;
    if(nums[nums.length - 1] > nums[nums.length - 2]) return nums.length - 1;
    for (let i:number = 1; i < nums.length - 1; i++) {
        if(nums[i - 1] < nums[i] && nums[i + 1] < nums[i]){
            return i;
        }
    }
    return -1;
};
```
:::