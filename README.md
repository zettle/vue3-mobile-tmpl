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

3. 修改`tsconfig.json`，把生成的声明文件引入

```json
{
  "include": ["src/**/*.d.ts"]
}
```

4. vue 的 Api 自动引入后，eslint 还是不认识，会提示`ref is undefined`，处理如下:

安装: `pnpm i -D vue-global-api`

修改`.eslintrc.cjs`，如下:

```js
module.exports = {
  extends: ['vue-global-api'],
};
```

5. 对于 vant 里面一些服务式 api，比如 Toast，我们使用的时候还是需要手动 import 和引入样式，我们可以用下面的方式自动引入样式

安装: `pnpm i -D vite-plugin-style-import`

修改配置:

```ts
import styleImport, { VantResolve } from 'vite-plugin-style-import';
export default defineConfig({
  plugins: [
    styleImport({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => {
            return `vant/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
});
```

配置后，我们就可以直接用下面的写法

```ts
import { Toast } from 'vant';
// import 'vant/es/toast/style/index'; // 这个可以省略了
Toast('提示内容');
```

## 2、commit 之前语法检查和 commit 信息规范

1. 执行 `npx husky-init '&&' pnpm install`，会生成一个`.husky`文件夹

2. 修改`.husky/pre-commit`的内容，加上下面

```
npm test # 单元测试
npm run lint # eslint检查
```
