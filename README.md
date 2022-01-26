# vue3-mobile-tmpl

基于 create-vue，执行 `npm init vue@next` 创建工程

安装下 vue 全家桶和必要的包

```shell
pnpm i vue@next vue-router@next pinia vant@next
```

## 1、自动引入

参考文章：[unplugin-vue-components, 解放双手](https://juejin.cn/post/7012446423367024676)

vant 组件、vue 的 Api、vueRouter 的 Api、自定义组件都可以实现自动引入，步骤如下

1. 安装: `npm i -D unplugin-vue-components unplugin-auto-import`

2. 修改`vite.config.ts`，内容如下:

```js
import AutoImport from 'unplugin-auto-import/vite';
import ViteComponents from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    // 自动引入vue和vue-router的包
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      dts: true,
      imports: ['vue', 'vue-router'],
    }),
    // 自动引入vant的包
    ViteComponents({
      dts: true,
      resolvers: [VantResolver()],
    }),
  ],
});
```

修改`tsconfig.json`，把生成的声明文件引入

```json
{
  "include": ["src/**/*.d.ts"]
}
```

vue 的 Api 自动引入后，eslint 还是不认识，会提示`ref is undefined`，处理如下:

安装

```shell
pnpm i -D vue-global-api
```

修改`.eslintrc.cjs`，如下:

```js
module.exports = {
  extends: ['vue-global-api'],
};
```
