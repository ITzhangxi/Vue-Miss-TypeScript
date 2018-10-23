# Vue-Miss-TypeScript

> 集合网上大部分的Vue+TypeScript

## 一、基于vue-cli脚手架配置
> 通过vue脚手架生成了vue模板

### 1. 安装插件
> 安装vue的官方插件
```bash
npm i vue-class-component vue-property-decorator -S
```
>  ts-loader typescript 必须安装，其他的相信你以后也会装上的
```bash
npm i ts-loader typescript tslint tslint-loader tslint-config-standard -D
```

> #### 库的作用
> [vue-class-component](https://github.com/vuejs/vue-class-component)：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件
  [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)：在 vue-class-component 上增强更多的结合 Vue 特性的装饰器
  [ts-loader](https://github.com/TypeStrong/ts-loader)：TypeScript 为 Webpack 提供了 ts-loader，其实就是为了让webpack识别 .ts .tsx文件
  [tslint-loader](https://github.com/wbuchwalter/tslint-loader)跟[tslint](https://github.com/palantir/tslint)：我想你也会在.ts .tsx文件 约束代码格式（作用等同于eslint）
  [tslint-config-standard](https://github.com/blakeembrey/tslint-config-standard)：tslint 配置 standard风格的约束

### 2. 配置 webpack
#### 1) 配置build/webpack.base.conf.js
① 找到entry.app 将main.js 改成 main.ts, 顺便把项目文件中的main.js也改成main.ts, 里面内容保持不变
```js
entry: {
  app: './src/main.ts'
}
```
与此同时将main.js改为main.ts

② 找到resolve.extensions 里面加上.ts 后缀 （是为了之后引入.ts的时候不写后缀）
```javascript
resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      '@': resolve('src')
    }
  }
``` 

③ 找到module.rules 添加webpack对.ts的解析
```js
module: {
  rules: [
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
// 从这里复制下面的代码就可以了
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader'
    },
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        appendTsSuffixTo: [/\.vue$/],
      }
    }
// 复制以上的
  }
}
```


> #### 解释
> **ts-loader** 会检索当前目录下的 **tsconfig.json** 文件，根据里面定义的规则来解析 **.ts**文件（就跟 **.babelrc** 的作用一样）
  **tslint-loader** 作用等同于 **eslint-loader**
  
  ### 3. 添加 tsconfig.json
  > 在根路径下创建 **tsconfig.json** 文件
  
  > 这里有一份参考的 **tsconfig.json** 配置，完整的配置请点击 [tsconfig.json](http://json.schemastore.org/tsconfig)：
  
```json
{
  // 编译选项
  "compilerOptions": {
    // 输出目录
    "outDir": "./output",
    // 是否包含可以用于 debug 的 sourceMap
    "sourceMap": true,
    // 以严格模式解析
    "strict": true,
    // 采用的模块系统
    "module": "esnext",
    // 如何处理模块
    "moduleResolution": "node",
    // 编译输出目标 ES 版本
    "target": "es5",
    // 允许从没有设置默认导出的模块中默认导入
    "allowSyntheticDefaultImports": true,
    // 将每个文件作为单独的模块
    "isolatedModules": false,
    // 启用装饰器
    "experimentalDecorators": true,
    // 启用设计类型元数据（用于反射）
    "emitDecoratorMetadata": true,
    // 在表达式和声明上有隐含的any类型时报错
    "noImplicitAny": false,
    // 不是函数的所有返回路径都有返回值时报错。
    "noImplicitReturns": true,
    // 从 tslib 导入外部帮助库: 比如__extends，__rest等
    "importHelpers": true,
    // 编译过程中打印文件名
    "listFiles": true,
    // 移除注释
    "removeComments": true,
    "suppressImplicitAnyIndexErrors": true,
    // 允许编译javascript文件
    "allowJs": true,
    // 解析非相对模块名的基准目录
    "baseUrl": "./",
    // 指定特殊模块的路径
    "paths": {
      "jquery": [
        "node_modules/jquery/dist/jquery"
      ]
    },
    // 编译过程中需要引入的库文件的列表
    "lib": [
      "dom",
      "es2015",
      "es2015.promise"
    ]
  }
}
```

#### 顺便贴一份自己的配置
```json
{
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ],
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "allowJs": true,
    "module": "esnext",
    "target": "es5",
    "moduleResolution": "node",
    "isolatedModules": true,
    "lib": [
      "dom",
      "es5",
      "es2015.promise"
    ],
    "sourceMap": true,
    "pretty": true
  }
}
```

### 4. 添加tslint.json
> 在根路径下创建tslint.json文件，
引入 ts 的 standard 规范
```json
{
  "extends": "tslint-config-standard",
  "globals": {
    "require": true
  }
}
```

### 5. 让 ts 识别 .vue
> 由于 TypeScript 默认并不支持 *.vue 后缀的文件，所以在 vue 项目中引入的时候需要创建一个 vue-shim.d.ts 文件，放在项目项目对应使用目录下，例如 src/vue-shim.d.ts

```js
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

> #### action
上面的vue-shim.d.ts意思是告诉 TypeScript *.vue 后缀的文件可以交给 vue 模块来处理。
而在代码中导入 *.vue 文件的时候，需要写上 .vue 后缀。原因还是因为 TypeScript 默认只识别 *.ts 文件，不识别 *.vue 文件：
```js
import Component from 'components/component.vue'
```

### 6. 插件解释

#### 1）vue-class-component
> [vue-class-component](https://github.com/vuejs/vue-class-component) 对 **Vue** 组件进行了一层封装，让 Vue 组件语法在结合了 **TypeScript** 语法之后更加扁平化：
```vue
<template>
  <div>
    <input v-model="msg">
    <p>prop: {{propMessage}}</p>
    <p>msg: {{msg}}</p>
    <p>helloMsg: {{helloMsg}}</p>
    <p>computed msg: {{computedMsg}}</p>
    <button @click="greet">Greet</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    propMessage: String
  }
})
export default class App extends Vue {
  // initial data
  msg = 123

  // use prop values for initial data
  helloMsg = 'Hello, ' + this.propMessage

  // lifecycle hook
  mounted () {
    this.greet()
  }

  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // method
  greet () {
    alert('greeting: ' + this.msg)
  }
}
</script>
```
上面的代码跟下面的代码作用是一样的
```vue
export default{
 data () {
    return {
      msg: 123
    }
  }
  // 声明周期钩子
    mounted () {
      this.greet()
    }
  // 计算属性
  computed: {
    computedMsg () {
      return 'computed ' + this.msg
    }
  }
  // 方法
  methods: {
    greet () {
      alert('greeting: ' + this.msg)
    }
  }
}
```

#### 1) vue-property-decorator
> (vue-property-decorator)[https://github.com/kaorun343/vue-property-decorator] 是在 **vue-class-component** 上增强了更多的结合 **Vue** 特性的装饰器，新增了这 7 个装饰器：

@Emit

@Inject

@Model

@Prop

@Provide

@Watch

@Component (from vue-class-component)
在这里列举几个常用的@Prop/@Watch/@Component, 更多信息，详见[官方文档](https://github.com/kaorun343/vue-property-decorator)
```vue
@Component
export default class YourComponent extends Vue {
  @Prop(Number) propA!: number
  @Prop({ default: 'default value' }) propB!: string
  @Prop([String, Boolean]) propC: string | boolean
}
```
上面的代码相当于：
```vue
export default {
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    },
  }
}
```

### 7. 修改App.vue文件
① 在script 标签上加上 lang="ts", 意思是让webpack将这段代码识别为typescript 而非javascript

② 修改vue组件的构造方式( 跟react组件写法有点类似, 详见[官方](https://cn.vuejs.org/v2/guide/typescript.html#%E5%9F%BA%E4%BA%8E%E7%B1%BB%E7%9A%84-Vue-%E7%BB%84%E4%BB%B6) )， 如下图

③ 用**vue-property-decorator**语法改造之前代码

![基于类的Vue组件](https://user-gold-cdn.xitu.io/2017/10/27/077254e88b5f83dfa81599737d527b46?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

当然也可以直接复制下面的代码替换就可以了
```vue
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

## 8. Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
