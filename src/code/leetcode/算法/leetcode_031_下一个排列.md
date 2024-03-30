---
category: 
  - 算法
tag: 
  - 数组
  - 双指针
---

# 031_下一个排列


<Badge text="中等" type="warning" vertical="middle" />

## 解法一：

```java
class Solution {
    public void nextPermutation(int[] nums) {
        int len = nums.length;
        if(len == 1){
            return;
        }
        if(len == 2){
            nums[0] = nums[0] + nums[1];
            nums[1] = nums[0] - nums[1];
            nums[0] = nums[0] - nums[1];
            return;
        }
        int left = len - 2;
        while(left >= 0){
            if(nums[left] < nums[left + 1]){
                int index = getMin(left,len-1,nums);
                nums[left] = nums[index] + nums[left];
                nums[index] = nums[left] - nums[index];
                nums[left] = nums[left] - nums[index];
                sort(left+1,len-1,nums);
                return;
            }
            if(left == 0){
                sort(0,len-1,nums);
                return;
            }
            left--;
        }
    }
    public int getMin(int left,int right,int[] nums){
        int min = nums[left];
        int target = -1;
        int max = min;
        for(int i = left+1;i <= right;i++){
            if(nums[i] > max){
                max = nums[i];
            }
            if(nums[i] > min && nums[i] <= max){
                target = i;
            }
        }
        return target;
    }
    public void sort(int left,int right,int[] nums){
        int len = right - left + 1;
        for (int i = left; i < left + len - 1; i++) {
            for (int j = left; j < left*2 + len - i - 1; j++) {
                if(nums[j] > nums[j+1]){
                    nums[j+1] = nums[j] + nums[j+1];
                    nums[j] = nums[j+1] - nums[j];
                    nums[j+1] = nums[j+1] - nums[j];
                }
            }
        }
    }
}
```

定义一个left，通过for循环比较 left 与 left+1 的大小，如果`left+1 < left`，将 left 前移，当 `left+1>  left`  ，找到在 left+1 到 len-1 的大于 left 的数的最小的那个，与 left 交换，然后对 left-1 到 len-1 的数进行排序

## 解法二：

```java
class Solution {
    public void nextPermutation(int[] nums) {
        int len = nums.length;
        for (int i = len - 1; i >= 1; i--) {
            if (nums[i] > nums[i - 1]) {
                reverse(nums,i);
                for (int j = i; j < len; j++) {
                    if (nums[j] > nums[i-1]) {
                        nums[j] = nums[i-1] + nums[j];
                        nums[i-1] = nums[j] - nums[i-1];
                        nums[j] = nums[j] - nums[i-1];
                        return;
                    }
                }
            }
        }
        reverse(nums,0);
    }
    public void reverse(int[] nums, int start) {
        int left = start, right = nums.length - 1;
        while (left < right) {
            nums[left] = nums[left] + nums[right];
            nums[right] = nums[left] - nums[right];
            nums[left] = nums[left] - nums[right];
            left++;
            right--;
        }
    }
}
```

对于解法一，设置一个i，如果i对应数大于i-1，将i+1到len-1的数字做reverse操作，相较于sort操作复杂度由n^2^变为n
