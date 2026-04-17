---
category: 
  - 算法
tag: 
  - 栈
  - 字符串
---
# 020_有效的括号

<Badge text="简单" type="tip" vertical="middle" />



```java
class Solution {
    public boolean isValid(String s) {
        int[] stack = new int[s.length()];
        int index = 0;
        for(int i = 0;i < s.length();i++){
            char c = s.charAt(i);
            if(index == 0 && (c == ')' || c == ']' || c == '}')){
                return false;
            }
            if(c == '(' || c == '[' || c == '{'){
                stack[index] = s.charAt(i);
                index++;
            }else if(c == ')' && stack[index-1] == '(' || c == ']' && stack[index-1] == '[' || c == '}' && stack[index-1] == '{'){
                index--;
            }else{
                return false;
            }
        }
        if(index == 0){
            return true;
        }else {
            return false;
        }
    }
}
```

建立一个数组，一个指针index，如果index指针指向0并且入栈为有括号时，返回false，如果是左括号则进栈，inmdex++，如果是有括号，匹配index-1所指向的括号是否匹配，匹配则index--