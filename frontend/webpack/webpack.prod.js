const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: 'bundle.[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
        },
      }),
    ],
  },
}
