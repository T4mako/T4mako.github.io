---
category: 
  - 算法
tag: 
  - 滑动窗口
  - 哈希
date: 2026.07.16
 
---
# 560. 和为 K 的子数组

<Badge text="中等" type="warning" vertical="middle" />

https://leetcode.cn/problems/subarray-sum-equals-k/description/

## 解法一：暴力算（超时）

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        nums_len = len(nums)
        res = 0
        for i in range(0, nums_len):
            for j in range(i, nums_len):
                if(sum(nums[i:j + 1]) == k):
                    res += 1
        return res

```

两次循环暴力算

## 解法二：前缀和

```py
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        cnt = defaultdict(int)
        ans = s = 0
        for x in nums:
            cnt[s] += 1
            s += x
            ans += cnt[s - k]
        return ans
```

维护一个前缀和数组，由于 `s[j] - s[i] = k (j > i)`，因此 `s[i] = s[j] − k` ，在遍历时，找 `s[j] − k` 为 `s[i]` 就行，所以多维护一个 hash 数组
