module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'jest': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  'plugins': [
    'react',
    'jsx-a11y',
    'react-hooks',
    'import',
    'prettier'
  ],
  'rules': {
    // 'SwitchCase': 1,
    // 'indent': ['error', 2, {  'offsetTernaryExpressions': true  }],
    'indent': ['off', 2,],
    'no-param-reassign': 'off',
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'default-param-last': 0,
    'prettier/prettier': [
      'error',
      { endOfLine: 'auto' }
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'no-console': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
}
