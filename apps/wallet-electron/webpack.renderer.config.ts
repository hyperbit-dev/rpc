import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.jsx?$/,
  use: {
    loader: 'babel-loader',
    options: {
      exclude: /node_modules/,
      presets: ['@babel/preset-react'],
    },
  },
});

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [require('tailwindcss'), require('autoprefixer')],
        },
      },
    },
  ],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
