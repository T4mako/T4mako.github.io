---
category: 
  - 算法
tag: 
  - 数组
  - 数学
---

# 067_二进制求和

<Badge text="简单" type="tip" vertical="middle" />

## 解法一：进制转换


将获取到的字符串通过Integer.parseInt()方法转换为整形，将每个数从个为开始用pow方法将二进制转换为10进制，将两数相加求和后，再用除二逆序取余法将十进制转换为二进制，最后返回字符串。由于字符串的大小会超过数据类型能承载的最大位数，故不使用此种方法。

## 解法二：整形数组

```java
class Solution {
    public String addBinary(String a, String b) {
        int x,y;
        int len = a.length() > b.length() ? a.length() : b.length();
        int flag = 0;
        StringBuilder res = new StringBuilder(len+1);
        for(int i = a.length()-1,j = b.length()-1;len > 0;i--,j--) {
            x = i >= 0 ? (Integer.parseInt(String.valueOf(a.charAt(i)))):0;
            y = j >= 0 ? (Integer.parseInt(String.valueOf(b.charAt(j)))):0;
            if(x + y +flag >= 2){
                res.append(x + y + flag - 2);
                flag = 1;
            }else{
                res.append(x + y + flag);
                flag = 0;
            }
            len--;
        }
        if(flag == 1){
            res.append(1);
        }
        StringBuilder reverse = res.reverse();
        return reverse.toString();
    }
}
```

获取字符串a和b的长度最大值len，建立一个长度为len+1的StringBuilder，定义一个flag赋值为0表示进位，通过for循环，定义i和j分别对应字符串a和b的索引，将索引所对的数字返回，如果索引超出范围返回0，将两个数字与flag相加，如果所得的和大于等于2，将flag置为1，否则设置为0，在最后判断flag的值，如果为1则res.append(i)，最后再反向返回字符，该算法的时间复杂度为O(n)。


## 解法三：直接添加法

```java
class Solution {
    public String addBinary(String a, String b);
        int x = a.length() - 1;
        int y = b.length() - 1;
        StringBuilder res = new StringBuilder();
        int c = 0;
        while(x >= 0 || y >= 0){
            if(x >= 0) {c += a.charAt(x--) - '0';}
            if(y >= 0) {c += b.charAt(y--) - '0';}
            res.append(c % 2);
            c >>= 1;
        }
        return (c > 0 ? (1 + res.reverse().toString()):(res.reverse().toString()));
    }
}
```

建立一个StringBuilder res和整型数值c用于计算进位，获取字符串a，b的长度，用while循环，当x>=0或y>=0时，若其中一个小于0，c的值不变，如果满足>=0的条件，c加上当前字符减去字符0，将c%2获取下一位的值，c>>2获取进位，反复执行后将得到的res逆序，判断c的值是否为1，若为1，返回1+res.reverse().toString()，否则返回res.recerse().toString()，该算法的时间复杂度为O(n)。