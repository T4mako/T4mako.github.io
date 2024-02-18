---
category: 
  - 算法
tag: 
  - 链表
data: 2024-02-15
---

# 80. 删除有序数组中的重复项 II

解法：判断删除，数组整体移动

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 1) return 1;
        int res = nums.length;
        int left = nums[0];
        int count = 1;
        for (int i = 1; i < res; i++) {
            if(left == nums[i]) count++;
            else {
                left = nums[i];
                count = 1;
                continue;
            }
            if(count >= 3){
                int right = i;
                while(right < nums.length && nums[right] == left){
                    right++;
                    res--;
                }
                if(right >= nums.length) return i;
                else {
                    System.arraycopy(nums, right, nums, i, nums.length - right);
                    i--;
                }
            }
        }
        return res;
    }
}
```

