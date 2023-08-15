---
title: SpringBoot 自动装配原理
icon: leaf
category: 
    - java
tag: 
    - Spring
    - java
    - SpringBoot
---
早期的`Spring`项目需要添加需要配置繁琐的xml,比如`MVC`、事务、数据库连接等繁琐的配置。`SpringBoot`的出现就无需这些繁琐的配置，因为`SpringBoot`基于**约定大于配置**的理念，在项目启动时候，将约定的配置类自动配置到`IOC`容器里。这些都因为`SpringBoot`有自动配置的特性。

## Sping Boot 如何实现自动配置

`Spring Boot`都需要创建一个`mian`启动类，而启动类都含有`@SpringBootApplication`注解，从启动类，一步步探索源码。

### @SpringBootApplication注解

`Spring Boot` 启动类上都有一个 `@SpringBootApplication`注解：

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.runyApplication.class,args);
    }
}
```

### @EnableAutoConfiguration注解

`@SpringBootApplication` 里面有 `@EnableAutoConfiguration` 的注解：

```java
...
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
...
)
...
public @interface SpringBootApplication {...}
```

### AutoConfigurationImportSelector类

`@EnableAutoConfiguration`注解导入`AutoConfigurationImportSelector`类：

```java
...
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration {
    ...
}
```

### selectImports()方法

`AutoConfigurationImportSelector`类找到 `selectImports` 方法，里面有`getAutoConfigurationEntry`方法：

```java
public class AutoConfigurationImportSelector implements DeferredImportSelector, BeanClassLoaderAware, ResourceLoaderAware, BeanFactoryAware, EnvironmentAware, Ordered {
	...
    public String[] selectImports(AnnotationMetadata annotationMetadata) {
        if (!this.isEnabled(annotationMetadata)) {
            return NO_IMPORTS;
        } else {
            AutoConfigurationEntry autoConfigurationEntry = this.getAutoConfigurationEntry(annotationMetadata);
            return StringUtils.toStringArray(autoConfigurationEntry.getConfigurations());
        }
    }
    ...
}
```

