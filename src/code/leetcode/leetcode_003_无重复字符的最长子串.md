---
category: 
  - 算法
tag: 
  - 哈希
  - 滑动窗口
  - 字符串
order: 3
---
# 003. 无重复最长子串

<Badge text="中等" type="warning" vertical="middle" />

## 解法一：暴力解法

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int len = s.length();
        int [] a = new int[len];
        for(int i = len;i > 0;i--){
            for(int j = 1;j <= len+1-i;j++){
                String str = s.substring(j-1,j-1+i); // 获取截取字符串
                HashSet set = new HashSet();
                for(int k = 0;k < i;k++){
                    set.add(str.charAt(k)); // 遍历存入set中
                    if(set.size() != k+1){
                        break;
                    }else if(set.size() == i){
                        return i;
                    }
                }
            }
        }
        return 0;
    }
}
```

#### 解法思路：

从大到小获取字符串的所有子串，将子串存入HashSet中，若HashSet的长度与子串长度相等，返回HashSet的长度。此算法的时间复杂度为O(n^3^)

## 解法二：滑动窗口

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashSet<Character> set = new HashSet<>();
        int left = 0;
        int right = 0;
        int res = 0;  // 左右边界的距离
        if(s.length() <= 1){ // 字符串特殊长度
            return s.length();
        }else {
            while(right < s.length()){
                while(set.contains(s.charAt(right))){
                    set.remove(s.charAt(left));
                    left++;
                }
                set.add(s.charAt(right));
                right++;
                if((right - left) > res){
                    res = right - left;
                }
            }
            return res;
        }
    }
}
```

#### 解法思路：

建立 left 和 right 两个数，记录窗口的左右边界和距离res=(right-left)，建立一个Hashset，存储 left 和 right 之间的字符，移动 right，并循环判断map中是否包含right所指字符，如果有，去除left指向字符，循环上述操作，记录最大的res并返回，该算法的平均时间复杂度为O(n^2^)。

## 滑动窗口的优化：

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap map = new HashMap();
        int left = 0;
        int right = 0;
        int res = 0;
        if(s.length() <= 1){
            return s.length();
        }else {
            while(right < s.length()){
                int i = (int)map.getOrDefault(s.charAt(right),-1);//Map中会存储一一对应的key和value。，如果 在Map中存在key，则返回key所对应的的value。如果 在Map中不存在key，则返回默认值。
                if(i >= left){
                    left = i + 1;
                }
                map.put(s.charAt(right),right);
                right++;
                if((right - left) > res){
                    res = right - left;
                }
            }
            return res;
        }
    }
}
```

#### 解法思路：

在解法二的基础上，在移动left时，不需要一个一个移动，若果有重复字符时，**直接移动到map中出现重复字符的位置**，此时需要使用HashMap结构，key存储字符值，value存储索引值，使用map的getOrDefault()方法，此方法的作用是如果在Map中存在key，则返回key所对应的的value，如果 在Map中不存在key，则返回默认值-1，返回的值赋值给i，如果返回值为重复字符的索引，则left=i+1，如果返回的是-1，则left为0，此算法的时间复杂度为O(n)。

## 解法三：唯一字符

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] move = new int[128];
        int left = 0;
        int right = 0;
        int res = 0;
        if (s.length() < 1){
            return s.length();
        }else{
            while (right < s.length()){
                char tmp = s.charAt(right);
                int i = move[tmp];
                left = Math.max(left, i);
                if((right - left +1) > res){
                    res = right - left +1;
                }
                move[tmp] = right+1;
                right++;
            }
            return res;
        }
    }
}
```

#### 解法思路：

由于题目指出字符串由英文字母、数字、符号和空格组成，则可以建立一个长度为128的数组，在right向右移动时，对字符所在数组的值改为right+1，便于以后遇到相同字符时可以快速取到该字符的上一次出现位置，方便了left的直接移动，此算法的时间复杂度为O(n)