const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { EnvironmentPlugin } = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: '3000',
    historyApiFallback: true,
  },
  resolve: {
    fallback: {
      path: 'path-browserify',
      os: false,
      crypto: false,
      url: 'url',
    },
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
}
