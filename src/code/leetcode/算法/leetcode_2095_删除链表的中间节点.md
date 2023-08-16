---
article: false
date: 2023-08-15
category: 
  - 算法
tag: 
  - 链表
  - 双指针
---

# 2215. 找出两数组的不同


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/delete-the-middle-node-of-a-linked-list/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：  
使用 **快慢指针** 
- 初始时，快指针指向下标为 1 的结点，慢指针指向下标为 0 的结点
- 判断快指针的下一个和下下一个结点是否存在
  - 若存在，快指针移动两下，慢指针移动一下
  - 若不存在，退出循环，此时慢指针指向需要移除的结点的前一个节点
    - `left.next = left.next.next;` 即可

::: code-tabs
@tab Java
```java
class Solution {
    public ListNode deleteMiddle(ListNode head) {
        if(head.next == null) return null;
        ListNode left = head;
        ListNode right = head.next;
        while(right.next != null && right.next.next != null){
            left = left.next;
            right = right.next.next;
        }
        left.next = left.next.next;
        return head;
    }
}
```
@tab Ts
```ts
function deleteMiddle(head: ListNode | null): ListNode | null {
    if(head.next == null) return null;
    let left = head;
    let right = head.next;
    while(right.next != null && right.next.next != null){
        left = left.next;
        right = right.next.next;
    }
    left.next = left.next.next;
    return head;
};
```
:::