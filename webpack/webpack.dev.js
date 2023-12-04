const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: '3000',
    historyApiFallback: true,
  },
  resolve: {
    fallback: {
      path: false,
      os: false,
      crypto: false,
    },
  },
  output: {
    publicPath: '/',
  },
  plugins: [new MiniCssExtractPlugin()],
}
