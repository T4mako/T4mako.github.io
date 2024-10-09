---
date: 2024-06-19
category: 
  - 算法
tag: 
  - 链表
  - 双指针
---

# 875. 爱吃香蕉的珂珂


<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/middle-of-the-linked-list/description/)


```py
class Solution(object):
    def middleNode(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        left = head
        right = head
        i = 1
        while(right.next != None):
            if(i):
                left = left.next
                i -= 1
            else:
                i += 1
            right = right.next
        return left
```