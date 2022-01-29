/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'vue-global-api',
  ],
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  rules: {
    // indent: ['error', 4], // js/ts的缩进
    // 'vue/html-indent': ['error', 4], // html的缩进
    // 'vue/script-indent': ['error', 4], // html的缩进
    // semi: ['error', 'always'], // 分号

    // 全部都用ts，样式全部用scss
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
        style: {
          lang: 'scss',
        },
      },
    ],
    'vue/html-closing-bracket-newline': [
      'warn',
      {
        // html的结束符/是否换行
        singleline: 'never', // 单行 never不换号
        multiline: 'never', // 多行 never不换号
      },
    ],
    // html标签自闭合还是双闭合
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always', // 常见的自闭合html标签，要自闭合，比如 img input hr br
          normal: 'never', // 普通html标签，除了上面的 img input等外的普通html标签，要双闭合
          component: 'never', // vue组件的，用双闭合
        },
      },
    ],
    // 就算是class/style属性，也不要出现重复声明
    'vue/no-duplicate-attributes': [
      'error',
      {
        allowCoexistClass: false,
        allowCoexistStyle: false,
      },
    ],
    // 组件的name属性，用中横线命名法
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    // 写组件的时候，控制props按照字母排序，其他指令就安装默认值就好了
    'vue/attributes-order': [
      'error',
      {
        // order就安装默认值就好了
        // "order": ["DEFINITION","LIST_RENDERING","CONDITIONALS","RENDER_MODIFIERS","GLOBAL",["UNIQUE", "SLOT"],"TWO_WAY_BINDING","OTHER_DIRECTIVES","OTHER_ATTR","EVENTS","CONTENT"],
        alphabetical: true,
      },
    ],
    // template/script/style 3个标签的顺序
    'vue/component-tags-order': [
      'error',
      {
        order: ['docs', 'template', 'script', 'style'],
      },
    ],
    // html的内容是否要换行
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: false, // 当内容是空的时候，也要换
        ignores: [], // 默认["pre", "textarea", ...INLINE_ELEMENTS]
      },
    ],
    // 强制使用componentApi写法
    'vue/component-api-style': [
      'error',
      ['script-setup', 'options'], // "script-setup", "composition", or "options"
    ],
    // html中自定义组件用中横线写法
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false, // 设置false检查所有的组件
        ignores: [],
      },
    ],
    // 自定义组件的emit('事件名') 中事件名用中横线
    'vue/custom-event-name-casing': ['error', 'kebab-case', { ignores: [] }],
    // button标签要声明type属性
    'vue/html-button-has-type': ['error'],
    // 组件的name属性要和文件名一致
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['jsx', 'tsx', 'vue'],
        shouldMatchCase: true,
      },
    ],
    // 禁止使用废弃的v-is指令 vue3.1后废弃了v-is
    'vue/no-deprecated-v-is': ['error'],
    // 前置v-bind="$attrs"和`inheritance:false`一起使用
    'vue/no-duplicate-attr-inheritance': ['error'],
    // 禁止template/script/style里面没有内容，如果没有内容请直接删除
    'vue/no-empty-component-block': ['error'],
    // 禁止script-setup中使用export语法
    'vue/no-export-in-script-setup': ['error'],
    // 禁止model属性里面声明没用key值
    'vue/no-invalid-model-keys': ['error'],
    // 禁止在class属性中使用多个object
    'vue/no-multiple-objects-in-class': ['error'],
    // 警告在option中拼写错误
    'vue/no-potential-component-option-typo': ['warn'],
    // 禁止组件的name属性使用关键字
    'vue/no-reserved-component-names': [
      'error',
      {
        disallowVueBuiltInComponents: true, // vue2的关键词
        disallowVue3BuiltInComponents: true, // vue3的关键词
      },
    ],
    // 警告不要在style中写纯静态的内容
    'vue/no-static-inline-styles': ['warn'],
    // 警告，当target="_blank"的时候，要和rel="noopener noreferrer"一起用
    'vue/no-template-target-blank': ['warn'],
    // template/script/style之间留一行
    'vue/padding-line-between-blocks': ['warn', 'always'],
    // 静态class属性的顺序
    'vue/static-class-names-order': 'warn',
    // @自定义事件的时候，用中横线
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: true, // 启动自动修复
      },
    ],
    // @事件的时候，参数如果是空则不用加()
    'vue/v-on-function-call': ['error', 'never'],
    // 连接符前后要空格，类似eslint的space-infix-ops
    'vue/space-infix-ops': 'error',

    // 反引号字符串前后要空格，一个控制js，一个控制html
    // preitter的是不要，所以这里保持和preitter一致
    'template-curly-spacing': ['error', 'never'],
    'vue/template-curly-spacing': ['error', 'never'],
    // 禁止在html写纯字符串，国际化的时候开启很有效果
    // 'vue/no-bare-strings-in-template': ['error'],
    // 强制组件要有name属性
    // 'vue/require-name-property': 'warn',
    // 提供给外界用的需要expose，没有的也要声明一下
    // 'vue/require-expose': 'warn',
    'vue/multi-word-component-names': 'off',
    // 一定要明确写出类型边界类型
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true, // 允许明确的使用any类型
      },
    ],
  },
};
