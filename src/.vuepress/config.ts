import { defineUserConfig } from "vuepress";
import theme from "./theme.js"; // 引入主题函数
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default defineUserConfig({
  // 站点配置
  base: "/",

  lang: "zh-CN",
  title: "T4mako",
  description: "T4mako",

  port: 8888,

  // 主题配置
  theme,

  // 自动目录排除插件
  plugins: [
    // autoCatalogPlugin({
    //     exclude: ["/code/project/","/code/Leetcode/"],
    //   }
    // )
  ],
  
  // 导入字体
  head:[
    ["link",{rel:'preconnect',href:'https://fonts.googleapis.com'}],
    ["link",{rel:'preconnect',href:'https://fonts.gstatic.com',crossorigin:''}],
    ["link",{href:'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500&display=swap',
            rel:'stylesheet'}],
  ]

  // Enable it with pwa
  // shouldPrefetch: false,
});
