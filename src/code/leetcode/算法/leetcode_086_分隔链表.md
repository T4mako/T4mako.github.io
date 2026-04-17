---
category: 
  - 算法
tag: 
  - 链表
  - 双指针
data: 2024-03-20
---

# 86. 分隔链表

[题目描述](https://leetcode.cn/problems/partition-list/)

<Badge text="中等" type="warning" vertical="middle" />

解法思路：创建新链表，遍历链表

```java
class Solution {
    public ListNode partition(ListNode head, int x) {
		if(head == null || head.next == null) return head;
		ListNode l = new ListNode(0);
		ListNode le = l;
		ListNode r = new ListNode(0);
		ListNode re = r;
		ListNode node = head;
		while(node != null) {
			if(node.val < x) {
				le.next = new ListNode(node.val);
				le = le.next;
			}else {
				re.next = new ListNode(node.val);
				re = re.next;
			}
			node = node.next;
		}
		le.next = r.next;
		return l.next;
    }
}
```

