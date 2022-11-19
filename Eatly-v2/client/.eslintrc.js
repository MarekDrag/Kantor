const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: path.resolve(__dirname, 'tsconfig.json'),
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react', 'jest'],
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'prettier',
  ],
  rules: {
    // To fix and apply
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'jest/no-disabled-tests': 0,
    'react/static-property-placement': 0,
    'react/state-in-constructor': 0,
    'react-hooks/rules-of-hooks': 0,
    'func-names': 0,
    'jest/no-conditional-expect': 1,
    'arrow-body-style': 0,
    'prefer-arrow-callback': 0,

    // Disabled as they take a long time to complete
    '@typescript-eslint/no-implied-eval': 0,

    // Currently applied
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'no-console': [1, { allow: ['debug', 'error', 'info', 'warn'] }],
    complexity: [2, { max: 15 }], // prevent from writing too complex functions
    'sort-imports': 0, // turned of as we're using trivago for sorting
    'spaced-comment': [2, 'always', { markers: ['/'] }], // modified to allow TS references with triple brackets
    'no-param-reassign': [2, { props: true, ignorePropertyModificationsForRegex: ['Ref$'] }],
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0, // in many cases TS knows return type of the function so don't require to always specify it explicitly
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }], // allow to declare unused vars with _ prefix
    '@typescript-eslint/array-type': 2, // each array type should be written as type[]
    '@typescript-eslint/prefer-enum-initializers': 2, // enum values should be always specified explicitly
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': [
      2,
      {
        exports: 'only-multiline',
        generics: 'always-multiline',
        functions: 'always-multiline',
        objects: 'always-multiline',
        arrays: 'only-multiline',
        imports: 'always-multiline',
        enums: 'only-multiline',
        tuples: 'only-multiline',
      },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.jsx'] }], // reduce allowed extensions to typescript ones
    'react/destructuring-assignment': 0, // allow to destructure only a part of the props
    'react-hooks/exhaustive-deps': 0, // allow to relate useEffect invocation only to a few of variables used inside
    'react/require-default-props': 0,
    'react/no-unused-prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'import/order': 0, // turned of as we're using trivago for sorting
    'import/prefer-default-export': 0, // we're using default exports only for pages
    'import/no-useless-path-segments': 0,
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 0,
      },
    },
  ],
};
