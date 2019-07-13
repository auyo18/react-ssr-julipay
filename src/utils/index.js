import React from "react"
import fs from "fs"
import path from "path"
import axios from 'axios'
import {renderToNodeStream} from "react-dom/server"
import {Helmet} from 'react-helmet'
import {renderRoutes} from "react-router-config"
import {StaticRouter} from 'react-router-dom'
import routes from '../routes'

const isDev = process.env.NODE_ENV === 'development'

export const render = (ctx, context) => {
  return new Promise(async (resolve, reject) => {
    let templateStream
    const dom = (
      <StaticRouter location={ctx.path} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    )

    const stream = renderToNodeStream(dom)
    let html = '', template = ''
    if (isDev) {
      let {data: template} = await axios('http://127.0.0.1:3000')
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
        resolve(template)
      })

      stream.on('error', () => {
        reject(template)
      })
    } else {
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
          resolve(template)
        })

        stream.on('error', () => {
          reject(template)
        })
      })
    }
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
