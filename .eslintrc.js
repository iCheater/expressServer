// 0 = off, 1 = warn, 2 = error

module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    semi: 2,
    "prefer-const": 2,
    "padded-blocks": 1,
    "prefer-arrow-callback": 2,
    "no-unused-vars": ["error", {
      "vars": "all",
      "args": "none",
      ignoreRestSiblings: true
    }],
    "comma-dangle": ["error", "always-multiline"],
  }
};
