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
    publicPath: '/'
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: '../index.html',
      favicon: './static/images/favicon.ico',
      inject: true
    })
  ]
})


module.exports = config
