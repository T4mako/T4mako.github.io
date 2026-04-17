---
category: 
  - 算法
tag: 
  - 数组
  - 动态规划
date: 2024-09-05
---

# 119. 杨辉三角 II

<Badge text="简单" type="tips" vertical="middle" />

第 n 行 k 个数是 C_n_~k~

```py
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        res = [1]  
        for i in range(1, rowIndex + 1):
            res.append(res[-1] * (rowIndex - i + 1) // i)
        return res
```

