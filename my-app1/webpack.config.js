const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const webpack = require('webpack')
module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: "http://localhost:3000/",
  },
  mode: 'development', // none | development | production
  devServer: {
    port: 3000,
    static: path.resolve(__dirname, './build')
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
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@http://localhost:3001/remoteEntry.js'
      },
      exposes: {
        './Product': './src/pages/Product'
      },
      shared: {react: {singleton: true}, "react-dom": {singleton: true}}
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html", 
    }),
    new CleanWebpackPlugin(),
    new ExternalTemplateRemotesPlugin(),
    new webpack.ProvidePlugin({
      "React": "react",
   }),
  ]
}