var ExtractTextPlugin = require('extract-text-webpack-plugin');

function getDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    return 'source-map'; //enables source map
  }

  return false;
}

module.exports = {
  entry: {
    main: './src/scripts/main.js',
  },
  output: {
    filename: 'dist/scripts/[name].js',
  },
  devtool: getDevTool(),
  devServer: {
    port: 3000,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'dist/styles/main.css',
      allChunks: true,
    }),
  ],
};
