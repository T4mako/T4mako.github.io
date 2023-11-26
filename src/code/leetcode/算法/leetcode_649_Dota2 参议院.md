---
date: 2023-08-14
category: 
  - 算法
tag: 
  - 队列
  - 贪心
  - 字符串
 
---

# 649. Dota2 参议院

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/dota2-senate/description/)


## 解法一：字符串
遍历`senate`，遍历的同时删除另一种字符，若没有可删除的，继续遍历

```java
class Solution {
    public String predictPartyVictory(String senate) {
        if (senate.length() == 1) return senate.charAt(0) == 'R' ? "Radiant" : "Dire";
        String temp;
        while (true){
            temp = deal(senate);
            if(temp.equals(senate)) return temp.charAt(0) == 'R' ? "Radiant" : "Dire";
            else senate = temp;
        }

    }
    public String deal(String senate){
        StringBuilder stringBuilder = new StringBuilder(senate);
        for (int i = 0; i < stringBuilder.length(); i++) {
            int index;
            if(stringBuilder.charAt(i) == 'R'){
                // 删除一个D
                if((index = stringBuilder.indexOf("D",i)) != -1){
                    stringBuilder.deleteCharAt(index);
                }else if((index = stringBuilder.indexOf("D")) != -1) {
                    stringBuilder.deleteCharAt(index);
                }
            }else {
                // 删除一个R
                if((index = stringBuilder.indexOf("R",i)) != -1){
                    stringBuilder.deleteCharAt(index);
                }else if((index = stringBuilder.indexOf("R")) != -1) {
                    stringBuilder.deleteCharAt(index);
                }
            }
        }
        return stringBuilder.toString();
    }
}
```
## 解法二：队列
建立两个队列`radiant`和`dire`，存放`senate`中R与D的下标    
建立一个循环，对这个两个队列不断出队，判断两个数的小标大小关系，将小的返回到原来的队列    
调出循环的条件为某一个队列为空，将另一个队列的对应字符串作为结果返回  

```java
class Solution {
    public String predictPartyVictory(String senate) {
        int n = senate.length();
        Queue<Integer> radiant = new LinkedList<Integer>();
        Queue<Integer> dire = new LinkedList<Integer>();
        for (int i = 0; i < n; ++i) {
            if (senate.charAt(i) == 'R') {
                radiant.offer(i);
            } else {
                dire.offer(i);
            }
        }
        while (!radiant.isEmpty() && !dire.isEmpty()) {
            // 出队
            int radiantIndex = radiant.poll(), direIndex = dire.poll();
            //入队
            if (radiantIndex < direIndex) {
                radiant.offer(radiantIndex + n);
            } else {
                dire.offer(direIndex + n);
            }
        }
        return !radiant.isEmpty() ? "Radiant" : "Dire";
    }
}
```