(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[158],{WNfQ:function(e,n,t){"use strict";t.r(n);var a=t("q1tI"),l=t.n(a),r=t("dEAq"),o=t("H1Ra"),c=l.a.memo((e=>{e.demos;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"markdown"},l.a.createElement("h1",{id:"type-challenge"},l.a.createElement(r["AnchorLink"],{to:"#type-challenge","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Type Challenge"),l.a.createElement("h2",{id:"easy"},l.a.createElement(r["AnchorLink"],{to:"#easy","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Easy"),l.a.createElement("h3",{id:"pick"},l.a.createElement(r["AnchorLink"],{to:"#pick","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Pick"),l.a.createElement("p",null,"Implement the built-in ",l.a.createElement("code",null,"Pick<T, K>")," generic without using it."),l.a.createElement("p",null,"Constructs a type by picking the set of properties ",l.a.createElement("code",null,"K")," from ",l.a.createElement("code",null,"T")),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"interface Todo {\n  title: string\n  description: string\n  completed: boolean\n}\n\ntype TodoPreview = MyPick<Todo, 'title' | 'completed'>\n\nconst todo: TodoPreview = {\n  title: 'Clean room',\n  completed: false\n}",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type MyPick<T, U extends keyof T> = {\n  [K in U]: T[K]\n}",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"\u4e0d\u77e5\u9053\u7684\u77e5\u8bc6\u70b9")),l.a.createElement("p",null,l.a.createElement("strong",null,"extends")),l.a.createElement("p",null,"TypeScript 2.8 \u5f15\u5165\u4e86\u6761\u4ef6\u5173\u952e\u5b57\uff1a",l.a.createElement("code",null,"extends")),l.a.createElement(o["a"],{code:"T extends U ? X : Y",lang:"ts"}),l.a.createElement("blockquote",null,l.a.createElement("p",null,"\u5982\u679c",l.a.createElement("code",null,"T"),"\u5305\u542b\u7684\u7c7b\u578b\u662f",l.a.createElement("code",null,"U"),"\u5305\u542b\u7c7b\u578b\u7684\u5b50\u96c6\uff0c\u90a3\u4e48\u53d6\u7ed3\u679c ",l.a.createElement("code",null,"X"),"\uff0c\u5426\u5219\u53d6\u7ed3\u679c",l.a.createElement("code",null,"Y"))),l.a.createElement("p",null,l.a.createElement("strong",null,"keyof")),l.a.createElement("p",null,"TypeScript\u5141\u8bb8\u6211\u4eec\u904d\u5386\u67d0\u79cd\u7c7b\u578b\u5c5e\u6027\uff0c\u5e76\u901a\u8fc7",l.a.createElement("code",null,"keyof"),"\u64cd\u4f5c\u7b26\u63d0\u53d6\u5176\u5c5e\u6027\u7684\u540d\u79f0\u3002",l.a.createElement("code",null,"keyof"),"\u64cd\u4f5c\u7b26\u53ef\u4ee5\u7528\u4e8e\u83b7\u53d6\u67d0\u79cd\u7c7b\u578b\u7684\u6240\u6709\u952e\uff0c\u5176\u8fd4\u56de\u7c7b\u578b\u662f\u8054\u5408\u7c7b\u578b"),l.a.createElement(o["a"],{code:'interface Person {\n  name: string;\n  age: number;\n  location: string;\n}\n\ntype K1 = keyof Person; // "name" | "age" | "location"\ntype K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...\ntype K3 = keyof { [x: string]: Person };  // string | number',lang:"ts"}),l.a.createElement("h3",{id:"readonly"},l.a.createElement(r["AnchorLink"],{to:"#readonly","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Readonly"),l.a.createElement("p",null,"Implement the built-in ",l.a.createElement("code",null,"Readonly<T>")," generic without using it."),l.a.createElement("p",null,"Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned."),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:'interface Todo {\n  title: string\n  description: string\n}\n\nconst todo: MyReadonly<Todo> = {\n  title: "Hey",\n  description: "foobar"\n}\n\ntodo.title = "Hello" // Error: cannot reassign a readonly property\ntodo.description = "barFoo" // Error: cannot reassign a readonly property',lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type MyReadonly<T> = {\n  readonly [key in keyof T]: T[key]\n}",lang:"ts"}),l.a.createElement("h3",{id:"tuple-to-object"},l.a.createElement(r["AnchorLink"],{to:"#tuple-to-object","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Tuple to Object"),l.a.createElement("p",null,"Give an array, transform into an object type and the key/value must in the given array"),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const\n\ntype result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type TupleToObject<T extends readonly Array<string | number | symbol>> = {\n  [P in T[number]]: P;\n}",lang:"ts"}),l.a.createElement("h3",{id:"first-of-array"},l.a.createElement(r["AnchorLink"],{to:"#first-of-array","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"First of Array"),l.a.createElement("p",null,"Implement a generic ",l.a.createElement("code",null,"First<T>")," that takes An Array ",l.a.createElement("code",null,"T")," and return it's first element's type"),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type arr1 = ['a', 'b', 'c'];\ntype arr2 = [3, 2, 1];\n\ntype head1 = First<arr1>",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type First<T extends readonly unknown[]> = \n\tT extends [infer ElementType, ...infer Tail]\n\t\t? Element\n\t\t: never",lang:"ts"}),l.a.createElement("h4",{id:"\u77e5\u8bc6\u70b9---infer"},l.a.createElement(r["AnchorLink"],{to:"#\u77e5\u8bc6\u70b9---infer","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"\u77e5\u8bc6\u70b9 - infer"),l.a.createElement("p",null,l.a.createElement("code",null,"infer"),"\u53ef\u4ee5\u5728",l.a.createElement("code",null,"extends"),"\u7684\u6761\u4ef6\u8bed\u53e5\u4e2d\u63a8\u65ad\u5f85\u63a8\u65ad\u7684\u7c7b\u578b\u3002"),l.a.createElement("h5",{id:"\u4f5c\u7528"},l.a.createElement(r["AnchorLink"],{to:"#\u4f5c\u7528","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"\u4f5c\u7528"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("p",null,"infer \u89e3\u5305"),l.a.createElement(o["a"],{code:"// \u83b7\u53d6\u6570\u7ec4\u5143\u7d20\u7684\u7c7b\u578b\uff0c\u5728\u4e0d\u4f1a infer \u4e4b\u524d\u662f\u8fd9\u6837\u505a\u7684\ntype Ids = number[];\ntype Names = string[];\n\ntype Unpacked<T> = T extends Names ? String : T extends Ids ? number : T;\n\ntype idType = Unpacked<Ids>;\t// idType \u7c7b\u578b\u4e3a number\ntype nameType = Unpacked<Names>;\t// nameType \u7c7b\u578b\u4e3a string",lang:"ts"}),l.a.createElement(o["a"],{code:"type Unpacked<T> = T extends (infer R)[] ? R : T;\n\ntype idType = Unpacked<Ids>;\t// idType \u7c7b\u578b\u4e3a number;\ntype nameType = Unpacked<Names>;\t// nameType \u7c7b\u578b\u4e3a string;",lang:"ts"})),l.a.createElement("li",null,l.a.createElement("p",null,"\u63a8\u65ad\u8054\u5408\u7c7b\u578b"),l.a.createElement(o["a"],{code:"type Foo<T> = T extends {a: infer U; b: infer U} ? U : never;\n\ntype T10 = Foo<{ a: string; b: string }>;\t// T10 \u7c7b\u578b\u4e3a string.\ntype T11 = Foo<{ a: string; b: number }>;\t// T11 \u7c7b\u578b\u4e3a string | number.",lang:"ts"}))),l.a.createElement("h3",{id:"length-of-tuple"},l.a.createElement(r["AnchorLink"],{to:"#length-of-tuple","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Length Of Tuple"),l.a.createElement("p",null,"For given a tuple, you need to create a generic ",l.a.createElement("code",null,"Length"),", pick the length of the tuple"),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type tesla = ['tesla', 'model 3', 'model X', 'model Y']\ntype spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']\n\ntype teslaLength = Length<tesla>\t// expected 4\ntype spaceXLength = Length<spaceX>\t// expected 5",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"// answer1\ntype Length<T extends readonly any[]> = T[\"length\"]\n\n// answer2\ntype Length<T> = T extends any[] ? T['length'] : never;\n\n// answer3\ntype Length = T extends {length: infer Length} ? Length : never;",lang:"ts"}),l.a.createElement("h3",{id:"exclude"},l.a.createElement(r["AnchorLink"],{to:"#exclude","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Exclude"),l.a.createElement("p",null,"Implement the built-in ",l.a.createElement("code",null,"Exclude<T, U>")),l.a.createElement("blockquote",null,l.a.createElement("p",null,"Exclude from T those types that are assignable to U")),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type MyExclude<T, U> = T extends U ? never : T;",lang:"ts"}),l.a.createElement("h3",{id:"awaited"},l.a.createElement(r["AnchorLink"],{to:"#awaited","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Awaited"),l.a.createElement("p",null,"If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type? For example if we have ",l.a.createElement("code",null,"Promise<ExampleType>")," how to get ",l.a.createElement("code",null,"ExampleType"),"\uff1f"),l.a.createElement("blockquote",null,l.a.createElement("p",null,"This question is ported from the ",l.a.createElement(r["Link"],{to:"https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4"},"original article")," by ",l.a.createElement(r["Link"],{to:"https://github.com/maciejsikora"},"@maciejsikora"))),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"// answer1\ntype MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T;\n\n// answer2\ntype MyAwaited<T extends Promise<any>> = T extends Promise<infer R> ? (R extends Promise<any> ? MyAwaited<R> : R) : never;",lang:"ts"}),l.a.createElement("h3",{id:"if"},l.a.createElement(r["AnchorLink"],{to:"#if","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"If"),l.a.createElement("p",null,"Implement utils ",l.a.createElement("code",null,"If")," which accepts condition ",l.a.createElement("code",null,"C"),", a truthy return type ",l.a.createElement("code",null,"T"),", and a falsy return type ",l.a.createElement("code",null,"F"),". ",l.a.createElement("code",null,"C")," is expected to be either ",l.a.createElement("code",null,"true")," or ",l.a.createElement("code",null,"false")," while ",l.a.createElement("code",null,"T")," and ",l.a.createElement("code",null,"F")," can be any type."),l.a.createElement("p",null,"For example:"),l.a.createElement(o["a"],{code:"type A = If<true, 'a', 'b'>  // expected to be 'a'\ntype B = If<false, 'a', 'b'> // expected to be 'b'",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type If<C extends boolean, T, F> = C extends true ? T : F;",lang:"ts"}),l.a.createElement("h3",{id:"concat"},l.a.createElement(r["AnchorLink"],{to:"#concat","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Concat"),l.a.createElement("p",null,"Implement the JavaScript ",l.a.createElement("code",null,"Array.concat")," function in the type system. A type takes the two arguments. The output should be a new array that includes inputs in ltr order"),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type Result = Concat<[1], [2]>\t// expected to be [1, 2]",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U]",lang:"ts"}),l.a.createElement("h3",{id:"includes"},l.a.createElement(r["AnchorLink"],{to:"#includes","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Includes"),l.a.createElement("p",null,"Implement the JavaScript ",l.a.createElement("code",null,"Array.includes")," function in the type system. A type takes the two arguments. The output should be a boolean ",l.a.createElement("code",null,"true")," or ",l.a.createElement("code",null,"false"),"."),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type Includes<T extends readonly any[], U> = T extends [infer X, ...infer Y] ? Equal<X, U> extends true ? true :  Includes<Y, U> : false;",lang:"ts"}),l.a.createElement("h3",{id:"push"},l.a.createElement(r["AnchorLink"],{to:"#push","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Push"),l.a.createElement("p",null,"Implement the generic version of ",l.a.createElement("code",null,"Array.push")),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type Result = Push<[1, 2], '3'> // [1, 2, '3']",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type Push<T extends unknown[], U> = [...T, U];",lang:"ts"}),l.a.createElement("h3",{id:"unshift"},l.a.createElement(r["AnchorLink"],{to:"#unshift","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Unshift"),l.a.createElement("p",null,"Implement the type version of ",l.a.createElement("code",null,"Array.unshift")),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type Result = Unshift<[1, 2], 0> // [0, 1, 2,]",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type Unshift<T extends unknown[], U> = [U, ...T]",lang:"ts"}),l.a.createElement("h3",{id:"parameters"},l.a.createElement(r["AnchorLink"],{to:"#parameters","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Parameters"),l.a.createElement("p",null,"Implement the built-in Parameters generic without using it."),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer X) => any ? X : never;\n\ntype MyParameters<T> = T extends (...args: infer P ) => any ? P : T",lang:"ts"}),l.a.createElement("h2",{id:"medium"},l.a.createElement(r["AnchorLink"],{to:"#medium","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Medium"),l.a.createElement("h3",{id:"get-return-type"},l.a.createElement(r["AnchorLink"],{to:"#get-return-type","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Get Return Type"),l.a.createElement("p",null,"Implement the built-in ",l.a.createElement("code",null,"ReturnType<T>")," generic without using it."),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:'const fn = (v: boolean) => {\n  if (v) {\n    return 1\n  } else {\n    return 2\n  }\n}\n\ntype a = MyReturnType<typeof fn>\t// should "1" | "2"',lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"// answer1\ntype MyReturnType<T> = T extends (...args: any) => infer R ? R : never;\n\n// answer2\ntype MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;",lang:"ts"}),l.a.createElement("h3",{id:"omit"},l.a.createElement(r["AnchorLink"],{to:"#omit","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Omit"),l.a.createElement("p",null,"Implement the built-in ",l.a.createElement("code",null,"Omit<T, K>")," generic without using it."),l.a.createElement("p",null,"Constructs a type by picking all properties from ",l.a.createElement("code",null,"T")," and then removing ",l.a.createElement("code",null,"K")),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"interface Todo {\n  title: string\n  description: string\n  completed: boolean\n}\n\ntype TodoPreview = MyOmit<Todo, 'description' | 'title'>\n\nconst todo: TodoPreview = {\n  completed: false\n}",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type MyOmit<T, K extends keyof T> = {[P in keyof T as P extends K ? never : P ] : T[P]}",lang:"ts"}),l.a.createElement("h3",{id:"readonly-2"},l.a.createElement(r["AnchorLink"],{to:"#readonly-2","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Readonly 2"),l.a.createElement("p",null,"Implement a generic ",l.a.createElement("code",null,"MyReadonly2<T, K>")," which takes two type argument ",l.a.createElement("code",null,"T")," and ",l.a.createElement("code",null,"K")),l.a.createElement("p",null,l.a.createElement("code",null,"K")," specify the set of properties of ",l.a.createElement("code",null,"T")," that should set to Readonly. When ",l.a.createElement("code",null,"K")," is not provided, it should make all properties readonly just like the normal ",l.a.createElement("code",null,"Readonly<T>"),"."),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:'interface Todo {\n  title: string\n  description: string\n  completed: boolean\n}\n\nconst todo: MyReadonly2<Todo, \'title\' | \'description\'> = {\n  title: "Hey",\n  description: "foobar",\n  completed: false,\n}\n\ntodo.title = "Hello" // Error: cannot reassign a readonly property\ntodo.description = "barFoo" // Error: cannot reassign a readonly property\ntodo.completed = true // OK',lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type MyReadonly2<T, K extends keyof T = keyof T> = \n\t{ readonly [key in K]: T[key] }\n\t& { [key in keyof T as (key extends k ? never : key)] : T[key] }",lang:"ts"}),l.a.createElement("p",null,"// Todo need to understand"),l.a.createElement("h3",{id:"deep-readonly"},l.a.createElement(r["AnchorLink"],{to:"#deep-readonly","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Deep Readonly"),l.a.createElement("p",null,"Implement a generic ",l.a.createElement("code",null,"DeepReadonly<T>")," which makes every parameter of an object - and its sub-objects recursively - readonly."),l.a.createElement("p",null,"You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes, and so on do not need to take into consideration. However, you can still challenge yourself by covering different cases as many as possible."),l.a.createElement("p",null,"For example."),l.a.createElement(o["a"],{code:"type X = {\n  x: {\n    a: 1,\n    b: 'hi'\n  },\n  y: 'hey'\n}\n\ntype Expected = {\n  readonly x: {\n    readonly a: 1\n    readonly b: 'hi'\n  }\n  readonly y: 'hey'\n}\n\ntype Todo = DeepReadonly<X>\t// should be same as `Expected`",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"// answer1\ntype DeepReadonly<T extends Record<any, any>> = {\n  readonly [key in keyof T]: T[key] extends string | number | symbol | Function | boolean\n  ? T[key]\n  : DeepReadonly<T[key]>\n}\n\n// answer2\ntype DeepReadonly<T> = {\n  readonly [key in keyof T] : T[key] extends Function ? T[key] : T[key] extends object ? DeepReadonly<T[key]> : T[key];\n}",lang:"ts"}),l.a.createElement("h3",{id:"tuple-to-union"},l.a.createElement(r["AnchorLink"],{to:"#tuple-to-union","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Tuple to Union"),l.a.createElement("p",null,"Implement a generic ",l.a.createElement("code",null,"TupleToUnion<T>")," which covers the values of a tuple to its values union"),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type Arr = ['1', '2', '3']\n\ntype Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"// answer1\ntype TupleToUnion<T extends readonly unknown[]> = T extends [\n  infer First,\n  ...infer Rest\n]\n\t? First | TupleToUnion<Rest>\n\t: never\n\n// answer2\ntype TupleToUnion<T extends unknown[]> = T[number]",lang:"ts"}),l.a.createElement("h3",{id:"chainable-options"},l.a.createElement(r["AnchorLink"],{to:"#chainable-options","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Chainable Options"),l.a.createElement("p",null,"Chainable options are commonly used in JavaScript. But when we switch to TypeScript, can you property type it?"),l.a.createElement("p",null,"In this challenge, you need to type an object or a class - whatever you like - to provide two function ",l.a.createElement("code",null,"option(key, value)")," and ",l.a.createElement("code",null,"get()"),". In ",l.a.createElement("code",null,"option"),", you can extend the current config type by the given key and value. We should about to access the final result via ",l.a.createElement("code",null,"get"),"."),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"declare const config: Chainable\n\nconst result = config\n  .option('foo', 123)\n  .option('name', 'type-challenges')\n  .option('bar', { value: 'Hello World' })\n  .get()\n\n// expect the type of result to be:\ninterface Result {\n  foo: number\n  name: string\n  bar: {\n    value: string\n  }\n}",lang:"ts"}),l.a.createElement("p",null,"You don't need to write any js/ts logic to handle the problem - just in type level."),l.a.createElement("p",null,"You can assume that ",l.a.createElement("code",null,"key")," only accepts ",l.a.createElement("code",null,"string")," and the ",l.a.createElement("code",null,"value")," can be anything - just leave it as-is. Same ",l.a.createElement("code",null,"key")," won't be passed twice."),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type chainable<T extends Record<string, unknown> = {}> = {\n  option<K extends string, V = unknown>(key: K, value: V): Chainable<T & Record<K, V>>\n  get(): T\n}",lang:"ts"}),l.a.createElement("h3",{id:"last-of-array"},l.a.createElement(r["AnchorLink"],{to:"#last-of-array","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Last of Array"),l.a.createElement("blockquote",null,l.a.createElement("p",null,"TypeScript 4.0 is recommended in this challenge")),l.a.createElement("p",null,"Implement a generic ",l.a.createElement("code",null,"Last<T>")," that takes an Array ",l.a.createElement("code",null,"T")," and returns its last element."),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type arr1 = ['a', 'b', 'c']\ntype arr2 = [3, 2, 1]\n\ntype tail1 = Last<arr1> // expected to be 'c'\ntype tail2 = Last<arr2> // expected to be 1",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"// answer1\ntype Last<T extends any[]> = T extends [infer L, ...infer R] ? (R[0] extends undefined ? L : Last<R>) : never;\n\n// answer2\ntype LastOfArray<T extends readonly any[]> = T extends [...any[], infer R] ? R : never;",lang:"ts"}),l.a.createElement("h3",{id:"pop"},l.a.createElement(r["AnchorLink"],{to:"#pop","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Pop"),l.a.createElement("blockquote",null,l.a.createElement("p",null,"TypeScript 4.0 is recommended in this challenge")),l.a.createElement("p",null,"Implement a generic ",l.a.createElement("code",null,"Pop<T>")," that takes an Array ",l.a.createElement("code",null,"T")," and returns an Array without it's last element."),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type arr1 = ['a', 'b', 'c', 'd']\ntype arr2 = [3, 2, 1]\n\ntype re1 = Pop<arr1> // expected to be ['a', 'b', 'c']\ntype re2 = Pop<arr2> // expected to be [3, 2]",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"Extra"),": Similarly, can you implement ",l.a.createElement("code",null,"Shift"),", ",l.a.createElement("code",null,"Push,")," and ",l.a.createElement("code",null,"Unshift")," as well?"),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type Pop<T extends any[]> = T extends [...infer R, any] ? R : never;",lang:"ts"}),l.a.createElement("h3",{id:"promiseall"},l.a.createElement(r["AnchorLink"],{to:"#promiseall","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Promise.all"),l.a.createElement("p",null,"Type the function ",l.a.createElement("code",null,"PromiseAll")," that accepts an array of PromiseLike objects, the returning value should be ",l.a.createElement("code",null,"Promise<T>")," where ",l.a.createElement("code",null,"T")," is the resolved result array."),l.a.createElement(o["a"],{code:"const promise1 = Promise.resolve(3);\nconst promise2 = 42;\nconst promise3 = new Promise<string>((resolve, reject) => {\n  setTimeout(resolve, 100, 'foo');\n});\n\n// expected to be `Promise<[number, 42, string]>`\nconst p = Promise.all([promise1, promise2, promise3] as const)",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"// answer1\ndeclare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{\n  [K in keyof T]: Awaited<T[K]>\n}>\n\n// answer2\ntype PromiseType<T> = T extends Promise<infer PT> ? PT: T\ntype PromisesType<T extends readonly any[]> = Promise<T extends readonly [infer First, ...infer Rest]\n    ? [PromiseType<First>, ...PromisesType<Rest>]\n    : []>\ndeclare const PromiseAll: <T extends readonly any[]>(promises: T) => PromisesType<T>",lang:"ts"}),l.a.createElement("h3",{id:"type-lookup"},l.a.createElement(r["AnchorLink"],{to:"#type-lookup","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Type LookUp"),l.a.createElement("p",null,"Sometimes, you may want to lookup for a type in a union to by their attributes."),l.a.createElement("p",null,"In this challenge, we would like to get the corresponding type by searching for the common ",l.a.createElement("code",null,"type")," field in the union ",l.a.createElement("code",null,"Cat | Dog"),". In other words, we will expect to get ",l.a.createElement("code",null,"Dog")," for ",l.a.createElement("code",null,"LookUp<Dog | Cat, 'dog'>")," and ",l.a.createElement("code",null,"Cat")," for ",l.a.createElement("code",null,"LookUp<Dog | Cat, 'cat'>")," in the following example."),l.a.createElement(o["a"],{code:"interface Cat {\n  type: 'cat'\n  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'\n}\n\ninterface Dog {\n  type: 'dog'\n  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'\n  color: 'brown' | 'white' | 'black'\n}\n\ntype MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type LookUp<U, T extends string> = U extends Record<string, any> ? U['type'] extends T ? U : number : never",lang:"ts"}),l.a.createElement("h3",{id:"trim-left"},l.a.createElement(r["AnchorLink"],{to:"#trim-left","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Trim Left"),l.a.createElement("p",null,"Implement ",l.a.createElement("code",null,"TrimLeft<T>")," which takes an exact string type and returns a new string with the whitespace beginning removed."),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement(o["a"],{code:"type Space = ' ' | '\\n' | '\\t';\ntype TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S",lang:"ts"}),l.a.createElement("h3",{id:"trim"},l.a.createElement(r["AnchorLink"],{to:"#trim","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Trim"),l.a.createElement("p",null,"Implement ",l.a.createElement("code",null,"Trim<T>")," which takes an exact string type and returns a new string with the whitespace from both ends removed."),l.a.createElement("p",null,"For example"),l.a.createElement(o["a"],{code:"type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'",lang:"ts"}),l.a.createElement("p",null,l.a.createElement("strong",null,"answer")),l.a.createElement("h2",{id:"hard"},l.a.createElement(r["AnchorLink"],{to:"#hard","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Hard"),l.a.createElement("h2",{id:"extreme"},l.a.createElement(r["AnchorLink"],{to:"#extreme","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"Extreme")))}));n["default"]=e=>{var n=l.a.useContext(r["context"]),t=n.demos;return l.a.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),l.a.createElement(c,{demos:t})}}}]);