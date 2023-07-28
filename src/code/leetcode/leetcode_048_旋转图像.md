---
category: 
  - 算法
tag: 
  - 数组
  - 数学
  - 矩阵
---

# 048_旋转图像

<Badge text="中等" type="warning" vertical="middle" />

## 解法一：

```java
class Solution {
    public void rotate(int[][] matrix) {
        int len = matrix.length;
        for(int i = 0;i < len / 2;i++){
            int a3 = matrix[len - i - 1][i];
            int a4 = matrix[len - i - 1][len - i - 1];
            int count = 0;
            int[] temp = new int[len];
            int[] temp2 = new int[len];
            int[] temp3 = new int[len];
            for (int j = i; j < len - i; j++) {
                temp3[j - i] = matrix[i][j];
            }
            for(;count < 4;count++){
                if(count == 0){
                    for(int j = i;j < len - i;j++){
                        temp[j - i] = matrix[j][len - i -1];
                        matrix[j][len - i -1] = temp3[j - i];
                    }
                    count++;
                }
                if(count == 1){
                    for(int j = i;j < len - i;j++){
                        temp2[j - i] = matrix[len - i -1][j];
                        matrix[len - i -1][j] = temp[len - i - 1 - j];
                    }
                    temp2[len - i - 1 - i] = a4;
                    count++;
                }
                if(count == 2){
                    for (int j = i; j < len - i; j++) {
                        temp[j - i] = matrix[j][i];
                        matrix[j][i] = temp2[j - i];
                    }
                    temp[len - i - 1 - i] = a3;
                    count++;
                }
                if(count == 3){
                    for (int j = i; j < len - i; j++) {
                        matrix[i][j] = temp[len - i - 1 - j];
                    }
                    count++;
                }
            }
        }
    }
}
```

将一个矩阵分解成每一圈，将每一圈作为一个个体，上面一行移到右边一行，右边一行移到下面一行，下面一行移动到左边一行，左边一行移动到上面一行


## 解法二：

```java
class Solution {
    public void rotate(int[][] matrix) {
        int len = matrix.length;
        for (int i = 0; i < len - 1; i++) {
            for (int j = i + 1; j < len; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        for (int i = 0; i < len; i++) {
            for (int j = 0; j < len / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][len - j - 1];
                matrix[i][len - j - 1] = temp;
            }
        }
    }
}
```

通过数学关系，先将矩阵按主对角线翻转，在每行翻转一下即可得到旋转后的矩阵