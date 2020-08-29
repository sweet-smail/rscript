const path = require('path');
module.exports = {
  entery: path.resolve(__dirname, '../src/index.tsx'),
  publicPath: '/',
  //构建文件存放的目录
  outputDir: 'dist',
  //构建的静态资源存放的目录(默认为assets)
  assetsDir: 'assets',
  //指定生成的index.html输出的路径
  indexPath: '',
  //devServer 配置
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://47.108.135.38:60003',
    //   },
    // },
  },

  //自定义webpack
  configureWebpack: {},
  css: {
    //生产环境下是 true，开发环境下是 false
    extract: {},
    //是否为 CSS 开启 source map
    sourceMap: false,
    //向 CSS 相关的 loader 传递选项
    loaderOptions: {
      //css loader
      css: {},
      //postcss
      postcss: {},
      scss: {},
      less: {},
    },
  },
};
