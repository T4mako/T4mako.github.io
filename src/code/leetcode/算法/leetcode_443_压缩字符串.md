---
 
date: 2023-08-05
category: 
  - 算法
tag: 
  - 双指针
  - 字符串
---

# 443_压缩字符串

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/string-compression/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：
- 双指针（快慢指针）

```java
class Solution {
    public static int compress(char[] chars) {
        int res = 0;
        int left = 0;
        int right = 1;
        int index = 0; // 修改数组
        for (; right < chars.length; right++,left++) {
            char leftChar = chars[left];
            char rightChar = chars[right];
            // left 与 right 不相等
            if(leftChar != rightChar){
                res++;  // 字符站一位
                chars[index++] = chars[left];
                if(right - left != 1) { // 统计到多个
                    String temp = String.valueOf(right - left);
                    for (int i = 0; i < temp.length(); i++) {
                        chars[index++] = temp.charAt(i);
                        res++;
                    }
                }
                left = right -1; // 移动 left
            // left 与 right相等
            } else{
                // right 右移， left 不动
                left--;
            }
        }
        // 最后越界的一次情况
        if(left == chars.length - 1){
            // left 是不同字符
            res++;
            chars[index] = chars[left];
        }
        else {
            res++;
            chars[index++] = chars[left];
            String temp = String.valueOf(right - left);
            for (int i = 0; i < temp.length(); i++) {
                chars[index++] = temp.charAt(i);
                res++;
            }
        }
        return res;
    }
}
```