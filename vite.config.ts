import { fileURLToPath, URL } from 'url';
import type { UserConfigExport, ConfigEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import ViteComponents from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import';
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCompression from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Pages from 'vite-plugin-pages';
// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    base: './', // publicPath，部署二级路径代理的要用到
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // import.meta.url=file://E:\mideaspace\vue3-mobile-tmpl\vite.config.ts
      },
    },
    server: {
      // https: true, // 开启https
      host: '0.0.0.0', // 所有地址
      // 跨域代理
      proxy: {
        '/channel_api': {
          target: 'http://yapi.smart-xwork.cn/mock/128748/vue_api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/channel_api/, ''),
        },
      },
    },
    // 全局scss变量和mixins等
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `@import '@/assets/style/_index.scss';`,
        },
      },
    },
    build: {
      // manifest: true, // 生成manifest.json文件
      // 分析开启gzip后的大小并给提示，关闭可以提高打包性能
      reportCompressedSize: false,
      // 打包后分类存放
      // rollupOptions: {
      //   output: {
      //     chunkFileNames: 'js/[name]-[hash].js',
      //     entryFileNames: 'js/[name]-[hash].js',
      //     assetFileNames: '[ext]/[name]-[hash].[ext]',
      //   },
      // },
    },
    plugins: [
      /******************
       * vite自带的
       ******************/
      vue(),
      vueJsx(),
      /******************
       * mock
       ******************/
      viteMockServe({
        mockPath: 'mock', // mock的目录
        localEnabled: command === 'serve', // 当执行`vite serve`说明启动本地，用mock数据，其他就不用mock数据
      }),
      /******************
       * 自动引入api和组件
       ******************/
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        dts: 'src/types/auto-imports.d.ts',
        resolvers: [VantResolver()],
        imports: ['vue', 'vue-router', 'pinia'],
      }),
      // 自动引入vant的包
      ViteComponents({
        // dirs: ['src/components'], // 自定义的组件，默认就是'src/components'
        dts: 'src/types/components.d.ts', // 默认true表示生成声明文件（会生成后存在根目录），如果设置字符串表示存放路径
        extensions: ['vue'], // 自定义组件的后缀
        // dts: trie, // 默认true，搜索子目录
        resolvers: [VantResolver()],
        // directoryAsNamespace: false, // 允许子目录作为组件的命名空间前缀
      }),
      createStyleImportPlugin({
        resolves: [VantResolve()],
        // 自定义规则
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

      /******************
       * 打包gzip
       ******************/
      viteCompression(),
      /******************
       * svg管理
       ******************/
      createSvgIconsPlugin({
        iconDirs: [
          fileURLToPath(
            new URL('./src/components/baseCom/svg-icon/icon', import.meta.url) // 存放图标的目录
          ),
        ],
        symbolId: 'icon-[dir]-[name]',
      }),
      /******************
       * 约定路由
       ******************/
      Pages({
        dirs: 'src/views',
        extendRoute(route) {
          // console.log('route', route);
          if (route.path === '/') {
            // 将 `entrance/home`作为首页
            return { redirect: '/entrance/home' };
          }
          return route;
        },
      }),
    ],
  };
};
