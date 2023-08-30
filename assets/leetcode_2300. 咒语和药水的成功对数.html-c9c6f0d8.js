import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as r,c as k,e as t,b as n,d as s,w as e}from"./app-417c7cea.js";const d={},m=n("h1",{id:"_2300-咒语和药水的成功对数",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2300-咒语和药水的成功对数","aria-hidden":"true"},"#"),s(" 2300. 咒语和药水的成功对数")],-1),_={href:"https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/description/?envType=study-plan-v2&envId=leetcode-75",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,[s("解题思路："),n("br"),s(" 将 "),n("code",null,"spells"),s(" 数组排序，再遍历 "),n("code",null,"potions"),s(" 数组，在 "),n("code",null,"spells"),s(" 数组中找到第一个与 "),n("code",null,"potions[i]"),s(" 相乘大于等于 "),n("code",null,"success"),s(" 的位置")],-1),b=n("div",{class:"language-java line-numbers-mode","data-ext":"java"},[n("pre",{class:"language-java"},[n("code",null,[n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"Solution"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"int"),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token function"},"successfulPairs"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"int"),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(" spells"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"int"),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(" potions"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"long"),s(" success"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token comment"},"// 返回结果数组"),s(`
        `),n("span",{class:"token keyword"},"int"),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(" res "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(),n("span",{class:"token keyword"},"int"),n("span",{class:"token punctuation"},"["),s("spells"),n("span",{class:"token punctuation"},"."),s("length"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token comment"},"// 将 potions 排序"),s(`
        `),n("span",{class:"token class-name"},"Arrays"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"sort"),n("span",{class:"token punctuation"},"("),s("potions"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token keyword"},"for"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"int"),s(" i "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(" i "),n("span",{class:"token operator"},"<"),s(" spells"),n("span",{class:"token punctuation"},"."),s("length"),n("span",{class:"token punctuation"},";"),s(" i"),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token keyword"},"int"),s(" l "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token keyword"},"int"),s(" r "),n("span",{class:"token operator"},"="),s("  potions"),n("span",{class:"token punctuation"},"."),s("length "),n("span",{class:"token operator"},"-"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token keyword"},"int"),s(" index "),n("span",{class:"token operator"},"="),s(" potions"),n("span",{class:"token punctuation"},"."),s("length"),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token comment"},"// 二分查找"),s(`
            `),n("span",{class:"token keyword"},"while"),n("span",{class:"token punctuation"},"("),s("l "),n("span",{class:"token operator"},"<="),s(" r"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),s(`
                `),n("span",{class:"token keyword"},"int"),s(" m "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),s("r "),n("span",{class:"token operator"},"-"),s(" l"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"/"),s(),n("span",{class:"token number"},"2"),s(),n("span",{class:"token operator"},"+"),s(" l"),n("span",{class:"token punctuation"},";"),s(`
                `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"long"),n("span",{class:"token punctuation"},")"),s("spells"),n("span",{class:"token punctuation"},"["),s("i"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"*"),s(" potions"),n("span",{class:"token punctuation"},"["),s("m"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},">="),s(" success"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
                    r `),n("span",{class:"token operator"},"="),s(" m "),n("span",{class:"token operator"},"-"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(`
                    index `),n("span",{class:"token operator"},"="),s(" m"),n("span",{class:"token punctuation"},";"),s(`
                `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
                    l `),n("span",{class:"token operator"},"="),s(" m "),n("span",{class:"token operator"},"+"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},";"),s(`
                `),n("span",{class:"token punctuation"},"}"),s(`
            `),n("span",{class:"token punctuation"},"}"),s(`
            res`),n("span",{class:"token punctuation"},"["),s("i"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"="),s(" potions"),n("span",{class:"token punctuation"},"."),s("length "),n("span",{class:"token operator"},"-"),s(" index"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" res"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1);function w(y,h){const o=a("Badge"),c=a("ExternalLinkIcon"),l=a("CodeTabs");return r(),k("div",null,[m,t(o,{text:"中等",type:"warning",vertical:"middle"}),n("p",null,[n("a",_,[s("题目描述"),t(c)])]),v,t(l,{id:"11",data:[{id:"Java"}]},{title0:e(({value:p,isActive:u})=>[s("Java")]),tab0:e(({value:p,isActive:u})=>[b]),_:1})])}const x=i(d,[["render",w],["__file","leetcode_2300. 咒语和药水的成功对数.html.vue"]]);export{x as default};
