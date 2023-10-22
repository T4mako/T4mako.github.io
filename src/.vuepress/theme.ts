import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

const BILIBILI =
'<svg t="1690293044448" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2310" width="32" height="32"><path d="M777.514667 131.669333a53.333333 53.333333 0 0 1 0 75.434667L728.746667 255.829333h49.92A160 160 0 0 1 938.666667 415.872v320a160 160 0 0 1-160 160H245.333333A160 160 0 0 1 85.333333 735.872v-320a160 160 0 0 1 160-160h49.749334L246.4 207.146667a53.333333 53.333333 0 1 1 75.392-75.434667l113.152 113.152c3.370667 3.370667 6.186667 7.04 8.448 10.965333h137.088c2.261333-3.925333 5.12-7.68 8.490667-11.008l113.109333-113.152a53.333333 53.333333 0 0 1 75.434667 0z m1.152 231.253334H245.333333a53.333333 53.333333 0 0 0-53.205333 49.365333l-0.128 4.010667v320c0 28.117333 21.76 51.157333 49.365333 53.162666l3.968 0.170667h533.333334a53.333333 53.333333 0 0 0 53.205333-49.365333l0.128-3.968v-320c0-29.44-23.893333-53.333333-53.333333-53.333334z m-426.666667 106.666666c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z m320 0c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z" p-id="2311" fill="#2196f3"></path></svg>'
const GITHUB = 
'<svg t="1689601879308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18964" width="128" height="128"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" p-id="18965" fill="#2196f3"></path></svg>'
const BANGUMI =
'<svg t="1689602661323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19428" width="128" height="128"><path d="M228.115268 615.399298a12.300795 12.300795 0 0 0 11.35458 7.569719 12.471113 12.471113 0 0 0 4.749999-0.965139l147.609537-61.882459a12.300795 12.300795 0 0 0 0.26494-22.557765l-147.609537-66.235049a12.300795 12.300795 0 1 0-10.067727 22.444219l121.740019 54.634453-121.456155 50.906366a12.300795 12.300795 0 0 0-6.585656 16.085655zM399.020617 627.965033H239.469848a12.300795 12.300795 0 0 0 0 24.601589h159.550769a12.300795 12.300795 0 0 0 0-24.601589zM399.020617 667.460046H239.469848a12.300795 12.300795 0 0 0 0 24.601589h159.550769a12.300795 12.300795 0 0 0 0-24.601589zM872.941851 476.892349l-133.283841 58.381464a12.300795 12.300795 0 0 0-0.397411 22.349598l133.302766 64.058754a12.073703 12.073703 0 0 0 5.317729 1.23008 12.300795 12.300795 0 0 0 5.336652-23.390435l-109.15536-52.42031L882.896033 499.469038a12.300795 12.300795 0 1 0-9.954182-22.576689zM877.881094 627.965033h-148.101569a12.300795 12.300795 0 0 0 0 24.601589h148.101569a12.300795 12.300795 0 0 0 0-24.601589zM877.881094 667.460046h-148.101569a12.300795 12.300795 0 0 0 0 24.601589h148.101569a12.300795 12.300795 0 0 0 0-24.601589zM644.866193 537.128395h-162.919295a12.28187 12.28187 0 0 0-10.711153 18.318722l81.374488 145.130453a12.300795 12.300795 0 0 0 21.460155 0l81.374489-145.130453a12.300795 12.300795 0 0 0-10.730078-18.318722z m-81.374488 132.299778l-60.444213-107.698189h120.888426z" fill="#2196f3" p-id="19429"></path><path d="M891.411968 334.960102H648.405037c-6.812748-15.13944-19.813742-28.386449-36.864535-38.018917L803.092262 19.283861a12.300795 12.300795 0 0 0-20.249001-13.966133L588.566402 286.873457a147.723082 147.723082 0 0 0-45.418319-7.001991 151.507942 151.507942 0 0 0-31.887445 3.368526L239.980804 4.712151A12.300795 12.300795 0 0 0 222.437978 21.87649l262.726051 269.803739c-22.14143 9.821711-39.116527 25.112546-47.310749 43.242025H132.547555A91.763929 91.763929 0 0 0 40.764702 426.705107v414.44216A91.763929 91.763929 0 0 0 132.547555 932.967969h268.024855l-19.908363 46.989036c-12.641432 29.881469 22.614538 57.094612 48.294812 37.299794L538.473781 932.967969h352.938187a91.763929 91.763929 0 0 0 91.782853-91.782853v-414.442161a91.763929 91.763929 0 0 0-91.782853-91.782853z m34.839635 463.815658a60.709153 60.709153 0 0 1-60.709153 60.709153H585.670984L487.870204 932.967969l-77.002975 57.851583 24.412346-57.851583 31.016927-73.483056H198.082405A60.728077 60.728077 0 0 1 137.27863 798.737912V440.330602a60.728077 60.728077 0 0 1 60.728077-60.728077h667.460046a60.709153 60.709153 0 0 1 60.709153 60.728077z" fill="#2196f3" p-id="19430"></path></svg>'
const STEAM = 
'<svg t="1689602917453" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22800" width="128" height="128"><path d="M510.4 0C243.2 0 20.8 208 1.6 470.4l273.6 113.6c24-16 51.2-24 81.6-24h8l121.6-177.6v-1.6c0-105.6 86.4-193.6 193.6-193.6s193.6 86.4 193.6 193.6-86.4 193.6-193.6 193.6h-4.8l-174.4 124.8v6.4c0 80-65.6 145.6-145.6 145.6-70.4 0-129.6-51.2-142.4-116.8L17.6 651.2C78.4 865.6 276.8 1024 510.4 1024c283.2 0 512-228.8 512-512S793.6 0 510.4 0z" p-id="22801" fill="#2196f3"></path><path d="M321.6 777.6L259.2 752c11.2 24 30.4 43.2 56 52.8 54.4 24 118.4-3.2 142.4-57.6 11.2-27.2 11.2-56 0-83.2-11.2-27.2-32-48-57.6-59.2s-54.4-9.6-80-1.6l65.6 27.2c40 17.6 60.8 64 43.2 104-19.2 40-65.6 59.2-107.2 43.2zM808 379.2c0-70.4-57.6-129.6-129.6-129.6-70.4 0-129.6 57.6-129.6 129.6s59.2 129.6 129.6 129.6 129.6-57.6 129.6-129.6z m-224 0c0-54.4 43.2-96 96-96 54.4 0 96 43.2 96 96 0 54.4-43.2 96-96 96-52.8 1.6-96-41.6-96-96z" p-id="22802" fill="#2196f3"></path></svg>'
const WANGYIYUN = 
'<svg t="1689688916532" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18695" width="128" height="128"><path d="M627.086668 5.114963c28.132297-7.672445 58.822075-7.672445 86.954372 0 33.24726 7.672445 63.937038 23.017334 89.511853 43.477186 10.229926 7.672445 17.902371 15.344889 23.017334 28.132297 7.672445 17.902371 5.114963 38.362223-5.114963 53.707112-7.672445 12.787408-23.017334 23.017334-40.919704 25.574815-12.787408 2.557482-25.574815 0-38.362223-7.672445-5.114963-2.557482-10.229926-10.229926-17.902371-12.787407-17.902371-10.229926-35.804741-20.459852-56.264593-17.902371-15.344889 0-28.132297 7.672445-35.804742 17.902371-10.229926 10.229926-12.787408 23.017334-10.229926 35.804741 7.672445 25.574815 12.787408 53.707112 20.459853 79.281927 51.14963 2.557482 99.741779 15.344889 143.218965 40.919704 40.919704 25.574815 79.281927 58.822075 109.971705 97.184298 25.574815 33.24726 46.034667 71.609483 56.264593 112.529187 12.787408 43.477186 17.902371 89.511853 12.787408 132.989039-2.557482 38.362223-10.229926 74.166964-23.017334 109.971705-33.24726 84.39689-92.069335 161.121336-171.351261 209.713485-56.264593 35.804741-122.759113 58.822075-189.253633 66.49452-46.034667 5.114963-92.069335 5.114963-138.104002-2.557482-94.626816-15.344889-181.581188-61.379556-250.633189-130.431558-66.49452-66.49452-112.529187-153.448891-132.989039-245.518225-7.672445-69.052001-7.672445-138.104002 7.672445-207.156004 17.902371-81.839409 61.379556-161.121336 117.644149-222.500892 48.592149-51.14963 107.414224-89.511853 171.351262-117.64415 7.672445-2.557482 12.787408-5.114963 20.459852-7.672444 15.344889-2.557482 30.689778 0 43.477186 10.229926 17.902371 12.787408 25.574815 33.24726 23.017334 53.707112-2.557482 20.459852-17.902371 38.362223-35.804741 46.034667-63.937038 25.574815-122.759113 69.052001-163.678818 122.759113C205.102218 373.392302 179.527402 432.214377 171.854958 493.593933c-7.672445 61.379556 0 122.759113 20.459852 181.581188 30.689778 84.39689 94.626816 156.006373 173.908743 196.926077 48.592149 25.574815 102.299261 38.362223 156.006373 38.362223 43.477186 0 89.511853-7.672445 130.431558-23.017334 35.804741-12.787408 71.609483-33.24726 99.741779-58.822074 28.132297-23.017334 51.14963-53.707112 66.494519-84.396891 7.672445-15.344889 17.902371-33.24726 20.459853-51.14963 15.344889-51.14963 17.902371-107.414224 2.557481-158.563854-12.787408-43.477186-38.362223-81.839409-71.609482-109.971706-15.344889-12.787408-30.689778-25.574815-48.592149-35.804741-15.344889-7.672445-30.689778-15.344889-48.592149-17.902371 12.787408 46.034667 23.017334 92.069335 35.804741 135.546521 2.557482 10.229926 5.114963 23.017334 5.114963 33.24726 2.557482 46.034667-15.344889 94.626816-46.034667 130.431557-28.132297 33.24726-69.052001 58.822075-112.529187 66.49452-46.034667 10.229926-97.184298 0-138.104002-25.574815-38.362223-25.574815-66.49452-63.937038-81.839409-104.856743-7.672445-23.017334-12.787408-48.592149-12.787407-74.166964-2.557482-56.264593 12.787408-109.971705 43.477185-156.006373 35.804741-53.707112 94.626816-92.069335 158.563855-109.971705-5.114963-17.902371-10.229926-35.804741-12.787408-53.707112-12.787408-38.362223-10.229926-81.839409 7.672445-115.086668 10.229926-20.459852 23.017334-38.362223 40.919704-51.149631C583.609483 25.574815 604.069335 12.787408 627.086668 5.114963m-148.333928 414.312006c-17.902371 17.902371-28.132297 40.919704-33.24726 63.937038-5.114963 20.459852-5.114963 43.477186 0 66.49452 5.114963 23.017334 17.902371 46.034667 38.362223 61.379556 15.344889 10.229926 35.804741 15.344889 56.264594 10.229926 35.804741-5.114963 63.937038-38.362223 63.937038-74.166964-2.557482-7.672445-2.557482-17.902371-5.114963-25.574815-12.787408-48.592149-25.574815-99.741779-38.362223-148.333928-30.689778 7.672445-58.822075 23.017334-81.839409 46.034667z" fill="#2196f3" p-id="18696"></path></svg>'
const WEIBO =
'<svg t="1689603427690" class="icon" viewBox="0 0 1138 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4475" width="128" height="128"><path d="M914.432 518.144q27.648 21.504 38.912 51.712t9.216 62.976-14.336 65.536-31.744 59.392q-34.816 48.128-78.848 81.92t-91.136 56.32-94.72 35.328-89.6 18.944-75.264 7.68-51.712 1.536-49.152-2.56-68.096-10.24-78.336-21.504-79.872-36.352-74.24-55.296-59.904-78.848q-16.384-29.696-22.016-63.488t-5.632-86.016q0-22.528 7.68-51.2t27.136-63.488 53.248-75.776 86.016-90.112q51.2-48.128 105.984-85.504t117.248-57.856q28.672-10.24 63.488-11.264t57.344 11.264q10.24 11.264 19.456 23.04t12.288 29.184q3.072 14.336 0.512 27.648t-5.632 26.624-5.12 25.6 2.048 22.528q17.408 2.048 33.792-1.536t31.744-9.216 31.232-11.776 33.28-9.216q27.648-5.12 54.784-4.608t49.152 7.68 36.352 22.016 17.408 38.4q2.048 14.336-2.048 26.624t-8.704 23.04-7.168 22.016 1.536 23.552q3.072 7.168 14.848 13.312t27.136 12.288 32.256 13.312 29.184 16.384zM656.384 836.608q26.624-16.384 53.76-45.056t44.032-64 18.944-75.776-20.48-81.408q-19.456-33.792-47.616-57.344t-62.976-37.376-74.24-19.968-80.384-6.144q-78.848 0-139.776 16.384t-105.472 43.008-72.192 60.416-38.912 68.608q-11.264 33.792-6.656 67.072t20.992 62.976 42.496 53.248 57.856 37.888q58.368 25.6 119.296 32.256t116.224 0.512 100.864-21.504 74.24-33.792zM522.24 513.024q20.48 8.192 38.912 18.432t32.768 27.648q10.24 12.288 17.92 30.72t10.752 39.424 1.536 42.496-9.728 38.912q-8.192 18.432-19.968 37.376t-28.672 35.328-40.448 29.184-57.344 18.944q-61.44 11.264-117.76-11.264t-88.064-74.752q-12.288-39.936-13.312-70.656t16.384-66.56q13.312-27.648 40.448-51.712t62.464-38.912 75.264-17.408 78.848 12.8zM359.424 764.928q37.888 3.072 57.856-18.432t21.504-48.128-15.36-47.616-52.736-16.896q-27.648 3.072-43.008 23.552t-17.408 43.52 9.728 42.496 39.424 21.504zM778.24 6.144q74.752 0 139.776 19.968t113.664 57.856 76.288 92.16 27.648 122.88q0 33.792-16.384 50.688t-35.328 17.408-35.328-14.336-16.384-45.568q0-40.96-22.528-77.824t-59.392-64.512-84.48-43.52-96.768-15.872q-31.744 0-47.104-15.36t-14.336-34.304 18.944-34.304 51.712-15.36zM778.24 169.984q95.232 0 144.384 48.64t49.152 146.944q0 30.72-10.24 43.52t-22.528 11.264-22.528-14.848-10.24-35.84q0-60.416-34.816-96.256t-93.184-35.84q-19.456 0-28.672-10.752t-9.216-23.04 9.728-23.04 28.16-10.752z" p-id="4476" fill="#2196f3"></path></svg>'
const DOUYIN = 
'<svg t="1689603386047" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3401" width="128" height="128"><path d="M937.4 423.9c-84 0-165.7-27.3-232.9-77.8v352.3c0 179.9-138.6 325.6-309.6 325.6S85.3 878.3 85.3 698.4c0-179.9 138.6-325.6 309.6-325.6 17.1 0 33.7 1.5 49.9 4.3v186.6c-15.5-6.1-32-9.2-48.6-9.2-76.3 0-138.2 65-138.2 145.3 0 80.2 61.9 145.3 138.2 145.3 76.2 0 138.1-65.1 138.1-145.3V0H707c0 134.5 103.7 243.5 231.6 243.5v180.3l-1.2 0.1" p-id="3402" fill="#2196f3"></path></svg>'
// 主题配置
export default hopeTheme({
  hostname: "https://T4mako.github.io",

  author: {
    name: "T4mako",
    url: "https://github.com/T4mako/T4mako.github.io", // 作者网站
  },

  darkmode: 'toggle', // 提供浅色与深色模式

  // fullscreen: true, // 全屏功能

  iconAssets: "iconfont", // 配置图标

  logo: "/favicon.ico", // 导航栏logo，个人资料logo

  repo: "https://github.com/T4mako/T4mako.github.io", // bolg代码仓库

  docsDir: "src",

  // navbar
  navbar,

  // sidebar
  sidebar: false,

  // sidebarSorter: ["readme","date-desc", "order", "title", "filename"],

  footer: "T4mako's blog",

  displayFooter: true,

  blog: {
    description: "noob coder",
    roundAvatar: true, // 圆形头像
    intro: "/intro.html", //个人介绍地址
    timeline: "时间线",
    //articleInfo:["Author", "Original", "Date", "Category", "Tag", "ReadingTime"], // 博客页面文章信息，不显示访问量
    medias: {
      BiliBili: ["https://space.bilibili.com/313309138",BILIBILI],  
      GitHub: ["https://github.com/T4mako",GITHUB],
      Bangumi: ['https://bgm.tv/user/t4mako',BANGUMI],
      // Rss: "https://example.com",
      Steam: ["https://steamcommunity.com/profiles/76561199025694576/",STEAM],
      网易云: ["https://music.163.com/#/user/home?id=559686132",WANGYIYUN],
      微博: ["https://m.weibo.cn/u/6321875003",WEIBO],
      抖音: ["https://www.douyin.com/user/MS4wLjABAAAA32mwXDHtuWrwk5MD48IWbQCxLEzl1K-wBpUKNiH6NdA",DOUYIN],
    },
  },

  print: true,

  encrypt: {
    // 加密文章
    config: {
      "/code/project": ["vuepress"],
    },
  },
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"], // 文章显示的fontmatter

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },
  plugins: {
    blog: true,

    //评论
    comment: {
      // You should generate and use your own comment service
      provider: "Waline",
      serverURL: "https://blog-comment-murex.vercel.app/",
      pageview: false, // 不显示浏览量 
    },

    // 不显示最后一次提交时间
    git: false,

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: false, // 不显示图片描述
      flowchart: true,
      gfm: true,
      imgLazyload: true, // 图片懒加载
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      card: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    components: {
      // 你想使用的组件
      components: [
        "BiliBili",
        "Badge"
      ],
    },
    // rss
    feed: {
      rss: true,
      icon: "rss"
    }




    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
