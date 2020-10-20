---
nav:
  title: 草稿
  order: 1
group:
  title: 基础知识
  order: 1
title: Restful最佳实践
order: 2
---

# Restful最佳实践

## 什么是RESTful API？

RESTful API需要满足以下约束才能被称为RESTful API。

1. **客户端-服务器模型**：RESTful API遵循客户端-服务器模型，其中服务器为数据提供服务，而客户端连接到服务器以使用数据。客户端和服务器之间的交互是通过HTTP（S）请求进行的，该请求传输了请求的数据。
2. **无状态**：更重要的是，RESTful API应该是无状态的。每个请求都被视为独立请求。服务器不应跟踪可能影响将来请求结果的任何内部状态。
3. **统一接口**：最后，一致性定义了客户端和服务器之间的交互方式。RESTful API定义了命名资源的最佳实践，但定义了允许你修改资源/与之交互的固定HTTP操作。可以在RESTful API中访问以下HTTP操作：
   - GET请求：检索资源
   - POST请求：创建资源或将信息发送到API
   - PUT请求：创建或替换资源
   - PATCH请求：更新现有资源
   - DELETE请求：删除资源

在对RESTful API的特性有了更深入的了解后，是时候了解更多关于RESTful API的最佳实践了

## 原文

- [全栈开发必备技能：构建RESTful API的13种最佳实践](https://juejin.im/post/6866414204715597831?utm_source=gold_browser_extension)

