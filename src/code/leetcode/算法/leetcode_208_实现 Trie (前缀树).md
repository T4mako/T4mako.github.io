---
date: 2023-09-08
category: 
  - 算法
tag: 
  - 字典树
  - 设计
  - 单调栈
article: true
---

# 208. 实现 Trie (前缀树)


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/implement-trie-prefix-tree/description/?envType=study-plan-v2&envId=leetcode-75)

解法一：哈希表  
建立哈希表，判断重复和前缀  

```java
class Trie {
    HashSet<String> set = new HashSet<>();
    public Trie() {

    }
    public void insert(String word) {
        set.add(word);
    }
    public boolean search(String word) {
        return set.contains(word);
    }
    public boolean startsWith(String prefix) {
        for (String s : set) {
            if(s.startsWith(prefix)) return true;
        }
        return false;
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