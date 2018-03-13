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
  //mode: !process.env.DEBUG ? 'development' : 'production',
  entry: [
    './src/App.js',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, outputFolder),
    publicPath: '/',
    filename: 'App.js',
  },
  plugins: [
    indexTemplate,
  ],
  devServer: {
    contentBase: path.resolve(__dirname, outputFolder),
    compress: true,
    port: 9000,
  }
}
