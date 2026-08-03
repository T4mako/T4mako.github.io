---
category: 
  - 算法
tag: 
  - 滑动窗口
  - 哈希
date: 2026.07.16
 
---
# 438. 找到字符串中所有字母异位词

<Badge text="中等" type="warning" vertical="middle" />

https://leetcode.cn/problems/find-all-anagrams-in-a-string/

## 解法一：字典计数 + 滑动窗口

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        p_d = dict()
        tmp = dict()
        res = []

        p_len = len(p)
        s_len = len(s)
        left = 0
        right = p_len - 1

        if(p_len > s_len): return res
        for i in range(p_len):
            p_d[p[i]] = p_d.get(p[i], 0) + 1
            tmp[s[i]] = tmp.get(s[i], 0) + 1
        
        while(right < s_len):
            if(tmp == p_d):
                res.append(left)
            tmp[s[left]] -= 1
            if(tmp[s[left]] == 0): del tmp[s[left]]
            left += 1
            right += 1
            if(right < s_len):
                tmp[s[right]] = tmp.get(s[right], 0) + 1
            else:
                break
        return res
```

使用两个字典分别统计 `p` 和当前窗口中的字符数量。窗口长度始终等于 `p`，每次右移一格后比较两个字典，相同则记录窗口起点。

## 解法二：数组计数 + 滑动窗口

```py
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        s_len, p_len = len(s), len(p)
        
        if s_len < p_len:
            return []

        ans = []
        s_count = [0] * 26
        p_count = [0] * 26
        for i in range(p_len):
            s_count[ord(s[i]) - 97] += 1
            p_count[ord(p[i]) - 97] += 1

        if s_count == p_count:
            ans.append(0)

        for i in range(s_len - p_len):
            s_count[ord(s[i]) - 97] -= 1
            s_count[ord(s[i + p_len]) - 97] += 1
            
            if s_count == p_count:
                ans.append(i + 1)

        return ans
```

由于题目只包含小写字母，用长度为 26 的数组统计字符数量。窗口滑动时只需移除左边字符、加入右边字符，再比较两个计数数组。


## 解法二优化

```py
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        s_len, p_len = len(s), len(p)

        if s_len < p_len:
            return []

        ans = []
        count = [0] * 26
        for i in range(p_len):
            count[ord(s[i]) - 97] += 1
            count[ord(p[i]) - 97] -= 1

        differ = [c != 0 for c in count].count(True)

        if differ == 0:
            ans.append(0)

        for i in range(s_len - p_len):
            if count[ord(s[i]) - 97] == 1:  # 窗口中字母 s[i] 的数量与字符串 p 中的数量从不同变得相同
                differ -= 1
            elif count[ord(s[i]) - 97] == 0:  # 窗口中字母 s[i] 的数量与字符串 p 中的数量从相同变得不同
                differ += 1
            count[ord(s[i]) - 97] -= 1

            if count[ord(s[i + p_len]) - 97] == -1:  # 窗口中字母 s[i+p_len] 的数量与字符串 p 中的数量从不同变得相同
                differ -= 1
            elif count[ord(s[i + p_len]) - 97] == 0:  # 窗口中字母 s[i+p_len] 的数量与字符串 p 中的数量从相同变得不同
                differ += 1
            count[ord(s[i + p_len]) - 97] += 1
            
            if differ == 0:
                ans.append(i + 1)

        return ans
```

在解法二的基础上维护 `differ`，记录字符数量不一致的种类数。滑动窗口时只更新进出窗口的两个字符，`differ == 0` 就表示找到了异位词，避免重复比较整个数组。
