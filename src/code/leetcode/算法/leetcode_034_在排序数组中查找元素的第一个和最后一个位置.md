---
category: 
  - 算法
tag: 
  - 数组
  - 二分查找
---

# 034_在排序数组中查找元素的第一个和最后一个位置


<Badge text="中等" type="warning" vertical="middle" />

## 解法一：二分查找再遍历
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

## 找最左 taget 和第一个大于 target 的数

```py
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        left_idx = self.binary_search(nums, target, True)
        right_idx = self.binary_search(nums, target, False) - 1
        
        if left_idx <= right_idx and right_idx < len(nums) and nums[left_idx] == target and nums[right_idx] == target:
            return [left_idx, right_idx]
        return [-1, -1]

    def binary_search(self, nums: List[int], target: int, lower: bool) -> int:
        left, right = 0, len(nums) - 1
        ans = len(nums)
        
        while left <= right:
            mid = (left + right) // 2
            # 当 lower=True 时找第一个 >= target 的位置（左边界）
            # 当 lower=False 时找第一个 > target 的位置（右边界 + 1）
            if nums[mid] > target or (lower and nums[mid] >= target):
                right = mid - 1
                ans = mid
            else:
                left = mid + 1
        return ans
```