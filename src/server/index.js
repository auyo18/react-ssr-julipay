import React from 'react'
import path from "path"
import Koa from 'koa'
import Static from 'koa-static'
import staticCache from 'koa-static-cache'
import {render} from "../utils"

const app = new Koa()

app.use(staticCache(path.join(__dirname, '/'), {
  maxAge: 365 * 24 * 60 * 60
}))
app.use(Static(path.join(__dirname, '/')))

app.use(async ctx => {
  const context = {}
  // ctx.body = 123
  ctx.body = await render(ctx, context)
})

app.listen(3007)
