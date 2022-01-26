import { fileURLToPath, URL } from 'url';

import AutoImport from 'unplugin-auto-import/vite';
import ViteComponents from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import styleImport, { VantResolve } from 'vite-plugin-style-import';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

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

    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      dts: 'src/types/auto-imports.d.ts',
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
  ],
});
