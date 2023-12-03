const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    port: '3000',
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
  plugins: [new MiniCssExtractPlugin()],
}
