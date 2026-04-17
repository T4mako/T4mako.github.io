---
category: 
  - 算法
tag: 
  - 数组
  - 回溯
---

# 040_组合总和II

<Badge text="中等" type="warning" vertical="middle" />

```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(candidates);
        if(target < candidates[0]){
            return res;
        }
        dfs(0,target,candidates,new ArrayList<Integer>(),res,0);
        return res;
    }
    public void dfs(int sum,int target,int[] candidates,ArrayList<Integer> list,List<List<Integer>> res,int begin){
        if(sum == target){
            res.add(list);
        }else if(begin < candidates.length && target - sum >= candidates[begin]){
            for (int i = begin; i < candidates.length; i++) {
                if(i > begin && candidates[i] == candidates[i-1]) continue;
                if(sum + candidates[i] > target){
                    break;
                }
                ArrayList<Integer> l = new ArrayList<>(list);
                l.add(candidates[i]);
                dfs(sum + candidates[i],target,candidates,l,res,i+1);
            }
        }
    }
}
```
在上一题的基础上，加入判断语句，跳过重复的值，最后递归时i+1