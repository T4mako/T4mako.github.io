---
date: 2023-09-07
category: 
  - 算法
tag: 
  - 栈
  - 设计
  - 单调栈
 
---

# 901. 股票价格跨度


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/online-stock-span/description/?envType=study-plan-v2&envId=leetcode-75)

解法：单调栈  
建立两个栈，分别存放下标和值  
如果 all 为空或者 price 小于栈顶，入栈 ，返回 1 
如果 price >= 栈顶，出栈，直到小于等于栈顶或栈为空，入栈，返回下标之差或下标的值  

```java
class StockSpanner {

    public StockSpanner() {
    }
    
    // 初始化下标
    int index = 0;
    // 存放下标
    Deque<Integer> deque = new LinkedList<>();
    // 存放值
    Deque<Integer> all = new LinkedList<>();

    public int next(int price) {
        // 如果 all 为空或者 price 小于栈顶，入栈 ，返回 1
        if(all.isEmpty() || price < all.peek()) {
            all.push(price);
            deque.push(index++);
            return 1;
        }
        // 如果 price >= 栈顶，出栈，直到小于等于栈顶，入栈，返回下标之差
        else {
            int res = 0;
            int i = 0;
            while (!all.isEmpty() && price >= all.peek()){
                i = deque.pop();
                all.pop();
            }
            res = deque.isEmpty() ? index + 1 : index - deque.peek();
            all.push(price);
            deque.push(index++);
            return res;
        }
    }
}
```