# 028_找出字符串中第一个匹配项的下标

> tag：双指针、字符串、字符串匹配
>
> 难度：中等

> 题目：
>
> 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。
>
> 示例 1：
>
> 输入：haystack = "sadbutsad", needle = "sad"
> 输出：0
> 解释："sad" 在下标 0 和 6 处匹配。
> 第一个匹配项的下标是 0 ，所以返回 0 。
> 示例 2：
>
> 输入：haystack = "leetcode", needle = "leeto"
> 输出：-1
> 解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：

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

