/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    // vue-router的
    useRoute: true,
    useRouter: true,
    // vuex的
    useStore: true,
    // pinia的
    storeToRefs: true,
  },
  extends: [
    'vue-global-api',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
};
