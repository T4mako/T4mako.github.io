---
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 动态规划
---
# 055. 跳跃游戏

[题目描述](https://leetcode.cn/problems/jump-game/description/)

<Badge text="中等" type="warning" vertical="middle" />

解题思路：  
记录能到达的最大距离与 i 比较，更新最大距离 `k = Math.max(k, i + nums[i]);`

```java
class Solution {
    public boolean canJump(int[] nums) {
        int k = 0;
        for(int i = 0; i < nums.length; i++) {
            if (i > k) return false;
            k = Math.max(k, i + nums[i]);
        }
        return true;
    }
}
```