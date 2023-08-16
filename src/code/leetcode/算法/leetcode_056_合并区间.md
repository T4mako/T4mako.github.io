---
date: 2023-07-31
category: 
  - 算法
tag: 
  - 数组
  - 排序
article: false
---

# 056. 合并区间

<!-- more -->

[题目描述](https://leetcode.cn/problems/merge-intervals/description/)

<Badge text="中等" type="warning" vertical="middle" />


解题思路：
1、对`intervals`以每个数组的首位进行排序，需要重写比较器  
2、创建泛型为int[]的list用于构建结果二维数组  
3、合并方法：从头遍历，`[a,b] [c,d]` 判断 `b<=c` 成立即可合并到后一个数组上，合并后为`[max(a,c),min(b,d)]`。否则加入到list中  
4、最后需要加上`intervals`末尾的数组  
5、`arr.toArray()`中的参数为返回的类型，`arr.toArray(new int[0][])`返回二维数组  

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        // 对intervals排序
        Arrays.sort(intervals, new Comparator<int[]>() {
            @Override
            public int compare(int[] o1, int[] o2) {
                return Integer.compare(o1[0] , o2[0]);
            }
        });
        // 创建泛型为int[]的list
        ArrayList<int[]> arr = new ArrayList<>();
        for (int i = 0; i < intervals.length-1; i++) {
            // [a,b],[c,d] 判断 b<=c 成立即可合并
            if(intervals[i][1] >= intervals[i+1][0]){
                intervals[i+1][0] = Math.min(intervals[i][0],intervals[i+1][0]);
                intervals[i+1][1] = Math.max(intervals[i][1],intervals[i+1][1]);
            }else{
                // 不可合并则添加
                arr.add(intervals[i]);
            }
        }
        // 最后加上末尾的数组
        arr.add(intervals[intervals.length-1]);
        // toArray()方法中的参数为返回的类型
        return arr.toArray(new int[0][]);
    }
}
```