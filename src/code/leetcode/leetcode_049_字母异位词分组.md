---
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
  - 字符串
  - 排序
---

# 049_字母异位词分组

<Badge text="中等" type="warning" vertical="middle" />

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

建立一个方法，将字符排序，遍历strs数组，将每个字符串传入排序，建立一个map，key存放String值，value存放在res中的对应位置，如果map中存在排序后的字符串，则加入，否则创建新的list添加到res中。