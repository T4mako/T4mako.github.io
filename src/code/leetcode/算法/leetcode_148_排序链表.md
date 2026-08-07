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

[题目](https://leetcode.cn/problems/sort-list/)

解法：遍历

:::code-tabs 
@tab Java
```java
class Solution {
    public ListNode sortList(ListNode head) {
		if(head == null) return null;
		ListNode node = head;
		ArrayList<Integer> list = new ArrayList<>();
		while(node != null) {
			list.add(node.val);
			node = node.next;
		}
		Object[] array = list.toArray();
		Arrays.sort(array);
		ListNode res = new ListNode((int)array[0]);
		ListNode idx = res;
		for (int i = 1; i < array.length; i++) {
			idx.next = new ListNode((int)array[i]);
			idx = idx.next;
		}
		return res;
    }
}
```
@tab Python
```py
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        node_vals = []
        cur = head
        while(cur != None):
            node_vals.append(cur.val)
            cur = cur.next
        node_vals = sorted(node_vals)
        cur = head
        idx = 0
        while (cur != None):
            cur.val = node_vals[idx]
            idx += 1
            cur = cur.next
        return head
```
:::