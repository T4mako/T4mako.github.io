import { defineUserConfig } from "vuepress";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import theme from "./theme.js";

const readRootEnv = (name: string): string | undefined => {
  const envPath = resolve(process.cwd(), ".env");

  if (!existsSync(envPath)) return undefined;

  const match = readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/))
    .find((item) => item?.[1] === name);

  return match?.[2]?.trim().replace(/^["']|["']$/g, "");
};

const ragBackendUrl =
  process.env.VITE_RAG_BACKEND_URL ??
  readRootEnv("VITE_RAG_BACKEND_URL") ??
  process.env.RAG_BACKEND_URL ??
  readRootEnv("RAG_BACKEND_URL") ??
  "";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "T4mako's Blog",
  port: 8888,
  define: {
    __RAG_BACKEND_URL__: ragBackendUrl,
  },
  
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
