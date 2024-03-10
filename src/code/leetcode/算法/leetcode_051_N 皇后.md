---
date: 2024-03-01
category: 
  - 算法
tag: 
  - 数组
  - 回溯
---

# 51. N 皇后


<Badge text="困难" type="danger" vertical="middle" />

[题目描述](https://leetcode.cn/problems/n-queens/description/)

解法：每层都有一个皇后，遍历该层，放入皇后，判断皇后在该位置是否可行。若整行都不可行，回溯。

```java
class Solution {
    List<List<String>> res = new ArrayList<>();

    public List<List<String>> solveNQueens(int n) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append('.');
        }
        int row = 0;
        insert(new ArrayList<>(),n,row,sb);
        return res;
    }

    public void insert(List<String> sol, int n, int row, StringBuilder sb) {
        for (int i = 0; i < n; i++) {
            if (up(sol, row, i) && leftUp(sol, row, i) && rightUp(sol, row, i)) {
                StringBuilder temp = new StringBuilder(sb);
                temp.replace(i, i + 1, "Q");
                List<String> newSol = new ArrayList<>(sol); // Create a new list
                newSol.add(temp.toString());
                if (row == n - 1) {
                    res.add(newSol);
                    return;
                } else insert(newSol, n, row + 1, sb); // Pass the new list to the recursive call
            }
        }
    }

    public boolean up(List<String> sol,int row,int col){
        for (int i = row - 1; i >= 0 ; i--) {
            if(sol.get(i).charAt(col) == 'Q') return false;
        }
        return true;
    }

    public boolean leftUp(List<String> sol,int row,int col){
        while(--row >= 0 && --col >= 0){
            if(sol.get(row).charAt(col) == 'Q') return false;
        }
        return true;
    }
    public boolean rightUp(List<String> sol,int row,int col){
        while (--row >= 0 && ++col < sol.get(0).length()){
            if(sol.get(row).charAt(col) == 'Q') return false;
        }
        return true;
    }
}
```