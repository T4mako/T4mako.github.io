---
icon: java
date: 2022-06-22
category: 
    - java
tag: 
    - 基础语法
    - java
---
# Java比较器

## 一、说明

正常情况下，Java中的对象只能通过==或!=进行比较，不能使用>或<
但是在开发场景中，需要对多个对象进行排序，言外之意，就需要比较对象的大小。因此需要两个接口中的任何一个：Comparable或Comparator

## 二、Comparable接口的使用：(自然排序)java.lang.Comparable  

1、像String、包装类等实现了Comparable接口，重写了compareTo()方法，给出了比较两个对象大小的方式。（从小到大排列）
2、重写compareTo()的规则：
如果**当前对象this大于形参对象obj**， 则**返回正整数**，如果**当前对象this小于形参对象obj**， 则返回**负整数**，如果当前对象this**等于**形参对象obj， 则返回**零**。  
3、对于自定义类需要排序，通过自定义类事项Comparable接口，重写compareTo(obj)方法。在方法中指明如何排序

```java
public class Goods implements Comparable{
    private String name;
    private double price;

    public Goods(){
    }
    public Goods(String name, double price) {
        this.name = name;
        this.price = price;
    }
    @Override
    public String toString() {
        return "Goods{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
    //指明商品比较大小的方式:按照价格从低到高排序,再按照产品名排序
    @Override
    public int compareTo(Object o) {
        if(o instanceof Goods){
            Goods goods = (Goods)o;
            if(this.price > goods.price){
                return 1;
            }else if(this.price < goods.price){
                return -1;
            }else {
                //return 0;
                return -this.name.compareTo(goods.name);
            }
        }
        throw new RuntimeException("传入数据不一致");
    }
}
```

## 三、Comparator接口(定制排序)java.util.Comparator  

1、说明：当元素的类型没有实现java.lang.Comparable接口而又不方便修改代码，或者实现了java.lang.Comparable接口的排序规则不适合当前的操作，那么可以考虑使用 Comparator 的对象来排序， 强行对多个对象进行整体排序的比较  
2、重写compare(Object o1,Object o2)方法，比较o1和o2的大小： 如果方法返
回正整数，则表示o1大于o2；如果返回0，表示相等；返回负整数，表示o1小于o2  

```java
 @Test
    public void test4(){
        Goods[] arr = new Goods[5];
        arr[0] = new Goods("a",10);
        arr[1] = new Goods("b",20);
        arr[2] = new Goods("c",15);
        arr[3] = new Goods("d",100);
        arr[4] = new Goods("d",150);

        Arrays.sort(arr, new Comparator() {
            //先按名称从低到高，再按价格从高到低
            @Override
            public int compare(Object o1, Object o2) {
                if(o1 instanceof Goods && o2 instanceof Goods){
                    Goods g1 = (Goods) o1;
                    Goods g2 = (Goods) o2;
                    if(g1.getName().equals(g2.getName())){
                        return -Double.compare(g1.getPrice(),g2.getPrice());
                    }else {
                        return g1.getName().compareTo(g2.getName());
                    }
                }
                throw new RuntimeException("123");
            }
        });
        System.out.println(Arrays.toString(arr));
    }
```

## 四、Comparable和Comparator的使用对比

Comparable接口方式一旦一定，保证Comparable接口实现类的对象在如何位置都可以比较大小
Comparator接口属于临时性的比较。
