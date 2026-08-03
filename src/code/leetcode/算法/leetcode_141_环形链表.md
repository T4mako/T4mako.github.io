---
date: 2023-10-28
category: 
  - 算法
tag: 
  - 哈希表
  - 链表
  - 双指针
---

# 141. 环形链表

## 解法一：Set 存储

:::code-tabs
@tab Java
```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        HashSet<ListNode> set = new HashSet<>();
        while (head != null){
            if(!set.add(head)) return true; // add() 未添加成功返回 false
            head = head.next;
        }
        return false;
    }
}
```
:::

## 解法二：快慢指针

定义一个快指针一个慢指针，如果有环，快指针和慢指正会相遇

:::code-tabs
@tab Java
```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        ListNode slow = head;
        ListNode fast = head.next;
        while (slow != fast) {
            if (fast == null || fast.next == null) {
                return false;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        return true;
    }
}
```
@tab Python
```py
class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        if not head or not head.next:
            return False
        
        slow = head
        fast = head.next

        while slow != fast:
            if not fast or not fast.next:
                return False
            slow = slow.next
            fast = fast.next.next
        
        return True
```
:::