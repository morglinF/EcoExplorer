const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './cors-proxy/server.js', // Adjust based on your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output folder
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // If you're using Babel
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // For CSS files
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
