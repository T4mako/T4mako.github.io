---
category: 
  - 算法
tag: 
  - 贪心
  - 数组
  - 动态规划
---

# 045_跳跃游戏II

<Badge text="中等" type="warning" vertical="middle" />

```java
class Solution {
    public int jump(int[] nums) {
        int res = 0;
        int len = nums.length;
        for (int i = 0; i < len - 1;) {
            int max = -1;
            int nexPos = -1;
            for (int j = nums[i]; j >= 1; j--) {
                if(i + j >= len - 1){return ++res;}
                int nextNum = nums[i + j];
                if(j + nextNum >= max){
                   max = j + nextNum;
                   nexPos = i + j;
                }
            }
            i = nexPos;
            res++;
        }
        return res;
    }
}
```
定义一个指针，对于这个指针指向的数字，计算它由远及近到的数字的值加上改数字能到达的最远处，谁最远，移动到该位置。