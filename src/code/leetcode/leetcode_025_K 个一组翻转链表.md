---
category: 
  - 算法
tag: 
  - 链表
  - 递归
---

# 025_K 个一组翻转链表

<Badge text="困难" type="danger" vertical="middle" />


```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode p = head;
        ListNode s = head;
        int i;
        int[] temp = new int[k];
        while(s.next != null){
            int count = 0;
            for(i = 0;i < k ;i++){
                temp[i] = s.val;
                if(s.next != null){
                    s = s.next;
                    count++;
                }
                
            }
            if(i == k && (count == k - 1 || count == k)){
                for(i = 0;i < k;i++){
                p.val = temp[k - i - 1];
                p = p.next;
            }
            }
        }
        return head;
    }
}
```

创建两个指针s，p，通过for循环将s指针每次扫过k个元素，将其数据存储到事先创建好的一维数组，通过p指针移动相同位置，将数组中的值逆序赋给p扫过的位置，并用一个count记录，如果count的值不是k或k-1时，说明元素不足k个，就没必要赋值