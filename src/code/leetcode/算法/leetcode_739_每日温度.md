---
date: 2023-09-06
category: 
  - 算法
tag: 
  - 栈
  - 数组
  - 模拟
---

# 739. 每日温度


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/daily-temperatures/?envType=study-plan-v2&envId=leetcode-75)

解法：单调栈
遍历 temperatures 数组并维护一个单调栈，栈存放元素在 temperatures 中的位置
- 如果栈为空，将元素入栈
- 如果遍历到的元素比栈顶小，则入栈
- 如果遍历到的元素比栈顶大，则找到了更大的温度。执行出栈操作，并计算位置差。

:::code-tabs
@tab Java
```java
public int[] dailyTemperatures(int[] temperatures) {
    int[] res = new int[temperatures.length];
    Deque<Integer> deque = new LinkedList<>();
    for (int i = 0; i < temperatures.length; i++) {
        int temperature = temperatures[i];
        while (!deque.isEmpty() && temperature > temperatures[deque.peek()]) {
            int prevIndex = deque.pop();
            res[prevIndex] = i - prevIndex;
        }
        deque.push(i);
    }
    return res;
}
```
@tab Python
```py
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        ans = [0] * n
        stack = []  # 存储索引，栈内温度单调递减
        for i in range(n):
            # 当前温度大于栈顶索引对应的温度时，说明找到 warmer day
            while stack and temperatures[i] > temperatures[stack[-1]]:
                idx = stack.pop()
                ans[idx] = i - idx
            stack.append(i)
        return ans
```
:::