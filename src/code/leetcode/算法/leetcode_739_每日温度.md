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
- 如果遍历到的元素比栈底小，则入栈
- 如果遍历到的元素比栈底大，则找到了更大的温度。执行出栈操作，并计算位置差。

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