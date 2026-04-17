---
category: 
  - 算法
tag: 
  - 双指针
---

# 86. 分隔链表

[题目描述](https://leetcode.cn/problems/merge-sorted-array/description/)

<Badge text="简单" type="tip" vertical="middle" />

:::code-tabs
@tab Java
```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        if(nums2.length == 0) return;
        int i = m + n - 1;
        m--;n--;
        while(i >= 0){
            if(m < 0) nums1[i--] = nums2[n--];
            else if(n < 0) nums1[i--] = nums1[m--];
            else if(nums1[m] < nums2[n]){
                nums1[i--] = nums2[n--];
            }else{
                nums1[i--] = nums1[m--];
            }
        }
    }
}
```
@tab Python
```py
class Solution(object):
    def reverseList(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        res = None
        h = head
        while(h != None):
            res = ListNode(h.val,res)
            h = h.next
        return res
```
:::

