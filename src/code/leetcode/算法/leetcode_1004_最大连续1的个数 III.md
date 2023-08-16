---
article: false
date: 2023-08-07
category: 
  - 算法
tag: 
  - 数组
  - 二分查找
  - 滑动窗口
  - 前缀和
---

# 1004. 最大连续1的个数 III


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/max-consecutive-ones-iii/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：
- 使用滑动窗口，rihgt在变动时，left也跟着边。
- 当`right为1` 时或者 `left到right中的0个数小于k`，不断移动rihgt
- 当 `right为0` ，由于上一个条件判断为 `right < k`。因此此时left与right中间的0的个数等于k。  
  故 `更新res`  
  `更新left`，直到left指向第一个0的后一位

```java
class Solution {
    public int longestOnes(int[] nums, int k) {
        int n=nums.length,l,r,cnt=0,res=0;
        for(l=r=0;l<n;){
            while(r<n&&(nums[r]==1||cnt<k)) if(nums[r++]==0) cnt++;
            if(r-l>res) res=r-l;
            if(nums[l++]==0) cnt--;
        }
        return res;
    }
}
```