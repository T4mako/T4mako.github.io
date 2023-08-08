---
category: 
  - 算法
tag: 
  - 分治
  - 二分
  - 数组
order: 4
---
# 004. 寻找两个正序数组的中位数

<Badge text="困难" type="danger" vertical="middle" />


## 解法一：归并排序

```java
public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if(nums1.length == 0){
            if(nums2.length % 2 == 0){
                return (nums2[nums2.length/2-1] + nums2[nums2.length/2])/2.0;
            }else{
                return nums2[nums2.length/2];
            }
        }
        if(nums2.length == 0){
            if(nums1.length % 2 == 0){
                return (nums1[nums1.length/2-1] + nums1[nums1.length/2])/2.0;
            }else{
                return nums1[nums1.length/2];
            }
        }
        int[] nums = new int[nums1.length + nums2.length];
        int len1 = nums1.length;
        int len2 = nums2.length;
        int len = len1 + len2;
        int i,j,k;
        for(i = 0,j = 0,k = 0;i < len1 || j < len2;k++){
            if(i >= len1){
                nums[k] = nums2[j];
                j++;
                continue;
            }
            if(j >= len2){
                nums[k] = nums1[i];
                i++;
                continue;
            }
            if(nums1[i] <= nums2[j]){
                nums[k] = nums1[i];
                i++;
                continue;
            }
            if(nums1[i] > nums2[j]){
                nums[k] = nums2[j];
                j++;
                continue;
            }
        }
        return len%2 == 1 ? nums[len/2] : (nums[len/2 - 1]+nums[len/2])/2.0;
    }
```



## 解法二：二分法

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;
        //第k个数
        int left = (m+n+1)/2;
        int right = (m+n+2)/2;
        return(findKth(nums1,0,nums2,0,left)+findKth(nums1,0,nums2,0,right))/2.0;
    }
    public int findKth(int[] nums1,int start1,int[] nums2,int start2,int k){
        if(start1 >= nums1.length) return nums2[k + start2 - 1];
        if(start2 >= nums2.length) return nums1[k + start1 - 1];
        if(k == 1) return nums1[start1] < nums2[start2] ? nums1[start1] : nums2[start2];
        int temp1 = (start1 + k/2 - 1 < nums1.length) ? nums1[start1 + k/2 - 1] : Integer.MAX_VALUE;
        int temp2 = (start2 + k/2 -1 < nums2.length) ? nums2[start2 + k/2 -1] : Integer.MAX_VALUE;
        if(temp1 >= temp2){
            start2 = start2 + k/2;
            return findKth(nums1,start1,nums2,start2,k - k/2);
        }else{
            start1 = start1 + k/2;
            return findKth(nums1,start1,nums2,start2,k - k/2);
        }
    }
}
```


题目提示算法的时间复杂度为O(log(n+m))，看到logn的复杂度就想到二分法，对于这题两个数组的和可能是奇数也可能是偶数，即m+n 的奇偶不确定。为了简化代码，分别找 **第 (m+n+1) / 2 个，和 (m+n+2) / 2 个**，然后求其平均值即可，这对奇偶数均适用。  
定义一个函数来在两个有序数组中找到第 K 个元素，函数参数为两个原始数组和两个开始的指针与要找的第 k 个数。  
当某一个 数组的起始位置大于等于其数组长度 时，实际上就变成了在 另一个数组中找数字。如果 K=1的话，那么我们只要比较 nums1 和 nums2 的起始位置 i 和 j 上的数字就可以了。在正常情况下，对K二分，先检查一下，数组中到底存不存在第K/2个数字，如果存在就取出来，否则就赋值上一个整型最大值。如果某个数组没有第K/2个数字，那么我们就淘汰另一个数字的前K/2个数字即可。比较这两个数组的第K/2小的数字temp1，temp2的大小，如果第一个数组的第K/2个数字小的话，那么说明我们要找的数字肯定不在nums1中的前K/2个数字，所以我们可以将其淘汰，将nums1的起始位置向后移动K/2个，并且此时的K也自减去K/2，调用递归。反之，淘汰nums2中的前K/2个数字，并将nums2的起始位置向后移动K/2个，并且此时的K也自减去K/2，调用递归即可。



