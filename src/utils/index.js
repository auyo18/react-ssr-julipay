import React from "react"
import fs from "fs"
import path from "path"
import {renderToNodeStream} from "react-dom/server"
import {Helmet} from 'react-helmet'
import {renderRoutes} from "react-router-config"
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

export const render = (ctx, store, routes, context) => {
  return new Promise(async (resolve, reject) => {
    let templateStream
    const dom = (
      <Provider store={store}>
        <StaticRouter location={ctx.path} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    )

    const stream = renderToNodeStream(dom)
    let html = '', template = ''
    templateStream = fs.createReadStream(path.join(__dirname, '../index.html'), {encoding: 'utf8'})
    templateStream.on('data', chunk => {
      template += chunk.toString()
    })
    templateStream.on('end', () => {
      stream.on('data', chunk => {
        html += chunk.toString()
      })

      stream.on('end', () => {
        const helmet = Helmet.renderStatic()
        const title = helmet.title.toString()
        const meta = helmet.meta.toString()
        template = template.replace('<!-- meta -->', meta)
        template = template.replace('<!-- title -->', title)
        template = template.replace('<!-- app -->', html)
        template = template.replace('<!-- state -->', `<script>window.initialState = ${JSON.stringify(store.getState())}</script>`)
        resolve(template)
      })

      stream.on('error', () => {
        reject(template)
      })
    })
  })
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 数组打乱顺序
export const shuffle = arr => {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomInt(0, i);
    [_arr[i], _arr[j]] = [_arr[j], _arr[i]]
  }
  return _arr
}

function pluralize(time, label) {
  return time + label + '前'
}

export const dateFormat = (times, format = 'yyyy.MM.dd') => {
  const time = Date.parse(times)
  const between = (Date.now() - Number(time)) / 1000
  if (between < 3600 && ((between / 60) < 1)) {
    return '刚刚'
  } else if (between < 3600) {
    return pluralize(~~(between / 60), '分钟')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), '小时')
  }
  if (!time) return null
  const date = new Date(time)
  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}
