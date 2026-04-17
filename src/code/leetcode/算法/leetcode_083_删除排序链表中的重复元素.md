---
category: 
  - 算法
tag: 
  - 链表
data: 2023-10-29
---

# 83. 删除排序链表中的重复元素

解法：  
初始时，建立两个指针，分别指向 `iter = head` 和 `next = head.next`，判断连个指针所指值的大小
- 如果 next 为空，`iter.next = null;`
- 如果 `iter.val == next.val`，next 后移
- 如果 `iter.val != next.val`，将 iter.next 指向 next，将 iter 指向 next，next 后移一位

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null) return null;
        ListNode iter = head;
        ListNode next = iter.next;
        while (true){
            if (next == null) {
                iter.next = null; 
                return head;
            }
            else if (iter.val == next.val){
                next = next.next;
            }
            else {
                iter.next = next;
                iter = next;
                next = next.next;
            }
        }
    }
}
```

