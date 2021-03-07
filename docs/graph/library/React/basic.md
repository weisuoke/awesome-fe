---
nav:
  title: 知识体系
  order: 1
group:
  title: 框架
  order: 2
title: React - 基础
order: 2101
---

# React 基础知识

## 知识点

- JSX
- 生命周期
- 组件
  - 类组件
  - 函数组件
- 虚拟DOM
  - DOM Diff
- 合成事件
  - setState
- Ref
- 高阶组件
  - HOC
  - render Props
- hooks
- Fiber

## 组件通信

react组件通信常见的几种情况：
1. 父组件向子组件通信
2. 子组件向父组件通信
3. 跨级组件通信
4. 非嵌套关系的组件通信

### 父组件向子组件通信

父组件通过 `props` 向子组件传递需要的信息

```javascript
// 子组件：Child
const Child = props => {
  return <p>{props.name}</p>
}

// 父组件: Parent
const Parent = () => {
  return <Child name="weisuoke"></Child>
}
```

### 子组件向父组件通信

`props` + 回调的方式

```javascript
// 子组件：Child
const Child = props => {
  const cb = msg => {
    return () => {
      props.callback(msg)
    } 
  }
  
  return (
    <button onClick={cb('weisuoke')}>weisuoke</button>
  )
}

// 父组件: Parent
class Parent extends Comment {
  callback(msg) {
    console.log(msg)
  }
  render() {
    return <Child callback={this.callback.bind(this)}></Child>
  }
}
```

### 跨级组件通信

即父组件向子组件的子组件通信，向更深层的子组件通信

- props，利用中间组件层层传递，但是如果父组件结构较深，那么中间每一层组件都要去传递 props，增加了复杂度，并且这些 props 并不是中间组件自己需要的
- 使用context, context相当于一个大容器，我们可以把要通信的内容放在这个容器中，这样不管嵌套多深，都可以随意取用，对于跨多层的全局数据可以使用 context

```javascript
// context 方式实现跨级组件通信
// context 设计目的是为了共享那些对于一个组件树而言是"全局"的数据
const BatteryContext = createContext();

// 子组件的子组件
class GrandChild extends Component {
  render() {
    <BatteryContext.Consumer>
    	{
        color => (
        	<h1 style={{"color": color}}>我是红色的: {color}</h1>
        )
      }
    </BatteryContext.Consumer>
  }
}

// 子组件
const Child = () => {
  return (
  	<GrandChild />
  )
}

// 父组件
class Parent extends Component {
  state = {
    color: "red"
  }

	render() {
    const { color } = this.state
    return (
    	<BatteryContext.Provider>
      	<Child></Child>
      </BatteryContext.Provider>
    )
  }
}
```

### 非嵌套关系的组件通信

即没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件

1. 可以使用自定义事件系统（发布订阅模式）
2. 可以通过 redux 等进行全局状态管理
3. 如果是兄弟组件通信，可以找到这两个兄弟节点的共同的父节点，结合父子间通信方式进行通信
