# 014_最长公共前缀

> tag：字典树、字符串
>
> 难度：简单

> 题目：
>
> 编写一个函数来查找字符串数组中的最长公共前缀。
>
> 如果不存在公共前缀，返回空字符串 ""。
>
> 示例 1：
>
> 输入：strs = ["flower","flow","flight"]
> 输出："fl"
> 示例 2：
>
> 输入：strs = ["dog","racecar","car"]
> 输出：""
> 解释：输入不存在公共前缀。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/longest-common-prefix
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法一：

```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 1) {
            return strs[0];
        }
        int min = 201;
        for (int i = 0; i < strs.length; i++) {
            if(strs[i] == ""){
                return "";
            }
            min = min < strs[i].length() ? min : strs[i].length();
        }
        int left = 0;
        int right = min - 1;
        boolean flag;
        int mid = 0;
        while (left <= right) {
            flag = true;
            mid = (left + right) / 2;
            String str = strs[0].substring(left,mid+1);
            for (int i = 0; i < strs.length; i++) {
                String temp = strs[i].substring(left,mid+1);
                if (!str.equals(strs[i].substring(left,mid+1))) {
                    flag = false;
                    break;
                }
            }
            if(left == right){
                if(flag){
                    return strs[0].substring(0, mid+1);
                }else {
                    if(left == 0){
                        return "";
                    }
                    return strs[0].substring(0, mid);
                }
            }
            if (flag) {
                left = mid + 1 > right ? right : mid + 1;
            } else {
                right = mid - 1 < left ? left : mid -1;
            }
        }
        return "";
    }
}
```

定义一个left和right，通过二分查找的思想，取mid=（left+right）/2，从left开始判断到mid的字符串是否都相等，如果都相等，left移动到mid+1，如果不相等，right移动到mid-1，在进行判断。

## 解法二：

```java
class Solution {
    static String s = "";
    public static String longestCommonPrefix(String[] strs) {
        if(strs.length == 0){
            return "";
        }
        if(strs.length == 1){
            return strs[0];
        }
        s = strs[0];
        int i = 1;
        while(i < strs.length){
            common(s,strs[i]);
            i++;
        }
        return s;
    }
    public static String common(String s1,String s2){
        int res = 0;
        int len = s1.length() > s2.length() ? s2.length() : s1.length();
        for(int i = 0;i < len;i++){
            if(s1.charAt(i) == s2.charAt(i)){
                res++;
            }else{
                break;
            }
        }
        s = s.substring(0,res);
        return s;
    }
}
```

#### 解法思路

先通过第一个字符串与第二个字符串比较，得出最短字符串，再通过得出的最短字符串与后面的字符串注意比较，最后的最短字符串为所求结果