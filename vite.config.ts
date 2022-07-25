import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import ViteComponents from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // 自动引入vue和vue-router的包
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
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
    // vant toast等函数api调用，自动引入css
    createStyleImportPlugin({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => {
            return `../es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
});
