import path from 'path';
import webpackMerge from 'webpack-merge';
import rConfig from '../config/resolve.config';
import plugins from './plugins';
import loaders from './loaders';
import webpack from 'webpack';

const { assetsDir, publicPath, outputDir, configureWebpack, entry } = rConfig;
const isProduction = process.env.NODE_ENV === 'production';
const root = process.cwd();
interface Ientery {
  [propIndex: string]: string;
}
/**
 * @deprecated 合并entry
 * @param entrys
 */
function getEntrys(entrys: Ientery) {
  const newEntrys: any = {};
  for (let k in entrys) {
    newEntrys[k] = [
      !isProduction && 'webpack-hot-middleware/client?reload=true',
      entrys[k],
    ].filter(Boolean);
  }
  return newEntrys;
}

const webpackConfig = {
  entry: getEntrys(entry),
  output: {
    publicPath: publicPath,
    filename: `${assetsDir}/js/bundle.js`,
    chunkFilename: isProduction
      ? `${assetsDir}/js/[hash].chunk.js`
      : `${assetsDir}/js/[name].chunk.js`,
    path: path.resolve(root, outputDir),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    //告知 webpack 使用可读取模块标识符,默认会在 mode development 启用，在 mode production 禁用。
    namedModules: !isProduction,
    //告知 webpack 使用可读取 chunk 标识符,默认会在 mode development 启用，在 mode production 禁用。
    namedChunks: !isProduction,
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  plugins: plugins,
  module: {
    rules: loaders,
  },
};
console.log('webpackConfig', webpackConfig);
export default webpackConfig;
