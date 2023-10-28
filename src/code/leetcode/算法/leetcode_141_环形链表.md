---
date: 2023-10-28
category: 
  - 算法
tag: 
  - 哈希表
  - 链表
  - 双指针
article: false
---

# 141. 环形链表

## 解法一：Set 存储

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

## 解法二：快慢指针

定义一个快指针一个慢指针，如果有环，快指针和满指正会相遇

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
