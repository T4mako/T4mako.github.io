import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as r,c as k,e as t,b as n,d as s,w as e}from"./app-b75a4e56.js";const d={},m=n("h1",{id:"_199-二叉树的右视图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_199-二叉树的右视图","aria-hidden":"true"},"#"),s(" 199. 二叉树的右视图")],-1),v={href:"https://leetcode.cn/problems/binary-tree-right-side-view/description/?envType=study-plan-v2&envId=leetcode-75",target:"_blank",rel:"noopener noreferrer"},_=n("p",null,[s("解题思路:"),n("br"),s(" 使用广度优先搜索 bfs ，通过层序遍历的方式将每个层的最后一个结点加入到结果数组中。")],-1),b=n("div",{class:"language-java line-numbers-mode","data-ext":"java"},[n("pre",{class:"language-java"},[n("code",null,[n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"Solution"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"private"),s(),n("span",{class:"token class-name"},"TreeNode"),s(" ans "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token class-name"},"TreeNode"),s(),n("span",{class:"token function"},"lowestCommonAncestor"),n("span",{class:"token punctuation"},"("),n("span",{class:"token class-name"},"TreeNode"),s(" root"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token class-name"},"TreeNode"),s(" p"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token class-name"},"TreeNode"),s(" q"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"dfs"),n("span",{class:"token punctuation"},"("),s("root"),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},","),s(" q"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("ans"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token keyword"},"private"),s(),n("span",{class:"token keyword"},"boolean"),s(),n("span",{class:"token function"},"dfs"),n("span",{class:"token punctuation"},"("),n("span",{class:"token class-name"},"TreeNode"),s(" root"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token class-name"},"TreeNode"),s(" p"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token class-name"},"TreeNode"),s(" q"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token comment"},"// 递归出口"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("root "),n("span",{class:"token operator"},"=="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token comment"},"// 递归"),s(`
        `),n("span",{class:"token keyword"},"boolean"),s(" lson "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"dfs"),n("span",{class:"token punctuation"},"("),s("root"),n("span",{class:"token punctuation"},"."),s("left"),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},","),s(" q"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"boolean"),s(" rson "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"dfs"),n("span",{class:"token punctuation"},"("),s("root"),n("span",{class:"token punctuation"},"."),s("right"),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},","),s(" q"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token comment"},"// 判断是否为最近公共祖先"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),s("lson "),n("span",{class:"token operator"},"&&"),s(" rson"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"||"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),s("root"),n("span",{class:"token punctuation"},"."),s("val "),n("span",{class:"token operator"},"=="),s(" p"),n("span",{class:"token punctuation"},"."),s("val "),n("span",{class:"token operator"},"||"),s(" root"),n("span",{class:"token punctuation"},"."),s("val "),n("span",{class:"token operator"},"=="),s(" q"),n("span",{class:"token punctuation"},"."),s("val"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"&&"),s(),n("span",{class:"token punctuation"},"("),s("lson "),n("span",{class:"token operator"},"||"),s(" rson"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            ans `),n("span",{class:"token operator"},"="),s(" root"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(` 
        `),n("span",{class:"token comment"},"// 递归返回值"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" lson "),n("span",{class:"token operator"},"||"),s(" rson "),n("span",{class:"token operator"},"||"),s(),n("span",{class:"token punctuation"},"("),s("root"),n("span",{class:"token punctuation"},"."),s("val "),n("span",{class:"token operator"},"=="),s(" p"),n("span",{class:"token punctuation"},"."),s("val "),n("span",{class:"token operator"},"||"),s(" root"),n("span",{class:"token punctuation"},"."),s("val "),n("span",{class:"token operator"},"=="),s(" q"),n("span",{class:"token punctuation"},"."),s("val"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`    
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1);function f(w,h){const o=a("Badge"),c=a("ExternalLinkIcon"),l=a("CodeTabs");return r(),k("div",null,[m,t(o,{text:"中等",type:"warning",vertical:"middle"}),n("p",null,[n("a",v,[s("题目描述"),t(c)])]),_,t(l,{id:"11",data:[{id:"Java"}]},{title0:e(({value:p,isActive:u})=>[s("Java")]),tab0:e(({value:p,isActive:u})=>[b]),_:1})])}const N=i(d,[["render",f],["__file","leetcode_199. 二叉树的右视图.html.vue"]]);export{N as default};
