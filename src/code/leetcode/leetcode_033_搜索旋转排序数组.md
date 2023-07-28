---
category: 
  - 算法
tag: 
  - 数组
  - 二分查找
---

# 033_搜索旋转排序数组

<Badge text="中等" type="warning" vertical="middle" />

## 解法
```java
class Solution {
    public int search(int[] nums, int target) {
        int i = nums[0];
        if(i == target) return 0;
        boolean bool = target > i; //true为左边区域，false为右边区域
        int left = -1;
        int right = nums.length;
        int mid;
        while (left + 1 != right){
            mid = (left + right) / 2;
            if(nums[mid] == target){
                return mid;
            }
            //mid与target同区
            if(bool == nums[mid] >= i){
                if(nums[mid] < target ){
                    left = mid;
                }else {
                    right = mid;
                }
            //mid与target不同区
            }else { 
                if(nums[mid] >= i){ //mid在左区，让left往左
                    left = mid;
                }else {
                    right = mid; //mid在右区，让right往右
                }
            }
        }
        return -1;
    }
}
```

先将nums[0]的值得到，如果nums[0]正好为target，返回0，用一个布尔值bool用于判断target位于数组的左半部分还是右半部分，开始二分查找，判断mid所处位置与target所处位置是否同区域，若同区，判断mid与target的值，移动相应指针，若不同区，判断mid与nums[0]的值，让指针往同区域的地方靠