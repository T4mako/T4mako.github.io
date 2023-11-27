
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


## 练习题

假设文件是位于D盘目录下的 seed.csv，其内容如下：

Area,Perimeter,Compactness,Kernel.Length,Kernel.Width,Asymmetry.Coeff,Kernel.Groove,Type
```txt
15.26,14.84,0.871,5.763,3.312,2.221,5.22,1
14.88,14.57,0.8811,5.554,3.333,1.018,4.956,1
14.29,14.09,0.905,5.291,3.337,2.699,4.825,1
13.84,13.94,0.8955,5.324,3.379,2.259,4.805,2
16.14,14.99,0.9034,5.658,3.562,1.355,5.175,2
14.38,14.21,0.8951,5.386,3.312,2.462,4.956,2
14.69,14.49,0.8799,5.563,3.259,3.586,5.219,3
16.63,,0.8747,6.053,3.465,2.04,5.877,3
16.44,15.25,0.888,5.884,3.505,1.969,5.533,3
```
回答以下问题（简述思路并写出代码）：

（1）读取csv文件内容，并打印输出

（2）统计并打印输出：各类别小麦种子的 籽粒长度、籽粒宽度 的最小值、最大值和平均值

（3）该文件的某一行漏了一个数据，你该如何处理（处理好后打印输出，并写入同一目录下的new_seed.csv文件）

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.Arrays;

public class Csv {
    public static void main(String[] args) {
        String filepath = "D:\\seed.csv";
        String[][] alldata = new String[100][];
        int lack_r = 0, lack_c = 0;
        try {
            // 1. 读取文件内容 创建 FileReader和 BufferedReader 对象来读取文件内容
            FileReader filereader = new FileReader(filepath);
            BufferedReader buffereader = new BufferedReader(filereader);
            // 2. 存储到内存(数组、Map或其他数据类型)中，使用split分隔逗号
            String line;
            int linenumber = 0;
            while ((line = buffereader.readLine()) != null) {
                // 按逗号分隔每行数据
                String[] data = line.split(",");
                alldata[linenumber] = data;
                linenumber++;
            }
            // 数组拷贝。从源数组中指定的范围复制一部分元素到一个新的数组中。
            alldata = Arrays.copyOfRange(alldata, 0, linenumber);
            // 3. 打印输出源数据，同时查找缺失位置（假设只缺少一处）
            System.out.println("源数据：");
            for (int i = 0; i < linenumber; i++) {
                System.out.print(alldata[i][0]);
                for (int j = 1; j < alldata[0].length; j++) {
                    if (alldata[i][j].isEmpty()) {
                        lack_r = i;
                        lack_c = j;
                    }
                    System.out.print("," + alldata[i][j]);
                }
                System.out.println();
            }
            System.out.println();
            // 统计并打印输出指定内容
            for (int i = 1; i < 4; i++) {
                DataProcessing(alldata, 3, i);
                DataProcessing(alldata, 4, i);
            }
            System.out.println();
            // 4. 处理缺失数据
            double sum = 0, avg = 0;
            for (int i = 1; i < linenumber; i++) {
                if (i != lack_r) {
                    sum += Double.parseDouble(alldata[i][lack_c]);
                }
            }
            avg = sum / (linenumber - 2);
            alldata[lack_r][lack_c] = Double.toString(avg);
            System.out.println("缺失数据在" + (lack_r + 1) + "行" + (lack_c + 1) + "列，填充此列其他数的平均值：" + avg);
            System.out.println();
            // 5. 打印输出处理后的数据
            System.out.println("处理后数据：");
            for (int i = 0; i < linenumber; i++) {
                System.out.print(alldata[i][0]);
                for (int j = 1; j < alldata[0].length; j++) {
                    System.out.print("," + alldata[i][j]);
                }
                System.out.println();
            }
            // 6. 关闭FileReader流和BufferedReader流
            filereader.close();
            buffereader.close();
            // 1. 创建流 创建FileWriter和BufferedWriter对象来读取文件内容
            filepath = "D:\\seed_new.csv";
            FileWriter filewriter = new FileWriter(filepath);
            BufferedWriter bufferwriter = new BufferedWriter(filewriter);
            // 2. 写入新文件
            for (String[] str : alldata) {
                String context = str[0];
                for (int i = 1; i < alldata[0].length; i++) {
                    context = context + "," + str[i];
                }
                bufferwriter.write(context);
                bufferwriter.newLine(); // 换行
            }
            // 3. 关闭BufferedWriter流和FileWriter流，顺序不要搞反
            bufferwriter.close();
            filewriter.close();
        } catch (Exception e) {
            // 处理异常情况
            e.printStackTrace();
        }
    }

    // 输出列表中的最小值、最大值和平均值
    public static void DataProcessing(String[][] alldata, int n, int type) {
        String[] s1 = {"", "Kama", "Rosa", "Canadian"};
        String[] s2 = {"", "", "", "籽粒长度", "籽粒宽度"};
        double min = Double.parseDouble(alldata[1][n]), max = Double.parseDouble(alldata[1][n]), sum = 0, avg = 0;
        for (int i = 1; i < alldata.length; i++) {
            double data = Double.parseDouble(alldata[i][n]);
            int m = Integer.parseInt(alldata[i][7]);
            if (m == type) {
                sum += data;
                if (data > max) {
                    max = data;
                }
                if (data < min) {
                    min = data;
                }
            }
        }
        avg = sum / (alldata.length - 1);
        System.out.println(s1[type] + "小麦 " + s2[n] + " 最小值是：" + min + "，最大值是：" + max + "，平均值是：" + avg);
    }
}
```