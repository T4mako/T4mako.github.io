---
date: 2023-08-10
category: 
  - SQL
---

# 高频 SQL 50题

[题目集合](https://leetcode.cn/studyplan/sql-free-50/)

## 查询

### 1757. 可回收且低脂的产品

<Badge text="简单" type="tip" vertical="middle" />

```sql
SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y';
```

### 584. 寻找用户推荐人

<Badge text="简单" type="tip" vertical="middle" />

```sql
select name 
from Customer 
where referee_id is null or referee_id != 2;
```

### 595. 大的国家

<Badge text="简单" type="tip" vertical="middle" />

```sql
select name,population,area 
from World 
where area >= 3000000 or population >= 25000000;
```

### 1148. 文章浏览 I

<Badge text="简单" type="tip" vertical="middle" />

```sql
select DISTINCT author_id 'id' 
from Views 
where author_id = viewer_id 
order by author_id;
```

### 1683. 无效的推文

<Badge text="简单" type="tip" vertical="middle" />

```sql
select tweet_id 
from Tweets 
where LENGTH(content) > 15;
```

## 连接
### 1378. 使用唯一标识码替换员工ID
<Badge text="简单" type="tip" vertical="middle" />

```sql
select b.unique_id,a.name 
from Employees a left join EmployeeUNI b 
on a.id = b.id;
```

### 1068. 产品销售分析 I
<Badge text="简单" type="tip" vertical="middle" />

```sql
select p.product_name,s.year,s.price 
from Sales s , Product p
where  s.product_id = p.product_id;
```

### 1581. 进店却未进行过交易的顾客

<Badge text="简单" type="tip" vertical="middle" />

```sql
select v.customer_id,COUNT(customer_id) count_no_trans
from Visits v left join Transactions t
on t.visit_id = v.visit_id
where t.visit_id is null
group by customer_id;
```

### 197. 上升的温度

<Badge text="简单" type="tip" vertical="middle" />

```sql
select w1.id Id
from Weather w1,Weather w2
where DATEDIFF(w1.recordDate,w2.recordDate) = 1 and w1.temperature > w2.temperature;
```

### 1661. 每台机器的进程平均运行时间

<Badge text="简单" type="tip" vertical="middle" />

```sql
select a1.machine_id,ROUND(avg(a2.timestamp - a1.timestamp),3) processing_time
from Activity a1 join Activity a2
on a1.machine_id = a2.machine_id
where a1.activity_type = 'start' and a2.activity_type = 'end'
group by machine_id
```

### 577. 员工奖金

<Badge text="简单" type="tip" vertical="middle" />

```sql
select e.name,b.bonus
from Employee e left join Bonus b
on e.empid = b.empid
where b.bonus is null or b.bonus < 1000;
```

### 1280. 学生们参加各科测试的次数
```sql
SELECT 
    s.student_id, s.student_name, sub.subject_name, IFNULL(grouped.attended_exams, 0) AS attended_exams
FROM 
    Students s
CROSS JOIN 
    Subjects sub
LEFT JOIN (
    SELECT student_id, subject_name, COUNT(*) AS attended_exams
    FROM Examinations
    GROUP BY student_id, subject_name
) grouped 
ON s.student_id = grouped.student_id AND sub.subject_name = grouped.subject_name
ORDER BY s.student_id, sub.subject_name;
```

## 聚合函数

### 620. 有趣的电影
<Badge text="简单" type="tip" vertical="middle" />
```sql
select * from cinema 
where description <> 'boring' 
and id % 2 = 1
order by rating desc
```

### 1251. 平均售价
<Badge text="简单" type="tip" vertical="middle" />
```sql
select p.product_id,IFNULL(ROUND(SUM(units * price) / SUM(units), 2),0) 'average_price'
from Prices p left join UnitsSold u
on p.product_id = u.product_id
and u.purchase_date between p.start_date and p.end_date
group by p.product_id
```

