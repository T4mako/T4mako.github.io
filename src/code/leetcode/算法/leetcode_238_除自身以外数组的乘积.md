---
date: 2023-08-03
category: 
  - 算法
tag: 
  - 数组
  - 前缀和
---

# 238_除自身以外数组的乘积

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=leetcode-75)

原数组：       [1       2       3       4]  
左部分的乘积：   1       1      1*2    1*2*3  
右部分的乘积： 2*3*4    3*4      4      1  
结果：        1*2*3*4  1*3*4   1*2*4  1*2*3*1  

建立两个左右数组，通过两次for遍历得出结果

```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int len = nums.length;
        // 左右数组
        int[] left = new int[len];
        int[] right = new int[len];
        int[] res = new int[len];
        left[0] = 1;
        right[len - 1] = 1;
        // 计算左右数组对应的值
        for (int i = 1 ; i < len; i++) {
            left[i] = left[i - 1] * nums[i - 1];
            right[len -1 - i] = right[len - i] * nums[len - i];
        }
        // 相乘为结果
        for (int i = 0; i < len; i++) {
            res[i] = left[i] * right[i];
        }
        return res;
    }
}
```