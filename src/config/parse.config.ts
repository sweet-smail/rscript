import path from 'path';
import webpack, { config } from 'webpack';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackAnalyzer from 'webpack-bundle-analyzer';
import defaultWebpackPlugins from './plugins';
import defaultConfig from './default.config';
const isProduction = process.env.NODE_ENV === 'production';
const userConfigPath = path.resolve(process.cwd(), 'config/config.js');
const rootSource = process.cwd();

// 处理配置文件不存的情况
const getConfigs = () => {
	if (!fs.existsSync(userConfigPath)) {
		return defaultConfig;
	}
	return require(userConfigPath) as typeof defaultConfig;
};

export const configs = getConfigs();
/**
 * @description 处理webpack 入口
 */

export const getEntrys: () => webpack.Entry = () => {
	if (!!configs.pages && Object.keys(configs.pages).length > 0) {
		return configs.pages;
	}
	const newEntry =
		configs.entry || path.resolve(process.cwd(), 'src/index.tsx');
	return [
		path.resolve(
			__dirname,
			'../../node_modules/webpack-hot-middleware/client.js'
		) + '?path=/__webpack_hmr&timeout=20000',
		newEntry,
	];
};
/**
 * @description 处理出口
 */
export const getOutput = () => {
	if (!configs.hash) {
		return {
			publicPath: configs.publicPath,
			filename: `${configs.assetsDir}/js/bundle.js`,
			chunkFilename: `${configs.assetsDir}/js/[name].chunk.js`,
			path: path.resolve(rootSource, configs.outPutDir || 'dist'),
		};
	}
	return {
		publicPath: configs.publicPath,
		filename: isProduction
			? `${configs.assetsDir}/js/[name].[chunkhash:8].js`
			: `${configs.assetsDir}/js/bundle.js`,
		chunkFilename: isProduction
			? `${configs.assetsDir}/js/[name].[chunkhash:8].chunk.js`
			: `${configs.assetsDir}/js/[name].chunk.js`,
		path: path.resolve(rootSource, configs.outPutDir || 'dist'),
	};
};
export const getDevtool = () => {
	return configs.devtool || isProduction ? false : 'cheap-module-source-map';
};

/**
 * @description 获取webpack devServer的配置
 */
export const getDevServer = () => {
	const defaultDevServer = {
		port: 8080, // 默认运行端口
		host: '127.0.0.1',
		proxy: {},
	};
	return {
		...defaultDevServer,
		...configs.devServer,
	};
};
/**
 * @description 获取静态资源分析的配置
 */
const getAnalyze: () => any = () => {
	const defaultAnalyze = {};
	// 传递false,则代表不开启资源分析
	if (configs.analyze === false) {
		return undefined;
	}
	// 传递true或者空对象则代表使用默认配置
	if (configs.analyze === true || Object.keys(configs.analyze).length === 0) {
		return defaultAnalyze;
	}
	if (!!configs.analyze && Object.keys(configs.analyze).length > 0) {
		return configs.analyze;
	}
	return defaultAnalyze;
};
export const getCssloaderOptions = () => {
	return {
		...configs.cssLoader,
	};
};
/**
 * @description post-loader 相关配置项
 */
export const getPostLoaderOptions = () => {
	return {
		postcssOptions: {
			plugins: [
				['postcss-preset-env', {}],
				['autoprefixer', { ...configs.autoprefixer }],
				...configs.extraBabelPlugins,
			],
		},
		...configs.postCssLoader,
	};
};
export const getStyleLoaderOptions = () => {
	return {
		...configs.styleLoader,
	};
};
export const getLessLoaderOptions = () => {
	return {
		...configs.styleLoader,
	};
};
export const getSassLoaderOptions = () => {
	return {
		...configs.sassLoader,
	};
};

/**
 * @description bable配置
 */
export const getBableOptions = () => {
	return {
		presets: [
			[
				require('@babel/preset-env'),
				{
					useBuiltIns: 'entry',
					corejs: 3,
				},
			],
			require('@babel/preset-typescript'),
			require('@babel/preset-react'),
			...configs.extraBabelPresets,
		],
		plugins: [
			// '@babel/proposal-class-properties',
			// '@babel/proposal-object-rest-spread',
			// ...configs.extraBabelPlugins,
		],
	};
};
