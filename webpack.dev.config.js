var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/app.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'game.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
      phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
      p2: path.join(__dirname, 'node_modules/phaser-ce/build/custom/p2.js'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'DEBUG': true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'templates/index.ejs')
    })
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, 'dist'),
      path.join(__dirname, 'assets'),
    ],
    setup: app => {
      app.get(/^\/assets\/.*/, (req, res, next) => {
        // We want to request assets using their full path in the code, but serve them from the `assets` directory.
        // So webpack-dev-server needs to get rid of the `assets` part of that path since that's one of the content bases.
        req.url = req.url.replace(/^\/assets/, "");
        next();
      });
    },
    compress: true,
    port: 9000,
    inline: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
      ignored: /node_modules/
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader'
      },
      {
        include: path.resolve(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
        loader: 'expose-loader',
        options: 'PIXI'
      },
      {
        include: path.resolve(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
        loader: 'expose-loader',
        options: 'Phaser'
      },
      {
        include: path.resolve(__dirname, 'node_modules/phaser-ce/build/custom/p2.js'),
        loader: 'expose-loader',
        options: 'p2'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  devtool: 'source-map'
};
