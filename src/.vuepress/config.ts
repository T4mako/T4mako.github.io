import { defineUserConfig } from "vuepress";

import theme from "./theme.js";
export default defineUserConfig({
  base: "/",
  port: 8888,
  
  theme,
  

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
