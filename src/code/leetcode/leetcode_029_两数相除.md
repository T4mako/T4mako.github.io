# 029_两数相除

> tag：位运算、数学
>
> 难度：中等

> 题目：
>
> 给你两个整数，被除数 dividend 和除数 divisor。将两数相除，要求 不使用 乘法、除法和取余运算。
>
> 整数除法应该向零截断，也就是截去（truncate）其小数部分。例如，8.345 将被截断为 8 ，-2.7335 将被截断至 -2 。
>
> 返回被除数 dividend 除以除数 divisor 得到的 商 。
>
> 注意：假设我们的环境只能存储 32 位 有符号整数，其数值范围是 [−231,  231 − 1] 。本题中，如果商 严格大于 231 − 1 ，则返回 231 − 1 ；如果商 严格小于 -231 ，则返回 -231 。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/divide-two-integers
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：

```java
class Solution {
    public int divide(int dividend, int divisor) {
        if(dividend == -2147483648 && divisor == -1){
            return 2147483647;
        }
        if(divisor == 1){
            return dividend;
        }
        if(divisor == -1){
            return -dividend;
        }
        boolean flag = true;
        if(dividend < 0 && divisor > 0 || dividend > 0 && divisor < 0){
            flag = false;
        }
        int LIMIT = -1073741824;
        int a = dividend < 0 ? dividend : -dividend;
        int b = divisor < 0 ? divisor : -divisor;
        int res = 0;
        while(a <= b){
            int c = b,d = -1;
            while(c >= LIMIT && d >= LIMIT && c >= a - c){
                c += c;
                d += d;
            }
            a -= c;
            res += d;
        }
        return flag ? -res : res;
    }
}
```

根据题意，先将特殊情况列出，再对于除数为1，-1的情况讨论。对于其他情况，定义一个LIMIT为-1073741824，定义一个flag判断返回的值为正数还是负数。将a，b都赋值为负数，通过倍加的方法将a不断扩大，当c，d都大于等于LIMIT并且c>a-c时，此时符合倍加条件，用来记录的d和c都倍加，如果不满足条件。将a-=c，a变大，res+=d，res增加响应的倍值。最后通过flag返回res。