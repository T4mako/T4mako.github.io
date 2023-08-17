---
date: 2023-08-15
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
            // 调用 getAutoConfigurationEntry() 方法
            AutoConfigurationEntry autoConfigurationEntry = this.getAutoConfigurationEntry(annotationMetadata);
            return StringUtils.toStringArray(autoConfigurationEntry.getConfigurations());
        }
    }
    ...
}
```

### SpringFactoriesLoader.loadFactoryNames() 方法

`getAutoConfigurationEntry`方法通过`SpringFactoriesLoader.loadFactoryNames()` 扫描所有含有`META-INF/spring.factories`的`jar`包：

```java
public class AutoConfigurationImportSelector implements DeferredImportSelector, BeanClassLoaderAware, ResourceLoaderAware, BeanFactoryAware, EnvironmentAware, Ordered {
    ...
    // getAutoConfigurationEntry() 方法
    protected AutoConfigurationEntry getAutoConfigurationEntry(AnnotationMetadata annotationMetadata) {
        if (!this.isEnabled(annotationMetadata)) {
            return EMPTY_ENTRY;
        } else {
            AnnotationAttributes attributes = this.getAttributes(annotationMetadata);
            // 调用 getCandidateConfigurations() 方法
            List<String> configurations = this.getCandidateConfigurations(annotationMetadata, attributes);
            configurations = this.removeDuplicates(configurations);
            Set<String> exclusions = this.getExclusions(annotationMetadata, attributes);
            this.checkExcludedClasses(configurations, exclusions);
            configurations.removeAll(exclusions);
            configurations = this.getConfigurationClassFilter().filter(configurations);
            this.fireAutoConfigurationImportEvents(configurations, exclusions);
            return new AutoConfigurationEntry(configurations, exclusions);
        }
    }
    ...
}
```

```java
// AutoConfigurationImportSelector.class
protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
    // 调用 SpringFactoriesLoader.loadFactoryNames() 方法
    List<String> configurations = new ArrayList(SpringFactoriesLoader.loadFactoryNames(this.getSpringFactoriesLoaderFactoryClass(), this.getBeanClassLoader()));
    ImportCandidates.load(AutoConfiguration.class, this.getBeanClassLoader()).forEach(configurations::add);
    Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories nor in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. If you are using a custom packaging, make sure that file is correct.");
    return configurations;
}
```

```java
// SpringFactoriesLoader.class
// loadFactoryNames() 方法
public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
    ClassLoader classLoaderToUse = classLoader;
    if (classLoader == null) {
        classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
    }

    String factoryTypeName = factoryType.getName();
    // 调用 loadSpringFactories() 方法
    return (List)loadSpringFactories(classLoaderToUse).getOrDefault(factoryTypeName, Collections.emptyList());
}
```

```java
// SpringFactoriesLoader.class
// loadSpringFactories() 方法
private static Map<String, List<String>> loadSpringFactories(ClassLoader classLoader) {
    Map<String, List<String>> result = (Map)cache.get(classLoader);
    if (result != null) {
        return result;
    } else {
        Map<String, List<String>> result = new HashMap();

        try {
            // 扫描所有含有META-INF/spring.factories的jar包
            Enumeration<URL> urls = classLoader.getResources("META-INF/spring.factories");

            while(urls.hasMoreElements()) {
                URL url = (URL)urls.nextElement();
                UrlResource resource = new UrlResource(url);
                Properties properties = PropertiesLoaderUtils.loadProperties(resource);
                Iterator var6 = properties.entrySet().iterator();

                while(var6.hasNext()) {
                    Map.Entry<?, ?> entry = (Map.Entry)var6.next();
                    String factoryTypeName = ((String)entry.getKey()).trim();
                    String[] factoryImplementationNames = StringUtils.commaDelimitedListToStringArray((String)entry.getValue());
                    String[] var10 = factoryImplementationNames;
                    int var11 = factoryImplementationNames.length;

                    for(int var12 = 0; var12 < var11; ++var12) {
                        String factoryImplementationName = var10[var12];
                        ((List)result.computeIfAbsent(factoryTypeName, (key) -> {
                            return new ArrayList();
                        })).add(factoryImplementationName.trim());
                    }
                }
            }

            result.replaceAll((factoryType, implementations) -> {
                return (List)implementations.stream().distinct().collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList));
            });
            cache.put(classLoader, result);
            return result;
        } catch (IOException var14) {
            throw new IllegalArgumentException("Unable to load factories from location [META-INF/spring.factories]", var14);
        }
    }
}
```

`spring-boot-autoconfigure-xxx.jar`项目包含`META-INF/spring.factories`文件，`spring.factories`是一个键值对的形式，扫描该文件下`@EnableAutoConfiguration`对应类：

:::info 总结

- 自动配置主要由`@EnableAutoConfiguration`实现
- 添加了`@EnableAutoConfiguration`注解，会导入`AutoConfigurationImportSelector`类
- 里面的`selectImports`方法通过`SpringFactoriesLoader.loadFactoryNames()`扫描所有含有`META-INF/spring.factories`的`jar`包
- `spring.factories`是一个键值对的形式，扫描该文件下`@EnableAutoConfiguration`对应类：
- 将对应`key`为`@EnableAutoConfiguration`注解全名对应的`value`类全部装配到`IOC`容器中。

:::

这些属性自动配置到`IOC`之后就无需自己手动配置`bean`了，`Spring Boot`中的`约定大于配置`理念，约定是将需要的配置以约定的方式添加到`IOC`容器中。

## 自动配置生效条件

那是不是`spring.factories`文件对应的配置都会加载到`IOC`容器中？

其中有几个注解：  `@ConditionalOnClass`, `@ConditionalOnMissingBean`

- `@ConditionalOnClass`表示在类路径中存在类才会配置该配置类。只有引入相关依赖才会自动配置该配置类。
- `@ConditionalOnMissingBean`表示只有不存在对应的类的`bean`才会自动配置该类。

所以`spring.factories`里面并不是所有的`bean`都会装配到`IOC`容器中，只会按需配置对应的`bean`。
