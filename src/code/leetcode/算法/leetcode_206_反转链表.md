---
date: 2023-08-12
category: 
  - 算法
tag: 
  - 链表
  - 递归
---

# 206. 反转链表


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/reverse-linked-list/description/?envType=study-plan-v2&envId=leetcode-75)


## 双指针（迭代）

解法思路：  
- 定义两个指针，初始指向 null 和 head 
- 在两个指针不断后移吧并改变指针的指向，时间复杂度为O(n)

:::code-tabs
@tab Java
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
@tab Python
```py
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        h,pre = None,head
        while(pre != None):
            tmp = pre.next
            pre.next = h
            h = pre
            pre = tmp
        return h
```
:::

## 递归


```py
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        def recur(cur, pre):
            if not cur: return pre     # 终止条件
            res = recur(cur.next, cur) # 递归后继节点
            cur.next = pre             # 修改节点引用指向
            return res                 # 返回反转链表的头节点
        
        return recur(head, None)       # 调用递归并返回
```