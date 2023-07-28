---
category: 
  - 算法
tag: 
  - 数组
  - 回溯
---

# 046_全排列

<Badge text="中等" type="warning" vertical="middle" />

## 解法一：

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        ArrayList<Integer> temp = new ArrayList<>();
        def(0,temp,nums,res);
        return res;
    }
    public void def(int n,ArrayList<Integer> temp,int[] nums,List<List<Integer>> res){
        if(n == nums.length){
            res.add(temp);
        }
        for(int i : nums){
            if(!temp.contains(i)){
                ArrayList<Integer> clone = (ArrayList<Integer>) temp.clone();
                clone.add(i);
                def(n+1,clone,nums,res);
            }
        }
    }
}
```


使用深度优先遍历，建立一个res和一个temp，建立一个整形n判断是否遍历到最深，如果n等于nums的长度，将n添加到res，如果不等，判断nums中的值是否被包含于temp，如果不包含，建立新的list并将其添加到list中，递归调用def方法完成深度优先遍历

## 解法一优化：

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        ArrayList<Integer> temp = new ArrayList<>();
        int[] vis = new int[nums.length];
        def(0,temp,nums,res,vis);
        return res;
    }
    public void def(int n,ArrayList<Integer> temp,int[] nums,List<List<Integer>> res,int[] vis){
        if(n == nums.length){
            res.add(new ArrayList<>(temp));
        }
        for(int i = 0;i < nums.length ; i++){
            if(vis[i] == 1){
                continue;
            }
            vis[i] = 1;
            temp.add(nums[i]);
            def(n+1,temp,nums,res,vis);
            vis[i] = 0;
            temp.remove(temp.size()-1);
        }
    }
}
```


维护一个辅助数组vis，长度与nums相等，当nums中的值被添加到temp中，vis相对的值赋为1，递归调用def函数，当n满足条件时添加新的数组temp，然后将数组vis[i]置为0，temp去除相应的值。