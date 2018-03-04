const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    app:          './resource/js/app.js',
    crowi:        './resource/js/crowi.js',
    presentation: './resource/js/crowi-presentation.js',
    form:         './resource/js/crowi-form.js',
    admin:        './resource/js/crowi-admin.js',
    bundled:      './resource/js/bundled.js',
    polyfill:     'babel-polyfill',
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      }
    ]
  },
  plugins: [
    new ManifestPlugin(),
  ]
};
