# 018_四数之和

> tag：数组、双指针、排序
>
> 难度：中等

> 题目：
>
> 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
>
> 0 <= a, b, c, d < n
> a、b、c 和 d 互不相同
> nums[a] + nums[b] + nums[c] + nums[d] == target
> 你可以按 任意顺序 返回答案 。
>
> 示例 1：
>
> 输入：nums = [1,0,-1,0,-2,2], target = 0
> 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
> 示例 2：
>
> 输入：nums = [2,2,2,2,2], target = 8
> 输出：[[2,2,2,2]]
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/4sum
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法一：

```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        int len = nums.length;
        int i,j,left,right;
        long tar;
        for (i = 0; i < len - 3; i++) {
            if(i > 0 && nums[i] == nums[i - 1]){
                continue;
            }
            for(j = i + 1;j < len - 2;j++){
                if(j > i + 1 && nums[j] == nums[j - 1]){
                    continue;
                }
                tar = target - (long)nums[i] - (long)nums[j];
                left = j + 1;
                right = len - 1;
                while(left < right){
                    if(nums[left] + nums[right] < tar){
                        left++;
                    }else if(nums[left] + nums[right] > tar){
                        right--;
                    }else {
                        ArrayList<Integer> temp = new ArrayList();
                        temp.add(nums[i]);
                        temp.add(nums[j]);
                        temp.add(nums[left]);
                        temp.add(nums[right]);
                        res.add(temp);
                        while(left < len - 2 && nums[left] == nums[left + 1]){
                            left++;
                        }
                        left++;
                        while(right > j - 1 && nums[right] == nums[right-1]){
                            right--;
                        }
                        right--;
                    }
                }

            }
        }
        return res;
    }
}
```

通过一个for循环依此遍历重复数据的第一个作为i，第二个for循环从i+1开始找到第二个数，同样为重复数出现的第一个，在剩下的数中，使用left，right指针分别指向j+1和len-1指向的元素，判断元素之和与target的关系，如果四数之和大于target，right--，否则left++，在添加元素时，将所有等于left，right所指向的数全过滤掉

## 解法一优化：

```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> res = new ArrayList<>();
        if (nums == null || nums.length < 4) {
            return res;
        }
        Arrays.sort(nums);
        int len = nums.length;
        int i,j,left,right;
        long tar;
        for (i = 0; i < len - 3; i++) {
            if(i > 0 && nums[i] == nums[i - 1]){
                continue;
            }
            if((long)nums[i] + nums[i+1] + nums[i+2] + nums[i+3] > target){
                break;
            }
            if((long)nums[i] + nums[len - 3] + nums[len - 2] + nums[len - 1] < target){
                continue;
            }
            for(j = i + 1;j < len - 2;j++){
                if(j > i + 1 && nums[j] == nums[j - 1]){
                    continue;
                }
                if((long)nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target){
                    break;
                }
                if((long)nums[i] + nums[j] + nums[len - 2] + nums[len - 1] < target){
                    continue;
                }
                tar = target - (long)nums[i] - (long)nums[j];
                left = j + 1;
                right = len - 1;
                while(left < right){
                    if(nums[left] + nums[right] < tar){
                        left++;
                    }else if(nums[left] + nums[right] > tar){
                        right--;
                    }else {
                        ArrayList<Integer> temp = new ArrayList();
                        temp.add(nums[i]);
                        temp.add(nums[j]);
                        temp.add(nums[left]);
                        temp.add(nums[right]);
                        res.add(temp);
                        while(left < len - 2 && nums[left] == nums[left + 1]){
                            left++;
                        }
                        left++;
                        while(right > j - 1 && nums[right] == nums[right-1]){
                            right--;
                        }
                        right--;
                    }
                }
            }
        }
        return res;
    }
}
```

在获取第一个数时判断最小的四数之和是否大于target，如果大于，break；若果最大的四数之和小于target，continue，对于获取第二个数时做同样的操作，此时算法的遍历次数将大大降低。