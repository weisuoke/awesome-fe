# 慕课网 - 数据可视化体系课（更新到11章 2020.7.2）

三个典型的商业级数据可视化项目

- 项目1：PC端数据报表
- 项目2：PC端数据大屏
- 项目3：移动报表

数据报表项目技术栈：

- Vue2.6 + Element-UI + ECharts 4.7
- ECharts 常用报表 + 样式定制 + 自定义渲染
- Vue-charts + v-charts
- 地图可视化：散点图

数据大屏项目：

- Vue3.0 + ECharts 4.7 + Svg
- 地图可视化：飞行动画 + 3D动画
- 大屏容器组件

移动报表项目：

- Vue3.0 + ECharts 4.7
- 移动报表 + 地图
- 移动项目构建 + px2rem



**难点：地图可视化** 

http://www.youbaobao.xyz/data-docs/guide/quide/bmap.html

- 地图常见用法：控件、绘图、动画...
- 地图可视化：散点、飞行动画、混合动画、3D建筑...
- 地图 + Vue + ECharts



## 2. 我需要学数据可视化吗?

### 2.1 什么是数据可视化

什么是数据可视化？

> TIP:
>
> 数据可视化，是关于数据视觉表现形式的科学技术研究

这个概念向我们传达了两个信息：

- 数据可视化是一门学科
- 数据可视化与数据和视觉有关

数据可视化简单理解，就是将数据转換成易于人员辨识和理解的视觉表现形式，如各种 2D 图表、3D 图表、地图、矢量图等等，随着技术的不断进步，数据可视化的边界也在不断扩大

### 2.2 数据可视化的发展历史

**起源**

数据可视化起源于 20 世纪 60 年代诞生的计算机图形学

> TIP
>
> 计算机图形学（Computer Graphics，简称 CG）是一种使用数学算法将二维或三维图形转化为计算机显示器的栅格形式的科学

计算机图形学广泛应用于各个领域，深刻影响和改变着我们的生活。

![image-20200702222305393](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-02-142307.png)

> http://zhihu.com/question/41468803

**数据可视化**

在获得计算机图形学发展后，先后经历了科学可视化、信息可视化和数据可视化三个阶段，最初由科研人员提出科学建模和数据的可视化需求，在进入 20 世纪 90 年代后，出现大量单机数据可视化需求。EXCEL 是这个时期的代表，互联网时代各种产品兴起，大数据爆发式增长，促使数据可视化技术飞速发展

### 2.3 数据可视化应用场景

#### 2.3.1 简单应用

**特点**

- 单机离线
- 数据量小、维度少

**典型应用**

- Excel

  ![image-20200702223641372](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-02-143642.png)

- XMind
  - ![image-20200702223733580](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-02-143736.png)
- Visio
  - ![image-20200702223832269](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-02-143835.png)

- OmniGraffle
  - ![image-20200702223908964](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-02-143910.png)

#### 2.3.2 复杂应用

**特征：**

- 互联网应用
- 数据量大，维度多

**典型应用：**

- 数据大屏
  - ![image-20200702224050504](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-02-144052.png)
- 数据报表
  - ![image-20200702224143395](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-02-144145.png)

- 地图
  - ![image-20200702224234792](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-02-144236.png)

### 2.4 数据可视化发展前景

#### 2.4.1 发展趋势

- 逐步成为前端工程师的标准技能
- 具备可大大增长自身的竞争力
- 未来具有广阔的发展前景
  - 数据可视化产品化或服务化，类似阿里云 datav、腾讯云图
  - 往其他绘图领域发展，如浏览器游戏、3D 绘图、绘图工具等等

## 3. 数据可视化前端技术选型（上）

### 3.1 数据可视化解决方案

前端数据可视化解决方案如下:

![image-20200702225139665](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-02-145141.png)

#### 3.1.1 Skia

Skia 是 Chrome 和 Android 的底层 2D 绘图引擎，具体可参考百度百科，Skia 采用 C++编程，由于它位于浏览器的更底层，以我们平常接角触较少

#### 3.1.2 OpenGL

OpenGL (Open Graghics Library）是 2D、3D 图形渲染库，它可以绘制从简单的 2D 图形到复杂的 3D 景象。OpenGL 常用于 CAD、VR、数据可视化和游戏等众多领域。

#### 3.1.3 Chrome

Chrome 使用 Skia 作为绘图引擎，向上层开放了 canvas、svg、WEBGL、HTML 等绘图能力。

### 3.2 Canvas 入门

canvas 是 HTML5 的新特性，它允许我们使用 canvas 元素在网页上通过 Javascript 绘制图像。

![image-20200702225717659](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-02-145719.png)

> 请看Canvas相应的书籍。
>
> - 《HTML5 Canvas核心技术 --图形、动画与游戏开发》

### 3.3 SVG 入门

SVG 是一种基于 XML 的图像文件格式，它的英文全称为 Scalable Vector Graphics，意思为可缩放的矢量图形

> 《**SVG动画 用复杂交互动画改善用户体验**》
>
> 《深入理解 SVG》

