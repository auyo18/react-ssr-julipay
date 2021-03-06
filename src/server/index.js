import React from 'react'
import path from 'path'
import Koa from 'koa'
import Static from 'koa-static'
import compress from 'koa-compress'
import {render} from '../utils'
import {getStore} from '../store'
import {matchRoutes} from 'react-router-config'
import routes from '../routes'

const isDev = process.env.NODE_ENV === 'development'

const app = new Koa()

app.use(compress({threshold: 2048}))

if (isDev) {
  app.use(Static(path.join(__dirname, '/')))
}

app.use(async ctx => {
  const context = {}
  const path = ctx.path
  const store = getStore()
  const matchedRoutes = matchRoutes(routes, path) || []

  for (let i = 0, len = matchedRoutes.length; i < len; i++) {
    let matchedRoute = matchedRoutes[i]
    matchedRoute.route && matchedRoute.route.loadData && await matchedRoute.route.loadData(store, path)
  }

  try {
    const html = await render(ctx, store, routes, context)
    if (context.NotFound) {
      ctx.status = 404
    }
    ctx.body = html
  } catch (e) {
    console.log(e)
    ctx.body = 'error'
  }
})

app.listen(3000)
