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