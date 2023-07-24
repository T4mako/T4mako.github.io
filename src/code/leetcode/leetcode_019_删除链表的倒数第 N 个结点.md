# 019_删除链表的倒数第 N 个结点

> tag：链表、双指针
>
> 难度：中等

> 题目：
>
> 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
>
>  
>
> 示例 1：
>
>
> 输入：head = [1,2,3,4,5], n = 2
> 输出：[1,2,3,5]
> 示例 2：
>
> 输入：head = [1], n = 1
> 输出：[]
> 示例 3：
>
> 输入：head = [1,2], n = 1
> 输出：[1]
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/remove-nth-node-from-end-of-list
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 

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