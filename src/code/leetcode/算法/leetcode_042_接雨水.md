---
category: 
  - 算法
tag: 
  - 数组
  - 栈
  - 双指针
  - 动态规划
  - 单调栈
---

# 042_接雨水

<Badge text="困难" type="danger" vertical="middle" />

## 解法一：

```java
class Solution {
    public int trap(int[] height) {
        if(height.length <= 1 ){
            return 0;
        }
        int left = 0,right = 0;
        for (int i = 0; i < height.length; i++) {
            if(height[i] > height[left]){
                left = i;
            }
        }
        for (int i = 0; i < height.length; i++) {
            if(height[i] > height[right] && i != left){
                right = i;
            }

        }
        if(left > right){
            right = left + right;
            left = right - left;
            right = right - left;
        }
        return add(left,right,height)+leftsum(0,left,height)+rightsum(right,height.length-1,height);

    }
    public int leftsum(int left,int right,int[] height){
        if(left+1 >= right){
            return 0;
        }
        int index = 0;
        for(int i = 0;i < right;i++){
            if(height[index] < height[i]){
                index = i;
            }
        }
        return add(index,right,height)+leftsum(0,index,height);
    }
    public int rightsum(int left,int right,int[] height){
        if(left+1 >= right){
            return 0;
        }
        int index = left+1;
        for(int i = left+1;i < height.length;i++){
            if(height[index] < height[i]){
                index = i;
            }
        }
        return add(left,index,height)+rightsum(index,right,height);
    }
    public int add(int left,int right,int[] height){
        if(left + 1 >= right){
            return 0;
        }
        int min = Math.min(height[left],height[right]);
        if(min == 0){
            return 0;
        }
        int sum = 0;
        for(int i = left + 1;i < right;i++){
            sum += min - height[i];
        }
        return sum;
    }
}
```


 将传入的数组找到最大高度和次大高度，计算中间的值，将两边剩余的数组建立leftsum和rightsum的两个方法，得到次高长度后计算值并递归调用leftsum和rightsum方法，最后得出最大值


## 解法二

```java
int sum = 0;
        int[] max_left = new int[height.length];
        int[] max_right = new int[height.length];

        for (int i = 1; i < height.length - 1; i++) {
            max_left[i] = Math.max(max_left[i - 1], height[i - 1]);
        }
        for (int i = height.length - 2; i >= 0; i--) {
            max_right[i] = Math.max(max_right[i + 1], height[i + 1]);
        }
        for (int i = 1; i < height.length - 1; i++) {
            int min = Math.min(max_left[i], max_right[i]);
            if (min > height[i]) {
                sum = sum + (min - height[i]);
            }
        }
        return sum;
```

对于第i列，只要知道其左边最高列和右边最高列就可以知道它对应的值，建立两个数组，存放第i列对应的左右最高值，最后通过for循环相加返回

## 解法二优化：

```java
public int trap(int[] height) {
    int sum = 0;
    int max_left = 0;
    int max_right = 0;
    int left = 1;
    int right = height.length - 2; // 加右指针进去
    for (int i = 1; i < height.length - 1; i++) {
        //从左到右更
        if (height[left - 1] < height[right + 1]) {
            max_left = Math.max(max_left, height[left - 1]);
            int min = max_left;
            if (min > height[left]) {
                sum = sum + (min - height[left]);
            }
            left++;
        //从右到左更
        } else {
            max_right = Math.max(max_right, height[right + 1]);
            int min = max_right;
            if (min > height[right]) {
                sum = sum + (min - height[right]);
            }
            right--;
        }
    }
    return sum;
}
```


不需要预先定义数组和遍历数组，通过一个for循环，在遍历时，如果`height[left-1]<right[left-1]`，那么较小的最高处一定在左边，相反在右边，此时将left指正右移即可