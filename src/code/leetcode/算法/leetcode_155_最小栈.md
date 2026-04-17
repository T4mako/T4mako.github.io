---
category: 
  - 算法
tag: 
  - 栈
  - 数组
date: 2024-03-04
---

# 155. 最小栈
<Badge text="中等" type="warning" vertical="middle" />

解法：使用两个栈，一个存放所有的值，另一个存放最小值

```java
class MinStack {

    int top;
	List<Integer> list;
	LinkedList<Integer> link;
	public MinStack() {
		top = -1;
		list = new ArrayList<>();
		link = new LinkedList<>();
	}

    public void push(int val) {
        list.add(val);
        top++;
        if (link.isEmpty() || val <= link.getLast()) {
            link.add(val);
        }
    }

    public void pop() {
        if (list.get(top).equals(link.getLast())) {
            link.removeLast();
        }
        list.remove(top);
        top--;
    }

	public int top() {
		return list.get(top);
	}

	public int getMin() {
		return link.getLast();
	}
}
```