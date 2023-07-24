# 007_整数反转

> tag：数学
>
> 难度：中等

> 题目：
>
> 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
>
> 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。
>
> 假设环境不允许存储 64 位整数（有符号或无符号）。
>
>
> 示例 1：
>
> 输入：x = 123
> 输出：321
> 示例 2：
>
> 输入：x = -123
> 输出：-321
> 示例 3：
>
> 输入：x = 120
> 输出：21
> 示例 4：
>
> 输入：x = 0
> 输出：0
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/reverse-integer
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法一：

```java
class Solution {
    public int reverse(int x) {
        long res = 0;
        int m = 0;
        while(x != 0){
            m = m % 10;
            res = res * 10 + m;
            x /= 10;
        }
        return (int)res == res ? (int)res : 0;
    }
}
```

通过while循环，取余与取整得到该数的反转，并用long存储，如果将该数转为int型，若强转的数字与原数不符合，返回0，否则返回res

## 解法一优化：

```java
class Solution {
    public int reverse(int x) {
        long res = 0;
        while(x != 0){
            res = res * 10 + x%10;
            x /= 10;
        }
        return (int)res == res ? (int)res : 0;
    }
}
```

不创建int m，减小开销