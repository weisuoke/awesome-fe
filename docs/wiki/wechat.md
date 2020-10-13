---
nav:
  title: Wiki
  order: 99
title: 前端群问题汇总
order: 3
---

# 前端群问题汇总

1. 前端灰度发布操作

2. requestanimationframe是宏任务还是微任务

3. federation原理

4. 有没有什么办法能让视频文件传到后台的速度加快呢？怎么优化？ streamsave.js - https://zhuanlan.zhihu.com/p/39028766

5. 大佬们，浏览器请求某个node接口，TTFB的时间比别的请求时间都长，这种情况定位应该是服务端的问题吧。怎么去分析服务端是在哪个环境时间消耗比较长吗？有经验的大佬能指教一下吗？

   - 打点看日志？或者你们的服务端内存使用有没有火焰图之类的可视化分析基建
   - 应该不能断定就是服务端的问题吧，你应该先定位待到是不是服务端的问题@上海-高琳 
   - performance.getEntries()中找到这个请求，看着请求过程

6. 大佬们遇到了一个需求，要把将近10个页面按照渲染之后的样式原样导入到一个pdf文件里面，有哪些解决方案？

   - html2Canvas + jsPDF
   - 可以的，每个页面保存一个canvas，promise.all一下再统一处理

7. 哪位大佬知道mini-create-react-context和 react.createContext有啥区别吗

8. nestjs

9. h5页面，怎么判断app有没有打开

   - ```js
     /**
      * 确定打开 app
      */
      confirmOpenApp() {
        if (this.$store.getters.isAndroid) {
          var nowTime = new Date().valueOf();
          setTimeout(function() {
            if (launchTime < 28) {	// 28 是调试估算出来的打开本地 app 基本需要时间
              this.getRequest("/product/app/getAppVersion").then(res => {
                if (res.code === "0000") {
                  window.location.href = `https://apk.yaodouwang.com/b2c/android/youdou`
                }
              })
            }
          }, 25)
          window.location = "b2c.android://test";	// 自己定义的 schema 协议
        }
        
        if (this.$store.getters.isiOS) {
          window.location.href = "https://itunes.apple.com/cn/app/id12343412"
        }
      }
     ```

   - 先判断是安卓还是ios

   - ios简单，直接跳链接，它们的页面会自动判断

   - 安卓就是利用时间差

   - 如果下载了app，那么一般会直接打开

   - 这时html就会进入后台

   - 如果没有进入后台，说明没有安装

   - 就直接下载

10. 单页前端高并发

11. 前端跨界 v8

    - 面试基本 前端跨界 V8底层

12. 草，朗读vue、react源码

13. electron

14. rxjs。用的特舒服



