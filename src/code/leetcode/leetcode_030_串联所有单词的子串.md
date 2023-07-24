# 030_串联所有单词的子串

> tag：哈希表、字符串、滑动窗口
>
> 难度：困难

> 题目：
>
> 给定一个字符串 s 和一个字符串数组 words。 words 中所有字符串 长度相同。
>
>  s 中的 串联子串 是指一个包含  words 中所有字符串以任意顺序排列连接起来的子串。
>
> 例如，如果 words = ["ab","cd","ef"]， 那么 "abcdef"， "abefcd"，"cdabef"， "cdefab"，"efabcd"， 和 "efcdab" 都是串联子串。 "acdbef" 不是串联子串，因为他不是任何 words 排列的连接。
> 返回所有串联字串在 s 中的开始索引。你可以以 任意顺序 返回答案。
>
> 示例 1：
>
> 输入：s = "barfoothefoobarman", words = ["foo","bar"]
> 输出：[0,9]
> 解释：因为 words.length == 2 同时 words[i].length == 3，连接的子字符串的长度必须为 6。
> 子串 "barfoo" 开始位置是 0。它是 words 中以 ["bar","foo"] 顺序排列的连接。
> 子串 "foobar" 开始位置是 9。它是 words 中以 ["foo","bar"] 顺序排列的连接。
> 输出顺序无关紧要。返回 [9,0] 也是可以的。
> 示例 2：
>
> 输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
> 输出：[]
> 解释：因为 words.length == 4 并且 words[i].length == 4，所以串联子串的长度必须为 16。
> s 中没有子串长度为 16 并且等于 words 的任何顺序排列的连接。
> 所以我们返回一个空数组。
> 示例 3：
>
> 输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
> 输出：[6,9,12]
> 解释：因为 words.length == 3 并且 words[i].length == 3，所以串联子串的长度必须为 9。
> 子串 "foobarthe" 开始位置是 6。它是 words 中以 ["foo","bar","the"] 顺序排列的连接。
> 子串 "barthefoo" 开始位置是 9。它是 words 中以 ["bar","the","foo"] 顺序排列的连接。
> 子串 "thefoobar" 开始位置是 12。它是 words 中以 ["the","foo","bar"] 顺序排列的连接。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/substring-with-concatenation-of-all-words
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：

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