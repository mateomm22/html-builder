const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
require('dotenv').config();

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const envKeys = new webpack.DefinePlugin({
  API_KEY: JSON.stringify(process.env.API_KEY),
  AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
  BASE_URL: JSON.stringify(process.env.BASE_URL),
  PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
  BUCKET: JSON.stringify(process.env.BUCKET),
  SENDER_ID: JSON.stringify(process.env.SENDER_ID),
});

module.exports = {

  output: {
    filename: 'bundle.js',
    path: path.resolve('public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  stats: {
    errorDetails: true,
  },
  // Server settings
  devServer: {
    // Change default host and port
    host: '10.50.8.27',
    port: 3000,
    // Settings to Router
    historyApiFallback: true,
  },
  plugins: [htmlWebpackPlugin, envKeys],
  node: {
    fs: 'empty',
  },
};
