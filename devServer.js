const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const MFS = require("memory-fs")
const clientConfig = require('./config/webpack.client')
const serverConfig = require('./config/webpack.server')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {
  }
}

let serverBundle, clientManifest
const mfs = new MFS()

const clientCompiler = webpack(clientConfig)
const serverCompiler = webpack(serverConfig)

clientCompiler.outputFileSystem = mfs
serverCompiler.outputFileSystem = mfs

module.exports = function (server, templatePath, cb) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const update = () => {
    if (serverBundle && clientManifest) {
      cb(serverBundle, {
        template,
        clientManifest
      })
    }
  }
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return
    serverBundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })
  clientCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return
    clientManifest = JSON.parse(readFile(mfs, 'vue-ssr-client-manifest.json'))
    update()
  })

}
