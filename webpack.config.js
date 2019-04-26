const path = require('path')
const webpack = require('webpack')

const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlPlugin = require("html-webpack-plugin");

const isDEV = process.env.NODE_ENV === 'development';

const config = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          "stylus-loader",
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name]-aaa.[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDEV ? '"development"' : '"production"'
      }
    })
  ]
}

if (isDEV) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8087,
    host: "0.0.0.0",
    overlay: {
      erro: true
    },
    hot: true,
    open: false,
    disableHostCheck: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config;