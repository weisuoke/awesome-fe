---
nav:
  title: 草稿
  order: 1
group:
  title: 基础知识
  order: 1
title: 《简明教程：Vue3》
order: 6
---

# 简明教程：Vue3 (v0.0.1)

## API

### setup()

setup() 函数是 vue3 中，专门为组件提供的新属性

setup 函数会在 beforeCreate 、created 之前执行

vue3也是取消了这两个钩子，统一用setup代替, 该函数相当于一个生命周期函数，vue中过去的data，methods，watch等全部都用对应的新增api写在setup()函数中

```js
setup(props, context) {
  context.attrs
  context.slots
  context.emit
  
  return {
    
  }
}
```

props: 用来接收 props 数据

context 用来定义上下文, 上下文对象中包含了一些有用的属性，这些属性在 vue 2.x 中需要通过 this 才能访问到, 在 setup() 函数中无法访问到 this，是个 undefined

返回值: return {}, 返回响应式数据, 模版中需要使用的函数

### reactive()

reactive() 函数接收一个普通对象，返回一个响应式的数据对象, 想要使用创建的响应式数据也很简单，创建出来之后，在setup中return出去，直接在template中调用即可

```vue
<template>
  {{name}} // test
<template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
export default defineComponent({
  setup(props, context) {
  
    let state = reactive({
      name: 'test'
    });
    
    return state
  }
});
</script>
```

### ref()

ref() 函数用来根据给定的值创建一个响应式的数据对象，ref() 函数调用的返回值是一个对象，这个对象上只包含一个 value 属性, 只在setup函数内部访问ref函数需要加.value

```vue
<template>
	<div class="mine">
  	{{count}} // 10
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      const count = ref<number>(10)
      // 在 js 中获取 ref 中定义的值，需要通过 value 属性
      console.log(count.value);
      return {
        count
      }
    }
  })
</script>
```

在 reactive 对象中访问 ref 创建的响应式数据

```vue
<template>
  <div class="mime">
    {{count}} - {{t}} // 10 - 100
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  export default defineComponent({
    setup() {
      const count = ref<number>(10);
      const obj = reactive({
        t: 100,
        count
      })
      // 通过 reactive，来获取 ref 的值时，不需要使用 .value 属性
      console.log(obj.count)
      return {
        ...toRefs(obj)
      }
    }
  })
</script>
```

### isRef() 函数

isRef() 用来判断某个值是否为 ref() 创建出来的对象

```vue
<script lang="ts">
  import { defineComponent,	isRef, ref } from "vue";
  export default defineComponent({
    setup(props, context) {
      const name: string = 'vue'
      const age = ref<number>(18)
      console.log(isRef(age));	// true
      console.log(isRef(name));	// false
    }
  })
</script>
```

### toRefs() 函数

toRefs() 函数可以将 reactive() 创建出来的响应式对象，转换为普通的对象，只不过，这个对象上的每个属性节点，都是 ref() 类型的响应式数据

```vue
<template>
	<div class="mine">
    {{name}} // test
    {{age}} // 18
  </div>
</template>

<script lang="ts">
	import { defineComponent, reactive, ref, toRefs } from 'vue';
  export default defineComponent({
    setup(props, context) {
      let state = reactive({
        name: 'test'
      });
      
      const age = ref(18)
      
      return {
        ...toRefs(state),
        age
      }
    }
  })
</script>
```

### computed()

该函数用来创造计算属性，和过去一样，它返回的值是一个ref对象。 里面可以传方法，或者一个对象，对象中包含set()、get()方法

#### 创建只读的计算属性

```vue
<script lang="ts">
	import { computed, defineComponent, ref} from 'vue';
  export default defineComponent({
    setup(props, context) {
      const age = ref(18)
      
      // 根据 age 的值，创建一个响应式的计算属性 readOnlyAge, 它会根据依赖的 ref 自动计算并返回一个新的 ref
      const readOnlyAge = computed(() => age.value++) 	// 19
      
      return {
        age,
        readOnlyAge
      }
    }
  })
</script>
```

#### 通过set()、get()方法创建一个可读可写的计算属性

```vue
<script lang="ts">
	import { computed, defineComponent, ref } from 'vue';
  export default defineComponent({
    setup(props, context) {
      const age = ref<number>(18)
      
      const computedAge = computed({
        get: () => age.value + 1,
        set: value => age.value + value,
      })
      
      // 为计算属性赋值的操作，会触发 set 函数, 触发 set 函数后，age 的值会被更新
      age.value = 100
      
      return {
        age,
        computedAge
      }
    }
  })
</script>
```

### watch()

watch 函数用来侦听特定的数据源，并在回调函数中执行副作用。默认情况是懒执行的，也就是说仅在侦听的源数据变更时才执行回调。

#### 监听用reactive声明的数据源

```vue
<script lang="ts">
  import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
  interface Person {
    name: string,
    age: number
  }
  export default defineComponent({
    setup(props, context) {
      const state = reactive<Person>({ number: 'vue', age: 10 })
    }
  })
</script>
```



### 疑惑

- reactive 与 ref 的区别

### 参考资料

- [Vue 3 的组合 API 如何请求数据？](https://juejin.im/post/6885364720056926221?utm_source=gold_browser_extension)
- [构建简单的 Vue 3 响应式系统](https://juejin.im/post/6886429830535970829?utm_source=gold_browser_extension)
- [让你30分钟快速掌握vue 3](https://juejin.im/post/6887359442354962445?utm_source=gold_browser_extension)
- [Vue3、Vuex、TS 项目实践](https://juejin.im/post/6887867687897301006?utm_source=gold_browser_extension)
- [Vue 3 高阶指南之 Set](https://mp.weixin.qq.com/s/OL8DNQwIR78ZnE_oc2bc6w)
- [初试vue3+vite+ant-design-vue2.0开发后台项目总结](https://juejin.im/post/6888924565183922184?utm_source=gold_browser_extension)
- [使用Vue3封装一些有用的组合API](https://juejin.im/post/6888925879243079687?utm_source=gold_browser_extension)
- [Vue 3 高阶指南之 WeakSet](https://mp.weixin.qq.com/s/fED2inUejcK6JsC9j7BCwA)
- [Vue 3 高阶指南之 Reflect](https://mp.weixin.qq.com/s/teSd6hsRfboS8xaTe24NWg)
- [🚩Vue源码——订阅者的响应](https://juejin.im/post/6889766555916828680?utm_source=gold_browser_extension)
- [Vue3.0--Vue Composition API使用体验](https://mp.weixin.qq.com/s/LiMPkMvoDIlyfjhVu8vkHQ)
- [做了一夜动画，就为让大家更好的理解Vue3的Composition Api](https://juejin.im/post/6890545920883032071?utm_source=gold_browser_extension)
- [Vue 3 深入响应性原理](https://mp.weixin.qq.com/s/vOGdl9daJ61CgR4jtyVLsQ)
- [那个的Vue3动画很好，就是太短了](https://mp.weixin.qq.com/s/GPjqgt9CdD-tBHY52_M33w)
- [96行乞丐版reactivity教你debug vue-next](https://juejin.im/post/6891657936515366920?utm_source=gold_browser_extension)
- [Vue源码之minxin](https://juejin.im/post/6891637775763210253?utm_source=gold_browser_extension)
- [Vue最全知识点（基础到进阶，覆盖vue3.0，文末送书）](https://mp.weixin.qq.com/s/y9olkntgR-9DFJVrmZsrsw)
- [深度解读 Vue3 源码｜reactive API 定义和源码实现](https://mp.weixin.qq.com/s/8-4lLyq9E-Zl6_MlMiM9lQ)
- [【前端进阶】使用 Vue3 的 complier-core 玩转模版编译](https://mp.weixin.qq.com/s/h51cy1YQwMjn6GKf0xnKLw)
- [Vue3 Composition-API](https://mp.weixin.qq.com/s/mCZK_KYZFmhZtlscHyMLiw)
- [🎉🎉一个基于 Vue 3 + Vant 3 的开源商城项目🎉🎉](https://juejin.im/post/6892783570016796679?utm_source=gold_browser_extension)
- [使用 Vue3 和 TypeScript 重构740+ Star WebSocket 插件](https://mp.weixin.qq.com/s/w_RPZ05XPlZsmG_I6SOhoA)
- [解锁 Vue3 超好玩的新特性：在CSS中使用JS变量](https://mp.weixin.qq.com/s/wSj6PLGZDOxtUwqm7fPMzQ)
- [【第2116期】Vue 3.0 Ref-sugar 提案真的是自寻死路吗？](https://mp.weixin.qq.com/s/JoZRvjvyH1s-CyZU3olYww)
- [从零手写简易Vue3（二）—— setup()](https://juejin.im/post/6894182826913202189?utm_source=gold_browser_extension)
- [Vue3+TS，写一个逼格满满的项目](https://mp.weixin.qq.com/s/4UtktwXNXkYo7LH5F0oJAg)
- [深入 TypeScript 中的子类型、逆变、协变，进阶 Vue3 源码前必须搞懂的。](https://mp.weixin.qq.com/s/wmk7toYQt40ZC8IGVA5k7g)
- [Vue 中 MathJax 的使用与渲染的监听 (下)](https://juejin.im/post/6889356770012528648?utm_source=gold_browser_extension)