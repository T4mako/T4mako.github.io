---
date: 2023-08-12
category: 
  - 算法
tag: 
  - 链表
  - 递归
order: 206
---

# 206. 反转链表


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/reverse-linked-list/description/?envType=study-plan-v2&envId=leetcode-75)

解法思路：  
- 定义两个指针，初始指向 null 和 head 
- 在两个指针不断后移吧并改变指针的指向，时间复杂度为O(n)

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        if(head == null || head.next == null) return head;
        ListNode p = null;
        ListNode n = head;
        while(n != null){
            ListNode temp = n;
            n = n.next;
            temp.next = p;
            p = temp;
        }
        return p;
    }
}
```