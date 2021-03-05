// @ts-nocheck
import { ApplyPluginsType, dynamic } from '/Users/wuxiao/wuxiao-desktop/weisuoke/doc/awesome-fe/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"Awesome frontend","meta":{"order":10}}],"/best":[{"path":"/best/react","title":"注释","meta":{"order":1}}],"/draft":[{"title":"基础知识","path":"/draft/basic","meta":{"order":1},"children":[{"path":"/draft/basic/blob","title":"前端二进制","meta":{"order":1}},{"path":"/draft/basic/gof","title":"设计模式（JS篇）","meta":{"order":2}},{"path":"/draft/basic/restful","title":"Restful最佳实践","meta":{"order":3}},{"path":"/draft/basic/hooks","title":"实现React Hooks","meta":{"order":4}},{"path":"/draft/basic/recoil","title":"Recoil","meta":{"order":5}},{"path":"/draft/basic/xstate","title":"xState","meta":{"order":6}},{"path":"/draft/basic/jianming-vue","title":"《简明教程：Vue3》","meta":{"order":7}},{"path":"/draft/basic/jianming-algorithm","title":"《简明教程：算法》","meta":{"order":8}},{"path":"/draft/basic/jianming-ts","title":"《简明教程：TypeScript》","meta":{"order":8}}]},{"title":"架构","path":"/draft/arch","meta":{"order":2},"children":[{"path":"/draft/arch/sso","title":"单点登录","meta":{"order":1}}]},{"title":"imooc","path":"/draft/imooc","meta":{"order":3},"children":[{"path":"/draft/imooc/性能优化","title":"imooc - 前端性能优化","meta":{"order":1}},{"path":"/draft/imooc/可视化","title":"imooc - 前端可视化","meta":{"order":2}},{"path":"/draft/imooc/vue3","title":"imooc - Vue3.0高仿知乎专栏","meta":{"order":3}}]},{"title":"新技术","path":"/draft/new-tech","meta":{"order":4},"children":[{"path":"/draft/new-tech/vue3","title":"Vue3","meta":{"order":1}},{"path":"/draft/new-tech/webpack5","title":"Webpack5","meta":{"order":2}}]},{"title":"实战","path":"/draft/practise","meta":{"order":4},"children":[{"path":"/draft/practise/react-popover","title":"react popover 组件","meta":{"order":1}}]},{"title":"Miscellaneous","path":"/draft/miscellaneous","meta":{},"children":[{"path":"/draft/miscellaneous/滚动事件","title":"滚动事件","meta":{}}]},{"title":"Zhufeng","path":"/draft/zhufeng","meta":{},"children":[{"path":"/draft/zhufeng/react202012","title":"ZF React 202012","meta":{}},{"path":"/draft/zhufeng/vue202010","title":"Vue202010","meta":{}}]}],"/efficiency":[{"title":"代码人生","path":"/efficiency/advise","meta":{"order":1},"children":[{"path":"/efficiency/advise","title":"准则","meta":{"order":1}}]},{"path":"/efficiency/fe-tools","title":"工具","meta":{"order":1}},{"title":"未来","path":"/efficiency/future","meta":{"order":2},"children":[{"path":"/efficiency/future/5g","title":"5g对前端的影响","meta":{"order":1}}]},{"title":"模式化学习","path":"/efficiency/study","meta":{"order":3},"children":[{"path":"/efficiency/study/template","title":"总纲","meta":{"order":1}},{"path":"/efficiency/study/todo","title":"定级","meta":{"order":2}}]}],"/graph":[{"path":"/graph","title":"目录","meta":{"order":1}},{"title":"框架","path":"/graph/basic/library/react","meta":{"order":2},"children":[{"path":"/graph/basic/library/react/basic","title":"React - 基础","meta":{"order":2101}}]}],"/lab":[{"title":"Inbox","path":"/lab","meta":{"order":1},"children":[{"path":"/lab","title":"实验室","meta":{"order":1}}]},{"title":"Cli","path":"/lab/cli","meta":{"order":1},"children":[{"path":"/lab/cli/basic","title":"基础","meta":{"order":1}}]},{"title":"微前端","path":"/lab/mfe","meta":{"order":2},"children":[{"path":"/lab/mfe/basic","title":"基础","meta":{"order":1}}]},{"title":"监控系统","path":"/lab/monitor","meta":{"order":3},"children":[{"path":"/lab/monitor/basic","title":"基础","meta":{"order":1}}]},{"title":"Serverless","path":"/lab/serverless","meta":{"order":5},"children":[{"path":"/lab/serverless/basic","title":"资料","meta":{"order":1}},{"path":"/lab/serverless/midway","title":"Midway","meta":{"order":5}},{"path":"/lab/serverless/zf-serverless","title":"珠峰Serverless实战","meta":{"order":20}}]},{"path":"/lab/apollo","title":"Apollo Server搭建","meta":{}}],"/project":[{"title":"Inbox","path":"/project","meta":{"order":1},"children":[{"path":"/project","title":"开源项目","meta":{"order":1}}]}],"/source":[{"path":"/source/react","title":"React","meta":{"order":1}}],"/wiki":[{"path":"/wiki","title":"Wiki","meta":{"order":1}},{"path":"/wiki/inbox","title":"Inbox","meta":{"order":2}},{"path":"/wiki/wechat","title":"前端群问题汇总","meta":{"order":3}},{"path":"/wiki/fe-nandian","title":"前端难点","meta":{"order":4}},{"path":"/wiki/server-inbox","title":"后端Inbox","meta":{"order":5}}]}},"locales":[],"navs":{"*":[{"title":"知识体系","order":1,"path":"/graph"},{"title":"草稿","order":1,"path":"/draft"},{"title":"开源项目","order":2,"path":"/project"},{"title":"最佳实践","order":5,"path":"/best"},{"title":"源码阅读","order":5,"path":"/source"},{"path":"/lab","title":"实验室","order":10},{"title":"效率","order":10,"path":"/efficiency"},{"title":"Wiki","order":99,"path":"/wiki"}]},"title":"Awesome Front-end develop","desc":"架构|思路|效率","mode":"site","repoUrl":"https://github.com/weisuoke/awesome-fe"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__index.md' */'../../docs/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1614957649000,
          "title": "Awesome frontend",
          "order": 10,
          "hero": {
            "title": "Awesome front-end develop",
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
        "title": "Awesome frontend",
        "_chunkName": "docs__index.md"
      },
      {
        "path": "/best/react",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__best__react.md' */'../../docs/best/react.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/best/react.md",
          "updatedTime": 1609922356000,
          "nav": {
            "title": "最佳实践",
            "order": 5,
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
        "title": "注释",
        "_chunkName": "docs__best__react.md"
      },
      {
        "path": "/draft/arch/sso",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__arch__sso.md' */'../../docs/draft/arch/sso.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/arch/sso.md",
          "updatedTime": 1602511207000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "架构",
            "order": 2,
            "path": "/draft/arch"
          },
          "title": "单点登录",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "单点登录",
              "heading": "单点登录"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "单点登录",
        "_chunkName": "docs__draft__arch__sso.md"
      },
      {
        "path": "/draft/basic/blob",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__basic__blob.md' */'../../docs/draft/basic/blob.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/basic/blob.md",
          "updatedTime": 1603378772000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "基础知识",
            "order": 1,
            "path": "/draft/basic"
          },
          "title": "前端二进制",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "前端二进制",
              "heading": "前端二进制"
            },
            {
              "depth": 2,
              "value": "1 API",
              "heading": "1-api"
            },
            {
              "depth": 3,
              "value": "1.1 FileReader",
              "heading": "11-filereader"
            },
            {
              "depth": 4,
              "value": "1.1.1 readAsDataURL()",
              "heading": "111-readasdataurl"
            },
            {
              "depth": 4,
              "value": "1.1.2 readAsArrayBuffer()",
              "heading": "112-readasarraybuffer"
            },
            {
              "depth": 4,
              "value": "1.1.3 readAsText()",
              "heading": "113-readastext"
            },
            {
              "depth": 3,
              "value": "1.2 Base64",
              "heading": "12-base64"
            },
            {
              "depth": 4,
              "value": "1.2.1 btoa()",
              "heading": "121-btoa"
            },
            {
              "depth": 4,
              "value": "1.2.2 atob()",
              "heading": "122-atob"
            },
            {
              "depth": 3,
              "value": "1.3 Object URL",
              "heading": "13-object-url"
            },
            {
              "depth": 4,
              "value": "1.3.1 URL.createObjectURL()",
              "heading": "131-urlcreateobjecturl"
            },
            {
              "depth": 4,
              "value": "1.3.2 URL.revokeObjectURL()",
              "heading": "132-urlrevokeobjecturl"
            },
            {
              "depth": 3,
              "value": "1.4 Blob API",
              "heading": "14-blob-api"
            },
            {
              "depth": 4,
              "value": "1.4.1 Blob 构造函数",
              "heading": "141-blob-构造函数"
            },
            {
              "depth": 4,
              "value": "1.4.2 Blob 方法",
              "heading": "142-blob-方法"
            },
            {
              "depth": 3,
              "value": "1.5 ArrayBuffer",
              "heading": "15-arraybuffer"
            },
            {
              "depth": 3,
              "value": "1.6 Unit8Array",
              "heading": "16-unit8array"
            },
            {
              "depth": 3,
              "value": "1.7 TypedArray",
              "heading": "17-typedarray"
            },
            {
              "depth": 3,
              "value": "1.8 DataView",
              "heading": "18-dataview"
            },
            {
              "depth": 2,
              "value": "2. 应用场景",
              "heading": "2-应用场景"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "前端二进制",
        "_chunkName": "docs__draft__basic__blob.md"
      },
      {
        "path": "/draft/basic/gof",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__basic__gof.md' */'../../docs/draft/basic/gof.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/basic/gof.md",
          "updatedTime": 1603120953000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "基础知识",
            "order": 1,
            "path": "/draft/basic"
          },
          "title": "设计模式（JS篇）",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "设计模式（JS篇）",
              "heading": "设计模式（js篇）"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ]
        },
        "title": "设计模式（JS篇）",
        "_chunkName": "docs__draft__basic__gof.md"
      },
      {
        "path": "/draft/basic/hooks",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__basic__hooks.md' */'../../docs/draft/basic/hooks.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/basic/hooks.md",
          "updatedTime": 1604329924000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "基础知识",
            "order": 1,
            "path": "/draft/basic"
          },
          "title": "实现React Hooks",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "实现React Hooks",
              "heading": "实现react-hooks"
            },
            {
              "depth": 2,
              "value": "实现 useState",
              "heading": "实现-usestate"
            },
            {
              "depth": 2,
              "value": "实现 useCallback",
              "heading": "实现-usecallback"
            },
            {
              "depth": 2,
              "value": "实现 useMemo",
              "heading": "实现-usememo"
            },
            {
              "depth": 2,
              "value": "实现 useEffect 和 useLayoutEffect",
              "heading": "实现-useeffect-和-uselayouteffect"
            },
            {
              "depth": 2,
              "value": "实现 useContext",
              "heading": "实现-usecontext"
            },
            {
              "depth": 2,
              "value": "实现 useReducer",
              "heading": "实现-usereducer"
            }
          ]
        },
        "title": "实现React Hooks",
        "_chunkName": "docs__draft__basic__hooks.md"
      },
      {
        "path": "/draft/basic/jianming-algorithm",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__basic__jianming-algorithm.md' */'../../docs/draft/basic/jianming-algorithm.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/basic/jianming-algorithm.md",
          "updatedTime": 1606264398000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "基础知识",
            "order": 1,
            "path": "/draft/basic"
          },
          "title": "《简明教程：算法》",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "《简明教程：算法》（v0.0.0）",
              "heading": "《简明教程：算法》（v000）"
            },
            {
              "depth": 2,
              "value": "资源",
              "heading": "资源"
            },
            {
              "depth": 3,
              "value": "Book",
              "heading": "book"
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
          ]
        },
        "title": "《简明教程：算法》",
        "_chunkName": "docs__draft__basic__jianming-algorithm.md"
      },
      {
        "path": "/draft/basic/jianming-ts",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__basic__jianming-ts.md' */'../../docs/draft/basic/jianming-ts.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/basic/jianming-ts.md",
          "updatedTime": 1606264398000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "基础知识",
            "order": 1,
            "path": "/draft/basic"
          },
          "title": "《简明教程：TypeScript》",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "《简明教程：TypeScript》(v0.0.0)",
              "heading": "《简明教程：typescript》v000"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "《简明教程：TypeScript》",
        "_chunkName": "docs__draft__basic__jianming-ts.md"
      },
      {
        "path": "/draft/basic/jianming-vue",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__basic__jianming-vue.md' */'../../docs/draft/basic/jianming-vue.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/basic/jianming-vue.md",
          "updatedTime": 1607527311000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "基础知识",
            "order": 1,
            "path": "/draft/basic"
          },
          "title": "《简明教程：Vue3》",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "简明教程：Vue3 (v0.0.2)",
              "heading": "简明教程：vue3-v002"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "setup()",
              "heading": "setup"
            },
            {
              "depth": 3,
              "value": "reactive()",
              "heading": "reactive"
            },
            {
              "depth": 3,
              "value": "ref()",
              "heading": "ref"
            },
            {
              "depth": 3,
              "value": "isRef() 函数",
              "heading": "isref-函数"
            },
            {
              "depth": 3,
              "value": "toRefs() 函数",
              "heading": "torefs-函数"
            },
            {
              "depth": 3,
              "value": "computed()",
              "heading": "computed"
            },
            {
              "depth": 4,
              "value": "创建只读的计算属性",
              "heading": "创建只读的计算属性"
            },
            {
              "depth": 4,
              "value": "通过set()、get()方法创建一个可读可写的计算属性",
              "heading": "通过set、get方法创建一个可读可写的计算属性"
            },
            {
              "depth": 3,
              "value": "watch()",
              "heading": "watch"
            },
            {
              "depth": 4,
              "value": "监听用reactive声明的数据源",
              "heading": "监听用reactive声明的数据源"
            },
            {
              "depth": 4,
              "value": "监听用ref声明的数据源",
              "heading": "监听用ref声明的数据源"
            },
            {
              "depth": 4,
              "value": "同时监听多个值",
              "heading": "同时监听多个值"
            },
            {
              "depth": 4,
              "value": "stop 停止监听",
              "heading": "stop-停止监听"
            },
            {
              "depth": 3,
              "value": "LifeCycle Hooks(新的生命后期)",
              "heading": "lifecycle-hooks新的生命后期"
            },
            {
              "depth": 3,
              "value": "Template refs",
              "heading": "template-refs"
            },
            {
              "depth": 2,
              "value": "概念",
              "heading": "概念"
            },
            {
              "depth": 2,
              "value": "疑惑",
              "heading": "疑惑"
            },
            {
              "depth": 2,
              "value": "实战",
              "heading": "实战"
            },
            {
              "depth": 3,
              "value": "文档",
              "heading": "文档"
            },
            {
              "depth": 3,
              "value": "组件库",
              "heading": "组件库"
            },
            {
              "depth": 3,
              "value": "案例",
              "heading": "案例"
            },
            {
              "depth": 3,
              "value": "视频",
              "heading": "视频"
            },
            {
              "depth": 2,
              "value": "Awesome",
              "heading": "awesome"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "《简明教程：Vue3》",
        "_chunkName": "docs__draft__basic__jianming-vue.md"
      },
      {
        "path": "/draft/basic/recoil",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__basic__recoil.md' */'../../docs/draft/basic/recoil.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/basic/recoil.md",
          "updatedTime": 1604585495000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "基础知识",
            "order": 1,
            "path": "/draft/basic"
          },
          "title": "Recoil",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Recoil",
              "heading": "recoil"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "简单实现 Recoil",
              "heading": "简单实现-recoil"
            },
            {
              "depth": 3,
              "value": "recoil/index.js",
              "heading": "recoilindexjs"
            },
            {
              "depth": 3,
              "value": "RecoilRoot.js",
              "heading": "recoilrootjs"
            },
            {
              "depth": 3,
              "value": "atom.js",
              "heading": "atomjs"
            },
            {
              "depth": 3,
              "value": "useRecoilState.js",
              "heading": "userecoilstatejs"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ]
        },
        "title": "Recoil",
        "_chunkName": "docs__draft__basic__recoil.md"
      },
      {
        "path": "/draft/basic/restful",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__basic__restful.md' */'../../docs/draft/basic/restful.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/basic/restful.md",
          "updatedTime": 1604329924000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "基础知识",
            "order": 1,
            "path": "/draft/basic"
          },
          "title": "Restful最佳实践",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Restful最佳实践",
              "heading": "restful最佳实践"
            },
            {
              "depth": 2,
              "value": "什么是RESTful API？",
              "heading": "什么是restful-api？"
            },
            {
              "depth": 2,
              "value": "原文",
              "heading": "原文"
            }
          ]
        },
        "title": "Restful最佳实践",
        "_chunkName": "docs__draft__basic__restful.md"
      },
      {
        "path": "/draft/basic/xstate",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__basic__xstate.md' */'../../docs/draft/basic/xstate.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/basic/xstate.md",
          "updatedTime": 1604453618000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "基础知识",
            "order": 1,
            "path": "/draft/basic"
          },
          "title": "xState",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "xState",
              "heading": "xstate"
            }
          ]
        },
        "title": "xState",
        "_chunkName": "docs__draft__basic__xstate.md"
      },
      {
        "path": "/draft/imooc/vue3",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__imooc__vue3.md' */'../../docs/draft/imooc/vue3.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/imooc/vue3.md",
          "updatedTime": 1603898305000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "imooc",
            "order": 3,
            "path": "/draft/imooc"
          },
          "title": "imooc - Vue3.0高仿知乎专栏",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "Vue3.0 高仿知乎专栏",
              "heading": "vue30-高仿知乎专栏"
            },
            {
              "depth": 2,
              "value": "3. 初识 Vue3.0: 新特性详解",
              "heading": "3-初识-vue30-新特性详解"
            },
            {
              "depth": 3,
              "value": "3.1 新特性简介",
              "heading": "31-新特性简介"
            },
            {
              "depth": 4,
              "value": "3.1.1 性能提升",
              "heading": "311-性能提升"
            },
            {
              "depth": 4,
              "value": "3.1.2 Composition API",
              "heading": "312-composition-api"
            },
            {
              "depth": 4,
              "value": "3.1.3 其他新增特性",
              "heading": "313-其他新增特性"
            },
            {
              "depth": 4,
              "value": "3.1.4 更好的 TypeScript 支持",
              "heading": "314-更好的-typescript-支持"
            },
            {
              "depth": 3,
              "value": "3.2 为什么会有Vue3",
              "heading": "32-为什么会有vue3"
            },
            {
              "depth": 4,
              "value": "3.2.1 Mixin 的缺点",
              "heading": "321-mixin-的缺点"
            },
            {
              "depth": 3,
              "value": "3.2.2 Vue2遇到的难题",
              "heading": "322-vue2遇到的难题"
            },
            {
              "depth": 3,
              "value": "3.3 使用vue-cli配置vue3开发环境",
              "heading": "33-使用vue-cli配置vue3开发环境"
            },
            {
              "depth": 3,
              "value": "3.4 文件目录结构分析",
              "heading": "34-文件目录结构分析"
            }
          ]
        },
        "title": "imooc - Vue3.0高仿知乎专栏",
        "_chunkName": "docs__draft__imooc__vue3.md"
      },
      {
        "path": "/draft/imooc/可视化",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__imooc__可视化.md' */'../../docs/draft/imooc/可视化.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/imooc/可视化.md",
          "updatedTime": 1602685734000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "imooc",
            "order": 3,
            "path": "/draft/imooc"
          },
          "title": "imooc - 前端可视化",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "慕课网 - 数据可视化体系课（更新到11章 2020.7.2）",
              "heading": "慕课网---数据可视化体系课（更新到11章-202072）"
            },
            {
              "depth": 2,
              "value": "2. 我需要学数据可视化吗?",
              "heading": "2-我需要学数据可视化吗"
            },
            {
              "depth": 3,
              "value": "2.1 什么是数据可视化",
              "heading": "21-什么是数据可视化"
            },
            {
              "depth": 3,
              "value": "2.2 数据可视化的发展历史",
              "heading": "22-数据可视化的发展历史"
            },
            {
              "depth": 3,
              "value": "2.3 数据可视化应用场景",
              "heading": "23-数据可视化应用场景"
            },
            {
              "depth": 4,
              "value": "2.3.1 简单应用",
              "heading": "231-简单应用"
            },
            {
              "depth": 4,
              "value": "2.3.2 复杂应用",
              "heading": "232-复杂应用"
            },
            {
              "depth": 3,
              "value": "2.4 数据可视化发展前景",
              "heading": "24-数据可视化发展前景"
            },
            {
              "depth": 4,
              "value": "2.4.1 发展趋势",
              "heading": "241-发展趋势"
            },
            {
              "depth": 2,
              "value": "3. 数据可视化前端技术选型（上）",
              "heading": "3-数据可视化前端技术选型（上）"
            },
            {
              "depth": 3,
              "value": "3.1 数据可视化解决方案",
              "heading": "31-数据可视化解决方案"
            },
            {
              "depth": 4,
              "value": "3.1.1 Skia",
              "heading": "311-skia"
            },
            {
              "depth": 4,
              "value": "3.1.2 OpenGL",
              "heading": "312-opengl"
            },
            {
              "depth": 4,
              "value": "3.1.3 Chrome",
              "heading": "313-chrome"
            },
            {
              "depth": 3,
              "value": "3.2 Canvas 入门",
              "heading": "32-canvas-入门"
            },
            {
              "depth": 3,
              "value": "3.3 SVG 入门",
              "heading": "33-svg-入门"
            },
            {
              "depth": 3,
              "value": "3.4 WebGL",
              "heading": "34-webgl"
            },
            {
              "depth": 4,
              "value": "3.4.1 WebGL 案例分享",
              "heading": "341-webgl-案例分享"
            },
            {
              "depth": 3,
              "value": "3.5 zrender",
              "heading": "35-zrender"
            },
            {
              "depth": 3,
              "value": "3.6 D3",
              "heading": "36-d3"
            },
            {
              "depth": 3,
              "value": "3.7 Three.js",
              "heading": "37-threejs"
            },
            {
              "depth": 2,
              "value": "4. 数据可视化前端技术选型（下）",
              "heading": "4-数据可视化前端技术选型（下）"
            },
            {
              "depth": 3,
              "value": "4.1 Highcharts",
              "heading": "41-highcharts"
            },
            {
              "depth": 4,
              "value": "4.1.1 Highcharts",
              "heading": "411-highcharts"
            },
            {
              "depth": 4,
              "value": "4.1.2 Highstock",
              "heading": "412-highstock"
            },
            {
              "depth": 4,
              "value": "4.1.3 Highmaps",
              "heading": "413-highmaps"
            },
            {
              "depth": 3,
              "value": "4.2 AntV",
              "heading": "42-antv"
            },
            {
              "depth": 3,
              "value": "4.3 ECharts 系列",
              "heading": "43-echarts-系列"
            },
            {
              "depth": 3,
              "value": "4.4 Echarts4.0 新特性：dataset",
              "heading": "44-echarts40-新特性：dataset"
            },
            {
              "depth": 3,
              "value": "4.5 ECharts 基本概念：组件",
              "heading": "45-echarts-基本概念：组件"
            },
            {
              "depth": 3,
              "value": "4.6 ECharts 基本概念：定位",
              "heading": "46-echarts-基本概念：定位"
            },
            {
              "depth": 3,
              "value": "4.7 Echarts 基本概念：坐标系",
              "heading": "47-echarts-基本概念：坐标系"
            },
            {
              "depth": 3,
              "value": "4.8 技术选型",
              "heading": "48-技术选型"
            },
            {
              "depth": 4,
              "value": "4.8.1 ECharts VS Highcharts",
              "heading": "481-echarts-vs-highcharts"
            },
            {
              "depth": 4,
              "value": "4.8.2 Echarts VS Antv",
              "heading": "482-echarts-vs-antv"
            },
            {
              "depth": 4,
              "value": "4.8.3 Echarts 优势总结",
              "heading": "483-echarts-优势总结"
            }
          ]
        },
        "title": "imooc - 前端可视化",
        "_chunkName": "docs__draft__imooc__可视化.md"
      },
      {
        "path": "/draft/imooc/性能优化",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__imooc__性能优化.md' */'../../docs/draft/imooc/性能优化.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/imooc/性能优化.md",
          "updatedTime": 1602602012000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "imooc",
            "order": 3,
            "path": "/draft/imooc"
          },
          "title": "imooc - 前端性能优化",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "性能优化",
              "heading": "性能优化"
            },
            {
              "depth": 2,
              "value": "2.  性能优化的指标和工具",
              "heading": "2--性能优化的指标和工具"
            },
            {
              "depth": 3,
              "value": "2.1 为什么要性能优化",
              "heading": "21-为什么要性能优化"
            },
            {
              "depth": 4,
              "value": "2.1.1 性能 - Web网站和应用的支柱",
              "heading": "211-性能---web网站和应用的支柱"
            },
            {
              "depth": 4,
              "value": "2.1.2 寻找性能瓶颈",
              "heading": "212-寻找性能瓶颈"
            },
            {
              "depth": 4,
              "value": "2.1.3 移动端挑战多",
              "heading": "213-移动端挑战多"
            },
            {
              "depth": 3,
              "value": "2.2 性能指标和优化目标",
              "heading": "22-性能指标和优化目标"
            },
            {
              "depth": 3,
              "value": "2.3 RAIL测量模型",
              "heading": "23-rail测量模型"
            },
            {
              "depth": 4,
              "value": "2.3.1 什么是RAIL",
              "heading": "231-什么是rail"
            },
            {
              "depth": 4,
              "value": "2.3.2 RAIL评估标准",
              "heading": "232-rail评估标准"
            },
            {
              "depth": 4,
              "value": "2.3.3 性能测量工具",
              "heading": "233-性能测量工具"
            },
            {
              "depth": 3,
              "value": "2.4 使用 WebPageTest 评估 Web 网站性能",
              "heading": "24-使用-webpagetest-评估-web-网站性能"
            },
            {
              "depth": 4,
              "value": "2.4.1 解读 WebPageTest 的报告",
              "heading": "241-解读-webpagetest-的报告"
            },
            {
              "depth": 4,
              "value": "2.4.2 WebPageTest",
              "heading": "242-webpagetest"
            }
          ]
        },
        "title": "imooc - 前端性能优化",
        "_chunkName": "docs__draft__imooc__性能优化.md"
      },
      {
        "path": "/draft/miscellaneous/滚动事件",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__miscellaneous__滚动事件.md' */'../../docs/draft/miscellaneous/滚动事件.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/miscellaneous/滚动事件.md",
          "updatedTime": 1614006130000,
          "slugs": [
            {
              "depth": 1,
              "value": "滚动事件",
              "heading": "滚动事件"
            },
            {
              "depth": 2,
              "value": "案例",
              "heading": "案例"
            },
            {
              "depth": 2,
              "value": "代码库",
              "heading": "代码库"
            }
          ],
          "title": "滚动事件",
          "nav": {
            "path": "/draft",
            "title": "草稿"
          },
          "group": {
            "path": "/draft/miscellaneous",
            "title": "Miscellaneous"
          }
        },
        "title": "滚动事件",
        "_chunkName": "docs__draft__miscellaneous__滚动事件.md"
      },
      {
        "path": "/draft/new-tech/vue3",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__newTech__vue3.md' */'../../docs/draft/newTech/vue3.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/newTech/vue3.md",
          "updatedTime": 1603898305000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "新技术",
            "order": 4,
            "path": "/draft/new-tech"
          },
          "title": "Vue3",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Vue3",
              "heading": "vue3"
            },
            {
              "depth": 2,
              "value": "新特性",
              "heading": "新特性"
            },
            {
              "depth": 2,
              "value": "参考阅读",
              "heading": "参考阅读"
            }
          ]
        },
        "title": "Vue3",
        "_chunkName": "docs__draft__newTech__vue3.md"
      },
      {
        "path": "/draft/new-tech/webpack5",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__newTech__webpack5.md' */'../../docs/draft/newTech/webpack5.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/newTech/webpack5.md",
          "updatedTime": 1602602012000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "新技术",
            "order": 4,
            "path": "/draft/new-tech"
          },
          "title": "Webpack5",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Webpack5",
              "heading": "webpack5"
            }
          ]
        },
        "title": "Webpack5",
        "_chunkName": "docs__draft__newTech__webpack5.md"
      },
      {
        "path": "/draft/practise/react-popover",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__practise__react-popover.md' */'../../docs/draft/practise/react-popover.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/practise/react-popover.md",
          "updatedTime": 1603203754000,
          "nav": {
            "title": "草稿",
            "order": 1,
            "path": "/draft"
          },
          "group": {
            "title": "实战",
            "order": 4,
            "path": "/draft/practise"
          },
          "title": "react popover 组件",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "react popover 组件",
              "heading": "react-popover-组件"
            },
            {
              "depth": 2,
              "value": "1. 参考资料",
              "heading": "1-参考资料"
            },
            {
              "depth": 3,
              "value": "1.1 Github",
              "heading": "11-github"
            },
            {
              "depth": 4,
              "value": "1.1.1 Antd实现",
              "heading": "111-antd实现"
            },
            {
              "depth": 3,
              "value": "1.2 文章",
              "heading": "12-文章"
            },
            {
              "depth": 2,
              "value": "2. 技术盲点",
              "heading": "2-技术盲点"
            },
            {
              "depth": 3,
              "value": "2.1 demo",
              "heading": "21-demo"
            },
            {
              "depth": 3,
              "value": "2.2 API",
              "heading": "22-api"
            }
          ]
        },
        "title": "react popover 组件",
        "_chunkName": "docs__draft__practise__react-popover.md"
      },
      {
        "path": "/draft/zhufeng/react202012",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__zhufeng__React202012.md' */'../../docs/draft/zhufeng/React202012.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/zhufeng/React202012.md",
          "updatedTime": 1614006130000,
          "slugs": [
            {
              "depth": 1,
              "value": "ZF React 202012",
              "heading": "zf-react-202012"
            },
            {
              "depth": 3,
              "value": "为什么要这么做呢？",
              "heading": "为什么要这么做呢？"
            },
            {
              "depth": 3,
              "value": "打印出的 JSX 元素",
              "heading": "打印出的-jsx-元素"
            },
            {
              "depth": 2,
              "value": "4. 实现函数组件以及属性",
              "heading": "4-实现函数组件以及属性"
            }
          ],
          "title": "ZF React 202012",
          "nav": {
            "path": "/draft",
            "title": "草稿"
          },
          "group": {
            "path": "/draft/zhufeng",
            "title": "Zhufeng"
          }
        },
        "title": "ZF React 202012",
        "_chunkName": "docs__draft__zhufeng__React202012.md"
      },
      {
        "path": "/draft/zhufeng/vue202010",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__draft__zhufeng__Vue202010.md' */'../../docs/draft/zhufeng/Vue202010.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/draft/zhufeng/Vue202010.md",
          "updatedTime": 1614610561000,
          "slugs": [
            {
              "depth": 1,
              "value": "Vue202010",
              "heading": "vue202010"
            }
          ],
          "title": "Vue202010",
          "nav": {
            "path": "/draft",
            "title": "草稿"
          },
          "group": {
            "path": "/draft/zhufeng",
            "title": "Zhufeng"
          }
        },
        "title": "Vue202010",
        "_chunkName": "docs__draft__zhufeng__Vue202010.md"
      },
      {
        "path": "/efficiency/fe-tools",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__efficiency__feTools.md' */'../../docs/efficiency/feTools.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/feTools.md",
          "updatedTime": 1610118752000,
          "nav": {
            "title": "效率",
            "order": 80,
            "path": "/efficiency"
          },
          "title": "工具",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "前端工具",
              "heading": "前端工具"
            },
            {
              "depth": 2,
              "value": "1. 写作",
              "heading": "1-写作"
            },
            {
              "depth": 2,
              "value": "2. 效率篇",
              "heading": "2-效率篇"
            },
            {
              "depth": 2,
              "value": "3. 命令行工具篇",
              "heading": "3-命令行工具篇"
            },
            {
              "depth": 2,
              "value": "4. 有趣",
              "heading": "4-有趣"
            },
            {
              "depth": 2,
              "value": "5. 灵感",
              "heading": "5-灵感"
            },
            {
              "depth": 2,
              "value": "6. Icon",
              "heading": "6-icon"
            },
            {
              "depth": 2,
              "value": "7. 字体",
              "heading": "7-字体"
            },
            {
              "depth": 2,
              "value": "8. CSS",
              "heading": "8-css"
            },
            {
              "depth": 3,
              "value": "动画",
              "heading": "动画"
            },
            {
              "depth": 2,
              "value": "9. 单元测试",
              "heading": "9-单元测试"
            },
            {
              "depth": 2,
              "value": "10. 网站优化",
              "heading": "10-网站优化"
            },
            {
              "depth": 2,
              "value": "参考",
              "heading": "参考"
            }
          ]
        },
        "title": "工具",
        "_chunkName": "docs__efficiency__feTools.md"
      },
      {
        "path": "/efficiency/advise",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__efficiency__advise__index.md' */'../../docs/efficiency/advise/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/advise/index.md",
          "updatedTime": 1604237688000,
          "nav": {
            "title": "效率",
            "order": 10,
            "path": "/efficiency"
          },
          "group": {
            "title": "代码人生",
            "order": 1,
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
        "title": "准则",
        "_chunkName": "docs__efficiency__advise__index.md"
      },
      {
        "path": "/efficiency/future/5g",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__efficiency__future__5g.md' */'../../docs/efficiency/future/5g.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/future/5g.md",
          "updatedTime": 1614957649000,
          "nav": {
            "title": "效率",
            "order": 10,
            "path": "/efficiency"
          },
          "group": {
            "title": "未来",
            "order": 2,
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
        "title": "5g对前端的影响",
        "_chunkName": "docs__efficiency__future__5g.md"
      },
      {
        "path": "/efficiency/study/template",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__efficiency__study__template.md' */'../../docs/efficiency/study/template.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/study/template.md",
          "updatedTime": 1606181866000,
          "nav": {
            "title": "效率",
            "order": 10,
            "path": "/efficiency"
          },
          "group": {
            "title": "模式化学习",
            "order": 3,
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
              "heading": "《简明教程-xxx》"
            },
            {
              "depth": 4,
              "value": "《案例：xxx》",
              "heading": "《案例：xxx》"
            },
            {
              "depth": 4,
              "value": "《试用：xxx》",
              "heading": "《试用：xxx》"
            },
            {
              "depth": 4,
              "value": "《源码：xxx 》",
              "heading": "《源码：xxx-》"
            },
            {
              "depth": 4,
              "value": "《最佳实践：xxx》",
              "heading": "《最佳实践：xxx》"
            },
            {
              "depth": 4,
              "value": "《实验：xxx》",
              "heading": "《实验：xxx》"
            },
            {
              "depth": 4,
              "value": "《有趣：xxx》",
              "heading": "《有趣：xxx》"
            }
          ]
        },
        "title": "总纲",
        "_chunkName": "docs__efficiency__study__template.md"
      },
      {
        "path": "/efficiency/study/todo",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__efficiency__study__todo.md' */'../../docs/efficiency/study/todo.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/efficiency/study/todo.md",
          "updatedTime": 1612277714000,
          "nav": {
            "title": "效率",
            "order": 10,
            "path": "/efficiency"
          },
          "group": {
            "title": "模式化学习",
            "order": 3,
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
              "heading": "☆☆☆☆☆"
            },
            {
              "depth": 2,
              "value": "☆☆☆☆",
              "heading": "☆☆☆☆"
            },
            {
              "depth": 2,
              "value": "☆☆☆",
              "heading": "☆☆☆"
            },
            {
              "depth": 2,
              "value": "☆☆",
              "heading": "☆☆"
            },
            {
              "depth": 2,
              "value": "☆",
              "heading": "☆"
            },
            {
              "depth": 2,
              "value": "未定级项目",
              "heading": "未定级项目"
            }
          ]
        },
        "title": "定级",
        "_chunkName": "docs__efficiency__study__todo.md"
      },
      {
        "path": "/graph",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__graph__index.md' */'../../docs/graph/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/graph/index.md",
          "updatedTime": 1614957649000,
          "nav": {
            "title": "知识体系",
            "order": 2,
            "path": "/graph"
          },
          "title": "目录",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "知识体系",
              "heading": "知识体系"
            }
          ]
        },
        "title": "目录",
        "_chunkName": "docs__graph__index.md"
      },
      {
        "path": "/graph/basic/library/react/basic",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__graph__basic__library__React__basic.md' */'../../docs/graph/basic/library/React/basic.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/graph/basic/library/React/basic.md",
          "updatedTime": 1614957649000,
          "nav": {
            "title": "知识体系",
            "order": 1,
            "path": "/graph"
          },
          "group": {
            "title": "框架",
            "order": 2,
            "path": "/graph/basic/library/react"
          },
          "title": "React - 基础",
          "order": 2101,
          "slugs": [
            {
              "depth": 1,
              "value": "React 基础知识",
              "heading": "react-基础知识"
            },
            {
              "depth": 2,
              "value": "知识点",
              "heading": "知识点"
            }
          ]
        },
        "title": "React - 基础",
        "_chunkName": "docs__graph__basic__library__React__basic.md"
      },
      {
        "path": "/lab/apollo",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__lab__apollo.md' */'../../docs/lab/apollo.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/lab/apollo.md",
          "updatedTime": 1611328501000,
          "slugs": [
            {
              "depth": 1,
              "value": "Apollo Server搭建",
              "heading": "apollo-server搭建"
            },
            {
              "depth": 2,
              "value": "使用到的包",
              "heading": "使用到的包"
            },
            {
              "depth": 2,
              "value": "未使用到的包",
              "heading": "未使用到的包"
            },
            {
              "depth": 2,
              "value": "名词",
              "heading": "名词"
            },
            {
              "depth": 2,
              "value": "文章",
              "heading": "文章"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 3,
              "value": "apollo server",
              "heading": "apollo-server"
            }
          ],
          "title": "Apollo Server搭建",
          "nav": {
            "path": "/lab",
            "title": "实验室"
          }
        },
        "title": "Apollo Server搭建",
        "_chunkName": "docs__lab__apollo.md"
      },
      {
        "path": "/lab",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__lab__index.md' */'../../docs/lab/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/lab/index.md",
          "updatedTime": 1606264398000,
          "nav": {
            "title": "实验室",
            "order": 1,
            "path": "/lab"
          },
          "group": {
            "title": "Inbox",
            "order": 1,
            "path": "/lab"
          },
          "title": "实验室",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Lab",
              "heading": "lab"
            },
            {
              "depth": 2,
              "value": "Article",
              "heading": "article"
            },
            {
              "depth": 2,
              "value": "CSS",
              "heading": "css"
            },
            {
              "depth": 2,
              "value": "软技能",
              "heading": "软技能"
            },
            {
              "depth": 2,
              "value": "架构",
              "heading": "架构"
            },
            {
              "depth": 2,
              "value": "后端",
              "heading": "后端"
            },
            {
              "depth": 3,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "其他",
              "heading": "其他"
            },
            {
              "depth": 2,
              "value": "Github",
              "heading": "github"
            },
            {
              "depth": 2,
              "value": "算法",
              "heading": "算法"
            },
            {
              "depth": 2,
              "value": "智能化",
              "heading": "智能化"
            },
            {
              "depth": 2,
              "value": "前端早早聊主题",
              "heading": "前端早早聊主题"
            },
            {
              "depth": 3,
              "value": "lowCode",
              "heading": "lowcode"
            }
          ]
        },
        "title": "实验室",
        "_chunkName": "docs__lab__index.md"
      },
      {
        "path": "/lab/cli/basic",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__lab__cli__basic.md' */'../../docs/lab/cli/basic.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/lab/cli/basic.md",
          "updatedTime": 1603411490000,
          "nav": {
            "title": "实验室",
            "order": 10,
            "path": "/lab"
          },
          "group": {
            "title": "Cli",
            "order": 1,
            "path": "/lab/cli"
          },
          "title": "基础",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Cli基础",
              "heading": "cli基础"
            },
            {
              "depth": 2,
              "value": "资料",
              "heading": "资料"
            }
          ]
        },
        "title": "基础",
        "_chunkName": "docs__lab__cli__basic.md"
      },
      {
        "path": "/lab/mfe/basic",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__lab__mfe__basic.md' */'../../docs/lab/mfe/basic.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/lab/mfe/basic.md",
          "updatedTime": 1604018337000,
          "nav": {
            "title": "实验室",
            "order": 10,
            "path": "/lab"
          },
          "group": {
            "title": "微前端",
            "order": 2,
            "path": "/lab/mfe"
          },
          "title": "基础",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "微前端基础",
              "heading": "微前端基础"
            },
            {
              "depth": 2,
              "value": "资料",
              "heading": "资料"
            }
          ]
        },
        "title": "基础",
        "_chunkName": "docs__lab__mfe__basic.md"
      },
      {
        "path": "/lab/monitor/basic",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__lab__monitor__basic.md' */'../../docs/lab/monitor/basic.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/lab/monitor/basic.md",
          "updatedTime": 1603411490000,
          "nav": {
            "title": "实验室",
            "order": 10,
            "path": "/lab"
          },
          "group": {
            "title": "监控系统",
            "order": 3,
            "path": "/lab/monitor"
          },
          "title": "基础",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "监控系统基础",
              "heading": "监控系统基础"
            },
            {
              "depth": 2,
              "value": "资料",
              "heading": "资料"
            }
          ]
        },
        "title": "基础",
        "_chunkName": "docs__lab__monitor__basic.md"
      },
      {
        "path": "/lab/serverless/basic",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__lab__serverless__basic.md' */'../../docs/lab/serverless/basic.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/lab/serverless/basic.md",
          "updatedTime": 1603411490000,
          "nav": {
            "title": "实验室",
            "order": 10,
            "path": "/lab"
          },
          "group": {
            "title": "Serverless",
            "order": 5,
            "path": "/lab/serverless"
          },
          "title": "资料",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "Serverless",
              "heading": "serverless"
            },
            {
              "depth": 2,
              "value": "文章",
              "heading": "文章"
            }
          ]
        },
        "title": "资料",
        "_chunkName": "docs__lab__serverless__basic.md"
      },
      {
        "path": "/lab/serverless/midway",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__lab__serverless__midway.md' */'../../docs/lab/serverless/midway.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/lab/serverless/midway.md",
          "updatedTime": 1603411490000,
          "nav": {
            "title": "实验室",
            "order": 10,
            "path": "/lab"
          },
          "group": {
            "title": "Serverless",
            "order": 5,
            "path": "/lab/serverless"
          },
          "title": "Midway",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "Midway",
              "heading": "midway"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ]
        },
        "title": "Midway",
        "_chunkName": "docs__lab__serverless__midway.md"
      },
      {
        "path": "/lab/serverless/zf-serverless",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__lab__serverless__zf-serverless.md' */'../../docs/lab/serverless/zf-serverless.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/lab/serverless/zf-serverless.md",
          "updatedTime": 1603290356000,
          "nav": {
            "title": "实验室",
            "order": 10,
            "path": "/lab"
          },
          "group": {
            "title": "Serverless",
            "order": 5,
            "path": "/lab/serverless"
          },
          "title": "珠峰Serverless实战",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "珠峰Serverless实战",
              "heading": "珠峰serverless实战"
            }
          ]
        },
        "title": "珠峰Serverless实战",
        "_chunkName": "docs__lab__serverless__zf-serverless.md"
      },
      {
        "path": "/project",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__project__index.md' */'../../docs/project/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/project/index.md",
          "updatedTime": 1607177692000,
          "nav": {
            "title": "开源项目",
            "order": 2,
            "path": "/project"
          },
          "group": {
            "title": "Inbox",
            "order": 1,
            "path": "/project"
          },
          "title": "开源项目",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "前端开源项目汇总",
              "heading": "前端开源项目汇总"
            },
            {
              "depth": 2,
              "value": "图片处理库",
              "heading": "图片处理库"
            },
            {
              "depth": 2,
              "value": "机器学习",
              "heading": "机器学习"
            }
          ]
        },
        "title": "开源项目",
        "_chunkName": "docs__project__index.md"
      },
      {
        "path": "/source/react",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__source__react.md' */'../../docs/source/react.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/source/react.md",
          "updatedTime": 1605283013000,
          "nav": {
            "title": "源码阅读",
            "order": 5,
            "path": "/source"
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
              "value": "Github开源库",
              "heading": "github开源库"
            },
            {
              "depth": 3,
              "value": "组件库",
              "heading": "组件库"
            },
            {
              "depth": 3,
              "value": "全栈项目",
              "heading": "全栈项目"
            }
          ]
        },
        "title": "React",
        "_chunkName": "docs__source__react.md"
      },
      {
        "path": "/wiki/fe-nandian",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__wiki__fe-nandian.md' */'../../docs/wiki/fe-nandian.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/wiki/fe-nandian.md",
          "updatedTime": 1610118752000,
          "nav": {
            "title": "Wiki",
            "order": 99,
            "path": "/wiki"
          },
          "title": "前端难点",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "前端难点",
              "heading": "前端难点"
            }
          ]
        },
        "title": "前端难点",
        "_chunkName": "docs__wiki__fe-nandian.md"
      },
      {
        "path": "/wiki/inbox",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__wiki__inbox.md' */'../../docs/wiki/inbox.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/wiki/inbox.md",
          "updatedTime": 1606952952000,
          "nav": {
            "title": "Wiki",
            "order": 99,
            "path": "/wiki"
          },
          "title": "Inbox",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "Inbox",
              "heading": "inbox"
            },
            {
              "depth": 3,
              "value": "名词",
              "heading": "名词"
            },
            {
              "depth": 3,
              "value": "基础",
              "heading": "基础"
            },
            {
              "depth": 3,
              "value": "思路",
              "heading": "思路"
            },
            {
              "depth": 3,
              "value": "好玩",
              "heading": "好玩"
            },
            {
              "depth": 3,
              "value": "原理",
              "heading": "原理"
            },
            {
              "depth": 3,
              "value": "小Demo",
              "heading": "小demo"
            },
            {
              "depth": 2,
              "value": "前端分享者",
              "heading": "前端分享者"
            },
            {
              "depth": 3,
              "value": "掘金",
              "heading": "掘金"
            },
            {
              "depth": 3,
              "value": "知乎",
              "heading": "知乎"
            },
            {
              "depth": 2,
              "value": "前端 Github",
              "heading": "前端-github"
            },
            {
              "depth": 3,
              "value": "General",
              "heading": "general"
            },
            {
              "depth": 3,
              "value": "Node",
              "heading": "node"
            },
            {
              "depth": 3,
              "value": "动画库",
              "heading": "动画库"
            }
          ]
        },
        "title": "Inbox",
        "_chunkName": "docs__wiki__inbox.md"
      },
      {
        "path": "/wiki",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__wiki__index.md' */'../../docs/wiki/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/wiki/index.md",
          "updatedTime": 1614957649000,
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
              "value": "Awesome front-end develop",
              "heading": "awesome-front-end-develop"
            },
            {
              "depth": 2,
              "value": "Inbox",
              "heading": "inbox"
            },
            {
              "depth": 3,
              "value": "weisuoke.github.io 文章迁移",
              "heading": "weisuokegithubio-文章迁移"
            },
            {
              "depth": 3,
              "value": "文章",
              "heading": "文章"
            },
            {
              "depth": 3,
              "value": "Github",
              "heading": "github"
            }
          ]
        },
        "title": "Wiki",
        "_chunkName": "docs__wiki__index.md"
      },
      {
        "path": "/wiki/server-inbox",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__wiki__server-inbox.md' */'../../docs/wiki/server-inbox.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/wiki/server-inbox.md",
          "updatedTime": 1610118752000,
          "nav": {
            "title": "Wiki",
            "order": 99,
            "path": "/wiki"
          },
          "title": "后端Inbox",
          "order": 5,
          "slugs": [
            {
              "depth": 2,
              "value": "Inbox",
              "heading": "inbox"
            }
          ]
        },
        "title": "后端Inbox",
        "_chunkName": "docs__wiki__server-inbox.md"
      },
      {
        "path": "/wiki/wechat",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__wiki__wechat.md' */'../../docs/wiki/wechat.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/wiki/wechat.md",
          "updatedTime": 1602602012000,
          "nav": {
            "title": "Wiki",
            "order": 99,
            "path": "/wiki"
          },
          "title": "前端群问题汇总",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "前端群问题汇总",
              "heading": "前端群问题汇总"
            }
          ]
        },
        "title": "前端群问题汇总",
        "_chunkName": "docs__wiki__wechat.md"
      },
      {
        "path": "/best",
        "meta": {
          "order": 5
        },
        "exact": true,
        "redirect": "/best/react"
      },
      {
        "path": "/draft/arch",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/draft/arch/sso"
      },
      {
        "path": "/draft",
        "meta": {
          "order": 1
        },
        "exact": true,
        "redirect": "/draft/arch/sso"
      },
      {
        "path": "/draft/basic",
        "meta": {
          "order": 1
        },
        "exact": true,
        "redirect": "/draft/basic/blob"
      },
      {
        "path": "/draft/imooc",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/draft/imooc/性能优化"
      },
      {
        "path": "/draft/miscellaneous",
        "meta": {},
        "exact": true,
        "redirect": "/draft/miscellaneous/滚动事件"
      },
      {
        "path": "/draft/new-tech",
        "meta": {
          "order": 4
        },
        "exact": true,
        "redirect": "/draft/new-tech/vue3"
      },
      {
        "path": "/draft/practise",
        "meta": {
          "order": 4
        },
        "exact": true,
        "redirect": "/draft/practise/react-popover"
      },
      {
        "path": "/draft/zhufeng",
        "meta": {},
        "exact": true,
        "redirect": "/draft/zhufeng/react202012"
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
          "order": 2
        },
        "exact": true,
        "redirect": "/efficiency/future/5g"
      },
      {
        "path": "/efficiency/study",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/efficiency/study/template"
      },
      {
        "path": "/graph/basic/library/react",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/graph/basic/library/react/basic"
      },
      {
        "path": "/lab/cli",
        "meta": {
          "order": 1
        },
        "exact": true,
        "redirect": "/lab/cli/basic"
      },
      {
        "path": "/lab/mfe",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/lab/mfe/basic"
      },
      {
        "path": "/lab/monitor",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/lab/monitor/basic"
      },
      {
        "path": "/lab/serverless",
        "meta": {
          "order": 5
        },
        "exact": true,
        "redirect": "/lab/serverless/basic"
      },
      {
        "path": "/source",
        "meta": {
          "order": 5
        },
        "exact": true,
        "redirect": "/source/react"
      }
    ],
    "title": "Awesome Front-end develop"
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
