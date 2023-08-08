---
category: 
  - 算法
tag: 
  - 字符串
order: 8
---

# 008. 字符串转换整数 (atoi)

<Badge text="中等" type="warning" vertical="middle" />


```java
class Solution {
    public int myAtoi(String s) {
        //丢弃无用的前，后空格
        s = s.trim(); 
        //特殊情况
        if(s.length() == 0 ||s == null){ 
            return 0;
        }
        //用long方便比较
        long res = 0; 
        //用于判断正负
        boolean flag = true;
        //索引 
        int i = 0;
        int maxBig = (int) (Math.pow(2,31)-1);
        //判断正负
        if(s.charAt(0) == '-'){
            flag = false;
            i++;
        }
        if(s.charAt(0) == '+'){
            i++;
        }
        //遍历String
        for(;i < s.length();i++){
            if(s.charAt(i) < 48 || s.charAt(i) > 57){
                break;
            }
            res = res * 10 + Integer.parseInt(String.valueOf(s.charAt(i)));
            //超出范围则return
            if(res >= maxBig){
                if(!flag){
                    return (int)(-res <= -maxBig-1 ? -maxBig-1 : -res);
                }else{
                    return maxBig;
                }
            }
        }
        //不超出范围判断正负
        if(!flag){
            return -(int)res;
        }else{
            return (int)res;
        }
    }
}
```

首先用trim()方法删除字符串前后的空格，创建一个long型res，创建最大数maxBig，判断字符第一个是否为+或-，定义一个flag储存符号，遍历字符串，通过res = res * 10 + Integer.parseInt(String.valueOf(s.charAt(i)))给res赋值，如果res等于maxBIg做判断，返回，如果是一般情况，判断符号，返回res；