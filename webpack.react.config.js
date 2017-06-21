const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, './src'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        use: ExtractWebpackPlugin.extract({
          use: 'css-loader',
        }),
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin('./dist'),
    new  webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new ExtractWebpackPlugin('styles.css'),
    new HtmlWebpackPlugin({
      title: 'react + webpack demo',
      filename: 'index.html',
      template: './index.html',
      // 给引入的 script 标签排序。
      chunksSortMode: 'dependency',
    }),
  ],
};
