# 023_合并 K 个升序链表

> tag：链表、分支、堆、归并
>
> 难度：困难

> 题目：
>
> 给你一个链表数组，每个链表都已经按升序排列。
>
> 请你将所有链表合并到一个升序链表中，返回合并后的链表。
>
> 示例 1：
>
> 输入：lists = [[1,4,5],[1,3,4],[2,6]]
> 输出：[1,1,2,3,4,4,5,6]
> 解释：链表数组如下：
> [
>   1->4->5,
>   1->3->4,
>   2->6
> ]
> 将它们合并到一个有序链表中得到。
> 1->1->2->3->4->4->5->6
> 示例 2：
>
> 输入：lists = []
> 输出：[]
> 示例 3：
>
> 输入：lists = [[]]
> 输出：[]
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/merge-k-sorted-lists
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 解法：

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
    public ListNode mergeKLists(ListNode[] lists) {
        if(lists.length == 0 || lists == null){
            return null;
        }
        ListNode p = new ListNode();
        ListNode res = p;
        ArrayList<Integer> list = new ArrayList();
        int i = 0;
        ListNode s = lists[0];
        while(i < lists.length){
            while(s == null && (i+1) < lists.length){
                s = lists[++i];
            }
            if(s != null){
                list.add(s.val);
                s = s.next;
            }else{
                break;
            }
        }
        Collections.sort(list);
        int j = 0;
        if(list.size() == 0){
            return null;
        }
        while(j < list.size()){
            p.val = list.get(j);
            if(j != list.size() - 1){
                p.next = new ListNode();
                p = p.next;
            }
            j++;
            
        }
        return res;
    }
}
```

先求出数组 lists 的长度，建立一个int型的变量i，用一个指针指向每一个链表，如果为空，且下一个链表存在，则s赋给下一个链表，如果链表部位空，将里面的值添加到ArrayList中，如果i的值到了lists.length()-1,则退出循环，左后将数组排序，将其中的值赋值给一个新的链表。该算法的时间复杂度为O(nlogn)