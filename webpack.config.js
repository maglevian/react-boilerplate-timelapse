const webpack = require('webpack');
const path = require("path");
const HTMLPlugin = require('html-webpack-plugin');
const isProduction = !process.env.DEBUG === 'production';
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const outputFolder = "./dist";
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtractor = new ExtractTextPlugin('App.css');

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
  mode: !process.env.DEBUG ? 'development' : 'production',
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
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
      },
      // Styles loader
      {
        test: /\.s|css$/,
        exclude: [/node_modules/, /\.svg$/],
        use: ExtractTextPlugin.extract({
          publicPath: '../../',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[local]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },

      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader',
      }, // Assets
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
    CSSExtractor,
    new UglifyJSPlugin(),
  ],
  // Source maps
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  // Webpack Dev Server configuration
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    stats: {
      all: false,
      warnings: true,
      errors: true,
      errorDetails: true
    },
    compress: true,
    port: 9000,
  }
};
