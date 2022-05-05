const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'virtual-keyboard/src/index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'virtual-keyboard/dist/'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    watchFiles: [path.resolve(__dirname, 'virtual-keyboard/src/template.html')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Virtual Keyboard',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
