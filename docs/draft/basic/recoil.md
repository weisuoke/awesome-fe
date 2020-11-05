---
nav:
  title: 草稿
  order: 1
group:
  title: 基础知识
  order: 1
title: Recoil
order: 5
---

# Recoil

## 使用

```js
import React, { useState } from 'react';
import { RecoilRoot, atom, useRecoilState } from './recoil';
import ReactDOM from 'react-dom';

//Recoil采用atom以分散方式定义数据
//其中 key 必须在 RecoilRoot 作用域内唯一，也可以认为是 state 树打平时 key 必须唯一的要求
const todoListState = atom({
  key: 'todoList',
  default: [],
})

function TodoApp() {
  //Recoil 采用 Hooks 方式读取数据
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [input, setInput] = useState('');
  function addTodo() {
    setTodoList([...todoList, input]);
    setInput('');
  }
  
  return (
    <div>
      <button onClick={addTodo}>添加</button>
      <input value={input} onChange={event => setInput(event.target.value)} />
      <ul>
      	{
          todoList.map(item => <li key={item}>{item}</li>)
        }
      </ul>
    </div>
  )
}

ReactDOM.render(
  <RecoilRoot>
  	<TodoApp />
  </RecoilRoot>,
  document.getElementById('root')
)
```

## 简单实现 Recoil

### recoil/index.js

src/recoil/index.js

```js
import  RecoilRoot from './RecoilRoot';
import  atom from './atom';
import  useRecoilState from './useRecoilState';
export {
    RecoilRoot,
    atom,
    useRecoilState
}
```

### RecoilRoot.js

src/recoil/RecoilRoot.js

```js
import React, { useRef } from 'react'
import AppContext from './AppContext'

function RecoilRoot({
  children
}) {
  const state = {}
  const store = {getState: {} => state}
  const storeRef = useRef(store)
  
  return (
    <AppContext value={storeRef}>
    	{children}
    </AppContext>
  )
}

export default RecoilRoot;
```

### atom.js

src\recoil\atom.js

```js
const nodes = new Map();

function atom(options) {
  let value = options.default;
  let node = {
    key: options.key,
    get: () => {
      return value;
    },
    set: (newValue) => {
      value = newValue
    }
  }
  nodes.set(node.key, node)
  return node
}

function getNode(key) {
  return nodes.get(key);
}

export default atom;

export {
	getNode;
}
```

### useRecoilState.js

src\recoil\useRecoilState.js

```js
import { useState } from 'react'
import { getNode } from './atom'

function useRecoilState(recoilState) {
  return [recoilState.get(), useSetRecoilState(recoilState)]
}

function useSetRecoilState(recoilState) {
  let [, forceUpdate] = useState(0);
  return newValue => {
    getNode(recoilState.key).set(newValue);
    forceUpdate(x => x + 1);
  }
}

export default useRecoilState;
```



## 参考阅读

- [细聊Concent & Recoil , 探索react数据流的新开发模式](https://juejin.im/post/5eda2a0ef265da76fa4b6c03?utm_source=gold_browser_extension)
- [Facebook 新一代 React 状态管理库 Recoil](https://mp.weixin.qq.com/s/CK8jcN4tVrOw_lx5MHSr6Q)

- [技术周刊 · 实现 Recoil 只需百行代码？](https://mp.weixin.qq.com/s/_z3QEAMrChNIU-wzHRn81A)