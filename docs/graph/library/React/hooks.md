---
nav:
  title: 知识体系
  order: 1
group:
  title: 框架
  order: 2
title: React - hooks
order: 2103
---

# React hooks

- Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

## 解决的问题

- 在组件之间复用状态逻辑很难,可能要用到render props和高阶组件，React 需要为共享状态逻辑提供更好的原生途径，Hook 使你在无需修改组件结构的情况下复用状态逻辑
- 复杂组件变得难以理解，Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）
- 难以理解的 class,包括难以捉摸的`this`

## useState

- useState 就是一个 Hook
- 通过在函数组件里调用它来给组件添加一些内部 state,React 会在重复渲染时保留这个 state
- useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并
- useState 唯一的参数就是初始 state
- 返回一个 state，以及更新 state 的函数
  - 在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同
  - setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列

```js
const [state, setState] = useState(initialState);
```

### Demo: 计数器

```js
import React, { useState } from 'react'
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
  }
  
  render() {
    return (
      <div>
      	<p>{this.state.number}</p>
        <button onClick={() => this.setState({number: this.state.number + 1})}>+</button>
      </div>
    )
  }
}

function Counter2() {
  const [number, setNumber] = useState(0)
  return (
  	<>
    	<p>{number}</p>
    	<button onClick={()=>setNumber(number+1)}>+</button>
    </>
  )
}
```

### 每次渲染都是一个独立的闭包

- 每一次渲染都有它自己的 Props and State
- 每一次渲染都有它自己的事件处理函数
- alert会“捕获”我点击按钮时候的状态。
- 我们的组件函数每次渲染都会被调用，但是每一次调用中number值都是常量，并且它被赋予了当前渲染中的状态值
- 在单次渲染的范围内，props和state始终保持不变

```js
function Counter2() {
  const [number, setNumber] = useState(0)
  function alertNumber() {
    setTimeout(() => {
      alert(number);
    })
  }
  
  return (
  	<>
    	<p>{number}</p>
    	<button onClick={()=>setNumber(number+1)}>+</button>
    	<button onClick={alertNumber}>alertNumber</button>
    </>
  )
}
```

- 如何在异步中获取最新的值

```js
function Counter() {
  const [number, setNumber] = useState(0);
  const savedCallback = useRef();
  function alertNumber() {
    setTimeout(() => {
      alert(savedCallback.current);
    }, 3000);
  }
  return (
    <>
    <p>{number}</p>
    <button onClick={() => {
      setNumber(number + 1);
      savedCallback.current = number + 1;
    }}>+</button>
    <button onClick={alertNumber}>alertNumber</button>
    </>
  )
}
```

### 函数式更新

- 如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值

```js
function Counter2() {
	const [number,setNumber] = useState(0);
  let numberRef = useRef(number);
  numberRef.current = number;
  function alertNumber(){
    setTimeout(()=>{
      alert(numberRef.current);
    },3000);
  }
  
  function lazy() {
    setTimeout(() => {
      setNumber(number + 1);
    }, 3000)
  }
  
  function lazyFunc() {
    setTimeout(() => {
      setNumber(number => number + 1);
    })
  }
  
  return (
    <>
      <p>{number}</p>
      <button onClick={()=>setNumber(number+1)}>+</button>
      <button onClick={lazy}>lazy+</button>
      <button onClick={lazyFunc}>lazyFunc+</button>
      <button onClick={alertNumber}>alertNumber</button>
    </>
  )
}
```

### 惰性初始 state

- initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略
- 如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
- 与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果

```js
function Counter() {
  const [{name, number}, setValue] = useState(() => {
    return {name: '计数器', number: 0};
  })
  
  return (
  	<>
      <p>{name}:{number}</p>
      <button onClick={()=>setValue({number:number+1})}>+</button>
    </>
  )
}
```

### 性能优化

#### `Object.is`

调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。（React 使用 Object.is 比较算法 来比较 state。）

```js
function Counter4() {
  const [counter,setCounter] = useState({name:'计数器',number:0});
	console.log('render Counter')
  return (
    <>
      <p>{counter.name}:{counter.number}</p>
      <button onClick={()=>setCounter({...counter,number:counter.number+1})}>+</button>
      <button onClick={()=>setCounter(counter)}>-</button>
    </>
	)
}
```

#### 减少渲染次数

- 把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新
- 把创建函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算

```js
function Child({onButtonClick, data}) {
  console.log('Child render');
  return (
  	<button onClick={onButtonClick} >{data.number}</button>
  )
}

Child = memo(Child)

function App() {
  const [number,setNumber] = useState(0);
  const [name,setName] = useState('zhufeng');
  const addClick = useCallback(()=>setNumber(number+1),[number]);
  const  data = useMemo(()=>({number}),[number]);
  return (
    <div>
      <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
      <Child onButtonClick={addClick} data={data}/>
    </div>
  )
}
```

### useState + useCallback + useMemo的实现

```js
import React from 'react'
import ReactDOM from 'react-dom'
let hookStates = [];
let hookIndex = 0;

function useState(initialState) {
  hookState[hookIndex] = hookState[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function setState(newState) {
    hookStates[currentIndex] = newState;
    render();
  }
  
  return [hookStates[hookIndex++], setState]
}

function useMemo(factory, deps) {
  if (hookStates[hookIndex]) {
    let [lastMemo, lastDeps] = hookStates[hookIndex];
    let same = deps.every((item, index) => item === lastDeps[index])
    
    if (same) {
      hookIndex++
      return lastMemo
    } else {
      let newMemo = factory();
      hookState[hookIndex++] = [newMemo, deps];
      return newMemo;
    }
  } else { // 如果取不到，说明第一次调用
    let newMemo = factory();
    hookStates[hookIndex++] = [newMemo, deps];
    return newMemo;
  }
}

function useCallback(callback, deps) {
  if (hookStates[hookIndex]) {
    let [lastCallback, lastDeps] = hookStates[hookIndex];
    let same = deps.every((item, index) => item === lastDeps[index]);
    if (same) {
      hookIndex++
      return lastCallback
    } else {
      hookStates[hookIndex++] = [callback, deps];
      return callback
    }
  } else {
    //如果取不到，说明第一次调用
    hookStates[hookIndex++]=[callback,deps];
    return callback;
  }
}

let  Child = ({data,handleClick})=>{
  console.log('Child render');
  return (
     <button onClick={handleClick}>{data.number}</button>
  )
}

class PureComponent extends React.Component {
  shouldComponentUpdate(newProps,nextState) {
    return !shallowEqual(this.props, newProps)||!shallowEqual(this.state, nextState);
  }
}

function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  
  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return false
  }
  
  let keys1 = Object.keys(obj1)
  let keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) {
    return false
  }
  
  for (let key of keys1) {
    if (!obj2.hasOwpProperty(key) || obj1[key] !== obj2[key]) {
      return false
    }
    
    return true
  }
}

function memo(OldComponent) {
  return class extends PureComponent {
    render() {
      return <OldComponent {...this.props} />
    }
  }
}

Child = memo(Child)

function App(){
  console.log('App render');
  const[name,setName]=useState('weisuoke');
  const[number,setNumber]=useState(0);
  let data = useMemo(()=>({number}),[number]);
  let handleClick = useCallback(()=> setNumber(number+1),[number]);
  return (
    <div>
      <input type="text" value={name} onChange={event=>setName(event.target.value)}/>
      <Child data={data} handleClick={handleClick}/>
    </div>
  )
}

function render() {
  hookIndex = 0;
  ReactDOM.render(
  	<App />,
    document.getElementById('root')
  )
}

render();
```

### 注意事项

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

```js
import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
function App() {
  const [number, setNumber] = useState(0);
  const [visible, setVisible] = useState(false);
  if (number % 2 == 0) {
    useEffect(() => {
      setVisible(true);
    }, [number]);
  } else {
    useEffect(() => {
      setVisible(false);
    }, [number]);
  }
  return (
    <div>
      <p>{number}</p>
      <p>{visible && <div>visible</div>}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
```

