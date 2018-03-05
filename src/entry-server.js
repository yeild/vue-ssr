import { createApp } from './app'

export default context => {
  const { app, router } = createApp(context.data)
  router.push(context.url)
  return app
}