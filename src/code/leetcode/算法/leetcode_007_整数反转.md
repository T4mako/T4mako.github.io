---
category: 
  - 算法
tag: 
  - 数学
article: false
---
# 007. 整数反转

<Badge text="中等" type="warning" vertical="middle" />

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