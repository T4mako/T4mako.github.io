---
date: 2024-02-22
category: 
  - 算法
tag: 
  - 数组
  - 哈希表
  - 数学
---

# 380. O(1) 时间插入、删除和获取随机元素


<Badge text="中等" type="warning" vertical="middle" />

[题目描述](https://leetcode.cn/problems/insert-delete-getrandom-o1/description/?envType=study-plan-v2&envId=top-interview-150)


```java
class RandomizedSet {
    int[] nums;
    Random random;
    Map<Integer,Integer> map;
    int index;

    public RandomizedSet() {
        nums = new int[200010];
        random = new Random();
        map = new HashMap<>();
        index = -1;
    }

    public boolean insert(int val) {
        if(map.containsKey(val)){
            return false;
        }else {
            nums[++index] = val;
            map.put(val,index);
            return true;
        }
    }

    public boolean remove(int val) {
        if(map.containsKey(val)){
            // map 中删除，获得旧值索引
            Integer idx = map.remove(val);
            // index 指向索引移动到旧数据上，k-v 改变
            if(idx != index){
                map.put(nums[index],idx);
            }
            // 旧索引的值为新索引所在的值，index--
            nums[idx] = nums[index--];
            return true;
        }else {
            return false;
        }
    }

    public int getRandom() {
        return nums[random.nextInt(index + 1)];
    }
}
```