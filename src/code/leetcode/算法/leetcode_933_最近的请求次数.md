---

date: 2023-08-11
category: 
  - 算法
tag: 
  - 设计
  - 队列
  - 数据流
article: false
---

# 933. 最近的请求次数

<Badge text="简单" type="tip" vertical="middle" />

[题目描述](https://leetcode.cn/problems/number-of-recent-calls/description/?envType=study-plan-v2&envId=leetcode-75)

```java
class RecentCounter {

    List<Integer> record = new ArrayList<>();

    public RecentCounter() {

    }
    
    public int ping(int t) {
        int res = 0;
        record.add(t);
        for (int i = record.size() - 1; i >= 0; i--) {
            if(record.get(i) <= t && record.get(i) >= t - 3000) res++;
            else return res;
        }
        return res;
    }
}
```