---
category: 
  - 算法
tag: 
  - 双指针
  - 链表
---

# 061. 旋转链表
<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/rotate-list/description/)

解法思路：
- 先通过一次遍历计算链表节点个数
- 将链表连成环
- 新链表的最后一个节点为原链表的 n - 1 - (k mode n) 个节点
- 将当前闭合为环的链表断开，即可得结果

```java
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (k == 0 || head == null || head.next == null) {
            return head;
        }
        int n = 1;
        ListNode iter = head;
        while (iter.next != null) {
            iter = iter.next;
            n++;
        }
        int add = n - k % n;
        if (add == n) {
            return head;
        }
        iter.next = head;
        while (add-- > 0) {
            iter = iter.next;
        }
        ListNode ret = iter.next;
        iter.next = null;
        return ret;
    }
}
```
