---
category: 
  - 算法
tag: 
  - 数组
  - 二分查找
---

# 035_搜索插入位置

<Badge text="简单" type="tip" vertical="middle" />

## 解法
```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        int mid;
        if(target < nums[left]){
            return 0;
        }
        if(target > nums[right]){
            return right + 1;
        }
        while(left <= right){
            mid = (left + right)/2;
            if(left + 1 == right || left == right ){
                if(nums[left] == target){
                    return left;
                }else{
                    return left + 1;
                }
            }
            if(target == nums[mid]){
                return mid;
            }else if(target < nums[mid]){
                right = mid;
            }else{
                left = mid;
            }
        }
        return 0;
    }
}
```
通过二分法查找元素是否在数组中，先判断target值是否小于nums[0]或nums[nums.length-1]，如果是，返回0或nums,length，当left指针与right相邻或left==right时，判断left所指向值是否等于target，如果是，返回left，如果不是，返回left+1