---
category: 
  - 算法
tag: 
  - 数组
  - 双指针
  - 排序
---
# 016_最接近的三数之和

<Badge text="中等" type="warning" vertical="middle" />

## 解法一：

```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        int res = 65535,sum;
        Arrays.sort(nums);
        int len = nums.length;
        int left,right;
        for (int i = 0; i < len - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]){
                continue;
            }
            left = i + 1;
            right = len - 1;
            while(left < right){
                sum = nums[i] + nums[left] + nums[right];
                if(sum == target){
                    return target;
                }
                if(left + 1 == right){
                    res = Math.abs(res - target) > Math.abs(sum - target) ? sum : res;
                    break;
                }
                int leftSum = Math.abs((nums[i] + nums[left + 1] + nums[right]) - target);
                int rightSum = Math.abs((nums[i] + nums[left] + nums[right - 1]) - target);
                int abs = Math.abs(sum - target);
                if(leftSum <= abs && leftSum <= rightSum){
                    left++;
                }else if(rightSum <= abs && rightSum <= leftSum){
                    right--;
                }else{
                    res = Math.abs(res - target) > Math.abs(sum - target) ? sum : res;
                    break;
                }
            }
        }
        return res;
    }
}
```

创建一个int型res，赋值为一个大数，获取相同数第一次出现的位置，定义一个left，right，left=i+1，判断现在的总和是否等于想要的值，若是，返回这个数，若不是，判断left和right是否相邻，相邻返回res较小的结果，一般情况下，判断left+1，和right-1，与另一个不动的指针判断那个更接近想要的值，该指正移动。

## 解法一优化：

```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int res = nums[0] + nums[1] + nums[2];
        int len = nums.length;
        int left,right,sum;
        for (int i = 0; i < len - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]){
                continue;
            }
            left = i + 1;
            right = len - 1;
            while(left < right){
                sum = nums[i] + nums[left] + nums[right];
                if(Math.abs(sum - target) < Math.abs(res - target)){
                    res = sum;
                }
                if (sum > target) {
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    return target;
                }
            }
        }
        return res;
    }
}
```

#### 解法思路：

直接将初始res，定义为头三数之和，在while循环中，直接判断和与目标值的大小，对应指针移动

