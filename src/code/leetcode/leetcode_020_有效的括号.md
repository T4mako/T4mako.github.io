# 020_有效的括号

>tag：栈、字符串
>
>难度：简单

> 题目：
>
> 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
>
> 有效字符串需满足：
>
> 左括号必须用相同类型的右括号闭合。
> 左括号必须以正确的顺序闭合。
> 每个右括号都有一个对应的相同类型的左括号。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/valid-parentheses
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



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