---
nav:
  title: POC/Demo
  order: 20
title: 使用oss部署静态网站
order: 40
---

# 使用oss部署静态网站

## 准备

- oss空间： 用于存放打包好的静态网站
  - 阿里云 oss (国内)
    - ossutil - ossutil支持通过 Windows、Linux和MacOS系统以命令行方式管理OSS数据
      - [命令行工具](https://help.aliyun.com/document_detail/50451.html)
- build 后的前端静态网站
  - 假设目录为`dist`
- 域名
  - 备案过后的域名

## 步骤

### 阿里云OSS

#### 1. 新建一个国内的 Bucket，并配置

![image-20211012124819363](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2021-10-12-044822.png)

- Bucket名称： 随意填写
- 地域：睡意选择
- 读写权限： 公共读
- 其他：默认

![image-20211012130809041](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2021-10-12-050810.png)

基础设置中的静态页面

将默认首页设置成打包后的入口页面，这里设置的是index.html

![image-20211012132424883](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2021-10-12-052427.png)

传输管理中点击绑定域名进行域名绑定，绑定的经过备案过后的域名。

#### 2. 使用 ossutil 将打包过后的静态网站上传到oss bucket

如何使用安装 ossutil, 请在ossutil的文档中查看

这里使用ossutil如下命令来上传打包后的文件夹到oss bucket

```shell
ossutil cp -rf dist/ oss://oss-bucket
```

## More

- [ ] 如何给网站加上 CDN
- [ ] 如何防止恶意刷网站，导致流量过大
- [ ] 如何绑定未备案的域名
- [ ] 探索Netlify这个网站
- [ ] CI 