const webpack = require('webpack');
const path = require("path");
const HTMLPlugin = require('html-webpack-plugin');

const outputFolder = "./dist";
const indexTemplate = new HTMLPlugin({
  template: './src/index.html',
  //favicon: './src/favicon.ico',
  minify: {
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
  },
});

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/App.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    indexTemplate,
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    compress: true,
    port: 9000,
  }
};
