---
date: 2024-02-29
category: 
  - 算法
tag: 
  - 数组
  - 二分查找
  - 滑动窗口
---

# 209. 长度最小的子数组


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/minimum-size-subarray-sum/description/?envType=study-plan-v2&envId=top-interview-150)

解法：滑动窗口，有指针不断向右，当合大于等于 target 时，记录长度，移动左指针 

```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int res = Integer.MAX_VALUE;
        int len = nums.length;
        int left = 0, right = 0;
        int sum = 0;
        while (right < len) {
            sum += nums[right++];
            while (sum >= target) {
                res = Math.min(res, right - left);
                sum -= nums[left++];
            }
        }
        
        return (res == Integer.MAX_VALUE) ? 0 : res;
    }
}
```

解法二：字典树
给类定义一个 `Trie[26]` 数组，数组存放 Trie 对象，下标对应 26 个字母  
定义前缀末尾对应节点 isEnd，isEnd 为真，则说明字典树中存在该字符串。
```java
class Trie {
    private Trie[] children;
    private boolean isEnd;

    public Trie() {
        children = new Trie[26];
        isEnd = false;
    }
    
    public void insert(String word) {
        Trie node = this;
        for (int i = 0; i < word.length(); i++) {
            int index = word.charAt(i) - 'a'; // 字符下标
            if (node.children[index] == null) {
                node.children[index] = new Trie();
            }
            node = node.children[index]; // 递归创建
        }
        node.isEnd = true; // 末尾 Trie 对象 isEnd 为 true
    }
    
    public boolean search(String word) {
        Trie node = searchPrefix(word);
        return node != null && node.isEnd; // 查找到最后一位
    }
    
    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null; // 查找到不是空
    }

    private Trie searchPrefix(String prefix) {
        Trie node = this;
        for (int i = 0; i < prefix.length(); i++) {
            char ch = prefix.charAt(i);
            int index = ch - 'a';
            if (node.children[index] == null) {
                return null; // 未查到
            }
            node = node.children[index];
        }
        return node;
    }
}
```