---
date: 2023-08-10
category: 
  - SQL
---

# 高频 SQL 50 题

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

<Badge text="简单" type="tip" vertical="middle" />

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

### 570. 至少有5名直接下属的经理

<Badge text="中等" type="warning" vertical="middle" />

```sql
select name from Employee where id in (
    select managerId from Employee group by managerId having count(1) >= 5
)
```

### 1934. 确认率

<Badge text="中等" type="warning" vertical="middle" />

```sql
select s.user_id,ROUND(IFNULL(AVG(c.action='confirmed'), 0), 2) AS confirmation_rate
from Signups s left join Confirmations c
on s.user_id = c.user_id
group by s.user_id
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

### 1075. 项目员工 I
<Badge text="简单" type="tip" vertical="middle" />
```sql
select p.project_id,Round(AVG(e.experience_years),2) as average_years
from PROJECT as p LEFT JOIN EMPLOYEE as e
ON p.employee_id = e.employee_id
group by project_id
```

### 1633. 各赛事的用户注册率
<Badge text="简单" type="tip" vertical="middle" />
```sql
select 
    contest_id,Round((COUNT(*) * 100 / (select COUNT(*) from USERS)),2) as percentage
from 
    Register as r
group by 
    r.contest_id
order by 
    percentage desc,r.contest_id
```

### 1211. 查询结果的质量和占比
<Badge text="简单" type="tip" vertical="middle" />

```sql
SELECT 
    query_name,
    ROUND(AVG(rating / position),2) as quality,
    ROUND(SUM(IF(rating < 3, 1, 0)) * 100 / COUNT(*), 2) poor_query_percentage
FROM Queries
group by query_name
having query_name is not null;


```

### 1193. 每月交易 I
<Badge text="中等" type="warning" vertical="middle" />

```sql
SELECT 
    DATE_FORMAT(trans_date, '%Y-%m') AS month,
    country,
    COUNT(*) AS trans_count,
    COUNT(IF(state = 'approved', 1, NULL)) AS approved_count,
    SUM(amount) AS trans_total_amount,
    SUM(IF(state = 'approved', amount, 0)) AS approved_total_amount
FROM Transactions
GROUP BY month, country
```

### 1174. 即时食物配送 II
<Badge text="中等" type="warning" vertical="middle" />

```sql
select round (
    sum(order_date = customer_pref_delivery_date) * 100 /
    count(*),
    2
) as immediate_percentage
from Delivery
where (customer_id, order_date) in (
    select customer_id, min(order_date)
    from delivery
    group by customer_id
)
```

### 550. 游戏玩法分析 IV
<Badge text="中等" type="warning" vertical="middle" />

```sql
select IFNULL(round(count(distinct(Result.player_id)) / count(distinct(Activity.player_id)), 2), 0) as fraction
from (
  select Activity.player_id as player_id
  from (
    select player_id, DATE_ADD(MIN(event_date), INTERVAL 1 DAY) as second_date
    from Activity
    group by player_id
  ) as Expected, Activity
  where Activity.event_date = Expected.second_date and Activity.player_id = Expected.player_id
) as Result, Activity
```

## 排序和分组

### 2356. 每位教师所教授的科目种类的数量
<Badge text="简单" type="tip" vertical="middle" />

```sql
SELECT teacher_id,(COUNT(DISTINCT subject_id)) as cnt
from Teacher 
GROUP BY teacher_id
```

### 1141. 查询近30天活跃用户数
<Badge text="简单" type="tip" vertical="middle" />

```sql
select activity_date as day,COUNT(distinct user_id) as active_users
from Activity
where activity_date between '2019-06-28' and '2019-07-27'
group by activity_date
order by activity_date
```

### 1084. 销售分析III
<Badge text="简单" type="tip" vertical="middle" />

```sql
select s.product_id,p.product_name
from Product as p RIGHT JOIN Sales as s
on p.product_id = s.product_id
group by s.product_id
having
    MAX(s.sale_date) between '2019-01-01' and '2019-03-31'
    and
    MIN(s.sale_date) between '2019-01-01' and '2019-03-31'
```

### 596. 超过5名学生的课

<Badge text="简单" type="tip" vertical="middle" />

```sql
select class from Courses group by class having count(distinct student) >= 5
```

### 1729. 求关注者的数量
<Badge text="简单" type="tip" vertical="middle" />

```sql
select user_id ,count(follower_id) followers_count
from Followers
group by user_id
order by user_id
```

### 619. 只出现一次的最大数字
<Badge text="简单" type="tip" vertical="middle" />

```sql
SELECT MAX(num) AS num
FROM
    (SELECT
        num
    FROM
        MyNumbers
    GROUP BY num
    HAVING COUNT(num) = 1) AS t
```

### 1045. 买下所有产品的客户

<Badge text="中等" type="warning" vertical="middle" />

```sql
select 
    customer_id 
from 
    (select 
        customer_id,count(distinct(product_key)) num 
    from 
        Customer 
    group by 
        customer_id) a 
where num = (select count(1) from Product  )
```

## 高级查询和连接

### 1731. 每位经理的下属员工数量
<Badge text="简单" type="tip" vertical="middle" />

```sql
select 
    m.employee_id,
    m.name,
    count(*) as reports_count,
    round(avg(e.age),0) as average_age
from Employees e 
join Employees m
on e.reports_to = m.employee_id 
group by m.employee_id
order by employee_id
```

### 610. 判断三角形
<Badge text="简单" type="tip" vertical="middle" />

```sql
SELECT 
    x,y,z,
    CASE
        WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes'
        ELSE 'No'
    END AS 'triangle'
FROM
    triangle
;
```

### 180. 连续出现的数字
<Badge text="中等" type="warning" vertical="middle" />

```sql
SELECT DISTINCT
    l1.Num AS ConsecutiveNums
FROM
    Logs l1,
    Logs l2,
    Logs l3
WHERE
    l1.Id = l2.Id - 1
    AND l2.Id = l3.Id - 1
    AND l1.Num = l2.Num
    AND l2.Num = l3.Num
;
```

### 1164. 指定日期的产品价格
<Badge text="中等" type="warning" vertical="middle" />

```sql
SELECT DISTINCT
    l1.Num AS ConsecutiveNums
FROM
    Logs l1,
    Logs l2,
    Logs l3
WHERE
    l1.Id = l2.Id - 1
    AND l2.Id = l3.Id - 1
    AND l1.Num = l2.Num
    AND l2.Num = l3.Num
;
```

### 1204. 最后一个能进入巴士的人

<Badge text="中等" type="warning" vertical="middle" />

```sql
SELECT a.person_name
FROM Queue a, Queue b
WHERE a.turn >= b.turn
GROUP BY a.person_id HAVING SUM(b.weight) <= 1000
ORDER BY a.turn DESC
LIMIT 1
```

### 1907. 安分类统计薪水

<Badge text="中等" type="warning" vertical="middle" />

```sql
SELECT 
    'Low Salary' AS category,
    SUM(CASE WHEN income < 20000 THEN 1 ELSE 0 END) AS accounts_count
FROM 
    Accounts
    
UNION
SELECT  
    'Average Salary' category,
    SUM(CASE WHEN income >= 20000 AND income <= 50000 THEN 1 ELSE 0 END) 
    AS accounts_count
FROM 
    Accounts

UNION
SELECT 
    'High Salary' category,
    SUM(CASE WHEN income > 50000 THEN 1 ELSE 0 END) AS accounts_count
FROM 
    Accounts
```

## 子查询
### 1978. 上级经理已离职的公司员工
<Badge text="简单" type="tip" vertical="middle" />

```sql
select employee_id 
from Employees
where 
        manager_id is not null 
    and 
        manager_id not in (select employee_id from Employees)  
    and 
        salary < 30000
order by employee_id
```

### 626. 换座位
<Badge text="中等" type="warning" vertical="middle" />

```sql
select 
    if(id % 2 = 0,
        id - 1,
        if(id = (select count(distinct id) from seat),
            id,
            id + 1)) 
    as id,student 
from seat 
order by id;
```

### 1341. 电影评分
<Badge text="中等" type="warning" vertical="middle" />

```sql
(
    select Users.name as results
    FROM MovieRating
        JOIN Users ON MovieRating.user_id = Users.user_id
    GROUP BY MovieRating.user_id
    ORDER BY
        count(MovieRating.user_id) desc,
        Users.name
    LIMIT 1
)
UNION ALL(
    select
        Movies.title as results
    FROM MovieRating
        JOIN Movies ON MovieRating.movie_id = Movies.movie_id
    WHERE
        MovieRating.created_at >= '2020-02-01'
        AND MovieRating.created_at < '2020-03-01'
    GROUP BY MovieRating.movie_id
    ORDER BY
        avg(MovieRating.rating) desc,
        Movies.title
    LIMIT 1
)
```

### 1321. 餐馆营业额变化增长

<Badge text="中等" type="warning" vertical="middle" />

```sql
SELECT
	a.visited_on,
	sum( b.amount ) AS amount,
	round(sum( b.amount ) / 7, 2 ) AS average_amount 
FROM
	( SELECT DISTINCT visited_on FROM customer ) a JOIN customer b 
 	ON datediff( a.visited_on, b.visited_on ) BETWEEN 0 AND 6 
WHERE
	a.visited_on >= (SELECT min( visited_on ) FROM customer ) + 6 
GROUP BY
	a.visited_on
ORDER BY
  a.visited_on
```

### 602. 好友申请 II ：谁有最多的好友

<Badge text="中等" type="warning" vertical="middle" />

```sql
select id,count(*) num from 
    (select requester_id id from RequestAccepted
    union all
    select accepter_id id from RequestAccepted) tb
group by id
order by num desc
limit 1
```

### 585. 2016年的投资

<Badge text="中等" type="warning" vertical="middle" />

```sql
SELECT
    ROUND(SUM(insurance.TIV_2016),2) AS TIV_2016
FROM
    insurance
WHERE
    insurance.TIV_2015 IN
    (
      SELECT
        TIV_2015
      FROM
        insurance
      GROUP BY TIV_2015
      HAVING COUNT(*) > 1
    )
    AND CONCAT(LAT,'-', LON) IN
    (
      SELECT
        CONCAT(LAT,'-', LON)
      FROM
        insurance
      GROUP BY LAT , LON
      HAVING COUNT(*) = 1
    )
;
```

### 185. 部门工资前三高的所有员工

<Badge text="困难" type="danger" vertical="middle" />

```sql
SELECT
    ROUND(SUM(insurance.TIV_2016),2) AS TIV_2016
FROM
    insurance
WHERE
    insurance.TIV_2015 IN
    (
      SELECT
        TIV_2015
      FROM
        insurance
      GROUP BY TIV_2015
      HAVING COUNT(*) > 1
    )
    AND CONCAT(LAT,'-', LON) IN
    (
      SELECT
        CONCAT(LAT,'-', LON)
      FROM
        insurance
      GROUP BY LAT , LON
      HAVING COUNT(*) = 1
    )
;
```

## 高级字符串函数 / 正则表达式 / 字句

### 1667. 修复表中的名字

<Badge text="简单" type="tip" vertical="middle" />

```sql
select user_id,CONCAT(UPPER(left(name, 1)),LOWER(RIGHT(name, length(name) - 1))) as name
from Users
order by user_id
```

### 1527. 患某种疾病的患者

<Badge text="简单" type="tip" vertical="middle" />

```sql
select *
from Patients
where conditions REGEXP '^DIAB1| DIAB1'
```

### 196. 删除重复的电子邮箱

<Badge text="简单" type="tip" vertical="middle" />

```sql
DELETE p1 FROM Person p1,
    Person p2
WHERE
    p1.Email = p2.Email AND p1.Id > p2.Id
```


### 1484. 按日期分组销售产品

<Badge text="简单" type="tip" vertical="middle" />

```sql
select sell_date,count(distinct(product)) as num_sold,GROUP_CONCAT(DISTINCT product) products
from Activities
group by sell_date
```

### 1327. 列出指定时间段内所有的下单产品
<Badge text="简单" type="tip" vertical="middle" />

```sql
select p.product_name,SUM(o.unit) unit    
from Products p right join Orders o
on p.product_id = o.product_id
where o.order_date between '2020-02-01' and '2020-02-29'
group by p.product_name
having SUM(o.unit) >= 100
``` 


### 1517. 查找拥有有效邮箱的用户
<Badge text="简单" type="tip" vertical="middle" />

```sql
select user_id,name,mail from users where mail regexp '^[a-zA-Z][0-9a-zA-Z\-\_\\.]*@leetcode\\.com$'
``` 

