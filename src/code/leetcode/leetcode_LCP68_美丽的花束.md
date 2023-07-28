---
category: 
  - 算法
tag: 
  - 数组
  - 滑动窗口
---

# LCP 68_美观的花束

<Badge text="中等" type="warning" vertical="middle" />

```java
class Solution {
    public int beautifulBouquet(int[] flowers, int cnt) {
        long res = 0;
        int len = flowers.length;
        //花束小于cnt的情况
        for (int i = 0; i < cnt;i++) {
            res += len - i;
        }
        //cnt>len的特殊情况
        if(cnt > len){
            return (int)(res%1000000007);
        }
        int right;
        int left;
        for(left = 0;left < len - cnt;left++){
            int[] count = new int[100000];
            int max = 0;
            for(right = left;right < len;right++){
                //记录最大出现次数
                count[flowers[right]]++;
                max = max > count[flowers[right]] ? max : count[flowers[right]];
                if(max > cnt){
                    //将left+1到与rignt第一个相同的数的所有可能加给res
                    while(flowers[left] != flowers[right]){
                        res += right - left - 1 - cnt;
                        left++;
                    }
                    break;
                 //max <= cnt的情况
                }else if(right - left + 1 > cnt){
                    res++;
                }
            }
        }
        return (int) (res%1000000007);
    }
}
```
先将可选花束个数小于cnt的情况加到res中，定义一个left和right指针，定义一个足够长的数组count和整形max，将右指针所指值对应数组位置+1，并与max作比较，大的那个赋给max，判断max与cnt的大小关系，如果max小于等于cnt并且left到right的长度大于等于cnt，则res++，继续执行for循环。如果max>cnt，将left所指的数到right-1这一段数的所有情况加给res，直到left指向与righ所指数的后一位。