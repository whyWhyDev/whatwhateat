const webpack = require('webpack');
const path = require('path');

module.exports = {
  // set mode to production or development
  mode: process.env.NODE_ENV,
  entry: './client/App.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  devServer: {
    publicPath: '/dist/',
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    proxy: {
      '/': 'http://localhost:3000',
    },
  },
  // QUESTION - How do we Make sure that Babel isn't being run on node_modules?
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // /\.jsx?/
        exclude: /(node_modules)/, ///(node_modules|bower_components)/
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime', 'transform-class-properties'],
          },
        },
      },
      {
        test: /\.css$/,
        // exclude: /(node_modules|bower_components)/,
        use: [
          // Creates 'style' nodes from JS strings
          'style-loader',
          //T ranslates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // fallback: {
    //   fs: false,
    //   os: false,
    //   vm: false,
    //   tls: false,
    //   net: false,
    //   path: false,
    //   util: false,
    //   zlib: false,
    //   http: false,
    //   assert: false,
    //   buffer: false,
    //   https: false,
    //   stream: false,
    //   crypto: false,
    //   constants: false,
    //   // "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    // },
  },
};
