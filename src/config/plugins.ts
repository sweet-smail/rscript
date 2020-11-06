import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
const StatsPlugin = require('stats-webpack-plugin');
import { configs } from './parse.config';

const plugins: webpack.Configuration['plugins'] = [];

// 如果是多入口，则需要添加plugin
const htmlWebpackPluginMinify = {
	removeComments: true,
	collapseInlineTagWhitespace: true,
	removeRedundantAttributes: true,
	useShortDoctype: true,
	minifyJS: true,
	minifyCSS: true,
	minifyURLs: true,
};
if (configs.pages && Object.keys(configs.pages).length > 0) {
	for (let pageKey in configs.pages) {
		plugins.push(
			new HtmlWebpackPlugin({
				template: path.resolve(process.cwd(), 'public/index.html'),
				filename: `${pageKey}.html`,
				title: pageKey,
				chunks: [pageKey],
				minify: htmlWebpackPluginMinify,
				...(configs.pages as any)[pageKey],
			})
		);
	}
} else {
	plugins.push(
		new HtmlWebpackPlugin({
			template: path.resolve(process.cwd(), 'public/index.html'),
			favicon: configs.favicon,
			filename: `index.html`,
			inject: true,
			minify: htmlWebpackPluginMinify,
		})
	);
}
if (process.env.NODE_ENV === 'development') {
	plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		//用单独一个进城来进行 ts类型检查
		new ForkTsCheckerWebpackPlugin({
			// async: false, // 错误信息是否影响webpack编译
		})
	);
} else {
	plugins.push(
		new CleanWebpackPlugin(),
		new StatsPlugin('stats.json', {
			chunkModules: true,
			exclude: [/node_modules[\\\/]react/],
		}),
		new MiniCssExtractPlugin({
			filename: configs.hash
				? `${configs.assetsDir}/css/[name].[contenthash:8].css`
				: `${configs.assetsDir}/css/[name].css`,
			chunkFilename: configs.hash
				? `${configs.assetsDir}/css/[name].[contenthash:8].chunk.css`
				: `${configs.assetsDir}/css/[name].chunk.css`,
		})
	);
}
if (configs.analyze) {
	plugins.push(
		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			analyzerHost: '127.0.0.1',
			analyzerPort: 60000,
			reportFilename: 'analyzer.html',
			openAnalyzer: true,
			generateStatsFile: true,
		})
	);
}
export default plugins;
