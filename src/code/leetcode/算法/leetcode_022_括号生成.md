---
category: 
  - 算法
tag: 
  - 字符串
  - 动态规划
  - 回溯
---

# 022_括号生成

<Badge text="中等" type="warning" vertical="middle" />


## 解法一：

```java
class Solution {
    public ArrayList<ArrayList<String>> all = new ArrayList<>();
    public List<String> generateParenthesis(int n) {
        ArrayList<String> res = new ArrayList<>();
        res.add("()");
        if(n == 1){
            return res;
        }
        all.add(res);
        for (int i = 2; i <= n; i++) {
            res = add(res,i);
            ArrayList<String> temp = new ArrayList<>();
            temp.addAll(res);
            all.add(temp);
        }
        return res;
    }
    public ArrayList add(ArrayList<String> list,int size){
        ArrayList res = new ArrayList();
        HashSet<String> set = new HashSet();
        for(String i : list){
            set.add("()"+i);
            set.add(i+"()");
            set.add("("+i+")");
            set.remove(i);
        }
        if(size >= 4){
            for (int i = 2; i <= size - 2; i++) {
                int j = size - i;
                for (String s1 : all.get(i - 1)){
                    for(String s2 : all.get(j - 1)){
                        set.add(s1+s2);
                    }
                }
            }
        }
        Object[] strs =set.toArray();
        for(Object i : strs){
            res.add((String)i);
        }
        return res;
    }
}
```

建立一个存放arraylist的arraylist，传入的数字等于上个数字的每个括号加（）或（加括号加）或（）加括号或拆分数字两两相加，如4=2+2，将所有的情况遍历出来即可

## 解法二：

:::code-tabs
@tab Java
```java
class Solution {
    public static List<String> generateParenthesis(int n) {
        ArrayList<String> res = new ArrayList<>();
        def(n,"",res,0,0);
        return res;
    }
    public static void def(int n,String path,ArrayList<String> res,int open,int close){
        if(open > n || close > open){
            return;
        }
        if(path.length() == 2 * n){
            res.add(path);
            return;
        }
        def(n,path+"(",res,open + 1,close);
        def(n,path+")",res,open,close+1);
    }
}
```
@tab Python
```py
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        def dfs(tmp,left_num,right_num,res,n):
            if left_num == right_num & left_num == n:
                res.append(tmp)
            elif right_num > left_num or left_num > n or right_num > n:
                return
            else:
                dfs(tmp + '(',left_num + 1,right_num,res,n)
                dfs(tmp + ')',left_num,right_num + 1,res,n)

        dfs('',0,0,res,n)
        return res
```
:::

通过 dfs 深度优先遍历，递归调用def方法，再通过剪枝的操作完成输出