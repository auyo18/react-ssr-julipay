const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.conf.base')

const config = merge(baseConfig, {
  mode: 'development',
  entry: ['@babel/polyfill', path.join(__dirname, '../src/client/index.js')],
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: path.join(__dirname, '../dist/static'),
    publicPath: 'http://127.0.0.1:3000'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    proxy: {
      '/api': {
        target: 'https://api.julipay.com',
        changeOrigin: true,
        secure: false, // 接受 运行在 https 上的服务
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      favicon: './static/images/favicon.ico',
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
})


module.exports = config
