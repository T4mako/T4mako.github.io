import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Coding",
    icon: "code",
    prefix: "/code/",
    children: [
      { text: "Basic", link: "基础知识/" },
      { text: "Frontend", link: "前端开发/"},
      { text: "Backend", link: "后端开发/"},
      { text: "Database", link: "database/"},
      { text: "Operations", link: "运维与部署/"},
      { text: "Leetcode", link: "leetcode/" },
      { text: "AI", link: "AI/" },
    ],
  },
  {
    text: "兴趣使然",
    icon: "view",
    prefix: "/interests",
    children: [
      // { text: "AE", link: "AE" },
      // { text: "Blender", link: "Blender" },
      // { text: "HLAE", link: "HLAE" },
      // { text: "番剧鉴赏", link: "animate" },
      // { text: "游戏鉴赏", link: "games" },
      // { text: "吃饭糊弄学", link: "cook" },
      // { text: "咖啡", link: "coffee" },

    ]
  },
  {
    text: "Articles",
    icon: "article",
    link: "/article/",
  }
]);
