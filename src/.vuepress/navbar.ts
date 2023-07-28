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
      { text: "其他", link: "其他" },
    ],
  },
  {
    text: "兴趣爱好",
    icon: "view",
    prefix: "/interests/",
    children: [
      { text: "AE", link: "AE" },
      { text: "Blender", link: "Blender" },
      { text: "HLAE", link: "HLAE" },
      // { text: "番剧鉴赏", link: "animate" },
      // { text: "游戏鉴赏", link: "games" },
      // { text: "厨艺", link: "cook" },
      // { text: "咖啡", link: "coffee" },

    ]
  },
  {
    text: "生活碎片",
    icon: "note",
    prefix: "/life/",
    children: [
      {text: "随笔",link: "随笔"},
      {text: "观影区",link: "观影区"},
    ]
  },
  {
    text: "友链",
    icon: "group",
    link: "friends"
  }
]);
