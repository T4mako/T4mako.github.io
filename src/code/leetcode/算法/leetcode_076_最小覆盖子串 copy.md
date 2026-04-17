---
date: 2024-03-16
category: 
  - 算法
tag: 
  - 哈希表
  - 字符串
  - 滑动窗口
---

# 77. 组合


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/combinations/description/)

### 解法：
定义递归函数

- res：结果集
- left：可取数的左边界
- right：可取数的右边界
- k：剩余取出数的数量
- list：单次结果集

递归时，如果 `k == 0`,即这次结果可以加入 `res`，注意加入时要创建新的 `ArrayList`，否则永远插入同一个对象
如果 `left > right || right - left + 1 < k`，此时无法得到想要的结果，直接返回
否则，遍历从 left 到 right 的数，进行下一次递归，注意，回溯时要将 `list` 的最后一个数移除


```java
class Solution {
    List<List<Integer>> res = new ArrayList<>();

	public List<List<Integer>> combine(int n, int k) {
		add(1, n, k, new ArrayList<Integer>());
		return res;
	}
    public void add(int left, int right, int k, ArrayList<Integer> list) {
		if (k == 0) {
			res.add(new ArrayList<>(list));
			return;
		}
		if (left > right || right - left + 1 < k) {
			return;
		}
		for (int i = left; i <= right; i++) {
			list.add(i);
            add(i + 1, right, k - 1, list);
            list.remove(list.size() - 1);
		}
	}
}
```