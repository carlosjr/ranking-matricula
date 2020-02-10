module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  env: {
    browser: true
  },

  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: [
    'plugin:vue/essential',
    'airbnb-base'
  ],

  // required to lint *.vue files
  plugins: [
    'vue'
  ],

  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true,
    'process': true
  },

  // add your custom rules here
  rules: {
    'no-param-reassign': 'off',

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'off',

    // allow console.log during development only
    //'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 0,
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    "indent": ["error",2],
    "semi": 0,
    "padded-blocks": 0,
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "keyword-spacing": 0,
    "object-curly-spacing":0,
    "comma-dangle": 0,
    "object-curly-newline":0,
    "max-len":0,
    "array-callback-return": 0,
    "prefer-template":0,
    "vue/no-unused-components": 0,
    "quotes": 0,
    "prefer-const":0,
    "no-plusplus": 0,
    "no-continue":0
  }
}
