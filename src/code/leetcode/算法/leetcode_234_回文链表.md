---
article: false
date: 2023-10-27
category: 
  - 算法
tag: 
  - 栈
  - 递归
  - 双指针
  - 链表
---

# 234. 回文链表

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/palindrome-linked-list/description/)


## 解法一：链表值移至数组

```java
class Solution {
    public boolean isPalindrome(ListNode head) {
        List<Integer> vals = new ArrayList<Integer>();

        // 将链表的值复制到数组中
        ListNode currentNode = head;
        while (currentNode != null) {
            vals.add(currentNode.val);
            currentNode = currentNode.next;
        }

        // 使用双指针判断是否回文
        int front = 0;
        int back = vals.size() - 1;
        while (front < back) {
            if (!vals.get(front).equals(vals.get(back))) {
                return false;
            }
            front++;
            back--;
        }
        return true;
    }
}
```

## 解法二：快慢指针

链表后半部分可以使用反转链表

```java
class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode fast = head;
        ListNode slow = head;
        LinkedList<Integer> list = new LinkedList<>();
        while (fast.next != null && fast.next.next != null){
            list.add(slow.val);
            slow = slow.next;
            fast = fast.next.next;
        }
        if(fast.next != null) list.add(slow.val);
        slow = slow.next;
        while (slow != null) {
            if(list.get(list.size() - 1) != slow.val) return false;
            list.remove(list.size() - 1);
            slow = slow.next;
        }
        return true;
    }
}
```