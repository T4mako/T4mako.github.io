---
date: 2022-02-21
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
  - 分治
  - 排序
---

# 162. 寻找峰值


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/majority-element/submissions/503631333/)


```java
class Solution {
    public int majorityElement(int[] nums) {
        int x = 0;int votes = 0;
        for(int num : nums){
            if(votes == 0){
                x = num;
            }
            votes += num == x ? 1 : -1;
        }
        return x;
    } 
}
```