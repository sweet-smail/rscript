import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { configs } from './parse.config';
const plugins: webpack.Configuration['plugins'] = [];
// 如果是多入口，则需要添加plugin
if (configs.pages && Object.keys(configs.pages).length > 0) {
	for (let pageKey in configs.pages) {
		plugins.push(
			new HtmlWebpackPlugin({
				template: path.resolve(process.cwd(), 'public/index.html'),
				filename: `${pageKey}.html`,
				title: pageKey,
				chunks: [pageKey],
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
		})
	);
}

if (process.env.NODE_ENV === 'development') {
	plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new ForkTsCheckerWebpackPlugin({
			async: false,
			formatter: undefined,
		})
	);
} else {
	plugins.push(
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `${configs.assetsDir}/css/[name].[contenthash:8].css`,
			chunkFilename: `${configs.assetsDir}/css/[name].[contenthash:8].chunk.css`,
		})
	);
}
export default plugins;
