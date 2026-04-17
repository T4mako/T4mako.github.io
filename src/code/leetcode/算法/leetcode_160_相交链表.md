---
date: 2023-11-03
category: 
  - 算法
tag: 
  - 哈希表
  - 链表
  - 双指针
---


# 160. 相交链表

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/intersection-of-two-linked-lists/description/)

## 解法一：哈希表
使用哈希表存储一个链表的所有节点，通过另外一个链表的节点在哈希表中匹配查找相交的起始节点

```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        HashSet<ListNode> set = new HashSet<>();
        while (headA != null){
            set.add(headA);
            headA = headA.next;
        }
        while (headB != null){
            if(set.contains(headB)) return headB;
            else headB = headB.next;
        }
        return null;
    }
}
```

## 解法二：压缩长度
如果两个链表相交，那么相交点之后的长度是相同的   
让两个链表从同距离末尾同等距离的位置开始遍历。这个位置只能是较短链表的头结点位置。 为此，我们必须消除两个链表的长度差   
1. 指针 pA 指向 A 链表，指针 pB 指向 B 链表，依次往后遍历  
2. 如果 pA 到了末尾，则 pA = headB 继续遍历  
3. 如果 pB 到了末尾，则 pB = headA 继续遍历
4. 比较长的链表指针指向较短链表head时，长度差就消除了
5. 如此，只需要将最短链表遍历两次即可找到位置

```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    if (headA == null || headB == null) return null;
    ListNode pA = headA, pB = headB;
    while (pA != pB) {
        pA = pA == null ? headB : pA.next;
        pB = pB == null ? headA : pB.next;
    }
    return pA;
    }
}
```