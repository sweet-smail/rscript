import webpack from 'webpack';
import path from 'path';
import rconfig from './resolve.config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
const { assetsDir, pluginOptions, plugins } = rconfig;
const pluginsConfig = [
  new webpack.BannerPlugin({
    banner:
      'hash:[hash] \n chunkhash:[chunkhash] \n  name:[name] \n filebase:[filebase] \n  query:[query] \n  file:[file]',
  }),
  ...plugins,
];
if (process.env.NODE_ENV === 'development') {
  pluginsConfig.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new ForkTsCheckerWebpackPlugin({
      async: false,
      formatter: undefined,
    })
  );
} else {
  pluginsConfig.push(
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: `${assetsDir}/css/[name].[contenthash:8].css`,
      chunkFilename: `${assetsDir}/css/[name].[contenthash:8].chunk.css`,
    })
  );
}
export default pluginsConfig;
