# 002_两数相加

> tag：递归、链表、数学
>
> 难度：中等

> 题目：
>
> 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。  
> 请你将两个数相加，并以相同形式返回一个表示和的链表。  
> 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/add-two-numbers
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：

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

> 建立两个 ListNode，分别为 result 和 cur，将 result 赋给 cur，循环遍历条件为(l1 != null || l2 != null || i != 0)，使得即使l1，12都循环结束，而i=1，仍然继续执行一次。在循环体内首先判断参数l1和l2的ListNode是否存在，若存在则取出值，若不存在则为，维护一个整数i，赋值为(x+y+i)/10用于判断是否需要进位，将计算的值赋给cur.next，并将cur.next赋给cur，便于下一次操作，最后返回result.next，为一个链表，此算法的时间复杂度为O(n)。