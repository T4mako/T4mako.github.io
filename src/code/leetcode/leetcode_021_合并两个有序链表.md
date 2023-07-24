# 021_合并两个有序链表

>tag：递归、链表
>
>难度：简单

> 题目：
>
> 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
>
> 示例 1：
>
>
> 输入：l1 = [1,2,4], l2 = [1,3,4]
> 输出：[1,1,2,3,4,4]
> 示例 2：
>
> 输入：l1 = [], l2 = []
> 输出：[]
> 示例 3：
>
> 输入：l1 = [], l2 = [0]
> 输出：[0]
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/merge-two-sorted-lists
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
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        if(list1 == null){
            return list2;
        }
        if(list2 == null){
            return list1;
        }
        ListNode res = new ListNode();
        ListNode move = res;
        while(list1 != null || list2 != null){
            if(list1 == null){
                move.next = list2;
                break;
            }
            else if(list2 == null){
                move.next = list1;
                break;
            }
            else if(list1.val <= list2.val){
                move.next = list1;
                list1 = list1.next;
                move = move.next;
            }else{
                move.next = list2;
                list2 = list2.next;
                move = move.next;
            }
        }
        return res.next;
    }
}
```

建立一个res链表用于返回，通过list1，list2两个节点遍历链表，将值赋给新的链表节点中