---
category: 
  - 算法
tag: 
  - 动态规划
  - 字符串

article: false
---

# 005. 最长回文子串

<Badge text="中等" type="warning" vertical="middle" />


## 解法一：中心扩散

```java
public  String longestPalindrome(String s) {
        int n = s.length();
        if(n == 1){
            return s;
        }
        String res;
        for(int i = n;i > 0;i--){
            for(int j = 0;j <= n - i;j++){
                res = s.substring(j,i + j);
                StringBuilder str = new StringBuilder();
                str.append(res);
                if(str.reverse().toString().equals(res)){
                    return res;
                }
            }
        }
        return null;
        int n = s.length();
        if (n == 1) {
            return s;
        }
        if(n == 2){
            if(s.charAt(0) == s.charAt(1)){
                return s;
            }else {
                return s.substring(0,1);
            }
        }
        int len = 0;
        int left = 0;
        int right = 0;
        String res = "";
        for (int i = 1; i < n ; i++) {
            left = i;
            right = i;
            String s1 = "",s2 = "" ;
            s1 = isPalindrome(s,left,right);
            if(s.charAt(left-1) == s.charAt(right)){
                s2 = isPalindrome(s,left-1,right);
            }
            if(len < s1.length()){
                len = s1.length();
                res = s1;
            }
            if(len < s2.length()){
                len = s2.length();
                res = s2;
            }
        }
        return res;
    }
    public static String isPalindrome(String s,int left,int right){
        int n = s.length();
        int len = right - left + 1;
        String res = s.substring(left,right + 1);
        while(left >= 0 && right <= n-1){
            if(s.charAt(left) != s.charAt(right))
                break;
            if((right - left + 1) > len){
                len = right - left + 1;
                res = s.substring(left,right + 1);
            }
                left--;
                right++;
            }
        return res;
    }
```

创建一个方法isPalindrome，用于返回当前字符所处位置的最长回文子串，通过两个指针left，right，对当前所指字符分别向左，右移动，如果两处所指的字符不同，则退出循环，如果相同继续执行，在longestPalindrome方法中，通过for循环不断遍历字符，并记录最长的那串字符。

## 解法一优化：

```java
public static String longestPalindrome(String s){
        if (s == null || s.length() < 1) {
            return "";
        }
        int len ,start = 0,end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = isPalindrome2(s, i, i);
            int len2 = isPalindrome2(s, i, i+1);
            len = Math.max(len1,len2);
            if(len > (end - start)){
                start = i - (len - 1)/2;
                end = i + len/2;
            }
        }
        return s.substring(start,end + 1);
    }
    public static int isPalindrome(String s,int left,int right){
        while(left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)){
            left--;
            right++;
        }
        return right-left-1;
    }
```

isPalindrome方法中传入字符串s，left，right后，判断left，right是否越界，并且所指字符是否相同，返回right到left的值，并在longestPalindrome方法中计算字符的位置



