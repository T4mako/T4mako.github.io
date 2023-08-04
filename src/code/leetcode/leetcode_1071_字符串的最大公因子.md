---
date: 2023-08-04
category: 
  - 算法
tag: 
  - 数组
  - 数学
order: 1071
---
# 1071_字符串的最大公因子


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/greatest-common-divisor-of-strings/description/?envType=study-plan-v2&envId=leetcode-75)

解法思路：使用字符串辗转相除，如：
str1 = "ABABABAB"  
str2 = "ABABAB"  
1. str1 / str2 余 "AB"  
   str1 = "ABABAB" `原str2`
   str2 =  "AB"
2. str1 / str2 余 ""
   return str2


```java
class Solution {
        public static String gcdOfStrings(String str1, String str2) {
        // 相同直接返回
        if(str1.equals(str2)) return str1;
        // 循环操作
        while (!Objects.equals(str2, "")){
            String temp = str2;
            String res = strDivide(str1, str2);
            if(res.equals("#")) return "";
            if(res.equals("")) return str2;
            str1 = temp;
            str2 = res;
        }
        return "";
    }
    // 字符串除法
    public static String strDivide(String str1,String str2){
        for (int i = 0; i < str1.length(); i++) {
            // 长度不够，返回余数
            if(i + str2.length() > str1.length()) return str1.substring(i);
            // temp 为截取 str2 长度相等的字符串
            String temp = str1.substring(i,i + str2.length());
            // 判断 temp 与 str2 是否相同
            if(temp.equals(str2)) i += str2.length() - 1;
            // 不同返回不可被除的符号"#"
            else return "#";
        }
        // 返回 "" 表示能整除
        return "";
    }
}
```

