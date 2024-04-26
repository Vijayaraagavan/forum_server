const path = require('path');
const webpack = require('webpack');module.exports = {
  entry: {
    app: [
      path.join(__dirname, './index.js'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    ],
  },
//   output: {
//     publicPath: '/static/js/',
//     path: filePath,
//     filename: fileName,
//     hotUpdateChunkFilename: '.hot/hot-update.js',
//     hotUpdateMainFilename: '.hot/hot-update.json',
//   },
  watchOptions: {
    ignored: '/node_modules/',
  },plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};