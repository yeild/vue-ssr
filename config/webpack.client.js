const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
module.exports = merge(baseConfig, {
  entry: './src/entry-client.js',
  plugins: [
    new VueSSRClientPlugin()
  ],
  optimization: {
    runtimeChunk: {
      name: "manifest"
    }
  }
})