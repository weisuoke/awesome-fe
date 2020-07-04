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

### 3.4 WebGL

Webgl (Web Graphics Library）是一种 3D 绘图协议，WEBGL 可以为 HTML5 Canvas 提供硬件 3D 加速渲染，这样 Web 开发人员就可以借助系統显卡来在浏览器里更流畅地展示 3D 场景和模型了，还能创建复杂的导航和数据视觉化

#### 3.4.1 WebGL 案例分享

- [3D魔方](http://randelshofer.ch/webgl/rubikscube/)
- [分子表达式](http://web.chemdoodle.com/demos/molgrabber-3d)
- [3D地球](http://webglearth.com/)

- [3D大脑](http://biodigital.com)

### 3.5 zrender

zrenders是二维绘图引擎，它提供 Canvas、SVG、VML 等多种渲染方式。ZRender 也是 ECharts 的渲染器。

### 3.6 D3

D3 (Data- Driven Documents）是一个 Javascript 图形库，基于 Canvas、Svg 和 HTML。

>一个案例：http://github.com/reclay/vue-d3-tree-example

### 3.7 Three.js

Three.js 是一个基于 WebGL 的 Javascript 3D 图形库



## 4. 数据可视化前端技术选型（下）

### 4.1 Highcharts

Highcharts 是一个用纯 Javascript 编写的一个图表库，能够很简单便捷的在 Web 网站或是 web 应用程序添加有交互性的图表，并且免费提供给个人学习、个人网站和非商业用途使用。Highcharts 系列包含 Highcharts JS, Highstock JS, Highmaps JS 共三款软件，均为纯 Javascript 编写的 HTML5 图表库。

#### 4.1.1 Highcharts

Highcharts 是一个用纯 Javascript 编写的一个图表库，能够很简单便捷的在 Web 网站或是 Web 应用程序添加有交互性的图表，Highcharts 支持的图表类型有直线图、曲线图、区域图、柱状图、饼状图、散状点图、似表图、气泡图、瀑布流图等多达 20 种图表，其中很多图表可以集成在同一个图形中形成混合

#### 4.1.2 Highstock

Highstock 是用纯 Javascript 编写的股票图表控件，可以开发股票走势或大数据量的时间轴图表。它包含多个高级导航组件：预设置数据时间范围，日期选择器、滚动条、平移、缩放功能。

#### 4.1.3 Highmaps

Highmaps 是一款基于 HTML5 的优秀地图组件。Highmaps 继承了 Highcharts 简单易用的特性，利用它可以方便快捷的创建用于展现销售、选举结果等其他与地理位置关系密切的交互性地图图表。

### 4.2 AntV

AntV 是蚂蚁金服全新一代数据可视化解決方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践

AntV 包括以下解決方案:

- G2: 可视化引擎
- G2Plot：图表库
- G6: 图可视化引擎
- Graphin：基于 G6 的图分析组件 
- F2: 移动可视化方案
- Chart Cube: AntV 图表在线制作
- L7: 地理空间数据可视化

### 4.3 ECharts 系列

系列（series）是指：一组数值映射成对应的图

![image-20200703234721579](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-03-154723.png)

### 4.4 Echarts4.0 新特性：dataset

Echarts4 开始支持了数据集（dataset）组件用于单独的数据集声明，从而数据可以单独管理，被多个组件复用，并且可以自由指定数据到视觉的映射。这一特性能将逻辑和数据分离，带来更好的复用，并易于理解。

![image-20200703235510448](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-03-155512.png)

### 4.5 ECharts 基本概念：组件

Echarts 中除了绘图之外其他部分，都可抽象为「组件」。例如，Echarts 中至少有这些组件：

xAxis（直角坐标系 X 轴）、yAxis（直角坐标系 Y 轴）、grid（直角坐标系底板）、angleAxis（极坐标系角度轴）

![image-20200704000240024](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/2020-07-03-160241.png)

### 4.6 ECharts 基本概念：定位

大多数组件都提供了定位属性，我们可以采用类似 CSS absolute 的定位属性来控制组件的位置，下面这个案例可以通过修改 grid 组件定位来控制图表的位置