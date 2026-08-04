---
date: 2026-08-04
category: 
  - 算法
tag: 
  - 哈希表
  - 链表
---

# 138. 随机链表的复制



<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/copy-list-with-random-pointer/description/?)


解法：先把 next 链创建出来，然后使用 dict 存储两个链表对应的节点为 kv，对应的 random 也可以取出来

```py
"""
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random
"""

class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        cur = head
        d_head = dict()
        res = Node(0)
        res_cur = res
        while (cur != None):
            res_cur.next = Node(cur.val)
            d_head[cur] = res_cur.next
            cur = cur.next
            res_cur = res_cur.next
        cur = head
        for k,v in d_head.items():
            if (k.random == None):
                v.random = None
            else:
                v.random = d_head[k.random]
        return res.next
```