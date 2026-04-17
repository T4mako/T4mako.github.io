---
category: 
  - 算法
tag: 
  - 递归
  - 链表
---
# 021_合并两个有序链表

<Badge text="简单" type="tip" vertical="middle" />


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