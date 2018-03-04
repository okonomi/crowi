const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
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
    devtool: 'inline-source-map',
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
    ],
  },
  {
    entry: {
      crowi: './resource/css/crowi.scss',
    },
    output: {
      path: path.resolve(__dirname, 'public/css'),
      filename: '[name].css'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /.scss?$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader',
              }
            ]
          })
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'file-loader',
          options: {
            name: '../fonts/[name].[ext]',
          }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
    ],
  },
];
