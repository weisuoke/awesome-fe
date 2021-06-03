# 前端测试(v0.1.3)

在规定的条件下对程序进行测试，以发现程序错误，衡量软件质量。

软件测试强调测试、开发同步进行，甚至是测试先行，从需求评审阶段就考虑好软件测试方案，随后才进行技术方案评审、开发编码、单元测试、集成测试、系统测试、回归测试、验收测试等。

- 工程师自己负责的是单元测试

- 测试工程师负责的是集成测试、系统测试（E2E）

## 测试种类

- 功能测试：主要验证功能是否符合需求，是否遗漏
- 性能测试： 主要关注系统提供能力，比如后端服务关注的 QPS, TPS，前端关注的 FCP，FMP 等指标
- 健壮性测试： 主要关注系统的边界数据情况，非法数据会不会引起系统崩溃等
- 安全测试： 主要是验证产品是否符合安全需求定义和产品质量标准的测试

## 测试阶段

- 单元测试：本阶段主要是研发人员对当前最小可用功能的检查与验证（参与：研发）
- 集成测试：单元测试通过后，对由几个子功能组成的子系统的测试（参与：研发）
- 回归测试：检查已有功能的正确性检查（参与：研发 & QA）
- 系统测试：在产品发布前做的最后一轮测试，对整个系统进行测试（参与：QA）
- 冒烟测试：基本功能的验证内容。
- e2e测试（黑盒）：更多的是从用户角度来衡量产品质量. 它可以是用户接受度测试，或者说功能测试/黑盒测试.

## 开发模式

- TDD(Test-driven development)：面向测试驱动开发
- BDD(Behavior-driven development)：面向行为驱动开发

### TDD

TDD的思想是：先编写测试用例，再快速开发代码，然后在测试用例的保证下，可以方便安全地进行代码重构，提升应用质量。

**优点：**

- 目标明确、架构分层清晰
- 可以保证开发代码不偏离需求。每个阶段持续测试

**缺点：**

- 技术方案需要先评审结束、架构需要提前搭建好。
- 假如需求变动，则前面步骤需要重新执行，灵活性较差。
- 测试业务代码时，单元测试全部通过了，也不能保证程序流程正确。

**使用场景**：

- 前端工具库的开发
- 前端组件库的开发

### BDD

BDD的思想是，先编写好代码，在编写测试用例。BDD不关注单一的函数或组件，主要关注的是业务的流程是否正确。

**优点：**

- 开发速度快

- 能够保证业务流程的正确性

**缺点：**

- 在前端集成测试中，需要将组件全部渲染出来，测试速度比单元测试要慢。
- 代码覆盖率不容易达到100%

## 单元测试

### 什么是单元测试？

单元测试是用来对一个模块、一个函数或者一个类来进行正确性检验的测试工作。

### 为什么要做单元测试？

- 单元测试可以有效地测试某个程序模块的行为，是未来重构代码的信心保证。

  - 能进行单元测试的函数/组件，一定是低耦合的，这也是一定程度上保证了我们的代码质量

- 方便迭代

  - > 测试自动化的收益=迭代次数×全手动执行成本−首次自动化成本−维护次数×维护成本

- 最大程度保证产品符合预期

- 减少回归流程

- 提升开发者信心和安全感

### 常用单元测试框架

![image-20210512171852577](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2021-05-12-091854.png)

- Mocha

- AVA

- Jest

- Jasmine

  | 框架    | 断言                     | 仿真                 | 快照               | 异步测试 |
  | ------- | ------------------------ | -------------------- | ------------------ | -------- |
  | Mocha   | 默认不支持，可配置(chai) | 默认不支持，可配置   | 默认不支持，可配置 | 友好     |
  | Ava     | 默认支持                 | 不支持，需第三方配置 | 默认支持           | 友好     |
  | Jasmine | 默认支持                 | 默认支持             | 默认支持           | 不友好   |
  | Jest    | 默认支持                 | 默认支持             | 默认支持           | 友好     |

### 为什么选择Jest?

#### 从Mocha + Chai迁移到Jest的理由

- 在测试数工具函数，Mocha + Chai是一个不错的组合，当要测试一个 UI 组件的时候，需要引入其他很多的package来完成。
- Jest的测试速度要快（本人未经过测试，网上文章描述）
- 覆盖率报告能直接在控制台中呈现当使用了`jest --coverage` 命令
  - ![image-20210512175144050](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2021-05-12-095147.png)
- Mocha + Chai组合要进行Timer和Mocks测试，要引入第三方package
  - Timer
    - Mocha+Chai通过第三方库来进行，Jest使用内部的Api（`jest.useFakeTimers()` 和 `jest.runOnlyPendingTimers()`）来快进时间。
  - Spy
    - 在Jest中集成了，通过`jest.fn()`来实现
- Jest中的Snapshot测试使得测试变得更加轻松

#### 从 Jasmine 迁移到 Jest 的理由

- Snapshot
- 内置了test runner，不再需要Karma
- 内置了代码覆盖率检查（通过Istanbul）
- 内置了mocking和断言
- test watching
- 零配置
- ...

#### 总结

选择Jest的理由：

1. 零配置
2. 效率高
3. snapshot测试
4. 社区中有名的开源项目纷纷投入jest的怀抱

### Jest 基本使用

#### 匹配器

- `toBe(value)`：使用 Object.is 来进行比较，如果进行浮点数的比较，要使用 toBeCloseTo
- `not`：取反
- `toEqual(value)`：用于对象的深比较
- `toContain(item)`：用来判断 item 是否在一个数组中，也可以用于字符串的判断
- `toBeNull(value)`：只匹配 null
- `toBeUndefined(value)`：只匹配 undefined
- `toBeDefined(value)`：与 toBeUndefined 相反
- `toBeTruthy(value)`：匹配任何语句为真的值
- `toBeFalsy(value)`：匹配任何语句为假的值
- `toBeGreaterThan(number)`： 大于
- `toBeGreaterThanOrEqual(number)`：大于等于
- `toBeLessThan(number)`：小于
- `toBeLessThanOrEqual(number)`：小于等于
- `toBeInstanceOf(class)`：判断是不是 class 的实例
- `resolves`：用来取出 promise 为 fulfilled 时包裹的值，支持链式调用
- `rejects`：用来取出 promise 为 rejected 时包裹的值，支持链式调用
- `toHaveBeenCalled()`：用来判断 mock function 是否被调用过
- `toHaveBeenCalledTimes(number)`：用来判断 mock function 被调用的次数
- `assertions(number)`：验证在一个测试用例中有 number 个断言被调用

#### 命令行工具的使用

在项目`package.json`文件添加如下`script`:

```diff
"scripts": {
    "start": "node bin/server.js",
    "dev": "node bin/server.js",
    "build": "node bin/build.js",
    "publish": "node bin/publish.js",
++  "test": "jest --watchAll",
},
```

此时运行`npm run test`:

![img](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2021-05-12-142325.png)

我们发现有以下几种模式：

- `f`: 只会测试之前没有通过的测试用例
- `o`: 只会测试关联的并且改变的文件（需要使用 git）（jest --watch 可以直接进入该模式）
- `p`: 测试文件名包含输入的名称的测试用例
- `t`: 测试用例的名称包含输入的名称的测试用例
- `a`: 运行全部测试用例

在测试过程中，你可以切换适合的模式。

#### 钩子函数

类似于 react 或者 vue 的生命周期，一共有四种：

- `beforeAll()`：所有测试用例执行之前执行的方法
- `afterAll()`：所有测试用例跑完以后执行的方法
- `beforeEach()`：在每个测试用例执行之前需要执行的方法
- `afterEach()`：在每个测试用例执行完后执行的方法

#### 异步代码的测试

##### callback

当我们的`test`函数中出现了异步回调函数时，可以给`test`函数传入一个`done`参数，它是一个函数类型的参数。如果`test`函数传入了`done`，`jest`就会等到`done`被调用才会结束当前的`test case`，如果`done`没有被调用，则该`test`自动不通过测试。

```js
import { fetchData } from './fetchData'

// 如果没有done()，这个test将会永远测试通过
test('fetchData 返回结果为 { success: true }', done => {
  
  // 这里后面的expect语句至少要执行一次，否则这里会报错。
  expect.assertions(1)
  
  fetchData(data => {
    expect(data).toEqual({
      success: true
    })
    done()
  })
})
```

##### Promise

> ⚠️ 当对`Promise`进行测试时，一定要在断言之前加一个`return`，不然没有等到`Promise`的返回，测试函数就会结束。可以使用`.promises/.rejects`对返回的值进行获取，或者使用`then/catch`方法进行判断。

如果代码中使用了`Promise`，则可以通过返回`Promise`来处理异步代码，`jest`会等该`promise`的状态转为`resolve`时才会结束，如果`promise`被`reject`了，则该测试用例不通过。

```js
// 假设 user.getUserById（参数id） 返回一个promise
it('测试promise成功的情况', () => {
  expect.assertions(1);
  return user.getUserById(4).then((data) => {
    expect(data).toEqual('Cosen');
  });
});

it('测试promise错误的情况', () => {
  expect.assertions(1);
  return user.getUserById(2).catch((e) => {
    expect(e).toEqual({
      error: 'id为2的用户不存在',
    });
  });
});
```

注意，上面的第二个测试用例可用于测试`promise`返回`reject`的情况。这里用`.catch`来捕获`promise`返回的`reject`，当`promise`返回`reject`时，才会执行`expect`语句。而这里的`expect.assertions(1)`用于确保该测试用例中有一个`expect`被执行了。

对于`Promise`的情况，`jest`还提供了一对匹配符`resolves/rejects`，其实只是上面写法的语法糖。上面的代码用匹配符可以改写为：

```js
// 使用'.resolves'来测试promise成功时返回的值
it('使用'.resolves'来测试promise成功的情况', () => {
  return expect(user.getUserById(4)).resolves.toEqual('Cosen');
});
// 使用'.rejects'来测试promise失败时返回的值
it('使用'.rejects'来测试promise失败的情况', () => {
  expect.assertions(1);
  return expect(user.getUserById(2)).rejects.toEqual({
    error: 'id为2的用户不存在',
  });
});
```

##### async/await

`async/await`其实是`Promise`的语法糖，可以更优雅地写异步代码，`jest`中也支持这种语法。

```js
// 使用async/await来测试resolve
it('async/await来测试resolve', async () => {
  expect.assertions(1);
  const data = await user.getUserById(4);
  return expect(data).toEqual('Cosen');
});
// 使用async/await来测试reject
it('async/await来测试reject', async () => {
  expect.assertions(1);
  try {
    await user.getUserById(2);
  } catch (e) {
    expect(e).toEqual({
      error: 'id为2的用户不存在',
    });
  }
});
```

> ⚠️ 使用`async`不用进行`return`返回，并且要使用`try/catch`来对异常进行捕获。

#### Mock

介绍`jest`中的`mock`之前，我们先来思考一个问题：为什么要使用`mock`函数？

在项目中，一个模块的方法内常常会去调用另外一个模块的方法。在单元测试中，我们可能并不需要关心内部调用的方法的执行过程和结果，只想知道它是否被正确调用即可，甚至会指定该函数的返回值。这个时候，`mock`的意义就很大了。

`jest`中与`mock`相关的`api`主要有三个，分别是`jest.fn()`、`jest.mock()`、`jest.spyOn()`。使用它们创建`mock`函数能够帮助我们更好的测试项目中一些逻辑较复杂的代码。我们在测试中也主要是用到了`mock`函数提供的以下三种特性：

- 捕获函数调用情况
- 设置函数返回值
- 改变函数的内部实现

下面，我将分别介绍这三种方法以及他们在实际测试中的应用。

##### `jest.fn()`

`jest.fn()`是创建`mock`函数最简单的方式，如果没有定义函数内部的实现，`jest.fn()`会返回`undefined`作为返回值。

```js
test('测试jest.fn()调用', () => {
  let mockFn = jest.fn();
  let res = mockFn('厦门','青岛','三亚');

  // 断言mockFn的执行后返回undefined
  expect(res).toBeUndefined();
  // 断言mockFn被调用
  expect(mockFn).toBeCalled();
  // 断言mockFn被调用了一次
  expect(mockFn).toBeCalledTimes(1);
  // 断言mockFn传入的参数为1, 2, 3
  expect(mockFn).toHaveBeenCalledWith('厦门','青岛','三亚');
})
```

`jest.fn()`所创建的`mock`函数还可以设置返回值，定义`内部实现`或`返回Promise对象`。

```js
test('测试jest.fn()返回固定值', () => {
  let mockFn = jest.fn().mockReturnValue('default');
  // 断言mockFn执行后返回值为default
  expect(mockFn()).toBe('default');
})

test('测试jest.fn()内部实现', () => {
  let mockFn = jest.fn((num1, num2) => {
    return num1 + num2;
  })
  // 断言mockFn执行后返回20
  expect(mockFn(10, 10)).toBe(20);
})

test('测试jest.fn()返回Promise', async () => {
  let mockFn = jest.fn().mockResolvedValue('default');
  let res = await mockFn();
  // 断言mockFn通过await关键字执行后返回值为default
  expect(res).toBe('default');
  // 断言mockFn调用后返回的是Promise对象
  expect(Object.prototype.toString.call(mockFn())).toBe("[object Promise]");
})
```

##### `jest.mock()`

一般在真实的项目里，测试异步函数的时候，不会真正的发送 `ajax` 请求去请求这个接口，为什么？

比如有 `1w` 个接口要测试，每个接口要 `3s` 才能返回，测试全部接口需要 `30000s`，那么这个自动化测试的时间就太慢了

我们作为前端只需要去确认这个异步请求发送成功就好了，至于后端接口返回什么内容我们就不测了，这是后端自动化测试要做的事情。

这里以一个`axios请求`的`demo`为例来说明：

```js
import axios from 'axios'

export const getUserList = () => {
  return axios.get('/users').then(res => res.data)
}
```

```js
import { getUserList } from '@/services/user.js'
import axios from 'axios'

jest.mock('axios')

test.only('测试 getUserList', async () => {
  axios.get.mockResolvedValue({ data: ['Cosen','森林','柯森'] })
  await getUserList().then(data => {
    expect(data).toBe(['Cosen','森林','柯森'])
  })
})
```

我们在测试用例的最上面加入了`jest.mock('axios')`，我们让`jest`去对`axios`做模拟，这样就不会去请求真正的数据了。然后调用`axios.get`的时候，不会真实的请求这个接口，而是会以我们写的`{ data: ['Cosen','森林','柯森'] }`去模拟请求成功后的结果。

#### `jest.spyOn()`

`jest.spyOn()`方法同样创建一个`mock`函数，但是该`mock`函数不仅能够捕获函数的调用情况，还可以正常的执行被`spy`的函数。实际上，`jest.spyOn()`是`jest.fn()`的语法糖，它创建了一个和被`spy`的函数具有相同内部代码的`mock函数`。

```js
// example.js
const video = {
  play() {
    return true;
  },
};

module.exports = video;
```

```js
// example.test.js
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();
});
```



### Enzyme vs React Testing Library

#### Enzyme

Airbnb推出的流行流行的测试库。Enzyme 的 API 旨在通过模仿 jQuery 的 API 来实现直观和灵活的 DOM 操作和遍历。

### React Testing Library

React Testing Library – 一个非常通用的名字，它作为一个测试库，旨在解决与其他测试库不同的用例。React Testing Library 迫使你编写不脆弱的测试 – 测试并不是测试具体实现，而是测试组件的功能。它鼓励编写代码的最佳实践，并使代码具备可测试性，和测试正确的条件。

#### 区别

##### 概念

当在Enzyme编写测试时，有方法检查类的状态属性，检查传递给组件的props是什么。但是如果是用props和state来测试组件，那就意味着测试很脆弱。如果有人改变了状态变量的名称，那么测试就会失败。即使组件的功能是一样的。

而@testing-library/react没有测试prop或者state。相反，它测试的是dom，也就是用户正在与之交互的东西。

@testing-library/react 的指导原则之一是

**如果涉及到渲染组件，它处理的是 DOM 节点而不是组件实例，也不应该鼓励处理组件实例。**

所以，你没有得到组件实例的方法，也没有自己调用组件的方法。相反，你就像用户一样在 DOM 上工作。想测试对服务器的异步函数调用吗？从 DOM 中获取按钮，点击它，模拟 API，然后在 DOM 中检查结果。

##### 没有强制更新或者强制重新渲染组件

- Enzyme中，通过ForceUpdate方法来重新渲染组件。如果你spy一些组件中使用了箭头函数的函数，这样你不得不重新forceUpdate组件。
- 在RTL中，他仅仅是测试DOM

##### 没有浅rendering或者深rendering

##### 约束性

- Enzyme 不是一个强约束（opionated）的库，它提供了访问组件内部的方法，即组件的实例方法、状态和道具。它提供了访问组件内部的方法，即组件的方法、状态和属性。但是 Enzyme 也提供了访问组件的 DOM 的方法，所以通过使用 Enzyme，你可以选择测试组件的内部结构，即组件的方法，状态和属性。
- 所以通过使用 Enzyme，你可以选择测试组件的内部，也可以选择不测试。Enzyme 并不强制执行任何关于你应该如何测试组件的意见。
- @testing-library/react 是强约束（opionated）的库。它只提供给你渲染组件和访问 DOM 的方法，不提供访问组件的方法。它不提供访问组件内部的方法。

##### 

## 单测场景

### 组件测试

### 函数测试

### 接口测试

#### Restful

#### GraphQL
- Client-Apollo
- Client-Relay (未完成)

### 状态库
- Redux
- Mobx
- xstate(未完成)

## 常用工具

- chai - TDD/BDD双模断言库
- mocha - 单元测试框架
- jasmine - 单元测试框架
- karma
- enzyme - React的测试类库
- react-testing-library - 另一个React测试类库
- cypress
- selenium

## 测试在前端中的应用

### 单元测试

**场景**

- 工具函数测试
- 组件测试

**常用工具**

- jest
- mocha + chai

### 接口测试

**场景**

- 测试后台返回的接口是否符合预期
  - 方案：设置一个定时器，没隔一段时间去调用接口，看接口返回的结果是否正确
- 在后台没有提供数据之前，mock假数据用于开发

**常用工具**

- jest
- mocha + chai

### 样式测试

**场景**

- 对比设计稿和网站的还原度是否一致

**常用工具**

- backstop.js

### **集成测试**

**场景：**

- 测试业务的流程是否符合预期

**常用工具：**

- jest

### E2E测试

**常用工具：**

- Cypress
- Selenium
- nightWatch
- Rize
- ...
