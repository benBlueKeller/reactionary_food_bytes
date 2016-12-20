
var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './app/app.jsx',
  output: { path: __dirname + "/public", filename: 'bytes.bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolveLoader: {
    root: path.join('C:/Users/cloudJumper/AppData/Roaming/npm/node_modules')
  },
};
