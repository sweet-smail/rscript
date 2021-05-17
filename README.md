## rca
个人使用的脚手架，如果需要在企业内部使用，请慎重。

## Getting Started

### install
npm install -g rca
### create app
rca create app


## options 

###  outPutDir

Type: string

Default: "dist"

打包目录
### publicPath
Type: string

Default:"/"

和webpack publicPath 一样，当需要配置cdn地址的时候可能需要手动配置，一般不需要改变

### assetsDir

Type: string

Default:"assest"

静态资源打包目录。注意和outPutDir 的区别

### entry

打包入口文件，具体配置指南可以查看[webpack entry配置](https://webpack.docschina.org/configuration/entry-context/#entry)

### pages

当接收到一个对象的时候，将会认为是多页应用打包
```
entry:{
  index:{
		// 页面入口
		entry: path.resolve(process.cwd(), 'src/index.tsx'),
		// 页面模板文件，如果没有配置则默认指向public index.html
		template: path.resolve(process.cwd(), 'public/index.html'),
		// 文件名，默认取key
		filename: 'index.html',
		// 页面标题 默认取 key
		title: 'Index Page',
		//包含的模块文件 默认是key
		chunks: ['index'],
	},
  ...
}
```
### alias
### devtool

默认在 开发环境选用"cheap-module-source-map",生产环境使用false
### externals


### extraPlugins
额外的webpack插件

### hash

### inlineLimit



配置图片文件是否走base64的编译的阈值
### extraBabelPresets

### extraBabelPlugins
配置额外得babel插件，例如使用[bable-plugin-import](https://github.com/ant-design/babel-plugin-import#readme)
```
extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        style: 'css',
      },
    ],
  ]
```
### analyze
打包资源分析，使用得是[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)插件




### autoprefixer


### cssLoader


### lessLoader
### styleLoader
### sassLoader

### postCssLoader


### extraPostCSSPlugins


### copy


### targets

```
 process.env.NODE_ENV === "development"
      ? "last 1 version"
      : ["> 1%", "ie 11"],
```
