---
category: 
  - 算法
tag: 
  - 链表
  - 双指针
---

# 019_删除链表的倒数第 N 个结点

<Badge text="中等" type="warning" vertical="middle" />


```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode left = head;
        ListNode right = head.next;
        ListNode s = head;
        int count = 0;
        while(s != null){
            count++;
            s = s.next;
        }
        if(n == count){
            return head.next;
        }
        while(n < count-1){
            right = right.next;
            left = left.next;
            count--;
        }
        if(n == 1){
            left.next = null;
            return head;
        }else{
            left.next = right.next;
            return head;
        }
    }
}
```

先遍历一边链表，得出链表的总个数count，如果n=count，返回head.next，否则定义一个left和right指针，指针不断后移，count--，直到count==n，判断right后面是否有值，如果没有，left.next = null，否则left.next = right.next