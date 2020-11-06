import path from 'path';
import webpack, { Configuration } from 'webpack';
import lodash from 'lodash';
import fs from 'fs';
import defaultConfig from './default.config';
const isProduction = process.env.NODE_ENV === 'production';
const userConfigPath = path.resolve(process.cwd(), 'config/config.js');
const rootSource = process.cwd();
// 处理配置文件不存的情况
const getConfigs = () => {
	if (!fs.existsSync(userConfigPath)) {
		return defaultConfig;
	}
	// console.log('合并对象', lodash.merge(defaultConfig, require(userConfigPath)));
	return lodash.merge(
		defaultConfig,
		require(userConfigPath)
	) as typeof defaultConfig;
};

export const configs = getConfigs();

/**
 * @description 处理webpack 入口
 * @returns webpack.Entry
 */
export const getEntrys: () => webpack.Entry = () => {
	const webpackHotMidlleClient =
		path.resolve(
			__dirname,
			'../../node_modules/webpack-hot-middleware/client.js'
		) + '?path=/__webpack_hmr&timeout=20000&quiet=true&overlayWarnings=true';
	// 如果是多页面配置
	if (!!configs.pages && Object.keys(configs.pages).length > 0) {
		const entryObject: webpack.Entry = {};
		for (let pageKey in configs.pages) {
			entryObject[pageKey] = [
				!isProduction && (configs.pages as any)[pageKey].entry,
				webpackHotMidlleClient,
			].filter(Boolean) as [];
		}
		return entryObject;
	}
	return [configs.entry, !isProduction && webpackHotMidlleClient].filter(
		Boolean
	) as [];
};

/**
 * @description 处理出口
 */
export const getOutput: () => Configuration['output'] = () => {
	if (!configs.hash) {
		return {
			pathinfo: false,
			publicPath: configs.publicPath,
			filename: `${configs.assetsDir}/js/[name].js`,
			chunkFilename: `${configs.assetsDir}/js/[name].chunk.js`,
			path: path.resolve(rootSource, configs.outPutDir),
		};
	}
	return {
		publicPath: configs.publicPath,
		pathinfo: false,
		filename: isProduction
			? `${configs.assetsDir}/js/[name].[chunkhash:8].js`
			: `${configs.assetsDir}/js/[name].js`,
		chunkFilename: isProduction
			? `${configs.assetsDir}/js/[name].[chunkhash:8].chunk.js`
			: `${configs.assetsDir}/js/[name].chunk.js`,
		path: path.resolve(rootSource, configs.outPutDir),
	};
};

export const getDevtool: () => Configuration['devtool'] = () => {
	return configs.devtool || isProduction
		? false
		: 'eval-cheap-module-source-map';
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
				[require.resolve('postcss-preset-env'), {}],
				[require.resolve('autoprefixer'), { ...configs.autoprefixer }],
				...configs.extraPostCSSPlugins,
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
		...configs.lessLoader,
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
	console.log(configs.targets);
	return {
		presets: [
			[
				require('@babel/preset-env'),
				{
					useBuiltIns: 'usage',
					modules: false,
					targets: configs.targets,
				},
			],
			require('@babel/preset-typescript'), // 转换ts代码
			require('@babel/preset-react'),
			...configs.extraBabelPresets,
		],
		plugins: [...configs.extraBabelPlugins],
	};
};
