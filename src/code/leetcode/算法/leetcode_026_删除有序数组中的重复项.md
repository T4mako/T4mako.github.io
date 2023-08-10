---
category: 
  - 算法
tag: 
  - 数组
  - 双指针
---


# 026_删除有序数组中的重复项

<Badge text="简单" type="tip" vertical="middle" />


```java
class Solution {
    public int removeDuplicates(int[] nums) {
        int left = 0,right = 1;
        int res = 1;
        while(right < nums.length){
            if(nums[left] == nums[right]){
                right++;
            }else{
                nums[++left] = nums[right++];
                res++;
            }
        }
        return res;
    }
}
```

运用双指针，左边指向不重复的数，right往右移动指针，如果有重复的就right++；如果没重复nums[++left] = nums[right++];定义一个res用于返回