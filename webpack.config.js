var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require(`path`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.traceDeprecation = true


module.exports = {
  mode: 'development',
  entry: [`./src/index.js`, './public/scss/index.scss',],
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `build`),
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: false,
    port: 2000,
    historyApiFallback: true,
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader', // post process the compiled CSS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            encoding: 'base64'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devtool: `source-map`,
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale$/),
    new MiniCssExtractPlugin()
  ]
}
