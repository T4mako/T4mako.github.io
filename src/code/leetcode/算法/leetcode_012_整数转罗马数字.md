---
category: 
  - 算法
tag: 
  - 哈希表
  - 数学
  - 字符串
---

# 012_整数转罗马数字

<Badge text="中等" type="warning" vertical="middle" />

## 解法一：递归判断

```java
class Solution {
    public String intToRoman(int num) {
        return(toStr(num));
    }
    public String toStr(int num){
        StringBuilder temp = new StringBuilder();
        int x = 0;
        if(num <= 0){
            return "";
        }else if (num >= 1000) {
            x = num / 1000;
            for(int i = 0;i < x;i++){
                temp.append("M");
            }
            return temp.toString() + toStr(num % 1000);
        }else if (num >= 900 && num < 1000) {
            return "CM" + toStr(num - 900);
        }else if (num >= 500 && num < 1000){
            return "D" + toStr(num - 500);
        }else if (num >= 400 && num < 500) {
            return "CD" + toStr(num - 400);
        }else if (num >= 100 && num < 500) {
            x = num / 100;
            for(int i =0;i < x;i++) {
                temp.append("C");
            }
            return temp.toString() + toStr(num % 100);
        }else if(num >= 90 && num < 100){
            return "XC" + toStr(num - 90);
        }else if (num >= 50 && num < 100) {
            return "L" + toStr(num - 50);
        }else if (num >= 40 && num < 50 ) {
            return "XL" + toStr(num - 40);
        }else if (num >= 10 && num < 50) {
            x = num / 10;
            for(int i = 0;i < x;i++){
                temp.append("X");
            }
            return temp.toString() + toStr(num % 10);
        }else if (num == 9) {
            return "IX";
        }else if (num >= 5 && num < 10) {
            return "V" + toStr(num - 5);
        }else if(num == 4){
            return "IV";
        } else if (num < 5) {
            for(int i = 0;i < num;i++){
                temp.append("I");
            }
            return temp.toString();
        }
        return null;
    }
}
```

判断函数toStr(int num)传入的参数判断该数落在那个范围内，用能表示它的最大字母表示完后取余，得到的数再传入toStr(int num)函数中,左后递归得到所要的值

## 解法二：贪心算法

```java
class Solution {
    public String intToRoman(int num) {
        StringBuilder res = new StringBuilder();
        int[] number = new int[]{1000,900,500,400,100,90,50,40,10,9,5,4,1};
        String[] str = new String[]{"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};
        for (int i = 0; i < 13; i++) {
            while(num >= number[i]){
                res.append(str[i]);
                num -= number[i];
            }
        }
        return res.toString();
    }
}
```

建立两个数组，分别存储罗马数字所对应的值，通过一个 while 循环判断 num 是否大于等于遍历到的整形数组中的最大值，并进行相应的赋值，通过for循环移动指向的数字，最后用一个 StringBuilder 存储而非 String，应为运行速度更快，最后转换成 String 返回