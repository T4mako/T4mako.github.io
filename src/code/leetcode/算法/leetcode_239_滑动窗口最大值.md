---
category: 
  - 算法
tag: 
  - 队列
  - 数组
  - 滑动窗口
  - 队列

 
---
# 239. 滑动窗口最大值

<Badge text="困难" type="danger" vertical="middle" />

https://leetcode.cn/problems/sliding-window-maximum/description/

## 双端队列

```py
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        deque = collections.deque()
        res, n = [], len(nums)
        for i, j in zip(range(1 - k, n + 1 - k), range(n)):
            # 删除 deque 中对应的 nums[i-1]
            if i > 0 and deque[0] == nums[i - 1]:
                deque.popleft()
            # 保持 deque 递减
            while deque and deque[-1] < nums[j]:
                deque.pop()
            deque.append(nums[j])
            # 记录窗口最大值
            if i >= 0:
                res.append(deque[0])
        return res
```

创建一个双端队列，初始为空，后续操作保证其从左到右降序排序

用 i 和 j 作为滑动窗口的左右两边，i 和 j 始终保持 k 的距离，j 从 `nums(0)` 开始

在滑动窗口右移的时候，遵循下面规则：
- 如果 i > 0 并且 `deque[0] == nums[i - 1]` （要移除的数为最大数），从 depue 中移除
- 删除 deque 内所有 `< nums[j]` 的元素，以保持 deque 递减
- 将 `nums[j]` 添加至 deque 尾部
- 若已形成窗口（即 `i ≥ 0` ）：将窗口最大值（即队首元素 `deque[0]` ）添加至列表 res