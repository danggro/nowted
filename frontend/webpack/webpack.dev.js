const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: '3000',
    historyApiFallback: true,
    allowedHosts: ['nowted-frontend-dev'],
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
