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

router.get('/', async ctx => {
  const res = await axios.get('https://news-at.zhihu.com/api/4/news/latest')
  await renderer.renderToString({url: ctx.url, data: res.data.stories}, (err, html) => {
    if (err) throw err
    ctx.body = html
  })
})
router.get('/news/:id', async ctx => {
  const res = await axios.get('https://news-at.zhihu.com/api/4/news/' + ctx.params.id)
  const d = res.data
  await renderer.renderToString({
    url: ctx.url,
    data: {
      body: d.body,
      image: d.image,
      title: d.title,
      css: d.css[0]
    }
  }, (err, html) => {
    if (err) throw err
    ctx.body = html
  })
})

server.listen(3000, function () {
  console.log('>localhost:3000')
})

