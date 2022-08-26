const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[contenthash].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: "http://localhost:8080/",
  },
  mode: 'development', // none | development | production
  devServer: {
    port: 8080,
    static: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        }
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/,
        type: 'asset/resource'
      },
      {
        test: /\.json$/,
        type: 'asset/resource'
      },
      {
        test: /\.ico$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      remotes: {
        app1: 'app1@http://localhost:3000/remoteEntry.js',
        app2: 'app2@http://localhost:3001/remoteEntry.js'
      },
      shared: {react: {singleton: true}}
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html", 
    }),
    new CleanWebpackPlugin(),
    new ExternalTemplateRemotesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css' // file name export
    }),
    new webpack.ProvidePlugin({
      "React": "react",
   }),
  ]
}