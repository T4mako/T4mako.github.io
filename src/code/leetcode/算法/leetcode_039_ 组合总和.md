---
category: 
  - 算法
tag: 
  - 数组
  - 回溯
---

# 039_组合总和

<Badge text="中等" type="warning" vertical="middle" />

```java
class Solution {
     public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(candidates);
        dfs(0,target,candidates,new ArrayList<Integer>(),res,0);
        return res;
    }
    public void dfs(int sum,int target,int[] candidates,ArrayList<Integer> list,List<List<Integer>> res,int i){
        if(sum == target){
            res.add(list);
            //防止太大了
        }else if(target - sum >= candidates[i]){
            //i从list中最大值对应candidates数组位置开始
            for (; i < candidates.length; i++) {
                //防止太大了
                if(sum + candidates[i] > target){
                    break;
                }
                ArrayList<Integer> l = new ArrayList<>(list);
                l.add(candidates[i]);
                dfs(sum + candidates[i],target,candidates,l,res,i);
            }
        }
    }
}
```
将数组排序，通过深度遍历递归的思想，传入参数i为最大的那个数的下标，再通过剪枝的方法，求出res结果作为返回