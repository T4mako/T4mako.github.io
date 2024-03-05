---
category: 
  - 算法
tag: 
  - 链表
data: 2024-03-05
---

# 92. 反转链表 II

<Badge text="中等" type="tiwarning" vertical="middle" />

解法：  
使用四个指针代表 start，end 和要改变方向的结点，最后再拼接起来

```java
class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
		if (head == null || head.next == null || left == right)
			return head;
		ListNode leftNode = null;
		ListNode rightNode = head;
		ListNode l;
		ListNode r;
		int i = 1;
		while (i < right + 1) {
			if (i < left) {
				if (leftNode == null)
					leftNode = head;
				else
					leftNode = leftNode.next;
			}
			rightNode = rightNode.next;
			i++;
		}
		l = leftNode == null ? head : leftNode.next;
		r = l.next;
		while (r != rightNode) {
			ListNode temp = r.next;
			r.next = l;
			l = r;
			r = temp;
		}
		ListNode temp = head;
		if (leftNode == null) {
			temp.next = rightNode;
            return l;
		} else {
			leftNode.next.next = rightNode;
			leftNode.next = l;
		}

		return head;
	}
}
```