---
date: 2023-08-05
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
  - 双指针
  - 排序
order: 1679
---



# 1679_K 和数对的最大数目

<Badge text="中等" type="warning" vertical="middle" />

## 解法一：哈希表

讲数组中所有的数添加到哈希表中，key存储数字，value存储个数，通过找对应key和k-key的个数判断执行几次操作

```java
class Solution {
    public int maxOperations(int[] nums, int k) {
        int flag = k / 2;
        int res = nums.length;
        HashMap<Integer,Integer> map = new HashMap<>();
        for (int num : nums) {
            Integer integer = map.containsKey(num) ? map.put(num, map.get(num) + 1) : map.put(num, 1);
        }
        Set<Integer> set = map.keySet();
        for (Integer integer : set) {
            if (integer > flag) continue;
            if(integer == k - integer) res -= map.get(integer) / 2 * 2;
            else if(map.containsKey(k - integer)) res -= Math.min(map.get(integer),map.get(k - integer)) * 2;
        }
        return (nums.length - res) / 2;
    }
}
```

## 解法二：排序 + 双指针
先将数组进行排序，通过首尾双指针遍历数组，判断 val = nums[left] + nums[right] 与 k 的关系
- val > k; right--;
- val < k; left--;
- val == k; { left--;right--;res++}

```java
class Solution {
    public int maxOperations(int[] nums, int k) {
        Arrays.sort(nums);
        int res=0;
        int left=0;
        int right=nums.length-1;
        while(left < right){
            long val=nums[left]+nums[right];
            if(val > k) --right;
            else if(val < k) ++left;
            else{ ++res; ++left; --right;}
        }
        return res;
    }
}
```

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function(nums, k) {
    nums.sort((a,b) => a - b);
    let res = 0;
    let left = 0;
    let right = nums.length - 1;
    while(left < right){
        if(nums[left] + nums[right] > k) right--;
        else if(nums[left] + nums[right] < k) left++;
        else{
            left++;right--;
            res++;
        }
    }
    return res;
};
```