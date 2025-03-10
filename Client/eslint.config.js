const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');

module.exports = tseslint.config({
  files: ['**/*.ts'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
  ],
  plugins: {
    '@angular-eslint': angular,
  },
  rules: {
    '@angular-eslint/component-class-suffix': [
      'error',
      {
        suffixes: ['Component'],
      },
    ],
  },
});
