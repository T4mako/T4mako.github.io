---
date: 2023-08-10
category: 
  - 算法
tag: 
  - 字符串
  - 哈希表
  - 排序
order: 1657
---

# 1657. 确定两个字符串是否接近


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/determine-if-two-strings-are-close/description/?envType=study-plan-v2&envId=leetcode-75)

解法：  
建立两个长度为 26 的数组，存放对应字母的出现次数。   
判断是否有在 `word1` 中出现而不在 `word2` 出现的字符，若有返回 `false`
对两个数组排序，顺序比较对应的数是否相等

```java
class Solution {
        public boolean closeStrings(String word1, String word2) {
        int[] nums1 = new int[26];
        int[] nums2 = new int[26];
        for (char c : word1.toCharArray()) nums1[c - 'a']++;
        for (char c : word2.toCharArray()) nums2[c - 'a']++;
        for (int i = 0; i < 26; i++) {
            if(nums1[i] + nums2[i] == 0) continue;
            if(nums1[i] == 0 || nums2[i] == 0) return false;
        }
        Arrays.sort(nums1);
        Arrays.sort(nums2);
        for (int i = 0; i < 26; i++) {
            if(nums1[i] != nums2[i]) return false;
        }
        return true;
    }
}
```