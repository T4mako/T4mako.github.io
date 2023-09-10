---
date: 2023-09-10
category: 
  - 算法
tag: 
  - 位运算
  - 动态规划 
article: true
---

# 338. 比特位计数


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/counting-bits/description/?envType=study-plan-v2&envId=leetcode-75)

### 解法一：语法 API
使用 Java 内置语法 `Integer.bitCount()` 计算 1 的个个数


```java
class Solution {
    public int[] countBits(int n) {
        int[] res = new int[n + 1];
        for (int i = 0; i < n + 1; i++) {
            res[i] = Integer.bitCount(i);
        }
        return res;
    }
}
```

### 解法二：Brian Kernighan 算法
Brian Kernighan 算法为 `x=x & (x−1)`  
该算法可以将 x 的二进制形式的最后一个 1 转变为 0，如 `10110 & 10101 = 10100`  
通过循环使用 Brian Kernighan 算法，将 x 变为 0，统计执行的次数  

:::code-tabs
@tab Java
```java
class Solution {
    public int[] countBits(int n) {
        int[] bits = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            bits[i] = countOnes(i);
        }
        return bits;
    }

    // Brian Kernighan 算法
    public int countOnes(int x) {
        int ones = 0;
        while (x > 0) {
            x &= (x - 1);
            ones++;
        }
        return ones;
    }
}
```
@tab Ts
```ts
function countBits(n: number): number[] {
    let res = [];
    for(let i:number = 0;i < n + 1;i++){
        res.push(countOnes(i));
    }
    return res;
};

// Brian Kernighan 算法
function countOnes(x: number): number{
    let ones:number = 0;
    while(x > 0){
        x &= x - 1;
        ones++;
    }
    return ones;
}
```
:::

### 解法三：动态规划——最高有效位
`i & (i - 1)` 可以去掉i最右边的一个 1（如果有）  
因此 `i & (i - 1)` 是比 i 小的，而且 `i & (i - 1)` 的 1 的个数已经在前面算过了  
所以 i 的 1 的个数就是 `i & (i - 1)` 的 1 的个数加上 1


:::code-tabs
@tab Java
```java
class Solution {
    public int[] countBits(int num) {
      int[] res = new int[num + 1];
      for(int i = 1;i<= num;i++){  //注意要从1开始，0不满足
          res[i] = res[i & (i - 1)] + 1;
      }
      return res;
    }
}
```
@tab Ts
```ts
function countBits(n: number): number[] {
    let res = [];
    res.push(0);
    for(let i:number = 1;i < n + 1;i++){
        res[i] = res[i & (i - 1)] + 1;
    }
    return res;
};
```
:::

### 解法四：动态规划——最低有效位
`i >> 1` 会把最低位去掉，因此 `i >> 1` 也是比 i 小的  同样也是在前面的数组里算过。  
当 i 的最低位是 0，则 i 中 1 的个数和 i >> 1 中 1 的个数相同  
当 i 的最低位是 1，i 中 1 的个数是 i >> 1 中 1 的个数再加 1

:::code-tabs
@tab Java
```java
class Solution {
    public int[] countBits(int num) {
      int[] res = new int[num + 1];
      for(int i = 0;i<= num;i++){
        res[i] = res[i >> 1] + (i & 1);  //注意 i & 1 需要加括号
      }
      return res;
  }
}
```
@tab Ts
```ts
function countBits(n: number): number[] {
    let res = [];
    res.push(0);
    for(let i:number = 1;i < n + 1;i++){
      res[i] = res[i >> 1] + (i & 1); 
    }
    return res;
};
```
:::