import { Page, defineUserConfig, resolvePageDataInfo } from "vuepress";
import theme from "./theme.js"; // 引入主题函数
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { ohmylive2dPlugin } from 'vuepress-plugin-oh-my-live2d';
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from "@vuepress/utils";
import { feedPlugin } from "vuepress-plugin-feed2";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  // 别名
  alias: {
    "@MyComponent": path.resolve(__dirname, "components/MyComponent.vue"),
    "@MyBangumi": path.resolve(__dirname, "components/MyBangumi.vue")
  },
  // 站点配置
  base: "/",

  lang: "zh-CN",
  title: "T4mako",
  description: "T4mako",

  port: 8888,

  // 主题配置
  theme,

  // 插件
  plugins: [
    docsearchPlugin({

      // 你的选项
      // appId, apiKey 和 indexName 是必填的
      appId: "N2PYVPZBPZ",

      apiKey: "0c5dd9e064292539896e6f3530dd8a37",
  
      indexName: "t4makoio",
      locales: {
        "/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    }),

    // 自动目录插件
    // autoCatalogPlugin({
    //   //  orderGetter: (page:Page) => page.date,
    // }),



    // 自己的组件
    registerComponentsPlugin({
      
    }),
    /* live 2D
     ohmylive2dPlugin({
        // 在这里进行配置
     })*/
    
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
