---
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 动态规划
date: 2024-02-14
---

# 189. 轮转数组
<Badge text="中等" type="warning" vertical="middle" />

```java
class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        int[] ints = Arrays.copyOfRange(nums, nums.length - k,nums.length);
        int[] ints1 = Arrays.copyOfRange(nums, 0, nums.length - k);
        for (int i = 0; i < nums.length; i++) {
            if(i < ints.length){
                nums[i] = ints[i];
            }else {
                nums[i] = ints1[i - ints.length];
            }
        }
    }
}
```