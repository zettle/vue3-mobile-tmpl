module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order', // 顺序规范
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  customSyntax: 'postcss-html',
  rules: {
    // 因为用了sass，所以不用css的at-rule-no-unknown，用scss的scss/at-rule-no-unknown
    // 否则while/each/mixin/include这些scss语法会提示错误
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
