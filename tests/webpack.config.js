const path = require('path');

module.exports = {
  mode: 'development',
  entry: './tests/lokalify.test.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        type: 'json',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  output: {
    filename: 'lokalify.test.js',
    path: path.resolve(__dirname, '../dist/tests'),
  },
};