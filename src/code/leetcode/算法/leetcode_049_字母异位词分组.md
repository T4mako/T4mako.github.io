---
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
  - 字符串
  - 排序
date: 2022.11.11
---

# 049_字母异位词分组

<Badge text="中等" type="warning" vertical="middle" />

## 解法一：排序后hash

建立一个方法，将字符排序，遍历 strs 数组，将每个字符串传入排序，建立一个 map，key 存放 String 值，value 存放在  res  中的对应位置，如果 map 中存在排序后的字符串，则加入，否则创建新的 list 添加到 res 中。

:::code-tabs
@tab Java
```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> res = new ArrayList<>();
        HashMap<String,Integer> map = new HashMap<>();
        for (String str : strs) {
            String temp = sort(str);
            if (!map.containsKey(temp)) {
                List<String> list = new ArrayList<>();
                list.add(str);
                res.add(list);
                map.put(temp, res.size() - 1);
            } else {
                res.get(map.get(temp)).add(str);
            }
        }
        return res;
    }
   public String sort(String s){
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        return String.valueOf(chars);
    }
}
```

@tab Python
```py
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        res = []
        d = {}
        for s in strs:
            sorted_s = sorted(s)
            key = "".join(sorted_s)
            if(key in d):
                res[d[key]].append(s)
            else:
                res.append([s])
                d[key] = len(res) - 1
        return res
        
```
:::

## 解法二：把字符计数作为 key

:::
@tab Python
```py
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        mp = collections.defaultdict(list)

        for st in strs:
            counts = [0] * 26
            for ch in st:
                counts[ord(ch) - ord("a")] += 1
            # 需要将 list 转换成 tuple 才能进行哈希
            mp[tuple(counts)].append(st)
        
        return list(mp.values())
```
:::