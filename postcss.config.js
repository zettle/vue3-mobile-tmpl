module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 375尺寸，让设计师给375px的设计稿
      minPixelValue: 2, // 小于2px的不会转为rem，等于2的还是会转
      propList: ['*'],
    },
  },
};
