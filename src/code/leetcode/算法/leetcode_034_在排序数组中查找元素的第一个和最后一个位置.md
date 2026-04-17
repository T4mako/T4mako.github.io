---
category: 
  - 算法
tag: 
  - 数组
  - 二分查找
---

# 034_在排序数组中查找元素的第一个和最后一个位置


<Badge text="中等" type="warning" vertical="middle" />

## 解法
```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int[] res = new int[]{-1,-1};
        int a = Arrays.binarySearch(nums,target);
        if(a < 0){
            return res;
        }
        int len = nums.length;
        int left = a,right = a;
        while(left - 1 >= 0 && nums[left - 1] == nums[left]){
            left = Arrays.binarySearch(nums,0,left,target);
        }
        while(right + 1 <=  len - 1 && nums[right + 1] == nums[right]){
            right = Arrays.binarySearch(nums,right + 1,len,target);
        }
        res[0] = left;
        res[1] = right;
        return res;
    }
}
```
先用二分查找找到一个元素，在从左右再次查找