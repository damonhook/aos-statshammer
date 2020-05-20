module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'eslint-plugin-simple-import-sort',
    'prettier',
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  root: true,
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-wrap-multilines': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    '@typescript-eslint/no-empty-interface': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/interactive-supports-focus': ['off'],
    'react-hooks/exhaustive-deps': [2],
    'react/prop-types': ['off'],
    'react/jsx-fragments': ['off'],
    'prettier/prettier': 'warn',
    'react/static-property-placement': ['off'],
    'import/prefer-default-export': ['off'],
    'no-shadow': ['off'],
    'class-methods-use-this': ['off'],
    'lines-between-class-members': ['off'],
    'import/extensions': ['off'],
    '@typescript-eslint/interface-name-prefix': ['off'],
    '@typescript-eslint/ban-ts-ignore': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    'no-underscore-dangle': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    'simple-import-sort/sort': ['warn'],
    'sort-imports': ['off'],
    'import/order': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'jsx-a11y/no-noninteractive-tabindex': ['off'],
    'jsx-a11y/tabindex-no-positive': ['off'],
  },
  overrides: [
    {
      files: ['server.ts'],
      rules: {
        'no-console': ['off'],
      },
    },
    {
      files: ['**/store/**'],
      rules: {
        'no-param-reassign': ['off'],
      },
    },
  ],
  settings: {
    react: { version: 'latest' },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        directory: ['./tsconfig.json', './client/tsconfig.json'],
      },
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
};
