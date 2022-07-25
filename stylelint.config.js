module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order', // 顺序规范
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    // 因为用了sass，所以不用css的at-rule-no-unknown，用scss的scss/at-rule-no-unknown
    // 否则while/each/mixin/include这些scss语法会提示错误
    // 'at-rule-no-unknown': null,
    // 'scss/at-rule-no-unknown': true,
    // 不再需要上面的配置了，项目用saas，但规范使用stylelint-config-standard才有上面的问题
    // 把规范改为stylelint-config-standard-scss就可以解决

    // 限制选择器层级，最多3层
    'selector-max-compound-selectors': 3,
  },
};
