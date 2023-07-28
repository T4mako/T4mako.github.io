---
category: 
  - 算法
tag: 
  - 栈
  - 字符串
  - 动态规划
---

# 032_最长有效括号

<Badge text="困难" type="danger" vertical="middle" />


## 解法一：栈

```java
class Solution {
    public int longestValidParentheses(String s) {
        if(s == null || s.length() == 0){
            return 0;
        }
        Stack<Character> stack = new Stack();
        int res = 0,temp = 0;
        int len = s.length();
        int[] arr = new int[len];
        int i = 0;
        while(i < len){
            int size = stack.size();
            if(size == 0){
                stack.push(s.charAt(i));
                arr[i] = 1;
                i++;
                continue;
            }
            if(size > 0 && stack.peek() == '(' && s.charAt(i)==')'){
                stack.pop();
                arr[i] = 0;
                for(int j = i;j >= 0;j--){
                    if(arr[j] == 1){
                        arr[j] = 0;
                        break;
                    }
                }
            }else {
                stack.push(s.charAt(i));
                arr[i] = 1;
            }
            i++;
        }
        for (int j = 0; j < arr.length; j++) {
            if(arr[j] == 0){
               temp++;
               res = res > temp ? res : temp;
            }else {
                temp = 0;
            }
        }
        return res;
    }
}
```


创建一个栈，将括号入栈，如果有()的话就出栈，维护一个数组，如果对应下标是可匹配的括号，将对应下标的值改为0，若果没有匹配，改为1


## 解法一优化：

```java
class Solution {
    public int longestValidParentheses(String s) {
        if(s == null || s.length() == 0){
            return 0;
        }
        /*Stack<Integer> stack = new Stack();*/
        Deque<Integer> stack = new LinkedList<Integer>();
        int res = 0;
        int len = s.length();
        int i;
        stack.push(-1);
        for (i = 0; i < len; i++) {
            if(s.charAt(i) == '(' || stack.size() <= 1){
                stack.push(i);
            }else{
                if(s.charAt(stack.peek())=='('){
                    stack.pop();
                    res = res > i - stack.peek() ? res : i - stack.peek();
                }else {
                    stack.push(i);
                }
            }
        }
        return res;
    }
}
```

出入栈时的括号更改为下标，如果是左括号则入栈，如果是右括号，判断是否可以出栈，并记录下标到头指针的值作为举例，将LinkedList替换stack，速度更快


## 解法二：动态规划

```java
class Solution {
    public int longestValidParentheses(String s) {
        int maxans = 0;
        int[] dp = new int[s.length()];
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) == ')') {
                if (s.charAt(i - 1) == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] > 0 && s.charAt(i - dp[i - 1] - 1) == '(') {
                    dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
                }
                maxans = Math.max(maxans, dp[i]);
            }
        }
        return maxans;
    }
}
```

定义 dp[i] 表示以下标 ii 字符结尾的最长有效括号的长度。我们将dp 数组全部初始化为 0 。显然有效的子串一定以‘)’ 结尾，因此我们可以知道以(结尾的子串对应的值必定为 0 ，我们只需要求解 ‘)’ 在 dp 数组中对应位置的值。
在遍历时只有两种情况，相邻的字符为（），或者为））的情况，第一种情况，）对应的下下表我为2+dp[i-2]，如果为第二种情况,如果s[i-dp[i-1]-1]=='('，dp的下标为dp[i - 1] +  dp[i - dp[i - 1] - 2]  + 2;