const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  output: {
    path: Path.join(__dirname, './build'),
    filename: 'index.[contenthash:8].js', // 推荐使用 contenthash 替代 hash
    clean: true // 👈 Webpack 5 原生清理，替代 CleanWebpackPlugin
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        // 👈 Webpack 5 原生 Asset Modules，替代 url-loader
        test: /\.woff2$/,
        type: 'asset/inline', // 对应原 limit: 65535 的 base64 内联行为
        parser: {
          dataUrlCondition: {
            maxSize: 65535 
          }
        }
      }
    ]
  },
  performance: {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      minify: { collapseWhitespace: true }
    })
  ]
};