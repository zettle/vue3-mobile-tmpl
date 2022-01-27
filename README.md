# vue3-mobile-tmpl

基于 create-vue，执行 `npm init vue@next` 创建工程

安装下 vue 全家桶和必要的包

```shell
npm i vue@next vue-router@next pinia vant@next
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

安装: `npm i -D vue-global-api`

修改`.eslintrc.cjs`，如下:

```js
module.exports = {
  extends: ['vue-global-api'],
};
```

5. 对于 vant 里面一些服务式 api，比如 Toast，我们使用的时候还是需要手动 import 和引入样式，我们可以用下面的方式自动引入样式

安装: `npm i -D vite-plugin-style-import`

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

1. 执行 `npx husky-init '&&' npm install`，会生成一个`.husky`文件夹

2. 修改`.husky/pre-commit`的内容，加上下面，这样在执行`git commit`的时候就会执行里面的命令

```
npm test # 单元测试
npm run lint # eslint检查
```

3. 安装`npm i -D commitizen`，并执行`npx commitizen init cz-conventional-changelog --save-dev --save-exact`

4. 修改`package.json`添加命令

```json
{
  "scripts": {
    "precommit": "git add .",
    "commit": "npx cz",
    "postcommit": "git push"
  }
}
```

5. 安装`npm i -D @commitlint/config-conventional @commitlint/cli`，并执行`node node_modules/husky/lib/bin.js add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`

6. 新建`commitlint.config.js`，内容如下:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```


## 3、mock数据
安装: `npm i vite-plugin-mock mockjs -D`，[相关文档](https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md)

修改`vite.config.ts`如下:
```ts
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      viteMockServe({
        mockPath: 'mock', // mock的目录
        localEnabled: command === 'serve', // 当执行`vite serve`说明启动本地，用mock数据，其他就不用mock数据
      }),
    ],
  }
}
```
在根目录新建`/mock/index.ts`，造各种数据，如下:
```ts
import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: {
          name: Random.cname(),
        },
      };
    },
  },
] as MockMethod[];
```

在项目中就可以直接用了，如下:
```ts
import axios from 'axios';
await axios.post('/api/post');
```


## 4、多环境配置
和以前的vue-cli一样，支持引用方式改为了`import.meta.env.xxx`
比如现在多弄个环境变量: `VITE_APP_ENV=local`

那么引入的时候，就写成: `import.meta.env.VITE_APP_ENV`

同时，我们`/src/types/env.d.ts`为我们定义的写好ts类型
```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```
这样就有了很好的提示


## 打包的优化
### 按文件类型分文件
vite打包后，默认是把所有静态资源`js/css/png`等都放在`/dist/assets`里面，挺不方便我们看的

![](./doc/assets.png)

我们还是希望按照以前的方式分开存放，则修改配合如下:
```ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
  }
});
```
再执行打包，可以看文件分开存放了

![](./img/assets-2.png)

## 部署
修改 `vite.config.ts` 的 `base` 配置，相当于我们以前的`publicPath`

修改后，因为我们使用的history模式，所以需要修改`/src/router/index.ts`，内容如下:
```ts
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
```
`import.meta.env.BASE_URL`是vite环境变量，`BASE_URL`会自动和`vite.config.ts`的`base`配置挂钩
