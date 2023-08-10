---
category: 
  - 算法
tag: 
  - 数组
  - 回溯
---

# 047_全排列II

<Badge text="中等" type="warning" vertical="middle" />


```java
class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        ArrayList<Integer> temp = new ArrayList<>();
        boolean[] vis = new boolean[nums.length];
        def(0,temp,nums,res,vis);
        return res;
    }
    public void def(int n,ArrayList<Integer> temp,int[] nums,List<List<Integer>> res,boolean[] vis){
        if(n == nums.length){
            res.add(new ArrayList<>(temp));
            return;
        }
        for(int i = 0;i < nums.length ; i++){
            if(vis[i] || (i > 0 && nums[i-1] == nums[i] && !vis[i - 1])){
                continue;
            }
            vis[i] = true;
            temp.add(nums[i]);
            def(n+1,temp,nums,res,vis);
            vis[i] = false;
            temp.remove(n);
        }
    }
}
```

建立一个boolean数组，记录改数是否取出过，同过深度遍历，如果该数的bool值为true或者这个数字与前一个一样，并且前一个数字为true，则进行剪枝