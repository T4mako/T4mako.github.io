---
category: 
  - 算法
tag: 
  - 数组
  - 哈希

 
---
# 001. 两数之和

<Badge text="简单" type="tip" vertical="middle" />


## 解法一：两层 for 循环遍历

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        for(int i = 0;i < nums.length;i++){
            for(int j = i + 1;j < nums.length;j++){
                if(nums[i]+nums[j] == target){
                    return new int[]{i,j};
                }
            }
        }
        return new int[]{};
    }
}
```

> 由于数组中的同一个元素在答案里不能重复出现，通过两层 for 循环，第一个 for 从 `i = 0` 开始，第二个循环从j=i+1开始，找到满足要求的下标。此解法时间复杂度为 O(n^2^)

## 解法二：使用hashmap
:::code-tabs
@tab Java
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int result[]=new int[2]; //结果数组
        HashMap<Integer,Integer> map = new HashMap();
        for(int i = 1;i < nums.length;i++){ // 边遍历，边增加map中值的数量
            int x = target - nums[i];
            if(map.containsKey(x)){
                result[0] = i;
                result[1] = map.get(x);
                return result;
            }
            map.put(nums[i],i);
        }
        return result;
    }
}
```
@tab python
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        d1 = {}
        for index in range(len(nums)):
            complement = target - nums[index]
            if complement in d1:
                return [d1[complement], index]
            d1[nums[index]] = index
        return []
```
:::

> 建立一个 HashMap，key 存储数组值，value 存储数组下标，通过一次遍历，再查找 target 减去第一次遍历的值是否存在即可