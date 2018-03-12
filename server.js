const fs = require('fs')
const axios = require('axios')
const Koa = require('koa')
const Router = require('koa-router')
const assets = require('koa-static')('./dist')
const server = new Koa()
const router = new Router()

server.use(assets)
server.use(router.routes())

const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const template = require('fs').readFileSync('./index.template.html', 'utf-8')
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

router.get('*', async ctx => {
  const context = { url: ctx.req.url }
  await renderer.renderToString(context, (err, html) => {
    if (err) throw err
    
    console.log(html)
    ctx.body = html
  })
})

server.listen(3000, function () {
  console.log('>localhost:3000')
})

