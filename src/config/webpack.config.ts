import webpack from "webpack";
import path from "path";
import { getEntrys, getOutput, getDevtool, configs } from "./parse.config";
import plugins from "./plugins";
import moduleRules from "./loaders";
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
const webpackConfig: webpack.Configuration = {
  entry: getEntrys(),
  output: getOutput(),
  resolve: {
    alias: configs.alias,
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  // recordsPath: path.resolve(process.cwd(), 'dist/records.json'),
  // profile: isProduction,
  // performance: {
  //   hints: "warning",
  //   maxEntrypointSize: 250000,
  //   maxAssetSize: 250000
  // },
  target: ["web", "es5"],
  externals: configs.externals,
  optimization: {
    minimize: isProduction, //使用TerserPlugin压缩
    moduleIds: "deterministic",
    runtimeChunk: true,
    removeEmptyChunks: true, //移除空的模块
    mergeDuplicateChunks: true, // 合并具有相同的模块
    splitChunks: {
      chunks: "all", // 为所有的chunk 提取公共文件 默认为async 则为所有异步加载的chunk 提取公共文件
      // 按照某种规则进行拆分
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          idHint: "vendors",
          chunks: "all"
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  mode: isDevelopment ? "development" : "production",
  devtool: getDevtool(),
  plugins: plugins,
  module: {
    rules: moduleRules
  }
};
export default webpackConfig;
