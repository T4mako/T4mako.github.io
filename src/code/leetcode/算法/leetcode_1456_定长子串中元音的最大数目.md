---
article: false
date: 2023-08-08
category: 
  - 算法
tag: 
  - 字符串
  - 滑动窗口
order: 1456
---

# 1456. 定长子串中元音的最大数目



<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：  
- 使用滑动窗口，先计算 下标 0.到 k（不包含k） 的元音字符数。让 left 指向 0，right 指向 k。
- 移动 left 和 right，更新 res
  ```java
  if(c[s.charAt(right++)] != 0){count++;}
  if(c[s.charAt(left++)] != 0 ){count--;}
  res = Math.max(count,res);
  ```

```java
class Solution {
    public int maxVowels(String s, int k) {
            char[] c = new char[127];
            c['a'] = 'a';c['e'] = 'e';c['i'] = 'i';c['o'] = 'o';c['u'] = 'u';
            int res = 0;
            int count = 0;
            // k 大于 s的长度的情况
            if(s.length() <= k){
                for (int i = 0; i < s.length(); i++) {
                    if(c[s.charAt(i)] != 0){
                        res++;
                    }
                }
                return res;
            }
            // 先计算 0 - k 的元音字符数
            for (int i = 0; i < k; i++) {
                if(c[s.charAt(i)] != 0){
                    count++;
                }
            }
            res = count;
            int left = 0;
            int right = k;
            // 移动 left 和 right
            while(right < s.length()){
                if(c[s.charAt(right++)] != 0){count++;}
                if(c[s.charAt(left++)] != 0 ){count--;}
                res = Math.max(count,res);
            }
            return res;
        }
}
```