# 024_两两交换链表中的节点

> tag：递归、链表
>
> 难度：中等

> 题目：
>
> 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
>
> 示例 1：
>
>
> 输入：head = [1,2,3,4]
> 输出：[2,1,4,3]
> 示例 2：
>
> 输入：head = []
> 输出：[]
> 示例 3：
>
> 输入：head = [1]
> 输出：[1]
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/swap-nodes-in-pairs
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
    public ListNode swapPairs(ListNode head) {
        if(head == null || head.next == null){
            return head;
        }
        ListNode temp = head.next;
        if(head.next.next != null){
            head.next = head.next.next;
        }else{
            head.next.next = head;
            head = head.next;
            head.next.next = null;
            return head;
        }
        temp.next = head;
        head = temp;
        ListNode i  = head.next;
        while(i.next != null && i.next.next != null){
            ListNode t3 = i.next;
            ListNode t4 = i.next.next;
            ListNode t5 = null;
            if(t4.next != null){
                t5 = t4.next;
            }
            i.next = t4;
            t4.next = t3;
            if(t5 == null){
                t3.next = null;
                return head;
            }
            t3.next = t5;
            i = i.next.next;
        }
        return head;
    }
}
```

 将链表元素为0，链表元素为1的情况直接返回原来数组即可，当元素为2，改变连个节点元素的指针指向， 并返回，如果元素节点大于等于三个，设置一个指针i，指向第双数个元素节点，通过临时变量将元素i的洗衣歌，下下一个，下下下一个元素记录，并改变它们的指针指向，然后将i指针后移两个，直到指针的下一个元素节点或者下下一个元素节点都不存在时，结束循环，返回head指针。