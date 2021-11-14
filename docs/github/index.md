---
nav:
  title: Github
  order: 20
title: Overview
order: 10
---

# Github

## 前端

### 模板

- [template-react-webpack](https://github.com/weisuoke/template-react-webpack)
- [template-vue3-vite](https://github.com/weisuoke/template-vue3-vite)

### 脚手架

- cli





http://nodejs-shijue.cfcfe0938fbf04567b07fc9ed67615f2a.cn-beijing.alicontainer.com/



registry.cn-beijing.aliyuncs.com/px500cs/node:nodecommon0.0.2

registry.cn-beijing.aliyuncs.com/px500cs/node:10.1



现在500px-CN容器化改造，分了两个环境
https://photo-test-community.shijue.me/community/index.html
现在指向了老的环境，

测试容器环境配置host（暂时）

101.201.71.50 photo-test-community.shijue.me

老的环境前端项目部署

- nodejs-500px:
  - 阿里云执行流水线 [nodejs-500px](https://flow.aliyun.com/pipelines/1338952/current?spm=a2cl9.codeup_devops2020_goldlog_projectPipeline.0.0.623a63aaqwWPky) 对应分支 master。正式环境测试共用一个分支

- nodejs-shijue
  - git.lyby.cn 中发布

新的环境前端项目部署

- nodejs-500px:
  - 阿里云执行流水线 [nodejs-500px_TEST](https://flow.aliyun.com/pipelines/1479308/current?spm=a2cl9.codeup_devops2020_goldlog_projectPipeline.0.0.623a63aaqwWPky) 对应分支 test 分支。
  - 暂无正式环境部署
- nodejs-shijue
  - 阿里云执行流水线 [nodejs-shijue_TEST](https://flow.aliyun.com/pipelines/1431083/current?spm=a2cl9.codeup_devops2020_goldlog_projectPipeline.0.0.31117800Wgmr7N) 对应的分支 test 分支
  - 暂无正式环境部署

