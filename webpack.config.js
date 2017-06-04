const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devEnv = process.env.NODE_ENV === 'development';

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: devEnv,
});

module.exports = {
  context: path.join(__dirname, 'client'),

  entry: ['./main'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['env'] },
        }],
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|jpg|svg|otf|ttf|eot|woff|woff2)$/,
        use: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },

  plugins: [extractSass],
};

if (devEnv) {
  module.exports.entry.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin() // eslint-disable-line
  );
}

if (!devEnv) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      unused: true,
      dead_code: true,
      warnings: false,
    }) // eslint-disable-line
  );
}
