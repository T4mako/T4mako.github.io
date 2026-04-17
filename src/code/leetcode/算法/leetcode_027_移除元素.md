---
category: 
  - 算法
tag: 
  - 数组
  - 双指针
---


# 027_移除元素

<Badge text="简单" type="tip" vertical="middle" />


```java
class Solution {
    public int removeElement(int[] nums, int val) {
        if(nums.length == 0){
            return 0;
        }
        int left = 0;
        int right = nums.length-1;
        while(left < right){
            if(nums[left] == val){
                nums[left] = nums[left] + nums[right];
                nums[right] = nums[left] - nums[right];
                nums[left] = nums[left] - nums[right];
                right--;
            }else{
                left++;
            }
        }
        if(nums[left] == val){
            return left;
        }else{
            return left + 1;
        }
    }
}
```

定义一个left和一个right指针，如果left指针所指向的值为val，与right指针指向的值交换，right--，left不动，如果left指向的值不与val相同，left++。当left与right相遇时，判断left所指的值是否相同，如果相同，返回left，如果不同，返回left+1