---
category: 
  - 算法
tag: 
  - 字符串
---

# 038_外观数列

<Badge text="中等" type="warning" vertical="middle" />

```java
class Solution {
    public String countAndSay(int n) {
        return fun("",1,n);
    }
    public String fun(String res,int i,int n){
        if(i == 1){
            res = "1";
        }else {
            StringBuilder sb = new StringBuilder();
            int count = 1;
            for (int j = 0; j < res.length(); j++) {
                if(j+1 < res.length() && res.charAt(j) == res.charAt(j+1)){
                    count++;
                }else{
                    sb.append(count);
                    count = 1;
                    sb.append(res.charAt(j));
                }
            }
            res = sb.toString();
        }
        return i < n ? fun(res,i+1,n) : res;
    }
}
```
建立一个递归方法，传入参数1与n，如果i == 1，res = “1”，如果不是，通过for循环描述这次的res，并赋值给res，最后返回