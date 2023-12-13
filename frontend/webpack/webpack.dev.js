const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { EnvironmentPlugin } = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: '3000',
    historyApiFallback: true,
    allowedHosts: ['nowted-frontend'],
    client: {
      webSocketURL: 'ws://localhost:8080/ws',
    },
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
