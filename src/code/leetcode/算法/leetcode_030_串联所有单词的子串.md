---
category: 
  - 算法
tag: 
  - 哈希表
  - 字符串
  - 滑动窗口
---
# 030_串联所有单词的子串

<Badge text="困难" type="danger" vertical="middle" />


```java
class Solution {
   public List<Integer> findSubstring(String s, String[] words) {
        ArrayList<Integer> res = new ArrayList();
        int strslen =  words.length * words[0].length();  //串联子串的长度
        if(s.length() < strslen){
            return res;
        }
        int slen = s.length();
        int wlen = words.length;
        int len = words[0].length();
        HashMap<String,Integer> map = new HashMap();
        //存放所有words，key对应words里的子串，value对应个数
        for(int i = 0;i < wlen;i++){
            if(map.containsKey(words[i])){
                map.put(words[i],map.get(words[i])+1);
            }else {
                map.put(words[i],1);
            }
        }
        for(int i = 0;i < slen;i++){
            //长度太短，直接返回
            if(slen - i < strslen){
                return res;
            }
            //与words[i]等长的字符串
            String temp;
            if(!map.containsKey(s.substring(i,i+len))){
                continue;
            }
            //复制一个map
            HashMap<String,Integer> clone = (HashMap<String, Integer>) map.clone();
            int index = i;
            while(index - i < strslen){
                temp = s.substring(index,index+len);
                //不包含，或者words里对应的的子串用完
                if(!clone.containsKey(temp) || clone.containsKey(temp) && clone.get(temp) == 0){
                    break;
                }else {
                    //value-1
                    clone.put(temp,clone.get(temp)-1);
                    index += len;
                }
            }
            if(index == i + strslen){
                res.add(i);
            }
        }
        return res;
    }
}
```

建立一个hashmap，key对应words中的字符串，value对应出现的次数。对s遍历，判断与words[0]等长的字符串在map中是否包含，不包含则进入下一次循环，如果包含，建立一个while循环，判断以words[0]等长的字符串在map中是否包含且value不为0，如果为0，break；否则value--，直到while循环扫过了串联子串的长度