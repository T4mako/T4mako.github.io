---
category: 
  - 算法
tag: 
  - 数组
  - 数学
---

# 066_加一

<Badge text="简单" type="tip" vertical="middle" />

```java
class Solution {
    public int[] plusOne(int[] digits) {
        int len = digits.length;
        len--;
        digits[len] += 1;
        while(len > 0 && digits[len] >= 10){
            digits[len] = digits[len] % 10;
            digits[--len] += 1;
        }
        if(digits[0] != 10){
            return digits;
        }else{
            int[] res = new int[digits.length + 1];
            res[0] = 1;
            return res;
        }
    }
}
```

现将数组的最后一位+1，从尾遍历数组，如果值大于等于10，前一位+1，这一位置为0，len--，最后判断首位是否为10即可