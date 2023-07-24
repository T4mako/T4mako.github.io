# 022_括号生成

> tag：字符串、动态规划、回溯
>
> 难度：中等

> 题目：
>
> 数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。
>
> 示例 1：
>
> 输入：n = 3
> 输出：["((()))","(()())","(())()","()(())","()()()"]
> 示例 2：
>
> 输入：n = 1
> 输出：["()"]
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/generate-parentheses
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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

通过 dfs 深度优先遍历，递归调用def方法，再通过剪枝的操作完成输出