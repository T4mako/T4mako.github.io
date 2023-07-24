---
icon: vue
date: 2023-07-20
category: 
    - MarkDown
tag: 
    - vuepress
    - MarkDown
    - 基础语法
---
# VuePress 中的 Markdown 扩展

https://theme-hope.vuejs.press/zh/guide/markdown/intro.html

VuePress 会使用 [markdown-it](https://github.com/markdown-it/markdown-it) 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 [语法扩展](https://github.com/markdown-it/markdown-it#syntax-extensions) 



##  链接

VuePress 中的 链接语法 转换：

原始Markdown：

```markdown
<!-- 相对路径 -->
[首页](../../README.md)  
[贡献指南](../../contribution.md)  
[VuePress 配置](./config.md)

<!-- 绝对路径 -->
[指南](/zh/guide/README.md)  
[配置参考 > 多语言](/zh/config/i18n.md)

<!-- URL -->
[GitHub](https://github.com)
```

转换为：

```vue
<template>
  <RouterLink to="/v2/zh/">首页</RouterLink>
  <RouterLink to="/v2/zh/contribution.html">贡献指南</RouterLink>
  <RouterLink to="/v2/zh/cookbook/vuepress/config.html"
    >VuePress 配置</RouterLink>
  <RouterLink to="/v2/zh/guide/">指南</RouterLink>
  <RouterLink to="/v2/zh/reference/config.html#links"
    >配置参考 &gt; 多语言</RouterLink
  >
  <a href="https://github.com" target="_blank" rel="noopener noreferrer"
    >GitHub</a
  >
</template>
```

- 内部链接会被转换为 `<RouterLink>` 以便进行 SPA 导航。
- 指向 `.md` 文件的内部链接会被转换为目标页面的 [路由路径](https://theme-hope.vuejs.press/zh/cookbook/vuepress/page.html#路由)，并且支持绝对路径和相对路径。
- 外部链接会被添加 `target="_blank" rel="noopener noreferrer"` 属性。

### 建议

对于 **内部链接**，尽可能使用 **相对路径** 而不是绝对路径。

在使用绝对路径时，如果你站点的 base 不是 `"/"`，你需要手动添加 `base` 或者使用  base helper 。

### 引入目录

如果你想要把当前页面的目录添加到 Markdown 内容中，你可以使用 `[[toc]]` 语法。

```markdown
[[toc]]
```

## 代码块

代码块在 Node 端处理

### 行高亮

~~~markdown
```ts {1,6-8} --> 编写高亮行数
import type { UserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";

export const config: UserConfig = {
  title: "你好， VuePress",

  theme: defaultTheme({
    logo: "https://vuejs.org/images/logo.png",
  }),
};
```

~~~

行数范围标记的例子:

- 行数范围: `{5-8}`
- 多个单行: `{4,7,9}`
- 组合: `{4,7-13,16,23-27,40}`

### 行号

行号默认启用

局部禁用方式：

~~~markdown
```ts:no-line-numbers
// 行号被禁用
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```
~~~

### :no-v-pre

为了避免你的代码块被 Vue 编译  
可以在代码块添加 `:v-pre` / `:no-v-pre` 标记来覆盖配置项中的设置。

### 导入代码块

从文件中导入代码块: https://theme-hope.vuejs.press/zh/cookbook/vuepress/markdown.html#%E5%AF%BC%E5%85%A5%E4%BB%A3%E7%A0%81%E5%9D%97

## 在 Markdown中使用 Vue

- Markdown 中允许使用 HTML。
- Vue 模板语法是和 HTML 兼容的。

 Markdown 中允许直接使用 [Vue 模板语法](https://v3.vuejs.org/guide/template-syntax.html)

```markdown
一加一等于: {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>

这是默认主题内置的 `<Badge />` 组件 <Badge text="演示" />
```

注意：不要在 VuePress 的 Markdown 中使用已废弃的 html 标签