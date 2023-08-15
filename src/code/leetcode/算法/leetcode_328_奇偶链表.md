---
date: 2023-08-15
category: 
  - 算法
tag: 
  - 链表
article: false
---

# 735. 行星碰撞

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/odd-even-linked-list/description/?envType=study-plan-v2&envId=leetcode-75)

解法：    
定义两个指针，odd，even交替移动，将经过的结点存贮给odds和evens


```java
class Solution {
    public ListNode oddEvenList(ListNode head) {
        if(head == null || head.next == null) return head;
        ListNode odd = head;
        ListNode even = head.next;
        ListNode odds = head;
        ListNode oddFir = odds;
        ListNode evens = head.next;
        ListNode evenFir = evens;
        while (true){
            if(even.next != null){
                odds.next = even.next;
                odd = even.next;
                odds = odds.next;
            }else {
                odd.next = null;
                odds.next = evenFir;
                return oddFir;
            }
            if(odd.next != null){
                evens.next = odd.next;
                even = odd.next;
                evens = evens.next;
            }else {
                even.next = null;
                odd.next = evenFir;
                return oddFir;
            }
        }
    }
}
```