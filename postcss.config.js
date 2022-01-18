/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
/* eslint-enable */

module.exports = ({ webpack }) => {
  const designWidth = webpack.resourcePath.includes(path.join('node_modules', 'vant')) ? 375 : 750;
  return {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: designWidth, // 设计稿的UI宽度，让设计师给750px的
        minPixelValue: 1 // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        // mediaQuery: false // 默认false，是否在媒体查询的css代码中进行转换
      }
    }
  };
};
