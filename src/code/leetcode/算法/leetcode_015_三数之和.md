---
category: 
  - 算法
tag: 
  - 数组
  - 双指针
  - 排序
---

# 015_三数之和

<Badge text="中等" type="warning" vertical="middle" />

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

传入数组排序，判断全为 0，最小数为正数的特殊情况，然后使用 for 循环找到第一个数，通过 HashMap 与两数之和的方法求第三个数，最后放入一个数组中，再对数组进行判重，有重复则删除，最后返回最终数组

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

传入数组排序，判断全为 0，最小数为正数的特殊情况，通过for循环，定义两个指针 left，right，判断 for 循环遍历的数和两个指针所指的数的和是否为 0，如果为 0，添加到 list 中，如果小于0，left 指针右移，如果大于 0，right 指针左移。如果和为 0，左右指针均移动，如果移动到的数和上一次相同，继续移动。最后返回结果数组

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

在判断 left+1 与 right-1 与 left 和 right 所指的数是否相同时，在内层通过 while 循环判断，这样只保留最后一个相同的 left 和 right，在外层 for 循环时，如果 i 指向的数大于 0，表示不会有匹配的结果，直接 return 即可