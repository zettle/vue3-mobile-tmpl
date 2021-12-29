# vue3搭建移动端应用

升级包
```shell
# 更新vue全家桶
npm i vue@next vue-router@next
npm i -D  @vue/compiler-sfc

# 更新语法检查
npm i -D eslint-plugin-vue

# 状态管理用pinia
npm i pinia

# UI库
npm i vant@next
```

## 1、改动

### 1.1 eslint改造
* 缩进
* 分号
* 改为更加严格的`'plugin:vue/vue3-recommended'`



## 2、vant
安装: `npm i vant@next`

### 方案一： 按需引入
vant的按需加载，因为这个项目用的是ts，需要下面的操作

1. 安装必要的包: `npm i -D webpack-merge ts-import-plugin`

2. 修改`vue.config.js`，内容如下:
```js
const { merge } = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  chainWebpack (config) {
    // vant的按需加载
    config.module.rule('ts').use('ts-loader').tap(options => {
      options = merge(options, {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [
            tsImportPluginFactory({
              libraryName: 'vant',
              libraryDirectory: 'es',
              style: true
            })
          ]
        }),
        compilerOptions: {
          module: 'es2015'
        }
      });
      return options;
    });
  }
};
```

### 方案二： 自动引入（推荐）
用替换上面的方案，实现自动引入
1. 安装: `npm i -D unplugin-vue-components unplugin-auto-import`

2. 修改`vue.config.js`，内容如下:
```js
const Components = require('unplugin-vue-components/webpack');
const { VantResolver } = require('unplugin-vue-components/resolvers');

module.exports = {
  configureWebpack (config) {
    config.plugins.push(
      Components({ resolvers: [VantResolver()] })
    );
  }
}
```

## 3、移动端适配大小
修改`public/index.html`的`meta`信息，改为下面，禁止用户放大缩小页面
```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
```

### 方案一：使用viewport适配屏幕（推荐）
优点：现在的手机基本上都兼容不用考虑兼容问题

缺点：想要控制大屏的时候，限制下所有元素的最大尺寸目前没有想到实现方式

1. 安装: `npm i -D postcss-px-to-viewport`

2. 修改`postcss.config.js`如下:
```js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375
    }
  }
};
```

3. 把vant的也转下，不然有些大屏幕下看着vant的和自己的突兀挺大的


### 方案二：使用rem适配屏幕
优点：能控制大屏的最大宽度。因为vh布局有个不太好的地方就是不能实现这种效果: 让整个body控制在一个最大宽度，并且里面所有元素跟着整个比例

缺点：老旧的方案

1. 安装: `npm i - D postcss-pxtorem@5`。 安装5的版本，因为6以上的版本需要postcss8

2. 修改`postcss.config.js`如下:
```js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      minPixelValue: 2 // 小于2px的不会转为rem，等于2的还是会转
      // selectorBlackList: [/^.van-\w*/], // 如果不想转rem的，就放开这个，但是不转的话，在大屏幕会感觉比例失调
      // exclude: /node_modules/i // 忽略node_modules里面的，就不会转vant的
    }
  }
};
```

## 4、mock数据
模拟后端数据
### 方案一：自己搭node 服务（推荐）
1. 安装koa2脚手架: `npm i -g koa-generator`

2. 初始化koa项目: `koa2 -e mockServer`

3. 安装nodemon: `npm i -D nodemon`

4. 修改`nodemon.json`，只监听`mockServer`文件夹里面内容的变化，内容如下:
```json
{
  "watch": [
    "./mockServer/**/*.js",
    "./mockServer/**/*.json"
  ]
}
```

5. 启动koa服务，执行`nodemon mockServer/bin/www`


### 方案二
使用第3方提供的mock网站，下面几个都可以，但不能模拟上传、下载，图片预览等效果

* [fastmock](https://www.fastmock.site/)



## 5、svg管理
传统的svg是通过字体图标管理，但是借助iconfont等网站，存在时间长了，难以维护的问题

这里使用另外一种方案，借助`svg-sprite-loader`工具，把svg的都放到项目中维护

1. 安装: `npm i -D svg-sprite-loader`

2. 修改`vue.config.js`如下:
```js
module.exports = {
  chainWebpack (config) {
    const svgIconPath = 'src/components/baseCom/svg-icon/icons';
    config.module
      .rule('svg')
      .exclude.add(resolve(svgIconPath))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve(svgIconPath))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end();
  }
}
```
项目要用到的svg就复制到`/src/components/baseCom/svg-icon/icons/*`里面

【注意：】vue文件提示`__WebpackModuleApi undefined`，需要改为tsx
在`/src/components/baseCom/svg-icon.vue`，如果写上代码
```ts
const req = require.context('./icons', false, /\.svg$/);
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
```
会一直提示`__WebpackModuleApi undefined`

但是在ts文件中，就不会出现这个提示，因此我们要不就把`svg-icon.vue`的实现和`require.context()`自动引入分开

一个写在`.vue`文件中，一个写在`.ts`中

另外一种方案是我们直接不要写`.vue`了，写`.tsx`，这里使用的就是这种方案

在字体图标中，我们常常通过控制`color/fontSize`控制`颜色/大小`

那么现在我们只需要加上下面样式
```scss
.svg-icon {
  width: 1em; // 要设置成这个，就可以外层通过fontSize控制图标的大小
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor; // 要设置这个，就可以外层通过color控制图标的颜色了
}
```
有时候，我们使用了一个svg，通过color控制颜色没有起效果，那么就去这个svg的代码看下，把所有`fill`属性都删除

![](./readme/fill.png)




## 6、全局引入scss变量、mixins
1. 安装: `npm i -D sass-resources-loader`

2. 修改`vue.config.js`，内容如下:
```js
module.exports = {
  chainWebpack (config) {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            resolve('./src/assets/style/_variable.scss'),
            resolve('./src/assets/style/_mixins.scss')
          ]
        })
        .end();
    });
  }
};
```


## 7、引入stylelint
1. 安装
```shell
npm i -D stylelint stylelint-config-standard stylelint-scss stylelint-order stylelint-config-rational-order stylelint-webpack-plugin
```
* `stylelint-scss`: 配合scss的
* `stylelint-order`: 检查顺序的
* `stylelint-config-rational-order`: 别人写好的order顺序，就不用自己写了
* `stylelint-webpack-plugin`: 和webpack搭配的插件

2. 新建`stylelint.config.js`文件，用于配置stylelint的规则等配置信息

3. 新建`.stylelintignore`文件，用于配置要忽略检查的文件
```txt
node_modules
mockServer
dist
```

4. 修改`package.json`，添加script脚本
```json
{
  "lint:style": "stylelint **/*.{html,vue,css,sass,scss}",
  "lint:styleFix": "stylelint **/*.{html,vue,css,sass,scss} --fix"
}
```

在vscode安装stylelint插件，如果不符合规范就会为其标记红色warm

修改`.vscode/settings.json`，这样保存的时候，就会自动格式化，如下
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

修改`vue.config.js`，内容如下:
```js
if (process.env.NODE_ENV === 'development') {
  config.plugins.push(new StyleLintPlugin({
    context: 'src',
    configFile: resolve('./stylelint.config.js'),
    files: '**/*.{vue,html,css,less,sass,scss}',
    cache: true
  }));
}
```
每次启动项目后，因为配置了`cache:true`，所以会生成缓存`.stylelintcache`这个文件，将其添加git忽略文件

修改`.husy`，在commit的时候检查下style语法



## 8、axios的封装
axios的封装



## 9、storage
以前封装的`strage.ts`感觉还是太自由了，这次重新封装了个`/src/storage/stroageBase.ts`

主要想要和ts结合，约束`sessionStorage.get()/sessionStorage.set()`

封装后，要先实例化下 storage 的实例，并且传入泛型，等到`get()`的时候，就自动有了泛型
```js
interface Itype {
  name: string;
  age: number;
}
const storage = new SessionStorage<Itype>();
storage.set({ name:'xxx', age:23 });
storage.get(); // 自动推导类型
```



## 其他问题和优化
#### 1. ios无点击反馈
这是因为 iOS Safari 默认不会触发 :active 伪类，解决方法是在 body 标签上添加一个空的 ontouchstart 属性：
```html
<body ontouchstart="">
</body>
```

#### 2. 去掉`normalize.css`
本来想着引入`normalize.css`重置先css样式，发现很多没有重置到，不符合自己的效果，移除

#### 3. 滚动问题
在 `/scroll/first.vue` 滚动到一定距离之后，再去 `/scroll/second.vue` 页面

会发现`second.vue`沿用了`first.vue`的滚动距离

解决方式: [vueRouter滚动行为](https://next.router.vuejs.org/zh/guide/advanced/scroll-behavior.html)


#### 4. 让页面最小一个屏幕高度，最大适应内容高度
在以前的写法，会用下面scss:
```scss
body, html, #app, .page { width: 100%; min-height: 100vh; }
```
上面很不方便就是一层层的设置高度，现在可以用更viewpoint设置:
```scss
.page {
  width: 100vw;
  min-height: 100vh;
}
```

## 外链
* [vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN)
* [pinia](https://pinia.esm.dev/introduction.html)
* [vueRouter滚动行为](https://next.router.vuejs.org/zh/guide/advanced/scroll-behavior.html)




## 以后可能会用到的
### 1、单例模式
```ts
class Person {
  private static instance: Person;
  // constructor修饰为private，就能限制外面通过new出实例
  private constructor (public cname: string) {}

  // 需要static这样外面才能在不实例化的情况下调用
  static getInstance (cname: string) {
    if (!this.instance) {
      this.instance = new Person(cname)
    }
    return this.instance;
  }
}

const p1 = Person.getInstance('xiaoming');
const p2 = Person.getInstance('xiaohong');
console.log(p1 === p2);
console.log(p1.cname, p2.cname);// 都是xiaoming，因为不会再实例化第2次，也就是xiaohong不会生效
```


## 遗留问题

### 1、api的自动导入导出方案
在 `/src/http/api/*` 里面定义了很多接口，然后在`/src/http/index.ts`做统一导入导出

本来想着用`require.context()`做自动导入，发现对于`export interface xxx`的ts声明，无法导入和导出



