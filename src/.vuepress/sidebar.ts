import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/code/": [
    {
      text: "代码笔记",
      icon: "code",
      children: "structure"
    }
  ],
  "/interests/": [
    {
      text: "兴趣爱好",
      icon: "view",
      children: "structure"
    }
  ],
  "/life/": [
    {
      text: "生活碎片",
      icon: "note",
      children: "structure"
    }
  ],
  "/": [
    "",
    "intro",
    {
      text: "代码笔记",
      icon: "code",
      prefix: "code/",
      link: "code/",
    },
    {
      text: "兴趣爱好",
      icon: "view",
      prefix: "posts/",
      link: "interests/"
    },
    {
      text: "生活碎片",
      icon: "note",
      prefix: "posts/",
      link: "life/"
    },
  ],
  
});
