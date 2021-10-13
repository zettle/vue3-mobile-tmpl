/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
/* eslint-enable */

function resolve (dir) {
  return path.join(__dirname, dir); // 原来的cli2是在build里面，这里就不需要回退了
}

module.exports = {
  devServer: {
    proxy: {
      '/channel_api': {
        target: 'http://localhost:3000/api',
        pathRewrite: { '^/channel_api': '' }
      }
    }
  },
  chainWebpack (config) {
    /********************
     * svg管理
     ********************/
    const svgIconPath = 'src/components/baseCom/svg-icon/icons';
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
  }
};
