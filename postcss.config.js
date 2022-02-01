module.exports = () => {
  return {
    plugins: [
      require('autoprefixer'),
      require('postcss-px-to-viewport')({
        viewportWidth: 375, // 设计稿的UI宽度，让设计师给375px的
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        // mediaQuery: false // 默认false，是否在媒体查询的css代码中进行转换
        exclude: [/nprogress/], // nprogress.css的就不转换了，用其原来的
      }),
    ],
  };
};
