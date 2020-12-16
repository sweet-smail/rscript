module.exports = {
  parser: '@typescript-eslint/parser', //替代掉默认的Espree解析器

  plugins: ['react', '@typescript-eslint'], //包扩展支持React语法,提供额外的ts 语法的规则
  rules: {
    // 禁止使用 var
    'no-var': 'error',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  },
}
