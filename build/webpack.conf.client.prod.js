const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.conf.base')

const config = merge(baseConfig, {
  mode: 'production',
  entry: ['@babel/polyfill', path.join(__dirname, '../src/client/index.js')],
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist/static'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: '../index.html',
      favicon: './static/images/favicon.ico',
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunks-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        commons: {
          name: 'chunks-commons',
          chunks: 'initial',
          minSize: 0,
          minChunks: 2, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  }
})

module.exports = config
