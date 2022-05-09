const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    watchFiles: [
      path.resolve(__dirname, 'src/**/*.js'),
      path.resolve(__dirname, 'src/template.html'),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Virtual Keyboard',
      template: path.resolve(__dirname, 'src/template.html')
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
