import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as v,c as o,b as e,d as a,e as c,w as d,f as p,p as r,h as u}from"./app-f0b774af.js";const h={},n=l=>(r("data-v-722e29ec"),l=l(),u(),l),_=p(`<h2 id="_1-结构化程序定义以及优缺点-真题" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_1-结构化程序定义以及优缺点-真题" aria-hidden="true" data-v-722e29ec>#</a> 1. 结构化程序定义以及优缺点（真题）</h2><p data-v-722e29ec>采用了 <strong data-v-722e29ec>模块分解</strong>，<strong data-v-722e29ec>功能抽象</strong>，<strong data-v-722e29ec>自顶向下</strong>、分而治之的方法，从而有效地将一个较复杂的程序系统设计 <strong data-v-722e29ec>任务分解</strong> 成许多易于控制和处理的子 <strong data-v-722e29ec>程序</strong>，便于开发和维护。它的重点在于把功能进行分解。结构化程序设计是 <strong data-v-722e29ec>面向过程</strong> 的。</p><p data-v-722e29ec>优点：<br data-v-722e29ec> 性能比面向对象高<br data-v-722e29ec> 结构化程序先确定主要系统功能，然后 <strong data-v-722e29ec>逐层深入</strong>，<strong data-v-722e29ec>由简到难</strong>，逐渐将一个大致的总体结构具体化，最终全部实现其功能。考虑问题的方式较为合理。<br data-v-722e29ec> 结构化的模块化使问题难度降低，编写程序也 <strong data-v-722e29ec>更加简明</strong>，<strong data-v-722e29ec>可读性高</strong>。</p><p data-v-722e29ec>缺点：<br data-v-722e29ec> 没有面向对象易维护、易复用、易扩展<br data-v-722e29ec> 结构化由于要对一个整体问题不断分解，要处理的条件和信息也会越来越多，有时候会给开发人员编程时造成麻烦，使得结构化方法能处理的 <strong data-v-722e29ec>复杂问题难度有一定的限制</strong>。<br data-v-722e29ec> 由于于在实际开发过程当中需求会经常发生变化，因此，它 <strong data-v-722e29ec>不能很好的适应需求变化</strong> 的开发过程。</p><h2 id="_2-面向对象程序定义以及优缺点" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_2-面向对象程序定义以及优缺点" aria-hidden="true" data-v-722e29ec>#</a> 2. 面向对象程序定义以及优缺点</h2><p data-v-722e29ec>面向对象，简单理解就是语言中的所有操作都是通过对象来进行的，以兑现、数据为中心，具有明确的分工。</p><p data-v-722e29ec>优点：易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统更加灵活、更加易于维护，且成本较低。程序的鲁棒性好，开发效率和质量高。</p><p data-v-722e29ec>缺点：性能比面向过程低，对于开发人员抽象对象的能力有很高的要求，对于对象的建立不但要准确，还要全面，并且符合模块的要求</p><h2 id="_3-数组及链表处理数据的优缺点-真题" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_3-数组及链表处理数据的优缺点-真题" aria-hidden="true" data-v-722e29ec>#</a> 3. 数组及链表处理数据的优缺点（真题）</h2><p data-v-722e29ec>数组和链表都是线性表</p><p data-v-722e29ec>数组：</p><ul data-v-722e29ec><li data-v-722e29ec>在内存上占用连续的存储空间，有空间限制</li><li data-v-722e29ec>内存占用较少</li><li data-v-722e29ec>查找，存取方便，适合随机查找</li><li data-v-722e29ec>插入、删除操作不方便，因为插入、删除操作会导致大量元素的移动</li></ul><p data-v-722e29ec>链表：</p><ul data-v-722e29ec><li data-v-722e29ec>内存地址上可以是不连续的，无空间限制，存储大小与内存空间有关</li><li data-v-722e29ec>由于存放指针数据，内存占用更多</li><li data-v-722e29ec>查找速度慢，查找时需要从开始节点一个一个节点去查找元素访问</li><li data-v-722e29ec>插入、删除速度快，插入或者删除一个元素时，只需要改变指针指向即可</li></ul><h2 id="_4-arraylist-和-linkedlist-的优缺点" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_4-arraylist-和-linkedlist-的优缺点" aria-hidden="true" data-v-722e29ec>#</a> 4. ArrayList 和 LinkedList 的优缺点</h2><p data-v-722e29ec>ArrayList 是数组的数据结构，LinkedList 是链表的数据结构。</p><p data-v-722e29ec>随机访问的时候，ArrayList 的效率比较高，因为LinkedList 要移动指针，而 ArrayList 是基于索引（index）的数据结构，可以直接映射到。</p><p data-v-722e29ec>插入、删除数据时，LinkedList 的效率比较高，因为 ArrayList 要移动数据。LinkedList 比 ArrayList 开销更大，因为 LinkedList 的节点除了存储数据，还需要存储引用。</p><h2 id="_5-treeset-实现排序的方式" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_5-treeset-实现排序的方式" aria-hidden="true" data-v-722e29ec>#</a> 5. TreeSet 实现排序的方式</h2><ul data-v-722e29ec><li data-v-722e29ec>一种是数据类实现 Comparable&lt;&gt; 方法，重写 compareTo(Object o) 方法</li><li data-v-722e29ec>另一种是创建 Comparetor 比较器的匿名类的对象实现 compare(Object o1, Object o2) 方法传入 TreeSet 的构造器中</li></ul><h2 id="_6-基本数据类型有哪些" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_6-基本数据类型有哪些" aria-hidden="true" data-v-722e29ec>#</a> 6. 基本数据类型有哪些</h2><p data-v-722e29ec>byte、short、char、int、long、float、double、boolean</p><h2 id="_7-public-private-公私有成员变量的区别-真题" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_7-public-private-公私有成员变量的区别-真题" aria-hidden="true" data-v-722e29ec>#</a> 7. public / private 公私有成员变量的区别（真题）</h2><p data-v-722e29ec>Java 权限修饰符 public、protected、private 置于类的成员前，用来限定对象对该类成员的权限访问</p><ul data-v-722e29ec><li data-v-722e29ec>private 定义的成员变量和方法只能由类内部访问</li><li data-v-722e29ec>缺省权限修饰符的成员变量可以由类内部和同一个包下访问</li><li data-v-722e29ec>protected 定义的成员变量可以被类内部，同一个包下的类和不同包下的子类访问</li><li data-v-722e29ec>public 定义的成员变量可以在同一个工程下的类访问</li></ul><div class="hint-container info" data-v-722e29ec><p class="hint-container-title" data-v-722e29ec>相关信息</p><p data-v-722e29ec>权限修饰符可以修饰类及类的内部结构：属性、方法、构造器、内部类<br data-v-722e29ec> 修饰类只能使用：「缺省」、「public」</p></div><h2 id="_8-面向对象程序设计三个特点-并解释其含义-真题" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_8-面向对象程序设计三个特点-并解释其含义-真题" aria-hidden="true" data-v-722e29ec>#</a> 8. 面向对象程序设计三个特点，并解释其含义（真题）</h2><ul data-v-722e29ec><li data-v-722e29ec>封装：实现数据隐藏，用户无需知道内部工作流程，只要知道接口和操作就可以的</li><li data-v-722e29ec>继承：从现有的类型派生出新的子类</li><li data-v-722e29ec>多态：是同一个行为具有多个不同表现形式或形态的能力</li></ul><h2 id="_9-抽象类和接口的定义以及区别-真题" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_9-抽象类和接口的定义以及区别-真题" aria-hidden="true" data-v-722e29ec>#</a> 9. 抽象类和接口的定义以及区别（真题）</h2><p data-v-722e29ec>抽象类的定义是 <code data-v-722e29ec>(public) abstract class</code> 类名<br data-v-722e29ec> 接口的定义是 <code data-v-722e29ec>interface</code> 接口名</p><p data-v-722e29ec>抽象类：</p><ul data-v-722e29ec><li data-v-722e29ec>抽象类不能实例化</li><li data-v-722e29ec>可以定义常量和变量</li><li data-v-722e29ec>抽象类中一定有构造器，便于子类实例化时调用</li><li data-v-722e29ec>可以有抽象方法和非抽象方法，不能有 default 方法</li><li data-v-722e29ec>抽象类的子类可以选择是否重写抽象方法，若子类重写了所有抽象方法，则该类就不再是抽象类。否则该类依然是抽象类</li><li data-v-722e29ec>继承抽象类时使用 extends 关键字</li><li data-v-722e29ec>一个类只能继承一个抽象类</li></ul><p data-v-722e29ec>接口：</p><ul data-v-722e29ec><li data-v-722e29ec>接口不能实例化</li><li data-v-722e29ec>接口可以定义全局常量，默认省略 <code data-v-722e29ec>public static final</code>，不能定义变量</li><li data-v-722e29ec>接口不能定义构造器</li><li data-v-722e29ec>可以定义抽象方法，默认省略 <code data-v-722e29ec>public abstract</code><br data-v-722e29ec> JDK 8 及以后的版本可以定义静态方法（<code data-v-722e29ec>public static</code>）和默认方法 （<code data-v-722e29ec>public default</code>）</li><li data-v-722e29ec>如果实现类覆盖了接口中的所有抽象方法，则此实现类就可以实例化<br data-v-722e29ec> 如果实现类没有覆盖接口中所有抽象方法，则此实现类仍为一个抽象类</li><li data-v-722e29ec>实现接口时使用 implements 关键字</li><li data-v-722e29ec>一个类可以实现多个接口</li></ul><h2 id="_10-重载与重写的区别" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_10-重载与重写的区别" aria-hidden="true" data-v-722e29ec>#</a> 10. 重载与重写的区别</h2><p data-v-722e29ec>重载：</p><ul data-v-722e29ec><li data-v-722e29ec>在 <code data-v-722e29ec>同一个类</code> 中，允许存在一个以上的 <code data-v-722e29ec>同名方法</code></li><li data-v-722e29ec>只要它们的 <code data-v-722e29ec>参数个数</code> 或 <code data-v-722e29ec>参数类型不同</code> 即可</li><li data-v-722e29ec>方法的 <code data-v-722e29ec>返回类型</code> 和 <code data-v-722e29ec>参数的名字</code> 不参与比较</li></ul><p data-v-722e29ec>重写：</p><ul data-v-722e29ec><li data-v-722e29ec>子类继承父类后，可以对父类中 <code data-v-722e29ec>同名同参数</code> 的方法，进行覆盖操作</li><li data-v-722e29ec>重写后，创建子类对象，通过子类对象调用父类中的同名参数的方法时，实际执行 <code data-v-722e29ec>子类重写父类</code> 的方法</li><li data-v-722e29ec>重写的规定： <ul data-v-722e29ec><li data-v-722e29ec>子类重写的方法和父类中被重写的方法的 <code data-v-722e29ec>方法名和形参列表相同</code></li><li data-v-722e29ec>子类重写方法的 <code data-v-722e29ec>权限修饰符不小于父类</code> 被重写的方法的权限修饰符 <ul data-v-722e29ec><li data-v-722e29ec>子类不能重写父类中声明为 private 权限的方法</li></ul></li><li data-v-722e29ec>返回值类型： <ul data-v-722e29ec><li data-v-722e29ec>父类被重写方法的返回值是 <code data-v-722e29ec>void</code>，则子类重写的方法的返回值类型只能是 <code data-v-722e29ec>void</code></li><li data-v-722e29ec>父类被重写的方法的返回值类型是 <code data-v-722e29ec>A 类型</code>，则子类重写的方法的返回值类型可以是 <code data-v-722e29ec>A 类或 A 类的子类</code></li><li data-v-722e29ec>父类被重写的方法的返回值类型是 <code data-v-722e29ec>基本数据类型</code> 则子类重写的方法的返回值类型必须是 <code data-v-722e29ec>相同的基本数据类型</code></li></ul></li><li data-v-722e29ec>子类重写的方法抛出的异常类型 <code data-v-722e29ec>不大于父类</code> 被重写的方法抛出的 <code data-v-722e29ec>异常类型</code></li></ul></li></ul><h2 id="_11-根据-uml-图解释类的关系-根据类的关系画-uml-类图-真题" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_11-根据-uml-图解释类的关系-根据类的关系画-uml-类图-真题" aria-hidden="true" data-v-722e29ec>#</a> 11. 根据 uml 图解释类的关系，根据类的关系画 uml 类图（真题）</h2><h2 id="_12-对象图类之间的关系有哪些-分别描述" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_12-对象图类之间的关系有哪些-分别描述" aria-hidden="true" data-v-722e29ec>#</a> 12. 对象图类之间的关系有哪些，分别描述</h2><ul data-v-722e29ec><li data-v-722e29ec>泛化（继承）关系（Generalization/extends） <ul data-v-722e29ec><li data-v-722e29ec>UML 中的泛化关系（Generalization）就是值指类或接口的继承关系</li><li data-v-722e29ec>继承用「实线空心箭头」表示，由子类指向父类。</li></ul></li><li data-v-722e29ec>实现关系（implements） <ul data-v-722e29ec><li data-v-722e29ec>指的是一个 class 类实现 interface 接口（可以是多个）的功能</li><li data-v-722e29ec>实现使用「虚线空心箭头」表示，由实现类指向接口</li></ul></li><li data-v-722e29ec>组合关系（Composition） <ul data-v-722e29ec><li data-v-722e29ec>组合是关联关系的一种特例，它体现的是一种 contains-a 的关系，这种关系比聚合更强，也称为强聚合</li><li data-v-722e29ec>它同样体现整体与部分间的关系，但此时整体与部分是不可分的，整体的生命周期结束也就意味着部分的生命周期结束</li><li data-v-722e29ec>组合使用的是「实线实心菱形」表示，菱形端为整体类，另一端为部分类</li></ul></li><li data-v-722e29ec>聚合关系（Aggregation） <ul data-v-722e29ec><li data-v-722e29ec>聚合也是关联关系的一种特例，它体现的是整体与部分、拥有的关系，即 has-a 的关系</li><li data-v-722e29ec>此时整体与部分之间是可分离的，他们可以具有各自的生命周期，部分可以属于多个整体对象，也可以为多个整体对象共享</li><li data-v-722e29ec>聚合使用的是「实线空心菱形」表示，菱形端为整体类，另一端为部分类</li></ul></li><li data-v-722e29ec>关联关系（Association） <ul data-v-722e29ec><li data-v-722e29ec>如果 A 类中的成员变量有用 B 类（接口）来声明变量，则 A 与 B 为关联关系，称 A 关联于 B</li><li data-v-722e29ec>如果 A 关联 B，那么 UML 通过一个「实线」连接 A 和 B 的 UML 图</li><li data-v-722e29ec>关联使用的是「实线普通箭头」，引用类（A）指向被引用类（B）</li></ul></li><li data-v-722e29ec>依赖关系（Dependency） <ul data-v-722e29ec><li data-v-722e29ec>如果 A 类中某个方法的参数用 B 类（接口）来声明的变量或某个方法返回的数据类型是 B 类型的，那么 A 和 B 的关系是依赖关系，称 A 依赖于 B</li><li data-v-722e29ec>关联使用的是「虚线普通箭头」，引用类（A）指向被依赖类（B）</li></ul></li></ul><h2 id="_13-什么是开闭原则-高内聚、低耦合原则-多用组合少用继承原则" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_13-什么是开闭原则-高内聚、低耦合原则-多用组合少用继承原则" aria-hidden="true" data-v-722e29ec>#</a> 13. 什么是开闭原则，高内聚、低耦合原则，多用组合少用继承原则</h2><p data-v-722e29ec>开闭原则：开闭原则（Open Closed Principle）是一种面向对象设计原则，它要求一个软件实体（如类、模块、函数等）应该对扩展开放，对修改关闭</p><p data-v-722e29ec>高内聚，低耦合：</p><ul data-v-722e29ec><li data-v-722e29ec>内聚：每个模块尽可能独立完成自己的功能，不依赖于模块外部的代码。</li><li data-v-722e29ec>耦合：模块与模块之间接口的复杂程度，模块之间联系越复杂耦合度越高，牵一发而动全身。</li></ul><p data-v-722e29ec>多用组合，少用继承：<br data-v-722e29ec> 在设计类之间的关系时，应该优先选择组合而不是继承</p><ul data-v-722e29ec><li data-v-722e29ec>聚合：事物 A 由若干个事物 B 组成，体现在类与类之间的关系就是：类 B 的实例作为类 A 的成员对象出现。</li><li data-v-722e29ec>继承：体现在类与类之间的关系就是：类 B 被类 A 所继承<br data-v-722e29ec> 当观察类 B 所具有的行为能力时，聚合方式更加清晰。</li></ul><h2 id="_14-线程有多少种状态-请详细列举出来-并说明线程的生命周期" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_14-线程有多少种状态-请详细列举出来-并说明线程的生命周期" aria-hidden="true" data-v-722e29ec>#</a> 14. 线程有多少种状态，请详细列举出来，并说明线程的生命周期</h2><p data-v-722e29ec>4 种状态：新建、运行、中断和死亡</p><p data-v-722e29ec>Tread 提供 getStatue() 方法返回枚举类型，Thread.Statue 的值：</p><ul data-v-722e29ec><li data-v-722e29ec>新建状态（NEW） <ul data-v-722e29ec><li data-v-722e29ec>当一个 Thread 类或其子类的对象被创建时，新生的线程处于 「NEW」 状态。此时它已经占有了相应的内存空间和其他资源，但并没有被 JVM 管理，即尚未启动（没有调用 <code data-v-722e29ec>start()</code> 方法）</li></ul></li><li data-v-722e29ec>可运行状态（RUNNABLE） <ul data-v-722e29ec><li data-v-722e29ec>线程调用 <code data-v-722e29ec>start()</code> 方法后进入「RUNNABLE」状态，称为可运行状态，JVM 管理该线程，当 JVM 将 CPU 使用权切换给该状态的线程时，如果线程是 Thread 子类创建的，则调用 <code data-v-722e29ec>run()</code> 方法</li></ul></li><li data-v-722e29ec>中断状态（BLOCKED、TIMED_WAITING、WAITING） <ul data-v-722e29ec><li data-v-722e29ec>当中断的线程重新进入「RUNNABLE」状态后，且 JVM 分配 CPU 使用权给该线程，<code data-v-722e29ec>run()</code> 方法将从中断出继续执行 <ul data-v-722e29ec><li data-v-722e29ec>BLOCKED：JVM 将 CPU 资源从当前「RUNNABLE」切换给其他线程时，本线程进入「BOLCKED」状态，「BOLCKED」状态必须等待 JVM 解除其「BOLCKED」再次进入「RUNNABLE」</li><li data-v-722e29ec>TIMED_WAITING：当线程执行 <code data-v-722e29ec>sleep(int millsecond)</code> 方法后，该线程立刻让出 CPU 使用权，经过至多 millsecond 毫秒后再次进入「RUNNABLE」状态</li><li data-v-722e29ec>WAITING：当先线程执行 <code data-v-722e29ec>wait()</code> 方法后，进入「WAITING」状态「WAITING」状态不会主动进入「RUNNABLE」状态，必须由其他线程调用 <code data-v-722e29ec>notify()</code> 方法通知它，使其进入「RUNNABLE」状态</li></ul></li></ul></li><li data-v-722e29ec>死亡状态（TERMINATED） <ul data-v-722e29ec><li data-v-722e29ec>一个线程执行完了 run() 方法，该线程进入 TERMINATED 状态</li></ul></li></ul><h2 id="_15-线程和进程的区别是什么" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_15-线程和进程的区别是什么" aria-hidden="true" data-v-722e29ec>#</a> 15. 线程和进程的区别是什么</h2><p data-v-722e29ec>进程：是并发执行的程序在执行过程中分配和管理资源的基本单位，是一个动态概念，竞争计算机系统资源的基本单位。</p><p data-v-722e29ec>线程：是进程的一个执行单元，是进程内调度实体。比进程更小的独立运行的基本单位。线程也被称为轻量级进程。一个程序至少一个进程，一个进程至少一个线程。</p><h2 id="_16-简述对象的序列化与反序列化过程" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_16-简述对象的序列化与反序列化过程" aria-hidden="true" data-v-722e29ec>#</a> 16. 简述对象的序列化与反序列化过程</h2><p data-v-722e29ec>序列化：把对象转化为可传输的字节序列过程称为序列化。</p><p data-v-722e29ec>反序列化：把字节序列还原为对象的过程称为反序列化。</p><p data-v-722e29ec>序列化和反序列化一般使用 ObjectOutputStream 类保存或读取基本类型数据或对象</p><p data-v-722e29ec>要想一个 java 对象是可序列的，应满足下列要求：</p><ul data-v-722e29ec><li data-v-722e29ec>需要实现 Serializable 接口</li><li data-v-722e29ec>还须保证其内部的所有属性也必须是可序列化的（默认情况下，基本数据类型都是可序列化的）</li></ul><p data-v-722e29ec>序列化机制：对象序列化机制允许把内存中的 Java 对象转换成平台无关的二进制流，从而允许把这种二进制流持久地保存在磁盘上，或通过网络将这种二进制流传输到另一个网络节点。</p><h2 id="_17-什么是设计模式-什么是工厂模式之简单工厂-简述其优缺点-真题" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_17-什么是设计模式-什么是工厂模式之简单工厂-简述其优缺点-真题" aria-hidden="true" data-v-722e29ec>#</a> 17. 什么是设计模式，什么是工厂模式之简单工厂，简述其优缺点（真题）</h2><p data-v-722e29ec>设计模式是在软件工程中常用的解决特定问题的可复用解决方案。它们是从经验中总结出来的、在特定情境下能够解决常见问题的最佳实践。</p><p data-v-722e29ec>简单工厂不是一种设计模式，反而像一种编程习惯</p><p data-v-722e29ec>简单工厂包含如下角色:</p><ul data-v-722e29ec><li data-v-722e29ec>抽象产品：定义了产品的规范，描述了产品的主要特性和功能。</li><li data-v-722e29ec>具体产品：实现或者继承抽象产品的子类</li><li data-v-722e29ec>具体工厂：提供了创建产品的方法，调用者通过该方法来创建产品。</li></ul><p data-v-722e29ec>通过创建简单工厂类，在业务代码中调用简单工厂创建具体产品，解除了和抽象产品实现类的耦合（具体产品），但又产生了具体工厂与业务代码的耦合</p><p data-v-722e29ec>简单工厂模式的优缺点：</p><p data-v-722e29ec>优点:</p><ul data-v-722e29ec><li data-v-722e29ec>封装了创建对象的过程，可以通过参数直接获取对象。把对象的创建和业务逻辑层分开，这样以后就避免了修改客户代码，如果要实现新产品直接修改工厂类，而不需要在原代码中修改，这样就降低了客户代码修改的可能性，更加容易扩展。<br data-v-722e29ec> 缺点:</li><li data-v-722e29ec>增加新产品时还是需要修改工厂类的代码，违背了「开闭原则」。</li></ul><h2 id="_18-什么是工厂方法模式-简述其优缺点" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_18-什么是工厂方法模式-简述其优缺点" aria-hidden="true" data-v-722e29ec>#</a> 18. 什么是工厂方法模式，简述其优缺点</h2><p data-v-722e29ec>工厂方法模式（Factory Method、虚拟构造）：定义一个用于创建对象的接口，让子类决定实例化哪一个类<br data-v-722e29ec> 工厂方法模式使一个类的实例化延迟到子类工厂去实现<br data-v-722e29ec> 工厂方法模式的四个角色：</p><ul data-v-722e29ec><li data-v-722e29ec>抽象产品（Product）：定义了产品的规范，描述了产品的主要特性和功能。</li><li data-v-722e29ec>具体产品（ProductImpl）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间一一对应.</li><li data-v-722e29ec>抽象工厂（Factory/Creator）：提供了创建产品的接口，调用者通过它访问具体工厂的工厂方法来创建产品。</li><li data-v-722e29ec>具体工厂（FactoryImpl/CreatorImpl）：主要是实现抽象工厂中的抽象方法，完成具体产品的创建<br data-v-722e29ec> 工厂模式的优缺点：<br data-v-722e29ec> 优点:</li><li data-v-722e29ec>用户只需要知道具体工厂的名称就可得到所要的产品，无须知道产品的具体创建过程在系统增加新的产品时只需要添加具体产品类和对应的具体工厂类，无须对原工厂进行任何修改，满足开闭原则<br data-v-722e29ec> 缺点:</li><li data-v-722e29ec>每增加一个产品就要增加一个具体产品类和一个对应的具体工厂类，这增加了系统的复杂度</li></ul><h2 id="_19-什么是抽象工厂模式-简述其优缺点" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_19-什么是抽象工厂模式-简述其优缺点" aria-hidden="true" data-v-722e29ec>#</a> 19. 什么是抽象工厂模式，简述其优缺点</h2><p data-v-722e29ec>抽象工厂模式是一种为访问类提供一个创建一组相关或相互依赖对象的接口，且访问类无须指定所要产品的具体类就能得到同族的不同等级的产品的模<br data-v-722e29ec> 式结构。<br data-v-722e29ec> 抽象工厂模式是工厂方法模式的升级版本，工厂方法模式只生产一个等级的产品，而抽象工厂模式可生产多个等级的产品。</p><p data-v-722e29ec>抽象工厂模式包含以下几个核心角色：</p><ul data-v-722e29ec><li data-v-722e29ec>抽象产品（Abstract Product）：定义了产品的规范，描述了产品的主要特性和功能，抽象工厂模式有多个抽象产品。</li><li data-v-722e29ec>具体产品（Concrete Product）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间是多对一的关系.</li><li data-v-722e29ec>抽象工厂（Abstract Factory）：提供了创建产品的接口，它包含多个创建产品的方法，可以创建多个不同等级的产品</li><li data-v-722e29ec>具体工厂（Concrete Factory）：主要是实现抽象工厂中的多个抽象方法，完成具体产品的创建。</li></ul><p data-v-722e29ec>抽象工厂模式通常涉及一族相关的产品，每个具体工厂类负责创建该族中的具体产品。客户端通过使用抽象工厂接口来创建产品对象，而不需要直接使用具体产品的实现类。</p><p data-v-722e29ec>如果要加同一个产品族的话，只需要再加工个对应的工厂类即可，不需要修改其他的类</p><p data-v-722e29ec>抽象工厂模式优缺点：<br data-v-722e29ec> 优点：</p><ul data-v-722e29ec><li data-v-722e29ec>当一个产品族中的多个对象被设计成一起工作时，它能保证客户端始终只使用同一个产品族中的对象。<br data-v-722e29ec> 缺点:</li><li data-v-722e29ec>当产品族中需要增加一个新的产品时，所有的工厂类都需要进行修改</li></ul><h2 id="_20-什么是单例模式-实现单例模式的方式有哪些" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_20-什么是单例模式-实现单例模式的方式有哪些" aria-hidden="true" data-v-722e29ec>#</a> 20. 什么是单例模式，实现单例模式的方式有哪些</h2><p data-v-722e29ec>单例模式是最常用的设计模式之一。它可以确保在整个应用程序中，某个类只有一个实例存在，并提供一种访问这个实例的全局访问点</p><table data-v-722e29ec><thead data-v-722e29ec><tr data-v-722e29ec><th data-v-722e29ec>实现方式</th><th data-v-722e29ec>是否线程安全</th><th data-v-722e29ec>是否延迟加载（只有需要时才创建单例对象）</th></tr></thead><tbody data-v-722e29ec><tr data-v-722e29ec><td data-v-722e29ec>懒汉式</td><td data-v-722e29ec>否</td><td data-v-722e29ec>是</td></tr><tr data-v-722e29ec><td data-v-722e29ec>饿汉式</td><td data-v-722e29ec>是</td><td data-v-722e29ec>否</td></tr><tr data-v-722e29ec><td data-v-722e29ec>静态内部类</td><td data-v-722e29ec>是</td><td data-v-722e29ec>是</td></tr><tr data-v-722e29ec><td data-v-722e29ec>双重检查锁</td><td data-v-722e29ec>是</td><td data-v-722e29ec>否</td></tr><tr data-v-722e29ec><td data-v-722e29ec>枚举方式（最简便）</td><td data-v-722e29ec>是</td><td data-v-722e29ec>否</td></tr></tbody></table><h2 id="_21-什么是原型模式" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_21-什么是原型模式" aria-hidden="true" data-v-722e29ec>#</a> 21. 什么是原型模式</h2><p data-v-722e29ec>原型模式：用一个已经创建的实例作为原型，通过复制该原型对象来创建一个和原型对象相同的新对象.</p><p data-v-722e29ec>原型模式包含如下角色:</p><ul data-v-722e29ec><li data-v-722e29ec>抽象原型类: 规定了具体原型对象必须实现的的 clone() 方法</li><li data-v-722e29ec>具体原型类: 实现抽象原型类的 clone() 方法，它是可被复制的对象</li><li data-v-722e29ec>访问类: 使用具体原型类中的 clone() 方法来复制新的对象</li></ul><p data-v-722e29ec>浅克隆的实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-v-722e29ec><pre class="language-java" data-v-722e29ec><code data-v-722e29ec><span class="token keyword" data-v-722e29ec>public</span> <span class="token keyword" data-v-722e29ec>class</span> <span class="token class-name" data-v-722e29ec>RealizeType</span> <span class="token keyword" data-v-722e29ec>implements</span> <span class="token class-name" data-v-722e29ec>Cloneable</span><span class="token punctuation" data-v-722e29ec>{</span> <span class="token comment" data-v-722e29ec>// 具体的原型类</span>
    <span class="token keyword" data-v-722e29ec>int</span> a <span class="token operator" data-v-722e29ec>=</span> <span class="token number" data-v-722e29ec>10</span><span class="token punctuation" data-v-722e29ec>;</span>
    <span class="token annotation punctuation" data-v-722e29ec>@Override</span>
    <span class="token keyword" data-v-722e29ec>protected</span> <span class="token class-name" data-v-722e29ec>RealizeType</span> <span class="token function" data-v-722e29ec>clone</span><span class="token punctuation" data-v-722e29ec>(</span><span class="token punctuation" data-v-722e29ec>)</span> <span class="token keyword" data-v-722e29ec>throws</span> <span class="token class-name" data-v-722e29ec>CloneNotSupportedException</span> <span class="token punctuation" data-v-722e29ec>{</span>
        <span class="token keyword" data-v-722e29ec>return</span> <span class="token punctuation" data-v-722e29ec>(</span><span class="token class-name" data-v-722e29ec>RealizeType</span><span class="token punctuation" data-v-722e29ec>)</span> <span class="token keyword" data-v-722e29ec>super</span><span class="token punctuation" data-v-722e29ec>.</span><span class="token function" data-v-722e29ec>clone</span><span class="token punctuation" data-v-722e29ec>(</span><span class="token punctuation" data-v-722e29ec>)</span><span class="token punctuation" data-v-722e29ec>;</span>
    <span class="token punctuation" data-v-722e29ec>}</span>
<span class="token punctuation" data-v-722e29ec>}</span>

<span class="token keyword" data-v-722e29ec>public</span> <span class="token keyword" data-v-722e29ec>class</span> <span class="token class-name" data-v-722e29ec>Test</span> <span class="token punctuation" data-v-722e29ec>{</span> <span class="token comment" data-v-722e29ec>// 访问类</span>
    <span class="token keyword" data-v-722e29ec>public</span> <span class="token keyword" data-v-722e29ec>static</span> <span class="token keyword" data-v-722e29ec>void</span> <span class="token function" data-v-722e29ec>main</span><span class="token punctuation" data-v-722e29ec>(</span><span class="token class-name" data-v-722e29ec>String</span><span class="token punctuation" data-v-722e29ec>[</span><span class="token punctuation" data-v-722e29ec>]</span> args<span class="token punctuation" data-v-722e29ec>)</span> <span class="token keyword" data-v-722e29ec>throws</span> <span class="token class-name" data-v-722e29ec>CloneNotSupportedException</span> <span class="token punctuation" data-v-722e29ec>{</span>
        <span class="token class-name" data-v-722e29ec>RealizeType</span> realizeType <span class="token operator" data-v-722e29ec>=</span> <span class="token keyword" data-v-722e29ec>new</span> <span class="token class-name" data-v-722e29ec>RealizeType</span><span class="token punctuation" data-v-722e29ec>(</span><span class="token punctuation" data-v-722e29ec>)</span><span class="token punctuation" data-v-722e29ec>;</span>
        <span class="token class-name" data-v-722e29ec>RealizeType</span> clone <span class="token operator" data-v-722e29ec>=</span> realizeType<span class="token punctuation" data-v-722e29ec>.</span><span class="token function" data-v-722e29ec>clone</span><span class="token punctuation" data-v-722e29ec>(</span><span class="token punctuation" data-v-722e29ec>)</span><span class="token punctuation" data-v-722e29ec>;</span>
        <span class="token class-name" data-v-722e29ec>System</span><span class="token punctuation" data-v-722e29ec>.</span>out<span class="token punctuation" data-v-722e29ec>.</span><span class="token function" data-v-722e29ec>println</span><span class="token punctuation" data-v-722e29ec>(</span>clone <span class="token operator" data-v-722e29ec>==</span> realizeType<span class="token punctuation" data-v-722e29ec>)</span><span class="token punctuation" data-v-722e29ec>;</span> <span class="token comment" data-v-722e29ec>// false</span>
    <span class="token punctuation" data-v-722e29ec>}</span>
<span class="token punctuation" data-v-722e29ec>}</span>
</code></pre><div class="line-numbers" aria-hidden="true" data-v-722e29ec><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div><div class="line-number" data-v-722e29ec></div></div></div><p data-v-722e29ec>深克隆的实现：使用对象流</p><h2 id="_22-什么是-java-虚拟机-有哪三个类加载器-都有什么用-真题" tabindex="-1" data-v-722e29ec><a class="header-anchor" href="#_22-什么是-java-虚拟机-有哪三个类加载器-都有什么用-真题" aria-hidden="true" data-v-722e29ec>#</a> 22. 什么是 Java 虚拟机，有哪三个类加载器，都有什么用（真题）</h2>`,93),k=n(()=>e("h2",{id:"_23-什么是反射-及其作用",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_23-什么是反射-及其作用","aria-hidden":"true"},"#"),a(" 23. 什么是反射，及其作用")],-1)),b=n(()=>e("h2",{id:"_24-简述-java-类加载机制",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_24-简述-java-类加载机制","aria-hidden":"true"},"#"),a(" 24. 简述 Java 类加载机制")],-1)),m=n(()=>e("h2",{id:"_25-简述-jvm-的主要组成部分-都有什么用",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_25-简述-jvm-的主要组成部分-都有什么用","aria-hidden":"true"},"#"),a(" 25. 简述 Jvm 的主要组成部分，都有什么用")],-1)),f=n(()=>e("h2",{id:"_26-什么是垃圾回收-有哪些垃圾回收算法",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_26-什么是垃圾回收-有哪些垃圾回收算法","aria-hidden":"true"},"#"),a(" 26. 什么是垃圾回收，有哪些垃圾回收算法")],-1)),A=n(()=>e("h2",{id:"_27-什么是双亲委派机制",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_27-什么是双亲委派机制","aria-hidden":"true"},"#"),a(" 27. 什么是双亲委派机制")],-1));function y(l,x){const t=i("RouterLink");return v(),o("div",null,[_,e("p",null,[a("见 "),c(t,{to:"/code/java/JVM.html"},{default:d(()=>[a("Jvm")]),_:1})]),k,e("p",null,[a("见 "),c(t,{to:"/code/java/Java%20%E5%9F%BA%E7%A1%80/%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80/17%E3%80%81%E5%8F%8D%E5%B0%84.html"},{default:d(()=>[a("反射")]),_:1})]),b,e("p",null,[a("见 "),c(t,{to:"/code/java/JVM.html"},{default:d(()=>[a("Jvm")]),_:1})]),m,e("p",null,[a("见 "),c(t,{to:"/code/java/JVM.html"},{default:d(()=>[a("Jvm")]),_:1})]),f,e("p",null,[a("见 "),c(t,{to:"/code/java/JVM.html"},{default:d(()=>[a("Jvm")]),_:1})]),A,e("p",null,[a("见 "),c(t,{to:"/code/java/JVM.html"},{default:d(()=>[a("Jvm")]),_:1})])])}const B=s(h,[["render",y],["__scopeId","data-v-722e29ec"],["__file","简答题.html.vue"]]);export{B as default};
