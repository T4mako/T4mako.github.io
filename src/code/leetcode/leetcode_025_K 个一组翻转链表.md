# 025_K 个一组翻转链表

> tag：递归、链表
>
> 难度：困难

> 题目：
>
> 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
>
> k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
>
> 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
>
> 示例 1：
>
> 输入：head = [1,2,3,4,5], k = 2
> 输出：[2,1,4,3,5]
> 示例 2：
>
> 输入：head = [1,2,3,4,5], k = 3
> 输出：[3,2,1,4,5]
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/reverse-nodes-in-k-group
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法：

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