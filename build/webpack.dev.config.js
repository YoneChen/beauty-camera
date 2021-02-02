const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config.js');
const entry = require('./entry');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 9008,
    https: true,
    hot: true,
    disableHostCheck: true,
    watchContentBase: true,
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: '/index.html',
        },
      ],
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //   from: 'src/wasm/**/*',
    //   to: 'assets/[name].[ext]'
    // }]}),
    ...Object.keys(entry).map(key => new HtmlWebpackPlugin({
      title: key,
      filename: `html/${key}.html`,
      template: 'src/index.html',
      chunks: ['core',key]
    })),
  ],
});
