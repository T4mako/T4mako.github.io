---
category: 
  - 算法
tag: 
  - 位运算
  - 数学
---


# 029_两数相除

<Badge text="中等" type="warning" vertical="middle" />


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