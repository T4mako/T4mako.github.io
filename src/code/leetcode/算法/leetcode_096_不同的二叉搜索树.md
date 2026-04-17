---
category: 
  - 算法
tag: 
  - 树
  - 二叉搜索树
  - 动态规划
  - 数学
  - 二叉树
---

# 096_不同的二叉搜索树

<Badge text="中等" type="warning" vertical="middle" />

```java
class Solution {
    public int numTrees(int n) {
        if(n == 0) return 0;
        int[] count = new int[n + 1];
        count[0] = 1;
        count[1] = 1;
        for (int i = 2; i < n + 1; i++) {
            for (int j = 0,k = i - 1; j < i; j++,k--) {
                count[i] += count[j] * count[k];
            }
        }
        return count[n];
    }
}
```

建立一个数组count，count[0]和count[1]都为1，下标代表对应节点可以生成的树的个数，n个节点的全部二叉搜索树可以分解为count[0]*count[n-1]+count[1]\*count[n-2]...,通过分解得出最后结果