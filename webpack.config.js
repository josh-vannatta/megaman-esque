const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/sass/index.scss'],
  mode: 'development',
  module: {
    rules: [{
      test: /\.(scss|sass)$/,
      loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    }, {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true,
    })
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/assets')
  },
}
