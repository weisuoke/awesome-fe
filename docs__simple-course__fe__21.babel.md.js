(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[150],{rdU8:function(e,l,a){"use strict";a.r(l);var n=a("q1tI"),t=a.n(n),c=a("dEAq"),r=a("H1Ra"),o=t.a.memo((e=>{e.demos;return t.a.createElement(t.a.Fragment,null,t.a.createElement("div",{className:"markdown"},t.a.createElement("h1",{id:"babel"},t.a.createElement(c["AnchorLink"],{to:"#babel","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"Babel"),t.a.createElement("h2",{id:"babel-\u662f\u4ec0\u4e48"},t.a.createElement(c["AnchorLink"],{to:"#babel-\u662f\u4ec0\u4e48","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"Babel \u662f\u4ec0\u4e48"),t.a.createElement("ul",null,t.a.createElement("li",null,"\u8bed\u6cd5\u8f6c\u6362\uff0c\u4e00\u822c\u662f\u9ad8\u7ea7\u8bed\u8a00\u7279\u6027\u7684\u964d\u7ea7"),t.a.createElement("li",null,"Polyfill (\u57ab\u7247/\u8865\u4e01) \u7279\u6027\u7684\u5b9e\u73b0\u548c\u63a5\u5165"),t.a.createElement("li",null,"\u6e90\u7801\u8f6c\u6362\uff0c\u6bd4\u5982 JSX \u7b49")),t.a.createElement("p",null,"\u5728\u5de5\u7a0b\u5316\u7684\u89d2\u5ea6\u4e0a\uff0c\u9700\u8981\u79c9\u627f\u4ee5\u4e0b\u7406\u5ff5\uff1a"),t.a.createElement("ul",null,t.a.createElement("li",null,"\u53ef\u63d2\u62d4\uff08Pluggable\uff09"),t.a.createElement("li",null,"\u53ef\u8c03\u8bd5\uff08Debuggable\uff09"),t.a.createElement("li",null,"\u57fa\u4e8e\u534f\u5b9a\uff08Compact\uff09")),t.a.createElement("p",null,"\u7f16\u8bd1\u662f Babel \u7684\u6838\u5fc3\u76ee\u6807"),t.a.createElement("p",null,"\u81ea\u8eab\u7684\u5b9e\u73b0\u57fa\u4e8e\u7f16\u8bd1\u539f\u7406\uff0c\u6df1\u5165AST(\u62bd\u8c61\u8bed\u6cd5\u6811)\u6765\u751f\u6210\u76ee\u6807\u4ee3\u7801"),t.a.createElement("h2",{id:"babel-monorepo-\u67b6\u6784\u5305\u89e3\u6790"},t.a.createElement(c["AnchorLink"],{to:"#babel-monorepo-\u67b6\u6784\u5305\u89e3\u6790","aria-hidden":"true",tabIndex:-1},t.a.createElement("span",{className:"icon icon-link"})),"Babel Monorepo \u67b6\u6784\u5305\u89e3\u6790"),t.a.createElement("ul",null,t.a.createElement("li",null,"Babel \u4e00\u4e9b\u5305\u7684\u610f\u4e49\u662f\u5728\u5de5\u7a0b\u4e0a\u8d77\u4f5c\u7528\uff0c\u5bf9\u4e8e\u4e1a\u52a1\u6765\u8bf4\u662f\u4e0d\u900f\u660e\u7684\uff0c\u6bd4\u5982\u4e00\u4e9b\u63d2\u4ef6\u53ef\u80fd\u88ab Babel preset \u9884\u8bbe\u673a\u5236\u6253\u5305\u5bf9\u5916\u8f93\u51fa\u3002"),t.a.createElement("li",null,"Babel\u4e00\u4e9b\u5305\u662f\u4e3a\u4e86\u7eaf\u5de5\u7a0b\u9879\u76ee\u8d77\u4f5c\u7528\uff0c\u6216\u8005\u8fd0\u884c\u76ee\u6807\u5728 Node.js \u73af\u5883\u4e2d")),t.a.createElement("p",null,t.a.createElement("code",null,"@babel/cli"),"\u662fBabel\u63d0\u4f9b\u7684\u547d\u4ee4\u884c"),t.a.createElement(r["a"],{code:'var babel = require("@babel/core")\n\nbabel.transform(code, options, function(err, result) {\n  result;\t// {code, map, ast}\n})',lang:"js"}),t.a.createElement("p",null,t.a.createElement("code",null,"@babel/core"),"\u662fBabel\u5b9e\u73b0\u8f6c\u6362\u7684\u6838\u5fc3"),t.a.createElement("p",null,"\u4f5c\u4e3a @babel/cli \u7684\u5173\u952e\u4f9d\u8d56\uff0c@babel/core\u63d0\u4f9b\u4e86\u57fa\u7840\u7684\u7f16\u8bd1\u80fd\u529b"),t.a.createElement("p",null,t.a.createElement("strong",null,"@babel/standalone")),t.a.createElement("ul",null,t.a.createElement("li",null,"\u5728\u6d4f\u89c8\u5668\u4e2d\u76f4\u63a5\u6267\u884c"),t.a.createElement("li",null,"Web IDE\u548c\u667a\u80fd\u5316\u65b9\u5411")),t.a.createElement("p",null,t.a.createElement("img",{src:"http://wuxiao-tech-doc.oss-cn-hangzhou.aliyuncs.com/2021-12-29-045915.png",alt:"image-20211229125911920"})),t.a.createElement("p",null,t.a.createElement("img",{src:"http://wuxiao-tech-doc.oss-cn-hangzhou.aliyuncs.com/2021-12-29-051622.png",alt:"image-20211229131620956"})),t.a.createElement("p",null,t.a.createElement("code",null,"@babel/preset-env"),"\u662f\u76f4\u63a5\u66b4\u9732\u7ed9\u5f00\u53d1\u8005\u5728\u4e1a\u52a1\u4e2d\u8fd0\u7528\u7684\u5305\u80fd\u529b"),t.a.createElement("p",null,t.a.createElement("code",null,"@babel/polyfill"),"\u662fcore-js\u548cregenerator-runtime\u4e24\u4e2a\u5305\u7684\u7ed3\u5408"),t.a.createElement("p",null,t.a.createElement("strong",null,t.a.createElement("code",null,"@babel/plugin-transform-runtime")))))}));l["default"]=e=>{var l=t.a.useContext(c["context"]),a=l.demos;return t.a.useEffect((()=>{var l;null!==e&&void 0!==e&&null!==(l=e.location)&&void 0!==l&&l.hash&&c["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),t.a.createElement(o,{demos:a})}}}]);