---
 
date: 2023-08-08
category: 
  - 算法
tag: 
-  数组
- 滑动窗口
- 动态规划
---

# 1493. 删掉一个元素以后全为 1 的最长子数组


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/longest-subarray-of-1s-after-deleting-one-element/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：    
- 使用滑动窗口，定义 left 和 right，定义 next 指向 left 和 right 之间的第一个 0 用于快速移动 left   
- 先将 right 移动到第二个0，更新 next
- 使用循环语句对 right 指向的数字判断  
  如果 right 为 0，left移动到 下一个 0 的后一个位置，更新 count，res，left，right，next  
  如果 right 为 1， right++，更新 count，res，right
  

```java
class Solution {
    public int longestSubarray(int[] nums) {
        if (nums.length == 1) return 0;
        int res = 0;
        int count = 0;
        int left = 0;
        int right = 0;
        int next = 0;
        // 将 right 移动到第二个0，更新 next
        int flag = 1;
        while (right < nums.length && ((nums[right] == 1) || flag == 1)){
            if(nums[right] == 0) {flag--;next = right;}
            count++;right++;
        }
        res = count;
        // 遍历到末尾，返回长度-1
        if(right >= nums.length) return nums.length - 1;
        while (right < nums.length){
            // 如果 right 为 0，left移动到 下一个 0 的后一个位置，更新 count，res，left，right，next
            if(nums[right] == 0){
                count = count - next + left;
                left = next + 1;
                next = right;
                right++;
            }
            // 如果 right 为 1， right++，更新 count,res,right
            else {
                right++;count++;
                res = Math.max(res,count);
            }
        }
        return res - 1;
    }
}
```