# 013_罗马数字转整数

> tag：哈希表、数字、字符串
>
> 难度：简单

> 题目：
>
> 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
>
> 字符          数值
> I             1
> V             5
> X             10
> L             50
> C             100
> D             500
> M             1000
> 例如， 罗马数字 2 写做 II ，即为两个并列的 1 。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
>
> 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
>
> I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
> X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
> C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
> 给定一个罗马数字，将其转换成整数。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/roman-to-integer
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：

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