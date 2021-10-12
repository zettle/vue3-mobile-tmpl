/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
/* eslint-enable */

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
