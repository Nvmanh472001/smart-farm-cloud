module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'], 
  // Plugin extends to mix ESLint and Prettier
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    es6: true, 
    node: true,
  },
  rules: {
    "no-var": 'error',
    'semi': 'error',
    'indent': ['error', 2, { SwitchCase: 1 }],
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 'error',
  },
}
