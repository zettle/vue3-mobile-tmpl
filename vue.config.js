/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// const { merge } = require('webpack-merge');
// const tsImportPluginFactory = require('ts-import-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const Components = require('unplugin-vue-components/webpack');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const WebpackBar = require('webpackbar');
/* eslint-enable */

function resolve (dir) {
  return path.join(__dirname, dir); // 原来的cli2是在build里面，这里就不需要回退了
}

module.exports = {
  devServer: {
    proxy: {
      '/channel_api': {
        target: 'http://yapi.smart-xwork.cn/mock/128748/vue_api/',
        pathRewrite: { '^/channel_api': '' }
      }
    }
  },
  chainWebpack (config) {
    /********************
     * svg管理
     ********************/
    const svgIconPath = 'src/components/baseCom/svg-icon/icons'; // svg的路径
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

    /********************
     * vant的按需加载
     ********************/
    // config.module.rule('ts').use('ts-loader').tap(options => {
    //   options = merge(options, {
    //     transpileOnly: true,
    //     getCustomTransformers: () => ({
    //       before: [
    //         tsImportPluginFactory({
    //           libraryName: 'vant',
    //           libraryDirectory: 'es',
    //           style: true
    //         })
    //       ]
    //     }),
    //     compilerOptions: {
    //       module: 'es2015'
    //     }
    //   });
    //   return options;
    // });

    /********************
     * scss全局变量引入，不必每个页面都引入
     ********************/
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            resolve('./src/assets/style/_variable.scss'),
            resolve('./src/assets/style/_mixins.scss')
          ]
        })
        .end();
    });

    /********************
     * 移除prefetch/preload插件（建议保留提高性能）
     ********************/
    // config.plugins.delete('prefetch-index');
    // config.plugins.delete('preload-index');

    /********************
     * ejs输出变量
     ********************/
    config.plugin('html').tap(args => {
      args[0].title = '我的模板';
      return args;
    });
  },
  configureWebpack (config) {
    /********************
     * 如果是本地环境，则启动stylelint检查css
     ********************/
    if (process.env.NODE_ENV === 'development') {
      config.plugins.push(new StyleLintPlugin({
        context: 'src',
        configFile: resolve('./stylelint.config.js'),
        files: '**/*.{vue,html,css,less,sass,scss}',
        // fix: true, // 交给vscode去做了
        cache: true
      }));
    }

    /********************
     * vant的自动按需加载
     ********************/
    config.plugins.push(
      Components({ resolvers: [VantResolver()] })
    );

    /********************
     * webpack进度条（感觉挺影响性能的）
     ********************/
    config.plugins.push(new WebpackBar({
      name: '项目模板',
      color: '#07c160'
    }));
  }
};
