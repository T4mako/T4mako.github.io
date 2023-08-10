---
category: 
  - 算法
tag: 
  - 哈希表
  - 字符串
  - 回溯
---

# 017_电话号码的字母组合

<Badge text="中等" type="warning" vertical="middle" />

## 解法一：

```java
class Solution {
    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList();
        if(digits.length() == 0){
            return res;
        }
        int len = digits.length();
        for(int i = 0;i < len;i++){
            String s = get(digits.charAt(i));
            int l = res.size();
            if(l == 0){
                for (int j = 0; j < s.length(); j++) {
                    res.add(String.valueOf(s.charAt(j)));
                }
            }else {
                ArrayList temp = new ArrayList();
                temp.addAll(res);
                for(int j = 0;j < s.length()-1;j++){
                    res.addAll(temp);
                }
                for(int k = 0;k < res.size();k++){
                    res.set(k,res.get(k) + s.charAt(k / l));
                }
            }
        }
        return res;
    }
    public String get(char i){
        switch(i){
            case '2' : return "abc";
            case '3' : return "def";
            case '4' : return "ghi";
            case '5' : return "jkl";
            case '6' : return "mno";
            case '7' : return "qprs";
            case '8' : return "tuv";
            case '9' : return "wxyz";
        }
        return null;
    }
}
```

创建一个存储字符串的链表，通过for语句判断是否有数字传入，若有，返回对应的字符s，将原来的数组复制为原来的s倍，并添加s中的字符

### 解法二：递归

```java
class Solution {
	List res = new ArrayList();
    String str = "";
    String[] strs = new String[]{"abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    public List<String> letterCombinations(String digits) {
        if(digits.length() == 0){
            return res;
        }
        add(digits,0,str);
        return res;
    }
    public void add(String digits,int index,String str){
        if(index == digits.length()){
            res.add(str);
            return ;
        }
        char c = digits.charAt(index);
        String s = strs[c - '2'];
        for (int i = 0; i < s.length(); i++) {
            add(digits,index + 1,str + (s.charAt(i)));
        }
    }
}
```

运用递归思想，添加到list数组中的元素长度为输入数字的总长度，定义一个string，调用add方法，检测传进来的index值，对应digits中的数字，让通过for循环遍历digits对应数字的对应字母，再次调用add方法，并传入index+1，如果index等于digits的长度，将字符串添加到list中

### 解法二优化：

```java
class Solution {
    List res = new ArrayList();
    StringBuilder str = new StringBuilder();
    String[] strs = new String[]{"abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    public List<String> letterCombinations(String digits) {
        if(digits.length() == 0){
            return res;
        }
        add(digits,0,str);
        return res;
    }
    public void add(String digits,int index,StringBuilder str){
        if(index == digits.length()){
            res.add(str.toString());
            return ;
        }
        char c = digits.charAt(index);
        String s = strs[c - '2'];
        for (int i = 0; i < s.length(); i++) {
            add(digits,index + 1,str.append(s.charAt(i)));
            str.deleteCharAt(str.length()-1);
        }
    }
}
```

用StringBuilder代替String，效率更高，由于调用add方法时，用的是str.append()方法，所以原来的str也会改变，所以要删除倒数第一个元素