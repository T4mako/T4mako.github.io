---
icon: java
category: 
    - java
tag: 
    - 基础语法
    - java
---
# Object 类

java.lang.object类

- Object类是所有Java类的根父类
- 如果在类的声明中未使用extends关键字指明父类，则默认父类为Object类
- Object类中的功能(属性、方法)具有通用性
  Oobject类只声明了一个空参的构造器

## 1、==与equals
### ==：运算符

可以使用在基本数据类型变量和引用数据类型变量中

如果比较的是基本数据类型，两个变量保存的数据是否相等（不一定类型要相同，自动类型提升）

如果比较的是引用数据类型，比较地址值是否相等

注：==符号使用时，必须保证符号左右两边的类型一致

```java
int i = 10;
int j = 10;
double b = 10;
char c = 10;
char p = 65;
char q = 'A';
System.out.println(i==b); //true
System.out.println(i==c); //true
System.out.println(p==q); //true
```

### equals()方法的使用

- 是一个方法，而非运算符
- 只能适用于引用数据类型
- Object类中equals()的定义：

```java
public boolean equals(Object obj){
    return (this == obj);
}
```

说明：Object类中的定义的equals()和==的作用是相同的：比较两个对象的地址值是否相同

- 像String、Date、File、包装类等都重写了Object类中equals的方法，重写以后比较的不是两个引用的地址是否相同，而是比较两个队形的实体内容是否相同。

### 3、自定义类重写equals()方法

通常情况下，我们自定义的类如果使用equals（）的话，也通常比较两个对象的“实体内容”是否相同。那么就需要对Object类中的equals()进行重写。

```java
//手动实现equals的重写
public boolean equals(Object obj){
    if(this == obj){
        return true;
	}
    if(obj instanceof Customer){
        Customer cust = (customer)obj;
        //比较两个对象的每个属性是否都相同
        if(this.age == cust.age && this.name.equals(cust.name)){
            return true;
        }
    }
    return false;
    }
}
//自动生成equals方法
```

注：任何情况下，`x.equals(null)`返回都是`false`  
`x.equals(和x不同类型的对象)`返回都是`false`

## 2、ToString()的使用

- 当输出一个对象的引用(不是null)时，实际上调用当前对象的toString()方法

```java
Customer cust1 = new Customer("Tom",21)
//输出相同
System.out.println(cust1);
System.out.println(cust1.ToString)
```
- Object中toString()的定义：
```java
public String toString(){
	return getClass().getName()+"@"+Integger.toHexString(hashCode());
}
```
- 像String、Date、File、包装类等都重写了Object类中的toString()方法。使得在调用对象的toString()时，返回“实体内容”信息
- 自定义类也可以重写toString方法，当调用此方法时，返回对象的实体内容

```java
//重写toString()方法
//手动重写
public String toString(){
    return "Customer[name="+name+,",age="+age+"]";
}
//自动重写
```
