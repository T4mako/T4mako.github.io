---
date: 2024-02-20
category: 
  - 算法
tag: 
  - 数组
  - 排序
---

# 274. H 指数

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/h-index/description/)

解法思路：逆序排序，遍历，比较遍历的值与下标的值

```java
class Solution {
    public int hIndex(int[] citations) {
        int res = 1;
        Arrays.sort(citations);
        for(int i = citations.length - 1;i >= 0;i--){
            if(citations[i] >= res){
                res++;
            }else{
                return --res;
            }
        }
        return citations.length;
    }
}
```