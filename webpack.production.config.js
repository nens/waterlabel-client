var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': '"production"',
  },
});

var config = {
  // We disable sourcemap generation entirely
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      title: 'Waterlabel',
      template: 'index.template.html',
    }),
    new webpack.optimize.UglifyJsPlugin({
      // sourceMap: false,
      compress: {
        warnings: false
      }
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        loader: 'transform/cacheable?brfs',
      },
      { test: /\.(png|jpg|svg|woff|eot|ttf|otf)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [definePlugin],
};

module.exports = config;
