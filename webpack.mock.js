/* eslint-disable */
// Disaling LINT for CommonsJS
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = (env) => {
  const mockEnv = env.localServe ? 'DEV' : 'MOCK';
  const backendUrl = env.backendUrl;

  return merge(
    commonConfig(mockEnv),
    {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.backendUrl': JSON.stringify(backendUrl),
        }),
        new CopyWebpackPlugin([
          { from: './extension-app/public/bundle.json', to: '' },
        ]),
        new CopyWebpackPlugin([
          { from: './node_modules/sms-dev-tool-mock-client/dist', to: '' },
        ]),
      ]
    },
    {
      mode: 'development',
      devtool: 'eval-source-map',

      devServer: {
        inline: true,
        port: 4000,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
      }
    })
};

