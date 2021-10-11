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