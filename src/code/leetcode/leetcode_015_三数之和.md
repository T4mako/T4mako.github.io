# 015_三数之和

> tag：数组、双指针、排序
>
> 难度：中等

> 题目：
>
> 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
>
> 注意：答案中不可以包含重复的三元组。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/3sum
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法一：

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList();
        HashMap<Integer,Integer> map = new HashMap();
        Arrays.sort(nums);
        if(nums[0] == 0 && nums[nums.length-1] == 0){
            List list = new ArrayList();
            list.add(0);
            list.add(0);
            list.add(0);
            res.add(list);
            return res;
        }
        if(nums[0] > 0 || nums[nums.length-1] < 0){
            return res;
        }
        for(int i = 0;i < nums.length-2;i++){
            if(nums[i] > 0){
                break;
            }
            if(i > 0 && (nums[i] == nums[i-1])){
                continue;
            }
            int target = -nums[i];
            map.clear();
            map.put(nums[i+1],i+1);
            for(int j = i+2;j < nums.length;j++){
                if(map.containsKey(target-nums[j])){
                    int k = map.get(target-nums[j]);
                    List list = new ArrayList(3);
                    list.add(nums[k]);
                    list.add(nums[j]);
                    list.add(nums[i]);
                    Collections.sort(list);
                    res.add(list);
                }
                map.put(nums[j],j);
            }
        }
        for(int i = 0;i < res.size()-1;i++){
            for(int j = i + 1;j < res.size();j++){
                if(res.get(i).equals(res.get(j))){
                    res.remove(j);
                    j--;
                }
            }
        }
        return res;
    }
}
```

传入数组排序，判断全为0，最小数为正数的特殊情况，然后使用for循环找到第一个数，通过HashMap与两数之和的方法求第三个数，最后放入一个数组中，再对数组进行判重，有重复则删除，最后返回最终数组

## 解法二：

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList();
        Arrays.sort(nums);
        if(nums[0] == 0 && nums[nums.length-1] == 0){
            List list  = new ArrayList();
            list.add(0);
            list.add(0);
            list.add(0);
            res.add(list);
            return res;
        }
        if(nums[0] > 0 || nums[nums.length-1] < 0){
            return res;
        }
        int left,right;
        for(int i = 0;i < nums.length - 2;i++){
            if(i > 0 && nums[i] == nums[i-1]){
                continue;
            }
            left = i + 1;
            right = nums.length-1;
            while(left < right){
                if((nums[i] + nums[left] + nums[right]) == 0){
                    if((left-1>=0) && (right+1<=nums.length-1) && nums[left] == nums[left-1] && nums[right] == nums[right+1]){
                        left++;
                        right--;
                        continue;
                    }
                    List list  = new ArrayList();
                    list.add(nums[i]);
                    list.add(nums[left]);
                    list.add(nums[right]);
                    res.add(list);
                    left++;
                    right--;
                }else if((nums[i] + nums[left] + nums[right]) > 0){
                    right--;
                }else if((nums[i] + nums[left] + nums[right]) < 0){
                    left++;
                }
            }
        }
        return res;
    }
}
```

传入数组排序，判断全为0，最小数为正数的特殊情况，通过for循环，定义两个指针left，right，判断for循环遍历的数和两个指针所指的数的和是否为0，如果为0，添加到list中，如果小于0，left指针右移，如果大于0，right指针左移。如果和为0，左右指针均移动，如果移动到的数和上一次相同，继续移动。最后返回结果数组

## 解法二优化:

```java
public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList();
        Arrays.sort(nums);
        if(nums[0] == 0 && nums[nums.length-1] == 0){
            List list  = new ArrayList();
            list.add(0);
            list.add(0);
            list.add(0);
            res.add(list);
            return res;
        }
        if(nums[0] > 0 || nums[nums.length-1] < 0){
            return res;
        }
        int left,right;
        for(int i = 0;i < nums.length - 2;i++){
            if(nums[i] > 0){
                break;
            }
            if(i > 0 && nums[i] == nums[i-1]){
                continue;
            }
            left = i + 1;
            right = nums.length-1;
            while(left < right){
                int target = nums[i] + nums[left] + nums[right];
                if(target == 0){
                    while(left < right && nums[left+1] == nums[left]) ++left;
                    while (left < right && nums[right-1] == nums[right]) --right;
                    List list  = new ArrayList();
                    list.add(nums[i]);
                    list.add(nums[left]);
                    list.add(nums[right]);
                    res.add(list);
                    left++;
                    right--;
                }else if(target > 0){
                    right--;
                }else{
                    left++;
                }
            }
        }
        return res;
    }
```

在判断left+1与right-1与left和right所指的数是否相同时，在内层通过while循环判断，这样只保留最后一个相同的left和right，在外层for循环时，如果i指向的数大于0，表示不会有匹配的结果，直接return即可