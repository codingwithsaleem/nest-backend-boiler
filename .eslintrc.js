module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'jsdoc'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended-typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // TYPESCRIPT
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // PRETTIER
    'prettier/prettier': 'warn',
    // JSDOC
    'jsdoc/check-tag-names': ['error', { definedTags: ['dev'] }],
    'jsdoc/require-jsdoc': [
      'warn',
      {
        require: {
          MethodDefinition: true,
        },
      },
    ],
    'jsdoc/require-description': 'warn',
  },
  overrides: [
    {
      files: ['*.controller.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn',
      },
    },
  ],
};
