---
date: 2023-08-11
category: 
  - 算法
tag: 
  - 栈
  - 数组
  - 模拟
order: 735
article: false
---

# 735. 行星碰撞

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/asteroid-collision/description/?envType=study-plan-v2&envId=leetcode-75)

解法：  
定义一个list，遍历数组，讨论每次遍历的数`asteroids[i]`。
- list 的长度为 0，直接将 `asteroids[i]` 添加到 list 中
- `asteroids[i]` > 0，添加到 list 中
- `asteroids[i]` < 0
  - 定义一个bool类型的`flag`
  - 对list向前遍历，若遍历到的数字小于0，直接将 `asteroids[i]` 添加到list中
  - 遍历到的数字大于0，比较两数之和
    - 和为0，remove 该数字，`flag = false`退出循环
    - 和小于0，remove 该数字
    - 和大于0，`flag = false`退出循环
  - 遍历结束通过`flag`判断是否要添加该数字

```java
class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        ArrayList<Integer> res = new ArrayList<>();
        for (int i = 0; i < asteroids.length; i++) {
            if (res.size() == 0) res.add(asteroids[i]);
            else if (asteroids[i] > 0) res.add(asteroids[i]);
            else {
                boolean flag = true;
                for (int j = res.size() - 1; j >= 0; j--) {
                    if (res.get(j) > 0) {
                        if (res.get(j) + asteroids[i] == 0) {
                            res.remove(j);
                            flag = false;
                            break;
                        } else if (res.get(j) + asteroids[i] < 0) {
                            res.remove(j);
                        }else {
                            flag = false;
                            break;
                        }
                    }
                }
                if(flag) res.add(asteroids[i]);
            }
        }
        int[] nums = new int[res.size()];
        for (int i = 0; i < res.size(); i++) {
            nums[i] = res.get(i);
        }
        return nums;
    }
}
```