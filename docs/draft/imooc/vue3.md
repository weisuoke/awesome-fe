---
nav:
  title: 草稿
  order: 1
group:
  title: imooc
  order: 3
title: imooc - Vue3.0高仿知乎专栏
order: 3
---

# Vue3.0 高仿知乎专栏

## 3. 初识 Vue3.0: 新特性详解

Vue3支持2的大多数特性

### 3.1 新特性简介

#### 3.1.1 性能提升

- 打包大小减少 41%
- 初次渲染快55%，更新快133%
- 内存使用减少54%

#### 3.1.2 Composition API

- ref 和 reactive
- computed 和 watch
- 新的生命周期函数
- 自定义函数 - Hooks函数

#### 3.1.3 其他新增特性

- Teleport - 瞬移组件的位置
- Suspense - 异步加载组件的新福音
- 全局 API 的修改和优化
- 更多的实验特性

#### 3.1.4 更好的 TypeScript 支持

### 3.2 为什么会有Vue3

- 随着功能的增长，复杂组件的代码变得难以维护

#### 3.2.1 Mixin 的缺点

- 命名冲突
- 不清楚暴露出来变量的作用
- 重用到其他 component 经常遇到问题

### 3.2.2 Vue2遇到的难题

- Vue2 对于 typescript 的支持非常有限

### 3.3 使用vue-cli配置vue3开发环境

```shell
npm install -g @vue/cli
```

创建一个 vue3 的模板

```shell
vue create vue3-basic
```

### 3.4 文件目录结构分析

