---
category: 
  - 算法
tag: 
  - 字符串
  - 双指针
  - 字符串匹配
---

# 028_找出字符串中第一个匹配项的下标

<Badge text="简单" type="tip" vertical="middle" />


```java
class Solution {
    public int strStr(String haystack, String needle) {
        //模式串长度
        int len = needle.length();
        //目标串长度
        int l = haystack.length();
        //next数组
        int[] next = new int[len];
        //next数组首位为-1,第二位为0
        next[0] = -1;
        int nextval[] = new int[len];
        int j = 0,k = -1;
        nextval[0] = -1;
        while(j < len - 1){
            if(k == -1 || needle.charAt(j) == needle.charAt(k)) {
                j++;
                k++;
                if(needle.charAt(j) != needle.charAt(k)) nextval[j] = k;
                else nextval[j] = nextval[k];
            }else {
                k = nextval[k];
            }
        }

        int i;
        for (i = 0,j = 0; i < l; i++) {
            //当j>0时，不断比较回溯
            while(j > 0 && haystack.charAt(i) != needle.charAt(j)){
                j = nextval[j];
            }
            if(j == -1){
                j++;
                continue;
            }
            //相等，移动模式串指针
            if(haystack.charAt(i) == needle.charAt(j)){
                j++;
            }
            //满足return条件
            if(j == len){
                return i + 1 - len;
            }
        }
        return -1;
    }
}
```

