// @ts-nocheck
// umi.server.js
import '/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/node_modules/@umijs/preset-built-in/node_modules/regenerator-runtime/runtime.js';
import { format } from 'url';
import renderServer from '/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/node_modules/@umijs/preset-built-in/lib/plugins/features/ssr/templates/renderServer/renderServer.js';
import { stripBasename, cheerio, handleHTML } from '/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/node_modules/@umijs/preset-built-in/lib/plugins/features/ssr/templates/utils.js';
import { IServerRender } from '@umijs/types';

import { ApplyPluginsType, createMemoryHistory, dynamic } from '/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/node_modules/@umijs/runtime';
import { plugin } from './plugin';
import './pluginRegister';

// origin require module
// https://github.com/webpack/webpack/issues/4175#issuecomment-342931035
const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;

/**
 * server render function
 * @param params
 */
const render: IServerRender = async (params) => {
  let error;
  const {
    origin = '',
    path,
    htmlTemplate = '',
    mountElementId = 'root',
    context = {},
    mode = 'string',
    basename = '/',
    staticMarkup = false,
    forceInitial = false,
    removeWindowInitialProps = false,
    getInitialPropsCtx,
  } = params;
  let manifest = params.manifest;
  const env = 'production';

  let html = htmlTemplate || "\u003C!DOCTYPE html\u003E\n\u003Chtml\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\" \u002F\u003E\n    \u003Cmeta\n      name=\"viewport\"\n      content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\"\n    \u002F\u003E\n    \u003Clink rel=\"stylesheet\" href=\"\u002Fumi.css\" \u002F\u003E\n    \u003Cscript\u003E\n      window.routerBase = \"\u002F\";\n    \u003C\u002Fscript\u003E\n    \u003Cscript\u003E\n      \u002F\u002F! umi version: 3.5.23\n    \u003C\u002Fscript\u003E\n    \u003Cscript\u003E\n      !(function () {\n        var e = localStorage.getItem(\"dumi:prefers-color\"),\n          t = window.matchMedia(\"(prefers-color-scheme: dark)\").matches,\n          r = [\"light\", \"dark\", \"auto\"];\n        document.documentElement.setAttribute(\n          \"data-prefers-color\",\n          e === r[2] ? (t ? r[1] : r[0]) : r.indexOf(e) \u003E -1 ? e : r[0]\n        );\n      })();\n    \u003C\u002Fscript\u003E\n    \u003Ctitle\u003EWuxiao.io's Blog\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E\n    \u003Cdiv id=\"root\"\u003E\u003C\u002Fdiv\u003E\n\n    \u003Cscript src=\"\u002Fumi.js\"\u003E\u003C\u002Fscript\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E\n";
  let rootContainer = '';
  try {
    // handle basename
    const location = stripBasename(basename, `${origin}${path}`);
    const { pathname } = location;
    // server history
    const history = createMemoryHistory({
      initialEntries: [format(location)],
    });
    /**
     * beforeRenderServer hook, for polyfill global.*
     */
    await plugin.applyPlugins({
      key: 'ssr.beforeRenderServer',
      type: ApplyPluginsType.event,
      args: {
        env,
        path,
        context,
        history,
        mode,
        location,
      },
      async: true,
    });

    /**
     * routes init and patch only once
     * beforeRenderServer must before routes init avoding require error
     */
    // 主要为后面支持按需服务端渲染，单独用 routes 会全编译
    const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => dynamic({
          loader: async () => {
            const React = await import('react');
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ '/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
            const { default: Previewer } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi-theme-default/es/builtins/Previewer.js');
            const { usePrefersColor, context } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi/theme');

            return props => {
              
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
            }
          },
          loading: () => null,
        }))()
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1650381009000,
          "title": "Wuxiao.io's Blog",
          "order": 10,
          "hero": {
            "title": "Wuxiao.io's Blog",
            "desc": "<div class=\"markdown\"><p>📚 有趣的前端 架构 | 思路 | 效率</p></div>",
            "actions": [
              {
                "text": "开始阅读",
                "link": "/wiki"
              }
            ]
          },
          "features": [
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png",
              "title": "完整体系",
              "desc": "<div class=\"markdown\"><p>根据官方文档及社区建设构建尽可能实用的知识体系，宏观掌握技术体系</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png",
              "title": "深度分析",
              "desc": "<div class=\"markdown\"><p>尽览社区精品技术文章，将最受业界欢迎的使用方法收录其中</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png",
              "title": "开发指南",
              "desc": "<div class=\"markdown\"><p>体系化整理，随时查阅具体技术细节，方便前端开发者日常开发</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2020-present<br />Powered by wuxiao</p></div>",
          "slugs": []
        },
        "title": "Wuxiao.io's Blog - Wuxiao.io's Blog",
        "_chunkName": "docs__index.md"
      },
      {
        "path": "/awesome",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/index.md",
          "updatedTime": 1654440354000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "title": "Awesome",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Awesome",
              "heading": "awesome"
            },
            {
              "depth": 2,
              "value": "个人技术栈",
              "heading": "个人技术栈"
            },
            {
              "depth": 2,
              "value": "”玩物丧志“",
              "heading": "玩物丧志"
            }
          ]
        },
        "title": "Awesome - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__index.md"
      },
      {
        "path": "/awesome/personal/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/01.react.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/01.react.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "React",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Awesome React",
              "heading": "awesome-react"
            },
            {
              "depth": 2,
              "value": "Router",
              "heading": "router"
            },
            {
              "depth": 2,
              "value": "Components",
              "heading": "components"
            },
            {
              "depth": 2,
              "value": "Component",
              "heading": "component"
            },
            {
              "depth": 2,
              "value": "State Management",
              "heading": "state-management"
            },
            {
              "depth": 2,
              "value": "Hooks",
              "heading": "hooks"
            },
            {
              "depth": 2,
              "value": "CLI",
              "heading": "cli"
            },
            {
              "depth": 2,
              "value": "Framework",
              "heading": "framework"
            },
            {
              "depth": 2,
              "value": "SSG",
              "heading": "ssg"
            },
            {
              "depth": 2,
              "value": "Tools",
              "heading": "tools"
            },
            {
              "depth": 3,
              "value": "HOC",
              "heading": "hoc"
            },
            {
              "depth": 3,
              "value": "ENV",
              "heading": "env"
            },
            {
              "depth": 3,
              "value": "immutable",
              "heading": "immutable"
            },
            {
              "depth": 3,
              "value": "Request",
              "heading": "request"
            },
            {
              "depth": 2,
              "value": "Animation",
              "heading": "animation"
            },
            {
              "depth": 2,
              "value": "Three",
              "heading": "three"
            },
            {
              "depth": 2,
              "value": "Optimize",
              "heading": "optimize"
            },
            {
              "depth": 2,
              "value": "Boilerplate",
              "heading": "boilerplate"
            },
            {
              "depth": 2,
              "value": "Document",
              "heading": "document"
            },
            {
              "depth": 3,
              "value": "Visualization",
              "heading": "visualization"
            },
            {
              "depth": 2,
              "value": "Application",
              "heading": "application"
            },
            {
              "depth": 3,
              "value": "Admin",
              "heading": "admin"
            },
            {
              "depth": 3,
              "value": "system",
              "heading": "system"
            },
            {
              "depth": 3,
              "value": "ecommerce",
              "heading": "ecommerce"
            },
            {
              "depth": 3,
              "value": "clone",
              "heading": "clone"
            },
            {
              "depth": 3,
              "value": "blog",
              "heading": "blog"
            },
            {
              "depth": 2,
              "value": "Accessibility",
              "heading": "accessibility"
            },
            {
              "depth": 2,
              "value": "knowledge",
              "heading": "knowledge"
            },
            {
              "depth": 2,
              "value": "Loader",
              "heading": "loader"
            },
            {
              "depth": 2,
              "value": "跨端",
              "heading": "跨端"
            },
            {
              "depth": 2,
              "value": "Gatsby",
              "heading": "gatsby"
            },
            {
              "depth": 3,
              "value": "Template",
              "heading": "template"
            },
            {
              "depth": 2,
              "value": "NextJS",
              "heading": "nextjs"
            }
          ]
        },
        "title": "React - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__01.react.md"
      },
      {
        "path": "/awesome/personal/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/02.js-utils.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/02.js-utils.md",
          "updatedTime": 1660922514000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "JS Utils",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "JS Utils",
              "heading": "js-utils"
            },
            {
              "depth": 2,
              "value": "Utils",
              "heading": "utils"
            },
            {
              "depth": 3,
              "value": "Object",
              "heading": "object"
            },
            {
              "depth": 2,
              "value": "Math",
              "heading": "math"
            },
            {
              "depth": 2,
              "value": "Currency",
              "heading": "currency"
            },
            {
              "depth": 2,
              "value": "Promisify",
              "heading": "promisify"
            },
            {
              "depth": 2,
              "value": "URL",
              "heading": "url"
            },
            {
              "depth": 2,
              "value": "Component",
              "heading": "component"
            },
            {
              "depth": 2,
              "value": "Concurrency",
              "heading": "concurrency"
            },
            {
              "depth": 2,
              "value": "Address",
              "heading": "address"
            },
            {
              "depth": 2,
              "value": "Browser",
              "heading": "browser"
            },
            {
              "depth": 2,
              "value": "JS API",
              "heading": "js-api"
            },
            {
              "depth": 2,
              "value": "Regexp",
              "heading": "regexp"
            },
            {
              "depth": 2,
              "value": "EventBus",
              "heading": "eventbus"
            },
            {
              "depth": 2,
              "value": "QRCode",
              "heading": "qrcode"
            },
            {
              "depth": 2,
              "value": "Tools",
              "heading": "tools"
            },
            {
              "depth": 2,
              "value": "KaTeX",
              "heading": "katex"
            },
            {
              "depth": 2,
              "value": "XSS",
              "heading": "xss"
            }
          ]
        },
        "title": "JS Utils - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__02.js-utils.md"
      },
      {
        "path": "/awesome/personal/03",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/03.react-native.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/03.react-native.md",
          "updatedTime": 1654822107000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "React Native",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "React Native",
              "heading": "react-native"
            },
            {
              "depth": 2,
              "value": "Platform",
              "heading": "platform"
            },
            {
              "depth": 2,
              "value": "Route",
              "heading": "route"
            },
            {
              "depth": 2,
              "value": "UI Component Framework",
              "heading": "ui-component-framework"
            },
            {
              "depth": 2,
              "value": "UI Component",
              "heading": "ui-component"
            },
            {
              "depth": 2,
              "value": "Animation",
              "heading": "animation"
            },
            {
              "depth": 2,
              "value": "Boilerplate",
              "heading": "boilerplate"
            },
            {
              "depth": 2,
              "value": "Tools",
              "heading": "tools"
            },
            {
              "depth": 2,
              "value": "Application",
              "heading": "application"
            },
            {
              "depth": 2,
              "value": "Database",
              "heading": "database"
            }
          ]
        },
        "title": "React Native - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__03.react-native.md"
      },
      {
        "path": "/awesome/personal/04",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/04.node.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/04.node.md",
          "updatedTime": 1654962358000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "Node",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Node",
              "heading": "node"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "Web Framework",
              "heading": "web-framework"
            },
            {
              "depth": 3,
              "value": "ORM",
              "heading": "orm"
            },
            {
              "depth": 3,
              "value": "http",
              "heading": "http"
            },
            {
              "depth": 3,
              "value": "CMS",
              "heading": "cms"
            },
            {
              "depth": 3,
              "value": "Workflow",
              "heading": "workflow"
            },
            {
              "depth": 3,
              "value": "Best Practice",
              "heading": "best-practice"
            },
            {
              "depth": 3,
              "value": "Boilerplate",
              "heading": "boilerplate"
            },
            {
              "depth": 3,
              "value": "Low Code",
              "heading": "low-code"
            },
            {
              "depth": 3,
              "value": "IM",
              "heading": "im"
            },
            {
              "depth": 3,
              "value": "cli",
              "heading": "cli"
            },
            {
              "depth": 3,
              "value": "Package Management",
              "heading": "package-management"
            },
            {
              "depth": 3,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Application",
              "heading": "application"
            },
            {
              "depth": 3,
              "value": "Demo",
              "heading": "demo"
            },
            {
              "depth": 3,
              "value": "Knowledge",
              "heading": "knowledge"
            },
            {
              "depth": 3,
              "value": "Bot",
              "heading": "bot"
            },
            {
              "depth": 3,
              "value": "Private npm",
              "heading": "private-npm"
            },
            {
              "depth": 3,
              "value": "Terminal",
              "heading": "terminal"
            },
            {
              "depth": 2,
              "value": "ECO",
              "heading": "eco"
            }
          ]
        },
        "title": "Node - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__04.node.md"
      },
      {
        "path": "/awesome/personal/05",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/05.algorithm.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/05.algorithm.md",
          "updatedTime": 1654258106000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "Algorithm",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Algorithm",
              "heading": "algorithm"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "JavaScript",
              "heading": "javascript"
            },
            {
              "depth": 3,
              "value": "Java",
              "heading": "java"
            },
            {
              "depth": 3,
              "value": "leetcode",
              "heading": "leetcode"
            }
          ]
        },
        "title": "Algorithm - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__05.algorithm.md"
      },
      {
        "path": "/awesome/personal/06",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/06.js.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/06.js.md",
          "updatedTime": 1656290663000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "JS",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "JS",
              "heading": "js"
            },
            {
              "depth": 2,
              "value": "Framework",
              "heading": "framework"
            },
            {
              "depth": 3,
              "value": "Deno",
              "heading": "deno"
            },
            {
              "depth": 2,
              "value": "Component",
              "heading": "component"
            },
            {
              "depth": 2,
              "value": "Build-Tools",
              "heading": "build-tools"
            },
            {
              "depth": 2,
              "value": "Cli",
              "heading": "cli"
            },
            {
              "depth": 3,
              "value": "Web Worker",
              "heading": "web-worker"
            },
            {
              "depth": 2,
              "value": "Knowledge",
              "heading": "knowledge"
            },
            {
              "depth": 2,
              "value": "Mock",
              "heading": "mock"
            },
            {
              "depth": 2,
              "value": "optimize",
              "heading": "optimize"
            },
            {
              "depth": 2,
              "value": "Excel",
              "heading": "excel"
            },
            {
              "depth": 2,
              "value": "Serverless",
              "heading": "serverless"
            },
            {
              "depth": 2,
              "value": "WebRTC",
              "heading": "webrtc"
            },
            {
              "depth": 2,
              "value": "Best Practice",
              "heading": "best-practice"
            },
            {
              "depth": 2,
              "value": "Map",
              "heading": "map"
            },
            {
              "depth": 2,
              "value": "Security",
              "heading": "security"
            },
            {
              "depth": 2,
              "value": "Workflow",
              "heading": "workflow"
            },
            {
              "depth": 2,
              "value": "Cloud",
              "heading": "cloud"
            },
            {
              "depth": 3,
              "value": "cloudflare",
              "heading": "cloudflare"
            },
            {
              "depth": 2,
              "value": "DOCUMENT",
              "heading": "document"
            },
            {
              "depth": 2,
              "value": "Application",
              "heading": "application"
            },
            {
              "depth": 3,
              "value": "Admin",
              "heading": "admin"
            },
            {
              "depth": 3,
              "value": "Editor",
              "heading": "editor"
            },
            {
              "depth": 3,
              "value": "Wiki",
              "heading": "wiki"
            },
            {
              "depth": 3,
              "value": "Platform",
              "heading": "platform"
            },
            {
              "depth": 3,
              "value": "Bot",
              "heading": "bot"
            },
            {
              "depth": 3,
              "value": "MindMap",
              "heading": "mindmap"
            },
            {
              "depth": 3,
              "value": "whiteboard",
              "heading": "whiteboard"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "Boilerplate",
              "heading": "boilerplate"
            },
            {
              "depth": 2,
              "value": "VPN",
              "heading": "vpn"
            },
            {
              "depth": 2,
              "value": "Solution",
              "heading": "solution"
            },
            {
              "depth": 2,
              "value": "Performance",
              "heading": "performance"
            },
            {
              "depth": 2,
              "value": "Hardware",
              "heading": "hardware"
            },
            {
              "depth": 2,
              "value": "Playground",
              "heading": "playground"
            },
            {
              "depth": 2,
              "value": "Portfolio",
              "heading": "portfolio"
            },
            {
              "depth": 2,
              "value": "Compiler",
              "heading": "compiler"
            },
            {
              "depth": 2,
              "value": "Shell",
              "heading": "shell"
            },
            {
              "depth": 2,
              "value": "Demo",
              "heading": "demo"
            },
            {
              "depth": 2,
              "value": "WhatApp",
              "heading": "whatapp"
            },
            {
              "depth": 2,
              "value": "Storage",
              "heading": "storage"
            },
            {
              "depth": 2,
              "value": "Audio",
              "heading": "audio"
            },
            {
              "depth": 2,
              "value": "DI",
              "heading": "di"
            },
            {
              "depth": 2,
              "value": "Web Component",
              "heading": "web-component"
            },
            {
              "depth": 2,
              "value": "JAMStack",
              "heading": "jamstack"
            },
            {
              "depth": 2,
              "value": "SSG",
              "heading": "ssg"
            },
            {
              "depth": 2,
              "value": "HeadLess",
              "heading": "headless"
            },
            {
              "depth": 3,
              "value": "GraphCMS",
              "heading": "graphcms"
            },
            {
              "depth": 2,
              "value": "App",
              "heading": "app"
            },
            {
              "depth": 2,
              "value": "AI",
              "heading": "ai"
            },
            {
              "depth": 2,
              "value": "WhatsApp",
              "heading": "whatsapp"
            },
            {
              "depth": 2,
              "value": "Algorithm",
              "heading": "algorithm"
            },
            {
              "depth": 2,
              "value": "Unknown",
              "heading": "unknown"
            }
          ]
        },
        "title": "JS - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__06.js.md"
      },
      {
        "path": "/awesome/personal/07",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/07.css.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/07.css.md",
          "updatedTime": 1656290663000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "CSS",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "CSS",
              "heading": "css"
            },
            {
              "depth": 2,
              "value": "CSS Framework",
              "heading": "css-framework"
            },
            {
              "depth": 2,
              "value": "Design",
              "heading": "design"
            },
            {
              "depth": 2,
              "value": "Design System",
              "heading": "design-system"
            },
            {
              "depth": 2,
              "value": "headlessui",
              "heading": "headlessui"
            },
            {
              "depth": 2,
              "value": "Animation",
              "heading": "animation"
            },
            {
              "depth": 2,
              "value": "CSS-in-JS",
              "heading": "css-in-js"
            }
          ]
        },
        "title": "CSS - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__07.css.md"
      },
      {
        "path": "/awesome/personal/08",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/08.golang.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/08.golang.md",
          "updatedTime": 1661513068000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "Golang",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "Golang",
              "heading": "golang"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "container",
              "heading": "container"
            },
            {
              "depth": 3,
              "value": "ssg",
              "heading": "ssg"
            },
            {
              "depth": 3,
              "value": "web framework",
              "heading": "web-framework"
            },
            {
              "depth": 3,
              "value": "proxy",
              "heading": "proxy"
            },
            {
              "depth": 3,
              "value": "web server",
              "heading": "web-server"
            },
            {
              "depth": 3,
              "value": "monitor",
              "heading": "monitor"
            },
            {
              "depth": 3,
              "value": "cloud",
              "heading": "cloud"
            },
            {
              "depth": 3,
              "value": "microservice",
              "heading": "microservice"
            },
            {
              "depth": 3,
              "value": "distribute",
              "heading": "distribute"
            },
            {
              "depth": 3,
              "value": "rpc",
              "heading": "rpc"
            },
            {
              "depth": 3,
              "value": "compiler",
              "heading": "compiler"
            },
            {
              "depth": 3,
              "value": "Platform",
              "heading": "platform"
            },
            {
              "depth": 3,
              "value": "cli",
              "heading": "cli"
            },
            {
              "depth": 3,
              "value": "knowledge",
              "heading": "knowledge"
            },
            {
              "depth": 3,
              "value": "cli",
              "heading": "cli-1"
            },
            {
              "depth": 3,
              "value": "CI/CD",
              "heading": "cicd"
            },
            {
              "depth": 3,
              "value": "Tools",
              "heading": "tools"
            },
            {
              "depth": 3,
              "value": "AI",
              "heading": "ai"
            },
            {
              "depth": 3,
              "value": "Application",
              "heading": "application"
            },
            {
              "depth": 3,
              "value": "Demo",
              "heading": "demo"
            },
            {
              "depth": 4,
              "value": "ADMIN",
              "heading": "admin"
            },
            {
              "depth": 3,
              "value": "goroutine",
              "heading": "goroutine"
            },
            {
              "depth": 3,
              "value": "debugger",
              "heading": "debugger"
            },
            {
              "depth": 3,
              "value": "sync",
              "heading": "sync"
            },
            {
              "depth": 3,
              "value": "log",
              "heading": "log"
            },
            {
              "depth": 2,
              "value": "Utils",
              "heading": "utils"
            },
            {
              "depth": 2,
              "value": "Unknown",
              "heading": "unknown"
            }
          ]
        },
        "title": "Golang - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__08.golang.md"
      },
      {
        "path": "/awesome/personal/09",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/09.rust.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/09.rust.md",
          "updatedTime": 1661096139000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "Rust",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "Rust",
              "heading": "rust"
            },
            {
              "depth": 2,
              "value": "Web Framework",
              "heading": "web-framework"
            },
            {
              "depth": 2,
              "value": "Network",
              "heading": "network"
            },
            {
              "depth": 2,
              "value": "DNS",
              "heading": "dns"
            },
            {
              "depth": 2,
              "value": "Terminal",
              "heading": "terminal"
            },
            {
              "depth": 2,
              "value": "App",
              "heading": "app"
            },
            {
              "depth": 2,
              "value": "Shell",
              "heading": "shell"
            },
            {
              "depth": 2,
              "value": "ssg",
              "heading": "ssg"
            },
            {
              "depth": 2,
              "value": "Database",
              "heading": "database"
            },
            {
              "depth": 2,
              "value": "Knowledge",
              "heading": "knowledge"
            },
            {
              "depth": 2,
              "value": "Other",
              "heading": "other"
            }
          ]
        },
        "title": "Rust - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__09.rust.md"
      },
      {
        "path": "/awesome/personal/10",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/10.vue.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/10.vue.md",
          "updatedTime": 1656290663000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "Vue",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Vue",
              "heading": "vue"
            },
            {
              "depth": 2,
              "value": "State Management",
              "heading": "state-management"
            },
            {
              "depth": 2,
              "value": "Components",
              "heading": "components"
            },
            {
              "depth": 3,
              "value": "Component",
              "heading": "component"
            },
            {
              "depth": 2,
              "value": "Hooks",
              "heading": "hooks"
            },
            {
              "depth": 2,
              "value": "Tools",
              "heading": "tools"
            },
            {
              "depth": 2,
              "value": "SSG",
              "heading": "ssg"
            },
            {
              "depth": 2,
              "value": "lunzi",
              "heading": "lunzi"
            },
            {
              "depth": 2,
              "value": "Starter",
              "heading": "starter"
            },
            {
              "depth": 2,
              "value": "JAMStack",
              "heading": "jamstack"
            },
            {
              "depth": 2,
              "value": "Knowledge",
              "heading": "knowledge"
            },
            {
              "depth": 2,
              "value": "Demo",
              "heading": "demo"
            },
            {
              "depth": 2,
              "value": "Application",
              "heading": "application"
            },
            {
              "depth": 3,
              "value": "ECommerce",
              "heading": "ecommerce"
            },
            {
              "depth": 3,
              "value": "Admin",
              "heading": "admin"
            },
            {
              "depth": 2,
              "value": "FRP",
              "heading": "frp"
            }
          ]
        },
        "title": "Vue - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__10.vue.md"
      },
      {
        "path": "/awesome/personal/11",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/11.database.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/11.database.md",
          "updatedTime": 1653143101000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "Database",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "Database",
              "heading": "database"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            }
          ]
        },
        "title": "Database - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__11.database.md"
      },
      {
        "path": "/awesome/personal/12",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/12.general.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/12.general.md",
          "updatedTime": 1655684690000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "General",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "General",
              "heading": "general"
            },
            {
              "depth": 2,
              "value": "Computer Science",
              "heading": "computer-science"
            },
            {
              "depth": 2,
              "value": "Checklist",
              "heading": "checklist"
            },
            {
              "depth": 2,
              "value": "Blog",
              "heading": "blog"
            },
            {
              "depth": 2,
              "value": "Knowledge",
              "heading": "knowledge"
            },
            {
              "depth": 2,
              "value": "VPN",
              "heading": "vpn"
            },
            {
              "depth": 2,
              "value": "Clean Code",
              "heading": "clean-code"
            }
          ]
        },
        "title": "General - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__12.general.md"
      },
      {
        "path": "/awesome/personal/13",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/13.angular.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/13.angular.md",
          "updatedTime": 1654616986000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "Angular",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "Angular",
              "heading": "angular"
            },
            {
              "depth": 2,
              "value": "Reactive",
              "heading": "reactive"
            },
            {
              "depth": 2,
              "value": "Components",
              "heading": "components"
            }
          ]
        },
        "title": "Angular - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__13.angular.md"
      },
      {
        "path": "/awesome/personal/14",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/personal/14.bun.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/personal/14.bun.md",
          "updatedTime": 1659280439000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "基本",
            "order": 2,
            "__fallback": true,
            "path": "/awesome/personal"
          },
          "title": "Bun",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "Bun",
              "heading": "bun"
            }
          ]
        },
        "title": "Bun - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__personal__14.bun.md"
      },
      {
        "path": "/awesome/play/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/01.简历.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/01.简历.md",
          "updatedTime": 1650902193000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "简历项目",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "简历项目",
              "heading": "简历项目"
            },
            {
              "depth": 2,
              "value": "1. ResumeSample",
              "heading": "1-resumesample"
            },
            {
              "depth": 2,
              "value": "2. Markdown-Resume",
              "heading": "2-markdown-resume"
            },
            {
              "depth": 2,
              "value": "3. awesome-resume",
              "heading": "3-awesome-resume"
            },
            {
              "depth": 2,
              "value": "4. DeerResume",
              "heading": "4-deerresume"
            },
            {
              "depth": 2,
              "value": "5.  markdown-resume",
              "heading": "5--markdown-resume"
            },
            {
              "depth": 2,
              "value": "6. best-resume-ever",
              "heading": "6-best-resume-ever"
            },
            {
              "depth": 2,
              "value": "7. awesome-resume-for-chinese",
              "heading": "7-awesome-resume-for-chinese"
            },
            {
              "depth": 2,
              "value": "8. resume",
              "heading": "8-resume"
            },
            {
              "depth": 2,
              "value": "9. github-readme-stats",
              "heading": "9-github-readme-stats"
            },
            {
              "depth": 2,
              "value": "轮子",
              "heading": "轮子"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "简历项目 - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__01.简历.md"
      },
      {
        "path": "/awesome/play/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/02.low-code.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/02.low-code.md",
          "updatedTime": 1655628894000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "low-code",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "low-code / no-code",
              "heading": "low-code--no-code"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "Web",
              "heading": "web"
            },
            {
              "depth": 3,
              "value": "Node",
              "heading": "node"
            },
            {
              "depth": 3,
              "value": "Others",
              "heading": "others"
            },
            {
              "depth": 2,
              "value": "Article",
              "heading": "article"
            }
          ]
        },
        "title": "low-code - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__02.low-code.md"
      },
      {
        "path": "/awesome/play/03",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/03.monorepo.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/03.monorepo.md",
          "updatedTime": 1653321054000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "monorepo",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Monorepo",
              "heading": "monorepo"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 2,
              "value": "Article",
              "heading": "article"
            }
          ]
        },
        "title": "monorepo - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__03.monorepo.md"
      },
      {
        "path": "/awesome/play/04",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/04.mfe.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/04.mfe.md",
          "updatedTime": 1653234793000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "micro frontend",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Micro Frontend",
              "heading": "micro-frontend"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "Framework",
              "heading": "framework"
            },
            {
              "depth": 3,
              "value": "Knowledge",
              "heading": "knowledge"
            },
            {
              "depth": 3,
              "value": "Demo",
              "heading": "demo"
            },
            {
              "depth": 2,
              "value": "Article",
              "heading": "article"
            }
          ]
        },
        "title": "micro frontend - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__04.mfe.md"
      },
      {
        "path": "/awesome/play/05",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/05.web3.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/05.web3.md",
          "updatedTime": 1654822107000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "web3",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "web3",
              "heading": "web3"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "Web3",
              "heading": "web3-1"
            },
            {
              "depth": 3,
              "value": "NFT",
              "heading": "nft"
            },
            {
              "depth": 3,
              "value": "Smart Contracts",
              "heading": "smart-contracts"
            },
            {
              "depth": 3,
              "value": "Ethereum",
              "heading": "ethereum"
            },
            {
              "depth": 3,
              "value": "Dapp",
              "heading": "dapp"
            },
            {
              "depth": 3,
              "value": "Game",
              "heading": "game"
            },
            {
              "depth": 3,
              "value": "Knowledge",
              "heading": "knowledge"
            },
            {
              "depth": 3,
              "value": "Test",
              "heading": "test"
            },
            {
              "depth": 2,
              "value": "Website",
              "heading": "website"
            }
          ]
        },
        "title": "web3 - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__05.web3.md"
      },
      {
        "path": "/awesome/play/06",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/06.editor.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/06.editor.md",
          "updatedTime": 1655521794000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "editor",
          "order": 6,
          "slugs": [
            {
              "depth": 2,
              "value": "Rich Editor",
              "heading": "rich-editor"
            },
            {
              "depth": 2,
              "value": "Code Editor",
              "heading": "code-editor"
            }
          ]
        },
        "title": "editor - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__06.editor.md"
      },
      {
        "path": "/awesome/play/07",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/07.design.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/07.design.md",
          "updatedTime": 1650815573000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "design",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "Design",
              "heading": "design"
            }
          ]
        },
        "title": "design - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__07.design.md"
      },
      {
        "path": "/awesome/play/08",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/08.application.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/08.application.md",
          "updatedTime": 1655628894000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "application",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "Application",
              "heading": "application"
            },
            {
              "depth": 2,
              "value": "Web",
              "heading": "web"
            },
            {
              "depth": 3,
              "value": "Admin",
              "heading": "admin"
            },
            {
              "depth": 3,
              "value": "Book",
              "heading": "book"
            }
          ]
        },
        "title": "application - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__08.application.md"
      },
      {
        "path": "/awesome/play/09",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/09.test.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/09.test.md",
          "updatedTime": 1651419102000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "test",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "Test",
              "heading": "test"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "Unit Test",
              "heading": "unit-test"
            },
            {
              "depth": 3,
              "value": "API Test",
              "heading": "api-test"
            },
            {
              "depth": 3,
              "value": "E2E",
              "heading": "e2e"
            },
            {
              "depth": 3,
              "value": "App",
              "heading": "app"
            },
            {
              "depth": 3,
              "value": "Practice",
              "heading": "practice"
            }
          ]
        },
        "title": "test - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__09.test.md"
      },
      {
        "path": "/awesome/play/10",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/10.interview.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/10.interview.md",
          "updatedTime": 1654962358000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "interview",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Interview",
              "heading": "interview"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "CS",
              "heading": "cs"
            },
            {
              "depth": 3,
              "value": "System Design",
              "heading": "system-design"
            },
            {
              "depth": 3,
              "value": "java",
              "heading": "java"
            },
            {
              "depth": 3,
              "value": "FE",
              "heading": "fe"
            },
            {
              "depth": 3,
              "value": "Node",
              "heading": "node"
            },
            {
              "depth": 3,
              "value": "Go",
              "heading": "go"
            },
            {
              "depth": 3,
              "value": "Android",
              "heading": "android"
            },
            {
              "depth": 3,
              "value": "ASK",
              "heading": "ask"
            }
          ]
        },
        "title": "interview - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__10.interview.md"
      },
      {
        "path": "/awesome/play/11",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/11.cli.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/11.cli.md",
          "updatedTime": 1650874227000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "cli",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "Cli",
              "heading": "cli"
            }
          ]
        },
        "title": "cli - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__11.cli.md"
      },
      {
        "path": "/awesome/play/12",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/12.visualization.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/12.visualization.md",
          "updatedTime": 1655480099000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "Visualization",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "Visualization",
              "heading": "visualization"
            },
            {
              "depth": 2,
              "value": "WebGL",
              "heading": "webgl"
            },
            {
              "depth": 3,
              "value": "Graph Editor",
              "heading": "graph-editor"
            }
          ]
        },
        "title": "Visualization - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__12.visualization.md"
      },
      {
        "path": "/awesome/play/13",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/13.canvas.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/13.canvas.md",
          "updatedTime": 1651073982000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "Canvas",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "Canvas",
              "heading": "canvas"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "drawing",
              "heading": "drawing"
            }
          ]
        },
        "title": "Canvas - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__13.canvas.md"
      },
      {
        "path": "/awesome/play/14",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/14.ideas.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/14.ideas.md",
          "updatedTime": 1651246731000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "Ideas",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "Ideas",
              "heading": "ideas"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "Application",
              "heading": "application"
            }
          ]
        },
        "title": "Ideas - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__14.ideas.md"
      },
      {
        "path": "/awesome/play/15",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/15.frp.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/15.frp.md",
          "updatedTime": 1652110555000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "Frp",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "Frp",
              "heading": "frp"
            }
          ]
        },
        "title": "Frp - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__15.frp.md"
      },
      {
        "path": "/awesome/play/16",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/16.electron.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/16.electron.md",
          "updatedTime": 1655684690000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "Electron",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "Electron",
              "heading": "electron"
            },
            {
              "depth": 2,
              "value": "Application",
              "heading": "application"
            }
          ]
        },
        "title": "Electron - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__16.electron.md"
      },
      {
        "path": "/awesome/play/17",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/awesome/play/17.side-job.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/awesome/play/17.side-job.md",
          "updatedTime": 1653143101000,
          "nav": {
            "title": "Awesome",
            "order": 80,
            "path": "/awesome"
          },
          "group": {
            "title": "“玩物丧志”",
            "order": 3,
            "__fallback": true,
            "path": "/awesome/play"
          },
          "title": "Side Job",
          "order": 17,
          "slugs": [
            {
              "depth": 1,
              "value": "Side job",
              "heading": "side-job"
            }
          ]
        },
        "title": "Side Job - Wuxiao.io's Blog",
        "_chunkName": "docs__awesome__play__17.side-job.md"
      },
      {
        "path": "/backlog",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/index.md",
          "updatedTime": 1656552506000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "title": "Backlog",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Backlog",
              "heading": "backlog"
            },
            {
              "depth": 2,
              "value": "Work",
              "heading": "work"
            },
            {
              "depth": 2,
              "value": "Interest",
              "heading": "interest"
            },
            {
              "depth": 3,
              "value": "Series",
              "heading": "series"
            },
            {
              "depth": 2,
              "value": "Interview",
              "heading": "interview"
            }
          ]
        },
        "title": "Backlog - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__index.md"
      },
      {
        "path": "/backlog/knowledge",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/knowledge.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/knowledge.md",
          "updatedTime": 1658070212000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "title": "Backlog",
          "order": 2,
          "slugs": [
            {
              "depth": 2,
              "value": "Knowledge",
              "heading": "knowledge"
            }
          ]
        },
        "title": "Backlog - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__knowledge.md"
      },
      {
        "path": "/backlog/interest/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/01.rust.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/01.rust.md",
          "updatedTime": 1665190626000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "Rust",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Rust",
              "heading": "rust"
            },
            {
              "depth": 2,
              "value": "Basic",
              "heading": "basic"
            },
            {
              "depth": 2,
              "value": "Advanced",
              "heading": "advanced"
            }
          ]
        },
        "title": "Rust - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__01.rust.md"
      },
      {
        "path": "/backlog/interest/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/02.golang.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/02.golang.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "Golang",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Golang",
              "heading": "golang"
            },
            {
              "depth": 2,
              "value": "gRPC",
              "heading": "grpc"
            }
          ]
        },
        "title": "Golang - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__02.golang.md"
      },
      {
        "path": "/backlog/interest/04",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/04.web3.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/04.web3.md",
          "updatedTime": 1665190626000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "Web3",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "Web3",
              "heading": "web3"
            },
            {
              "depth": 2,
              "value": "Web3",
              "heading": "web3-1"
            },
            {
              "depth": 2,
              "value": "Ethereum",
              "heading": "ethereum"
            },
            {
              "depth": 2,
              "value": "Solidity",
              "heading": "solidity"
            },
            {
              "depth": 2,
              "value": "NFT",
              "heading": "nft"
            },
            {
              "depth": 2,
              "value": "Blockchain",
              "heading": "blockchain"
            },
            {
              "depth": 2,
              "value": "Smart Contract",
              "heading": "smart-contract"
            },
            {
              "depth": 2,
              "value": "Defi",
              "heading": "defi"
            }
          ]
        },
        "title": "Web3 - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__04.web3.md"
      },
      {
        "path": "/backlog/interest/06",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/06.practice.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/06.practice.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "Practice",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "Practice",
              "heading": "practice"
            },
            {
              "depth": 2,
              "value": "MicroServices",
              "heading": "microservices"
            },
            {
              "depth": 3,
              "value": "Micro",
              "heading": "micro"
            },
            {
              "depth": 2,
              "value": "JAMStack",
              "heading": "jamstack"
            },
            {
              "depth": 2,
              "value": "Monitor",
              "heading": "monitor"
            },
            {
              "depth": 2,
              "value": "Monorepo",
              "heading": "monorepo"
            },
            {
              "depth": 2,
              "value": "Storybook",
              "heading": "storybook"
            },
            {
              "depth": 2,
              "value": "MicroFrontend",
              "heading": "microfrontend"
            },
            {
              "depth": 2,
              "value": "Api",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "Low code",
              "heading": "low-code"
            },
            {
              "depth": 3,
              "value": "No Code",
              "heading": "no-code"
            }
          ]
        },
        "title": "Practice - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__06.practice.md"
      },
      {
        "path": "/backlog/interest/07",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/07.devops.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/07.devops.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "Devops",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "Devops",
              "heading": "devops"
            },
            {
              "depth": 2,
              "value": "CI/CD",
              "heading": "cicd"
            },
            {
              "depth": 3,
              "value": "Gitlab",
              "heading": "gitlab"
            },
            {
              "depth": 2,
              "value": "Cloud",
              "heading": "cloud"
            },
            {
              "depth": 3,
              "value": "aws",
              "heading": "aws"
            },
            {
              "depth": 2,
              "value": "Docker",
              "heading": "docker"
            },
            {
              "depth": 2,
              "value": "K8s",
              "heading": "k8s"
            },
            {
              "depth": 2,
              "value": "Terraform",
              "heading": "terraform"
            }
          ]
        },
        "title": "Devops - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__07.devops.md"
      },
      {
        "path": "/backlog/interest/08",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/08.DB.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/08.DB.md",
          "updatedTime": 1665190626000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "DB",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "DB",
              "heading": "db"
            },
            {
              "depth": 2,
              "value": "SQL",
              "heading": "sql"
            },
            {
              "depth": 2,
              "value": "MySQL",
              "heading": "mysql"
            },
            {
              "depth": 2,
              "value": "PostgreSQL",
              "heading": "postgresql"
            },
            {
              "depth": 2,
              "value": "NoSQL",
              "heading": "nosql"
            },
            {
              "depth": 3,
              "value": "MongoDB",
              "heading": "mongodb"
            }
          ]
        },
        "title": "DB - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__08.DB.md"
      },
      {
        "path": "/backlog/interest/09",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/09.Python.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/09.Python.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "Python",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "Python",
              "heading": "python"
            },
            {
              "depth": 2,
              "value": "Framework",
              "heading": "framework"
            }
          ]
        },
        "title": "Python - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__09.Python.md"
      },
      {
        "path": "/backlog/interest/10",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/10.Serverless.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/10.Serverless.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "Serverless",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Serverless",
              "heading": "serverless"
            }
          ]
        },
        "title": "Serverless - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__10.Serverless.md"
      },
      {
        "path": "/backlog/interest/12",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/12.iOS.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/12.iOS.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "iOS",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "iOS",
              "heading": "ios"
            },
            {
              "depth": 2,
              "value": "Swift",
              "heading": "swift"
            },
            {
              "depth": 2,
              "value": "SwiftUI",
              "heading": "swiftui"
            }
          ]
        },
        "title": "iOS - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__12.iOS.md"
      },
      {
        "path": "/backlog/interest/13",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/13.UIUX.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/13.UIUX.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "UIUX",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "UIUX",
              "heading": "uiux"
            }
          ]
        },
        "title": "UIUX - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__13.UIUX.md"
      },
      {
        "path": "/backlog/interest/14",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/14.java.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/14.java.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "java",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "Java",
              "heading": "java"
            },
            {
              "depth": 2,
              "value": "Spring",
              "heading": "spring"
            },
            {
              "depth": 2,
              "value": "Kafka",
              "heading": "kafka"
            }
          ]
        },
        "title": "java - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__14.java.md"
      },
      {
        "path": "/backlog/interest/15",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/15.bun.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/15.bun.md",
          "updatedTime": 1662305402000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "bun",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "Bun",
              "heading": "bun"
            }
          ]
        },
        "title": "bun - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__15.bun.md"
      },
      {
        "path": "/backlog/interest/16",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/16.flutter.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/16.flutter.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "flutter",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "Flutter",
              "heading": "flutter"
            }
          ]
        },
        "title": "flutter - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__16.flutter.md"
      },
      {
        "path": "/backlog/interest/17",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interest/17.android.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interest/17.android.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interest",
            "order": 5,
            "__fallback": true,
            "path": "/backlog/interest"
          },
          "title": "Android",
          "order": 17,
          "slugs": [
            {
              "depth": 1,
              "value": "Android",
              "heading": "android"
            },
            {
              "depth": 2,
              "value": "Android",
              "heading": "android-1"
            },
            {
              "depth": 2,
              "value": "Kotlin",
              "heading": "kotlin"
            },
            {
              "depth": 2,
              "value": "Jetpack",
              "heading": "jetpack"
            }
          ]
        },
        "title": "Android - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interest__17.android.md"
      },
      {
        "path": "/backlog/interview/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interview/01.Algorithm.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interview/01.Algorithm.md",
          "updatedTime": 1665190626000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interview",
            "order": 10,
            "__fallback": true,
            "path": "/backlog/interview"
          },
          "title": "Algorithm",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Algorithm",
              "heading": "algorithm"
            },
            {
              "depth": 2,
              "value": "Leetcode",
              "heading": "leetcode"
            }
          ]
        },
        "title": "Algorithm - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interview__01.Algorithm.md"
      },
      {
        "path": "/backlog/interview/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Interview/02.System Design.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Interview/02.System Design.md",
          "updatedTime": 1659354879539,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Interview",
            "order": 10,
            "__fallback": true,
            "path": "/backlog/interview"
          },
          "title": "System Design",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "System Design",
              "heading": "system-design"
            },
            {
              "depth": 2,
              "value": "collection",
              "heading": "collection"
            }
          ]
        },
        "title": "System Design - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Interview__02.System Design.md"
      },
      {
        "path": "/backlog/work/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/01.react.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/01.react.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "React",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "React",
              "heading": "react"
            },
            {
              "depth": 2,
              "value": "NextJS",
              "heading": "nextjs"
            },
            {
              "depth": 2,
              "value": "Demo",
              "heading": "demo"
            },
            {
              "depth": 2,
              "value": "Redux",
              "heading": "redux"
            },
            {
              "depth": 2,
              "value": "Hooks",
              "heading": "hooks"
            },
            {
              "depth": 2,
              "value": "Test",
              "heading": "test"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "Electron",
              "heading": "electron"
            },
            {
              "depth": 2,
              "value": "Strapi",
              "heading": "strapi"
            }
          ]
        },
        "title": "React - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__01.react.md"
      },
      {
        "path": "/backlog/work/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/02.react-native.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/02.react-native.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "React Native",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "React Native",
              "heading": "react-native"
            }
          ]
        },
        "title": "React Native - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__02.react-native.md"
      },
      {
        "path": "/backlog/work/03",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/03.nodejs.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/03.nodejs.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "Node.js",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Node.js",
              "heading": "nodejs"
            },
            {
              "depth": 2,
              "value": "Framework",
              "heading": "framework"
            },
            {
              "depth": 3,
              "value": "NESTJS",
              "heading": "nestjs"
            },
            {
              "depth": 3,
              "value": "ExpressJS",
              "heading": "expressjs"
            },
            {
              "depth": 2,
              "value": "Deno",
              "heading": "deno"
            },
            {
              "depth": 2,
              "value": "GraphQL",
              "heading": "graphql"
            }
          ]
        },
        "title": "Node.js - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__03.nodejs.md"
      },
      {
        "path": "/backlog/work/04",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/04.js.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/04.js.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "JS",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "JavaScript",
              "heading": "javascript"
            },
            {
              "depth": 2,
              "value": "library",
              "heading": "library"
            },
            {
              "depth": 3,
              "value": "Axios",
              "heading": "axios"
            },
            {
              "depth": 2,
              "value": "Angular",
              "heading": "angular"
            },
            {
              "depth": 3,
              "value": "Vue.js",
              "heading": "vuejs"
            },
            {
              "depth": 3,
              "value": "Svelte",
              "heading": "svelte"
            },
            {
              "depth": 3,
              "value": "Three.js",
              "heading": "threejs"
            },
            {
              "depth": 3,
              "value": "Rxjs",
              "heading": "rxjs"
            },
            {
              "depth": 3,
              "value": "Remix",
              "heading": "remix"
            },
            {
              "depth": 2,
              "value": "V8",
              "heading": "v8"
            }
          ]
        },
        "title": "JS - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__04.js.md"
      },
      {
        "path": "/backlog/work/05",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/05.ts.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/05.ts.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "TypeScript",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "TypeScript",
              "heading": "typescript"
            }
          ]
        },
        "title": "TypeScript - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__05.ts.md"
      },
      {
        "path": "/backlog/work/06",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/06.css.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/06.css.md",
          "updatedTime": 1665190626000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "CSS",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "CSS",
              "heading": "css"
            },
            {
              "depth": 2,
              "value": "Design System",
              "heading": "design-system"
            },
            {
              "depth": 2,
              "value": "Other",
              "heading": "other"
            }
          ]
        },
        "title": "CSS - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__06.css.md"
      },
      {
        "path": "/backlog/work/07",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/07.network.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/07.network.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "Network",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "Network",
              "heading": "network"
            },
            {
              "depth": 2,
              "value": "HTTP",
              "heading": "http"
            }
          ]
        },
        "title": "Network - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__07.network.md"
      },
      {
        "path": "/backlog/work/08",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/08.bundle.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/08.bundle.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "Bundle",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "Bundle",
              "heading": "bundle"
            },
            {
              "depth": 2,
              "value": "Webpack",
              "heading": "webpack"
            },
            {
              "depth": 2,
              "value": "Vite",
              "heading": "vite"
            }
          ]
        },
        "title": "Bundle - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__08.bundle.md"
      },
      {
        "path": "/backlog/work/09",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/09.git.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/09.git.md",
          "updatedTime": 1660402451000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "Git",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "Git",
              "heading": "git"
            }
          ]
        },
        "title": "Git - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__09.git.md"
      },
      {
        "path": "/backlog/work/10",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/10.agile.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/10.agile.md",
          "updatedTime": 1659887010000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "Agile",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Agile",
              "heading": "agile"
            },
            {
              "depth": 2,
              "value": "SCRUM",
              "heading": "scrum"
            },
            {
              "depth": 3,
              "value": "User Story",
              "heading": "user-story"
            },
            {
              "depth": 2,
              "value": "Motivation",
              "heading": "motivation"
            },
            {
              "depth": 2,
              "value": "Project",
              "heading": "project"
            }
          ]
        },
        "title": "Agile - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__10.agile.md"
      },
      {
        "path": "/backlog/work/11",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/11.flow.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/11.flow.md",
          "updatedTime": 1657929764000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "Flow",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "Flow",
              "heading": "flow"
            },
            {
              "depth": 2,
              "value": "Code Reivew",
              "heading": "code-reivew"
            }
          ]
        },
        "title": "Flow - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__11.flow.md"
      },
      {
        "path": "/backlog/work/12",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/12.test.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/12.test.md",
          "updatedTime": 1665190626000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "Test",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "Test",
              "heading": "test"
            },
            {
              "depth": 2,
              "value": "Unit",
              "heading": "unit"
            }
          ]
        },
        "title": "Test - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__12.test.md"
      },
      {
        "path": "/backlog/work/13",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/13.SEO.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/13.SEO.md",
          "updatedTime": 1665190626000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "SEO",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "SEO",
              "heading": "seo"
            }
          ]
        },
        "title": "SEO - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__13.SEO.md"
      },
      {
        "path": "/backlog/work/14",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/14.Growth.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/14.Growth.md",
          "updatedTime": 1658242545000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "Growth",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "Growth",
              "heading": "growth"
            }
          ]
        },
        "title": "Growth - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__14.Growth.md"
      },
      {
        "path": "/backlog/work/15",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/15.resource.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/15.resource.md",
          "updatedTime": 1658070212000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "resource",
          "order": 15,
          "slugs": [
            {
              "depth": 1,
              "value": "resource",
              "heading": "resource"
            }
          ]
        },
        "title": "resource - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__15.resource.md"
      },
      {
        "path": "/backlog/work/16",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/16.advice.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/16.advice.md",
          "updatedTime": 1658070212000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "advice",
          "order": 16,
          "slugs": [
            {
              "depth": 1,
              "value": "Advice",
              "heading": "advice"
            }
          ]
        },
        "title": "advice - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__16.advice.md"
      },
      {
        "path": "/backlog/work/17",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/Work/17.optimization.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/Work/17.optimization.md",
          "updatedTime": 1665190626000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "Work",
            "order": 2,
            "__fallback": true,
            "path": "/backlog/work"
          },
          "title": "Optimaztion",
          "order": 17,
          "slugs": [
            {
              "depth": 1,
              "value": "Optimaztion",
              "heading": "optimaztion"
            },
            {
              "depth": 2,
              "value": "Web",
              "heading": "web"
            }
          ]
        },
        "title": "Optimaztion - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__Work__17.optimization.md"
      },
      {
        "path": "/backlog/crash-course/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/crashCourse/01.zzl.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/crashCourse/01.zzl.md",
          "updatedTime": 1662974478000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "crashCourse",
            "order": 20,
            "__fallback": true,
            "path": "/backlog/crash-course"
          },
          "title": "前端早早聊",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "前端早早聊",
              "heading": "前端早早聊"
            },
            {
              "depth": 2,
              "value": "2022",
              "heading": "2022"
            },
            {
              "depth": 3,
              "value": "C50 - 微前端/低代码",
              "heading": "c50---微前端低代码"
            },
            {
              "depth": 3,
              "value": "C49 - 无/低代码",
              "heading": "c49---无低代码"
            },
            {
              "depth": 3,
              "value": "C48 - 前端工程化",
              "heading": "c48---前端工程化"
            },
            {
              "depth": 3,
              "value": "C47 - 一站式基建",
              "heading": "c47---一站式基建"
            },
            {
              "depth": 3,
              "value": "C46 - 前端海外工作",
              "heading": "c46---前端海外工作"
            },
            {
              "depth": 3,
              "value": "C45 - 前端搞跨端跨栈",
              "heading": "c45---前端搞跨端跨栈"
            },
            {
              "depth": 3,
              "value": "C44 - 前端成长晋升",
              "heading": "c44---前端成长晋升"
            },
            {
              "depth": 3,
              "value": "C43 - 前端搞性能",
              "heading": "c43---前端搞性能"
            },
            {
              "depth": 2,
              "value": "2021",
              "heading": "2021"
            },
            {
              "depth": 2,
              "value": "2022",
              "heading": "2022-1"
            }
          ]
        },
        "title": "前端早早聊 - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__crashCourse__01.zzl.md"
      },
      {
        "path": "/backlog/crash-course/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/crashCourse/02.udemy.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/crashCourse/02.udemy.md",
          "updatedTime": 1659366812000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "crashCourse",
            "order": 20,
            "__fallback": true,
            "path": "/backlog/crash-course"
          },
          "title": "Udemy",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Udemy",
              "heading": "udemy"
            },
            {
              "depth": 2,
              "value": "Frontend",
              "heading": "frontend"
            },
            {
              "depth": 2,
              "value": "DB",
              "heading": "db"
            },
            {
              "depth": 2,
              "value": "Web3",
              "heading": "web3"
            },
            {
              "depth": 2,
              "value": "Golang",
              "heading": "golang"
            },
            {
              "depth": 2,
              "value": "Interview",
              "heading": "interview"
            },
            {
              "depth": 2,
              "value": "Cloud",
              "heading": "cloud"
            },
            {
              "depth": 2,
              "value": "English",
              "heading": "english"
            }
          ]
        },
        "title": "Udemy - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__crashCourse__02.udemy.md"
      },
      {
        "path": "/backlog/crash-course/03",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/crashCourse/03.youtube.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/crashCourse/03.youtube.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "crashCourse",
            "order": 20,
            "__fallback": true,
            "path": "/backlog/crash-course"
          },
          "title": "Youtube",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Youtube",
              "heading": "youtube"
            },
            {
              "depth": 2,
              "value": "FreeCodeCamp",
              "heading": "freecodecamp"
            }
          ]
        },
        "title": "Youtube - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__crashCourse__03.youtube.md"
      },
      {
        "path": "/backlog/crash-course/04",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/crashCourse/04.freeCodeCamp.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/crashCourse/04.freeCodeCamp.md",
          "updatedTime": 1662870785000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "crashCourse",
            "order": 20,
            "__fallback": true,
            "path": "/backlog/crash-course"
          },
          "title": "freeCodeCamp",
          "order": 4,
          "slugs": []
        },
        "title": "freeCodeCamp - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__crashCourse__04.freeCodeCamp.md"
      },
      {
        "path": "/backlog/crash-course/05",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/crashCourse/05.fake.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/crashCourse/05.fake.md",
          "updatedTime": 1662870785000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "crashCourse",
            "order": 20,
            "__fallback": true,
            "path": "/backlog/crash-course"
          },
          "title": "fake",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "fake",
              "heading": "fake"
            }
          ]
        },
        "title": "fake - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__crashCourse__05.fake.md"
      },
      {
        "path": "/backlog/crash-course/06",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/backlog/crashCourse/06.imooc.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/backlog/crashCourse/06.imooc.md",
          "updatedTime": 1664638373000,
          "nav": {
            "title": "Backlog",
            "order": 199,
            "path": "/backlog"
          },
          "group": {
            "title": "crashCourse",
            "order": 20,
            "__fallback": true,
            "path": "/backlog/crash-course"
          },
          "title": "imooc",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "iMooc",
              "heading": "imooc"
            }
          ]
        },
        "title": "imooc - Wuxiao.io's Blog",
        "_chunkName": "docs__backlog__crashCourse__06.imooc.md"
      },
      {
        "path": "/best/engineer-sence",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/best/engineer-sence.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/best/engineer-sence.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Practice",
            "order": 80,
            "path": "/best"
          },
          "title": "工程场景",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "工程场景",
              "heading": "工程场景"
            },
            {
              "depth": 2,
              "value": "前端",
              "heading": "前端"
            },
            {
              "depth": 3,
              "value": "系统设计",
              "heading": "系统设计"
            }
          ]
        },
        "title": "工程场景 - Wuxiao.io's Blog",
        "_chunkName": "docs__best__engineer-sence.md"
      },
      {
        "path": "/best/lunzi",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/best/lunzi.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/best/lunzi.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Practice",
            "order": 80,
            "path": "/best"
          },
          "title": "轮子",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "轮子",
              "heading": "轮子"
            },
            {
              "depth": 2,
              "value": "前端",
              "heading": "前端"
            },
            {
              "depth": 3,
              "value": "系统",
              "heading": "系统"
            },
            {
              "depth": 3,
              "value": "基建",
              "heading": "基建"
            },
            {
              "depth": 2,
              "value": "全栈",
              "heading": "全栈"
            },
            {
              "depth": 3,
              "value": "系统",
              "heading": "系统-1"
            }
          ]
        },
        "title": "轮子 - Wuxiao.io's Blog",
        "_chunkName": "docs__best__lunzi.md"
      },
      {
        "path": "/best/mystack",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/best/mystack.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/best/mystack.md",
          "updatedTime": 1652110555000,
          "nav": {
            "title": "Practice",
            "order": 80,
            "path": "/best"
          },
          "title": "个人技术栈",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "个人技术栈",
              "heading": "个人技术栈"
            },
            {
              "depth": 2,
              "value": "Web前端",
              "heading": "web前端"
            },
            {
              "depth": 3,
              "value": "框架",
              "heading": "框架"
            }
          ]
        },
        "title": "个人技术栈 - Wuxiao.io's Blog",
        "_chunkName": "docs__best__mystack.md"
      },
      {
        "path": "/best/note",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/best/note.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/best/note.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Practice",
            "order": 80,
            "path": "/best"
          },
          "title": "注释",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "代码注释最佳实践",
              "heading": "代码注释最佳实践"
            },
            {
              "depth": 2,
              "value": "特殊标记注释",
              "heading": "特殊标记注释"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ]
        },
        "title": "注释 - Wuxiao.io's Blog",
        "_chunkName": "docs__best__note.md"
      },
      {
        "path": "/best/portfolio",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/best/portfolio.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/best/portfolio.md",
          "updatedTime": 1659280439000,
          "nav": {
            "title": "Practice",
            "order": 80,
            "path": "/best"
          },
          "title": "Portfolio",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Portfolio",
              "heading": "portfolio"
            },
            {
              "depth": 2,
              "value": "前端",
              "heading": "前端"
            },
            {
              "depth": 3,
              "value": "模板",
              "heading": "模板"
            },
            {
              "depth": 3,
              "value": "basic",
              "heading": "basic"
            },
            {
              "depth": 2,
              "value": "Admin sys",
              "heading": "admin-sys"
            }
          ]
        },
        "title": "Portfolio - Wuxiao.io's Blog",
        "_chunkName": "docs__best__portfolio.md"
      },
      {
        "path": "/best/scrum",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/best/scrum.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/best/scrum.md",
          "updatedTime": 1659366812000,
          "nav": {
            "title": "Practice",
            "order": 80,
            "path": "/best"
          },
          "title": "Scrum",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "Scrum",
              "heading": "scrum"
            },
            {
              "depth": 2,
              "value": "Standup",
              "heading": "standup"
            }
          ]
        },
        "title": "Scrum - Wuxiao.io's Blog",
        "_chunkName": "docs__best__scrum.md"
      },
      {
        "path": "/deep-learn",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/deep-learn/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/deep-learn/index.md",
          "updatedTime": 1654307015000,
          "nav": {
            "title": "Deep Learn",
            "order": 20,
            "path": "/deep-learn"
          },
          "title": "Deep Learn",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Deep Learn",
              "heading": "deep-learn"
            },
            {
              "depth": 2,
              "value": "FE",
              "heading": "fe"
            }
          ]
        },
        "title": "Deep Learn - Wuxiao.io's Blog",
        "_chunkName": "docs__deep-learn__index.md"
      },
      {
        "path": "/deep-learn/fe/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/deep-learn/fe/01.react-query.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/deep-learn/fe/01.react-query.md",
          "updatedTime": 1659713454000,
          "slugs": [
            {
              "depth": 1,
              "value": "React Query",
              "heading": "react-query"
            },
            {
              "depth": 2,
              "value": "Document",
              "heading": "document"
            },
            {
              "depth": 3,
              "value": "Feature",
              "heading": "feature"
            },
            {
              "depth": 3,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "Practise",
              "heading": "practise"
            },
            {
              "depth": 2,
              "value": "Reference",
              "heading": "reference"
            },
            {
              "depth": 3,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "Articles",
              "heading": "articles"
            }
          ],
          "title": "React Query",
          "nav": {
            "path": "/deep-learn",
            "title": "Deep Learn"
          },
          "group": {
            "path": "/deep-learn/fe",
            "title": "Fe"
          }
        },
        "title": "React Query - Wuxiao.io's Blog",
        "_chunkName": "docs__deep-learn__fe__01.react-query.md"
      },
      {
        "path": "/deep-learn/fe/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/deep-learn/fe/02.react-hook-form.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/deep-learn/fe/02.react-hook-form.md",
          "updatedTime": 1654327459000,
          "slugs": [
            {
              "depth": 1,
              "value": "React Hook Form",
              "heading": "react-hook-form"
            },
            {
              "depth": 2,
              "value": "Reference",
              "heading": "reference"
            }
          ],
          "title": "React Hook Form",
          "nav": {
            "path": "/deep-learn",
            "title": "Deep Learn"
          },
          "group": {
            "path": "/deep-learn/fe",
            "title": "Fe"
          }
        },
        "title": "React Hook Form - Wuxiao.io's Blog",
        "_chunkName": "docs__deep-learn__fe__02.react-hook-form.md"
      },
      {
        "path": "/deep-learn/fe/03",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/deep-learn/fe/03.jotai.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/deep-learn/fe/03.jotai.md",
          "updatedTime": 1659713454000,
          "slugs": [
            {
              "depth": 1,
              "value": "Jotai",
              "heading": "jotai"
            },
            {
              "depth": 2,
              "value": "Document",
              "heading": "document"
            },
            {
              "depth": 3,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 2,
              "value": "Practise",
              "heading": "practise"
            },
            {
              "depth": 2,
              "value": "Referrences",
              "heading": "referrences"
            },
            {
              "depth": 2,
              "value": "Relate",
              "heading": "relate"
            }
          ],
          "title": "Jotai",
          "nav": {
            "path": "/deep-learn",
            "title": "Deep Learn"
          },
          "group": {
            "path": "/deep-learn/fe",
            "title": "Fe"
          }
        },
        "title": "Jotai - Wuxiao.io's Blog",
        "_chunkName": "docs__deep-learn__fe__03.jotai.md"
      },
      {
        "path": "/deep-learn/fe/04",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/deep-learn/fe/04.Gatsby.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/deep-learn/fe/04.Gatsby.md",
          "updatedTime": 1655628894000,
          "slugs": [
            {
              "depth": 1,
              "value": "Gatsby",
              "heading": "gatsby"
            },
            {
              "depth": 2,
              "value": "Reference",
              "heading": "reference"
            }
          ],
          "title": "Gatsby",
          "nav": {
            "path": "/deep-learn",
            "title": "Deep Learn"
          },
          "group": {
            "path": "/deep-learn/fe",
            "title": "Fe"
          }
        },
        "title": "Gatsby - Wuxiao.io's Blog",
        "_chunkName": "docs__deep-learn__fe__04.Gatsby.md"
      },
      {
        "path": "/deep-learn/fe/05",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/deep-learn/fe/05.shopify.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/deep-learn/fe/05.shopify.md",
          "updatedTime": 1655628894000,
          "slugs": [
            {
              "depth": 1,
              "value": "shopify",
              "heading": "shopify"
            },
            {
              "depth": 2,
              "value": "References",
              "heading": "references"
            }
          ],
          "title": "shopify",
          "nav": {
            "path": "/deep-learn",
            "title": "Deep Learn"
          },
          "group": {
            "path": "/deep-learn/fe",
            "title": "Fe"
          }
        },
        "title": "shopify - Wuxiao.io's Blog",
        "_chunkName": "docs__deep-learn__fe__05.shopify.md"
      },
      {
        "path": "/deep-learn/fe/06",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/deep-learn/fe/06.vite3.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/deep-learn/fe/06.vite3.md",
          "updatedTime": 1657896463000,
          "slugs": [
            {
              "depth": 1,
              "value": "vite3",
              "heading": "vite3"
            }
          ],
          "title": "vite3",
          "nav": {
            "path": "/deep-learn",
            "title": "Deep Learn"
          },
          "group": {
            "path": "/deep-learn/fe",
            "title": "Fe"
          }
        },
        "title": "vite3 - Wuxiao.io's Blog",
        "_chunkName": "docs__deep-learn__fe__06.vite3.md"
      },
      {
        "path": "/deep-learn/fe/07",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/deep-learn/fe/07.immer.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/deep-learn/fe/07.immer.md",
          "updatedTime": 1659713454000,
          "slugs": [
            {
              "depth": 1,
              "value": "immer",
              "heading": "immer"
            }
          ],
          "title": "immer",
          "nav": {
            "path": "/deep-learn",
            "title": "Deep Learn"
          },
          "group": {
            "path": "/deep-learn/fe",
            "title": "Fe"
          }
        },
        "title": "immer - Wuxiao.io's Blog",
        "_chunkName": "docs__deep-learn__fe__07.immer.md"
      },
      {
        "path": "/deep-learn/fe/08",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/deep-learn/fe/08.oclif.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/deep-learn/fe/08.oclif.md",
          "updatedTime": 1659713454000,
          "slugs": [
            {
              "depth": 1,
              "value": "Oclif",
              "heading": "oclif"
            },
            {
              "depth": 2,
              "value": "Practise",
              "heading": "practise"
            },
            {
              "depth": 2,
              "value": "referrence",
              "heading": "referrence"
            }
          ],
          "title": "Oclif",
          "nav": {
            "path": "/deep-learn",
            "title": "Deep Learn"
          },
          "group": {
            "path": "/deep-learn/fe",
            "title": "Fe"
          }
        },
        "title": "Oclif - Wuxiao.io's Blog",
        "_chunkName": "docs__deep-learn__fe__08.oclif.md"
      },
      {
        "path": "/deep-learn/rust/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/deep-learn/rust/01.rocket.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/deep-learn/rust/01.rocket.md",
          "updatedTime": 1658070212000,
          "slugs": [
            {
              "depth": 1,
              "value": "Rocket",
              "heading": "rocket"
            }
          ],
          "title": "Rocket",
          "nav": {
            "path": "/deep-learn",
            "title": "Deep Learn"
          },
          "group": {
            "path": "/deep-learn/rust",
            "title": "Rust"
          }
        },
        "title": "Rocket - Wuxiao.io's Blog",
        "_chunkName": "docs__deep-learn__rust__01.rocket.md"
      },
      {
        "path": "/efficiency/todo/202204",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/Todo/202204.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/Todo/202204.md",
          "updatedTime": 1652110555000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "Todo",
            "order": 4,
            "__fallback": true,
            "path": "/efficiency/todo"
          },
          "title": 2022.04,
          "order": 202204,
          "slugs": [
            {
              "depth": 1,
              "value": "2022.04",
              "heading": "202204"
            },
            {
              "depth": 2,
              "value": "专业技能",
              "heading": "专业技能"
            },
            {
              "depth": 3,
              "value": "TypeScript",
              "heading": "typescript"
            },
            {
              "depth": 3,
              "value": "Golang",
              "heading": "golang"
            },
            {
              "depth": 3,
              "value": "Rust",
              "heading": "rust"
            },
            {
              "depth": 3,
              "value": "英语",
              "heading": "英语"
            },
            {
              "depth": 3,
              "value": "珠峰架构",
              "heading": "珠峰架构"
            },
            {
              "depth": 3,
              "value": "Low Code",
              "heading": "low-code"
            },
            {
              "depth": 3,
              "value": "文章",
              "heading": "文章"
            },
            {
              "depth": 2,
              "value": "工作技术点",
              "heading": "工作技术点"
            }
          ]
        },
        "title": "2022.04 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__Todo__202204.md"
      },
      {
        "path": "/efficiency/todo/202205",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/Todo/202205.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/Todo/202205.md",
          "updatedTime": 1652110555000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "Todo",
            "order": 4,
            "__fallback": true,
            "path": "/efficiency/todo"
          },
          "title": 2022.05,
          "order": 202205,
          "slugs": [
            {
              "depth": 1,
              "value": "2022.05",
              "heading": "202205"
            },
            {
              "depth": 2,
              "value": "专业技能",
              "heading": "专业技能"
            },
            {
              "depth": 3,
              "value": "Monorepo",
              "heading": "monorepo"
            },
            {
              "depth": 3,
              "value": "React State Management",
              "heading": "react-state-management"
            },
            {
              "depth": 3,
              "value": "Go",
              "heading": "go"
            },
            {
              "depth": 3,
              "value": "RUST",
              "heading": "rust"
            },
            {
              "depth": 3,
              "value": "React Native",
              "heading": "react-native"
            },
            {
              "depth": 3,
              "value": "NextJS",
              "heading": "nextjs"
            },
            {
              "depth": 3,
              "value": "MFE",
              "heading": "mfe"
            },
            {
              "depth": 3,
              "value": "算法",
              "heading": "算法"
            },
            {
              "depth": 3,
              "value": "文章",
              "heading": "文章"
            },
            {
              "depth": 2,
              "value": "wuxiao.io",
              "heading": "wuxiaoio"
            },
            {
              "depth": 3,
              "value": "shared-component",
              "heading": "shared-component"
            },
            {
              "depth": 3,
              "value": "Template",
              "heading": "template"
            }
          ]
        },
        "title": "2022.05 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__Todo__202205.md"
      },
      {
        "path": "/efficiency/todo/202206",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/Todo/202206.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/Todo/202206.md",
          "updatedTime": 1653752288000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "Todo",
            "order": 4,
            "__fallback": true,
            "path": "/efficiency/todo"
          },
          "title": 2022.06,
          "order": 202206,
          "slugs": [
            {
              "depth": 1,
              "value": "2022.06",
              "heading": "202206"
            },
            {
              "depth": 2,
              "value": "专业技能",
              "heading": "专业技能"
            },
            {
              "depth": 3,
              "value": "Go",
              "heading": "go"
            },
            {
              "depth": 3,
              "value": "Rust",
              "heading": "rust"
            },
            {
              "depth": 2,
              "value": "wuxiao.io",
              "heading": "wuxiaoio"
            },
            {
              "depth": 2,
              "value": "工作技术点",
              "heading": "工作技术点"
            }
          ]
        },
        "title": "2022.06 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__Todo__202206.md"
      },
      {
        "path": "/efficiency/todo/202207",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/Todo/202207.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/Todo/202207.md",
          "updatedTime": 1651588619000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "Todo",
            "order": 4,
            "__fallback": true,
            "path": "/efficiency/todo"
          },
          "title": 2022.07,
          "order": 202207,
          "slugs": [
            {
              "depth": 1,
              "value": "2022.07",
              "heading": "202207"
            },
            {
              "depth": 2,
              "value": "专业技能",
              "heading": "专业技能"
            },
            {
              "depth": 3,
              "value": "Golang",
              "heading": "golang"
            },
            {
              "depth": 3,
              "value": "Zig",
              "heading": "zig"
            },
            {
              "depth": 2,
              "value": "wuxiao-io",
              "heading": "wuxiao-io"
            }
          ]
        },
        "title": "2022.07 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__Todo__202207.md"
      },
      {
        "path": "/efficiency/todo/202208",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/Todo/202208.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/Todo/202208.md",
          "updatedTime": 1655684690000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "Todo",
            "order": 5,
            "__fallback": true,
            "path": "/efficiency/todo"
          },
          "title": 2022.08,
          "order": 202208,
          "slugs": [
            {
              "depth": 1,
              "value": "2022.08",
              "heading": "202208"
            },
            {
              "depth": 2,
              "value": "New Tech",
              "heading": "new-tech"
            },
            {
              "depth": 3,
              "value": "Practice",
              "heading": "practice"
            },
            {
              "depth": 3,
              "value": "Research",
              "heading": "research"
            },
            {
              "depth": 2,
              "value": "Article",
              "heading": "article"
            },
            {
              "depth": 2,
              "value": "Future To Learn",
              "heading": "future-to-learn"
            }
          ]
        },
        "title": "2022.08 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__Todo__202208.md"
      },
      {
        "path": "/efficiency/advise",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/advise/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/advise/index.md",
          "updatedTime": 1656552506000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "代码人生",
            "order": 1,
            "__fallback": true,
            "path": "/efficiency/advise"
          },
          "title": "准则",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "准则",
              "heading": "准则"
            },
            {
              "depth": 2,
              "value": "参考",
              "heading": "参考"
            }
          ]
        },
        "title": "准则 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__advise__index.md"
      },
      {
        "path": "/efficiency/advise/思考框架",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/advise/思考框架.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/advise/思考框架.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "代码人生",
            "order": 1,
            "__fallback": true,
            "path": "/efficiency/advise"
          },
          "title": "思考框架",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "思考模型",
              "heading": "思考模型"
            },
            {
              "depth": 2,
              "value": "思考框架",
              "heading": "思考框架"
            },
            {
              "depth": 3,
              "value": "WWH模型",
              "heading": "wwh模型"
            },
            {
              "depth": 4,
              "value": "概念",
              "heading": "概念"
            },
            {
              "depth": 3,
              "value": "《10x程序员工作法》",
              "heading": "10x程序员工作法"
            },
            {
              "depth": 4,
              "value": "流程",
              "heading": "流程"
            },
            {
              "depth": 2,
              "value": "原则",
              "heading": "原则"
            },
            {
              "depth": 3,
              "value": "面向对象原则（SOLID）",
              "heading": "面向对象原则solid"
            },
            {
              "depth": 3,
              "value": "Unix哲学",
              "heading": "unix哲学"
            },
            {
              "depth": 3,
              "value": "算法思想",
              "heading": "算法思想"
            },
            {
              "depth": 3,
              "value": "10x程序员工作法",
              "heading": "10x程序员工作法-1"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            },
            {
              "depth": 3,
              "value": "新技术",
              "heading": "新技术"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ]
        },
        "title": "思考框架 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__advise__思考框架.md"
      },
      {
        "path": "/efficiency/advise/概念思考",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/advise/概念思考.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/advise/概念思考.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "代码人生",
            "order": 1,
            "__fallback": true,
            "path": "/efficiency/advise"
          },
          "title": "概念思考",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "概念思考",
              "heading": "概念思考"
            }
          ]
        },
        "title": "概念思考 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__advise__概念思考.md"
      },
      {
        "path": "/efficiency/future/5g",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/future/5g.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/future/5g.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "未来",
            "order": 2,
            "__fallback": true,
            "path": "/efficiency/future"
          },
          "title": "5g对前端的影响",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "5G 对前端的影响",
              "heading": "5g-对前端的影响"
            },
            {
              "depth": 2,
              "value": "Serverless",
              "heading": "serverless"
            },
            {
              "depth": 2,
              "value": "低代码平台",
              "heading": "低代码平台"
            },
            {
              "depth": 2,
              "value": "我们能做什么",
              "heading": "我们能做什么"
            },
            {
              "depth": 2,
              "value": "参考",
              "heading": "参考"
            }
          ]
        },
        "title": "5g对前端的影响 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__future__5g.md"
      },
      {
        "path": "/efficiency/study/backlog",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/study/backlog.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/study/backlog.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "模式化学习",
            "order": 3,
            "__fallback": true,
            "path": "/efficiency/study"
          },
          "title": "Backlog",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "视频学习Backlog",
              "heading": "视频学习backlog"
            },
            {
              "depth": 2,
              "value": "Youtube",
              "heading": "youtube"
            },
            {
              "depth": 3,
              "value": "freeCodeCamp.org",
              "heading": "freecodecamporg"
            },
            {
              "depth": 3,
              "value": "JavaScript Mastery",
              "heading": "javascript-mastery"
            },
            {
              "depth": 3,
              "value": "Other",
              "heading": "other"
            },
            {
              "depth": 2,
              "value": "慕课网",
              "heading": "慕课网"
            },
            {
              "depth": 3,
              "value": "实战课",
              "heading": "实战课"
            },
            {
              "depth": 3,
              "value": "体系课",
              "heading": "体系课"
            },
            {
              "depth": 2,
              "value": "珠峰架构",
              "heading": "珠峰架构"
            },
            {
              "depth": 3,
              "value": "主题课",
              "heading": "主题课"
            },
            {
              "depth": 2,
              "value": "Book",
              "heading": "book"
            },
            {
              "depth": 3,
              "value": "Manning",
              "heading": "manning"
            },
            {
              "depth": 4,
              "value": "MEAP",
              "heading": "meap"
            }
          ]
        },
        "title": "Backlog - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__study__backlog.md"
      },
      {
        "path": "/efficiency/study/template",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/study/template.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/study/template.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "模式化学习",
            "order": 3,
            "__fallback": true,
            "path": "/efficiency/study"
          },
          "title": "总纲",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "模式化学习总纲",
              "heading": "模式化学习总纲"
            },
            {
              "depth": 2,
              "value": "输入",
              "heading": "输入"
            },
            {
              "depth": 3,
              "value": "来源",
              "heading": "来源"
            },
            {
              "depth": 3,
              "value": "资源类型",
              "heading": "资源类型"
            },
            {
              "depth": 2,
              "value": "输出",
              "heading": "输出"
            },
            {
              "depth": 3,
              "value": "输出类型",
              "heading": "输出类型"
            },
            {
              "depth": 4,
              "value": "《简明教程: xxx》",
              "heading": "简明教程-xxx"
            },
            {
              "depth": 4,
              "value": "《案例：xxx》",
              "heading": "案例xxx"
            },
            {
              "depth": 4,
              "value": "《试用：xxx》",
              "heading": "试用xxx"
            },
            {
              "depth": 4,
              "value": "《实战：xxx》",
              "heading": "实战xxx"
            },
            {
              "depth": 4,
              "value": "《源码：xxx 》",
              "heading": "源码xxx-"
            },
            {
              "depth": 4,
              "value": "《最佳实践：xxx》",
              "heading": "最佳实践xxx"
            },
            {
              "depth": 4,
              "value": "《实验：xxx》",
              "heading": "实验xxx"
            },
            {
              "depth": 4,
              "value": "《有趣：xxx》",
              "heading": "有趣xxx"
            }
          ]
        },
        "title": "总纲 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__study__template.md"
      },
      {
        "path": "/efficiency/study/todo",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/efficiency/study/todo.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/study/todo.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Efficiency",
            "order": 80,
            "path": "/efficiency"
          },
          "group": {
            "title": "模式化学习",
            "order": 3,
            "__fallback": true,
            "path": "/efficiency/study"
          },
          "title": "定级",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "定级",
              "heading": "定级"
            },
            {
              "depth": 2,
              "value": "☆☆☆☆☆",
              "heading": ""
            },
            {
              "depth": 2,
              "value": "☆☆☆☆",
              "heading": "-1"
            },
            {
              "depth": 2,
              "value": "☆☆☆",
              "heading": "-2"
            },
            {
              "depth": 2,
              "value": "☆☆",
              "heading": "-3"
            },
            {
              "depth": 2,
              "value": "☆",
              "heading": "-4"
            },
            {
              "depth": 2,
              "value": "未定级项目",
              "heading": "未定级项目"
            }
          ]
        },
        "title": "定级 - Wuxiao.io's Blog",
        "_chunkName": "docs__efficiency__study__todo.md"
      },
      {
        "path": "/poc/demo",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/demo.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/demo.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Poc",
            "order": 20,
            "path": "/poc"
          },
          "title": "Demo",
          "order": 30,
          "slugs": [
            {
              "depth": 2,
              "value": "Demo",
              "heading": "demo"
            },
            {
              "depth": 3,
              "value": "RxJS",
              "heading": "rxjs"
            }
          ]
        },
        "title": "Demo - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__demo.md"
      },
      {
        "path": "/poc/edit-photo",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/edit-photo.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/edit-photo.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Poc",
            "order": 20,
            "path": "/poc"
          },
          "title": "编辑在线图片，保存后重新上传",
          "order": 50,
          "slugs": [
            {
              "depth": 1,
              "value": "编辑在线图片，保存后重新上传",
              "heading": "编辑在线图片保存后重新上传"
            }
          ]
        },
        "title": "编辑在线图片，保存后重新上传 - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__edit-photo.md"
      },
      {
        "path": "/poc",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/index.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Poc",
            "order": 20,
            "path": "/poc"
          },
          "title": "Overview",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "POC",
              "heading": "poc"
            },
            {
              "depth": 2,
              "value": "TODO",
              "heading": "todo"
            },
            {
              "depth": 2,
              "value": "WIP",
              "heading": "wip"
            },
            {
              "depth": 2,
              "value": "DONE",
              "heading": "done"
            }
          ]
        },
        "title": "Overview - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__index.md"
      },
      {
        "path": "/poc/new-tech",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/new-tech.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/new-tech.md",
          "updatedTime": 1650874227000,
          "nav": {
            "title": "Poc",
            "order": 20,
            "path": "/poc"
          },
          "title": "New Tech for Me",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "New tech for me",
              "heading": "new-tech-for-me"
            }
          ]
        },
        "title": "New Tech for Me - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__new-tech.md"
      },
      {
        "path": "/poc/oss",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/oss.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/oss.md",
          "updatedTime": 1650434917000,
          "nav": {
            "title": "Poc",
            "order": 20,
            "path": "/poc"
          },
          "title": "使用oss部署静态网站",
          "order": 40,
          "slugs": [
            {
              "depth": 1,
              "value": "使用oss部署静态网站",
              "heading": "使用oss部署静态网站"
            },
            {
              "depth": 2,
              "value": "准备",
              "heading": "准备"
            },
            {
              "depth": 2,
              "value": "步骤",
              "heading": "步骤"
            },
            {
              "depth": 3,
              "value": "阿里云OSS",
              "heading": "阿里云oss"
            },
            {
              "depth": 4,
              "value": "1. 新建一个国内的 Bucket，并配置",
              "heading": "1-新建一个国内的-bucket并配置"
            },
            {
              "depth": 4,
              "value": "2. 使用 ossutil 将打包过后的静态网站上传到oss bucket",
              "heading": "2-使用-ossutil-将打包过后的静态网站上传到oss-bucket"
            },
            {
              "depth": 2,
              "value": "More",
              "heading": "more"
            }
          ]
        },
        "title": "使用oss部署静态网站 - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__oss.md"
      },
      {
        "path": "/poc/fe/1",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/fe/1.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/fe/1.md",
          "updatedTime": 1640762681000,
          "slugs": [
            {
              "depth": 1,
              "value": "基于 Node.js 的可视化 BFF 解决方案(WIP)",
              "heading": "基于-nodejs-的可视化-bff-解决方案wip"
            },
            {
              "depth": 2,
              "value": "Inspire",
              "heading": "inspire"
            },
            {
              "depth": 2,
              "value": "前置技术",
              "heading": "前置技术"
            },
            {
              "depth": 3,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "技术",
              "heading": "技术"
            }
          ],
          "title": "基于 Node.js 的可视化 BFF 解决方案(WIP)",
          "nav": {
            "path": "/poc",
            "title": "Poc"
          },
          "group": {
            "path": "/poc/fe",
            "title": "Fe"
          }
        },
        "title": "基于 Node.js 的可视化 BFF 解决方案(WIP) - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__fe__1.md"
      },
      {
        "path": "/poc/fe/2",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/fe/2.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/fe/2.md",
          "updatedTime": 1640762681000,
          "slugs": [
            {
              "depth": 1,
              "value": "npm 私服搭建(WIP)",
              "heading": "npm-私服搭建wip"
            }
          ],
          "title": "npm 私服搭建(WIP)",
          "nav": {
            "path": "/poc",
            "title": "Poc"
          },
          "group": {
            "path": "/poc/fe",
            "title": "Fe"
          }
        },
        "title": "npm 私服搭建(WIP) - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__fe__2.md"
      },
      {
        "path": "/poc/fe/3",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/fe/3.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/fe/3.md",
          "updatedTime": 1641136379000,
          "slugs": [
            {
              "depth": 1,
              "value": "构建符合标准的公共库(WIP)",
              "heading": "构建符合标准的公共库wip"
            }
          ],
          "title": "构建符合标准的公共库(WIP)",
          "nav": {
            "path": "/poc",
            "title": "Poc"
          },
          "group": {
            "path": "/poc/fe",
            "title": "Fe"
          }
        },
        "title": "构建符合标准的公共库(WIP) - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__fe__3.md"
      },
      {
        "path": "/poc/fe/4",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/fe/4.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/fe/4.md",
          "updatedTime": 1641136379000,
          "slugs": [
            {
              "depth": 1,
              "value": "Babel插件编写(WIP)",
              "heading": "babel插件编写wip"
            }
          ],
          "title": "Babel插件编写(WIP)",
          "nav": {
            "path": "/poc",
            "title": "Poc"
          },
          "group": {
            "path": "/poc/fe",
            "title": "Fe"
          }
        },
        "title": "Babel插件编写(WIP) - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__fe__4.md"
      },
      {
        "path": "/poc/fe/5",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/fe/5.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/fe/5.md",
          "updatedTime": 1641136379000,
          "slugs": [
            {
              "depth": 1,
              "value": "实现应用主题切换（WIP）",
              "heading": "实现应用主题切换wip"
            }
          ],
          "title": "实现应用主题切换（WIP）",
          "nav": {
            "path": "/poc",
            "title": "Poc"
          },
          "group": {
            "path": "/poc/fe",
            "title": "Fe"
          }
        },
        "title": "实现应用主题切换（WIP） - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__fe__5.md"
      },
      {
        "path": "/poc/fe/6",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/fe/6.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/fe/6.md",
          "updatedTime": 1641136379000,
          "slugs": [
            {
              "depth": 1,
              "value": "VSCode 插件开发(WIP)",
              "heading": "vscode-插件开发wip"
            }
          ],
          "title": "VSCode 插件开发(WIP)",
          "nav": {
            "path": "/poc",
            "title": "Poc"
          },
          "group": {
            "path": "/poc/fe",
            "title": "Fe"
          }
        },
        "title": "VSCode 插件开发(WIP) - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__fe__6.md"
      },
      {
        "path": "/poc/fe",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/poc/fe/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/poc/fe/index.md",
          "updatedTime": 1660747922000,
          "slugs": [
            {
              "depth": 1,
              "value": "目录",
              "heading": "目录"
            },
            {
              "depth": 2,
              "value": "project",
              "heading": "project"
            }
          ],
          "title": "目录",
          "nav": {
            "path": "/poc",
            "title": "Poc"
          },
          "group": {
            "path": "/poc/fe",
            "title": "Fe"
          }
        },
        "title": "目录 - Wuxiao.io's Blog",
        "_chunkName": "docs__poc__fe__index.md"
      },
      {
        "path": "/sets",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/sets/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/sets/index.md",
          "updatedTime": 1661513068000,
          "nav": {
            "title": "Sets",
            "order": 15,
            "path": "/sets"
          },
          "title": "Overview",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Sets",
              "heading": "sets"
            }
          ]
        },
        "title": "Overview - Wuxiao.io's Blog",
        "_chunkName": "docs__sets__index.md"
      },
      {
        "path": "/sets/01.react/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/sets/01.react/01.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/sets/01.react/01.md",
          "updatedTime": 1656290663000,
          "nav": {
            "title": "Sets",
            "order": 15,
            "path": "/sets"
          },
          "group": {
            "title": "React",
            "order": 10,
            "__fallback": true,
            "path": "/sets/01.react"
          },
          "title": "正确使用useMemo和useCallback",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "正确使用useMemo和useCallback",
              "heading": "正确使用usememo和usecallback"
            },
            {
              "depth": 2,
              "value": "References",
              "heading": "references"
            }
          ]
        },
        "title": "正确使用useMemo和useCallback - Wuxiao.io's Blog",
        "_chunkName": "docs__sets__01.react__01.md"
      },
      {
        "path": "/sets/01.react/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/sets/01.react/02.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/sets/01.react/02.md",
          "updatedTime": 1656913185000,
          "nav": {
            "title": "Sets",
            "order": 15,
            "path": "/sets"
          },
          "group": {
            "title": "React",
            "order": 10,
            "__fallback": true,
            "path": "/sets/01.react"
          },
          "title": "使用TypeScript编写可复用的React组件",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "使用TypeScript编写可复用的React组件",
              "heading": "使用typescript编写可复用的react组件"
            },
            {
              "depth": 2,
              "value": "1. 定义组件",
              "heading": "1-定义组件"
            },
            {
              "depth": 2,
              "value": "2. 定义组件的状态",
              "heading": "2-定义组件的状态"
            },
            {
              "depth": 2,
              "value": "3. 不要给组件设定宽度、高度和margin",
              "heading": "3-不要给组件设定宽度高度和margin"
            },
            {
              "depth": 2,
              "value": "4. 尽可能的减少组件的State",
              "heading": "4-尽可能的减少组件的state"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ]
        },
        "title": "使用TypeScript编写可复用的React组件 - Wuxiao.io's Blog",
        "_chunkName": "docs__sets__01.react__02.md"
      },
      {
        "path": "/sets/01.react/03",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/sets/01.react/03.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/sets/01.react/03.md",
          "updatedTime": 1659099005000,
          "nav": {
            "title": "Sets",
            "order": 15,
            "path": "/sets"
          },
          "group": {
            "title": "React",
            "order": 10,
            "__fallback": true,
            "path": "/sets/01.react"
          },
          "title": "Hooks",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Hooks",
              "heading": "hooks"
            },
            {
              "depth": 2,
              "value": "useMemoCompare",
              "heading": "usememocompare"
            },
            {
              "depth": 2,
              "value": "useFirestoreQuery",
              "heading": "usefirestorequery"
            }
          ]
        },
        "title": "Hooks - Wuxiao.io's Blog",
        "_chunkName": "docs__sets__01.react__03.md"
      },
      {
        "path": "/sets/01.react/04",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/sets/01.react/04.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/sets/01.react/04.md",
          "updatedTime": 1662219315000,
          "nav": {
            "title": "Sets",
            "order": 15,
            "path": "/sets"
          },
          "group": {
            "title": "React",
            "order": 10,
            "__fallback": true,
            "path": "/sets/01.react"
          },
          "title": "React Fiber",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "React Fiber",
              "heading": "react-fiber"
            },
            {
              "depth": 2,
              "value": "什么是 React Fiber",
              "heading": "什么是-react-fiber"
            },
            {
              "depth": 3,
              "value": "宏观",
              "heading": "宏观"
            },
            {
              "depth": 3,
              "value": "狭义",
              "heading": "狭义"
            },
            {
              "depth": 2,
              "value": "为什么要使用 React Fiber 架构",
              "heading": "为什么要使用-react-fiber-架构"
            },
            {
              "depth": 3,
              "value": "Before Fiber",
              "heading": "before-fiber"
            },
            {
              "depth": 2,
              "value": "React源码中包的简介",
              "heading": "react源码中包的简介"
            }
          ]
        },
        "title": "React Fiber - Wuxiao.io's Blog",
        "_chunkName": "docs__sets__01.react__04.md"
      },
      {
        "path": "/sets/03.rust/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/sets/03.rust/01.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/sets/03.rust/01.md",
          "updatedTime": 1657637392000,
          "nav": {
            "title": "Sets",
            "order": 15,
            "path": "/sets"
          },
          "group": {
            "title": "Rust",
            "order": 30,
            "__fallback": true,
            "path": "/sets/03.rust"
          },
          "title": "使用Rust的Rocket框架来开发Web应用",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "使用Rust的Rocket框架来开发Web应用",
              "heading": "使用rust的rocket框架来开发web应用"
            },
            {
              "depth": 2,
              "value": "Referrences",
              "heading": "referrences"
            }
          ]
        },
        "title": "使用Rust的Rocket框架来开发Web应用 - Wuxiao.io's Blog",
        "_chunkName": "docs__sets__03.rust__01.md"
      },
      {
        "path": "/simple-course",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/index.md",
          "updatedTime": 1661513068000,
          "nav": {
            "title": "Draft",
            "order": 10,
            "path": "/simple-course"
          },
          "title": "Draft",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "Draft",
              "heading": "draft"
            },
            {
              "depth": 2,
              "value": "Interview",
              "heading": "interview"
            }
          ]
        },
        "title": "Draft - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__index.md"
      },
      {
        "path": "/simple-course/devops/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/devops/01.Docker.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/devops/01.Docker.md",
          "updatedTime": 1636869429000,
          "slugs": [
            {
              "depth": 1,
              "value": "Docker",
              "heading": "docker"
            },
            {
              "depth": 2,
              "value": "参考",
              "heading": "参考"
            },
            {
              "depth": 3,
              "value": "文章",
              "heading": "文章"
            },
            {
              "depth": 3,
              "value": "视频教程",
              "heading": "视频教程"
            }
          ],
          "title": "Docker",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/devops",
            "title": "Devops"
          }
        },
        "title": "Docker - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__devops__01.Docker.md"
      },
      {
        "path": "/simple-course/devops/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/devops/02.Docker入门.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/devops/02.Docker入门.md",
          "updatedTime": 1640503711000,
          "slugs": [
            {
              "depth": 1,
              "value": "慕课 - Docker入门",
              "heading": "慕课---docker入门"
            },
            {
              "depth": 2,
              "value": "1.1 容器技术介绍",
              "heading": "11-容器技术介绍"
            },
            {
              "depth": 3,
              "value": "什么是Container(容器)?",
              "heading": "什么是container容器"
            },
            {
              "depth": 3,
              "value": "容器的快速发展和普及",
              "heading": "容器的快速发展和普及"
            },
            {
              "depth": 3,
              "value": "容器的标准化",
              "heading": "容器的标准化"
            },
            {
              "depth": 4,
              "value": "容器运行时标准（runtime spec)",
              "heading": "容器运行时标准runtime-spec"
            },
            {
              "depth": 4,
              "value": "容器镜像标准（Image spec)",
              "heading": "容器镜像标准image-spec"
            },
            {
              "depth": 3,
              "value": "容器是关乎速度",
              "heading": "容器是关乎速度"
            },
            {
              "depth": 1,
              "value": "2. 容器快速上手",
              "heading": "2-容器快速上手"
            },
            {
              "depth": 2,
              "value": "2.1. Docker CLI 命令行介绍",
              "heading": "21-docker-cli-命令行介绍"
            },
            {
              "depth": 2,
              "value": "2.2 Image vs Container 镜像 vs 容器",
              "heading": "22-image-vs-container-镜像-vs-容器"
            },
            {
              "depth": 3,
              "value": "image 镜像",
              "heading": "image-镜像"
            },
            {
              "depth": 3,
              "value": "container容器",
              "heading": "container容器"
            },
            {
              "depth": 3,
              "value": "docker image的获取",
              "heading": "docker-image的获取"
            },
            {
              "depth": 2,
              "value": "2.3 容器的基本操作",
              "heading": "23-容器的基本操作"
            },
            {
              "depth": 2,
              "value": "2.4 docker container 命令小技巧",
              "heading": "24-docker-container-命令小技巧"
            },
            {
              "depth": 3,
              "value": "批量停止",
              "heading": "批量停止"
            },
            {
              "depth": 3,
              "value": "批量删除",
              "heading": "批量删除"
            },
            {
              "depth": 2,
              "value": "2.5 连接容器的 shell",
              "heading": "25-连接容器的-shell"
            },
            {
              "depth": 2,
              "value": "2.6 容器和虚拟机 Container vs VM",
              "heading": "26-容器和虚拟机-container-vs-vm"
            },
            {
              "depth": 3,
              "value": "容器不是Mini虚拟机",
              "heading": "容器不是mini虚拟机"
            },
            {
              "depth": 3,
              "value": "容器的进程process",
              "heading": "容器的进程process"
            },
            {
              "depth": 2,
              "value": "2.7 docker container run 背后发生了什么？",
              "heading": "27-docker-container-run-背后发生了什么"
            },
            {
              "depth": 1,
              "value": "3. 镜像的创建管理和发布",
              "heading": "3-镜像的创建管理和发布"
            },
            {
              "depth": 2,
              "value": "3.1. 镜像的获取",
              "heading": "31-镜像的获取"
            },
            {
              "depth": 2,
              "value": "3.2 镜像的基本操作",
              "heading": "32-镜像的基本操作"
            },
            {
              "depth": 3,
              "value": "镜像的拉取 Pull Image",
              "heading": "镜像的拉取-pull-image"
            },
            {
              "depth": 3,
              "value": "镜像查看",
              "heading": "镜像查看"
            },
            {
              "depth": 3,
              "value": "镜像的删除",
              "heading": "镜像的删除"
            },
            {
              "depth": 2,
              "value": "3.3 关于 scratch 镜像",
              "heading": "33-关于-scratch-镜像"
            },
            {
              "depth": 1,
              "value": "4. Dockerfile完全指南",
              "heading": "4-dockerfile完全指南"
            },
            {
              "depth": 2,
              "value": "4.1 基础镜像的选择（FROM）",
              "heading": "41-基础镜像的选择from"
            },
            {
              "depth": 3,
              "value": "基本原则",
              "heading": "基本原则"
            },
            {
              "depth": 3,
              "value": "Build一个Nginx镜像",
              "heading": "build一个nginx镜像"
            },
            {
              "depth": 2,
              "value": "4.2 通过 RUN 执行指令",
              "heading": "42-通过-run-执行指令"
            },
            {
              "depth": 3,
              "value": "Dockerfile",
              "heading": "dockerfile"
            },
            {
              "depth": 3,
              "value": "改进版Dockerfile",
              "heading": "改进版dockerfile"
            },
            {
              "depth": 2,
              "value": "4.3 文件复制和目录操作 (ADD,COPY,WORKDIR)",
              "heading": "43-文件复制和目录操作-addcopyworkdir"
            },
            {
              "depth": 3,
              "value": "复制普通文件",
              "heading": "复制普通文件"
            },
            {
              "depth": 3,
              "value": "复制压缩文件",
              "heading": "复制压缩文件"
            },
            {
              "depth": 3,
              "value": "如何选择",
              "heading": "如何选择"
            },
            {
              "depth": 2,
              "value": "4.4 构建参数和环境变量 (ARG vs ENV)",
              "heading": "44-构建参数和环境变量-arg-vs-env"
            },
            {
              "depth": 3,
              "value": "ENV",
              "heading": "env"
            },
            {
              "depth": 3,
              "value": "ARG",
              "heading": "arg"
            },
            {
              "depth": 3,
              "value": "区别",
              "heading": "区别"
            },
            {
              "depth": 2,
              "value": "4.5 容器启动命令 CMD",
              "heading": "45-容器启动命令-cmd"
            },
            {
              "depth": 2,
              "value": "4.6 容器启动命令 ENTRYPOINT",
              "heading": "46-容器启动命令-entrypoint"
            },
            {
              "depth": 2,
              "value": "4.7 Shell 格式和 Exec 格式",
              "heading": "47-shell-格式和-exec-格式"
            },
            {
              "depth": 3,
              "value": "Shell格式",
              "heading": "shell格式"
            },
            {
              "depth": 3,
              "value": "Exec格式",
              "heading": "exec格式"
            },
            {
              "depth": 2,
              "value": "4.8 一起构建一个 Python Flask 镜像",
              "heading": "48-一起构建一个-python-flask-镜像"
            },
            {
              "depth": 2,
              "value": "4.9 Dockerfile 技巧——合理使用 .dockerignore",
              "heading": "49-dockerfile-技巧合理使用-dockerignore"
            },
            {
              "depth": 3,
              "value": "什么是Docker build context",
              "heading": "什么是docker-build-context"
            },
            {
              "depth": 3,
              "value": ".dockerignore 文件",
              "heading": "dockerignore-文件"
            },
            {
              "depth": 2,
              "value": "4.10 Dockerfile 技巧——镜像的多阶段构建",
              "heading": "410-dockerfile-技巧镜像的多阶段构建"
            },
            {
              "depth": 3,
              "value": "C语言例子",
              "heading": "c语言例子"
            },
            {
              "depth": 2,
              "value": "4.11 Dockerfile 技巧——尽量使用非root用户",
              "heading": "411-dockerfile-技巧尽量使用非root用户"
            },
            {
              "depth": 3,
              "value": "Root的危险性",
              "heading": "root的危险性"
            },
            {
              "depth": 3,
              "value": "如何使用非root用户",
              "heading": "如何使用非root用户"
            },
            {
              "depth": 1,
              "value": "5. Docker的存储",
              "heading": "5-docker的存储"
            },
            {
              "depth": 2,
              "value": "5.1 介绍",
              "heading": "51-介绍"
            },
            {
              "depth": 2,
              "value": "5.2 Data Volume",
              "heading": "52-data-volume"
            },
            {
              "depth": 3,
              "value": "环境准备",
              "heading": "环境准备"
            },
            {
              "depth": 3,
              "value": "构建镜像",
              "heading": "构建镜像"
            },
            {
              "depth": 3,
              "value": "创建容器(不指定-v参数)",
              "heading": "创建容器不指定-v参数"
            },
            {
              "depth": 3,
              "value": "创建容器(指定-v参数)",
              "heading": "创建容器指定-v参数"
            },
            {
              "depth": 3,
              "value": "环境清理",
              "heading": "环境清理"
            },
            {
              "depth": 2,
              "value": "5.3 Data Volume 练习 MySQL",
              "heading": "53-data-volume-练习-mysql"
            },
            {
              "depth": 3,
              "value": "准备镜像",
              "heading": "准备镜像"
            },
            {
              "depth": 3,
              "value": "创建容器",
              "heading": "创建容器"
            },
            {
              "depth": 3,
              "value": "数据库写入数据",
              "heading": "数据库写入数据"
            },
            {
              "depth": 2,
              "value": "5.3  多个机器之间的容器共享数据",
              "heading": "53--多个机器之间的容器共享数据"
            },
            {
              "depth": 3,
              "value": "环境准备",
              "heading": "环境准备-1"
            },
            {
              "depth": 3,
              "value": "安装plugin",
              "heading": "安装plugin"
            },
            {
              "depth": 3,
              "value": "创建volume",
              "heading": "创建volume"
            },
            {
              "depth": 3,
              "value": "创建容器挂载Volume",
              "heading": "创建容器挂载volume"
            },
            {
              "depth": 1,
              "value": "6. Docker的网络",
              "heading": "6-docker的网络"
            },
            {
              "depth": 2,
              "value": "6.1 网络基础知识回顾",
              "heading": "61-网络基础知识回顾"
            },
            {
              "depth": 3,
              "value": "Internet如何工作的",
              "heading": "internet如何工作的"
            },
            {
              "depth": 2,
              "value": "6.2 网络常用命令",
              "heading": "62-网络常用命令"
            },
            {
              "depth": 3,
              "value": "IP地址的查看",
              "heading": "ip地址的查看"
            },
            {
              "depth": 3,
              "value": "网络连通性测试",
              "heading": "网络连通性测试"
            },
            {
              "depth": 4,
              "value": "ping命令",
              "heading": "ping命令"
            },
            {
              "depth": 4,
              "value": "telnet命令",
              "heading": "telnet命令"
            },
            {
              "depth": 4,
              "value": "traceroute",
              "heading": "traceroute"
            },
            {
              "depth": 4,
              "value": "curl命令",
              "heading": "curl命令"
            },
            {
              "depth": 2,
              "value": "6.3 Docker Bridge 网络",
              "heading": "63-docker-bridge-网络"
            },
            {
              "depth": 3,
              "value": "创建两个容器",
              "heading": "创建两个容器"
            },
            {
              "depth": 3,
              "value": "容器间通信",
              "heading": "容器间通信"
            },
            {
              "depth": 3,
              "value": "容器对外通信",
              "heading": "容器对外通信"
            },
            {
              "depth": 3,
              "value": "端口转发",
              "heading": "端口转发"
            },
            {
              "depth": 1,
              "value": "7. Docker Compose",
              "heading": "7-docker-compose"
            },
            {
              "depth": 2,
              "value": "7.1 介绍",
              "heading": "71-介绍"
            },
            {
              "depth": 2,
              "value": "7.2 docker compose 的安装",
              "heading": "72-docker-compose-的安装"
            },
            {
              "depth": 2,
              "value": "7.3 compose 文件的结构和版本",
              "heading": "73-compose-文件的结构和版本"
            },
            {
              "depth": 3,
              "value": "compose 文件的结构和版本",
              "heading": "compose-文件的结构和版本"
            },
            {
              "depth": 3,
              "value": "基本语法结构",
              "heading": "基本语法结构"
            },
            {
              "depth": 3,
              "value": "docker-compose 语法版本",
              "heading": "docker-compose-语法版本"
            },
            {
              "depth": 2,
              "value": "7.4 docker compose 水平扩展",
              "heading": "74-docker-compose-水平扩展"
            },
            {
              "depth": 3,
              "value": "环境清理",
              "heading": "环境清理-1"
            },
            {
              "depth": 3,
              "value": "启动",
              "heading": "启动"
            },
            {
              "depth": 3,
              "value": "水平扩展 scale",
              "heading": "水平扩展-scale"
            },
            {
              "depth": 2,
              "value": "7.5 docker compose 环境变量",
              "heading": "75-docker-compose-环境变量"
            },
            {
              "depth": 2,
              "value": "7.6 docker compose 服务依赖和健康检查",
              "heading": "76-docker-compose-服务依赖和健康检查"
            },
            {
              "depth": 3,
              "value": "容器的健康检查",
              "heading": "容器的健康检查"
            },
            {
              "depth": 3,
              "value": "示例源码",
              "heading": "示例源码"
            },
            {
              "depth": 3,
              "value": "构建镜像和创建容器",
              "heading": "构建镜像和创建容器"
            },
            {
              "depth": 3,
              "value": "启动redis服务器",
              "heading": "启动redis服务器"
            },
            {
              "depth": 3,
              "value": "docker-compose 健康检查",
              "heading": "docker-compose-健康检查"
            },
            {
              "depth": 1,
              "value": "8. Docker Swarm",
              "heading": "8-docker-swarm"
            },
            {
              "depth": 2,
              "value": "8.1 Docker Swarm 介绍",
              "heading": "81-docker-swarm-介绍"
            },
            {
              "depth": 3,
              "value": "为什么不建议在生产环境中使用 docker-compose",
              "heading": "为什么不建议在生产环境中使用-docker-compose"
            },
            {
              "depth": 3,
              "value": "容器编排 swarm",
              "heading": "容器编排-swarm"
            },
            {
              "depth": 3,
              "value": "docker swarm vs kubernetes",
              "heading": "docker-swarm-vs-kubernetes"
            },
            {
              "depth": 2,
              "value": "8.2 Swarm 单节点快速上手",
              "heading": "82-swarm-单节点快速上手"
            },
            {
              "depth": 3,
              "value": "初始化",
              "heading": "初始化"
            },
            {
              "depth": 3,
              "value": "docker swarm init 背后发生了什么",
              "heading": "docker-swarm-init-背后发生了什么"
            },
            {
              "depth": 2,
              "value": "8.3 Swarm 三节点集群搭建",
              "heading": "83-swarm-三节点集群搭建"
            },
            {
              "depth": 2,
              "value": "8.4 Swarm 的 overlay 网络详解",
              "heading": "84-swarm-的-overlay-网络详解"
            },
            {
              "depth": 3,
              "value": "创建 overlay 网络",
              "heading": "创建-overlay-网络"
            },
            {
              "depth": 3,
              "value": "创建服务",
              "heading": "创建服务"
            },
            {
              "depth": 3,
              "value": "网络查看",
              "heading": "网络查看"
            },
            {
              "depth": 2,
              "value": "8.5 Swarm 的 ingress网络",
              "heading": "85-swarm-的-ingress网络"
            },
            {
              "depth": 3,
              "value": "service创建",
              "heading": "service创建"
            },
            {
              "depth": 3,
              "value": "service的访问",
              "heading": "service的访问"
            },
            {
              "depth": 3,
              "value": "ingress 数据包的走向",
              "heading": "ingress-数据包的走向"
            },
            {
              "depth": 2,
              "value": "8.6 内部负载均衡和 VIP",
              "heading": "86-内部负载均衡和-vip"
            },
            {
              "depth": 2,
              "value": "8.7 部署多 service 应用",
              "heading": "87-部署多-service-应用"
            },
            {
              "depth": 2,
              "value": "8.8 swarm stack 部署多 service 应用",
              "heading": "88-swarm-stack-部署多-service-应用"
            },
            {
              "depth": 2,
              "value": "8.9 在 swarm 中使用 secret",
              "heading": "89-在-swarm-中使用-secret"
            },
            {
              "depth": 3,
              "value": "创建secret",
              "heading": "创建secret"
            },
            {
              "depth": 4,
              "value": "从标准的收入读取",
              "heading": "从标准的收入读取"
            },
            {
              "depth": 4,
              "value": "从文件读取",
              "heading": "从文件读取"
            },
            {
              "depth": 3,
              "value": "secret 的使用",
              "heading": "secret-的使用"
            },
            {
              "depth": 2,
              "value": "8.10 swarm 使用 local volume",
              "heading": "810-swarm-使用-local-volume"
            },
            {
              "depth": 1,
              "value": "9 Docker vs Podman",
              "heading": "9-docker-vs-podman"
            },
            {
              "depth": 2,
              "value": "9.1 Podman 介绍",
              "heading": "91-podman-介绍"
            },
            {
              "depth": 3,
              "value": "What is Podman?",
              "heading": "what-is-podman"
            },
            {
              "depth": 2,
              "value": "9.2 和 docker 的区别",
              "heading": "92-和-docker-的区别"
            },
            {
              "depth": 2,
              "value": "9.2 Podman 安装",
              "heading": "92-podman-安装"
            },
            {
              "depth": 2,
              "value": "9.3 Podman 创建 Pod",
              "heading": "93-podman-创建-pod"
            },
            {
              "depth": 2,
              "value": "9.4 Docker 的非 root 模式",
              "heading": "94-docker-的非-root-模式"
            },
            {
              "depth": 1,
              "value": "10 Docker的多架构支持",
              "heading": "10-docker的多架构支持"
            },
            {
              "depth": 2,
              "value": "10.1 Docker的多架构支持",
              "heading": "101-docker的多架构支持"
            },
            {
              "depth": 2,
              "value": "10.2 使用 buildx 构建多架构镜像",
              "heading": "102-使用-buildx-构建多架构镜像"
            }
          ],
          "title": "慕课 - Docker入门",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/devops",
            "title": "Devops"
          }
        },
        "title": "慕课 - Docker入门 - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__devops__02.Docker入门.md"
      },
      {
        "path": "/simple-course/fe/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/01.react18.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/01.react18.md",
          "updatedTime": 1655628894000,
          "slugs": [
            {
              "depth": 1,
              "value": "React18",
              "heading": "react18"
            },
            {
              "depth": 2,
              "value": "New Feature",
              "heading": "new-feature"
            },
            {
              "depth": 2,
              "value": "Referrence",
              "heading": "referrence"
            }
          ],
          "title": "React18",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "React18 - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__01.react18.md"
      },
      {
        "path": "/simple-course/fe/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/02.postgreSQL.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/02.postgreSQL.md",
          "updatedTime": 1627803761000,
          "slugs": [
            {
              "depth": 1,
              "value": "PostgreSQL",
              "heading": "postgresql"
            },
            {
              "depth": 2,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 3,
              "value": "创建数据库和账户",
              "heading": "创建数据库和账户"
            },
            {
              "depth": 3,
              "value": "登录控制台指令",
              "heading": "登录控制台指令"
            },
            {
              "depth": 3,
              "value": "常用控制台命令",
              "heading": "常用控制台命令"
            },
            {
              "depth": 2,
              "value": "语法",
              "heading": "语法"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ],
          "title": "PostgreSQL",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "PostgreSQL - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__02.postgreSQL.md"
      },
      {
        "path": "/simple-course/fe/03",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/03.sequelize.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/03.sequelize.md",
          "updatedTime": 1634779914000,
          "slugs": [
            {
              "depth": 1,
              "value": "Sequelize",
              "heading": "sequelize"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            },
            {
              "depth": 3,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "文章",
              "heading": "文章"
            }
          ],
          "title": "Sequelize",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "Sequelize - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__03.sequelize.md"
      },
      {
        "path": "/simple-course/fe/04",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/04.lerna.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/04.lerna.md",
          "updatedTime": 1628326663000,
          "slugs": [
            {
              "depth": 1,
              "value": "Lerna",
              "heading": "lerna"
            },
            {
              "depth": 2,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 2,
              "value": "基本使用",
              "heading": "基本使用"
            },
            {
              "depth": 2,
              "value": "场景",
              "heading": "场景"
            },
            {
              "depth": 3,
              "value": "1. 使用rollup打包package时，如何设置多入口",
              "heading": "1-使用rollup打包package时如何设置多入口"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            },
            {
              "depth": 3,
              "value": "实战教程",
              "heading": "实战教程"
            }
          ],
          "title": "Lerna",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "Lerna - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__04.lerna.md"
      },
      {
        "path": "/simple-course/fe/05",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/05.vite.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/05.vite.md",
          "updatedTime": 1640877227000,
          "slugs": [
            {
              "depth": 1,
              "value": "vite",
              "heading": "vite"
            },
            {
              "depth": 2,
              "value": "Rollup 系统学习",
              "heading": "rollup-系统学习"
            },
            {
              "depth": 3,
              "value": "Rollup 介绍",
              "heading": "rollup-介绍"
            },
            {
              "depth": 3,
              "value": "基本命令",
              "heading": "基本命令"
            },
            {
              "depth": 3,
              "value": "rollup 插件",
              "heading": "rollup-插件"
            },
            {
              "depth": 3,
              "value": "常用插件",
              "heading": "常用插件"
            },
            {
              "depth": 3,
              "value": "ESBuild使用教程",
              "heading": "esbuild使用教程"
            },
            {
              "depth": 2,
              "value": "Vite 插件系统",
              "heading": "vite-插件系统"
            },
            {
              "depth": 3,
              "value": "通用钩子",
              "heading": "通用钩子"
            },
            {
              "depth": 3,
              "value": "Vite 独有钩子",
              "heading": "vite-独有钩子"
            },
            {
              "depth": 3,
              "value": "插件顺序",
              "heading": "插件顺序"
            },
            {
              "depth": 2,
              "value": "Awesome",
              "heading": "awesome"
            },
            {
              "depth": 3,
              "value": "Vue3",
              "heading": "vue3"
            },
            {
              "depth": 2,
              "value": "QA",
              "heading": "qa"
            }
          ],
          "title": "vite",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "vite - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__05.vite.md"
      },
      {
        "path": "/simple-course/fe/06",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/06.css-skill.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/06.css-skill.md",
          "updatedTime": 1654822107000,
          "slugs": [
            {
              "depth": 1,
              "value": "CSS Skill",
              "heading": "css-skill"
            },
            {
              "depth": 2,
              "value": "css 最后一排元素自定样式",
              "heading": "css-最后一排元素自定样式"
            },
            {
              "depth": 2,
              "value": "flex实现横向滚动条",
              "heading": "flex实现横向滚动条"
            }
          ],
          "title": "CSS Skill",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "CSS Skill - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__06.css-skill.md"
      },
      {
        "path": "/simple-course/fe/07",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/07.react-fiber.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/07.react-fiber.md",
          "updatedTime": 1662219315000,
          "slugs": [
            {
              "depth": 1,
              "value": "React Fiber",
              "heading": "react-fiber"
            },
            {
              "depth": 2,
              "value": "Reference",
              "heading": "reference"
            },
            {
              "depth": 3,
              "value": "Article",
              "heading": "article"
            },
            {
              "depth": 4,
              "value": "Lane",
              "heading": "lane"
            },
            {
              "depth": 4,
              "value": "调度",
              "heading": "调度"
            },
            {
              "depth": 5,
              "value": "Application",
              "heading": "application"
            },
            {
              "depth": 2,
              "value": "Youtube",
              "heading": "youtube"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            }
          ],
          "title": "React Fiber",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "React Fiber - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__07.react-fiber.md"
      },
      {
        "path": "/simple-course/fe/08",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/08.rxjs.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/08.rxjs.md",
          "updatedTime": 1629128225000,
          "slugs": [
            {
              "depth": 1,
              "value": "RxJS",
              "heading": "rxjs"
            },
            {
              "depth": 2,
              "value": "什么是 RxJS",
              "heading": "什么是-rxjs"
            },
            {
              "depth": 3,
              "value": "设计模式",
              "heading": "设计模式"
            },
            {
              "depth": 2,
              "value": "Subject",
              "heading": "subject"
            },
            {
              "depth": 2,
              "value": "Scheduler",
              "heading": "scheduler"
            },
            {
              "depth": 2,
              "value": "资料",
              "heading": "资料"
            },
            {
              "depth": 3,
              "value": "开发环境",
              "heading": "开发环境"
            },
            {
              "depth": 3,
              "value": "Github 项目",
              "heading": "github-项目"
            },
            {
              "depth": 4,
              "value": "React Hooks",
              "heading": "react-hooks"
            },
            {
              "depth": 4,
              "value": "Node",
              "heading": "node"
            }
          ],
          "title": "RxJS",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "RxJS - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__08.rxjs.md"
      },
      {
        "path": "/simple-course/fe/10",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/10.monitor.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/10.monitor.md",
          "updatedTime": 1634050173000,
          "slugs": [
            {
              "depth": 1,
              "value": "前端监控系统",
              "heading": "前端监控系统"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ],
          "title": "前端监控系统",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "前端监控系统 - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__10.monitor.md"
      },
      {
        "path": "/simple-course/fe/11",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/11.mfe.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/11.mfe.md",
          "updatedTime": 1646308635000,
          "slugs": [
            {
              "depth": 1,
              "value": "微前端（v0.0.1）",
              "heading": "微前端v001"
            },
            {
              "depth": 2,
              "value": "一些概念",
              "heading": "一些概念"
            },
            {
              "depth": 2,
              "value": "什么是微前端",
              "heading": "什么是微前端"
            },
            {
              "depth": 3,
              "value": "核心价值",
              "heading": "核心价值"
            },
            {
              "depth": 2,
              "value": "qiankun",
              "heading": "qiankun"
            },
            {
              "depth": 2,
              "value": "资源",
              "heading": "资源"
            },
            {
              "depth": 3,
              "value": "产品",
              "heading": "产品"
            },
            {
              "depth": 3,
              "value": "文章",
              "heading": "文章"
            }
          ],
          "title": "微前端（v0.0.1）",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "微前端（v0.0.1） - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__11.mfe.md"
      },
      {
        "path": "/simple-course/fe/12",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/12.yargs.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/12.yargs.md",
          "updatedTime": 1640762681000,
          "slugs": [
            {
              "depth": 1,
              "value": "yargs(WIP)",
              "heading": "yargswip"
            },
            {
              "depth": 2,
              "value": "Demo",
              "heading": "demo"
            },
            {
              "depth": 3,
              "value": "简单案例",
              "heading": "简单案例"
            },
            {
              "depth": 4,
              "value": "process.argv",
              "heading": "processargv"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": ".alias(key, alias)",
              "heading": "aliaskey-alias"
            },
            {
              "depth": 3,
              "value": ".argv",
              "heading": "argv"
            },
            {
              "depth": 3,
              "value": ".array(key)",
              "heading": "arraykey"
            },
            {
              "depth": 3,
              "value": ".boolean(key)",
              "heading": "booleankey"
            },
            {
              "depth": 3,
              "value": ".check(fn, [global=true])",
              "heading": "checkfn-globaltrue"
            },
            {
              "depth": 3,
              "value": ".choices(key, choices)",
              "heading": "choiceskey-choices"
            },
            {
              "depth": 3,
              "value": ".coerce(key, fn)",
              "heading": "coercekey-fn"
            },
            {
              "depth": 3,
              "value": ".commandDir(directory, [opts])",
              "heading": "commanddirdirectory-opts"
            },
            {
              "depth": 3,
              "value": ".command(cmd, desc, [builder], [handler])",
              "heading": "commandcmd-desc-builder-handler"
            },
            {
              "depth": 3,
              "value": ".command(cmd, desc, [module])",
              "heading": "commandcmd-desc-module"
            },
            {
              "depth": 3,
              "value": ".command(module)",
              "heading": "commandmodule"
            },
            {
              "depth": 3,
              "value": ".completion([cmd], [description], [fn])",
              "heading": "completioncmd-description-fn"
            },
            {
              "depth": 3,
              "value": ".config([key], [description], [parseFn])",
              "heading": "configkey-description-parsefn"
            },
            {
              "depth": 3,
              "value": ".config(object)",
              "heading": "configobject"
            },
            {
              "depth": 3,
              "value": ".conflicts(x, y)",
              "heading": "conflictsx-y"
            },
            {
              "depth": 3,
              "value": ".count(key)",
              "heading": "countkey"
            },
            {
              "depth": 3,
              "value": ".default(key, value, [description])",
              "heading": "defaultkey-value-description"
            },
            {
              "depth": 3,
              "value": ".demandOption(key, [msg | boolean])",
              "heading": "demandoptionkey-msg--boolean"
            },
            {
              "depth": 3,
              "value": ".demandOption(key, msg)",
              "heading": "demandoptionkey-msg"
            },
            {
              "depth": 3,
              "value": ".demandCommand([min=1], [max], [minMsg], [maxMsg])",
              "heading": "demandcommandmin1-max-minmsg-maxmsg"
            },
            {
              "depth": 3,
              "value": ".deprecateOption(key, [msg | boolean])",
              "heading": "deprecateoptionkey-msg--boolean"
            },
            {
              "depth": 3,
              "value": ".describe(key, desc)",
              "heading": "describekey-desc"
            },
            {
              "depth": 3,
              "value": ".hide(key)",
              "heading": "hidekey"
            },
            {
              "depth": 3,
              "value": ".detectLocale(boolean)",
              "heading": "detectlocaleboolean"
            },
            {
              "depth": 3,
              "value": ".env([prefix])",
              "heading": "envprefix"
            },
            {
              "depth": 3,
              "value": ".epilog(str)",
              "heading": "epilogstr"
            },
            {
              "depth": 3,
              "value": ".example(cmd, desc)",
              "heading": "examplecmd-desc"
            },
            {
              "depth": 3,
              "value": ".example([[cmd1, desc1], [cmd2, desc2], ...])",
              "heading": "examplecmd1-desc1-cmd2-desc2-"
            },
            {
              "depth": 3,
              "value": ".exitProcess(enable)",
              "heading": "exitprocessenable"
            },
            {
              "depth": 3,
              "value": ".exit(code, err)",
              "heading": "exitcode-err"
            },
            {
              "depth": 3,
              "value": ".fail(fn | boolean)",
              "heading": "failfn--boolean"
            },
            {
              "depth": 3,
              "value": ".getCompletion(args, done);",
              "heading": "getcompletionargs-done"
            },
            {
              "depth": 3,
              "value": ".getHelp()",
              "heading": "gethelp"
            },
            {
              "depth": 3,
              "value": ".global(globals, [global=true])",
              "heading": "globalglobals-globaltrue"
            },
            {
              "depth": 3,
              "value": ".group(key(s), groupName)",
              "heading": "groupkeys-groupname"
            },
            {
              "depth": 3,
              "value": ".help()",
              "heading": "help"
            },
            {
              "depth": 3,
              "value": ".help([option | boolean])",
              "heading": "helpoption--boolean"
            },
            {
              "depth": 3,
              "value": ".help([option, [description]])",
              "heading": "helpoption-description"
            },
            {
              "depth": 3,
              "value": ".implies(x, y)",
              "heading": "impliesx-y"
            },
            {
              "depth": 3,
              "value": ".locale()",
              "heading": "locale"
            },
            {
              "depth": 3,
              "value": ".locale(locale)",
              "heading": "localelocale"
            },
            {
              "depth": 3,
              "value": ".middleware(callbacks, [appleBeforeValidation])",
              "heading": "middlewarecallbacks-applebeforevalidation"
            },
            {
              "depth": 3,
              "value": ".nargs(key, count)",
              "heading": "nargskey-count"
            },
            {
              "depth": 3,
              "value": ".normalize(key)",
              "heading": "normalizekey"
            },
            {
              "depth": 3,
              "value": ".number(key)",
              "heading": "numberkey"
            },
            {
              "depth": 3,
              "value": ".option(key, [opt])",
              "heading": "optionkey-opt"
            },
            {
              "depth": 3,
              "value": ".options(key,[opt])",
              "heading": "optionskeyopt"
            },
            {
              "depth": 3,
              "value": ".parse([args],[context],[parseCallback])",
              "heading": "parseargscontextparsecallback"
            },
            {
              "depth": 3,
              "value": ".parseAsync([args],[context],[parseCallback])",
              "heading": "parseasyncargscontextparsecallback"
            },
            {
              "depth": 3,
              "value": ".parseSync([args], [context], [parseCallback])",
              "heading": "parsesyncargs-context-parsecallback"
            },
            {
              "depth": 3,
              "value": ".parserConfiguration(obj)",
              "heading": "parserconfigurationobj"
            },
            {
              "depth": 3,
              "value": ".pkgConf(key, [cwd])",
              "heading": "pkgconfkey-cwd"
            },
            {
              "depth": 3,
              "value": ".positional(key, opt)",
              "heading": "positionalkey-opt"
            },
            {
              "depth": 3,
              "value": ".recommendCommands()",
              "heading": "recommendcommands"
            },
            {
              "depth": 3,
              "value": ".require(key, [msg | boolean])",
              "heading": "requirekey-msg--boolean"
            },
            {
              "depth": 3,
              "value": ".required(key, [msg | boolean])",
              "heading": "requiredkey-msg--boolean"
            },
            {
              "depth": 3,
              "value": ".requiresArg(key)",
              "heading": "requiresargkey"
            },
            {
              "depth": 3,
              "value": ".scriptName($0)",
              "heading": "scriptname0"
            },
            {
              "depth": 3,
              "value": ".showCompletionScript()",
              "heading": "showcompletionscript"
            },
            {
              "depth": 3,
              "value": ".showHelp([consoleLevel | printCallback])",
              "heading": "showhelpconsolelevel--printcallback"
            },
            {
              "depth": 3,
              "value": ".showVersion([consoleLevel | printCallback])",
              "heading": "showversionconsolelevel--printcallback"
            },
            {
              "depth": 3,
              "value": ".showHelpOnFail(enable, [message])",
              "heading": "showhelponfailenable-message"
            },
            {
              "depth": 3,
              "value": ".showHidden()",
              "heading": "showhidden"
            },
            {
              "depth": 3,
              "value": ".showHidden([option | boolean])",
              "heading": "showhiddenoption--boolean"
            },
            {
              "depth": 3,
              "value": ".showHidden([option, [description]])",
              "heading": "showhiddenoption-description"
            },
            {
              "depth": 3,
              "value": ".skipValidation(key)",
              "heading": "skipvalidationkey"
            },
            {
              "depth": 3,
              "value": ".strict([enabled=true])",
              "heading": "strictenabledtrue"
            },
            {
              "depth": 3,
              "value": ".strictCommands([enabled=true])",
              "heading": "strictcommandsenabledtrue"
            },
            {
              "depth": 3,
              "value": ".strictOptions([enabled=true])",
              "heading": "strictoptionsenabledtrue"
            },
            {
              "depth": 3,
              "value": ".string(key)",
              "heading": "stringkey"
            },
            {
              "depth": 3,
              "value": ".updateLocale(obj)",
              "heading": "updatelocaleobj"
            },
            {
              "depth": 3,
              "value": ".updateStrings(obj)",
              "heading": "updatestringsobj"
            },
            {
              "depth": 3,
              "value": ".usage(, [desc], [builder], [handler])",
              "heading": "usage-desc-builder-handler"
            },
            {
              "depth": 3,
              "value": ".version()",
              "heading": "version"
            },
            {
              "depth": 3,
              "value": ".version([version|boolean])",
              "heading": "versionversionboolean"
            },
            {
              "depth": 3,
              "value": ".version([option], [description],[version])",
              "heading": "versionoption-descriptionversion"
            },
            {
              "depth": 3,
              "value": ".wrap(columns)",
              "heading": "wrapcolumns"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ],
          "title": "yargs(WIP)",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "yargs(WIP) - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__12.yargs.md"
      },
      {
        "path": "/simple-course/fe/13",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/13.chalk.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/13.chalk.md",
          "updatedTime": 1639667535000,
          "slugs": [
            {
              "depth": 1,
              "value": "chalk",
              "heading": "chalk"
            },
            {
              "depth": 2,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            }
          ],
          "title": "chalk",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "chalk - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__13.chalk.md"
      },
      {
        "path": "/simple-course/fe/14",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/14.inquirer.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/14.inquirer.md",
          "updatedTime": 1639667535000,
          "slugs": [
            {
              "depth": 1,
              "value": "Inquirer.js",
              "heading": "inquirerjs"
            },
            {
              "depth": 2,
              "value": "目标与理念",
              "heading": "目标与理念"
            },
            {
              "depth": 2,
              "value": "文档",
              "heading": "文档"
            },
            {
              "depth": 3,
              "value": "安装",
              "heading": "安装"
            }
          ],
          "title": "Inquirer.js",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "Inquirer.js - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__14.inquirer.md"
      },
      {
        "path": "/simple-course/fe/15",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/15.lerna.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/15.lerna.md",
          "updatedTime": 1640416352000,
          "slugs": [
            {
              "depth": 1,
              "value": "Lerna",
              "heading": "lerna"
            },
            {
              "depth": 2,
              "value": "monorepo、lerna是什么",
              "heading": "monorepolerna是什么"
            },
            {
              "depth": 2,
              "value": "优缺点",
              "heading": "优缺点"
            },
            {
              "depth": 2,
              "value": "使用方法",
              "heading": "使用方法"
            }
          ],
          "title": "Lerna",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "Lerna - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__15.lerna.md"
      },
      {
        "path": "/simple-course/fe/16",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/16.Gatsby.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/16.Gatsby.md",
          "updatedTime": 1640500734000,
          "slugs": [
            {
              "depth": 1,
              "value": "Gatsby",
              "heading": "gatsby"
            },
            {
              "depth": 2,
              "value": "教程",
              "heading": "教程"
            },
            {
              "depth": 3,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 3,
              "value": "创建第一个 gatsby 项目",
              "heading": "创建第一个-gatsby-项目"
            },
            {
              "depth": 3,
              "value": "使用 React 开发组件",
              "heading": "使用-react-开发组件"
            },
            {
              "depth": 3,
              "value": "通过插件增加新的功能",
              "heading": "通过插件增加新的功能"
            }
          ],
          "title": "Gatsby",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "Gatsby - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__16.Gatsby.md"
      },
      {
        "path": "/simple-course/fe/17",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/17.cpx.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/17.cpx.md",
          "updatedTime": 1640410904000,
          "slugs": [
            {
              "depth": 1,
              "value": "cpx",
              "heading": "cpx"
            },
            {
              "depth": 2,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "Example",
              "heading": "example"
            }
          ],
          "title": "cpx",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "cpx - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__17.cpx.md"
      },
      {
        "path": "/simple-course/fe/18",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/18.core-js.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/18.core-js.md",
          "updatedTime": 1640762681000,
          "slugs": [
            {
              "depth": 1,
              "value": "core-js",
              "heading": "core-js"
            },
            {
              "depth": 2,
              "value": "最佳 Polyfill 方案",
              "heading": "最佳-polyfill-方案"
            }
          ],
          "title": "core-js",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "core-js - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__18.core-js.md"
      },
      {
        "path": "/simple-course/fe/19",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/19.esbuild.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/19.esbuild.md",
          "updatedTime": 1640762681000,
          "slugs": [
            {
              "depth": 1,
              "value": "esbuild",
              "heading": "esbuild"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "插件系统",
              "heading": "插件系统"
            }
          ],
          "title": "esbuild",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "esbuild - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__19.esbuild.md"
      },
      {
        "path": "/simple-course/fe/21",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/21.babel.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/21.babel.md",
          "updatedTime": 1640762681000,
          "slugs": [
            {
              "depth": 1,
              "value": "Babel",
              "heading": "babel"
            },
            {
              "depth": 2,
              "value": "Babel 是什么",
              "heading": "babel-是什么"
            },
            {
              "depth": 2,
              "value": "Babel Monorepo 架构包解析",
              "heading": "babel-monorepo-架构包解析"
            }
          ],
          "title": "Babel",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "Babel - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__21.babel.md"
      },
      {
        "path": "/simple-course/fe/25",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/25.ast.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/25.ast.md",
          "updatedTime": 1641136379000,
          "slugs": [
            {
              "depth": 1,
              "value": "AST",
              "heading": "ast"
            }
          ],
          "title": "AST",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "AST - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__25.ast.md"
      },
      {
        "path": "/simple-course/fe/27",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/27.react.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/27.react.md",
          "updatedTime": 1649987239000,
          "slugs": [
            {
              "depth": 1,
              "value": "React",
              "heading": "react"
            },
            {
              "depth": 2,
              "value": "原理",
              "heading": "原理"
            },
            {
              "depth": 3,
              "value": "事件原理",
              "heading": "事件原理"
            },
            {
              "depth": 4,
              "value": "合成事件",
              "heading": "合成事件"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ],
          "title": "React",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "React - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__27.react.md"
      },
      {
        "path": "/simple-course/fe/28",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/28.tcp.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/28.tcp.md",
          "updatedTime": 1646308635000,
          "slugs": [
            {
              "depth": 1,
              "value": "TCP",
              "heading": "tcp"
            },
            {
              "depth": 2,
              "value": "TCP 头格式",
              "heading": "tcp-头格式"
            },
            {
              "depth": 2,
              "value": "TCP 状态机",
              "heading": "tcp-状态机"
            },
            {
              "depth": 3,
              "value": "面试题",
              "heading": "面试题"
            },
            {
              "depth": 4,
              "value": "1. 什么是 TCP 的三次握手和四次挥手？（以下是TCP连接的背景知识）",
              "heading": "1-什么是-tcp-的三次握手和四次挥手以下是tcp连接的背景知识"
            },
            {
              "depth": 4,
              "value": "2. TCP的三次握手（为什么是三次？）",
              "heading": "2-tcp的三次握手为什么是三次"
            },
            {
              "depth": 4,
              "value": "3. TCP的四次挥手（为什么是四次？）",
              "heading": "3-tcp的四次挥手为什么是四次"
            },
            {
              "depth": 2,
              "value": "TCP 重传机制",
              "heading": "tcp-重传机制"
            },
            {
              "depth": 3,
              "value": "超时重传机制",
              "heading": "超时重传机制"
            },
            {
              "depth": 3,
              "value": "快速重传机制",
              "heading": "快速重传机制"
            },
            {
              "depth": 3,
              "value": "SACK 方法",
              "heading": "sack-方法"
            },
            {
              "depth": 3,
              "value": "Duplicate SACK - 重复收到数据的问题",
              "heading": "duplicate-sack---重复收到数据的问题"
            },
            {
              "depth": 2,
              "value": "TCP 的 RTT 算法",
              "heading": "tcp-的-rtt-算法"
            },
            {
              "depth": 3,
              "value": "经典算法",
              "heading": "经典算法"
            },
            {
              "depth": 3,
              "value": "Karn / Partridge 算法",
              "heading": "karn--partridge-算法"
            },
            {
              "depth": 3,
              "value": "Jacobson / Karels 算法",
              "heading": "jacobson--karels-算法"
            },
            {
              "depth": 2,
              "value": "TCP 滑动窗口",
              "heading": "tcp-滑动窗口"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ],
          "title": "TCP",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "TCP - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__28.tcp.md"
      },
      {
        "path": "/simple-course/fe/30",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/30.typescript-ticao.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/30.typescript-ticao.md",
          "updatedTime": 1649987239000,
          "slugs": [
            {
              "depth": 1,
              "value": "TypeScript类型体操",
              "heading": "typescript类型体操"
            },
            {
              "depth": 2,
              "value": "TypeScript类型系统支持哪些类型和类型运算？",
              "heading": "typescript类型系统支持哪些类型和类型运算"
            },
            {
              "depth": 3,
              "value": "类型",
              "heading": "类型"
            }
          ],
          "title": "TypeScript类型体操",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "TypeScript类型体操 - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__30.typescript-ticao.md"
      },
      {
        "path": "/simple-course/fe/31",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/31.nx.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/31.nx.md",
          "updatedTime": 1649987239000,
          "slugs": [
            {
              "depth": 1,
              "value": "NX",
              "heading": "nx"
            },
            {
              "depth": 2,
              "value": "什么是NX?",
              "heading": "什么是nx"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            }
          ],
          "title": "NX",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "NX - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__31.nx.md"
      },
      {
        "path": "/simple-course/fe/32",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/32.systemjs.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/32.systemjs.md",
          "updatedTime": 1649987239000,
          "slugs": [
            {
              "depth": 1,
              "value": "Systemjs",
              "heading": "systemjs"
            },
            {
              "depth": 2,
              "value": "资料",
              "heading": "资料"
            }
          ],
          "title": "Systemjs",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "Systemjs - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__32.systemjs.md"
      },
      {
        "path": "/simple-course/fe/33",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/33.english-grammar.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/33.english-grammar.md",
          "updatedTime": 1652110555000,
          "slugs": [
            {
              "depth": 2,
              "value": "English Grammer",
              "heading": "english-grammer"
            },
            {
              "depth": 2,
              "value": "The parts of a Sentence",
              "heading": "the-parts-of-a-sentence"
            }
          ],
          "title": "English Grammer",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "English Grammer - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__33.english-grammar.md"
      },
      {
        "path": "/simple-course/fe/34",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/34.type-challenge.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/34.type-challenge.md",
          "updatedTime": 1651073982000,
          "slugs": [
            {
              "depth": 1,
              "value": "Type Challenge",
              "heading": "type-challenge"
            },
            {
              "depth": 2,
              "value": "Easy",
              "heading": "easy"
            },
            {
              "depth": 3,
              "value": "Pick",
              "heading": "pick"
            },
            {
              "depth": 3,
              "value": "Readonly",
              "heading": "readonly"
            },
            {
              "depth": 3,
              "value": "Tuple to Object",
              "heading": "tuple-to-object"
            },
            {
              "depth": 3,
              "value": "First of Array",
              "heading": "first-of-array"
            },
            {
              "depth": 4,
              "value": "知识点 - infer",
              "heading": "知识点---infer"
            },
            {
              "depth": 5,
              "value": "作用",
              "heading": "作用"
            },
            {
              "depth": 3,
              "value": "Length Of Tuple",
              "heading": "length-of-tuple"
            },
            {
              "depth": 3,
              "value": "Exclude",
              "heading": "exclude"
            },
            {
              "depth": 3,
              "value": "Awaited",
              "heading": "awaited"
            },
            {
              "depth": 3,
              "value": "If",
              "heading": "if"
            },
            {
              "depth": 3,
              "value": "Concat",
              "heading": "concat"
            },
            {
              "depth": 3,
              "value": "Includes",
              "heading": "includes"
            },
            {
              "depth": 3,
              "value": "Push",
              "heading": "push"
            },
            {
              "depth": 3,
              "value": "Unshift",
              "heading": "unshift"
            },
            {
              "depth": 3,
              "value": "Parameters",
              "heading": "parameters"
            },
            {
              "depth": 2,
              "value": "Medium",
              "heading": "medium"
            },
            {
              "depth": 3,
              "value": "Get Return Type",
              "heading": "get-return-type"
            },
            {
              "depth": 3,
              "value": "Omit",
              "heading": "omit"
            },
            {
              "depth": 3,
              "value": "Readonly 2",
              "heading": "readonly-2"
            },
            {
              "depth": 3,
              "value": "Deep Readonly",
              "heading": "deep-readonly"
            },
            {
              "depth": 3,
              "value": "Tuple to Union",
              "heading": "tuple-to-union"
            },
            {
              "depth": 3,
              "value": "Chainable Options",
              "heading": "chainable-options"
            },
            {
              "depth": 3,
              "value": "Last of Array",
              "heading": "last-of-array"
            },
            {
              "depth": 3,
              "value": "Pop",
              "heading": "pop"
            },
            {
              "depth": 3,
              "value": "Promise.all",
              "heading": "promiseall"
            },
            {
              "depth": 3,
              "value": "Type LookUp",
              "heading": "type-lookup"
            },
            {
              "depth": 3,
              "value": "Trim Left",
              "heading": "trim-left"
            },
            {
              "depth": 3,
              "value": "Trim",
              "heading": "trim"
            },
            {
              "depth": 2,
              "value": "Hard",
              "heading": "hard"
            },
            {
              "depth": 2,
              "value": "Extreme",
              "heading": "extreme"
            }
          ],
          "title": "Type Challenge",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "Type Challenge - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__34.type-challenge.md"
      },
      {
        "path": "/simple-course/fe/36",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/36.web3-roadmap.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/36.web3-roadmap.md",
          "updatedTime": 1652975474000,
          "slugs": [
            {
              "depth": 1,
              "value": "Web3.0 Roadmap",
              "heading": "web30-roadmap"
            },
            {
              "depth": 2,
              "value": "Developer Roadmap To Get Started With Web 3.0",
              "heading": "developer-roadmap-to-get-started-with-web-30"
            },
            {
              "depth": 2,
              "value": "Reference",
              "heading": "reference"
            }
          ],
          "title": "Web3.0 Roadmap",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "Web3.0 Roadmap - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__36.web3-roadmap.md"
      },
      {
        "path": "/simple-course/fe/37",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/37.es6+.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/37.es6+.md",
          "updatedTime": 1656552506000,
          "slugs": [
            {
              "depth": 1,
              "value": "6个新的JavaScript新特性",
              "heading": "6个新的javascript新特性"
            },
            {
              "depth": 2,
              "value": "1. 使用 Object.hasOwn 替换 in",
              "heading": "1-使用-objecthasown-替换-in"
            },
            {
              "depth": 2,
              "value": "Reference",
              "heading": "reference"
            }
          ],
          "title": "6个新的JavaScript新特性",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "6个新的JavaScript新特性 - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__37.es6+.md"
      },
      {
        "path": "/simple-course/fe/38",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/38.fe-tools.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/38.fe-tools.md",
          "updatedTime": 1656552506000,
          "slugs": [
            {
              "depth": 1,
              "value": "FE tools need to know",
              "heading": "fe-tools-need-to-know"
            },
            {
              "depth": 2,
              "value": "Reference",
              "heading": "reference"
            }
          ],
          "title": "FE tools need to know",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "FE tools need to know - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__38.fe-tools.md"
      },
      {
        "path": "/simple-course/fe/39.bun",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/39.bun.sh.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/39.bun.sh.md",
          "updatedTime": 1657725000000,
          "slugs": [
            {
              "depth": 1,
              "value": "Bun",
              "heading": "bun"
            }
          ],
          "title": "Bun",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "Bun - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__39.bun.sh.md"
      },
      {
        "path": "/simple-course/fe/41",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/fe/41.react.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/fe/41.react.md",
          "updatedTime": 1660402451000,
          "slugs": [
            {
              "depth": 1,
              "value": "React",
              "heading": "react"
            },
            {
              "depth": 2,
              "value": "Fiber",
              "heading": "fiber"
            },
            {
              "depth": 2,
              "value": "Hooks",
              "heading": "hooks"
            },
            {
              "depth": 3,
              "value": "custom hooks",
              "heading": "custom-hooks"
            },
            {
              "depth": 2,
              "value": "Components",
              "heading": "components"
            },
            {
              "depth": 3,
              "value": "Draggable",
              "heading": "draggable"
            },
            {
              "depth": 3,
              "value": "Unknown",
              "heading": "unknown"
            },
            {
              "depth": 2,
              "value": "Demo",
              "heading": "demo"
            }
          ],
          "title": "React",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/fe",
            "title": "Fe"
          }
        },
        "title": "React - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__fe__41.react.md"
      },
      {
        "path": "/simple-course/java/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/java/01.maven.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/java/01.maven.md",
          "updatedTime": 1627803761000,
          "slugs": [
            {
              "depth": 1,
              "value": "Maven",
              "heading": "maven"
            }
          ],
          "title": "Maven",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/java",
            "title": "Java"
          }
        },
        "title": "Maven - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__java__01.maven.md"
      },
      {
        "path": "/simple-course/java/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/java/02.redis.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/java/02.redis.md",
          "updatedTime": 1628068289000,
          "slugs": [
            {
              "depth": 1,
              "value": "Redis",
              "heading": "redis"
            },
            {
              "depth": 2,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ],
          "title": "Redis",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/java",
            "title": "Java"
          }
        },
        "title": "Redis - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__java__02.redis.md"
      },
      {
        "path": "/simple-course/java/03",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/java/03.Zookeeper.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/java/03.Zookeeper.md",
          "updatedTime": 1629555594000,
          "slugs": [
            {
              "depth": 1,
              "value": "Zookeeper",
              "heading": "zookeeper"
            }
          ],
          "title": "Zookeeper",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/java",
            "title": "Java"
          }
        },
        "title": "Zookeeper - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__java__03.Zookeeper.md"
      },
      {
        "path": "/simple-course/java/04",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/java/04.SpringBoot.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/java/04.SpringBoot.md",
          "updatedTime": 1640101544000,
          "slugs": [
            {
              "depth": 1,
              "value": "Spring Boot",
              "heading": "spring-boot"
            },
            {
              "depth": 2,
              "value": "教程",
              "heading": "教程"
            },
            {
              "depth": 3,
              "value": "Book",
              "heading": "book"
            },
            {
              "depth": 3,
              "value": "视频",
              "heading": "视频"
            },
            {
              "depth": 4,
              "value": "慕课网",
              "heading": "慕课网"
            }
          ],
          "title": "Spring Boot",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/java",
            "title": "Java"
          }
        },
        "title": "Spring Boot - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__java__04.SpringBoot.md"
      },
      {
        "path": "/simple-course/note/01",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/note/01.udemy-rust.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/note/01.udemy-rust.md",
          "updatedTime": 1657466201000,
          "slugs": [
            {
              "depth": 1,
              "value": "Udemy - Rust",
              "heading": "udemy---rust"
            },
            {
              "depth": 2,
              "value": "07 User Input",
              "heading": "07-user-input"
            },
            {
              "depth": 2,
              "value": "08 Comments",
              "heading": "08-comments"
            },
            {
              "depth": 2,
              "value": "09 println!",
              "heading": "09-println"
            },
            {
              "depth": 2,
              "value": "10. Language basics - Overview",
              "heading": "10-language-basics---overview"
            },
            {
              "depth": 2,
              "value": "11. Variables",
              "heading": "11-variables"
            },
            {
              "depth": 2,
              "value": "12. Scalar data types",
              "heading": "12-scalar-data-types"
            },
            {
              "depth": 2,
              "value": "13. String",
              "heading": "13-string"
            },
            {
              "depth": 3,
              "value": "String method",
              "heading": "string-method"
            },
            {
              "depth": 2,
              "value": "14. Constant",
              "heading": "14-constant"
            },
            {
              "depth": 2,
              "value": "15. Operator",
              "heading": "15-operator"
            },
            {
              "depth": 3,
              "value": "Arithmetic operators",
              "heading": "arithmetic-operators"
            },
            {
              "depth": 3,
              "value": "Relational operators",
              "heading": "relational-operators"
            },
            {
              "depth": 3,
              "value": "Logical operators",
              "heading": "logical-operators"
            },
            {
              "depth": 3,
              "value": "Bitwise operators",
              "heading": "bitwise-operators"
            },
            {
              "depth": 2,
              "value": "15. Functions",
              "heading": "15-functions"
            },
            {
              "depth": 3,
              "value": "Function parametes",
              "heading": "function-parametes"
            },
            {
              "depth": 2,
              "value": "17. Modules Overview",
              "heading": "17-modules-overview"
            },
            {
              "depth": 2,
              "value": "18. Modules",
              "heading": "18-modules"
            },
            {
              "depth": 2,
              "value": "19. Crates",
              "heading": "19-crates"
            },
            {
              "depth": 2,
              "value": "20. Random",
              "heading": "20-random"
            },
            {
              "depth": 2,
              "value": "21. Data types",
              "heading": "21-data-types"
            },
            {
              "depth": 2,
              "value": "22. Arrays",
              "heading": "22-arrays"
            },
            {
              "depth": 2,
              "value": "23. Vectors",
              "heading": "23-vectors"
            },
            {
              "depth": 2,
              "value": "24. Slices",
              "heading": "24-slices"
            },
            {
              "depth": 2,
              "value": "25. Tuples",
              "heading": "25-tuples"
            },
            {
              "depth": 2,
              "value": "26. Sturctures",
              "heading": "26-sturctures"
            },
            {
              "depth": 2,
              "value": "27. Enums",
              "heading": "27-enums"
            },
            {
              "depth": 2,
              "value": "28. Generics",
              "heading": "28-generics"
            },
            {
              "depth": 2,
              "value": "29. Control structures",
              "heading": "29-control-structures"
            },
            {
              "depth": 2,
              "value": "30. If statement",
              "heading": "30-if-statement"
            },
            {
              "depth": 2,
              "value": "31 Match",
              "heading": "31-match"
            },
            {
              "depth": 2,
              "value": "32 Pattern matching",
              "heading": "32-pattern-matching"
            },
            {
              "depth": 2,
              "value": "33 For Loop",
              "heading": "33-for-loop"
            },
            {
              "depth": 2,
              "value": "34. While Loop",
              "heading": "34-while-loop"
            },
            {
              "depth": 2,
              "value": "35 Functions Overview",
              "heading": "35-functions-overview"
            },
            {
              "depth": 2,
              "value": "36. Functions and scope",
              "heading": "36-functions-and-scope"
            },
            {
              "depth": 2,
              "value": "37. Closures",
              "heading": "37-closures"
            },
            {
              "depth": 2,
              "value": "38. HOFs",
              "heading": "38-hofs"
            },
            {
              "depth": 2,
              "value": "39. Macros",
              "heading": "39-macros"
            },
            {
              "depth": 2,
              "value": "40. Trait Overview",
              "heading": "40-trait-overview"
            },
            {
              "depth": 2,
              "value": "41. Traits",
              "heading": "41-traits"
            },
            {
              "depth": 2,
              "value": "42. Generics",
              "heading": "42-generics"
            },
            {
              "depth": 2,
              "value": "43. Returning traits",
              "heading": "43-returning-traits"
            },
            {
              "depth": 2,
              "value": "44. Adding traits to existing structures",
              "heading": "44-adding-traits-to-existing-structures"
            },
            {
              "depth": 2,
              "value": "45. Operator overloading",
              "heading": "45-operator-overloading"
            },
            {
              "depth": 2,
              "value": "46. Static dispatch",
              "heading": "46-static-dispatch"
            },
            {
              "depth": 2,
              "value": "47. Dynamic dispatch",
              "heading": "47-dynamic-dispatch"
            },
            {
              "depth": 2,
              "value": "48. Memory management Overview",
              "heading": "48-memory-management-overview"
            },
            {
              "depth": 2,
              "value": "49. Ownership",
              "heading": "49-ownership"
            },
            {
              "depth": 2,
              "value": "50. Borrowing",
              "heading": "50-borrowing"
            },
            {
              "depth": 2,
              "value": "51. Lifetime",
              "heading": "51-lifetime"
            }
          ],
          "title": "Udemy - Rust",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/note",
            "title": "Note"
          }
        },
        "title": "Udemy - Rust - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__note__01.udemy-rust.md"
      },
      {
        "path": "/simple-course/note/02",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/simple-course/note/02.udemy-master-phrasal-verb.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/simple-course/note/02.udemy-master-phrasal-verb.md",
          "updatedTime": 1658676743000,
          "slugs": [
            {
              "depth": 1,
              "value": "Udemy - Master English Phrasal Verbs",
              "heading": "udemy---master-english-phrasal-verbs"
            },
            {
              "depth": 2,
              "value": "001",
              "heading": "001"
            },
            {
              "depth": 2,
              "value": "002",
              "heading": "002"
            },
            {
              "depth": 2,
              "value": "003  The Most Common Phrasal Verb - Part1",
              "heading": "003--the-most-common-phrasal-verb---part1"
            },
            {
              "depth": 2,
              "value": "004 Phrasal Verb Pictures, Lesson 2",
              "heading": "004-phrasal-verb-pictures-lesson-2"
            },
            {
              "depth": 2,
              "value": "004 Phrasal Verb Pictures, Lesson 3",
              "heading": "004-phrasal-verb-pictures-lesson-3"
            }
          ],
          "title": "Udemy - Master English Phrasal Verbs",
          "nav": {
            "path": "/simple-course",
            "title": "Draft"
          },
          "group": {
            "path": "/simple-course/note",
            "title": "Note"
          }
        },
        "title": "Udemy - Master English Phrasal Verbs - Wuxiao.io's Blog",
        "_chunkName": "docs__simple-course__note__02.udemy-master-phrasal-verb.md"
      },
      {
        "path": "/solution",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/solution/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/solution/index.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Solution",
            "order": 30,
            "path": "/solution"
          },
          "title": "Solution",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Solution",
              "heading": "solution"
            }
          ]
        },
        "title": "Solution - Wuxiao.io's Blog",
        "_chunkName": "docs__solution__index.md"
      },
      {
        "path": "/tech-product",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/tech-product/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/tech-product/index.md",
          "updatedTime": 1658676743000,
          "nav": {
            "title": "Tech Product",
            "order": 25,
            "path": "/tech-product"
          },
          "title": "Tech Product",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "技术产品",
              "heading": "技术产品"
            },
            {
              "depth": 2,
              "value": "基础建设",
              "heading": "基础建设"
            },
            {
              "depth": 2,
              "value": "产品",
              "heading": "产品"
            }
          ]
        },
        "title": "Tech Product - Wuxiao.io's Blog",
        "_chunkName": "docs__tech-product__index.md"
      },
      {
        "path": "/wiki/documents",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/wiki/documents.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/wiki/documents.md",
          "updatedTime": 1650298047000,
          "nav": {
            "title": "Wiki",
            "order": 99,
            "path": "/wiki"
          },
          "title": "文档",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "文档",
              "heading": "文档"
            },
            {
              "depth": 2,
              "value": "慕课",
              "heading": "慕课"
            },
            {
              "depth": 2,
              "value": "珠峰",
              "heading": "珠峰"
            },
            {
              "depth": 2,
              "value": "开课吧",
              "heading": "开课吧"
            },
            {
              "depth": 2,
              "value": "马哥",
              "heading": "马哥"
            },
            {
              "depth": 2,
              "value": "程序员在囧途",
              "heading": "程序员在囧途"
            },
            {
              "depth": 2,
              "value": "手册",
              "heading": "手册"
            }
          ]
        },
        "title": "文档 - Wuxiao.io's Blog",
        "_chunkName": "docs__wiki__documents.md"
      },
      {
        "path": "/wiki",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/wiki/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/wiki/index.md",
          "updatedTime": 1672295224000,
          "nav": {
            "title": "Wiki",
            "order": 99,
            "path": "/wiki"
          },
          "title": "Wiki",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Wiki",
              "heading": "wiki"
            },
            {
              "depth": 2,
              "value": "信息获取",
              "heading": "信息获取"
            },
            {
              "depth": 3,
              "value": "Collection",
              "heading": "collection"
            },
            {
              "depth": 3,
              "value": "Newsletters",
              "heading": "newsletters"
            },
            {
              "depth": 3,
              "value": "Conf",
              "heading": "conf"
            },
            {
              "depth": 3,
              "value": "Blog",
              "heading": "blog"
            },
            {
              "depth": 2,
              "value": "Tools",
              "heading": "tools"
            },
            {
              "depth": 3,
              "value": "Visualization Tools",
              "heading": "visualization-tools"
            },
            {
              "depth": 3,
              "value": "Lens",
              "heading": "lens"
            },
            {
              "depth": 2,
              "value": "微信公众号",
              "heading": "微信公众号"
            },
            {
              "depth": 2,
              "value": "Study",
              "heading": "study"
            },
            {
              "depth": 2,
              "value": "TV",
              "heading": "tv"
            },
            {
              "depth": 2,
              "value": "Youtube Channel",
              "heading": "youtube-channel"
            },
            {
              "depth": 3,
              "value": "英语学习",
              "heading": "英语学习"
            },
            {
              "depth": 4,
              "value": "Beginner",
              "heading": "beginner"
            },
            {
              "depth": 4,
              "value": "Intermediate",
              "heading": "intermediate"
            },
            {
              "depth": 4,
              "value": "Advanced",
              "heading": "advanced"
            },
            {
              "depth": 4,
              "value": "Other",
              "heading": "other"
            },
            {
              "depth": 2,
              "value": "设计灵感(Inspiration)",
              "heading": "设计灵感inspiration"
            },
            {
              "depth": 2,
              "value": "Remote Job",
              "heading": "remote-job"
            },
            {
              "depth": 2,
              "value": "VPS",
              "heading": "vps"
            }
          ]
        },
        "title": "Wiki - Wuxiao.io's Blog",
        "_chunkName": "docs__wiki__index.md"
      },
      {
        "path": "/wiki/site",
        "component": require('/Users/wuxiao/Documents/wuxiao.io/doc/awesome-fe/docs/wiki/site.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/wiki/site.md",
          "updatedTime": 1650516115000,
          "nav": {
            "title": "Wiki",
            "order": 99,
            "path": "/wiki"
          },
          "title": "常访问网站",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "网站",
              "heading": "网站"
            }
          ]
        },
        "title": "常访问网站 - Wuxiao.io's Blog",
        "_chunkName": "docs__wiki__site.md"
      },
      {
        "path": "/awesome/personal",
        "meta": {
          "order": 2,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/awesome/personal/01"
      },
      {
        "path": "/awesome/play",
        "meta": {
          "order": 3,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/awesome/play/01"
      },
      {
        "path": "/backlog/interest",
        "meta": {
          "order": 5,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/backlog/interest/01"
      },
      {
        "path": "/backlog/interview",
        "meta": {
          "order": 10,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/backlog/interview/01"
      },
      {
        "path": "/backlog/work",
        "meta": {
          "order": 2,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/backlog/work/01"
      },
      {
        "path": "/backlog/crash-course",
        "meta": {
          "order": 20,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/backlog/crash-course/01"
      },
      {
        "path": "/best",
        "meta": {
          "order": 80
        },
        "exact": true,
        "redirect": "/best/note"
      },
      {
        "path": "/deep-learn/fe",
        "meta": {},
        "exact": true,
        "redirect": "/deep-learn/fe/01"
      },
      {
        "path": "/deep-learn/rust",
        "meta": {},
        "exact": true,
        "redirect": "/deep-learn/rust/01"
      },
      {
        "path": "/efficiency/todo",
        "meta": {
          "order": 4,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/efficiency/todo/202204"
      },
      {
        "path": "/efficiency",
        "meta": {
          "order": 80
        },
        "exact": true,
        "redirect": "/efficiency/advise"
      },
      {
        "path": "/efficiency/future",
        "meta": {
          "order": 2,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/efficiency/future/5g"
      },
      {
        "path": "/efficiency/study",
        "meta": {
          "order": 3,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/efficiency/study/template"
      },
      {
        "path": "/sets/01.react",
        "meta": {
          "order": 10,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/sets/01.react/01"
      },
      {
        "path": "/sets/03.rust",
        "meta": {
          "order": 30,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/sets/03.rust/01"
      },
      {
        "path": "/simple-course/devops",
        "meta": {},
        "exact": true,
        "redirect": "/simple-course/devops/01"
      },
      {
        "path": "/simple-course/fe",
        "meta": {},
        "exact": true,
        "redirect": "/simple-course/fe/01"
      },
      {
        "path": "/simple-course/java",
        "meta": {},
        "exact": true,
        "redirect": "/simple-course/java/01"
      },
      {
        "path": "/simple-course/note",
        "meta": {},
        "exact": true,
        "redirect": "/simple-course/note/01"
      }
    ],
    "title": "Wuxiao.io's Blog",
    "component": (props) => props.children
  }
];
    // allow user to extend routes
    plugin.applyPlugins({
      key: 'patchRoutes',
      type: ApplyPluginsType.event,
      args: { routes },
    });

    // for renderServer
    const opts = {
      path,
      history,
      pathname,
      getInitialPropsCtx,
      basename,
      context,
      mode,
      plugin,
      staticMarkup,
      routes,
      isServer: process.env.__IS_SERVER,
    }
    const dynamicImport =  true;
    if (dynamicImport && !manifest) {
      try {
        // prerender not work because the manifest generation behind of the prerender
        manifest = requireFunc(`./asset-manifest.json`);
      } catch (_) {}
    }
    // renderServer get rootContainer
    const { pageHTML, pageInitialProps, routesMatched } = await renderServer(opts);
    rootContainer = pageHTML;
    if (html) {
      // plugin for modify html template
      html = await plugin.applyPlugins({
        key: 'ssr.modifyServerHTML',
        type: ApplyPluginsType.modify,
        initialValue: html,
        args: {
          context,
          cheerio,
          routesMatched,
          dynamicImport,
          manifest
        },
        async: true,
      });
      html = await handleHTML({ html, rootContainer, pageInitialProps, mountElementId, mode, forceInitial, removeWindowInitialProps, routesMatched, dynamicImport, manifest });
    }
  } catch (e) {
    // downgrade into csr
    error = e;
  }
  return {
    rootContainer,
    error,
    html,
  }
}

export default render;
