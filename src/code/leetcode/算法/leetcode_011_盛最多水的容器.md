---
category: 
  - 算法
tag: 
  - 贪心
  - 双指针
  - 数组

 
---

# 011_盛最多水的容器

<Badge text="中等" type="warning" vertical="middle" />

```java
class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int res = Math.min(height[left] , height[right]) * (right  - left);
        while(left < right){
            int min = Math.min(height[left], height[right]);
            while(height[right] <= min && left < right){
                right--;
            }
            while(height[left] <= min && left < right){
                left++;
            }
            res  = res > (right - left)*Math.min(height[left], height[right]) ? res : (right - left)*Math.min(height[left], height[right]);

        }
        return res;
    }
}
```

创建两个 int 型数据 left，right，计算水池的面积，由于左右指针的移动会使得left到right的举例变短，若果要获得更大的水的面积，将left与right中更短的边移动，直到移动到的那条边超过left和right中的最短边。