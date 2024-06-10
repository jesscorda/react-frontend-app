const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const BASE_PATH = path.resolve(__dirname, '');
const APP_PATH = `${BASE_PATH}/src`;
const DIST_PATH = `${BASE_PATH}/build`;

module.exports = (env) => {
  return {
    entry: `${APP_PATH}/index.tsx`,
    output: {
      path: DIST_PATH,
      filename: 'bundle.js',
      publicPath: '/',
    },
    devtool: 'cheap-module-source-map',
    devServer: {
      static: {
        directory: DIST_PATH,
      },
      compress: true,
      historyApiFallback: true,
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['tsx', 'ts'],
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(APP_PATH, 'index.html'),
        favicon: path.join(APP_PATH, 'favicon.ico'),
      }),
      new webpack.DefinePlugin({
        TARGET_ENV: JSON.stringify(env.TARGET_ENV),
        APP_VERSION: JSON.stringify(env.APP_VERSION),
        SERVICE_URL: JSON.stringify(env.SERVICE_URL),
      }),
    ],
    resolve: {
      alias: {
        '@': APP_PATH,
      },
      extensions: ['.ts', '.tsx', '.jsx', '.js'],
    },
  };
};
