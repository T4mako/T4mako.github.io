---
category: 
  - 算法
tag: 
  - 数学

 
---
# 009. 回文数

<Badge text="简单" type="tip" vertical="middle" />

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

通过 for 循环遍历每次循环的个位数再与之前处理好的数 * 10 相加，得到的数与原始数据比较，此算法的时间复杂度为 O(n)