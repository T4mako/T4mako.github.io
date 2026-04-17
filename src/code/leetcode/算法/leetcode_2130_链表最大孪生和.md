---
date: 2023-08-16
category: 
  - 算法
tag: 
  - 链表
  - 双指针
  - 栈
---

# 2130. 链表最大孪生和



<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/maximum-twin-sum-of-a-linked-list/description/?envType=study-plan-v2&envId=leetcode-75)


解题思路：  
使用 **快慢指针**  
慢指针和快指针初始都指向head  
慢指针将数逐个加入到数组中，快指针步长为 2  `right = right.next.next`  
当 right 为 null 时，慢指针指向第 size/2 + 1 个数  


::: code-tabs
@tab Java
```java
class Solution {
    public int pairSum(ListNode head) {
        ListNode left = head;
        ListNode right = head;
        int res = 0;
        ArrayList<Integer> list = new ArrayList<>();
        while (right != null){
            list.add(left.val);
            left = left.next;
            right = right.next.next;
        }
        int i = list.size() - 1;
        while (left != null){
            res = Math.max(list.get(i--) + left.val,res);
            left = left.next;
        }
        return res;
    }
}
```
@tab Ts
```ts
function pairSum(head: ListNode | null): number {
    let left:ListNode | null = head;
    let right:ListNode | null = head;
    let res:number = 0;
    let list:number[] = [];
    while (right != null){
        list.push(left.val);
        left = left.next;
        right = right.next.next;
    }
    let i:number = list.length - 1;
    while (left != null){
        res = Math.max(list[i--] + left.val,res);
        left = left.next;
    }
    return res;
};
```
:::
