---
date: 2024-02-28
category: 
  - 算法
tag: 
  - 数组
  - 双指针
  - 二分查找
---

# 167. 两数之和 II - 输入有序数组

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/solutions/)   

## 解法一：遍历 + 二分查找

```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
		int[] res = new int[2];
		for(int i = 0;i < numbers.length;i++) {
			int temp;
			if((temp = Arrays.binarySearch(numbers, i + 1, numbers.length, target - numbers[i])) > 0) {
				res[0] = i + 1;
				res[1] = temp + 1;
				return res;		
			}
		}
		return null;
    }
}
```

## 解法二：双指针

通过双指针向中间遍历

```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int i = 0;
        int j = numbers.length - 1;
        while (i < j) {
            int sum = numbers[i] + numbers[j];
            if (sum < target) {
                i++;
            } else if (sum > target) {
                j--;
            } else {
                return new int[]{i+1, j+1};
            }
        }
        return new int[]{-1, -1};
    }
}
```
