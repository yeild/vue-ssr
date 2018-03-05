const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          "vue-loader"
        ]
      }
    ]
  }
}