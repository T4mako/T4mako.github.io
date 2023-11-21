
## CSV 文件概述

csv 文件以纯文本形式存储表格数据，使用逗号分割，如：
```csv
a,b,c
e,d,f
g,h,i
```

关于缺失值：csv 中的缺失值被 java 读取后，数据为 「""」，因此需要使用 `"".equals(str)` 方法判断


## CSV 文件读取
目前桌面上有一个 csv 文件：
```csv
Id,value1,value2,value3,value4,value5
1,1,2,3,4,test1
2,1.2,1.4,1.6,1.8,test2
3,3.00E+09,2.50E+08,2.00E+07,4.00E+08,test3
4,hello,I,love,you,test4
5,你好,我,喜欢,你,test5
```

CSV 的读取：
```java
File file = new File("C:\\Users\\Tamako\\Desktop\\test.csv");
FileReader fr = null;
BufferedReader br = null;
ArrayList<String[]> list = null;
try {
    fr = new FileReader(file); // 创建 FileInputStream 对象
    br = new BufferedReader(fr); // 创建 BufferedReader 对象
    list = new ArrayList<>(); // 存储 csv 文件中的数据
    String s; // 存储读取的 csv 的每一行
    while ((s = br.readLine()) != null){ // 如果读取的每一行，若不为空，按「,」分割
        list.add(s.split(",")); // 将分割的字符数组加入 list
    }
} catch (IOException e) {
    throw new RuntimeException(e);
} finally {
    try {
        if(fr != null) fr.close();
        if (br != null) br.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
// 输出所有值
for(String[] strings : list){
    for (String str : strings) {
        if (str == null || "".equals(str)) System.out.print("缺失值 ");
        else System.out.print(str + " ");
    }
    System.out.println();
}
// 输出第二行数据的和
String[] strings = list.get(2);
double sum = 0;
for (int i = 1; i < strings.length - 1; i++) {
    sum += Double.parseDouble(strings[i]);
}
System.out.println(sum);
```

## CSV 文件写入

```java
String path = "C:\\Users\\Tamako\\Desktop\\test2.csv";
String[][] allData = {{"Hello","I"},{"Love","You"}};
FileWriter fw = null;
BufferedWriter bw = null;

try {
    fw = new FileWriter(path); // 创建 FileWriter 对象
    bw = new BufferedWriter(fw); // 创建 BufferedWriter 对象
    for(String[] str : allData){ // 获取二维数组的每行字符串数组
        bw.write(String.join(",", str)); // 使用 String.join() 方法，传入 String 数组，使用「,」拼接
        bw.newLine();
    }
} catch (IOException e) {
    throw new RuntimeException(e);
} finally {
    try {
        if (bw != null) bw.close(); // 流的关闭，注意顺序不要搞反
        if(fw != null) fw.close();
    }catch (IOException e){
        e.printStackTrace();
    }
}
```
