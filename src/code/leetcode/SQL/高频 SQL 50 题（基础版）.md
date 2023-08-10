---
date: 2023-08-10
category: 
  - SQL
---

[题目集合](https://leetcode.cn/studyplan/sql-free-50/)

## 查询

### 可回收且低脂低产品

<Badge text="简单" type="tip" vertical="middle" />

```sql
SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y';
```