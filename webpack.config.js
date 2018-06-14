const webpack = require('webpack');

module.exports = {
  entry: [ './src/App.jsx' ],
  output: {
    path: __dirname,
    filename: "app.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-class-properties'],
        env: {
          development: {
            presets: ['react-hmre']
          }
        }
      }
    }]
  },
  watchOptions: {
    poll: 1000
  },
  devServer: {
    historyApiFallback: {
      index: '/'
    }
  }
};
