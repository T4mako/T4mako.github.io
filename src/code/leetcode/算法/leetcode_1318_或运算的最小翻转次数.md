---
date: 2023-09-14
category: 
  - 算法
tag: 
  - 位运算
  - 数组 
article: true
---

# 1318. 或运算的最小翻转次数


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/minimum-flips-to-make-a-or-b-equal-to-c/submissions/?envType=study-plan-v2&envId=leetcode-75)

解法：
使用预算将每个数的最后一位取出，然后将原本的数字右移一位  
判断最后一位的不同情况，处理 res

:::code-tabs
@tab Java
```java
class Solution {
    public int minFlips(int a, int b, int c) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int num_a = a & 1; a >>= 1; // 将最后一位取出
            int num_b = b & 1; b >>= 1; 
            int num_c = c & 1; c >>= 1;
            if(num_a == 0 && num_b == 0 && num_c == 1) res += 1;
            else if(num_a == 1 && num_b == 1 && num_c == 0) res += 2;
            else if(num_c == 0 && num_a + num_b == 1) res += 1;
        }
        return res;
    }
}
```
@tab Ts
```ts
function minFlips(a: number, b: number, c: number): number {
    let res: number = 0;
    for (let i: number = 0; i < 32; i++) {
        let num_a: number = a & 1; a >>= 1; // 将最后一位取出
        let num_b: number = b & 1; b >>= 1; 
        let num_c:number = c & 1; c >>= 1;
        if(num_a == 0 && num_b == 0 && num_c == 1) res += 1;
        else if(num_a == 1 && num_b == 1 && num_c == 0) res += 2;
        else if(num_c == 0 && num_a + num_b == 1) res += 1;
    }
    return res;
};
```
:::