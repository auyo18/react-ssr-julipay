import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import {Provider} from 'react-redux'
import routes from '../routes'
import {getClientStore} from "../store"
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'
import '../assets/styles/index.scss'
import VConsole from 'vconsole'

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  new VConsole()
}

require('../../static/js/font')

const store = getClientStore()

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  )
}

ReactDom.hydrate(
  <App />,
  document.getElementById('root')
)
