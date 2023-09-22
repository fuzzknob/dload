module.exports = {
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./apps/**/tsconfig.json'],
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    semi: ['error', 'never'],
  },
}
