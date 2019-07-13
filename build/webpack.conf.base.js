
let config = {
  node: {
    fs: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'url-loader'
      }
    ]
  }
}


module.exports = config
