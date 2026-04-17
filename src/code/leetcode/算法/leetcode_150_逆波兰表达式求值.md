---
category: 
  - 算法
tag: 
  - 栈
  - 数组
date: 2024-03-04
---

# 150. 逆波兰表达式求值
<Badge text="中等" type="warning" vertical="middle" />

解法：栈的思想

```java
class Solution {
    public int evalRPN(String[] tokens) {
		LinkedList<String> list = new LinkedList<>();
		for (String s : tokens) {
			if (s.equals("+") || s.equals("-") || s.equals("*") || s.equals("/")) {
				String num1 = list.pollLast();
				String num2 = list.pollLast();
				if (s.equals("+")) {
					list.add(String.valueOf(Integer.valueOf(num2) + Integer.valueOf(num1)));
				} else if (s.equals("-")) {
					list.add(String.valueOf(Integer.valueOf(num2) - Integer.valueOf(num1)));
				} else if (s.equals("*")) {
					list.add(String.valueOf(Integer.valueOf(num2) * Integer.valueOf(num1)));
				} else if (s.equals("/")) {
					list.add(String.valueOf(Integer.valueOf(num2) / Integer.valueOf(num1)));
				}
			} else {
				list.add(s);
			}
		}
		return Integer.valueOf(list.getLast());
	}
}
```