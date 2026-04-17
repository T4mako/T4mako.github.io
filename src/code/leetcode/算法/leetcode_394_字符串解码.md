---
date: 2023-08-12
category: 
  - 算法
tag: 
  - 栈
  - 递归
  - 字符串
---

# 394. 字符串解码

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/decode-string/description/?envType=study-plan-v2&envId=leetcode-75)

解法思路：  
建立一个list模拟栈，遍历字符串s
- 如果为`字母`或字符`[`则入栈
- 如果为数字，将整个`数`入栈
- 如果为字符`]`
  - 将从栈顶到遇到的第一个数字前的字符串拼接，每个字符串出栈。
  - 此时栈顶为数字，将上述拼接的字符串遍历该数字对应份数。替换该数字。
- 最后将list中的字符串拼接

```java
class Solution {
    public String decodeString(String s) {
        StringBuilder res = new StringBuilder();
        ArrayList<Object> list = new ArrayList<>();
        for (int i = 0; i < s.length(); i++) {
            if(s.charAt(i) >= 97){
                // 遍历到字母，入栈
                list.add(s.charAt(i));
            }else if(s.charAt(i) < 58){
                // 遍历到数字 将整个数字入栈
                list.add(Integer.valueOf(s.substring(i,s.indexOf('[',i))));
                i = s.indexOf('[',i) - 1;
            }else if(s.charAt(i) == '['){
                // 遍历到 '[' ，入栈
                list.add('[');
            } else {
                // 遍历到 ']'
                StringBuilder temp = new StringBuilder();
                int j = list.size() - 1;
                for (; j >= 0 ; j--) {
                    if(!"[".equals(list.get(j).toString())){
                        temp.insert(0, list.get(j));
                        list.remove(j);
                    }else {break;}
                }
                int num = (Integer) list.get(--j);
                StringBuilder str = new StringBuilder();
                for (int k = 0; k < num; k++) {
                    str.append(temp);
                }
                list.set(j,str);
                list.remove(j+1);
            }
        }
        for (Object o : list) {
            res.append(o);
        }
        return res.toString();
    }
}
```