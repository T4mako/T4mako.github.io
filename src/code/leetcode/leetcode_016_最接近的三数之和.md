# 016_最接近的三数之和

> tag：数组、双指针、排序
>
> 难度：中等

> 题目：
>
> 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
>
> 返回这三个数的和。
>
> 假定每组输入只存在恰好一个解。
>
> 示例 1：
>
> 输入：nums = [-1,2,1,-4], target = 1
> 输出：2
> 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
> 示例 2：
>
> 输入：nums = [0,0,0], target = 1
> 输出：0
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/3sum-closest
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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

