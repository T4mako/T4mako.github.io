---
category: 
  - 算法
tag: 
  - 数学
  - 字符串
  - 模拟
---

# 043_字符串相乘

<Badge text="中等" type="warning" vertical="middle" />

## 解法一：

```java
class Solution {
    public String multiply(String num1, String num2) {
        if(num1.equals("0")|| num2.equals("0")){
            return "0";
        }
        StringBuilder res = new StringBuilder();
        int len1 = num1.length();
        int len2 = num2.length();
        int maxlen = 0;
        for (int i = len1 - 1; i >= 0; i--) {
            int n1 = num1.charAt(i) - 48;
            int add = 0;
            StringBuilder temp = new StringBuilder();
            for (int j = len2 - 1; j >= 0; j--) {
                int n2 = num2.charAt(j) - 48;
                int mul = n1 * n2;
                if(j != 0){
                    temp.append((mul+ add) % 10);
                    add = (mul+ add) / 10;
                }else {
                    StringBuilder s = new StringBuilder();
                    s.append(add + mul);
                    temp.append(s.reverse());
                }
            }
            temp = temp.reverse();
            for (int j = 0; j < len1 - 1 - i; j++) {
                temp.append(0);
            }
            maxlen = res.length() > temp.length() ? res.length() : temp.length();
            int add_2 = 0;
            temp.reverse();
            StringBuilder sb = new StringBuilder();
            for (int j = 0; j < maxlen; j++) {
                int a = j >= temp.length() ? 0 : temp.charAt(j) - 48;
                int b = j >= res.length() ? 0 : res.charAt(j) - 48;
                if(j == maxlen - 1){
                    StringBuilder s = new StringBuilder();
                    s.append(a + b + add_2);
                    sb.append(s.reverse());
                    break;
                }
                sb.append((a + b + add_2) % 10);
                add_2 = (a + b + add_2)/10;
            }
            res = sb;
        }
        return res.reverse().toString();
    }
}
```

通过两个for循环将每个个位数与各位数的乘积相加，再通过每一次的乘积相加，得到最终结果


## 解法二：

```java
public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) {
            return "0";
        }
        int[] res = new int[num1.length() + num2.length()];
        for (int i = num1.length() - 1; i >= 0; i--) {
            int n1 = num1.charAt(i) - '0';
            for (int j = num2.length() - 1; j >= 0; j--) {
                int n2 = num2.charAt(j) - '0';
                int sum = (res[i + j + 1] + n1 * n2);
                res[i + j + 1] = sum % 10;
                res[i + j] += sum / 10;
            }
        }
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < res.length; i++) {
            if (i == 0 && res[i] == 0) continue;
            result.append(res[i]);
        }
        return result.toString();
    }
```


两个数相乘的位数和为两个数位数的总和m+n，num1[i] x num2[j] 的结果为 tmp(位数为两位，"0x","xy"的形式)，其第一位位于 res[i+j]，第二位位于 res[i+j+1]。将它们相加即可