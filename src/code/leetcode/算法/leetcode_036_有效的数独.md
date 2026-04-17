---
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
  - 矩阵
---

# 036_有效的数独
<Badge text="中等" type="warning" vertical="middle" />

## 解法一：

```java
class Solution {
    public boolean isValidSudoku(char[][] board) {
        ArrayList<HashSet<Character>> list = new ArrayList<>();
        ArrayList<HashSet<Character>> list2 = new ArrayList<>();
        ArrayList<HashSet<Character>> list3 = new ArrayList<>();
        for (int i = 0; i < 9; i++) {
            list.add(new HashSet<Character>());
            list2.add(new HashSet<Character>());
            list3.add(new HashSet<Character>());
        }
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') continue;
                if(list.get(i / 3 * 3 + j / 3).contains(board[i][j])) return false;
                if(list2.get(j).contains(board[i][j])) return false;
                if(list3.get(i).contains(board[i][j])) return false;
                list.get(i / 3 * 3 + j / 3).add(board[i][j]);
                list2.get(j).add(board[i][j]);
                list3.get(i).add(board[i][j]);
            }
        }
        return true;
    }
}
```

创建三个Arraylist，里面存放hashset，将每一行，每一列，每一区块存放到set中，如果有包含的，返回false


## 解法二：

```java
class Solution {
    public boolean isValidSudoku(char[][] board) {
        int[][] rows = new int[9][9];
        int[][] columns = new int[9][9];
        int[][][] subboxes = new int[3][3][9];
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char c = board[i][j];
                if (c != '.') {
                    int index = c - '0' - 1;
                    rows[i][index]++;
                    columns[j][index]++;
                    subboxes[i / 3][j / 3][index]++;
                    if (rows[i][index] > 1 || columns[j][index] > 1 || subboxes[i / 3][j / 3][index] > 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
```


创建二维数组rows 和 columns 分别记录数独的每一行和每一列中的每个数字的出现次数，创建三维数组 subboxes 记录数独的每一个小九宫格中的每个数字的出现次数。当数字出现时，相应位置+1，最后判断，如果有位置大于1，返回false