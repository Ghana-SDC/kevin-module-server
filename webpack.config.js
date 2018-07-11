const path = require('path');
const webpack = require('webpack');


// const SRC_DIR = path.resolve(__dirname, 'client');
// const BUILD_DIR = path.resolve(__dirname, 'static');

const common = {
  context: __dirname + '/client',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      }
    ]
  }
};

const client = {
  entry: './client.js',
  output: {
    path: __dirname + '/static',
    filename: 'app.js'
  }
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: __dirname + '/static',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];


// module.exports = {
//   entry: path.resolve(SRC_DIR, 'index.jsx'),
//   output: {
//     filename: 'bundle.js',
//     path: BUILD_DIR
//   },
//   mode: "production",
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: [/node_modules/],
//         use: [{
//           loader: 'babel-loader',
//           options: { presets: ['es2015', 'react'] }
//         }],
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ]
//   }
// }