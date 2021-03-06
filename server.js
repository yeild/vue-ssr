const fs = require('fs')
const path = require('path')
const axios = require('axios')
const Koa = require('koa')
const Router = require('koa-router')
const assets = require('koa-static')('./dist')
const server = new Koa()
const router = new Router()

server.use(assets)
server.use(router.routes())

const isProd = process.env.NODE_ENV === 'production'
const { createBundleRenderer } = require('vue-server-renderer')
const templatePath = path.resolve('./index.template.html')
let renderer

if (isProd) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  const template = fs.readFileSync(templatePath, 'utf-8')
  renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest
  })
} else {
  const devServer = require('./devServer')
  devServer(server, templatePath, (bundle, options) => {
    renderer = createBundleRenderer(bundle, options)
  })
}

function render(context) {
  return new Promise(function (resolve) {
    renderer.renderToString(context, (err, html) => {
      if (err) resolve(err)
      resolve(html)
    })
  })
}

router.get('*', async (ctx) => {
  const context = { url: ctx.req.url}
  ctx.body = await render(context)
})

server.listen(3000, function () {
  console.log('>localhost:3000')
})

