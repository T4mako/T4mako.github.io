# 009_回文数

> tag：数学
>
> 难度：简单

> 题目：
>
> 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
>
> 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
>
> 例如，121 是回文，而 123 不是。
>
>
> 示例 1：
>
> 输入：x = 121
> 输出：true
> 示例 2：
>
> 输入：x = -121
> 输出：false
> 解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
> 示例 3：
>
> 输入：x = 10
> 输出：false
> 解释：从右向左读, 为 01 。因此它不是一个回文数。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/palindrome-number
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：

```java
class Solution {
    public boolean isPalindrome(int x) {
        if(x < 0){
            return false;
        }
        int y = x;
        int z = 0;
        while(x != 0){
            z = z * 10 + (x % 10);
            x /= 10;
        }
        return z == y;
    }
}
```

通过for循环遍历每次循环的个位数再与之前处理好的数*10相加，得到的数与原始数据比较，此算法的时间复杂度为O(n)