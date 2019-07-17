import React from 'react'
import path from "path"
import Koa from 'koa'
import Static from 'koa-static'
import staticCache from 'koa-static-cache'
import {render} from "../utils"
import {getStore} from "../store"
import {matchRoutes} from 'react-router-config'
import routes from '../routes'

const isDev = process.env.NODE_ENV === 'development'

const app = new Koa()

if (!isDev) {
  app.use(staticCache(path.join(__dirname, '/'), {
    maxAge: 365 * 24 * 60 * 60
  }))
}

app.use(Static(path.join(__dirname, '/')))

app.use(async ctx => {
  const context = {}
  const store = getStore()
  const matchedRoutes = matchRoutes(routes, ctx.path) || []

  for (let i = 0, len = matchedRoutes.length; i < len; i++) {
    let matchedRoute = matchedRoutes[i]
    matchedRoute.route && matchedRoute.route.loadData && await matchedRoute.route.loadData(store)
  }

  ctx.body = await render(ctx, store, routes, context)
})

app.listen(3007)
