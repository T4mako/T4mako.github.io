---
category: 
  - 算法
tag: 
  - 链表
  - 双指针
data: 2024-03-19
---

# 82. 删除排序链表中的重复元素 II

<Badge text="中等" type="tiwarning" vertical="middle" />

解法：  建立新的链表，使用双指针校验，手动添加节点

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
		if (head == null || head.next == null)
			return head;
		ListNode res = new ListNode(0);
		ListNode fol = res;
		ListNode left = head;
		ListNode right = head.next;
		while (right != null) {
			if (left.val != right.val && left.next == right) {
				fol.next = new ListNode(left.val); // add non-duplicate to result list
	            fol = fol.next;
	            left = right;
	            right = right.next;
			} else if (left.val != right.val) {
				left = right;
				right = right.next;
			} else {
				right = right.next;
			}
		}
		if (left.next == null) {
			fol.next = new ListNode(left.val);
		}
		return res.next;

	}
}
```