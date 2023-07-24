#  006_Z字形变换

> tag：字符串
>
> 难度：中等

> 题目：
>
> 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
>
> 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
>
> P   A   H   N
> A P L S I I G
> Y   I   R
> 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
>
> 请你实现这个将字符串进行指定行数变换的函数：
>
> string convert(string s, int numRows);
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/zigzag-conversion
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法一：二维数组与数学规律

```java
class Solution {
    public String convert(String s, int numRows) {
        int len = s.length();
        if(numRows==1){
            return s;
        }
        char[][] arr = new char[numRows][(len/(numRows-1)+1)*(numRows-1)];
        char[] res = new char[len];
        //赋值操作
        for(int i = 0;i < len;i++){
            if(i%(numRows-1)==0 && i/(numRows-1)%2 == 1){
                arr[numRows-1][i/(numRows-1)/2*(numRows-1)] = s.charAt(i);
            }
            if(((i / (numRows-1)))%2 == 0){
                arr[i%(numRows-1)][i/(numRows-1)/2*(numRows-1)] = s.charAt(i);
            }else{
                int leftdown = i/(numRows-1)*(numRows-1);
                arr[(numRows-1)-(i-leftdown)][leftdown/(numRows-1)/2*(numRows-1)+(i-leftdown)] = s.charAt(i);
            }
        }
        int index = 0;
        char n = 0;
        //输出
        for(int i = 0;i < numRows;i++){
            for(int j = 0;j < (len/(numRows-1)+1)*(numRows-1);j++){
                if(arr[i][j] != n){
                    res[index] = arr[i][j];
                    index++;
                }
            }
        }
        String result = String.valueOf(res);
        return result;
    }
}
```

创建一个二维数组，用于存储所有的N字形的字符，根据数学规律，Z字形的每个头和尾都是n-1的倍数，遍历字符串的所有字符，将该字符整除n-1，判断是奇数还是偶数用于判断字符处在竖列还是斜列上，再根据数学规律给二维数组相应的位置赋值。最后用双层for循环给一个一维字符数组赋值，最后转换为String并返回。

## 解法二：模拟法

```java
class Solution {
    public String convert(String s, int numRows) {
        if(numRows==1){
            return s;
        }
        List<StringBuilder> list = new ArrayList(numRows);
        for(int i = 0;i < numRows;i++){
            list.add(new StringBuilder());
        }
        StringBuilder res = new StringBuilder();
        int flag = -1;
        int i = 0;
        for(char c : s.toCharArray()){
            list.get(i).append(c);
            if(i == 0 || i % (numRows-1) == 0){
                flag = -flag;
            }
            i+=flag;
        }
        for(int j = 0;j < numRows;j++){
            res.append(list.get(j));
        }
        return res.toString();
    }
}
```

#### 解法思路：

建立一个ArrayList列表，列表中存放StringBuilder，建立整形i和flag，用for循环给list赋值，当flag为正数，i+flag为向下，如下图所示，当i\=\=0或者i%(n-1)\=\=0时说明要反向赋值，此时flag=-falg，i+flag为向上，将遍历到的字符赋值给相应的StringBuilder，最后将每个StringBuilder相加起来为所得结果。