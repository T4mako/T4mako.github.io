---
date: 2023-07-31
category: 
  - 算法
tag: 
  - 数组
  - 前缀和
article: false
---
# 724_寻找数组的中心下标

<Badge text="简单" type="tip" vertical="middle" />

```java
class Solution {
    public int pivotIndex(int[] nums) {
        int len = nums.length;
        int sum = 0;
        for(int num : nums) sum += num;
        int mid = 0;
        int left = 0;
        for(;mid<len;mid++){
            left+=nums[mid];
            if(left == sum - left + nums[mid]){
                return mid;
            }
        }
        return -1;
    }
}
```
计算总和O(n)
比较左边和与总和减去左边和O(n)

