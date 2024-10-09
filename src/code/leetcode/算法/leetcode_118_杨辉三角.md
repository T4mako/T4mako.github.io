---
category: 
  - 算法
tag: 
  - 数组
  - 动态规划
date: 2024-09-04
---

# 118. 杨辉三角

<Badge text="简单" type="tips" vertical="middle" />

```py
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = []
        for i in range(numRows):
            m = []
            for j in range(i + 1):
                if j == 0 or j == i:
                    m.append(1)
                else:
                    m.append(res[i - 1][j - 1] + res[i - 1][j])
            res.append(m)
        return res

```

