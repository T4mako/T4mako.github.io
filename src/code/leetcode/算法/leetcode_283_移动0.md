---
article: false
date: 2023-08-06
category: 
  - 算法
tag: 
  - 数组
  - 双指针
order: 283
---



# 283_移动0

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/move-zeroes/?envType=study-plan-v2&envId=leetcode-75)


解法思路：双指针    
只需 **O(n)** 时间复杂度即可解决  
定义 left 和 right，right 指针遇到 0 则跳过，遇到数则赋值给 left 即可  

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