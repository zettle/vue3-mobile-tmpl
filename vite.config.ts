import { fileURLToPath, URL } from 'url';
import { UserConfigExport, ConfigEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import ViteComponents from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    base: '/vuetmpl/', // publicPath，部署二级路径代理的要用到
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
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
    build: {
      // 分析开启gzip后的大小并给提示，关闭可以提高打包性能
      reportCompressedSize: false,
      // 打包后分类存放
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
    },
    plugins: [
      /******************
       * vie自带的
       ******************/
      vue(),
      vueJsx(),

      /******************
       * mock
       ******************/
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
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
        imports: ['vue', 'vue-router'],
      }),
      ViteComponents({
        // dirs: ['src/components'], // 自定义的组件，默认就是'src/components'
        dts: 'src/types/components.d.ts', // 默认true表示生成声明文件（会生成后存在根目录），如果设置字符串表示存放路径
        extensions: ['vue'], // 自定义组件的后缀
        // dts: trie, // 默认true，搜索子目录
        resolvers: [VantResolver()],
        // directoryAsNamespace: false, // 允许子目录作为组件的命名空间前缀
      }),
      styleImport({
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
    ],
  };
};
