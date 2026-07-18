const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { copyBundle } = require('./scripts/deploy');

// Check if the --analyze flag is present
const isAnalyze = process.argv.includes('--analyze');

// Tiny plugin: after each successful build, copy the bundle into the configured
// Home Assistant www folder (no-op if no destination is set). Makes `npm run watch`
// auto-deploy on every rebuild. See scripts/deploy.js for configuration.
class DeployToHomeAssistantPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('DeployToHomeAssistantPlugin', (compilation) => {
      if (compilation.errors && compilation.errors.length > 0) return;
      try {
        copyBundle({ silent: true });
      } catch (err) {
        console.warn(`[deploy] Copy failed: ${err.message}`);
      }
    });
  }
}

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
    new DeployToHomeAssistantPlugin(),
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
