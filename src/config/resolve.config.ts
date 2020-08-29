import lodash from 'lodash';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import defaultConfig from './r.config';
import { isExitsFile } from '../utils/file';
const userConfigPath = path.resolve(process.cwd(), 'config/r.config.js');

let config: any = defaultConfig;

if (isExitsFile(userConfigPath)) {
  const mergeConfig = lodash.mergeWith(defaultConfig, require(userConfigPath));
  const entry: any = {};
  const plugins: any[] = [];
  for (let pagesKey in mergeConfig.pages) {
    const pageConfigValue = mergeConfig.pages[pagesKey];
    if (typeof pageConfigValue === 'string') {
      entry[pagesKey] = mergeConfig.pages[pagesKey];
      plugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(process.cwd(), 'config/index.html'),
          filename: `${pagesKey}.html`,
          title: pagesKey,
          chunks: [pagesKey],
        })
      );
    }
    if (typeof pageConfigValue === 'object') {
      const { entry: userEntry, ...rest } = mergeConfig.pages[pagesKey];
      entry[pagesKey] = userEntry;
      plugins.push(new HtmlWebpackPlugin(rest));
    }
  }
  config = { ...mergeConfig, entry, plugins };
}

export default config;
