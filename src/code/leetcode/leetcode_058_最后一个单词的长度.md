---
category: 
  - 算法
tag: 
  - 字符串
---

# 058_最后一个单词的长度

<Badge text="简单" type="tip" vertical="middle" />

```java
class Solution {
    public int lengthOfLastWord(String s) {
        int len = s.length();
        int res = 0;
        int flag = 0;
        for(int i = len - 1;i >= 0;i--){
            if(flag == 0 && s.charAt(i) == ' '){
                continue;
            }
            if(s.charAt(i) != ' '){
                flag = 1;
                res++;
            }else{
                break;
            }
        }
        return res;
    }
}
```