# vue3搭建移动端应用

升级包
```shell
# 更新vue全家桶
npm i vue@next vuex@next vue-router@next
npm i -D  @vue/compiler-sfc

# 更新语法检查
npm i -D eslint-plugin-vue
```

## 1、改动

### 1.1 eslint改造
* 缩进
* 分号
* 改为更加严格的`'plugin:vue/vue3-recommended'`



## 2、vant
安装: `npm i vant@next`

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



## 3、移动端适配大小
1. 修改`public/index.html`的`meta`信息，改为下面，禁止用户放大缩小页面
```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
```

2. 使用`viewport`来适配屏幕宽度，rem布局已经可以淘汰，但对应的，想要控制大屏的时候，限制下所有元素的最大尺寸目前没有想到实现方式

3. 安装[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md): `npm i -D postcss-px-to-viewport`

4. 修改`postcss.config.js`如下:
```js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375
    }
  }
};
```

5. 把vant的也转下，不然有些大屏幕下看着vant的和自己的突兀挺大的

6. 引入`npm i -S normalize.css`，抹平浏览器默认样式差异




## 4、集成node server，mock数据
使用koa2脚手架: `npm i -g koa-generator`

执行`koa2 -e mockServer`

安装nodemon: `npm i -D nodemon`

修改`nodemon.json`，只监听`mockServer`文件夹里面内容的变化，内容如下:
```json
{
  "watch": [
    "./mockServer/**/*.js",
    "./mockServer/**/*.json"
  ]
}
```


## 5、svg管理
传统的svg是通过字体图标管理，但是借助iconfont等网站，存在时间长了，难以维护的问题

这里使用另外一种方案，借助`svg-sprite-loader`工具，把svg的都放到项目中维护

安装: `npm i -D svg-sprite-loader`

修改`vue.config.js`如下:
```js
chainWebpack (config) {
  const svgIconPath = 'src/components/baseCom/svg-icon/icons';
  config.module
    .rule('svg') // 找个配置rule规则里面的svg
    .exclude.add(resolve(svgIconPath)) // 项目除了制定文件夹有svg，可能其他地方有svg，这些其他地方svg应该有vue-cli原来的svg管理去管理
    .end();
  config.module
    .rule('icons')// 配置rule规则里面新增的icons规则
    .test(/\.svg$/)// icons规则里匹配到.svg结尾的文件
    .include.add(resolve(svgIconPath)) // 包含src/icons下的.svg文件
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({ symbolId: 'icon-[name]' })// class名
    .end();
}
```
项目要用到的svg就复制到`/src/components/baseCom/svg-icon/icons/*`里面

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





## 其他
### 1、ios无点击反馈
这是因为 iOS Safari 默认不会触发 :active 伪类，解决方法是在 body 标签上添加一个空的 ontouchstart 属性：
```html
<body ontouchstart="">
</body>
```