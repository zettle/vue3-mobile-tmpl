module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗的宽度
      minPixelValue: 1 // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    }
  }
};
