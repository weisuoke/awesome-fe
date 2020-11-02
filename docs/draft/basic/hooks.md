---
nav:
  title: 草稿
  order: 1
group:
  title: 基础知识
  order: 1
title: 实现React Hooks
order: 4
---

# 实现React Hooks

## 实现 useState
```js
let hookStates = [];	// 保存状态的数组
let hookIndex = 0;	// 索引
function useState(initialState) {
 	hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function setState(newState) {
    if (typeof newState === 'function') {
      newState = newState(hookStates[currentIndex])
    }
    hookStates[currentIndex] = newState;
    render();	// 每次调用 setState 就会重新刷新和渲染组件
  }
  
  return [hookStates[hookIndex++], setState];
}

function render() {
  hookIndex = 0;
  ReactDOM.render(
  	<Counter />,
    document.getElementById('root')
  )
}
```

## 实现 useCallback

```js
function useCallback(callback, dependencies) {
  if (hookStates[hookIndex]) { // 说明不是第一次
    let [ lastCallback, lastDependencies ] = hookState[hookIndex];
    // 判断一下新的依赖数组中的每一项是否跟上一次完全相等
    let same = dependencies.every((item, index) => item === lastDependencies[index])
    
    if (same) {
      hookIndex++;
      return lastCallback;
    } else { // 只要有一个依赖变量不一样的话
      hookStates[hookIndex++] = [callback, dependencies];
    	return callback
    }
  } else { // 说明是第一次渲染
    hookStates[hookIndex++] = [callback, dependencies];
    return callback
  }
}
```

## 实现 useMemo

```js
function useMemo(factory, dependencies) {
  if (hookStates[hookIndex]) { // 说明不是第一次
    let [ lastMemo, lastDependencies ] = hookState[hookIndex];
    // 判断一下新的依赖数组中的每一项是否跟上一次完全相等
    let same = dependencies.every((item, index) => item === lastDependencies[index])
    
    if (same) {
      hookIndex++;
      return lastMemo;
    } else { // 只要有一个依赖变量不一样的话
      let newMemo = factory()
      hookStates[hookIndex++] = [newMemo, dependencies];
    	return callback
    }
  } else { // 说明是第一次渲染
    let newMemo = factory()
    hookStates[hookIndex++] = [newMemo, dependencies];
    return callback
  }
}
```

## 实现 useEffect 和 useLayoutEffect

实现useEffect

```js
function useEffect(callback, dependencies) {
  if (hookStates[hookIndex]) { // 说明不是第一次
    let [oldDestroy, lastDependencies] = hookState[hookIndex];
    let same = dependencies.every((item, index) => item === lastDependencies[index])
    if (same) {
      hookIndex++
    } else {
      oldDestory();
      let destory = callback();
      // 添加一个宏任务，在本次渲染之后中执行
      hookStates[hookIndex++] = [destroy, dependencies];
      // setTimeout(callback)
    }
  } else { // 说明是第一次渲染
    let destroy = callback()
    hookStates[hookIndex++] = [destroy, dependencies];
   	// setTimeout(callback)
  }
}
```

实现useLayoutEffect

```js
function useEffect(callback, dependencies) {
  if (hookStates[hookIndex]) { // 说明不是第一次
    let lastDependencies = hookState[hookIndex];
    let same = dependencies.every((item, index) => item === lastDependencies[index])
    if (same) {
      hookIndex++
    } else {
      hookStates[hookIndex++] = dependencies
      // 添加一个微任务，在浏览器渲染之前执行
     	queueMicrotask(callback)
    }
  } else { // 说明是第一次渲染
    hookStates[hookIndex++] = dependencies;
    // 添加一个微任务，在浏览器渲染之前执行
    queueMicrotask(callback)
  }
}
```

## 实现 useContext

```js
function useContext(context) {
  return context._currentValue;
}
```

## 实现 useReducer

```js
function useReducer(reducer, initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  let currentIndex = hookIndex;
  
  function dispatch(action) {
    hookStates[currentIndex] = reducer ? reducer(hookStates[currentIndex], action) : action 	;
    render()
  }
  
  return [hookStates[hookIndex++], dispatch]
}
```

