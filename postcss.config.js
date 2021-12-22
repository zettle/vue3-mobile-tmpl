module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗的宽度
      minPixelValue: 1 // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    }

    // rem的方案
    // 'postcss-pxtorem': {
    //   rootValue: 37.5,
    //   propList: ['*'],
    //   minPixelValue: 2 // 小于2px的不会转为rem，等于2的还是会转
    //   // selectorBlackList: [/^.van-\w*/], // 如果不想转rem的，就放开这个，但是不转的话，在大屏幕会感觉比例失调
    //   // exclude: /node_modules/i // 忽略node_modules里面的，就不会转vant的
    // }
  }
};
