---
category: 
  - 算法
tag: 
  - 递归
  - 链表
---

# 203. 移除链表元素


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/remove-linked-list-elements/description/)


```java
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        if (head == null) return null;
        ListNode res = new ListNode();
        res.next = head;
        ListNode node = res;
        while (node.next != null){
            if(node.next.val == val){
                if (node.next.next != null) node.next = node.next.next;
                else node.next = null;
            }else {
                node = node.next;
            }

        }
        return res.next;
    }
}
```