---
category: 
  - 算法
tag: 
  - 字符串
  - 动态规划
  - 回溯
date: 2026-08-16
---

# 131. 分割回文串

<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/palindrome-partitioning/)


```py
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        n = len(s)
        ans = []
        path = []

        # 现在 s 未被分割的部分为 [start, n-1]
        # 当前位于下标 i，讨论是否在 i 和 i+1 之间切一刀
        def dfs(i: int, start: int) -> None:
            if i == n:  # s 分割完毕
                ans.append(path.copy())  # 复制 path
                return

            # 不分割
            if i < n - 1:  # i=n-1 时必须分割（这是最后一段），i<n-1 时才可以不分割
                dfs(i + 1, start)

            # 分割，那么得到子串 [start, i]
            t = s[start: i + 1]
            if t == t[::-1]:  # 判断 t 是不是回文串
                path.append(t)
                # 现在 s 未被分割的部分为 [i+1, n-1]
                dfs(i + 1, i + 1)
                path.pop()  # 恢复现场

        dfs(0, 0)
        return ans
```

使用回溯，定义一个 start 和 i（cur），判断在 i 是否要切分，如果不切分，i 继续往下走，如果切分，判断 start 到 i 是否是回文串，如果是，path 加入这个子串，并且 start 和 i 指向 i + 1 并回溯