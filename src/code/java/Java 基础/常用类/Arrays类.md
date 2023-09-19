# Arrays 类

Arrays类位于 java.util 包中，主要包含了操作数组的各种方法。

| 方法                  | 作用                                         |
| --------------------- | -------------------------------------------- |
| Arrays.toString()     | 打印数组                                     |
| Arrays.sort()         | 数组排序                                     |
| Arrays.asList()       | 将数组转化成List                             |
| Arrays.fill()         | 将数组填充某个值                             |
| Arrays.equals()       | 判断两个数组是否相同                         |
| Arrays.binarySearch() | 二分查找返回下标                             |
| Arrays.copyOf()       | 截取数组对应长度，返回新的数组               |
| Arrays.copyOfRange    | 截取从from到to的数组返回新的数  组，左闭右开 |



```java
// 定义数组
Integer[] nums = new Integer[20];
for (int i = 0; i < nums.length; i++) {
    nums[i] = (int) (Math.random() * 10 );
}
// 1、Arrays.toString() 打印数组
System.out.println(Arrays.toString(nums));
// 2、Arrays.sort() 数组排序
Arrays.sort(nums);
System.out.println(Arrays.toString(nums));
// 对二维数组排序，重写比较器
Arrays.sort(b, new Comparator<int[]>() {
        @Override
    public int compare(int[] o1, int[] o2) {
        return Integer.compare(o1[0] , o2[0]);
    }
});
// 3、Arrays.asList() 将数组转化成List
ArrayList<Integer> ints = new ArrayList<>(Arrays.asList(nums));
// 4、Arrays.fill() 将数组填充某个值
Arrays.fill(nums, (int) (Math.random()*10)); // 填充值都相同
// 5、判断两个数组是否相同
Integer[] nums2 = {0,2,5,6,9,12,19,20,35,60};
boolean equals = Arrays.equals(nums, nums2);
System.out.println(equals);
// 6、Arrays.binarySearch() 二分查找返回下标
int i = Arrays.binarySearch(nums2, 6);
System.out.println(i);
// 7、Arrays.copyOf() 截取数组对应长度，返回新的数组
Integer[] integers = Arrays.copyOf(nums2, 5);
System.out.println(Arrays.toString(integers));
// 8、Arrays.copyOfRange 截取从from到to的数组返回新的数组，左闭右开
Integer[] integers1 = Arrays.copyOfRange(nums2, 1, 8);
System.out.println(Arrays.toString(integers1));
// 9、Arrays.deepToString() 深度打印
int[][] b = new int[10][2];
for (int j = 0; j < b.length; j++) {
    b[j][0] = new Random().nextInt(10);
    b[j][1] = new Random().nextInt(10);
}
System.out.println(Arrays.deepToString(b));
```

