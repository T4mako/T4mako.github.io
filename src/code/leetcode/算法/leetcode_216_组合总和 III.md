---
date: 2023-08-31
category: 
  - 算法
tag: 
  - 数组
  - 回溯
---

# 216. 组合总和 III

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/combination-sum-iii/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：   
建立递归函数，在上一次递归所去得的数的后一位开始取数  
剪枝的条件为取得的数超过 n，取的数个数大于 k  

:::code-tabs
@tab Java
```java
class Solution {

    List<List<Integer>> res = new ArrayList<>();

    public List<List<Integer>> combinationSum3(int k, int n) {
        combine(k,n,1,new ArrayList<Integer>(),0);
        return res;
    }

    public void combine(int k,int n,int start,List<Integer> list,int sum){
        int len = list.size();
        // 长度太长，没有额外可选数字，直接返回
        if(len > k || start > 9) return;
        // 遍历
        for (int i = start; i < 10; i++) {
            // 成立的情况
            if(sum + i == n && list.size() == k - 1){
                List<Integer> l = new ArrayList<>(list);
                l.add(i);
                res.add(l);
                break;
            } else if (sum + i >= n) { //剪枝
                break;
            
            } else {// 递归
                List<Integer> l = new ArrayList<>(list);
                l.add(i);
                combine(k,n,i + 1,l,sum + i);
            }
        }
    }
}
```
:::