---
date: 2026-07-30
category: 
  - 算法
tag: 
  - 哈希表
  - 链表
  - 双指针
---

# 142.环形链表II

## 解法一：Set 存储

:::code-tabs
@tab Python
```py
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if (head == None or head.next == None): return None
        node_dict = defaultdict()
        cur = head
        while (cur != None):
            if(node_dict.get(cur) != None):
                return cur
            else:
                node_dict[cur] = 1
                cur = cur.next
        return None
```
:::

## 解法二：快慢指针

定义一个快指针一个慢指针，如果有环，快指针和慢指正会相遇

假设 链表的非环长度为 a，环长度为 b

- 快指针 `f = 2s` （快指针每次2步，路程刚好 2 倍）
- 快指针 `f = s + nb` （相遇时，刚好多走了 n 圈，n 必为整数）
- 两式子相减得到 `s = nb，f = 2nb`
- 而 `a + nb` 必然为入口节点 （n 为整数），slow 指针已经走了 n 步，如何再走 a 步？
- 让 fast 从 head 开始走 a 步，slow 与 fast 必然重合在入口节点


:::code-tabs
@tab Python
```py
class Solution(object):
    def detectCycle(self, head):
        fast, slow = head, head
        while True:
            if not (fast and fast.next): return
            fast, slow = fast.next.next, slow.next
            if fast == slow: break
        fast = head
        while fast != slow:
            fast, slow = fast.next, slow.next
        return fast
```
:::