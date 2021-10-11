module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // indent: ['error', 4], // js/ts的缩进
    // 'vue/html-indent': ['error', 4], // html的缩进
    semi: ['error', 'always'], // 分号
    'vue/html-closing-bracket-newline': ['warn', { // html的结束符/是否换行
      singleline: 'never', // 单行 never不换号
      multiline: 'never' // 多行 never不换号
    }],
    'vue/html-self-closing': ['error', // html标签自闭合还是双闭合
      {
        html: {
          void: 'always', // 常见的自闭合html标签，要自闭合，比如 img input hr br
          normal: 'never', // 普通html标签，除了上面的 img input等外的普通html标签，要双闭合
          component: 'never' // vue组件的，用双闭合
        }
      }
    ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
