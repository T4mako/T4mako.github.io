# 011_盛最多水的容器

> tag：贪心、双指针、数组
>
> 难度：中等

> 题目：
>
> 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
>
> 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
>
> 返回容器可以储存的最大水量。
>
> 说明：你不能倾斜容器。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/container-with-most-water
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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