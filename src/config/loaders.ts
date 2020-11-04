import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
	configs,
	getCssloaderOptions,
	getPostLoaderOptions,
	getLessLoaderOptions,
	getSassLoaderOptions,
	getStyleLoaderOptions,
	getBableOptions,
} from './parse.config';
const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;

const lessModuleRegex = /\.module\.less$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

/**
 *
 * @param cssOptions
 * @param preProcessor
 * @description 处理样式loader
 */
const getStyleLoaders: (
	cssOptions?: any,
	preProcessor?: any
) => webpack.RuleSetRule[] = (cssOptions, preProcessor) => {
	const loaders: any = [
		isDev && {
			loader: 'style-loader',
			options: {
				...getStyleLoaderOptions(),
			},
		},
		isProduction && MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: cssOptions,
		},
		{
			loader: 'postcss-loader',
			options: getPostLoaderOptions(),
		},
	].filter(Boolean);
	if (preProcessor) {
		loaders.push(preProcessor);
	}
	return loaders;
};
const rules: webpack.ModuleOptions['rules'] = [
	{
		test: /\.(ts|js)x?$/,
		exclude: /node_modules/,
		use: [
			{
				loader: path.resolve(__dirname, '../../node_modules/babel-loader'),
				options: {
					cacheDirectory: isDev ? true : false,
					cacheCompression: true,
					compact: !isDev,
					...getBableOptions(),
				},
			},
		],
	},
	//css 编译
	{
		test: cssRegex,
		exclude: cssModuleRegex,
		use: getStyleLoaders({
			importLoaders: 1,
			...getCssloaderOptions(),
		}),
	},
	//less 编译
	{
		test: lessRegex,
		exclude: lessModuleRegex,
		use: getStyleLoaders(
			{},
			{
				loader: 'less-loader',
				options: getLessLoaderOptions(),
			}
		),
	},
	//sass 编译
	{
		test: sassRegex,
		exclude: sassModuleRegex,
		use: getStyleLoaders(
			{
				importLoaders: 3,
			},
			{
				loader: 'sass-loader',
				options: getSassLoaderOptions(),
			}
		),
	},
	{
		test: /\.(png|jpg|gif|ico)$/i,
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: configs.inlineLimit,
					name: `${configs.assetsDir}/media/imgs/[name].[hash:8].[ext]`,
				},
			},
		],
	},
	{
		test: /\.(woff|woff2|eot|ttf|otf|obj|gltf)$/,
		use: [
			{
				loader: 'url-loader',
				options: {
					name: `${configs.assetsDir}/media/fonts/[name].[hash:8].[ext]`,
				},
			},
		],
	},
];
export default rules;
