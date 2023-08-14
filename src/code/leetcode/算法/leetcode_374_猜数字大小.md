---
article: false
date: 2023-08-13
category: 
  - 算法
tag: 
  - 二分查找
  - 交互
order: 374
---

# 374. 猜数字大小



<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/guess-number-higher-or-lower/description/?envType=study-plan-v2&envId=leetcode-75)

解法思路：二分查找


:::code-tabs#shell

@tab Java
```java
public class Solution extends GuessGame {
    public int guessNumber(int n) {
        long left = 1;
        long right = n;
        while(guess((int)((left + right)/2)) != 0){
            if(guess((int)((left + right)/2)) < 0) {
                right = (left + right)/2 - 1;
            }
            if(guess((int)((left + right)/2)) > 0) {
                left = (left + right)/2 + 1;
            }
        }
        return (int) ((left + right)/2);
    }
}
```
@tab TS

```ts
function guessNumber(n: number): number {
    let left:number = 1;
    let right:number = n;
    while(guess((left+right)/2) !== 0){
        if(guess((left + right)/2) < 0) {
            right = (left + right)/2 - 1;
        }
        if(guess((left + right)/2) > 0) {
            left = (left + right)/2 + 1;
        }
    }
    return  ((left + right)/2);
};
```
:::