---
article: false
date: 2023-08-29
category: 
  - 算法
tag: 
  - 设计
  - 堆
---

# 2336. 无限集中的最小数字

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/smallest-number-in-infinite-set/description/?envType=study-plan-v2&envId=leetcode-75)

解题思路：  
初始时，设置一个小根堆和一个 min 记录最小的数  
调用 `addBack(int num)` 方法时，如果 num 比 min 小，并且 heap 中不包含它，则将它加入到 heap 中  
调用 `popSmallest()` 方法时，如果 heap 中为空，返回 `min++`，若果不为空，返回 `heap.popll()`  

:::info
关于 Java 中的 PriorityQueue(优先队列)

Java 中 PriorityQueue 通过二叉小顶堆实现，可以用一棵完全二叉树表示。  
优先队列的作用是能保证每次取出的元素都是队列中权值最小的（ Java 的优先队列每次取最小元素， C++ 的优先队列每次取最大元素）
可以通过构造时传入的比较器 `Comparator` 实现大根堆或者小根堆  

方法：
`add(E e)` 和 `offer(E e)` 的语义相同，都是向优先队列中插入元素，  
只是 Queue 接口规定二者对插入失败时的处理不同，前者在插入失败时抛出异常，后则则会返回 `false` 。对于 PriorityQueue 这两个方法其实没什么差别。  

`element()` 和 `peek()` 的语义完全相同，都是获取但不删除队首元素，也就是队列中权值最小的那个元素，二者唯一的区别是当方法失败时前者抛出异常，后者返回 `null` 。

`remove()` 和 `poll()` 方法的语义也完全相同，都是获取并删除队首元素，区别是当方法失败时前者抛出异常，后者返回 `null`

`remove(Object o)` 方法用于删除队列中跟o相等的某一个元素（如果有多个相等，只删除一个），该方法不是 Queue 接口内的方法，而是Collection 接口的方法
:::

:::code-tabs
@tab Java
```java
class SmallestInfiniteSet {
    Queue<Integer> heap;
    int min;

    public SmallestInfiniteSet() {
        min = 1;
        heap = new PriorityQueue<>((o1,o2) ->  o1 - o2); //创建小顶堆
    }

    public int popSmallest() {
        // 将 min 和 堆中最小的数返回
        if(heap.isEmpty()){
            return min++;
        }
        return heap.poll();

    }

    public void addBack(int num) {
        if (num < min && !heap.contains(num)) {
            heap.offer(num);
        }
    }
}
```
:::