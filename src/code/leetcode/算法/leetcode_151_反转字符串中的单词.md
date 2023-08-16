---
article: false
date: 2023-08-04
category: 
  - 算法
tag: 
  - 字符串
  - 双指针
---
# 151_反转字符串中的单词


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/reverse-words-in-a-string/description/?envType=study-plan-v2&envId=leetcode-75)

## 解法一：直接遍历
直接从后往前遍历，截取字符串并放到新的字符串中
```java
class Solution {
    public static String reverseWords(String s) {
                StringBuilder res = new StringBuilder();
        // 从后往前遍历
        int i = s.length() - 1;
        int flag; // 标记单词末尾
        while (i >= 0){
            // 跳过空白
            if(s.charAt(i) == ' ') {
                i--;
            } else {
                // 标记单词末尾
                flag = i;
                while (i >= 0){
                    // i 遍历到头部，添加单词
                    if(i == 0 && s.charAt(i) == ' '){
                        res.append(s.substring(0,flag + 1));
                        i--;
                    }else if(i == 0){
                        if(res.length() == 0){
                            res.append(s.substring(0,flag + 1));
                        }else {
                            res.append(" ").append(s.substring(0,flag + 1));
                        }
                        i--;
                    }
                    // 非头部且为字母直接跳过
                    else if(s.charAt(i) != ' '){
                        i--;
                    }
                    // 非头部为空白，添加单词
                    else if(res.length() == 0){
                        res.append(s.substring(i + 1,flag + 1));
                        i--;
                        break;
                    }else {
                        res.append(s.substring(i,flag + 1));
                        i--;
                        break;
                    }
                }
            }
        }
        return res.toString();
    }
}
```

## 解法二：语言特性
语言特性  
```java
class Solution {
    public String reverseWords(String s) {
        // 除去开头和末尾的空白字符
        s = s.trim();
        // 正则匹配连续的空白字符作为分隔符分割
        List<String> wordList = Arrays.asList(s.split("\\s+"));
        Collections.reverse(wordList);
        return String.join(" ", wordList);
    }
}
```

## 解法三：双端队列
先将字符串前后的空白去掉，使用队列将字符串放入，再从末尾取出
```java
class Solution {
    public String reverseWords(String s) {
        int left = 0, right = s.length() - 1;
        // 去掉字符串开头的空白字符
        while (left <= right && s.charAt(left) == ' ') {
            ++left;
        }

        // 去掉字符串末尾的空白字符
        while (left <= right && s.charAt(right) == ' ') {
            --right;
        }

        Deque<String> d = new ArrayDeque<String>();
        StringBuilder word = new StringBuilder();
        
        while (left <= right) {
            char c = s.charAt(left);
            if ((word.length() != 0) && (c == ' ')) {
                // 将单词 push 到队列的头部
                d.offerFirst(word.toString());
                word.setLength(0);
            } else if (c != ' ') {
                word.append(c);
            }
            ++left;
        }
        d.offerFirst(word.toString());

        return String.join(" ", d);
    }
}
```