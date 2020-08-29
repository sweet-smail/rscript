import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import rconfig from './resolve.config';
import webpack from 'webpack';
const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const {
  css: { loaderOptions },
  outputDir,
} = rconfig;
/**
 *
 * @param cssOptions
 * @param preProcessor
 */
const getStyleLoaders: (
  cssOptions?: any,
  preProcessor?: any
) => webpack.RuleSetLoader[] = (cssOptions, preProcessor) => {
  const loaders: any = [
    isDev && 'style-loader',
    isProduction && MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
      options: loaderOptions.postcss,
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(preProcessor);
  }
  return loaders;
};
const loaders: webpack.Module['rules'] = [
  {
    test: /\.(ts|js)x?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDev ? true : false,
          cacheCompression: false,
          compact: !isDev,
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
      ...rconfig.css.loaderOptions.css,
    }),
  },
  //css module 编译
  {
    test: cssModuleRegex,
    use: getStyleLoaders({
      ...loaderOptions.css,
      modules: {
        auto: true,
      },
      importLoaders: 1,
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
        options: loaderOptions.less,
      }
    ),
  },
  //less module 编译
  {
    test: lessModuleRegex,
    use: getStyleLoaders(
      {
        importLoaders: 3,
        modules: true,
      },
      {
        loader: 'less-loader',
        options: loaderOptions.less,
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
        options: loaderOptions.scss,
      }
    ),
  },
  //sass module 编译
  {
    test: sassModuleRegex,
    use: getStyleLoaders(
      {
        importLoaders: 3,
        modules: true,
      },
      {
        loader: 'sass-loader',
        options: loaderOptions.scss,
      }
    ),
  },

  {
    test: /\.(png|jpg|gif|ico)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `${outputDir}/media/[name].[hash:8].[ext]`,
        },
      },
    ],
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: `${outputDir}/media/[name].[hash:8].[ext]`,
        },
      },
    ],
  },
];
export default loaders;
