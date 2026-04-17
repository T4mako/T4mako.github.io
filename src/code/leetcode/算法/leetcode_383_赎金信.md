---
 
date: 2024-03-01
category: 
  - 算法
tag: 
  - 哈希表
  - 字符串
---



# 383. 赎金信

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/ransom-note/description/?envType=study-plan-v2&envId=top-interview-150)


解法思路：通过数组计数，模拟 hash

```java
class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        int[] cnt = new int[26];
        for(char c : magazine.toCharArray()){
            cnt[c-'a']++;
        }
        for(char c: ransomNote.toCharArray()){
            if(--cnt[c-'a'] < 0){
                return false;
            }
        }
        return true;
    }
}
```