import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import routes from '../routes'
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'
import '../assets/styles/index.scss'

const App = () => (
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>
)

ReactDom.hydrate(
  <App />,
  document.getElementById('root')
)
