---
category: 
  - 算法
tag: 
  - 递归
  - 链表
  - 数学

 
---
# 002. 两数相加

<Badge text="中等" type="warning" vertical="middle" />


## 解法：
:::code-tabs
@tab Java
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode result = new ListNode(0); // 返回结果链表
        ListNode cur = result; // 链表头
        int i = 0; // 进位
        while(l1 != null || l2 != null || i != 0){
            int x = l1 != null ? l1.val : 0; // 溢出，赋值为0
            int y = l2 != null ? l2.val : 0;
            cur.next = new ListNode((x+y+i)%10);
            i = (x+y+i)/10; // 进位
            cur = cur.next;
            if(l1 != null)l1 = l1.next;
            if(l2 != null)l2 = l2.next;
        }
        return result.next;
    }
}
```
@tab Python
```py
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        res = ListNode()
        cur = res
        carry = 0
        while l1 is not None or l2 is not None or carry != 0:
            x = l1.val if l1 else 0
            y = l2.val if l2 else 0
            
            total = x + y + carry
            carry = total // 10
            cur.next = ListNode(total % 10)
            
            cur = cur.next
            if l1: l1 = l1.next
            if l2: l2 = l2.next
        
        return res.next
        
```
> 建立两个 ListNode，分别为 result 和 cur，将 result 赋给 cur，循环遍历条件为(l1 != null || l2 != null || i != 0)，使得即使l1，12都循环结束，而 i=1，仍然继续执行一次。在循环体内首先判断参数 l1 和 l2 的 ListNode 是否存在，若存在则取出值，若不存在则为，维护一个整数i，赋值为 (x+y+i)/10 用于判断是否需要进位，将计算的值赋给 cur.next，并将 cur.next 赋给 cur，便于下一次操作，最后返回result.next，为一个链表，此算法的时间复杂度为 O(n)。