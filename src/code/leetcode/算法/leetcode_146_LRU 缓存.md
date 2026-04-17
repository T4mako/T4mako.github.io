---
date: 2024-03-23
category: 
  - 算法
tag: 
  - 哈希表
  - 链表
  - 双向链表
---

# 146. LRU 缓存

<Badge text="中等" type="warning" vertical="middle" />

[解法](https://leetcode.cn/problems/lru-cache/solutions/259678/lruhuan-cun-ji-zhi-by-leetcode-solution/)

```java
class LRUCache {

    private LinkedHashMap<Integer, Integer> cache;

    public LRUCache(final int capacity) {
        cache = new LinkedHashMap<Integer, Integer>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > capacity;
            }
        };
    }

    public int get(int key) {
        return cache.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        cache.put(key, value);
    }
}
```