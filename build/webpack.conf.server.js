const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.conf.base')

const isDev = process.env.NODE_ENV === 'development'

const config = merge(baseConfig, {
  mode: isDev ? 'development' : 'production',
  target: 'node',
  entry: ['@babel/polyfill', path.join(__dirname, '../src/server/index.js')],
  output: {
    filename: 'server.js',
    path: path.join(__dirname, '../dist/static'),
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'isomorphic-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
})

module.exports = config
