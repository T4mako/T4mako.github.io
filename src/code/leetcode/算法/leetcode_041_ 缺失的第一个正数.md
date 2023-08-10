---
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
---

# 041_缺失的第一个正数

<Badge text="困难" type="danger" vertical="middle" />

## 解法一：

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        int len = nums.length;
        HashSet<Integer> set = new HashSet<>();
        for (int i = 0; i < len; i++) {
            if(nums[i] <= 0){
                continue;
            }
            set.add(nums[i]);
        }
        for (int i = 1; i < Integer.MAX_VALUE; i++) {
            if(!set.contains(i)){
                return i;
            }
        }
        return 0;
    }
}
```


建立一个set，存放所有大于0的数字，在通过一次循环从1判断该数字是否存在得出结果


## 解法二：

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        int len = nums.length;
        int[] temp = new int[len];
        for (int i = 0; i < len; i++) {
            if(nums[i] <= 0 || nums[i] > len) continue;
            temp[nums[i] - 1] = 1;
        }
        for (int i = 0; i < len; i++) {
            if(temp[i] == 0) return i + 1;
        }
        return len + 1;
    }
}
```


遍历一次数组把大于等于1的和小于数组大小的值放到原数组对应位置，然后再遍历一次数组查当前下标是否和值对应，如果不对应那这个下标就是答案，否则遍历完都没出现那么答案就是数组长度加1。