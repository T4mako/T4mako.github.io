---
category: 
  - 算法
tag: 
  - 哈希表
  - 数学
  - 字符串
---

# 013_罗马数字转整数

<Badge text="简单" type="tip" vertical="middle" />

```java
class Solution {
    public int romanToInt(String s) {
        int len = s.length();
        int[] num = new int[len];
        for(int i = 0;i < len;i++){
            switch(s.charAt(i)){
                case 'M': num[i] = 1000;break;
                case 'D': num[i] = 500;break;
                case 'C': num[i] = 100;break;
                case 'L': num[i] = 50;break;
                case 'X': num[i] = 10;break;
                case 'V': num[i] = 5;break;
                case 'I': num[i] = 1;break;
            }
        }
        int sum=0;
        for(int i = 0;i < len;i++){
            if(i+1 != len){
                if(num[i] < num[i+1]){
                num[i] = -num[i];
            }
            
            }
            sum += num[i];
        }
        return sum;
    }
}
```

建立一个与s字符串长度相同的字符数组，通过switch语句将字符串的每一个字符转换为相应的数字并存入数组中，用for循环判断数组中的数与后一个数的大小，如果比后面的数小，则赋为负值，遍历完之后，将数组中的数进行求和，该算法的时间复杂度为O(n)。