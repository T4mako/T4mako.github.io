---
article: false
date: 2023-08-08
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
---

# 2215. 找出两数组的不同


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：  
题目中说明`1000 <= nums1[i], nums2[i] <= 1000`，定义两个长度为 2001 的数组`n1`,`n2`，遍历 `nums1` 与 `nums2`，将对应数组所对应下标的值修改为1  
遍历`n1`,`n2`。将同下标数不同的值存入对应`list`


```java
public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        List<Integer> list1 = new ArrayList<>();
        List<Integer> list2 = new ArrayList<>();
        int[] n1 = new int[2001];
        int[] n2 = new int[2001];
        for (int i = 0; i < Math.max(nums1.length, nums2.length); i++) {
            if(i < nums1.length) n1[nums1[i] + 1000] = 1;
            if(i < nums2.length) n2[nums2[i] + 1000] = 1;
        }
        for (int i = 0; i < n1.length; i++) {
            if(n1[i] == 1 && n2[i] == 0){list1.add(i - 1000);}
            if(n1[i] == 0 && n2[i] == 1){list2.add(i - 1000);}
        }
        return Arrays.asList(list1, list2);
    }
```