const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Check if the --analyze flag is present
const isAnalyze = process.argv.includes('--analyze');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'wall-clock-card.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      PACKAGE_VERSION: JSON.stringify(packageJson.version)
    }),
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
