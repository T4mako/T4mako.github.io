import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,d}from"./app-a589a01e.js";const s={},a=d(`<h2 id="_1、数据库概述" tabindex="-1"><a class="header-anchor" href="#_1、数据库概述" aria-hidden="true">#</a> 1、数据库概述</h2><h3 id="_1、概述" tabindex="-1"><a class="header-anchor" href="#_1、概述" aria-hidden="true">#</a> 1、概述</h3><p>E-R（entity-relationship，实体-联系）模型中有三个主要概念是： **实体集 、 属性 、 联系集 **。<br> 一个实体集（class）对应于数据库中的一个表（table），一个实体（instance）则对应于数据库表中的一行（row），也称为一条记录（record）。一个属性（attribute）对应于数据库表中的一列（column），也称为一个字段（field）。</p><p><strong>实体--行--记录</strong><br><strong>属性--列--字段</strong></p><p>数据库中的一个<strong>表 <strong>&lt;---&gt; Java或Python中的一个</strong>类</strong><br> 表中的<strong>一条数据 <strong>&lt;---&gt; 类中的一个</strong>对象</strong>（或实体）<br> 表中的一个<strong>列</strong> &lt;----&gt; 类中的一个<strong>字段、属性</strong>(field)</p><p>表的关联关系：<br> 表与表之间的数据记录有关系(relationship)。现实世界中的各种实体以及实体之间的各种联系均用关系模型来表示。<br> **四种：一对一关联、一对多关联、多对多关联、自我引用 **</p><p>MySQL的版本：</p><p><strong>MySQL Community Server 社区版本</strong>，开源免费，自由下载，但不提供官方技术支持，适用于大多数普通用户。<br><strong>MySQL Enterprise Edition 企业版本</strong>，需付费，不能在线下载，可以试用30天。提供了更多的功能和更完备的技术支持，更适合于对数据库的功能和可靠性要求较高的企业客户。<br><strong>MySQL Cluster 集群版</strong>，开源免费。用于架设集群服务器，可将几个MySQL Server封装成一个Server。需要在社区版或企业版的基础上使用。<br><strong>MySQL Cluster CGE 高级集群版</strong>，需付费。</p><p>MySQL8.0以后<strong>修改密码加密方式</strong>：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#使用mysql数据库
USE mysql;
#修改&#39;root&#39;@&#39;localhost&#39;用户的密码规则和密码
ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED WITH mysql_native_password BY &#39;abc123&#39;;
#刷新权限
FLUSH PRIVILEGES;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、sql-的分类" tabindex="-1"><a class="header-anchor" href="#_2、sql-的分类" aria-hidden="true">#</a> 2、SQL 的分类：</h3><p>SQL（Structured Query Language，结构化查询语言）</p><p><strong>DDL</strong>（Data Definition Languages、数据定义语言），这些语句定义了不同的数据库、表、视图、索引等数据库对象，还可以用来创建、删除、修改数据库和数据表的结构。主要的语句关键字包括 <strong>CREATE 、 DROP 、 ALTER、RENAME、TURNCATE</strong> 等。<br><strong>DML</strong>（Data Manipulation Language、数据操作语言），用于添加、删除、更新和查询数据库记录，并检查数据完整性。主要的语句关键字包括 **INSERT 、 DELETE 、 UPDATE 、 SELECT **等。SELECT是SQL语言的基础，最为重要。<br><strong>DCL</strong>（Data Control Language、数据控制语言），用于定义数据库、表、字段、用户的访问权限和安全级别。主要的语句关键字包括 <strong>GRANT 、 REVOKE 、 COMMIT 、 ROLLBACK 、 SAVEPOINT</strong> 等。</p><p>SQL 可以写在一行或者多行。为了提高可读性，各子句分行写，必要时使用缩进<br> 每条命令以 ; 或 \\g 或 \\G 结束<br><strong>MySQL 在 Windows</strong> 环境下是<strong>大小写不敏感</strong>的<br><strong>MySQL 在 Linux</strong> 环境下是<strong>大小写敏感</strong>的</p><p>推荐采用统一的<strong>书写规范：</strong><br><strong>数据库名、表名、表别名、字段名、字段别名等都小写</strong><br> **SQL 关键字、函数名、绑定变量等都大写 **</p><h3 id="_3、注释" tabindex="-1"><a class="header-anchor" href="#_3、注释" aria-hidden="true">#</a> 3、注释</h3><p>单行注释：#注释文字(MySQL特有的方式)<br> 单行注释：-- 注释文字(--后面必须包含一个空格。)<br> 多行注释：/* 注释文字 */</p><h3 id="_4、数据的导入" tabindex="-1"><a class="header-anchor" href="#_4、数据的导入" aria-hidden="true">#</a> 4、数据的导入</h3><p>导入现有的数据表、表的数据<br> 方式一：source文件的全路径名</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; source d:\\mysqldb.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>方式二：基于具体的图形化界面的工具可以导入数据</p><h2 id="_2、基本的select语句" tabindex="-1"><a class="header-anchor" href="#_2、基本的select语句" aria-hidden="true">#</a> 2、基本的SELECT语句</h2><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT ... FROM ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="as列的别名" tabindex="-1"><a class="header-anchor" href="#as列的别名" aria-hidden="true">#</a> AS列的别名</h3><p><strong>as</strong>：（全称alias，别名）可以省略<br> 列的别名可以使用一对“”引起来</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT id AS pid, name &quot;ename&quot;
FROM emp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="distinct去除重复行" tabindex="-1"><a class="header-anchor" href="#distinct去除重复行" aria-hidden="true">#</a> DISTINCT去除重复行</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT DISTINCT name FROM emp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="null空值" tabindex="-1"><a class="header-anchor" href="#null空值" aria-hidden="true">#</a> NULL空值</h3><p>空值：null 不同于“null”，0<br> 空值参与运算，结果一定为空</p><h3 id="着重号" tabindex="-1"><a class="header-anchor" href="#着重号" aria-hidden="true">#</a> \`\`着重号</h3><p>避免与关键字、保留字重名</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM \`order\`；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="desc显示表结构" tabindex="-1"><a class="header-anchor" href="#desc显示表结构" aria-hidden="true">#</a> DESC显示表结构</h3><p><strong>describe</strong><br><strong>DESC</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DESCRIBE emp；
DESC emp；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="where过滤数据" tabindex="-1"><a class="header-anchor" href="#where过滤数据" aria-hidden="true">#</a> WHERE过滤数据</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT *
FROM emp
WHERE name = &#39;abc&#39;;#Windows下mysql此处任忽略大小写，别名尽量&quot;&quot;,查询&#39;&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、运算符" tabindex="-1"><a class="header-anchor" href="#_3、运算符" aria-hidden="true">#</a> 3、运算符</h2><h3 id="_1、算数运算符" tabindex="-1"><a class="header-anchor" href="#_1、算数运算符" aria-hidden="true">#</a> 1、算数运算符</h3><p>算术运算符：+ - * / div(除) % mod(取模)</p><h3 id="_2、比较运算符" tabindex="-1"><a class="header-anchor" href="#_2、比较运算符" aria-hidden="true">#</a> 2、比较运算符</h3><p>比较运算符用来对表达式左边的操作数和右边的操作数进行比较，比较的结果为真则返回1，比较的结果<br> 为假则返回0，其他情况则返回NULL。<br> 比较运算符经常被用来作为SELECT查询语句的条件来使用，返回符合条件的结果记录</p><h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> = &lt;=&gt; &lt;&gt; != &lt; &lt;= &gt; &gt;=</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 1 = &#39;1&#39;,1 = &#39;a&#39;,0 = &#39;a&#39;,&#39;a&#39; = &#39;b&#39;,1 = null,null = null,null &lt;=&gt; null #1,0,1,0,null,null,1
FROM DUAL; #伪表
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>与null参与的运算基本都是null(+,*,==)，除了&lt;=&gt;</strong></p><h4 id="is-nullis-not-nullisnull" tabindex="-1"><a class="header-anchor" href="#is-nullis-not-nullisnull" aria-hidden="true">#</a> IS NULL IS NOT NULL ISNULL</h4><h4 id="least-greatest-最小-最大" tabindex="-1"><a class="header-anchor" href="#least-greatest-最小-最大" aria-hidden="true">#</a> LEAST() GREATEST() 最小，最大</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT LEAST(&#39;a&#39;,&#39;g&#39;,&#39;e&#39;,&#39;z&#39;),GREATEST(&#39;a&#39;,&#39;g&#39;,&#39;e&#39;,&#39;z&#39;) FROM DUAL; #a,z
SELECT LEAST(&#39;abc&#39;,&#39;abb&#39;); #字符串的比较abb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="between-andin-set-not-in-set" tabindex="-1"><a class="header-anchor" href="#between-andin-set-not-in-set" aria-hidden="true">#</a> BETWEEN AND IN(SET) NOT IN(SET)</h4><p>区别它们之间的区别</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM emp
WHERE id BETWEEN 10 AND 20;
#WHERE id &gt;= 10 AND id &lt;= 20;
#WHERE id NOT BETWEEN 10 AND 20;
#WHERE id &lt; 10 or id &gt; 20;

SELECT * FROM emp
WHERE id IN (1,2,3);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="like模糊查询" tabindex="-1"><a class="header-anchor" href="#like模糊查询" aria-hidden="true">#</a> LIKE模糊查询</h4><p>通配符：<br><strong>_ 1个</strong><br><strong>% 0个，1个或多个</strong><br> 转义字符：\\ 或者 escape</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM emp
WHERE name LIKE &#39;%a%&#39; AND name LIKE &#39;_b%&#39; AND name LIKE &#39;_\\_a&#39; AND name LIKE &#39;_$_a&#39; ESCAPE &#39;$&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、逻辑运算符" tabindex="-1"><a class="header-anchor" href="#_3、逻辑运算符" aria-hidden="true">#</a> 3、逻辑运算符</h3><p><strong>OR || 逻辑或</strong><br><strong>AND &amp;&amp; 逻辑与</strong><br><strong>NOT ！ 逻辑非</strong><br><strong>XOR 逻辑异或</strong><br> AND的优先级高于OR</p><h3 id="_4、位运算符" tabindex="-1"><a class="header-anchor" href="#_4、位运算符" aria-hidden="true">#</a> 4、位运算符</h3><p><strong>&amp; 按位与<br> | 按位或<br> ^ 按位异或<br> ~ 按位取反<br> &gt;&gt; 右移<br> &lt;&lt; 左移</strong></p><h2 id="_4、排序和分页" tabindex="-1"><a class="header-anchor" href="#_4、排序和分页" aria-hidden="true">#</a> 4、排序和分页</h2><h3 id="_1、排序-order-by" tabindex="-1"><a class="header-anchor" href="#_1、排序-order-by" aria-hidden="true">#</a> 1、排序 ORDER BY</h3><p>如果没有使用排序操作，默认情况下数据按照添加顺序排列</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT id FROM emp ORDER BY salary;
SELECT id FROM emp ORDER BY salary ASC; #从低到高 升序
SELECT id FROM emp ORDER BY salary DESC; #从高到低 降序
#SELECT id eip FROM emp WHERE eid &gt; 50; 列的别名不能在WHERE后使用
SELECT id FROM emp ORDER BY salary ASC,id DESC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>列的别名不能在WHERE后使用，可以在ORDER BY后使用</strong></p><h3 id="_2、分页-limit" tabindex="-1"><a class="header-anchor" href="#_2、分页-limit" aria-hidden="true">#</a> 2、分页 LIMIT</h3><p>Limit 偏移量,显示条数<br> LIMIT 显示条数<br> LIMIT 显示条数 OFFSET 偏移量 (MySQL新特性)</p><p>每页显示pageSize条记录，显示第pageNo页：(LIMIT pageNo-1)*pageSize,pageSize</p><h2 id="_5、多表查询" tabindex="-1"><a class="header-anchor" href="#_5、多表查询" aria-hidden="true">#</a> 5、多表查询</h2><p>多表查询的分类：<br> 等值连接，非等值连接<br> 自连接，非自连接<br> 内连接，外连接</p><p>1、笛卡尔积（m*n条数据）</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT id，dep FROM emp,department;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、等值连接，非等值连接</p><p>如果查询语句中出现了<strong>多个表都存在的字段</strong>，必须<strong>指明此字段所在的表</strong><br> 建议多表查询时，每个字段都声明其所在的表</p><p>可以起别名，在SELECT和WHERE中使用表的别名<br><strong>如果给表起了别名，一旦在SELECT或WHERE中使用表名，必须使用表的别名，而不能使用表的原名</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT emp.id,dept.name
FROM employee emp,department dept
WHERE emp.id = dept.id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结论：如果有n个表实现多表连接，<mark>至少</mark>需要n-1个连接条件</strong></p><p>非等值连接</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT e.name,e.salary,j.level
FROM emp e,job j
WHERE e.salary &gt; j.lowest;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、自连接，非自连接</p><p>自连接<br> 举例：查询员工表的员工id，姓名及其管理者的id和姓名</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT emp.id,emp.name,mgr.id,mger.name
FROM employee emp,employee mgr
WHERE emp.managerid = mgr.id;
#内连接，对于没有领导者的员工将不会显示
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、内连接，外连接</p><p><strong>内连接：合并具有同一列的两个以上的表的行，结果集中不包含一个表与另一个表不匹配的行<br> 外连接：合并具有同一列的两个以上的表的行，结果集中除了包含一个表与另一个表匹配的行，还包含左表或右表中不匹配的行</strong></p><p>外连接：左外连接，右外连接，满外连接</p><p>SQL92语法实现外连接：使用 + (MySQL不支持SQL92语法)<br> SQL99语法中使用JOIN...ON的方式实现多表查询</p><p>SQL99实现内连接：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname,city
FROM emp e (INNER) JOIN dep d
ON e.depid = d.depid;
JOIN locations l
ON d.loid = l.loid;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SQL99实现外连接：</p><p>左外连接</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname
FROM emp e LEFT (OUTER) JOIN dep d
ON e.depid = d.depid;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>右外连接</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname
FROM emp e RIGHT (OUTER) JOIN dep d
ON e.depid = d.depid;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>满外连接：mysql不支持FULL OUTER JOIN</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname
FROM emp e FULL (OUTER) JOIN dep d
ON e.depid = d.depid;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>UNION关键字的使用</strong></p><p>UNION：会执行去重操作<br> UNION ALL：不会执行去重操作<br> 执行UNION ALL语句时所需要的资源比UNION语句少。如果明确知道合并数据后的<strong>结果数据不存在重复数据</strong>，或者不需要去除重复的数据，则<strong>尽量使用UNION ALL</strong>语句，以提高数据查询的效率。</p><h3 id="七种sql-joins的实现" tabindex="-1"><a class="header-anchor" href="#七种sql-joins的实现" aria-hidden="true">#</a> 七种SQL JOINS的实现</h3><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20220806215624195.png" alt="image-20220806215624195" loading="lazy"></p><p>中图：内连接</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname
FROM emp e JOIN dep d
ON e.depid = d.depid;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>左上图：左外连接</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname
FROM emp e LEFT JOIN dep d
ON e.depid = d.depid;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>右上图：右外连接</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname
FROM emp e RIGHT JOIN dep d
ON e.depid = d.depid;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>左中图：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname
FROM emp e LEFT JOIN dep d
ON e.depid = d.depid
WHERE d.depid IS NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>右中图：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname
FROM emp e RIGHT JOIN dep d
ON e.depid = d.depid;
WHERE e.depid IS NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>左下图：<br> 左上图 UNION ALL 有中图 或者<br> 左中图 UNION ALL 右上图</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname
FROM emp e LEFT JOIN dep d
ON e.depid = d.depid;
UNION ALL
SELECT eid,depname
FROM emp e RIGHT JOIN dep d
ON e.depid = d.depid;
WHERE e.depid IS NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>右下图：<br> 左中图 UNION 右中图</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid,depname
FROM emp e JOIN dep d
ON e.depid = d.depid
WHERE d.depid IS NULL;
UNION ALL
SELECT eid,depname
FROM emp e RIGHT JOIN dep d
ON e.depid = d.depid;
WHERE e.depid IS NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SQL99语法新特性</p><p>1、自然连接NATURAL JOIN：<strong>自动</strong>连接表中<strong>相同的字段</strong>，然后进行<strong>等值连接</strong></p><p>2、USING连接</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT eid，name，depname
FROM emp e JOIN department d
USING (depid); #e.depid = d.dep.id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6、函数" tabindex="-1"><a class="header-anchor" href="#_6、函数" aria-hidden="true">#</a> 6、函数</h2><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221105194821206.png" alt="image-20221105194821206" loading="lazy"></p><h3 id="_1、基本函数" tabindex="-1"><a class="header-anchor" href="#_1、基本函数" aria-hidden="true">#</a> 1、基本函数</h3><table><thead><tr><th>ABS(x)</th><th>返回x的绝对值</th></tr></thead><tbody><tr><td><strong>SIGN(X)</strong></td><td><strong>返回X的符号。正数返回1，负数返回-1，0返回0</strong></td></tr><tr><td><strong>PI()</strong></td><td><strong>返回圆周率的值</strong></td></tr><tr><td><strong>CEIL(x)，CEILING(x)</strong></td><td><strong>返回大于或等于某个值的最小整数</strong></td></tr><tr><td><strong>FLOOR(x)</strong></td><td><strong>返回小于或等于某个值的最大整数</strong></td></tr><tr><td><strong>LEAST(e1,e2,e3…)</strong></td><td><strong>返回列表中的最小值</strong></td></tr><tr><td><strong>GREATEST(e1,e2,e3…)</strong></td><td><strong>返回列表中的最大值</strong></td></tr><tr><td><strong>MOD(x,y)</strong></td><td><strong>返回X除以Y后的余数</strong></td></tr><tr><td><strong>RAND()</strong></td><td><strong>返回0~1的随机值</strong></td></tr><tr><td><strong>RAND(x)</strong></td><td><strong>返回0~1的随机值，其中x的值用作种子值，相同的X值会产生相同的随机 数</strong></td></tr><tr><td><strong>ROUND(x)</strong></td><td><strong>返回一个对x的值进行四舍五入后，最接近于X的整数</strong></td></tr><tr><td><strong>ROUND(x,y)</strong></td><td><strong>返回一个对x的值进行四舍五入后最接近X的值，并保留到小数点后面Y位</strong></td></tr><tr><td><strong>TRUNCATE(x,y)</strong></td><td><strong>返回数字x截断为y位小数的结果</strong></td></tr><tr><td><strong>SQRT(x)</strong></td><td><strong>返回x的平方根。当X的值为负数时，返回NULL</strong></td></tr></tbody></table><h3 id="_2、角度制与弧度制" tabindex="-1"><a class="header-anchor" href="#_2、角度制与弧度制" aria-hidden="true">#</a> 2、角度制与弧度制</h3><table><thead><tr><th>RADIANS(x)</th><th>将角度转化为弧度，其中，参数x为角度值</th></tr></thead><tbody><tr><td><strong>DEGREES(x)</strong></td><td><strong>将弧度转化为角度，其中，参数x为弧度值</strong></td></tr></tbody></table><h3 id="_3、三角函数" tabindex="-1"><a class="header-anchor" href="#_3、三角函数" aria-hidden="true">#</a> 3、三角函数</h3><table><thead><tr><th>SIN(x)</th><th>返回x的正弦值，其中，参数x为弧度值</th></tr></thead><tbody><tr><td><strong>ASIN(x)</strong></td><td><strong>返回x的反正弦值，即获取正弦为x的值。如果x的值不在-1到1之间，则返回NULL</strong></td></tr><tr><td><strong>COS(x)</strong></td><td><strong>返回x的余弦值，其中，参数x为弧度值</strong></td></tr><tr><td><strong>ACOS(x)</strong></td><td><strong>返回x的反余弦值，即获取余弦为x的值。如果x的值不在-1到1之间，则返回NULL</strong></td></tr><tr><td><strong>TAN(x)</strong></td><td><strong>返回x的正切值，其中，参数x为弧度值</strong></td></tr><tr><td><strong>ATAN(x)</strong></td><td><strong>返回x的反正切值，即返回正切值为x的值</strong></td></tr><tr><td><strong>ATAN2(m,n)</strong></td><td><strong>返回两个参数的反正切值</strong></td></tr><tr><td><strong>COT(x)</strong></td><td><strong>返回x的余切值，其中，X为弧度值</strong></td></tr></tbody></table><h3 id="_4、指数与对数" tabindex="-1"><a class="header-anchor" href="#_4、指数与对数" aria-hidden="true">#</a> 4、指数与对数</h3><table><thead><tr><th><strong>POW(x,y)，POWER(X,Y)</strong></th><th><strong>返回x的y次方</strong></th></tr></thead><tbody><tr><td><strong>EXP(X)</strong></td><td><strong>返回e的X次方，其中e是一个常数，2.718281828459045</strong></td></tr><tr><td><strong>LN(X)，LOG(X)</strong></td><td><strong>返回以e为底的X的对数，当X &lt;= 0 时，返回的结果为NULL</strong></td></tr><tr><td><strong>LOG10(X)</strong></td><td><strong>返回以10为底的X的对数，当X &lt;= 0 时，返回的结果为NULL</strong></td></tr><tr><td><strong>LOG2(X)</strong></td><td><strong>返回以2为底的X的对数，当X &lt;= 0 时，返回NULL</strong></td></tr></tbody></table><h3 id="_5、进制间的转换" tabindex="-1"><a class="header-anchor" href="#_5、进制间的转换" aria-hidden="true">#</a> 5、进制间的转换</h3><table><thead><tr><th><strong>BIN(x)</strong></th><th><strong>返回x的二进制编码</strong></th></tr></thead><tbody><tr><td><strong>HEX(x)</strong></td><td><strong>返回x的十六进制编码</strong></td></tr><tr><td><strong>OCT(x)</strong></td><td><strong>返回x的八进制编码</strong></td></tr><tr><td><strong>CONV(x,f1,f2)</strong></td><td><strong>返回f1进制数变成f2进制数</strong></td></tr></tbody></table><h3 id="_6、字符串函数" tabindex="-1"><a class="header-anchor" href="#_6、字符串函数" aria-hidden="true">#</a> 6、字符串函数</h3><p><strong>字符串的索引从1开始</strong></p><table><thead><tr><th>ASCII(S)</th><th>返回字符串S中的第一个字符的ASCII码值</th></tr></thead><tbody><tr><td><strong>CHAR_LENGTH(s)</strong></td><td><strong>返回字符串s的字符数。作用与CHARACTER_LENGTH(s)相同</strong></td></tr><tr><td><strong>LENGTH(s)</strong></td><td><strong>返回字符串s的字节数，和字符集有关</strong></td></tr><tr><td><strong>CONCAT(s1,s2,......,sn)</strong></td><td><strong>连接s1,s2,......,sn为一个字符串</strong></td></tr><tr><td><strong>CONCAT_WS(x, s1,s2,......,sn)</strong></td><td><strong>同CONCAT(s1,s2,...)函数，但是每个字符串之间要加上x</strong></td></tr><tr><td><strong>INSERT(str, idx, len, replacestr)</strong></td><td><strong>将字符串str从第idx位置开始，len个字符长的子串替换为字符串replacestr</strong></td></tr><tr><td><strong>REPLACE(str, a, b)</strong></td><td><strong>用字符串b替换字符串str中所有出现的字符串a</strong></td></tr><tr><td><strong>UPPER(s) 或 UCASE(s)</strong></td><td><strong>将字符串s的所有字母转成大写字母</strong></td></tr><tr><td><strong>LOWER(s) 或LCASE(s)</strong></td><td><strong>将字符串s的所有字母转成小写字母</strong></td></tr><tr><td><strong>LEFT(str,n)</strong></td><td><strong>返回字符串str最左边的n个字符</strong></td></tr><tr><td><strong>RIGHT(str,n)</strong></td><td><strong>返回字符串str最右边的n个字符</strong></td></tr><tr><td><strong>LPAD(str, len, pad)</strong></td><td><strong>用字符串pad对str最左边进行填充，直到str的长度为len个字符</strong></td></tr><tr><td><strong>RPAD(str ,len, pad)</strong></td><td><strong>用字符串pad对str最右边进行填充，直到str的长度为len个字符</strong></td></tr><tr><td><strong>LTRIM(s)</strong></td><td><strong>去掉字符串s左侧的空格</strong></td></tr><tr><td><strong>RTRIM(s)</strong></td><td><strong>去掉字符串s右侧的空格</strong></td></tr><tr><td><strong>TRIM(s)</strong></td><td><strong>去掉字符串s开始与结尾的空格</strong></td></tr><tr><td><strong>TRIM(s1 FROM s)</strong></td><td><strong>去掉字符串s开始与结尾的s1</strong></td></tr><tr><td><strong>TRIM(LEADING s1 FROM s)</strong></td><td><strong>去掉字符串s开始处的s1</strong></td></tr><tr><td><strong>TRIM(TRAILING s1 FROM s)</strong></td><td><strong>去掉字符串s结尾处的s1</strong></td></tr><tr><td><strong>REPEAT(str, n)</strong></td><td><strong>返回str重复n次的结果</strong></td></tr><tr><td><strong>SPACE(n)</strong></td><td><strong>返回n个空格</strong></td></tr><tr><td><strong>STRCMP(s1,s2)</strong></td><td><strong>比较字符串s1,s2的ASCII码值的大小</strong></td></tr><tr><td><strong>SUBSTR(s,index,len)</strong></td><td><strong>返回从字符串s的index位置其len个字符，作用与SUBSTRING(s,n,len)、 MID(s,n,len)相同</strong></td></tr><tr><td><strong>LOCATE(substr,str)</strong></td><td><strong>返回字符串substr在字符串str中首次出现的位置，作用于POSITION(substr IN str)、INSTR(str,substr)相同。未找到，返回0</strong></td></tr><tr><td><strong>ELT(m,s1,s2,…,sn)</strong></td><td><strong>返回指定位置的字符串，如果m=1，则返回s1，如果m=2，则返回s2，如 果m=n，则返回sn</strong></td></tr><tr><td><strong>FIELD(s,s1,s2,…,sn)</strong></td><td><strong>返回字符串s在字符串列表中第一次出现的位置</strong></td></tr><tr><td><strong>FIND_IN_SET(s1,s2)</strong></td><td><strong>返回字符串s1在字符串s2中出现的位置。其中，字符串s2是一个以逗号分 隔的字符串</strong></td></tr><tr><td><strong>REVERSE(s)</strong></td><td><strong>返回s反转后的字符串</strong></td></tr><tr><td><strong>NULLIF(value1,value2)</strong></td><td><strong>比较两个字符串，如果value1与value2相等，则返回NULL，否则返回 value1</strong></td></tr></tbody></table><h3 id="_7、日期与时间" tabindex="-1"><a class="header-anchor" href="#_7、日期与时间" aria-hidden="true">#</a> 7、日期与时间</h3><table><thead><tr><th><mark>**CURDATE()</mark>，CURRENT_DATE()**</th><th><strong>返回当前日期，只包含年、 月、日</strong></th></tr></thead><tbody><tr><td><mark><strong>CURTIME()</strong></mark> ， CURRENT_TIME()**</td><td><strong>返回当前时间，只包含时、 分、秒</strong></td></tr><tr><td><strong><mark>NOW()</mark> / SYSDATE() / CURRENT_TIMESTAMP() / LOCALTIME() / LOCALTIMESTAMP()</strong></td><td><strong>返回当前系统日期和时间</strong></td></tr><tr><td><strong>UTC_DATE()</strong></td><td><strong>返回UTC（世界标准时间） 日期</strong></td></tr><tr><td><strong>UTC_TIME()</strong></td><td><strong>返回UTC（世界标准时间） 时间</strong></td></tr><tr><td><strong>UNIX_TIMESTAMP()</strong></td><td><strong>以UNIX时间戳的形式返回当前时间。SELECT UNIX_TIMESTAMP() - &gt;1634348884</strong></td></tr><tr><td><strong>UNIX_TIMESTAMP(date)</strong></td><td><strong>将时间date以UNIX时间戳的形式返回。</strong></td></tr><tr><td><strong>FROM_UNIXTIME(timestamp)</strong></td><td><strong>将UNIX时间戳的时间转换为普通格式的时间</strong></td></tr><tr><td><strong>YEAR(date) / MONTH(date) / DAY(date)</strong></td><td><strong>返回具体的日期值</strong></td></tr><tr><td><strong>HOUR(time) / MINUTE(time) / SECOND(time)</strong></td><td><strong>返回具体的时间值</strong></td></tr><tr><td><strong>MONTHNAME(date)</strong></td><td><strong>返回月份：January，...</strong></td></tr><tr><td><strong>DAYNAME(date)</strong></td><td><strong>返回星期几：MONDAY，TUESDAY.....SUNDAY</strong></td></tr><tr><td><strong>WEEKDAY(date)</strong></td><td><strong>返回周几，注意，周1是0，周2是1，。。。周日是6</strong></td></tr><tr><td><strong>QUARTER(date)</strong></td><td><strong>返回日期对应的季度，范围为1～4</strong></td></tr><tr><td><strong>WEEK(date) ， WEEKOFYEAR(date)</strong></td><td><strong>返回一年中的第几周</strong></td></tr><tr><td><strong>DAYOFYEAR(date)</strong></td><td><strong>返回日期是一年中的第几天</strong></td></tr><tr><td><strong>DAYOFMONTH(date)</strong></td><td><strong>返回日期位于所在月份的第几天</strong></td></tr><tr><td><strong>DAYOFWEEK(date)</strong></td><td><strong>返回周几，注意：周日是1，周一是2，。。。周六是 7</strong></td></tr><tr><td><strong>EXTRACT(type FROM date)</strong></td><td><strong>返回指定日期中特定的部分，type指定返回的值</strong></td></tr><tr><td><strong>TIME_TO_SEC(time)</strong></td><td>*<em>将 time 转化为秒并返回结果值。转化的公式为： 小时*3600+分钟 <em>60+秒</em></em></td></tr><tr><td><strong>SEC_TO_TIME(seconds)</strong></td><td><strong>将 seconds 描述转化为包含小时、分钟和秒的时间</strong></td></tr><tr><td><strong>DATE_ADD(datetime, INTERVAL expr type)， ADDDATE(date,INTERVAL expr type)</strong></td><td><strong>返回与给定日期时间相差INTERVAL时 间段的日期时间</strong></td></tr><tr><td><strong>DATE_SUB(date,INTERVAL expr type)， SUBDATE(date,INTERVAL expr type)</strong></td><td><strong>返回与date相差INTERVAL时间间隔的 日期</strong></td></tr><tr><td><strong>ADDTIME(time1,time2)</strong></td><td><strong>返回time1加上time2的时间。当time2为一个数字时，代表的是 秒 ，可以为负数</strong></td></tr><tr><td><strong>SUBTIME(time1,time2)</strong></td><td><strong>返回time1减去time2后的时间。当time2为一个数字时，代表的 是 秒 ，可以为负数</strong></td></tr><tr><td><strong>DATEDIFF(date1,date2)</strong></td><td><strong>返回date1 - date2的日期间隔天数</strong></td></tr><tr><td><strong>TIMEDIFF(time1, time2)</strong></td><td><strong>返回time1 - time2的时间间隔</strong></td></tr><tr><td><strong>FROM_DAYS(N)</strong></td><td><strong>返回从0000年1月1日起，N天以后的日期</strong></td></tr><tr><td><strong>TO_DAYS(date)</strong></td><td><strong>返回日期date距离0000年1月1日的天数</strong></td></tr><tr><td><strong>LAST_DAY(date)</strong></td><td><strong>返回date所在月份的最后一天的日期</strong></td></tr><tr><td><strong>MAKEDATE(year,n)</strong></td><td><strong>针对给定年份与所在年份中的天数返回一个日期</strong></td></tr><tr><td><strong>MAKETIME(hour,minute,second)</strong></td><td><strong>将给定的小时、分钟和秒组合成时间并返回</strong></td></tr><tr><td><strong>PERIOD_ADD(time,n)</strong></td><td><strong>返回time加上n后的时间</strong></td></tr><tr><td><strong>DATE_FORMAT(date,fmt)</strong></td><td><strong>按照字符串fmt格式化日期date值</strong></td></tr><tr><td><strong>TIME_FORMAT(time,fmt)</strong></td><td><strong>按照字符串fmt格式化时间time值</strong></td></tr><tr><td><strong>GET_FORMAT(date_type,format_type)</strong></td><td><strong>返回日期字符串的显示格式</strong></td></tr><tr><td><strong>STR_TO_DATE(str, fmt)</strong></td><td><strong>按照字符串fmt对str进行解析，解析为一个日期</strong></td></tr></tbody></table><h3 id="_8、流程控制函数" tabindex="-1"><a class="header-anchor" href="#_8、流程控制函数" aria-hidden="true">#</a> 8、流程控制函数</h3><table><thead><tr><th>IF(value,value1,value2)</th><th>如果value的值为TRUE，返回value1， 否则返回value2</th></tr></thead><tbody><tr><td><strong>IFNULL(value1, value2)</strong></td><td><strong>如果value1不为NULL，返回value1，否 则返回value2</strong></td></tr><tr><td><strong>CASE WHEN 条件1 THEN 结果1 WHEN 条件2 THEN 结果2 .... [ELSE resultn] END</strong></td><td><strong>相当于Java的if...else if...else...</strong></td></tr><tr><td><strong>CASE expr WHEN 常量值1 THEN 值1 WHEN 常量值1 THEN 值1 .... [ELSE 值n] END</strong></td><td><strong>相当于Java的switch...case...</strong></td></tr></tbody></table><h3 id="_9、加密与解密函数" tabindex="-1"><a class="header-anchor" href="#_9、加密与解密函数" aria-hidden="true">#</a> 9、加密与解密函数</h3><table><thead><tr><th>PASSWORD(str)</th><th>返回字符串str的加密版本，41位长的字符串。加密结果 不可 逆 ，常用于用户的密码加密</th></tr></thead><tbody><tr><td><strong>MD5(str)</strong></td><td><strong>返回字符串str的md5加密后的值，也是一种加密方式。若参数为 NULL，则会返回NULL</strong></td></tr><tr><td><strong>SHA(str)</strong></td><td><strong>从原明文密码str计算并返回加密后的密码字符串，当参数为 NULL时，返回NULL。 SHA加密算法比MD5更加安全 。</strong></td></tr><tr><td><strong>ENCODE(value,password_seed)</strong></td><td><strong>返回使用password_seed作为加密密码加密value</strong></td></tr><tr><td><strong>DECODE(value,password_seed)</strong></td><td><strong>返回使用password_seed作为加密密码解密value</strong></td></tr></tbody></table><h3 id="_10、-mysql信息函数" tabindex="-1"><a class="header-anchor" href="#_10、-mysql信息函数" aria-hidden="true">#</a> 10、 MySQL信息函数</h3><table><thead><tr><th><strong>VERSION()</strong></th><th><strong>返回当前MySQL的版本号</strong></th></tr></thead><tbody><tr><td><strong>CONNECTION_ID()</strong></td><td><strong>返回当前MySQL服务器的连接数</strong></td></tr><tr><td><strong>DATABASE()，SCHEMA()</strong></td><td><strong>返回MySQL命令行当前所在的数据库</strong></td></tr><tr><td><strong>USER()，CURRENT_USER()、SYSTEM_USER()， SESSION_USER()</strong></td><td><strong>返回当前连接MySQL的用户名，返回结果格式为 “主机名@用户名”</strong></td></tr><tr><td><strong>CHARSET(value)</strong></td><td><strong>返回字符串value自变量的字符集</strong></td></tr><tr><td><strong>COLLATION(value)</strong></td><td><strong>返回字符串value的比较规则</strong></td></tr><tr><td><strong>FORMAT(value,n)</strong></td><td><strong>返回对数字value进行格式化后的结果数据。n表示 四舍五入 后保留 到小数点后n位</strong></td></tr><tr><td><strong>CONV(value,from,to)</strong></td><td><strong>将value的值进行不同进制之间的转换</strong></td></tr><tr><td><strong>INET_ATON(ipvalue)</strong></td><td><strong>将以点分隔的IP地址转化为一个数字</strong></td></tr><tr><td><strong>INET_NTOA(value)</strong></td><td><strong>将数字形式的IP地址转化为以点分隔的IP地址</strong></td></tr><tr><td><strong>BENCHMARK(n,expr)</strong></td><td><strong>将表达式expr重复执行n次。用于测试MySQL处理expr表达式所耗费 的时间</strong></td></tr><tr><td><strong>CONVERT(value USING char_code)</strong></td><td><strong>将value所使用的字符编码修改为char_code</strong></td></tr></tbody></table><h3 id="_11、聚合函数-多行函数" tabindex="-1"><a class="header-anchor" href="#_11、聚合函数-多行函数" aria-hidden="true">#</a> 11、聚合函数（多行函数）</h3><h4 id="_1、常见的聚合函数" tabindex="-1"><a class="header-anchor" href="#_1、常见的聚合函数" aria-hidden="true">#</a> 1、常见的聚合函数</h4><p>可以对<strong>数值型数据</strong>使用<strong>AVG() 和 SUM()</strong> 函数。<br> 可以对<strong>任意数据类型</strong>的数据使用 <strong>MIN() 和 MAX()</strong> 函数。<br><em>对于null值不进行计算(跳过)</em></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT AVG(salary), MAX(salary),MIN(salary), SUM(salary)
FROM employees
WHERE job_id LIKE &#39;%REP%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>COUNT函数</strong><br><strong>COUNT(*)<strong>返回表中记录总数，适用于</strong>任意数据类型</strong>。<br><strong>COUNT(expr)</strong> 返回<strong>expr不为空</strong>的记录总数。</p><p>问题：用count(*)，count(1)，count(列名)谁好呢/效率高?<br> 其实，对于MyISAM引擎的表是没有区别的。这种引擎内部有一计数器在维护着行数。<br> Innodb引擎的表用count(*),count(1)直接读行数，复杂度是O(n)，因为innodb真的要去数一遍。但好于具体的count(列名)。<br> 问题：能不能使用count(列名)替换count(*)?<br> **不要使用 count(列名)来替代 count(*) **， <strong>count(*)</strong> 是 SQL92 定义的标准统计行数的语法，跟数据库无关，<strong>跟 NULL 和非 NULL 无关。</strong><br><mark>说明：count(*)会统计值为 NULL 的行，而 count(列名)不会统计此列为 NULL 值的行。</mark></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#查询公司中平均奖金率
#错误的
select SUM(pct); #null值会被忽略
#正确的
select SUM(pct) / COUNT(IFNULL(pct,0));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、group-by-的使用" tabindex="-1"><a class="header-anchor" href="#_2、group-by-的使用" aria-hidden="true">#</a> 2、GROUP BY 的使用</h4><p>可以使用GROUP BY子句将表中的数据分成若干组</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT column, group_function(column)
FROM table
[WHERE condition]
[GROUP BY group_by_expression]
[ORDER BY column];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>明确：WHERE一定放在FROM后面</p><p>**使用多个列分组 **</p><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221105203240868.png" alt="image-20221105203240868" loading="lazy"></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT department_id dept_id, job_id, SUM(salary)
FROM employees
GROUP BY department_id, job_id ;
#两者查询结果是相同的
SELECT department_id dept_id, job_id, SUM(salary)
FROM employees
GROUP BY job_id，department_id  ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>在SELECT列表中所有未包含在组函数(多行函数)中的列都应该包含在 GROUP BY子句中</mark></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#错误写法，但mysql不报错，结果错误，oracle报错
SELECT department_id dept_id, job_id, SUM(salary)
FROM employees
GROUP BY job_id  ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <strong>WITH ROLLUP</strong> 关键字之后，在所有查询出的分组记录之后增加一条记录，该记录计算查询出的所有记录的总和，即统计记录数量，（<em>所有数据为一组</em>）。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT department_id,AVG(salary)
FROM employees
WHERE department_id &gt; 80
GROUP BY department_id WITH ROLLUP;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：<br> 当使用ROLLUP时，不能同时使用ORDER BY子句进行结果排序，即<strong>ROLLUP和ORDER BY是互相排斥的</strong>。</p><h4 id="_3、having-的使用" tabindex="-1"><a class="header-anchor" href="#_3、having-的使用" aria-hidden="true">#</a> 3、HAVING 的使用</h4><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221105204546857.png" alt="image-20221105204546857" loading="lazy"></p><p><strong>where后不能使用聚合函数</strong></p><p>过滤分组：HAVING子句<br> 1、行已经被分组。<br> 2、使用了聚合函数。<br> 3、满足HAVING 子句中条件的分组将被显示。<br> 4、HAVING 不能单独使用，必须要跟 GROUP BY 一起使用</p><h5 id="where和having的对比" tabindex="-1"><a class="header-anchor" href="#where和having的对比" aria-hidden="true">#</a> **WHERE和HAVING的对比 **</h5><p>区别1：<strong>Having的使用范围更广</strong>，WHERE 可以直接使用表中的字段作为筛选条件，但不能使用分组中的计算函数作为筛选条件；HAVING 必须要与 GROUP BY 配合使用，可以把分组计算的函数和分组字段作为筛选条件。<br> 区别2：<strong>如果过滤条件中没有聚合函数，WHERE的执行效率高于HAVING</strong>，如果需要通过连接从关联表中获取需要的数据，WHERE 是先筛选后连接，而 HAVING 是先连接后筛选。</p><table><thead><tr><th style="text-align:center;">WHERE</th><th style="text-align:center;">先筛选数据再关联，执行效率高</th><th style="text-align:center;">不能使用分组中的计算函数进行筛选</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>HAVING</strong></td><td style="text-align:center;">**可以使用分组中的计算函数 **</td><td style="text-align:center;"><strong>在最后的结果集中进行筛选，执行效率较低</strong></td></tr></tbody></table><h4 id="_4、sql底层执行原理" tabindex="-1"><a class="header-anchor" href="#_4、sql底层执行原理" aria-hidden="true">#</a> 4、SQL底层执行原理</h4><p>SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT...<br> 在 SELECT 语句执行这些步骤的时候，每个步骤都会产生一个 虚拟表 ，然后将这个虚拟表传入下一个步<br> 骤中作为输入。需要注意的是，这些步骤隐含在 SQL 的执行过程中，对于我们来说是不可见的</p><p>SQL99语法：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select......(存在聚合函数)
FROM ...(LEFT / RIGHT)JOIN ... ON 多表的连接条件
(LEFT / RIGHT)JOIN ... ON ...
WHERE 不包含聚合函数的过滤条件
GROUP BY ...,...
HAVING 包含组函数的过滤条件
ORDER BY ... ASC/DESC
LIMIT ...,...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>先执行FROM到HAVING语句块，在执行SELECT语句，再执行ORDER BY，LIMIT语句</strong></em></p><h2 id="_7、子查询" tabindex="-1"><a class="header-anchor" href="#_7、子查询" aria-hidden="true">#</a> 7、子查询</h2><p>子查询（内查询）在主查询之前一次执行完成。<br> 子查询的结果被主查询（外查询）使用 。<br> 注意事项<br> 子查询要包含在括号内<br> 将子查询放在比较条件的右侧<br> 单行操作符对应单行子查询，多行操作符对应多行子查询</p><h3 id="_1、子查询的分类" tabindex="-1"><a class="header-anchor" href="#_1、子查询的分类" aria-hidden="true">#</a> 1、子查询的分类</h3><p>按内<strong>查询的结果的条目数</strong>，将子查询分为 <strong>单行子查询 、 多行子查询</strong>。<br> 按内查询<strong>是否被执行多次</strong>，将子查询划分为 <strong>相关(或关联)子查询 和 不相关(或非关联)子查询</strong> 。</p><p>子查询从数据表中查询了数据结果，如果这个数据结果只执行一次，然后这个数据结果作为主查询的条件进行执行，那么这样的子查询叫做<strong>不相关子查询</strong>。<br> 同样，如果子查询需要执行多次，即采用循环的方式，先从外部查询开始，每次都传入子查询进行查询，然后再将结果反馈给外部，这种嵌套的执行方式就称为<strong>相关子查询</strong>。</p><h3 id="_2、单行子查询" tabindex="-1"><a class="header-anchor" href="#_2、单行子查询" aria-hidden="true">#</a> 2、单行子查询</h3><p>单行操作符：=,&lt;,&gt;,&gt;=,&lt;=,&lt;&gt;</p><p><strong>子查询的编写技巧(或步骤)：<br> 1、从里往外写<br> 2、从外往里写</strong><br> 如果子查询相对较简单，建立从外往里写，一旦子查询结构较复杂，建议从里往外写<br> 如果是相关子查询的话，通常是从外往里写</p><p>题目：查询与141号或174号员工的manager_id和department_id相同的其他员工的employee_id，manager_id，department_id</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>实现方式1：不成对比较
SELECT employee_id, manager_id, department_id
FROM employees
WHERE manager_id IN
	(SELECT manager_id
		FROM employees
		WHERE employee_id IN (174,141))
AND department_id IN
	(SELECT department_id
		FROM employees
		WHERE employee_id IN (174,141))
AND employee_id NOT IN(174,141);
实现方式2：成对比较
SELECT employee_id, manager_id, department_id
FROM employees
WHERE (manager_id, department_id) IN
	(SELECT manager_id, department_id
		FROM employees
		WHERE employee_id IN (141,174))
AND employee_id NOT IN (141,174);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>HAVING中的子查询：<br> 查询最低工资大于50号部门最低工资的部门id和其最低工资</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT department_id, MIN(salary)
FROM employees
GROUP BY department_id
HAVING MIN(salary) &gt;
	(SELECT MIN(salary)
	FROM employees
	WHERE department_id = 50);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在CASE表达式中使用单列子查询：<br> 题目：显示员工的employee_id,last_name和location。其中，若员工department_id与location_id为1800的department_id相同，则location为’Canada’，其余则为’USA’。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT employee_id, last_name,
	(CASE department_id
	WHEN
		(SELECT department_id FROM departments
		WHERE location_id = 1800)
	THEN &#39;Canada&#39; ELSE &#39;USA&#39; END) location
FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>非法使用子查询：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT employee_id, last_name
FROM employees
WHERE salary =
	(SELECT MIN(salary)
	FROM employees
	GROUP BY department_id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>=为单行操作符，而自查询结果为多条记录</strong></p><h3 id="_3、多行子查询" tabindex="-1"><a class="header-anchor" href="#_3、多行子查询" aria-hidden="true">#</a> 3、多行子查询</h3><p>也称为集合比较子查询<br> 内查询返回多行<br> 使用多行比较操作符</p><p>多行比较操作符 ：IN，ANY，ALL，SOME</p><p>题目：查询平均工资最低的部门id</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT department_id
FROM employees
GROUP BY department_id
HAVING AVG(salary) &lt;= ALL (
	SELECT AVG(salary) avg_sal
	FROM employees
	GROUP BY department_id
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>空值问题</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT last_name
FROM employees
WHERE employee_id NOT IN (
	SELECT manager_id
	FROM employees
    WHERE manger_id is not null #不加这句话无返回行
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、相关子查询" tabindex="-1"><a class="header-anchor" href="#_4、相关子查询" aria-hidden="true">#</a> 4、相关子查询</h3><p>如果子查询的执行依赖于外部查询，通常情况下都是因为子查询中的表用到了外部的表，并进行了条件关联，<strong>因此每执行一次外部查询，子查询都要重新计算一次</strong>，这样的子查询就称之为 关联子查询 。<br> 相关子查询按照一行接一行的顺序执行，主查询的每一行都执行一次子查询 。</p><p>题目：查询员工中工资大于本部门平均工资的员工的last_name,salary和其department_id</p><p>方式一：相关子查询</p><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221106202021524.png" alt="image-20221106202021524" loading="lazy"></p><p>方式二：在 FROM 中使用子查询</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT last_name,salary,e1.department_id
FROM employees e1,(SELECT department_id,AVG(salary) dept_avg_sal FROM employees GROUP
BY department_id) e2
WHERE e1.\`department_id\` = e2.department_id
AND e2.dept_avg_sal &lt; e1.\`salary\`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在ORDER BY 中使用子查询：<br> 题目：查询员工的id,salary,按照department_name 排序</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT employee_id,salary
FROM employees e
ORDER BY (
SELECT department_name
FROM departments d
WHERE e.\`department_id\` = d.\`department_id\`
);  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="exists-与-not-exists关键字" tabindex="-1"><a class="header-anchor" href="#exists-与-not-exists关键字" aria-hidden="true">#</a> EXISTS 与 NOT EXISTS关键字</h4><p>关联子查询通常也会和 EXISTS操作符一起来使用，用来检查在子查询中是否存在满足条件的行</p><p>如果在子查询中不存在满足条件的行：<br> 条件返回 FALSE<br> 继续在子查询中查找<br> 如果在子查询中存在满足条件的行：<br> 不在子查询中继续查找<br> 条件返回 TRUE</p><p>题目：查询公司管理者的employee_id，last_name，job_id，department_id信息</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式一
SELECT employee_id, last_name, job_id, department_id
FROM employees e1
WHERE EXISTS ( SELECT *
FROM employees e2
WHERE e2.manager_id =
e1.employee_id)
#方式二 自连接
SELECT DISTINCT e1.employee_id, e1.last_name, e1.job_id, e1.department_id
FROM employees e1 JOIN employees e2
WHERE e1.employee_id = e2.manager_id;
#方式三 
SELECT DISTINCT e1.employee_id, e1.last_name, e1.job_id, e1.department_id
FROM employees e1 JOIN employees e2
WHERE employee_id IN (
SELECT DISTINCT manager_id
FROM employees
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相关更新与相关删除</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE table1 alias1
SET column = (SELECT expression
FROM table2 alias2
WHERE alias1.column = alias2.column);

DELETE FROM table1 alias1
WHERE column operator (SELECT expression
FROM table2 alias2
WHERE alias1.column = alias2.column)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8、创建与管理表" tabindex="-1"><a class="header-anchor" href="#_8、创建与管理表" aria-hidden="true">#</a> 8、创建与管理表</h2><h3 id="_1、标识符命名规则" tabindex="-1"><a class="header-anchor" href="#_1、标识符命名规则" aria-hidden="true">#</a> 1、标识符命名规则</h3><p><strong>数据库名、表名不得超过30个字符，变量名限制为29个</strong><br> 必须只能包含 <strong>A–Z, a–z, 0–9, _<strong>共63个字符<br> 数据库名、表名、字段名等对象名中间不要包含空格<br> 同一个MySQL软件中，数据库不能同名；同一个库中，表不能重名；同一个表中，字段不能重名<br> 必须保证你的</strong>字段没有和保留字、数据库系统或常用方法冲突</strong>。如果坚持使用，请在SQL语句中使用**\`（着重号）引起来**<br> 保持<strong>字段名和类型的一致性</strong>：在命名字段并为其指定数据类型的时候一定要保证一致性，假如数据类型在一个表里是整数，那在另一个表里可就别变成字符型了</p><h3 id="_2、mysql数据类型" tabindex="-1"><a class="header-anchor" href="#_2、mysql数据类型" aria-hidden="true">#</a> 2、mysql数据类型</h3><table><thead><tr><th>类型</th><th>种类</th></tr></thead><tbody><tr><td>整数类型</td><td>TINYINT、SMALLINT、MEDIUMINT、INT(或INTEGER)、BIGINT</td></tr><tr><td>浮点类型</td><td>FLOAT、DOUBLE</td></tr><tr><td>定点数类型</td><td>DECIMAL</td></tr><tr><td>位类型</td><td>BIT</td></tr><tr><td>日期时间类型</td><td>YEAR、TIME、DATE、DATETIME、TIMESTAMP</td></tr><tr><td>文本字符串类型</td><td>CHAR、VARCHAR、TINYTEXT、TEXT、MEDIUMTEXT、LONGTEXT</td></tr><tr><td>枚举类型</td><td>ENUM</td></tr><tr><td>集合类型</td><td>SET</td></tr><tr><td>二进制字符串类 型</td><td>BINARY、VARBINARY、TINYBLOB、BLOB、MEDIUMBLOB、LONGBLOB</td></tr><tr><td>JSON类型</td><td>JSON对象、JSON数组</td></tr><tr><td>空间数据类型</td><td>单值：GEOMETRY、POINT、LINESTRING、POLYGON； 集合：MULTIPOINT、MULTILINESTRING、MULTIPOLYGON、 GEOMETRYCOLLECTION</td></tr></tbody></table><p>其中，常用的几类类型介绍如下：</p><table><thead><tr><th>数据类型</th><th>描述</th></tr></thead><tbody><tr><td>INT</td><td>从-2<sup>31到2</sup>31-1的整型数据。存储大小为 4个字节</td></tr><tr><td>CHAR(size)</td><td>定长字符数据。若未指定，默认为1个字符，最大长度255</td></tr><tr><td>VARCHAR(size)</td><td>可变长字符数据，根据字符串实际长度保存，必须指定长度</td></tr><tr><td>FLOAT(M,D)</td><td>单精度，占用4个字节，M=整数位+小数位，D=小数位。 D&lt;=M&lt;=255,0&lt;=D&lt;=30， 默认M+D&lt;=6</td></tr><tr><td>DOUBLE(M,D)</td><td>双精度，占用8个字节，D&lt;=M&lt;=255,0&lt;=D&lt;=30，默认M+D&lt;=15</td></tr><tr><td>DECIMAL(M,D)</td><td>高精度小数，占用M+2个字节，D&lt;=M&lt;=65，0&lt;=D&lt;=30，最大取值范围与DOUBLE 相同。</td></tr><tr><td>DATE</td><td>日期型数据，格式&#39;YYYY-MM-DD&#39;</td></tr><tr><td>BLOB</td><td>二进制形式的长文本数据，最大可达4G</td></tr><tr><td>TEXT</td><td>长文本数据，最大可达4G</td></tr></tbody></table><h3 id="_3、创建和管理数据库" tabindex="-1"><a class="header-anchor" href="#_3、创建和管理数据库" aria-hidden="true">#</a> 3、创建和管理数据库</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#创建数据库
CREATE DATABASE 数据库名;
CREATE DATABASE 数据库名 CHARACTER SET 字符集;
CREATE DATABASE IF NOT EXISTS 数据库名; #推荐
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#查看当前所有的数据库
SHOW DATABASES; #有一个S，代表多个数据库
#查看当前正在使用的数据库
SELECT DATABASE(); #使用的一个 mysql 中的全局函数
#查看指定库下所有的表
SHOW TABLES FROM 数据库名;
#查看数据库的创建信息
SHOW CREATE DATABASE 数据库名;
#使用/切换数据库：
USE 数据库名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#更改数据库字符集
ALTER DATABASE 数据库名 CHARACTER SET 字符集; #比如：gbk、utf8等
#方式1：删除指定的数据库
DROP DATABASE 数据库名;
#方式2：删除指定的数据库（ 推荐 ）
DROP DATABASE IF EXISTS 数据库名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、创建表" tabindex="-1"><a class="header-anchor" href="#_4、创建表" aria-hidden="true">#</a> 4、创建表</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式一：
CREATE TABLE [IF NOT EXISTS] 表名(
	字段1, 数据类型 [约束条件] [默认值],
	字段2, 数据类型 [约束条件] [默认值],
	字段3, 数据类型 [约束条件] [默认值],
	……
	[表约束条件]
);
#加上了IF NOT EXISTS关键字，则表示：
#如果当前数据库中不存在要创建的数据表，则创建数据表；如果当前数据库中已经存在要创建的数据表，则忽略建表语句，不再创建数据表。  

#方式二：
CREATE TABLE dept80
AS
SELECT employee_id, last_name, salary*12 ANNSAL, hire_date
FROM employees
WHERE department_id = 80;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在MySQL中创建好数据表之后，可以查看数据表的结构。MySQL支持使用 DESCRIBE/DESC 语句查看数据表结构，也支持使用 SHOW CREATE TABLE 语句查看数据表结构</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW CREATE TABLE 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、修改表" tabindex="-1"><a class="header-anchor" href="#_5、修改表" aria-hidden="true">#</a> 5、修改表</h3><p>1、添加一个字段</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 ADD [COLUMN] 字段名 字段类型 [FIRST|AFTER 字段名];

ALTER TABLE dept80 ADD job_id varchar(15);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、修改一个列</p><p>可以修改列的数据类型，长度、默认值和位置<br> 修改字段数据类型、长度、默认值、位置的语法格式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 MODIFY [COLUMN] 字段名1 字段类型 [DEFAULT 默认值] [FIRST|AFTER 字段名2];

ALTER TABLE dept80
MODIFY last_name VARCHAR(30);
ALTER TABLE dept80
MODIFY salary double(9,2) default 1000;  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对默认值的修改只影响今后对表的修改<br> 此外，还可以通过此种方式修改列的约束。这里暂先不讲。</p><p>3、重命名列</p><p>使用 CHANGE old_column new_column dataType子句重命名列。语法格式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 CHANGE [column] 列名 新列名 新数据类型;  

ALTER TABLE dept80
CHANGE department_name dept_name varchar(15);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、删除列</p><p>删除表中某个字段的语法格式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 DROP [COLUMN]字段名 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6、重命名表" tabindex="-1"><a class="header-anchor" href="#_6、重命名表" aria-hidden="true">#</a> 6、重命名表</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式一：
RENAME TABLE emp
TO myemp;
#方式二：
ALTER table dept
RENAME [TO] detail_dept; -- [TO]可以省略
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7、删除表" tabindex="-1"><a class="header-anchor" href="#_7、删除表" aria-hidden="true">#</a> 7、删除表</h3><p>在MySQL中，当一张数据表<strong>没有与其他任何数据表形成关联关系</strong>时，可以将当前数据表直接删除。<br><strong>数据和结构都被删除</strong><br> 所有<strong>正在运行的相关事务被提交</strong><br> 所有**相关索引被删除 **</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP TABLE [IF EXISTS] 数据表1 [, 数据表2, …, 数据表n];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**DROP TABLE 语句不能回滚 **</p><h3 id="_8、清空表" tabindex="-1"><a class="header-anchor" href="#_8、清空表" aria-hidden="true">#</a> 8、清空表</h3><p>TRUNCATE TABLE语句：<br><strong>删除表中所有的数据，但是表结构保留</strong><br> 释放表的存储空间</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>TRUNCATE TABLE detail_dept;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>TRUNCATE语句不能回滚，而使用 DELETE 语句删除数据，可以回滚</strong></p><p>注意turncate与delete的区别</p><p><strong>阿里开发规范：</strong><br> 【参考】TRUNCATE TABLE 比 DELETE 速度快，且使用的系统和事务日志资源少，但 TRUNCATE 无事务且不触发 TRIGGER，有可能造成事故，故不建议在开发代码中使用此语句。<br> 说明：TRUNCATE TABLE 在功能上与不带 WHERE 子句的 DELETE 语句相同。</p><h3 id="_9、commit与rollback" tabindex="-1"><a class="header-anchor" href="#_9、commit与rollback" aria-hidden="true">#</a> 9、COMMIT与ROLLBACK</h3><p>COMMIT：提交数据。一旦执行COMMIT，数据就被永久保存在了数据库中，意味着数据不可以回滚。<br> DDL的操作一旦执行，就不可回滚（在执行完DDl操作之后，一定会执行一次COMMIT，而此COMMIT操作不收SET autocommit = FALSE影响的。）<br> DML的操作默认情况下，一旦执行， 也是不可回滚的，但是如果在执行DML之前，执行了set autocommit = False，则执行的DML操作就可以实现回滚。</p><h3 id="_10、mysql字段命名" tabindex="-1"><a class="header-anchor" href="#_10、mysql字段命名" aria-hidden="true">#</a> 10、mysql字段命名</h3><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221108144920536.png" alt="image-20221108144920536" loading="lazy"></p><p>如何理解清空表、删除表等操作需谨慎：<img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221108145130193.png" alt="image-20221108145130193" loading="lazy"></p><p>MySQL8新特性—DDL的原子化；<br><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221108145627124.png" alt="image-20221108145627124" loading="lazy"></p><h2 id="_9、数据的增删改" tabindex="-1"><a class="header-anchor" href="#_9、数据的增删改" aria-hidden="true">#</a> 9、数据的增删改</h2><h3 id="_1、插入数据" tabindex="-1"><a class="header-anchor" href="#_1、插入数据" aria-hidden="true">#</a> 1、插入数据</h3><h4 id="_1-、方式一-values的方式添加" tabindex="-1"><a class="header-anchor" href="#_1-、方式一-values的方式添加" aria-hidden="true">#</a> 1.、方式一：VALUES的方式添加</h4><p>①没有指明添加字段</p><p>INSERT INTO 表名 VALUES (value1,value2,....);</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO departments 
VALUES (70, &#39;Pub&#39;, 100, 1700); #一定要按照声明的字段的先后顺序添加
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>②指明要添加字段（推荐）</p><p>INSERT INTO 表名(column1 [, column2, …, columnn]) VALUES (value1 [,value2, …, valuen]);</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#没有指明出的，赋值为null
INSERT INTO departments
VALUES (70, &#39;Pub&#39;, 100, 1700);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 INSERT 子句中随意列出列名，但是一旦列出，VALUES中要插入的value1,....valuen需要与 column1,...columnn列一一对应。如果类型不同，将无法插入，并且MySQL会产生错误。</p><p>③同时添加多条几记录（推荐）</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO table_name (column1 [, column2, …, columnn])
VALUES
(value1 [,value2, …, valuen]),
(value1 [,value2, …, valuen]),
……
(value1 [,value2, …, valuen]);  

INSERT INTO emp(emp_id,emp_name)
VALUES (1001,&#39;shkstart&#39;),
(1002,&#39;atguigu&#39;),
(1003,&#39;Tom&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、方式二-将查询的结果插入到表中" tabindex="-1"><a class="header-anchor" href="#_2、方式二-将查询的结果插入到表中" aria-hidden="true">#</a> 2、方式二：将查询的结果插入到表中</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO 目标表名
(tar_column1 [, tar_column2, …, tar_columnn])
SELECT
(src_column1 [, src_column2, …, src_columnn])
FROM 源表名
[WHERE condition]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 INSERT 语句中加入子查询。<br><strong>不必书写 VALUES 子句。</strong><br> 子查询中的值列表应与 INSERT 子句中的列名对应。<br> （插入表中要添加的字段的长度不能低于查询表种查询的字段的长度，不然有添加不成功的风险）</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#举例
INSERT INTO sales_reps(id, name, salary, commission_pct)
SELECT employee_id, last_name, salary, commission_pct
FROM employees
WHERE job_id LIKE &#39;%REP%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、更新数据-修改数据" tabindex="-1"><a class="header-anchor" href="#_2、更新数据-修改数据" aria-hidden="true">#</a> 2、更新数据（修改数据）</h3><p>UPDATE...SET...WHERE...<br> 可以实现批量修改数据的</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE employees
SET department_id = 70
WHERE employee_id = 113;

UPDATE employees
SET department_id = 70，salary = 6000
WHERE name like &#39;%a%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、删除数据" tabindex="-1"><a class="header-anchor" href="#_3、删除数据" aria-hidden="true">#</a> 3、删除数据</h3><p>DELETE FROM...WHERE...<br> 在删除数据时，也有可能因为约束的影响，导致删除失败</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELETE FROM departments
WHERE department_name = &#39;Finance&#39;;
#如果省略 WHERE 子句，则表中的全部数据将被删除
DELETE FROM copy_emp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、mysql8新特性-计算列" tabindex="-1"><a class="header-anchor" href="#_4、mysql8新特性-计算列" aria-hidden="true">#</a> 4、MySQL8新特性：计算列</h3><p>什么叫计算列呢？简单来说就是某一列的值是通过别的列计算得来的。例如，a列值为1、b列值为2，c列不需要手动插入，定义a+b的结果为c的值，那么c就是计算列，是通过别的列计算得来的。<br> 在MySQL 8.0中，CREATE TABLE 和 ALTER TABLE 中都支持增加计算列。下面以CREATE TABLE为例进行讲解。<br> 举例：定义数据表tb1，然后定义字段id、字段a、字段b和字段c，其中字段c为计算列，用于计算a+b的值。 首先创建测试表tb1，语句如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE tb1(
id INT,
a INT,
b INT,
c INT GENERATED ALWAYS AS (a + b) VIRTUAL
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10、mysql数据类型精讲" tabindex="-1"><a class="header-anchor" href="#_10、mysql数据类型精讲" aria-hidden="true">#</a> 10、mysql数据类型精讲</h2><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221109155810761.png" alt="image-20221109155810761" loading="lazy"></p><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221109155828811.png" alt="image-20221109155828811" loading="lazy"></p><h3 id="_1、字符集设置" tabindex="-1"><a class="header-anchor" href="#_1、字符集设置" aria-hidden="true">#</a> 1、字符集设置</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#创建数据库时指明字符集
create database if not exists db character sete &#39;utf8&#39;;
show create datavase db;

#创建表的时候，指明表的字符集
create table temp(
id INT
) character set &#39;utf8&#39;;
show create table temp;

#创建表指明字段时，可以指定字段的字符集
create table temp1(
id int,
name varchar(15) character set &#39;utf8&#39;
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、整数类型" tabindex="-1"><a class="header-anchor" href="#_2、整数类型" aria-hidden="true">#</a> 2、整数类型</h3><p>整数类型一共有 5 种，包括 TINYINT、SMALLINT、MEDIUMINT、INT（INTEGER）和 BIGINT。<br> 它们的区别如下表所示：</p><table><thead><tr><th>整数类型</th><th>字节</th><th>有符号数取值范围</th><th>无符号数取值范围</th></tr></thead><tbody><tr><td>TINYINT</td><td>1</td><td>-128~127</td><td>0~255</td></tr><tr><td>SMALLINT</td><td>2</td><td>-32768~32767</td><td>0~65535</td></tr><tr><td>MEDIUMINT</td><td>3</td><td>-8388608~8388607</td><td>0~16777215</td></tr><tr><td>INT、INTEGER</td><td>4</td><td>-2147483648~2147483647</td><td>0~4294967295</td></tr><tr><td>BIGINT</td><td>8</td><td>-9223372036854775808~9223372036854775807</td><td>0~18446744073709551615</td></tr></tbody></table><h4 id="可选属性" tabindex="-1"><a class="header-anchor" href="#可选属性" aria-hidden="true">#</a> 可选属性</h4><p>整数类型的可选属性有三个：</p><p>1、<br> M : 表示<strong>显示宽度</strong>，M的取值范围是(0, 255)。例如，int(5)：当数据宽度小于5位的时候在数字前面需要用字符填满宽度。该项功能需要配合“ ZEROFILL ”使用，表示用“0”填满宽度，否则指定显示宽度无效。<br> 如果设置了显示宽度，那么插入的数据宽度超过显示宽度限制，会不会截断或插入失败？<br> 答案：不会对插入的数据有任何影响，还是按照类型的实际宽度进行保存，即 显示宽度与类型可以存储的值范围无关 。从MySQL 8.0.17开始，<strong>整数数据类型不推荐使用显示宽度属性</strong>。<br> 整型数据类型可以在定义表结构时指定所需要的显示宽度，如果不指定，则系统为每一种类型指定默认的宽度值。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_int2(
f1 INT,
f2 INT(5),
f3 INT(5) ZEROFILL #显示宽度为5，当insert的值不足5位时，使用0填充
)
INSERT INTO test_int2(f1,f2,f3)
VALUES(1,123,123);
INSERT INTO test_int2(f1,f2)
VALUES(123456,123456);
INSERT INTO test_int2(f1,f2,f3)
VALUES(123456,123456,123456);
·
mysql&gt; SELECT * FROM test_int2;
+--------+--------+--------+
| f1 | f2 | f3 |
+--------+--------+--------+
| 1 | 123 | 00123 |
| 123456 | 123456 | NULL |
| 123456 | 123456 | 123456 |
+--------+--------+--------+
3 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、<br> UNSIGNED : 无符号类型（非负），所有的整数类型都有一个可选的属性UNSIGNED（无符号属性），无符号整数类型的最小取值为0。所以，如果需要在MySQL数据库中保存非负整数值时，可以将整数类型设置为无符号类型。<br> int类型默认显示宽度为int(11)，无符号int类型默认显示宽度为int(10)。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_int3(
f1 INT UNSIGNED
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、<br> ZEROFILL : 0填充,（如果某列是ZEROFILL，那么MySQL会自动为当前列添加UNSIGNED属性），如果指定了ZEROFILL只是表示不够M位时，用0在左边填充，如果超过M位，只要不超过数据存储范围即可。<br> 原来，在 int(M) 中，M 的值跟 int(M) 所占多少存储空间并无任何关系。 int(3)、int(4)、int(8) 在磁盘上都是占用 4 bytes 的存储空间。也就是说，<strong>int(M)，必须和UNSIGNED ZEROFILL一起使用才有意义</strong>。如果整数值超过M位，就按照实际位数存储。只是无须再用字符 0 进行填充。</p><h4 id="适用场景" tabindex="-1"><a class="header-anchor" href="#适用场景" aria-hidden="true">#</a> 适用场景</h4><p>TINYINT ：一般用于枚举数据，比如系统设定取值范围很小且固定的场景。<br> SMALLINT ：可以用于较小范围的统计数据，比如统计工厂的固定资产库存数量等。<br> MEDIUMINT ：用于较大整数的计算，比如车站每日的客流量等。<br> INT、INTEGER ：取值范围足够大，一般情况下不用考虑超限问题，用得最多。比如商品编号。<br> BIGINT ：只有当你处理特别巨大的整数时才会用到。比如双十一的交易量、大型门户网站点击量、证<br> 券公司衍生产品持仓等。</p><p>你要注意的是，在实际工作中，<strong>系统故障产生的成本远远超过增加几个字段存储空间所产生的成本</strong>。因此，我建议你首先确保数据不会超过取值范围，在这个前提之下，再去考虑如何节省存储空间</p><h3 id="_3、浮点类型" tabindex="-1"><a class="header-anchor" href="#_3、浮点类型" aria-hidden="true">#</a> 3、浮点类型</h3><p>MySQL支持的浮点数类型，分别是 FLOAT、DOUBLE、REAL。</p><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221109164349992.png" alt="image-20221109164349992" loading="lazy"></p><p>REAL默认就是 DOUBLE。如果你把 SQL 模式设定为启用“ REAL_AS_FLOAT ”，那 么，MySQL 就认为REAL 是 FLOAT。如果要启用“REAL_AS_FLOAT”，可以通过以下 SQL 语句实现：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET sql_mode = “REAL_AS_FLOAT”;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>浮点数无符号数取值范围为有符号数的正数部分：<br> MySQL 存储浮点数的格式为： 符号(S) 、 尾数(M) 和 阶码(E) 。因此，无论有没有符号，MySQL 的浮点数都会存储表示符号的部分。因此， 所谓的无符号数取值范围，其实就是有符号数取值范围大于等于零的部分。</p><h4 id="数据精度说明" tabindex="-1"><a class="header-anchor" href="#数据精度说明" aria-hidden="true">#</a> 数据精度说明</h4><p>对于浮点类型，在MySQL中单精度值使用 4 个字节，双精度值使用 8 个字节。</p><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221109164929025.png" alt="image-20221109164929025" loading="lazy"></p><h4 id="精度误差说明" tabindex="-1"><a class="header-anchor" href="#精度误差说明" aria-hidden="true">#</a> 精度误差说明</h4><p>浮点数类型有个缺陷，就是不精准。比如，我们设计一个表，有f1这个字段，插入值分别为0.47,0.44,0.19，我们期待的运行结果是：0.47 + 0.44 + 0.19 =1.1。而使用sum之后查询 结果是 1.0999999999999999。虽然误差很小，但确实有误差。 你也可以尝试把数据类型改成 FLOAT，然后运行求和查询，得到的是， 1.0999999940395355。显然，误差更大了。<br> MySQL 用 4 个字节存储 FLOAT 类型数据，用 8 个字节来存储 DOUBLE 类型数据。无论哪个，都是<strong>采用二进制的方式</strong>来进行存储的。比如 9.625，用二进制来表达，就是 1001.101，或者表达成 1.001101×2^3。<strong>如果尾数不是 0 或 5（比如 9.624），你就无法用一个二进制数来精确表达</strong>。进而，就只好在取值允许的范围内进行四舍五入。<br> 在编程中，如果用到浮点数，要特别注意误差问题，因为浮点数是不准确的，所以我们<strong>要避免使用“=”来判断两个数是否相等</strong>。同时，在一些<strong>对精确度要求较高的项目中，千万不要使用浮点数</strong>，不然会导致结果错误，甚至是造成不可挽回的损失。那么，MySQL 有没有精准的数据类型呢？当然有，这就是定点数类型：<strong>DECIMAL</strong> 。</p><h3 id="_4、定点类型" tabindex="-1"><a class="header-anchor" href="#_4、定点类型" aria-hidden="true">#</a> 4、定点类型</h3><p>MySQL中的定点数类型只有 DECIMAL 一种类型。</p><table><thead><tr><th>数据类型</th><th>字节数</th><th>含义</th></tr></thead><tbody><tr><td>DECIMAL(M,D),DEC,NUMERIC</td><td>M+2字节</td><td>有效范围由M和D决定</td></tr></tbody></table><p><strong>DECIMAL(M,D)的最大取值范围与DOUBLE类型一样</strong>，但是有效的数据范围是由M和D决定的。<br> DECIMAL 的存储空间并不是固定的，由精度值M决定，<strong>总共占用的存储空间为M+2个字节</strong>。也就是说，在一些对精度要求不高的场景下，比起占用同样字节长度的定点数，浮点数表达的数值范围可以更大一些。<br><strong>定点数在MySQL内部是以<mark>字符串</mark>的形式进行存储</strong>，这就决定了它一定是精准的。<br> 当DECIMAL类型不指定精度和标度时，其<strong>默认为DECIMAL(10,0)</strong>。当数据的精度超出了定点数类型的精度范围时，则MySQL同样**会进行四舍五入处理 **</p><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_decimal1(
f1 DECIMAL,
f2 DECIMAL(5,2)
);
DESC test_decimal1;
INSERT INTO test_decimal1(f1,f2)
VALUES(123.123,123.456); #存在四舍五入

INSERT INTO test_decimal1(f2) 
VALUES(1234.34); #Out of range value for column &#39;f2&#39; at row 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开发中经验<br> 由于 DECIMAL 数据类型的精准性，在我们的项目中，<strong>除了极少数（比如商品编号）用到整数类型外，其他的数值都用的是 DECIMAL</strong>，原因就是这个项目所处的零售行业，要求精准，一分钱也不能差。</p><h3 id="_5、位类型" tabindex="-1"><a class="header-anchor" href="#_5、位类型" aria-hidden="true">#</a> 5、位类型</h3><p>BIT类型中存储的是二进制值，类似010110</p><table><thead><tr><th>二进制字符串类型</th><th>长度</th><th>长度范围</th><th>占用空间</th></tr></thead><tbody><tr><td>BIT(M)</td><td>M</td><td>1 &lt;= M &lt;= 64</td><td>约为(M + 7)/8个字节</td></tr></tbody></table><p>BIT类型，如果没有指定(M)，默认是1位。这个1位，表示只能存1位的二进制值。这里(M)是表示二进制的位数，位数最小值为1，最大值为64。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_bit1(
f1 BIT,
f2 BIT(5),
f3 BIT(64)
);
INSERT INTO test_bit1(f1)
VALUES(1);
INSERT INTO test_bit1(f1) #Data too long for column &#39;f1&#39; at row 1
VALUES(2);
INSERT INTO test_bit1(f2)
VALUES(23);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用SELECT命令查询位字段时，可以用**BIN()**或 <strong>HEX()</strong> 函数进行读取</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM test_bit1;
+------------+------------+------------+
| f1 | f2 | f3 |
+------------+------------+------------+
| 0x01 | NULL | NULL |
| NULL | 0x17 | NULL |
+------------+------------+------------+

SELECT BIN(f2),HEX(f2)
FROM test_bit1;
+---------+---------+
| BIN(f2) | HEX(f2) |
+---------+---------+
| NULL | NULL |
| 10111 | 17 |
+---------+---------+

SELECT f2 + 0
FROM test_bit1;
+--------+
| f2 + 0 |
+--------+
| NULL |
| 23 |
+--------+
#可以看到，使用b+0查询数据时，可以直接查询出存储的十进制数据的值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、日期与时间类型" tabindex="-1"><a class="header-anchor" href="#_6、日期与时间类型" aria-hidden="true">#</a> 6、日期与时间类型</h3><table><thead><tr><th>类型</th><th>名称</th><th>字 节</th><th>日期格式</th><th>最小值</th><th>最大值</th></tr></thead><tbody><tr><td>YEAR</td><td>年</td><td>1</td><td>YYYY或YY</td><td>1901</td><td>2155</td></tr><tr><td>TIME</td><td>时间</td><td>3</td><td>HH:MM:SS</td><td>-838:59:59</td><td>838:59:59</td></tr><tr><td>DATE</td><td>日期</td><td>3</td><td>YYYY-MM-DD</td><td>1000-01-01</td><td>9999-12-03</td></tr><tr><td>DATETIME</td><td>日期 时间</td><td>8</td><td>YYYY-MM-DD HH:MM:SS</td><td>1000-01-01 00:00:00</td><td>9999-12-31 23:59:59</td></tr><tr><td>TIMESTAMP</td><td>日期 时间</td><td>4</td><td>YYYY-MM-DD HH:MM:SS</td><td>1970-01-01 00:00:00 UTC</td><td>2038-01-19 03:14:07UTC</td></tr></tbody></table><h4 id="_1、year类型" tabindex="-1"><a class="header-anchor" href="#_1、year类型" aria-hidden="true">#</a> 1、year类型</h4><p>YEAR类型用来表示年份，在所有的日期时间类型中所占用的存储空间最小，只需要 1个字节 的存储空间</p><p>在MySQL中，YEAR有以下几种存储格式：<br> 以4位字符串或数字格式表示YEAR类型，其格式为YYYY，最小值为1901，最大值为2155。<br> 以2位字符串格式表示YEAR类型，最小值为00，最大值为99。<br> 当取值为01到69时，表示2001到2069；<br> 当取值为70到99时，表示1970到1999；<br> 当取值整数的0或00添加的话，那么是0000年；<br> 当取值是日期/字符串的&#39;0&#39;添加的话，是2000年。<br> 从MySQL5.5.27开始，2位格式的YEAR已经不推荐使用。YEAR默认格式就是“YYYY”，没必要写成YEAR(4)，<br> 从MySQL 8.0.19开始，不推荐使用指定显示宽度的YEAR(4)数据类型。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_year(
f1 YEAR,
f2 YEAR(4)
);
INSERT INTO test_year
VALUES(&#39;2020&#39;,&#39;2021&#39;);
INSERT INTO test_year
VALUES(&#39;45&#39;,&#39;71&#39;);
INSERT INTO test_year
VALUES(0,&#39;0&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、date类型" tabindex="-1"><a class="header-anchor" href="#_2、date类型" aria-hidden="true">#</a> 2、DATE类型</h4><p>DATE类型表示日期，没有时间部分，格式为 YYYY-MM-DD ，其中，YYYY表示年份，MM表示月份，DD表示日期。需要 <strong>3个字节</strong> 的存储空间。在向DATE类型的字段插入数据时，同样需要满足一定的格式条件。<br> 以 YYYY-MM-DD 格式或者 YYYYMMDD 格式表示的字符串日期，其最小取值为1000-01-01，最大取值为9999-12-03。YYYYMMDD格式会被转化为YYYY-MM-DD格式。<br> 以 YY-MM-DD 格式或者 YYMMDD 格式表示的字符串日期，此格式中，年份为两位数值或字符串满足YEAR类型的格式条件为：当年份取值为00到69时，会被转化为2000到2069；当年份取值为70到99时，会被转化为1970到1999。<br> 使用 CURRENT_DATE() 或者 NOW() 函数，会插入当前系统的日期。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_date1(
f1 DATE
);
INSERT INTO test_date1
VALUES (&#39;2020-10-01&#39;), (&#39;20201001&#39;),(20201001);
INSERT INTO test_date1
VALUES (&#39;00-01-01&#39;), (&#39;000101&#39;), (&#39;69-10-01&#39;), (&#39;691001&#39;), (&#39;70-01-01&#39;), (&#39;700101&#39;),(&#39;99-01-01&#39;), (&#39;990101&#39;);
INSERT INTO test_date1
VALUES (000301), (690301), (700301), (990301);
INSERT INTO test_date1
VALUES (CURRENT_DATE()), (NOW());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3、time类型" tabindex="-1"><a class="header-anchor" href="#_3、time类型" aria-hidden="true">#</a> 3、Time类型</h4><p>TIME类型用来表示时间，不包含日期部分。在MySQL中，需要 <strong>3个字节</strong> 的存储空间来存储TIME类型的数据，可以使用“HH:MM:SS”格式来表示TIME类型，其中，HH表示小时，MM表示分钟，SS表示秒。<br> 在MySQL中，向TIME类型的字段插入数据时，也可以使用几种不同的格式。<br> （1）可以使用带有冒号的字符串，比如&#39; D HH:MM:SS&#39; 、&#39; HH:MM:SS &#39;、&#39; HH:MM &#39;、&#39; D HH:MM &#39;、&#39; D HH &#39;或&#39; SS &#39;格式，都能被正确地插入TIME类型的字段中。其中D表示天，其最小值为0，最大值为34。如果使用带有D格式的字符串插入TIME类型的字段时，D会被转化为小时，计算格式为D*24+HH。当使用带有冒号并且不带D的字符串表示时间时，表示当天的时间，比如12:10表示12:10:00，而不是00:12:10。<br> （2）可以使用不带有冒号的<br> 字符串或者数字，格式为&#39; HHMMSS &#39;或者 HHMMSS 。如果插入一个不合法的字符串或者数字，MySQL在存储数据时，会将其自动转化为00:00:00进行存储。比如1210，MySQL会将最右边的两位解析成秒，表示00:12:10，而不是12:10:00。<br> （3）使用 CURRENT_TIME() 或者 NOW() ，会插入当前系统的时间。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_time1(
f1 TIME
);
INSERT INTO test_time1
VALUES(&#39;2 12:30:29&#39;), (&#39;12:35:29&#39;), (&#39;12:40&#39;), (&#39;2 12:40&#39;),(&#39;1 05&#39;), (&#39;45&#39;);
INSERT INTO test_time1
VALUES (&#39;123520&#39;), (124011),(1210);
INSERT INTO test_time1
VALUES (NOW()), (CURRENT_TIME());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4、datetime类型" tabindex="-1"><a class="header-anchor" href="#_4、datetime类型" aria-hidden="true">#</a> 4、DATETIME类型</h4><p>DATETIME类型在所有的日期时间类型中占用的存储空间最大，总共需要 <strong>8 个字节</strong>的存储空间。在格式上为DATE类型和TIME类型的组合，可以表示为 <strong>YYYY-MM-DD HH:MM:SS</strong> ，其中YYYY表示年份，MM表示月份，DD表示日期，HH表示小时，MM表示分钟，SS表示秒。</p><p>在向DTETIME类型的字段插入数据时，同样需要满足一定的格式条件<br> 以 YYYY-MM-DD HH:MM:SS 格式或者 YYYYMMDDHHMMSS 格式的字符串插入DATETIME类型的字段时，最小值为1000-01-01 00:00:00，最大值为9999-12-03 23:59:59。<br> 以YYYYMMDDHHMMSS格式的数字插入DATETIME类型的字段时，会被转化为YYYY-MM-DDHH:MM:SS格式。<br> 以 YY-MM-DD HH:MM:SS 格式或者 YYMMDDHHMMSS 格式的字符串插入DATETIME类型的字段时，两位数的年份规则符合YEAR类型的规则，00到69表示2000到2069；70到99表示1970到1999。</p><p>使用函数 <strong>CURRENT_TIMESTAMP() 和 NOW()</strong> ，可以向DATETIME类型的字段插入系统的当前日期和时间。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_datetime1(
dt DATETIME
);
INSERT INTO test_datetime1
VALUES (&#39;2021-01-01 06:50:30&#39;), (&#39;20210101065030&#39;);
INSERT INTO test_datetime1
VALUES (&#39;99-01-01 00:00:00&#39;), (&#39;990101000000&#39;), (&#39;20-01-01 00:00:00&#39;),
(&#39;200101000000&#39;);
INSERT INTO test_datetime1
VALUES (20200101000000), (200101000000), (19990101000000), (990101000000);
INSERT INTO test_datetime1
VALUES (CURRENT_TIMESTAMP()), (NOW());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5、timestamp类型" tabindex="-1"><a class="header-anchor" href="#_5、timestamp类型" aria-hidden="true">#</a> 5、TIMESTAMP类型</h4><p>TIMESTAMP类型也可以表示日期时间，其显示格式与DATETIME类型相同，都是 YYYY-MM-DD HH:MM:SS ，需要4个字节的存储空间。但是TIMESTAMP存储的时间范围比DATETIME要小很多，<strong>只能存储“1970-01-01 00:00:01 UTC”到“2038-01-19 03:14:07 UTC”之间</strong>的时间。其中，UTC表示世界统一时间，也叫作世界标准时间。</p><p>**存储数据的时候需要对当前时间所在的时区进行转换，查询数据的时候再将时间转换回当前的时区。因此，使用TIMESTAMP存储的同一个时间值，在不同的时区查询时会显示不同的时间。 **</p><p>向TIMESTAMP类型的字段插入数据时，当插入的数据格式满足YY-MM-DD HH:MM:SS和YYMMDDHHMMSS时，两位数值的年份同样符合YEAR类型的规则条件，只不过表示的时间范围要小很多。如果向TIMESTAMP类型的字段插入的时间超出了TIMESTAMP类型的范围，则MySQL会抛出错误信息。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_timestamp1(
ts TIMESTAMP
);
INSERT INTO test_timestamp1
VALUES (&#39;1999-01-01 03:04:50&#39;), (&#39;19990101030405&#39;), (&#39;99-01-01 03:04:05&#39;),
(&#39;990101030405&#39;);
INSERT INTO test_timestamp1
VALUES (&#39;2020@01@01@00@00@00&#39;), (&#39;20@01@01@00@00@00&#39;);
INSERT INTO test_timestamp1
VALUES (CURRENT_TIMESTAMP()), (NOW());
#Incorrect datetime value
INSERT INTO test_timestamp1
VALUES (&#39;2038-01-20 03:14:07&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="timestamp和datetime的区别" tabindex="-1"><a class="header-anchor" href="#timestamp和datetime的区别" aria-hidden="true">#</a> TIMESTAMP和DATETIME的区别：</h4><p>TIMESTAMP存储空间比较小，表示的日期时间范围也比较小<br> 底层存储方式不同，TIMESTAMP底层存储的是毫秒值，距离1970-1-1 0:0:0 0毫秒的毫秒值。<br> 两个日期比较大小或日期计算时，TIMESTAMP更方便、更快。<br> TIMESTAMP和时区有关。TIMESTAMP会根据用户的时区不同，显示不同的结果。而DATETIME则只能反映出插入时当地的时区，其他时区的人查看数据必然会有误差的。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE temp_time(
d1 DATETIME,
d2 TIMESTAMP
);

INSERT INTO temp_time VALUES(&#39;2021-9-2 14:45:52&#39;,&#39;2021-9-2 14:45:52&#39;);
INSERT INTO temp_time VALUES(NOW(),NOW());

mysql&gt; SELECT * FROM temp_time;
+---------------------+---------------------+
| d1 | d2 |
+---------------------+---------------------+
| 2021-09-02 14:45:52 | 2021-09-02 14:45:52 |
| 2021-11-03 17:38:17 | 2021-11-03 17:38:17 |
+---------------------+---------------------+

#修改当前的时区
SET time_zone = &#39;+9:00&#39;;

mysql&gt; SELECT * FROM temp_time;
+---------------------+---------------------+
| d1 | d2 |
+---------------------+---------------------+
| 2021-09-02 14:45:52 | 2021-09-02 15:45:52 |
| 2021-11-03 17:38:17 | 2021-11-03 18:38:17 |
+---------------------+---------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**用得最多的日期时间类型，就是 DATETIME 。<br> 此外，一般存注册时间、商品发布时间等，不建议使用DATETIME存储，而是使用 时间戳 ，因为DATETIME虽然直观，但不便于计算。 **</p><h3 id="_7、文本字符串类型" tabindex="-1"><a class="header-anchor" href="#_7、文本字符串类型" aria-hidden="true">#</a> 7、文本字符串类型</h3><p>MySQL中，文本字符串总体上分为 CHAR 、 VARCHAR 、 TINYTEXT 、 TEXT 、 MEDIUMTEXT 、LONGTEXT 、 ENUM 、 SET 等类型。</p><h4 id="_1、char与varchar类型" tabindex="-1"><a class="header-anchor" href="#_1、char与varchar类型" aria-hidden="true">#</a> 1、CHAR与VARCHAR类型</h4><p>CHAR和VARCHAR类型都可以存储比较短的字符串。</p><table><thead><tr><th>字符串(文本)类型</th><th>特点</th><th>长度</th><th>长度范围</th><th>占用的存储空间</th></tr></thead><tbody><tr><td>CHAR(M)</td><td>固定长度</td><td>M</td><td>0 &lt;= M &lt;= 255</td><td>M个字节</td></tr><tr><td>VARCHAR(M)</td><td>可变长度</td><td>M</td><td>0 &lt;= M &lt;= 65535</td><td>(实际长度 + 1) 个字节</td></tr></tbody></table><p>CHAR类型：<br> CHAR(M) 类型一般需要预先定义字符串长度。如果不指定(M)，则表示长度默认是1个字符。<br> 如果保存时，数据的实际长度比CHAR类型声明的长度小，则会在 右侧填充 空格以达到指定的长度。当MySQL检索CHAR类型的数据时，CHAR类型的字段会去除尾部的空格。<br> 定义CHAR类型字段时，声明的字段长度即为CHAR类型字段所占的存储空间的字节数。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_char1(
c1 CHAR,
c2 CHAR(5)
);

INSERT INTO test_char1
VALUES(&#39;a&#39;,&#39;Tom&#39;);
SELECT c1,CONCAT(c2,&#39;***&#39;) FROM test_char1;
INSERT INTO test_char1(c2)
VALUES(&#39;a &#39;);
SELECT CHAR_LENGTH(c2)
FROM test_char1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>VARCHAR类型：<br> VARCHAR(M) 定义时， 必须指定 长度M，否则报错。<br> MySQL4.0版本以下，varchar(20)：指的是20字节，如果存放UTF8汉字时，只能存6个（每个汉字3字<br> 节） ；MySQL5.0版本以上，varchar(20)：指的是20字符。<br> 检索VARCHAR类型的字段数据时，会保留数据尾部的空格。VARCHAR类型的字段所占用的存储空间为字符串实际长度加1个字节。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_varchar1(
NAME VARCHAR #错误
);
#Column length too big for column &#39;NAME&#39; (max = 21845);
CREATE TABLE test_varchar2(
NAME VARCHAR(65535) #错误
);
CREATE TABLE test_varchar3(
NAME VARCHAR(5)
);
INSERT INTO test_varchar3
VALUES(&#39;尚硅谷&#39;),(&#39;尚硅谷教育&#39;);
#Data too long for column &#39;NAME&#39; at row 1
INSERT INTO test_varchar3
VALUES(&#39;尚硅谷IT教育&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>哪些情况使用 CHAR 或 VARCHAR 更好</p><table><thead><tr><th>类型</th><th>特点</th><th>空间上</th><th>时间上</th><th>适用场景</th></tr></thead><tbody><tr><td>CHAR(M)</td><td>固定长度</td><td>浪费存储空间</td><td>效率高</td><td>存储不大，速度要求高</td></tr><tr><td>VARCHAR(M)</td><td>可变长度</td><td>节省存储空间</td><td>效率低</td><td>非CHAR的情况</td></tr></tbody></table><p>存储很短的信息。比如门牌号码101，201……这样很短的信息应该用char<br> 固定长度的。比如使用uuid作为主键，那用char应该更合适。<br> 十分频繁改变的column。因为varchar每次存储都要有额外的计算，得到长度等工作，如果一个非常频繁改变的，那就要有很多的精力用于计算，而这些对于char来说是不需要的。<br> 具体存储引擎中的情况：<br> MyISAM 数据存储引擎和数据列：MyISAM数据表，最好使用固定长度(CHAR)的数据列代替可变长度(VARCHAR)的数据列。这样使得整个表静态化，从而使 数据检索更快 ，用空间换时间。<br> MEMORY 存储引擎和数据列：MEMORY数据表目前都使用固定长度的数据行存储，因此无论使用CHAR或VARCHAR列都没有关系，两者都是作为CHAR类型处理的。<br><strong>InnoDB 存储引擎</strong>，建议使用VARCHAR类型。因为对于InnoDB数据表，内部的行存储格式并没有区分固定长度和可变长度列（所有数据行都使用指向数据列值的头指针），<strong>而且主要影响性能的因素是数据行使用的存储总量</strong>，由于char平均占用的空间多于varchar，所以除了简短并且固定长度的，其他考虑varchar。这样节省空间，对磁盘I/O和数据存储总量比较好</p><h4 id="_2、text类型" tabindex="-1"><a class="header-anchor" href="#_2、text类型" aria-hidden="true">#</a> 2、Text类型</h4><p>在MySQL中，TEXT用来保存文本类型的字符串，总共包含4种类型，分别为TINYTEXT、TEXT、MEDIUMTEXT 和 LONGTEXT 类型。<br> 在向TEXT类型的字段保存和查询数据时，系统自动按照实际长度存储，不需要预先定义长度。这一点和VARCHAR类型相同。</p><table><thead><tr><th>文本字符串类 型</th><th>特点</th><th>长 度</th><th>长度范围</th><th>占用的存储空 间</th></tr></thead><tbody><tr><td>TINYTEXT</td><td>小文本、可变长 度</td><td>L</td><td>0 &lt;= L &lt;= 255</td><td>L + 2 个字节</td></tr><tr><td>TEXT</td><td>文本、可变长度</td><td>L</td><td>0 &lt;= L &lt;= 65535</td><td>L + 2 个字节</td></tr><tr><td>MEDIUMTEXT</td><td>中等文本、可变 长度</td><td>L</td><td>0 &lt;= L &lt;= 16777215</td><td>L + 3 个字节</td></tr><tr><td>LONGTEXT</td><td>大文本、可变长 度</td><td>L</td><td>0 &lt;= L&lt;= 4294967295（相当于 4GB）</td><td>L + 4 个字节</td></tr></tbody></table><p>由于实际存储的长度不确定，*<strong>MySQL 不允许 TEXT 类型的字段做主键</strong>。遇到这种情况，你只能采用CHAR(M)，或者 VARCHAR(M)。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_text(
tx TEXT
);
INSERT INTO test_text
VALUES(&#39;atguigu &#39;);
SELECT CHAR_LENGTH(tx)
FROM test_text; #10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明在保存和查询数据时，并没有删除TEXT类型的数据尾部的空格<br> TEXT文本类型，可以存比较大的文本段，搜索速度稍慢，因此<strong>如果不是特别大的内容，建议使用CHAR，VARCHAR来代替</strong>。还有TEXT类型不用加默认值，加了也没用。而且text和blob类型的数据删除后容易导致“空洞”，使得文件碎片比较多，所以频繁使用的表不建议包含TEXT类型字段，建议单独分出去，单独用一个表。</p><h3 id="_8、enum类型" tabindex="-1"><a class="header-anchor" href="#_8、enum类型" aria-hidden="true">#</a> 8、ENUM类型</h3><p>ENUM类型也叫作枚举类型，ENUM类型的取值范围需要在定义字段时进行指定。设置字段值时，ENUM类型只允许从成员中选取单个值，不能一次选取多个值。<br> 其所需要的存储空间由定义ENUM类型时指定的成员个数决定。</p><table><thead><tr><th>文本字符串类型</th><th>长度</th><th>长度范围</th><th>占用的存储空间</th></tr></thead><tbody><tr><td>ENUM</td><td>L</td><td>1 &lt;= L &lt;= 65535</td><td>1或2个字节</td></tr></tbody></table><p>当ENUM类型包含1～255个成员时，需要1个字节的存储空间；<br> 当ENUM类型包含256～65535个成员时，需要2个字节的存储空间。<br> ENUM类型的成员个数的上限为65535个。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_enum(
season ENUM(&#39;春&#39;,&#39;夏&#39;,&#39;秋&#39;,&#39;冬&#39;,&#39;unknow&#39;)
)
INSERT INTO test_enum
VALUES(&#39;春&#39;),(&#39;秋&#39;);
## 忽略大小写
INSERT INTO test_enum
VALUES(&#39;UNKNOW&#39;);
## 允许按照角标的方式获取指定索引位置的枚举值
INSERT INTO test_enum
VALUES(&#39;1&#39;),(3);
## Data truncated for column &#39;season&#39; at row 1
INSERT INTO test_enum
VALUES(&#39;ab&#39;);
## 当ENUM类型的字段没有声明为NOT NULL时，插入NULL也是有效的
INSERT INTO test_enum
VALUES(NULL);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9、set类型" tabindex="-1"><a class="header-anchor" href="#_9、set类型" aria-hidden="true">#</a> 9、SET类型</h3><p>SET表示一个字符串对象，可以包含0个或多个成员，但成员个数的上限为 64 。设置字段值时，可以取取值范围内的 0 个或多个值。</p><table><thead><tr><th>成员个数范围（L表示实际成员个数）</th><th>占用的存储空间</th></tr></thead><tbody><tr><td>1 &lt;= L &lt;= 8</td><td>1个字节</td></tr><tr><td>9 &lt;= L &lt;= 16</td><td>2个字节</td></tr><tr><td>17 &lt;= L &lt;= 24</td><td>3个字节</td></tr><tr><td>25 &lt;= L &lt;= 32</td><td>4个字节</td></tr><tr><td>33 &lt;= L &lt;= 64</td><td>8个字节</td></tr></tbody></table><p>SET类型在存储数据时成员个数越多，其占用的存储空间越大。注意：SET类型在选取成员时，可以一次选择多个成员，这一点与ENUM类型不同。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_set(
s SET (&#39;A&#39;, &#39;B&#39;, &#39;C&#39;)
);
INSERT INTO test_set (s) VALUES (&#39;A&#39;), (&#39;A,B&#39;);
#插入重复的SET类型成员时，MySQL会自动删除重复的成员
INSERT INTO test_set (s) VALUES (&#39;A,B,C,A&#39;);
#向SET类型的字段插入SET成员中不存在的值时，MySQL会抛出错误。
INSERT INTO test_set (s) VALUES (&#39;A,B,C,D&#39;);
SELECT * FROM test_set;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10、二进制字符串类型" tabindex="-1"><a class="header-anchor" href="#_10、二进制字符串类型" aria-hidden="true">#</a> 10、二进制字符串类型</h3><p>MySQL中的二进制字符串类型主要存储一些二进制数据，比如可以存储图片、音频和视频等二进制数据。<br> MySQL中支持的二进制字符串类型主要包括BINARY、VARBINARY、TINYBLOB、BLOB、MEDIUMBLOB 和LONGBLOB类型。</p><h4 id="_1、binary与varbinary类型" tabindex="-1"><a class="header-anchor" href="#_1、binary与varbinary类型" aria-hidden="true">#</a> 1、BINARY与VARBINARY类型</h4><p>BINARY和VARBINARY类似于CHAR和VARCHAR，只是它们存储的是二进制字符串。</p><p>BINARY (M)为固定长度的二进制字符串，M表示最多能存储的字节数，取值范围是0~255个字符。如果未指定(M)，表示只能存储 1个字节 。例如BINARY (8)，表示最多能存储8个字节，如果字段值不足(M)个字节，将在右边填充&#39;\\0&#39;以补齐指定长度。<br> VARBINARY (M)为可变长度的二进制字符串，M表示最多能存储的字节数，总字节数不能超过行的字节长度限制65535，另外还要考虑额外字节开销，VARBINARY类型的数据除了存储数据本身外，还需要1或2个字节来存储数据的字节数。VARBINARY类型 必须指定(M) ，否则报错。</p><table><thead><tr><th>二进制字符串类型</th><th>特点</th><th>值的长度</th><th>占用空间</th></tr></thead><tbody><tr><td>BINARY(M)</td><td>固定长度</td><td>M （0 &lt;= M &lt;= 255）</td><td>M个字节</td></tr><tr><td>VARBINARY(M)</td><td>可变长度</td><td>M（0 &lt;= M &lt;= 65535）</td><td>M+1个字节</td></tr></tbody></table><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_binary1(
f1 BINARY,
f2 BINARY(3),
## f3 VARBINARY, 错误声明
f4 VARBINARY(10)
);
INSERT INTO test_binary1(f1,f2)
VALUES(&#39;a&#39;,&#39;a&#39;);
INSERT INTO test_binary1(f1,f2)
VALUES(&#39;尚&#39;,&#39;尚&#39;);#失败
INSERT INTO test_binary1(f2,f4)
VALUES(&#39;ab&#39;,&#39;ab&#39;);

mysql&gt; SELECT LENGTH(f2),LENGTH(f4)
-&gt; FROM test_binary1;
+------------+------------+
| LENGTH(f2) | LENGTH(f4) |
+------------+------------+
| 3 | NULL |
| 3 | 2 |
+------------+------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2、blob类型" tabindex="-1"><a class="header-anchor" href="#_2、blob类型" aria-hidden="true">#</a> 2、BLOB类型</h5><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_blob1(
id INT,
img MEDIUMBLOB
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>BLOB是一个二进制大对象，可以容纳可变数量的数据。<br> MySQL中的BLOB类型包括TINYBLOB、BLOB、MEDIUMBLOB和LONGBLOB 4种类型，它们可容纳值的最大长度不同。可以存储一个二进制的大对象，比如 图片 、 音频 和 视频 等。<br> 需要注意的是，在实际工作中，往往不会在MySQL数据库中使用BLOB类型存储大对象数据，通常会将图片、音频和视频文件存储到 服务器的磁盘上 ，并将图片、音频和视频的访问路径存储到MySQL中。</p><table><thead><tr><th>二进制字符串类型</th><th>值的长度</th><th>长度范围</th><th>占用空间</th></tr></thead><tbody><tr><td>TINYBLOB</td><td>L</td><td>0 &lt;= L &lt;= 255</td><td>L + 1 个字节</td></tr><tr><td>BLOB</td><td>L</td><td>0 &lt;= L &lt;= 65535（相当于64KB）</td><td>L + 2 个字节</td></tr><tr><td>MEDIUMBLOB</td><td>L</td><td>0 &lt;= L &lt;= 16777215 （相当于16MB）</td><td>L + 3 个字节</td></tr><tr><td>LONGBLOB</td><td>L</td><td>0 &lt;= L &lt;= 4294967295（相当于4GB）</td><td>L + 4 个字节</td></tr></tbody></table><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_blob1(
id INT,
img MEDIUMBLOB
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>TEXT和BLOB的使用注意事项：</p><p>① BLOB和TEXT值也会引起自己的一些问题，特别是执行了大量的删除或更新操作的时候。删除这种值会在数据表中留下很大的&quot; 空洞 &quot;，以后填入这些&quot;空洞&quot;的记录可能长度不同。为了提高性能，建议定期使用 OPTIMIZE TABLE 功能对这类表进行 碎片整理<br> ② 如果需要对大文本字段进行模糊查询，MySQL 提供了 前缀索引 。但是仍然要在不必要的时候避免检索大型的BLOB或TEXT值。例如，SELECT * 查询就不是很好的想法，除非你能够确定作为约束条件的WHERE子句只会找到所需要的数据行。否则，你可能毫无目的地在网络上传输大量的值。<br> ③ 把BLOB或TEXT列 分离到单独的表 中。在某些环境中，如果把这些数据列移动到第二张数据表中，可以让你把原数据表中的数据列转换为固定长度的数据行格式，那么它就是有意义的。这会 减少主表中的碎片 ，使你得到固定长度数据行的性能优势。它还使你在主数据表上运行 SELECT * 查询的时候不会通过网络传输大量的BLOB或TEXT值。</p><h3 id="_11、json类型" tabindex="-1"><a class="header-anchor" href="#_11、json类型" aria-hidden="true">#</a> 11、JSON类型</h3><p>JSON（JavaScript Object Notation）是一种轻量级的 数据交换格式 。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。它易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。<strong>JSON 可以将 JavaScript 对象中表示的一组数据转换为字符串，然后就可以在网络或者程序之间轻松地传递这个字符串，并在需要的时候将它还原为各编程语言所支持的数据格式。</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE test_json(
js json
);  
INSERT INTO test_json (js)
VALUES (&#39;{&quot;name&quot;:&quot;songhk&quot;, &quot;age&quot;:18, &quot;address&quot;:{&quot;province&quot;:&quot;beijing&quot;,&quot;city&quot;:&quot;beijing&quot;}}&#39;);

SELECT js -&gt; &#39;$.name&#39; AS NAME,js -&gt; &#39;$.age&#39; AS age ,js -&gt; &#39;$.address.province&#39;
AS province, js -&gt; &#39;$.address.city&#39; AS city
-&gt; FROM test_json;
+----------+------+-----------+-----------+
| NAME | age | province | city |
+----------+------+-----------+-----------+
| &quot;songhk&quot; | 18 | &quot;beijing&quot; | &quot;beijing&quot; |
+----------+------+-----------+-----------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过“-&gt;”和“-&gt;&gt;”符号，从JSON字段中正确查询出了指定的JSON数据的值。</p><h3 id="_12、小结及选择建议" tabindex="-1"><a class="header-anchor" href="#_12、小结及选择建议" aria-hidden="true">#</a> 12、小结及选择建议</h3><p>在定义数据类型时，如果确定是<strong>整数</strong>，就用 <strong>INT</strong> ； 如果是<strong>小数</strong> ，一定用定点数类型<strong>DECIMAL(M,D)</strong> ； 如果是<strong>日期与时间</strong>，就用 **DATETIME **</p><p>阿里巴巴《Java开发手册》之MySQL数据库：<br> 任何字段如果为非负数，必须是 UNSIGNED<br> 【 强制 】小数类型为<strong>DECIMAL</strong>，禁止使用 FLOAT 和 DOUBLE。<br> 说明：在存储的时候，FLOAT 和 DOUBLE 都存在精度损失的问题，很可能在比较值的时候，得到不正确的结果。如果存储的数据范围超过 DECIMAL 的范围，建议将数据拆成整数和小数并分开存储。<br> 【 强制 】如果存储的字符串长度几乎相等，使用 CHAR 定长字符串类型。<br> 【 强制 】VARCHAR 是可变长字符串，不预先分配存储空间，长度不要超过 5000。如果存储长度大<br> 于此值，定义字段类型为 TEXT，独立出来一张表，用主键来对应，避免影响其它字段索引效率。</p><h2 id="_11、约束" tabindex="-1"><a class="header-anchor" href="#_11、约束" aria-hidden="true">#</a> 11、约束</h2><p>为什么需要约束：为了保证数据的完整性<br> 什么叫约束：对表中字段的限制<br> 约束的分类：<br> 约束的字段的个数（单列约束，多列约束）<br> 约束的作用范围（列级约束，表级约束）<br> 约束的作用（或功能）</p><p>查看表中的约束：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#information_schema数据库名（系统库）
#table_constraints表名称（专门存储各个表的约束）
SELECT * FROM information_schema.table_constraints
WHERE table_name = &#39;表名称&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1、非空约束" tabindex="-1"><a class="header-anchor" href="#_1、非空约束" aria-hidden="true">#</a> 1、非空约束</h3><p>作用：限定某个字段/某列的值不允许为空<br><strong>关键字：not null</strong></p><h4 id="_1、添加非空约束" tabindex="-1"><a class="header-anchor" href="#_1、添加非空约束" aria-hidden="true">#</a> 1、添加非空约束</h4><p>1、建表前：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE 表名称(
字段名 数据类型,
字段名 数据类型 NOT NULL,
字段名 数据类型 NOT NULL
);

CREATE TABLE emp(
id INT(10) NOT NULL,
NAME VARCHAR(20) NOT NULL,
sex CHAR NULL
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、建表后</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名称 modify 字段名 数据类型 not null;

ALTER TABLE emp MODIFY sex VARCHAR(30) NOT NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、删除非空约束" tabindex="-1"><a class="header-anchor" href="#_2、删除非空约束" aria-hidden="true">#</a> 2、删除非空约束</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名称 modify 字段名 数据类型 NULL;#去掉not null，相当于修改某个非注解字段，该字段允许为空
或 
alter table 表名称 modify 字段名 数据类型;#去掉not null，相当于修改某个非注解字段，该字段允许为空

ALTER TABLE empMODIFY sex VARCHAR(30) NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、唯一性约束" tabindex="-1"><a class="header-anchor" href="#_2、唯一性约束" aria-hidden="true">#</a> 2、唯一性约束</h3><p>用来限制某个字段/某列的值不能重复<br><strong>关键字：UNIQUE</strong></p><p>同一个表可以有多个唯一约束。<br> 唯一约束可以是某一个列的值唯一，也可以多个列组合的值唯一。<br> 唯一性约束允许列值为空。<br> 在创建唯一约束的时候，如果不给唯一约束命名，就默认和列名相同。<br> **MySQL会给唯一约束的列上默认创建一个唯一索引。 **</p><p><strong>可以向声明null为unique的字段上添加null值，而且可以多次添加null值</strong></p><h4 id="_1、添加唯一性约束" tabindex="-1"><a class="header-anchor" href="#_1、添加唯一性约束" aria-hidden="true">#</a> 1、添加唯一性约束</h4><p>1、建表时</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table 表名称(
字段名 数据类型,
字段名 数据类型 unique,
字段名 数据类型 unique key,
字段名 数据类型
);
create table 表名称(
字段名 数据类型,
字段名 数据类型,
字段名 数据类型,
[constraint 约束名] unique key(字段名)
);

create table student(
sid int,
sname varchar(20),
tel char(11) unique,
cardid char(18) unique key
);

CREATE TABLE USER(
id INT NOT NULL,
NAME VARCHAR(25),
PASSWORD VARCHAR(16),
-- 使用表级约束语法
CONSTRAINT uk_name_pwd UNIQUE(NAME,PASSWORD)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、建表后指定唯一键约束</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#字段列表中如果是一个字段，表示该列的值唯一。如果是两个或更多个字段，那么复合唯一，即多个字段的组合是唯一的
#方式1：
alter table 表名称 add unique key(字段列表);
#方式2：
alter table 表名称 modify 字段名 字段类型 unique;

ALTER TABLE USER ADD UNIQUE(NAME,PASSWORD);
ALTER TABLE USER MODIFY NAME VARCHAR(20) UNIQUE;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、关于复合唯一约束" tabindex="-1"><a class="header-anchor" href="#_2、关于复合唯一约束" aria-hidden="true">#</a> 2、关于复合唯一约束</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table 表名称(
字段名 数据类型,
字段名 数据类型,
字段名 数据类型,
unique key(字段列表) #字段列表中写的是多个字段名，多个字段名用逗号分隔，表示那么是复合唯一，即多个字段的组合是唯一的
);

create table student_course(
id int,
sid int,
cid int,
score int,
unique key(sid,cid) #复合唯一
);  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3、删除唯一约束" tabindex="-1"><a class="header-anchor" href="#_3、删除唯一约束" aria-hidden="true">#</a> 3、删除唯一约束</h4><p>添加唯一性约束的列上也会自动创建唯一索引。<br> 删除唯一约束只能通过删除唯一索引的方式删除。<br> 删除时需要指定唯一索引名，唯一索引名就和唯一约束名一样。<br> 如果创建唯一约束时未指定名称，如果是单列，就默认和列名相同；如果是组合列，那么默认和()中排在第一个的列名相同。也可以自定义唯一性约束名。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM information_schema.table_constraints WHERE table_name = &#39;表名&#39;; #查看都有哪些约束
ALTER TABLE USER DROP INDEX uk_name_pwd;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：可以通过 show index from 表名称; 查看表的索引</p><h3 id="_3、primary-key-约束" tabindex="-1"><a class="header-anchor" href="#_3、primary-key-约束" aria-hidden="true">#</a> 3、PRIMARY KEY 约束</h3><p>用来唯一标识表中的一行记录。<br><strong>关键字：primary key **<br> 主键约束相当于</strong>唯一约束+非空约束的组合**，主键约束列不允许重复，也不允许出现空值</p><p>一个表最多只能有一个主键约束，建立主键约束可以在列级别创建，也可以在表级别上创建。<br> 如果是多列组合的复合主键约束，那么这些列都不允许为空值，并且组合的值不允许重复 。<br><strong>MySQL的主键名总是PRIMARY</strong>，就算自己命名了主键约束名也没用<br> 当创建主键约束时，系统默认会在所在的列或列组合上<strong>建立对应的主键索引</strong>（能够根据主键查询的，就根据主键查询，效率更高）。如果删除主键约束了，主键约束对应的索引就自动删除了。<br> 需要注意的一点是，不要修改主键字段的值。因为主键是数据记录的唯一标识，如果修改了主键的值，就有可能会破坏数据的完整性。</p><h4 id="_1、添加主键约束" tabindex="-1"><a class="header-anchor" href="#_1、添加主键约束" aria-hidden="true">#</a> 1、添加主键约束</h4><p>1、建表时指定主键约束 ：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table 表名称(
字段名 数据类型 primary key, #列级模式
字段名 数据类型,
字段名 数据类型
);
create table 表名称(
字段名 数据类型,
字段名 数据类型,
字段名 数据类型,
[constraint 约束名] primary key(字段名) #表级模式
);

create table temp(
id int primary key,
name varchar(20)
);
CREATE TABLE emp5(
id INT NOT NULL AUTO_INCREMENT,
NAME VARCHAR(20),
pwd VARCHAR(15),
CONSTRAINT emp5_id_pk PRIMARY KEY(id) #没有必要起名字
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、建表后增加主键约束</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名称 ADD PRIMARY KEY(字段列表); #字段列表可以是一个字段，也可以是多个字段，如果是多个字段的话，是复合主键

ALTER TABLE student ADD PRIMARY KEY (sid);
ALTER TABLE emp5 ADD PRIMARY KEY(NAME,pwd);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、删除主键约束" tabindex="-1"><a class="header-anchor" href="#_2、删除主键约束" aria-hidden="true">#</a> 2、删除主键约束</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名称 drop primary key;

ALTER TABLE student DROP PRIMARY KEY;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、自增列-auto-increment" tabindex="-1"><a class="header-anchor" href="#_4、自增列-auto-increment" aria-hidden="true">#</a> 4、自增列：AUTO_INCREMENT</h3><p>作用：某个字段的值自增<br> **关键字：auto_increment **</p><p><strong>一个表最多只能有一个自增长列</strong><br> 当需要产生唯一标识符或顺序值时，可设置自增长<br> 自增长列约束的列<strong>必须是键列</strong>（主键列，唯一键列）<br> 自增约束的列的数据类型必须是<strong>整数类型</strong><br> **如果自增列指定了 0 和 null，会在当前最大值的基础上自增；如果自增列手动指定了具体值，直接赋值为具体值。 **</p><p>开发中，一旦逐渐作用的字段上声明有Auto_INCREMENT，则我们在添加数据时，就不要给逐主键对应的字段赋值了</p><h4 id="_1、指定自增约束" tabindex="-1"><a class="header-anchor" href="#_1、指定自增约束" aria-hidden="true">#</a> 1、指定自增约束</h4><p>1、建表时：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table 表名称(
字段名 数据类型 primary key auto_increment,
字段名 数据类型 unique key not null,
字段名 数据类型 unique key,
字段名 数据类型 not null default 默认值,
);
create table 表名称(
字段名 数据类型 default 默认值 ,
字段名 数据类型 unique key auto_increment,
字段名 数据类型 not null default 默认值,,
primary key(字段名)
);

create table employee(
eid int primary key auto_increment,
ename varchar(20)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、建表后：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名称 modify 字段名 数据类型 auto_increment;

create table employee(
eid int primary key ,
ename varchar(20)
)
alter table employee modify eid int auto_increment;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、删除自增约束" tabindex="-1"><a class="header-anchor" href="#_2、删除自增约束" aria-hidden="true">#</a> 2、删除自增约束</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#alter table 表名称 modify 字段名 数据类型 auto_increment;#给这个字段增加自增约束
alter table 表名称 modify 字段名 数据类型; #去掉auto_increment相当于删除

alter table employee modify eid int;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3、mysql-8-0新特性—自增变量的持久化" tabindex="-1"><a class="header-anchor" href="#_3、mysql-8-0新特性—自增变量的持久化" aria-hidden="true">#</a> 3、MySQL 8.0新特性—自增变量的持久化</h4><p>在MySQL 8.0之前，自增主键AUTO_INCREMENT的值如果大于max(primary key)+1，在MySQL重启后，会重置AUTO_INCREMENT=max(primary key)+1，这种现象在某些情况下会导致业务主键冲突或者其他难以发现的问题。</p><p>在MySQL 5.7系统中，对于自增主键的分配规则，是由InnoDB数据字典内部一个 计数器 来决定的，而<strong>该计数器只在内存中维护</strong> ，并不会持久化到磁盘中。**当数据库重启时，该计数器会被初始化 **</p><p><strong>MySQL 8.0将自增主键的计数器持久化到重做日志中</strong>。每次计数器发生改变，都会将其写入重做日志中。如果数据库重启，InnoDB会根据重做日志中的信息来初始化计数器的内存值。</p><h3 id="_5、foreign-key-约束" tabindex="-1"><a class="header-anchor" href="#_5、foreign-key-约束" aria-hidden="true">#</a> 5、FOREIGN KEY 约束</h3><p>作用：限定某个表的某个字段的引用完整性。<br> 比如：员工表的员工所在部门的选择，必须在部门表能找到对应的部分。<br> **关键字：FOREIGN KEY **</p><h4 id="_1、主表和从表-父表和子表" tabindex="-1"><a class="header-anchor" href="#_1、主表和从表-父表和子表" aria-hidden="true">#</a> 1、主表和从表/父表和子表</h4><p>主表（父表）：<strong>被引用</strong>的表，<strong>被参考</strong>的表<br> 从表（子表）：**引用别人的表，参考别人的表 **</p><h4 id="_2、特点" tabindex="-1"><a class="header-anchor" href="#_2、特点" aria-hidden="true">#</a> 2、特点</h4><p>1、从表的外键列，必须<strong>引用/参考主表的主键或唯一约束的列</strong>，因为被依赖/被参考的值必须是唯一的<br> 2、在创建外键约束时，如果<strong>不给外键约束命名</strong>，默认名不是列名，而是<strong>自动产生一个外键名</strong>（例如student_ibfk_1;），也可以指定外键约束名<br> 3、创建(CREATE)表时就指定外键约束的话，<strong>先创建主表，再创建从表</strong><br> 4、删表时，<strong>先删从表（或先删除外键约束），再删除主表 **<br> 5、当主表的记录被从表参照时，主表的记录将不允许删除，<strong>如果要删除数据，需要先删除从表中依赖该记录的数据</strong>，然后才可以删除主表的数据<br> 6、在“从表”中指定外键约束，并且</strong>一个表可以建立多个外键约束 ****<br> 7、<strong>从表的外键列与主表被参照的列名字可以不相同</strong>，但是<strong>数据类型必须一样</strong>，逻辑意义一致。如果类型不一样，创建子表时，就会出现错误“ERROR 1005 (HY000): Can&#39;t createtable&#39;database.tablename&#39;(errno: 150)”。<br> 8、<strong>当创建外键约束时，系统默认会在所在的列上建立对应的普通索引</strong>。但是索引名是外键的约束名。（根据外键查询效率很高）<br> 9、删除外键约束后，必须 <strong>手动</strong>删除对应的索引</p><h4 id="_3、添加外键约束" tabindex="-1"><a class="header-anchor" href="#_3、添加外键约束" aria-hidden="true">#</a> 3、添加外键约束</h4><p>1、建表时：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table 主表名称(
字段1 数据类型 primary key,
字段2 数据类型
);

create table 从表名称(
字段1 数据类型 primary key,
字段2 数据类型,
[CONSTRAINT &lt;外键约束名称&gt;] FOREIGN KEY（从表的某个字段) references 主表名(被参考字段)
);

-- FOREIGN KEY: 在表级指定子表中的列
-- REFERENCES: 标示在父表中的列

create table dept( #主表
did int primary key, #部门编号
dname varchar(50) #部门名称
);
create table emp(#从表
eid int primary key, #员工编号
ename varchar(5), #员工姓名
deptid int, #员工所在的部门
foreign key (deptid) references dept(did) #在从表中指定外键约束
#emp表的deptid和和dept表的did的数据类型一致，意义都是表示部门的编号
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、建表后</p><p>一般情况下，表与表的关联都是提前设计好了的，因此，会在创建表的时候就把外键约束定义好。不过，如果需要修改表的设计（比如添加新的字段，增加新的关联关系），但没有预先定义外键约束，那么，就要用修改表的方式来补充定义</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 从表名 ADD [CONSTRAINT 约束名] FOREIGN KEY (从表的字段) REFERENCES 主表名(被引用字段) [on update xx][on delete xx];

ALTER TABLE emp1
ADD [CONSTRAINT emp_dept_id_fk] FOREIGN KEY(dept_id) REFERENCES dept(dept_id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结：约束关系是针对双方的<br> 添加了外键约束后，主表的修改和删除数据受约束<br> 添加了外键约束后，从表的添加和修改数据受约束<br> 在从表上建立外键，要求主表必须存在<br> 删除主表时，要求从表从表先删除，或将从表中外键引用该主表的关系先删除</p><h4 id="_4、约束等级" tabindex="-1"><a class="header-anchor" href="#_4、约束等级" aria-hidden="true">#</a> 4、约束等级</h4><p>Cascade方式 ：在父表上update/delete记录时，同步update/delete掉子表的匹配记录<br> Set null方式 ：在父表上update/delete记录时，将子表上匹配记录的列设为null，但是要注意子表的外键列不能为not null<br> No action方式 ：如果子表中有匹配的记录，则不允许对父表对应候选键进行update/delete操作<br> Restrict方式 ：同no action， 都是立即检查外键约束<br> Set default方式 （在可视化工具SQLyog中可能显示空白）：父表有变更时，子表将外键列设置成一个默认的值，但Innodb不能识别</p><p>如果没有指定等级，就相当于Restrict方式。<br> 对于外键约束，最好是采用: <strong>ON UPDATE CASCADE ON DELETE RESTRICT</strong> 的方式。</p><h4 id="_5、删除外键约束" tabindex="-1"><a class="header-anchor" href="#_5、删除外键约束" aria-hidden="true">#</a> 5、删除外键约束</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#(1)第一步先查看约束名和删除外键约束
SELECT * FROM information_schema.table_constraints WHERE table_name = &#39;表名称&#39;;#查看某个
#表的约束名
ALTER TABLE 从表名 DROP FOREIGN KEY 外键约束名;
#（2）第二步查看索引名和删除索引。（注意，只能手动删除）
SHOW INDEX FROM 表名称; #查看某个表的索引名
ALTER TABLE 从表名 DROP INDEX 索引名;

alter table emp drop foreign key emp_ibfk_1;
alter table emp drop index deptid;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6、开发场景" tabindex="-1"><a class="header-anchor" href="#_6、开发场景" aria-hidden="true">#</a> 6、开发场景</h4><p>1、如果两个表之间有关系（一对一、一对多），比如：员工表和部门表（一对多），它们之间<strong>不一定要建外键约束</strong><br> 2、<strong>建外键约束</strong>，你的操作（创建表、删除表、添加、修改、删除）<strong>会受到限制</strong>，从语法层面受到限制。<br><strong>不建外键约束</strong>，你的操作（创建表、删除表、添加、修改、删除）<strong>不受限制</strong>，要保证数据的 引用完整<br> 性 ，只能<strong>依靠程序员的自觉</strong> ，或者是 在<strong>Java程序中进行限定</strong> 。例如：在员工表中，可以添加一个员工的<br> 信息，它的部门指定为一个完全不存在的部门。<br> 3、<strong>建和不建外键约束和查询没有关系</strong></p><p>在 MySQL 里，外键约束是有成本的，需要消耗系统资源。对于大并发的 SQL 操作，有可能会不适合。比如大型网站的中央数据库，可能会 因为外键约束的系统开销而变得非常慢 。所以， MySQL 允许你不使用系统自带的外键约束，<strong>在 应用层面 完成检查数据一致性的逻辑</strong>。也就是说，即使你不用外键约束，也要想办法通过应用层面的附加逻辑，来实现外键约束的功能，确保数据的一致性。</p><p><strong>阿里开发规范</strong><br> 【 强制 】不得使用外键与级联，一切外键概念必须在应用层解决。<br> 说明：（概念解释）学生表中的 student_id 是主键，那么成绩表中的 student_id 则为外键。如果更新学生表中的 student_id，同时触发成绩表中的 student_id 更新，即为级联更新。外键与级联更新适用于 单机低并发 ，不适合 分布式 、 高并发集群 ；级联更新是强阻塞，存在数据库 更新风暴 的风险；外键影响数据库的 插入速度 。</p><h3 id="_6、check约束" tabindex="-1"><a class="header-anchor" href="#_6、check约束" aria-hidden="true">#</a> 6、check约束</h3><p>作用：检查某个字段的值是否符号xx要求，一般指的是值的范围<br> 关键字：CHECK<br> MySQL5.7 可以使用check约束，但check约束对数据验证没有任何作用。添加数据时，没有任何错误或警告。但是MySQL 8.0中可以使用check约束了。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table employee(
eid int primary key,
ename varchar(5),
gender char check (&#39;男&#39; or &#39;女&#39;)
);

CREATE TABLE temp(
id INT AUTO_INCREMENT,
NAME VARCHAR(20),
age INT CHECK(age &gt; 20),
PRIMARY KEY(id)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7、default约束" tabindex="-1"><a class="header-anchor" href="#_7、default约束" aria-hidden="true">#</a> 7、DEFAULT约束</h3><p>作用：给某个字段/某列指定默认值，一旦设置默认值，在插入数据时，如果此字段没有显式赋值，则赋值为默认值<br> 关键字：DEFAULT</p><h4 id="_1、给字段加默认值" tabindex="-1"><a class="header-anchor" href="#_1、给字段加默认值" aria-hidden="true">#</a> 1、给字段加默认值</h4><p>1、建表时：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table 表名称(
字段名 数据类型 primary key,
字段名 数据类型 unique key not null,
字段名 数据类型 unique key,
字段名 数据类型 not null default 默认值,
);

create table employee(
eid int primary key,
ename varchar(20) not null,
gender char default &#39;男&#39;,
tel char(11) not null default &#39;&#39; #默认是空字符串
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、建表后</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名称 modify 字段名 数据类型 default 默认值;
#如果这个字段原来有非空约束，你还保留非空约束，那么在加默认值约束时，还得保留非空约束，否则非空约束就被删除了
#同理，在给某个字段加非空约束也一样，如果这个字段原来有默认值约束，你想保留，也要在modify语句中保留默认值约束，否则就删除了
alter table 表名称 modify 字段名 数据类型 default 默认值 not null;

create table employee(
eid int primary key,
ename varchar(20),
gender char,
tel char(11) not null
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、删除默认值约束" tabindex="-1"><a class="header-anchor" href="#_2、删除默认值约束" aria-hidden="true">#</a> 2、删除默认值约束</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名称 modify 字段名 数据类型 ;#删除默认值约束，也不保留非空约束
alter table 表名称 modify 字段名 数据类型 not null; #删除默认值约束，保留非空约束

alter table employee modify gender char; #删除gender字段默认值约束，如果有非空约束，也一并删除
alter table employee modify tel char(11) not null;#删除tel字段默认值约束，保留非空约束
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12、视图" tabindex="-1"><a class="header-anchor" href="#_12、视图" aria-hidden="true">#</a> 12、视图</h2><h3 id="_1、视图概述" tabindex="-1"><a class="header-anchor" href="#_1、视图概述" aria-hidden="true">#</a> 1、视图概述</h3><p>视图是一种<strong>虚拟表</strong>，本身是<strong>不具有数据</strong>的，占用很少的内存空间<br> 视图<strong>建立在已有表的基础上</strong>, 视图赖以建立的这些表称为<strong>基表</strong><br> 视图本质是<strong>存储起来的select语句</strong><br><mark>针对视图做DML操作，会影响到对应的基表中的数据。反之亦然</mark><br> 视图本身的删除，不会导致基表中数据的删除<br> 视图的应用场景：针对小型项目，不推荐使用视图，针对大型项目可以考虑<br> 视图的优点：<strong>简化查询；控制数据的访问</strong></p><h3 id="_2、创建视图" tabindex="-1"><a class="header-anchor" href="#_2、创建视图" aria-hidden="true">#</a> 2、创建视图</h3><p>在 CREATE VIEW 语句中嵌入子查询</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#语句
CREATE [OR REPLACE]
[ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}]
VIEW 视图名称 [(字段列表)]
AS 查询语句
[WITH [CASCADED|LOCAL] CHECK OPTION]

#精简版
CREATE VIEW 视图名称
AS 查询语句
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1、创建单表视图" tabindex="-1"><a class="header-anchor" href="#_1、创建单表视图" aria-hidden="true">#</a> 1、创建单表视图</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW empvu80
AS
SELECT employee_id, last_name, salary
FROM employees
WHERE department_id = 80;

CREATE VIEW emp_year_salary (ename,year_salary) #小括号内字段个数与select中字段个数相同
AS
SELECT ename,salary*12*(1+IFNULL(commission_pct,0))
FROM t_employee;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明1：实际上就是我们在 SQL 查询语句的基础上封装了视图 VIEW，这样就会基于 SQL 语句的结果集形成一张虚拟表。<br> 说明2：在创建视图时，没有在视图名后面指定字段列表，则视图中字段列表默认和SELECT语句中的字段列表一致。如果SELECT语句中给字段取了别名，那么视图中的字段名和别名相同。</p><h4 id="_2、创建多表联合视图" tabindex="-1"><a class="header-anchor" href="#_2、创建多表联合视图" aria-hidden="true">#</a> 2、创建多表联合视图</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW empview
AS
SELECT employee_id emp_id,last_name NAME,department_name
FROM employees e,departments d
WHERE e.department_id = d.department_id;

CREATE VIEW dept_sum_vu
(name, minsal, maxsal, avgsal)
AS
SELECT d.department_name, MIN(e.salary), MAX(e.salary),AVG(e.salary)
FROM employees e, departments d
WHERE e.department_id = d.department_id
GROUP BY d.department_name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用视图对数据进行格式化<br> 我们经常需要输出某个格式的内容，比如我们想输出员工姓名和对应的部门名，对应格式为emp_name(department_name)，就可以使用视图来完成数据格式化的操作：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW emp_depart
AS
SELECT CONCAT(last_name,&#39;(&#39;,department_name,&#39;)&#39;) AS emp_dept
FROM employees e JOIN departments d
WHERE e.department_id = d.department_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3、基于视图创建视图" tabindex="-1"><a class="header-anchor" href="#_3、基于视图创建视图" aria-hidden="true">#</a> 3、基于视图创建视图</h4><p>当我们创建好一张视图之后，还可以在它的基础上继续创建视图。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE VIEW emp_dept_ysalary
AS
SELECT emp_dept.ename,dname,year_salary
FROM emp_dept INNER JOIN emp_year_salary
ON emp_dept.ename = emp_year_salary.ename;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、查看视图" tabindex="-1"><a class="header-anchor" href="#_3、查看视图" aria-hidden="true">#</a> 3、查看视图</h3><p>语法1：查看数据库的表对象、视图对象</p><div class="language-msyql line-numbers-mode" data-ext="msyql"><pre class="language-msyql"><code>SHOW TABLES;  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>语法2：查看视图的结构</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DESC / DESCRIBE 视图名称;  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>语法3：查看视图的属性信息</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>## 查看视图信息（显示数据表的存储引擎、版本、数据行数和数据大小等）
SHOW TABLE STATUS LIKE &#39;视图名称&#39;\\G #\\G为按列显示
#执行结果显示，注释Comment为VIEW，说明该表为视图，其他的信息为NULL，说明这是一个虚表。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>语法4：查看视图的详细定义信息</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW CREATE VIEW 视图名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4、更新视图的数据" tabindex="-1"><a class="header-anchor" href="#_4、更新视图的数据" aria-hidden="true">#</a> 4、更新视图的数据</h3><h4 id="_1、一般情况" tabindex="-1"><a class="header-anchor" href="#_1、一般情况" aria-hidden="true">#</a> 1、一般情况</h4><p>MySQL支持使用INSERT、UPDATE和DELETE语句对视图中的数据进行插入、更新和删除操作。当视图中的数据发生变化时，数据表中的数据也会发生变化，反之亦然。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT ename,tel FROM emp_tel WHERE ename = &#39;孙洪亮&#39;;
UPDATE emp_tel SET tel = &#39;13789091234&#39; WHERE ename = &#39;孙洪亮&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、不可更新的视图" tabindex="-1"><a class="header-anchor" href="#_2、不可更新的视图" aria-hidden="true">#</a> 2、不可更新的视图</h4><p>要使视图可更新，视图中的行和底层基本表中的行之间必须存在<strong>一对一</strong>的关系。另外当视图定义出现如下情况时，视图不支持更新操作：<br> 在定义视图的时候指定了“ALGORITHM = TEMPTABLE”，视图将不支持INSERT和DELETE操作；<br> 视图中不包含基表中所有被定义为非空又未指定默认值的列，视图将不支持INSERT操作；<br> 在定义视图的SELECT语句中使用了 <strong>JOIN联合查询</strong> ，视图将不支持INSERT和DELETE操作；<br> 在定义视图的SELECT语句后的字段列表中使用了 <strong>数学表达式</strong> 或<strong>子查询 <strong>，视图将不支持INSERT，也<br> 不支持UPDATE使用了数学表达式、子查询的字段值；<br> 在定义视图的SELECT语句后的字段列表中使用</strong>DISTINCT 、 聚合函数 、 GROUP BY 、 HAVING 、UNION 等，视图将不支持INSERT、UPDATE、DELETE</strong>；<br> 在定义视图的SELECT语句中包含了子查询，而子查询中引用了FROM后面的表，视图将不支持INSERT、UPDATE、DELETE；<br> 视图定义基于一个 <strong>不可更新视图</strong> ；<br> 常量视图。</p><p>总结：虽然可以更新视图数据，但总的来说，<strong>视图作为 虚拟表 ，主要用于方便查询</strong> ，<strong>不建议更新视图的数据。对视图数据的更改</strong>，都是通过对实际数据表里数据的操作来完成的。</p><h3 id="_5、修改、删除视图" tabindex="-1"><a class="header-anchor" href="#_5、修改、删除视图" aria-hidden="true">#</a> 5、修改、删除视图</h3><p>方式1：使用CREATE OR REPLACE VIEW 子句修改视图</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE OR REPLACE VIEW empvu80
(id_number, name, sal, department_id)
AS
SELECT employee_id, first_name || &#39; &#39; || last_name, salary, department_id
FROM employees
WHERE department_id = 80;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式2：ALTER VIEW</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER VIEW 视图名称
AS
查询语句
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、删除视图" tabindex="-1"><a class="header-anchor" href="#_6、删除视图" aria-hidden="true">#</a> 6、删除视图</h3><p>删除视图只是删除视图的定义，并不会删除基表的数据。<br> 删除视图的语法是：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP VIEW IF EXISTS 视图名称;
DROP VIEW IF EXISTS 视图名称1,视图名称2,视图名称3,...;

DROP VIEW empvu80;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：基于视图a、b创建了新的视图c，<strong>如果将视图a或者视图b删除，会导致视图c的查询失败</strong>。这样的<strong>视图c需要手动删除或修改</strong>，否则影响使用。</p><h3 id="_7、总结" tabindex="-1"><a class="header-anchor" href="#_7、总结" aria-hidden="true">#</a> 7、总结</h3><h4 id="_1、视图优点" tabindex="-1"><a class="header-anchor" href="#_1、视图优点" aria-hidden="true">#</a> 1、视图优点</h4><p>1、操作简单<br> 2、减少数据冗余<br> 3、数据安全<br> MySQL将用户对数据的 访问限制 在某些数据的结果集上，而这些数据的结果集可以使用视图来实现。用户不必直接查询或操作数据表。这也可以理解为视图 具有 隔离性 。视图相当于在用户和实际的数据表之间加了一层虚拟表。 同时，MySQL可以根据权限将用户对数据的访问限制在某些视图上，用户<strong>不需要查询 数据表，可以直接通过视图获取数据表中的信息</strong>。这在一定程度上保障了数据表中数据的安全性。<br> 4、适应灵活多变的需求<br> 5、能够分解复杂的查询逻辑</p><h4 id="_2、视图不足" tabindex="-1"><a class="header-anchor" href="#_2、视图不足" aria-hidden="true">#</a> 2、视图不足</h4><p>如果我们在实际数据表的基础上创建了视图，那么，<strong>如果实际数据表的结构变更了，我们就需要及时对相关的视图进行相应的维护</strong>。特别是嵌套的视图（就是在视图的基础上创建视图），维护会变得比较复杂， 可读性不好 ，容易变成系统的潜在隐患。因为创建视图的 SQL 查询可能会对字段重命名，也可能包含复杂的逻辑，这些都会增加维护的成本。实际项目中，如果视图过多，会导致数据库维护成本的问题。<br> 所以，在创建视图的时候，你要结合实际项目需求，综合考虑视图的优点和不足，这样才能正确使用视图，使系统整体达到最优。<br> 一旦存储过程被创建出来，使用它就像使用函数一样简单，我们直接通过调用存储过程名即可。相较于函数，存储过程是<strong>没有返回值</strong>的。</p><h2 id="_13、存储过程与函数" tabindex="-1"><a class="header-anchor" href="#_13、存储过程与函数" aria-hidden="true">#</a> 13、存储过程与函数</h2><h3 id="_1、存储过程概述" tabindex="-1"><a class="header-anchor" href="#_1、存储过程概述" aria-hidden="true">#</a> 1、存储过程概述</h3><p>含义：存储过程的英文是 Stored Procedure 。它的思想很简单，就是一组经过<strong>预先编译的 SQL 语句的封装</strong>。<br> 执行过程：存储过程<strong>预先存储在 MySQL 服务器上</strong>，需要执行的时候，客户端只需要<strong>向服务器端发出调用存储过程的命令</strong>，服务器端就可以把预先存储好的这一系列 SQL 语句全部执行。</p><p>分类：<br> 存储过程的参数类型可以是IN、OUT和INOUT。根据这点分类如下：<br> 1、没有参数（无参数无返回）<br> 2、仅仅带 IN 类型（有参数无返回）<br> 3、仅仅带 OUT 类型（无参数有返回）<br> 4、既带 IN 又带 OUT（有参数有返回） 5、带 INOUT（有参数有返回）<br> 注意：IN、OUT、INOUT 都可以在一个存储过程中带多个。</p><h3 id="_2、创建存储过程" tabindex="-1"><a class="header-anchor" href="#_2、创建存储过程" aria-hidden="true">#</a> 2、创建存储过程</h3><p>语法：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE PROCEDURE 存储过程名(IN|OUT|INOUT 参数名 参数类型,...)
[characteristics ...]
BEGIN
存储过程体
END
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IN ：当前参数为输入参数，也就是表示入参； 如果没有定义参数种类， <strong>默认就是 IN</strong> ，表示输入参数<br> OUT ：当前参数为输出参数，也就是表示出参；<br> INOUT ：当前参数既可以为输入参数，也可以为输出参数<br> characteristics 表示创建存储过程时指定的对存储过程的约束条件<br> 存储过程体中可以有多条 SQL 语句，如果仅仅一条SQL 语句，则可以省略 BEGIN 和 END</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#创建存储过程select_all_data()，查看 emps 表的所有数据
DELIMITER $
CREATE PROCEDURE select_all_data()
BEGIN
SELECT * FROM emps;
END $
DELIMITER ;

#创建存储过程avg_employee_salary()，返回所有员工的平均工资
DELIMITER //
CREATE PROCEDURE avg_employee_salary ()
BEGIN
SELECT AVG(salary) AS avg_salary FROM emps;
END //
DELIMITER ;

#创建存储过程show_someone_salary()，查看“emps”表的某个员工的薪资，并用IN参数empname输入员工姓名。
DELIMITER //
CREATE PROCEDURE show_someone_salary(IN empname VARCHAR(20))
BEGIN
SELECT salary FROM emps WHERE ename = empname;
END //
DELIMITER ;

#创建存储过程show_min_salary()，查看“emps”表的最低薪资值。并将最低薪资通过OUT参数“ms”输出
DELIMITER //
CREATE PROCEDURE show_min_salary(OUT ms DOUBLE)
BEGIN
SELECT MIN(salary) INTO ms FROM emps;
END //
DELIMITER ;

#创建存储过程show_mgr_name()，查询某个员工领导的姓名，并用INOUT参数“empname”输入员工姓名，输出领导的姓名
DELIMITER //
CREATE PROCEDURE show_mgr_name(INOUT empname VARCHAR(20))
BEGIN
SELECT ename INTO empname FROM emps
WHERE eid = (SELECT MID FROM emps WHERE ename=empname);
END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、调用存储过程" tabindex="-1"><a class="header-anchor" href="#_3、调用存储过程" aria-hidden="true">#</a> 3、调用存储过程</h3><p>存储过程有多种调用方法。存储过程必须使用CALL语句调用，并且存储过程和数据库相关，如果要执行其他数据库中的存储过程，需要指定数据库名称，例如CALL dbname.procname。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CALL 存储过程名(实参列表)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>1、调用in模式的参数：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CALL sp1(&#39;值&#39;);  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、调用out模式的参数：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET @name;	#定义变量
CALL sp1(@name);
SELECT @name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、调用inout模式的参数：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET @name=值;
CALL sp1(@name);
SELECT @name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELIMITER //
CREATE PROCEDURE CountProc(IN sid INT,OUT num INT)
BEGIN
SELECT COUNT(*) INTO num FROM fruits
WHERE s_id = sid;
END //
DELIMITER ;
#调用存储过程
mysql&gt; CALL CountProc (101, @num);
Query OK, 1 row affected (0.00 sec)
#查看返回结果
mysql&gt; SELECT @num;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、如何调试" tabindex="-1"><a class="header-anchor" href="#_4、如何调试" aria-hidden="true">#</a> 4、如何调试</h3><p>在 MySQL 中，存储过程不像普通的编程语言（比如 VC++、Java 等）那样有专门的集成开发环境。因此，你可以通过 SELECT 语句，把程序执行的中间结果查询出来，来调试一个 SQL 语句的正确性。调试成功之后，把 SELECT 语句后移到下一个 SQL 语句之后，再调试下一个 SQL 语句。这样 逐步推进 ，就可以完成对存储过程中所有操作的调试了。当然，你也可以把存储过程中的 SQL 语句复制出来，逐段单独调试</p><h3 id="_5、-存储函数的使用" tabindex="-1"><a class="header-anchor" href="#_5、-存储函数的使用" aria-hidden="true">#</a> 5、 存储函数的使用</h3><p>前面学习了很多函数，使用这些函数可以对数据进行的各种处理操作，极大地提高用户对数据库的管理效率。MySQL支持<strong>自定义函数</strong>，定义好之后，调用方式与调用MySQL预定义的系统函数一样。</p><p>语法格式：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE FUNCTION 函数名(参数名 参数类型,...)
RETURNS 返回值类型
[characteristics ...]
BEGIN
函数体 #函数体中肯定有 RETURN 语句
END
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：<br> 1、参数列表：指定参数为IN、OUT或INOUT只对PROCEDURE是合法的，FUNCTION中总是默认为IN参数。<br> 2、RETURNS type 语句表示函数返回数据的类型；RETURNS子句只能对FUNCTION做指定，对函数而言这是 强制 的。它用来指定函数的返回类型，而且函数体必须包含一个 RETURN value 语句。<br> 3、characteristic 创建函数时指定的对函数的约束。取值与创建存储过程时相同，这里不再赘述。<br> 4、函数体也可以用BEGIN…END来表示SQL代码的开始和结束。如果函数体只有一条语句，也可以省略BEGIN…END。</p><h3 id="_6、调用存储函数" tabindex="-1"><a class="header-anchor" href="#_6、调用存储函数" aria-hidden="true">#</a> 6、调用存储函数</h3><p>在MySQL中，存储函数的使用方法与MySQL内部函数的使用方法是一样的。换言之，用户自己定义的存储函数与MySQL内部函数是一个性质的。区别在于，存储函数是 用户自己定义 的，而内部函数是MySQL的 开发者定义 的。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 函数名(实参列表)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举例1：创建存储函数，名称为email_by_name()，参数定义为空，该函数查询Abel的email，并返回，数据类型为字符串型。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELIMITER //
CREATE FUNCTION email_by_name()
RETURNS VARCHAR(25)
DETERMINISTIC
CONTAINS SQL
BEGIN
		RETURN (SELECT email FROM employees WHERE last_name = &#39;Abel&#39;);
END //
DELIMITER ;
#调用
SELECT email_by_name();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例2：创建存储函数，名称为email_by_id()，参数传入emp_id，该函数查询emp_id的email，并返回，数据类型为字符串型。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELIMITER //
CREATE FUNCTION email_by_id(emp_id INT)
RETURNS VARCHAR(25)
DETERMINISTIC
CONTAINS SQL
BEGIN
	RETURN (SELECT email FROM employees WHERE employee_id = emp_id);
END //
DELIMITER ;
#调用：
SET @emp_id = 102;
SELECT email_by_id(102);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若在创建存储函数中报错“ you might want to use the less safelog_bin_trust_function_creators variable ”，有两种处理方法：<br> 方式1：加上必要的函数特性“[NOT] DETERMINISTIC”和“{CONTAINS SQL | NO SQL | READS SQL DATA |MODIFIES SQL DATA}<br> 方式2：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; SET GLOBAL log_bin_trust_function_creators = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>对比存储函数和存储过程</strong></p><table><thead><tr><th>关键字</th><th>调用语法</th><th>返回值</th><th>应用场景</th><th></th></tr></thead><tbody><tr><td>存储过程</td><td>PROCEDURE</td><td>CALL 存储过 程()</td><td>理解为有0个或 多个</td><td>一般用于更新</td></tr><tr><td>存储函数</td><td>FUNCTION</td><td>SELECT 函数 ()</td><td>只能是一个</td><td>一般用于查询结果为一个值并 返回时</td></tr></tbody></table><p>此外，<strong>存储函数可以放在查询语句中使用，存储过程不行</strong>。反之，存储过程的功能更加强大，包括能够执行对表的操作（比如创建表，删除表等）和事务操作，这些功能是存储函数不具备的。</p><h3 id="_7、存储过程和函数的查看、修改、删除" tabindex="-1"><a class="header-anchor" href="#_7、存储过程和函数的查看、修改、删除" aria-hidden="true">#</a> 7、存储过程和函数的查看、修改、删除</h3><h4 id="_1、查看" tabindex="-1"><a class="header-anchor" href="#_1、查看" aria-hidden="true">#</a> 1、查看</h4><p>MySQL存储了存储过程和函数的状态信息，用户可以使用SHOW STATUS语句或SHOW CREATE语句来查看，也可直接从系统的information_schema数据库中查询。这里介绍3种方法。</p><p>1、使用SHOW CREATE语句查看存储过程和函数的创建信息</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW CREATE {PROCEDURE | FUNCTION} 存储过程名或函数名

SHOW CREATE FUNCTION test_db.CountProc \\G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、使用SHOW STATUS语句查看存储过程和函数的状态信息</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW {PROCEDURE | FUNCTION} STATUS [LIKE &#39;pattern&#39;]

SHOW PROCEDURE STATUS LIKE &#39;SELECT%&#39; \\G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、从information_schema.Routines表中查看存储过程和函数的信息</p><p>MySQL中存储过程和函数的信息存储在information_schema数据库下的Routines表中。可以通过查询该表的记录来查询存储过程和函数的信息。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM information_schema.Routines
WHERE ROUTINE_NAME=&#39;存储过程或函数的名&#39; [AND ROUTINE_TYPE = {&#39;PROCEDURE|FUNCTION&#39;}];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：如果在MySQL数据库中存在存储过程和函数名称相同的情况，最好指定ROUTINE_TYPE查询条件来指明查询的是存储过程还是函数。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM information_schema.Routines
WHERE ROUTINE_NAME=&#39;count_by_id&#39; AND ROUTINE_TYPE = &#39;FUNCTION&#39; \\G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、修改" tabindex="-1"><a class="header-anchor" href="#_2、修改" aria-hidden="true">#</a> 2、修改 ：</h4><p>修改存储过程或函数，不影响存储过程或函数功能，只是修改相关特性。使用ALTER语句实现。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER {PROCEDURE | FUNCTION} 存储过程或函数的名 [characteristic ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，characteristic指定存储过程或函数的特性，其取值信息与创建存储过程、函数时的取值信息略有不同</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>{ CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
| SQL SECURITY { DEFINER | INVOKER }
| COMMENT &#39;string&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CONTAINS SQL ，表示子程序包含SQL语句，但不包含读或写数据的语句。<br> NO SQL ，表示子程序中不包含SQL语句。<br> READS SQL DATA ，表示子程序中包含读数据的语句。<br> MODIFIES SQL DATA ，表示子程序中包含写数据的语句。<br> SQL SECURITY { DEFINER | INVOKER } ，指明谁有权限来执行。<br> DEFINER ，表示只有定义者自己才能够执行。<br> INVOKER ，表示调用者可以执行。<br> COMMENT &#39;string&#39; ，表示注释信息。</p><p>修改存储过程使用ALTER PROCEDURE语句，修改存储函数使用ALTER FUNCTION语句。但是，这两个语句的结构是一样的，语句中的所有参数也是一样的</p><p>举例1：<br> 修改存储过程CountProc的定义。将读写权限改为MODIFIES SQL DATA，并指明调用者可以执行，代码如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER PROCEDURE CountProc
MODIFIES SQL DATA
SQL SECURITY INVOKER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询修改后的信息：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT specific_name,sql_data_access,security_type
FROM information_schema.\`ROUTINES\`
WHERE routine_name = &#39;CountProc&#39; AND routine_type = &#39;PROCEDURE&#39;;  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3、删除" tabindex="-1"><a class="header-anchor" href="#_3、删除" aria-hidden="true">#</a> 3、删除</h4><p>删除存储过程和函数，可以使用DROP语句，其语法结构如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP {PROCEDURE | FUNCTION} [IF EXISTS] 存储过程或函数的名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>IF EXISTS：如果程序或函数不存储，它可以防止发生错误，产生一个用SHOW WARNINGS查看的警告。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP PROCEDURE CountProc;
DROP FUNCTION CountProc;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8、存储过程的优缺点" tabindex="-1"><a class="header-anchor" href="#_8、存储过程的优缺点" aria-hidden="true">#</a> 8、存储过程的优缺点</h3><p>优点：<br> 1、存储过程可以一次编译多次使用。<br> 2、可以减少开发工作量<br> 3、存储过程的安全性强。<br> 4、可以减少网络传输量。<br> 5、良好的封装性。</p><p>缺点：<br> 1、良好的封装性<br> 2、调试困难<br> 3、调试困难<br> 4、它不适合高并发的场景。</p><p>小结：<br> 存储过程既方便，又有局限性。尽管不同的公司对存储过程的态度不一，但是对于我们开发人员来说，不论怎样，掌握存储过程都是必备的技能之一。</p><h2 id="_14、变量、流程控制与游标" tabindex="-1"><a class="header-anchor" href="#_14、变量、流程控制与游标" aria-hidden="true">#</a> 14、变量、流程控制与游标</h2><h3 id="_1、变量" tabindex="-1"><a class="header-anchor" href="#_1、变量" aria-hidden="true">#</a> 1、变量</h3><p>在MySQL数据库的存储过程和函数中，可以使用变量来存储查询或计算的中间结果数据，或者输出最终的结果数据<br> 在 MySQL 数据库中，变量分为<strong>系统变量</strong>以及<strong>用户自定义变量</strong>。</p><h4 id="_1、系统变量" tabindex="-1"><a class="header-anchor" href="#_1、系统变量" aria-hidden="true">#</a> 1、系统变量</h4><p>由系统定义，不是用户定义，属于<strong>服务器</strong>层面。 启动MySQL服务，生成MySQL服务实例期间，MySQL将为MySQL服务器内存中的系统变量赋值，这些系统变量定义了当前MySQL服务实例的属性、特征。这些系统变量的值要么是 编译MySQL时参数 的默认值，要么是 配置文件 （例如my.ini等）中的参数值。<br> 系统变量分为<strong>全局系统变量</strong>（需要添加 global 关键字）以及<strong>会话系统变量</strong>（需要添加 session 关键字），有时也把全局系统变量简称为全局变量，有时也把会话系统变量称为local变量 ，<strong>如果不写，默认会话级别</strong>。</p><p>每一个MySQL客户机成功连接MySQL服务器后，都会产生与之对应的会话。<br> 全局系统变量针对于所有会话（连接）有效，但 不能跨重启<br> 会话系统变量仅针对于当前会话（连接）有效。会话期间，当前会话对某个会话系统变量值的修改，不会影响其他会话同一个会话系统变量的值。<br> 会话1对某个全局系统变量值的修改会导致会话2中同一个全局系统变量值的修改</p><p>在MySQL中有些系统变量只能是全局的，例如 max_connections 用于限制服务器的最大连接数；有些系统变量作用域既可以是全局又可以是会话，例如 character_set_client 用于设置客户端的字符集；有些系统变量的作用域只能是当前会话，例如 pseudo_thread_id 用于标记当前会话的 MySQL 连接 ID。</p><h5 id="查看系统变量" tabindex="-1"><a class="header-anchor" href="#查看系统变量" aria-hidden="true">#</a> 查看系统变量</h5><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#查看所有全局变量
SHOW GLOBAL VARIABLES;
#查看所有会话变量
SHOW SESSION VARIABLES;
或 
SHOW VARIABLES; #默认查询的是会话系统变量

#查看满足条件的部分系统变量。
SHOW GLOBAL VARIABLES LIKE &#39;%标识符%&#39;;
#查看满足条件的部分会话变量
SHOW SESSION VARIABLES LIKE &#39;%标识符%&#39;;

#举例
SHOW GLOBAL VARIABLES LIKE &#39;admin_%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="查看指定系统变量" tabindex="-1"><a class="header-anchor" href="#查看指定系统变量" aria-hidden="true">#</a> 查看指定系统变量</h5><p>MySQL 中的系统变量以 <strong>两个“@” 开头</strong>，其中“@@global”仅用于标记全局系统变量，“@@session”仅用于标记会话系统变量。“@@”首先标记会话系统变量，如果会话系统变量不存在，则标记全局系统变量</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#查看指定的系统变量的值
SELECT @@global.变量名;
#查看指定的会话变量的值
SELECT @@session.变量名;
#或者
SELECT @@变量名; #先查询会话系统变量，再查询全局系统变量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="修改系统变量的值" tabindex="-1"><a class="header-anchor" href="#修改系统变量的值" aria-hidden="true">#</a> 修改系统变量的值</h5><p>有些时候，数据库管理员需要修改系统变量的默认值，以便修改当前会话或者MySQL服务实例的属性、特征。具体方法：<br> 方式1：修改MySQL 配置文件 ，继而修改MySQL系统变量的值（该方法需要重启MySQL服务）<br> 方式2：在MySQL服务运行期间，使用“set”命令重新设置系统变量的值</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#为某个系统变量赋值
#方式1：
SET @@global.变量名=变量值;
#方式2：
SET GLOBAL 变量名=变量值;
#针对于当前数据库实例是有效的，一旦重启mysql服务，就失效了

#为某个会话变量赋值
#方式1：
SET @@session.变量名=变量值;
#方式2：
SET SESSION 变量名=变量值;

#举例
SELECT @@global.autocommit;
SET GLOBAL autocommit=0;
SELECT @@session.tx_isolation;
SET @@session.tx_isolation=&#39;read-uncommitted&#39;;
SET GLOBAL max_connections = 1000;
SELECT @@global.max_connections;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、用户变量" tabindex="-1"><a class="header-anchor" href="#_2、用户变量" aria-hidden="true">#</a> 2、用户变量</h4><p>用户变量的分类：会话用户变量，局部变量</p><p>会话用户变量：使用‘@’开通，作用域为当前会话有效<br> 局部变量：只能使用在存储过程和存储函数中</p><h5 id="_1、会话用户变量" tabindex="-1"><a class="header-anchor" href="#_1、会话用户变量" aria-hidden="true">#</a> 1、会话用户变量</h5><h6 id="变量的声明和赋值" tabindex="-1"><a class="header-anchor" href="#变量的声明和赋值" aria-hidden="true">#</a> 变量的声明和赋值：</h6><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式1：“=”或“:=”
SET @用户变量 = 值;
SET @用户变量 := 值;
#方式2：“:=” 或 INTO关键字
SELECT @用户变量 := 表达式 [FROM 等子句];
SELECT 表达式 INTO @用户变量 [FROM 等子句];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="变量的使用" tabindex="-1"><a class="header-anchor" href="#变量的使用" aria-hidden="true">#</a> 变量的使用</h6><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT @用户变量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#举例
SET @a = 1;
SELECT @a;
SELECT @num := COUNT(*) FROM employees;
SELECT @num;
SELECT AVG(salary) INTO @avgsalary FROM employees;
SELECT @avgsalary;
SELECT @big; #查看某个未声明的变量时，将得到NULL值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2、局部变量" tabindex="-1"><a class="header-anchor" href="#_2、局部变量" aria-hidden="true">#</a> 2、局部变量</h5><p>局部变量：<br> ①必须使用DECLARE声明<br> ②声明并使用在BEGIN...END中（使用在存储过程，存储函数中）<br> ③DECLARE的方式声明的局部变量必须声明在BEGIN中的首行的位置</p><h6 id="定义变量" tabindex="-1"><a class="header-anchor" href="#定义变量" aria-hidden="true">#</a> 定义变量</h6><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DECLARE 变量名 类型 [default 值]; # 如果没有DEFAULT子句，初始值为NULL
#举例
DECLARE myparam INT DEFAULT 100;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="变量赋值" tabindex="-1"><a class="header-anchor" href="#变量赋值" aria-hidden="true">#</a> 变量赋值</h6><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式1：一般用于赋简单的值
SET 变量名=值;
SET 变量名:=值;
#方式2：一般用于赋表中的字段值
SELECT 字段名或表达式 INTO 变量名 FROM 表;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="使用变量-查看、比较、运算等" tabindex="-1"><a class="header-anchor" href="#使用变量-查看、比较、运算等" aria-hidden="true">#</a> 使用变量（查看、比较、运算等）</h6><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 局部变量名;

#举例1：声明局部变量，并分别赋值为employees表中employee_id为102的last_name和salary
DELIMITER //
CREATE PROCEDURE set_value()
BEGIN
DECLARE emp_name VARCHAR(25);
DECLARE sal DOUBLE(10,2);
SELECT last_name,salary INTO emp_name,sal
FROM employees
WHERE employee_id = 102;
SELECT emp_name,sal;
END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、定义条件与处理程序" tabindex="-1"><a class="header-anchor" href="#_2、定义条件与处理程序" aria-hidden="true">#</a> 2、定义条件与处理程序</h3><p>定义条件 是<strong>事先定义程序执行过程中可能遇到的问题</strong>，处理程序定义了在遇到问题时应当采取的处理方式，并且保证存储过程或函数在遇到警告或错误时能继续执行。这样可以增强存储程序处理问题的能力，避免程序异常停止运行。<br> 说明：定义条件和处理程序在存储过程、存储函数中都是支持的。</p><h4 id="定义条件" tabindex="-1"><a class="header-anchor" href="#定义条件" aria-hidden="true">#</a> 定义条件</h4><p>定义条件就是给MySQL中的错误码命名，这有助于存储的程序代码更清晰。它将一个 错误名字 和 指定的错误条件 关联起来。这个名字可以随后被用在定义处理程序的 DECLARE HANDLER 语句中。</p><p>定义条件使用DECLARE语句，语法格式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DECLARE 错误名称 CONDITION FOR 错误码（或错误条件）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>错误码的说明：<br> MySQL_error_code 和 sqlstate_value 都可以表示MySQL的错误。<br> MySQL_error_code是数值类型错误代码。<br> sqlstate_value是长度为5的字符串类型错误代码。<br> 例如，在ERROR 1418 (HY000)中，1418是MySQL_error_code，&#39;HY000&#39;是sqlstate_value。<br> 例如，在ERROR 1142（42000）中，1142是MySQL_error_code，&#39;42000&#39;是sqlstate_value。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#举例1：定义“Field_Not_Be_NULL”错误名与MySQL中违反非空约束的错误类型是“ERROR 1048 (23000)”对应。
#使用MySQL_error_code
DECLARE Field_Not_Be_NULL CONDITION FOR 1048;
#使用sqlstate_value
DECLARE Field_Not_Be_NULL CONDITION FOR SQLSTATE &#39;23000&#39;;

#举例2：定义&quot;ERROR 1148(42000)&quot;错误，名称为command_not_allowed。
#使用MySQL_error_code
DECLARE command_not_allowed CONDITION FOR 1148;
#使用sqlstate_value
DECLARE command_not_allowed CONDITION FOR SQLSTATE &#39;42000&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="定义处理程序" tabindex="-1"><a class="header-anchor" href="#定义处理程序" aria-hidden="true">#</a> 定义处理程序</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DECLARE 处理方式 HANDLER FOR 错误类型 处理语句  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://raw.githubusercontent.com/T4mako/ImageBed/main/image-20221114210010921.png" alt="image-20221114210010921" loading="lazy"></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方法1：捕获sqlstate_value
DECLARE CONTINUE HANDLER FOR SQLSTATE &#39;42S02&#39; SET @info = &#39;NO_SUCH_TABLE&#39;;
#方法2：捕获mysql_error_value
DECLARE CONTINUE HANDLER FOR 1146 SET @info = &#39;NO_SUCH_TABLE&#39;;
#方法3：先定义条件，再调用
DECLARE no_such_table CONDITION FOR 1146;
DECLARE CONTINUE HANDLER FOR NO_SUCH_TABLE SET @info = &#39;NO_SUCH_TABLE&#39;;
#方法4：使用SQLWARNING
DECLARE EXIT HANDLER FOR SQLWARNING SET @info = &#39;ERROR&#39;;
#方法5：使用NOT FOUND
DECLARE EXIT HANDLER FOR NOT FOUND SET @info = &#39;NO_SUCH_TABLE&#39;;
#方法6：使用SQLEXCEPTION
DECLARE EXIT HANDLER FOR SQLEXCEPTION SET @info = &#39;ERROR&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举例：创建一个名称为“InsertDataWithCondition”的存储过程，代码如下。<br> 在存储过程中，定义处理程序，捕获sqlstate_value值，当遇到sqlstate_value值为23000时，执行EXIT操作，并且将@proc_value的值设置为-1。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#准备工作
CREATE TABLE departments
AS
SELECT * FROM atguigudb.\`departments\`;
ALTER TABLE departments
ADD CONSTRAINT uk_dept_name UNIQUE(department_id);
DELIMITER //
CREATE PROCEDURE InsertDataWithCondition()
BEGIN
DECLARE duplicate_entry CONDITION FOR SQLSTATE &#39;23000&#39; ;
DECLARE EXIT HANDLER FOR duplicate_entry SET @proc_value = -1;
SET @x = 1;
INSERT INTO departments(department_name) VALUES(&#39;测试&#39;);
SET @x = 2;
INSERT INTO departments(department_name) VALUES(&#39;测试&#39;);
SET @x = 3;
END //
DELIMITER ;

#调用存储过程：
mysql&gt; CALL InsertDataWithCondition();
Query OK, 0 rows affected (0.01 sec)
mysql&gt; SELECT @x,@proc_value;
+------+-------------+
| @x | @proc_value |
+------+-------------+
| 2 | -1 |
+------+-------------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、流程控制" tabindex="-1"><a class="header-anchor" href="#_3、流程控制" aria-hidden="true">#</a> 3、流程控制</h3><p>针对于MySQL 的流程控制语句主要有 3 类。注意：只能用于存储程序。<br> 条件判断语句 ：IF 语句和 CASE 语句<br> 循环语句 ：LOOP、WHILE 和 REPEAT 语句<br> 跳转语句 ：ITERATE 和 LEAVE 语句</p><h4 id="_1、分支结构if" tabindex="-1"><a class="header-anchor" href="#_1、分支结构if" aria-hidden="true">#</a> 1、分支结构IF</h4><p>IF 语句的语法结构是：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>IF 表达式1 THEN 操作1
[ELSEIF 表达式2 THEN 操作2]……
[ELSE 操作N]
END IF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>特点：① 不同的表达式对应不同的操作 ② 使用在begin end中</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#举例1：
IF val IS NULL
THEN SELECT &#39;val is null&#39;;
ELSE SELECT &#39;val is not null&#39;;
END IF;

#举例2：声明存储过程“update_salary_by_eid1”，定义IN参数emp_id，输入员工编号。判断该员工薪资如果低于8000元并且入职时间超过5年，就涨薪500元；否则就不变。
DELIMITER //
CREATE PROCEDURE update_salary_by_eid1(IN emp_id INT)
BEGIN
DECLARE emp_salary DOUBLE;
DECLARE hire_year DOUBLE;
SELECT salary INTO emp_salary FROM employees WHERE employee_id = emp_id;
SELECT DATEDIFF(CURDATE(),hire_date)/365 INTO hire_year
FROM employees WHERE employee_id = emp_id;
IF emp_salary &lt; 8000 AND hire_year &gt; 5
THEN UPDATE employees SET salary = salary + 500 WHERE employee_id = emp_id;
END IF;
END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、分支结构之-case" tabindex="-1"><a class="header-anchor" href="#_2、分支结构之-case" aria-hidden="true">#</a> 2、分支结构之 CASE</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#CASE 语句的语法结构1：
CASE 表达式
WHEN 值1 THEN 结果1或语句1(如果是语句，需要加分号)
WHEN 值2 THEN 结果2或语句2(如果是语句，需要加分号)
...
ELSE 结果n或语句n(如果是语句，需要加分号)
END [case]（如果是放在begin end中需要加上case，如果放在select后面不需要）

#CASE 语句的语法结构2：
#情况二：类似于多重if
CASE
WHEN 条件1 THEN 结果1或语句1(如果是语句，需要加分号)
WHEN 条件2 THEN 结果2或语句2(如果是语句，需要加分号)
...
ELSE 结果n或语句n(如果是语句，需要加分号)
END [case]（如果是放在begin end中需要加上case，如果放在select后面不需要）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#使用CASE流程控制语句的第1种格式，判断val值等于1、等于2，或者两者都不等。
CASE val
WHEN 1 THEN SELECT &#39;val is 1&#39;;
WHEN 2 THEN SELECT &#39;val is 2&#39;;
ELSE SELECT &#39;val is not 1 or 2&#39;;
END CASE;

#举例4：声明存储过程update_salary_by_eid5，定义IN参数emp_id，输入员工编号。判断该员工的入职年限，如果是0年，薪资涨50；如果是1年，薪资涨100；如果是2年，薪资涨200；如果是3年，薪资涨300；如果是4年，薪资涨400；其他的涨薪500。
DELIMITER //
CREATE PROCEDURE update_salary_by_eid5(IN emp_id INT)
BEGIN
DECLARE emp_sal DOUBLE;
DECLARE hire_year DOUBLE;
SELECT salary INTO emp_sal FROM employees WHERE employee_id = emp_id;
SELECT ROUND(DATEDIFF(CURDATE(),hire_date)/365) INTO hire_year FROM employees
WHERE employee_id = emp_id;
CASE hire_year
WHEN 0 THEN UPDATE employees SET salary=salary+50 WHERE employee_id = emp_id;
WHEN 1 THEN UPDATE employees SET salary=salary+100 WHERE employee_id = emp_id;
WHEN 2 THEN UPDATE employees SET salary=salary+200 WHERE employee_id = emp_id;
WHEN 3 THEN UPDATE employees SET salary=salary+300 WHERE employee_id = emp_id;
WHEN 4 THEN UPDATE employees SET salary=salary+400 WHERE employee_id = emp_id;
ELSE UPDATE employees SET salary=salary+500 WHERE employee_id = emp_id;
END CASE;
END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3、循环结构之loop" tabindex="-1"><a class="header-anchor" href="#_3、循环结构之loop" aria-hidden="true">#</a> 3、循环结构之LOOP</h4><p>LOOP循环语句用来重复执行某些语句。LOOP内的语句一直重复执行直到循环被退出（使用LEAVE子句），跳出循环过程。</p><p>LOOP语句的基本格式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>[loop_label:] LOOP
	循环执行的语句
END LOOP [loop_label]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，loop_label表示LOOP语句的标注名称，该参数可以省略。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#举例1：使用LOOP语句进行循环操作，id值小于10时将重复执行循环过程。
DECLARE id INT DEFAULT 0;
add_loop:LOOP
	SET id = id +1;
	IF id &gt;= 10 THEN LEAVE add_loop;
	END IF;
END LOOP add_loop;

#举例2：当市场环境变好时，公司为了奖励大家，决定给大家涨工资。声明存储过程“update_salary_loop()”，声明OUT参数num，输出循环次数。存储过程中实现循环给大家涨薪，薪资涨为原来的1.1倍。直到全公司的平均薪资达到12000结束。并统计循环次数。
DELIMITER //
CREATE PROCEDURE update_salary_loop(OUT num INT)
BEGIN
	DECLARE avg_salary DOUBLE;
	DECLARE loop_count INT DEFAULT 0;
	SELECT AVG(salary) INTO avg_salary FROM employees;
	label_loop:LOOP
		IF avg_salary &gt;= 12000 THEN LEAVE label_loop;
		END IF;
		UPDATE employees SET salary = salary * 1.1;
		SET loop_count = loop_count + 1;
		SELECT AVG(salary) INTO avg_salary FROM employees;
	END LOOP label_loop;
	SET num = loop_count;
	END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4、循环结构之while" tabindex="-1"><a class="header-anchor" href="#_4、循环结构之while" aria-hidden="true">#</a> 4、循环结构之WHILE</h4><p>WHILE语句创建一个带条件判断的循环过程。WHILE在执行语句执行时，先对指定的表达式进行判断，如果为真，就执行循环内的语句，否则退出循环。WHILE语句的基本格式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>[while_label:] WHILE 循环条件 DO
循环体
END WHILE [while_label];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#举例1：WHILE语句示例，i值小于10时，将重复执行循环过程，代码如下：
DELIMITER //
CREATE PROCEDURE test_while()
BEGIN
	DECLARE i INT DEFAULT 0;
	WHILE i &lt; 10 DO
		SET i = i + 1;
	END WHILE;
	SELECT i;
END //
DELIMITER ;
#调用
CALL test_while();

#举例2：市场环境不好时，公司为了渡过难关，决定暂时降低大家的薪资。声明存储过程“update_salary_while()”，声明OUT参数num，输出循环次数。存储过程中实现循环给大家降薪，薪资降为原来的90%。直到全公司的平均薪资达到5000结束。并统计循环次数。
DELIMITER //
CREATE PROCEDURE update_salary_while(OUT num INT)
BEGIN
	DECLARE avg_sal DOUBLE ;
	DECLARE while_count INT DEFAULT 0;
	SELECT AVG(salary) INTO avg_sal FROM employees;
	WHILE avg_sal &gt; 5000 DO
		UPDATE employees SET salary = salary * 0.9;
		SET while_count = while_count + 1;
		SELECT AVG(salary) INTO avg_sal FROM employees;
	END WHILE;
	SET num = while_count;
END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5、循环结构之repeat" tabindex="-1"><a class="header-anchor" href="#_5、循环结构之repeat" aria-hidden="true">#</a> 5、循环结构之REPEAT</h4><p>REPEAT语句创建一个带条件判断的循环过程。与WHILE循环不同的是，<strong>REPEAT 循环首先会执行一次循环</strong>，然后在 UNTIL 中进行表达式的判断，如果满足条件就退出，即 END REPEAT；如果条件不满足，则会就继续执行循环，直到满足退出条件为止。</p><p>REPEAT语句的基本格式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>[repeat_label:] REPEAT
	循环体的语句
UNTIL 结束循环的条件表达式  #没有分号 
END REPEAT [repeat_label]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>repeat_label为REPEAT语句的标注名称，该参数可以省略；REPEAT语句内的语句或语句群被重复，直至expr_condition为真。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#举例1：
DELIMITER //
CREATE PROCEDURE test_repeat()
BEGIN
	DECLARE i INT DEFAULT 0;
	REPEAT
		SET i = i + 1;
	UNTIL i &gt;= 10
	END REPEAT;
	SELECT i;
END //
DELIMITER ;

#举例2：当市场环境变好时，公司为了奖励大家，决定给大家涨工资。声明存储过程“update_salary_repeat()”，声明OUT参数num，输出循环次数。存储过程中实现循环给大家涨薪，薪资涨为原来的1.15倍。直到全公司的平均薪资达到13000结束。并统计循环次数。
DELIMITER //
CREATE PROCEDURE update_salary_repeat(OUT num INT)
BEGIN
	DECLARE avg_sal DOUBLE ;
	DECLARE repeat_count INT DEFAULT 0;
	SELECT AVG(salary) INTO avg_sal FROM employees;
	REPEAT
		UPDATE employees SET salary = salary * 1.15;
		SET repeat_count = repeat_count + 1;
		SELECT AVG(salary) INTO avg_sal FROM employees;
	UNTIL avg_sal &gt;= 13000
	END REPEAT;
	SET num = repeat_count;
END //
DELIMITER ;	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6、跳转语句之leave语句" tabindex="-1"><a class="header-anchor" href="#_6、跳转语句之leave语句" aria-hidden="true">#</a> 6、跳转语句之LEAVE语句</h4><p>LEAVE语句：可以用在循环语句内，或者以 BEGIN 和 END 包裹起来的程序体内，表示跳出循环或者跳出程序体的操作。如果你有面向过程的编程语言的使用经验，你可以把 LEAVE 理解为 break。</p><p>基本格式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>LEAVE 标记名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，label参数表示循环的标志。LEAVE和BEGIN ... END或循环一起被使用。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#举例1：创建存储过程 “leave_begin()”，声明INT类型的IN参数num。给BEGIN...END加标记名，并在BEGIN...END中使用IF语句判断num参数的值
#如果num&lt;=0，则使用LEAVE语句退出BEGIN...END；
#如果num=1，则查询“employees”表的平均薪资；
#如果num=2，则查询“employees”表的最低薪资；
#如果num&gt;2，则查询“employees”表的最高薪资。
#IF语句结束后查询“employees”表的总人数。
DELIMITER //
CREATE PROCEDURE leave_begin(IN num INT)
	begin_label: BEGIN
		IF num&lt;=0
			THEN LEAVE begin_label;
		ELSEIF num=1
			THEN SELECT AVG(salary) FROM employees;
		ELSEIF num=2
			THEN SELECT MIN(salary) FROM employees;
		ELSE
			SELECT MAX(salary) FROM employees;
		END IF;
		SELECT COUNT(*) FROM employees;
	END //
DELIMITER ;

#举例2：市场环境不好时，公司为了渡过难关，决定暂时降低大家的薪资。声明存储过程“leave_while()”，声明OUT参数num，输出循环次数，存储过程中使用WHILE循环给大家降低薪资为原来薪资的90%，直到全公司的平均薪资小于等于10000，并统计循环次数
DELIMITER //
CREATE PROCEDURE leave_while(OUT num INT)
BEGIN
	DECLARE avg_sal DOUBLE;#记录平均工资
	DECLARE while_count INT DEFAULT 0; #记录循环次数
	SELECT AVG(salary) INTO avg_sal FROM employees; #① 初始化条件
	while_label:WHILE TRUE DO #② 循环条件
		#③ 循环体
		IF avg_sal &lt;= 10000 THEN
			LEAVE while_label;
		END IF;
		UPDATE employees SET salary = salary * 0.9;
		SET while_count = while_count + 1;
		#④ 迭代条件
		SELECT AVG(salary) INTO avg_sal FROM employees;
	END WHILE;
	#赋值
	SET num = while_count;
END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7、跳转语句之iterate语句" tabindex="-1"><a class="header-anchor" href="#_7、跳转语句之iterate语句" aria-hidden="true">#</a> 7、跳转语句之ITERATE语句</h4><p>ITERATE语句：只能用在循环语句（LOOP、REPEAT和WHILE语句）内，表示重新开始循环，将执行顺序转到语句段开头处。如果你有面向过程的编程语言的使用经验，你可以把 ITERATE 理解为 continue，意思为“再次循环”。</p><p>语句基本格式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ITERATE label
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>label参数表示循环的标志。ITERATE语句必须跟在循环标志前面。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#举例： 定义局部变量num，初始值为0。循环结构中执行num + 1操作。如果num &lt; 10，则继续执行循环；如果num &gt; 15，则退出循环结构；
DELIMITER //
CREATE PROCEDURE test_iterate()
BEGIN
	DECLARE num INT DEFAULT 0;
	my_loop:LOOP
		SET num = num + 1;
		IF num &lt; 10
			THEN ITERATE my_loop;
		ELSEIF num &gt; 15
			THEN LEAVE my_loop;
		END IF;
		SELECT &#39;尚硅谷：让天下没有难学的技术&#39;;
	END LOOP my_loop;
END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、游标" tabindex="-1"><a class="header-anchor" href="#_4、游标" aria-hidden="true">#</a> 4、游标</h3><p>游标，提供了一种灵活的操作方式，让我们能够对结果集中的<strong>每一条记录进行定位</strong>，并对指向的记录中的数据进行操作的数据结构。游标让 SQL 这种面向集合的语言有了<strong>面向过程开发的能力</strong>。 **充当了指针的作用 **<br> MySQL中游标可以在存储过程和函数中使用。</p><h4 id="_1、使用游标步骤" tabindex="-1"><a class="header-anchor" href="#_1、使用游标步骤" aria-hidden="true">#</a> 1、使用游标步骤</h4><p>游标必须在声明处理程序之前被声明，并且变量和条件还必须在声明游标或处理程序之前被声明。<br> 如果我们想要使用游标，一般需要经历四个步骤。不同的 DBMS 中，使用游标的语法可能略有不同。</p><p>第一步，声明游标<br> 在MySQL中，使用DECLARE关键字来声明游标，其语法的基本形式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DECLARE cursor_name CURSOR FOR select_statement;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要使用 SELECT 语句来获取数据结果集，而此时还没有开始遍历数据，这里 select_statement 代表的是SELECT 语句，返回一个用于创建游标的结果集<br> 比如：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DECLARE cur_emp CURSOR FOR SELECT employee_id,salary FROM employees;
DECLARE cursor_fruit CURSOR FOR SELECT f_name, f_price FROM fruits ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、打开游标" tabindex="-1"><a class="header-anchor" href="#_2、打开游标" aria-hidden="true">#</a> 2、打开游标</h4><p>打开游标的语法如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>OPEN cursor_name  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们定义好游标之后，如果想要使用游标，必须先打开游标。打开游标的时候 SELECT 语句的查询结果集就会送到游标工作区，为后面游标的 逐条读取 结果集中的记录做准备</p><h4 id="_3、使用游标-从游标中取得数据" tabindex="-1"><a class="header-anchor" href="#_3、使用游标-从游标中取得数据" aria-hidden="true">#</a> 3、使用游标（从游标中取得数据）</h4><p>语法如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>FETCH cursor_name INTO var_name [, var_name] ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这句的作用是<strong>使用 cursor_name 这个游标来读取当前行</strong>，并且将数据保存到 var_name 这个变量中，游标指针指到下一行。如果游标<strong>读取的数据行有多个列名</strong>，则在 INTO <strong>关键字后面赋值给多个变量名</strong>即可<br> 注意：var_name必须在声明游标之前就定义好。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>FETCH cur_emp INTO emp_id, emp_sal ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：游标的<strong>查询结果集中的字段数</strong>，<strong>必须跟 INTO 后面的变量数一致</strong>，否则，在存储过程执行的时候，MySQL 会提示错误。</p><h4 id="_4、关闭游标" tabindex="-1"><a class="header-anchor" href="#_4、关闭游标" aria-hidden="true">#</a> 4、关闭游标</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CLOSE cursor_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>关闭游标之后，我们就不能再检索查询结果中的数据行，如果需要检索只能再次打开游标。</p><h4 id="_5、举例" tabindex="-1"><a class="header-anchor" href="#_5、举例" aria-hidden="true">#</a> 5、举例</h4><p>创建存储过程“get_count_by_limit_total_salary()”，声明IN参数 limit_total_salary，DOUBLE类型；声明OUT参数total_count，INT类型。函数的功能可以实现累加薪资最高的几个员工的薪资值，直到薪资总和达到limit_total_salary参数的值，返回累加的人数给total_count。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELIMITER //
CREATE PROCEDURE get_count_by_limit_total_salary(IN limit_total_salary DOUBLE,OUT total_count INT)
BEGIN
	DECLARE sum_salary DOUBLE DEFAULT 0; #记录累加的总工资
	DECLARE cursor_salary DOUBLE DEFAULT 0; #记录某一个工资值
	DECLARE emp_count INT DEFAULT 0; #记录循环个数
	#定义游标
	DECLARE emp_cursor CURSOR FOR SELECT salary FROM employees ORDER BY salary DESC;
#打开游标
	OPEN emp_cursor;
	REPEAT
		#使用游标（从游标中获取数据）
		FETCH emp_cursor INTO cursor_salary;
		SET sum_salary = sum_salary + cursor_salary;
		SET emp_count = emp_count + 1;
		UNTIL sum_salary &gt;= limit_total_salary
	END REPEAT;
	SET total_count = emp_count;
	#关闭游标
	CLOSE emp_cursor;
END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_15、触发器" tabindex="-1"><a class="header-anchor" href="#_15、触发器" aria-hidden="true">#</a> 15、触发器</h2><h3 id="_1、触发器概述" tabindex="-1"><a class="header-anchor" href="#_1、触发器概述" aria-hidden="true">#</a> 1、触发器概述</h3><p>触发器是由 事件来触发 某个操作，这些事件包括 INSERT 、 UPDATE 、 DELETE 事件。所谓事件就是指用户的动作或者触发某项行为。如果定义了触发程序，当数据库执行这些语句时候，就相当于事件发生了，就会 自动 激发触发器执行相应的操作 （商品信息与库存信息一同变更）</p><p>当对数据表中的数据执行插入、更新和删除操作，需要自动执行一些数据库逻辑时，可以使用触发器来实现。</p><h3 id="_2、触发器的创建" tabindex="-1"><a class="header-anchor" href="#_2、触发器的创建" aria-hidden="true">#</a> 2、触发器的创建</h3><p>创建触发器语法 ：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TRIGGER 触发器名称
{BEFORE|AFTER} {INSERT|UPDATE|DELETE} ON 表名
FOR EACH ROW
触发器执行的语句块;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表名 ：表示触发器监控的对象<br> BEFORE|AFTER ：表示触发的时间。BEFORE 表示在事件之前触发；AFTER 表示在事件之后触发。<br> INSERT|UPDATE|DELETE ：表示触发的事件。<br> INSERT 表示插入记录时触发；<br> UPDATE 表示更新记录时触发；<br> DELETE 表示删除记录时触发。<br> 触发器执行的语句块 ：可以是单条SQL语句，也可以是由BEGIN…END结构组成的复合语句块</p><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELIMITER //
CREATE TRIGGER before_insert
BEFORE INSERT ON test_trigger
FOR EACH ROW
BEGIN
INSERT INTO test_trigger_log (t_log)
VALUES(&#39;before_insert&#39;);
END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#定义触发器“salary_check_trigger”，基于员工表“employees”的INSERT事件，在INSERT之前检查将要添加的新员工薪资是否大于他领导的薪资，如果大于领导薪资，则报sqlstate_value为&#39;HY000&#39;的错误，从而使得添加失败。
DELIMITER //
CREATE TRIGGER salary_check_trigger
BEFORE INSERT ON employees FOR EACH ROW
BEGIN
DECLARE mgrsalary DOUBLE;
SELECT salary INTO mgrsalary FROM employees WHERE employee_id = NEW.manager_id;
IF NEW.salary &gt; mgrsalary THEN
SIGNAL SQLSTATE &#39;HY000&#39; SET MESSAGE_TEXT = &#39;薪资高于领导薪资错误&#39;;
END IF;
END //
DELIMITER ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、查看、删除触发器" tabindex="-1"><a class="header-anchor" href="#_3、查看、删除触发器" aria-hidden="true">#</a> 3、查看、删除触发器</h3><p>查看触发器是查看数据库中已经存在的触发器的定义、状态和语法信息等。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#方式1：查看当前数据库的所有触发器的定义
SHOW TRIGGERS\\G
#方式2：查看当前数据库中某个触发器的定义
SHOW CREATE TRIGGER 触发器名
#方式3：从系统库information_schema的TRIGGERS表中查询“salary_check_trigger”触发器的信息。
SELECT * FROM information_schema.TRIGGERS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>触发器也是数据库对象，删除触发器也用DROP语句，语法格式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP TRIGGER IF EXISTS 触发器名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4、触发器的优缺点" tabindex="-1"><a class="header-anchor" href="#_4、触发器的优缺点" aria-hidden="true">#</a> 4、触发器的优缺点</h3><p>优点：<br> 1、触发器可以确保数据的完整性<br> 2、触发器可以帮助我们记录操作日志<br> 3、触发器还可以用在操作数据前，对数据进行合法性检查</p><p>缺点：<br> 1、触发器最大的一个问题就是可读性差。<br> 2、相关数据的变更，可能会导致触发器出错</p>`,729),l=[a];function r(t,v){return n(),i("div",null,l)}const u=e(s,[["render",r],["__file","MySQL基础.html.vue"]]);export{u as default};
