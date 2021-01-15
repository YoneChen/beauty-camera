
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const entry = require('./entry');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //   from: 'src/wasm/**/*',
    //   to: 'assets/[name].[ext]'
    // }]}),
    ...Object.keys(entry).map(key => new HtmlWebpackPlugin({
      title: key,
      filename: `html/${key}.html`,
      template: 'src/index.html',
      chunks: ['core',key],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    })),
  ],
});
