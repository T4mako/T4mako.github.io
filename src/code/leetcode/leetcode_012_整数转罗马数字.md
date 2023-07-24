# 012_整数转罗马数字

> tag：哈希表、数学、字符串
>
> 难度：中等

> 题目：
>
> 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
>
> 字符          数值
> I             1
> V             5
> X             10
> L             50
> C             100
> D             500
> M             1000
> 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
>
> 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
>
> I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
> X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
> C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
> 给你一个整数，将其转为罗马数字。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/integer-to-roman
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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

建立两个数组，分别存储罗马数字所对应的值，通过一个while循环判断num是否大于等于遍历到的整形数组中的最大值，并进行相应的赋值，通过for循环移动指向的数字，最后用一个StringBuilder存储而非String，应为运行速度更快，最后转换成String返回