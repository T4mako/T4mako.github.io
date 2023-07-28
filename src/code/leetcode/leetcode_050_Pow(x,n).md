---
category: 
  - 算法
tag: 
  - 递归
  - 数学
---

# 050_Pow(x,n)

<Badge text="中等" type="warning" vertical="middle" />

## 解法一：直接递归

```java
class Solution {
    public double myPow(double x, int n) {
        if(x > -0.5 && x < 0.5 && n > 50){
            return 0;
        }
        if(x == 1){
            return 1;
        }
        if(x == -1){
            return n % 2 == 0 ? 1 : -1;
        }
        if(n == 0){
            return 1;
        }
        if(n == 1){
            return x;
        }
        if(n == -1){
            return 1.0/x;
        }
        int a = n / 2;
        int b = n - a;
        return myPow(x,a) * myPow(x,b);
    }
}
```

通过判断一些特殊情况后直接将n二分，递归调用函数，直到n=1或-1时返回结果




## 解法二：快速乘

```java
class Solution {
    public double myPow(double x, int n) {
        if(n == 0) return 1.0;
        if (x == 1) return 1;
        if(x == -1) return n % 2 == 0 ? 1 : -1;
        double res = x;
        int count = 1;
        if(n < 0){
            res = 1.0 / res;
            count = -1;
        }
        while(Math.abs(count * 2) <= Math.abs(n)){
            res *= res;
            if(res == 0) return 0;
            count *= 2;
        }
        return Math.abs(n) - count == 0 ? res : res * myPow(x,n - count);
    }
}
```


先判断n=0,-1,1的特殊情况，定义一个res等于x，如果n为负的，res = 1.0/res，通过while循环一直倍乘，如果倍数太大，递归调用函数，最后返回结果