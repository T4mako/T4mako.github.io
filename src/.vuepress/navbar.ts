import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "代码笔记",
    icon: "code",
    prefix: "/code/",
    children: [
      { text: "基础知识", link: "基础知识" },
      { text: "Java", link: "java" },
      { text: "前端开发", link: "前端开发" },
      { text: "数据库", link: "数据库" },
      { text: "运维与部署", link: "运维与部署" },
      { text: "Python", link: "python" },
      { text: "Leetcode", link: "leetcode" },
      { text: "项目笔记", link: "project" },
    ],
  },
  {
    text: "设计相关",
    icon: "view",
    children: []
  },
  {
    text: "生活碎片",
    icon: "share",
    children: []
  },
  {
    text: "友链",
    icon: "group",
    link: "friends"
  }
]);
