import webpack from 'webpack';
import { getEntrys, getOutput, getDevtool, configs } from './parse.config';
import plugins from './plugins';
import moduleRules from './loaders';
const isDevelopment = process.env.NODE_ENV === 'development';
const webpackConfig: webpack.Configuration = {
	entry: getEntrys(),
	output: getOutput(),
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	externals: configs.externals,
	// optimization: {
	// 	minimize: false, // 是否压缩
	// 	runtimeChunk: {
	// 		name: (entrypoint: any) => `runtime-${entrypoint.name}`,
	// 	},
	// 	noEmitOnErrors: true,
	// 	removeEmptyChunks: true, // 删除空的模块
	// 	mergeDuplicateChunks: true, //合并相同得模块
	// 	splitChunks: {
	// 		chunks: 'all',
	// 		minChunks: 1, //共享模块得最小块数
	// 		maxInitialRequests: 30, // 入口点得最大并行请求
	// 		maxAsyncRequests: 30, //按需加载得时候最大并行请求
	// 		cacheGroups: {
	// 			commons: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: 'vendors',
	// 				chunks: 'all',
	// 			},
	// 		},
	// 	},
	// },
	mode: isDevelopment ? 'development' : 'production',
	devtool: getDevtool(),
	plugins: plugins,
	module: {
		rules: moduleRules,
	},
};
export default webpackConfig;
