const path = require('path');
const entry = require('./entry');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}
module.exports = {
  // context: path.resolve(__dirname, '../'),
  entry: {
    core: 'three',
    ...entry
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': resolve('../src'),
    },
  },
  module: {
    rules: [
    {
      test: /\.(ts|tsx)?$/,
      loader: 'ts-loader',
      include: [
        resolve('../src/'),
      ],
    },
    {
      test: /\.(wav|mp3|ogg|png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        limit: 1000000,
        name: 'assets/[name].[hash:7].[ext]',
      },
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]',
      },
    },
    {
      test: /\.(vs|fs)$/,
      use: 'raw-loader',
    },
    ],
  },
};
