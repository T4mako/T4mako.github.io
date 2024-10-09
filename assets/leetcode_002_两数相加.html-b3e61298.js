import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as r,c as u,e as l,w as a,b as n,d as s}from"./app-591f25ed.js";const k={},d=n("h1",{id:"_002-两数相加",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_002-两数相加","aria-hidden":"true"},"#"),s(" 002. 两数相加")],-1),m=n("h2",{id:"解法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#解法","aria-hidden":"true"},"#"),s(" 解法：")],-1),b=n("div",{class:"language-java line-numbers-mode","data-ext":"java"},[n("pre",{class:"language-java"},[n("code",null,[n("span",{class:"token doc-comment comment"},[s(`/**
 * Definition for singly-linked list.
 * public class ListNode `),n("span",{class:"token punctuation"},"{"),s(`
 *     int val;
 *     ListNode next;
 *     ListNode() `),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),s(`
 *     ListNode(int val) `),n("span",{class:"token punctuation"},"{"),s(" this.val = val; "),n("span",{class:"token punctuation"},"}"),s(`
 *     ListNode(int val, ListNode next) `),n("span",{class:"token punctuation"},"{"),s(" this.val = val; this.next = next; "),n("span",{class:"token punctuation"},"}"),s(`
 * `),n("span",{class:"token punctuation"},"}"),s(`
 */`)]),s(`
`),n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"Solution"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token class-name"},"ListNode"),s(),n("span",{class:"token function"},"addTwoNumbers"),n("span",{class:"token punctuation"},"("),n("span",{class:"token class-name"},"ListNode"),s(" l1"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token class-name"},"ListNode"),s(" l2"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token class-name"},"ListNode"),s(" result "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(),n("span",{class:"token class-name"},"ListNode"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// 返回结果链表"),s(`
        `),n("span",{class:"token class-name"},"ListNode"),s(" cur "),n("span",{class:"token operator"},"="),s(" result"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// 链表头"),s(`
        `),n("span",{class:"token keyword"},"int"),s(" i "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// 进位"),s(`
        `),n("span",{class:"token keyword"},"while"),n("span",{class:"token punctuation"},"("),s("l1 "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"||"),s(" l2 "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"||"),s(" i "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token keyword"},"int"),s(" x "),n("span",{class:"token operator"},"="),s(" l1 "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"?"),s(" l1"),n("span",{class:"token punctuation"},"."),s("val "),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// 溢出，赋值为0"),s(`
            `),n("span",{class:"token keyword"},"int"),s(" y "),n("span",{class:"token operator"},"="),s(" l2 "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"?"),s(" l2"),n("span",{class:"token punctuation"},"."),s("val "),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(`
            cur`),n("span",{class:"token punctuation"},"."),s("next "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(),n("span",{class:"token class-name"},"ListNode"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),s("x"),n("span",{class:"token operator"},"+"),s("y"),n("span",{class:"token operator"},"+"),s("i"),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},"%"),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
            i `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),s("x"),n("span",{class:"token operator"},"+"),s("y"),n("span",{class:"token operator"},"+"),s("i"),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},"/"),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token comment"},"// 进位"),s(`
            cur `),n("span",{class:"token operator"},"="),s(" cur"),n("span",{class:"token punctuation"},"."),s("next"),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token keyword"},"if"),n("span",{class:"token punctuation"},"("),s("l1 "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s("l1 "),n("span",{class:"token operator"},"="),s(" l1"),n("span",{class:"token punctuation"},"."),s("next"),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token keyword"},"if"),n("span",{class:"token punctuation"},"("),s("l2 "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s("l2 "),n("span",{class:"token operator"},"="),s(" l2"),n("span",{class:"token punctuation"},"."),s("next"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" result"),n("span",{class:"token punctuation"},"."),s("next"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),v=n("div",{class:"language-python line-numbers-mode","data-ext":"py"},[n("pre",{class:"language-python"},[n("code",null,[n("span",{class:"token comment"},"# Definition for singly-linked list."),s(`
`),n("span",{class:"token comment"},"# class ListNode(object):"),s(`
`),n("span",{class:"token comment"},"#     def __init__(self, val=0, next=None):"),s(`
`),n("span",{class:"token comment"},"#         self.val = val"),s(`
`),n("span",{class:"token comment"},"#         self.next = next"),s(`
`),n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"Solution"),n("span",{class:"token punctuation"},"("),n("span",{class:"token builtin"},"object"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token keyword"},"def"),s(),n("span",{class:"token function"},"addTwoNumbers"),n("span",{class:"token punctuation"},"("),s("self"),n("span",{class:"token punctuation"},","),s(" l1"),n("span",{class:"token punctuation"},","),s(" l2"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},":"),s(`
        `),n("span",{class:"token triple-quoted-string string"},`"""
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """`),s(`
        res `),n("span",{class:"token operator"},"="),s(" ListNode"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
        cur `),n("span",{class:"token operator"},"="),s(` res
        carry `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),s(`
        `),n("span",{class:"token keyword"},"while"),s(" l1 "),n("span",{class:"token keyword"},"is"),s(),n("span",{class:"token keyword"},"not"),s(),n("span",{class:"token boolean"},"None"),s(),n("span",{class:"token keyword"},"or"),s(" l2 "),n("span",{class:"token keyword"},"is"),s(),n("span",{class:"token keyword"},"not"),s(),n("span",{class:"token boolean"},"None"),s(),n("span",{class:"token keyword"},"or"),s(" carry "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},":"),s(`
            x `),n("span",{class:"token operator"},"="),s(" l1"),n("span",{class:"token punctuation"},"."),s("val "),n("span",{class:"token keyword"},"if"),s(" l1 "),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token number"},"0"),s(`
            y `),n("span",{class:"token operator"},"="),s(" l2"),n("span",{class:"token punctuation"},"."),s("val "),n("span",{class:"token keyword"},"if"),s(" l2 "),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token number"},"0"),s(`
            
            total `),n("span",{class:"token operator"},"="),s(" x "),n("span",{class:"token operator"},"+"),s(" y "),n("span",{class:"token operator"},"+"),s(` carry
            carry `),n("span",{class:"token operator"},"="),s(" total "),n("span",{class:"token operator"},"//"),s(),n("span",{class:"token number"},"10"),s(`
            cur`),n("span",{class:"token punctuation"},"."),n("span",{class:"token builtin"},"next"),s(),n("span",{class:"token operator"},"="),s(" ListNode"),n("span",{class:"token punctuation"},"("),s("total "),n("span",{class:"token operator"},"%"),s(),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},")"),s(`
            
            cur `),n("span",{class:"token operator"},"="),s(" cur"),n("span",{class:"token punctuation"},"."),n("span",{class:"token builtin"},"next"),s(`
            `),n("span",{class:"token keyword"},"if"),s(" l1"),n("span",{class:"token punctuation"},":"),s(" l1 "),n("span",{class:"token operator"},"="),s(" l1"),n("span",{class:"token punctuation"},"."),n("span",{class:"token builtin"},"next"),s(`
            `),n("span",{class:"token keyword"},"if"),s(" l2"),n("span",{class:"token punctuation"},":"),s(" l2 "),n("span",{class:"token operator"},"="),s(" l2"),n("span",{class:"token punctuation"},"."),n("span",{class:"token builtin"},"next"),s(`
        
        `),n("span",{class:"token keyword"},"return"),s(" res"),n("span",{class:"token punctuation"},"."),n("span",{class:"token builtin"},"next"),s(`
        
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1);function y(w,_){const c=o("Badge"),p=o("CodeTabs");return r(),u("div",null,[d,l(c,{text:"中等",type:"warning",vertical:"middle"}),m,l(p,{id:"8",data:[{id:"Java"},{id:"Python"}]},{title0:a(({value:e,isActive:t})=>[s("Java")]),title1:a(({value:e,isActive:t})=>[s("Python")]),tab0:a(({value:e,isActive:t})=>[b]),tab1:a(({value:e,isActive:t})=>[v]),_:1})])}const f=i(k,[["render",y],["__file","leetcode_002_两数相加.html.vue"]]);export{f as default};
